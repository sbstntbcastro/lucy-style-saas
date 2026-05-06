import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth";

export const runtime = "experimental-edge";


export async function POST() {
  const response = NextResponse.json({ success: true });
  // Invalidate cookie by setting Max-Age=0
  response.headers.append("Set-Cookie", clearAuthCookie());
  return response;
}
