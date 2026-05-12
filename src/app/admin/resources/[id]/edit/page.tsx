"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

const resourceTypes = [
  { value: "WEBINAIRE", label: "Webinaire" },
  { value: "INTERVIEW", label: "Interview" },
  { value: "LIVRE_BLANC", label: "Livre Blanc" },
  { value: "PRESSE", label: "Presse" },
];

export default function EditResourcePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    type: "WEBINAIRE",
    date: "",
    duration: "",
    speaker: "",
    link: "",
    published: false,
  });

  useEffect(() => {
    fetch(`/api/admin/resources/${id}`)
      .then((res) => { if (res.status === 401) { router.push("/admin"); return; } return res.json(); })
      .then((data) => {
        if (data) {
          setForm({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt ?? "",
            content: data.content ?? "",
            image: data.image ?? "",
            type: data.type,
            date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
            duration: data.duration ?? "",
            speaker: data.speaker ?? "",
            link: data.link ?? "",
            published: data.published,
          });
        }
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [id, router]);

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

    const res = await fetch(`/api/admin/resources/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        date: form.date ? new Date(form.date).toISOString() : null,
      }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Erreur lors de la modification");
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => router.push("/admin/dashboard")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-text-dark" />
          </button>
          <h1 className="text-xl font-bold text-text-dark font-montserrat">Modifier la ressource</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col gap-4">
            <h2 className="font-bold text-text-dark text-base">Type de ressource</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {resourceTypes.map((t) => (
                <button key={t.value} type="button"
                  onClick={() => setForm((prev) => ({ ...prev, type: t.value }))}
                  className={`py-3 px-4 rounded-xl text-sm font-medium border-2 transition-all ${
                    form.type === t.value
                      ? "border-primary bg-primary text-white"
                      : "border-gray-200 text-text-gray hover:border-primary"
                  }`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col gap-4">
            <h2 className="font-bold text-text-dark text-base">Contenu</h2>

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
              <label className="block text-sm font-medium text-text-dark mb-1">Extrait</label>
              <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm resize-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Contenu</label>
              <textarea name="content" value={form.content} onChange={handleChange} rows={10}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm resize-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Image</label>
              <ImageUpload value={form.image} onChange={(url) => setForm((prev) => ({ ...prev, image: url }))} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col gap-4">
            <h2 className="font-bold text-text-dark text-base">Informations supplémentaires</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(form.type === "WEBINAIRE" || form.type === "INTERVIEW") && (
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">
                    {form.type === "WEBINAIRE" ? "Intervenant" : "Personne interviewée"}
                  </label>
                  <input type="text" name="speaker" value={form.speaker} onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
                </div>
              )}

              {form.type === "PRESSE" && (
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">Source / Média</label>
                  <input type="text" name="speaker" value={form.speaker} onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
                </div>
              )}

              {form.type === "WEBINAIRE" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">Date</label>
                    <input type="date" name="date" value={form.date} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">Durée</label>
                    <input type="text" name="duration" value={form.duration} onChange={handleChange}
                      placeholder="Ex: 1h30"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">
                  {form.type === "LIVRE_BLANC" ? "Lien de téléchargement" :
                   form.type === "PRESSE" ? "Lien vers l'article" :
                   form.type === "WEBINAIRE" ? "Lien vers le webinaire" :
                   "Lien externe"}
                </label>
                <input type="url" name="link" value={form.link} onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-text-dark text-base">Publication</h2>
                <p className="text-text-gray text-sm mt-1">Publier ou mettre en brouillon</p>
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