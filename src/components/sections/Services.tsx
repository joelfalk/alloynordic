import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();
  // One expandable card open at a time; clicking the open card closes it.
  const [open, setOpen] = useState<number | null>(null);

  const services = [1, 2, 3, 4, 5, 6].map((n) => ({
    title: t(`services.${n}.title`),
    desc: t(`services.${n}.desc`),
    details: t(`services.${n}.details`),
  }));

  return (
    <section id="tjanster" className="bg-background pb-16 md:pb-[110px]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="flex items-baseline justify-between gap-8 mb-12">
          <h2 className="text-4xl md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.05]">
            {t("services.h2")}
          </h2>
          <span className="font-mono text-[11px] tracking-[0.2em] text-[#8C8A82] whitespace-nowrap">
            {t("services.kicker")}
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          {services.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setOpen((prev) => (prev === i ? null : i))}
              aria-expanded={open === i}
              className="bg-background px-8 py-[34px] flex flex-col items-stretch gap-2.5 hover:bg-[#EAE8E2] transition-colors duration-150 text-foreground text-left cursor-pointer"
            >
              <div className="flex justify-between items-baseline">
                <h3 className="text-2xl font-semibold tracking-[-0.01em]">{s.title}</h3>
                <span className="text-accent text-xl leading-none font-medium" aria-hidden="true">
                  {open === i ? "⌃" : "⌄"}
                </span>
              </div>
              <p className="text-[15px] leading-[1.55] text-[#6E6C64]">{s.desc}</p>
              {open === i && (
                <div className="mt-1.5 pt-4 border-t border-border">
                  <p className="text-sm leading-[1.65] text-[#4A4842]">{s.details}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
