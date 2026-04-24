
# Visuell uppgradering av alloynordic.se

Sidan ser idag "generisk" eftersom den följer ett mycket vanligt Lovable/Tailwind-template-mönster: orange hero med overlay → vit sektion → grå sektion → färgad sektion → grid med 4 ikoner i cirklar → vit kontaktform. Allt är mittenjusterat med samma `accent`-streck under varje rubrik. Inga foton av riktigt material, ingen typografisk identitet, inga siffror/bevis, ingen sticky navbar.

Här är ett konkret förslag i tre nivåer. Du kan välja A, B eller C — eller plocka delar.

## Diagnos: vad som får sidan att kännas mall-aktig idag

- **Hero är en enda massiv orange platta.** Råmaterial-bilden döljs nästan helt av `from-primary/90 via-primary/80 to-primary/70`. Resultatet känns som en gradient-knapp i fullskärm.
- **Ingen navbar.** Bara en språkväljare uppe i hörnet → besökaren har inget att förankra sig i.
- **Varje sektion är "centrerad rubrik + 24px orange streck + underrubrik".** Sex gånger i rad. Det är den största "template-känslan".
- **Lucide-ikoner i runda/fyrkantiga plattor** används i tre olika sektioner (About, Services, WhyChooseUs, Process, Contact). Inga riktiga produkt- eller fabriksbilder.
- **Inga siffror, inga kundlogotyper, inga material-exempel** — inget som bevisar att ni faktiskt jobbar med metall.
- **Typografi är 100% Inter sans-serif** överallt trots att Lora (serif) och Space Mono är importerade. Industriprofiler vinner mycket på en typografisk kontrast.
- **9 separata Google Fonts importeras** men bara Inter används → långsamt + rörigt.
- **Färgsystemet är trasigt.** `--primary` är mörkgrå/lila (`266 4% 20.8%`), `--accent` är nästan vit (`248 0.7% 96.8%`). Den orangea färgen finns bara hårdkodad i Hero-gradienten — det finns ingen riktig accentfärg i tokens.

---

## Nivå A — Snabba vinster (störst effekt per ändring)

1. **Lägg till en sticky navbar** med logotyp till vänster, sektionslänkar i mitten, "Kontakta oss"-CTA till höger, språkväljaren integrerad. Transparent över hero, vit/blurrad när man scrollat.
2. **Fixa färgsystemet i `index.css`:** definiera `--brand-orange` som riktig orange (t.ex. `18 88% 52%`) och en mörk industriton (t.ex. antracit `220 13% 12%`) som ny `--primary`. Ta bort den ljusa `--accent` och låt accent = orange.
3. **Bygg om hero:**
   - Visa råmaterial-bilden tydligt (mörk vinjett i hörnen istället för full orange overlay).
   - Vänsterjustera innehållet istället för centrerat.
   - Ersätt 3 jämnstora knappar med 1 primär CTA + 1 sekundär textlänk med pil.
   - Lägg till en tunn "stat bar" längst ned i hero: "Global sourcing • Nordisk kvalitet • Snabb respons" eller faktiska siffror (års erfarenhet, antal länder, ledtid).
4. **Ta bort det orange strecket under varje rubrik.** Använd istället ett litet uppercase "kicker"-ord ovanför rubriken (t.ex. `TJÄNSTER` i Space Mono, orange, letter-spacing) — det ger industriell känsla utan att upprepa sig.
5. **Rensa fontimporterna** ner till 2: Inter (sans) + Space Mono (för kickers/siffror). Det räcker långt.

## Nivå B — Strukturella förändringar (gör att sidan känns "byggd för er")

6. **Asymmetriska sektionslayouter** istället för 6 centrerade i rad:
   - **About:** vänster halva = stort foto/collage av material; höger halva = text + de 3 mini-feature-korten staplade.
   - **Services:** byt 2x2-grid mot horisontella "rader" där varje tjänst har: stort nummer (01, 02…) i Space Mono + titel + beskrivning + en tunn delningslinje. Inga ikoner i rutor.
   - **Process:** byt grid mot en vertikal eller horisontell timeline med en faktisk linje som binder ihop stegen, inte fristående kort med pilar emellan.
   - **WhyChooseUs:** byt 4 cirklar mot ett bento-grid (en stor + tre små rutor) där varje ruta har ett tema-foto i bakgrunden med mörk overlay.
