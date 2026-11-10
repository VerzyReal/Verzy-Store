import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.AUTH_SECRET || "verzy-super-secure-secret-key-32chars-min!";
const ENCODED_SECRET = new TextEncoder().encode(SECRET_KEY);
const AUTH_COOKIE_NAME = "verzy_auth_token";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lindungi semua rute /dashboard/*
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const { payload } = await jwtVerify(token, ENCODED_SECRET);
      if (payload.role !== "admin") {
        // User biasa tidak diizinkan membuka dashboard admin
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("error", "forbidden");
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
