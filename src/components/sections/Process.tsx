import { useLanguage } from "@/contexts/LanguageContext";

const Process = () => {
  const { t } = useLanguage();

  const steps = [
    { nr: "01", title: t("process.step1.title"), tag: t("process.step1.tag") },
    { nr: "02", title: t("process.step2.title"), tag: t("process.step2.tag") },
    { nr: "03", title: t("process.step3.title"), tag: t("process.step3.tag") },
    { nr: "04", title: t("process.step4.title"), tag: t("process.step4.tag") },
  ];

  return (
    <section id="process" className="bg-background py-16 md:py-[110px]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="flex items-baseline justify-between gap-8 mb-12 md:mb-16">
          <h2 className="text-4xl md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.05]">
            {t("process.h2")}
          </h2>
          <span className="font-mono text-[11px] tracking-[0.2em] text-accent whitespace-nowrap">01 — 04</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-10 sm:gap-y-12 lg:gap-y-0">
          {steps.map((s) => (
            <div key={s.nr} className="border-l border-border pl-6 pr-7 pt-2 pb-1 flex flex-col gap-3.5">
              <span className="font-mono text-[13px] font-bold text-accent tracking-[0.2em]">{s.nr}</span>
              <h3 className="text-[21px] font-semibold tracking-[-0.01em] leading-[1.25]">{s.title}</h3>
              <span className="font-mono text-[10px] tracking-[0.14em] text-[#8C8A82]">{s.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
