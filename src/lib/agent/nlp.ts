export type IntentType =
  | "ORDER_TRACKING"
  | "RETURN_EXCHANGE"
  | "REFUND_STATUS"
  | "PRODUCT_RECOMMENDATION"
  | "FAQ_SEARCH"
  | "HUMAN_ESCALATION"
  | "GREETINGS"
  | "SMALL_TALK"
  | "UNKNOWN";

export interface ConversationContext {
  lastOrderNumber?: string;
  lastCategory?: string;
  lastProductQuery?: string;
  lastMaxPrice?: number;
  lastRefundId?: string;
  lastReturnId?: string;
  lastFAQTopic?: string;
}

export interface IntentResult {
  intent: IntentType;
  confidence: number;
  entities: {
    orderId?: string;
    category?: string;
    maxPrice?: number;
    searchQuery?: string;
    reason?: string;
    urgency?: string;
  };
}

// 1. Multilingual Language Detector
export function detectLanguage(text: string): { language: string; confidence: number } {
  const lower = text.toLowerCase();

  const hinglishPatterns = ["kya", "mera", "kahan", "hai", "kaise", "chahiye", "batao", "kab", "aayega", "dijiye", "karo", "mujhe", "baat"];
  if (hinglishPatterns.some((p) => lower.includes(p))) {
    return { language: "Hinglish (Hindi+English)", confidence: 0.92 };
  }

  if (/[\u0900-\u097F]/.test(text)) return { language: "Hindi (हिंदी)", confidence: 0.98 };
  if (/[\u0B80-\u0BFF]/.test(text)) return { language: "Tamil (தமிழ்)", confidence: 0.98 };
  if (/[\u0C00-\u0C7F]/.test(text)) return { language: "Telugu (తెలుగు)", confidence: 0.98 };
  if (/[\u0980-\u09FF]/.test(text)) return { language: "Bengali (বাংলা)", confidence: 0.98 };
  if (/[\u0C80-\u0CFF]/.test(text)) return { language: "Kannada (ಕನ್ನಡ)", confidence: 0.98 };
  if (/[\u0A80-\u0AFF]/.test(text)) return { language: "Gujarati (ગુજરાતી)", confidence: 0.98 };

  return { language: "English", confidence: 0.95 };
}

// 2. Entity Extractor
export function extractEntities(query: string, context?: ConversationContext) {
  const lower = query.toLowerCase();

  const orderIdMatch = query.match(/ORD-?\d{3,6}/i);
  let orderId = orderIdMatch ? orderIdMatch[0].toUpperCase().replace(/^ORD-?/, "ORD-") : undefined;

  if (!orderId && context?.lastOrderNumber) {
    if (
      lower.includes("where is it") ||
      lower.includes("track it") ||
      lower.includes("status of it") ||
      lower.includes("has it shipped") ||
      lower.includes("delivery status")
    ) {
      orderId = context.lastOrderNumber;
    }
  }

  let maxPrice: number | undefined = undefined;
  const priceMatch = lower.match(/(?:under|below|less than|within|around|\u20B9|rs\.?|inr)\s*(\d{1,6})\s*k?/i) ||
                     lower.match(/(\d{1,6})\s*k?\s*(?:rupees|rs|\u20B9)/i);

  if (priceMatch) {
    let num = parseInt(priceMatch[1], 10);
    if (lower.includes(`${num}k`)) num *= 1000;
    maxPrice = num;
  }

  if (lower.includes("cheaper") || lower.includes("cheapest") || lower.includes("budget")) {
    if (context?.lastMaxPrice) {
      maxPrice = Math.round(context.lastMaxPrice * 0.7);
    }
  }

  let category: string | undefined = undefined;
  if (lower.includes("earphone") || lower.includes("earbuds") || lower.includes("headphone") || lower.includes("airpods")) {
    category = "Audio";
  } else if (lower.includes("phone") || lower.includes("mobile") || lower.includes("smartphone")) {
    category = "Mobiles";
  } else if (lower.includes("laptop") || lower.includes("macbook") || lower.includes("notebook")) {
    category = "Laptops";
  } else if (lower.includes("watch") || lower.includes("smartwatch") || lower.includes("fitness band")) {
    category = "Wearables";
  } else if (lower.includes("mouse") || lower.includes("keyboard") || lower.includes("gaming")) {
    category = "Accessories";
  } else if (context?.lastCategory && (lower.includes("cheaper") || lower.includes("more") || lower.includes("suggest") || lower.includes("show"))) {
    category = context.lastCategory;
  }

  return { orderId, category, maxPrice };
}

