"use client";

import Link from "next/link";
import { DollarSign, Cpu, Globe, Check } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const formations = [
  {
    icon: DollarSign,
    title: "Pôle Humain et RSE",
    description:
      "Faites grandir l'humain, engagez vos équipes et transformez vos valeurs en leviers de performance durable.",
    items: ["Soft Skills", "Management & Leadership", "Performance commerciale", "RSE et QVCT"],
    color: "bg-primary",
  },
  {
    icon: Cpu,
    title: "Pôle IA, DATA & Digital",
    description:
      "Prenez une longueur d'avance grâce à l'IA, la data et le digital appliqués concrètement à vos enjeux business.",
    items: ["Intelligence Artificielle", "DATA", "Digital"],
    color: "bg-primary",
  },
  {
    icon: Globe,
    title: "Pôle Langues & Interculturel",
    description:
      "Parlez le langage du monde et boostez votre impact dans toutes vos collaborations internationales.",
    items: ["Anglais", "Espagnol", "FLE"],
    color: "bg-primary",
  },
];

const FormationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-white py-20" ref={ref}>
      <div className="max-w-10xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-orange font-medium mb-3">Développez vos compétences</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-montserrat mb-6">
            Nos formations
          </h2>
          <p className="text-text-gray leading-relaxed">
            Conseilux Training and Development accompagne chaque année{" "}
            <span className="text-orange font-medium">plus de 15 000 apprenants</span> avec une
            conviction forte : former pour transformer. Notre signature exclusive :{" "}
            <span className="text-orange font-medium">Transfo³ - Humain × IA × RSE</span>. Des
            formations performantes qui engagent et font vraiment la différence. Nous vous
            accompagnons pour concevoir et maîtriser la transformation et en faire un levier de
            croissance durable et responsable.
          </p>
        </motion.div>

        {/* Formation cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formations.map((formation, index) => (
            <motion.div
              key={formation.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group"
            >
              <Link href="/formations" className="block">
                <motion.div
                  whileHover={{ scale: 1.03, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`${formation.color} rounded-2xl p-8 h-64 shadow-lg`}
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6"
                  >
                    <formation.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white font-montserrat mb-3">
                    {formation.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {formation.description}
                  </p>
                </motion.div>
              </Link>
              <div className="mt-6 space-y-2">
                {formation.items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.15 + i * 0.1 + 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 text-primary" />
                    <Link
                      href="/formations"
                      className="text-text-dark hover:text-primary transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormationsSection;
