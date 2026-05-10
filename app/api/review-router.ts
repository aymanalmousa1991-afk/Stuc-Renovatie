import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import {
  findReviews,
  findReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "./queries/reviews";

export const reviewRouter = createRouter({
  list: publicQuery.query(async () => {
    return findReviews();
  }),

  getById: publicQuery
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return findReviewById(input.id);
    }),

  create: adminQuery
    .input(
      z.object({
        name: z.string().min(1),
        location: z.string().optional(),
        quote: z.string().min(1),
        rating: z.number().min(1).max(5).optional(),
        status: z.enum(["active", "draft", "archived"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      return createReview(input);
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        location: z.string().optional(),
        quote: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        status: z.enum(["active", "draft", "archived"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return updateReview(id, data);
    }),

  delete: adminQuery
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return deleteReview(input.id);
    }),
});
