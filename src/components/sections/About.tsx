import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="om-oss" className="bg-background py-16 md:py-[110px]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-[72px] items-start">
        <div>
          <span className="font-mono text-[11px] tracking-[0.2em] text-accent">{t("about.kicker")}</span>
          <h2 className="mt-[18px] text-4xl md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.08] [text-wrap:balance]">
            {t("about.h2")}
          </h2>
        </div>
        <div className="lg:pt-2.5">
          <p className="text-lg leading-[1.65] text-[#4A4842]">{t("about.para")}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3.5 font-mono text-[11px] tracking-[0.12em] text-[#6E6C64]">
            <span>{t("about.meta1")}</span>
            <span className="w-[5px] h-[5px] bg-accent" aria-hidden="true" />
            <span>ANDERSTORP</span>
            <span className="w-[5px] h-[5px] bg-accent" aria-hidden="true" />
            <span>{t("about.meta3")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
