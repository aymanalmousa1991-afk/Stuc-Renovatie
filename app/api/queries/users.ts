import { User } from "../models/User";
import type { IUser } from "../models/User";

export async function findUserByEmail(email: string): Promise<any> {
  const user = await User.findOne({ email });
  return user ? user.toJSON() : null;
}

export async function findUserById(id: string): Promise<any> {
  const user = await User.findById(id);
  return user ? user.toJSON() : null;
}

export async function createUser(data: {
  email: string;
  name?: string;
  password: string;
  role?: "user" | "admin";
}): Promise<any> {
  const user = await User.create(data);
  return user.toJSON();
}

export async function findAllUsers(): Promise<any[]> {
  const users = await User.find().sort({ createdAt: -1 });
  return users.map(u => u.toJSON());
}
