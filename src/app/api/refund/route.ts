import connectDB from "@/lib/mongoose";
import User from "@/models/users";
import { NextResponse } from "next/server";
import z from "zod";
import validateJwt from "@/lib/validateJwt";
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

    const user = await User.findById(data.id);
    if (!user)
      return NextResponse.json(
        {
          error: "Unauthenticated",
        },
        { status: 403 }
      );

    await connectDB();
    const purchase = await Purchase.findById(bodyParser.data.id);
    if (!purchase) {
      return NextResponse.json(
        {
          error: "Não foi possivel encontrar essa compra",
        },
        { status: 404 }
      );
    }

    await Purchase.deleteOne({
      _id: bodyParser.data.id,
    });

    await User.updateOne(
      {
        _id: data.id,
      },
      { $inc: { balance: purchase.price } }
    );

    return NextResponse.json({
      ok: true,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Oops... Something went wrong. Try again later.",
      },
      { status: 500 }
    );
  }
}
