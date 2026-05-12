"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, BookOpen, Video, Mic, Newspaper } from "lucide-react";

type Resource = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  image: string | null;
  type: string;
  date: string | null;
  createdAt: string;
};

const typeConfig: Record<string, { label: string; gradient: string; icon: React.ElementType; href: string }> = {
  WEBINAIRE: { label: "Webinaire", gradient: "from-primary to-primary-dark", icon: Video, href: "/webinaires" },
  INTERVIEW: { label: "Interview", gradient: "from-orange to-orange-dark", icon: Mic, href: "/interviews" },
  LIVRE_BLANC: { label: "Livre Blanc", gradient: "from-green-600 to-green-800", icon: BookOpen, href: "/livresblancs" },
  PRESSE: { label: "Presse", gradient: "from-rose-500 to-rose-700", icon: Newspaper, href: "/presse" },
};

const EventsSection = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/resources")
      .then((res) => res.json())
      .then((data) => {
        setResources(data.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-10xl mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <p className="text-orange font-medium mb-3">Événements & Ressources</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-montserrat">
              Nos événements
            </h2>
          </div>
          <Link
            href="/webinaires"
            className="mt-4 md:mt-0 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors text-sm font-medium"
          >
            Tous nos événements
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Aucune ressource */}
        {!loading && resources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-text-gray">Aucun événement disponible pour le moment.</p>
          </div>
        )}

        {/* Events grid */}
        {!loading && resources.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => {
              const config = typeConfig[resource.type] ?? typeConfig.WEBINAIRE;
              const Icon = config.icon;

              return (
                <div
                  key={resource.id}
                  className="bg-white rounded-2xl overflow-hidden card-shadow card-hover"
                >
                  <div className={`relative h-48 bg-gradient-to-br ${config.gradient} overflow-hidden`}>
                    {resource.image ? (
                      <img
                        src={resource.image}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon className="w-16 h-16 text-white/30" />
                      </div>
                    )}
                    <span className="absolute top-4 right-4 px-3 py-1 bg-orange text-white rounded-full text-xs font-medium">
                      {config.label}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-primary font-montserrat mb-4 line-clamp-2">
                      {resource.title}
                    </h3>
                    {resource.excerpt && (
                      <p className="text-text-gray text-sm mb-3 line-clamp-2">{resource.excerpt}</p>
                    )}
                    <div className="flex items-center gap-2 text-text-gray text-sm mb-4">
                      <Calendar className="w-4 h-4" />
                      {resource.date
                        ? new Date(resource.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
                        : new Date(resource.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                    </div>
                    <Link
                      href={`${config.href}/${resource.slug}`}
                      className="text-orange hover:text-orange-dark transition-colors text-sm font-medium"
                    >
                      Lire la suite →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;