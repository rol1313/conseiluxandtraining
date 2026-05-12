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

  const resource = await prisma.resource.findUnique({
    where: { id: Number(id) },
  });

  if (!resource) {
    return NextResponse.json({ error: "Ressource introuvable" }, { status: 404 });
  }

  return NextResponse.json(resource);
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

  const resource = await prisma.resource.update({
    where: { id: Number(id) },
    data: {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt ?? null,
      content: body.content ?? null,
      image: body.image ?? null,
      type: body.type,
      date: body.date ? new Date(body.date) : null,
      duration: body.duration ?? null,
      speaker: body.speaker ?? null,
      link: body.link ?? null,
      published: body.published,
    },
  });

  return NextResponse.json(resource);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  await prisma.resource.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}