import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");
  const excludeSlug = searchParams.get("exclude");

  try {
    const formations = await prisma.formation.findMany({
      where: {
        published: true,
        categoryId: Number(categoryId),
        NOT: { slug: excludeSlug ?? "" },
      },
      include: { category: true },
      take: 3,
    });

    return NextResponse.json(formations);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}