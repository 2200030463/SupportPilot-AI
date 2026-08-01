import OpenAI from "openai";
import { ALL_TOOLS } from "./tools";
import { detectLanguageAndSentiment } from "./nlp";

const openaiKey = process.env.OPENAI_API_KEY;
const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;

export interface MessageInput {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AgentExecutionResponse {
  reply: string;
  sentiment: string;
  languageDetected: string;
  toolsExecuted: {
    toolName: string;
    args: Record<string, any>;
    result: any;
  }[];
  isEscalated: boolean;
  ticketCode?: string;
}

const SYSTEM_PROMPT = `
You are SupportPilot AI, an expert, polite, and empathetic customer support employee for Indian e-commerce businesses.
You behave like a real Indian support employee rather than a generic chatbot.

KEY BEHAVIORS:
1. Always speak in the user's preferred language (English, Hindi, Hinglish, Tamil, Telugu, etc.).
2. Show empathy and clear understanding of Indian logistics (Delhivery, BlueDart, Xpressbees, UPI refunds, COD payments).
3. Whenever a customer asks about orders, shipments, returns, refunds, or product suggestions, USE THE APPROPRIATE TOOL AUTOMATICALLY.
4. Prices should always be formatted in Indian Rupees (₹).
5. If the customer is frustrated, apologize sincerely and offer human agent escalation if needed.
`;

export async function processAgentConversation(messages: MessageInput[]): Promise<AgentExecutionResponse> {
  const latestMessage = messages[messages.length - 1]?.content || "";
  const nlp = detectLanguageAndSentiment(latestMessage);

  const toolsExecuted: { toolName: string; args: Record<string, any>; result: any }[] = [];
  let isEscalated = false;
  let ticketCode: string | undefined = undefined;

  // Try OpenAI API Tool Calling Loop first if key available
  if (openai) {
    try {
      const openAiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ];

      const toolsConfig: OpenAI.Chat.Completions.ChatCompletionTool[] = Object.values(ALL_TOOLS).map((t) => ({
        type: "function",
        function: {
          name: t.name,
          description: t.description,
          parameters: t.parameters,
        },
      }));

      let response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: openAiMessages,
        tools: toolsConfig,
        tool_choice: "auto",
        temperature: 0.3,
      });

      let responseMessage = response.choices[0].message;

