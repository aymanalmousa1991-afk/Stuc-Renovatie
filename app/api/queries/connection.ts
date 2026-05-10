import { connectMongoDB } from "./mongo-connection";

export async function getDb() {
  await connectMongoDB();
  return { isConnected: true };
}

// For backwards compatibility
export { connectMongoDB } from "./mongo-connection";
