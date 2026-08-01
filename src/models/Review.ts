import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  customerName: string;
  rating: number; // 1 to 5
  feedback: string;
  csatCategory: "Excellent" | "Good" | "Average" | "Poor";
  resolvedByAI: boolean;
  ticketCode?: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    customerName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    feedback: { type: String, required: true },
    csatCategory: { type: String, enum: ["Excellent", "Good", "Average", "Poor"], default: "Excellent" },
    resolvedByAI: { type: Boolean, default: true },
    ticketCode: { type: String },
  },
  { timestamps: true }
);

export const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
