#!/usr/bin/env node
/**
 * Ermittelt für jeden Katalogeintrag, seit wann er auf der Seite steht, und
 * schreibt das Ergebnis nach data/seit.js.
 *
 *   node tools/seit.mjs            # fehlende Einträge ergänzen (Normalfall)
 *   node tools/seit.mjs --pruefen  # nur prüfen, nichts schreiben (Exit 1 bei Lücke)
 *
 * WARUM ein eigenes Feld statt addedAt: addedAt meint die redaktionelle
 * Entstehungszeit. Bei 30 von 45 Katalogeinträgen liegt es VOR dem ersten
 * Commit dieses Repos (09.07.2026, Daten reichen bis Oktober 2025 zurück).
 * Für „was ist neu auf der Seite" ist das die falsche Zahl.
 *
 * WARUM eine eigene Datei statt eines Feldes in den zehn Datendateien:
 * eine Stelle zum Nachziehen, keine Konflikte in den grossen Dateien, und der
 * Generator kann beim Schreiben keine Inhalte beschädigen.
 *
 * ============================ Drei Fallen ============================
 *
 * (1) DIE ID-SCHREIBWEISE WECHSELT — sogar innerhalb einer Datei.
 *     data/assets.js schreibt Schriften als  id: "inter"
 *     und Muster als                        "id": "dots"
 *     data/prompts.js schreibt              id: 'briefing-zusammenfassung'
 *     Ein Pickaxe auf nur eine Form liefert für ganze Blöcke null Treffer —
 *     und zwar STUMM. Deshalb die Regex über beide Anführungs- und beide
 *     Schlüsselformen, und deshalb Falle (2).
 *
 * (2) KEIN STILLER AUSFALL. Ein Eintrag ohne Datum bricht den Lauf ab und wird
 *     benannt. Eine leise Lücke wäre schlimmer als ein Abbruch: der
 *     Neuigkeiten-Block würde den Eintrag einfach nie zeigen, ohne dass es
 *     jemandem auffällt.
 *
 * (3) EINFRIER-REGEL. Vorhandene Daten werden NIE überschrieben, nur fehlende
 *     ergänzt. Sobald IDs umbenannt werden (Bibliotheks-Umbau), findet der
 *     Pickaxe die alte Historie nicht mehr und würde ein falsches, jüngeres
 *     Datum liefern. Was einmal ermittelt ist, bleibt.
 * =====================================================================
 *
 * Datumsquelle ist das Commit-Datum (%cs). Geprüft: über alle Commits dieses
 * Repos stimmen Autor- und Commit-Datum überein.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const WURZEL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ZIEL = path.join(WURZEL, 'data', 'seit.js');
const NUR_PRUEFEN = process.argv.includes('--pruefen');

/* Die vierzehn Sammlungen und die Datei, in der sie stehen. Schlüssel ist der
   Global-Name aus GSEARCH_GROUPS.glob — damit findet die Seite ihren Wert
   über genau die Registry, die auch Suche und „Deine Sachen" bedient.
   ASSETS statt FONTS/PALETTES/PATTERNS/ICONSETS: die vereinte Liste trägt
   dieselben IDs wie ihre Quell-Arrays und ist das, was GSEARCH_GROUPS liest. */
const SAMMLUNGEN = [
  ['SKILLS',        'skills.js'],
  ['PROMPTS',       'prompts.js'],
  ['BEFEHLE',       'befehle.js'],
  ['GLOSSAR',       'glossar.js'],
  ['FAQ',           'glossar.js'],
  ['RESSOURCEN',    'ressourcen.js'],
  ['ASSETS',        'assets.js'],
  ['BAUSTEINE',     'bausteine.js'],
  ['BEISPIELDATEN', 'bausteine.js'],
  ['ANWEISUNGEN',   'anweisungen.js'],
  ['CASES',         'cases.js'],
  ['STARTPROJEKTE', 'startprojekte.js'],
  /* BILDER und PAKETE (Vorlagen-Reiter „Daten" bzw. „Pakete"). Beide haben eine
     eigene Datei, beide schreiben ihre id als `id: 'x'` — die Pickaxe-Regex im
     Dateikopf (Falle 1) deckt diese Form ab.
     ACHTUNG bei gleichen ids über Sammlungen hinweg (aktuell: `einseiter` steht
     in ANWEISUNGEN UND STARTPROJEKTE): Das ist kein Konflikt — der Schlüssel ist
     `<Global>:<id>`, und der Pickaxe sucht je Sammlung in IHRER Datei. Beide
     bekommen also getrennte, jeweils korrekte Ersterscheinungs-Daten. */
  ['BILDER',        'bilder.js'],
  ['PAKETE',        'pakete.js'],
];

/* Alle Datendateien in EINEN Kontext laden. Sie deklarieren ihre Globals mit
   `const`, und `const` aus einem vm-Lauf ist im nächsten nicht sichtbar —
   deshalb zusammenhängen statt einzeln ausführen. */
function ladeDaten() {
  const dateien = [...new Set(SAMMLUNGEN.map(([, f]) => f))];
  const quelle = dateien.map(f => fs.readFileSync(path.join(WURZEL, 'data', f), 'utf8')).join('\n;\n');
  const namen = SAMMLUNGEN.map(([g]) => g);
  const ctx = vm.createContext({ console });
  vm.runInContext(`${quelle}\n;globalThis.__sammlungen = { ${namen.join(', ')} };`, ctx, { filename: 'data/*.js' });
  return ctx.__sammlungen;
}

