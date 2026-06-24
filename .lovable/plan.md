## Mål
Få ProcessFlow att kännas som en sammanhängande process: 7 kort på **en rad** med en horisontell linje som löper genom alla kort (animerad accent), mindre rubriktext, behåll hover-gardin för beskrivning.

## Ändringar – `src/components/ProcessFlow.tsx`

1. **Tillbaka till 7-kolumn på XL**
   - `hidden xl:grid grid-cols-4` → `hidden xl:grid grid-cols-7 gap-0 items-stretch` (gap 0 så linjen blir obruten).
   - LG (1024–1280px): behåll `grid-cols-4` (för smalt för 7 i rad).

2. **Genomgående processlinje**
   - Lägg en horisontell linje över hela 7-kort-raden, positionerad i höjd med ikonernas mitt (`top-12` ≈ mitten av ikon-cirkeln med p-6 + 12px ikoncenter).
   - Implementation: wrappa `<ol>` i en `relative`-container; lägg en absolut `<div>` på `top-[3.25rem] left-0 right-0 h-px bg-white/15` med en inre `bg-accent` som animeras med `scale-x-0 → 1` (`origin-left`, `animate-connector-grow`, delay ~`BASE_DELAY`).
   - Ikon-cirkeln får `bg-background` (eller `bg-[hsl(var(--background))]`) så linjen "bryts" visuellt bakom cirkeln och cirkeln sitter "på" linjen som processnoder. Använd `relative z-10` på cirkeln.

3. **Korten på XL**
   - Ta bort kortets border + bakgrund i XL-läget så det ser ut som noder på en linje, inte rutor. Variant via prop `variant: "node" | "card"`:
     - `node`: ingen border/bg, bara padding + ikon + rubrik + hover-gardin. Hover ändrar ikonens ring till accent.
   - LG/tablet/mobil fortsätter använda `card`-varianten (med border/bg) som idag.

4. **Mindre rubriker**
   - Rubrik: `text-base md:text-lg` → `text-xs md:text-sm font-medium tracking-wide`.
   - Behåll `whitespace-nowrap` på md+ så de står på en rad.

5. **Hover-gardin**
   - Oförändrad (grid-rows-trick), men `text-xs` istället för `text-sm` för konsekvent skala.

6. **Konnektor-komponenten/mobil**
   - Mobil oförändrad (vertikal layout med Connector).

## Resultat
- XL: 7 ikon-noder i en rad förbundna av en animerad accentlinje, små rubriker under varje nod, beskrivning fälls ut vid hover.
- LG och nedåt: kortbaserad fallback.
