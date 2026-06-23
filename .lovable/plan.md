## Mål
Gör stegrutorna i det animerade flödet bredare så all text får plats utan att svämma över och utan onödigt många rader per ruta.

## Ändringar

### `src/components/sections/Hero.tsx`
- Bredda flödes-wrappern: `max-w-6xl mx-auto mt-12` → `max-w-7xl mx-auto mt-12` så grid:en får mer plats på desktop.

### `src/components/ProcessFlow.tsx`
- **Desktop (≥xl, ny breakpoint):** behåll 7 lika stora kort i en rad — `hidden xl:grid grid-cols-7 gap-3 items-stretch`. Här finns gott om bredd i `max-w-7xl`.
- **Large desktop (lg → xl):** byt till 2 rader om 4+3 så varje ruta blir bredare:
  - `hidden lg:grid xl:hidden grid-cols-4 gap-4 items-stretch`
  - Konnektorer hoppas över i denna layout (flödesriktningen är fortfarande tydlig genom numreringen 01–07).
- **Tablet (md → lg):** `grid-cols-2 sm:grid-cols-3 gap-4 items-stretch` (oförändrat).
- **Mobil:** oförändrat.
- **StepCard:**
  - Öka `min-h-[14rem]` → `min-h-[16rem]` så alla kort har samma höjd även när text är längre.
  - Öka padding: `p-5` → `p-6`.
  - Säkerställ att text wrappar inuti rutan: lägg till `break-words` på rubriken (`<h3>`) och `break-words` på beskrivningen (`<p>`).
  - Skydda ikonraden från overflow: behåll `flex items-center justify-between` (nummer + ikon-cirkel), inga ändringar där.
- **Connectorn på xl-layouten:** justera `-left-3` så den landar i `gap-3`-mellanrummet (oförändrad, fungerar med gap-3).

## Vad som INTE ändras
- Copy/översättningar, ikoner, färger, animationstiming, hero-text-centrering, CTA, stat-bar, övriga sektioner.

## Resultat
- På breda skärmar (≥1280px): 7 rutor i rad, men inom en bredare container så varje ruta är märkbart bredare.
- På medelstora skärmar (1024–1280px): 2 rader (4+3) med klart bredare rutor.
- Texterna får plats utan att svämma över och utan onödigt många rader.
