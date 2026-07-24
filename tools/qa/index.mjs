#!/usr/bin/env node
/**
 * QA-Werkzeugkasten für den pilot AI Marketplace.
 *
 *   node tools/qa/index.mjs <prüfung> [basis-url]
 *
 *   kontrast     WCAG-Kontrast inkl. kumulierter Deckkraft (alle 6 Seiten)
 *   zaehler      Versprechen die Reiter-/Chip-Zähler mehr, als sie liefern?
 *   robust       Übersteht die Seite vergifteten localStorage?
 *   responsive   Body-Overflow, aus dem Viewport ragende Bedienelemente, Tap-Ziele
 *   links        Link-Rot in data/*.js (inkl. echter YouTube-Prüfung)
 *   a11y         WCAG-Prüfung mit axe-core (injiziert, kein npm nötig)
 *   manifest     Stimmen skills/manifest.json + files-all.json zum Dateibestand?
 *   aufraeumen   Verwaiste Browser-Prozesse beenden (gegen Termux-Abstürze)
 *   alles        alle browserbasierten Prüfungen nacheinander
 *
 * Beispiel:
 *   node tools/qa/index.mjs kontrast http://localhost:8401/
 *
 * Exit-Code 0 = sauber, 1 = mindestens ein Befund.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { chromium, SEITEN, basis, browser, oeffne, AUFDECKEN, KONTRAST_IM_BROWSER, zeile, bilanz } from './lib.mjs';

const WURZEL = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const [, , pruefung, urlArg] = process.argv;
const BASIS = basis(urlArg);

/* ------------------------------------------------------------------ kontrast */
async function kontrast() {
  const b = await browser();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const alle = [];
  for (const s of SEITEN) {
    const { p } = await oeffne(ctx, BASIS + s);
    const t = await p.evaluate(KONTRAST_IM_BROWSER);
    t.forEach(x => alle.push({ seite: s, ...x }));
    zeile(t.length === 0, s, { befunde: t.length, schlimmster: t.sort((a, c) => a.ist - c.ist)[0] });
    await p.close();
  }
  await b.close();
  if (alle.length) console.log(JSON.stringify(alle.slice(0, 20), null, 1));
  return bilanz(alle, 'Kontrast');
}

/* ------------------------------------------------------------------- zaehler */
// Zähler, die die aktive Suche ignorieren, sind DIE wiederkehrende Fehlerklasse
// dieses Projekts: Der Reiter verspricht „Texten 5", die Suche liefert null.
// ACHTUNG: Falsche Selektoren führen NICHT zu einem Fehler, sondern zu einem
// stillen Überspringen, das in der Ausgabe wie „ok" aussieht — die gefährlichste
// Sorte Fehlmessung. Deshalb bricht die Prüfung unten hart ab, wenn ein Selektor
// nicht greift. Die Werte hier sind an der laufenden Seite verifiziert.
const ZAEHLER_SEITEN = {
  'skills.html':       { url: 'skills.html',            suche: 'input#search', raster: '#skills-grid',  reiter: '.cat-tab, .type-tab' },
  'prompts.html':      { url: 'prompts.html',           suche: 'input#search', raster: '#prompts-grid', reiter: '.cat-tab, .type-tab' },
  'vorlagen.html':     { url: 'vorlagen.html',          suche: 'input#search', raster: '#bk-grid',      reiter: '#bk-cats .bk-cat' },
  'showroom.html':     { url: 'showroom.html',          suche: 'input#search', raster: '#sr-grid',      reiter: '#sr-cats .sr-cat' },
  'lernen-hilfe.html': { url: 'lernen-hilfe.html',      suche: 'input#search', raster: '.res-list',     reiter: '#cat-tabs .cat-tab' }
};
// Bewusst wenige Wörter: Die Prüfung stellt pro Messung den Ausgangszustand neu
// her (siehe Methodik-Kommentar unten) und ist dadurch teuer. Drei Begriffe, die
// erfahrungsgemäß quer durch die Kategorien streuen, reichen zum Aufdecken.
const SUCHWOERTER = ['design', 'briefing', 'excel'];

