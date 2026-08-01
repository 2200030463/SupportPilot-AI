import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFAQ extends Document {
  question: string;
  answer: string;
  category: "Shipping & Delivery" | "Returns & Exchanges" | "Refunds & UPI" | "Product & Warranty" | "Account & Orders";
  language: "en" | "hi" | "ta" | "te" | "mr" | "bn";
  tags: string[];
  helpfulCount: number;
  unhelpfulCount: number;
  createdAt: Date;
}

const FAQSchema: Schema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: {
      type: String,
      enum: ["Shipping & Delivery", "Returns & Exchanges", "Refunds & UPI", "Product & Warranty", "Account & Orders"],
      required: true,
    },
    language: { type: String, default: "en" },
    tags: [{ type: String }],
    helpfulCount: { type: Number, default: 0 },
    unhelpfulCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const FAQ: Model<IFAQ> =
  mongoose.models.FAQ || mongoose.model<IFAQ>("FAQ", FAQSchema);
