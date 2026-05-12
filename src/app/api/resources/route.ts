import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  try {
    const resources = await prisma.resource.findMany({
      where: {
        published: true,
        ...(type ? { type: type as any } : {}),
      },
      include: { author: { select: { email: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(resources);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}