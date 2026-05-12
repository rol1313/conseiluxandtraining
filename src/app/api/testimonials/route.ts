import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, role, company, content, rating } = await req.json();

    if (!name || !content) {
      return NextResponse.json(
        { error: "Nom et avis requis" },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role: role ?? null,
        company: company ?? null,
        content,
        rating: Number(rating) || 5,
        published: false, // En attente de validation admin
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}