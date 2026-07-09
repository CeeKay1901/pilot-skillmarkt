#!/usr/bin/env node
// Führt einen ECHTEN webaudit-Lauf gegen das selbstgebaute Tool aus und
// schreibt demo/webaudit/report.html — alle Findings & Messwerte stammen aus
// dem tatsächlichen Browser-Lauf, inkl. echter Screenshots (eingebettet).
// Nutzung: PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright node demo/build-webaudit-report.mjs
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '/usr/lib/node_modules/playwright/index.mjs';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const PROJ = path.resolve(ROOT, '..');
const TARGET = 'file://' + path.join(PROJ, 'tkp-rechner.html');
const TARGET_NAME = 'tkp-rechner.html';

const srgb = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lum = ([r, g, b]) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
const parseRgb = s => (s.match(/\d+/g) || []).slice(0, 3).map(Number);
const contrast = (fg, bg) => { const a = lum(parseRgb(fg)), b = lum(parseRgb(bg)); const [hi, lo] = a > b ? [a, b] : [b, a]; return (hi + 0.05) / (lo + 0.05); };

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const consoleErrors = [];
page.on('pageerror', e => consoleErrors.push(e.message));
page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });

const t0 = Date.now();
await page.goto(TARGET, { waitUntil: 'networkidle' });
const loadMs = Date.now() - t0;

const facts = await page.evaluate(() => {
  const q = s => [...document.querySelectorAll(s)];
  const cs = el => getComputedStyle(el);
  const bgOf = el => { let n = el; while (n && n !== document.documentElement) { const b = cs(n).backgroundColor; if (b && b !== 'rgba(0, 0, 0, 0)' && b !== 'transparent') return b; n = n.parentElement; } return 'rgb(255,255,255)'; };
  const texts = q('p, span, label, h1, h2, div.foot, .pilot-tag').filter(e => e.textContent.trim().length > 3).slice(0, 40);
  return {
    title: document.title || '',
    metaDesc: document.querySelector('meta[name="description"]')?.content || '',
    viewport: !!document.querySelector('meta[name="viewport"]'),
    og: q('meta[property^="og:"]').length,
    h1: q('h1').length,
    headings: q('h1,h2,h3').map(h => h.tagName + ': ' + h.textContent.trim().slice(0, 40)),
    imgs: q('img').length,
    imgsNoAlt: q('img').filter(i => !i.getAttribute('alt')).length,
    inputs: q('input').length,
    inputsNoLabel: q('input').filter(i => !i.labels || i.labels.length === 0).filter(i => !i.getAttribute('aria-label')).length,
    lang: document.documentElement.lang || '',
    contrastSamples: texts.map(e => ({ tag: e.tagName.toLowerCase(), fg: cs(e).color, bg: bgOf(e), size: parseFloat(cs(e).fontSize), text: e.textContent.trim().slice(0, 30) })),
    linksTotal: q('a').length,
    linksNoHref: q('a').filter(a => !a.getAttribute('href')).length,
    extStyles: q('link[rel="stylesheet"]').map(l => l.href).filter(h => !h.startsWith('file:')),
  };
});

// Kontrast wirklich berechnen
const contrastFails = facts.contrastSamples
  .map(s => ({ ...s, ratio: contrast(s.fg, s.bg) }))
  .filter(s => s.ratio < (s.size >= 24 ? 3 : 4.5));

// echte Screenshots
const shotDesktop = (await page.screenshot({ fullPage: true })).toString('base64');
const ctxM = await browser.newContext({ viewport: { width: 390, height: 844 } });
const pageM = await ctxM.newPage();
await pageM.goto(TARGET, { waitUntil: 'networkidle' });
const shotMobile = (await pageM.screenshot({ fullPage: true })).toString('base64');

// funktionaler Test: rechnet das Tool korrekt?
await page.fill('#reach', '500000'); await page.fill('#tkp', '12'); await page.fill('#waste', '30');
await page.waitForTimeout(150);
const calc = await page.evaluate(() => ({ cost: document.getElementById('cost').textContent, ntkp: document.getElementById('ntkp').textContent }));
const calcOk = calc.cost.replace(/\s| /g, '').startsWith('6.000,00') && calc.ntkp.replace(/\s| /g, '').startsWith('17,14');
// Grenzfall: leere Eingabe
await page.fill('#reach', ''); await page.waitForTimeout(120);
const emptyCost = await page.evaluate(() => document.getElementById('cost').textContent);
const emptyOk = !/NaN/i.test(emptyCost);

