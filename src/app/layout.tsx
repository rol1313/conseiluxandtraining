import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";

export const metadata: Metadata = {
  title: "Conseilux Training and Development | Formations Professionnelles Personnalisées",
  description:
    "Conseilux Training and Development offre des formations professionnelles personnalisées pour booster les compétences et la performance en entreprise. Humain. IA. RSE.",
  icons: {
    icon: "/favico.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
