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

export async function GET() {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const posts = await prisma.post.findMany({
    include: { author: { select: { email: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
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

  const post = await prisma.post.create({
    data: {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      image: body.image ?? null,
      published: body.published ?? false,
      authorId: adminId,
    },
  });

  return NextResponse.json(post);
}