7. **Lägg till en "Material vi jobbar med"-sektion** — horisontell scroll/grid med 6–10 material (rostfritt 304/316, aluminium 6061, titan grade 5, mässing, koppar…). Detta är specifikt för er bransch och slår template-känslan helt.
8. **Lägg till social proof-stripe:** logotypbälte med kund-/leverantörslogotyper i gråskala, eller — om ni inte vill namnge kunder — siffror som "20+ länder", "ISO-certifierade leverantörer", "48h offertsvar".
9. **Kontakt:** dela upp i två tydliga spår — "Begär offert" (formulär, primär) och "Direktkontakt" (Joels namn, foto, email, telefon, LinkedIn) istället för anonym "info@"-känsla.

## Nivå C — Extra polering (om ni vill gå hela vägen)

10. **Foto-uppgradering:** byt stockbilden av metallstänger mot 3–5 bilder i samma färgton (mörk, kontrastrik makro av metall). Använd dem som sektionsbakgrunder med subtil parallax.
11. **Subtila animationer:** fade-in + slide-up på sektioner när de scrollas in (med `framer-motion` eller bara IntersectionObserver + Tailwind). Hero-rubriken kan stagger-animeras bokstav för bokstav.
12. **Mikro-detalj:** låt "O"-ikonen i ALLOY-loggan rotera mycket långsamt eller pulsa svagt — gör loggan minnesvärd.
13. **Mörkt tema som default** för hela sidan (inte bara hero). En mörk industriprofil med orange accent är ovanligare och passar metall/tillverkning bättre än vit bakgrund.
14. **Egen 404-sida** och en tunn "request a quote"-CTA-bar som sticker längst ner på sidan när man scrollat förbi hero.

---

## Tekniska detaljer (för implementation)

- **Tokens:** uppdatera `:root` i `src/index.css` så att `--primary` blir antracit och introducera `--brand` (orange). Mappa `--accent` till `--brand`. Uppdatera `tailwind.config.ts` med `brand: 'hsl(var(--brand))'`.
- **Navbar:** ny komponent `src/components/Navbar.tsx`, monteras i `src/pages/Index.tsx` ovanför `<Hero />`. Använd `useState` + scroll-listener för transparent → solid övergång. Flytta `LanguageSwitcher` in i navbaren.
- **Kicker-mönster:** liten återanvändbar komponent `<SectionKicker>TJÄNSTER</SectionKicker>` som ersätter det orangea strecket i alla sektioner.
- **Hero:** byt overlay från ren orange-gradient till `bg-gradient-to-t from-background via-background/70 to-transparent` + en sub-gradient åt höger för textläsbarhet. Vänsterjustera innehåll (`text-left`, `items-start`).
- **Services/Process/WhyChooseUs:** skriv om JSX-strukturen enligt punkt 6. Behåll översättningsnycklarna oförändrade.
- **Material-sektion:** ny `src/components/sections/Materials.tsx` + nya översättningsnycklar i `LanguageContext.tsx`.
- **Fontimport-städning:** ta bort 7 av 9 `@import url(...)` i `index.css`. Behåll Inter + Space Mono.
- **Animationer:** lägg till `tailwindcss-animate` keyframes (redan installerat) eller installera `framer-motion` för stagger.

---

## Fråga till dig

Vill du att jag kör hela paketet eller plockar?

- **Alternativ 1:** Bara Nivå A (snabbt, ~en omgång ändringar, störst visuell skillnad per minut).
- **Alternativ 2:** Nivå A + B (rekommenderas — då försvinner template-känslan helt).
- **Alternativ 3:** Allt inklusive Nivå C (mer ambitiöst, kan kräva nya bilder).
- **Alternativ 4:** Säg vilka punkter (1–14) du vill ha så bygger jag exakt det.

Säg till vilken nivå/punkter du vill köra på, så implementerar jag.