async function zaehler() {
  const b = await browser();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const luegen = [];
  for (const [seite, cfg] of Object.entries(ZAEHLER_SEITEN)) {
    const { p } = await oeffne(ctx, BASIS + (cfg.url || seite));
    // Hart scheitern statt still überspringen (siehe Kommentar an ZAEHLER_SEITEN).
    const fehlt = [];
    for (const [was, sel] of [['Suchfeld', cfg.suche], ['Raster', cfg.raster], ['Reiter', cfg.reiter]])
      if (!(await p.$(sel))) fehlt.push(was + ' „' + sel + '"');
    if (fehlt.length) {
      luegen.push({ seite, PRUEFUNG_UNGUELTIG: 'Selektor greift nicht: ' + fehlt.join(', ') });
      zeile(false, seite + ' — SELEKTOR DEFEKT, nicht geprüft', { fehlt });
      await p.close(); continue;
    }
    // METHODIK (teuer erkauft): Die Reiter-Zahlen gelten für den Zustand OHNE
    // Kategorie-Auswahl. Wer die Reiter einfach nacheinander durchklickt, liest
    // die Zahl des zweiten Reiters bereits im gefilterten Zustand des ersten und
    // vergleicht damit zwei verschiedene Welten — das erzeugt Fehlbefunde am
    // Fließband („verspricht 0, liefert 1"). Deshalb wird für JEDE Messung der
    // Ausgangszustand neu hergestellt.
    let seitenLuegen = 0;
    const zaehleKarten = sel => {
      const r = document.querySelector(sel);
      if (!r) return -1;
      return [...r.children].filter(c =>
        !/empty|leer|hinweis/i.test(String(c.className)) &&
        (c.getClientRects().length > 0)
      ).length;
    };
    const frisch = async (wort) => {
      await p.goto(BASIS + seite, { waitUntil: 'networkidle' });
      await p.evaluate(AUFDECKEN);
      await p.fill(cfg.suche, wort); await p.waitForTimeout(500);
    };
    for (const wort of SUCHWOERTER) {
      await frisch(wort);
      // Versprechen einmal im unbelasteten Zustand einsammeln
      const versprechen = await p.evaluate(sel => [...document.querySelectorAll(sel)].map((n, i) => {
        const c = n.querySelector('.tab-count, .rc-count');
        return { i, name: n.textContent.trim().split(/\s+/)[0], n: c ? parseInt(c.textContent.replace(/\D/g, ''), 10) : null };
      }), cfg.reiter);
      for (const v of versprechen) {
        if (v.n === null || Number.isNaN(v.n)) continue;
        await frisch(wort);                       // Ausgangszustand wiederherstellen
        const el = (await p.$$(cfg.reiter))[v.i];
        if (!el) continue;
        await el.click().catch(() => {});
        await p.waitForTimeout(450);
        const geliefert = await p.evaluate(zaehleKarten, cfg.raster);
        if (geliefert >= 0 && geliefert !== v.n) {
          luegen.push({ seite, suche: wort, reiter: v.name, verspricht: v.n, liefert: geliefert });
          seitenLuegen++;
        }
      }
    }
    zeile(seitenLuegen === 0, seite, { abweichungen: seitenLuegen });
    await p.close();
  }
  await b.close();
  if (luegen.length) console.log(JSON.stringify(luegen.slice(0, 25), null, 1));
  return bilanz(luegen, 'Zähler-Wahrheit');
}

/* -------------------------------------------------------------------- robust */
// Gemein ist: UNGÜLTIGES JSON ist harmlos (try/catch fängt es), gültiges JSON
// vom FALSCHEN TYP hat den Katalog komplett geleert. Deshalb wird beides geprüft.
const GIFT = ['null', '999', '"text"', '{"a":1}', '[1,2]', 'kaputt'];
const GIFT_ZIELE = [
  ['skills.html',  '#skills-grid',  ['comments:skill:pptx', 'rate:skill:pptx', 'fav:skill:pptx']],
  ['prompts.html', '#prompts-grid', ['comments:prompt:briefing-zusammenfassung', 'rate:prompt:briefing-zusammenfassung']]
];

