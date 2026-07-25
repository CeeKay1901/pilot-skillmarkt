#!/usr/bin/env node
/**
 * Bettet die sieben Muster-SVGs als data:-URI in data/assets.js ein und prüft,
 * dass Daten und Platte nicht auseinanderlaufen.
 *
 *   node tools/muster-datauri.mjs            # dataUri neu erzeugen (Normalfall)
 *   node tools/muster-datauri.mjs --pruefen  # nur prüfen, nichts schreiben (Exit 1 bei Abweichung)
 *
 * ZUM NAMEN: Der Schreibmodus betrifft nur die Muster — der Prüfmodus nicht.
 * --pruefen hält seit jeher alle 16 Dateipfade aller 30 Assets gegen die Platte,
 * nicht nur die sieben eingebetteten SVG. Sein Zuständigkeitsbereich ist also
 * „data/assets.js gegen die Wirklichkeit", und dazu gehören seit E14 auch die
 * Ziffern im Fließtext von beschreibung (Punkt (c) weiter unten). Wer hier eine
 * weitere Prüfung an data/assets.js braucht, hängt sie hier an, statt ein
 * zweites Werkzeug danebenzustellen — der Dateiname ist enger als der Auftrag.
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
 * WAS --pruefen prüft (a und b gegen die Platte, nicht gegeneinander):
 *   (a) jeder Pfad in jedem dateien[] der 30 Assets existiert,
 *   (b) jeder dataUri ist exakt der heutige Dateiinhalt — dekodiert Byte für
 *       Byte verglichen und zusätzlich als ganzer URI-String.
 *   (c) jede Ziffernfolge in beschreibung ist aus den eigenen Daten des
 *       Eintrags belegbar (siehe unten).
 * Ein Muster vom Typ gradient darf keinen dataUri tragen; es gibt keine Datei,
 * die ihn belegen könnte.
 *
 * WARUM (c): CLAUDE.md verbietet Zahlen im Fließtext, die aus einem Array
 * kommen — sie driften lautlos. Wer eine Farbe zu farben[] ergänzt, hätte sonst
 * eine Karte, die „Fünf Töne" behauptet und sechs zeigt, ohne Fehlermeldung.
 * Ausgeschriebene Zahlwörter kann keine Prüfung halten; die sind deshalb aus
 * den Beschreibungen entfernt, wo sie eine Menge nachsprachen. Was bleibt,
 * sind Ziffern — und die hält (c).
 *
 * BELEGBAR heißt für (c): die Zahl kommt vor
 *   – in der JSON-Serialisierung des Eintrags OHNE beschreibung (also in
 *     stimmung, css, gewichtBereich, anzahl, farben, paare, lizenz, stil,
 *     claudePrompt, beispieltext …), oder
 *   – bei Mustern mit datei im Inhalt genau dieser SVG-Datei auf der Platte,
 *     oder
 *   – als Länge von farben[], paare[] oder dateien[].
 * Verglichen wird der Zahlwert, nicht der Text: „21,0" ist durch ratio 21
 * belegt, „12" aber NICHT durch 1512 — die Regexe fassen jede Ziffernfolge als
 * Ganzes, ein Teilstring kann also nichts belegen. Sonst wäre die Prüfung
 * wertlos, weil in vierstelligen Werten fast jede kleine Zahl steckt.
 *
 * NICHT als Beleg zugelassen sind dataUri (das ist die kodierte Kopie der
 * Datei — %3C, %22 und %0A brächten die Zahlen 3, 22 und 0 als Geschenk mit),
 * URLs (xmlns=„…/2000/svg" brächte 2000 und aus w3 eine 3) und Hex-Farbwerte
 * (#808080). Alle drei tragen Ziffern, die nichts über den Eintrag aussagen,
 * und würden falsche Grünmeldungen erzeugen.
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

/* ------------------------------------------- Ziffern-Beleg (Prüfung c) */

/* Im Fließtext gilt das deutsche Dezimalkomma („4,55"). Bereiche („100–900",
   Halbgeviertstrich) und Maße („24×24") zerfallen von selbst in zwei Zahlen,
   weil weder – noch × zu einer Zahl gehören — genau so sollen sie auch zählen. */
