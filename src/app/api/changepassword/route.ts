import connectDB from "@/lib/mongoose";
import User, { UserValidators } from "@/models/users";
import { NextResponse } from "next/server";
import z from "zod";
import validateJwt from "@/lib/validateJwt";
import bcrypt from "bcrypt";
import { getUserById } from "@/lib/db/user";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const bodyParser = z
      .object({
        newPass: UserValidators.password,
        oldPass: UserValidators.password,
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

    const user = await getUserById(data.id);
    if (!user)
      return NextResponse.json(
        {
          error: "Unauthenticated",
        },
        { status: 403 }
      );

    await connectDB();
    const { newPass, oldPass } = bodyParser.data;
    if (bcrypt.compareSync(oldPass, user.password)) {
      await User.updateOne(
        { _id: data.id },
        {
          $set: {
            password: bcrypt.hashSync(
              newPass,
              Number(process.env.BCRYPT_SALT as string)
            ),
          },
        }
      );
    } else {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 400 });
    }

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
