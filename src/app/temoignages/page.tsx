"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

type Temoignage = {
  image: string;
  client: string;
  logo?: string;
  logoText?: string;
  quote?: string;
  isCasClient?: boolean;
};

const temoignages: Temoignage[] = [
  {
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    client: "Cas client : SEMMARIS (complet)",
    logoText: "Rungis Marché International",
    isCasClient: true,
  },
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    client: "eres",
    logoText: "eres.",
    quote:
      "Nous faisons principalement appel à Conseilux Training and Development pour les formations en soft skills, car c'est un domaine où leur proposition se distingue par une qualité particulièrement élevée.",
  },
  {
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
    client: "PUIG",
    logoText: "PUIG",
    quote:
      "Nous avons un partenariat très positif avec Conseilux Training and Development : simple, fluide, et marqué par une grande réactivité de vos équipes.",
  },
  {
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
    client: "CIS Bio International",
    logoText: "CURIUM",
    quote:
      "Les retours ont été très positifs. Les collaborateurs sont spontanément venus à mon bureau pour me faire un feedback de leur expérience. J'ai aussi été agréablement surprise d'apprendre que les collaborateurs en discutaient entre eux. Sans le savoir, ils en ont fait la promotion en interne.",
  },
  {
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&q=80",
    client: "France Scellés",
    logoText: "France Scellés",
    quote:
      "Je recommande Conseilux Training and Development sans hesitation ! Pour la qualité des intervenants, l'accompagnement humain, la souplesse du format et surtout la capacité de Conseilux Training and Development à s'adapter aux besoins concrets des TPE/PME, ce qui est rare et précieux.",
  },
  {
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80",
    client: "Randstad",
    logoText: "randstad",
    quote:
      "Conseilux Training and Development se distingue par sa capacité à proposer des formations sur mesure, son suivi rigoureux des participants, la qualité pédagogique de ses formateurs ainsi que par une approche humaine et bienveillante. Leur flexibilité et leur adaptabilité sont également des atouts majeurs.",
  },
];

function TemoignageCard({ t, i }: { t: Temoignage; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.08 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="h-52 overflow-hidden">
        <img
          src={t.image}
          alt={t.client}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Corps de la carte */}
      <div className="p-6 flex flex-col flex-1">
        {/* Client + Logo */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-purple-900 text-base font-montserrat leading-snug">
            {t.client}
          </h3>
          {t.logoText && (
            <span className="text-gray-500 text-sm font-semibold ml-3 shrink-0">
              {t.logoText}
            </span>
          )}
        </div>

        {/* Guillemets */}
        <div className="text-purple-900 text-3xl font-serif leading-none mb-3 select-none">
          ❝❝
        </div>

        {/* Citation */}
        {t.quote && (
          <p className="text-gray-700 text-sm leading-relaxed">
            {t.quote.split("soft skills").map((part, k, arr) =>
              k < arr.length - 1 ? (
                <span key={k}>
                  {part}
                  <strong>soft skills</strong>
                </span>
              ) : (
                <span key={k}>{part}</span>
              )
            )}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function TemoignagesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── HERO ── */}
      <section className="max-w-10xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-sm">
          {/* Image */}
          <div className="relative h-72 lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80"
              alt="Témoignages clients"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Carte texte */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="border-2 border-purple-700 rounded-r-xl p-10 flex flex-col justify-center bg-white"
          >
            <p className="text-sm text-gray-500 mb-4">
              Accueil &nbsp;&gt;&nbsp; Témoignages clients
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-purple-900 font-montserrat">
              Témoignages clients
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── GRILLE TÉMOIGNAGES ── */}
      <section className="max-w-10xl mx-auto px-4 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-2xl font-bold text-purple-900 font-montserrat mb-8"
        >
          Ils ont aimé notre démarche
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {temoignages.map((t, i) => (
            <TemoignageCard key={t.client} t={t} i={i} />
          ))}
        </div>
      </section>
<NewsletterSection />
      <Footer />
    </main>
  );
}