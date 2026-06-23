## Mål
Centrera hero-innehållet (rad 1–3) horisontellt på sidan och centrera det animerade flödet så att alla 7 stegrutor får exakt samma storlek.

## Ändringar

### `src/components/sections/Hero.tsx`
- Byt yttre wrapper `<div className="max-w-4xl">` → `<div className="max-w-5xl mx-auto text-center">` så rad 1 (ALLOY NORDIC), rad 2 (`hero.banner.lead`) och rad 3 (`hero.banner.bold1` + `hero.banner.bold2`) blir centrerade.
- Rad 1 `<h1>`: ändra `<span className="flex items-center gap-0">` → `flex items-center justify-center gap-0`.
- Rad 2 `<p>` (`hero.banner.lead`): ta bort `max-w-3xl`, lägg till `mx-auto`.
- Rad 3a `<p>` (`hero.banner.bold1`): ta bort `max-w-2xl`, lägg till `mx-auto`.
- Rad 3b `<p>` (`hero.banner.bold2`): ta bort `max-w-2xl`, lägg till `mx-auto`.
- Flödes-wrapper: byt `<div className="max-w-6xl mt-12">` → `<div className="max-w-6xl mx-auto mt-12">`.
- CTA-wrapper: byt `<div className="max-w-4xl">` → `<div className="max-w-4xl mx-auto">` och ändra CTA-raden till `justify-center` (`flex flex-col sm:flex-row items-center justify-center gap-5`).

### `src/components/ProcessFlow.tsx`
- Desktop (`lg:flex`): byt till CSS-grid med lika kolumner så alla steg är identiskt breda.
  - Byt `<ol className="hidden lg:flex items-stretch">` → `<ol className="hidden lg:grid grid-cols-[repeat(7,minmax(0,1fr))] items-stretch">`.
  - Ta bort `<li>`-konnektor-uppdelningen. Varje `<li>` är bara en stegruta (`<StepCard />`), full bredd i sin grid-kolumn, så alla rutor blir exakt lika stora.
  - Konnektorerna mellan korten ersätts av en tunn horisontell linje (`::before` på alla `<li>` utom det första) som ligger absolut i toppen av kortet på ikonhöjd. Linjen animeras med samma `connector-grow` keyframe via inline-stil `animationDelay`.
  - Alternativt enklare: rendera konnektorn som ett absolut positionerat element inuti `<li>` (vänstra kanten, kort vågrät linje, justerad så den landar mellan kortikonerna). Behåller kolumnerna exakt lika.
- StepCard: lägg till `w-full h-full` och `min-h-[12rem]` så alla kort får samma höjd även om beskrivningarna är olika långa.
- Tablet-grid (`md:grid lg:hidden`): byt till `grid-cols-2 lg:grid-cols-4 gap-4` med samma `h-full` på korten så de blir lika stora; varje `<li>` får `h-full`.
- Mobil: oförändrad layout, men `StepCard` får `w-full`.

### Vad som INTE ändras
- Animationstiming, ikoner, copy/översättningar, färger, hero-bakgrund, stat-bar, övriga sektioner.

## Resultat
- Rad 1–3 + CTA centrerade på sidan.
- Animerade flödet centrerat i en grid med 7 exakt lika breda och lika höga rutor på desktop, 2/4 kolumner på tablet, stack på mobil.
