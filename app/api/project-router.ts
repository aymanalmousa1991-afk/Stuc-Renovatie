import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import {
  findProjects,
  findProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "./queries/projects";

export const projectRouter = createRouter({
  list: publicQuery.query(async () => {
    return findProjects();
  }),

  getById: publicQuery
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return findProjectById(input.id);
    }),

  create: adminQuery
    .input(
      z.object({
        title: z.string().min(1),
        category: z.string().min(1),
        description: z.string().optional(),
        image: z.string().optional(),
        amenities: z.string().optional(),
        status: z.enum(["active", "draft", "archived"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      return createProject(input);
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        category: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        amenities: z.string().optional(),
        status: z.enum(["active", "draft", "archived"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return updateProject(id, data);
    }),

  delete: adminQuery
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return deleteProject(input.id);
    }),
});
