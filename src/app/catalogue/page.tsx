"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Send, CheckCircle } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

export default function CataloguePage() {
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

  const handleSubmit = async (e: React.FormEvent) => {
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

      // Déclenche le téléchargement
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = "/Catalogue2025--2026.pdf";
        link.download = "Catalogue2025--2026.pdf";
        link.click();
      }, 500);
    } catch (error) {
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── HERO ── */}
      <section className="max-w-10xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-sm">
          <div className="relative h-72 lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80"
              alt="Catalogue de Formations"
              className="w-full h-full object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="border-2 border-purple-700 rounded-r-xl p-10 flex flex-col justify-between bg-white"
          >
            <p className="text-sm text-gray-500 mb-4">
              Accueil &nbsp;&gt;&nbsp; Formations
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-purple-900 font-montserrat mb-8">
              Catalogue de Formations 2026
            </h1>
            <p className="text-gray-700 leading-relaxed text-base">
              Conseilux Training and Development forme plus de 15 000 apprenants chaque année. Forts de plus
              de 20 ans d'expertise en formation professionnelle à distance, nous
              accompagnons la transformation des compétences et des organisations à
              travers nos pôles <strong>Humain et RSE</strong>,{" "}
              <strong>IA, Data et Digital</strong>, et{" "}
              <strong>Langues et interculturel</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION : Texte + visuel catalogue ── */}
      <section className="max-w-10xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-gray-700 leading-relaxed text-base">
            Trouver la formation qui vous correspond et / ou qui correspond à vos collaborateurs,
            c'est facile !{" "}
            <strong>Découvrez notre catalogue de formations 2026</strong> pour avoir une vision
            d'ensemble de ce que les équipes Conseilux Training and Development peuvent faire pour et avec vous.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-56"
        >
          <div className="rounded-lg overflow-hidden shadow-md">
            <div className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-orange-700 p-6 aspect-square flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white font-bold text-lg leading-tight">
                    Catalogue de<br />Formations
                  </p>
                </div>
                <span className="text-orange-400 text-xs font-semibold">Conseilux Training and Development</span>
              </div>
              <div className="flex justify-center my-2">
                <img
                  src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200&q=80"
                  alt="Arbre dans la main"
                  className="w-28 h-28 object-cover rounded-full opacity-90"
                />
              </div>
              <div>
                <p className="text-white/80 text-xs leading-relaxed">
                  HUMAIN & RSE<br />
                  IA DATA & DIGITAL<br />
                  LANGUES & INTERCULTUREL
                </p>
                <p className="text-white font-bold text-4xl mt-1">2026</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FORMULAIRE TÉLÉCHARGEMENT ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-primary font-montserrat mb-3">
                  Merci !
                </h3>
                <p className="text-text-gray mb-2">
                  Votre catalogue est en cours de téléchargement.
                </p>
                <p className="text-text-gray text-sm mb-8">
                  Un email de confirmation vous a été envoyé.
                </p>
                <button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = "/Catalogue2025--2026.pdf";
                    link.download = "Catalogue2025--2026.pdf";
                    link.click();
                  }}
                  className="px-6 py-3 bg-orange text-white rounded-full text-sm font-medium hover:bg-orange-dark transition-colors"
                >
                  Télécharger à nouveau
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-primary font-montserrat mb-2">
                    Télécharger le catalogue 2026
                  </h2>
                  <p className="text-text-gray text-sm">
                    Remplissez ce formulaire pour accéder gratuitement à notre catalogue de formations.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="exemple@email.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.prenom}
                        onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1">
                        Nom *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.nom}
                        onChange={(e) => setForm({ ...form, nom: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">
                      Numéro de téléphone
                    </label>
                    <input
                      type="tel"
                      value={form.telephone}
                      onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                      placeholder="+229..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">
                      Vous êtes *
                    </label>
                    <select
                      required
                      value={form.profil}
                      onChange={(e) => setForm({ ...form, profil: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm text-text-gray"
                    >
                      <option value="">Veuillez sélectionner</option>
                      <option value="salarie">Salarié(e)</option>
                      <option value="demandeur">Demandeur d'emploi</option>
                      <option value="dirigeant">Dirigeant(e)</option>
                      <option value="rh">Responsable RH / Formation</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">
                      Comment avez-vous connu Conseilux ? *
                    </label>
                    <select
                      required
                      value={form.source}
                      onChange={(e) => setForm({ ...form, source: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm text-text-gray"
                    >
                      <option value="">Veuillez sélectionner</option>
                      <option value="google">Google</option>
                      <option value="reseaux">Réseaux sociaux</option>
                      <option value="bouche">Bouche à oreille</option>
                      <option value="partenaire">Partenaire</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  />

                  <p className="text-xs text-text-gray leading-relaxed">
                    Conseilux Training s'engage à protéger et à respecter votre vie privée. Nous n'utiliserons vos données personnelles que pour administrer votre compte et vous fournir les produits et services susceptibles de vous intéresser.
                  </p>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.newsletter}
                      onChange={(e) => setForm({ ...form, newsletter: e.target.checked })}
                      className="mt-1"
                    />
                    <span className="text-xs text-text-gray">
                      En cochant cette case, j'accepte de recevoir d'autres communications de Conseilux Training. Vous pouvez vous désabonner à tout moment. Consultez notre{" "}
                      <a href="/politique-confidentialite" className="text-orange hover:underline">
                        Politique de confidentialité
                      </a>.
                    </span>
                  </label>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 w-full py-4 bg-orange text-white rounded-full font-medium hover:bg-orange-dark transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? "Envoi en cours..." : "Télécharger le catalogue gratuitement"}
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </main>
  );
}