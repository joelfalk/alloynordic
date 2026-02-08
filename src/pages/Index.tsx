import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";

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
      <LanguageSwitcher />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
