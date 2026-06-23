# Plan: Mjukare rullgardins-animation

## Mål
Få bannerns rader att rulla ner mjukare och mer elegant – långsammare rörelse, mjukare easing, och mer överlappning mellan raderna så det känns som ett sammanhängande "draperi" snarare än fyra separata pop-ins.

## Ändringar

### `tailwind.config.ts`
Justera `curtain-down`:
- Duration: `0.9s` → `1.6s`
- Easing: behåll `cubic-bezier(0.22, 1, 0.36, 1)` (mjuk ease-out, ingen overshoot)
- Keyframes: gör opacitetstoningen mjukare och mer linjär:
  ```
  '0%':   { opacity: '0',   transform: 'translateY(-110%)' }
  '40%':  { opacity: '0.35' }
  '75%':  { opacity: '0.85' }
  '100%': { opacity: '1',   transform: 'translateY(0)' }
  ```

### `src/components/sections/Hero.tsx`
Större överlappning mellan raderna (stagger ~0.18 s istället för 0.20 s, men med längre duration får varje rad gott om tid att tona klart):
- Rad 1 (lead): delay `0.10s`
- Rad 2 (bold1): delay `0.28s`
- Rad 3 (body): delay `0.46s`
- Rad 4 (bold2): delay `0.64s`

Ingen annan markup-ändring – `overflow-hidden`-wrappers och `motion-safe:animate-curtain-down` behålls.

## Inga andra ändringar
H1, CTA, statbar och övriga sektioner berörs inte. Reduced-motion-stödet via `motion-safe:` bevaras.
