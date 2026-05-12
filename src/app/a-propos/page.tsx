"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Target, Heart, Award, Users, Lightbulb, TrendingUp, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "Nous croyons que la passion est le moteur de l'apprentissage et de la transformation.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Nous innovons constamment pour offrir des formations adaptées aux enjeux actuels.",
  },
  {
    icon: Users,
    title: "Humain",
    description: "L'humain est au cœur de notre démarche, chaque apprenant est unique.",
  },
  {
    icon: TrendingUp,
    title: "Performance",
    description: "Nous mesurons l'impact de nos formations pour garantir votre progression.",
  },
];

const milestones = [
  { year: "2005", event: "Création de Conseilux Training and Development" },
  { year: "2010", event: "1000 entreprises formées" },
  { year: "2015", event: "Lancement des formations digitales" },
  { year: "2020", event: "Certification Qualiopi obtenue" },
  { year: "2023", event: "Intégration de l'IA dans nos formations" },
  { year: "2025", event: "15 000 apprenants par an" },
];

const team = [
  {
    name: "Thierry Delahaye",
    role: "Fondateur & CEO",
    description: "20 ans d'expérience dans la formation professionnelle",
  },
  {
    name: "Marie Dupont",
    role: "Directrice Pédagogique",
    description: "Experte en ingénierie de formation",
  },
  {
    name: "Jean Martin",
    role: "Directeur Commercial",
    description: "Spécialiste du développement B2B",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white font-montserrat mb-6">
              À Propos de Conseilux Training and Development
            </h1>
            <p className="text-white/80 text-lg max-w-3xl mx-auto">
              Depuis 10 ans, nous accompagnons les entreprises et leurs collaborateurs
              dans leur transformation par la compétence. Notre mission : changer la vie
              des gens et de leur entreprise par la compétence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-orange font-medium mb-3">Notre Mission</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary font-montserrat mb-6">
                Entreprise à Mission
              </h2>
              <p className="text-text-gray leading-relaxed mb-6">
                Conseilux Training and Development est une entreprise à mission. Nous avons inscrit dans nos statuts
                notre raison d'être : "Changer la vie des gens et de leur entreprise par la compétence".
              </p>
              <p className="text-text-gray leading-relaxed mb-6">
                Cette mission guide toutes nos actions et nous pousse à innover constamment
                pour offrir des formations qui ont un réel impact sur les individus et les organisations.
              </p>
              <div className="space-y-4">
                {["Formation personnalisée", "Accompagnement individuel", "Mesure d'impact"].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-orange" />
                    <span className="text-text-dark font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-5xl font-bold font-montserrat">20</p>
                    <p className="text-white/80">ans d'expérience</p>
                  </div>
                  <div className="text-center">
                    <p className="text-5xl font-bold font-montserrat">492+</p>
                    <p className="text-white/80">formations</p>
                  </div>
                  <div className="text-center">
                    <p className="text-5xl font-bold font-montserrat">1000+</p>
                    <p className="text-white/80">entreprises</p>
                  </div>
                  <div className="text-center">
                    <p className="text-5xl font-bold font-montserrat">99.4%</p>
                    <p className="text-white/80">satisfaction</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-orange font-medium mb-3">Nos Valeurs</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-montserrat">
              Ce qui nous anime
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-2xl p-8 shadow-lg h-full"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6"
                  >
                    <value.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-primary font-montserrat mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-gray text-sm">{value.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-orange font-medium mb-3">Notre Histoire</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-montserrat">
              20 ans d'innovation
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20" />
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center gap-8 mb-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <span className="text-2xl font-bold text-primary font-montserrat">
                    {milestone.year}
                  </span>
                  <p className="text-text-gray">{milestone.event}</p>
                </div>
                <div className="w-4 h-4 bg-orange rounded-full relative z-10 flex-shrink-0" />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white font-montserrat mb-6">
              Prêt à transformer vos compétences ?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Découvrez nos formations et commencez votre parcours de transformation dès aujourd'hui.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/formations"
                className="px-8 py-4 bg-orange text-white rounded-full font-medium hover:bg-orange-dark hover:scale-105 transition-all duration-300"
              >
                Voir nos formations
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-primary rounded-full font-medium hover:bg-gray-100 hover:scale-105 transition-all duration-300"
              >
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
