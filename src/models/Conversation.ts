import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage {
  id: string;
  sender: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  toolCalls?: {
    toolName: string;
    arguments: Record<string, unknown>;
    result?: unknown;
  }[];
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

export interface IConversation extends Document {
  conversationId: string;
  customerEmail: string;
  customerPhone?: string;
  title: string;
  messages: IMessage[];
  sentiment: "Positive" | "Neutral" | "Negative" | "Frustrated" | "Urgent";
  languageDetected: string;
  summary: string;
  toolsUsed: string[];
  isEscalated: boolean;
  ticketCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema({
  id: { type: String, required: true },
  sender: { type: String, enum: ["user", "assistant", "system"], required: true },
  content: { type: String, required: true },
  timestamp: { type: String, required: true },
  toolCalls: [{ type: Schema.Types.Mixed }],
  attachments: [{ type: Schema.Types.Mixed }],
});

const ConversationSchema: Schema = new Schema(
  {
    conversationId: { type: String, required: true, unique: true },
    customerEmail: { type: String, default: "guest@supportpilot.ai" },
    customerPhone: { type: String },
    title: { type: String, default: "New Support Chat" },
    messages: [MessageSchema],
    sentiment: { type: String, default: "Neutral" },
    languageDetected: { type: String, default: "en" },
    summary: { type: String, default: "" },
    toolsUsed: [{ type: String }],
    isEscalated: { type: Boolean, default: false },
    ticketCode: { type: String },
  },
  { timestamps: true }
);

export const Conversation: Model<IConversation> =
  mongoose.models.Conversation || mongoose.model<IConversation>("Conversation", ConversationSchema);
