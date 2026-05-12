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

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(testimonials);
}