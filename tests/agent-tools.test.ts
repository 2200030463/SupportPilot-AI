import { describe, it, expect } from "vitest";
import { classifyIntents, detectLanguage, analyzeSentiment, extractEntities } from "../src/lib/agent/nlp";
import { processAgentConversation } from "../src/lib/agent/orchestrator";
import { executeTool } from "../src/lib/agent/tools";

describe("SupportPilot AI — Hybrid Intent Engine & 50+ Test Suite", () => {
  // -------------------------------------------------------------
  // 1. ORDER TRACKING INTENT (12 Queries)
  // -------------------------------------------------------------
  describe("Order Tracking Intent", () => {
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
  // 2. RETURN & EXCHANGE INTENT (6 Queries)
  // -------------------------------------------------------------
  describe("Return & Exchange Intent", () => {
    const queries = [
      "I want to return my shoes",
      "Replace my headphones",
      "Exchange my order",
      "Return policy",
      "Is ORD-1002 eligible for return?",
      "Replace order",
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
  // 3. REFUND STATUS INTENT (6 Queries)
  // -------------------------------------------------------------
  describe("Refund Status Intent", () => {
    const queries = [
      "Refund status",
      "My refund",
      "Payment failed",
      "Money not received",
      "UPI refund",
      "When will I get my refund?",
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
  // 4. PRODUCT RECOMMENDATION INTENT (11 Queries)
  // -------------------------------------------------------------
  describe("Product Recommendation Intent", () => {
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
  // 5. FAQ SEARCH INTENT (9 Queries)
  // -------------------------------------------------------------
  describe("FAQ Search Intent", () => {
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
  // 6. HUMAN ESCALATION INTENT (5 Queries)
  // -------------------------------------------------------------
  describe("Human Escalation Intent", () => {
    const queries = [
      "Talk to human",
      "Connect customer executive",
      "Need support agent",
      "File complaint",
      "Need customer executive",
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
  // 7. GREETINGS INTENT (4 Queries)
  // -------------------------------------------------------------
  describe("Greetings Intent", () => {
    const queries = ["Hi", "Hello", "Good morning", "Namaste"];

    queries.forEach((q) => {
      it(`should classify "${q}" as GREETINGS`, () => {
        const intents = classifyIntents(q);
        expect(intents[0].intent).toBe("GREETINGS");
        expect(intents[0].confidence).toBeGreaterThanOrEqual(0.80);
      });
    });
  });

  // -------------------------------------------------------------
  // 8. SMALL TALK INTENT (4 Queries)
  // -------------------------------------------------------------
  describe("Small Talk Intent", () => {
    const queries = ["Thank you", "Who are you?", "What can you do?", "Nice work"];

    queries.forEach((q) => {
      it(`should classify "${q}" as SMALL_TALK`, () => {
        const intents = classifyIntents(q);
        expect(intents[0].intent).toBe("SMALL_TALK");
        expect(intents[0].confidence).toBeGreaterThanOrEqual(0.80);
      });
    });
  });

  // -------------------------------------------------------------
  // 9. MULTI-INTENT RESOLUTION (2 Complex Multi-Intent Queries)
  // -------------------------------------------------------------
  describe("Multi-Intent Execution", () => {
    it("should classify multi-intent 'Track my order AND tell me if it is eligible for return'", () => {
      const intents = classifyIntents("Track my order and tell me if it is eligible for return");
      expect(intents.length).toBeGreaterThanOrEqual(2);
      expect(intents.some((i) => i.intent === "ORDER_TRACKING")).toBe(true);
      expect(intents.some((i) => i.intent === "RETURN_EXCHANGE")).toBe(true);
    });

    it("should classify multi-intent 'Recommend a phone AND explain your refund policy'", () => {
      const intents = classifyIntents("Recommend a phone and explain your refund policy");
      expect(intents.length).toBeGreaterThanOrEqual(2);
      expect(intents.some((i) => i.intent === "PRODUCT_RECOMMENDATION")).toBe(true);
      expect(intents.some((i) => i.intent === "FAQ_SEARCH" || i.intent === "REFUND_STATUS")).toBe(true);
    });
  });

  // -------------------------------------------------------------
  // 10. CONTEXT AWARENESS & MEMORY
  // -------------------------------------------------------------
  describe("Context Memory Resolution", () => {
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
  // 11. TOOL EXECUTION TEST SUITE
  // -------------------------------------------------------------
  describe("Agent Tool Execution", () => {
    it("should execute track_order tool cleanly", async () => {
      const res = await executeTool("track_order", { query: "ORD-1001" });
      expect(res.success).toBe(true);
      expect(res.data).toBeDefined();
    });

    it("should execute recommend_products tool cleanly", async () => {
      const res = await executeTool("recommend_products", { category: "Audio", max_price: 3000 });
      expect(res.success).toBe(true);
      expect(res.data).toBeDefined();
    });

    it("should process conversational orchestration loop", async () => {
      const res = await processAgentConversation("Suggest bluetooth earphones under ₹3000");
      expect(res.reply).toBeDefined();
      expect(res.reasoningSteps.length).toBeGreaterThan(0);
    });
  });
});
