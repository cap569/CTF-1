import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_KEY as string);
    const { payload } = await jwtVerify(token.value, secret);

    const data = payload;

    if (data.isAdmin) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", request.url));
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
export const config = {
  matcher: ["/admin/:path*"],
};
