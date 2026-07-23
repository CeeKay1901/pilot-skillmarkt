#!/usr/bin/env node
/**
 * E10-Messlatte — „Lernen & Hilfe“ (gemergter Bereich lernen-hilfe.html) + Verdrahtung.
 *
 * Prüft die Welle-B-Verdrahtung (base.js Nav-Merge, index-Merge-Karte, Redirect-Stubs,
 * Deep-Links, Vote-Typen) sowie die Grundfunktion der gemergten Seite:
 *   01 · Nav zeigt „Lernen & Hilfe“ (id nav-hilfe → lernen-hilfe.html), nav-lernen weg (index/skills/prompts).
 *   02 · Footer-Link footer-hilfe → lernen-hilfe.html.
 *   03 · Sticky-Sub-Nav (pillar-nav) mit 4 Ankern Ressourcen/Befehle/Glossar/FAQ + reale Zähler.
 *   04 · Deep-Links ?befehl / ?begriff / ?faq / ?r → kanonische Hash-Form.
 *   05 · Redirect-Stubs hilfe.html?befehl=… / lernen.html?r=… erhalten die Query-Parameter.
 *   06 · Drei Vote-Typen koexistieren typisiert (vote:ressource / :befehl / :begriff).
 *   07 · index-Merge-Karte: EINE „Lernen & Hilfe“-Karte, reale Summe, keine alten IDs, „sechs Bereiche“.
 *   08 · Globale Suche liefert Befehl-/Ressource-Treffer mit href lernen-hilfe.html?…
 *   09 · 0 JS-Fehler über den Flow.
 *
 * Aufruf:
 *   PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright node tests/e10-lernenhilfe.cjs [URL]
 *   Default-URL: http://localhost:8401/lernen-hilfe.html  (HTTP-Server nötig, kein file://)
 * Ausgabe: strukturiertes JSON. Exit 0 = alle grün, 1 = ein Check rot.
 */
const { chromium } = require('/usr/lib/node_modules/playwright');

// E11-Soll: Suite akzeptiert jetzt auch eine Basis-URL (Runner ruft alle Suiten
// mit der Origin auf) und ergänzt dann selbst lernen-hilfe.html.
const ARG = process.argv[2] || 'http://localhost:8401/lernen-hilfe.html';
const TARGET = /\.html/.test(ARG) ? ARG : new URL('lernen-hilfe.html', ARG).href;
const BASE = TARGET.replace(/lernen-hilfe\.html.*$/, '');

function isBlockedResourceError(t) {
  return /Failed to load resource|net::ERR_FAILED|net::ERR_BLOCKED|raw\.githubusercontent\.com|github\.com/i.test(t);
}

