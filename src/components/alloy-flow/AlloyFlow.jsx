// AlloyFlow.jsx - Alloy Nordic supplier-discovery animated flow.
// Story: a tangle of middlemen that reaches only a tiny fixed set of suppliers
// -> everything collapses into the Alloy Nordic hub (the handover) -> the global
// supplier network blooms outward. Two directions (A: world map, B: reach rings).
//
// Timeline engine is imported from the sibling module.

import React from 'react';
import { Stage, useTime, Easing } from './animation-engine.jsx';

// -- palette / type ---------------------------------------------------------
const W = 1920, H = 1080;
const BG     = '#F1F0EC';
const INK    = '#1A1A18';
const GRAY   = '#A6A49C';   // traditional / unreached supplier
const GRAYLT = '#C7C5BD';   // pale unreached dot
const LINE   = '#D6D4CC';   // tangle line
const LINE2  = '#C2BFB5';   // reached line (darker)
const ORANGE = '#F74C16';   // AI-suggested supplier
const RED    = '#D22F12';
const GREEN  = '#2FA15F';
const BLUE   = '#2E93C8';
const DOTS   = ['#2FA15F', '#2E93C8', '#7A5AF0', '#E0529C']; // process-dot palette (4 channels)
const MONO   = "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace";
const DISP   = "'Schibsted Grotesk', system-ui, -apple-system, sans-serif";
const LOGO_DEFAULT = './alloy-icon.png';

const TOTAL = 2412, COUNTRIES = 42, REACHED = 3;

// -- timeline phases (seconds), shared by both directions -------------------
const T = {
  duEnter: 0.4,
  buildS: 1.3, buildE: 5.0,   // tangle builds
  holdE: 6.4,                 // hold on the limited mess
  colS: 6.5, colE: 8.4,       // collapse into hub
  lineS: 8.0, lineE: 9.2,     // DU->Alloy line draws
  procS: 9.0,                 // process dots travel
  handHold: 10.3,             // handover headline holds
  bloomS: 10.6, bloomE: 15.6, // network blooms
  settle: 17.2,
  dur: 18.4,
};

// -- small math helpers -----------------------------------------------------
const lerp = (a, b, t) => a + (b - a) * t;
const mixPt = (a, b, t) => ({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) });
const hexRGB = (h) => { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; };
const lerpColor = (a, b, t) => { const A = hexRGB(a), B = hexRGB(b); return 'rgb(' + A.map((v, i) => Math.round(lerp(v, B[i], t))).join(',') + ')'; };
function ph(t, a, b, ease = Easing.easeInOutCubic) {
  if (t <= a) return 0;
  if (t >= b) return 1;
  return ease((t - a) / (b - a));
}
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const fmt = (n) => Math.round(n).toLocaleString('sv-SE').replace(/ /g, ' ');

// ---------------------------------------------------------------------------
//  LAYOUTS  (computed once at module load - deterministic)
// ---------------------------------------------------------------------------

// ---- Direction A: rigid lanes that morph into the world-map network ----
const DU_A  = { x: 236, y: 546 };
const HUB_A = { x: 612, y: 546 };
const MAK_X = 676, DIST_X = 1028, REACH_X = 1376;
const A_LANE_Y = [402, 546, 690];

// world-map regions (right side), map-like positions
const REGIONS_A = [
  { name: 'NORDEN',       x: 875,  y: 209, n: 5 },
  { name: 'NORDAMERIKA',  x: 1467, y: 336, n: 7 },
  { name: 'ASIEN',        x: 1697, y: 558, n: 14 },
  { name: 'EUROPA',       x: 1467, y: 780, n: 9 },
  { name: 'MELLANÖSTERN', x: 875,  y: 907, n: 5 },
];
// One supplier set: shown in the UTAN OSS view (reached LEVERANTÖRER + MISSADE
// LEVERANTÖRER), then morphed into the MED ALLOY NORDIC world-map network.
function buildNetworkA() {
  const rng = mulberry32(23);
  const sup = [];
  REGIONS_A.forEach((reg, ri) => {
    for (let i = 0; i < reg.n; i++) {
      const ang = rng() * Math.PI * 2, rad = 30 + rng() * 80;
      sup.push({
        bx: reg.x + Math.cos(ang) * rad,
        by: reg.y + Math.sin(ang) * rad * 0.78,
        ai: rng() < 0.34, big: rng() < 0.12, region: ri,
        bdelay: ri * 0.26 + i * 0.05 + rng() * 0.1,
      });
    }
  });
  // pick 5 reached (one per lane); the rest are "missed"
  const order = sup.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); const tmp = order[i]; order[i] = order[j]; order[j] = tmp; }
  const reached = order.slice(0, 3);
  sup.forEach((s, i) => {
    const li = reached.indexOf(i);
    if (li >= 0) { s.reached = true; s.lane = li; s.tx = REACH_X + (rng() - 0.5) * 14; s.ty = A_LANE_Y[li]; }
    else { s.reached = false; s.tx = 1500 + rng() * 360; s.ty = 326 + rng() * 548; }
  });
  const lanes = A_LANE_Y.map((ly, k) => ({ mak: { x: MAK_X, y: ly }, dist: { x: DIST_X, y: ly }, sup: sup.find(s => s.lane === k) }));
  return { sup, lanes };
}
const NET_A = buildNetworkA();

