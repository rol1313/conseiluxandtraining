"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Handshake, Award, Monitor, Brain, TrendingUp, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

const valeurs = [
  {
    icon: Heart,
    title: "EMPATHIE",
    color: "purple",
    description:
      "Pour changer la vie des gens, nous devons les aimer, avoir de l'empathie pour eux, leur porter attention et les mettre au cœur de nos préoccupations et de nos actions.",
  },
  {
    icon: Handshake,
    title: "ENGAGEMENT",
    color: "orange",
    description:
      "Réussir passe par l'engagement des apprenants. Cet engagement n'est possible qu'avec celui des collaborateurs. L'excellence managériale, la qualité de vie au travail et la formation sont des leviers incontournables de l'engagement des collaborateurs.",
  },
  {
    icon: Award,
    title: "EXCELLENCE",
    color: "purple",
    description:
      "Pour répondre à l'ambition de cette mission et être à la hauteur de la confiance des apprenants, nous visons l'excellence. Cette exigence est partagée par tous nos collaborateurs, quelle que soit leur mission, afin de nous inscrire dans une logique de résultat et non de moyen.",
  },
];

const objectifs = [
  {
    icon: Monitor,
    text: "Offrir une palette de formations transverses pertinentes, performantes et efficaces (vision, formateurs, personnalisation)",
  },
  {
    icon: Brain,
    text: "Faciliter l'acquisition des compétences nécessaires à l'employabilité des personnes et à la performance des entreprises",
  },
  {
    icon: TrendingUp,
    text: "Mesurer la performance des dispositifs déployés",
  },
  {
    icon: Globe,
    text: "Agir dans notre écosystème et dans nos formations pour générer un impact social et environnemental positif",
  },
];

