import { Project } from "../models/Project";

export async function findProjects(): Promise<any[]> {
  const projects = await Project.find().sort({ createdAt: -1 });
  return projects.map(p => p.toJSON());
}

export async function findProjectById(id: string): Promise<any> {
  const project = await Project.findById(id);
  return project ? project.toJSON() : null;
}

export async function createProject(data: {
  title: string;
  category: string;
  description?: string;
  image?: string;
  amenities?: string;
  status?: "active" | "draft" | "archived";
}): Promise<any> {
  const project = await Project.create(data);
  return project.toJSON();
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
): Promise<any> {
  const project = await Project.findByIdAndUpdate(id, { $set: data }, { new: true });
  return project ? project.toJSON() : null;
}

export async function deleteProject(id: string): Promise<any> {
  const project = await Project.findByIdAndDelete(id);
  return project ? project.toJSON() : null;
}