// ---- Direction B: radial tangle + reach rings ----
const C_B  = { x: 996, y: 556 };
const DU_B  = { x: 286, y: 556 };
const HUB_B = { x: 996, y: 556 };
function buildTangleB() {
  const rng = mulberry32(41);
  const cloud = Array.from({ length: 20 }, () => {
    const ang = rng() * Math.PI * 2;
    const rad = 78 + rng() * 200;
    return { x: C_B.x + Math.cos(ang) * rad, y: C_B.y + Math.sin(ang) * rad * 0.92, col: 0 };
  });
  const reached = Array.from({ length: 6 }, (_, k) => {
    const ang = (k / 6) * Math.PI * 2 + (rng() - 0.5) * 0.4;
    const rad = 300 + rng() * 70;
    return { x: C_B.x + Math.cos(ang) * rad, y: C_B.y + Math.sin(ang) * rad * 0.86,
             reached: true, kind: k === 0 ? 'red' : (k % 2 ? 'orange' : 'ink'), col: 1 };
  });
  const nodes = [...cloud, ...reached];
  const idx = (n) => nodes.indexOf(n);
  const links = [];
  const pick = (arr, n, exclude) => {
    const pool = arr.filter(a => a !== exclude);
    const out = [];
    while (out.length < n && pool.length) out.push(pool.splice(Math.floor(rng() * pool.length), 1)[0]);
    return out;
  };
  // DU into several cloud nodes
  pick(cloud, 5).forEach(n => links.push({ a: 'du', b: idx(n), w: 0 }));
  // chaotic cloud interconnects
  cloud.forEach(n => pick(cloud, 3, n).forEach(m => links.push({ a: idx(n), b: idx(m), w: 0 })));
  // cloud -> reached
  reached.forEach(f => pick(cloud, 2).forEach(m => links.push({ a: idx(m), b: idx(f), w: 1 })));
  return { nodes, links };
}
const TANGLE_B = buildTangleB();

const RINGS_B = [
  { r: 150, name: 'LOKALT' },
  { r: 268, name: 'NORDEN' },
  { r: 384, name: 'EUROPA' },
  { r: 492, name: 'GLOBALT' },
];
function buildBloomB() {
  const rng = mulberry32(67);
  const sup = [];
  const perRing = [6, 9, 13, 16];
  RINGS_B.forEach((ring, ri) => {
    const n = perRing[ri];
    const off = rng() * Math.PI * 2;
    for (let i = 0; i < n; i++) {
      const ang = off + (i / n) * Math.PI * 2 + (rng() - 0.5) * 0.18;
      const rad = ring.r + (rng() - 0.5) * 30;
      const x = C_B.x + Math.cos(ang) * rad;
      const y = C_B.y + Math.sin(ang) * rad * 0.82;
      if (x < 150 || x > W - 60 || y < 150 || y > H - 90) continue; // keep on-canvas
      sup.push({ x, y, ai: rng() < 0.32, big: rng() < 0.1, ring: ri,
                 ang, rad, delay: ri * 0.55 + (i / n) * 0.5 + rng() * 0.12 });
    }
  });
  return sup;
}
const BLOOM_B = buildBloomB();

// ---------------------------------------------------------------------------
//  per-direction config
// ---------------------------------------------------------------------------
const CONFIG = {
  A: {
    du: DU_A, hub: HUB_A, net: NET_A,
    colLabels: [{ x: 676, t: 'MÄKLARE' }, { x: 1028, t: 'DISTRIBUTÖRER' }, { x: 1376, t: 'LEVERANTÖRER' }, { x: 1695, t: 'MISSADE LEVERANTÖRER' }],
    eyebrow1: 'UTAN OSS', eyebrow2: 'MED ALLOY NORDIC',
    head1: ['Din räckvidd slutar', 'vid dina kontakter.'],
    head2: ['Räckvidd', 'utan gränser.'],
    cap1: 'Begränsad till dina kontakter.',
    cap2: 'Fler leverantörer. Hela världen. En kontakt.',
  },
  B: {
    du: DU_B, hub: HUB_B, tangle: TANGLE_B, bloom: BLOOM_B, center: C_B,
    eyebrow1: 'UTAN OSS', eyebrow2: 'MED ALLOY NORDIC',
    head1: ['Din räckvidd slutar', 'vid dina kontakter.'],
    head2: ['Räckvidd', 'utan gränser.'],
    cap1: 'Du når bara dem du redan känner.',
    cap2: 'Från lokalt till globalt — i ett enda steg.',
  },
};

