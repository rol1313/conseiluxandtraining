"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Send, CheckCircle, X } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string | null;
  company: string | null;
  content: string;
  rating: number;
};

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    formation: "",
    content: "",
    rating: 5,
  });

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          role: form.role,
          company: form.company,
          content: `[Formation : ${form.formation}]\n\n${form.content}`,
          rating: form.rating,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", role: "", company: "", formation: "", content: "", rating: 5 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowForm(false);
    setSubmitted(false);
    setForm({ name: "", role: "", company: "", formation: "", content: "", rating: 5 });
  };

  // Extrait le nom de la formation et l'avis du contenu
  const parseContent = (content: string) => {
    if (content.startsWith("[Formation :")) {
      const closingBracket = content.indexOf("]");
      const formationName = content.substring(12, closingBracket).trim();
      const avisContent = content.substring(closingBracket + 3).trim(); // +3 pour ]\n\n
      return { formationName, avisContent };
    }
    // Ancien format : "Formation : xxx\n\navis"
    if (content.startsWith("Formation :")) {
      const parts = content.split("\n\n");
      const formationName = parts[0].replace("Formation :", "").trim();
      const avisContent = parts.slice(1).join("\n\n").trim();
      return { formationName, avisContent };
    }
    return { formationName: null, avisContent: content };
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-10xl mx-auto px-4">

        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-orange font-medium mb-3">Avis clients</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-montserrat mb-4">
            Ils ont aimé notre démarche
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="mt-2 px-6 py-3 border-2 border-primary text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-all"
          >
            Laisser un avis
          </button>
        </div>

        {/* Testimonials grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12 text-text-gray">
            Aucun avis publié pour le moment. Soyez le premier !
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const { formationName, avisContent } = parseContent(testimonial.content);

              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-2xl p-8 card-shadow card-hover flex flex-col"
                >
                  {/* Icône quote */}
                  <div className="relative mb-4">
                    <div className="absolute -top-4 -left-2 w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center">
                      <Quote className="w-6 h-6 text-orange" />
                    </div>
                  </div>

                  {/* Nom de la formation */}
                  {formationName && (
                    <div className="mt-6 mb-3">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full inline-block">
                        📚 {formationName}
                      </span>
                    </div>
                  )}

                  {/* Avis */}
                  <p className="text-text-gray text-sm leading-relaxed mb-6 flex-1 pt-2">
                    {avisContent}
                  </p>

                  {/* Note */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-orange fill-orange" />
                    ))}
                  </div>

                  {/* Nom */}
                  <p className="font-bold text-primary font-montserrat">
                    {testimonial.name}
                  </p>

                  {/* Poste / Entreprise */}
                  {(testimonial.role || testimonial.company) && (
                    <p className="text-text-gray text-sm mt-0.5">
                      {testimonial.role}
                      {testimonial.role && testimonial.company && " — "}
                      {testimonial.company}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Modal formulaire */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-primary font-montserrat">
                    Laisser un avis
                  </h3>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h4 className="text-lg font-bold text-primary font-montserrat mb-2">
                      Merci pour votre avis !
                    </h4>
                    <p className="text-text-gray text-sm">
                      Votre avis a bien été soumis. Il sera publié après validation par notre équipe.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-6 px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
                    >
                      Fermer
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Nom de la formation — en haut */}
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">
                        Nom de la formation *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.formation}
                        onChange={(e) => setForm({ ...form, formation: e.target.value })}
                        placeholder="Ex: Formation Cybersécurité, Anglais Professionnel..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                      />
                    </div>

                    {/* Nom + Poste */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-1">Nom *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Votre nom"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-1">Poste</label>
                        <input
                          type="text"
                          value={form.role}
                          onChange={(e) => setForm({ ...form, role: e.target.value })}
                          placeholder="Ex: Responsable RH"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                        />
                      </div>
                    </div>

                    {/* Entreprise */}
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">Entreprise</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Nom de votre entreprise"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                      />
                    </div>

                    {/* Note */}
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-2">Note *</label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setForm({ ...form, rating: star })}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-8 h-8 transition-colors ${
                                star <= form.rating
                                  ? "text-orange fill-orange"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                        <span className="text-sm text-text-gray ml-2">{form.rating}/5</span>
                      </div>
                    </div>

                    {/* Avis */}
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">Votre avis *</label>
                      <textarea
                        required
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        rows={4}
                        placeholder="Partagez votre expérience avec nos formations..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-orange text-white rounded-full font-medium text-sm hover:bg-orange-dark transition-colors disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      {submitting ? "Envoi en cours..." : "Soumettre mon avis"}
                    </motion.button>

                    <p className="text-xs text-text-gray text-center">
                      Votre avis sera publié après validation par notre équipe.
                    </p>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TestimonialsSection;