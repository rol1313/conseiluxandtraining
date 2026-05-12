"use client";

import Link from "next/link";

const pedagogyItems = [
  {
    subtitle: "Pas de « prêt-à-former » chez Conseilux Training and Development !",
    title: "HyperPersonnalisation",
    description:
      "Du diagnostic au parcours, en passant par le choix des intervenants ou des outils : l'apprenant est au centre de notre démarche",
    color: "bg-primary",
  },
  {
    subtitle: "On ne vous lâche pas... même à distance...",
    title: "Accompagnement",
    description:
      "Que ce soit pour nos formateurs ou nos Learning Partners, nous optons pour des profils au plus près de vos aspirations.",
    color: "bg-orange",
  },
  {
    subtitle: "Le résultat : vous...augmenté !",
    title: "Performance",
    description: "Notre méthodologie FEST nous garantit votre progression",
    color: "bg-primary",
  },
];

const PedagogySection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-9xl mx-auto px-4">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-orange font-medium mb-3">Découvrez</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-montserrat">
            La pédagogie Conseilux Training and Development
          </h2>
        </div>

        {/* Pedagogy cards */}
        <div className="space-y-6">
          {pedagogyItems.map((item, index) => (
            <div
              key={item.title}
              className={`${item.color} rounded-2xl p-8 card-hover`}
            >
              <p className="text-white/70 text-sm mb-2">{item.subtitle}</p>
              <h3 className="text-2xl font-bold text-white font-montserrat mb-4">
                {item.title}
              </h3>
              <p className="text-white/80 max-w-2xl mb-6">{item.description}</p>
              <Link
                href="/surmesure"
                className="inline-block px-6 py-2 bg-white text-primary rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                En savoir plus
              </Link>
            </div>
          ))}
        </div>

        {/* Steps section */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: "Diagnostiquer",
                description:
                  "Expert de l'adoption, nous savons que votre besoin est unique. Le diagnostic permet de le comprendre pour y répondre.",
              },
              {
                step: 2,
                title: "Former",
                description:
                  "Quel que soit le module et les modalités choisis, votre formation est déployée en intégrant la bonne ingénierie pédagogique.",
              },
              {
                step: 3,
                title: "Accompagner",
                description:
                  "À l'issue des masterclass, webinaires, ateliers en présentiel ou distanciel, vos apprenants ne sont pas seuls.",
              },
              {
                step: 4,
                title: "Mesurer l'impact",
                description:
                  "La formation est terminée. C'est l'heure du bilan. Depuis quatre ans nous réalisons des mesures d'impact.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-6 card-shadow card-hover"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">{item.step}</span>
                </div>
                <h4 className="text-lg font-bold text-primary font-montserrat mb-3">
                  {item.title}
                </h4>
                <p className="text-text-gray text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PedagogySection;
