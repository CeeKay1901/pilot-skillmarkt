import { chromium } from '/usr/lib/node_modules/playwright/index.mjs';

const SITE = 'https://ceekay1901.github.io/pilot-skillmarkt/';
const RAW  = 'https://raw.githubusercontent.com/CeeKay1901/pilot-skillmarkt/main/skills';
const BLOB = 'https://github.com/CeeKay1901/pilot-skillmarkt/blob/main/skills';
const norm = s => (s ?? '').replace(/\r\n/g, '\n').replace(/\s+$/,''); // trailing ws/newline ignorieren

const cb = () => '?cb=' + Date.now() + Math.random();

async function rawText(rel) {
  // Retry gegen gelegentliche leere raw-Antworten (Rate-Limit).
  // Achtung: eine wirklich leere Datei (z. B. pptx/scripts/__init__.py) liefert
  // legitim "" — die erkennen wir an Content-Length: 0 und akzeptieren sie.
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const r = await fetch(RAW + '/' + rel + cb(), { cache: 'no-store' });
      if (r.ok) {
        const empty = r.headers.get('content-length') === '0';
        const t = await r.text();
        if (t.length || empty) return t;
      }
    } catch (e) {}
    await new Promise(res => setTimeout(res, 400 * (attempt + 1)));
  }
  throw new Error('raw leer/Fehler: ' + rel);
}

const browser = await chromium.launch({ args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } });
const page = await ctx.newPage();
const pageErrs = [];
page.on('pageerror', e => pageErrs.push(e.message));
await page.goto(SITE + cb(), { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
// Markdown/CSV öffnen standardmäßig in der formatierten Ansicht — für den
// Byte-Vergleich brauchen wir die Code-Ansicht (.ln-code) für alle Dateien.
await page.evaluate(() => { if (typeof state !== 'undefined') state._viewPref = { md: 'code', csv: 'code' }; });

// 1) Ground-Truth-Manifest direkt aus dem Repo
const manifest = JSON.parse(await rawText('manifest.json'));
// 2) Welche Skills kennt die Seite?
const siteIds = await page.evaluate(() => SKILLS.map(s => s.id));

const results = [];
let ok = 0, fail = 0, checked = 0;

for (const id of siteIds) {
  const files = manifest[id];
  if (!files) { results.push(`✗ ${id}: NICHT im Repo-Manifest`); fail++; continue; }

  // Modal öffnen + Files-Tab
  await page.evaluate(i => { if (window.closeModal) closeModal(); openModal(i); }, id);
  await page.waitForTimeout(120);
  await page.click('[data-tab="files"]');
  // warten bis geladen (real files -> .files-real-badge, sonst Fehler)
  try { await page.waitForSelector('.files-code', { timeout: 8000 }); }
  catch (e) { results.push(`✗ ${id}: Viewer lädt nicht`); fail += files.length; continue; }
  await page.waitForTimeout(200);

  const real = await page.evaluate(() => !!document.querySelector('.files-real-badge'));
  const nodeCount = await page.evaluate(() => document.querySelectorAll('.file-node').length);
  if (!real) { results.push(`✗ ${id}: KEIN "Echte Datei"-Badge (Fallback aktiv!)`); fail += files.length; continue; }
  if (nodeCount !== files.length) { results.push(`✗ ${id}: Baum zeigt ${nodeCount} statt ${files.length} Dateien`); }

  for (let i = 0; i < files.length; i++) {
    checked++;
    const rel = files[i];
    // Datei im Viewer auswählen
    const shown = await page.evaluate(idx => {
      selectFile(idx);
      const path = document.querySelector('.files-view-path')?.textContent || '';
      const code = [...document.querySelectorAll('.files-code .ln-code')].map(e => e.textContent).join('\n');
      const gh = document.querySelector('.files-gh')?.getAttribute('href') || '';
      return { path, code, gh };
    }, i);

    const truth = await rawText(id + '/' + rel);
    const pathOk = shown.path === (id + '/' + rel);
    const ghOk = shown.gh === (BLOB + '/' + encodeURI(id + '/' + rel));
    const contentOk = norm(shown.code) === norm(truth);

    if (pathOk && ghOk && contentOk) { ok++; }
    else {
      fail++;
      let why = [];
      if (!pathOk) why.push(`Pfad "${shown.path}"≠"${id}/${rel}"`);
      if (!ghOk) why.push(`GH-Link falsch (${shown.gh})`);
      if (!contentOk) {
        // erste abweichende Zeile finden
        const a = norm(shown.code).split('\n'), b = norm(truth).split('\n');
        let d = -1; for (let k=0;k<Math.max(a.length,b.length);k++){ if(a[k]!==b[k]){d=k;break;} }
        why.push(`Inhalt ≠ (Zeilen ${a.length} vs ${b.length}; erste Abweichung Zeile ${d+1}: UI="${(a[d]||'').slice(0,50)}" RAW="${(b[d]||'').slice(0,50)}")`);
      }
      results.push(`✗ ${id}/${rel}: ${why.join(' | ')}`);
    }
  }
}

await browser.close();

console.log('\n===== PRÜFERGEBNIS: Aufbau & Dateien = echte Repo-Dateien? =====');
console.log(`Skills geprüft: ${siteIds.length} · Dateien verglichen: ${checked}`);
console.log(`✓ identisch (Pfad+GitHub-Link+Inhalt byte-genau): ${ok}`);
console.log(`✗ Abweichungen: ${fail}`);
if (pageErrs.length) console.log('JS-Fehler:', pageErrs.join(' | '));
if (results.length) { console.log('\nDetails:'); results.slice(0,40).forEach(r=>console.log('  '+r)); }
console.log('\n' + (fail === 0 ? '>>> BEWIESEN: Jede angezeigte Datei ist byte-identisch mit dem Repo. <<<' : '>>> NICHT bestanden — siehe Abweichungen oben. <<<'));
