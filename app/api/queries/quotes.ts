import { QuoteRequest } from "../models/QuoteRequest";
import type { IQuoteRequest } from "../models/QuoteRequest";

export async function findQuoteRequests(): Promise<IQuoteRequest[]> {
  return QuoteRequest.find().sort({ createdAt: -1 }).lean() as Promise<IQuoteRequest[]>;
}

export async function findQuoteRequestById(id: string): Promise<IQuoteRequest | null> {
  return QuoteRequest.findById(id).lean() as Promise<IQuoteRequest | null>;
}
export async function createQuoteRequest(data: {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  message?: string;
  images?: string;
}): Promise<IQuoteRequest> {
  const quote = await QuoteRequest.create(data);
  return quote.toObject();
}
export async function updateQuoteRequest(
  id: string,
  data: {
    name?: string;
    phone?: string;
    email?: string;
    serviceType?: string;
    message?: string;
    images?: string;
    status?: "new" | "in_progress" | "completed" | "cancelled";
  }
): Promise<IQuoteRequest | null> {
  return QuoteRequest.findByIdAndUpdate(id, { $set: data }, { new: true }).lean() as Promise<IQuoteRequest | null>;
}

export async function deleteQuoteRequest(id: string): Promise<IQuoteRequest | null> {
  return QuoteRequest.findByIdAndDelete(id).lean() as Promise<IQuoteRequest | null>;
}

