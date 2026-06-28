import { useLanguage } from "@/contexts/LanguageContext";
import SectionKicker from "@/components/SectionKicker";
import ProcessFlow from "@/components/ProcessFlow";

const ProcessFlowSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="process"
      className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden"
    >
      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 mb-16 items-end">
            <div className="md:col-span-7">
              <SectionKicker>{t("process.kicker")}</SectionKicker>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
                {t("process.title")}
              </h2>
            </div>
            <p className="md:col-span-5 text-base text-white/70 leading-relaxed">
              {t("process.subtitle")}
            </p>
          </div>

          <ProcessFlow />
        </div>
      </div>
    </section>
  );
};

export default ProcessFlowSection;
