"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Send } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const captchaToken = recaptchaRef.current?.getValue();

    if (!captchaToken) {
      setError("Veuillez cocher la case reCAPTCHA.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, captchaToken }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setEmail("");
        recaptchaRef.current?.reset();
      } else {
        setError(data.error || "Erreur lors de l'inscription.");
        recaptchaRef.current?.reset();
      }
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-primary py-16" id="newsletter">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-8 md:p-12">

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-primary font-montserrat mb-3">
                Inscription confirmée !
              </h3>
              <p className="text-text-gray">
                Merci ! Un email de confirmation vous a été envoyé à <strong>{email || "votre adresse"}</strong>.
              </p>
            </motion.div>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-primary font-montserrat mb-4">
                Notre Newsletter
              </h2>
              <p className="text-text-gray mb-8">
                Recevez l'actualité de la formation et des offres promotionnelles. Saisissez votre adresse email et abonnez-vous sans attendre.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <div>
                  <label htmlFor="email" className="block text-sm text-orange mb-2">
                    Votre email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="exemple@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                  />
                </div>

                {/* reCAPTCHA */}
                <div>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <p className="text-xs text-text-gray">
                  Conseilux Training a besoin des coordonnées que vous nous fournissez pour vous contacter au sujet de nos produits et services. Consultez notre{" "}
                  <a href="/politique-confidentialite" className="text-orange hover:underline">
                    Politique de confidentialité
                  </a>.
                </p>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-8 py-3 bg-orange text-white rounded-full hover:bg-orange-dark transition-colors font-medium disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {loading ? "Inscription en cours..." : "S'abonner"}
                </motion.button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;