import { Search, ShieldCheck, Truck, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Search,
    title: "Sourcing & Leverantörsmatchning",
    description: "Vi hittar rätt leverantör för dina specifika behov. Genom vårt omfattande nätverk identifierar vi tillverkare som matchar dina krav på kvalitet, kapacitet och pris.",
  },
  {
    icon: ShieldCheck,
    title: "Kvalitetskontroll & Inspektion",
    description: "Innan leverans genomför vi noggrann kvalitetskontroll på plats i Kina. Vi säkerställer att varje detalj möter dina specifikationer och kvalitetsstandarder.",
  },
  {
    icon: Truck,
    title: "Logistik & Frakt",
    description: "Vi hanterar hela transportkedjan från fabrik till din dörr. Tull, dokumentation och spårning – vi tar hand om allt så att du kan fokusera på din kärnverksamhet.",
  },
  {
    icon: Wrench,
    title: "Specialtillverkning",
    description: "Behöver du skräddarsydda metalldelar? Vi koordinerar produktion av kundanpassade komponenter enligt dina ritningar och specifikationer.",
  },
];

const Services = () => {
  return (
    <section id="tjanster" className="py-24 bg-muted/50">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Våra Tjänster
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Från första kontakt till leverans – vi är med dig hela vägen
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
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
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
