import { Project } from "../models/Project";
import type { IProject } from "../models/Project";
export async function findProjects(): Promise<IProject[]> {
  return Project.find().sort({ createdAt: -1 }).lean() as Promise<IProject[]>;
}

export async function findProjectById(id: string): Promise<IProject | null> {
  return Project.findById(id).lean() as Promise<IProject | null>;
}

export async function createProject(data: {
  title: string;
  category: string;
  description?: string;
  image?: string;
  amenities?: string;
  status?: "active" | "draft" | "archived";
}): Promise<IProject> {
  const project = await Project.create(data);
  return project.toObject();
}
export async function updateProject(
  id: string,
  data: {
    title?: string;
    category?: string;
    description?: string;
    image?: string;
    amenities?: string;
    status?: "active" | "draft" | "archived";
  }
): Promise<IProject | null> {
  return Project.findByIdAndUpdate(id, { $set: data }, { new: true }).lean() as Promise<IProject | null>;
}

export async function deleteProject(id: string): Promise<IProject | null> {
  return Project.findByIdAndDelete(id).lean() as Promise<IProject | null>;
}

