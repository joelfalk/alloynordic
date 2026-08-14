import { useLanguage } from "@/contexts/LanguageContext";
import rawMaterials from "@/assets/hero-options/raw-materials.jpg";

const Hero = () => {
  const { t } = useLanguage();

  const stats = [
    { value: "35+", label: t("hero.stat.years") },
    { value: t("hero.stat.suppliersValue"), label: t("hero.stat.suppliers") },
    { value: "42", label: t("hero.stat.countries") },
    { value: "24h", label: t("hero.stat.response") },
  ];

  return (
    <section id="hero" className="bg-background">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-16 md:py-20 grid lg:grid-cols-[7fr_5fr] gap-12 lg:gap-[72px] items-center">
        <div>
          <span className="font-mono text-[11px] tracking-[0.2em] text-accent">{t("hero.kicker")}</span>
          <h1 className="mt-5 text-4xl md:text-[46px] leading-[1.1] font-semibold tracking-[-0.02em] [text-wrap:balance]">
            {t("hero.h1")}
          </h1>
          <p className="mt-[22px] text-lg leading-[1.6] text-[#4A4842] max-w-[520px]">{t("hero.sub")}</p>
          <div className="mt-9 flex items-center gap-5">
            <a
              href="#kontakt"
              className="bg-primary text-primary-foreground text-[15px] font-semibold px-[30px] py-4 inline-flex items-center gap-2.5 hover:bg-accent transition-colors duration-150"
            >
              {t("hero.cta")} <span aria-hidden="true">→</span>
            </a>
            <span className="font-mono text-[11px] tracking-[0.1em] text-[#8C8A82]">{t("hero.response")}</span>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden">
            <img src={rawMaterials} alt="Metallmaterial" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-[18px] -right-[18px] w-[88px] h-[88px] bg-accent" aria-hidden="true" />
        </div>
      </div>

      {/* Stat strip */}
      <div className="border-t border-b border-border">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={[
                "py-7",
                i === 0 ? "pr-6" : "px-6",
                i % 2 === 1 ? "border-l border-border" : "",
                i === 2 ? "md:border-l md:border-border" : "",
                i >= 2 ? "border-t border-border md:border-t-0" : "",
              ].join(" ")}
            >
              <div className="text-[38px] font-bold tracking-[-0.02em] leading-none [font-variant-numeric:tabular-nums]">
                {s.value}
              </div>
              <div className="mt-2 font-mono text-[10px] tracking-[0.18em] text-[#8C8A82]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
