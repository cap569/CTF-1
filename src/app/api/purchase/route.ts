import connectDB from "@/lib/mongoose";
import User from "@/models/users";
import { NextResponse } from "next/server";
import z from "zod";
import validateJwt from "@/lib/validateJwt";
import Game from "@/models/games";
import mongoose from "mongoose";
import Purchase from "@/models/purchase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const bodyParser = z
      .object({
        id: z.string({
          required_error: "ID faltando",
          invalid_type_error: "ID deve ser uma string",
        }),
      })
      .safeParse(body);

    if (bodyParser.error) {
      return NextResponse.json(
        {
          error: bodyParser.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const data = await validateJwt();
    if (!data)
      return NextResponse.json(
        {
          error: "Unauthenticated",
        },
        { status: 403 }
      );

    await connectDB();
    const session = await mongoose.startSession();

    try {
      return await session.withTransaction(async () => {
        const user = await User.findById(data.id);
        if (!user)
          return NextResponse.json(
            {
              error: "Unauthenticated",
            },
            { status: 403 }
          );

        const game = await Game.findById(bodyParser.data.id);
        if (!game)
          return NextResponse.json(
            {
              error: "Não foi posivel encontrar esse jogo",
            },
            { status: 404 }
          );

        const discount = (game.price * game.activePromo) / 100;
        const gamePrice = game.price - discount;

        const purchase = await Purchase.findOne({
          game: game._id,
          user: user._id,
        });

        if (purchase) {
          return NextResponse.json(
            {
              error: "Você já tem esse jogo",
            },
            { status: 403 }
          );
        }

        if (user.balance < gamePrice) {
          return NextResponse.json(
            {
              error: "Saldo Insuficiente",
            },
            { status: 403 }
          );
        }

        user.balance -= gamePrice;
        await user.save({ session });

        const newPurchase = new Purchase({
          price: gamePrice,
          user: user._id,
          game: game._id,
          hash: `${user._id.toString()}${game._id.toString()}`,
        });
        await newPurchase.save();

        return NextResponse.json({ ok: true });
      });
    } catch {
      return NextResponse.json(
        {
          error: "Não foi possivel concluir a compra...",
        },
        { status: 500 }
      );
    } finally {
      await session.endSession();
    }
  } catch {
    return NextResponse.json(
      {
        error: "Oops... Something went wrong. Try again later.",
      },
      { status: 500 }
    );
  }
}
