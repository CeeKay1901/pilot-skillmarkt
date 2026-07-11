#!/usr/bin/env node
// Erzeugt ein ECHTES .pptx aus demo/pptx/konzept.md (wie der pptx-Skill es täte).
// Voraussetzung: npm i pptxgenjs   (Dev-Abhängigkeit, nicht Teil des Repos)
// Nutzung: node demo/build-pptx.mjs [pfad/zu/pptxgenjs]
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const LIB = process.argv[2] || '/tmp/pptxgen/node_modules/pptxgenjs';
const { default: PptxGenJS } = await import(LIB + '/dist/pptxgen.es.js').catch(() => import(LIB));

const SRC = path.join(ROOT, 'pptx/konzept.md');
const md = fs.readFileSync(SRC, 'utf8');

// --- Konzept parsen: "## Titel" + Bullets + "> Sprechernotiz"
const slides = [];
let cur = null;
for (const line of md.split('\n')) {
  const h = line.match(/^##\s+(.*)$/);
  const b = line.match(/^[-*]\s+(.*)$/);
  const n = line.match(/^>\s+(.*)$/);
  if (h) { cur = { title: h[1].trim(), bullets: [], note: '' }; slides.push(cur); }
  else if (b && cur) cur.bullets.push(b[1].trim());
  else if (n && cur) cur.note += (cur.note ? ' ' : '') + n[1].trim();
}
const titleLine = (md.match(/^#\s+(.*)$/m) || [, 'Pitch Deck'])[1];

const BLACK = '262626', YELLOW = 'FFE05E', WHITE = 'FCFCFC', GRAY = '8A897F';
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'pilot Skill Marketplace';
pptx.title = titleLine;

// Zahlen/Einheiten als fette Runs — der Blick springt auf die Belege
const NUM_RE = /([+−-]?\d[\d.,]*\s?(?:%|€)?)/g;
function numRuns(text, baseColor, numColor) {
  const runs = []; let last = 0;
  for (const m of text.matchAll(NUM_RE)) {
    if (m.index > last) runs.push({ text: text.slice(last, m.index), options: { color: baseColor } });
    runs.push({ text: m[1], options: { bold: true, color: numColor } });
    last = m.index + m[1].length;
  }
  if (last < text.length) runs.push({ text: text.slice(last), options: { color: baseColor } });
  return runs.length ? runs : [{ text, options: { color: baseColor } }];
}

// Titelfolie: dunkel, gelbe Regel, Kontextzeile
const t = pptx.addSlide();
t.background = { color: BLACK };
t.addText('pilot', { x: 0.6, y: 0.5, fontSize: 22, bold: true, color: WHITE });
t.addText('PITCH DECK · HERBST 2026', { x: 0.6, y: 0.88, fontSize: 10, color: YELLOW, charSpacing: 3 });
t.addShape(pptx.ShapeType.rect, { x: 0.62, y: 1.85, w: 1.4, h: 0.07, fill: { color: YELLOW } });
t.addText(titleLine, { x: 0.6, y: 2.05, w: 8.6, fontSize: 38, color: WHITE, bold: true });
t.addText('Mediastrategie & Kreation — pilot Hamburg · Kick-off KW 34', { x: 0.6, y: 3.45, fontSize: 14, color: 'C9C8BE' });
t.addText('Erzeugt mit dem Skill pptx aus konzept.md', { x: 0.6, y: 4.9, fontSize: 11, color: GRAY });
t.addNotes('Titelfolie. Erzeugt aus dem Konzept-Markdown durch den pptx-Skill.');

slides.forEach((s, i) => {
  const isLast = i === slides.length - 1; // Schlussfolie: dunkel, CTA-Charakter
  const sl = pptx.addSlide();
  sl.background = { color: isLast ? BLACK : WHITE };
  sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.12, h: 5.63, fill: { color: YELLOW } });
  sl.addText(`${String(i + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`,
    { x: 8.55, y: 0.35, w: 1.1, fontSize: 11, color: GRAY, align: 'right' });
  sl.addText('PILOT · MUSTERMARKE', { x: 0.6, y: 0.42, fontSize: 9.5, color: isLast ? YELLOW : GRAY, charSpacing: 2.5 });
  sl.addText(s.title, { x: 0.6, y: 0.78, w: 8.0, fontSize: 28, bold: true, color: isLast ? WHITE : BLACK });
  if (s.bullets.length) {
    const base = isLast ? 'D8D8D2' : '3A3A36';
    const num  = isLast ? YELLOW : BLACK;
    const paras = s.bullets.flatMap(b => {
      const runs = numRuns(b, base, num);
      runs[0] = { ...runs[0], options: { ...runs[0].options, bullet: { code: '2022', indent: 14 } } };
      runs[runs.length - 1] = { ...runs.at(-1), options: { ...runs.at(-1).options, breakLine: true } };
      return runs;
    });
    sl.addText(paras, { x: 0.7, y: 1.8, w: 8.4, h: 3.2, fontSize: 17, lineSpacingMultiple: 1.35 });
  }
  if (s.note) sl.addNotes(s.note);
});

const out = path.join(ROOT, 'pptx/pitch-deck.pptx');
await pptx.writeFile({ fileName: out });
console.log(`pptx/pitch-deck.pptx geschrieben — ${slides.length + 1} Folien aus ${path.basename(SRC)}`);
