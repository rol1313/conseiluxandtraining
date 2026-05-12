import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, phone, company, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: "ssl0.ovh.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    await transporter.sendMail({
      from: `"Conseilux Training" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `[Contact] ${subject} - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1a6e; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Nouveau message de contact</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 140px; font-size: 14px;">Prénom</td>
                <td style="padding: 8px 0; font-weight: bold; color: #333; font-size: 14px;">${firstName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 14px;">Nom</td>
                <td style="padding: 8px 0; font-weight: bold; color: #333; font-size: 14px;">${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 14px;">Email</td>
                <td style="padding: 8px 0; font-weight: bold; color: #1a1a6e; font-size: 14px;">
                  <a href="mailto:${email}" style="color: #1a1a6e;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 14px;">Téléphone</td>
                <td style="padding: 8px 0; font-weight: bold; color: #333; font-size: 14px;">${phone}</td>
              </tr>` : ""}
              ${company ? `
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 14px;">Entreprise</td>
                <td style="padding: 8px 0; font-weight: bold; color: #333; font-size: 14px;">${company}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 14px;">Sujet</td>
                <td style="padding: 8px 0; font-weight: bold; color: #333; font-size: 14px;">${subject}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid #f97316;">
              <p style="color: #666; font-size: 13px; margin: 0 0 8px 0;">Message :</p>
              <p style="color: #333; font-size: 14px; margin: 0; white-space: pre-line;">${message}</p>
            </div>

            <p style="color: #999; font-size: 12px; margin-top: 20px; text-align: center;">
              Ce message a été envoyé depuis le formulaire de contact de conseiluxtraining.com
            </p>
          </div>
        </div>
      `,
    });

    // Email de confirmation à l'expéditeur
    await transporter.sendMail({
      from: `"Conseilux Training" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Nous avons bien reçu votre message - Conseilux Training",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1a6e; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Conseilux Training & Development</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5;">
            <p style="color: #333; font-size: 15px;">Bonjour <strong>${firstName}</strong>,</p>
            <p style="color: #555; font-size: 14px; line-height: 1.6;">
              Merci pour votre message. Nous avons bien reçu votre demande et notre équipe vous répondra dans les plus brefs délais.
            </p>
            <p style="color: #555; font-size: 14px; line-height: 1.6;">
              En attendant, n'hésitez pas à consulter notre catalogue de formations sur notre site.
            </p>
            <div style="text-align: center; margin: 24px 0;">
              <a href="https://conseiluxtraining.com/formations"
                style="background: #f97316; color: white; padding: 12px 24px; border-radius: 24px; text-decoration: none; font-weight: bold; font-size: 14px;">
                Voir nos formations
              </a>
            </div>
            <p style="color: #999; font-size: 13px; margin-top: 20px;">
              Cordialement,<br/>
              <strong>L'équipe Conseilux Training & Development</strong><br/>
              contact@conseiluxtraining.com
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
  }
}