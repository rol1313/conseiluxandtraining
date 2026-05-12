"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

// ─── DATA ────────────────────────────────────────────────────────────────────

const categories = [
  {
    id: "formations-professionnelles",
    label: "Formations Professionnelles",
    questions: [
      {
        q: "Quels types de formations propose Conseilux Training and Development ?",
        a: "Conseilux Training and Development offre des formations en Soft Skills, Bureautique, Digital, IA et Langues, adaptées aux besoins spécifiques de chaque apprenant.",
      },
      {
        q: "Les formations sont-elles certifiantes ?",
        a: "Oui, plusieurs de nos formations débouchent sur des certifications reconnues. Nos programmes sont conçus pour répondre aux standards professionnels les plus exigeants et peuvent inclure des certifications officielles selon le parcours choisi.",
      },
      {
        q: "Proposez-vous des formations en présentiel ou à distance ?",
        a: "Conseilux Training and Development propose les deux modalités : présentiel dans nos centres de formation, et distanciel via notre plateforme en ligne. Des formats hybrides sont également disponibles pour s'adapter à vos contraintes.",
      },
      {
        q: "Comment puis-je consulter le catalogue des formations disponibles ?",
        a: "Notre catalogue complet est disponible directement sur le site dans la section Formations. Vous pouvez également le télécharger en PDF depuis notre page d'accueil pour le consulter hors ligne.",
      },
      {
        q: "Quelle est la spécificité de l'approche pédagogique de Conseilux Training and Development ?",
        a: "Notre approche repose sur une pédagogie active et sur-mesure, centrée sur l'apprenant. Nous combinons théorie, mise en pratique et accompagnement individuel pour garantir un transfert de compétences durable.",
      },
      {
        q: "Proposez-vous des formations adaptées aux besoins des managers ?",
        a: "Absolument. Nous disposons d'un catalogue dédié au Management & Leadership, incluant des formations sur la gestion d'équipe, la prise de décision, la communication managériale et le leadership situationnel.",
      },
    ],
  },
  {
    id: "modalites-de-formation",
    label: "Modalités de Formation",
    questions: [
      {
        q: "Quelles sont les modalités pédagogiques proposées par Conseilux Training and Development?",
        a: "Nous proposons des formations en présentiel, en distanciel synchrone (classes virtuelles), en e-learning asynchrone et en format blended learning combinant plusieurs modalités pour une expérience optimale.",
      },
      {
        q: "Qui sont les formateurs chez Conseilux Training and Development?",
        a: "Nos formateurs sont des experts métier avec une solide expérience terrain. Ils sont sélectionnés pour leurs compétences pédagogiques et leur expertise sectorielle, et sont régulièrement évalués par les apprenants.",
      },
      {
        q: "Les formations sont-elles adaptées aux entreprises de toutes tailles ?",
        a: "Oui, nos formations s'adressent aussi bien aux TPE/PME qu'aux grandes entreprises. Nous proposons des solutions sur-mesure adaptées à votre secteur, vos effectifs et vos objectifs stratégiques.",
      },
      {
        q: "Comment est évaluée la progression des apprenants ?",
        a: "La progression est évaluée via des quiz, des mises en situation, des exercices pratiques et des évaluations à chaud et à froid. Un rapport de compétences est remis à l'issue de chaque formation.",
      },
      {
        q: "Quels types de compétences sont développés dans les formations en soft skills ?",
        a: "Nos formations soft skills couvrent la communication, la gestion du stress, la résolution de problèmes, l'intelligence émotionnelle, la créativité, le travail en équipe et la prise de parole en public.",
      },
      {
        q: "Quels sont les avantages de la formation en visio chez Conseilux Training and Development ?",
        a: "La formation en visio offre une grande flexibilité géographique, des sessions interactives en temps réel, des enregistrements disponibles en replay, et la même qualité pédagogique qu'en présentiel.",
      },
    ],
  },
  {
    id: "financements-et-dispositifs",
    label: "Financements et Dispositifs",
    questions: [
      {
        q: "Les formations sont-elles éligibles au Compte Personnel de Formation (CPF) ?",
        a: "Certaines de nos formations sont éligibles au CPF. Rapprochez-vous de notre équipe pour vérifier l'éligibilité de la formation souhaitée et vous accompagner dans les démarches de prise en charge.",
      },
      {
        q: "Qu'est-ce que le FNE-Formation et comment en bénéficier ?",
        a: "Le FNE-Formation est un dispositif d'aide de l'État permettant aux entreprises en difficulté ou en mutation de financer des formations. Notre équipe peut vous accompagner dans le montage de votre dossier.",
      },
      {
        q: "Comment les OPCO interviennent-ils dans le financement des formations ?",
        a: "Les Opérateurs de Compétences (OPCO) financent tout ou partie des formations professionnelles selon votre branche et votre accord de branche. Nous travaillons avec l'ensemble des OPCO et pouvons vous orienter.",
      },
      {
        q: "Comment fonctionne la prise en charge par les OPCO ?",
        a: "La prise en charge implique de soumettre un dossier à votre OPCO avant le démarrage de la formation. Conseilux Training vous accompagne dans la constitution du dossier et les démarches administratives.",
      },
      {
        q: "Comment savoir si une formation est éligible à un financement public ?",
        a: "Contactez notre équipe avec le titre de la formation souhaitée. Nous vérifions pour vous l'éligibilité aux différents dispositifs (CPF, OPCO, FNE, Plan de développement des compétences) et vous guidons.",
      },
      {
        q: "Quels dispositifs de financement sont disponibles pour les entreprises ?",
        a: "Les entreprises peuvent mobiliser : le Plan de Développement des Compétences, les fonds OPCO, le FNE-Formation, les aides régionales, et dans certains cas le CPF de transition professionnelle.",
      },
      {
        q: "Combien de temps faut-il pour mettre en place une formation ?",
        a: "Le délai varie selon la complexité du projet. Pour une formation catalogue, comptez 1 à 2 semaines. Pour une formation sur-mesure, le délai est de 3 à 6 semaines incluant l'analyse des besoins et la conception.",
      },
    ],
  },
  {
    id: "prise-de-rendez-vous",
    label: "Prise de Rendez-vous et Démonstrations",
    questions: [
      {
        q: "Comment puis-je prendre rendez-vous pour une démonstration de formation ?",
        a: "Vous pouvez prendre rendez-vous pour une démonstration en nous contactant directement via le formulaire de contact disponible sur notre site ou en nous appelant. Notre équipe vous recontactera sous 24h.",
      },
      {
        q: "Les démonstrations sont-elles gratuites ?",
        a: "Oui, toutes nos démonstrations et présentations de formations sont entièrement gratuites et sans engagement. C'est l'occasion de découvrir notre approche pédagogique et d'échanger avec nos experts.",
      },
      {
        q: "Quelle est la durée d'une démonstration de formation ?",
        a: "Une démonstration dure généralement entre 30 et 60 minutes selon la complexité du programme. Elle inclut une présentation du contenu, une mise en situation et une session de questions-réponses.",
      },
      {
        q: "Les démonstrations sont-elles disponibles en ligne ?",
        a: "Oui, nous proposons des démonstrations en ligne via visioconférence pour s'adapter à vos contraintes géographiques et de planning. Des sessions en présentiel sont également possibles sur demande.",
      },
    ],
  },
  {
    id: "mesure-impact",
    label: "Mesure d'Impact et Accompagnement",
    questions: [
      {
        q: "Qu'est-ce que la mesure d'impact chez Conseilux Training and Development ?",
        a: "La mesure d'impact est un processus structuré permettant d'évaluer les effets concrets des formations sur les compétences, les comportements et les performances des apprenants et de leur organisation.",
      },
      {
        q: "Comment est réalisée la mesure d'impact ?",
        a: "Elle se fait en plusieurs étapes : évaluation à chaud juste après la formation, évaluation à froid après 3 mois, et mesure des indicateurs de performance définis en amont avec le commanditaire de la formation.",
      },
      {
        q: "Quel est le rôle du Learning Partner chez Conseilux Training ?",
        a: "Le Learning Partner est votre interlocuteur dédié tout au long de votre parcours de formation. Il analyse vos besoins, recommande les formations adaptées, suit votre progression et mesure les résultats obtenus.",
      },
    ],
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-300
          ${open ? "bg-[#f97316] text-white" : "bg-white hover:bg-orange-50 text-[#f97316]"}`}
      >
        <span
          className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-colors
            ${open ? "border-white text-white" : "border-[#f97316] text-[#f97316]"}`}
        >
          {open ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </span>
        <span className="font-semibold text-sm md:text-base">{question}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-6 py-5 bg-white border-t border-gray-100">
              <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const scrollToSection = (id: string) => {
    setActiveCategory(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a1a6e] to-[#2d2d9e] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden h-64 lg:h-80 bg-[#1a1a6e]/40"
            >
              <img
                src="/faq-hero.jpg"
                alt="FAQ Conseilux Training"
                className="w-full h-full object-cover opacity-80"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-5xl font-bold text-white/40 font-montserrat">?</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border-2 border-white/20 rounded-2xl p-8 bg-white/5 backdrop-blur"
            >
              <p className="text-white/60 text-sm mb-1">Accueil &rsaquo; FAQ</p>
              <h1 className="text-5xl font-bold text-white font-montserrat mb-4">FAQ</h1>
              <p className="text-white/70 text-base leading-relaxed">
                Retrouvez les réponses aux questions les plus fréquentes sur nos formations,
                modalités pédagogiques, financements et accompagnement.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sidebar sticky */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <p className="text-[#1a1a6e] font-bold text-sm mb-4 text-center">
                Sélectionner un sujet
              </p>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => scrollToSection(cat.id)}
                    className={`px-4 py-2.5 rounded-full text-sm font-semibold text-center transition-all duration-200
                      ${activeCategory === cat.id
                        ? "bg-[#f97316] text-white shadow-md scale-[1.02]"
                        : "bg-[#f97316]/90 text-white hover:bg-[#f97316] hover:scale-[1.01]"
                      }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* FAQ sections */}
          <div className="flex-1 space-y-14">
            {categories.map((cat, catIndex) => (
              <motion.div
                key={cat.id}
                id={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.05 }}
                onViewportEnter={() => setActiveCategory(cat.id)}
              >
                <p className="text-[#f97316] text-xs font-bold uppercase tracking-widest mb-1">FAQ</p>
                <h2 className="text-3xl font-bold text-[#1a1a6e] font-montserrat mb-6">
                  {cat.label}
                </h2>

                <div className="space-y-3">
                  {cat.questions.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <FaqItem question={item.q} answer={item.a} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

<NewsletterSection />
      <Footer />
    </main>
  );
}