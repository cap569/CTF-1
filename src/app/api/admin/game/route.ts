import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import z from "zod";
import Game, { GameValidators } from "@/models/games";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const bodyParser = z.object(GameValidators).safeParse(body);

    if (bodyParser.error) {
      return NextResponse.json(
        {
          error: bodyParser.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const data = bodyParser.data;

    await connectDB();
    const newGame = new Game({
      name: data.name,
      slug: data.slug.toLowerCase(),
      photoUrl: data.photoUrl,
      price: data.price,
      description: data.description,
      activePromo: data.activePromo,
    });
    await newGame.save();

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error: "Oops... Something went wrong. Try again later.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const bodyParser = z
      .object({
        ...GameValidators,
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

    const data = bodyParser.data;

    await connectDB();
    await Game.updateOne(
      { _id: data.id },
      {
        $set: {
          name: data.name,
          slug: data.slug.toLowerCase(),
          photoUrl: data.photoUrl,
          price: data.price,
          description: data.description,
          activePromo: data.activePromo,
        },
      }
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error: "Oops... Something went wrong. Try again later.",
      },
      { status: 500 }
    );
  }
}
