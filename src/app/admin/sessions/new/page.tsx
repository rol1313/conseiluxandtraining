"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";

const gradients = [
  { label: "Bleu primaire", value: "from-primary to-primary-dark" },
  { label: "Orange", value: "from-orange to-orange-dark" },
  { label: "Vert", value: "from-green-600 to-green-800" },
  { label: "Rose", value: "from-rose-500 to-rose-700" },
  { label: "Bleu clair", value: "from-primary-light to-primary" },
];

export default function NewSessionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    startDate: "",
    endDate: "",
    mode: "En ligne",
    location: "",
    duration: "",
    price: "",
    gradient: "from-primary to-primary-dark",
    published: false,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    setForm((prev) => ({ ...prev, title, slug }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        startDate: new Date(form.startDate).toISOString(),
        endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
      }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Erreur lors de la création");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => router.push("/admin/dashboard")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-text-dark" />
          </button>
          <h1 className="text-xl font-bold text-text-dark font-montserrat">Nouvelle session</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col gap-4">
            <h2 className="font-bold text-text-dark text-base">Informations</h2>

            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Titre *</label>
              <input type="text" name="title" value={form.title} onChange={handleTitleChange} required
                placeholder="Ex: Formation Anglais Professionnel"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Slug (URL)</label>
              <input type="text" name="slug" value={form.slug} onChange={handleChange} required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm bg-gray-50" />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                placeholder="Décrivez brièvement la session..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm resize-none" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col gap-4">
            <h2 className="font-bold text-text-dark text-base">Dates & Modalités</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Date de début *</label>
                <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Date de fin</label>
                <input type="date" name="endDate" value={form.endDate} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Mode *</label>
                <select name="mode" value={form.mode} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm">
                  <option value="En ligne">En ligne</option>
                  <option value="Présentiel">Présentiel</option>
                  <option value="Hybride">Hybride</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">
                  {form.mode === "En ligne" ? "Lien / Plateforme" : "Lieu / Ville"}
                </label>
                <input type="text" name="location" value={form.location} onChange={handleChange}
                  placeholder={form.mode === "En ligne" ? "Ex: Zoom, Teams..." : "Ex: Cotonou, Paris..."}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Durée</label>
                <input type="text" name="duration" value={form.duration} onChange={handleChange}
                  placeholder="Ex: 3 mois, 6 mois, 21h"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Prix</label>
                <input type="text" name="price" value={form.price} onChange={handleChange}
                  placeholder="Ex: 150 000 FCFA"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Couleur</label>
              <select name="gradient" value={form.gradient} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm">
                {gradients.map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-text-dark text-base">Publication</h2>
                <p className="text-text-gray text-sm mt-1">Publier ou sauvegarder en brouillon</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="published" checked={form.published} onChange={handleChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                <span className="ml-3 text-sm font-medium text-text-dark">
                  {form.published ? "Publié" : "Brouillon"}
                </span>
              </label>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => router.push("/admin/dashboard")}
              className="px-6 py-3 border border-gray-200 text-text-dark rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
              Annuler
            </button>
            <motion.button type="submit" disabled={loading}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50">
              <Save className="w-4 h-4" />
              {loading ? "Enregistrement..." : "Enregistrer"}
            </motion.button>
          </div>
        </form>
      </div>
    </main>
  );
}