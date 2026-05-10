import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
  lastSignInAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    password: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    lastSignInAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
