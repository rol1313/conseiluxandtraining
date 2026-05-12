"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Handshake, Users, BookOpen, Monitor } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

const features = [
  {
    icon: Handshake,
    color: "orange",
    title: "LE FORMATEUR QUI VOUS RESSEMBLE",
    description: (
      <>
        Nous ne choisissons pas les{" "}
        <span className="text-orange-500 font-medium">formateurs</span> par hasard….
        le feeling et les aspirations comptent aussi ! Notre procédé « profiling and matching »
        permet de proposer des formateurs experts dans le domaine de l'apprenant avec des
        centres intérêts communs.
      </>
    ),
  },
  {
    icon: Users,
    color: "purple",
    title: "LE LEARNING PARTNER, VOTRE ALLIÉ POUR RÉUSSIR !",
    description:
      "En plus d'un formateur, chaque apprenant bénéficie d'un accompagnement privilégié de la part d'un learning partner, motivant et opérationnel. Il saura écouter et comprendre ses souhaits et le rassurer dans les moments plus compliqués.",
  },
  {
    icon: Users,
    color: "orange",
    title: "DES MODALITÉS À LA CARTE",
    description:
      "Certains collaborateurs sont plus performants avec un apprentissage en mode visuel, tandis que d'autres sont plus à l'aise avec le mode auditif… Parce que chacun est différent, nous proposons des parcours blended (visio, téléphone, face à face…) pour répondre aux préférences individuelles, toujours conseillé par un expert.",
  },
  {
    icon: Monitor,
    color: "purple",
    title: "DES MÉTHODES D'APPRENTISSAGE AU CŒUR DU QUOTIDIEN",
    description:
      "Pour une immersion optimale, le formateur travaille sur les outils/supports de l'apprenant dès que cela est pertinent. Progressive et rigoureuse, notre méthodologie d'apprentissage se passe en deux phases ; une phase d'acquisition et une de transfert. À chaque séance, un travail est demandé dans le cadre de la pédagogie inversée. Une démarche spécifique est mise en place pour les membres de la direction afin de s'adapter à leurs problématiques.",
  },
];

export default function SurMesurePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── HERO : image gauche + carte droite ── */}
      <section className="max-w-10xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-sm">
          {/* Image */}
          <div className="relative h-72 lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
              alt="Hyperpersonnalisation"
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
            {/* Breadcrumb */}
            <p className="text-sm text-gray-500 mb-4">
              Accueil &nbsp;&gt;&nbsp; Hyperpersonnalisation
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-purple-900 font-montserrat">
              Hyperpersonnalisation
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION : Titre + intro ── */}
      <section className="max-w-10xl mx-auto px-4 py-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-2xl font-bold text-center mb-6 font-montserrat"
        >
          <span className="text-orange-500">Hyperpersonnalisation : pas de « prêt-à-former » </span>
          <span className="text-purple-900">chez Conseilux Training and Development</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-700 leading-relaxed text-base"
        >
          Pour que chacun bénéficie de son propre programme,{" "}
          <span className="text-orange-500 font-medium">Conseilux Training and Development</span> pratique le sur-mesure.
          Toutes nos demandes de formation sont étudiées pour répondre aux profils, enjeux et objectifs
          de chaque collaborateur, et ce dans toutes leurs composantes.
        </motion.p>
      </section>

      {/* ── SECTION : Liste des features ── */}
      <section className="max-w-10xl mx-auto px-4 pb-12">
        <div className="space-y-10">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-6"
            >
              {/* Icône */}
              <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
                <feature.icon
                  className={`w-10 h-10 ${
                    feature.color === "orange" ? "text-orange-500" : "text-purple-700"
                  }`}
                  strokeWidth={1.3}
                />
              </div>

              {/* Texte */}
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SECTION : Et pour les entreprises ? ── */}
      <section className="max-w-10xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-purple-900 font-montserrat mb-5">
            Et pour les entreprises ?
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
            Le sur-mesure se conjugue aussi pour votre entreprise. Nous sommes à vos côtés pour définir
            vos attentes, comprendre le contexte dans lequel votre entreprise évolue et évaluer les
            possibilités de financement. In fine, nous définissons, ensemble, le parcours et les formateurs
            qui correspondent à votre secteur d'activité.
            <br />
            Mieux : nous vous aidons à « embarquer » l'ensemble de vos collaborateurs afin qu'ils adhèrent
            au projet de formation.
          </p>
        </motion.div>
      </section>
<NewsletterSection />
      <Footer />
    </main>
  );
}