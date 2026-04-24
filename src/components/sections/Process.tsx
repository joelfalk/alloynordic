import { useLanguage } from "@/contexts/LanguageContext";
import SectionKicker from "@/components/SectionKicker";

const Process = () => {
  const { t } = useLanguage();

  const steps = [
    { num: "01", titleKey: "process.step1.title", descKey: "process.step1.desc" },
    { num: "02", titleKey: "process.step2.title", descKey: "process.step2.desc" },
    { num: "03", titleKey: "process.step3.title", descKey: "process.step3.desc" },
    { num: "04", titleKey: "process.step4.title", descKey: "process.step4.desc" },
  ];

  return (
    <section id="process" className="py-24 md:py-32 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionKicker className="justify-center">{t("process.kicker")}</SectionKicker>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              {t("process.title")}
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              {t("process.subtitle")}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connecting line — desktop horizontal */}
            <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-border" />
            <div
              className="hidden md:block absolute top-6 left-[12.5%] h-px bg-accent"
              style={{ width: "75%", transform: "scaleX(1)" }}
            />

            <div className="grid md:grid-cols-4 gap-10 md:gap-6 relative">
              {steps.map((s, i) => (
                <div key={i} className="relative flex md:flex-col gap-5 md:gap-0 md:text-center">
                  {/* Dot */}
                  <div className="flex-shrink-0 md:mx-auto w-12 h-12 rounded-full bg-background border-2 border-accent flex items-center justify-center font-mono text-sm font-bold text-accent relative z-10">
                    {s.num}
                  </div>
                  <div className="md:mt-6 flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">
                      {t(s.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(s.descKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
