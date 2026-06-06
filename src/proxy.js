import { NextResponse } from "next/server";

export function proxy(req) {
  const token =
    req.cookies.get("mdp_token")?.value;

  const pathname =
    req.nextUrl.pathname;

  const protectedRoutes =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/onboarding");

  if (protectedRoutes && !token) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
  ],
};