export type SentimentType = "Positive" | "Neutral" | "Negative" | "Frustrated" | "Urgent";

export interface NLPAnalysisResult {
  language: string; // "hi" | "hinglish" | "en" | "ta" | "te" | "mr" | "bn"
  languageName: string;
  sentiment: SentimentType;
  intent: "track_order" | "return_item" | "refund_query" | "product_recommendation" | "faq_query" | "human_escalation" | "general";
  detectedOrderNumber?: string;
  detectedBudget?: number;
}

// Language detection patterns for Indian languages
export function detectLanguageAndSentiment(userText: string): NLPAnalysisResult {
  const text = userText.toLowerCase();

  // 1. Language Detection
  let language = "en";
  let languageName = "English";

  if (/[\u0900-\u097F]/.test(userText)) {
    language = "hi";
    languageName = "Hindi (हिंदी)";
  } else if (/[\u0B80-\u0BFF]/.test(userText)) {
    language = "ta";
    languageName = "Tamil (தமிழ்)";
  } else if (/[\u0C00-\u0C7F]/.test(userText)) {
    language = "te";
    languageName = "Telugu (తెలుగు)";
  } else if (
    /\b(mera|meri|kahan|kab|hoga|karna|karne|chahiye|hai|nahi|mil|rha|rhi|batao|karo|bhai|dobara|de do|rakho|dhanyawad|shukriya)\b/.test(
      text
    )
  ) {
    language = "hinglish";
    languageName = "Hinglish";
  }

  // 2. Sentiment Detection
  let sentiment: SentimentType = "Neutral";

  const angryWords = ["worst", "scam", "fraud", "bekaar", "useless", "bakwas", "cheated", "lawsuit", "consumer court", "angry", "terrible", "horrible", "hate", "disgusted"];
  const urgentWords = ["urgent", "immediately", "jaldi", "asap", "right now", "today itself", "emergency", "help fast"];
  const happyWords = ["thank you", "thanks", "awesome", "great", "excellent", "bohot badiya", "shukriya", "dhanyawad", "good service", "love it"];

  if (angryWords.some((w) => text.includes(w))) {
    sentiment = "Frustrated";
  } else if (urgentWords.some((w) => text.includes(w))) {
    sentiment = "Urgent";
  } else if (happyWords.some((w) => text.includes(w))) {
    sentiment = "Positive";
  }

  // 3. Intent Detection
  let intent: NLPAnalysisResult["intent"] = "general";

  if (/\b(track|where is|kahan|kab aayega|status|location|shipment|courier|delhivery|bluedart)\b/.test(text)) {
    intent = "track_order";
  } else if (/\b(return|wapas|replace|exchange|defective|damaged|shoe return|wrong size)\b/.test(text)) {
    intent = "return_item";
  } else if (/\b(refund|money back|paisa|bank|upi refund|gpay refund)\b/.test(text)) {
    intent = "refund_query";
  } else if (/\b(suggest|recommend|best|under|cheap|earphones|smartwatch|shoes|price)\b/.test(text)) {
    intent = "product_recommendation";
  } else if (/\b(agent|human|representative|executive|call me|support team|manager)\b/.test(text)) {
    intent = "human_escalation";
  } else if (/\b(policy|warranty|cancel|invoice|address|faq|how to)\b/.test(text)) {
    intent = "faq_query";
  }

  // 4. Extract Order Numbers e.g. ORD-8921 or 8921
  const orderMatch = userText.match(/\b(ORD-\d{4}|\d{4})\b/i);
  const detectedOrderNumber = orderMatch ? (orderMatch[0].startsWith("ORD-") ? orderMatch[0].toUpperCase() : `ORD-${orderMatch[0]}`) : undefined;

  // 5. Extract Budget in ₹ e.g. under 3000, Rs 2500, ₹1500
  const budgetMatch = text.match(/(?:under|below|rs|inr|₹)\s*(\d{3,6})/i) || text.match(/(\d{3,6})\s*(?:rs|inr|rupees|₹)/i);
  const detectedBudget = budgetMatch ? parseInt(budgetMatch[1], 10) : undefined;

  return {
    language,
    languageName,
    sentiment,
    intent,
    detectedOrderNumber,
    detectedBudget,
  };
}

export function generateConversationSummary(messages: { sender: string; content: string }[]): string {
  if (messages.length === 0) return "No conversation history.";
  const customerMsgs = messages.filter((m) => m.sender === "user").map((m) => m.content).slice(-3);
  return `Customer asked: "${customerMsgs.join(" | ")}". Issue processed with automated tool execution.`;
}
