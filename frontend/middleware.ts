import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuth = !!token;
  const { pathname } = req.nextUrl;

  // Define public routes that don't require auth
  const isPublic =
    pathname.startsWith("/home") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/jackhigh_logo_tiny.png") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/uikit") ||
    pathname.startsWith("/public");

  if (!isAuth && !isPublic) {
    console.log("Unauthorized access attempt to:", pathname);
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|jackhigh_logo_tiny.png|auth|api).*)"],
};
