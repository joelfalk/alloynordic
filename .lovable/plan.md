# Animerat flöde under hero-brödtexten

Bygger en horisontell, sekventiellt inglidande processgrafik som visualiserar rad 3 i hero. Texten i rad 3 behålls oförändrad — flödet placeras strax under, ovanför CTA-knapparna.

## Innehåll (5 steg, härlett ur rad 3)

```text
[01 Förfrågan] → [02 Leverantörsval] → [03 Offertinsamling] → [04 Analys] → [05 Utvärdering]
```

EN-motsvarighet: Request → Supplier selection → Quote collection → Analysis → Benchmarking.

Varje steg = liten "nod":
- Mono-siffra `01–05` i accent-orange
- Ikon (lucide: `FileSearch`, `Users`, `Inbox`, `LineChart`, `Award`)
- Kort etikett (1–2 ord, översatt via `LanguageContext`)

Mellan noderna: tunna horisontella linjer i `white/20` med en kort orange "fyllnings-streck" som ritas in när noden aktiveras.

## Animation

- Vid mount (efter hero-rullgardinen, ~delay 900 ms): varje nod glider in från vänster med fade, en efter en, intervall ~120 ms.
- Tekniskt: ny Tailwind-keyframe `slide-in-left` (`translateX(-24px) opacity:0 → translateX(0) opacity:1`, 600 ms, `cubic-bezier(0.22,1,0.36,1)`).
- Connector-strecken animeras med `scaleX 0 → 1` (`origin-left`, 400 ms) och triggas via samma `animationDelay`-stege som noden till höger om strecket.
- `motion-safe:` prefix på alla animationer (respekterar `prefers-reduced-motion`).
- Engångskörning på mount — ingen loop, inget scroll-trigger-beroende (hero är ovanför fold).

## Layout & responsivt

- Desktop/tablet (≥ md): horisontell rad, `flex items-center justify-between gap-4`, connector mellan varje par.
- Mobil (< md): vertikal stack, connectors blir korta vertikala streck (`h-6 w-px`).
- Max-bredd matchar brödtexten (`max-w-3xl`), `mt-8` mellan brödtext och flöde, behåll `mt-10` till CTA-knapparna.

## Filer som ändras

### `src/components/sections/Hero.tsx`
- Importera ny komponent `ProcessFlow`.
- Rendera `<ProcessFlow />` direkt efter `<p>` med `hero.banner.bold2`, fortfarande inuti samma `max-w-4xl`-block.

### `src/components/ProcessFlow.tsx` (ny)
- 5 steg som `const STEPS = [...]` med `key`, `icon`, `labelKey`.
- Renderar noder + connectors med `animationDelay` per index.
- Använder `useLanguage()` för etiketter.

### `src/contexts/LanguageContext.tsx`
- Lägg till nycklar (sv + en):
  - `hero.flow.step1` "Förfrågan" / "Request"
  - `hero.flow.step2` "Leverantörsval" / "Supplier selection"
  - `hero.flow.step3` "Offertinsamling" / "Quote collection"
  - `hero.flow.step4` "Analys" / "Analysis"
  - `hero.flow.step5` "Utvärdering" / "Benchmarking"

### `tailwind.config.ts`
- Ny keyframe `slide-in-left` + animation `slide-in-left: slide-in-left 0.6s cubic-bezier(0.22,1,0.36,1) both`.
- Ny keyframe `connector-grow` (`scaleX 0 → 1`) + animation `connector-grow 0.4s ease-out both`.

## Det här ändras INTE

- Befintlig hero-text (rad 1–4), curtain-animation, CTA-knappar, statbar, övriga sektioner.
- Inga nya dependencies (använder befintliga `lucide-react` + Tailwind).
