import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionKicker from "@/components/SectionKicker";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    { num: "01", titleKey: "services.sourcing.title", descKey: "services.sourcing.desc" },
    { num: "02", titleKey: "services.quality.title", descKey: "services.quality.desc" },
    { num: "03", titleKey: "services.logistics.title", descKey: "services.logistics.desc" },
    { num: "04", titleKey: "services.custom.title", descKey: "services.custom.desc" },
  ];

  return (
    <section id="tjanster" className="py-24 md:py-32 bg-secondary">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="grid md:grid-cols-12 gap-8 mb-16 items-end">
            <div className="md:col-span-7">
              <SectionKicker>{t("services.kicker")}</SectionKicker>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                {t("services.title")}
              </h2>
            </div>
            <p className="md:col-span-5 text-base text-muted-foreground leading-relaxed">
              {t("services.subtitle")}
            </p>
          </div>

          {/* Service rows */}
          <div className="border-t border-border">
            {services.map((s, i) => (
              <a
                key={i}
                href="#kontakt"
                className="group grid md:grid-cols-12 gap-6 md:gap-8 py-8 md:py-10 border-b border-border hover:bg-background transition-colors px-2 -mx-2"
              >
                <div className="md:col-span-1 font-mono text-sm text-accent font-bold pt-2">
                  {s.num}
                </div>
                <h3 className="md:col-span-4 text-2xl md:text-3xl font-bold text-foreground tracking-tight group-hover:text-accent transition-colors">
                  {t(s.titleKey)}
                </h3>
                <p className="md:col-span-6 text-base text-muted-foreground leading-relaxed">
                  {t(s.descKey)}
                </p>
                <div className="md:col-span-1 flex md:justify-end items-start pt-2">
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