export default function EntrepriseMissionPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── HERO : image gauche + carte droite ── */}
      <section className="max-w-10xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-sm">
          {/* Image */}
          <div className="relative h-72 lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
              alt="Globe dans les mains"
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
              Accueil &nbsp;&gt;&nbsp; Qui sommes-nous ? &nbsp;&gt;&nbsp; Entreprise à mission
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-purple-900 font-montserrat mb-8">
              Entreprise à mission
            </h1>

            <p className="text-purple-800 text-lg font-medium leading-relaxed">
              Changer la vie des gens et de leur entreprise par la compétence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 1 : MyConnecting devient… ── */}
      <section className="max-w-10xl mx-auto px-4 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-orange-500 text-center mb-8 font-montserrat"
        >
          Conseilux Training and Development devient une entreprise à mission !
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-5 text-gray-700 leading-relaxed text-base"
        >
          <p>
            Urgence climatique, crise énergétique, enjeux écologiques, déséquilibres économiques et sociaux….
            Le monde doit se confronter à de nombreux défis qui nécessitent impérativement une prise de
            conscience et des réponses qui ne peuvent être que collective. Cela doit venir de tous ceux qui ont
            la possibilité d'agir de manière positive afin de transformer nos sociétés et modes de vie, au
            premier rang desquels les entreprises, fortes de leurs apports technologiques, leurs capacités
            d'actions et l'engagement de leurs équipes.
          </p>
          <p>
            Conseilux Training and Development et l'ensemble de ses collaborateurs font le choix d'être partie prenante de cette
            transformation avec l'affirmation d'un projet de conviction, porté par chacun de nos
            collaborateurs, qui est de :
          </p>
        </motion.div>

        {/* Chevrons orange + citation violette */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-start gap-4 mt-8"
        >
          {/* Double chevron orange */}
          <div className="flex gap-1 mt-1 flex-shrink-0">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-purple-900 leading-snug">
            Changer la vie des gens et de leur entreprise par la compétence.
          </h3>
          {/* Gouttes orange droite */}
          <div className="flex gap-1 ml-auto flex-shrink-0 mt-1">
            <svg width="22" height="30" viewBox="0 0 22 30" fill="#f97316">
              <ellipse cx="11" cy="18" rx="8" ry="10"/>
              <polygon points="11,0 4,14 18,14"/>
            </svg>
            <svg width="22" height="30" viewBox="0 0 22 30" fill="#f97316">
              <ellipse cx="11" cy="18" rx="8" ry="10"/>
              <polygon points="11,0 4,14 18,14"/>
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-5 text-gray-700 leading-relaxed text-base mt-8"
        >
          <p>
            En inscrivant dans nos statuts, une raison d'être prenant en compte les impacts sociétaux et
            environnementaux de notre activité, nous nous fixons comme objectif de concilier la recherche de
            la performance économique avec la contribution à l'intérêt général.
          </p>
          <p>
            Cette démarche volontaire va au-delà de la recherche du profit, elle s'inscrit dans une volonté
            d'être plus responsables et d'être des pourvoyeurs de solutions en matière de problèmes
            environnementaux et sociétaux. Notre mission ambitieuse repose sur trois idées fortes :
          </p>
        </motion.div>
      </section>

      {/* ── SECTION 2 : Engagement partagé + 3 cartes ── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-10xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-purple-900 text-center mb-12 font-montserrat"
          >
            Faire de notre mission un engagement partagé par tous !
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valeurs.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-xl p-8 flex flex-col items-center text-center border-2 bg-white ${
                  v.color === "orange"
                    ? "border-orange-500"
                    : "border-purple-700"
                }`}
              >
                {/* Icône */}
                <div className={`mb-5 ${v.color === "orange" ? "text-orange-500" : "text-purple-700"}`}>
                  <v.icon className="w-14 h-14" strokeWidth={1.2} />
                </div>

                <h3
                  className={`text-lg font-bold tracking-wide mb-4 font-montserrat ${
                    v.color === "orange" ? "text-orange-500" : "text-purple-800"
                  }`}
                >
                  {v.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 : Pourquoi s'imposer… ── */}
      <section className="max-w-10xl mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-2xl font-bold text-purple-900 mb-8 font-montserrat"
        >
          Pourquoi s'imposer ces engagements supplémentaires ?
        </motion.h2>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6 text-gray-700 leading-relaxed text-base list-disc list-outside pl-5"
        >
          <li>
            <strong>Par conviction.</strong> Cela fait des années que nous portons cette mission au quotidien
            pour le bénéfice de nos apprenants et de nos clients. Nous l'avons progressivement formalisée.
            Ce n'est pas une mission levier de communication. Nous la vivons. Aujourd'hui, nous en faisons
            notre raison d'être.
          </li>
          <li>
            <strong>Par nécessité.</strong> Dans une société qui connaît de profondes transformations,
            l'entreprise voit son rôle modifié et sa responsabilité élargie. Les entreprises qui ne
            comprennent pas qu'elles doivent conjuguer profitabilité, responsabilités sociale et
            environnementale seront en décalage par rapport à la société et leur écosystème. Elles se
            mettront en danger.
          </li>
          <li>
            <strong>Par utilité :</strong> En portant notre mission et en l'inscrivant dans nos statuts
            Conseilux Training and Development fait un choix fort et engageant. Celui-ci est élément différentiant au sein du monde
            de la formation. Nous affirmons donc encore plus notre différence opérationnelle illustrée par nos
            objectifs statutaires. Pas une différence de principe mais une différence de conviction surtout,
            que nous transformons en différence opérationnelle. Ce statut nous permet également de pénétrer
            l'écosystème des entreprises impliquées dans la RSE. Un formidable moyen pour nous de devenir
            acteur reconnu de ces compétences. La RSE c'est aussi de la compétence !
          </li>
        </motion.ul>
      </section>

      {/* ── SECTION 4 : 4 objectifs statutaires ── */}
      <section className="max-w-10xl mx-auto px-4 pb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-2xl font-bold text-purple-900 text-center mb-10 font-montserrat"
        >
          Une différenciation construite autour de nos quatre objectifs statutaires
        </motion.h2>

        <div className="space-y-6">
          {objectifs.map((obj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-6"
            >
              <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
                <obj.icon className="w-10 h-10 text-orange-500" strokeWidth={1.4} />
              </div>
              <p className="text-gray-700 text-base leading-relaxed">{obj.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Encadré conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pl-8 space-y-3 text-gray-700 text-base"
        >
          <p>
            Devenir Entreprise à Mission est donc l'affirmation d'un projet de conviction qui doit être porté
            au quotidien par chacun d'entre nous.
          </p>
          <p>Un projet enthousiasmant et exigeant à la hauteur de l'enjeu !</p>
        </motion.div>
      </section>
<NewsletterSection />
      <Footer />
    </main>
  );
}