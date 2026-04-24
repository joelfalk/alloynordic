import { Award, Clock, MessageSquare, Wallet } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionKicker from "@/components/SectionKicker";

const WhyChooseUs = () => {
  const { t } = useLanguage();

  return (
    <section id="varfor-oss" className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
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
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 mb-12 items-end">
            <div className="md:col-span-7">
              <SectionKicker>{t("why.kicker")}</SectionKicker>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
                {t("why.title")}
              </h2>
            </div>
            <p className="md:col-span-5 text-base text-white/70 leading-relaxed">
              {t("why.subtitle")}
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-5">
            {/* Large card */}
            <div className="md:col-span-2 md:row-span-2 p-8 md:p-10 bg-white/[0.04] border border-white/10 hover:border-accent/50 transition-colors flex flex-col justify-between min-h-[320px]">
              <Award className="w-10 h-10 text-accent" strokeWidth={1.5} />
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
                  {t("why.quality.title")}
                </h3>
                <p className="text-white/70 leading-relaxed max-w-md">
                  {t("why.quality.desc")}
                </p>
              </div>
            </div>

            {/* Three small */}
            {[
              { icon: Wallet, titleKey: "why.cost.title", descKey: "why.cost.desc" },
              { icon: MessageSquare, titleKey: "why.contact.title", descKey: "why.contact.desc" },
              { icon: Clock, titleKey: "why.response.title", descKey: "why.response.desc" },
            ].map((b, i) => (
              <div
                key={i}
                className={
                  "p-6 bg-white/[0.04] border border-white/10 hover:border-accent/50 transition-colors flex flex-col gap-3 min-h-[150px]" +
                  (i === 2 ? " md:col-span-1" : "")
                }
              >
                <b.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold tracking-tight">{t(b.titleKey)}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{t(b.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
