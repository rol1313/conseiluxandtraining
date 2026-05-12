"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

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
  gradient: string;
};

const modeConfig: Record<string, { color: string; bg: string }> = {
  "En ligne": { color: "text-blue-700", bg: "bg-blue-100" },
  "Présentiel": { color: "text-green-700", bg: "bg-green-100" },
  "Hybride": { color: "text-purple-700", bg: "bg-purple-100" },
};

const UpcomingFormations = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sessions")
      .then((res) => res.json())
      .then((data) => {
        setSessions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center gap-2 text-sm text-text-gray mt-2">
      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span>Chargement des sessions...</span>
    </div>
  );

  if (sessions.length === 0) return null;

  return (
    <div className="mt-2 flex flex-col gap-2">
      <p className="text-sm font-semibold text-text-dark flex items-center gap-2">
        <span className="w-2 h-2 bg-orange rounded-full animate-pulse" />
        Prochaines sessions
      </p>

      {sessions.map((session) => {
        const mode = session.mode ?? "En ligne";
        const config = modeConfig[mode] ?? { color: "text-gray-700", bg: "bg-gray-100" };

        return (
          <div
            key={session.id}
            className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-primary/5 border border-gray-100 hover:border-primary/20 rounded-xl transition-all group"
          >
            {/* Barre couleur */}
            <div className={`w-1.5 h-12 rounded-full bg-gradient-to-b ${session.gradient} flex-shrink-0`} />

            {/* Infos */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-dark truncate group-hover:text-primary transition-colors">
                {session.title}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1 text-xs text-text-gray">
                  <Calendar className="w-3 h-3" />
                  {new Date(session.startDate).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                  {session.endDate && (
                    <span> → {new Date(session.endDate).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}</span>
                  )}
                </span>
                {session.duration && (
                  <span className="flex items-center gap-1 text-xs text-text-gray">
                    <Clock className="w-3 h-3" />
                    {session.duration}
                  </span>
                )}
                {session.location && (
                  <span className="flex items-center gap-1 text-xs text-text-gray">
                    <MapPin className="w-3 h-3" />
                    {session.location}
                  </span>
                )}
              </div>
            </div>

            {/* Badge mode */}
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                {mode}
              </span>
              {session.price && (
                <span className="text-xs font-bold text-orange">{session.price} FCFA</span>
              )}
            </div>
          </div>
        );
      })}

      <Link
        href="/formations"
        className="text-xs text-primary hover:text-primary-dark font-medium flex items-center gap-1 mt-1"
      >
        Voir toutes les formations
        <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
};

export default UpcomingFormations;