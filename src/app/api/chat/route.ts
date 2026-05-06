import { NextResponse } from "next/server";
import { getTokenFromRequest, verifyJwt } from "@/lib/auth";
import prisma from "@/lib/prisma";
export const runtime = "experimental-edge";



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

    // Llamada a OpenRouter
    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openrouter/auto",
        messages: [
          { role: "system", content: "Eres un asesor de imagen profesional." },
          { role: "user", content: message }
        ],
      }),
    });

    if (!openRouterResponse.ok) {
      const errorData = await openRouterResponse.json();
      throw new Error(errorData.error?.message || "Error al llamar a OpenRouter");
    }

    const data = await openRouterResponse.json();
    const aiResponse = data.choices[0].message.content;

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
    console.error("Chat Error:", error.message);
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
