import { Award, Clock, MessageSquare, Wallet } from "lucide-react";

const benefits = [
  {
    icon: Award,
    title: "Kvalitetsgaranti",
    description: "Vi står för kvaliteten på alla produkter vi levererar",
  },
  {
    icon: Wallet,
    title: "Kostnadseffektivt",
    description: "Konkurrenskraftiga priser utan att kompromissa på kvalitet",
  },
  {
    icon: MessageSquare,
    title: "Svensk Kontakt",
    description: "En personlig kontaktperson som talar ditt språk",
  },
  {
    icon: Clock,
    title: "Snabb Respons",
    description: "Vi återkommer alltid inom 24 timmar på vardagar",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="varfor-oss" className="py-24 bg-primary text-primary-foreground">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Varför Välja Alloy Nordic?
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Vi gör internationell handel enkelt och tryggt för svenska företag
            </p>
          </div>
          
          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <benefit.icon className="w-10 h-10 text-primary-foreground group-hover:text-accent-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-primary-foreground/80">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
