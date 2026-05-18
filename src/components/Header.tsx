"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X, ChevronDown, Power, BookOpen, Video, Mic, Newspaper } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SearchResult = {
  id: number;
  title: string;
  slug: string;
  type: "formation" | "blog" | "resource";
  resourceType?: string;
};

const resourceTypeConfig: Record<string, { label: string; icon: React.ElementType; href: string }> = {
  WEBINAIRE: { label: "Webinaire", icon: Video, href: "/webinaires" },
  INTERVIEW: { label: "Interview", icon: Mic, href: "/interviews" },
  LIVRE_BLANC: { label: "Livre Blanc", icon: BookOpen, href: "/livresblancs" },
  PRESSE: { label: "Presse", icon: Newspaper, href: "/presse" },
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searching, setSearching] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Ferme le dropdown si clic extérieur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Recherche en temps réel avec debounce
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const [formationsRes, blogRes, resourcesRes] = await Promise.all([
          fetch(`/api/formations`),
          fetch(`/api/blog`),
          fetch(`/api/resources`),
        ]);

        const [formations, blogs, resources] = await Promise.all([
          formationsRes.json(),
          blogRes.json(),
          resourcesRes.json(),
        ]);

        const q = searchQuery.toLowerCase();

        const formationResults: SearchResult[] = formations
          .filter((f: any) =>
            f.title.toLowerCase().includes(q) ||
            f.description?.toLowerCase().includes(q)
          )
          .slice(0, 3)
          .map((f: any) => ({ id: f.id, title: f.title, slug: f.slug, type: "formation" as const }));

        const blogResults: SearchResult[] = blogs
          .filter((b: any) =>
            b.title.toLowerCase().includes(q) ||
            b.excerpt?.toLowerCase().includes(q)
          )
          .slice(0, 2)
          .map((b: any) => ({ id: b.id, title: b.title, slug: b.slug, type: "blog" as const }));

        const resourceResults: SearchResult[] = resources
          .filter((r: any) =>
            r.title.toLowerCase().includes(q) ||
            r.excerpt?.toLowerCase().includes(q)
          )
          .slice(0, 2)
          .map((r: any) => ({ id: r.id, title: r.title, slug: r.slug, type: "resource" as const, resourceType: r.type }));

        setResults([...formationResults, ...blogResults, ...resourceResults]);
        setShowResults(true);
      } catch (err) {
        console.error(err);
      } finally {
        setSearching(false);
      }
    }, 300);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowResults(false);
      router.push(`/formations?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getResultHref = (result: SearchResult) => {
    if (result.type === "formation") return `/formations/${result.slug}`;
    if (result.type === "blog") return `/blog/${result.slug}`;
    if (result.type === "resource" && result.resourceType) {
      const config = resourceTypeConfig[result.resourceType];
      return config ? `${config.href}/${result.slug}` : "#";
    }
    return "#";
  };

  const getResultLabel = (result: SearchResult) => {
    if (result.type === "formation") return "Formation";
    if (result.type === "blog") return "Article";
    if (result.type === "resource" && result.resourceType) {
      return resourceTypeConfig[result.resourceType]?.label ?? "Ressource";
    }
    return "Ressource";
  };

  const getResultColor = (result: SearchResult) => {
    if (result.type === "formation") return "bg-primary/10 text-primary";
    if (result.type === "blog") return "bg-orange/10 text-orange";
    return "bg-green-100 text-green-700";
  };

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
      {/* Top bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-10xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-4">
          {/* Social icons */}
          <div className="hidden sm:flex items-center gap-1 sm:gap-2">
            {[
              { name: "facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
              { name: "linkedin", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
              { name: "youtube", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
              { name: "instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
            ].map((social) => (
              <motion.a
                key={social.name}
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </motion.a>
            ))}
          </div>

          {/* Search bar avec dropdown */}
          <div ref={searchRef} className="hidden md:flex items-center flex-1 max-w-md mx-4 lg:mx-8 relative">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Rechercher une formation, article..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => results.length > 0 && setShowResults(true)}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-primary text-sm"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="absolute right-0 top-0 h-full px-3 sm:px-4 bg-orange text-white rounded-r-md hover:bg-orange-dark transition-colors text-sm"
                >
                  {searching ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="hidden sm:inline">Rechercher</span>
                      <Search className="w-4 h-4 sm:hidden" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            {/* Dropdown résultats */}
            <AnimatePresence>
              {showResults && results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden z-50"
                >
                  {results.map((result) => (
                    <Link
                      key={`${result.type}-${result.id}`}
                      href={getResultHref(result)}
                      onClick={() => { setShowResults(false); setSearchQuery(""); }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-dark truncate">{result.title}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${getResultColor(result)}`}>
                        {getResultLabel(result)}
                      </span>
                    </Link>
                  ))}
                  <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setShowResults(false);
                        router.push(`/formations?search=${encodeURIComponent(searchQuery)}`);
                      }}
                      className="text-xs text-primary hover:text-primary-dark font-medium"
                    >
                      Voir tous les résultats pour "{searchQuery}" →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile search button */}
          <Link
            href="/formations"
            className="md:hidden flex items-center justify-center w-9 h-9 border border-gray-300 rounded-full text-gray-600 hover:border-primary hover:text-primary transition-all"
          >
            <Search className="w-4 h-4" />
          </Link>

          {/* Connexion button */}
          <Link
            href="#"
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-full text-gray-700 hover:border-primary hover:text-primary transition-all text-xs sm:text-sm whitespace-nowrap"
          >
            <span className="hidden xs:inline">Connexion</span>
            <Power className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main navigation — inchangée */}
      <div className="max-w-10xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.span whileHover={{ scale: 1.05 }} className="text-2xl font-bold text-primary font-montserrat">
            Conseilux 
          </motion.span>
          <motion.span whileHover={{ scale: 1.05 }} className="text-2xl font-bold text-orange font-montserrat">
            Training and Development
          </motion.span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/notremission" className="text-text-dark hover:text-primary transition-colors text-sm font-medium">Notre mission</Link>
          <Link href="/formations" className="text-text-dark hover:text-primary transition-colors text-sm font-medium">Nos formations</Link>
          <Link href="/nossolutions" className="text-text-dark hover:text-primary transition-colors text-sm font-medium">Nos solutions</Link>
          <Link href="/surmesure" className="text-text-dark hover:text-primary transition-colors text-sm font-medium">Sur-mesure</Link>

          <div className="relative group">
            <button type="button" className="flex items-center gap-1 text-text-dark hover:text-primary transition-colors text-sm font-medium">
              Ressources
              <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <Link href="/catalogue" className="block px-4 py-2 text-sm text-text-dark hover:bg-bg-light hover:text-primary">Catalogue 2026</Link>
              <Link href="/webinaires" className="block px-4 py-2 text-sm text-text-dark hover:bg-bg-light hover:text-primary">Webinaires</Link>
              <Link href="/livresblancs" className="block px-4 py-2 text-sm text-text-dark hover:bg-bg-light hover:text-primary">Livres blancs</Link>
              <Link href="/interviews" className="block px-4 py-2 text-sm text-text-dark hover:bg-bg-light hover:text-primary">Interviews</Link>
              <Link href="/presse" className="block px-4 py-2 text-sm text-text-dark hover:bg-bg-light hover:text-primary">Presse</Link>
            </div>
          </div>

          <div className="relative group">
            <button type="button" className="flex items-center gap-1 text-text-dark hover:text-primary transition-colors text-sm font-medium">
              A propos
              <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <Link href="/pedagogies" className="block px-4 py-2 text-sm text-text-dark hover:bg-bg-light hover:text-primary">Les clés de la pédagogie</Link>
              <Link href="/modalite" className="block px-4 py-2 text-sm text-text-dark hover:bg-bg-light hover:text-primary">Nos modalités de formations</Link>
              <Link href="/formateur" className="block px-4 py-2 text-sm text-text-dark hover:bg-bg-light hover:text-primary">Les formateurs</Link>
              <Link href="/learningpartner" className="block px-4 py-2 text-sm text-text-dark hover:bg-bg-light hover:text-primary">Learning Partner</Link>
              <Link href="/temoignages" className="block px-4 py-2 text-sm text-text-dark hover:bg-bg-light hover:text-primary">Témoignages clients</Link>
              <Link href="/certification" className="block px-4 py-2 text-sm text-text-dark hover:bg-bg-light hover:text-primary">Certifications</Link>
            </div>
          </div>

          <Link href="/blog" className="text-text-dark hover:text-primary transition-colors text-sm font-medium">Blog</Link>
        </nav>

        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/contact" className="hidden md:block px-5 py-2.5 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors text-sm font-medium">
              Contact
            </Link>
          </motion.div>
          <motion.button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden p-2 text-primary border-2 border-primary rounded-lg"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu — inchangé */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t shadow-lg overflow-hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
              <form onSubmit={(e) => { handleSearch(e); setIsMenuOpen(false); }} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher une formation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary text-sm"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange text-white rounded-lg hover:bg-orange-dark transition-colors">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <Link href="/notremission" className="block py-3 px-2 text-text-dark hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Notre mission</Link>
              <Link href="/formations" className="block py-3 px-2 text-text-dark hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Nos formations</Link>
              <Link href="/nossolutions" className="block py-3 px-2 text-text-dark hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Nos solutions</Link>
              <Link href="/surmesure" className="block py-3 px-2 text-text-dark hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Sur-mesure</Link>

              <div className="border-b border-gray-100 pb-2">
                <p className="py-3 px-2 text-text-dark font-medium text-sm">Ressources</p>
                <div className="flex flex-col pl-4">
                  <Link href="/catalogue" className="py-2 px-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>Catalogue 2026</Link>
                  <Link href="/webinaires" className="py-2 px-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>Webinaires</Link>
                  <Link href="/livresblancs" className="py-2 px-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>Livres blancs</Link>
                  <Link href="/interviews" className="py-2 px-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>Interviews</Link>
                  <Link href="/presse" className="py-2 px-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>Presse</Link>
                </div>
              </div>

              <div className="border-b border-gray-100 pb-2">
                <p className="py-3 px-2 text-text-dark font-medium text-sm">A propos</p>
                <div className="flex flex-col pl-4">
                  <Link href="/pedagogies" className="py-2 px-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>Les clés de la pédagogie</Link>
                  <Link href="/modalite" className="py-2 px-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>Nos modalités de formations</Link>
                  <Link href="/formateur" className="py-2 px-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>Les formateurs</Link>
                  <Link href="/learningpartner" className="py-2 px-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>Learning Partner</Link>
                  <Link href="/temoignages" className="py-2 px-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>Témoignages clients</Link>
                  <Link href="/certification" className="py-2 px-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>Certifications</Link>
                </div>
              </div>

              <Link href="/blog" className="block py-3 px-2 text-text-dark hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Blog</Link>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link href="/contact" className="block w-full px-5 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors text-center font-medium" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;