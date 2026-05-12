"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { X, Send, CheckCircle } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import UpcomingFormations from "@/components/UpcomingFormations";

const HeroSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    prenom: "",
    nom: "",
    telephone: "",
    profil: "",
    source: "",
    newsletter: false,
  });
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    const captchaToken = recaptchaRef.current?.getValue();
    if (!captchaToken) {
      alert("Veuillez cocher le reCAPTCHA.");
      return;
    }

    setLoading(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.prenom,
          lastName: form.nom,
          email: form.email,
          phone: form.telephone,
          subject: "Téléchargement catalogue 2026",
          message: `Profil: ${form.profil}\nSource: ${form.source}\nNewsletter: ${form.newsletter ? "Oui" : "Non"}`,
        }),
      });

      setSubmitted(true);

      setTimeout(() => {
        const link = document.createElement("a");
        link.href = "/Catalogue2025--2026.pdf";
        link.download = "Catalogue2025--2026.pdf";
        link.click();
        setTimeout(() => {
          setShowModal(false);
          setSubmitted(false);
          setForm({ email: "", prenom: "", nom: "", telephone: "", profil: "", source: "", newsletter: false });
          recaptchaRef.current?.reset();
        }, 2000);
      }, 500);
    } catch (error) {
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-white py-12 md:py-20 overflow-hidden">
      <div className="max-w-10xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left content */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-orange font-medium text-sm md:text-base"
            >
              Réussir votre Transfo³ par la compétence Humain. IA. RSE
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary font-montserrat"
            >
              Humain. IA. RSE
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/formations"
                className="inline-block px-8 py-4 bg-primary text-white rounded-full hover:bg-primary-dark hover:scale-105 transition-all duration-300 font-medium"
              >
                Trouver votre formation
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <p className="text-text-dark font-semibold">
                Changer la vie des gens et de leur entreprise par la compétence !
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold text-text-dark">4.9/5</span>
                  <span className="text-lg font-bold">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 border border-primary/30 rounded-lg">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span className="text-xs font-semibold text-primary">Qualiopi</span>
                </div>
              </div>
              <UpcomingFormations />
            </motion.div>
          </div>

          {/* Right content - Catalogue banner */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary to-primary-dark min-h-[400px]"
            >
              <div
                className="absolute inset-0 flex flex-col justify-center p-8"
                style={{ backgroundImage: "url('/catalogue.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <h2 className="text-white text-2xl md:text-3xl font-bold font-montserrat mb-2">
                  Catalogue de<br />Formations
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-1.5 bg-orange backdrop-blur text-white rounded-full text-sm cursor-pointer hover:bg-orange-dark transition-colors">
                    <Link href="/formations?category=technologies-numeriques-et-cybersecurite">Technologies Numériques & Cybersécurité</Link>
                  </motion.span>
                  <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-1.5 bg-orange backdrop-blur text-white rounded-full text-sm cursor-pointer hover:bg-orange-dark transition-colors">
                    <Link href="/formations?category=normes-iso-et-conformite">Normes ISO & Conformité</Link>
                  </motion.span>
                  <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-1.5 bg-orange backdrop-blur text-white rounded-full text-sm cursor-pointer hover:bg-orange-dark transition-colors">
                    <Link href="/formations?category=gestion-de-projet-management-et-leadership">Gestion de Projet, Management & leadership</Link>
                  </motion.span>
                  <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-1.5 bg-orange backdrop-blur text-white rounded-full text-sm cursor-pointer hover:bg-orange-dark transition-colors">
                    <Link href="/formations?category=filieres-metiers">Filière Métiers</Link>
                  </motion.span>
                  <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-1.5 bg-orange backdrop-blur text-white rounded-full text-sm cursor-pointer hover:bg-orange-dark transition-colors">
                    <Link href="/formations?category=performance-commerciale">Performance Commerciale</Link>
                  </motion.span>
                  <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-1.5 bg-orange backdrop-blur text-white rounded-full text-sm cursor-pointer hover:bg-orange-dark transition-colors">
                    <Link href="/formations?category=facilitation-professionnelle">Facilitation Professionnelle</Link>
                  </motion.span>
                </div>

                {/* Bouton téléchargement */}
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-block px-6 py-2 bg-orange text-white rounded-full text-sm hover:bg-orange-dark hover:scale-105 transition-all duration-300 w-fit"
                >
                  Télécharger le catalogue 2026
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ y: -5 }}
            className="bg-white border-2 border-primary/20 rounded-2xl p-8 card-shadow"
          >
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.7 }} className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-primary font-montserrat">492</span>
                <span className="text-2xl font-bold text-orange">+</span>
                <span className="text-text-gray">Formations disponibles</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.8 }} className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-primary font-montserrat">10</span>
                <span className="text-2xl font-bold text-orange">ans</span>
                <span className="text-text-gray">D'expériences</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.9 }} className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-primary font-montserrat">99.4</span>
                <span className="text-2xl font-bold text-orange">%</span>
                <span className="text-text-gray">De satisfaction en 2025</span>
              </motion.div>
              <div className="flex items-start gap-2 pt-4">
                <span className="w-3 h-3 bg-orange rounded-full mt-1 flex-shrink-0" />
                <p className="text-sm text-text-dark">
                  Acteurs transformation par la compétence, nous accompagnons les organisations dans l'évolution de leurs pratiques
                </p>
              </div>
              <Link href="/formations" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark hover:gap-3 transition-all duration-300 font-medium">
                Découvrir nos formations <span>→</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ y: -5 }}
            className="relative rounded-2xl overflow-hidden h-80 md:h-auto bg-gradient-to-br from-gray-700 to-gray-900"
          >
            <div
              className="absolute inset-0 flex flex-col justify-end p-8"
              style={{ backgroundImage: "url('/experience.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-1.5 bg-orange backdrop-blur text-white rounded-full text-sm cursor-pointer hover:bg-orange transition-colors">Humain & RSE</motion.span>
                <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-1.5 bg-orange backdrop-blur text-white rounded-full text-sm cursor-pointer hover:bg-orange transition-colors">IA DATA & Digital</motion.span>
                <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-1.5 bg-orange backdrop-blur text-white rounded-full text-sm cursor-pointer hover:bg-orange transition-colors">Langues & Interculturel</motion.span>
              </div>
              <Link href="/formations" className="inline-block px-6 py-2 bg-orange text-white rounded-full text-sm hover:bg-orange-dark hover:scale-105 transition-all duration-300 w-fit">
                Toutes nos formations
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal - en dehors du grid pour être au bon niveau du DOM */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
                <h3 className="text-lg font-bold text-primary font-montserrat">Télécharger le catalogue 2026</h3>
                <button onClick={() => { setShowModal(false); setSubmitted(false); }} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h4 className="text-lg font-bold text-primary font-montserrat mb-2">Merci !</h4>
                    <p className="text-text-gray text-sm">Votre téléchargement va démarrer automatiquement.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleDownload} className="flex flex-col gap-4">
                    <p className="text-text-gray text-sm">Remplissez ce formulaire pour accéder au catalogue de formations 2026.</p>

                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">E-mail *</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-1">Prénom *</label>
                        <input type="text" required value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-1">Nom *</label>
                        <input type="text" required value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">Numéro de téléphone</label>
                      <input type="tel" value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                        placeholder="+229..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">Vous êtes *</label>
                      <select required value={form.profil} onChange={(e) => setForm({ ...form, profil: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm text-text-gray">
                        <option value="">Veuillez sélectionner</option>
                        <option value="salarie">Salarié(e)</option>
                        <option value="demandeur">Demandeur d'emploi</option>
                        <option value="dirigeant">Dirigeant(e)</option>
                        <option value="rh">Responsable RH / Formation</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">Comment avez-vous connu Conseilux ? *</label>
                      <select required value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm text-text-gray">
                        <option value="">Veuillez sélectionner</option>
                        <option value="google">Google</option>
                        <option value="reseaux">Réseaux sociaux</option>
                        <option value="bouche">Bouche à oreille</option>
                        <option value="partenaire">Partenaire</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>

                    <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} />

                    <p className="text-xs text-text-gray leading-relaxed">
                      Conseilux Training s'engage à protéger et à respecter votre vie privée. Nous n'utiliserons vos données personnelles que pour administrer votre compte et vous fournir les produits et services susceptibles de vous intéresser.
                    </p>

                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.newsletter} onChange={(e) => setForm({ ...form, newsletter: e.target.checked })} className="mt-1" />
                      <span className="text-xs text-text-gray">
                        En cochant cette case, j'accepte de recevoir d'autres communications de Conseilux Training. Vous pouvez vous désabonner à tout moment. Consultez notre{" "}
                        <a href="/politique-confidentialite" className="text-orange hover:underline">Politique de confidentialité</a>.
                      </span>
                    </label>

                    <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-orange text-white rounded-full font-medium text-sm hover:bg-orange-dark transition-colors disabled:opacity-50">
                      <Send className="w-4 h-4" />
                      {loading ? "Envoi en cours..." : "Télécharger le catalogue"}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;