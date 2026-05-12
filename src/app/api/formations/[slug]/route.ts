import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const formation = await prisma.formation.findUnique({
      where: { slug, published: true },
      include: { category: true, subcategory: true },
    });

    if (!formation) {
      return NextResponse.json({ error: "Formation introuvable" }, { status: 404 });
    }

    return NextResponse.json(formation);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}