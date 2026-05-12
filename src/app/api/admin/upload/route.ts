import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session");
}

export async function POST(req: Request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier" }, { status: 400 });
    }

    // Vérifie le type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Fichier non valide" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Génère un nom unique
    const ext = "webp";
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Crée le dossier si nécessaire
    await mkdir(uploadDir, { recursive: true });

    // Optimise et sauvegarde avec sharp
    await sharp(buffer)
      .resize(1200, 800, { fit: "cover" })
      .webp({ quality: 85 })
      .toFile(path.join(uploadDir, filename));

    const url = `/uploads/${filename}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Erreur upload" }, { status: 500 });
  }
}