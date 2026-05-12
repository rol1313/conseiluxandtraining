"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, User, Mic, ChevronRight, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Resource = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image: string | null;
  speaker: string | null;
  link: string | null;
  createdAt: string;
};

export default function InterviewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/resources/${slug}`)
      .then((res) => { if (res.status === 404) { router.push("/interviews"); return; } return res.json(); })
      .then((data) => { if (data) setResource(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug, router]);

  if (loading) return (
    <main className="min-h-screen bg-gray-50"><Header />
      <div className="flex justify-center items-center py-32">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    <Footer /></main>
  );

  if (!resource) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-text-gray">
          <Link href="/" className="hover:text-primary">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/interviews" className="hover:text-primary">Interviews</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-dark font-medium truncate max-w-xs">{resource.title}</span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/interviews" className="flex items-center gap-2 text-text-gray hover:text-primary text-sm mb-8">
          <ArrowLeft className="w-4 h-4" /> Retour aux interviews
        </Link>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-orange/10 text-orange rounded-full text-xs font-medium flex items-center gap-1">
              <Mic className="w-3 h-3" /> Interview
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary font-montserrat mb-6">{resource.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-text-gray mb-6">
            {resource.speaker && (
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {resource.speaker}
              </span>
            )}
            <span className="text-text-gray text-sm">
              {new Date(resource.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>

          {resource.excerpt && (
            <p className="text-lg text-text-gray leading-relaxed border-l-4 border-orange pl-4 italic">
              {resource.excerpt}
            </p>
          )}
        </motion.div>

        {resource.image && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-10 rounded-2xl overflow-hidden">
            <img src={resource.image} alt={resource.title} className="w-full h-80 object-cover" />
          </motion.div>
        )}

        {resource.link && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-8">
            <a href={resource.link} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-full font-medium hover:bg-orange-dark transition-colors">
              Voir l'interview
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        )}

        {resource.content && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl shadow-sm border p-8 md:p-10">
            <div className="prose prose-lg max-w-none text-text-gray leading-relaxed whitespace-pre-line">
              {resource.content}
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-10 bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white font-montserrat mb-3">Vous souhaitez vous former ?</h3>
          <p className="text-white/80 mb-6">Découvrez nos formations professionnelles adaptées à vos besoins.</p>
          <Link href="/formations" className="inline-block px-6 py-3 bg-orange text-white rounded-full font-medium hover:bg-orange-dark transition-colors">
            Voir nos formations
          </Link>
        </motion.div>
      </article>

      <Footer />
    </main>
  );
}