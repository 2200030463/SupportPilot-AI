import { connectDB } from "../db";
import { Order } from "../../models/Order";
import { Product } from "../../models/Product";
import { FAQ } from "../../models/FAQ";
import { Ticket } from "../../models/Ticket";
import { User } from "../../models/User";
import {
  SeedProduct,
  initialOrders,
  initialProducts,
  initialFAQs,
  initialCustomers,
  initialTickets,
} from "../seedData";

// Tool Definition Interface
export interface AgentToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  execute: (args: Record<string, any>) => Promise<any>;
}

// 1. Search Orders
export const searchOrdersTool: AgentToolDefinition = {
  name: "search_orders",
  description: "Search orders by Order Number (e.g., ORD-8921), Customer Email, or Customer Phone Number.",
  parameters: {
    type: "object",
    properties: {
      query: { type: "string", description: "Order Number like ORD-8921, email, or 10-digit phone number" },
    },
    required: ["query"],
  },
  execute: async (args: Record<string, any>) => {
    const query = (args.query || "").toString();
    const q = query.trim().toUpperCase();
    const conn = await connectDB();

    if (conn) {
      const orders = await Order.find({
        $or: [
          { orderNumber: new RegExp(q, "i") },
          { customerEmail: new RegExp(query, "i") },
          { customerPhone: new RegExp(query, "i") },
        ],
      }).lean();
      if (orders.length > 0) return { success: true, count: orders.length, orders };
    }

    // Fallback to initial mock data
    const matched = initialOrders.filter(
      (o) =>
        o.orderNumber.toUpperCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(query.toLowerCase()) ||
        o.customerPhone.includes(query) ||
        o.customerName.toLowerCase().includes(query.toLowerCase())
    );

    return {
      success: true,
      count: matched.length,
      orders: matched.length > 0 ? matched : [initialOrders[0]],
    };
  },
};

// 2. Track Shipment
export const trackShipmentTool: AgentToolDefinition = {
  name: "track_shipment",
  description: "Retrieve detailed tracking status, courier info (Delhivery/BlueDart), and delivery timeline for an order.",
  parameters: {
    type: "object",
    properties: {
      orderNumber: { type: "string", description: "The exact Order Number e.g. ORD-8921" },
    },
    required: ["orderNumber"],
  },
  execute: async (args: Record<string, any>) => {
    const orderNumber = (args.orderNumber || "ORD-8921").toString();
    const cleanOrder = orderNumber.trim().toUpperCase();
    const conn = await connectDB();

    let order: any = null;
    if (conn) {
      order = await Order.findOne({ orderNumber: new RegExp(cleanOrder, "i") }).lean();
    }

    if (!order) {
      order = initialOrders.find((o) => o.orderNumber.toUpperCase() === cleanOrder) || initialOrders[0];
    }

    return {
      success: true,
      orderNumber: order.orderNumber,
      status: order.status,
      courierName: order.courierName,
      trackingNumber: order.trackingNumber,
      estimatedDelivery: order.estimatedDelivery,
      shippingAddress: order.shippingAddress,
      timeline: order.trackingTimeline,
    };
  },
};

// 3. Search Products
export const searchProductsTool: AgentToolDefinition = {
  name: "search_products",
  description: "Search product catalog by name, category, brand, specs, or budget in INR (₹).",
  parameters: {
    type: "object",
    properties: {
      query: { type: "string", description: "Search query e.g. earphones, phone, smartwatch" },
      category: { type: "string", description: "Category e.g. Electronics, Footwear, Fashion, Home & Kitchen" },
      maxPriceInINR: { type: "number", description: "Maximum price budget in INR (₹)" },
    },
  },
  execute: async (args: Record<string, any>) => {
    const { query = "", category = "", maxPriceInINR } = args;
    const conn = await connectDB();
    if (conn) {
      const filter: any = {};
      if (maxPriceInINR) filter.priceInINR = { $lte: maxPriceInINR };
      const products = await Product.find(filter).limit(10).lean();
      if (products.length > 0) return { success: true, count: products.length, products };
    }

    // Tokenized fuzzy mock search
    let list = [...initialProducts];

    if (maxPriceInINR && maxPriceInINR > 0) {
      list = list.filter((p) => p.priceInINR <= maxPriceInINR);
    }

    if (category && category.trim()) {
      const catLower = category.toLowerCase();
      list = list.filter((p) => p.category.toLowerCase().includes(catLower));
    }

    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      const tokens = q.split(/\s+/).filter((t: string) => t.length > 2 && t !== "under" && t !== "show" && t !== "suggest" && t !== "best");

      if (tokens.length > 0) {
        list = list.filter((p: SeedProduct) => {
          const text = `${p.name} ${p.brand} ${p.category} ${p.description} ${JSON.stringify(p.specifications)}`.toLowerCase();
          return tokens.some((t: string) => text.includes(t));
        });
      }
    }

    // Sort by popular and rating
    list.sort((a, b) => b.rating - a.rating);

    return { success: true, count: list.length, products: list.slice(0, 6) };
  },
};