async function robust() {
  const b = await browser();
  const treffer = [];
  for (const [seite, raster, schluessel] of GIFT_ZIELE) {
    for (const k of schluessel) {
      for (const v of GIFT) {
        const ctx = await b.newContext();
        const { p, fehler } = await oeffne(ctx, BASIS + seite, { aufdecken: false });
        await p.evaluate(([kk, vv]) => localStorage.setItem(kk, vv), [k, v]);
        await p.reload({ waitUntil: 'networkidle' });
        await p.waitForTimeout(600);
        const n = await p.evaluate(sel => {
          const r = document.querySelector(sel); return r ? r.children.length : -1;
        }, raster);
        if (n <= 0 || fehler.length) treffer.push({ seite, schluessel: k, wert: v, karten: n, fehler: fehler.slice(0, 1) });
        await ctx.close();
      }
    }
    zeile(!treffer.some(t => t.seite === seite), seite, { befunde: treffer.filter(t => t.seite === seite).length });
  }
  await b.close();
  if (treffer.length) console.log(JSON.stringify(treffer, null, 1));
  return bilanz(treffer, 'Robustheit gegen kaputten Speicher');
}

/* ---------------------------------------------------------------- responsive */
const VIEWPORTS = [
  { w: 360, h: 740, n: '360 Handy' }, { w: 390, h: 844, n: '390 Handy' },
  { w: 740, h: 360, n: '740 quer' }, { w: 768, h: 1024, n: '768 Tablet' },
  { w: 1024, h: 768, n: '1024 Tablet quer' }, { w: 1440, h: 900, n: '1440 Desktop' }
];

async function responsive() {
  const b = await browser();
  const treffer = [];
  for (const vp of VIEWPORTS) {
    const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, isMobile: vp.w < 500, hasTouch: vp.w < 500 });
    for (const s of SEITEN) {
      const { p, fehler } = await oeffne(ctx, BASIS + s);
      const r = await p.evaluate(() => {
        const raus = [];
        document.querySelectorAll('a,button,input,select,summary,[role="button"],[tabindex]').forEach(el => {
          if (!el.offsetParent && el.tagName !== 'BODY') return;
          const b = el.getBoundingClientRect();
          if (b.width === 0 || b.height === 0) return;
          // Aus dem Viewport ragend? Elemente in gewollten Scroll-Streifen ausnehmen.
          let inRail = false, n = el.parentElement;
          while (n && n !== document.body) {
            const cs = getComputedStyle(n);
            if (/auto|scroll/.test(cs.overflowX)) { inRail = true; break; }
            n = n.parentElement;
          }
          if (!inRail && b.right > window.innerWidth + 0.5) raus.push({ sel: el.id ? '#' + el.id : el.tagName.toLowerCase() + '.' + String(el.className).split(/\s+/)[0], ueberstand: +(b.right - window.innerWidth).toFixed(1) });
        });
        const klein = [];
        document.querySelectorAll('a,button,[role="button"]').forEach(el => {
          if (!el.offsetParent) return;
          const b = el.getBoundingClientRect();
          if (b.width === 0 || b.height === 0) return;
          // Fließtext-Links sind von WCAG 2.5.8 ausgenommen
          const imText = el.tagName === 'A' && el.parentElement && /^(P|LI|TD|SPAN|DIV)$/.test(el.parentElement.tagName)
            && el.parentElement.textContent.trim().length > el.textContent.trim().length + 20;
          if (!imText && (b.height < 24 || b.width < 24)) klein.push({ sel: el.id ? '#' + el.id : el.tagName.toLowerCase() + '.' + String(el.className).split(/\s+/)[0], h: Math.round(b.height), w: Math.round(b.width) });
        });
        return { scrollW: document.documentElement.scrollWidth, innerW: window.innerWidth, raus, klein: klein.slice(0, 10) };
      });
      const bodyOverflow = r.scrollW > r.innerW;
      if (bodyOverflow || r.raus.length || fehler.length)
        treffer.push({ seite: s, viewport: vp.n, bodyOverflow: bodyOverflow ? `${r.scrollW}>${r.innerW}` : false, ausViewport: r.raus.slice(0, 5), fehler: fehler.slice(0, 1) });
      if (r.klein.length) treffer.push({ seite: s, viewport: vp.n, tapZieleZuKlein: r.klein });
      await p.close();
    }
    zeile(!treffer.some(t => t.viewport === vp.n), vp.n, { befunde: treffer.filter(t => t.viewport === vp.n).length });
  }
  await b.close();
  if (treffer.length) console.log(JSON.stringify(treffer.slice(0, 20), null, 1));
  return bilanz(treffer, 'Responsive');
}

