import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export interface jwtPayload {
  id: string;
  isAdmin: boolean;
  username: string;
}

const validateJwt = async (): Promise<jwtPayload | null> => {
  const cookieStore = await cookies();
  try {
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_KEY as string) as jwtPayload;
  } catch {
    return null;
  }
};

export default validateJwt;