const maskiere = s => String(s).replace(/[.*+?^${}()|[\]\\-]/g, '\\$&');

function ersterCommit(id, datei) {
  /* --pickaxe-regex: -S nimmt das Muster dann als Regex. Erfasst wird
     "id": "x" · "id": 'x' · id: "x" · id: 'x' — siehe Falle (1). */
  const muster = `"?id"?: *["']${maskiere(id)}["']`;
  try {
    const aus = execFileSync('git',
      ['log', '--format=%cs', '--reverse', '--pickaxe-regex', '-S', muster, '--', `data/${datei}`],
      { cwd: WURZEL, encoding: 'utf8', maxBuffer: 8 << 20 });
    return aus.split('\n')[0].trim() || null;
  } catch {
    return null;
  }
}

/* Bestand einlesen (Einfrier-Regel). Bewusst per Regex statt per vm: die Datei
   ist eine reine Zuordnung, und ein kaputter Bestand soll den Lauf nicht
   sprengen — fehlende Werte werden ohnehin neu ermittelt. */
function ladeBestand() {
  if (!fs.existsSync(ZIEL)) return {};
  const roh = fs.readFileSync(ZIEL, 'utf8');
  const bestand = {};
  for (const [, k, v] of roh.matchAll(/"([^"]+)":\s*"(\d{4}-\d{2}-\d{2})"/g)) bestand[k] = v;
  return bestand;
}

const sammlungen = ladeDaten();
const bestand = ladeBestand();
const neu = {};
const fehlend = [];
let uebernommen = 0, ermittelt = 0;

for (const [glob, datei] of SAMMLUNGEN) {
  const liste = sammlungen[glob];
  if (!Array.isArray(liste)) { console.error(`ABBRUCH: ${glob} ist keine Liste (data/${datei})`); process.exit(1); }
  for (const eintrag of liste) {
    const schluessel = `${glob}:${eintrag.id}`;
    if (bestand[schluessel]) { neu[schluessel] = bestand[schluessel]; uebernommen++; continue; }
    const datum = ersterCommit(eintrag.id, datei);
    if (!datum) { fehlend.push(schluessel); continue; }
    neu[schluessel] = datum;
    ermittelt++;
  }
}

/* Falle (2): lieber laut abbrechen als leise ein Loch lassen. */
if (fehlend.length) {
  console.error(`ABBRUCH: ${fehlend.length} Eintrag/Einträge ohne Datum — kein stilles Überspringen.`);
  fehlend.forEach(k => console.error('  ' + k));
  console.error('\nMeist ist die ID-Schreibweise in der Datendatei neu (siehe Falle 1 im Dateikopf).');
  process.exit(1);
}

const schluessel = Object.keys(neu).sort();
const tage = [...new Set(schluessel.map(k => neu[k]))].sort();
const verteilung = tage.map(t => `//   ${t}  ${String(schluessel.filter(k => neu[k] === t).length).padStart(4)} Einträge`).join('\n');

if (NUR_PRUEFEN) {
  const luecken = schluessel.filter(k => !bestand[k]);
  console.log(`seit: ${schluessel.length} Einträge, ${tage.length} Tage, ${luecken.length} nicht im Bestand.`);
  process.exit(luecken.length ? 1 : 0);
}

const inhalt = `// pilot AI Marketplace — seit wann steht ein Eintrag auf der Seite.
//
// ERZEUGT von tools/seit.mjs. Nicht von Hand pflegen — aber auch nicht
// wegwerfen und neu erzeugen: der Generator ergänzt nur Fehlendes und
// überschreibt nie (Einfrier-Regel, Begründung im Werkzeug-Kopf).
//
// Schlüssel ist \`<Global>:<id>\` — dasselbe Global, das GSEARCH_GROUPS.glob
// nennt. Damit findet der Neuigkeiten-Block seinen Wert über genau die
// Registry, die auch Suche und „Deine Sachen" bedient.
//
// NICHT zu verwechseln mit addedAt in data/skills.js: das meint die
// redaktionelle Entstehungszeit und reicht bis Oktober 2025 zurück — vor den
// ersten Commit dieses Repos.
//
// Stand: ${schluessel.length} Einträge auf ${tage.length} Tagen.
${verteilung}
//
// Dass sich viele Einträge einen Tag teilen, ist die Wahrheit und kein Fehler:
// sie kamen gemeinsam ins Repo. Deshalb gruppiert der Neuigkeiten-Block nach
// Tag statt nach Eintrag — eine eintragsweise Liste würde an einem Launch-Tag
// nur eine einzige Gattung zeigen.

const SEIT = {
${schluessel.map(k => `  ${JSON.stringify(k)}: ${JSON.stringify(neu[k])},`).join('\n')}
};
`;

fs.writeFileSync(ZIEL, inhalt);
console.log(`data/seit.js geschrieben: ${schluessel.length} Einträge (${uebernommen} übernommen, ${ermittelt} neu ermittelt), ${tage.length} Tage.`);
tage.forEach(t => console.log(`  ${t}  ${schluessel.filter(k => neu[k] === t).length}`));
