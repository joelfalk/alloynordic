import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import SectionKicker from "@/components/SectionKicker";
const Contact = () => {
  const {
    toast
  } = useToast();
  const {
    t
  } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    namn: "",
    email: "",
    telefon: "",
    foretag: "",
    meddelande: ""
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) {
        console.error("Error sending email:", error);
        toast({
          title: t("contact.toast.errorTitle") || "Fel",
          description: t("contact.toast.errorDesc") || "Kunde inte skicka meddelandet. Försök igen.",
          variant: "destructive",
        });
        return;
      }

      console.log("Email sent successfully:", data);
      toast({
        title: t("contact.toast.title"),
        description: t("contact.toast.desc"),
      });
      setFormData({
        namn: "",
        email: "",
        telefon: "",
        foretag: "",
        meddelande: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: t("contact.toast.errorTitle") || "Fel",
        description: t("contact.toast.errorDesc") || "Kunde inte skicka meddelandet. Försök igen.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section id="kontakt" className="py-24 md:py-32 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="grid md:grid-cols-12 gap-8 mb-16 items-end">
            <div className="md:col-span-7">
              <SectionKicker>{t("contact.kicker")}</SectionKicker>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                {t("contact.title")}
              </h2>
            </div>
            <p className="md:col-span-5 text-base text-muted-foreground leading-relaxed">
              {t("contact.subtitle")}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card border rounded-lg p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="namn">{t("contact.form.name")} *</Label>
                    <Input id="namn" name="namn" value={formData.namn} onChange={handleChange} required placeholder={t("contact.form.namePlaceholder")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("contact.form.email")} *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder={t("contact.form.emailPlaceholder")} />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefon">{t("contact.form.phone")}</Label>
                    <Input id="telefon" name="telefon" type="tel" value={formData.telefon} onChange={handleChange} placeholder={t("contact.form.phonePlaceholder")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="foretag">{t("contact.form.company")}</Label>
                    <Input id="foretag" name="foretag" value={formData.foretag} onChange={handleChange} placeholder={t("contact.form.companyPlaceholder")} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meddelande">{t("contact.form.message")} *</Label>
                  <Textarea id="meddelande" name="meddelande" value={formData.meddelande} onChange={handleChange} required placeholder={t("contact.form.messagePlaceholder")} rows={5} />
                </div>
                
                <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting}>
                  {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
                </Button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  {t("contact.talk")}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {t("contact.info")}
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t("contact.email")}</h4>
                    <p className="text-muted-foreground">info@alloynordic.se</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t("contact.phone")}</h4>
                    <p className="text-muted-foreground">+46 070 66 750 99</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t("contact.address")}</h4>
                    <p className="text-muted-foreground">Stockholm, Sverige</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;