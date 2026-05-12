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

  const sessions = await prisma.session.findMany({
    orderBy: { startDate: "asc" },
  });

  return NextResponse.json(sessions);
}

export async function POST(req: Request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();

  const session = await prisma.session.create({
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
      published: body.published ?? false,
      gradient: body.gradient ?? "from-primary to-primary-dark",
    },
  });

  return NextResponse.json(session);
}