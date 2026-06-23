## Problem
Mask-gradienten (`linear-gradient(transparent → black 60%)`) ligger kvar på textblocket även **efter** att animationen är klar → Rad 1 (översta raden) hamnar fortfarande i gradientens transparenta zon och syns dimmig.

## Lösning
Ta bort mask-gradienten helt. Den kontinuerliga "rullgardins"-känslan kommer ändå från att hela textblocket glider ner (`translateY -100% → 0`) samtidigt som det fadear in (`opacity 0 → 1`). När animationen slutar är hela blocket helt synligt.

### Ändring i `src/components/sections/Hero.tsx`
Ta bort `[mask-image:...]` och `[-webkit-mask-image:...]`-klasserna från det inre wrapper-divet:

```
<div className="will-change-transform motion-safe:animate-curtain-down">
  <p>...lead...</p>
  ...
</div>
```

Inga ändringar i `tailwind.config.ts` (keyframen `0% → translateY(-100%) opacity 0`, `100% → translateY(0) opacity 1` ger redan den mjuka inrullningen + fade).

## Berör inte
H1, CTA-knappar, statbar, översättningar, övriga sektioner.
