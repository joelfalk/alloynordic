import { Building2, Globe, Handshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="om-oss" className="py-24 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{t("about.title")}</h2>
            <div className="w-24 h-1 bg-accent mx-auto" />
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("about.p1")}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("about.p2")}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("about.p3")}
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid gap-6">
              <div className="flex gap-4 p-6 bg-card rounded-lg border shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("about.global.title")}</h3>
                  <p className="text-muted-foreground">{t("about.global.desc")}</p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-card rounded-lg border shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Handshake className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("about.partner.title")}</h3>
                  <p className="text-muted-foreground">{t("about.partner.desc")}</p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-card rounded-lg border shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("about.expertise.title")}</h3>
                  <p className="text-muted-foreground">{t("about.expertise.desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
