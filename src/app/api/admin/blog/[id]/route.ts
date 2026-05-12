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

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { author: { select: { email: true } } },
  });

  if (!post) {
    return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
  }

  return NextResponse.json(post);
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

  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      image: body.image ?? null,
      published: body.published,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  await prisma.post.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}