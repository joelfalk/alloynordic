import { Building2, Globe, Handshake } from "lucide-react";

const About = () => {
  return (
    <section id="om-oss" className="py-24 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Om Ferrinox AB
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto" />
          </div>
          
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ferrinox AB är din pålitliga partner för högkvalitativa metalldelar från Asien. 
                Med år av erfarenhet och ett omfattande nätverk av noggrant utvalda leverantörer 
                i Kina, erbjuder vi skräddarsydda lösningar för svenska företag.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Vi förstår komplexiteten i internationell handel och tar hand om hela processen 
                – från leverantörsval och kvalitetskontroll till logistik och leverans. 
                Vårt mål är att göra det enkelt och tryggt för dig att sourca metalldelar 
                från Kina med samma höga kvalitetskrav som du ställer på inhemsk produktion.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Med Ferrinox som din partner får du en svensk kontaktperson som talar ditt språk 
                och förstår dina behov, samtidigt som du drar nytta av konkurrenskraftiga priser 
                och tillförlitlig kvalitet.
              </p>
            </div>
            
            {/* Feature Cards */}
            <div className="grid gap-6">
              <div className="flex gap-4 p-6 bg-card rounded-lg border shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Globalt Nätverk</h3>
                  <p className="text-muted-foreground">
                    Etablerade relationer med pålitliga leverantörer i Kina
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 p-6 bg-card rounded-lg border shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Handshake className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Svensk Partner</h3>
                  <p className="text-muted-foreground">
                    En lokal kontaktpunkt som förstår dina behov och krav
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 p-6 bg-card rounded-lg border shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Branschexpertis</h3>
                  <p className="text-muted-foreground">
                    Djup kunskap inom metalldelar och tillverkningsprocesser
                  </p>
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
