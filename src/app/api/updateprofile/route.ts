import connectDB from "@/lib/mongoose";
import User, { UserValidators } from "@/models/users";
import { NextResponse } from "next/server";
import z from "zod";
import validateJwt from "@/lib/validateJwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = await validateJwt();
    if (!data)
      return NextResponse.json(
        {
          error: "Unauthenticated",
        },
        { status: 403 }
      );

    const bodyParser = z
      .object({
        description: UserValidators.description,
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

    await connectDB();
    const { description } = bodyParser.data;
    await User.updateOne({ _id: data.id }, { $set: { description } });

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
