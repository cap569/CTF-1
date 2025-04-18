import connectDB from "../mongoose";
import Purchase from "@/models/purchase";
import { UserInterface } from "./user";
import { GameInterface } from "./game";

export interface PurchaseInterface {
  price: number;
  game: string;
  user: UserInterface;
  review: string;
  stars: number;
  _id: string;
}

export async function getGameReviews(
  gameId: string
): Promise<PurchaseInterface[]> {
  try {
    await connectDB();
    const purchases = await Purchase.find({
      game: gameId,
      stars: { $ne: null },
      review: { $nin: [null, ""] },
    }).populate("user");
    return purchases.map((s) => s as PurchaseInterface);
  } catch {
    return [];
  }
}

export interface FullPurchaseInterface {
  price: number;
  game: GameInterface;
  user: UserInterface;
  review: string;
  stars: number;
  _id: string;
}

export async function getLastGameReviews(): Promise<FullPurchaseInterface[]> {
  try {
    await connectDB();
    const purchases = await Purchase.find({
      stars: { $ne: null },
      review: { $nin: [null, ""] },
    })
      .populate("user")
      .populate("game");
    return purchases.map((s) => s as FullPurchaseInterface);
  } catch {
    return [];
  }
}

export async function getUserLastReviews(
  userId: string
): Promise<FullPurchaseInterface[]> {
  try {
    await connectDB();
    const purchases = await Purchase.find({
      user: userId,
      stars: { $ne: null },
      review: { $nin: [null, ""] },
    })
      .populate("user")
      .populate("game");
    return purchases.map((s) => s as FullPurchaseInterface);
  } catch {
    return [];
  }
}
