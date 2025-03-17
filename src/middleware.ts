import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  if (
    (pathname === "/" || pathname.startsWith("/profile") || pathname.startsWith("/notes") || pathname.startsWith("/createNote")) &&
    !accessToken
  ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (
    (pathname === "/auth/login" || pathname === "/auth/signup") &&
    accessToken
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/", "/createNote/:path*", "/auth/login", "/auth/signup"],
};
