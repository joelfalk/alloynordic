import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Materials from "@/components/sections/Materials";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Process from "@/components/sections/Process";
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
        <meta property="og:title" content="Alloy Nordic — Global Sourcing for Metal Parts" />
        <meta property="og:description" content="Pålitlig partner för sourcing av industridetaljer från Kina med kvalitetskontroll, logistik och skräddarsydd produktion." />
        <meta property="og:url" content="https://alloynordic.se/" />
      </Helmet>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Materials />
      <WhyChooseUs />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
