import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  sku: string;
  name: string;
  category: "Electronics" | "Footwear" | "Fashion" | "Home & Kitchen" | "Beauty & Personal Care" | "Fitness";
  priceInINR: number;
  originalPriceInINR: number;
  rating: number;
  reviewCount: number;
  stockQuantity: number;
  inStock: boolean;
  brand: string;
  description: string;
  specifications: Record<string, string>;
  image: string;
  returnPolicyDays: number;
  isPopular: boolean;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["Electronics", "Footwear", "Fashion", "Home & Kitchen", "Beauty & Personal Care", "Fitness"],
      required: true,
    },
    priceInINR: { type: Number, required: true },
    originalPriceInINR: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 120 },
    stockQuantity: { type: Number, default: 50 },
    inStock: { type: Boolean, default: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    specifications: { type: Map, of: String },
    image: { type: String, required: true },
    returnPolicyDays: { type: Number, default: 7 },
    isPopular: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
