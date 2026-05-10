import "dotenv/config";

function getVal(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

export const env = {
  appSecret: getVal("APP_SECRET", "dev-secret-key-change-in-production-123456"),
  isProduction: process.env.NODE_ENV === "production",
  mongodbUri: getVal("MONGODB_URI", ""),
};
