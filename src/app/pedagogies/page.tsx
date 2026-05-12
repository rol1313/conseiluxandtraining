"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

type ContentBlock = {
  text: string;
  bold?: boolean;
  label?: string;
  highlight?: string;
};

type Cle = {
  num: string;
  title: string;
  subtitle: string;
  content: ContentBlock[];
  links?: { label: string; href: string }[];
};

const cles: Cle[] = [
  {
    num: "1",
    title: "Hyperpersonnalisation.",
    subtitle: "La formation qu'il vous faut se trouve forcément chez nous !",
    content: [
      {
        text: "Pour bien se former, il faut bien se connaître ! C'est pourquoi, du diagnostic au parcours, en passant par le choix des intervenants ou des outils : l'apprenant est au centre de notre démarche.",
      },
      {
        label: "Un parcours sur mesure",
        text: " : un parcours de formation et des modalités pédagogiques adéquats sont préconisés. Flexible, il autorise chaque apprenant à opter pour des cours spécifiques, en fonction de ses besoins professionnels.",
        bold: true,
      },
      {
        label: "Hyperpersonnalisé… jusqu'aux outils",
        text: " : nos formateurs travaillent directement sur les logiciels et données de l'apprenant.",
        bold: true,
      },
      {
        label: "Les entreprises aussi !",
        text: " L'hyperpersonnalisation s'applique aussi aux entreprises. Quelle que soit votre problématique, nous élaborons, à vos côtés, les parcours les plus appropriés et faisons appel à des formateurs experts de votre secteur.",
        bold: true,
      },
    ],
  },
  {
    num: "2",
    title: "Accompagnement dédié.",
    subtitle: "We won't let you go… even from a distance!",
    content: [
      {
        text: "PROXIMITY is the key word in our approach: whether for our trainers or our learning partners, we choose profiles that are as close as possible to your aspirations.",
      },
      {
        label: "Trainer/learner… it's a match!",
        text: "  The principle: matching a learner's specific expectations with the trainer's corresponding expertise.",
        bold: true,
      },
      {
        label: "A learning partner… what for?",
        text: "  Independently of the trainer, each learner has their own learning partner. They are there to advise them, provide methods, encourage them, and motivate them… an opportunity to build a special relationship, which makes the Conseilux Training and Development teaching method a unique approach.",
        bold: true,
        highlight: "Conseilux Training and Development",
      },
    ],
    links: [
      { label: "DOWNLOAD  OUR WHITE PAPER", href: "/livres-blancs" },
      { label: "ALL ABOUT PEDAGOGY", href: "/a-propos/pedagogie" },
    ],
  },
  {
    num: "3",
    title: "Modalités, parcours, enseignement à distance.",
    subtitle: "Chacun sa route, chacun son chemin…",
    content: [
      {
        text: "Depuis 2006, nous sommes experts de la formation à distance… quelle que soit la modalité choisie : par téléphone, en visio, … tout est possible, avec une pédagogie spécifique au distanciel. Comptez également sur nous côté présentiel !",
        highlight: "téléphone",
      },
      {
        label: "Optez pour le blending learning.",
        text: " Il consiste en l'utilisation de plusieurs modalités pendant un même parcours de formation.",
        bold: true,
      },
    ],
  },
  {
    num: "4",
    title: "FEST, approche actionnelle.",
    subtitle: "Faire pour apprendre.",
    content: [
      {
        text: "« On apprend pour faire et on fait pour apprendre » : l'intégration dans le quotidien de l'apprenant grâce à notre expertise distancielle ou des mises en situation concrètes et immédiatement applicables dans le quotidien professionnel sont une composante forte de notre pédagogie.",
      },
      {
        label: "La pédagogie actionnelle",
        text: " est une modalité pédagogique exclusive qui intègre dans une même démarche l'activité formatrice et l'acte professionnel. L'apprenant ne subit pas ses apprentissages, il en est acteur.",
        bold: true,
      },
    ],
  },
  {
    num: "5",
    title: "L'alliance du plaisir et du progrès.",
    subtitle: "Une équation efficace et inédite.",
    content: [
      {
        text: "Au centre de notre approche : le plaisir. En ligne de mire : la performance. Nous avons l'art chez Conseilux Training and Development d'associer les deux… pour que chacun progresse à son rythme et sans en avoir l'air !",
      },
    ],
  },
  {
    num: "6",
    title: "Esprit d'équipe et collaboratif.",
    subtitle: "Un pour tous… tous pour mieux vous former…",
    content: [
      {
        text: "Nous sommes convaincus que le développement de l'esprit d'équipe associé à la cohésion et la valorisation du travail collaboratif est une composante clé de la réussite personnelle et collective.",
      },
    ],
  },
  {
    num: "7",
    title: "Engagement et responsabilité.",
    subtitle: "Notre garantie : vous… augmenté !",
    content: [
      {
        text: "Plus on est engagé… mieux on s'engage : chez Conseilux Training and Development, la performance de chacun passe par l'implication de chaque formateur.",
      },
      {
        label: "Ils ont signé !",
        text: " L'engagement et la responsabilisation de tous les acteurs de l'apprentissage, apprenant inclus, est une part essentielle de la réussite de nos projets de formation. C'est pourquoi, chaque formateur Conseilux Training and Development signe une charte dans laquelle il s'engage à faire progresser ses apprenants.",
        bold: true,
      },
    ],
  },
  {
    num: "8",
    title: "Innovation.",
    subtitle: "Un investissement gagnant.",
    content: [
      {
        text: "On ne baisse jamais la garde chez Conseilux Training and Development : chaque année, c'est près de 10 % de notre chiffre d'affaires qui est investi dans des innovations, l'occasion d'enrichir et de renouveler notre offre.",
      },
      {
        text: "Pour progresser, nous appliquons le « test and learn » : chaque résultat est évalué et en fonction de celui-ci, des modifications sont mises en œuvre.",
      },
    ],
    links: [
      { label: "TÉLÉCHARGEZ NOTRE LIVRE BLANC", href: "/livres-blancs" },
      { label: "TOUT SAVOIR SUR LA PÉDAGOGIE", href: "/a-propos/pedagogie" },
    ],
  },
];

