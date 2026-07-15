#!/usr/bin/env node
// Baut demo/pptx/preview.html — NICHT aus dem Konzept, sondern aus der echten
// pitch-deck.pptx: die OOXML-Datei wird entpackt, Folien- und Notizen-XML
// geparst. Was die Vorschau zeigt, steckt beweisbar in der .pptx.
// Nutzung: node demo/build-pptx-preview.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const PPTX = path.join(ROOT, 'pptx/pitch-deck.pptx');

const unzip = entry => {
  try { return execFileSync('unzip', ['-p', PPTX, entry], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }); }
  catch { return null; }
};
const unent = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Ein Shape = <p:sp>…</p:sp>; Platzhaltertyp, Schriftgröße + Absätze (Runs je Absatz gejoint).
// pptxgenjs setzt keine Titel-Platzhalter — der Titel ist das Shape mit der größten sz.
function shapes(xml) {
  return [...xml.matchAll(/<p:sp>[\s\S]*?<\/p:sp>/g)].map(m => {
    const sp = m[0];
    const type = sp.match(/<p:ph[^>]*type="([^"]+)"/)?.[1] || (sp.includes('<p:ph') ? 'body' : '');
    const sz = Number(sp.match(/sz="(\d+)"/)?.[1] || 0);
    const paras = [...sp.matchAll(/<a:p>([\s\S]*?)<\/a:p>/g)]
      .map(p => [...p[1].matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)].map(r => unent(r[1])).join(''))
      .filter(t => t.trim());
    return { type, sz, paras };
  }).filter(s => s.paras.length);
}

const slides = [];
for (let n = 1; n <= 40; n++) {
  const xml = unzip(`ppt/slides/slide${n}.xml`);
  if (!xml) break;
  const sh = shapes(xml).filter(s => !/sldNum|dt|ftr/i.test(s.type));
  const titleShape = sh.find(s => /title/i.test(s.type)) || sh.reduce((a, b) => (b.sz > (a?.sz || 0) ? b : a), null);
  const title = titleShape?.paras.join(' ') || `Folie ${n}`;
  // kurze Texte in kleiner Schrift = Beiwerk (Eyebrow, Seitenzähler) — nie Body.
  // Als Kicker bevorzugt die Eyebrow (nicht der „01 / 06"-Zähler).
  const smalls = sh.filter(s => s !== titleShape && s.sz && s.sz < titleShape.sz * 0.55 && s.paras.join(' ').length <= 26);
  const kicker = (smalls.find(s => !/\d\s*\/\s*\d/.test(s.paras.join(' '))) || smalls[0])?.paras.join(' ') || '';
  const body = sh.filter(s => s !== titleShape && !smalls.includes(s)).flatMap(s => s.paras);
  const notesXml = unzip(`ppt/notesSlides/notesSlide${n}.xml`);
  const notes = notesXml
    ? shapes(notesXml).filter(s => !/sldNum|dt|ftr/i.test(s.type)).flatMap(s => s.paras).filter(p => !/^\d+$/.test(p))
    : [];
  slides.push({ n, title, kicker, body, notes });
}
if (!slides.length) { console.error('Keine Folien in ' + PPTX + ' gefunden'); process.exit(1); }

// Zahlen fett hervorheben — Spiegel der Run-Formatierung in der .pptx
const boldNums = s => s.replace(/([+−-]?\d[\d.,]*\s?(?:%|€)?)/g, '<b class="n">$1</b>');

const bytes = fs.statSync(PPTX).size;
const card = s => `
<article class="slide-wrap">
  <div class="slide">
    <span class="num">${s.n}</span>
    ${s.kicker ? '<p class="kicker">' + esc(s.kicker) + '</p>' : ''}
    <h2>${esc(s.title)}</h2>
    ${s.body.length ? '<ul>' + s.body.map(b => '<li>' + boldNums(esc(b)) + '</li>').join('') + '</ul>' : ''}
  </div>
  ${s.notes.length ? '<div class="notes"><b>Sprechernotiz</b>' + s.notes.map(t => '<p>' + esc(t) + '</p>').join('') + '</div>' : ''}
</article>`;

