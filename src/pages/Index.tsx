import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Hero from "@/components/sections/Hero";
import SupplierFlow from "@/components/sections/SupplierFlow";
import ProcessFlowSection from "@/components/sections/ProcessFlowSection";
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
        <title>Alloy Nordic — Global Sourcing for Metal Parts</title>
        <meta name="description" content="Alloy Nordic är din partner för global sourcing av industridetaljer från Kina till Sverige — kvalitetskontroll, logistik och skräddarsydd produktion enligt dina ritningar." />
        <link rel="canonical" href="https://alloynordic.se/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Alloy Nordic — Industrial Sourcing från Kina till Sverige" />
        <meta property="og:description" content="Alloy Nordic är din partner för global sourcing av metalldetaljer — skräddarsydd produktion enligt ritning, kvalitetskontroll och logistik från Kina till Sverige." />
        <meta property="og:url" content="https://alloynordic.se/" />
        <meta property="og:image" content="https://alloynordic.se/__l5e/assets-v1/c789d5bd-667b-4ec0-92ce-5e113acd6ed2/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Alloy Nordic — Industrial Sourcing från Kina till Sverige" />
        <meta name="twitter:description" content="Alloy Nordic är din partner för global sourcing av metalldetaljer — skräddarsydd produktion enligt ritning, kvalitetskontroll och logistik från Kina till Sverige." />
        <meta name="twitter:image" content="https://alloynordic.se/__l5e/assets-v1/c789d5bd-667b-4ec0-92ce-5e113acd6ed2/og-image.jpg" />
      </Helmet>
      <Navbar />
      <SupplierFlow />
      <Hero />
      <ProcessFlowSection />
      <Services />
      <Materials />
      <About />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