export default function PedagogiePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── TITRE H1 au-dessus du hero ── */}
      <section className="max-w-10xl mx-auto px-4 pt-10 pb-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-purple-900 font-montserrat"
        >
          Les clés de la pédagogie Conseilux Training and Development
        </motion.h1>
      </section>

      {/* ── HERO : image gauche + carte droite ── */}
      <section className="max-w-10xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-sm">
          <div className="relative h-72 lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80"
              alt="Pédagogie Conseilux Training and Development"
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
              Accueil &nbsp;&gt;&nbsp; Qui sommes-nous ? &nbsp;&gt;&nbsp; Les clés de la pédagogie Conseilux Training and Development
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-purple-900 font-montserrat">
              Les clés de la pédagogie Conseilux Training and Development
            </h2>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENU : 8 clés ── */}
      <section className="max-w-10xl mx-auto px-4 py-12 space-y-14">
        {cles.map((cle, i) => (
          <motion.div
            key={cle.num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            {/* Numéro + Titre */}
            <h2 className="text-2xl md:text-3xl font-bold font-montserrat mb-4">
              <span className="text-orange-500">{cle.num}. </span>
              <span className="text-purple-900">{cle.title}</span>
            </h2>

            {/* Sous-titre */}
            <p className="font-bold text-purple-900 mb-3">{cle.subtitle}</p>

            {/* Paragraphes */}
            <div className="space-y-3 text-gray-700 leading-relaxed text-base">
              {cle.content.map((block, j) => (
                <p key={j}>
                  {block.bold && block.label ? (
                    <>
                      <strong>{block.label}</strong>
                      {block.highlight
                        ? block.text.split(block.highlight).map((part, k, arr) =>
                            k < arr.length - 1 ? (
                              <span key={k}>
                                {part}
                                <span className="text-orange-500 font-medium">
                                  {block.highlight}
                                </span>
                              </span>
                            ) : (
                              <span key={k}>{part}</span>
                            )
                          )
                        : block.text}
                    </>
                  ) : block.highlight ? (
                    block.text.split(block.highlight).map((part, k, arr) =>
                      k < arr.length - 1 ? (
                        <span key={k}>
                          {part}
                          <span className="text-orange-500 font-medium">
                            {block.highlight}
                          </span>
                        </span>
                      ) : (
                        <span key={k}>{part}</span>
                      )
                    )
                  ) : (
                    block.text
                  )}
                </p>
              ))}
            </div>

            {/* Liens optionnels */}
            {cle.links && (
              <div className="mt-4 space-y-1">
                {cle.links.map((lnk) => (
                  <div key={lnk.label}>
                    <Link
                      href={lnk.href}
                      className="text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors uppercase tracking-wide"
                    >
                      {lnk.label}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </section>
<NewsletterSection />
      <Footer />
    </main>
  );
}