await browser.close();

const fail = [], warn = [], pass = [];
facts.title ? pass.push(`\`<title>\` vorhanden: „${facts.title}" (${facts.title.length} Zeichen)`) : fail.push('Kein `<title>` gesetzt');
facts.metaDesc ? pass.push('Meta-Description vorhanden') : warn.push('Keine Meta-Description — schlechte Vorschau beim Teilen');
facts.og ? pass.push(`${facts.og} Open-Graph-Tags`) : warn.push('Keine Open-Graph-Tags — nackter Link in Slack/Teams');
facts.viewport ? pass.push('Viewport-Meta gesetzt (mobil skalierbar)') : fail.push('Kein Viewport-Meta — Seite skaliert mobil nicht');
facts.lang ? pass.push(`Sprache deklariert: \`lang="${facts.lang}"\``) : warn.push('Kein `lang`-Attribut am `<html>`');
if (facts.h1 === 1) pass.push('Genau eine `<h1>`');
else if (facts.h1 === 0) fail.push('Keine `<h1>` vorhanden');
else warn.push(facts.h1 + ' `<h1>`-Elemente — es sollte genau eine geben');
facts.imgsNoAlt ? fail.push(`${facts.imgsNoAlt} von ${facts.imgs} Bildern ohne \`alt\`-Text (WCAG 1.1.1)`) : pass.push(facts.imgs ? `Alle ${facts.imgs} Bilder haben alt-Text` : 'Keine Bilder auf der Seite');
facts.inputsNoLabel ? fail.push(`${facts.inputsNoLabel} von ${facts.inputs} Eingabefeldern ohne Label (WCAG 3.3.2)`) : pass.push(`Alle ${facts.inputs} Eingabefelder haben ein Label`);
facts.linksNoHref ? warn.push(`${facts.linksNoHref} Links ohne \`href\``) : pass.push(facts.linksTotal === 1 ? 'Der einzige Link hat ein Ziel' : `Alle ${facts.linksTotal} Links haben ein Ziel`);
contrastFails.length ? contrastFails.slice(0, 4).forEach(c => warn.push(`Kontrast ${c.ratio.toFixed(2)}:1 zu niedrig bei „${c.text}…" (${c.size}px, min. ${c.size >= 24 ? '3' : '4.5'}:1)`)) : pass.push(`Textkontrast: alle ${facts.contrastSamples.length} geprüften Elemente bestehen WCAG AA`);
consoleErrors.length ? fail.push(`${consoleErrors.length} JavaScript-Fehler in der Konsole`) : pass.push('Keine JavaScript-Fehler');
// Ladezeit ist umgebungsabhängig (Netz, Rechner) — sie steht als Messwert im Kopf, nicht als Bewertung.
// Bewertbar ist die Ursache: render-blockierende Stylesheets von fremden Servern.
facts.extStyles.length
  ? warn.push(`${facts.extStyles.length} render-blockierendes Stylesheet von einem fremden Server (\`${new URL(facts.extStyles[0]).host}\`) — verzögert die erste Anzeige und überträgt die IP der Nutzer:innen`)
  : pass.push('Keine externen, render-blockierenden Stylesheets');
calcOk ? pass.push('Funktionstest: 500.000 Reichweite × 12 € TKP → 6.000,00 € / Netto-TKP 17,14 € — korrekt') : fail.push('Funktionstest fehlgeschlagen: Berechnung stimmt nicht');
emptyOk ? pass.push('Grenzfall leere Eingabe: keine `NaN`-Ausgabe') : warn.push('Grenzfall leere Eingabe erzeugt `NaN` statt einer Meldung');

