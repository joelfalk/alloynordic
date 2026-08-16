import { createContext, useContext, useState, ReactNode } from "react";

type Language = "sv" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  sv: {
    // Nav
    "nav.how": "Så fungerar det",
    "nav.services": "Tjänster",
    "nav.materials": "Material",
    "nav.about": "Om oss",
    "nav.contact": "Kontakt",
    "nav.cta": "Begär offert",

    // Hero
    "hero.kicker": "ALLOY NORDIC — ANDERSTORP, SVERIGE",
    "hero.h1": "Global sourcing av metalldelar — från ritning till levererad detalj.",
    "hero.sub":
      "Alloy Nordic hittar rätt fabrik, kontrollerar kvaliteten på plats och levererar till din dörr — med en svensk kontakt hela vägen.",
    "hero.cta": "Skicka ritning",
    "hero.response": "SVAR INOM 24 H",
    "hero.stat.years": "ÅR I METALLBRANSCHEN",
    "hero.stat.suppliers": "LEVERANTÖRER",
    "hero.stat.suppliersValue": "2 400+",
    "hero.stat.countries": "LÄNDER",
    "hero.stat.response": "SVARSTID",

    // Så fungerar det
    "process.h2": "Så fungerar det",
    "process.step1.title": "Skicka ritning & volym",
    "process.step1.tag": "SVAR INOM 24 H",
    "process.step2.title": "Vi samlar in & jämför offerter",
    "process.step2.tag": "DAGAR — INTE VECKOR",
    "process.step3.title": "Kvalitetskontroll",
    "process.step3.tag": "PÅ PLATS ELLER HOS VÅR PARTNER, MOT DINA TOLERANSER",
    "process.step4.title": "Leverans till din dörr",
    "process.step4.tag": "TULL & FRAKT INGÅR. LAGERHÅLLNING? INGA PROBLEM.",

    // Tjänster
    "services.h2": "Ett ansvar — hela vägen",
    "services.kicker": "TJÄNSTER",
    "services.1.title": "Sourcing & matchning",
    "services.1.desc": "Rätt fabrik för din detalj — ur 2 400+ kvalificerade leverantörer.",
    "services.2.title": "Kvalitetskontroll",
    "services.2.desc": "Inspektion mot dina toleranser — innan något lämnar fabriken.",
    "services.3.title": "Logistik & frakt",
    "services.3.desc": "Tull, dokument och spårning — fabrik till dörr.",
    "services.4.title": "Specialtillverkning",
    "services.4.desc": "CNC, gjutning, MIM och varmpressning — enligt ritning.",
    "services.5.title": "Prototyper",
    "services.5.desc": "Från ritning till fysisk prototyp — innan du binder upp volym.",
    "services.6.title": "Teknisk rådgivning",
    "services.6.desc": "Vi utvärderar rätt tillverkningsmetod och stöttar med teknisk expertis genom hela projektet.",
    "services.1.details":
      "Vi matchar din detalj mot leverantörer med rätt maskinpark, kapacitet och certifikat — och du får jämförbara offerter samlade i ett beslutsunderlag.",
    "services.2.details":
      "Kontrollen sker hos leverantören eller hos vår partner innan frakt: måttkontroll mot ritning, ytkontroll och dokumentation. Avvikelser åtgärdas innan detaljerna lämnar landet.",
    "services.3.details":
      "Sjö-, flyg- eller vägfrakt efter behov. Vi sköter tull och dokument — du följer leveransen hela vägen till dörren.",
    "services.4.details":
      "Skärande bearbetning, pressgjutning, MIM, varmpressning och smide — metoden väljs efter geometri, material och volym.",
    "services.5.details":
      "Prototyper i litet antal för form-, funktions- och monteringstest — snabb återkoppling innan serieverktyg beställs.",
    "services.6.details":
      "Vi granskar ritningar, föreslår materialval och utvärderar vilken tillverkningsmetod som ger bäst totalkostnad för din volym.",

    // Material
    "materials.label": "MATERIAL",
    "materials.ss304": "Rostfritt stål",
    "materials.ss316": "Marint rostfritt",
    "materials.al6061": "Aluminium",
    "materials.al7075": "Höghållfast aluminium",
    "materials.ti": "Titan",
    "materials.copper": "Koppar",
    "materials.tool": "Verktygsstål",
    "materials.zinc": "Zink",

    // Om oss
    "about.kicker": "OM OSS",
    "about.h2": "En svensk partner. Ett globalt nätverk.",
    "about.para":
      "Alloy Nordic är en svensk sourcingpartner i Anderstorp, grundad av ett team med över 35 års erfarenhet av metallinköp. Vi kombinerar branscherfarenheten med en AI-driven offertplattform — så att du kan sourca globalt med samma trygghet som lokalt.",
    "about.meta1": "GRUNDAT 2025",
    "about.meta3": "35+ ÅRS BRANSCHERFARENHET",

    // Kontakt
    "contact.kicker": "KONTAKT",
    "contact.h2": "Skicka ritningen. Vi gör resten.",
    "contact.email": "E-post",
    "contact.phone": "Telefon",
    "contact.address": "Adress",
    "contact.form.name": "Namn",
    "contact.form.email": "E-post",
    "contact.form.company": "Företag",
    "contact.form.message": "Meddelande",
    "contact.form.namePlaceholder": "Ditt namn",
    "contact.form.emailPlaceholder": "din@email.se",
    "contact.form.companyPlaceholder": "Ditt företag AB",
    "contact.form.messagePlaceholder": "Material, volym, toleranser...",
    "contact.form.dropzone": "Släpp ritningar här (PDF/STEP) eller klicka för att bläddra",
    "contact.form.submit": "Skicka förfrågan",
    "contact.form.submitting": "Skickar...",
    "contact.form.done": "Tack! Vi återkommer inom 24 timmar.",
    "contact.toast.title": "Tack för din förfrågan!",
    "contact.toast.desc": "Vi återkommer till dig inom 24 timmar.",
    "contact.toast.errorTitle": "Något gick fel",
    "contact.toast.errorDesc": "Kunde inte skicka meddelandet. Försök igen.",
    "contact.toast.fileTooLargeTitle": "Filerna är för stora",
    "contact.toast.fileTooLargeDesc": "Bifogade ritningar får vara max 10 MB totalt.",

    // Manufacturing Processes Page
    "manufacturing.title": "Tillverkningsprocesser",
    "manufacturing.subtitle": "Vi erbjuder ett brett utbud av tillverkningsmetoder för att möta dina specifika behov",
    "manufacturing.back": "Tillbaka till startsidan",

    "manufacturing.machining.title": "Skärande bearbetning",
    "manufacturing.machining.desc": "Högprecisionsbearbetning för komplexa metalldelar",
    "manufacturing.machining.details":
      "Skärande bearbetning omfattar CNC-fräsning, svarvning och slipning. Denna metod ger extremt hög precision och utmärkt ytfinish. Vi samarbetar med leverantörer som använder moderna 5-axliga CNC-maskiner för att producera komplexa geometrier med högsta noggrannhet.",

    "manufacturing.casting.title": "Gjutning",
    "manufacturing.casting.desc": "Sandgjutning, precisionsgjutning och pressgjutning för alla behov",
    "manufacturing.casting.details":
      "Gjutning är en kostnadseffektiv metod för att producera metalldelar i små till medelstora volymer. Vi erbjuder sandgjutning för större detaljer, precisionsgjutning (investment casting) för komplexa former med fin ytfinish, samt pressgjutning för produktion av aluminium- och zinkdetaljer. Varje metod väljs baserat på dina specifika krav på material, geometri och volym.",

    "manufacturing.sintering.title": "Sintrade detaljer & MIM",
    "manufacturing.sintering.desc": "Metallformsprutning och pulvermetallurgi för komplexa smådetaljer",
    "manufacturing.sintering.details":
      "Metal Injection Molding (MIM) och sintring kombinerar fördelarna med plastformsprutning och pulvermetallurgi. Processen ger utmärkt dimensionsstabilitet och möjliggör produktion av geometrier som är omöjliga att uppnå med traditionell bearbetning. Idealiskt för komponenter inom medicinteknik, elektronik och fordonsindustrin.",

    "manufacturing.hotpressing.title": "Varmpressning",
    "manufacturing.hotpressing.desc": "Formning av metall under hög temperatur och tryck",
    "manufacturing.hotpressing.details":
      "Varmpressning är en kraftfull process där metall formas under hög temperatur och tryck. Denna metod ger komponenter med utmärkt mekanisk styrka och densitet. Vi kan hantera en mängd olika legeringar och materialspecifikationer.",

    "manufacturing.cta.title": "Har du ett projekt i åtanke?",
    "manufacturing.cta.desc": "Kontakta oss för en kostnadsfri konsultation och offert för ditt tillverkningsprojekt.",
    "manufacturing.cta.contact": "Kontakta oss",
    "manufacturing.cta.home": "Tillbaka till startsidan",
  },
  en: {
    // Nav
    "nav.how": "How it works",
    "nav.services": "Services",
    "nav.materials": "Materials",
    "nav.about": "About us",
    "nav.contact": "Contact",
    "nav.cta": "Request a quote",

    // Hero
    "hero.kicker": "ALLOY NORDIC — ANDERSTORP, SWEDEN",
    "hero.h1": "Global sourcing of metal parts — from drawing to delivered part.",
    "hero.sub":
      "Alloy Nordic finds the right factory, inspects quality on site and delivers to your door — with one Swedish contact all the way.",
    "hero.cta": "Send a drawing",
    "hero.response": "REPLY WITHIN 24 H",
    "hero.stat.years": "YEARS IN THE METAL INDUSTRY",
    "hero.stat.suppliers": "SUPPLIERS",
    "hero.stat.suppliersValue": "2,400+",
    "hero.stat.countries": "COUNTRIES",
    "hero.stat.response": "RESPONSE TIME",

    // How it works
    "process.h2": "How it works",
    "process.step1.title": "Send drawing & volume",
    "process.step1.tag": "REPLY WITHIN 24 H",
    "process.step2.title": "We collect & compare quotes",
    "process.step2.tag": "DAYS — NOT WEEKS",
    "process.step3.title": "Quality control",
    "process.step3.tag": "ON SITE OR AT OUR PARTNER, TO YOUR TOLERANCES",
    "process.step4.title": "Delivery to your door",
    "process.step4.tag": "CUSTOMS & FREIGHT INCLUDED. WAREHOUSING? NO PROBLEM.",

    // Services
    "services.h2": "One responsibility — all the way",
    "services.kicker": "SERVICES",
    "services.1.title": "Sourcing & matching",
    "services.1.desc": "The right factory for your part — out of 2,400+ qualified suppliers.",
    "services.2.title": "Quality control",
    "services.2.desc": "Inspection to your tolerances — before anything leaves the factory.",
    "services.3.title": "Logistics & freight",
    "services.3.desc": "Customs, documents and tracking — factory to door.",
    "services.4.title": "Custom manufacturing",
    "services.4.desc": "CNC, casting, MIM and hot pressing — to your drawings.",
    "services.5.title": "Prototyping",
    "services.5.desc": "From drawing to physical prototype — before you commit to volume.",
    "services.6.title": "Technical advisory",
    "services.6.desc": "We evaluate the right production method and provide technical expertise throughout the project.",
    "services.1.details":
      "We match your part against suppliers with the right machinery, capacity and certificates — and you get comparable quotes gathered into one decision basis.",
    "services.2.details":
      "Inspection happens at the factory before shipping: dimensional checks against the drawing, surface inspection and documentation. Deviations are corrected before parts leave the country.",
    "services.3.details":
      "Sea, air or road freight as needed. We handle customs and documents — you follow the delivery all the way to your door.",
    "services.4.details":
      "Machining, die casting, MIM, hot pressing and forging — the method is chosen based on geometry, material and volume.",
    "services.5.details":
      "Small-batch prototypes for form, fit and assembly testing — fast feedback before series tooling is ordered.",
    "services.6.details":
      "We review drawings, suggest materials and evaluate which production method gives the best total cost for your volume.",

    // Materials
    "materials.label": "MATERIALS",
    "materials.ss304": "Stainless steel",
    "materials.ss316": "Marine stainless",
    "materials.al6061": "Aluminium",
    "materials.al7075": "High-strength aluminium",
    "materials.ti": "Titanium",
    "materials.copper": "Copper",
    "materials.tool": "Tool steel",
    "materials.zinc": "Zinc",

    // About
    "about.kicker": "ABOUT US",
    "about.h2": "A Swedish partner. A global network.",
    "about.para":
      "Alloy Nordic is a Swedish sourcing partner in Anderstorp, founded by a team with over 35 years of experience in metal purchasing. We combine that industry experience with an AI-driven quoting platform — so you can source globally with the same confidence as locally.",
    "about.meta1": "FOUNDED 2025",
    "about.meta3": "35+ YEARS OF INDUSTRY EXPERIENCE",

    // Contact
    "contact.kicker": "CONTACT",
    "contact.h2": "Send the drawing. We do the rest.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.address": "Address",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.company": "Company",
    "contact.form.message": "Message",
    "contact.form.namePlaceholder": "Your name",
    "contact.form.emailPlaceholder": "you@email.com",
    "contact.form.companyPlaceholder": "Your company Ltd",
    "contact.form.messagePlaceholder": "Material, volume, tolerances...",
    "contact.form.dropzone": "Drop drawings here (PDF/STEP) or click to browse",
    "contact.form.submit": "Send request",
    "contact.form.submitting": "Sending...",
    "contact.form.done": "Thank you! We'll get back to you within 24 hours.",
    "contact.toast.title": "Thank you for your inquiry!",
    "contact.toast.desc": "We'll get back to you within 24 hours.",
    "contact.toast.errorTitle": "Something went wrong",
    "contact.toast.errorDesc": "The message could not be sent. Please try again.",
    "contact.toast.fileTooLargeTitle": "Files too large",
    "contact.toast.fileTooLargeDesc": "Attached drawings can be at most 10 MB in total.",

    // Manufacturing Processes Page
    "manufacturing.title": "Manufacturing Processes",
    "manufacturing.subtitle": "We offer a wide range of manufacturing methods to meet your specific needs",
    "manufacturing.back": "Back to homepage",

    "manufacturing.machining.title": "Machining",
    "manufacturing.machining.desc": "High-precision machining for complex metal parts",
    "manufacturing.machining.details":
      "Machining includes CNC milling, turning, and grinding. This method provides extremely high precision and excellent surface finish. Perfect for prototypes, small to medium series, and components with tight tolerances. We work with suppliers using modern 5-axis CNC machines to produce complex geometries with the highest accuracy.",

    "manufacturing.casting.title": "Casting",
    "manufacturing.casting.desc": "Sand casting, investment casting, and die casting for all needs",
    "manufacturing.casting.details":
      "Casting is a cost-effective method for producing metal parts in small to medium volumes. We offer sand casting for larger parts, investment casting for complex shapes with fine surface finish, and die casting for high-volume production of aluminum and zinc parts. Each method is selected based on your specific requirements for material, geometry, and volume.",

    "manufacturing.sintering.title": "Sintered Parts & MIM",
    "manufacturing.sintering.desc": "Metal injection molding and powder metallurgy for complex small parts",
    "manufacturing.sintering.details":
      "Metal Injection Molding (MIM) and sintering combine the advantages of plastic injection molding and powder metallurgy. Perfect for small, complex parts in large volumes. The process provides excellent dimensional stability and enables production of geometries impossible to achieve with traditional machining. Ideal for components in medical technology, electronics, and automotive industries.",

    "manufacturing.hotpressing.title": "Hot Pressing",
    "manufacturing.hotpressing.desc": "Metal forming under high temperature and pressure",
    "manufacturing.hotpressing.details":
      "Hot pressing is a powerful process where metal is formed under high temperature and pressure. This method produces components with excellent mechanical strength and density. Particularly suitable for manufacturing structural components, tools, and parts requiring high strength. We can handle a variety of alloys and material specifications.",

    "manufacturing.cta.title": "Have a project in mind?",
    "manufacturing.cta.desc": "Contact us for a free consultation and quote for your manufacturing project.",
    "manufacturing.cta.contact": "Contact us",
    "manufacturing.cta.home": "Back to homepage",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("sv");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.sv] || key;
  };

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
