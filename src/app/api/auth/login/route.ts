import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword, signJwt, createAuthCookie } from "@/lib/auth";
export const runtime = "edge";



export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signJwt({ userId: user.id });
    const response = NextResponse.json({ id: user.id, email: user.email });
    response.headers.append("Set-Cookie", createAuthCookie(token));
    return response;
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
