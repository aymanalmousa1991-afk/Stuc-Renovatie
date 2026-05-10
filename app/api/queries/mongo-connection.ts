import mongoose from "mongoose";
import { env } from "../lib/env";

const MONGODB_URI = env.mongodbUri;

let isConnected = false;

export async function connectMongoDB(): Promise<void> {
  if (isConnected) {
    return;
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "stuc-renovatie", // Nieuwe database naam voor deze website
    });
    isConnected = true;
    console.log("[mongo] Connected to MongoDB - database: stuc-renovatie");
  } catch (error) {
    console.error("[mongo] Failed to connect to MongoDB:", error);
    throw error;
  }
}

export function getMongoDB() {
  return mongoose.connection;
}
