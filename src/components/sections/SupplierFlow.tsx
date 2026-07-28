import { useEffect, useRef, useState } from "react";
import alloyIcon from "@/assets/alloy-o-icon.png";
import { useLanguage } from "@/contexts/LanguageContext";
import AlloyFlow from "@/components/alloy-flow/AlloyFlow.jsx";

const SupplierFlow = () => {
  const { language } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  // Only run the rAF-driven animation while the section is on screen.
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="rackvidd" className="relative w-full bg-[#F1F0EC]">
      {/* Full-viewport stage; the 16:9 scene is contain-fit and centered by Stage,
          and the surrounding space matches the scene's beige background */}
      <div className="relative w-full h-svh">
        {inView && (
          <AlloyFlow
            logoSrc={alloyIcon}
            accent="#F74C16"
            total={2412}
            countries={42}
            lang={language}
          />
        )}
      </div>
    </section>
  );
};

export default SupplierFlow;
