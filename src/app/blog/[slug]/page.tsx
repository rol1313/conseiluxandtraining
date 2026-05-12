"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, BookOpen, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  createdAt: string;
  author: { email: string };
};

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then((res) => {
        if (res.status === 404) {
          router.push("/blog");
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug, router]);

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

  if (!post) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-text-gray">
          <Link href="/" className="hover:text-primary">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-primary">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-dark font-medium truncate max-w-xs">{post.title}</span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-12">

        {/* Retour */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="flex items-center gap-2 text-text-gray hover:text-primary transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
        </motion.div>

        {/* Header article */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-primary font-montserrat mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-text-gray mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Conseilux Training</span>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-lg text-text-gray leading-relaxed border-l-4 border-orange pl-4 italic">
            {post.excerpt}
          </p>
        </motion.div>

        {/* Image */}
        {post.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 rounded-2xl overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-80 object-cover"
            />
          </motion.div>
        )}

        {/* Contenu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border p-8 md:p-10"
        >
          {post.content ? (
            <div
              className="prose prose-lg max-w-none text-text-gray leading-relaxed whitespace-pre-line"
            >
              {post.content}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-text-gray">Contenu bientôt disponible.</p>
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 text-center"
        >
          <h3 className="text-xl font-bold text-white font-montserrat mb-3">
            Vous souhaitez vous former ?
          </h3>
          <p className="text-white/80 mb-6">
            Découvrez nos formations professionnelles adaptées à vos besoins.
          </p>
          <Link
            href="/formations"
            className="inline-block px-6 py-3 bg-orange text-white rounded-full font-medium hover:bg-orange-dark transition-colors"
          >
            Voir nos formations
          </Link>
        </motion.div>
      </article>

      <Footer />
    </main>
  );
}