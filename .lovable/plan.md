## Mål
Ersätt brödtexten (rad 3) i hero med ett större, mer framträdande animerat AI-flöde i 7 steg. Varje steg har en rubrik och en kort, modern beskrivning under rubriken.

## Steg och copy

| # | Rubrik (SV) | Beskrivning (SV) | Rubrik (EN) | Beskrivning (EN) |
|---|---|---|---|---|
| 01 | Förfrågan | Kunden skickar in sin förfrågan – startpunkten för hela flödet. | Request | The customer submits their request — the starting point of the flow. |
| 02 | AI-analys av input | Vårt AI läser, strukturerar och sammanställer all data ur förfrågan. | AI input analysis | Our AI reads, structures and consolidates all data from the request. |
| 03 | Global utskick | Förfrågan skickas automatiskt till relevanta leverantörer i vårt globala nätverk. | Global distribution | The RFQ is sent automatically to relevant suppliers in our global network. |
| 04 | Offertinsamling | Inkommande offerter samlas in och knyts mot rätt RFQ i realtid. | Quote collection | Incoming quotes are gathered and matched to the right RFQ in real time. |
| 05 | Kvalitets- & prisanalys | AI utvärderar varje offert mot kvalitet, pris och tekniska krav. | Quality & price analysis | AI evaluates each quote against quality, price and technical requirements. |
| 06 | AI-rekommendation | AI väger pris, kvalitet, ledtid och andra parametrar och rekommenderar bästa offert. | AI recommendation | AI weighs price, quality, lead time and other parameters to recommend the best quote. |
| 07 | Presentation till kund | Slutresultatet presenteras tydligt och beslutsfärdigt för kunden. | Customer presentation | The final result is presented to the customer — clear and ready for decision. |

## Filändringar

### `src/contexts/LanguageContext.tsx`
- Byt ut nuvarande `hero.flow.step1`–`step5` mot `hero.flow.step1`–`step7` med både `.title` och `.desc` per steg (SV + EN), enligt tabellen.
- Behåll `hero.banner.body` i filen (oanvänd men ofarlig) eller ta bort båda språken – ta bort båda för städning.

### `src/components/sections/Hero.tsx`
- Ta bort `<p>` som renderar `hero.banner.body` (rad 3).
- Behåll `hero.banner.bold1` (rad 2) och `hero.banner.bold2` (rad 4).
- Öka utrymmet runt `<ProcessFlow />`: byt containerbredd till `max-w-6xl` enbart för flödesblocket, `mt-12` ovanför, `mt-12` till CTA.

### `src/components/ProcessFlow.tsx`
- Uppdatera `STEPS` till 7 steg med ikoner: `FileSearch`, `BrainCircuit`, `Globe2`, `Inbox`, `ScanSearch`, `Sparkles`, `Presentation` (lucide-react).
- Varje stegkort visar: nummer (01–07), ikon, **rubrik** (`text-base font-semibold`), **kort beskrivning** (`text-sm text-muted-foreground`, max ~2 rader).
- Större layout: noder `w-44` (desktop), ikon-cirkel `h-14 w-14`, tydligare kontrast (`bg-card border border-border`, accent-ring på ikon).
- Desktop: `grid grid-cols-7` med tunna animerade konnektorer mellan korten (samma `connector-grow`-keyframe). Vid behov wrap till 2 rader på medium skärm via `lg:grid-cols-7 md:grid-cols-4 grid-cols-1`.
- Mobil: vertikal stack, full bredd, vertikala konnektorer.
- Animation: behåll `slide-in-left` + `connector-grow` med staggered delay (BASE 600ms, STEP 140ms), `motion-safe:` prefix, körs en gång vid mount.

### `tailwind.config.ts`
- Inga nya keyframes behövs – `slide-in-left` och `connector-grow` finns redan.

## Vad som INTE ändras
- Hero curtain-animation, rad 1/2/4, CTA-knappar, statbar.
- Övriga sektioner (About, Services, Process, etc.).
- Inga nya dependencies.
