import { QuoteRequest } from "../models/QuoteRequest";

export async function findQuoteRequests(): Promise<any[]> {
  const quotes = await QuoteRequest.find().sort({ createdAt: -1 });
  return quotes.map(q => q.toJSON());
}

export async function findQuoteRequestById(id: string): Promise<any> {
  const quote = await QuoteRequest.findById(id);
  return quote ? quote.toJSON() : null;
}

export async function createQuoteRequest(data: {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  message?: string;
  images?: string;
}): Promise<any> {
  const quote = await QuoteRequest.create(data);
  return quote.toJSON();
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
): Promise<any> {
  const quote = await QuoteRequest.findByIdAndUpdate(id, { $set: data }, { new: true });
  return quote ? quote.toJSON() : null;
}

export async function deleteQuoteRequest(id: string): Promise<any> {
  const quote = await QuoteRequest.findByIdAndDelete(id);
  return quote ? quote.toJSON() : null;
}
