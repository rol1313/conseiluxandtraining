"use client";

import Link from "next/link";
import Image from "next/image";
import { Award, Shield, CheckCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="max-w-10xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1 - Logo and info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold text-primary font-montserrat">Conseilux</span>
              <span className="text-2xl font-bold text-orange font-montserrat">Training and Development</span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 mb-6">
              <Link
                href="https://www.facebook.com/share/18mapWMfrp/" target="_blank"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com/company/conseilux-training-and-development/" target="_blank"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
              <Link
                href="https://www.youtube.com/@CTDevelopment1" target="_blank"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>
            </div>

            <p className="text-text-gray text-sm leading-relaxed mb-6 max-w-md text-size">
              Accélérez la transformation de votre entreprise avec Conseilux Training and Development. Formez vos équipes aux compétences clés en IA, Management, RSE & QVCT, Soft skills, Performance commerciale, Bureautique & digital et langues pour relever les défis d'aujourd'hui et de demain.
            </p>

            <p className="text-text-dark text-sm mb-2 text-size">
              2 Rue Avenue du Pont Tinel Havre de Paix
            </p>
            <p className="text-primary font-bold text-size">Togo: +228 90 54 64 64 <br />
             Côte d'Ivoire +225 07 589 703 44 <br /> Niger: +227 82 64 86 04 <br /> France: +33 7 456 441 81 <br />
              Bénin: +229 01 29 23 91 94</p>
          </div>

          {/* Column 2 - À propos */}             
          <div>
            <h4 className="text-primary font-bold font-montserrat mb-6">À propos</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/pedagogies"
                  className="block px-4 py-2 text-sm text-text-dark hover:bg-bg-light hover:text-primary"
                >
                  Les clés de la pédagogies Conseilux Training and Development
                </Link>
              </li>
              <li>
                <Link
                  href="/modalite"
                  className="block px-4 py-2 text-sm text-text-dark hover:bg-bg-light hover:text-primary"
                >
                  Nos modalités de formations
                </Link>
              </li>
              <li>
                <Link
                  href="/formateur"
                  className="block px-4 py-2 text-sm text-text-dark hover:bg-bg-light hover:text-primary"
                >
                  Les formateurs Conseilux Training and Development
                </Link>
              </li>
              <li>
                <Link
                  href="/learningpartner"
                  className="block px-4 py-2 text-sm text-text-dark hover:bg-bg-light hover:text-primary"
                >
                  Learning Partner: Votre allié pour réussir !
                </Link>
              </li>
              <li>
                <Link
                  href="/temoignages"
                  className="block px-4 py-2 text-sm text-text-dark hover:bg-bg-light hover:text-primary"
                >
                  Témoignages clients
                </Link>
              </li>
              <li>
                <Link
                  href="/certification"
                  className="block px-4 py-2 text-sm text-text-dark hover:bg-bg-light hover:text-primary"
                >
                  Certifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-primary font-bold font-montserrat mb-6">Nos formations</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/formations?category=technologies-numeriques-et-cybersecurite"
                  className="text-text-gray hover:text-primary transition-colors text-sm text-size">
                      Technologies Numériques & Cybersécurité
                    </Link>
                </li>
                <li>
                  <Link href="/formations?category=normes-iso-et-conformite"
                  className="text-text-gray hover:text-primary transition-colors text-sm text-size">
                      Normes ISO & Conformité
                    </Link>
                </li>
                <li>
                  <Link href="/formations?category=gestion-de-projet-management-et-leadership"
                  className="text-text-gray hover:text-primary transition-colors text-sm text-size">
                      Gestion de Projet, Management & leadership
                  </Link>
                </li>
                <li>
                  <Link href="/formations?category=filieres-metiers"
                  className="text-text-gray hover:text-primary transition-colors text-sm text-size">
                      Filière Métiers
                    </Link>
                </li>
                <li>
                  <Link href="/formations?category=performance-commerciale"
                  className="text-text-gray hover:text-primary transition-colors text-sm text-size">
                      Performance Commerciale
                    </Link>
                </li>
                <li>
                  <Link href="/formations?category=facilitation-professionnelle"
                  className="text-text-gray hover:text-primary transition-colors text-sm text-size">
                    Facilitation Professionnelle
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-primary font-bold font-montserrat mb-6">Accès direct</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/faq" className="text-text-gray hover:text-primary transition-colors text-sm text-size">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/politique-en-matiere-de-cookies" className="text-text-gray hover:text-primary transition-colors text-sm text-size">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-text-gray hover:text-primary transition-colors text-sm text-size">
                    CPF
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-text-gray hover:text-primary transition-colors text-sm">
                    Actions Collectives
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-text-gray hover:text-primary transition-colors text-sm text-size">
                    FNE
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-text-gray hover:text-primary transition-colors text-sm text-size">
                    Recrutement
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-text-gray hover:text-primary transition-colors text-sm text-size">
                    Nous contacter
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-8 border-t border-gray-200">
          <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg">
            <Award className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-primary">Qualiopi</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg">
            <Shield className="w-6 h-6 text-orange" />
            <span className="text-sm font-semibold text-text-dark">Certifié</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span className="text-sm font-semibold text-text-dark">Label RSE</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-gray">
              <Link href="#" className="hover:text-primary transition-colors text-size">
                Mentions Légales
              </Link>
              <span>|</span>
              <Link href="#" className="hover:text-primary transition-colors text-size">
                Plan du site
              </Link>
              <span>|</span>
              <Link href="#" className="hover:text-primary transition-colors text-size">
                CGV
              </Link>
              <span>|</span>
              <Link href="#" className="hover:text-primary transition-colors text-size">
                CGU
              </Link>
              <span>|</span>
              <Link href="#" className="hover:text-primary transition-colors text-size">
                Règlement intérieur
              </Link>
            </div>
          </div>
          <p className="text-center text-text-gray text-sm mt-6 text-size">
            Tous droits réservés © 2026 Conseilux Training and Development
          </p>
          <p className="text-center text-text-gray text-sm mt-2 text-size">
            Site web réalisé par{" "}
            <a href="#" className="text-orange hover:underline">
              INFITY TECH
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
