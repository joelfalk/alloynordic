import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Konsultation",
    description: "Vi diskuterar dina behov, specifikationer och krav på metalldelar",
  },
  {
    number: "02",
    title: "Leverantörsmatchning",
    description: "Vi identifierar och utvärderar lämpliga leverantörer i vårt nätverk",
  },
  {
    number: "03",
    title: "Kvalitetskontroll",
    description: "Noggrann inspektion och testning innan leverans",
  },
  {
    number: "04",
    title: "Leverans",
    description: "Säker transport och leverans direkt till din dörr i Sverige",
  },
];

const Process = () => {
  return (
    <section id="process" className="py-24 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Vår Process
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              En strukturerad process som säkerställer kvalitet i varje steg
            </p>
          </div>
          
          {/* Process Steps */}
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-card border rounded-lg p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="text-5xl font-bold text-accent/30 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                
                {/* Arrow between steps (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-accent" />
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
