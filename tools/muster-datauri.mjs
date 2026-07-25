#!/usr/bin/env node
/**
 * Bettet die sieben Muster-SVGs als data:-URI in data/assets.js ein und prüft,
 * dass Daten und Platte nicht auseinanderlaufen.
 *
 *   node tools/muster-datauri.mjs            # dataUri neu erzeugen (Normalfall)
 *   node tools/muster-datauri.mjs --pruefen  # nur prüfen, nichts schreiben (Exit 1 bei Abweichung)
 *
 * WARUM überhaupt: Der Kopieren-Knopf bei den Mustern verspricht „einfügen und
 * es läuft". Kopiert wird aber das Feld css, und darin steht
 * url('assets/patterns/dots.svg') — ein repo-relativer Pfad, der in jedem
 * fremden Projekt ins Leere zeigt. Der eingebettete URI trägt überall: in einer
 * einzelnen HTML-Datei, offline, ohne Server, per file://.
 *
 * WARUM ein zweites Feld und nicht ein zweiter CSS-String: css bleibt
 * unverändert (es zeigt die Datei-Fassung, die im Repo selbst richtig ist). Die
 * portable Fassung setzt vorlagen.html zur Laufzeit aus css + dataUri
 * zusammen. Zwei CSS-Strings in den Daten wären zwei Wahrheiten.
 *
 * WARUM prozentkodiert und nicht Base64 — gemessen über alle sieben Dateien
 * (1715 Bytes roh):
 *     Base64 gesamt        2478 Zeichen
 *     prozentkodiert       2382 Zeichen   (96 weniger)
 * Nur bei den zwei kleinsten Dateien gewinnt Base64 knapp (dots 206 statt 219,
 * grid 246 statt 248); für diese 15 Zeichen zwei Kodierungen im Datensatz zu
 * mischen wäre der schlechtere Tausch. Dazu bleibt der prozentkodierte URI
 * lesbar — man sieht im Diff, welches SVG drinsteht.
 * Leerzeichen bleiben roh: in einem CSS-`url("…")` sind sie zulässig, und
 * %20 für jedes von ihnen kostete 358 Zeichen und läge damit über Base64.
 *
 * WAS kodiert wird: %, #, <, >, ", ', &, ?, \, ^, `, {, }, |, [, ], alle
 * Steuerzeichen (auch die Zeilenumbrüche) und alles jenseits von ASCII. Damit
 * ist der URI in url("…") und in url('…') gültig, überlebt ein
 * style="…"-Attribut und lässt sich verlustfrei zurückrechnen — worauf sich
 * --pruefen stützt.
 *
 * FALLE für die Laufzeit-Ersetzung: css schreibt url('…') mit EINFACHEN
 * Anführungszeichen. Wer beim Einsetzen auf url("…") wechselt, zerlegt jedes
 * style="…"-Attribut, in das der CSS kopiert wird — gemessen an einer
 * Testseite per file://: mit doppelten Anführungszeichen im Attribut kam die
 * Regel gar nicht erst an. Also nur den Pfad zwischen den vorhandenen
 * Anführungszeichen tauschen, die Zeichen selbst stehen lassen.
 *
 * WAS --pruefen prüft (beides gegen die Platte, nicht gegeneinander):
 *   (a) jeder Pfad in jedem dateien[] der 30 Assets existiert,
 *   (b) jeder dataUri ist exakt der heutige Dateiinhalt — dekodiert Byte für
 *       Byte verglichen und zusätzlich als ganzer URI-String.
 * Ein Muster vom Typ gradient darf keinen dataUri tragen; es gibt keine Datei,
 * die ihn belegen könnte.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const WURZEL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ZIEL = path.join(WURZEL, 'data', 'assets.js');
const NUR_PRUEFEN = process.argv.includes('--pruefen');

const MIME = 'data:image/svg+xml;charset=utf-8,';

/* Zeichen, die in einem CSS-url() oder einem HTML-Attribut Ärger machen. */
const ZU_KODIEREN = new Set(['%', '#', '<', '>', '"', "'", '&', '?', '\\', '^', '`', '{', '}', '|', '[', ']']);

const maskiere = s => String(s).replace(/[.*+?^${}()|[\]\\-]/g, '\\$&');

function prozent(zeichen) {
  return [...Buffer.from(zeichen, 'utf8')]
    .map(b => '%' + b.toString(16).toUpperCase().padStart(2, '0'))
    .join('');
}

function kodiere(text) {
  let aus = '';
  for (const zeichen of text) {
    const code = zeichen.codePointAt(0);
    aus += (code < 0x20 || code > 0x7e || ZU_KODIEREN.has(zeichen)) ? prozent(zeichen) : zeichen;
  }
  return aus;
}

function uriAusDatei(relPfad) {
  return MIME + kodiere(fs.readFileSync(path.join(WURZEL, relPfad), 'utf8'));
}

/* data/assets.js in einer Sandbox laden. Achtung: top-level const landet NICHT
   als Eigenschaft am Kontext — die Werte müssen einzeln geholt werden. */
function ladeDaten() {
  const ctx = vm.createContext({ console });
  vm.runInContext(fs.readFileSync(ZIEL, 'utf8'), ctx, { filename: 'data/assets.js' });
  return {
    ASSETS: vm.runInContext('ASSETS', ctx),
    PATTERNS: vm.runInContext('PATTERNS', ctx),
    assetModel: vm.runInContext('assetModel', ctx)
  };
}

