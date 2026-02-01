import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Index = () => {
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
