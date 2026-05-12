"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, BookOpen } from "lucide-react";

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  image: string | null;
  createdAt: string;
};

const gradients = [
  "from-primary to-primary-dark",
  "from-orange to-orange-dark",
  "from-primary-light to-primary",
  "from-green-600 to-green-800",
  "from-rose-500 to-rose-700",
];

const BlogSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.slice(0, 6));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const smallPosts = posts.slice(0, 2);
  const largePosts = posts.slice(2, 6);

  return (
    <section className="bg-white py-20">
      <div className="max-w-10xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-orange font-medium mb-3">Blog & Articles</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-montserrat mb-4">
            Nos dernières actualités
          </h2>
          <p className="text-text-gray">
            Nos articles alternent une variété de thématiques, notamment{" "}
            <span className="text-orange">
              les soft skills, l'IA, le financement de la formation professionnelle, la RSE, la bureautique, la QVT...
            </span>
          </p>
          <Link
            href="/blog"
            className="inline-block mt-6 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors text-sm font-medium"
          >
            Tous nos articles
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Aucun article */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-text-gray">Aucun article publié pour le moment.</p>
          </div>
        )}

        {/* Articles grid */}
        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Small articles row */}
            {smallPosts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:col-span-2">
                {smallPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group relative rounded-2xl overflow-hidden h-64 card-hover"
                  >
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center`}>
                        <BookOpen className="w-24 h-24 text-white/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-bold font-montserrat line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <Clock className="w-4 h-4" />
                        {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Large articles */}
            {largePosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group relative rounded-2xl overflow-hidden h-72 card-hover"
              >
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[(index + 2) % gradients.length]} flex items-center justify-center`}>
                    <BookOpen className="w-32 h-32 text-white/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {post.excerpt && (
                    <p className="text-white/70 text-sm line-clamp-2 mb-2">
                      {post.excerpt}
                    </p>
                  )}
                  <h3 className="text-white font-bold font-montserrat text-lg line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Clock className="w-4 h-4" />
                    {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;