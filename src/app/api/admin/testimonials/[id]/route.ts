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

  const testimonial = await prisma.testimonial.update({
    where: { id: Number(id) },
    data: {
      name: body.name,
      role: body.role ?? null,
      company: body.company ?? null,
      content: body.content,
      rating: Number(body.rating),
      published: body.published,
    },
  });

  return NextResponse.json(testimonial);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  await prisma.testimonial.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}