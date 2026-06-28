import { useEffect, useRef, useState } from "react";
import alloyIcon from "@/assets/alloy-o-icon.png";
import AlloyFlow from "@/components/alloy-flow/AlloyFlow.jsx";

const SupplierFlow = () => {
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
      {/* 16:9 stage; the self-contained scene fills it via position:absolute */}
      <div className="relative w-full aspect-[16/9]">
        {inView && (
          <AlloyFlow logoSrc={alloyIcon} accent="#F74C16" total={2412} countries={42} />
        )}
      </div>
    </section>
  );
};

export default SupplierFlow;
