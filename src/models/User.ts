import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  role: "admin" | "customer";
  preferredLanguage: string;
  isVIP: boolean;
  city: string;
  state: string;
  pincode: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
    preferredLanguage: { type: String, default: "en" },
    isVIP: { type: Boolean, default: false },
    city: { type: String, default: "Mumbai" },
    state: { type: String, default: "Maharashtra" },
    pincode: { type: String, default: "400001" },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
