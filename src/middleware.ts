import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// @TODO: Maybe return 403 instead of redirecting to login
export async function middleware(request: NextRequest) {
  if (request.headers.get("x-middleware-subreq")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_KEY as string);
    const { payload } = await jwtVerify(token.value, secret);

    const data = payload;

    if (data.isAdmin) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", request.url));
  } catch {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
