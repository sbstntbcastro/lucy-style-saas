import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, signJwt, createAuthCookie } from "@/lib/auth";
export const runtime = "edge";



export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: hashed },
    });

    const token = signJwt({ userId: user.id });
    const response = NextResponse.json({ id: user.id, email: user.email });
    response.headers.append("Set-Cookie", createAuthCookie(token));
    return response;
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
