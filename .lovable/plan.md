## Mål
Gör ProcessFlow minimalistisk: visa endast nummer + ikon + rubrik på varje kort. Beskrivningen visas som en utfällbar "gardin" vid hover. Rutorna görs bredare så rubriker aldrig radbryter.

## Ändringar

**`src/components/ProcessFlow.tsx`**

1. **StepCard – minimalistisk look**
   - Ta bort den alltid synliga `<p>`-beskrivningen.
   - Behåll: nummer (01–07), ikon, rubrik.
   - Minska höjd: `min-h-[16rem]` → `min-h-[9rem]` (kompakt, luftigt).
   - Rubrik: `whitespace-nowrap` så den aldrig radbryts (ta bort `break-words`).
   - Lägg till `group` + `overflow-hidden` på korten.
   - Lägg till en hover-gardin under rubriken:
     ```
     <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
       <p className="overflow-hidden text-sm text-white/70 leading-relaxed">
         {t(`${step.key}.desc`)}
       </p>
     </div>
     ```
   - Subtil hover-feedback behålls (border/bg).

2. **Bredare rutor – layoutjustering**
   - XL-raden (7 i bredd) gör att rubrikerna måste radbryta vid de längsta texterna. Byt till **2 rader med större kort** så bredden räcker till för rubrik på en rad:
     - Ändra `hidden xl:grid grid-cols-7` → `hidden xl:grid grid-cols-4` (4+3-layout, sista kortet kan center-justeras eller lämnas vänster).
     - Alternativ: behåll 7-kolumn men öka container till full bredd. Vi väljer 4-kolumn för luftigare minimalism.
   - LG-raden behålls som `grid-cols-4`.
   - Tablet/mobil: oförändrat (rubrik på en rad funkar redan i smalare kort om vi tar bort beskrivningen, men `whitespace-nowrap` med truncate-skydd: använd `whitespace-normal` på `md:hidden` mobil för säkerhets skull). Vi sätter `whitespace-nowrap` endast från `md:` och uppåt.

3. **Konnektorer (XL)**
   - Eftersom XL nu är 4-kolumn försvinner den långa horisontella konnektor-raden. Vi tar bort den absolut-positionerade connectorn i XL-grenen (eller behåller den endast inom raderna). Enklast: ta bort connectorn i XL-grenen för minimalism.

## Resultat
- Lugnt, minimalistiskt rutnät: nummer, ikon, rubrik.
- Hover på en ruta fäller ut beskrivningen mjukt (CSS grid-rows-trick, inga JS-state).
- Bredare kort (4 kolumner istället för 7) gör att alla rubriker får plats utan radbryt.