const ZIFFERN_TEXT = /\d+(?:[.,]\d+)?/g;
/* In Daten und SVG steht der Dezimalpunkt. Ein Komma trennt dort Werte
   (rgba(255,224,94,.55)) und darf keine Dezimalzahl bilden. */
const ZIFFERN_DATEN = /\d+(?:\.\d+)?/g;

/* Adressen und Hex-Farben tragen Ziffern, die nichts über den Eintrag
   aussagen. Ohne diesen Filter belegte xmlns=„http://www.w3.org/2000/svg"
   jede 3 und jede 2000, und #ffe05e jede 5. */
function ohneRauschen(text) {
  return String(text)
    .replace(/https?:\/\/[^\s"'\\)]+/g, ' ')
    .replace(/#[0-9a-fA-F]{3,8}\b/g, ' ');
}

function zahlenAus(text, muster) {
  const menge = new Set();
  for (const treffer of String(text).match(muster) || []) menge.add(parseFloat(treffer.replace(',', '.')));
  return menge;
}

/* Der Befund soll zeigen, WO die Zahl steht — „Abweichung in tech-kuehl"
   zwingt sonst zum Suchen. Geliefert wird der Satz um den ersten Treffer. */
function satzMit(text, stueck) {
  const stelle = String(text).indexOf(stueck);
  if (stelle < 0) return String(text).slice(0, 80);
  const vorher = String(text).lastIndexOf('. ', stelle);
  const nachher = String(text).indexOf('. ', stelle);
  return String(text).slice(vorher < 0 ? 0 : vorher + 2, nachher < 0 ? undefined : nachher + 1).trim();
}

/* Alles, womit ein Eintrag seine eigenen Ziffern belegen darf. */
function belegbareZahlen(ref) {
  const ohneText = {};
  for (const [feld, wert] of Object.entries(ref || {})) {
    if (feld === 'beschreibung' || feld === 'dataUri') continue;
    ohneText[feld] = wert;
  }
  const zahlen = zahlenAus(ohneRauschen(JSON.stringify(ohneText)), ZIFFERN_DATEN);
  /* Array-Längen sind belegbare Zahlen: „7 Farben" ist beweisbar, wenn farben[]
     sieben Einträge hat. Die Liste wird erweitert, sobald ein Eintrag ein neues
     zählbares Array bekommt — `gewichte` kam am 25.07.2026 bei iconset/phosphor
     dazu. Ohne diese Zeile dürfte die Beschreibung die Zahl der Gewichte gar
     nicht nennen, obwohl sie danebensteht und nachzählbar ist; die Aufnahme
     macht die Prüfung also nicht weicher, sondern erlaubt eine Aussage, die
     belegt IST. Wichtig ist nur, dass hier ausschließlich Arrays stehen, deren
     Länge die Beschreibung wirklich meint. */
  for (const feld of ['farben', 'paare', 'dateien', 'gewichte']) {
    if (Array.isArray(ref[feld])) zahlen.add(ref[feld].length);
  }
  if (ref.datei) {
    const voll = path.join(WURZEL, ref.datei);
    if (fs.existsSync(voll)) {
      for (const z of zahlenAus(ohneRauschen(fs.readFileSync(voll, 'utf8')), ZIFFERN_DATEN)) zahlen.add(z);
    }
  }
  return zahlen;
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

  /* (c) Ziffern im Fließtext von beschreibung gegen die eigenen Daten. */
  let ziffern = 0;
  let mitBeschreibung = 0;
  for (const eintrag of ASSETS) {
    const m = assetModel(eintrag);
    if (m.beschreibung) mitBeschreibung++;
    const gefunden = String(m.beschreibung).match(ZIFFERN_TEXT) || [];
    if (!gefunden.length) continue;
    const belegt = belegbareZahlen(eintrag.ref || {});
    for (const stueck of gefunden) {
      ziffern++;
      if (belegt.has(parseFloat(stueck.replace(',', '.')))) continue;
      const quelle = (eintrag.ref && eintrag.ref.datei)
        ? `Feldern, ${eintrag.ref.datei} oder einer Array-Länge`
        : 'Feldern oder einer Array-Länge';
      befunde.push(`${m.typ}/${m.id}: Zahl „${stueck}" aus beschreibung ist in den eigenen Daten nicht belegbar `
        + `(nicht in ${quelle}) — Satz: „${satzMit(m.beschreibung, stueck)}"`);
    }
  }

  /* (d) Superlative über die ganze Sammlung.
     Nachdem (c) die Ziffern gebunden hat, blieb eine zweite Sorte driftender
     Aussage übrig, die keine Ziffer braucht: „die kleinste Kachel der Sammlung".
     Sie ist heute wahr und wird still falsch, sobald jemand ein kleineres Muster
     oder eine kleinere Schriftdatei ergänzt — also genau beim naheliegendsten
     nächsten Schritt. Drei solche Sätze stehen im Bestand (ibm-plex-mono,
     topo, diagonal).
     Gemessen wird die Größe, über die der Satz redet: bei Schriften die Summe
     ihrer Dateien auf der Platte, bei Mustern die Kachelkante aus
     background-size. Verglichen wird innerhalb der eigenen Gattung — eine
     Schrift konkurriert nicht mit einer Kachel.
     „höchstmöglich" bei high-contrast ist bewusst NICHT erfasst: 21,0 ist die
     obere Schranke des WCAG-Verhältnisses, eine Tatsache über die Rechenvorschrift
     und nicht über diese Sammlung. Ein neuer Eintrag kann sie nicht kippen. */
  const SUPERLATIV = /\b(kleinste|größte|groesste)\b[^.]*?\bder Sammlung\b/i;
  const kachelKante = p => {
    const m = String(p.css || '').match(/background-size:\s*(\d+)px\s+(\d+)px/);
    return m ? Math.max(Number(m[1]), Number(m[2])) : null;
  };
  const dateiBytes = ref => (Array.isArray(ref.dateien) ? ref.dateien : [])
    .reduce((summe, p) => summe + (fs.existsSync(path.join(WURZEL, p)) ? fs.statSync(path.join(WURZEL, p)).size : 0), 0);

  const groessen = new Map();   // id -> { gattung, wert }
  for (const eintrag of ASSETS) {
    const ref = eintrag.ref || {};
    if (eintrag.typ === 'font') groessen.set(eintrag.id, { gattung: 'Schriftdatei', wert: dateiBytes(ref) });
    else if (eintrag.typ === 'pattern' && ref.datei) {
      const kante = kachelKante(ref);
      if (kante !== null) groessen.set(eintrag.id, { gattung: 'Kachel', wert: kante });
    }
  }
  let superlative = 0;
  for (const eintrag of ASSETS) {
    const m = assetModel(eintrag);
    const treffer = String(m.beschreibung || '').match(SUPERLATIV);
    if (!treffer) continue;
    superlative++;
    const eigen = groessen.get(eintrag.id);
    if (!eigen) {
      befunde.push(`${m.typ}/${m.id}: Satz „${satzMit(m.beschreibung, treffer[0])}" behauptet einen Superlativ, `
        + 'aber für diesen Eintrag ist keine vergleichbare Größe messbar');
      continue;
    }
    const feld = [...groessen.entries()].filter(([, g]) => g.gattung === eigen.gattung).map(([id, g]) => ({ id, wert: g.wert }));
    const willKlein = /kleinste/i.test(treffer[0]);
    const grenze = willKlein ? Math.min(...feld.map(x => x.wert)) : Math.max(...feld.map(x => x.wert));
    if (eigen.wert !== grenze) {
      const halter = feld.filter(x => x.wert === grenze).map(x => x.id).join(', ');
      befunde.push(`${m.typ}/${m.id}: Satz „${satzMit(m.beschreibung, treffer[0])}" stimmt nicht mehr — `
        + `${eigen.gattung} misst ${eigen.wert}, ${willKlein ? 'kleiner' : 'größer'} ist ${halter} mit ${grenze}`);
    }
  }

  console.log(`muster-datauri: ${ASSETS.length} Assets, ${pfade} Dateipfade, ${mitDatei.length} eingebettete Muster, `
    + `${ziffern} Ziffernfolgen und ${superlative} Superlative in ${mitBeschreibung} Beschreibungen.`);
  if (befunde.length) {
    console.error(`ABBRUCH: ${befunde.length} Abweichung(en) zwischen data/assets.js und der Platte.`);
    befunde.forEach(b => console.error('  ' + b));
    process.exit(1);
  }
  console.log('Alle Pfade vorhanden, alle dataUri identisch mit der Datei, alle Ziffern belegt, alle Superlative wahr.');
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
