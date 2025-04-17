import User from "@/models/users";
import connectDB from "../mongoose";
import options from "@/securityOptions";

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

export async function getUsersCount() {
  await connectDB();
  return await User.countDocuments();
}

export async function listUsers(page: number) {
  const pageNumber = page > 0 ? page : 1;
  const pageSize = options.paginationSize;
  const skip = (pageNumber - 1) * pageSize;
  await connectDB();
  const users = await User.find({}).skip(skip).limit(pageSize).exec();
  return users.map((info) => {
    info.id = info._id.toString();
    return info as UserInterface;
  });
}
