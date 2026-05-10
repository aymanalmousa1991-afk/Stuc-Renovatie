import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import {
  findQuoteRequests,
  findQuoteRequestById,
  createQuoteRequest,
  updateQuoteRequest,
  deleteQuoteRequest,
} from "./queries/quotes";

export const quoteRouter = createRouter({
  list: adminQuery.query(async () => {
    return findQuoteRequests();
  }),

  getById: adminQuery
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return findQuoteRequestById(input.id);
    }),

  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1),
        phone: z.string().min(1),
        email: z.string().email(),
        serviceType: z.string().min(1),
        message: z.string().optional(),
        images: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const result = await createQuoteRequest(input);
        return result;
      } catch (err) {
        console.error("[quote.create error]", err);
        throw new Error("Offerte opslaan mislukt: " + (err instanceof Error ? err.message : String(err)));
      }
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        serviceType: z.string().optional(),
        message: z.string().optional(),
        images: z.string().optional(),
        status: z.enum(["new", "in_progress", "completed", "cancelled"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return updateQuoteRequest(id, data);
    }),

  delete: adminQuery
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return deleteQuoteRequest(input.id);
    }),
});
