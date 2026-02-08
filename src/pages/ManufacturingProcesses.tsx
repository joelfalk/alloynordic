import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

import machiningImg from "@/assets/manufacturing/machining.jpg";
import castingImg from "@/assets/manufacturing/casting.jpg";
import sinteringImg from "@/assets/manufacturing/sintering.jpg";
import hotPressingImg from "@/assets/manufacturing/hot-pressing.jpg";

const ManufacturingProcesses = () => {
  const { t } = useLanguage();

  const processes = [
    {
      id: "machining",
      image: machiningImg,
      titleKey: "manufacturing.machining.title",
      descKey: "manufacturing.machining.desc",
      detailsKey: "manufacturing.machining.details",
    },
    {
      id: "casting",
      image: castingImg,
      titleKey: "manufacturing.casting.title",
      descKey: "manufacturing.casting.desc",
      detailsKey: "manufacturing.casting.details",
    },
    {
      id: "sintering",
      image: sinteringImg,
      titleKey: "manufacturing.sintering.title",
      descKey: "manufacturing.sintering.desc",
      detailsKey: "manufacturing.sintering.details",
    },
    {
      id: "hotpressing",
      image: hotPressingImg,
      titleKey: "manufacturing.hotpressing.title",
      descKey: "manufacturing.hotpressing.desc",
      detailsKey: "manufacturing.hotpressing.details",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <LanguageSwitcher />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <Link to="/">
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("manufacturing.back")}
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
            {t("manufacturing.title")}
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl">
            {t("manufacturing.subtitle")}
          </p>
        </div>
      </section>

      {/* Processes Grid */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto space-y-16">
          {processes.map((process, index) => (
            <Card key={process.id} className="overflow-hidden border-0 shadow-lg">
              <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className={`relative h-64 md:h-auto min-h-[300px] ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <img
                    src={process.image}
                    alt={t(process.titleKey)}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl md:text-3xl text-foreground">
                      {t(process.titleKey)}
                    </CardTitle>
                    <CardDescription className="text-lg text-muted-foreground mt-2">
                      {t(process.descKey)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground leading-relaxed">
                      {t(process.detailsKey)}
                    </p>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("manufacturing.cta.title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t("manufacturing.cta.desc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/#kontakt">{t("manufacturing.cta.contact")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/">{t("manufacturing.cta.home")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ManufacturingProcesses;
