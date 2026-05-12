"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, User, ArrowRight, Video, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Resource = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  image: string | null;
  date: string | null;
  duration: string | null;
  speaker: string | null;
  createdAt: string;
};

export default function WebinairesPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/resources?type=WEBINAIRE")
      .then((res) => res.json())
      .then((data) => { setResources(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };

  const handleClear = () => {
    setSearchInput("");
    setSearchTerm("");
  };

  const filtered = resources.filter((r) =>
    searchTerm === "" ||
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white font-montserrat mb-4">
              Webinaires
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Participez à nos webinaires gratuits animés par des experts de la formation.
            </p>

            {/* Barre de recherche avec bouton */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un webinaire..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setSearchTerm(e.target.value); // filtre en temps réel
                }}
                className="w-full pl-12 pr-32 py-4 rounded-xl text-text-dark focus:outline-none focus:ring-2 focus:ring-orange shadow-lg"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-28 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-orange text-white rounded-lg text-sm font-medium hover:bg-orange-dark transition-colors"
              >
                Rechercher
              </motion.button>
            </form>

            {/* Tag recherche active */}
            {searchTerm && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 mt-3"
              >
                <span className="text-white/80 text-sm">Résultats pour :</span>
                <span className="flex items-center gap-1 px-3 py-1 bg-white/20 text-white rounded-full text-sm">
                  "{searchTerm}"
                  <button onClick={handleClear} className="ml-1 hover:text-orange transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!loading && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">

            {/* Compteur + effacer */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-text-gray">
                <span className="font-bold text-primary">{filtered.length}</span> webinaire
                {filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
                {searchTerm && (
                  <span> pour <span className="text-primary font-medium">"{searchTerm}"</span></span>
                )}
              </p>
              {searchTerm && (
                <button
                  onClick={handleClear}
                  className="text-sm text-text-gray hover:text-primary transition-colors flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Effacer la recherche
                </button>
              )}
            </div>

            {/* État vide */}
            {filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-text-gray text-lg mb-2">
                  Aucun webinaire trouvé
                  {searchTerm && <span> pour <strong>"{searchTerm}"</strong></span>}
                </p>
                <p className="text-text-gray text-sm mb-6">Essayez avec d'autres mots-clés.</p>
                <button
                  onClick={handleClear}
                  className="px-6 py-3 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
                >
                  Réinitialiser la recherche
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link href={`/webinaires/${resource.slug}`}>
                      <motion.div
                        whileHover={{ y: -8 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg h-full flex flex-col cursor-pointer"
                      >
                        <div className="h-48 overflow-hidden">
                          {resource.image ? (
                            <img
                              src={resource.image}
                              alt={resource.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                              <Video className="w-12 h-12 text-white/30" />
                            </div>
                          )}
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="text-base font-bold text-primary font-montserrat mb-2 line-clamp-2">
                            {resource.title}
                          </h3>
                          {resource.excerpt && (
                            <p className="text-text-gray text-sm mb-4 flex-1 line-clamp-3">{resource.excerpt}</p>
                          )}
                          <div className="flex flex-wrap gap-3 text-xs text-text-gray mb-4">
                            {resource.date && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(resource.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                              </span>
                            )}
                            {resource.duration && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {resource.duration} H
                              </span>
                            )}
                            {resource.speaker && (
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {resource.speaker}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-xs text-text-gray">
                              {new Date(resource.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                            </span>
                            <span className="flex items-center gap-1 text-orange text-sm font-medium">
                              Voir le webinaire <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 bg-gradient-to-br from-primary to-primary-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-montserrat mb-4">
              Ne manquez aucun webinaire
            </h2>
            <p className="text-white/80 mb-8">
              Inscrivez-vous pour être notifié de nos prochains webinaires en direct.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-orange text-white rounded-full font-medium hover:bg-orange-dark transition-all"
            >
              S'inscrire aux webinaires
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}