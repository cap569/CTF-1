import connectDB from "@/lib/mongoose";
import User, { UserValidators } from "@/models/users";
import { NextResponse } from "next/server";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const bodyParser = z
      .object({
        username: UserValidators.username,
        password: UserValidators.password,
        email: UserValidators.email,
        captcha: z.string({
          message: "Invalid Captcha",
          required_error: "Invalid Captcha",
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

    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY!,
          response: bodyParser.data.captcha,
        }),
      }
    );

    const verification = await verifyResponse.json();

    if (!verification.success) {
      return NextResponse.json({ error: "Captcha Inválido" }, { status: 403 });
    }

    await connectDB();
    const { username, email, password } = bodyParser.data;

    const newUser = new User({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: bcrypt.hashSync(
        password,
        Number(process.env.BCRYPT_SALT as string)
      ),
    });
    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id.toString(),
        isAdmin: false,
        username: newUser.username,
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // This catch can be either for DB unique duplicates or malformed JSON at the
    // body.
    // Instead of checking the Database multiple times for Unique user and emails
    // we can just check at the error message, it's simpler and faster.

    if (err.code && err.code === 11000) {
      if (err.keyPattern.username)
        return NextResponse.json(
          { error: "Usuário já está em uso" },
          { status: 400 }
        );
      if (err.keyPattern.email)
        return NextResponse.json(
          { error: "Email já está em uso" },
          { status: 400 }
        );
    }

    console.log(err);
    return NextResponse.json(
      {
        error: "Oops... Something went wrong. Try again later.",
      },
      { status: 500 }
    );
  }
}