/* ---------------------------------------------------------------------- links */
// Link-Rot ist in diesem Projekt real passiert (ein Artikel rutschte hinter eine
// Paywall). Zwei Fallen: (1) GitHub drosselt bei vielen Anfragen mit 429 — das
// ist KEIN toter Link, deshalb wird nachgeprüft. (2) YouTube liefert auch für
// GELÖSCHTE Videos 200 — deshalb echte oEmbed-Prüfung.
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const warte = ms => new Promise(r => setTimeout(r, ms));
const hole = (u, extra = '') => {
  try {
    return execSync(`curl -sS -o /dev/null -L --max-time 25 -A ${JSON.stringify(UA)} -w '%{http_code}|%{url_effective}' ${extra} ${JSON.stringify(u)}`, { encoding: 'utf8' }).trim().split('|');
  } catch { return ['ERR', '']; }
};

async function links() {
  const gefunden = new Map();
  for (const f of fs.readdirSync(path.join(WURZEL, 'data'))) {
    const src = fs.readFileSync(path.join(WURZEL, 'data', f), 'utf8');
    for (let u of src.match(/https?:\/\/[^\s'"`)\]<>]+/g) || []) {
      u = u.replace(/[.,;]+$/, '');
      if (!gefunden.has(u)) gefunden.set(u, new Set());
      gefunden.get(u).add(f);
    }
  }
  const tot = [], umgeleitet = [];
  const nachpruefen = [];
  for (const [u, dateien] of gefunden) {
    const yt = u.match(/youtube\.com\/watch\?v=([\w-]+)/);
    if (yt) {
      // Echte Verfügbarkeitsprüfung: oEmbed antwortet bei entfernten Videos 404.
      let ok = false, titel = '';
      try {
        const j = JSON.parse(execSync(`curl -sS --max-time 20 -A ${JSON.stringify(UA)} ${JSON.stringify('https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=' + yt[1] + '&format=json')}`, { encoding: 'utf8' }));
        ok = !!j.title; titel = j.author_name + ' — ' + j.title;
      } catch { ok = false; }
      zeile(ok, 'YT ' + yt[1], { titel });
      if (!ok) tot.push({ u, dateien: [...dateien], grund: 'Video nicht mehr verfügbar (oEmbed)' });
      continue;
    }
    const [code, ziel] = hole(u);
    if (code === '429') { nachpruefen.push([u, dateien]); continue; }
    if (code !== '200') { tot.push({ u, dateien: [...dateien], code }); zeile(false, u.slice(0, 70), { code }); continue; }
    if (ziel && ziel.replace(/\/$/, '') !== u.replace(/\/$/, '')) umgeleitet.push({ u, ziel });
  }
  // 429 = Drosselung, nicht Link-Rot. Einzeln mit Abstand nachprüfen.
  if (nachpruefen.length) {
    console.log(`\n  ${nachpruefen.length}× 429 (Drosselung) — wird einzeln nachgeprüft …`);
    for (const [u, dateien] of nachpruefen) {
      await warte(9000);
      const [code] = hole(u);
      zeile(code === '200', u.slice(0, 70), { code });
      if (code !== '200') tot.push({ u, dateien: [...dateien], code });
    }
  }
  console.log(`\n  ${gefunden.size} Links geprüft · ${umgeleitet.length} nur per Weiterleitung erreichbar`);
  if (umgeleitet.length) {
    console.log('  Hinweis: Weiterleitungen werden irgendwann abgeschaltet — Zieladresse eintragen:');
    umgeleitet.forEach(x => console.log('   ' + x.u + '\n     → ' + x.ziel));
  }
  if (tot.length) console.log(JSON.stringify(tot, null, 1));
  return bilanz(tot, 'Link-Rot');
}

/* ------------------------------------------------------------------- manifest */
// FALLE: manifest.json ist { id: [pfade] } — KEIN { files: [...] }. Wer das
// verwechselt, bekommt „SKILL.md fehlt" für jeden Skill gemeldet (passiert).
const TEXT = new Set('md markdown txt py js mjs cjs ts tsx jsx json jsonc yaml yml toml ini cfg csv tsv html htm css scss sh bash zsh xml svg sql env'.split(' '));
const istText = n => TEXT.has((n.split('.').pop() || '').toLowerCase());
const istBoilerplate = n => /^(LICENSE|LICENCE|NOTICE|COPYING|THIRD_PARTY_NOTICES)(\.|$)/i.test(n);

function manifest() {
  const dir = path.join(WURZEL, 'skills');
  const man = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
  const alle = JSON.parse(fs.readFileSync(path.join(dir, 'files-all.json'), 'utf8'));
  const ordner = fs.readdirSync(dir).filter(d => fs.statSync(path.join(dir, d)).isDirectory());
  const treffer = [];
  for (const id of ordner) {
    const echt = [];
    (function walk(rel) {
      for (const e of fs.readdirSync(path.join(dir, id, rel), { withFileTypes: true })) {
        if (e.name === '.DS_Store') continue;
        const r = rel ? rel + '/' + e.name : e.name;
        e.isDirectory() ? walk(r) : echt.push(r);
      }
    })('');
    const sollViewer = echt.filter(f => istText(path.basename(f)) && !istBoilerplate(path.basename(f))).sort();
    const istViewer = [...(man[id] || [])].sort();
    const istAlle = [...(alle[id] || [])].sort();
    if (JSON.stringify(sollViewer) !== JSON.stringify(istViewer))
      treffer.push({ id, liste: 'manifest.json', fehlt: sollViewer.filter(x => !istViewer.includes(x)), zuviel: istViewer.filter(x => !sollViewer.includes(x)) });
    if (JSON.stringify([...echt].sort()) !== JSON.stringify(istAlle))
      treffer.push({ id, liste: 'files-all.json', fehlt: echt.filter(x => !istAlle.includes(x)), zuviel: istAlle.filter(x => !echt.includes(x)) });
  }
  console.log(`  ${ordner.length} Skill-Ordner geprüft`);
  if (treffer.length) { console.log(JSON.stringify(treffer, null, 1)); console.log('  → `node build-skills.mjs` laufen lassen.'); }
  return bilanz(treffer, 'Skill-Manifest');
}

/* ------------------------------------------------------------------------ a11y */
/**
 * WCAG-Prüfung mit axe-core.
 *
 * Warum genau so: `tools/qa/vendor/axe.min.js` ist eine EINZELNE Browser-Datei
 * ohne Abhängigkeiten. Sie wird per `addScriptTag` in die bereits geladene Seite
 * injiziert und läuft damit in DERSELBEN Chromium-Instanz, die diese Prüfung
 * ohnehin startet — kein npm-Projekt, kein Build-Step, kein zweiter Browser.
 * Das ist der Grund, warum hier axe-core steht und nicht Pa11y oder Lighthouse:
 * beide bringen eine eigene Browser-Kette mit, und auf Termux ist der Speicher
 * der Engpass (gemessen: ~1,6 GB frei bei laufendem Chromium).
 *
 * WICHTIG — was das NICHT leistet: Automatische Prüfung deckt nur einen Teil der
 * WCAG-Kriterien ab. Tastaturbedienbarkeit, Fokusreihenfolge, sinnvolle
 * Alternativtexte und Verständlichkeit bleiben Handarbeit. „axe sagt sauber"
 * heißt NICHT „barrierefrei".
 */
const AXE = new URL('./vendor/axe.min.js', import.meta.url).pathname;

async function a11y() {
  if (!fs.existsSync(AXE)) {
    console.log('  tools/qa/vendor/axe.min.js fehlt. Holen mit:\n' +
      '  curl -sSo tools/qa/vendor/axe.min.js https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js');
    return false;
  }
  const b = await browser();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const alle = [];
  try {
    for (const s of SEITEN) {
      const { p } = await oeffne(ctx, BASIS + s);
      await p.addScriptTag({ path: AXE });
      const r = await p.evaluate(async () => {
        const res = await window.axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }
        });
        return {
          verstoesse: res.violations.map(v => ({
            id: v.id, wirkung: v.impact, anzahl: v.nodes.length, hilfe: v.help,
            beispiel: (v.nodes[0] || {}).html ? String(v.nodes[0].html).slice(0, 90) : ''
          })),
          bestanden: res.passes.length, unklar: res.incomplete.length
        };
      });
      r.verstoesse.forEach(v => alle.push({ seite: s, ...v }));
      zeile(r.verstoesse.length === 0, s, { verstoesse: r.verstoesse.length, bestandeneRegeln: r.bestanden, unklar: r.unklar });
      await p.close();
    }
  } finally { await b.close(); }
  if (alle.length) console.log(JSON.stringify(alle, null, 1));
  console.log('  Hinweis: axe prüft nur automatisch Prüfbares — Tastatur, Fokusreihenfolge\n' +
              '  und Verständlichkeit bleiben Handarbeit.');
  return bilanz(alle, 'Barrierefreiheit (axe-core)');
}

