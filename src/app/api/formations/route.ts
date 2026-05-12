import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const formations = await prisma.formation.findMany({
      where: { published: true },
      include: {
        category: true,
        subcategory: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(formations);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des formations" },
      { status: 500 }
    );
  }
}