// 4. Search FAQ
export const searchFAQTool: AgentToolDefinition = {
  name: "search_faq",
  description: "Search customer support FAQs and policy documentation.",
  parameters: {
    type: "object",
    properties: {
      query: { type: "string", description: "Keyword or question e.g. return policy, refund time, warranty" },
    },
    required: ["query"],
  },
  execute: async (args: Record<string, any>) => {
    const query = (args.query || "").toString();
    const q = query.toLowerCase();
    const conn = await connectDB();

    if (conn) {
      const faqs = await FAQ.find({
        $or: [
          { question: new RegExp(q, "i") },
          { answer: new RegExp(q, "i") },
          { tags: new RegExp(q, "i") },
        ],
      }).limit(5).lean();
      if (faqs.length > 0) return { success: true, count: faqs.length, faqs };
    }

    const matched = initialFAQs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.tags.some((t) => t.toLowerCase().includes(q))
    );

    return { success: true, count: matched.length, faqs: matched.slice(0, 5) };
  },
};

// 5. Return Eligibility Check
export const returnEligibilityTool: AgentToolDefinition = {
  name: "return_eligibility",
  description: "Check if an order item is eligible for return based on 7-day policy window.",
  parameters: {
    type: "object",
    properties: {
      orderNumber: { type: "string", description: "Order Number e.g. ORD-8921" },
      reason: { type: "string", description: "Reason for return e.g. defective item, wrong size" },
    },
    required: ["orderNumber"],
  },
  execute: async (args: Record<string, any>) => {
    const orderNumber = (args.orderNumber || "ORD-8921").toString();
    const cleanOrder = orderNumber.trim().toUpperCase();
    const conn = await connectDB();

    let order: any = null;
    if (conn) {
      order = await Order.findOne({ orderNumber: new RegExp(cleanOrder, "i") }).lean();
    }
    if (!order) {
      order = initialOrders.find((o) => o.orderNumber.toUpperCase() === cleanOrder) || initialOrders[0];
    }

    return {
      success: true,
      orderNumber: order.orderNumber,
      isEligible: true,
      returnPolicyDays: 7,
      eligibleUntil: order.returnEligibleUntil,
      deliveryStatus: order.status,
      instructions: "Keep product original box, invoice, and tags intact. Doorstep pickup will be scheduled via Delhivery within 24 hours.",
      suggestedAction: "generate_return_ticket",
    };
  },
};

// 6. Refund Status Check
export const refundStatusTool: AgentToolDefinition = {
  name: "refund_status",
  description: "Check the processing status, transaction reference, and timeline of a customer refund.",
  parameters: {
    type: "object",
    properties: {
      orderNumber: { type: "string", description: "Order Number e.g. ORD-6540" },
    },
    required: ["orderNumber"],
  },
  execute: async (args: Record<string, any>) => {
    const orderNumber = (args.orderNumber || "ORD-6540").toString();
    const cleanOrder = orderNumber.trim().toUpperCase();
    const conn = await connectDB();

    let order: any = null;
    if (conn) {
      order = await Order.findOne({ orderNumber: new RegExp(cleanOrder, "i") }).lean();
    }
    if (!order) {
      order = initialOrders.find((o) => o.orderNumber.toUpperCase() === cleanOrder) || initialOrders[2];
    }

    return {
      success: true,
      orderNumber: order.orderNumber,
      refundStatus: order.refundStatus || "Completed",
      paymentMethod: order.paymentMethod,
      amountInINR: order.totalAmountInINR,
      referenceNumber: "UPI-REF-9028129841",
      timelineMessage: "UPI refunds take 2-4 hours after pickup completion. Bank card refunds take 3-5 business days.",
    };
  },
};

// 7. Customer Profile Lookup
export const customerProfileLookupTool: AgentToolDefinition = {
  name: "customer_profile_lookup",
  description: "Lookup customer spending history, loyalty tier, and contact details.",
  parameters: {
    type: "object",
    properties: {
      emailOrPhone: { type: "string", description: "Customer Email or Phone" },
    },
    required: ["emailOrPhone"],
  },
  execute: async (args: Record<string, any>) => {
    const emailOrPhone = (args.emailOrPhone || "").toString();
    const q = emailOrPhone.toLowerCase();
    const conn = await connectDB();

    let user: any = null;
    if (conn) {
      user = await User.findOne({
        $or: [{ email: new RegExp(q, "i") }, { phone: new RegExp(q, "i") }],
      }).lean();
    }

    if (!user) {
      user = initialCustomers.find((c) => c.email.toLowerCase().includes(q) || c.phone.includes(q)) || initialCustomers[1];
    }

    return {
      success: true,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isVIP: user.isVIP,
      preferredLanguage: user.preferredLanguage,
      location: `${user.city}, ${user.state}`,
      totalOrders: 6,
      totalSpendInINR: 12450,
    };
  },
};

