# Plan: Ny AI-banner i Hero + uppdaterade taglines

## Mål
Byt ut nuvarande "— Kvalitetsdelar i metall" i Hero samt "Kvalitet utan kompromiss" på sajten mot en ny fyrradig banner med tydlig typografisk hierarki.

## Innehåll – Svenska
1. **Rad 1 – stor rubrikrad** (samma storlek som nuvarande "Kvalitetsdelar i metall", dvs `text-2xl sm:text-3xl md:text-4xl`):
   "Framtidens sourcing börjar med AI"
2. **Rad 2 – fetstil**:
   "Vi automatiserar offertprocessen och öppnar dörren till ett globalt nätverk av kvalificerade leverantörer."
3. **Rad 3 – brödtext**:
   "Genom att kombinera djup sourcingkompetens med egenutvecklade AI-verktyg effektiviserar vi hela processen – från förfrågan och leverantörsval till offertinsamling, analys och utvärdering. Det ger snabbare beslut, bättre leverantörsalternativ och mer konkurrenskraftiga priser."
4. **Rad 4 – fetstil**:
   "AI-driven offertautomation. Global sourcing. Bättre affärer."

## Innehåll – Engelska
1. **Rad 1 – stor rubrikrad**:
   "AI-Driven RFQ Automation for Global Manufacturing"
2. **Rad 2 – fetstil**:
   "Automate quotations. Access global suppliers. Make smarter sourcing decisions."
3. **Rad 3 – brödtext**:
   "We combine sourcing expertise with proprietary AI technology that automates the entire RFQ workflow—from supplier identification and qualification to quote collection, analysis, and benchmarking. The result is faster sourcing cycles, reduced administrative workload, and more competitive supplier solutions worldwide."
4. **Rad 4 – fetstil**:
   "Automated RFQs. Global supplier access. Smarter procurement decisions."

## Ändringar per fil

### `src/contexts/LanguageContext.tsx`
Lägg till 4 nya nycklar i både `sv` och `en`:
- `hero.banner.lead`
- `hero.banner.bold1`
- `hero.banner.body`
- `hero.banner.bold2`

Uppdatera även:
- `footer.tagline` (sv): "AI-driven offertautomation. Global sourcing. Bättre affärer."
- `footer.tagline` (en): "Automated RFQs. Global supplier access. Smarter procurement decisions."
- `hero.tagline` blir oanvänd och kan tas bort.

### `src/components/sections/Hero.tsx`
- Ta bort `<span>— Kvalitetsdelar i metall</span>` från `<h1>`.
- Ta bort nuvarande `<p>{t("hero.tagline")}</p>`.
- Lägg in ny banner direkt under H1:
  - Rad 1: `<p className="mt-6 text-2xl sm:text-3xl md:text-4xl font-medium text-white max-w-3xl">{t("hero.banner.lead")}</p>`
  - Rad 2: `<p className="mt-5 text-base md:text-lg font-bold text-white max-w-2xl">{t("hero.banner.bold1")}</p>`
  - Rad 3: `<p className="mt-3 text-base md:text-lg text-white/85 font-light max-w-2xl">{t("hero.banner.body")}</p>`
  - Rad 4: `<p className="mt-4 text-base md:text-lg font-bold text-accent max-w-2xl">{t("hero.banner.bold2")}</p>`
- CTA-knapparna lämnas oförändrade nedanför.

### Footer
Inga strukturella ändringar – bara nytt strängvärde via `t("footer.tagline")`.

## SEO / H1
H1 fortsätter innehålla "ALLOY NORDIC". Den beskrivande "— Kvalitetsdelar i metall" tas bort; istället fungerar den nya stora raden som värdeförslag direkt under H1 (som `<p>`, inte del av H1). Above-the-fold-texten förblir deskriptiv och SEO-vänlig.

## Memory
Uppdatera `mem://index.md` Core: ta bort "Kvalitet utan kompromiss" som tagline, ersätt med ny AI-positionering.
