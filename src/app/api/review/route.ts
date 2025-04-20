import connectDB from "@/lib/mongoose";
import User from "@/models/users";
import { NextResponse } from "next/server";
import z from "zod";
import validateJwt from "@/lib/validateJwt";
import Purchase from "@/models/purchase";
import options from "@/securityOptions";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const bodyParser = z
      .object({
        _id: z.string({
          required_error: "ID faltando",
          invalid_type_error: "ID deve ser uma string",
        }),
        stars: z
          .number({
            required_error: "Review faltando",
            invalid_type_error: "Review deve ser uma string",
          })
          .min(1, "Stars deve ser pelo menos 1")
          .max(5, "Stars deve ser no maximo 5"),
        review: z
          .string({
            required_error: "Review faltando",
            invalid_type_error: "Review deve ser uma string",
          })
          .max(
            options.maxDescriptionLength,
            `Review deve ter no maximo ${options.maxDescriptionLength} caracteres`
          ),
        // Massive Assignment Vulnerability:
        price: z.number().optional(),
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
    const purchase = await Purchase.findById(bodyParser.data._id);
    purchase.stars = bodyParser.data.stars;
    purchase.review = 5;
    if (bodyParser.data.price) purchase.price = bodyParser.data.price;

    await purchase.save();
    return NextResponse.json(purchase);
  } catch {
    return NextResponse.json(
      {
        error: "Oops... Something went wrong. Try again later.",
      },
      { status: 500 }
    );
  }
}
