import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const post = await prisma.post.findUnique({
      where: { slug, published: true },
      include: { author: { select: { email: true } } },
    });

    if (!post) {
      return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}