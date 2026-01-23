import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    namn: "",
    email: "",
    telefon: "",
    foretag: "",
    meddelande: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Tack för din förfrågan!",
      description: "Vi återkommer till dig inom 24 timmar.",
    });
    
    setFormData({
      namn: "",
      email: "",
      telefon: "",
      foretag: "",
      meddelande: "",
    });
    setIsSubmitting(false);
  };

  return (
    <section id="kontakt" className="py-24 bg-muted/50">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Kontakta Oss
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Berätta om ditt projekt så återkommer vi med en skräddarsydd lösning
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card border rounded-lg p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="namn">Namn *</Label>
                    <Input
                      id="namn"
                      name="namn"
                      value={formData.namn}
                      onChange={handleChange}
                      required
                      placeholder="Ditt namn"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-post *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="din@email.se"
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefon">Telefonnummer</Label>
                    <Input
                      id="telefon"
                      name="telefon"
                      type="tel"
                      value={formData.telefon}
                      onChange={handleChange}
                      placeholder="+46 70 123 45 67"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="foretag">Företagsnamn</Label>
                    <Input
                      id="foretag"
                      name="foretag"
                      value={formData.foretag}
                      onChange={handleChange}
                      placeholder="Ditt företag AB"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meddelande">Meddelande *</Label>
                  <Textarea
                    id="meddelande"
                    name="meddelande"
                    value={formData.meddelande}
                    onChange={handleChange}
                    required
                    placeholder="Beskriv vad du letar efter..."
                    rows={5}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Skickar..." : "Skicka förfrågan"}
                </Button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Låt oss prata
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Har du frågor om våra tjänster eller vill diskutera ditt nästa projekt? 
                  Fyll i formuläret eller kontakta oss direkt – vi återkommer alltid inom 24 timmar på vardagar.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">E-post</h4>
                    <p className="text-muted-foreground">info@ferrinox.se</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Telefon</h4>
                    <p className="text-muted-foreground">+46 8 123 45 67</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Adress</h4>
                    <p className="text-muted-foreground">Stockholm, Sverige</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
