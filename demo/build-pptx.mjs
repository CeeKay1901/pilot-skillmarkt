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

// Titelfolie
const t = pptx.addSlide();
t.background = { color: BLACK };
t.addText('pilot', { x: 0.6, y: 0.5, fontSize: 22, bold: true, color: WHITE });
t.addText('PITCH DECK', { x: 0.6, y: 0.85, fontSize: 10, color: YELLOW, charSpacing: 3 });
t.addText(titleLine, { x: 0.6, y: 2.0, w: 8.5, fontSize: 40, color: WHITE, bold: false });
t.addText('Erzeugt mit dem Skill pptx aus konzept.md', { x: 0.6, y: 4.4, fontSize: 12, color: GRAY });
t.addNotes('Titelfolie. Erzeugt aus dem Konzept-Markdown durch den pptx-Skill.');

slides.forEach((s, i) => {
  const sl = pptx.addSlide();
  sl.background = { color: WHITE };
  sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.12, h: 5.63, fill: { color: YELLOW } });
  sl.addText(String(i + 1).padStart(2, '0'), { x: 8.8, y: 0.35, fontSize: 11, color: GRAY });
  sl.addText(s.title, { x: 0.6, y: 0.5, w: 8.0, fontSize: 28, bold: true, color: BLACK });
  if (s.bullets.length) {
    sl.addText(s.bullets.map(b => ({ text: b, options: { bullet: { code: '2022' }, breakLine: true } })),
      { x: 0.7, y: 1.5, w: 8.2, h: 3.4, fontSize: 16, color: '3A3A36', lineSpacingMultiple: 1.3 });
  }
  if (s.note) sl.addNotes(s.note);
});

const out = path.join(ROOT, 'pptx/pitch-deck.pptx');
await pptx.writeFile({ fileName: out });
console.log(`pptx/pitch-deck.pptx geschrieben — ${slides.length + 1} Folien aus ${path.basename(SRC)}`);
