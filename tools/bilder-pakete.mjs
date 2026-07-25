#!/usr/bin/env node
/* tools/bilder-pakete.mjs — hält BILDER und PAKETE an der Platte fest.
 *
 * Warum es das gibt: beide Sammlungen behaupten Dinge über Dateien, die daneben
 * liegen — Pfade, Byte-Größen, Bildmaße, Paketinhalte. Solche Angaben sind
 * genau die Sorte, die still falsch wird: die Datei zieht um oder wird neu
 * exportiert, die Zahl in data/*.js bleibt stehen, und die Seite zeigt weiter
 * „1,2 MB", während der Download 400 KB bringt. Kein Test bemerkt das, weil
 * die Seite ja anzeigt, was in den Daten steht — sie ist in sich stimmig und
 * trotzdem falsch.
 *
 * Geprüft wird ausschließlich Daten gegen Platte, nie Daten gegen Daten:
 *   (1) jeder Pfad in BILDER (datei, vorschau) existiert
 *   (2) bytes == echte Dateigröße
 *   (3) breite/hoehe == echte Pixelmaße (WebP und SVG, ohne Fremdbibliothek)
 *   (4) BILDER_STATS ist aus BILDER nachgerechnet, nicht danebengeschrieben
 *   (5) jede Datei jedes Pakets existiert
 *   (6) jede url() in einer Paket-CSS zeigt auf eine vorhandene Datei
 *       — das ist die Packliste des ZIP-Downloads
 *   (7) jeder Verweis eines Pakets trägt typ, id UND name
 *       (e9:04 verbietet vorlagen.html das Laden fremder Sammlungen; ohne
 *        eigenen Anzeigenamen müsste die Seite ihn dort holen)
 *
 * Aufruf:  node tools/bilder-pakete.mjs --pruefen
 * Exit 1, sobald etwas nicht stimmt — damit taugt es für einen Vor-Push-Lauf.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const WURZEL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = p => path.join(WURZEL, p);

/* Die Datendateien sind klassische Scripts mit globalen Konstanten (kein Build-
   Step, harte Regel 1). Sie werden deshalb als Funktionskörper ausgewertet,
   nicht importiert. */
function laden(datei, namen) {
  const quelle = fs.readFileSync(P('data/' + datei), 'utf8');
  const rueck = '{' + namen.map(n => `${n}: typeof ${n} !== 'undefined' ? ${n} : null`).join(',') + '}';
  return new Function(quelle + ';return ' + rueck)();
}

const fehler = [];
const meckern = (was, text) => fehler.push(`${was}: ${text}`);

const { BILDER, BILDER_STATS } = laden('bilder.js', ['BILDER', 'BILDER_STATS']);
const { PAKETE, PAKETE_STATS } = laden('pakete.js', ['PAKETE', 'PAKETE_STATS']);

/* ---------- Pixelmaße ohne Fremdbibliothek ----------
   WebP: RIFF-Container. Drei Varianten, alle im Bestand möglich, je nachdem
   womit exportiert wurde — deshalb werden alle drei gelesen statt nur die
   bequemste. Maße sind bei VP8/VP8L um 1 versetzt gespeichert (0 = 1 Pixel).
   SVG: es zählt das width/height-Attribut, ersatzweise die viewBox. */
