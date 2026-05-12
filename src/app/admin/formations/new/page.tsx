"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

type Category = {
  id: number;
  name: string;
  slug: string;
  subcategories: { id: number; name: string; slug: string }[];
};

const gradients = [
  { label: "Bleu primaire", value: "from-primary to-primary-dark" },
  { label: "Orange", value: "from-orange to-orange-dark" },
  { label: "Vert", value: "from-green-600 to-green-800" },
  { label: "Rose", value: "from-rose-500 to-rose-700" },
  { label: "Bleu clair", value: "from-primary-light to-primary" },
];

const levels = ["Débutant", "Intermédiaire", "Avancé", "Tous niveaux"];

export default function NewFormationPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const [form, setForm] = useState({
  title: "",
  slug: "",
  description: "",
  objectives: "",
  program: "",
  prerequisites: "",
  strengths: "",
  forWho: "",
  trainers: "",
  certifications: "",
  image: "",
  modalities: "",
  badges: "",
  duration: "",
  level: "Débutant",
  price: "",
  gradient: "from-primary to-primary-dark",
  tags: "",
  published: false,
  categoryId: "",
  subcategoryId: "",
});

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  // Auto-génère le slug depuis le titre
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
      // Reset subcategory si on change de catégorie
      ...(name === "categoryId" ? { subcategoryId: "" } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/formations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        categoryId: Number(form.categoryId),
        subcategoryId: form.subcategoryId ? Number(form.subcategoryId) : null,
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

  const activeCat = categories.find((c) => c.id === Number(form.categoryId));

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-text-dark" />
          </button>
          <h1 className="text-xl font-bold text-text-dark font-montserrat">
            Nouvelle formation
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          
          {/* Infos principales */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col gap-4">
        <h2 className="font-bold text-text-dark text-base">Informations générales</h2>

        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Titre *</label>
          <input type="text" name="title" value={form.title} onChange={handleTitleChange} required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Slug (URL)</label>
          <input type="text" name="slug" value={form.slug} onChange={handleChange} required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm bg-gray-50" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Description *</label>
          <textarea name="description" value={form.description} onChange={handleChange} required rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">
            Objectifs <span className="text-gray-400 text-xs">(un par ligne)</span>
          </label>
          <textarea name="objectives" value={form.objectives} onChange={handleChange} rows={4}
            placeholder="Définir une stratégie...&#10;Utiliser les outils d'IA..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Programme</label>
          <textarea name="program" value={form.program} onChange={handleChange} rows={6}
            placeholder="Jour 1 : ...&#10;Jour 2 : ..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">
            Prérequis <span className="text-gray-400 text-xs">(un par ligne)</span>
          </label>
          <textarea name="prerequisites" value={form.prerequisites} onChange={handleChange} rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">
            Points forts <span className="text-gray-400 text-xs">(un par ligne)</span>
          </label>
          <textarea name="strengths" value={form.strengths} onChange={handleChange} rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Pour qui ?</label>
          <textarea name="forWho" value={form.forWho} onChange={handleChange} rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Les formateurs</label>
          <textarea name="trainers" value={form.trainers} onChange={handleChange} rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Certifications</label>
          <input type="text" name="certifications" value={form.certifications} onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">
            Modalités <span className="text-gray-400 text-xs">(séparées par des virgules)</span>
          </label>
          <input type="text" name="modalities" value={form.modalities} onChange={handleChange}
            placeholder="Présentiel, Visioformation, Blended learning"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">
            Badges <span className="text-gray-400 text-xs">(séparés par des virgules)</span>
          </label>
          <input type="text" name="badges" value={form.badges} onChange={handleChange}
            placeholder="CPF, OPCO, Plan"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">
            Tags <span className="text-gray-400 text-xs">(séparés par des virgules)</span>
          </label>
          <input type="text" name="tags" value={form.tags} onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Image</label>
          <ImageUpload
            value={form.image}
            onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
          />
        </div>
      </div>

          {/* Détails */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col gap-4">
            <h2 className="font-bold text-text-dark text-base">Détails</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Durée */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">
                  Durée <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  required
                  placeholder="Ex: 14h"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                />
              </div>

              {/* Prix */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">
                  Prix <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  placeholder="Ex: 1 490 €"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                />
              </div>

              {/* Niveau */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">
                  Niveau <span className="text-red-500">*</span>
                </label>
                <select
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                >
                  {levels.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              {/* Gradient */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">
                  Couleur de la carte
                </label>
                <select
                  name="gradient"
                  value={form.gradient}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                >
                  {gradients.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Catégorie */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col gap-4">
            <h2 className="font-bold text-text-dark text-base">Catégorie</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Catégorie */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">
                  Catégorie <span className="text-red-500">*</span>
                </label>
                <select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Sous-catégorie */}
              {activeCat && activeCat.subcategories.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">
                    Sous-catégorie
                  </label>
                  <select
                    name="subcategoryId"
                    value={form.subcategoryId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                  >
                    <option value="">Aucune</option>
                    {activeCat.subcategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Publication */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-text-dark text-base">Publication</h2>
                <p className="text-text-gray text-sm mt-1">
                  Publier immédiatement ou sauvegarder en brouillon
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="published"
                  checked={form.published}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                <span className="ml-3 text-sm font-medium text-text-dark">
                  {form.published ? "Publié" : "Brouillon"}
                </span>
              </label>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Submit */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/dashboard")}
              className="px-6 py-3 border border-gray-200 text-text-dark rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {loading ? "Enregistrement..." : "Enregistrer"}
            </motion.button>
          </div>
        </form>
      </div>
    </main>
  );
}