import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session");
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  const formation = await prisma.formation.findUnique({
    where: { id: Number(id) },
    include: { category: true, subcategory: true },
  });

  if (!formation) {
    return NextResponse.json({ error: "Formation introuvable" }, { status: 404 });
  }

  return NextResponse.json(formation);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const formation = await prisma.formation.update({
    where: { id: Number(id) },
    data: {
      title: body.title,
      slug: body.slug,
      description: body.description,
      objectives: body.objectives,
      program: body.program,
      prerequisites: body.prerequisites,
      strengths: body.strengths,
      forWho: body.forWho,
      trainers: body.trainers,
      certifications: body.certifications,
      image: body.image,
      modalities: body.modalities,
      badges: body.badges,
      duration: body.duration,
      level: body.level,
      price: body.price,
      gradient: body.gradient,
      tags: body.tags,
      published: body.published,
      categoryId: body.categoryId,
      subcategoryId: body.subcategoryId,
    },
  });

  return NextResponse.json(formation);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  await prisma.formation.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}