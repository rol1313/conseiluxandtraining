import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ClientsSection from "@/components/ClientsSection";
import FormationsSection from "@/components/FormationsSection";
import PedagogySection from "@/components/PedagogySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import EventsSection from "@/components/EventsSection";
import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ClientsSection />
      <FormationsSection />
      <PedagogySection />
      <TestimonialsSection />
      <EventsSection />
      <BlogSection />
      <FAQSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
