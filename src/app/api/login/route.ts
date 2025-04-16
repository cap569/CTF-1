import connectDB from "@/lib/mongoose";
import { UserValidators } from "@/models/users";
import { NextResponse } from "next/server";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getUserBySlug } from "@/lib/db/user";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const bodyParser = z
      .object({
        username: UserValidators.username,
        password: UserValidators.password,
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
    const { username, password } = bodyParser.data;

    const user = await getUserBySlug(username);

    if (!user)
      return NextResponse.json(
        { error: "Credenciais invalidas" },
        { status: 400 }
      );

    if (!bcrypt.compareSync(password, user.password))
      return NextResponse.json(
        { error: "Credenciais invalidas" },
        { status: 400 }
      );

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
        username: user.username,
      },
      process.env.JWT_KEY as string
    );

    const cookieStore = cookies();
    (await cookieStore).set("token", token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      sameSite: "strict",
      path: "/",
    });

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
