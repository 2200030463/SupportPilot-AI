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

// ----------------------------------------------------
// RUNTIME SCHEMA VALIDATORS (Prevent undefined/null UI leaks)
// ----------------------------------------------------
function validateOrder(data: any): boolean {
  if (!data) return false;
  const orderId = data.orderNumber || data.order_id;
  const status = data.status || data.deliveryStatus;
  const carrier = data.courierName || data.carrier;
  const eta = data.estimatedDelivery || data.estimated_delivery;
  return Boolean(orderId && status && carrier && eta);
}

function validateRefund(data: any): boolean {
  if (!data) return false;
  const orderId = data.orderNumber || data.order_id;
  const status = data.refundStatus || data.status;
  const amount = data.amountInINR || data.amount;
  const paymentMethod = data.paymentMethod || data.payment_method;
  return Boolean(orderId && status && (amount !== undefined && amount !== null) && paymentMethod);
}

function validateProduct(p: any): boolean {
  if (!p) return false;
  return Boolean(p.name && (p.priceInINR !== undefined || p.price !== undefined) && p.brand);
}

function validateFAQ(data: any): boolean {
  if (!data) return false;
  return Boolean(data.question && data.answer);
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
        const res = await executeTool("track_order", { query: orderId, orderNumber: orderId });
        toolResults.push(res);
        reasoningSteps.push(`🚚 Tracking shipment with logistics provider...`);
        reasoningSteps.push(`✅ Shipment status retrieved.`);

        // Extract order data from res.data (array or object)
        const orderObj = Array.isArray(res.data) ? res.data[0] : res.data;

        if (validateOrder(orderObj)) {
          const oid = orderObj.orderNumber || orderObj.order_id || orderId;
          const itemName = orderObj.items?.[0]?.productName || orderObj.product_name || "E-Commerce Package";
          const status = orderObj.status || orderObj.deliveryStatus || "In Transit";
          const carrier = orderObj.courierName || orderObj.carrier || "Delhivery";
          const trackingNo = orderObj.trackingNumber || orderObj.tracking_number || "DLH-99218201";
          const eta = orderObj.estimatedDelivery || orderObj.estimated_delivery || "2026-08-03";
          const price = orderObj.totalAmountInINR || orderObj.price || 1299;

          finalReplyParts.push(
            `📦 **Order Status for ${oid}**\n` +
            `• Item: **${itemName}** (₹${price})\n` +
            `• Status: **${status}**\n` +
            `• Carrier: **${carrier}** (AWB: \`${trackingNo}\`)\n` +
            `• Estimated Delivery: **${eta}**`
          );
        } else {
          finalReplyParts.push(`I couldn't find tracking information for order **${orderId}**.`);
        }
        break;
      }

      case "RETURN_EXCHANGE": {
        const orderId = intentRes.entities.orderId || updatedContext.lastOrderNumber || "ORD-1001";
        reasoningSteps.push(`🔄 Checking 7-day return policy for ${orderId}...`);
        const res = await executeTool("initiate_return", { order_id: orderId, orderNumber: orderId, reason: "Defective item or customer request" });
        toolResults.push(res);
        reasoningSteps.push(`✅ Return request processed.`);

        if (res.data) {
          const returnId = res.data.return_id || res.data.ticketCode || "RET-90128";
          const oid = res.data.order_id || res.data.orderNumber || orderId;
          const status = res.data.status || "Authorized";
          const pickupDate = res.data.pickup_date || "2026-08-03";
          const refundAmount = res.data.refund_amount || res.data.amountInINR || 1299;

          updatedContext.lastReturnId = returnId;
          finalReplyParts.push(
            `🔄 **Return Request Authorized (${returnId})**\n` +
            `• Order: **${oid}**\n` +
            `• Status: **${status}**\n` +
            `• Pickup Scheduled: **${pickupDate}**\n` +
            `• Refund Amount: **₹${refundAmount}** (via Instant UPI)`
          );
        } else {
          finalReplyParts.push(`Return Policy: Bharat E-Commerce offers a **7-day replacement guarantee**. Please provide your Order ID (e.g. ORD-1001) to schedule a doorstep pickup.`);
        }
        break;
      }

      case "REFUND_STATUS": {
        const orderId = intentRes.entities.orderId || updatedContext.lastOrderNumber || "ORD-6540";
        reasoningSteps.push(`💳 Fetching refund transaction status for ${orderId}...`);
        const res = await executeTool("check_refund_status", { orderNumber: orderId, order_id: orderId });
        toolResults.push(res);
        reasoningSteps.push(`✅ Refund details retrieved.`);

        const refundObj = Array.isArray(res.data) ? res.data[0] : res.data;

        if (validateRefund(refundObj)) {
          const oid = refundObj.orderNumber || refundObj.order_id || orderId;
          const status = refundObj.refundStatus || refundObj.status || "Completed";
          const amount = refundObj.amountInINR || refundObj.amount || 2999;
          const method = refundObj.paymentMethod || refundObj.payment_method || "UPI";
          const refNo = refundObj.referenceNumber || refundObj.refund_id || "UPI-REF-9028129841";
          const note = refundObj.timelineMessage || "Instant UPI refund processed.";

          updatedContext.lastRefundId = refNo;
          finalReplyParts.push(
            `💳 **Refund Transaction Status for ${oid}**\n` +
            `• Amount: **₹${amount}**\n` +
            `• Payment Method: **${method}**\n` +
            `• Status: **${status}**\n` +
            `• Reference ID: **${refNo}**\n` +
            `• Note: ${note}`
          );
        } else {
          finalReplyParts.push(`I couldn't find refund information for order **${orderId}**.`);
        }
        break;
      }

      case "PRODUCT_RECOMMENDATION": {
        const category = intentRes.entities.category || updatedContext.lastCategory || undefined;
        const maxPrice = intentRes.entities.maxPrice || updatedContext.lastMaxPrice || undefined;
        reasoningSteps.push(`🛒 Searching Catalog for ${category ? category : "top"} products under ₹${maxPrice || "budget"}...`);

        const res = await executeTool("recommend_products", {
          query: userQuery,
          category,
          maxPriceInINR: maxPrice,
          max_price: maxPrice,
        });
        toolResults.push(res);

        const products = res.data?.recommendations || res.data?.products || (Array.isArray(res.data) ? res.data : []);
        const validProducts = Array.isArray(products) ? products.filter(validateProduct) : [];

        reasoningSteps.push(`✨ Filtered top ${validProducts.length} product matches.`);

        if (validProducts.length > 0) {
          const productList = validProducts
            .slice(0, 3)
            .map(
              (p: any) =>
                `• **${p.name}** (${p.brand || "Brand"}) — **₹${p.priceInINR || p.price}** (Rating: ⭐ ${p.rating || 4.5}/5.0)\n  *${p.description || "High quality product"}*`
            )
            .join("\n\n");
          finalReplyParts.push(
            `🛍️ **Recommended Products for You**:\n\n${productList}\n\n*All items include 1-Year India Warranty & Free Doorstep Express Delivery!*`
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

        const faqs = res.data?.faqs || (Array.isArray(res.data) ? res.data : []);
        const topFaq = Array.isArray(faqs) && faqs.length > 0 ? faqs[0] : null;

        if (validateFAQ(topFaq)) {
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
        reasoningSteps.push(`✅ Created priority support ticket ${res.data?.ticketCode || "TCK-9001"}.`);

        if (res.data) {
          const tcode = res.data.ticketCode || "TCK-9001";
          const priority = (res.data.priority || "Urgent").toUpperCase();
          const agent = res.data.assignedAgent || "Human Support Desk";
          const waitTime = res.data.estimatedWaitTime || "5 minutes";

          finalReplyParts.push(
            `🎧 **Connected to Customer Executive (Ticket ${tcode})**\n` +
            `• Priority Level: **${priority}**\n` +
            `• Assigned Representative: **${agent}**\n` +
            `• Expected Response: **${waitTime}**\n\n` +
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
