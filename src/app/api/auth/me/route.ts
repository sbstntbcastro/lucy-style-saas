// src/app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { getTokenFromRequest, verifyJwt } from "@/lib/auth";
export const runtime = "experimental-edge";
import prisma from "@/lib/prisma";



export async function GET(request: Request) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const decoded = verifyJwt(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: "Error de servidor" }, { status: 500 });
  }
}
