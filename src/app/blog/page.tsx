"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Search, BookOpen, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string | null;
  published: boolean;
  createdAt: string;
  author: { email: string };
};

export default function BlogPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
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

  const filteredPosts = posts.filter((post) =>
    searchTerm === "" ||
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredPosts = filteredPosts.slice(0, 2);
  const otherPosts = filteredPosts.slice(2);

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
            <h1 className="text-3xl md:text-5xl font-bold text-white font-montserrat mb-4">
              Blog & Actualités
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Découvrez nos articles sur les soft skills, l'IA, le financement
              de la formation, la RSE et bien plus encore.
            </p>

            {/* Barre de recherche avec bouton */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  // Filtre en temps réel
                  setSearchTerm(e.target.value);
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
        <>
          {/* Articles à la une */}
          {featuredPosts.length > 0 && searchTerm === "" && (
            <section className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-primary font-montserrat mb-8">
                  Articles à la une
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {featuredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <motion.div
                          whileHover={{ y: -8 }}
                          className="relative rounded-2xl overflow-hidden h-72 md:h-80 cursor-pointer"
                        >
                          {post.image ? (
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                              <BookOpen className="w-24 h-24 text-white/20" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-xl font-bold text-white font-montserrat mb-2 line-clamp-2">{post.title}</h3>
                            <p className="text-white/70 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                            <span className="text-white/60 text-xs">
                              {new Date(post.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                            </span>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Tous les articles */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <p className="text-text-gray">
                  <span className="font-bold text-primary">{filteredPosts.length}</span> article
                  {filteredPosts.length > 1 ? "s" : ""} trouvé{filteredPosts.length > 1 ? "s" : ""}
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

              {filteredPosts.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-text-gray text-lg mb-2">
                    Aucun article trouvé
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
                  {(searchTerm === "" ? otherPosts : filteredPosts).map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <motion.div
                          whileHover={{ y: -8 }}
                          className="bg-white rounded-2xl overflow-hidden shadow-lg h-full flex flex-col cursor-pointer"
                        >
                          <div className="h-48 overflow-hidden">
                            {post.image ? (
                              <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                                <BookOpen className="w-12 h-12 text-white/30" />
                              </div>
                            )}
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-base font-bold text-primary font-montserrat mb-2 line-clamp-2">{post.title}</h3>
                            <p className="text-text-gray text-sm mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <span className="text-xs text-text-gray">
                                {new Date(post.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                              </span>
                              <span className="flex items-center gap-1 text-orange text-sm font-medium">
                                Lire <ArrowRight className="w-4 h-4" />
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Newsletter CTA */}
          <NewsletterSection />
        </>
      )}

      <Footer />
    </main>
  );
}