"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Monitor, Users, Phone, BookOpen, UserCheck, UsersRound, Globe, Atom } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type FormatCard = {
  icon: React.ElementType;
  title: string;
  border: "purple" | "orange";
  forWhat: string[];
  forWhom: string[];
};

type Section = {
  heading: string;
  cards: FormatCard[];
};

const distanciels: FormatCard[] = [
  {
    icon: Monitor,
    title: "VISIO FORMATION (individuel)",
    border: "purple",
    forWhat: [
      "Because training in a work situation generates the best possible memory anchoring.",
      "Because exchanges are flexible.",
    ],
    forWhom: [
      "For the learner for whom saving time and being more efficient is essential.",
    ],
  },
  {
    icon: Users,
    title: "VISIO FORMATION E-WORKSHOP (collectif)",
    border: "orange",
    forWhat: [
      "Parce que cela permet de fédérer des apprenants de niveau similaire.",
      "Parce que l'interactivité entre apprenants et formateurs est assurée.",
    ],
    forWhom: [
      "Pour l'apprenant qui souhaite condenser son apprentissage.",
      "Pour l'apprenant qui souhaite travailler en conditions réelles.",
    ],
  },
  {
    icon: Phone,
    title: "TÉLÉPHONE",
    border: "purple",
    forWhat: [
      "Because the learner works in real conditions with an everyday communication tool.",
      "Because the lack of body language will challenge.",
    ],
    forWhom: [
      "For the learner who wishes to condense their learning into short sequences.",
      "For the learner who uses foreign languages on the phone.",
    ],
  },
  {
    icon: BookOpen,
    title: "E-LEARNING (individuel)",
    border: "orange",
    forWhat: [
      "Because the learner chooses the place and time of training.",
    ],
    forWhom: [
      "For the independent learner whose time is precious.",
      "For the learner who wishes to have an additional tool in addition to the course with the trainer.",
    ],
  },
];

const presentiels: FormatCard[] = [
  {
    icon: UserCheck,
    title: "FACE-À-FACE (individuel)",
    border: "purple",
    forWhat: [
      "Because flexible schedules and personalized training allow for maximum success.",
      "Because by working in real conditions, the learner improves in performance.",
    ],
    forWhom: [
      "For the learner who wishes to work in real conditions.",
    ],
  },
  {
    icon: UsersRound,
    title: "FACE-À-FACE (collectif)",
    border: "orange",
    forWhat: [
      "Because it allows knowledge to be shared on an identified need.",
      "Because it strengthens the cohesion of learners at the same level around themes, role-playing games and simulations.",
    ],
    forWhom: [
      "For the learner who wants to train quickly and efficiently.",
    ],
  },
];

type VarianteCard = {
  icon: React.ElementType;
  title: string;
  border: "purple" | "orange";
  description: string;
  note?: string;
};

const variantes: VarianteCard[] = [
  {
    icon: Globe,
    title: "IMMERSIONS",
    border: "purple",
    description:
      "Pour aller plus loin dans les parcours de formation en langues, nous proposons une immersion linguistique : nos experts sélectionnent ainsi l'école la plus adaptée au profil de l'apprenant parmi nos partenaires étrangers. L'avantage ? Partir à la rencontre d'une culture, d'une nouvelle façon de vivre et de penser et communiquer dans la langue du pays d'accueil pour enrichir son vocabulaire.",
  },
  {
    icon: Atom,
    title: "BLENDED LEARNING",
    border: "orange",
    description:
      "More broadly, we recommend opting for blended learning*, regardless of the training you're taking. It involves using multiple learning methods during a single training course. Each method feeds into the other and, for optimal support, is supported by the Conseilux Training and Development teaching teams… results guaranteed!",
    note: "*mixture of modalities.",
  },
];

function FormatCardBlock({ card, i }: { card: FormatCard; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.1 }}
      className={`rounded-xl border-2 p-8 bg-white ${
        card.border === "orange" ? "border-orange-500" : "border-purple-700"
      }`}
    >
      {/* Icône */}
      <div className="flex justify-center mb-4">
        <card.icon className="w-14 h-14 text-orange-500" strokeWidth={1.2} />
      </div>

      {/* Titre */}
      <h3 className="text-center font-bold text-purple-900 text-base font-montserrat mb-5">
        {card.title}
      </h3>

      {/* For what */}
      <p className="font-bold text-purple-900 text-sm mb-1">For what ?</p>
      <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm mb-4">
        {card.forWhat.map((item, j) => (
          <li key={j}>{item}</li>
        ))}
      </ul>

      {/* For whom */}
      <p className="font-bold text-purple-900 text-sm mb-1">For whom?</p>
      <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
        {card.forWhom.map((item, j) => (
          <li key={j}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function ModalitesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── TITRE au-dessus ── */}
      <section className="max-w-10xl mx-auto px-4 pt-10 pb-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-purple-900 font-montserrat"
        >
          Nos modalités de formation
        </motion.h1>
      </section>

      {/* ── HERO ── */}
      <section className="max-w-10xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-sm">
          <div className="relative h-72 lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80"
              alt="Nos modalités de formation"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="border-2 border-purple-700 rounded-r-xl p-10 flex flex-col justify-center bg-white"
          >
            <p className="text-sm text-gray-500 mb-4">
              Accueil &nbsp;&gt;&nbsp; Qui sommes-nous ? &nbsp;&gt;&nbsp; Nos modalités de formation
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-purple-900 font-montserrat">
              Nos modalités de formation
            </h2>
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
          At{" "}
          <span className="text-orange-500 font-medium">Conseilux Training and Development</span>
          , every step of the learning process is personalized. In the same vein, our methods
          are chosen by our learners, advised by our experts based on their aspirations and what
          best suits them. We adapt to all profiles, levels, and objectives. By phone,{" "}
          <span className="text-orange-500 font-medium underline">video</span>
          , face-to-face… having a range of methods allows us to be agile and adapt to
          everyone's schedules and constraints.
        </motion.p>
      </section>

      {/* ── FORMATS DISTANCIELS ── */}
      <section className="max-w-10xl mx-auto px-4 pb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-2xl font-bold text-purple-900 font-montserrat mb-8"
        >
          Nos formats distanciels
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {distanciels.map((card, i) => (
            <FormatCardBlock key={card.title} card={card} i={i} />
          ))}
        </div>
      </section>

      {/* ── FORMATS PRÉSENTIELS ── */}
      <section className="max-w-10xl mx-auto px-4 pb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-2xl font-bold text-purple-900 font-montserrat mb-8"
        >
          Nos formats présentiels
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {presentiels.map((card, i) => (
            <FormatCardBlock key={card.title} card={card} i={i} />
          ))}
        </div>
      </section>

      {/* ── DEUX VARIANTES ── */}
      <section className="max-w-10xl mx-auto px-4 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-2xl font-bold text-purple-900 font-montserrat mb-8"
        >
          Deux variantes pour encore plus de performance
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {variantes.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`rounded-xl border-2 p-8 bg-white ${
                v.border === "orange" ? "border-orange-500" : "border-purple-700"
              }`}
            >
              <div className="flex justify-center mb-4">
                <v.icon className="w-14 h-14 text-orange-500" strokeWidth={1.2} />
              </div>
              <h3 className="text-center font-bold text-purple-900 text-base font-montserrat mb-5">
                {v.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{v.description}</p>
              {v.note && (
                <p className="text-gray-500 text-sm mt-3 italic">{v.note}</p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}