/* ------------------------------------------------------------------ aufraeumen */
/**
 * Verwaiste Browser-Prozesse einsammeln.
 *
 * WARUM DAS WICHTIG IST (auf Termux/Android gemessen): Wird ein Playwright-Skript
 * abgebrochen, überlebt sein `headless_shell` und wird an init durchgereicht
 * (PPID 1). Diese Waisen sammeln sich über eine lange Sitzung an — gemessen
 * 6 Stück = 119 MB bei nur 97 MB freiem RAM und 3,5 GB bereits belegtem Swap.
 * Androids Low-Memory-Killer greift sich dann den größten Prozess: Claude Code
 * selbst. Genau so entstehen die scheinbar grundlosen Sitzungsabbrüche.
 *
 * Es werden AUSSCHLIESSLICH Prozesse mit PPID 1 beendet — Browser mit lebendem
 * Elternprozess gehören einem laufenden Skript und bleiben unangetastet.
 */
function aufraeumen() {
  let zeilen = [];
  try {
    zeilen = execSync('ps -eo pid,ppid,rss,comm', { encoding: 'utf8' }).split('\n');
  } catch { console.log('  ps nicht verfügbar'); return true; }
  const waisen = zeilen.map(z => z.trim().split(/\s+/))
    .filter(t => t.length >= 4 && t[1] === '1' && /headless_shell|chrome/.test(t[3]))
    .map(t => ({ pid: t[0], mb: Math.round(+t[2] / 1024) }));
  const lebend = zeilen.filter(z => /headless_shell/.test(z) && !/^\s*\d+\s+1\s/.test(z)).length;
  if (!waisen.length) { console.log(`  keine Waisen · ${lebend} Browser mit lebendem Elternprozess (unangetastet)`); return true; }
  let frei = 0;
  for (const w of waisen) {
    try { execSync(`kill -9 ${w.pid} 2>/dev/null`); frei += w.mb; } catch {}
  }
  console.log(`  ${waisen.length} verwaiste Browser beendet, ~${frei} MB frei · ${lebend} laufende unangetastet`);
  try { console.log('  ' + execSync("free -m | awk '/^Mem:/{print \"RAM frei: \"$4\" MB, verfügbar: \"$7\" MB\"}'", { encoding: 'utf8' }).trim()); } catch {}
  return true;
}

/* ----------------------------------------------------------------------- CLI */
const PRUEFUNGEN = { kontrast, zaehler, robust, responsive, links, manifest, a11y, aufraeumen };

if (!pruefung || (!PRUEFUNGEN[pruefung] && pruefung !== 'alles')) {
  console.log(fs.readFileSync(new URL(import.meta.url), 'utf8')
    .split('*/')[0].split('/**')[1].replace(/^ ?\* ?/gm, '').trim());
  process.exit(pruefung ? 1 : 0);
}

const laufen = pruefung === 'alles' ? ['kontrast', 'zaehler', 'robust', 'responsive'] : [pruefung];
let sauber = true;
for (const name of laufen) {
  console.log('\n### ' + name);
  sauber = (await PRUEFUNGEN[name]()) && sauber;
}
process.exit(sauber ? 0 : 1);