const { ASSETS, PATTERNS, assetModel } = ladeDaten();
const mitDatei = PATTERNS.filter(p => p.datei);

/* ---------------------------------------------------------------- prüfen */
if (NUR_PRUEFEN) {
  const befunde = [];
  let pfade = 0;

  for (const eintrag of ASSETS) {
    const m = assetModel(eintrag);
    if (!Array.isArray(m.dateien)) { befunde.push(`${m.typ}/${m.id}: dateien ist kein Array`); continue; }
    for (const p of m.dateien) {
      pfade++;
      if (!fs.existsSync(path.join(WURZEL, p))) befunde.push(`${m.typ}/${m.id}: Datei fehlt auf der Platte — ${p}`);
    }
  }

  for (const muster of PATTERNS) {
    if (!muster.datei) {
      if (muster.dataUri) befunde.push(`pattern/${muster.id}: dataUri ohne Datei (typ ${muster.typ})`);
      continue;
    }
    if (!fs.existsSync(path.join(WURZEL, muster.datei))) {
      befunde.push(`pattern/${muster.id}: SVG fehlt — ${muster.datei}`);
      continue;
    }
    if (!muster.dataUri) { befunde.push(`pattern/${muster.id}: dataUri fehlt`); continue; }
    const soll = uriAusDatei(muster.datei);
    if (muster.dataUri !== soll) {
      const inhalt = fs.readFileSync(path.join(WURZEL, muster.datei), 'utf8');
      let dekodiert = '(nicht dekodierbar)';
      try { dekodiert = decodeURIComponent(muster.dataUri.slice(MIME.length)); } catch { /* bleibt */ }
      /* Gleiche Länge bei verschiedenem Inhalt ist der häufigste Fall (ein Zeichen
         getauscht) — deshalb wird die Länge nur genannt, wenn sie sich wirklich
         unterscheidet. „219 statt 219" hat beim ersten Rotlauf mehr verwirrt als
         geholfen. */
      const laenge = muster.dataUri.length === soll.length
        ? `beide ${soll.length} Zeichen`
        : `${muster.dataUri.length} statt ${soll.length} Zeichen`;
      befunde.push(`pattern/${muster.id}: dataUri weicht von ${muster.datei} ab `
        + `(${laenge}, dekodierter Inhalt ${dekodiert === inhalt ? 'gleich' : 'verschieden'})`);
    }
  }

  console.log(`muster-datauri: ${ASSETS.length} Assets, ${pfade} Dateipfade, ${mitDatei.length} eingebettete Muster.`);
  if (befunde.length) {
    console.error(`ABBRUCH: ${befunde.length} Abweichung(en) zwischen data/assets.js und der Platte.`);
    befunde.forEach(b => console.error('  ' + b));
    process.exit(1);
  }
  console.log('Alle Pfade vorhanden, alle dataUri identisch mit der Datei.');
  process.exit(0);
}

/* --------------------------------------------------------------- schreiben */
let text = fs.readFileSync(ZIEL, 'utf8');
let geschrieben = 0;
const zeilenBericht = [];

for (const muster of mitDatei) {
  const voll = path.join(WURZEL, muster.datei);
  if (!fs.existsSync(voll)) {
    console.error(`ABBRUCH: ${muster.id} verweist auf ${muster.datei} — die Datei gibt es nicht.`);
    process.exit(1);
  }
  const roh = fs.readFileSync(voll);
  const uri = uriAusDatei(muster.datei);
  const b64 = 'data:image/svg+xml;base64,' + roh.toString('base64');

  /* datei-Zeile suchen, dataUri dahinter setzen oder ersetzen. Der Anker ist
     der Pfad selbst — BRAND trägt ebenfalls ein Feld datei, aber mit einem
     Pfad unter assets/brand/. */
  const anker = new RegExp(
    `^([ \\t]*)"datei": "${maskiere(muster.datei)}",\\n(?:[ \\t]*"dataUri": "[^"\\n]*",\\n)?`, 'm');
  if (!anker.test(text)) {
    console.error(`ABBRUCH: keine datei-Zeile für ${muster.id} (${muster.datei}) in data/assets.js gefunden.`);
    process.exit(1);
  }
  text = text.replace(anker, (_, einzug) =>
    `${einzug}"datei": "${muster.datei}",\n${einzug}"dataUri": "${uri}",\n`);
  geschrieben++;
  zeilenBericht.push([muster.id, roh.length, b64.length, uri.length]);
}

if (geschrieben !== mitDatei.length) {
  console.error(`ABBRUCH: ${geschrieben} von ${mitDatei.length} Mustern geschrieben.`);
  process.exit(1);
}

fs.writeFileSync(ZIEL, text);

const summe = zeilenBericht.reduce((s, z) => [0, s[1] + z[1], s[2] + z[2], s[3] + z[3]], [0, 0, 0, 0]);
console.log(`data/assets.js geschrieben: ${geschrieben} dataUri.`);
console.log('  Muster       roh   Base64   prozent');
zeilenBericht.forEach(([id, roh, b64, pct]) =>
  console.log(`  ${id.padEnd(11)} ${String(roh).padStart(4)} ${String(b64).padStart(8)} ${String(pct).padStart(9)}${pct <= b64 ? '' : '   (Base64 wäre kürzer)'}`));
console.log(`  ${'gesamt'.padEnd(11)} ${String(summe[1]).padStart(4)} ${String(summe[2]).padStart(8)} ${String(summe[3]).padStart(9)}`);
