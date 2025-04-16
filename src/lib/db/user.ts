import User from "@/models/users";
import connectDB from "../mongoose";

export interface UserInterface {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  balance: number;
  description: string;
  id: string;
}

export async function getUserById(id: string): Promise<UserInterface | null> {
  await connectDB();
  const user = await User.findById(id);
  if (!user) return null;
  user.id = user._id.toString();
  return user as UserInterface;
}

export async function getUserBySlug(
  slug: string
): Promise<UserInterface | null> {
  await connectDB();
  const user = await User.findOne({ username: slug.toLowerCase() });
  if (!user) return null;
  user.id = user._id.toString();
  return user as UserInterface;
}
