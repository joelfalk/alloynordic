import { Building2, Globe, Handshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionKicker from "@/components/SectionKicker";
import heroImg from "@/assets/hero-bg.jpg";

const About = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Globe, titleKey: "about.global.title", descKey: "about.global.desc" },
    { icon: Handshake, titleKey: "about.partner.title", descKey: "about.partner.desc" },
    { icon: Building2, titleKey: "about.expertise.title", descKey: "about.expertise.desc" },
  ];

  return (
    <section id="om-oss" className="py-24 md:py-32 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: image collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={heroImg}
                  alt="Metal materials"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              </div>
              {/* Accent block */}
              <div className="absolute -bottom-6 -right-6 hidden md:block w-32 h-32 bg-accent" />
              <div className="absolute -top-4 -left-4 hidden md:block w-20 h-20 border-4 border-primary" />
            </div>

            {/* Right: content */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <SectionKicker>{t("about.kicker")}</SectionKicker>
                <h2 className="mt-4 text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                  {t("about.title")}
                </h2>
              </div>

              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>{t("about.p1")}</p>
                <p>{t("about.p2")}</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-border">
                {features.map((f, i) => (
                  <div key={i} className="space-y-2">
                    <f.icon className="w-5 h-5 text-accent" strokeWidth={1.75} />
                    <h3 className="font-semibold text-foreground text-sm">{t(f.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(f.descKey)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
