import options from "@/securityOptions";
import mongoose from "mongoose";
import z from "zod";

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  photoUrl: { type: String, require: true }, // USE ONLY IMGUR IMAGES.
  price: { type: Number, default: 5 },
  description: { type: String, default: "" },
  activePromo: { type: Number, default: 0 }, // in percentage goes from 0 to 100.
});

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

export const GameValidators = {
  name: z
    .string({
      message: "Name deve ser uma string",
      required_error: "Faltando Name",
    })
    .min(3, "Name deve ter no mínimo 3 caracteres")
    .max(
      options.maxGameTitle,
      `Nome deve ter no maximo ${options.maxGameTitle} caracteres`
    ),
  slug: z
    .string({
      message: "Slug deve ser uma string",
      required_error: "Faltando Slug",
    })
    .min(3, "Slug deve ter no mínimo 3 caracteres")
    .regex(/^[A-Za-z-]+$/, "Slug deve conter apenas letras e hífen")
    .max(
      options.maxGameTitle,
      `Slug deve ter no maximo ${options.maxGameTitle} caracteres`
    ),
  photoUrl: z
    .string({
      message: "photoUrl deve ser uma string",
      required_error: "Faltando photoUrl",
    })
    .max(
      options.maxGamePicture,
      `photoUrl deve ter no máximo ${options.maxGamePicture} `
    ),
  description: z
    .string({
      message: "Description deve ser uma string",
      required_error: "Description password",
    })
    .max(
      options.maxGameDescription,
      `Description deve ter no máximo ${options.maxGameDescription} `
    ),
  price: z
    .number({
      message: "price deve ser um numero",
      required_error: "Faltando price",
    })
    .min(1, "Price deve ser maior ou igual a 1")
    .max(1000000, `Price deve ser no máximo 1.000.000 `),
  activePromo: z
    .number({
      message: "activePromo deve ser um numero",
      required_error: "Faltando activePromo",
    })
    .min(0, "ActivePromo deve ser maior ou igual a 0")
    .max(100, `ActivePromo deve ser no máximo 100`),
};

export default Game;
