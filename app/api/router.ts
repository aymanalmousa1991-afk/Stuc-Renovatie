import { authRouter } from "./auth-router";
import { projectRouter } from "./project-router";
import { reviewRouter } from "./review-router";
import { quoteRouter } from "./quote-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  project: projectRouter,
  review: reviewRouter,
  quote: quoteRouter,
});

export type AppRouter = typeof appRouter;
