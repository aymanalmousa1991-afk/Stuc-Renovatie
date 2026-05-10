import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  category: string;
  description?: string;
  image?: string;
  amenities?: string;
  status: "active" | "draft" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    amenities: { type: String },
    status: {
      type: String,
      enum: ["active", "draft", "archived"],
      default: "active",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
