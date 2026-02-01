import { Search, ShieldCheck, Truck, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Search,
      titleKey: "services.sourcing.title",
      descKey: "services.sourcing.desc",
    },
    {
      icon: ShieldCheck,
      titleKey: "services.quality.title",
      descKey: "services.quality.desc",
    },
    {
      icon: Truck,
      titleKey: "services.logistics.title",
      descKey: "services.logistics.desc",
    },
    {
      icon: Wrench,
      titleKey: "services.custom.title",
      descKey: "services.custom.desc",
    },
  ];

  return (
    <section id="tjanster" className="py-24 bg-muted/50">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t("services.title")}
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("services.subtitle")}
            </p>
          </div>
          
          {/* Service Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300 border-2 hover:border-accent/50">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-300">
                    <service.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{t(service.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {t(service.descKey)}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