const html = `<!DOCTYPE html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Folien-Vorschau — pitch-deck.pptx</title>
<meta name="description" content="Vorschau der echten pitch-deck.pptx, extrahiert aus der OOXML-Datei selbst.">
<style>
@font-face{font-family:'Inter';src:url('../../assets/fonts/inter-variable.woff2') format('woff2-variations');font-weight:100 900;font-style:normal;font-display:swap}
@font-face{font-family:'JetBrains Mono';src:url('../../assets/fonts/jetbrains-mono-variable.woff2') format('woff2-variations');font-weight:100 800;font-style:normal;font-display:swap}
:root{--black:#262626;--yellow:#ffe05e;--bg:#eeede5;--paper:#fbfbf7;--line:#e4e2d6;--gray:#66655d}
*{box-sizing:border-box;margin:0;padding:0}html{font-size:62.5%}
body{font-family:Inter,system-ui,sans-serif;background:var(--bg);color:var(--black);line-height:1.55;padding:4rem 2rem}
.wrap{max-width:86rem;margin:0 auto}
.badge{font-family:'JetBrains Mono',monospace;font-size:1.2rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gray);display:flex;align-items:center;gap:.8rem}
.badge::before{content:'';width:.8rem;height:.8rem;border-radius:50%;background:#2d8a4e}
h1{font-size:3.6rem;font-weight:300;letter-spacing:-.02em;margin:.8rem 0 .6rem}
h1 b{font-weight:600}
.lead{font-size:1.6rem;color:var(--gray);max-width:64rem;margin-bottom:1.2rem}
.lead code{font-family:'JetBrains Mono',monospace;font-size:.9em;background:var(--paper);border:1px solid var(--line);border-radius:.4rem;padding:.1rem .5rem}
.actions{display:flex;gap:.8rem;margin:1.6rem 0 3.2rem;flex-wrap:wrap}
.btn{font-family:'JetBrains Mono',monospace;font-size:1.3rem;text-decoration:none;padding:.9rem 1.8rem;border-radius:3rem;border:1px solid var(--line);color:var(--black);background:var(--paper)}
.btn:hover{background:var(--yellow);border-color:var(--yellow)}
.btn-p{background:var(--black);color:#fcfcfc;border-color:var(--black)}
.slide-wrap{margin-bottom:2.8rem}
.slide{position:relative;aspect-ratio:16/9;background:var(--paper);border:1px solid var(--line);border-radius:1.2rem;padding:4rem 4.4rem;display:flex;flex-direction:column;justify-content:center;box-shadow:0 10px 30px -14px rgba(38,38,38,.18);overflow:hidden}
.slide::before{content:'';position:absolute;inset:0 auto 0 0;width:.8rem;background:var(--yellow)}
.kicker{font-family:'JetBrains Mono',monospace;font-size:1.25rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gray);margin-bottom:.8rem}
.num{position:absolute;top:1.6rem;right:2rem;font-family:'JetBrains Mono',monospace;font-size:1.3rem;color:var(--gray)}
.slide h2{font-size:clamp(2rem,3.4vw,3rem);font-weight:700;letter-spacing:-.01em;margin-bottom:1.4rem}
.slide ul{list-style:none;display:flex;flex-direction:column;gap:.8rem}
.slide li{font-size:clamp(1.4rem,1.9vw,1.7rem);padding-left:2rem;position:relative}
.slide li::before{content:'—';position:absolute;left:0;color:var(--gray)}
.slide li b.n{font-weight:750;background:linear-gradient(transparent 68%,var(--yellow) 68%);padding:0 .15rem}
.notes{background:#fff;border:1px dashed var(--line);border-radius:0 0 1rem 1rem;margin:0 1.6rem;padding:1.2rem 1.8rem}
.notes b{font-family:'JetBrains Mono',monospace;font-size:1.1rem;letter-spacing:.1em;text-transform:uppercase;color:var(--gray);display:block;margin-bottom:.4rem}
.notes p{font-size:1.45rem;color:#4a4942}
footer{text-align:center;font-size:1.3rem;color:var(--gray);margin-top:3rem}
footer a{color:var(--black)}
@media(max-width:620px){.slide{padding:2.4rem 2rem;aspect-ratio:auto}body{padding:2rem 1rem}}
</style></head><body><div class="wrap">
<p class="badge">Extrahiert aus der echten Datei</p>
<h1>Folien-Vorschau — <b>pitch-deck.pptx</b></h1>
<p class="lead">Diese Vorschau ist keine Nacherzählung: <code>build-pptx-preview.mjs</code> entpackt die
<code>.pptx</code> (${(bytes / 1024).toFixed(0)} KB OOXML) und liest Titel, Inhalte und Sprechernotizen
direkt aus dem Folien-XML. ${slides.length} Folien, ${slides.filter(s => s.notes.length).length} mit Notizen.</p>
<div class="actions">
<a class="btn btn-p" href="pitch-deck.pptx" download>⬇ pitch-deck.pptx herunterladen</a>
<a class="btn" href="../viewer.html?f=pptx/konzept.md">Quell-Konzept ansehen</a>
</div>
${slides.map(card).join('\n')}
<footer>Erzeugt von <code style="font-family:'JetBrains Mono',monospace">demo/build-pptx-preview.mjs</code> — direkt aus der .pptx, nicht aus dem Konzept.<br><a href="../skills.html">← zurück zum Katalog</a></footer>
</div></body></html>`;

fs.writeFileSync(path.join(ROOT, 'pptx/preview.html'), html);
console.log(`pptx/preview.html geschrieben — ${slides.length} Folien, ${slides.filter(s => s.notes.length).length} Notizen, Quelle ${(bytes / 1024).toFixed(0)} KB`);
