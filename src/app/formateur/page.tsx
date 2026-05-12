"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FormateursPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── HERO ── */}
      <section className="max-w-10xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-sm">
          {/* Image */}
          <div className="relative h-72 lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80"
              alt="Les formateurs Conseilux Training and Development"
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
              Accueil &nbsp;&gt;&nbsp; Qui sommes-nous ? &nbsp;&gt;&nbsp; Les formateurs Conseilux Training and Development
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-purple-900 font-montserrat">
              Les formateurs Conseilux Training and Development
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENU ── */}
      <section className="max-w-10xl mx-auto px-4 py-12 space-y-10">

        {/* Experts in your training — 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-purple-900 font-montserrat mb-3">
            Experts in your training
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
            Our trainers and learning partners are certified, experienced, and motivated.
            They also have heart and genuine joy in seeing you succeed. Their recruitment,
            training, and management are essential elements to the success of your training.
            Selected for you based on your needs and their profile, they are at your side to
            help you achieve your goals.
          </p>
        </motion.div>

        {/* Your Conseilux Training and Development trainer — 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-xl font-bold text-purple-900 font-montserrat mb-3">
            Your Conseilux Training and Development trainer
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
            Coming from all over the world, our trainers are experts dedicated to your success.
            They share their experiences and rich cultural backgrounds with you. Their knowledge
            of the professional world allows them to understand your profession and your sector
            (HR, finance, aeronautics, pharmaceuticals, etc.). Learning with them guarantees an
            enriching experience, genuine growth, and wonderful shared moments.
          </p>
        </motion.div>

        {/* Experts in your training — 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h2 className="text-xl font-bold text-purple-900 font-montserrat mb-3">
            Experts in your training
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
            Our trainers and learning partners are certified, experienced, and motivated.
            They also have heart and genuine joy in seeing you succeed. Their recruitment,
            training, and management are essential elements to the success of your training.
            Selected for you based on your needs and their profile, they are at your side to
            help you achieve your goals.
          </p>
        </motion.div>

        {/* Your Conseilux Training and Development trainer — 2 avec highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-purple-900 font-montserrat mb-3">
            Your{" "}
            <span className="text-orange-500">Conseilux Training and Development</span>{" "}
            trainer
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
            Coming from all over the world, our trainers are experts dedicated to your success.
            They share their experiences and rich cultural backgrounds with you. Their knowledge
            of the professional world allows them to understand your profession and your sector
            (HR, finance, aeronautics,{" "}
            <span className="text-orange-500 font-medium">pharmaceuticals</span>
            , etc.). Learning with them guarantees an enriching experience, genuine growth, and
            wonderful shared moments.
          </p>
        </motion.div>

      </section>

      <Footer />
    </main>
  );
}