function masse(abs) {
  const b = fs.readFileSync(abs);
  if (abs.endsWith('.svg')) {
    const t = b.toString('utf8').slice(0, 2000);
    const w = t.match(/\bwidth\s*=\s*"([\d.]+)/);
    const h = t.match(/\bheight\s*=\s*"([\d.]+)/);
    if (w && h) return { breite: Math.round(+w[1]), hoehe: Math.round(+h[1]) };
    const vb = t.match(/viewBox\s*=\s*"[\d.\-]+\s+[\d.\-]+\s+([\d.]+)\s+([\d.]+)/);
    return vb ? { breite: Math.round(+vb[1]), hoehe: Math.round(+vb[2]) } : null;
  }
  if (b.length < 30 || b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') return null;
  const art = b.toString('ascii', 12, 16);
  if (art === 'VP8X') return { breite: (b.readUIntLE(24, 3) & 0xffffff) + 1, hoehe: (b.readUIntLE(27, 3) & 0xffffff) + 1 };
  if (art === 'VP8L') {
    const v = b.readUInt32LE(21);
    return { breite: (v & 0x3fff) + 1, hoehe: ((v >> 14) & 0x3fff) + 1 };
  }
  if (art === 'VP8 ') return { breite: b.readUInt16LE(26) & 0x3fff, hoehe: b.readUInt16LE(28) & 0x3fff };
  return null;
}

// ---------- (1)(2)(3) BILDER gegen die Platte ----------
let pfade = 0, gemessen = 0;
for (const b of BILDER) {
  for (const feld of ['datei', 'vorschau']) {
    const rel = b[feld];
    if (!rel) { meckern(b.id, `Feld ${feld} fehlt`); continue; }
    pfade++;
    if (!fs.existsSync(P(rel))) { meckern(b.id, `${feld} zeigt ins Leere: ${rel}`); continue; }
    /* Die Byte-Angabe gehört zur GROSSEN Datei — die Vorschau hat ihre eigene
       Größe, die nirgends behauptet wird und deshalb auch nicht geprüft wird. */
    if (feld === 'datei' && typeof b.bytes === 'number') {
      const echt = fs.statSync(P(rel)).size;
      if (echt !== b.bytes) meckern(b.id, `bytes ${b.bytes}, Datei hat ${echt}`);
    }
    if (feld === 'datei' && typeof b.breite === 'number') {
      const m = masse(P(rel));
      if (!m) meckern(b.id, `Maße nicht lesbar aus ${rel}`);
      else {
        gemessen++;
        if (m.breite !== b.breite || m.hoehe !== b.hoehe) {
          meckern(b.id, `breite/hoehe ${b.breite}×${b.hoehe}, Datei ist ${m.breite}×${m.hoehe}`);
        }
      }
    }
  }
  if (!b.lizenz) meckern(b.id, 'keine Lizenz');
  if (!b.urheber) meckern(b.id, 'kein Urheber');
}

// ---------- (4) BILDER_STATS nachrechnen ----------
/* Nachgerechnet statt geglaubt: BILDER_STATS steht in derselben Datei wie
   BILDER und driftet deshalb genauso leicht wie ein Satz Fließtext. Was die
   Seite anzeigt, muss aus BILDER folgen. */
const soll = {
  total: BILDER.length,
  webp: BILDER.filter(b => b.datei.endsWith('.webp')).length,
  svg: BILDER.filter(b => b.datei.endsWith('.svg')).length,
  querformat: BILDER.filter(b => b.breite > b.hoehe).length,
  hochformat: BILDER.filter(b => b.breite < b.hoehe).length,
  quadratisch: BILDER.filter(b => b.breite === b.hoehe).length,
  mitQuelle: BILDER.filter(b => !!b.quelle).length,
  lizenzen: new Set(BILDER.map(b => b.lizenz)).size,
  urheber: new Set(BILDER.map(b => b.urheber)).size,
  schlagworte: new Set(BILDER.flatMap(b => b.tags || [])).size,
  gesamtBytes: BILDER.reduce((s, b) => s + (b.bytes || 0), 0),
  groessteKante: Math.max(...BILDER.map(b => Math.max(b.breite, b.hoehe))),
};
for (const k of Object.keys(soll)) {
  if (!(k in BILDER_STATS)) { meckern('BILDER_STATS', `${k} fehlt`); continue; }
  if (BILDER_STATS[k] !== soll[k]) meckern('BILDER_STATS', `${k} = ${BILDER_STATS[k]}, gerechnet ${soll[k]}`);
}

// ---------- (5)(6)(7) PAKETE ----------
let paketDateien = 0, cssVerweise = 0;
for (const p of PAKETE) {
  /* `dateien[]` trägt bereits den vollen repo-relativen Pfad — `ordner` ist die
     gemeinsame Wurzel für die Anzeige und den ZIP-Namen, kein Präfix, das hier
     noch davorgehörte. Der erste Wurf dieser Datei hat beide zusammengesetzt
     und fünfmal „Paketdatei fehlt" gemeldet, obwohl alle fünf da waren. */
  for (const rel of (p.dateien || [])) {
    paketDateien++;
    if (!fs.existsSync(P(rel))) { meckern(p.id, `Paketdatei fehlt: ${rel}`); continue; }
    /* Die ZIP-Packliste der Schriften wird zur Laufzeit aus den url()-Angaben
       der Paket-CSS gelesen — nicht aus ASSETS. Grund: ASSETS führt den
       Kursiv-Schnitt gar nicht als eigenen Eintrag, ein aus ASSETS gepacktes
       Paket bekäme also eine @font-face-Regel, die ins Leere zeigt. Damit ist
       die CSS die Wahrheit, und deshalb wird SIE hier geprüft.
       ACHTUNG bei der Auflösung: die url()-Angaben sind für das AUSGEPACKTE
       Paket geschrieben, nicht für den Repo-Ort der CSS. Beim Packen fliegt der
       `ordner`-Präfix weg (vorlagen.html:2968), die Schriften kommen als
       `assets/fonts/…` dazu — im ZIP steht schriften.css also auf Wurzelhöhe und
       url('assets/fonts/x.woff2') zeigt auf den ZIP-Nachbarn. Im Repo ist die
       Quelle derselbe repo-relative Pfad. Wer hier stattdessen gegen den
       Repo-Ort der CSS auflöst, sucht pakete/design-system/assets/fonts/ und
       meldet drei Dateien als fehlend, die es gibt — der erste Wurf tat genau
       das. */
    if (rel.endsWith('.css')) {
      const imZip = (p.ordner && rel.indexOf(p.ordner) === 0) ? rel.slice(p.ordner.length) : rel;
      for (const m of fs.readFileSync(P(rel), 'utf8').matchAll(/url\(\s*['"]?([^'")]+)/g)) {
        const u = m[1];
        if (/^(data:|https?:)/.test(u)) continue;
        cssVerweise++;
        const kandidat = path.posix.normalize(path.posix.join(path.posix.dirname(imZip), u));
        if (!fs.existsSync(P(kandidat))) meckern(p.id, `url() in ${imZip} zeigt ins Leere: ${u} (gesucht: ${kandidat})`);
      }
    }
  }
  for (const v of (p.verweise || [])) {
    if (!v.typ || !v.id || !v.name) meckern(p.id, `Verweis unvollständig: ${JSON.stringify(v)}`);
  }
}
if (PAKETE_STATS && PAKETE_STATS.total !== PAKETE.length) {
  meckern('PAKETE_STATS', `total = ${PAKETE_STATS.total}, PAKETE hat ${PAKETE.length}`);
}
if (cssVerweise === 0) {
  /* Kein url() gefunden heißt: entweder trägt kein Paket eine CSS, oder der
     Ausdruck oben trifft nicht mehr. Beides soll auffallen, statt als „0
     Befunde" durchzugehen — dieselbe Falle, gegen die diese Datei geschrieben ist. */
  meckern('Packliste', 'keine einzige url()-Angabe in den Paket-CSS gefunden — Ausdruck prüfen');
}

// ---------- Bericht ----------
const zusammenfassung = `bilder-pakete: ${BILDER.length} Bilder (${pfade} Pfade, ${gemessen} Dateien nachgemessen), `
  + `${PAKETE.length} Paket(e) mit ${paketDateien} Dateien und ${cssVerweise} CSS-Verweisen.`;
if (fehler.length) {
  console.error(zusammenfassung);
  for (const f of fehler) console.error('  ROT  ' + f);
  console.error(`\n==== ${fehler.length} Befund(e) ====`);
  process.exit(1);
}
console.log(zusammenfassung + ' Alles deckt sich mit der Platte.');
