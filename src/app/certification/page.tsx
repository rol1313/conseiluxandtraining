"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ─────────────────────────────────────────────
   COMPOSANTS UTILITAIRES
───────────────────────────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="text-xl md:text-2xl font-bold text-purple-900 font-montserrat mb-6"
    >
      {children}
    </motion.h2>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-bold text-purple-900 font-montserrat mb-3">
      {children}
    </h3>
  );
}

function OrangeTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-bold text-orange-500 font-montserrat mb-3">
      {children}
    </h3>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-1 mb-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-gray-700 text-sm leading-relaxed">
          <span className="text-gray-400 mt-0.5">◦</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function RsBulletList({ items }: { items: { code: string; label: string; date: string }[] }) {
  return (
    <ul className="space-y-1 mb-4 list-disc list-inside">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-gray-700">
          <span className="text-orange-500 font-medium">{item.code}</span>
          {" – "}
          {item.label}
          {" – "}
          {item.date}
        </li>
      ))}
    </ul>
  );
}

function CpfBadge() {
  return <p className="font-bold text-purple-900 text-sm mb-2">Certification éligible au CPF</p>;
}

function NoCpfBadge() {
  return <p className="font-bold text-purple-900 text-sm mb-2">Certification non-éligible au CPF</p>;
}

function EnSavoirPlus({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-orange-500 font-medium text-sm hover:underline block mb-4">
      &gt;&gt;{label}
    </Link>
  );
}

