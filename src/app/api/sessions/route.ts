import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sessions = await prisma.session.findMany({
      where: {
        published: true,
        startDate: { gte: new Date() },
      },
      orderBy: { startDate: "asc" },
      take: 5,
    });
    return NextResponse.json(sessions);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}