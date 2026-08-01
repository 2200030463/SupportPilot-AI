import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITicketResponse {
  sender: "customer" | "agent" | "ai";
  senderName: string;
  message: string;
  timestamp: string;
}

export interface ITicket extends Document {
  ticketCode: string; // e.g. TK-1082
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  subject: string;
  category: "Order Delay" | "Return Request" | "Refund Issue" | "Defective Product" | "Payment Failure" | "General Enquiry";
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Open" | "In Progress" | "Pending Customer" | "Resolved" | "Escalated";
  sentiment: "Positive" | "Neutral" | "Negative" | "Frustrated" | "Urgent";
  assignedAgent?: string;
  conversationSummary: string;
  responses: ITicketResponse[];
  resolutionNotes?: string;
  createdAt: Date;
}

const TicketResponseSchema = new Schema({
  sender: { type: String, enum: ["customer", "agent", "ai"], required: true },
  senderName: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: String, required: true },
});

const TicketSchema: Schema = new Schema(
  {
    ticketCode: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    subject: { type: String, required: true },
    category: {
      type: String,
      enum: ["Order Delay", "Return Request", "Refund Issue", "Defective Product", "Payment Failure", "General Enquiry"],
      required: true,
    },
    priority: { type: String, enum: ["Low", "Medium", "High", "Urgent"], default: "Medium" },
    status: { type: String, enum: ["Open", "In Progress", "Pending Customer", "Resolved", "Escalated"], default: "Open" },
    sentiment: { type: String, enum: ["Positive", "Neutral", "Negative", "Frustrated", "Urgent"], default: "Neutral" },
    assignedAgent: { type: String, default: "Support Agent" },
    conversationSummary: { type: String, default: "" },
    responses: [TicketResponseSchema],
    resolutionNotes: { type: String },
  },
  { timestamps: true }
);

export const Ticket: Model<ITicket> =
  mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", TicketSchema);
