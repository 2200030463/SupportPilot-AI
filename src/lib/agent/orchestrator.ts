import { classifyIntents, detectLanguage, analyzeSentiment, ConversationContext } from "./nlp";
import { executeTool } from "./tools";

export interface AgentMessage {
  id: string;
  sender: "user" | "assistant" | "system";
  text: string;
  timestamp: string;
  reasoningSteps?: string[];
  toolResults?: any[];
  language?: string;
  sentiment?: string;
}

export interface AgentResponse {
  reply: string;
  reasoningSteps: string[];
  toolResults: any[];
  language: string;
  sentiment: string;
  updatedContext: ConversationContext;
}

export async function processAgentConversation(
  userQuery: string,
  history: AgentMessage[] = [],
  context: ConversationContext = {}
): Promise<AgentResponse> {
  const reasoningSteps: string[] = [];
  const toolResults: any[] = [];
  const lang = detectLanguage(userQuery);
  const sentiment = analyzeSentiment(userQuery);

  reasoningSteps.push(`🧠 Intent Analysis: Detecting user intent in ${lang.language}...`);

  // Classify Intents using Hybrid Intent Engine
  const intentResults = classifyIntents(userQuery, context);
  const primary = intentResults[0];

  // Update Context Memory
  const updatedContext: ConversationContext = { ...context };

  if (primary.entities.orderId) {
    updatedContext.lastOrderNumber = primary.entities.orderId;
  }
  if (primary.entities.category) {
    updatedContext.lastCategory = primary.entities.category;
  }
  if (primary.entities.maxPrice) {
    updatedContext.lastMaxPrice = primary.entities.maxPrice;
  }

  // A. Low Confidence Routing (< 0.50)
  if (primary.confidence < 0.50) {
    reasoningSteps.push(`⚠️ Confidence low (${(primary.confidence * 100).toFixed(0)}%). Requesting clarification...`);
    return {
      reply: "I want to make sure I assist you correctly! Could you please rephrase your question or specify if you need help with **Order Tracking**, **Returns**, **Refunds**, or **Product Recommendations**?",
      reasoningSteps,
      toolResults: [],
      language: lang.language,
      sentiment: sentiment.label,
      updatedContext,
    };
  }

  // B. Medium Confidence Routing (0.50 - 0.79)
  if (primary.confidence >= 0.50 && primary.confidence < 0.80) {
    reasoningSteps.push(`❓ Medium confidence (${(primary.confidence * 100).toFixed(0)}%). Asking targeted clarification...`);
    return {
      reply: `Did you mean you'd like to track an order status or inquire about return/refund policies? Please share your Order ID (e.g., ORD-1001) or specific product details so I can assist!`,
      reasoningSteps,
      toolResults: [],
      language: lang.language,
      sentiment: sentiment.label,
      updatedContext,
    };
  }

  // C. High Confidence Routing (>= 0.80) -> Multi-Intent & Tool Execution
  let finalReplyParts: string[] = [];

  for (const intentRes of intentResults) {
    switch (intentRes.intent) {
      case "ORDER_TRACKING": {
        const orderId = intentRes.entities.orderId || updatedContext.lastOrderNumber || "ORD-1001";
        reasoningSteps.push(`🔍 Searching Order Database for ${orderId}...`);
        const res = await executeTool("track_order", { order_id: orderId });
        toolResults.push(res);
        reasoningSteps.push(`🚚 Tracking shipment with logistics provider...`);
        reasoningSteps.push(`✅ Shipment status retrieved.`);

        if (res.data) {
          finalReplyParts.push(
            `📦 **Order Status for ${res.data.order_id}**\n` +
            `• Item: **${res.data.product_name}** (₹${res.data.price})\n` +
            `• Status: **${res.data.status}**\n` +
            `• Carrier: **${res.data.carrier}** (AWB: \`${res.data.tracking_number}\`)\n` +
            `• Estimated Delivery: **${res.data.estimated_delivery}**`
          );
        } else {
          finalReplyParts.push(`Order **${orderId}** was not found in our database. Please double-check your Order ID.`);
        }
        break;
      }

      case "RETURN_EXCHANGE": {
        const orderId = intentRes.entities.orderId || updatedContext.lastOrderNumber || "ORD-1001";
        reasoningSteps.push(`🔄 Checking 7-day return policy for ${orderId}...`);
        const res = await executeTool("initiate_return", { order_id: orderId, reason: "Defective item or customer request" });
        toolResults.push(res);
        reasoningSteps.push(`✅ Return request processed.`);

        if (res.data) {
          updatedContext.lastReturnId = res.data.return_id;
          finalReplyParts.push(
            `🔄 **Return Request Authorized (${res.data.return_id})**\n` +
            `• Order: **${res.data.order_id}**\n` +
            `• Status: **${res.data.status}**\n` +
            `• Pickup Scheduled: **${res.data.pickup_date}**\n` +
            `• Refund Amount: **₹${res.data.refund_amount}** (via Instant UPI)`
          );
        } else {
          finalReplyParts.push(`Return Policy: Bharat E-Commerce offers a **7-day replacement guarantee**. Please provide your Order ID (e.g. ORD-1001) to schedule a doorstep pickup.`);
        }
        break;
      }

      case "REFUND_STATUS": {
        const orderId = intentRes.entities.orderId || updatedContext.lastOrderNumber || "ORD-1001";
        reasoningSteps.push(`💳 Fetching refund transaction status for ${orderId}...`);
        const res = await executeTool("check_refund_status", { order_id: orderId });
        toolResults.push(res);
        reasoningSteps.push(`✅ Refund details retrieved.`);

        if (res.data) {
          updatedContext.lastRefundId = res.data.refund_id;
          finalReplyParts.push(
            `💳 **Refund Transaction Status (${res.data.refund_id})**\n` +
            `• Amount: **₹${res.data.amount}**\n` +
            `• Payment Method: **${res.data.payment_method}**\n` +
            `• Status: **${res.data.status}**\n` +
            `• Estimated Settlement: **${res.data.estimated_settlement}**`
          );
        } else {
          finalReplyParts.push(`Refund Policy: Approved refunds are processed via **Instant UPI / Original Payment** within 24-48 hours. Please share your Order ID to inspect payout state.`);
        }
        break;
      }

      case "PRODUCT_RECOMMENDATION": {
        const category = intentRes.entities.category || updatedContext.lastCategory || undefined;
        const maxPrice = intentRes.entities.maxPrice || updatedContext.lastMaxPrice || undefined;
        reasoningSteps.push(`🛒 Searching Catalog for ${category ? category : "top"} products under ₹${maxPrice || "budget"}...`);

        const res = await executeTool("recommend_products", { category, max_price: maxPrice });
        toolResults.push(res);
        reasoningSteps.push(`✨ Filtered top ${res.data?.length || 0} product matches.`);

        if (res.data && res.data.length > 0) {
          const productList = res.data
            .map((p: any) => `• **${p.name}** — ₹${p.price} (Rating: ⭐ ${p.rating}/5.0) — *${p.description}*`)
            .join("\n");
          finalReplyParts.push(
            `🛍️ **Recommended Products for You**:\n${productList}\n\n*All items include 1-Year India Warranty & Free Doorstep Express Delivery!*`
          );
        } else {
          finalReplyParts.push(`I couldn't find products matching your exact budget. Here are our top trending smartphones and audio accessories with 1-Year Warranty!`);
        }
        break;
      }

      case "FAQ_SEARCH": {
        reasoningSteps.push(`📚 Searching Knowledge Base RAG...`);
        const res = await executeTool("search_faq", { query: userQuery });
        toolResults.push(res);
        reasoningSteps.push(`✅ Matched knowledge base documentation.`);

        if (res.data && res.data.length > 0) {
          const topFaq = res.data[0];
          updatedContext.lastFAQTopic = topFaq.category;
          finalReplyParts.push(`📖 **${topFaq.question}**\n\n${topFaq.answer}`);
        } else {
          finalReplyParts.push(`Support Policy: We offer **Free Express Shipping** across 19,000+ PIN codes in India, 7-day hassle-free replacements, and 24/7 AI support desk.`);
        }
        break;
      }

      case "HUMAN_ESCALATION": {
        reasoningSteps.push(`🎧 Escalating dialogue to live customer support executive...`);
        const res = await executeTool("escalate_to_human", {
          issue_summary: userQuery,
          customer_email: "customer@supportpilot.ai",
          priority: sentiment.label === "Frustrated" ? "urgent" : "medium",
        });
        toolResults.push(res);
        reasoningSteps.push(`✅ Created priority support ticket ${res.data?.ticket_id}.`);

        if (res.data) {
          finalReplyParts.push(
            `🎧 **Connected to Customer Executive (Ticket ${res.data.ticket_id})**\n` +
            `• Priority Level: **${res.data.priority.toUpperCase()}**\n` +
            `• Assigned Representative: **${res.data.assigned_agent}**\n` +
            `• Expected Response: **${res.data.estimated_wait_time}**\n\n` +
            `Our senior CX specialist has been notified and will assist you immediately!`
          );
        }
        break;
      }

      case "GREETINGS": {
        reasoningSteps.push(`👋 Greeting recognized.`);
        finalReplyParts.push(`Namaste! 🙏 Welcome to **SupportPilot AI**. How can I help you today with your orders, returns, refunds, or product suggestions?`);
        break;
      }

      case "SMALL_TALK": {
        reasoningSteps.push(`💬 Small talk response generated.`);
        finalReplyParts.push(`You're very welcome! 😊 I am **SupportPilot AI**, your 24/7 customer experience assistant for Bharat businesses. Let me know if you need anything else!`);
        break;
      }

      default: {
        reasoningSteps.push(`🤖 Providing fallback assistance...`);
        finalReplyParts.push(`I am here to assist! You can ask me to **track an order**, **request a return or refund**, **search FAQs**, or **recommend products** under any budget.`);
        break;
      }
    }
  }

  reasoningSteps.push(`✅ Response generated successfully.`);

  return {
    reply: finalReplyParts.join("\n\n---\n\n"),
    reasoningSteps,
    toolResults,
    language: lang.language,
    sentiment: sentiment.label,
    updatedContext,
  };
}
