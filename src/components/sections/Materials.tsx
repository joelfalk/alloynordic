import { useLanguage } from "@/contexts/LanguageContext";

const Materials = () => {
  const { t } = useLanguage();

  const materials = [
    { code: "SS 304", name: t("materials.ss304") },
    { code: "SS 316L", name: t("materials.ss316") },
    { code: "AL 6061", name: t("materials.al6061") },
    { code: "AL 7075", name: t("materials.al7075") },
    { code: "TI Gr.5", name: t("materials.ti") },
    { code: "Cu-ETP", name: t("materials.copper") },
    { code: "1.2344", name: t("materials.tool") },
    { code: "ZAMAK 5", name: t("materials.zinc") },
  ];

  return (
    <section id="material" className="bg-background border-t border-b border-border">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-10 grid md:grid-cols-[180px_1fr] gap-6 md:gap-10 items-start">
        <span className="font-mono text-[11px] tracking-[0.2em] text-[#8C8A82] pt-1.5">
          {t("materials.label")}
        </span>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5">
          {materials.map((m) => (
            <div key={m.code} className="flex items-baseline gap-2.5">
              <span className="font-mono text-[11px] font-bold text-accent whitespace-nowrap">{m.code}</span>
              <span className="text-sm font-medium">{m.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Materials;
