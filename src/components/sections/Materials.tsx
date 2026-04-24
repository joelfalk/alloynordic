import { useLanguage } from "@/contexts/LanguageContext";
import SectionKicker from "@/components/SectionKicker";

const Materials = () => {
  const { t } = useLanguage();

  const materials = [
    { code: "SS 304", name: t("materials.ss304") },
    { code: "SS 316L", name: t("materials.ss316") },
    { code: "AL 6061", name: t("materials.al6061") },
    { code: "AL 7075", name: t("materials.al7075") },
    { code: "TI Gr.5", name: t("materials.ti") },
    { code: "C360", name: t("materials.brass") },
    { code: "Cu-ETP", name: t("materials.copper") },
    { code: "Tool Steel", name: t("materials.tool") },
  ];

  return (
    <section id="material" className="py-24 md:py-28 bg-secondary border-y border-border">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 mb-12 items-end">
            <div className="md:col-span-7">
              <SectionKicker>{t("materials.kicker")}</SectionKicker>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                {t("materials.title")}
              </h2>
            </div>
            <p className="md:col-span-5 text-sm md:text-base text-muted-foreground leading-relaxed">
              {t("materials.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-border border border-border">
            {materials.map((m, i) => (
              <div
                key={i}
                className="bg-background hover:bg-accent/5 transition-colors p-5 md:p-6 group"
              >
                <div className="font-mono text-xs text-accent font-bold tracking-wider">
                  {m.code}
                </div>
                <div className="mt-2 text-sm md:text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                  {m.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Materials;
