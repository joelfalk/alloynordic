import { Award, Clock, MessageSquare, Wallet } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhyChooseUs = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Award,
      titleKey: "why.quality.title",
      descKey: "why.quality.desc",
    },
    {
      icon: Wallet,
      titleKey: "why.cost.title",
      descKey: "why.cost.desc",
    },
    {
      icon: MessageSquare,
      titleKey: "why.contact.title",
      descKey: "why.contact.desc",
    },
    {
      icon: Clock,
      titleKey: "why.response.title",
      descKey: "why.response.desc",
    },
  ];

  return (
    <section id="varfor-oss" className="py-24 bg-primary text-primary-foreground">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t("why.title")}
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              {t("why.subtitle")}
            </p>
          </div>
          
          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <benefit.icon className="w-10 h-10 text-primary-foreground group-hover:text-accent-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t(benefit.titleKey)}</h3>
                <p className="text-primary-foreground/80">{t(benefit.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
