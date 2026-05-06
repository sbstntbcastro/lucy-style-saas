import { NextResponse } from "next/server";
import { getTokenFromRequest, verifyJwt } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import axios from "axios";

export const runtime = "edge";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function POST(request: Request) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    const decoded = verifyJwt(token);

    const { message } = await request.json();
    if (!message) return NextResponse.json({ error: "Mensaje requerido" }, { status: 400 });

    // Guardar mensaje del usuario
    await prisma.chatMessage.create({
      data: {
        userId: decoded.userId,
        role: "USER",
        content: message,
      },
    });

    // Llamada a Gemini
    const response = await axios.post(GEMINI_URL, {
      contents: [{
        parts: [{ text: `Eres Lucy, una asesora de imagen experta. Responde de forma elegante y profesional: ${message}` }]
      }]
    });

    const aiResponse = response.data.candidates[0].content.parts[0].text;

    // Guardar respuesta de la IA
    await prisma.chatMessage.create({
      data: {
        userId: decoded.userId,
        role: "ASSISTANT",
        content: aiResponse,
      },
    });

    return NextResponse.json({ response: aiResponse });
  } catch (error: any) {
    console.error("Chat Error:", error.response?.data || error.message);
    return NextResponse.json({ error: "Error en el chat de IA" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    const decoded = verifyJwt(token);

    const messages = await prisma.chatMessage.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener historial" }, { status: 500 });
  }
}
