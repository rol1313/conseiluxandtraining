"use client";

import Link from "next/link";

const FAQSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-10xl mx-auto px-4 text-center">
        <p className="text-text-gray mb-3">Quelques réponses</p>
        <h2 className="text-3xl md:text-4xl font-bold text-primary font-montserrat mb-6">
          FAQ
        </h2>
        <h3 className="text-xl font-bold text-primary mb-4">
          Vous souhaitez plus d'informations?
        </h3>
        <p className="text-text-gray mb-8 max-w-xl mx-auto">
          Notre équipe est disponible pour répondre à vos questions et vous aider à choisir les formations les plus pertinentes.
        </p>
        <Link
          href="/faq"
          className="inline-block px-8 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors font-medium"
        >
          FAQ
        </Link>
      </div>
    </section>
  );
};

export default FAQSection;
