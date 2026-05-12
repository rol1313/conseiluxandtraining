"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, SearchCode, LayoutGrid } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

const solutions = [
  {
    icon: Users,
    title: "COACHING",
    color: "purple",
    description: (
      <>
        Nos{" "}
        <span className="text-orange-500 underline font-medium">solutions de coaching</span>{" "}
        visent à vous offrir des accompagnements personnalisés pour dépasser vos défis,
        développer vos compétences et renforcer la dynamique collective. Qu'il s'agisse
        d'une intervention rapide pour une problématique précise ou d'un accompagnement
        sur le long terme, nous vous aidons à exploiter pleinement votre potentiel
        professionnel.
      </>
    ),
    href: "/coaching",
  },
  {
    icon: SearchCode,
    title: "DIAGNOSTICS",
    color: "orange",
    description:
      "Nos diagnostics permettent d'analyser vos enjeux stratégiques et organisationnels pour construire des solutions adaptées. De la transformation digitale à l'évaluation des opportunités RH et IA, en passant par les enjeux écologiques, nous vous fournissons des outils concrets pour prendre les meilleures décisions.",
    href: "/diagnostics",
  },
  {
    icon: LayoutGrid,
    title: "À LA CARTE",
    color: "purple",
    description:
      "Adaptez vos formations à vos besoins avec nos solutions à la carte. Webinaires, capsules e-learning, séminaires ou encore team building : des formats flexibles et engageants pour stimuler, fédérer et accompagner vos équipes à chaque étape de leur développement.",
    href: "/a-la-carte",
  },
];

export default function NosSolutionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── HERO ── */}
      <section className="max-w-10xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-sm">
          {/* Image */}
          <div className="relative h-72 lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
              alt="Nos Solutions"
              className="w-full h-full object-cover"
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
              Accueil &nbsp;&gt;&nbsp; Nos Solutions
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-purple-900 font-montserrat underline">
              Nos Solutions
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="max-w-10xl mx-auto px-4 py-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-gray-700 leading-relaxed text-base"
        >
          Chez Conseilux Training and Development, nous accompagnons les professionnels et les entreprises dans leur
          montée en compétences grâce à une gamme de solutions personnalisées. Que ce soit pour
          un besoin de coaching ciblé, une analyse précise via nos diagnostics, ou des solutions
          à la carte flexibles et innovantes, nos approches sont conçues pour répondre à vos
          défis en alliant efficacité, engagement et résultats durables.
        </motion.p>
      </section>

      {/* ── 3 CARTES ── */}
      <section className="max-w-10xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-xl border-2 p-8 flex flex-col items-center text-center bg-white ${
                sol.color === "orange" ? "border-orange-500" : "border-purple-700"
              }`}
            >
              {/* Icône */}
              <div
                className={`mb-6 ${
                  sol.color === "orange" ? "text-orange-500" : "text-purple-700"
                }`}
              >
                <sol.icon className="w-14 h-14" strokeWidth={1.2} />
              </div>

              {/* Titre */}
              <h3
                className={`text-lg font-bold tracking-wide mb-5 font-montserrat ${
                  sol.color === "orange" ? "text-orange-500" : "text-purple-800"
                }`}
              >
                {sol.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                {sol.description}
              </p>

              {/* Bouton */}
              <Link
                href={sol.href}
                className="mt-8 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium text-sm transition-all duration-300 hover:scale-105"
              >
                En savoir plus
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
<NewsletterSection />
      <Footer />
    </main>
  );
}