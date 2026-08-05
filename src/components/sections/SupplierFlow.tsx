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
    <section
      ref={ref}
      id="rackvidd"
      className="relative w-full bg-[#F1F0EC] flex items-center overflow-hidden min-h-[100svh] md:min-h-0 md:block md:pb-24"
    >
      {/* Mobile: crop-to-fill the screen. Desktop: plain 16:9 stage. */}
      <div className="relative w-full h-[100svh] md:h-auto md:aspect-[16/9] overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[62svh] aspect-[16/9] md:h-full md:w-full md:aspect-auto">
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
      </div>
    </section>
  );
};

export default SupplierFlow;
