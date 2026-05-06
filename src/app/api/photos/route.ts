export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getTokenFromRequest, verifyJwt } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/cloudinary";



export async function POST(request: Request) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    const decoded = verifyJwt(token);

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Archivo no proporcionado" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const imageUrl = await uploadToCloudinary(buffer, file.name);

    const photo = await prisma.photo.create({
      data: {
        userId: decoded.userId,
        imageUrl: imageUrl,
      },
    });

    return NextResponse.json({ photo });
  } catch (error: any) {
    console.error("Upload Error:", error.message);
    return NextResponse.json({ error: "Error al subir la foto" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    const decoded = verifyJwt(token);

    const photos = await prisma.photo.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ photos });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener fotos" }, { status: 500 });
  }
}
