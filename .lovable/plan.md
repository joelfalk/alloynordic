## Mål
Få banner-texten (4 rader) att rullas ner som **en sammanhängande rullgardin** istället för fyra separata block. Samma totala tid (~1.6s), men en kontinuerlig, mjuk rörelse — ingen stagger per rad.

## Problem idag
- Varje `<p>` ligger i sin egen `overflow-hidden`-wrapper och har egen `animationDelay`.
- Det får raderna att klippas individuellt → ser ut som 4 block som faller in i tur och ordning ("hackigt").

## Lösning
Slå ihop alla 4 rader till **en gemensam rullgardin**:

1. **`src/components/sections/Hero.tsx`**
   - Ta bort de fyra individuella `<div className="overflow-hidden">`-wrapparna och deras `animationDelay`-styles.
   - Wrappa hela banner-blocket (alla 4 `<p>`) i **en** container:
     ```
     <div className="mt-8 overflow-hidden">
       <div className="motion-safe:animate-curtain-down [mask-image:linear-gradient(to_bottom,transparent_0%,black_60%)]">
         <p>...lead...</p>
         <p>...bold1...</p>
         <p>...body...</p>
         <p>...bold2...</p>
       </div>
     </div>
     ```
   - Behåll `mt-5 / mt-3 / mt-4` mellan raderna som vanliga marginaler (inte längre på wrappers).
   - Inga `animationDelay` per rad.

2. **`tailwind.config.ts`** — förenkla `curtain-down` till en ren, kontinuerlig glidning:
   - `0%`   → `transform: translateY(-100%); opacity: 0`
   - `100%` → `transform: translateY(0); opacity: 1`
   - Duration: behåll **1.6s** (samma totaltid som nu).
   - Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (oförändrat — mjuk utan studs).

## Varför detta blir mjukare
- En enda translate-animation på hela textblocket = en kontinuerlig rörelse, inte 4 separata.
- `mask-image`-gradienten gör att texten naturligt går från transparent (överst) till tydlig (nederst) **medan den glider ner** — exakt "rullgardin med klarare text längre ner"-känslan, utan att enskilda rader poppar in.
- Total varaktighet oförändrad (~1.6s), så det inte tar längre tid.

## Berör inte
- H1 ("ALLOY NORDIC"), CTA-knappar, statbar, bakgrund, översättningstexter, andra sektioner.