      // Handle tool call iterations
      let iterations = 0;
      while (responseMessage.tool_calls && iterations < 3) {
        iterations++;
        openAiMessages.push(responseMessage);

        for (const toolCall of responseMessage.tool_calls) {
          const fnName = toolCall.function.name;
          const fnArgs = JSON.parse(toolCall.function.arguments || "{}");

          if (ALL_TOOLS[fnName]) {
            const toolResult = await ALL_TOOLS[fnName].execute(fnArgs);
            toolsExecuted.push({ toolName: fnName, args: fnArgs, result: toolResult });

            if (fnName === "human_escalation" || toolResult.isEscalated) {
              isEscalated = true;
              if (toolResult.ticketCode) ticketCode = toolResult.ticketCode;
            }

            openAiMessages.push({
              role: "tool",
              tool_call_id: toolCall.id,
              content: JSON.stringify(toolResult),
            });
          }
        }

        response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: openAiMessages,
        });
        responseMessage = response.choices[0].message;
      }

      if (responseMessage.content) {
        return {
          reply: responseMessage.content,
          sentiment: nlp.sentiment,
          languageDetected: nlp.languageName,
          toolsExecuted,
          isEscalated,
          ticketCode,
        };
      }
    } catch (err) {
      console.warn("OpenAI API call error, falling back to intelligent tool orchestrator:", err);
    }
  }

  // -------------------------------------------------------------------
  // INTELLIGENT RULE-BASED & HEURISTIC AGENT FALLBACK (Zero-Downtime Guarantee)
  // -------------------------------------------------------------------
  let finalReply = "";

  if (nlp.intent === "track_order" || nlp.detectedOrderNumber) {
    const targetOrder = nlp.detectedOrderNumber || "ORD-8921";
    const trackRes = await ALL_TOOLS.track_shipment.execute({ orderNumber: targetOrder });
    toolsExecuted.push({ toolName: "track_shipment", args: { orderNumber: targetOrder }, result: trackRes });

    if (nlp.language === "hi" || nlp.language === "hinglish") {
      finalReply = `Aapka order **${trackRes.orderNumber}** abhi **${trackRes.status}** state mein hai. Delivery courier **${trackRes.courierName}** (AWB: ${trackRes.trackingNumber}) ke dwara **${trackRes.estimatedDelivery}** tak expected hai.\n\nLive Timeline:\n` +
        trackRes.timeline.map((t: any) => `- **${t.status}** (${t.location}): ${t.description}`).join("\n");
    } else {
      finalReply = `Your order **${trackRes.orderNumber}** is currently **${trackRes.status}**. It is being shipped via **${trackRes.courierName}** (AWB: ${trackRes.trackingNumber}) and estimated to arrive by **${trackRes.estimatedDelivery}**.\n\n**Shipment Timeline:**\n` +
        trackRes.timeline.map((t: any) => `- **${t.status}** (${t.location}) - ${t.description}`).join("\n");
    }
  } else if (nlp.intent === "return_item") {
    const targetOrder = nlp.detectedOrderNumber || "ORD-8921";
    const returnRes = await ALL_TOOLS.return_eligibility.execute({ orderNumber: targetOrder, reason: latestMessage });
    toolsExecuted.push({ toolName: "return_eligibility", args: { orderNumber: targetOrder }, result: returnRes });

    if (nlp.language === "hi" || nlp.language === "hinglish") {
      finalReply = `Aapka order **${targetOrder}** return ke liye eligible hai! Main return ticket generate kar raha hoon. Delhivery courier executive agle 24 ghante mein aapke address se pickup kar lega. Kripya product original box ke sath ready rakhein.`;
    } else {
      finalReply = `Great news! Order **${targetOrder}** is eligible for 7-day return policy. ${returnRes.instructions} A return request ticket has been initiated for doorstep pickup.`;
    }
  } else if (nlp.intent === "refund_query") {
    const targetOrder = nlp.detectedOrderNumber || "ORD-6540";
    const refundRes = await ALL_TOOLS.refund_status.execute({ orderNumber: targetOrder });
    toolsExecuted.push({ toolName: "refund_status", args: { orderNumber: targetOrder }, result: refundRes });

    finalReply = `Refund Status for Order **${targetOrder}**: **${refundRes.refundStatus}**.\nAmount: ₹${refundRes.amountInINR} via ${refundRes.paymentMethod}.\nReference ID: ${refundRes.referenceNumber}.\n\n*Note:* ${refundRes.timelineMessage}`;
  } else if (nlp.intent === "product_recommendation") {
    const budget = nlp.detectedBudget || 3000;
    const recRes = await ALL_TOOLS.recommend_products.execute({ query: latestMessage, maxPriceInINR: budget });
    toolsExecuted.push({ toolName: "recommend_products", args: { query: latestMessage, maxPriceInINR: budget }, result: recRes });

    const recs = recRes.recommendations || [];
    finalReply = `Here are the top 3 recommended options matching your budget (under ₹${budget}):\n\n` +
      recs.map((r: any) => `1. **${r.name}** - **₹${r.priceInINR}** (Rating: ${r.rating}★)\n   *Why:* ${r.whyRecommended}\n`).join("\n");
  } else if (nlp.intent === "human_escalation" || nlp.sentiment === "Frustrated") {
    const escRes = await ALL_TOOLS.human_escalation.execute({ reason: latestMessage });
    toolsExecuted.push({ toolName: "human_escalation", args: { reason: latestMessage }, result: escRes });
    isEscalated = true;
    ticketCode = escRes.ticketCode;

    finalReply = `I am very sorry for any inconvenience caused. I have immediately created an urgent escalation ticket **${ticketCode}** and routed your chat to our Live Human Support Executive Desk. An agent will connect shortly.`;
  } else {
    // FAQ lookup
    const faqRes = await ALL_TOOLS.search_faq.execute({ query: latestMessage });
    toolsExecuted.push({ toolName: "search_faq", args: { query: latestMessage }, result: faqRes });

    const topFaq = faqRes.faqs?.[0];
    if (topFaq) {
      finalReply = topFaq.answer;
    } else {
      finalReply = `Thank you for contacting SupportPilot AI support! How can I assist you today? You can ask me to track your order, check return eligibility, refund status, or recommend products.`;
    }
  }

  return {
    reply: finalReply,
    sentiment: nlp.sentiment,
    languageDetected: nlp.languageName,
    toolsExecuted,
    isEscalated,
    ticketCode,
  };
}
