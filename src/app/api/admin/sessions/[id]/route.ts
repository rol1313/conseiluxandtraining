import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session");
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

  const session = await prisma.session.update({
    where: { id: Number(id) },
    data: {
      title: body.title,
      description: body.description ?? null,
      startDate: new Date(body.startDate),
      endDate: body.endDate ? new Date(body.endDate) : null,
      mode: body.mode,
      location: body.location ?? null,
      duration: body.duration ?? null,
      price: body.price ?? null,
      slug: body.slug,
      published: body.published,
      gradient: body.gradient,
    },
  });

  return NextResponse.json(session);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  await prisma.session.delete({ where: { id: Number(id) } });

  return NextResponse.json({ success: true });
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  const session = await prisma.session.findUnique({
    where: { id: Number(id) },
  });

  if (!session) {
    return NextResponse.json({ error: "Session introuvable" }, { status: 404 });
  }

  return NextResponse.json(session);
}