async function run() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
  const checks = {};
  const jsErrors = [];
  const check = (id, pass, info) => { checks[id] = { pass: !!pass, info }; };
  const trackErrors = page => {
    page.on('console', m => { if (m.type() === 'error' && !isBlockedResourceError(m.text())) jsErrors.push(m.text()); });
    page.on('pageerror', e => { if (!isBlockedResourceError(String(e))) jsErrors.push(String(e)); });
  };

  // ---------- (01/02) Nav-Merge + Footer auf index/skills/prompts ----------
  for (const p of ['index.html', 'skills.html', 'prompts.html']) {
    const page = await ctx.newPage(); trackErrors(page);
    await page.goto(BASE + p, { waitUntil: 'load' });
    await page.waitForSelector('#nav-hilfe', { timeout: 8000 }).catch(() => {});
    const nav = await page.evaluate(() => {
      const h = document.getElementById('nav-hilfe');
      const f = document.getElementById('footer-hilfe');
      return {
        hilfeLabel: h ? h.textContent.trim() : null,
        hilfeHref: h ? h.getAttribute('href') : null,
        hasLernen: !!document.getElementById('nav-lernen'),
        footerHref: f ? f.getAttribute('href') : null,
      };
    });
    check(`01_nav_merge_${p}`,
      nav.hilfeLabel === 'Lernen & Hilfe' && nav.hilfeHref === 'lernen-hilfe.html' && !nav.hasLernen,
      nav);
    check(`02_footer_${p}`, nav.footerHref === 'lernen-hilfe.html', nav);
    await page.close();
  }

  // ---------- (03) Sub-Nav + reale Zähler auf lernen-hilfe.html ----------
  {
    const page = await ctx.newPage(); trackErrors(page);
    await page.goto(TARGET, { waitUntil: 'load' });
    await page.waitForSelector('#pillar-nav', { timeout: 8000 }).catch(() => {});
    const sub = await page.evaluate(() => {
      const links = [...document.querySelectorAll('#pillar-nav .pillar-link')].map(a => a.getAttribute('href'));
      const num = id => parseInt((document.getElementById(id) || {}).textContent || '0', 10);
      const secs = ['ressourcen', 'befehle', 'glossar', 'faq'].map(s => !!document.getElementById(s));
      return {
        links, secs,
        counts: { r: num('pn-ressourcen'), b: num('pn-befehle'), g: num('pn-glossar'), f: num('pn-faq') },
        navHilfeActive: !!document.querySelector('#nav-hilfe.active'),
      };
    });
    const wantLinks = ['#ressourcen', '#befehle', '#glossar', '#faq'];
    check('03_sub_nav',
      wantLinks.every(l => sub.links.includes(l)) && sub.secs.every(Boolean)
        && sub.counts.r > 0 && sub.counts.b > 0 && sub.counts.g > 0 && sub.counts.f > 0
        && sub.navHilfeActive,
      sub);
    // Reale Sub-Nav-Zähler = Array-Längen der Daten (RESSOURCEN/BEFEHLE/GLOSSAR/FAQ).
    // Regressions-Wache gegen still verlorene Einträge oder zerbrochene Zähl-Logik.
    check('03b_sub_nav_sollwerte',
      sub.counts.r === 27 && sub.counts.b === 28 && sub.counts.g === 44 && sub.counts.f === 10,
      { got: sub.counts, want: { r: 27, b: 28, g: 44, f: 10 } });
    // Sub-Nav-Zähler müssen mit den tatsächlich gerenderten Karten übereinstimmen (kein Hardcode-Drift).
    const rendered = await page.evaluate(() => ({
      r: document.querySelectorAll('#ressourcen .res-card').length,
      b: document.querySelectorAll('#befehle .cmd-card').length,
      g: document.querySelectorAll('#glossar .g-card').length,
      f: document.querySelectorAll('#faq .faq-card').length,
    }));
    check('03c_counts_match_dom',
      rendered.r === sub.counts.r && rendered.b === sub.counts.b
        && rendered.g === sub.counts.g && rendered.f === sub.counts.f,
      { rendered, counts: sub.counts });
    await page.close();
  }

  // ---------- (04) Deep-Links → kanonische Hash-Form ----------
  const deep = [
    ['?befehl=clear', '#befehl/clear'],
    ['?r=code-grundkurs-keil', '#r/code-grundkurs-keil'],
    ['?begriff=agent', '#begriff/agent'],
    ['?faq=faq-startet-nicht', '#faq/faq-startet-nicht'],
  ];
  for (const [q, wantHash] of deep) {
    const page = await ctx.newPage(); trackErrors(page);
    await page.goto(TARGET + q, { waitUntil: 'load' });
    await page.waitForFunction(h => location.hash === h, wantHash, { timeout: 6000 }).catch(() => {});
    const hash = await page.evaluate(() => location.hash);
    check(`04_deeplink_${q}`, hash === wantHash, { hash, wantHash });
    await page.close();
  }

  // ---------- (05) Redirect-Stubs erhalten Query-Parameter ----------
  const stubs = [
    ['hilfe.html?befehl=clear', /lernen-hilfe\.html\?befehl=clear/],
    ['hilfe.html?begriff=agent', /lernen-hilfe\.html\?begriff=agent/],
    ['hilfe.html?faq=faq-startet-nicht', /lernen-hilfe\.html\?faq=faq-startet-nicht/],
    ['lernen.html?r=code-grundkurs-keil', /lernen-hilfe\.html\?r=code-grundkurs-keil/],
    ['hilfe.html', /lernen-hilfe\.html/],
    ['lernen.html', /lernen-hilfe\.html/],
  ];
  for (const [from, re] of stubs) {
    const page = await ctx.newPage(); trackErrors(page);
    await page.goto(BASE + from, { waitUntil: 'load' }).catch(() => {});
    await page.waitForFunction(() => /lernen-hilfe\.html/.test(location.href), { timeout: 6000 }).catch(() => {});
    const url = page.url();
    check(`05_redirect_${from}`, re.test(url), { landedAt: url });
    await page.close();
  }

  // ---------- (06) Drei Vote-Typen koexistieren typisiert ----------
  {
    const page = await ctx.newPage(); trackErrors(page);
    await page.goto(TARGET, { waitUntil: 'load' });
    await page.waitForSelector('#ressourcen', { timeout: 8000 }).catch(() => {});
    const votes = await page.evaluate(() => {
      const out = {};
      // je einen Vote-Button pro Sektion klicken
      const clickFirst = sel => { const b = document.querySelector(sel); if (b) { b.click(); return true; } return false; };
      out.ressource = clickFirst('#ressourcen button[onclick^="voteRessource"]');
      out.befehl = clickFirst('#befehle button[onclick^="voteBefehl"]');
      out.begriff = clickFirst('#glossar button[onclick^="voteBegriff"]');
      // typisierte Keys nachweisen
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.indexOf('vote:') === 0) keys.push(k); }
      out.hasRessourceKey = keys.some(k => k.indexOf('vote:ressource:') === 0);
      out.hasBefehlKey = keys.some(k => k.indexOf('vote:befehl:') === 0);
      out.hasBegriffKey = keys.some(k => k.indexOf('vote:begriff:') === 0);
      return out;
    });
    check('06_vote_types',
      votes.ressource && votes.befehl && votes.begriff
        && votes.hasRessourceKey && votes.hasBefehlKey && votes.hasBegriffKey,
      votes);
    await page.close();
  }

  // ---------- (07) index-Merge-Karte ----------
  {
    const page = await ctx.newPage(); trackErrors(page);
    await page.goto(BASE + 'index.html', { waitUntil: 'load' });
    await page.waitForTimeout(1500);
    const idx = await page.evaluate(() => ({
      mergedCount: parseInt((document.getElementById('area-lernenhilfe-count') || {}).textContent || '0', 10),
      mergedCta: (document.querySelector('a.c-cta[href="lernen-hilfe.html"]') || {}).textContent || '',
      hasOldHilfe: !!document.getElementById('area-hilfe-count'),
      hasOldLernen: !!document.getElementById('area-lernen-count'),
      areasH: (document.getElementById('areas-h') || {}).textContent || '',
      livePills: document.querySelectorAll('.area-card .area-pill.-live').length,
      spotHref: (document.querySelector('a.area-spot[href^="lernen-hilfe.html"]') || { getAttribute: () => '' }).getAttribute('href') || '',
    }));
    check('07_index_merge',
      idx.mergedCount > 0 && !idx.hasOldHilfe && !idx.hasOldLernen
        && /sechs/.test(idx.areasH) && idx.livePills === 6
        && /lernen-hilfe\.html/.test(idx.spotHref),
      idx);
    await page.close();
  }

  // ---------- (08) Globale Suche: Befehl + Ressource → lernen-hilfe.html ----------
  {
    const page = await ctx.newPage(); trackErrors(page);
    await page.goto(BASE + 'skills.html', { waitUntil: 'load' });
    await page.waitForTimeout(300);
    await page.keyboard.down('Control'); await page.keyboard.press('KeyK'); await page.keyboard.up('Control');
    await page.waitForSelector('#gsearch-input', { timeout: 5000 }).catch(() => {});
    await page.type('#gsearch-input', 'clear');
    await page.waitForTimeout(500);
    const befehlHref = await page.evaluate(() =>
      ([...document.querySelectorAll('#gsearch-overlay a[href]')].find(x => /lernen-hilfe\.html\?befehl=/.test(x.getAttribute('href'))) || {}).getAttribute
        ? [...document.querySelectorAll('#gsearch-overlay a[href]')].find(x => /lernen-hilfe\.html\?befehl=/.test(x.getAttribute('href'))).getAttribute('href')
        : null);
    await page.fill('#gsearch-input', '');
    await page.type('#gsearch-input', 'grundkurs');
    await page.waitForTimeout(500);
    const ressHref = await page.evaluate(() => {
      const a = [...document.querySelectorAll('#gsearch-overlay a[href]')].find(x => /lernen-hilfe\.html\?r=/.test(x.getAttribute('href')));
      return a ? a.getAttribute('href') : null;
    });
    check('08_global_search', !!befehlHref && !!ressHref, { befehlHref, ressHref });
    await page.close();
  }

  // ---------- (09) 0 JS-Fehler ----------
  check('09_no_js_errors', jsErrors.length === 0, { jsErrors: [...jsErrors] });

  await ctx.close();
  await browser.close();
  const failed = Object.entries(checks).filter(([, c]) => !c.pass).map(([id]) => id);
  const result = { target: TARGET, pass: failed.length === 0, failed, checks };
  console.log(JSON.stringify(result, null, 2));
  process.exit(failed.length === 0 ? 0 : 1);
}

run().catch(e => { console.error(e); process.exit(1); });
