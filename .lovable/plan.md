# Plan: "Rullgardin"-animation för Hero-bannern

## Mål
När startsidan laddas ska bannerns fyra rader (lead, bold1, body, bold2) under H1 animeras in som en rullgardin: varje rad glider nedåt från ovan och övergår från helt transparent till full opacitet medan den rullas ner. När animationen är klar visas all text helt skarp.

## Visuell beskrivning
- Rad 1 startar först, övriga följer i sekvens (stagger) så det ser ut som en sammanhängande rullgardin som rullas ner.
- Varje rad: translateY(-100%) → translateY(0) och opacity 0 → 1 samtidigt.
- Maskning: en `overflow-hidden`-wrapper runt hela bannern gör att texten "sveps fram" underifrån wrapperns toppkant, vilket förstärker rullgardinskänslan.
- Mjuk easing (ease-out), måttlig duration så det känns elegant, inte långsamt.

## Tekniska detaljer

### Keyframes (tailwind.config.ts)
Lägg till en ny keyframe `curtain-down`:
```
"curtain-down": {
  "0%":   { opacity: "0", transform: "translateY(-100%)" },
  "60%":  { opacity: "0.6" },
  "100%": { opacity: "1", transform: "translateY(0)" },
}
```
Och en animation:
```
"curtain-down": "curtain-down 0.9s cubic-bezier(0.22, 1, 0.36, 1) both"
```
(`both` så texten håller sluttillståndet och inte hoppar tillbaka.)

### `src/components/sections/Hero.tsx`
- Wrappa de fyra `<p>`-raderna i en `<div className="overflow-hidden">` så varje rad döljs ovanför sin slutposition tills den glider in (rullgardinseffekt).
- Lägg på `animate-curtain-down` på varje `<p>`, kombinerat med inline `style={{ animationDelay: "..."}}` för stagger:
  - Rad 1 (lead): delay 0.05 s
  - Rad 2 (bold1): delay 0.25 s
  - Rad 3 (body): delay 0.45 s
  - Rad 4 (bold2): delay 0.65 s
- Lägg till `will-change-transform` på raderna för mjukare rendering.

### Reduced motion
För användare med `prefers-reduced-motion: reduce` ska animationen hoppas över och texten visas direkt. Lös via Tailwind: använd `motion-safe:animate-curtain-down` på `<p>`-elementen (Tailwind tillämpar animationen endast när motion är tillåten; annars syns texten direkt utan delay).

## Filändringar
- `tailwind.config.ts` – ny keyframe + animation.
- `src/components/sections/Hero.tsx` – wrapper + animationsklasser + staggrade delays.

## Inga andra ändringar
H1, CTA, statbar, bakgrundsbild och övriga sektioner berörs inte.
