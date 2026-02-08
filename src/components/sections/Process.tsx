import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Process = () => {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      titleKey: "process.step1.title",
      descKey: "process.step1.desc",
    },
    {
      number: "02",
      titleKey: "process.step2.title",
      descKey: "process.step2.desc",
    },
    {
      number: "03",
      titleKey: "process.step3.title",
      descKey: "process.step3.desc",
    },
    {
      number: "04",
      titleKey: "process.step4.title",
      descKey: "process.step4.desc",
    },
  ];

  return (
    <section id="process" className="py-24 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t("process.title")}
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("process.subtitle")}
            </p>
          </div>
          
          {/* Process Steps */}
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-card border rounded-lg p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="text-5xl font-bold text-primary/20 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(step.descKey)}
                  </p>
                </div>
                
                {/* Arrow between steps (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary/20" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