// -- localized copy (switches with the site language toggle) ----------------
const STRINGS = {
  sv: {
    eyebrow1: 'UTAN OSS', eyebrow2: 'MED ALLOY NORDIC',
    head1: ['Din räckvidd slutar', 'vid dina kontakter.'],
    head2: ['Räckvidd', 'utan gränser.'],
    cap1A: 'Begränsad till dina kontakter.',
    cap2A: 'Fler leverantörer. Hela världen. En kontakt.',
    cap1B: 'Du når bara dem du redan känner.',
    cap2B: 'Från lokalt till globalt — i ett enda steg.',
    colLabels: ['MÄKLARE', 'DISTRIBUTÖRER', 'LEVERANTÖRER', 'MISSADE LEVERANTÖRER'],
    regions: ['NORDEN', 'NORDAMERIKA', 'ASIEN', 'EUROPA', 'MELLANÖSTERN'],
    rings: ['LOKALT', 'NORDEN', 'EUROPA', 'GLOBALT'],
    du: 'DU', us: 'ALLOY NORDIC', reach: 'RÄCKVIDD',
    suppliersIn: (n) => `leverantörer i ${n} länder`,
    legendTrad: 'Traditionell leverantör', legendAi: 'AI-föreslagen leverantör',
  },
  en: {
    eyebrow1: 'WITHOUT US', eyebrow2: 'WITH ALLOY NORDIC',
    head1: ['Your reach ends', 'at your contacts.'],
    head2: ['Reach', 'without limits.'],
    cap1A: 'Limited to your contacts.',
    cap2A: 'More suppliers. The whole world. One contact.',
    cap1B: 'You only reach those you already know.',
    cap2B: 'From local to global — in a single step.',
    colLabels: ['BROKERS', 'DISTRIBUTORS', 'SUPPLIERS', 'MISSED SUPPLIERS'],
    regions: ['THE NORDICS', 'NORTH AMERICA', 'ASIA', 'EUROPE', 'MIDDLE EAST'],
    rings: ['LOCAL', 'THE NORDICS', 'EUROPE', 'GLOBAL'],
    du: 'YOU', us: 'ALLOY NORDIC', reach: 'REACH',
    suppliersIn: (n) => `suppliers in ${n} countries`,
    legendTrad: 'Traditional supplier', legendAi: 'AI-suggested supplier',
  },
};

// -- primitives -------------------------------------------------------------
function Edge({ x1, y1, x2, y2, stroke = LINE, width = 1, opacity = 1 }) {
  return React.createElement('line', { x1, y1, x2, y2, stroke, strokeWidth: width, strokeLinecap: 'round', opacity });
}
function Node({ x, y, r, fill, opacity = 1, halo = 0, haloColor }) {
  const els = [];
  if (halo > 0) els.push(React.createElement('circle', { key: 'h', cx: x, cy: y, r: r + halo, fill: haloColor || fill, opacity: 0.16 * opacity }));
  els.push(React.createElement('circle', { key: 'c', cx: x, cy: y, r, fill, opacity }));
  return React.createElement('g', null, els);
}

