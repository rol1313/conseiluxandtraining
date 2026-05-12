"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, Users, Star, ArrowRight, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

type Subcategory = {
  id: number;
  slug: string;
  name: string;
};

type Category = {
  id: number;
  slug: string;
  name: string;
  subcategories: Subcategory[];
};

type Formation = {
  id: number;
  title: string;
  slug: string;
  description: string;
  duration: string;
  level: string;
  rating: number;
  participants: number;
  price: string;
  gradient: string;
  tags: string;
  category: Category;
  subcategory: Subcategory | null;
};

export default function FormationsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") ?? "");
  const [searchInput, setSearchInput] = useState(searchParams.get("search") ?? "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") ?? "all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [formations, setFormations] = useState<Formation[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch formations
  useEffect(() => {
    setLoading(true);
    fetch("/api/formations")
      .then((res) => res.json())
      .then((data) => {
        setFormations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Sync params URL
  useEffect(() => {
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    if (search !== null) {
      setSearchTerm(search);
      setSearchInput(search);
    }
    if (category !== null && category !== selectedCategory) {
      setSelectedCategory(category);
      setSelectedSubcategory("all");
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  // Soumet la recherche et met à jour l'URL
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    const params = new URLSearchParams();
    if (searchInput.trim()) params.set("search", searchInput.trim());
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    router.push(`/formations?${params.toString()}`);
  };

  // Efface la recherche
  const handleClearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
    const params = new URLSearchParams();
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    router.push(`/formations?${params.toString()}`);
  };

  const activeCat = categories.find((c) => c.slug === selectedCategory);
  const hasSubcategories = activeCat && (activeCat.subcategories?.length ?? 0) > 0;

  const filteredFormations = formations.filter((formation) => {
    const tags = formation.tags.split(",").map((t) => t.trim());

    const matchesSearch =
      searchTerm === "" ||
      formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === "all" || formation.category.slug === selectedCategory;

    const matchesSubcategory =
      selectedSubcategory === "all" ||
      formation.subcategory?.slug === selectedSubcategory;

    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white font-montserrat mb-4">
              Nos Formations
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Découvrez notre catalogue de plus de 492 formations pour développer vos compétences
              et celles de vos équipes.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une formation (ex: Leadership, IA, Anglais...)"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    // Filtre en temps réel pendant la frappe
                    setSearchTerm(e.target.value);
                  }}
                  className="w-full pl-12 pr-32 py-4 rounded-xl text-text-dark focus:outline-none focus:ring-2 focus:ring-orange shadow-lg"
                />
                {/* Bouton effacer */}
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-28 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                {/* Bouton rechercher */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-orange text-white rounded-lg text-sm font-medium hover:bg-orange-dark transition-colors"
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
                    <button onClick={handleClearSearch} className="ml-1 hover:text-orange transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filters and results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">

          {/* Filtres */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            {/* Catégories principales */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-text-gray font-medium">Filtrer par :</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedSubcategory("all");
                  const params = new URLSearchParams();
                  if (searchTerm) params.set("search", searchTerm);
                  router.push(`/formations?${params.toString()}`);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-primary text-white"
                    : "bg-white text-text-dark hover:bg-primary/10 border border-gray-200"
                }`}
              >
                Toutes
              </motion.button>
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCategory(category.slug);
                    setSelectedSubcategory("all");
                    const params = new URLSearchParams();
                    if (searchTerm) params.set("search", searchTerm);
                    params.set("category", category.slug);
                    router.push(`/formations?${params.toString()}`);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.slug
                      ? "bg-primary text-white"
                      : "bg-white text-text-dark hover:bg-primary/10 border border-gray-200"
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>

            {/* Sous-catégories */}
            {selectedCategory !== "all" && hasSubcategories && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap items-center gap-2 pl-3 border-l-4 border-primary mt-3"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSubcategory("all")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedSubcategory === "all"
                      ? "bg-orange text-white"
                      : "bg-white text-text-dark hover:bg-orange/10 border border-gray-200"
                  }`}
                >
                  Toutes
                </motion.button>
                {activeCat?.subcategories?.map((sub) => (
                  <motion.button
                    key={sub.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSubcategory(sub.slug)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedSubcategory === sub.slug
                        ? "bg-orange text-white"
                        : "bg-white text-text-dark hover:bg-orange/10 border border-gray-200"
                    }`}
                  >
                    {sub.name}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Results count */}
          <p className="text-text-gray mb-6">
            <span className="font-bold text-primary">{filteredFormations.length}</span> formation
            {filteredFormations.length > 1 ? "s" : ""} trouvée{filteredFormations.length > 1 ? "s" : ""}
            {searchTerm && (
              <span className="text-text-gray"> pour <span className="text-primary font-medium">"{searchTerm}"</span></span>
            )}
          </p>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Formation cards */}
          {!loading && filteredFormations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFormations.map((formation, index) => (
                <motion.div
                  key={formation.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg h-full flex flex-col"
                  >
                    {/* Card header */}
                    <div className={`bg-gradient-to-br ${formation.gradient} p-6 relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full">
                            {formation.level}
                          </span>
                          <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formation.duration} H
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white font-montserrat">
                          {formation.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-text-gray text-sm mb-4 flex-1">
                        {formation.description.length > 100
                          ? formation.description.substring(0, 100) + "..."
                          : formation.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {formation.tags.split(",").map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-text-gray text-xs rounded-full"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-text-gray mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-orange fill-orange" />
                          <span className="font-medium">{formation.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{formation.participants} participants</span>
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-xl font-bold text-primary">{formation.price} FCFA</span>
                        <Link
                          href={`/formations/${formation.slug}`}
                          className="flex items-center gap-2 px-4 py-2 bg-orange text-white rounded-full text-sm font-medium hover:bg-orange-dark transition-colors"
                        >
                          En savoir plus
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}

          {/* No results */}
          {!loading && filteredFormations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-text-gray text-lg mb-2">
                Aucune formation trouvée
                {searchTerm && <span> pour <strong>"{searchTerm}"</strong></span>}
              </p>
              <p className="text-text-gray text-sm mb-6">
                Essayez avec d'autres mots-clés ou réinitialisez les filtres.
              </p>
              <button
                onClick={() => {
                  setSearchInput("");
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedSubcategory("all");
                  router.push("/formations");
                }}
                className="px-6 py-3 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}