import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  name: string;
  location?: string;
  quote: string;
  rating: number;
  status: "active" | "draft" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    name: { type: String, required: true },
    location: { type: String },
    quote: { type: String, required: true },
    rating: { type: Number, default: 5 },
    status: {
      type: String,
      enum: ["active", "draft", "archived"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReview>("Review", ReviewSchema);
