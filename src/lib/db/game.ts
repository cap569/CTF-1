import options from "@/securityOptions";
import connectDB from "../mongoose";
import Game from "@/models/games";

export interface GameInterface {
  name: string;
  slug: string;
  photoUrl: string;
  description: string;
  price: number;
  activePromo: number;
  id: string;
}

export async function getGameById(id: string): Promise<GameInterface | null> {
  try {
    await connectDB();
    const user = await Game.findById(id);
    if (!user) return null;
    user.id = user._id.toString();
    return user as GameInterface;
  } catch {
    return null;
  }
}

export async function getGamesCount() {
  await connectDB();
  return await Game.countDocuments();
}

export async function listGames(page: number) {
  const pageNumber = page > 0 ? page : 1;
  const pageSize = options.paginationSize;
  const skip = (pageNumber - 1) * pageSize;
  await connectDB();
  const users = await Game.find({}).skip(skip).limit(pageSize).exec();
  return users.map((info) => {
    info.id = info._id.toString();
    return info as GameInterface;
  });
}
