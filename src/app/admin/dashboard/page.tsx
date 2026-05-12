"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  LogOut,
  LayoutDashboard,
  Star,
  Search,
  X,
  Calendar,
} from "lucide-react";

type Formation = {
  id: number;
  title: string;
  slug: string;
  duration: string;
  level: string;
  price: string;
  published: boolean;
  category: { name: string };
  subcategory: { name: string } | null;
};

type Post = {
  id: number;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
  author: { email: string };
};

type Resource = {
  id: number;
  title: string;
  slug: string;
  type: string;
  published: boolean;
  createdAt: string;
};

type Testimonial = {
  id: number;
  name: string;
  role: string | null;
  company: string | null;
  content: string;
  rating: number;
  published: boolean;
  createdAt: string;
};

type Session = {
  id: number;
  title: string;
  slug: string;
  startDate: string;
  endDate: string | null;
  mode: string;
  location: string | null;
  duration: string | null;
  price: string | null;
  published: boolean;
};

function SearchBar({
  value,
  onChange,
  onClear,
  placeholder,
  count,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
  placeholder: string;
  count: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 flex-1 max-w-sm">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-9 pr-8 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
        />
        {value && (
          <button onClick={onClear} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {value && (
        <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-xs text-text-gray whitespace-nowrap">
          <span className="font-bold text-primary">{count}</span> {label}
        </motion.span>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"formations" | "blog" | "resources" | "testimonials" | "sessions">("formations");

  const [formations, setFormations] = useState<Formation[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchFormations, setSearchFormations] = useState("");
  const [searchBlog, setSearchBlog] = useState("");
  const [searchResources, setSearchResources] = useState("");
  const [searchTestimonials, setSearchTestimonials] = useState("");
  const [searchSessions, setSearchSessions] = useState("");

  useEffect(() => {
    fetch("/api/admin/formations")
      .then((res) => { if (res.status === 401) { router.push("/admin"); return; } return res.json(); })
      .then((data) => { if (data) setFormations(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    fetch("/api/admin/blog").then((r) => r.json()).then(setPosts).catch(console.error);
    fetch("/api/admin/resources").then((r) => r.json()).then(setResources).catch(console.error);
    fetch("/api/admin/testimonials").then((r) => r.json()).then(setTestimonials).catch(console.error);
    fetch("/api/admin/sessions").then((r) => r.json()).then(setSessions).catch(console.error);
  }, []);

  const typeLabel: Record<string, string> = {
    WEBINAIRE: "Webinaire",
    INTERVIEW: "Interview",
    LIVRE_BLANC: "Livre Blanc",
    PRESSE: "Presse",
  };

  const filteredFormations = formations.filter((f) => {
    const q = searchFormations.toLowerCase();
    return f.title.toLowerCase().includes(q) || f.category.name.toLowerCase().includes(q) || f.subcategory?.name.toLowerCase().includes(q) || f.level.toLowerCase().includes(q);
  });

  const filteredPosts = posts.filter((p) => {
    const q = searchBlog.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.author.email.toLowerCase().includes(q);
  });

  const filteredResources = resources.filter((r) => {
    const q = searchResources.toLowerCase();
    return r.title.toLowerCase().includes(q) || typeLabel[r.type]?.toLowerCase().includes(q);
  });

  const filteredTestimonials = testimonials.filter((t) => {
    const q = searchTestimonials.toLowerCase();
    return t.name.toLowerCase().includes(q) || t.content.toLowerCase().includes(q) || t.company?.toLowerCase().includes(q) || t.role?.toLowerCase().includes(q);
  });

  const filteredSessions = sessions.filter((s) => {
    const q = searchSessions.toLowerCase();
    return s.title.toLowerCase().includes(q) || s.mode.toLowerCase().includes(q) || s.location?.toLowerCase().includes(q);
  });

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  const handleTogglePublish = async (id: number, published: boolean) => {
    await fetch(`/api/admin/formations/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ published: !published }) });
    setFormations((prev) => prev.map((f) => f.id === id ? { ...f, published: !published } : f));
  };
  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette formation ?")) return;
    await fetch(`/api/admin/formations/${id}`, { method: "DELETE" });
    setFormations((prev) => prev.filter((f) => f.id !== id));
  };

  const handleTogglePostPublish = async (id: number, published: boolean) => {
    await fetch(`/api/admin/blog/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ published: !published }) });
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, published: !published } : p));
  };
  const handleDeletePost = async (id: number) => {
    if (!confirm("Supprimer cet article ?")) return;
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggleResourcePublish = async (id: number, published: boolean) => {
    await fetch(`/api/admin/resources/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ published: !published }) });
    setResources((prev) => prev.map((r) => r.id === id ? { ...r, published: !published } : r));
  };
  const handleDeleteResource = async (id: number) => {
    if (!confirm("Supprimer cette ressource ?")) return;
    await fetch(`/api/admin/resources/${id}`, { method: "DELETE" });
    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  const handleToggleTestimonialPublish = async (id: number, published: boolean) => {
    const t = testimonials.find((t) => t.id === id);
    if (!t) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...t, published: !published }) });
    setTestimonials((prev) => prev.map((t) => t.id === id ? { ...t, published: !published } : t));
  };
  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm("Supprimer cet avis ?")) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleSessionPublish = async (id: number, published: boolean) => {
    const s = sessions.find((s) => s.id === id);
    if (!s) return;
    await fetch(`/api/admin/sessions/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...s, published: !published }) });
    setSessions((prev) => prev.map((s) => s.id === id ? { ...s, published: !published } : s));
  };
  const handleDeleteSession = async (id: number) => {
    if (!confirm("Supprimer cette session ?")) return;
    await fetch(`/api/admin/sessions/${id}`, { method: "DELETE" });
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const tabs = [
    { key: "formations", label: "Formations", count: formations.length },
    { key: "blog", label: "Blog", count: posts.length },
    { key: "resources", label: "Ressources", count: resources.length },
    { key: "testimonials", label: "Témoignages", count: testimonials.length },
    { key: "sessions", label: "Sessions", count: sessions.length },
  ] as const;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold text-text-dark font-montserrat">Dashboard Admin</h1>
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    activeTab === tab.key ? "bg-primary text-white" : "text-text-gray hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.key ? "bg-white/20 text-white" : "bg-gray-100 text-text-gray"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total formations", value: formations.length, color: "text-primary" },
            { label: "Formations publiées", value: formations.filter((f) => f.published).length, color: "text-green-500" },
            { label: "Total articles", value: posts.length, color: "text-primary" },
            { label: "Articles publiés", value: posts.filter((p) => p.published).length, color: "text-green-500" },
            { label: "Total ressources", value: resources.length, color: "text-primary" },
            { label: "Ressources publiées", value: resources.filter((r) => r.published).length, color: "text-green-500" },
            { label: "Témoignages", value: testimonials.length, color: "text-primary" },
            { label: "Sessions à venir", value: sessions.filter((s) => s.published && new Date(s.startDate) >= new Date()).length, color: "text-orange" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border">
              <p className="text-text-gray text-sm">{stat.label}</p>
              <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* ── Tab Formations ── */}
        {activeTab === "formations" && (
          <>
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <div className="flex items-center gap-4 flex-1 flex-wrap">
                <h2 className="text-lg font-bold text-text-dark">Formations</h2>
                <SearchBar value={searchFormations} onChange={setSearchFormations} onClear={() => setSearchFormations("")} placeholder="Titre, catégorie, niveau..." count={filteredFormations.length} label="résultat(s)" />
              </div>
              <button onClick={() => router.push("/admin/formations/new")} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
                <Plus className="w-4 h-4" /> Nouvelle formation
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-16">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 text-text-gray font-medium">Titre</th>
                      <th className="text-left px-4 py-3 text-text-gray font-medium">Catégorie</th>
                      <th className="text-left px-4 py-3 text-text-gray font-medium">Durée</th>
                      <th className="text-left px-4 py-3 text-text-gray font-medium">Prix</th>
                      <th className="text-left px-4 py-3 text-text-gray font-medium">Statut</th>
                      <th className="text-left px-4 py-3 text-text-gray font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredFormations.length === 0 ? (
                      <tr><td colSpan={6} className="text-center py-12 text-text-gray">{searchFormations ? `Aucune formation pour "${searchFormations}"` : "Aucune formation."}</td></tr>
                    ) : filteredFormations.map((f) => (
                      <motion.tr key={f.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-text-dark max-w-xs truncate">{f.title}</td>
                        <td className="px-4 py-3 text-text-gray">{f.category.name}{f.subcategory && <span className="block text-xs text-gray-400">{f.subcategory.name}</span>}</td>
                        <td className="px-4 py-3 text-text-gray">{f.duration}</td>
                        <td className="px-4 py-3 text-text-gray">{f.price}</td>
                        <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${f.published ? "bg-green-100 text-green-600" : "bg-orange/10 text-orange"}`}>{f.published ? "Publié" : "Brouillon"}</span></td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleTogglePublish(f.id, f.published)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">{f.published ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-green-500" />}</button>
                            <button onClick={() => router.push(`/admin/formations/${f.id}/edit`)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"><Pencil className="w-4 h-4 text-primary" /></button>
                            <button onClick={() => handleDelete(f.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4 text-red-400" /></button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ── Tab Blog ── */}
        {activeTab === "blog" && (
          <>
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <div className="flex items-center gap-4 flex-1 flex-wrap">
                <h2 className="text-lg font-bold text-text-dark">Articles</h2>
                <SearchBar value={searchBlog} onChange={setSearchBlog} onClear={() => setSearchBlog("")} placeholder="Titre, auteur..." count={filteredPosts.length} label="résultat(s)" />
              </div>
              <button onClick={() => router.push("/admin/blog/new")} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
                <Plus className="w-4 h-4" /> Nouvel article
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Titre</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Auteur</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Date</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Statut</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPosts.length === 0 ? (
                    <tr><td colSpan={5} className="text-center py-12 text-text-gray">{searchBlog ? `Aucun article pour "${searchBlog}"` : "Aucun article."}</td></tr>
                  ) : filteredPosts.map((p) => (
                    <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-text-dark max-w-xs truncate">{p.title}</td>
                      <td className="px-4 py-3 text-text-gray text-xs">{p.author.email}</td>
                      <td className="px-4 py-3 text-text-gray">{new Date(p.createdAt).toLocaleDateString("fr-FR")}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${p.published ? "bg-green-100 text-green-600" : "bg-orange/10 text-orange"}`}>{p.published ? "Publié" : "Brouillon"}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleTogglePostPublish(p.id, p.published)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">{p.published ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-green-500" />}</button>
                          <button onClick={() => router.push(`/admin/blog/${p.id}/edit`)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"><Pencil className="w-4 h-4 text-primary" /></button>
                          <button onClick={() => handleDeletePost(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4 text-red-400" /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── Tab Resources ── */}
        {activeTab === "resources" && (
          <>
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <div className="flex items-center gap-4 flex-1 flex-wrap">
                <h2 className="text-lg font-bold text-text-dark">Ressources</h2>
                <SearchBar value={searchResources} onChange={setSearchResources} onClear={() => setSearchResources("")} placeholder="Titre, type..." count={filteredResources.length} label="résultat(s)" />
              </div>
              <button onClick={() => router.push("/admin/resources/new")} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
                <Plus className="w-4 h-4" /> Nouvelle ressource
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Titre</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Type</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Date</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Statut</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredResources.length === 0 ? (
                    <tr><td colSpan={5} className="text-center py-12 text-text-gray">{searchResources ? `Aucune ressource pour "${searchResources}"` : "Aucune ressource."}</td></tr>
                  ) : filteredResources.map((r) => (
                    <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-text-dark max-w-xs truncate">{r.title}</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">{typeLabel[r.type]}</span></td>
                      <td className="px-4 py-3 text-text-gray">{new Date(r.createdAt).toLocaleDateString("fr-FR")}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${r.published ? "bg-green-100 text-green-600" : "bg-orange/10 text-orange"}`}>{r.published ? "Publié" : "Brouillon"}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleToggleResourcePublish(r.id, r.published)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">{r.published ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-green-500" />}</button>
                          <button onClick={() => router.push(`/admin/resources/${r.id}/edit`)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"><Pencil className="w-4 h-4 text-primary" /></button>
                          <button onClick={() => handleDeleteResource(r.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4 text-red-400" /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── Tab Testimonials ── */}
        {activeTab === "testimonials" && (
          <>
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <div className="flex items-center gap-4 flex-1 flex-wrap">
                <h2 className="text-lg font-bold text-text-dark flex items-center gap-2">
                  Témoignages
                  {testimonials.filter((t) => !t.published).length > 0 && (
                    <span className="px-2 py-0.5 bg-orange/10 text-orange text-xs rounded-full font-medium">
                      {testimonials.filter((t) => !t.published).length} en attente
                    </span>
                  )}
                </h2>
                <SearchBar value={searchTestimonials} onChange={setSearchTestimonials} onClear={() => setSearchTestimonials("")} placeholder="Nom, entreprise, contenu..." count={filteredTestimonials.length} label="résultat(s)" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Client</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Avis</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Note</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Date</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Statut</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredTestimonials.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-12 text-text-gray">{searchTestimonials ? `Aucun témoignage pour "${searchTestimonials}"` : "Aucun témoignage."}</td></tr>
                  ) : filteredTestimonials.map((t) => (
                    <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`hover:bg-gray-50 transition-colors ${!t.published ? "bg-orange/5" : ""}`}>
                      <td className="px-4 py-3">
                        <p className="font-medium text-text-dark">{t.name}</p>
                        {t.role && <p className="text-xs text-text-gray">{t.role}</p>}
                        {t.company && <p className="text-xs text-text-gray">{t.company}</p>}
                      </td>
                      <td className="px-4 py-3 text-text-gray max-w-xs"><p className="line-clamp-2 text-xs">{t.content}</p></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-0.5">
                          {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3 h-3 text-orange fill-orange" />)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-text-gray text-xs">{new Date(t.createdAt).toLocaleDateString("fr-FR")}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${t.published ? "bg-green-100 text-green-600" : "bg-orange/10 text-orange"}`}>{t.published ? "Publié" : "En attente"}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleToggleTestimonialPublish(t.id, t.published)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" title={t.published ? "Dépublier" : "Publier"}>{t.published ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-green-500" />}</button>
                          <button onClick={() => handleDeleteTestimonial(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4 text-red-400" /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── Tab Sessions ── */}
        {activeTab === "sessions" && (
          <>
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <div className="flex items-center gap-4 flex-1 flex-wrap">
                <h2 className="text-lg font-bold text-text-dark flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Sessions programmées
                </h2>
                <SearchBar value={searchSessions} onChange={setSearchSessions} onClear={() => setSearchSessions("")} placeholder="Titre, mode, lieu..." count={filteredSessions.length} label="résultat(s)" />
              </div>
              <button onClick={() => router.push("/admin/sessions/new")} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
                <Plus className="w-4 h-4" /> Nouvelle session
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Titre</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Date début</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Date fin</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Mode</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Lieu</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Durée</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Statut</th>
                    <th className="text-left px-4 py-3 text-text-gray font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSessions.length === 0 ? (
                    <tr><td colSpan={8} className="text-center py-12 text-text-gray">{searchSessions ? `Aucune session pour "${searchSessions}"` : "Aucune session programmée."}</td></tr>
                  ) : filteredSessions.map((s) => (
                    <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-text-dark max-w-xs truncate">{s.title}</td>
                      <td className="px-4 py-3 text-text-gray text-xs">{new Date(s.startDate).toLocaleDateString("fr-FR")}</td>
                      <td className="px-4 py-3 text-text-gray text-xs">{s.endDate ? new Date(s.endDate).toLocaleDateString("fr-FR") : "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          s.mode === "En ligne" ? "bg-blue-100 text-blue-700" :
                          s.mode === "Présentiel" ? "bg-green-100 text-green-700" :
                          "bg-purple-100 text-purple-700"
                        }`}>
                          {s.mode}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-text-gray text-xs">{s.location ?? "—"}</td>
                      <td className="px-4 py-3 text-text-gray text-xs">{s.duration ?? "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.published ? "bg-green-100 text-green-600" : "bg-orange/10 text-orange"}`}>
                          {s.published ? "Publié" : "Brouillon"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleToggleSessionPublish(s.id, s.published)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">{s.published ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-green-500" />}</button>
                          <button onClick={() => router.push(`/admin/sessions/${s.id}/edit`)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"><Pencil className="w-4 h-4 text-primary" /></button>
                          <button onClick={() => handleDeleteSession(s.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4 text-red-400" /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </div>
    </main>
  );
}