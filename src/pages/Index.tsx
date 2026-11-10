import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Hero from "@/components/sections/Hero";
import SupplierFlow from "@/components/sections/SupplierFlow";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Materials from "@/components/sections/Materials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/Navbar";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation when coming from another page
    if (location.hash) {
      const elementId = location.hash.replace("#", "");
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return (
    <main>
      <Helmet>
        <title>Alloy Nordic — AI-driven offertautomation och global sourcing</title>
        <meta name="description" content="AI-driven offertautomation. Global sourcing. Bättre affärer. Alloy Nordic levererar industridetaljer från hela världen med kvalitetskontroll, logistik och skräddarsydd produktion enligt dina ritningar." />
        <link rel="canonical" href="https://alloynordic.se/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Alloy Nordic — AI-driven offertautomation. Global sourcing. Bättre affärer." />
        <meta property="og:description" content="AI-driven offertautomation. Global sourcing. Bättre affärer. Alloy Nordic levererar industridetaljer från hela världen med kvalitetskontroll, logistik och skräddarsydd produktion enligt dina ritningar." />
        <meta property="og:url" content="https://alloynordic.se/" />
        <meta property="og:image" content="https://alloynordic.se/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Alloy Nordic — AI-driven offertautomation. Global sourcing. Bättre affärer." />
        <meta name="twitter:description" content="AI-driven offertautomation. Global sourcing. Bättre affärer. Alloy Nordic levererar industridetaljer från hela världen med kvalitetskontroll, logistik och skräddarsydd produktion enligt dina ritningar." />
        <meta name="twitter:image" content="https://alloynordic.se/og-image.png" />
      </Helmet>
      <Navbar />
      <Hero />
      <SupplierFlow />
      <Process />
      <Services />
      <Materials />
      <About />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
