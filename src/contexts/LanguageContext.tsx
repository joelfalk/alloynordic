import { createContext, useContext, useState, ReactNode } from "react";

type Language = "sv" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  sv: {
    // Hero
    "hero.tagline": "Kvalitet utan kompromiss",
    "hero.subtitle": "Din partner för metalldelar från Asien sen 1989",
    "hero.cta.contact": "Kontakta oss",
    "hero.cta.about": "Om oss",
    
    // About
    "about.title": "Om Alloy Nordic",
    "about.p1": "Alloy Nordic är din pålitliga partner för högkvalitativa metalldelar från Asien. Med år av erfarenhet och ett omfattande nätverk av noggrant utvalda leverantörer i Kina, erbjuder vi skräddarsydda lösningar för svenska företag.",
    "about.p2": "Vi förstår komplexiteten i internationell handel och tar hand om hela processen – från leverantörsval och kvalitetskontroll till logistik och leverans. Vårt mål är att göra det enkelt och tryggt för dig att sourca metalldelar från Kina med samma höga kvalitetskrav som du ställer på inhemsk produktion.",
    "about.p3": "Med Alloy Nordic som din partner får du en svensk kontaktperson som talar ditt språk och förstår dina behov, samtidigt som du drar nytta av konkurrenskraftiga priser och tillförlitlig kvalitet.",
    "about.global.title": "Globalt Nätverk",
    "about.global.desc": "Etablerade relationer med pålitliga leverantörer i Kina",
    "about.partner.title": "Svensk Partner",
    "about.partner.desc": "En lokal kontaktpunkt som förstår dina behov och krav",
    "about.expertise.title": "Branschexpertis",
    "about.expertise.desc": "Djup kunskap inom metalldelar och tillverkningsprocesser",
    
    // Services
    "services.title": "Våra Tjänster",
    "services.subtitle": "Från första kontakt till leverans – vi är med dig hela vägen",
    "services.sourcing.title": "Sourcing & Leverantörsmatchning",
    "services.sourcing.desc": "Vi hittar rätt leverantör för dina specifika behov. Genom vårt omfattande nätverk identifierar vi tillverkare som matchar dina krav på kvalitet, kapacitet och pris.",
    "services.quality.title": "Kvalitetskontroll & Inspektion",
    "services.quality.desc": "Innan leverans genomför vi noggrann kvalitetskontroll på plats i Kina. Vi säkerställer att varje detalj möter dina specifikationer och kvalitetsstandarder.",
    "services.logistics.title": "Logistik & Frakt",
    "services.logistics.desc": "Vi hanterar hela transportkedjan från fabrik till din dörr. Tull, dokumentation och spårning – vi tar hand om allt så att du kan fokusera på din kärnverksamhet.",
    "services.custom.title": "Specialtillverkning",
    "services.custom.desc": "Behöver du skräddarsydda metalldelar? Vi koordinerar produktion av kundanpassade komponenter enligt dina ritningar och specifikationer.",
    
    // Process
    "process.title": "Vår Process",
    "process.subtitle": "En strukturerad process som säkerställer kvalitet i varje steg",
    "process.step1.title": "Konsultation",
    "process.step1.desc": "Vi diskuterar dina behov, specifikationer och krav på metalldelar",
    "process.step2.title": "Leverantörsmatchning",
    "process.step2.desc": "Vi identifierar och utvärderar lämpliga leverantörer i vårt nätverk",
    "process.step3.title": "Kvalitetskontroll",
    "process.step3.desc": "Noggrann inspektion och testning innan leverans",
    "process.step4.title": "Leverans",
    "process.step4.desc": "Säker transport och leverans direkt till din dörr i Sverige",
    
    // Why Choose Us
    "why.title": "Varför Välja Alloy Nordic?",
    "why.subtitle": "Vi gör internationell handel enkelt och tryggt för svenska företag",
    "why.quality.title": "Kvalitetsgaranti",
    "why.quality.desc": "Vi står för kvaliteten på alla produkter vi levererar",
    "why.cost.title": "Kostnadseffektivt",
    "why.cost.desc": "Konkurrenskraftiga priser utan att kompromissa på kvalitet",
    "why.contact.title": "Svensk Kontakt",
    "why.contact.desc": "En personlig kontaktperson som talar ditt språk",
    "why.response.title": "Snabb Respons",
    "why.response.desc": "Vi återkommer alltid inom 24 timmar på vardagar",
    
    // Contact
    "contact.title": "Kontakta Oss",
    "contact.subtitle": "Berätta om ditt projekt så återkommer vi med en skräddarsydd lösning",
    "contact.talk": "Låt oss prata",
    "contact.info": "Har du frågor om våra tjänster eller vill diskutera ditt nästa projekt? Fyll i formuläret eller kontakta oss direkt – vi återkommer alltid inom 24 timmar på vardagar.",
    "contact.form.name": "Namn",
    "contact.form.email": "E-post",
    "contact.form.phone": "Telefonnummer",
    "contact.form.company": "Företagsnamn",
    "contact.form.message": "Meddelande",
    "contact.form.namePlaceholder": "Ditt namn",
    "contact.form.emailPlaceholder": "din@email.se",
    "contact.form.phonePlaceholder": "+46 70 123 45 67",
    "contact.form.companyPlaceholder": "Ditt företag AB",
    "contact.form.messagePlaceholder": "Beskriv vad du letar efter...",
    "contact.form.submit": "Skicka förfrågan",
    "contact.form.submitting": "Skickar...",
    "contact.toast.title": "Tack för din förfrågan!",
    "contact.toast.desc": "Vi återkommer till dig inom 24 timmar.",
    "contact.email": "E-post",
    "contact.phone": "Telefon",
    "contact.address": "Adress",
    
    // Footer
    "footer.tagline": "Kvalitet utan kompromiss",
    "footer.quickLinks": "Snabblänkar",
    "footer.contact": "Kontakt",
    "footer.about": "Om oss",
    "footer.services": "Tjänster",
    "footer.process": "Vår process",
    "footer.contactLink": "Kontakt",
    "footer.rights": "Alla rättigheter förbehållna.",
  },
  en: {
    // Hero
    "hero.tagline": "Quality without compromise",
    "hero.subtitle": "Your partner for metal parts from Asia since 1989",
    "hero.cta.contact": "Contact us",
    "hero.cta.about": "About us",
    
    // About
    "about.title": "About Alloy Nordic",
    "about.p1": "Alloy Nordic is your reliable partner for high-quality metal parts from Asia. With years of experience and an extensive network of carefully selected suppliers in China, we offer tailored solutions for Swedish companies.",
    "about.p2": "We understand the complexity of international trade and take care of the entire process – from supplier selection and quality control to logistics and delivery. Our goal is to make it easy and safe for you to source metal parts from China with the same high quality requirements as domestic production.",
    "about.p3": "With Alloy Nordic as your partner, you get a Swedish contact person who speaks your language and understands your needs, while benefiting from competitive prices and reliable quality.",
    "about.global.title": "Global Network",
    "about.global.desc": "Established relationships with reliable suppliers in China",
    "about.partner.title": "Swedish Partner",
    "about.partner.desc": "A local contact point that understands your needs and requirements",
    "about.expertise.title": "Industry Expertise",
    "about.expertise.desc": "Deep knowledge in metal parts and manufacturing processes",
    
    // Services
    "services.title": "Our Services",
    "services.subtitle": "From first contact to delivery – we're with you all the way",
    "services.sourcing.title": "Sourcing & Supplier Matching",
    "services.sourcing.desc": "We find the right supplier for your specific needs. Through our extensive network, we identify manufacturers that match your requirements for quality, capacity, and price.",
    "services.quality.title": "Quality Control & Inspection",
    "services.quality.desc": "Before delivery, we conduct thorough quality control on-site in China. We ensure that every detail meets your specifications and quality standards.",
    "services.logistics.title": "Logistics & Shipping",
    "services.logistics.desc": "We handle the entire transport chain from factory to your door. Customs, documentation, and tracking – we take care of everything so you can focus on your core business.",
    "services.custom.title": "Custom Manufacturing",
    "services.custom.desc": "Need custom metal parts? We coordinate production of customized components according to your drawings and specifications.",
    
    // Process
    "process.title": "Our Process",
    "process.subtitle": "A structured process that ensures quality at every step",
    "process.step1.title": "Consultation",
    "process.step1.desc": "We discuss your needs, specifications, and requirements for metal parts",
    "process.step2.title": "Supplier Matching",
    "process.step2.desc": "We identify and evaluate suitable suppliers in our network",
    "process.step3.title": "Quality Control",
    "process.step3.desc": "Thorough inspection and testing before delivery",
    "process.step4.title": "Delivery",
    "process.step4.desc": "Safe transport and delivery directly to your door in Sweden",
    
    // Why Choose Us
    "why.title": "Why Choose Alloy Nordic?",
    "why.subtitle": "We make international trade easy and safe for Swedish companies",
    "why.quality.title": "Quality Guarantee",
    "why.quality.desc": "We stand behind the quality of all products we deliver",
    "why.cost.title": "Cost Effective",
    "why.cost.desc": "Competitive prices without compromising on quality",
    "why.contact.title": "Swedish Contact",
    "why.contact.desc": "A personal contact person who speaks your language",
    "why.response.title": "Fast Response",
    "why.response.desc": "We always respond within 24 hours on weekdays",
    
    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Tell us about your project and we'll get back to you with a tailored solution",
    "contact.talk": "Let's talk",
    "contact.info": "Do you have questions about our services or want to discuss your next project? Fill in the form or contact us directly – we always respond within 24 hours on weekdays.",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.phone": "Phone number",
    "contact.form.company": "Company name",
    "contact.form.message": "Message",
    "contact.form.namePlaceholder": "Your name",
    "contact.form.emailPlaceholder": "your@email.com",
    "contact.form.phonePlaceholder": "+46 70 123 45 67",
    "contact.form.companyPlaceholder": "Your Company AB",
    "contact.form.messagePlaceholder": "Describe what you're looking for...",
    "contact.form.submit": "Send inquiry",
    "contact.form.submitting": "Sending...",
    "contact.toast.title": "Thank you for your inquiry!",
    "contact.toast.desc": "We'll get back to you within 24 hours.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.address": "Address",
    
    // Footer
    "footer.tagline": "Quality without compromise",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.about": "About us",
    "footer.services": "Services",
    "footer.process": "Our process",
    "footer.contactLink": "Contact",
    "footer.rights": "All rights reserved.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("sv");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.sv] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
