import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const session = await prisma.session.findUnique({
      where: { slug, published: true },
    });

    if (!session) {
      return NextResponse.json({ error: "Session introuvable" }, { status: 404 });
    }

    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}