const score = Math.max(0, Math.round(100 - fail.length * 15 - warn.length * 5));
// Findings enthalten Text wie `<h1>` oder `<title>` — erst escapen, dann Backticks zu <code>
const escH = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const li = a => a.length ? a.map(x => `<li>${escH(x).replace(/`([^`]+)`/g, '<code>$1</code>')}</li>`).join('') : '<li class="none">keine</li>';

const html = `<!DOCTYPE html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>webaudit Report — ${TARGET_NAME}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{--black:#262626;--yellow:#ffe05e;--bg:#f1f1ec;--paper:#fbfbf7;--line:#e4e2d6;--gray:#66655d}
*{box-sizing:border-box;margin:0;padding:0}html{font-size:62.5%}
body{font-family:Inter,system-ui,sans-serif;background:var(--bg);color:var(--black);line-height:1.55;padding:4rem 2rem}
.wrap{max-width:92rem;margin:0 auto}
.badge{font-family:'JetBrains Mono',monospace;font-size:1.2rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gray)}
h1{font-size:4rem;font-weight:300;letter-spacing:-.02em;margin:.6rem 0 1rem}
h1 b{font-weight:600}
.meta{font-family:'JetBrains Mono',monospace;font-size:1.3rem;color:var(--gray);margin-bottom:2.4rem}
.score{display:flex;align-items:center;gap:2rem;background:var(--black);color:#fcfcfc;border-radius:1.6rem;padding:2.4rem 3rem;margin-bottom:3rem}
.score b{font-size:5.6rem;font-weight:700;color:var(--yellow);line-height:1}
.score span{font-size:1.5rem;color:rgba(252,252,252,.7)}
section{background:var(--paper);border:1px solid var(--line);border-radius:1.4rem;padding:2.4rem 2.8rem;margin-bottom:1.6rem}
h2{font-size:2rem;font-weight:700;margin-bottom:1.2rem}
ul{list-style:none;display:flex;flex-direction:column;gap:.8rem}
li{font-size:1.55rem;padding-left:2.4rem;position:relative}
li:before{position:absolute;left:0}
.fail li:before{content:'✗';color:#c0392b;font-weight:700}
.warn li:before{content:'⚠';color:#b3701e}
.pass li:before{content:'✓';color:#2d8a4e;font-weight:700}
li.none{opacity:.55;font-style:italic}li.none:before{content:'–';color:var(--gray)}
code{font-family:'JetBrains Mono',monospace;font-size:.9em;background:var(--bg);border:1px solid var(--line);border-radius:.4rem;padding:0 .4rem}
.shots{display:grid;grid-template-columns:2fr 1fr;gap:1.6rem}
@media(max-width:720px){.shots{grid-template-columns:1fr}}
.shot{border:1px solid var(--line);border-radius:1rem;overflow:hidden;background:#fff}
.shot img{display:block;width:100%}
.shot figcaption{font-family:'JetBrains Mono',monospace;font-size:1.2rem;color:var(--gray);padding:.8rem 1.2rem;border-top:1px solid var(--line)}
footer{font-size:1.3rem;color:var(--gray);margin-top:2.4rem;text-align:center}
footer a{color:var(--black)}
</style></head><body><div class="wrap">
<p class="badge">webaudit · echter Lauf</p>
<h1>Report — <b>${TARGET_NAME}</b></h1>
<p class="meta">Erzeugt am ${new Date().toISOString().slice(0, 10)} · Browser: Chromium (Playwright) · Ladezeit ${loadMs} ms · ${consoleErrors.length} Konsolenfehler</p>

<div class="score"><b>${score}</b><span>von 100<br>${fail.length} Fehler · ${warn.length} Warnungen · ${pass.length} bestanden</span></div>

<section class="fail"><h2>🔴 Kritisch (${fail.length})</h2><ul>${li(fail)}</ul></section>
<section class="warn"><h2>🟡 Empfehlung (${warn.length})</h2><ul>${li(warn)}</ul></section>
<section class="pass"><h2>🟢 Bestanden (${pass.length})</h2><ul>${li(pass)}</ul></section>

<section><h2>Screenshots (echt, aus dem Lauf)</h2><div class="shots">
<figure class="shot"><img alt="Desktop-Ansicht von ${TARGET_NAME}" src="data:image/png;base64,${shotDesktop}"><figcaption>Desktop · 1280×900</figcaption></figure>
<figure class="shot"><img alt="Mobile Ansicht von ${TARGET_NAME}" src="data:image/png;base64,${shotMobile}"><figcaption>Mobil · 390×844</figcaption></figure>
</div></section>

<section><h2>Struktur</h2><ul class="pass">${facts.headings.map(h => `<li>${escH(h)}</li>`).join('')}</ul></section>

<footer>Dieser Report wurde von <code>demo/build-webaudit-report.mjs</code> erzeugt — jeder Wert stammt aus dem tatsächlichen Browser-Lauf.<br><a href="../../index.html">← zurück zum Skill Marketplace</a></footer>
</div></body></html>`;

fs.mkdirSync(path.join(ROOT, 'webaudit'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'webaudit/report.html'), html);
console.log(`webaudit/report.html geschrieben — Score ${score}, ${fail.length} Fehler, ${warn.length} Warnungen, ${pass.length} bestanden`);
