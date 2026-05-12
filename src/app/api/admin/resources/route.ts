import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session");
}

async function getAdminId() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session ? Number(session.value) : null;
}

export async function GET(req: Request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const resources = await prisma.resource.findMany({
    where: type ? { type: type as any } : {},
    include: { author: { select: { email: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(resources);
}

export async function POST(req: Request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const adminId = await getAdminId();
  if (!adminId) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();

  const resource = await prisma.resource.create({
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
      published: body.published ?? false,
      authorId: adminId,
    },
  });

  return NextResponse.json(resource);
}