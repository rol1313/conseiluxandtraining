"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock, Users, Star, ArrowLeft, ArrowRight,
  CheckCircle, ChevronRight
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Formation = {
  id: number;
  title: string;
  slug: string;
  description: string;
  objectives: string | null;
  program: string | null;
  prerequisites: string | null;
  strengths: string | null;
  forWho: string | null;
  trainers: string | null;
  certifications: string | null;
  image: string | null;
  modalities: string | null;
  badges: string | null;
  duration: string;
  level: string;
  rating: number;
  participants: number;
  price: string;
  gradient: string;
  tags: string;
  categoryId: number;
  category: { id: number; name: string; slug: string };
  subcategory: { name: string; slug: string } | null;
};

export default function FormationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [formation, setFormation] = useState<Formation | null>(null);
  const [similar, setSimilar] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "", prenom: "", nom: "", telephone: "", profil: "", source: "", newsletter: false,
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`/api/formations/${slug}`)
      .then((res) => {
        if (res.status === 404) { router.push("/formations"); return; }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setFormation(data);
          setLoading(false);
          fetch(`/api/formations/similar?categoryId=${data.categoryId}&exclude=${slug}`)
            .then((r) => r.json())
            .then(setSimilar);
        }
      })
      .catch(() => setLoading(false));
  }, [slug, router]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.prenom,
          lastName: formData.nom,
          email: formData.email,
          phone: formData.telephone,
          subject: `Demande d'information - ${formation?.title}`,
          message: `Profil: ${formData.profil}\nSource: ${formData.source}\nNewsletter: ${formData.newsletter ? "Oui" : "Non"}\n\nFormation: ${formation?.title}\nPrix: ${formation?.price} FCFA\nDurée: ${formation?.duration}H`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Erreur lors de l'envoi. Veuillez réessayer.");
      }
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center py-32">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!formation) return null;

  const tags = formation.tags.split(",").map((t) => t.trim());
  const badges = formation.badges?.split(",").map((b) => b.trim()) ?? [];
  const modalities = formation.modalities?.split(",").map((m) => m.trim()) ?? [];
  const objectives = formation.objectives?.split("\n").filter(Boolean) ?? [];
  const prerequisites = formation.prerequisites?.split("\n").filter(Boolean) ?? [];
  const strengths = formation.strengths?.split("\n").filter(Boolean) ?? [];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-text-gray flex-wrap">
          <Link href="/" className="hover:text-primary">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/formations" className="hover:text-primary">Formations</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/formations?category=${formation.category.slug}`} className="hover:text-primary">
            {formation.category.name}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-dark font-medium truncate max-w-xs">{formation.title}</span>
        </div>
      </div>

      {/* Hero section */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Image gauche */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {formation.image ? (
                <img
                  src={formation.image}
                  alt={formation.title}
                  className="w-full h-80 object-cover rounded-2xl"
                />
              ) : (
                <div className={`w-full h-80 bg-gradient-to-br ${formation.gradient} rounded-2xl flex items-center justify-center`}>
                  <span className="text-white text-6xl font-bold opacity-30">
                    {formation.title.charAt(0)}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Infos droite */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white border-2 border-primary/20 rounded-2xl p-6"
            >
              {/* Catégorie */}
              <p className="text-primary text-sm font-medium mb-2">
                {formation.category.name}
                {formation.subcategory && ` › ${formation.subcategory.name}`}
              </p>

              {/* Titre */}
              <h1 className="text-2xl md:text-3xl font-bold text-orange font-montserrat mb-4">
                {formation.title}
              </h1>

              {/* Modalités */}
              {modalities.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {modalities.map((m) => (
                    <span key={m} className="text-sm text-text-gray">{m}</span>
                  ))}
                </div>
              )}

              {/* Badges */}
              {badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {badges.map((b) => (
                    <span key={b} className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                      {b}
                    </span>
                  ))}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-text-gray border-t border-gray-100 pt-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{formation.duration} H</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-orange fill-orange" />
                  <span>{formation.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{formation.participants} participants</span>
                </div>
              </div>

              {/* Niveau */}
              <div className="mt-3">
                <span className="px-3 py-1 bg-gray-100 text-text-gray text-xs rounded-full">
                  {formation.level}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description + Objectifs */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white border-2 border-orange/30 rounded-2xl p-6"
            >
              <p className="text-text-gray leading-relaxed">{formation.description}</p>
            </motion.div>

            {/* Objectifs */}
            {objectives.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white border-2 border-orange/30 rounded-2xl p-6"
              >
                <h2 className="text-xl font-bold text-orange font-montserrat mb-4">Objectifs</h2>
                <ul className="flex flex-col gap-3">
                  {objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-gray text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Programme + Formulaire */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Programme */}
            <div className="lg:col-span-2">
              {formation.program && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white border-2 border-orange/30 rounded-2xl p-6"
                >
                  <h2 className="text-xl font-bold text-orange font-montserrat mb-4">Programme</h2>
                  <div className="prose prose-sm max-w-none text-text-gray whitespace-pre-line">
                    {formation.program}
                  </div>
                </motion.div>
              )}

              {/* Prérequis */}
              {prerequisites.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white border-2 border-orange/30 rounded-2xl p-6 mt-6"
                >
                  <h2 className="text-xl font-bold text-orange font-montserrat mb-4">Prérequis</h2>
                  <ul className="flex flex-col gap-2">
                    {prerequisites.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-text-gray text-sm">
                        <span className="w-2 h-2 bg-orange rounded-full mt-1.5 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Points forts */}
              {strengths.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white border-2 border-orange/30 rounded-2xl p-6 mt-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-1 bg-orange rounded" />
                    <h2 className="text-xl font-bold text-orange font-montserrat">Les points forts</h2>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-text-gray text-sm">
                        <span className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Pour qui */}
              {formation.forWho && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white border-2 border-orange/30 rounded-2xl p-6 mt-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-1 bg-orange rounded" />
                    <h2 className="text-xl font-bold text-orange font-montserrat">Pour qui ?</h2>
                  </div>
                  <p className="text-text-gray text-sm leading-relaxed">{formation.forWho}</p>
                </motion.div>
              )}

              {/* Formateurs */}
              {formation.trainers && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white border-2 border-orange/30 rounded-2xl p-6 mt-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-1 bg-orange rounded" />
                    <h2 className="text-xl font-bold text-orange font-montserrat">Les formateurs</h2>
                  </div>
                  <p className="text-text-gray text-sm leading-relaxed whitespace-pre-line">
                    {formation.trainers}
                  </p>
                </motion.div>
              )}

              {/* Certifications */}
              {formation.certifications && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white border-2 border-orange/30 rounded-2xl p-6 mt-6"
                >
                  <h2 className="text-xl font-bold text-orange font-montserrat mb-4">Certifications</h2>
                  <p className="text-text-gray text-sm">{formation.certifications}</p>
                </motion.div>
              )}
            </div>

            {/* Formulaire sticky */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white border-2 border-orange rounded-2xl p-6"
                >
                  <h2 className="text-xl font-bold text-orange font-montserrat text-center mb-2">
                    L&apos;essentiel
                  </h2>

                  <div className="flex justify-between text-sm py-3 border-b border-gray-100">
                    <span className="font-medium text-text-dark">Durée</span>
                    <span className="text-text-gray">{formation.duration} H</span>
                  </div>
                  <div className="flex justify-between text-sm py-3 border-b border-gray-100">
                    <span className="font-medium text-text-dark">Prix</span>
                    <span className="text-orange font-bold">{formation.price} FCFA</span>
                  </div>

                  {submitted ? (
                    <div className="mt-4 text-center py-6">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <p className="text-text-dark font-medium">Demande envoyée !</p>
                      <p className="text-text-gray text-sm mt-1">Nous vous contacterons rapidement.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
                      <input
                        type="email"
                        placeholder="E-mail *"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2.5 border border-orange/30 rounded-lg text-sm focus:outline-none focus:border-orange bg-orange/5"
                      />
                      <input
                        type="text"
                        placeholder="Prénom *"
                        required
                        value={formData.prenom}
                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                        className="w-full px-3 py-2.5 border border-orange/30 rounded-lg text-sm focus:outline-none focus:border-orange bg-orange/5"
                      />
                      <input
                        type="text"
                        placeholder="Nom *"
                        required
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="w-full px-3 py-2.5 border border-orange/30 rounded-lg text-sm focus:outline-none focus:border-orange bg-orange/5"
                      />
                      <input
                        type="tel"
                        placeholder="Numéro de téléphone *"
                        required
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        className="w-full px-3 py-2.5 border border-orange/30 rounded-lg text-sm focus:outline-none focus:border-orange bg-orange/5"
                      />
                      <select
                        required
                        value={formData.profil}
                        onChange={(e) => setFormData({ ...formData, profil: e.target.value })}
                        className="w-full px-3 py-2.5 border border-orange/30 rounded-lg text-sm focus:outline-none focus:border-orange bg-orange/5 text-text-gray"
                      >
                        <option value="">Vous êtes *</option>
                        <option value="salarie">Salarié(e)</option>
                        <option value="demandeur">Demandeur d&apos;emploi</option>
                        <option value="dirigeant">Dirigeant(e)</option>
                        <option value="rh">Responsable RH/Formation</option>
                        <option value="autre">Autre</option>
                      </select>
                      <select
                        value={formData.source}
                        onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                        className="w-full px-3 py-2.5 border border-orange/30 rounded-lg text-sm focus:outline-none focus:border-orange bg-orange/5 text-text-gray"
                      >
                        <option value="">Comment avez-vous connu Conseilux ?</option>
                        <option value="google">Google</option>
                        <option value="reseaux">Réseaux sociaux</option>
                        <option value="bouche">Bouche à oreille</option>
                        <option value="autre">Autre</option>
                      </select>

                      <label className="flex items-start gap-2 text-xs text-text-gray cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.newsletter}
                          onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                          className="mt-0.5"
                        />
                        J&apos;accepte de recevoir des communications de Conseilux Training
                      </label>

                      {error && (
                        <p className="text-red-500 text-xs text-center">{error}</p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-orange text-white rounded-full font-medium text-sm hover:bg-orange-dark transition-colors disabled:opacity-50"
                      >
                        {submitting ? "Envoi en cours..." : "Soumettre"}
                      </motion.button>
                    </form>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formations similaires */}
      {similar.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-primary font-montserrat text-center mb-8">
              Ces formations peuvent vous intéresser
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similar.map((f) => (
                <motion.div
                  key={f.id}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-5 cursor-pointer"
                  onClick={() => router.push(`/formations/${f.slug}`)}
                >
                  <span className="px-3 py-1 bg-orange text-white text-xs font-bold rounded-full">
                    {f.category.name}
                  </span>
                  <h3 className="text-primary font-bold mt-3 mb-2 line-clamp-3">{f.title}</h3>
                  <p className="text-orange text-sm font-medium mb-2">{f.duration}</p>
                  <p className="text-text-gray text-sm line-clamp-2">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}