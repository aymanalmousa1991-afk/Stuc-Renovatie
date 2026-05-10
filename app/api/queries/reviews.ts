import { Review } from "../models/Review";

export async function findReviews(): Promise<any[]> {
  const reviews = await Review.find().sort({ createdAt: -1 });
  return reviews.map(r => r.toJSON());
}

export async function findReviewById(id: string): Promise<any> {
  const review = await Review.findById(id);
  return review ? review.toJSON() : null;
}

export async function createReview(data: {
  name: string;
  location?: string;
  quote: string;
  rating?: number;
  status?: "active" | "draft" | "archived";
}): Promise<any> {
  const review = await Review.create(data);
  return review.toJSON();
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
): Promise<any> {
  const review = await Review.findByIdAndUpdate(id, { $set: data }, { new: true });
  return review ? review.toJSON() : null;
}

export async function deleteReview(id: string): Promise<any> {
  const review = await Review.findByIdAndDelete(id);
  return review ? review.toJSON() : null;
}