// 3. Hybrid Multi-Intent Classifier
export function classifyIntents(query: string, context?: ConversationContext): IntentResult[] {
  const lower = query.toLowerCase().trim();
  const results: IntentResult[] = [];

  const subQueries = lower.split(/\b(?:and|also|plus|along with)\b/i);

  for (const sub of subQueries) {
    const trimmed = sub.trim();
    if (!trimmed) continue;

    const subEntities = extractEntities(trimmed, context);
    const singleIntent = classifySingleIntent(trimmed, subEntities, context);
    if (!results.some((r) => r.intent === singleIntent.intent)) {
      results.push(singleIntent);
    }
  }

  return results.length > 0 ? results : [classifySingleIntent(lower, extractEntities(lower, context), context)];
}

function classifySingleIntent(
  query: string,
  entities: ReturnType<typeof extractEntities>,
  context?: ConversationContext
): IntentResult {
  const lower = query.toLowerCase().trim();

  // A. GREETINGS
  if (/^(hi|hello|hey|greetings|namaste|good morning|good afternoon|good evening)$/i.test(lower) ||
      lower.includes("hi supportpilot") || lower.includes("hello agent") || lower.includes("hey supportpilot")) {
    return {
      intent: "GREETINGS",
      confidence: 0.98,
      entities,
    };
  }

  // B. SMALL TALK
  if (/^(thank you|thanks|thanks a lot|nice work|who are you|what can you do|who made you)$/i.test(lower) ||
      lower.includes("thank you") || lower.includes("who are you") || lower.includes("what can you do") || lower.includes("thanks a lot")) {
    return {
      intent: "SMALL_TALK",
      confidence: 0.95,
      entities,
    };
  }

  // C. HUMAN ESCALATION
  if (
    lower.includes("talk to human") ||
    lower.includes("connect customer executive") ||
    lower.includes("connect to agent") ||
    lower.includes("need support agent") ||
    lower.includes("file complaint") ||
    lower.includes("human support") ||
    lower.includes("customer executive") ||
    (lower.includes("customer care") && !lower.includes("working hours")) ||
    lower.includes("representative") ||
    lower.includes("baat karo") ||
    lower.includes("manager") ||
    lower.includes("formal complaint")
  ) {
    return {
      intent: "HUMAN_ESCALATION",
      confidence: 0.96,
      entities,
    };
  }

  // D. RETURN & EXCHANGE
  if (
    lower.includes("return") ||
    lower.includes("replace") ||
    lower.includes("exchange") ||
    lower.includes("return policy") ||
    lower.includes("eligible for return") ||
    lower.includes("replace my") ||
    lower.includes("want to return") ||
    lower.includes("karna hai") ||
    lower.includes("replacement") ||
    lower.includes("return duration")
  ) {
    return {
      intent: "RETURN_EXCHANGE",
      confidence: 0.92,
      entities,
    };
  }

  // E. FAQ SEARCH
  if (
    lower.includes("explain refund policy") ||
    lower.includes("warranty policy") ||
    lower.includes("shipping charges") ||
    lower.includes("delivery time") ||
    lower.includes("business hours") ||
    lower.includes("cancellation policy") ||
    lower.includes("cancellation duration") ||
    lower.includes("contact support") ||
    lower.includes("can i cancel") ||
    lower.includes("delivery charges") ||
    lower.includes("gst invoice") ||
    lower.includes("cod available") ||
    lower.includes("warranty") ||
    lower.includes("working hours") ||
    (lower.includes("cancellation") && !lower.includes("noise") && !lower.includes("earbuds")) ||
    (lower.includes("policy") && !lower.includes("refund status") && !lower.includes("return policy"))
  ) {
    return {
      intent: "FAQ_SEARCH",
      confidence: 0.88,
      entities,
    };
  }

  // F. REFUND STATUS
  if (
    lower.includes("refund") ||
    lower.includes("payment failed") ||
    lower.includes("money not received") ||
    lower.includes("upi refund") ||
    lower.includes("when will i get my refund") ||
    lower.includes("my refund") ||
    lower.includes("refund status") ||
    lower.includes("money deducted") ||
    lower.includes("order failed")
  ) {
    return {
      intent: "REFUND_STATUS",
      confidence: 0.95,
      entities,
    };
  }

  // G. ORDER TRACKING
  const orderKeywords = [
    "where is my order", "track my package", "order status", "delivery status",
    "has my parcel shipped", "awb tracking", "track order", "track ord-",
    "where is my parcel", "is my package shipped", "package status", "shipment status",
    "track my order", "where is it now", "kahan hai", "where is my delivery", "tracking status", "shipment"
  ];

  const hasOrderId = !!entities.orderId;
  const isOrderQuery =
    !lower.includes("refund") &&
    !lower.includes("return") &&
    !lower.includes("replace") &&
    (orderKeywords.some((k) => lower.includes(k)) || (hasOrderId && (lower.includes("track") || lower.includes("where") || lower.includes("status") || lower.includes("arrive") || lower.includes("reached"))));

  if (isOrderQuery || (hasOrderId && !lower.includes("return") && !lower.includes("refund") && !lower.includes("replace"))) {
    return {
      intent: "ORDER_TRACKING",
      confidence: hasOrderId ? 0.98 : 0.88,
      entities,
    };
  }

  // H. PRODUCT RECOMMENDATION
  const productKeywords = [
    "suggest", "recommend", "best laptop", "best phone", "earphones", "earbuds",
    "smartwatch", "gaming mouse", "gaming keyboard", "budget", "under ₹", "under rs",
    "under 20000", "under 3000", "cheaper ones", "cheapest", "premium phones",
    "show gaming", "compare", "buying guide", "product for office", "apple", "iphone", "samsung", "dell", "hp", "lenovo", "asus", "logitech"
  ];

  const isProductQuery =
    productKeywords.some((k) => lower.includes(k)) ||
    !!entities.category ||
    !!entities.maxPrice ||
    lower.includes("phone") ||
    lower.includes("laptop") ||
    lower.includes("watch");

  if (isProductQuery) {
    return {
      intent: "PRODUCT_RECOMMENDATION",
      confidence: 0.90,
      entities,
    };
  }

  return {
    intent: "UNKNOWN",
    confidence: 0.35,
    entities,
  };
}

// 4. Sentiment Analyzer
export function analyzeSentiment(text: string): { score: number; label: "Positive" | "Neutral" | "Negative" | "Frustrated" } {
  const lower = text.toLowerCase();
  const frustratedKeywords = ["horrible", "worst", "fraud", "useless", "terrible", "scam", "angry", "cheated", "hate", "unacceptable"];
  const negativeKeywords = ["late", "delayed", "broken", "damaged", "wrong", "missing", "bad", "slow", "issue", "problem"];
  const positiveKeywords = ["great", "awesome", "good", "fast", "thanks", "thank you", "helpful", "love", "excellent"];

  if (frustratedKeywords.some((k) => lower.includes(k))) {
    return { score: -0.9, label: "Frustrated" };
  }
  if (negativeKeywords.some((k) => lower.includes(k))) {
    return { score: -0.5, label: "Negative" };
  }
  if (positiveKeywords.some((k) => lower.includes(k))) {
    return { score: 0.8, label: "Positive" };
  }

  return { score: 0.0, label: "Neutral" };
}
