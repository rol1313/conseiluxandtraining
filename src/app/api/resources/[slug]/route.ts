import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const resource = await prisma.resource.findUnique({
      where: { slug, published: true },
      include: { author: { select: { email: true } } },
    });

    if (!resource) {
      return NextResponse.json({ error: "Ressource introuvable" }, { status: 404 });
    }

    return NextResponse.json(resource);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}