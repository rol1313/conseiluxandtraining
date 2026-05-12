"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LearningPartnerPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── TITRE au-dessus du hero ── */}
      <section className="max-w-10xl mx-auto px-4 pt-10 pb-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-purple-900 font-montserrat"
        >
          Learning Partner : votre allié pour réussir !
        </motion.h1>
      </section>

      {/* ── HERO ── */}
      <section className="max-w-10xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-sm">
          {/* Image */}
          <div className="relative h-72 lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
              alt="Learning Partner"
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
              Accueil &nbsp;&gt;&nbsp; Learning Partner : votre allié pour réussir !
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-purple-900 font-montserrat">
              Learning Partner : votre allié pour réussir !
            </h2>
          </motion.div>
        </div>
      </section>

      {/* ── CITATION + INTRO ── */}
      <section className="max-w-10xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-start gap-6 mb-10"
        >
          {/* Gouttes gauche */}
          <div className="flex gap-1 flex-shrink-0 mt-1">
            <svg width="22" height="30" viewBox="0 0 22 30" fill="#f97316"><ellipse cx="11" cy="18" rx="8" ry="10"/><polygon points="11,0 4,14 18,14"/></svg>
            <svg width="22" height="30" viewBox="0 0 22 30" fill="#f97316"><ellipse cx="11" cy="18" rx="8" ry="10"/><polygon points="11,0 4,14 18,14"/></svg>
            {/* Triangles orange */}
            <svg width="22" height="30" viewBox="0 0 22 30" fill="#f97316" className="ml-1"><polygon points="11,2 22,28 0,28"/></svg>
            <svg width="22" height="30" viewBox="0 0 22 30" fill="#f97316"><polygon points="11,2 22,28 0,28"/></svg>
          </div>

          {/* Citation */}
          <div className="flex-1 text-center">
            <p className="text-gray-800 font-semibold leading-relaxed">
              « We believe in human support to inspire learners to excel.
              <br />
              <strong>Putting people at the heart of training is the leitmotif of Conseilux Training and Development. »</strong>
            </p>
          </div>

          {/* Gouttes droite */}
          <div className="flex gap-1 flex-shrink-0 mt-1">
            <svg width="22" height="30" viewBox="0 0 22 30" fill="#f97316"><ellipse cx="11" cy="18" rx="8" ry="10"/><polygon points="11,0 4,14 18,14"/></svg>
            <svg width="22" height="30" viewBox="0 0 22 30" fill="#f97316"><ellipse cx="11" cy="18" rx="8" ry="10"/><polygon points="11,0 4,14 18,14"/></svg>
          </div>
        </motion.div>

        {/* Paragraphe intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-700 leading-relaxed text-base mb-12"
        >
          At{" "}
          <span className="text-orange-500 font-medium underline">Conseilux Training and Development</span>
          , we firmly believe in the power of human support to inspire learners to excel.
          This is where the revolutionary concept of the "learning partner" comes into play.
          Imagine a dedicated training companion, always by your side to guide you through
          the complexities of professional learning. They are your ultimate ally in your quest
          for professional development. Your{" "}
          <span className="text-orange-500 font-medium underline">learning</span>{" "}
          <strong>partner</strong> is there to support you every step of the way. With
          Conseilux Training and Development, transform your professional training into a personalized, engaging,
          and enriching experience, where your success becomes our top priority.
        </motion.p>

        {/* ── The Learning Partner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-purple-900 font-montserrat mb-4">
            The Learning Partner: Your Personal Guide to Success
          </h2>
          <p className="text-gray-700 leading-relaxed text-base mb-4">
            The role of the Learning Partner is multifaceted and crucial. They establish a
            close relationship with each learner, understanding their specific needs, goals,
            and challenges. In addition to regularly monitoring their progress, the Learning
            Partner is there to advise, motivate, and support the learner at every stage of
            their journey. Inspired by the values of a sports coach, the Learning Partner is
            there to ensure an optimal, adaptable, and effective learning experience.
          </p>
          <p className="text-gray-700 leading-relaxed text-base mb-4">
            <strong>More than just a guide, the Learning Partner is a true partner in success.</strong>{" "}
            They help you:
          </p>
          <ul className="space-y-3 text-gray-700 text-base ml-4">
            {[
              {
                label: "Define your goals",
                text: " : What do you want to learn? What skills do you want to develop? The Learning Partner helps you clarify your ambitions and identify the training courses best suited to your needs.",
              },
              {
                label: "Planning your learning",
                text: " : How will you balance your training with your professional and personal life? The Learning Partner helps you create a personalized and realistic learning plan.",
              },
              {
                label: "Stay motivated",
                text: " : Learning can sometimes be difficult. The Learning Partner is there to encourage you, support you, and help you overcome obstacles.",
              },
              {
                label: "Measuring Your Progress",
                text: " : How do you know if you're making progress? The Learning Partner helps you identify your strengths and weaknesses and track your results.",
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-gray-500 mt-1">◦</span>
                <span>
                  <strong>{item.label}</strong>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── Personalized Support ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-purple-900 font-montserrat mb-4">
            Personalized Support and Human Approach
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
            At Conseilux Training and Development, we believe in hyper-personalized support. Each learner benefits
            from a dedicated Learning Partner, who takes into account their context,
            motivations, and schedule. This approach ensures that each learner feels supported
            and encouraged at all times, thus promoting significant progress and successful
            skill development.
          </p>
        </motion.div>

        {/* ── Trainer and Learning Partner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-purple-900 font-montserrat mb-4">
            <strong>Trainer and Learning Partner</strong>
            <span className="font-normal"> : what are the differences?</span>
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
            It's essential to distinguish the role of the trainer from that of the Learning
            Partner. While the trainer imparts specialized knowledge, the Learning Partner
            supports, guides, and motivates the learner. In the event of difficulties or
            specific needs, the Learning Partner intervenes to find suitable solutions, thus
            providing continuous and personalized support.
          </p>
        </motion.div>

        {/* ── Goal ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-purple-900 font-montserrat mb-4">
            Goal: Your Success, Our Satisfaction
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
            At Conseilux Training and Development, our ultimate goal is to enable every learner to succeed in the
            best possible conditions. Through our human-centered approach and personalized
            support, we aim to encourage our learners' attendance, motivation, and success.
            For us, each individual success is a shared victory, reinforcing our commitment
            to providing quality support and tangible results.
          </p>
        </motion.div>

        {/* ── Benefits ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-purple-900 font-montserrat mb-6 text-center">
            The benefits of being supported by a Learning Partner
          </h2>
          <ul className="space-y-3 text-gray-700 text-base ml-4">
            {[
              "Personalized and individualized monitoring",
              "Increased motivation and commitment",
              "A better success rate in training",
              "Faster and more efficient skills development",
              "A positive and rewarding learning experience",
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-gray-500 mt-1">◦</span>
                <strong>{item}</strong>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}