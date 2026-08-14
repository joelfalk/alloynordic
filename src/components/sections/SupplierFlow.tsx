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
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="rackvidd" className="bg-background pt-16 md:pt-[110px]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="border border-border overflow-hidden">
          {/* 16:9 stage; the self-contained scene fills it via position:absolute */}
          <div className="relative w-full aspect-[16/9]">
            {inView && (
              <AlloyFlow
                logoSrc={alloyIcon}
                accent="#F74C16"
                total={2412}
                countries={42}
                lang={language}
                skipIntro
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupplierFlow;