function Divider() {
  return <hr className="my-10 border-gray-200" />;
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function CertificationsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── HERO ── */}
      <section className="max-w-10xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-sm">
          <div className="relative h-72 lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
              alt="Certifications"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="border-2 border-purple-700 rounded-r-xl p-10 flex flex-col justify-center bg-white"
          >
            <p className="text-sm text-gray-500 mb-4">
              Accueil &nbsp;&gt;&nbsp; Certifications
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-purple-900 font-montserrat mb-6">
              Certifications
            </h1>
            <p className="text-gray-800 font-medium leading-relaxed text-sm">
              Les formations certifiantes vous aident à faire reconnaître vos connaissances
              ou compétences spécialisées, ce qui peut être un avantage décisif dans votre
              quotidien professionnel. De plus, les certifications peuvent être prises en charge
              par les différents dispositifs de financement de la formation professionnelle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENU ── */}
      <section className="max-w-10xl mx-auto px-4 pb-20 space-y-0">

        {/* Qu'est-ce qu'une certification ? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-orange-500 font-montserrat mb-4">
            Qu'est-ce qu'une certification professionnelle ?
          </h2>

          {/* Gouttes orange haut */}
          <div className="flex gap-1 mb-3">
            <svg width="22" height="30" viewBox="0 0 22 30" fill="#f97316"><ellipse cx="11" cy="18" rx="8" ry="10"/><polygon points="11,0 4,14 18,14"/></svg>
            <svg width="22" height="30" viewBox="0 0 22 30" fill="#f97316"><ellipse cx="11" cy="18" rx="8" ry="10"/><polygon points="11,0 4,14 18,14"/></svg>
          </div>

          <p className="text-gray-800 font-medium italic text-base mb-4">
            « La certification booste votre parcours professionnel, vous fait gagner en confiance
            et vous permet de valider vos acquis. »
          </p>

          {/* Gouttes orange bas */}
          <div className="flex gap-1 mb-6">
            <svg width="22" height="30" viewBox="0 0 22 30" fill="#f97316"><ellipse cx="11" cy="18" rx="8" ry="10"/><polygon points="11,0 4,14 18,14"/></svg>
            <svg width="22" height="30" viewBox="0 0 22 30" fill="#f97316"><ellipse cx="11" cy="18" rx="8" ry="10"/><polygon points="11,0 4,14 18,14"/></svg>
          </div>
        </motion.div>

        {/* Pourquoi passer une certification ? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <SubTitle>Pourquoi passer une certification ?</SubTitle>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            Une certification professionnelle est une reconnaissance, par une attestation, de la
            maîtrise de connaissances, d'aptitudes ou de compétences professionnelles. Elle est
            délivrée par une autorité légitime à l'issue d'un processus d'évaluation qui peut prendre
            différentes formes.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Grâce à la certification, le collaborateur :
          </p>

          {/* Numéros grands */}
          {[
            "Accroît sa valeur pour son entreprise",
            "Accroît ses opportunités d'avancement ou d'emploi",
            "Accélère son développement professionnel",
            "Obtient une reconnaissance personnelle et professionnelle",
            "Démontre sa compétence dans des domaines spécifiques",
          ].map((item, i) => (
            <div key={i} className="mb-4">
              <p className="text-5xl font-light text-gray-300 leading-none">{i + 1}</p>
              <p className="text-gray-700 text-sm mt-1">{item}</p>
            </div>
          ))}
        </motion.div>

        <Divider />

        {/* ══════════════════════════════════════
            NOS CERTIFICATIONS – LANGUES
        ══════════════════════════════════════ */}
        <SectionTitle>Nos certifications – Langues</SectionTitle>

        {/* LILATE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="mb-3">
            <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
              <div className="w-4 h-4 bg-green-600 rotate-45" />
              <span className="font-bold text-gray-800 text-lg tracking-wide">LILATE</span>
              <span className="text-xs text-gray-500 ml-1">LIVE LANGUAGE TEST</span>
            </div>
          </div>

          <SubTitle>LILATE</SubTitle>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            La certificaïton Lilate mesure votre capacité à travailler dans une langue, à l'oral et à l'écrit.
          </p>
          <p className="font-bold text-gray-800 text-sm mb-2">Compétences évaluées</p>
          <BulletList items={["Prononciation", "Grammaire", "Vocabulaire", "Aisance à l'oral", "Cohérence du discours"]} />
          <p className="text-gray-700 text-sm mb-3">
            Ces éléments permettent de mieux identifier le profil de l'apprenant et éventuellement ses futurs axes de formation.
          </p>
          <p className="text-gray-700 text-sm mb-1">
            <strong>Pour la partie orale :</strong> vous parlerez face à votre ordinateur qui enregistrera vos réponses.
          </p>
          <p className="text-gray-700 text-sm mb-4">
            <strong>Pour La partie écrite :</strong> vous taperez sur votre clavier dans la langue du test.
          </p>

          <SubTitle>Pourquoi choisir le LILATE</SubTitle>
          <p className="text-gray-700 text-sm mb-3">
            Ce test adaptatif en ligne a été conçu afin d'aider les professionnels et les organismes de formation à évaluer
            la capacité d'un collaborateurs ou stagiaires à travailler dans plus de 10 langues.
          </p>
          <BulletList items={[
            "Un examinateur humain juge les compétences écrites et orales de la personne auditée",
            "Un test conçu pour les entreprises, les écoles de commerce, les universités et les organismes de formation",
            "Aucune préparation spécifique n'est requise avant d'effectuer le test",
          ]} />
          <p className="text-gray-700 text-sm font-bold mb-3">
            En résumé : rapide et facile à mettre en œuvre avec des mises en situation professionnelle
          </p>
          <EnSavoirPlus href="/certifications/lilate" label="En savoir plus" />

          <SubTitle>Code RS des certifications</SubTitle>
          <RsBulletList items={[
            { code: "RS6143", label: "Test d'aptitude à travailler en portugais – LILATE", date: "24/10/2025" },
            { code: "RS6144", label: "Test d'aptitude à travailler en arabe – LILATE", date: "24/10/2025" },
            { code: "RS6146", label: "Test d'aptitude à travailler en russe – LILATE", date: "24/10/2025" },
            { code: "RS6118", label: "Test d'aptitude à travailler en anglais – LILATE", date: "24/10/2025" },
            { code: "RS6142", label: "Test d'aptitude à travailler en chinois – LILATE", date: "24/10/2025" },
            { code: "RS6141", label: "Test d'aptitude à travailler en japonais – LILATE", date: "24/10/2025" },
            { code: "RS6140", label: "Test d'aptitude à travailler en italien – LILATE", date: "24/10/2025" },
            { code: "RS6139", label: "Test d'aptitude à travailler en espagnol – LILATE", date: "24/10/2025" },
            { code: "RS6145", label: "Test d'aptitude à travailler en allemand – LILATE", date: "24/10/2025" },
            { code: "RS6916", label: "Test d'aptitude à travailler en français langue étrangère – LILATE", date: "24/10/2025" },
          ]} />
          <CpfBadge />
          <EnSavoirPlus href="/certifications/lilate" label="En savoir plus sur la certification Lilate" />
        </motion.div>

        <Divider />

        {/* TOEIC */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="mb-3">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-orange-500">*</span>toeic.
            </span>
          </div>
          <SubTitle>TOEIC</SubTitle>

          <SubTitle>À propos du test TOEIC</SubTitle>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            Le Test TOEIC® est un outil d'évaluation de la maîtrise de l'anglais conçu pour les non-anglophones.
            Il évalue les compétences linguistiques en anglais nécessaires à la vie quotidienne des individus travaillant
            dans un contexte international. Les scores obtenus indiquent le niveau de communication en anglais des individus
            dans le domaine des affaires, du commerce et de l'industrie. Ce test ne requiert pas de connaissances ou de
            vocabulaire spécialisé au-delà de ce qu'une personne utilisant l'anglais dans ses activités professionnelles
            quotidiennes possède.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Leader mondial depuis plus de 40 ans, le test TOEIC® est la référence incontestée pour évaluer les compétences
            linguistiques en anglais utilisées dans un environnement professionnel. Plus de 14 000 entreprises réparties dans
            plus de 160 pays font confiance aux résultats du TOEIC pour prendre des décisions stratégiques.
          </p>

          <SubTitle>Les tests TOEIC</SubTitle>
          <BulletList items={[
            <span key="1">Le test <strong>TOEIC® Listening, Speaking, Reading, Writing</strong> mesure le niveau des compétences de compréhension orale et écrite, et d'expression orale et écrite en anglais des niveaux débutants à avancés (niveaux A1 à C1 du CECRL)</span>,
            <span key="2">Le test <strong>TOEIC Listening and Reading</strong> évalue la compréhension orale et écrite des niveaux débutant à avancé (niveaux A1 à C1 du CECRL)</span>,
            <span key="3">Le test <strong>TOEIC Speaking and Writing</strong> évalue l'expression orale et écrite des niveaux débutant à avancé (niveaux A1 à C1 du CECRL)</span>,
          ]} />

          <p className="text-gray-700 text-sm mb-2">
            La Certification <strong>TOEIC Listening and Reading Public Programme</strong> se déroule dans un centre à une date précise, la durée approximative est de 2 heures.
          </p>
          <p className="text-gray-700 text-sm mb-2">
            De même, la <strong>Certification TOEIC Speaking and Writing Public Programme</strong> a lieu dans un centre, la durée approximative est de 1 heure et 20 minutes.
          </p>
          <p className="text-gray-700 text-sm mb-2">
            La présentation d'une pièce d'identité en cours de validité et le respect des horaires sont obligatoires.
          </p>
          <p className="text-gray-700 text-sm mb-2">
            La <strong>Certification TOEIC Listening and Reading Institutional Programme en ligne</strong> a une durée approximative d'1h (hors temps de vérification).
          </p>
          <p className="text-gray-700 text-sm mb-4">
            Il existe également la <strong>certification TOEIC 4 skills Institutionnel en ligne</strong> qui atteste des compétences en Listening, Speaking, Reading et Writing. La durée approximative de l'examen est de 2 heures et 20 minutes.
          </p>

          <p className="text-gray-700 text-sm mb-2 font-medium">Prérequis pour les tests :</p>
          <BulletList items={[
            "Ordinateur", "Navigateur Google Chrome", "Haut-parleurs (intégrés à l'ordinateur)",
            "Microphone (intégré à l'ordinateur)", "Caméra (intégrée à l'ordinateur)", "Connexion Internet stable",
          ]} />

          <p className="text-gray-700 text-sm mb-3">Dans le cadre du CPF, nous proposons le test TOEIC suivant :</p>
          <BulletList items={["Le test TOEIC® 4-Skills : Listening, Speaking, Reading and Writing"]} />

          <SubTitle>Échelle de scores TOEIC et équivalences des niveaux</SubTitle>
          <p className="text-gray-700 text-sm mb-3">
            Les programmes TOEIC évaluent les aptitudes en compréhension et expression écrites et orales indispensables dans un environnement professionnel. Que vous optiez pour le test TOEIC® Listening, Speaking, Writing, le test TOEIC® Listening and Reading ou les tests TOEIC® Speaking and Writing, votre score peut être corrélé aux niveaux du Cadre Européen Commun de Référence pour les Langues (CECRL).
          </p>
          <p className="text-gray-700 text-sm mb-4">
            Les tests TOEIC ne sont pas des tests que l'on « réussit » ou « échoue ». Ils permettent d'obtenir un score qui reflète le niveau de maîtrise de l'anglais du candidat dans un contexte professionnel.
          </p>

          <SubTitle>Code RS de la certification</SubTitle>
          <RsBulletList items={[
            { code: "RS6151", label: "Test TOEIC (Test of English for International Communication)", date: "24/10/2025" },
          ]} />
          <CpfBadge />
          <EnSavoirPlus href="/certifications/toeic" label="En savoir plus sur la certification TOEIC" />
        </motion.div>

        <Divider />

        {/* CLOE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-sm">C</div>
            <span className="font-bold text-gray-800 text-xl">CLOE</span>
            <span className="text-gray-500 text-sm">| CENTRE PARTENAIRE</span>
          </div>
          <SubTitle>CLOE</SubTitle>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            Depuis 2018, les <strong>certifications CLOE (Compétences Linguistiques Orales et Écrites)</strong> des CEL, inscrites au Répertoire Spécifique de France Compétences, sont proposées dans cinq langues et <strong>finançables par le Compte Personnel de Formation (CPF)</strong> :
          </p>
          <BulletList items={["Anglais", "Allemand", "Espagnol", "Italien", "Français Langue Étrangère"]} />
          <p className="text-gray-700 text-sm mb-4">
            Cette solution, structurée autour d'une <strong>certification harmonisée</strong> comprenant une <strong>évaluation en ligne des connaissances écrites et orales de la langue et un entretien oral</strong>, permet de répondre à une demande croissante des salariés d'une solution rapide et précise.
          </p>

          <SubTitle>Code RS des certifications</SubTitle>
          <RsBulletList items={[
            { code: "RS6435", label: "Certification CLOE anglais", date: "24/10/2026" },
            { code: "RS6436", label: "Certification CLOE allemand", date: "25/10/2026" },
            { code: "RS6437", label: "Certification CLOE espagnol", date: "26/10/2026" },
            { code: "RS6438", label: "Certification CLOE français langue étrangère", date: "27/10/2026" },
            { code: "RS6439", label: "Certification CLOE italien", date: "28/10/2026" },
          ]} />
          <CpfBadge />
          <EnSavoirPlus href="/certifications/cloe" label="En savoir plus sur la Certification CLOE" />
        </motion.div>

        <Divider />

        {/* VTest */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="mb-3">
            <span className="text-teal-600 font-bold text-sm">Burlington</span>
            <div className="text-3xl font-extrabold">
              <span className="text-yellow-400">V</span>
              <span className="text-gray-900">Test</span>
            </div>
            <span className="text-teal-600 text-xs font-semibold">Business English</span>
          </div>

          <SubTitle>VTest Business English 4 skills</SubTitle>
          <p className="text-gray-700 text-sm mb-2">
            Le test VTest Business English – 4 skills est inscrit au répertoire spécifique de France compétences RS6905 depuis le 27 novembre 2024.
          </p>
          <p className="text-gray-700 text-sm mb-2">
            A ce titre, vous disposerez d'un certificat de compétence reconnu par l'état, ainsi que d'un certificat international sécurisé reconnu dans le monde entier.
          </p>
          <p className="text-gray-700 text-sm mb-2">
            Le test évalue les 4 compétences linguistiques : compréhension et expression à l'oral et à l'écrit grâce à une intelligence artificielle de dernière génération. Il fournit un niveau d'anglais professionnel précis basé sur le CECRL (Cadre Européen Commun de Référence pour les Langues).
          </p>
          <p className="text-gray-700 text-sm mb-2">Le candidat peut passer le test en ligne sans rendez-vous préalable en toute sécurité entre 50 à 90 minutes.</p>
          <p className="text-gray-700 text-sm mb-2">L'interface du test est disponible en français, et le test démarre par des questions simples, monte en difficulté et s'arrête au niveau du candidat.</p>
          <p className="text-gray-700 text-sm mb-2">Le candidat aura l'occasion de répondre à des questions de compréhension, de s'exprimer à l'oral sur différents sujets, et de rédiger un contenu sur un sujet donné.</p>
          <p className="text-gray-700 text-sm mb-2">L'activité d'expression orale commence par la lecture d'un texte à haute voix pour faciliter la réponse aux questions ouvertes.</p>
          <p className="text-gray-700 text-sm mb-2">Au niveau de l'équipement, un ordinateur, une tablette, ou même un smartphone, pourquoi pas, que ce soit avec Windows, Mac, Ios, Android ou Linux.</p>
          <p className="text-gray-700 text-sm mb-2">Il vous faudra, outre une connexion internet, une caméra frontale, un microphone et des écouteurs ou un casque, le tout dans un endroit calme.</p>
          <p className="text-gray-700 text-sm mb-4">Pour vous préparer, en plus de votre formation, vous bénéficiez d'un test de découverte en ligne gratuit.</p>

          <SubTitle>Code RS de la certification</SubTitle>
          <RsBulletList items={[
            { code: "RS6905", label: "VTest Business English – 4 Skills", date: "28/11/2027" },
          ]} />
          <CpfBadge />
          <EnSavoirPlus href="/certifications/vtest" label="En savoir plus sur la certification VTest Business English – 4 Skills" />
        </motion.div>

        <Divider />

        {/* Brightlanguage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">9</div>
            <span className="font-bold text-gray-800">bright</span>
            <span className="text-blue-500 font-bold">language</span>
            <span className="text-blue-300 text-xs">™</span>
          </div>
          <SubTitle>Brightlanguage</SubTitle>
          <p className="text-gray-700 text-sm mb-3">
            Les compétences visées par la certification ont été établies dans le respect des attentes du Cadre européen commun de référence pour les langues (CECRL) du niveau A2 à C2.
          </p>
          <p className="text-gray-700 text-sm mb-3">
            La certification évalue les cinq compétences du CECRL : compréhension de l'oral, compréhension de l'écrit, expression écrite, expression orale, interaction orale.
          </p>
          <p className="text-gray-700 text-sm mb-4">
            La certification permet aux personnes actives de justifier leur niveau d'anglais – à l'oral et à l'écrit – dans le contexte professionnel et ainsi, d'élargir leurs activités (par exemple : intervenir sur de nouveaux projets) ou d'accéder à un nouveau poste en interne ou en externe. La certification vise l'employabilité, la mobilité professionnelle ou le retour à l'emploi des personnes.
          </p>
          <NoCpfBadge />
        </motion.div>

        <Divider />

        {/* ══════════════════════════════════════
            NOS CERTIFICATIONS – DIGITAL / BUREAUTIQUE
        ══════════════════════════════════════ */}
        <SectionTitle>Nos certifications – Digital /Bureautique</SectionTitle>

        {/* TOSA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="text-orange-500 font-bold text-xl">ↄ</span>
            <span className="font-bold text-gray-900 text-2xl tracking-tight">TOSA</span>
          </div>
          <SubTitle>Tosa</SubTitle>
          <p className="text-gray-700 text-sm mb-2">
            La Certification TOSA s'adresse à tous, étudiants, salariés et personnes en recherche d'emploi. Le TOSA délivre un score sur 1000, sans échec, permettant à toute personne de <strong>valoriser ses compétences sur son CV</strong>.
          </p>
          <p className="text-gray-700 text-sm mb-2">
            Les tests incluent des <strong>QCM et des manipulations réelles des logiciels</strong> dans des mises en situation rencontrées en entreprise.
          </p>
          <p className="text-gray-700 text-sm mb-2">
            <strong>Les tests TOSA sont adaptatifs</strong> : la difficulté des questions évolue en fonction des réponses du candidat.
          </p>
          <p className="text-gray-700 text-sm mb-4">
            La méthode de calcul du score est basée sur l'IRT (Item Response Theory). Elle permet d'obtenir des résultats fiables et précis.
          </p>

          <SubTitle>Essentiel</SubTitle>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mb-4">
            <li>Il s'agit d'un test en ligne et en autonomie</li>
            <li>La certification se présente sous la forme d'un QCM avec 30 à 35 questions et durée limitée à 60 minutes.</li>
            <li>Il s'agit d'un test adaptatif, la difficulté des questions évolue en fonction des réponses du candidat.</li>
            <li>L'e-surveillance se fait à distance avec <span className="text-orange-500 font-medium">Integrity Advocate</span>.</li>
            <li>C'est important de ne pas quitter le champ de vision de la webcam durant tout le test.</li>
          </ul>

          <SubTitle>Code RS des certifications</SubTitle>
          <RsBulletList items={[
            { code: "RS6964", label: "Rédiger et mettre en forme des documents professionnels avec Word (Tosa)", date: "09/12/27" },
            { code: "RS6961", label: "Développer des présentations visuelles et dynamiques avec PowerPoint (Tosa)", date: "10/12/27" },
            { code: "RS6963", label: "Automatiser des processus dans les applications Microsoft Office avec VBA (Tosa)", date: "11/12/27" },
            { code: "RS6958", label: "Gérer les courriels et la planification avec Outlook (Tosa)", date: "12/12/27" },
            { code: "RS6965", label: "Créer et gérer des sites web avec WordPress (Tosa)", date: "13/12/27" },
            { code: "RS6960", label: "Utiliser les outils collaboratifs de Microsoft 365 pour améliorer la productivité (Tosa)", date: "14/12/27" },
            { code: "RS6893", label: "TOSA DigComp", date: "15/12/27" },
            { code: "RS6962", label: "Programmer et automatiser des tâches avec Python (Tosa)", date: "16/12/27" },
            { code: "RS6959", label: "Réaliser des retouches et des compositions d'images avec Photoshop (Tosa)", date: "17/12/27" },
            { code: "RS6956", label: "Créer des illustrations vectorielles et des graphiques avec Illustrator (Tosa)", date: "18/12/27" },
            { code: "RS6957", label: "Concevoir des mises en page et des publications professionnelles avec InDesign (Tosa)", date: "18/12/27" },
            { code: "RS6955", label: "Concevoir des dessins techniques et des plans avec AutoCAD (Tosa)", date: "18/12/27" },
            { code: "RS7256", label: "Exploiter les fonctionnalités de Microsoft Excel pour la gestion et l'analyse des données (Tosa)", date: "14/09/25" },
            { code: "RS7096", label: "Développer des bases de données relationnelles avec Access (Tosa)", date: "28/03/28" },
            { code: "RS7373", label: "Visualiser, analyser et optimiser les données avec Power BI (Tosa)", date: "27/11/2030" },
          ]} />
          <CpfBadge />
          <EnSavoirPlus href="/certifications/tosa" label="En savoir plus sur la certification TOSA" />
        </motion.div>

        <Divider />

        {/* ICDL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="mb-3">
            <div className="inline-block border-2 border-blue-400 rounded px-3 py-1">
              <span className="text-blue-500 font-extrabold text-xl">ICDL</span>
            </div>
            <p className="text-blue-400 text-xs mt-1">The Digital Skills Standard</p>
          </div>
          <SubTitle>ICDL</SubTitle>
          <p className="text-gray-700 text-sm mb-3">
            <strong>ICDL – The Digital Skills Standard International Certification in Digital Literacy,</strong> est un certificat qui indique que son détenteur a passé avec succès un test qui mélange l'évaluation des compétences théoriques et pratiques sur une thématique donnée.
          </p>
          <p className="text-gray-700 text-sm mb-2 font-bold">Les objectifs de la certification ICDL sont multiples :</p>
        </motion.div>

        <Divider />

        {/* ══════════════════════════════════════
            NOS CERTIFICATIONS – IA
        ══════════════════════════════════════ */}
        <SectionTitle>Nos certifications – IA</SectionTitle>

        {/* InKréa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="mb-3 flex items-center justify-center w-24 h-24 rounded-full border-2 border-gray-200">
            <div className="text-center">
              <span className="text-gray-800 font-bold text-sm">In</span>
              <span className="text-orange-500 font-bold text-sm">Kréa</span>
              <p className="text-gray-400 text-xs">CERTIFICATIONS</p>
            </div>
          </div>

          <SubTitle>InKréa</SubTitle>
          <p className="text-gray-700 text-sm mb-2">
            InKréa propose une <strong>certification en IA générative</strong>, orientée création de contenu :
          </p>
          <p className="text-gray-800 text-sm font-semibold mb-3 italic">
            "Création de contenus rédactionnels et visuels par l'usage responsable de l'intelligence artificielle générative"
          </p>
          <p className="text-gray-700 text-sm mb-3">Grâce à ce parcours, vous développerez des compétences concrètes pour :</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mb-4">
            <li>Générer et piloter des contenus visuels et textuels via l'IA (ex. : ChatGPT, DALL·E, etc.)</li>
            <li>Adopter une posture éthique et responsable dans l'usage de ces technologies</li>
            <li>Accompagner la <strong>mutation des métiers</strong> dans tous les secteurs d'activité</li>
            <li>Assurer la <strong>pérennité de votre profil professionnel</strong> face aux enjeux technologiques</li>
          </ul>
          <p className="text-gray-700 text-sm mb-4">
            Une certification stratégique pour conjuguer <strong>créativité humaine</strong> et <strong>puissance de l'IA générative</strong>.
          </p>

          <OrangeTitle>Prérequis</OrangeTitle>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mb-4">
            <li>Ordinateur et connexion internet stable</li>
            <li>Il est préférable d'avoir une première expérience dans le monde professionnel ainsi qu'une familiarité avec l'utilisation d'Internet.</li>
          </ul>
          <p className="text-gray-700 text-sm font-bold mb-2">Taux de passation actuel : 100 %</p>
          <CpfBadge />
          <Link
            href="/certifications/inkrea"
            className="text-orange-500 text-sm hover:underline block mb-1"
          >
            RS6776 – Création de contenus rédactionnels et visuels par l'usage responsable de l'intelligence artificielle générative -01-10-2029
          </Link>
          <EnSavoirPlus href="/certifications/inkrea" label="En savoir plus sur la certification InKréa" />
        </motion.div>

      </section>

      <Footer />
    </main>
  );
}