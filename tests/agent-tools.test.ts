import { describe, it, expect } from "vitest";
import { ALL_TOOLS } from "../src/lib/agent/tools";
import { detectLanguageAndSentiment } from "../src/lib/agent/nlp";

describe("SupportPilot AI Agent Internal Tools", () => {
  it("should find order details by Order Number", async () => {
    const result = await ALL_TOOLS.search_orders.execute({ query: "ORD-8921" });
    expect(result.success).toBe(true);
    expect(result.orders.length).toBeGreaterThan(0);
    expect(result.orders[0].orderNumber).toBe("ORD-8921");
  });

  it("should check return eligibility for delivered items within policy window", async () => {
    const result = await ALL_TOOLS.return_eligibility.execute({ orderNumber: "ORD-8921" });
    expect(result.success).toBe(true);
    expect(result.isEligible).toBe(true);
    expect(result.returnPolicyDays).toBe(7);
  });

  it("should recommend products within budget limit in INR", async () => {
    const result = await ALL_TOOLS.recommend_products.execute({ query: "earbuds", maxPriceInINR: 3000 });
    expect(result.success).toBe(true);
    expect(result.recommendations.length).toBeGreaterThan(0);
    expect(result.recommendations[0].priceInINR).toBeLessThanOrEqual(3000);
  });

  it("should generate a support ticket on human escalation", async () => {
    const result = await ALL_TOOLS.human_escalation.execute({ reason: "Customer demands agent" });
    expect(result.success).toBe(true);
    expect(result.isEscalated).toBe(true);
    expect(result.ticketCode).toMatch(/^TK-\d{4}$/);
  });
});

describe("SupportPilot NLP & Multilingual Engine", () => {
  it("should detect Hinglish language and order tracking intent", () => {
    const res = detectLanguageAndSentiment("Mera order #ORD-8921 kahan hai?");
    expect(res.language).toBe("hinglish");
    expect(res.intent).toBe("track_order");
    expect(res.detectedOrderNumber).toBe("ORD-8921");
  });

  it("should detect Frustrated sentiment on angry keywords", () => {
    const res = detectLanguageAndSentiment("This is worst service! Cancel my order immediately!");
    expect(res.sentiment).toBe("Frustrated");
  });
});
