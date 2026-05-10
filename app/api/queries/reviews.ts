import { Review } from "../models/Review";
import type { IReview } from "../models/Review";
export async function findReviews(): Promise<IReview[]> {
  return Review.find().sort({ createdAt: -1 }).lean() as Promise<IReview[]>;
}

export async function findReviewById(id: string): Promise<IReview | null> {
  return Review.findById(id).lean() as Promise<IReview | null>;
}

export async function createReview(data: {
  name: string;
  location?: string;
  quote: string;
  rating?: number;
  status?: "active" | "draft" | "archived";
}): Promise<IReview> {
  const review = await Review.create(data);
  return review.toObject();
}
export async function updateReview(
  id: string,
  data: {
    name?: string;
    location?: string;
    quote?: string;
    rating?: number;
    status?: "active" | "draft" | "archived";
  }
): Promise<IReview | null> {
  return Review.findByIdAndUpdate(id, { $set: data }, { new: true }).lean() as Promise<IReview | null>;
}

export async function deleteReview(id: string): Promise<IReview | null> {
  return Review.findByIdAndDelete(id).lean() as Promise<IReview | null>;
}

