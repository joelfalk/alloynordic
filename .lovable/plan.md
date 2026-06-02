Fix the bento grid in the "Varför Alloy Nordic" section so no empty cells remain.

### Problem
The grid is `3 cols × 2 rows` (6 cells). Currently there are 4 cards: 1 large (2×2 = 4 cells) + 3 small (3 cells) = 7 cells total. The last small card ("Snabb Respons") overflows to an implicit third row, creating empty cells beside it — this looks like "empty cards".

### Solution
Add **2 new value proposition cards** and expand the grid to `3 cols × 3 rows` (9 cells) so all 6 cards (1 large + 5 small) fit perfectly.

### New cards
1. **"Helhetslösning" / "End-to-End Solution"** — "Vi hanterar allt från sourcing och kvalitetskontroll till logistik och leverans." / "We handle everything from sourcing and quality control to logistics and delivery."
2. **"Trygghet" / "Peace of Mind"** — "En svensk kontaktperson som tar hand om hela processen och minimerar dina risker." / "A Swedish contact person who manages the entire process and minimizes your risks."

Icons: `Globe` for logistics/helhetslösning and `Shield` for trygghet/safety.

### Files to change
- `src/components/sections/WhyChooseUs.tsx` — add 2 cards, new imports, change `md:grid-rows-2` → `md:grid-rows-3`
- `src/contexts/LanguageContext.tsx` — add 4 new translation keys (`why.logistics.title`, `why.logistics.desc`, `why.endtoend.title`, `why.endtoend.desc`) in both `sv` and `en` blocks