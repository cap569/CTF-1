import connectDB from "@/lib/mongoose";
import User, { UserValidators } from "@/models/users";
import { NextResponse } from "next/server";
import z from "zod";
import { getUserById } from "@/lib/db/user";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const bodyParser = z
      .object({
        username: UserValidators.username,
        email: UserValidators.email,
        description: UserValidators.description,
        balance: UserValidators.balance,
        role: UserValidators.role,
        id: UserValidators.id,
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

    const user = await getUserById(data.id);
    if (!user)
      return NextResponse.json(
        {
          error: "Usuário não encontrado",
        },
        { status: 404 }
      );

    await connectDB();
    await User.updateOne(
      { _id: data.id },
      {
        $set: {
          username: data.username,
          email: data.email,
          isAdmin: data.role == "admin",
          balance: data.balance,
          description: data.description,
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
