"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    content: "2 Rue Aenue du Pont Tinel Havre de Paix",
  },
  {
    icon: Phone,
    title: "Téléphone",
    content: `Togo: +228 90 54 64 64 \n Côte d'Ivoire +225 07 589 703 44 \n Niger: +227 82 64 86 04 \n France: +33 7 456 441 81 \n Bénin: +229 01 29 23 91 94`,
  },
  {
    icon: Mail,
    title: "Email",
    content: " contact@conseiluxtraining.com",
  },
  {
    icon: Clock,
    title: "Horaires",
    content: "Lun - Ven : 9h - 18h",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        alert("Erreur lors de l'envoi. Veuillez réessayer.");
      }
    } catch (error) {
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16">
        <div className="max-w-10xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white font-montserrat mb-4">
              Contactez-nous
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Notre équipe est à votre écoute pour répondre à toutes vos questions
              sur nos formations et vous accompagner dans votre projet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16">
        <div className="max-w-10xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <h2 className="text-2xl font-bold text-primary font-montserrat mb-8">
                Informations de contact
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-dark contact-title">{info.title}</h3>
                      <p className="text-text-gray whitespace-pre-line contact-content">{info.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social links */}
              <div className="mt-12">
                <h3 className="font-bold text-text-dark mb-4 contact-title">Suivez-nous</h3>
                <div className="flex gap-3">
                  {["facebook", "linkedin", "youtube", "instagram"].map((social) => (
                    <motion.a
                      key={social}
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        {social === "facebook" && (
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        )}
                        {social === "linkedin" && (
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        )}
                        {social === "youtube" && (
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        )}
                        {social === "instagram" && (
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                        )}
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-primary font-montserrat mb-4">
                      Message envoyé !
                    </h3>
                    <p className="text-text-gray mb-6">
                      Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          firstName: "",
                          lastName: "",
                          email: "",
                          phone: "",
                          company: "",
                          subject: "",
                          message: "",
                        });
                      }}
                      className="text-primary hover:text-primary-dark font-medium"
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-primary font-montserrat mb-6">
                      Envoyez-nous un message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-text-dark mb-2 contact-title">
                            Prénom *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-dark mb-2 contact-title">
                            Nom *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-text-dark mb-2 contact-title">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-dark mb-2 contact-title">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-2 contact-title">
                          Entreprise
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-2 contact-title">
                          Sujet *
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        >
                          <option value="">Sélectionnez un sujet</option>
                          <option value="formation">Demande d'information sur une formation</option>
                          <option value="devis">Demande de devis</option>
                          <option value="partenariat">Partenariat</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-2 contact-title">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-orange text-white rounded-lg font-medium hover:bg-orange-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {isLoading ? (
                          <span>Envoi en cours...</span>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Envoyer le message</span>
                          </>
                        )}
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <NewsletterSection />

      <Footer />
    </main>
  );
}
