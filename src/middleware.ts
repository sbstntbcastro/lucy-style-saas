// src/middleware.ts - updated for cloudflare
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/auth";

export const runtime = "experimental-edge";


/**
 * Protect private API routes and dashboard pages.
 * Any request that starts with /api/ (except /api/auth/*) or /dashboard/*
 * must contain a valid JWT cookie named `token`.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public paths – allow without auth
  const publicPaths = ["/api/auth", "/api/auth/", "/api/auth/register", "/api/auth/login", "/api/auth/me", "/_next", "/static", "/favicon.ico"];
  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  // If user is logged in and tries to access auth pages, redirect to dashboard
  if (token && (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register") || pathname === "/")) {
    try {
      verifyJwt(token);
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch (e) {
      // Invalid token, allow access to auth pages
    }
  }

  // Routes that require authentication
  if (pathname.startsWith("/api") || pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    try {
      verifyJwt(token);
      return NextResponse.next();
    } catch (e) {
      // Invalid token – redirect to login
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
