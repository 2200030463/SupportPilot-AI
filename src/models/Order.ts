import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  priceInINR: number;
  image?: string;
}

export interface ITrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

export interface IOrder extends Document {
  orderNumber: string; // e.g. ORD-8921
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  items: IOrderItem[];
  totalAmountInINR: number;
  paymentMethod: "UPI" | "COD" | "Credit Card" | "Net Banking";
  status: "Processing" | "Shipped" | "In Transit" | "Out for Delivery" | "Delivered" | "Cancelled" | "Returned";
  courierName: "Delhivery" | "BlueDart" | "Xpressbees" | "Ecom Express" | "Shadowfax";
  trackingNumber: string; // AWB-9821381
  estimatedDelivery: string;
  shippingAddress: string;
  trackingTimeline: ITrackingEvent[];
  returnEligibleUntil: string;
  isReturnRequested: boolean;
  refundStatus?: "Not Initiated" | "Processing" | "Completed" | "Failed";
  createdAt: Date;
}

const OrderItemSchema = new Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  priceInINR: { type: Number, required: true },
  image: { type: String },
});

const TrackingEventSchema = new Schema({
  status: { type: String, required: true },
  location: { type: String, required: true },
  timestamp: { type: String, required: true },
  description: { type: String, required: true },
});

const OrderSchema: Schema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerName: { type: String, required: true },
    items: [OrderItemSchema],
    totalAmountInINR: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["UPI", "COD", "Credit Card", "Net Banking"], default: "UPI" },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "In Transit", "Out for Delivery", "Delivered", "Cancelled", "Returned"],
      default: "Processing",
    },
    courierName: { type: String, default: "Delhivery" },
    trackingNumber: { type: String, required: true },
    estimatedDelivery: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    trackingTimeline: [TrackingEventSchema],
    returnEligibleUntil: { type: String, required: true },
    isReturnRequested: { type: Boolean, default: false },
    refundStatus: { type: String, enum: ["Not Initiated", "Processing", "Completed", "Failed"], default: "Not Initiated" },
  },
  { timestamps: true }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
