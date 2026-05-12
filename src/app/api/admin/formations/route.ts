import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session");
}

export async function GET() {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formations = await prisma.formation.findMany({
    include: { category: true, subcategory: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(formations);
}

export async function POST(req: Request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();

  const formation = await prisma.formation.create({
    data: {
      title: body.title,
      slug: body.slug,
      description: body.description,
      objectives: body.objectives ?? null,
      program: body.program ?? null,
      prerequisites: body.prerequisites ?? null,
      strengths: body.strengths ?? null,
      forWho: body.forWho ?? null,
      trainers: body.trainers ?? null,
      certifications: body.certifications ?? null,
      image: body.image ?? null,
      modalities: body.modalities ?? null,
      badges: body.badges ?? null,
      duration: body.duration,
      level: body.level,
      price: body.price,
      gradient: body.gradient,
      tags: body.tags,
      published: body.published ?? false,
      categoryId: body.categoryId,
      subcategoryId: body.subcategoryId ?? null,
    },
  });

  return NextResponse.json(formation);
}