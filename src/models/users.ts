import options from "@/securityOptions";
import mongoose from "mongoose";
import z from "zod";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  balance: { type: Number, default: 5 },
  description: {
    type: String,
    default: "Adicione uma descrição maneira ao editar seu perfil!",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export const UserValidators = {
  username: z
    .string({
      message: "Username deve ser uma string",
      required_error: "Faltando Username",
    })
    .min(3, "Username deve ter no mínimo 3 caracteres")
    .regex(/^[A-Za-z-]+$/, "Username deve conter apenas letras e hífen")
    .max(
      options.maxUsernameLength,
      `Username deve ter no maximo ${options.maxUsernameLength} caracteres`
    ),
  password: z
    .string({
      message: "Password deve ser uma string",
      required_error: "Faltando password",
    })
    .min(3, "A senha deve ter no mínimo 3 caracteres")
    .max(
      options.maxPasswordLength,
      `A senha deve ter no máximo ${options.maxPasswordLength} `
    ),
  email: z
    .string({
      message: "Email deve ser uma string",
      required_error: "Faltando Email",
    })
    .email({ message: "Email deve ser um email... q q vc tava pensando?" })
    .max(
      options.maxEmailLength,
      `Email deve ter no máximo ${options.maxEmailLength} caracteres`
    ),
  description: z
    .string({
      message: "Description deve ser uma string",
      required_error: "Description password",
    })
    .regex(/^[^\\\"`<>]+$/, 'Descrição não pode ter \\, ", <, > ')
    .max(
      options.maxDescriptionLength,
      `Description deve ter no máximo ${options.maxDescriptionLength} `
    ),
  balance: z
    .number({
      message: "balance deve ser um numero",
      required_error: "Faltando balance",
    })
    .min(0, "Balance deve ser maior ou igual a 0")
    .max(1000000, `Balance deve ser no máximo 1.000.000`),
  role: z.enum(["user", "admin"], {
    message: "Role é user ou admin",
    required_error: "Faltando Role",
  }),
  id: z.string({
    message: "Id deve ser uma string",
    required_error: "Faltando Id",
  }),
};

export default User;
