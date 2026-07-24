/**
 * Gemeinsame Helfer für die QA-Werkzeuge.
 *
 * Warum es diese Datei gibt: Jede Messung an dieser Seite braucht dieselben
 * drei Vorkehrungen, und jede einzelne davon hat schon zu Fehlbefunden geführt.
 * Sie stehen hier EINMAL, statt in jedem Wegwerf-Skript neu (und mal richtig,
 * mal falsch) zu entstehen.
 */
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
export const { chromium } = require('/usr/lib/node_modules/playwright');

export const SEITEN = [
  'index.html', 'skills.html', 'prompts.html',
  'vorlagen.html', 'showroom.html', 'lernen-hilfe.html'
];

export const basis = (arg) => (arg || 'http://localhost:8401/').replace(/\/?$/, '/');

export const browser = () => chromium.launch({ args: ['--no-sandbox'] });

/**
 * FALLE 1 — Einblend-Animationen.
 * Die Seite blendet Inhalte per IntersectionObserver ein: `.anim-reveal` bekommt
 * `.in-view`, auf skills.html heißt das Paar `.cat-reveal`/`.in`. Wer das nicht
 * erzwingt, misst Elemente mit `opacity: 0` und bekommt Unsinn — genau daran ist
 * schon eine komplette Kontrastprüfung gescheitert (alles meldete Alpha 0).
 * Batch-Scrollen hilft NICHT zuverlässig, der Observer feuert nicht sicher.
 */
export const AUFDECKEN = () => {
  document.querySelectorAll('.anim-reveal').forEach(e => e.classList.add('in-view'));
  document.querySelectorAll('.cat-reveal').forEach(e => e.classList.add('in'));
  document.querySelectorAll('.reveal').forEach(e => e.classList.add('in-view'));
};

/** Seite öffnen, Animationen aufdecken, Fehler mitschreiben. */
export async function oeffne(ctx, url, { aufdecken = true } = {}) {
  const p = await ctx.newPage();
  const fehler = [];
  p.on('pageerror', e => fehler.push('pageerror: ' + e.message));
  p.on('console', m => { if (m.type() === 'error') fehler.push('console: ' + m.text()); });
  await p.goto(url, { waitUntil: 'networkidle' });
  if (aufdecken) await p.evaluate(AUFDECKEN);
  return { p, fehler };
}

/**
 * FALLE 2 — Kontrast ohne Deckkraft gerechnet.
 * Eine Prüfung, die nur `color` gegen `background-color` rechnet, übersieht die
 * halbe Fehlerklasse: Auf dieser Seite wurden Zähler per `opacity` bis auf
 * 2,07:1 gedrückt, und keine naive Prüfung hat das je gesehen. Deshalb wird hier
 * die KUMULIERTE Deckkraft aller Vorfahren mit dem Alpha der Textfarbe
 * multipliziert und die Farbe echt auf den Grund gemischt.
 *
 * Lehre fürs Projekt: Deckkraft taugt nicht zur Text-Abschwächung, weil sie
 * nicht prüfbar ist. Immer eine echte Farbe setzen.
 */
export const KONTRAST_IM_BROWSER = () => {
  const lum = (r, g, b) => {
    const f = c => { c /= 255; return c <= .03928 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4); };
    return .2126 * f(r) + .7152 * f(g) + .0722 * f(b);
  };
  const zahlen = s => (s.match(/[\d.]+/g) || []).map(Number);
  const grundFarbe = el => {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = zahlen(getComputedStyle(n).backgroundColor);
      if (c.length >= 3 && (c[3] === undefined || c[3] > .5)) return c.slice(0, 3);
      n = n.parentElement;
    }
    return [252, 252, 252];
  };
  const treffer = [];
  document.querySelectorAll('*').forEach(el => {
    const txt = [...el.childNodes]
      .filter(n => n.nodeType === 3 && n.textContent.trim())
      .map(n => n.textContent.trim()).join(' ');
    if (!txt || txt.length < 2) return;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') return;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;

    let deckkraft = 1, n = el;
    while (n && n !== document.documentElement) { deckkraft *= parseFloat(getComputedStyle(n).opacity); n = n.parentElement; }
    if (deckkraft < .05) return;                       // faktisch unsichtbar

    const vg = zahlen(cs.color), grund = grundFarbe(el);
    const alpha = (vg[3] === undefined ? 1 : vg[3]) * deckkraft;
    const gemischt = [0, 1, 2].map(i => vg[i] * alpha + grund[i] * (1 - alpha));
    const l1 = lum(...gemischt), l2 = lum(...grund);
    const wert = (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05);

    const fs = parseFloat(cs.fontSize), fw = parseInt(cs.fontWeight, 10) || 400;
    const gross = fs >= 24 || (fs >= 18.66 && fw >= 700);
    const soll = gross ? 3 : 4.5;                      // WCAG 1.4.3
    if (wert < soll - 0.02) {
      treffer.push({
        wahl: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(/\s+/).filter(Boolean).slice(0, 2).join('.') : ''),
        text: txt.slice(0, 40), ist: +wert.toFixed(2), soll, px: fs, gewicht: fw,
        deckkraft: +deckkraft.toFixed(2)
      });
    }
  });
  return treffer;
};

/** Kurzformat für Konsolenausgaben. */
export const zeile = (ok, name, info) =>
  console.log((ok ? '  ok  ' : '  ROT ') + name + (ok ? '' : '   ' + JSON.stringify(info)));

export function bilanz(treffer, was) {
  console.log('\n==== ' + was + ': ' + (treffer.length ? treffer.length + ' Befund(e)' : 'sauber') + ' ====');
  return treffer.length === 0;
}
