import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, captchaToken } = await req.json();

    if (!email || !captchaToken) {
      return NextResponse.json(
        { error: "Email et captcha requis" },
        { status: 400 }
      );
    }

    // Vérifie le captcha
    const captchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
      }
    );

    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
      return NextResponse.json(
        { error: "Captcha invalide" },
        { status: 400 }
      );
    }

    // Envoi email de confirmation
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email à l'abonné
    await transporter.sendMail({
      from: `"Conseilux Training" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Bienvenue dans la newsletter Conseilux Training !",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1a6e; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Conseilux Training & Development</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5;">
            <p style="color: #333; font-size: 15px;">Bonjour,</p>
            <p style="color: #555; font-size: 14px; line-height: 1.6;">
              Merci de vous être inscrit à notre newsletter ! Vous recevrez désormais nos dernières actualités sur la formation professionnelle, nos webinaires, et nos offres exclusives.
            </p>
            <div style="text-align: center; margin: 24px 0;">
              <a href="https://conseiluxtraining.com/formations"
                style="background: #f97316; color: white; padding: 12px 24px; border-radius: 24px; text-decoration: none; font-weight: bold; font-size: 14px;">
                Découvrir nos formations
              </a>
            </div>
            <p style="color: #999; font-size: 12px; margin-top: 20px;">
              Cordialement,<br/>
              <strong>L'équipe Conseilux Training & Development</strong>
            </p>
            <p style="color: #bbb; font-size: 11px; margin-top: 16px; border-top: 1px solid #e5e5e5; padding-top: 12px;">
              Vous pouvez vous désabonner à tout moment en nous contactant à contact@conseiluxtraining.com
            </p>
          </div>
        </div>
      `,
    });

    // Notification à l'admin
    await transporter.sendMail({
      from: `"Conseilux Training" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `[Newsletter] Nouvel abonné : ${email}`,
      html: `
        <p>Un nouvel utilisateur vient de s'abonner à la newsletter :</p>
        <p><strong>${email}</strong></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}