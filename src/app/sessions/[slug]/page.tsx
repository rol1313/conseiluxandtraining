"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, Calendar, Clock, MapPin,
  Video, Users, Send, CheckCircle, ChevronRight
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Session = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
  mode: string;
  location: string | null;
  duration: string | null;
  price: string | null;
  gradient: string;
};

const WHATSAPP_NUMBER = "22890546464";

const modeConfig: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  "En ligne": { color: "text-blue-700", bg: "bg-blue-100", icon: Video },
  "Présentiel": { color: "text-green-700", bg: "bg-green-100", icon: MapPin },
  "Hybride": { color: "text-purple-700", bg: "bg-purple-100", icon: Users },
};

export default function SessionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    telephone: "",
    email: "",
    profil: "",
    message: "",
  });

  useEffect(() => {
    fetch(`/api/sessions/${slug}`)
      .then((res) => {
        if (res.status === 404) { router.push("/"); return; }
        return res.json();
      })
      .then((data) => {
        if (data) setSession(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = encodeURIComponent(
      `Bonjour, je souhaite m'inscrire à la session suivante :\n\n` +
      `📚 *${session?.title}*\n` +
      `📅 Début : ${session?.startDate ? new Date(session.startDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : ""}\n` +
      `${session?.endDate ? `📅 Fin : ${new Date(session.endDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}\n` : ""}` +
      `🖥️ Mode : ${session?.mode}\n` +
      `${session?.location ? `📍 Lieu : ${session.location}\n` : ""}` +
      `${session?.duration ? `⏱️ Durée : ${session.duration}\n` : ""}` +
      `${session?.price ? `💰 Prix : ${session.price}\n` : ""}` +
      `\n👤 *Mes informations :*\n` +
      `Prénom : ${form.prenom}\n` +
      `Nom : ${form.nom}\n` +
      `Téléphone : ${form.telephone}\n` +
      `Email : ${form.email}\n` +
      `Profil : ${form.profil}\n` +
      `${form.message ? `\nMessage : ${form.message}` : ""}`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    setSubmitted(true);
  };

  if (loading) return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex justify-center items-center py-32">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
      <Footer />
    </main>
  );

  if (!session) return null;

  const config = modeConfig[session.mode] ?? modeConfig["En ligne"];
  const ModeIcon = config.icon;

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-text-gray flex-wrap">
          <Link href="/" className="hover:text-primary">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-dark font-medium truncate max-w-xs">{session.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <Link href="/" className="flex items-center gap-2 text-text-gray hover:text-primary text-sm mb-8">
          <ArrowLeft className="w-4 h-4" /> Retour
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Infos session */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Hero card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`bg-gradient-to-br ${session.gradient} rounded-2xl p-8 text-white`}
            >
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 ${config.bg} ${config.color}`}>
                <ModeIcon className="w-3.5 h-3.5" />
                {session.mode}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold font-montserrat mb-4">
                {session.title}
              </h1>
              {session.description && (
                <p className="text-white/80 leading-relaxed">{session.description}</p>
              )}
            </motion.div>

            {/* Détails */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border p-6"
            >
              <h2 className="text-lg font-bold text-primary font-montserrat mb-5">
                Informations sur la session
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-text-gray mb-0.5">Date de début</p>
                    <p className="font-medium text-text-dark text-sm">
                      {new Date(session.startDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                </div>

                {session.endDate && (
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-text-gray mb-0.5">Date de fin</p>
                      <p className="font-medium text-text-dark text-sm">
                        {new Date(session.endDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                )}

                {session.duration && (
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-text-gray mb-0.5">Durée</p>
                      <p className="font-medium text-text-dark text-sm">{session.duration} Mois</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <ModeIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-text-gray mb-0.5">Mode</p>
                    <p className="font-medium text-text-dark text-sm">{session.mode}</p>
                  </div>
                </div>

                {session.location && (
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-text-gray mb-0.5">
                        {session.mode === "En ligne" ? "Plateforme" : "Lieu"}
                      </p>
                      <p className="font-medium text-text-dark text-sm">{session.location}</p>
                    </div>
                  </div>
                )}

                {session.price && (
                  <div className="flex items-start gap-3 p-4 bg-orange/5 border border-orange/20 rounded-xl">
                    
                    <div>
                      <p className="text-xs text-text-gray mb-0.5">Prix</p>
                      <p className="font-bold text-orange text-sm">{session.price} FCFA</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* CTA WhatsApp visible */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-green-800 text-sm">Inscrivez-vous via WhatsApp</p>
                <p className="text-green-700 text-xs mt-0.5">Remplissez le formulaire ci-contre et vous serez redirigé vers WhatsApp</p>
              </div>
            </motion.div>
          </div>

          {/* Formulaire sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-sm border-2 border-green-400 p-6"
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-lg font-bold text-primary font-montserrat mb-2">
                      Redirection WhatsApp !
                    </h3>
                    <p className="text-text-gray text-sm mb-4">
                      Une fenêtre WhatsApp s'est ouverte avec vos informations. Envoyez le message pour confirmer votre inscription.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-sm text-primary hover:text-primary-dark font-medium"
                    >
                      Recommencer
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                      <h2 className="text-lg font-bold text-text-dark font-montserrat">
                        S'inscrire via WhatsApp
                      </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                      <div>
                        <label className="block text-xs font-medium text-text-dark mb-1">Prénom *</label>
                        <input
                          type="text"
                          required
                          value={form.prenom}
                          onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                          placeholder="Votre prénom"
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-400 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-text-dark mb-1">Nom *</label>
                        <input
                          type="text"
                          required
                          value={form.nom}
                          onChange={(e) => setForm({ ...form, nom: e.target.value })}
                          placeholder="Votre nom"
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-400 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-text-dark mb-1">Téléphone *</label>
                        <input
                          type="tel"
                          required
                          value={form.telephone}
                          onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                          placeholder="+229..."
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-400 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-text-dark mb-1">Email *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="exemple@email.com"
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-400 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-text-dark mb-1">Vous êtes *</label>
                        <select
                          required
                          value={form.profil}
                          onChange={(e) => setForm({ ...form, profil: e.target.value })}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-400 text-sm text-text-gray"
                        >
                          <option value="">Sélectionner</option>
                          <option value="Salarié(e)">Salarié(e)</option>
                          <option value="Demandeur d'emploi">Demandeur d'emploi</option>
                          <option value="Dirigeant(e)">Dirigeant(e)</option>
                          <option value="Responsable RH/Formation">Responsable RH/Formation</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-text-dark mb-1">Message (optionnel)</label>
                        <textarea
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          rows={3}
                          placeholder="Question ou information complémentaire..."
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-400 text-sm resize-none"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white rounded-full font-medium text-sm hover:bg-green-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        S'inscrire via WhatsApp
                      </motion.button>

                      <p className="text-xs text-text-gray text-center">
                        Vous serez redirigé vers WhatsApp avec vos informations pré-remplies.
                      </p>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}