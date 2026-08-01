import { describe, it, expect } from "vitest";
import { classifyIntents, detectLanguage, analyzeSentiment, extractEntities } from "../src/lib/agent/nlp";
import { processAgentConversation } from "../src/lib/agent/orchestrator";
import { executeTool } from "../src/lib/agent/tools";

describe("SupportPilot AI — 100+ Test Suite & Multilingual Intent Engine", () => {
  // -------------------------------------------------------------
  // 1. ORDER TRACKING INTENT (20 Queries)
  // -------------------------------------------------------------
  describe("Order Tracking Intent (20 Queries)", () => {
    const queries = [
      "Where is my order?",
      "Track my package",
      "Order status",
      "Delivery status",
      "Has my parcel shipped?",
      "AWB tracking",
      "Track ORD-1001",
      "Where is my parcel",
      "Is my package shipped?",
      "Package status",
      "Shipment status",
      "Track my order",
      "Mera order kahan hai?",
      "Track ORD-1002 status",
      "When will ORD-1001 arrive?",
      "Check shipment for ORD-6540",
      "Where is my delivery?",
      "Track my shipment ORD-1001",
      "Show tracking status",
      "Has ORD-1002 reached delivery station?",
    ];

    queries.forEach((q) => {
      it(`should classify "${q}" as ORDER_TRACKING`, () => {
        const intents = classifyIntents(q);
        expect(intents[0].intent).toBe("ORDER_TRACKING");
        expect(intents[0].confidence).toBeGreaterThanOrEqual(0.80);
      });
    });
  });

  // -------------------------------------------------------------
  // 2. RETURN & EXCHANGE INTENT (15 Queries)
  // -------------------------------------------------------------
  describe("Return & Exchange Intent (15 Queries)", () => {
    const queries = [
      "I want to return my shoes",
      "Replace my headphones",
      "Exchange my order",
      "Return policy",
      "Is ORD-1002 eligible for return?",
      "Replace order",
      "Mera item return karna hai",
      "How do I return ORD-1001?",
      "Schedule doorstep return pickup",
      "Product replacement process",
      "Item is defective want exchange",
      "Replace ORD-1002 with another size",
      "Return duration for earbuds",
      "Can I exchange my order?",
      "Initiate return request",
    ];

    queries.forEach((q) => {
      it(`should classify "${q}" as RETURN_EXCHANGE`, () => {
        const intents = classifyIntents(q);
        expect(intents[0].intent).toBe("RETURN_EXCHANGE");
        expect(intents[0].confidence).toBeGreaterThanOrEqual(0.80);
      });
    });
  });

  // -------------------------------------------------------------
  // 3. REFUND STATUS INTENT (15 Queries)
  // -------------------------------------------------------------
  describe("Refund Status Intent (15 Queries)", () => {
    const queries = [
      "Refund status",
      "My refund",
      "Payment failed",
      "Money not received",
      "UPI refund",
      "When will I get my refund?",
      "Where is my refund for ORD-6540?",
      "Refund not credited yet",
      "Check UPI refund status",
      "Refund reference number",
      "Mera refund kab aayega?",
      "Money deducted but order failed",
      "Is my refund processed for ORD-6540?",
      "UPI payment refund timing",
      "Bank transfer refund status",
    ];

    queries.forEach((q) => {
      it(`should classify "${q}" as REFUND_STATUS`, () => {
        const intents = classifyIntents(q);
        expect(intents[0].intent).toBe("REFUND_STATUS");
        expect(intents[0].confidence).toBeGreaterThanOrEqual(0.80);
      });
    });
  });

  // -------------------------------------------------------------
  // 4. PRODUCT RECOMMENDATION INTENT (20 Queries)
  // -------------------------------------------------------------
  describe("Product Recommendation Intent (20 Queries)", () => {
    const queries = [
      "Suggest bluetooth earphones under ₹3000",
      "Recommend a phone under ₹20000",
      "Best laptop for students",
      "Show gaming mouse",
      "Budget smartwatch",
      "Best product for office work",
      "Compare two products",
      "Cheapest earbuds",
      "Gaming keyboard",
      "Show premium phones",
      "Recommend phone",
      "Suggest boAt earbuds",
      "Show OnePlus earbuds under 3k",
      "Best JBL wireless headphones",
      "Show Nothing phone",
      "Recommend gaming laptop under 60k",
      "Show wireless mouse Logitech",
      "Suggest Samsung phone under 15000",
      "Best noise cancellation earbuds",
      "Show CMF earbuds",
    ];

    queries.forEach((q) => {
      it(`should classify "${q}" as PRODUCT_RECOMMENDATION`, () => {
        const intents = classifyIntents(q);
        expect(intents[0].intent).toBe("PRODUCT_RECOMMENDATION");
        expect(intents[0].confidence).toBeGreaterThanOrEqual(0.80);
      });
    });
  });

  // -------------------------------------------------------------
  // 5. FAQ SEARCH INTENT (15 Queries)
  // -------------------------------------------------------------
  describe("FAQ Search Intent (15 Queries)", () => {
    const queries = [
      "Warranty policy",
      "Shipping charges",
      "Delivery time",
      "Business hours",
      "Cancellation policy",
      "Contact support",
      "Explain refund policy",
      "Can I cancel my order?",
      "Warranty",
      "What are the delivery charges?",
      "How to request GST invoice?",
      "COD available or not?",
      "1-year brand warranty query",
      "Order cancellation duration",
      "Customer care working hours",
    ];

    queries.forEach((q) => {
      it(`should classify "${q}" as FAQ_SEARCH`, () => {
        const intents = classifyIntents(q);
        expect(intents[0].intent).toBe("FAQ_SEARCH");
        expect(intents[0].confidence).toBeGreaterThanOrEqual(0.80);
      });
    });
  });

  // -------------------------------------------------------------
  // 6. HUMAN ESCALATION INTENT (10 Queries)
  // -------------------------------------------------------------
  describe("Human Escalation Intent (10 Queries)", () => {
    const queries = [
      "Talk to human",
      "Connect customer executive",
      "Need support agent",
      "File complaint",
      "Need customer executive",
      "Connect me to human representative",
      "Agent se baat karo",
      "Customer care executive needed",
      "Escalate my issue to manager",
      "Raise formal complaint ticket",
    ];

    queries.forEach((q) => {
      it(`should classify "${q}" as HUMAN_ESCALATION`, () => {
        const intents = classifyIntents(q);
        expect(intents[0].intent).toBe("HUMAN_ESCALATION");
        expect(intents[0].confidence).toBeGreaterThanOrEqual(0.80);
      });
    });
  });

  // -------------------------------------------------------------
  // 7. GREETINGS & SMALL TALK INTENT (10 Queries)
  // -------------------------------------------------------------
  describe("Greetings & Small Talk Intent (10 Queries)", () => {
    const greetings = ["Hi", "Hello", "Good morning", "Namaste", "Hey SupportPilot"];
    const smallTalk = ["Thank you", "Who are you?", "What can you do?", "Nice work", "Thanks a lot"];

    greetings.forEach((q) => {
      it(`should classify "${q}" as GREETINGS`, () => {
        const intents = classifyIntents(q);
        expect(intents[0].intent).toBe("GREETINGS");
      });
    });

    smallTalk.forEach((q) => {
      it(`should classify "${q}" as SMALL_TALK`, () => {
        const intents = classifyIntents(q);
        expect(intents[0].intent).toBe("SMALL_TALK");
      });
    });
  });

  // -------------------------------------------------------------
  // 8. MULTILINGUAL DETECTION (Hindi, Tamil, Telugu, Bengali, Kannada, Gujarati)
  // -------------------------------------------------------------
  describe("Multilingual Detection", () => {
    it("should detect Hinglish language", () => {
      const res = detectLanguage("Mera order kab aayega?");
      expect(res.language).toContain("Hinglish");
    });

    it("should detect Hindi script", () => {
      const res = detectLanguage("मेरा ऑर्डर कहाँ है?");
      expect(res.language).toContain("Hindi");
    });

    it("should detect Tamil script", () => {
      const res = detectLanguage("என் ஆர்டர் எங்கே?");
      expect(res.language).toContain("Tamil");
    });

    it("should detect Telugu script", () => {
      const res = detectLanguage("నా ఆర్డర్ ఎక్కడ ఉంది?");
      expect(res.language).toContain("Telugu");
    });

    it("should detect Bengali script", () => {
      const res = detectLanguage("আমার অর্ডার কোথায়?");
      expect(res.language).toContain("Bengali");
    });
  });

  // -------------------------------------------------------------
  // 9. MULTI-INTENT & CONTEXT MEMORY RESOLUTION
  // -------------------------------------------------------------
  describe("Multi-Intent & Context Memory", () => {
    it("should process multi-intent 'Track my order AND tell me if it is eligible for return'", () => {
      const intents = classifyIntents("Track my order and tell me if it is eligible for return");
      expect(intents.length).toBeGreaterThanOrEqual(2);
      expect(intents.some((i) => i.intent === "ORDER_TRACKING")).toBe(true);
      expect(intents.some((i) => i.intent === "RETURN_EXCHANGE")).toBe(true);
    });

    it("should resolve 'where is it now?' using lastOrderNumber context", () => {
      const context = { lastOrderNumber: "ORD-1002" };
      const entities = extractEntities("where is it now?", context);
      expect(entities.orderId).toBe("ORD-1002");
    });

    it("should resolve 'show cheaper ones' using lastCategory context", () => {
      const context = { lastCategory: "Audio", lastMaxPrice: 3000 };
      const entities = extractEntities("show cheaper ones", context);
      expect(entities.category).toBe("Audio");
      expect(entities.maxPrice).toBeLessThan(3000);
    });
  });

  // -------------------------------------------------------------
  // 10. END-TO-END ORCHESTRATION & TOOL VERIFICATION
  // -------------------------------------------------------------
  describe("End-to-End Orchestration & Tool Verification", () => {
    it("should execute track_order tool cleanly", async () => {
      const res = await executeTool("track_order", { query: "ORD-1001" });
      expect(res.success).toBe(true);
      expect(res.data).toBeDefined();
    });

    it("should process orchestration loop for bluetooth earphones under ₹3000 without undefined", async () => {
      const res = await processAgentConversation("Suggest bluetooth earphones under ₹3000");
      expect(res.reply).not.toContain("undefined");
      expect(res.reply).not.toContain("null");
      expect(res.reply).toContain("Recommended Products");
      expect(res.reasoningSteps.length).toBeGreaterThan(0);
    });

    it("should process refund query for ORD-6540 without undefined fields", async () => {
      const res = await processAgentConversation("Where is my refund for ORD-6540?");
      expect(res.reply).not.toContain("undefined");
      expect(res.reply).not.toContain("null");
      expect(res.reply).toContain("Refund Transaction Status");
      expect(res.reply).toContain("₹2999");
    });
  });
});
