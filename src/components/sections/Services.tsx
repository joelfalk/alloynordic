import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    { title: t("services.1.title"), desc: t("services.1.desc") },
    { title: t("services.2.title"), desc: t("services.2.desc") },
    { title: t("services.3.title"), desc: t("services.3.desc") },
    { title: t("services.4.title"), desc: t("services.4.desc") },
    { title: t("services.5.title"), desc: t("services.5.desc") },
    { title: t("services.6.title"), desc: t("services.6.desc") },
  ];

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
          {services.map((s) => (
            <a
              key={s.title}
              href="#kontakt"
              className="bg-background px-8 py-[34px] flex flex-col gap-2.5 hover:bg-[#EAE8E2] transition-colors duration-150 text-foreground"
            >
              <div className="flex justify-between items-baseline">
                <h3 className="text-2xl font-semibold tracking-[-0.01em]">{s.title}</h3>
                <span className="text-accent text-lg" aria-hidden="true">↗</span>
              </div>
              <p className="text-[15px] leading-[1.55] text-[#6E6C64]">{s.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