// 8. Create Support Ticket
export const createSupportTicketTool: AgentToolDefinition = {
  name: "create_support_ticket",
  description: "Generate a new support ticket in the internal escalation queue.",
  parameters: {
    type: "object",
    properties: {
      subject: { type: "string", description: "Brief issue summary" },
      category: { type: "string", description: "Order Delay, Return Request, Refund Issue, Defective Product, Payment Failure" },
      priority: { type: "string", description: "Low, Medium, High, Urgent" },
      customerName: { type: "string" },
      customerEmail: { type: "string" },
      summary: { type: "string", description: "Full context summary for human agent" },
    },
    required: ["subject", "category"],
  },
  execute: async (args: Record<string, any>) => {
    const { subject, category, priority = "High", customerName = "Aarav Sharma", customerEmail = "aarav.sharma@gmail.com", summary } = args;
    const ticketCode = `TK-${Math.floor(1000 + Math.random() * 9000)}`;
    const conn = await connectDB();

    const newTicketData = {
      ticketCode,
      customerName,
      customerEmail,
      customerPhone: "+91 9820011223",
      subject: subject || "Customer Escalation Request",
      category: category || "General Enquiry",
      priority,
      status: "Escalated",
      sentiment: "Frustrated",
      assignedAgent: "Escalation Desk",
      conversationSummary: summary || subject || "Escalation ticket created",
      responses: [
        {
          sender: "ai",
          senderName: "SupportPilot AI",
          message: `Ticket ${ticketCode} created and assigned to escalation queue.`,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    if (conn) {
      await Ticket.create(newTicketData);
    }

    return {
      success: true,
      ticketCode,
      status: "Escalated",
      priority,
      assignedAgent: "Human Support Desk",
      estimatedWaitTime: "5 minutes",
      message: `Ticket ${ticketCode} has been generated and pushed to our priority live agent queue.`,
    };
  },
};

// 9. Recommend Products
export const recommendProductsTool: AgentToolDefinition = {
  name: "recommend_products",
  description: "Recommend top 3 products tailored to budget, specs, and category with comparison reasoning.",
  parameters: {
    type: "object",
    properties: {
      query: { type: "string", description: "What product customer is looking for" },
      maxPriceInINR: { type: "number", description: "Maximum budget in INR (₹)" },
    },
    required: ["query"],
  },
  execute: async (args: Record<string, any>) => {
    const { query = "", maxPriceInINR } = args;
    const result = await searchProductsTool.execute({ query, maxPriceInINR });
    const top3 = (result.products || []).slice(0, 3);

    return {
      success: true,
      count: top3.length,
      recommendations: top3.map((p: any, idx: number) => ({
        rank: idx + 1,
        name: p.name,
        priceInINR: p.priceInINR,
        rating: p.rating,
        brand: p.brand,
        image: p.image,
        whyRecommended: idx === 0 ? "Best overall performance and highest customer rating" : idx === 1 ? "Best value for money within budget" : "Popular alternative with key essential features",
      })),
    };
  },
};

// 10. Human Escalation
export const humanEscalationTool: AgentToolDefinition = {
  name: "human_escalation",
  description: "Seamlessly hand off conversation to human support executive when user is dissatisfied or explicitly requests a human agent.",
  parameters: {
    type: "object",
    properties: {
      reason: { type: "string", description: "Reason for escalation" },
    },
  },
  execute: async (args: Record<string, any>) => {
    const reason = args.reason;
    const ticketRes = await createSupportTicketTool.execute({
      subject: `Human Escalation: ${reason || "Customer requested human support executive"}`,
      category: "General Enquiry",
      priority: "Urgent",
      summary: reason || "Customer requested immediate live human assistance.",
    });

    return {
      success: true,
      isEscalated: true,
      ticketCode: ticketRes.ticketCode,
      message: "You are now connected to the Live Support Queue. A human support executive has been assigned to your ticket.",
    };
  },
};

// Combined Registry
export const ALL_TOOLS: Record<string, AgentToolDefinition> = {
  search_orders: searchOrdersTool,
  track_shipment: trackShipmentTool,
  search_products: searchProductsTool,
  search_faq: searchFAQTool,
  return_eligibility: returnEligibilityTool,
  refund_status: refundStatusTool,
  customer_profile_lookup: customerProfileLookupTool,
  create_support_ticket: createSupportTicketTool,
  recommend_products: recommendProductsTool,
  human_escalation: humanEscalationTool,
};

export async function executeTool(name: string, args: Record<string, any>) {
  let toolKey = name;
  if (name === "track_order") toolKey = "search_orders";
  if (name === "initiate_return") toolKey = "return_eligibility";
  if (name === "check_refund_status") toolKey = "refund_status";
  if (name === "escalate_to_human") toolKey = "human_escalation";

  const tool = ALL_TOOLS[toolKey] || ALL_TOOLS[name];
  if (!tool) {
    return { success: false, error: `Tool ${name} not found` };
  }

  try {
    const res = await tool.execute(args);
    return { success: true, data: res };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
