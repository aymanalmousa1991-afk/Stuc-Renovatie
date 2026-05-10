import { User } from "../models/User";
import type { IUser } from "../models/User";
export async function findUserByEmail(email: string): Promise<IUser | null> {
  return User.findOne({ email }).lean() as Promise<IUser | null>;
}

export async function findUserById(id: string): Promise<IUser | null> {
  return User.findById(id).lean() as Promise<IUser | null>;
}

export async function createUser(data: {
  email: string;
  name?: string;
  password: string;
  role?: "user" | "admin";
}): Promise<IUser> {
  const user = await User.create(data);
  return user.toObject();
}

export async function findAllUsers(): Promise<IUser[]> {
  return User.find().sort({ createdAt: -1 }).lean() as Promise<IUser[]>;
}