// ---------------------------------------------------------------------------
//  SCENE
// ---------------------------------------------------------------------------
function Scene({ dir, accent, total, countries, logoSrc, lang }) {
  const t = useTime();
  const ORANGE = accent || '#F74C16';
  const TOTAL = +total || 2412;
  const COUNTRIES = +countries || 42;
  const LOGO = logoSrc || LOGO_DEFAULT;
  const cfg = CONFIG[dir];
  const { du, hub } = cfg;
  const L = STRINGS[lang] || STRINGS.sv;
  const cap1 = dir === 'A' ? L.cap1A : L.cap1B;
  const cap2 = dir === 'A' ? L.cap2A : L.cap2B;

  const fadeIn = ph(t, 0, 0.7, Easing.easeOutCubic);
  const fadeOut = 1 - ph(t, T.dur - 0.7, T.dur, Easing.easeInCubic);
  const globalOpacity = Math.min(fadeIn, fadeOut);

  const colP = ph(t, T.colS, T.colE);                 // collapse progress
  const networkS = dir === 'A' ? 8.7 : T.bloomS;      // when the network forms
  const lineP = ph(t, T.lineS, T.lineE, Easing.easeInOutQuart);
  const hubScale = ph(t, T.colS + 0.4, T.colE - 0.2, Easing.easeOutBack);
  const bloomActive = t > networkS - 0.4;

  // ---------- SVG geometry ----------
  const svgEls = [];

  // ---- geometry - A: lanes morph into the network / B: tangle collapses ----
  if (dir === 'A') {
    const net = cfg.net;
    const supBuild = (i) => ph(t, T.buildS + 0.3 + (i / net.sup.length) * 3.0, T.buildS + 0.8 + (i / net.sup.length) * 3.0, Easing.easeOutCubic);
    const morphOf = (s) => ph(t, networkS + s.bdelay, networkS + s.bdelay + 1.4, Easing.easeInOutCubic);

    // middlemen + lane connections collapse into the hub (old infrastructure removed)
    if (t < T.colE) {
      const fade = 1 - ph(t, T.colS + 0.2, T.colE - 0.1);
      const jit = (1 - colP) * 0.9;
      const cpos = (b, sd) => ({ x: lerp(b.x, hub.x, colP) + Math.sin(t * 1.7 + sd) * jit, y: lerp(b.y, hub.y, colP) + Math.cos(t * 2.0 + sd * 0.7) * jit });
      net.lanes.forEach((l, k) => {
        const bM = ph(t, T.buildS + k * 0.16, T.buildS + k * 0.16 + 0.5, Easing.easeOutCubic);
        const bD = ph(t, T.buildS + 0.3 + k * 0.16, T.buildS + 0.8 + k * 0.16, Easing.easeOutCubic);
        const Pm = cpos(l.mak, k * 2 + 1), Pd = cpos(l.dist, k * 2 + 2), Ps = { x: l.sup.tx, y: l.sup.ty };
        if (bM > 0.02) svgEls.push(React.createElement(Edge, { key: 'lA0' + k, x1: du.x, y1: du.y, x2: Pm.x, y2: Pm.y, stroke: '#A29F95', width: 1.5, opacity: bM * fade * 0.82 }));
        if (Math.min(bM, bD) > 0.02) svgEls.push(React.createElement(Edge, { key: 'lA1' + k, x1: Pm.x, y1: Pm.y, x2: Pd.x, y2: Pd.y, stroke: '#A29F95', width: 1.5, opacity: Math.min(bM, bD) * fade * 0.9 }));
        if (bD > 0.02) svgEls.push(React.createElement(Edge, { key: 'lA2' + k, x1: Pd.x, y1: Pd.y, x2: Ps.x, y2: Ps.y, stroke: '#A29F95', width: 1.5, opacity: bD * fade * 0.9 }));
        if (bM * fade > 0.02) svgEls.push(React.createElement(Node, { key: 'nMk' + k, x: Pm.x, y: Pm.y, r: 6, fill: INK, opacity: bM * fade }));
        if (bD * fade > 0.02) svgEls.push(React.createElement(Node, { key: 'nDt' + k, x: Pd.x, y: Pd.y, r: 6, fill: INK, opacity: bD * fade }));
      });
      // request pulses, pausing 1s at Maklare & Distributorer
      if (t > T.buildS + 0.7 && t < T.colS + 0.1) {
        const flowOp = ph(t, T.buildS + 0.7, T.buildS + 1.5) * (1 - ph(t, T.colS - 0.5, T.colS + 0.1));
        const seg = 1.7, pause = 1.0, endGap = 1.0, period = seg * 3 + pause * 2 + endGap, ez = Easing.easeInOutQuad;
        net.lanes.forEach((l, k) => {
          const pts = [du, l.mak, l.dist, { x: l.sup.tx, y: l.sup.ty }];
          const lt = (((t + k * 1.3) % period) + period) % period;
          let p, lc;
          if (lt < seg) { lc = lt / seg; p = mixPt(pts[0], pts[1], ez(lc)); }
          else if (lt < seg + pause) { p = pts[1]; }
          else if (lt < 2 * seg + pause) { lc = (lt - seg - pause) / seg; p = mixPt(pts[1], pts[2], ez(lc)); }
          else if (lt < 2 * seg + 2 * pause) { p = pts[2]; }
          else if (lt < 3 * seg + 2 * pause) { lc = (lt - 2 * seg - 2 * pause) / seg; p = mixPt(pts[2], pts[3], ez(lc)); }
          else { p = pts[3]; }
          const fi = Math.min(1, lt / 0.3), fo = 1 - ph(lt, period - endGap, period - 0.05);
          svgEls.push(React.createElement('circle', { key: 'flA' + k, cx: p.x, cy: p.y, r: 5.5, fill: DOTS[k % DOTS.length], opacity: flowOp * Math.min(fi, fo) }));
        });
      }
      svgEls.push(React.createElement(Node, { key: 'duA', x: du.x, y: du.y, r: 17, fill: INK, opacity: ph(t, T.duEnter, T.duEnter + 0.5, Easing.easeOutBack) }));
    }

    // suppliers: appear in the UTAN OSS view, then morph into the world-map network
    net.sup.forEach((s, i) => {
      const op = supBuild(i);
      if (op <= 0.02) return;
      const mp = morphOf(s);
      const x = lerp(s.tx, s.bx, mp), y = lerp(s.ty, s.by, mp);
      if (mp > 0.04) {
        const gp = ph(t, networkS + s.bdelay + 0.3, networkS + s.bdelay + 1.2, Easing.easeOutCubic);
        svgEls.push(React.createElement(Edge, { key: 'nlA' + i, x1: hub.x, y1: hub.y, x2: lerp(hub.x, x, gp), y2: lerp(hub.y, y, gp), stroke: '#9E9C92', width: 1, opacity: 0.34 * gp }));
        if (gp > 0.6) {
          const per = 3.4, u = ((t + i * 0.5) % per) / per;
          svgEls.push(React.createElement('circle', { key: 'fnA' + i, cx: lerp(hub.x, x, u), cy: lerp(hub.y, y, u), r: 5, fill: DOTS[i % DOTS.length], opacity: 0.9 * Math.sin(u * Math.PI) }));
        }
      }
      if (s.reached && mp < 0.02) {
        const per = 2.3, pp2 = ((t + i * 0.45) % per) / per, ringOp = (1 - pp2) * 0.5 * op;
        if (ringOp > 0.015) svgEls.push(React.createElement('circle', { key: 'rpA' + i, cx: x, cy: y, r: 9 + pp2 * 24, fill: 'none', stroke: '#9A988F', strokeWidth: 1.5, opacity: ringOp }));
      }
      const breathe = s.ai ? (1 + 0.26 * Math.sin(t * 2.0 + i * 0.9) * mp) : 1;
      const fill = lerpColor(s.reached ? '#1A1A18' : '#A6A49C', s.ai ? ORANGE : '#A6A49C', mp);
      const rr = lerp(s.reached ? 8 : 6.5, s.big ? 9 : 6.5, mp);
      let halo = 0, hc;
      if (s.reached && mp < 0.6) { halo = 7 * (1 - mp) * (1 + 0.22 * Math.sin(t * 2.2 + i)); hc = '#BFBDB4'; }
      if (s.ai && mp > 0.001) { const ah = (s.big ? 11 : 8) * breathe * mp; if (ah > halo) { halo = ah; hc = ORANGE; } }
      svgEls.push(React.createElement(Node, { key: 'snA' + i, x, y, r: rr, fill, opacity: op, halo, haloColor: hc }));
    });
  } else if (t < T.colE) {
    const nodes = cfg.tangle.nodes;
    const buildP = (i) => {
      // staggered appearance during build window
      const n = nodes.length;
      const s = T.buildS + (i / n) * (T.buildE - T.buildS) * 0.85;
      return ph(t, s, s + 0.5, Easing.easeOutCubic);
    };
    const jitAmt = (1 - colP) * (dir === 'A' ? 0.9 : 1.8);
    const jpos = (base, i) => ({
      x: lerp(base.x, hub.x, colP) + Math.sin(t * 1.7 + i * 1.3) * jitAmt,
      y: lerp(base.y, hub.y, colP) + Math.cos(t * 2.0 + i * 0.7) * jitAmt,
    });
    const nodeOpacity = (i) => buildP(i) * (1 - ph(t, T.colS + 0.6, T.colE - 0.15));

    // links
    cfg.tangle.links.forEach((lk, i) => {
      const A = lk.a === 'du' ? du : nodes[lk.a];
      const B = nodes[lk.b];
      const pa = lk.a === 'du' ? 1 : buildP(lk.a);
      const pb = buildP(lk.b);
      const appear = Math.min(pa, pb);
      if (appear <= 0.02) return;
      const PA = lk.a === 'du' ? { x: du.x, y: du.y } : jpos(A, lk.a), PB = jpos(B, lk.b);
      const isA = dir === 'A';
      const op = appear * (1 - ph(t, T.colS, T.colE - 0.3)) * (lk.w ? 0.9 : (isA ? 0.82 : 0.55));
      svgEls.push(React.createElement(Edge, {
        key: 'lk' + i, x1: PA.x, y1: PA.y, x2: PB.x, y2: PB.y,
        stroke: isA ? '#A29F95' : (lk.w ? LINE2 : LINE), width: isA ? 1.5 : (lk.w ? 1.4 : 1), opacity: op,
      }));
    });
    // nodes
    nodes.forEach((nd, i) => {
      const P = jpos(nd, i);
      const op = nodeOpacity(i);
      if (op <= 0.02) return;
      let fill = INK, r = 6, halo = 0, hc;
      if (nd.reached) {
        fill = INK; r = 8; hc = '#BFBDB4';
        halo = 7 * (1 + 0.22 * Math.sin(t * 2.2 + i));        // breathing halo
        // repeating monochrome signal pulse on connected suppliers
        const period = 2.3;
        const pp = ((t + i * 0.45) % period) / period;
        const ringOp = (1 - pp) * 0.5 * op * (1 - colP);
        if (ringOp > 0.015) svgEls.push(React.createElement('circle', { key: 'pulse' + i, cx: P.x, cy: P.y, r: 9 + pp * 24, fill: 'none', stroke: '#9A988F', strokeWidth: 1.5, opacity: ringOp }));
      }
      else if (nd.col === 'sup') { fill = GRAY; r = 6.5; }               // unreached / missed - match bloom dots
      else { fill = INK; r = 6; }                                        // maklare / distributor / cloud
      svgEls.push(React.createElement(Node, { key: 'nd' + i, x: P.x, y: P.y, r, fill, opacity: op, halo, haloColor: hc }));
    });
    // traveling request pulses from DU that PAUSE 1s at each middleman (Maklare, Distributorer)
    if (dir === 'A' && cfg.tangle.lanes && t > T.buildS + 0.7 && t < T.colS + 0.1) {
      const flowOp = ph(t, T.buildS + 0.7, T.buildS + 1.5) * (1 - ph(t, T.colS - 0.5, T.colS + 0.1));
      const seg = 1.7, pause = 1.0, endGap = 1.0;
      const period = seg * 3 + pause * 2 + endGap;   // 3 hops + two 1-second stops
      const ez = Easing.easeInOutQuad;
      cfg.tangle.lanes.forEach((l, k) => {
        const pts = [du, l.mak, l.dist, l.sup];
        const lt = (((t + k * 1.3) % period) + period) % period;
        let p, lc;
        if (lt < seg)                      { lc = lt / seg;                          p = mixPt(pts[0], pts[1], ez(lc)); }
        else if (lt < seg + pause)         {                                          p = pts[1]; }   // stop at Maklare
        else if (lt < 2 * seg + pause)     { lc = (lt - seg - pause) / seg;           p = mixPt(pts[1], pts[2], ez(lc)); }
        else if (lt < 2 * seg + 2 * pause) {                                          p = pts[2]; }   // stop at Distributorer
        else if (lt < 3 * seg + 2 * pause) { lc = (lt - 2 * seg - 2 * pause) / seg;   p = mixPt(pts[2], pts[3], ez(lc)); }
        else                               {                                          p = pts[3]; }   // arrived
        const fadeIn = Math.min(1, lt / 0.3);
        const fadeOut = 1 - ph(lt, period - endGap, period - 0.05);
        svgEls.push(React.createElement('circle', { key: 'flow' + k, cx: p.x, cy: p.y, r: 5.5, fill: DOTS[k % DOTS.length], opacity: flowOp * Math.min(fadeIn, fadeOut) }));
      });
    }
    // DU node
    svgEls.push(React.createElement(Node, { key: 'du', x: du.x, y: du.y, r: 17, fill: INK, opacity: ph(t, T.duEnter, T.duEnter + 0.5, Easing.easeOutBack) }));
  }

  // DU -> Alloy handover line + travelling process dots
  if (t > T.lineS - 0.1) {
    const ex = lerp(du.x, hub.x, lineP), ey = lerp(du.y, hub.y, lineP);
    svgEls.push(React.createElement(Edge, { key: 'hline', x1: du.x, y1: du.y, x2: ex, y2: ey, stroke: INK, width: 3, opacity: 1 }));
    // DU node persists
    svgEls.push(React.createElement(Node, { key: 'du2', x: du.x, y: du.y, r: 17, fill: INK, opacity: 1 }));
    // process dots travel during procS..bloomS
    if (t > T.procS && t < T.bloomS + 0.6) {
      const cyc = ((t - T.procS) / 1.7);
      DOTS.forEach((c, i) => {
        const f = (cyc + i * 0.25) % 1;
        svgEls.push(React.createElement('circle', { key: 'pd' + i, cx: lerp(du.x, hub.x, f), cy: du.y, r: 7, fill: c, opacity: Math.sin(f * Math.PI) }));
      });
    }
  }

  // hub ping when the network blooms
  const hubPing = ph(t, networkS - 0.2, networkS + 0.9, Easing.easeOutCubic);
  if (hubPing > 0.001 && hubPing < 0.999) {
    svgEls.push(React.createElement('circle', { key: 'hubping', cx: hub.x, cy: hub.y, r: 30 + hubPing * 92, fill: 'none', stroke: ORANGE, strokeWidth: 2, opacity: (1 - hubPing) * 0.5 }));
  }

  // ---------- BLOOM ----------
  const bloomEls = [];
  if (bloomActive && dir === 'B') {
    if (dir === 'B') {
      // reach rings
      RINGS_B.forEach((ring, ri) => {
        const rp = ph(t, T.bloomS + ri * 0.5, T.bloomS + ri * 0.5 + 0.9, Easing.easeOutCubic);
        if (rp <= 0.01) return;
        bloomEls.push(React.createElement('ellipse', {
          key: 'ring' + ri, cx: cfg.center.x, cy: cfg.center.y,
          rx: ring.r * rp, ry: ring.r * 0.82 * rp,
          fill: 'none', stroke: ri === 3 ? ORANGE : INK,
          strokeWidth: ri === 3 ? 1.3 : 1, strokeDasharray: ri === 3 ? '2 7' : '2 9',
          opacity: 0.22 * rp,
        }));
      });
    }
    cfg.bloom.forEach((s, i) => {
      const aS = T.bloomS + s.delay;
      const pp = ph(t, aS, aS + 0.55, Easing.easeOutBack);
      if (pp <= 0.01) return;
      // line from hub grows out
      const gp = ph(t, aS - 0.12, aS + 0.4, Easing.easeOutCubic);
      const ex = lerp(hub.x, s.x, gp), ey = lerp(hub.y, s.y, gp);
      bloomEls.push(React.createElement(Edge, { key: 'bl' + i, x1: hub.x, y1: hub.y, x2: ex, y2: ey, stroke: '#9E9C92', width: 1, opacity: 0.36 * gp }));
      // traveling pulse flowing along the connected line (ALLOY NORDIC -> supplier) - same color as the line
      if (gp > 0.6) {
        const period = 3.4;
        const u = ((t + i * 0.5) % period) / period;
        const px = lerp(hub.x, s.x, u), py = lerp(hub.y, s.y, u);
        const fade = Math.sin(u * Math.PI);
        bloomEls.push(React.createElement('circle', { key: 'fl' + i, cx: px, cy: py, r: 5, fill: DOTS[i % DOTS.length], opacity: 0.9 * fade * Math.min(1, pp) }));
      }
      // ping
      const pingP = ph(t, aS, aS + 0.7, Easing.easeOutCubic);
      if (pingP > 0 && pingP < 1) {
        bloomEls.push(React.createElement('circle', { key: 'pg' + i, cx: s.x, cy: s.y, r: 6 + pingP * 26, fill: 'none', stroke: '#9E9C92', strokeWidth: 1.2, opacity: (1 - pingP) * 0.6 }));
      }
      const r = (s.big ? 9 : 6.5) * pp;
      const breathe = s.ai ? (1 + 0.28 * Math.sin(t * 2.0 + i * 0.9) * ph(t, aS + 0.4, aS + 1.2)) : 1;
      bloomEls.push(React.createElement(Node, {
        key: 'bn' + i, x: s.x, y: s.y, r,
        fill: s.ai ? ORANGE : GRAY, opacity: Math.min(1, pp),
        halo: s.ai ? (s.big ? 11 : 8) * breathe : 0, haloColor: ORANGE,
      }));
    });
  }

  const svg = React.createElement('svg', {
    key: 'scene-svg',
    width: W, height: H, viewBox: `0 0 ${W} ${H}`,
    style: { position: 'absolute', inset: 0, overflow: 'visible' },
  }, [...svgEls, ...bloomEls]);

  // ---------- HUB logo ----------
  const hubBreath = 1 + 0.02 * Math.sin(t * 1.6) * ph(t, T.colE, T.colE + 0.5);
  const hubEl = hubScale > 0.01 ? React.createElement('img', {
    key: 'scene-hub',
    src: LOGO, alt: 'Alloy Nordic',
    style: {
      position: 'absolute', left: hub.x, top: hub.y, width: 132, height: 132,
      transform: `translate(-50%,-50%) scale(${hubScale * hubBreath})`, transformOrigin: 'center',
      objectFit: 'contain', filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.12))',
    },
  }) : null;

  // ---------- overlays (text) ----------
  const overlays = [];
  const lbl = (key, x, y, text, style) => overlays.push(
    React.createElement('div', { key, style: { position: 'absolute', left: x, top: y, ...style } }, text)
  );

  // DU label
  lbl('dulab', du.x, du.y + 26, L.du, { fontFamily: MONO, fontSize: 15, letterSpacing: '0.14em', color: INK, transform: 'translateX(-50%)', opacity: ph(t, T.duEnter + 0.2, T.duEnter + 0.7) });
  // ALLOY NORDIC label
  if (hubScale > 0.3) lbl('alab', hub.x, hub.y + 76, L.us, { fontFamily: MONO, fontSize: 15, letterSpacing: '0.14em', color: INK, opacity: ph(t, T.colE - 0.4, T.colE + 0.3), transform: 'translateX(-50%)' });

  // tangle column labels (A only)
  if (dir === 'A' && cfg.colLabels && t < T.colS + 0.3) {
    const o = ph(t, T.buildS, T.buildS + 0.6) * (1 - ph(t, T.colS - 0.3, T.colS + 0.3));
    cfg.colLabels.forEach((c, i) => lbl('cl' + i, c.x, 300, L.colLabels[i], { fontFamily: MONO, fontSize: 14, letterSpacing: '0.1em', color: '#9A988F', transform: 'translateX(-50%)', opacity: o, whiteSpace: 'nowrap' }));
  }

  // bloom region / ring labels
  if (bloomActive) {
    if (dir === 'A') {
      REGIONS_A.forEach((reg, ri) => {
        const o = ph(t, networkS + ri * 0.26, networkS + ri * 0.26 + 0.6);
        lbl('rg' + ri, reg.x, reg.y - 120, L.regions[ri], { fontFamily: MONO, fontSize: 13, letterSpacing: '0.12em', color: '#9A988F', transform: 'translateX(-50%)', opacity: o * 0.9, whiteSpace: 'nowrap' });
      });
    } else {
      RINGS_B.forEach((ring, ri) => {
        const o = ph(t, T.bloomS + ri * 0.5, T.bloomS + ri * 0.5 + 0.7);
        lbl('rgb' + ri, cfg.center.x, cfg.center.y - ring.r * 0.82 - 22, L.rings[ri], { fontFamily: MONO, fontSize: 13, letterSpacing: '0.14em', color: ri === 3 ? ORANGE : '#9A988F', transform: 'translateX(-50%)', opacity: o * 0.95 });
      });
    }
  }

  // ---------- headline / eyebrow (top-left) ----------
  const swap = ph(t, T.colS, T.colS + 0.55);   // 0 = act1 copy, 1 = act2 copy
  const eyebrowO1 = 1 - swap, eyebrowO2 = swap;
  const TX = 140;
  // eyebrow
  overlays.push(React.createElement('div', { key: 'eb', style: { position: 'absolute', left: TX, top: 120, height: 22 } }, [
    React.createElement('div', { key: 1, style: { position: 'absolute', whiteSpace: 'nowrap', fontFamily: MONO, fontSize: 16, letterSpacing: '0.22em', color: '#8C8A82', opacity: eyebrowO1, transform: `translateY(${(1 - eyebrowO1) * -8}px)` } }, L.eyebrow1),
    React.createElement('div', { key: 2, style: { position: 'absolute', whiteSpace: 'nowrap', fontFamily: MONO, fontSize: 16, letterSpacing: '0.22em', color: ORANGE, opacity: eyebrowO2, transform: `translateY(${(1 - eyebrowO2) * 8}px)` } }, L.eyebrow2),
  ]));
  // headline (two stacked variants cross-fading)
  const headStyle = { position: 'absolute', left: 0, top: 0, fontFamily: DISP, fontSize: 62, fontWeight: 600, lineHeight: 1.04, letterSpacing: '-0.02em', color: INK, whiteSpace: 'nowrap' };
  overlays.push(React.createElement('div', { key: 'hd', style: { position: 'absolute', left: TX, top: 156, width: 900, height: 170 } }, [
    React.createElement('div', { key: 1, style: { ...headStyle, opacity: 1 - swap, transform: `translateY(${swap * -14}px)` } }, L.head1.map((l, i) => React.createElement('div', { key: i }, l))),
    React.createElement('div', { key: 2, style: { ...headStyle, opacity: swap, transform: `translateY(${(1 - swap) * 18}px)` } }, L.head2.map((l, i) => React.createElement('div', { key: i }, l))),
  ]));

  // ---------- bottom-left: caption + counter ----------
  const cap1O = ph(t, T.buildS + 1.0, T.buildS + 1.6) * (1 - ph(t, networkS - 1.8, networkS - 0.2));
  const cap2O = ph(t, networkS + 0.5, networkS + 1.2);
  const BY = 902;
  // act 1 reach readout
  overlays.push(React.createElement('div', { key: 'cap1', style: { position: 'absolute', left: TX, top: BY, opacity: cap1O } }, [
    React.createElement('div', { key: 'l', style: { fontFamily: MONO, fontSize: 15, letterSpacing: '0.14em', color: '#8C8A82' } }, L.reach),
    React.createElement('div', { key: 'v', style: { fontFamily: DISP, fontSize: 60, fontWeight: 600, color: INK, letterSpacing: '-0.02em', lineHeight: 1.1, marginTop: 4 } }, [
      React.createElement('span', { key: 1 }, String(REACHED)),
      React.createElement('span', { key: 2, style: { color: GRAY } }, ' / ' + fmt(TOTAL)),
    ]),
    React.createElement('div', { key: 'c', style: { fontFamily: DISP, fontSize: 22, color: '#6E6C64', marginTop: 6, letterSpacing: '-0.01em' } }, cap1),
  ]));
  // act 3 counter racing
  const bloomCount = lerp(REACHED, TOTAL, ph(t, networkS, T.bloomE - 0.4, Easing.easeOutCubic));
  const bloomCountries = Math.round(lerp(1, COUNTRIES, ph(t, networkS + 0.3, T.bloomE - 0.6, Easing.easeOutCubic)));
  overlays.push(React.createElement('div', { key: 'cap2', style: { position: 'absolute', left: TX, top: BY - 6, opacity: cap2O } }, [
    React.createElement('div', { key: 'n', style: { fontFamily: MONO, fontSize: 15, letterSpacing: '0.14em', color: ORANGE } }, L.reach),
    React.createElement('div', { key: 'v', style: { fontFamily: DISP, fontSize: 76, fontWeight: 700, color: INK, letterSpacing: '-0.03em', lineHeight: 1.0, marginTop: 4, fontVariantNumeric: 'tabular-nums' } }, fmt(bloomCount) + '+'),
    React.createElement('div', { key: 'u', style: { fontFamily: DISP, fontSize: 22, color: '#6E6C64', marginTop: 8, letterSpacing: '-0.01em' } }, L.suppliersIn(bloomCountries)),
    React.createElement('div', { key: 'c', style: { fontFamily: DISP, fontSize: 22, color: INK, marginTop: 14, letterSpacing: '-0.01em', fontWeight: 500 } }, cap2),
  ]));

  // ---------- legend (bloom) ----------
  const legO = ph(t, networkS + 1.4, networkS + 2.0);
  overlays.push(React.createElement('div', { key: 'leg', style: { position: 'absolute', right: 80, bottom: 56, display: 'flex', gap: 30, opacity: legO, fontFamily: MONO, fontSize: 14, letterSpacing: '0.04em', color: '#6E6C64', alignItems: 'center' } }, [
    React.createElement('div', { key: 1, style: { display: 'flex', gap: 10, alignItems: 'center' } }, [React.createElement('span', { key: 'd', style: { width: 12, height: 12, borderRadius: 7, background: GRAY, display: 'inline-block' } }), L.legendTrad]),
    React.createElement('div', { key: 2, style: { display: 'flex', gap: 10, alignItems: 'center' } }, [React.createElement('span', { key: 'd', style: { width: 12, height: 12, borderRadius: 7, background: ORANGE, display: 'inline-block' } }), L.legendAi]),
  ]));

  return React.createElement('div', { style: { position: 'absolute', inset: 0, opacity: globalOpacity } }, [svg, hubEl, ...overlays]);
}

// -- exported entrypoint ----------------------------------------------------
// Varldskarta-locked hero. Pass chrome to show the scrubber, accent/total/countries
// to tweak the data/brand, logoSrc to point at your imported asset.
function AlloyFlow({ direction = 'A', accent, total, countries, logoSrc, chrome = false, lang = 'sv' }) {
  const dir = direction === 'B' ? 'B' : 'A';
  return React.createElement(Stage, {
    width: W, height: H, duration: T.dur, background: BG,
    loop: true, autoplay: true, persist: false, chrome,
  }, React.createElement(Scene, { dir, accent, total, countries, logoSrc, lang }));
}

export default AlloyFlow;
export { AlloyFlow };
