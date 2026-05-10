import mongoose, { Schema, Document } from "mongoose";

export interface IQuoteRequest extends Document {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  message?: string;
  images?: string;
  status: "new" | "in_progress" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const QuoteRequestSchema = new Schema<IQuoteRequest>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    serviceType: { type: String, required: true },
    message: { type: String },
    images: { type: String },
    status: {
      type: String,
      enum: ["new", "in_progress", "completed", "cancelled"],
      default: "new",
    },
  },
  { timestamps: true }
);

export const QuoteRequest = mongoose.model<IQuoteRequest>(
  "QuoteRequest",
  QuoteRequestSchema
);
