#!/usr/bin/env node
/**
 * E8-Messlatte für den Showroom (showroom.html) des pilot AI Marketplace.
 *
 * Prüft: reale Hero-Zahlen (== data), Anzahl Case-Karten == CASES.length, skaliertes
 * lazy Live-iframe-Thumbnail je Karte (src gesetzt, OHNE sandbox-Attribut — eigenes
 * Material, das frühere sandbox="allow-scripts allow-same-origin" bot keine Isolation
 * und erzeugte nur Konsolen-Warnungen; + aria-hidden + tabindex -1 + pointer-events:none),
 * kein Eager-Load von data/prompts.js und data/bausteine.js (Globals ungenutzt, die
 * globale Suche lazy-lädt selbst), Ehrlichkeits-Marker echt/beispiel im Karten-Körper
 * statt über dem Thumbnail (== data + „Demo-Daten“-Hinweis), Detail-Modal mit Story-Tabs
 * (Überblick · So ist es entstanden · Nachbauen · Vorschau), Reaktions-Button
 * „Will ich auch“ (vote:reaktion:*, togglet + persistiert, KEINE Sterne), Nachbauen-
 * Querverweise auf gültige SKILLS/PROMPTS/BAUSTEINE, „Ansehen“-Links auf existierende
 * Dateien (neuer Tab), Deep-Link ?case=<id>, „Projekt einreichen“-Demo, Nav-Regression
 * (nav-showroom im Mehr-Dropdown, alle IDs) und die Verzahnung mit der Startseite.
 * Muster: tests/e7-baukasten.cjs.
 *
 * Aufruf:
 *   PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright node tests/e8-showroom.cjs [URL]
 *   Server extern: python3 -m http.server 8412 (im Projekt-Root)
 *   Default-URL: http://localhost:8412/showroom.html
 *
 * Ausgabe: strukturiertes JSON auf stdout. Exit 0 = alle grün, 1 = ein Check rot.
 */

const { chromium } = require('/usr/lib/node_modules/playwright');

// E11-Soll: Suite akzeptiert jetzt auch eine Basis-URL (Runner ruft alle Suiten
// mit der Origin auf) und ergänzt dann selbst showroom.html.
const ARG = process.argv[2] || 'http://localhost:8412/showroom.html';
const TARGET = /\.html/.test(ARG) ? ARG : new URL('showroom.html', ARG).href;
const INDEX_TARGET = TARGET.replace(/showroom\.html.*$/, 'index.html');

// Soll-Werte (Stand E8, 2026-07-17), abgeleitet aus data/cases.js:
const EXPECTED_TOTAL = 10;          // CASES.length
const EXPECTED_ECHT = 4;            // istEcht:true
const EXPECTED_BEISPIEL = 6;        // istEcht:false
const EXPECTED_SAEULEN = 6;         // verschiedene Säulen
const SPOTLIGHT_ID = 'umfrage-auswerter';
const SPOTLIGHT_NAME = 'Umfrage-Auswerter';
const DEEPLINK_ID = 'tkp-rechner';
const DEEPLINK_NAME = 'TKP-Rechner';

const VIEWPORTS = [
  { name: 'desktop', viewport: { width: 1280, height: 800 } },
  { name: 'mobile', viewport: { width: 390, height: 844 } },
];

function isBlockedResourceError(text) {
  return /Failed to load resource|net::ERR_FAILED|net::ERR_BLOCKED|raw\.githubusercontent\.com|github\.com/i.test(text);
}

async function newPreparedContext(browser, vp) {
  return browser.newContext({ viewport: vp.viewport, reducedMotion: 'reduce' });
}

async function runViewport(browser, vp) {
  const context = await newPreparedContext(browser, vp);
  const page = await context.newPage();
  await page.route('**raw.githubusercontent.com**', r => r.abort());
  await page.route('**github.com**', r => r.abort());

  const jsErrors = [];
  const blockedResourceErrors = [];
  page.on('pageerror', err => jsErrors.push('pageerror: ' + err.message));
  page.on('console', msg => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    if (isBlockedResourceError(text)) blockedResourceErrors.push(text);
    else jsErrors.push('console.error: ' + text);
  });

  const checks = {};
  const check = (id, pass, data) => { checks[id] = { pass: !!pass, ...data }; };

  // ---------- (1) Laden: 0 JS-Fehler + Soll-Zahlen (Daten == DOM == Hero) ----------
  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#sr-grid .sr-card', { timeout: 10000 });
  await page.waitForTimeout(700);
  const counts = await page.evaluate(() => ({
    dataTotal: CASES.length,
    dataEcht: CASES.filter(c => c.istEcht).length,
    dataBeispiel: CASES.filter(c => !c.istEcht).length,
    dataSaeulen: new Set(CASES.map(c => c.saeule)).size,
    statTotal: CASE_STATS.total,
    statEcht: CASE_STATS.echt,
    statBeispiel: CASE_STATS.beispiel,
    statSaeulen: CASE_STATS.saeulen,
    domCards: document.querySelectorAll('#sr-grid .sr-card').length,
    idsUnique: new Set(CASES.map(c => c.id)).size === CASES.length,
    heroTotal: parseInt((document.getElementById('sr-stat-total') || {}).textContent || '-1', 10),
    heroEcht: parseInt((document.getElementById('sr-stat-echt') || {}).textContent || '-1', 10),
    heroBeispiel: parseInt((document.getElementById('sr-stat-beispiel') || {}).textContent || '-1', 10),
    heroSaeulen: parseInt((document.getElementById('sr-stat-saeulen') || {}).textContent || '-1', 10),
  }));
  // E11-Soll: die Hero-Stat-Zähler (#sr-stat-*) sind mit dem Hero entfallen
  // (kompakter .page-head) — Daten==DOM==CASE_STATS bleibt der volle Abgleich;
  // zusätzlich wird abgesichert, dass die alten Stat-Zähler wirklich weg sind (-1).
  check('01_load_counts_no_js_errors',
    jsErrors.length === 0
      && counts.dataTotal === EXPECTED_TOTAL && counts.statTotal === EXPECTED_TOTAL && counts.idsUnique
      && counts.domCards === EXPECTED_TOTAL
      && counts.dataEcht === EXPECTED_ECHT && counts.statEcht === EXPECTED_ECHT
      && counts.dataBeispiel === EXPECTED_BEISPIEL && counts.statBeispiel === EXPECTED_BEISPIEL
      && counts.dataSaeulen === EXPECTED_SAEULEN && counts.statSaeulen === EXPECTED_SAEULEN
      && counts.heroTotal === -1 && counts.heroEcht === -1
      && counts.heroBeispiel === -1 && counts.heroSaeulen === -1,
    { jsErrors: [...jsErrors], ...counts, blockedResourceErrors: blockedResourceErrors.length });

  // ---------- (2) Karten-iframe: src (echte Datei) + OHNE sandbox + aria-hidden + tabindex + pointer-events:none ----------
  // Sollwert-Änderung (2026-07-22): sandbox="allow-scripts allow-same-origin" ist entfallen —
  // die Kombination bot faktisch keine Isolation (eigene lokale Dateien) und erzeugte pro
  // iframe eine Konsolen-Warnung. Eingebettet wird ausschließlich eigenes Repo-Material.
  const frameInfo = await page.evaluate(() => {
    const frames = [...document.querySelectorAll('#sr-grid .sr-card .sr-frame')];
    return {
      count: frames.length,
      allSrc: frames.every(f => (f.getAttribute('src') || '').length > 3),
      allNoSandbox: frames.every(f => !f.hasAttribute('sandbox')),
      allAriaHidden: frames.every(f => f.getAttribute('aria-hidden') === 'true'),
      allTabindex: frames.every(f => f.getAttribute('tabindex') === '-1'),
      allNoPointer: frames.every(f => getComputedStyle(f).pointerEvents === 'none'),
      allLazy: frames.every(f => f.getAttribute('loading') === 'lazy'),
    };
  });
  check('02_live_preview_iframe',
    frameInfo.count === EXPECTED_TOTAL && frameInfo.allSrc && frameInfo.allNoSandbox
      && frameInfo.allAriaHidden && frameInfo.allTabindex && frameInfo.allNoPointer && frameInfo.allLazy,
    frameInfo);

  // ---------- (2b) Kein Eager-Load ungenutzter data-Dateien (Bloat-Sollzustand) ----------
  // data/prompts.js (~97 KB) und data/bausteine.js (~103 KB) werden von showroom.html nicht
  // genutzt und dürfen nicht mehr als <script src> geladen sein; die globale Suche (Strg+K)
  // lädt sie bei Bedarf selbst lazy nach (shared/base.js, GSEARCH_SOURCES).
  const bloatInfo = await page.evaluate(() => ({
    eagerPrompts: !!document.querySelector('script[src*="data/prompts.js"]'),
    eagerBausteine: !!document.querySelector('script[src*="data/bausteine.js"]'),
    eagerCases: !!document.querySelector('script[src*="data/cases.js"]'),   // gebraucht, muss bleiben
    eagerSkills: !!document.querySelector('script[src*="data/skills.js"]'), // gebraucht (Fakten-Box), muss bleiben
  }));
  check('02b_no_eager_unused_data',
    !bloatInfo.eagerPrompts && !bloatInfo.eagerBausteine && bloatInfo.eagerCases && bloatInfo.eagerSkills,
    bloatInfo);

  // ---------- (3) Ehrlichkeits-Marker echt/beispiel == data + „Demo-Daten“-Hinweis ----------
  const markerInfo = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('#sr-grid .sr-card')];
    const echt = cards.filter(c => c.querySelector('.sr-badge.-echt')).length;
    const beispiel = cards.filter(c => c.querySelector('.sr-badge.-beispiel')).length;
    const allHaveOne = cards.every(c => c.querySelector('.sr-badge.-echt') || c.querySelector('.sr-badge.-beispiel'));
    // Sollwert-Änderung (2026-07-22): Der Marker sitzt im Karten-Körper, NICHT mehr als
    // Overlay über dem Live-Thumbnail (dort kollidierte er mit Logos/Badges der Demos).
    const noneOnThumb = cards.every(c => !c.querySelector('.sr-thumb .sr-badge'));
    const bodyText = document.body.textContent || '';
    return {
      echt, beispiel, allHaveOne, noneOnThumb,
      dataEcht: CASES.filter(c => c.istEcht).length,
      dataBeispiel: CASES.filter(c => !c.istEcht).length,
      demoHint: /Demo-Daten/.test(bodyText),
      footerHint: /Demo-Daten/.test((document.querySelector('.footer-claim') || {}).textContent || ''),
    };
  });
  check('03_ehrlichkeits_marker',
    markerInfo.allHaveOne && markerInfo.noneOnThumb
      && markerInfo.echt === EXPECTED_ECHT && markerInfo.echt === markerInfo.dataEcht
      && markerInfo.beispiel === EXPECTED_BEISPIEL && markerInfo.beispiel === markerInfo.dataBeispiel
      && markerInfo.demoHint && markerInfo.footerHint,
    markerInfo);

  // ---------- (3b) Filter/Sort reagieren: Art-Filter reduziert das Grid, Alpha sortiert, Reset stellt her ----------
  await page.selectOption('#sr-art', 'dashboard');
  await page.waitForTimeout(250);
  const filterInfo = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('#sr-grid .sr-card')];
    return {
      domCount: cards.length,
      dataCount: CASES.filter(c => c.art === 'dashboard').length,
      total: CASES.length,
      allDashboard: cards.every(c => c.dataset.art === 'dashboard'),
    };
  });
  await page.selectOption('#sr-sort', 'alpha');
  await page.waitForTimeout(250);
  const sortInfo = await page.evaluate(() => {
    const titles = [...document.querySelectorAll('#sr-grid .sr-card .sr-name')].map(el => el.textContent.trim());
    const sorted = titles.slice().sort((a, b) => a.localeCompare(b, 'de'));
    return { titles, isSorted: JSON.stringify(titles) === JSON.stringify(sorted) };
  });
  // zurücksetzen, damit die folgenden Checks das volle Grid sehen
  await page.selectOption('#sr-art', 'all');
  await page.selectOption('#sr-sort', 'recommended');
  await page.waitForTimeout(250);
  const resetCount = await page.evaluate(() => document.querySelectorAll('#sr-grid .sr-card').length);
  check('03b_filter_sort_reacts',
    filterInfo.domCount === filterInfo.dataCount && filterInfo.domCount < filterInfo.total
      && filterInfo.allDashboard && sortInfo.isSorted && resetCount === EXPECTED_TOTAL,
    { filterInfo, sortInfo, resetCount });

  // ---------- (4) Detail-Modal: Story-Tabs, switchTab('story') + ('vorschau'), Esc ----------
  await page.evaluate((id) => openModal(id), SPOTLIGHT_ID);
  await page.waitForSelector('#modal-overlay.open', { timeout: 5000 });
  const modalInfo = await page.evaluate(() => ({
    open: document.getElementById('modal-overlay').classList.contains('open'),
    name: (document.getElementById('modal-name') || {}).textContent || '',
    tabs: [...document.querySelectorAll('#modal .modal-tabs .tab-btn')].map(b => b.textContent.trim()),
    metaMarker: !!document.querySelector('#modal-meta .sr-badge'),
  }));
  await page.evaluate(() => switchTab('story'));
  await page.waitForTimeout(150);
  const storyOk = await page.evaluate(() => {
    const h = document.getElementById('modal-body').innerHTML;
    return /Ausgangsproblem/.test(h) && /Stolperstein/.test(h) && /Ergebnis/.test(h)
      && /Ersten Prompt kopieren/.test(h);
  });
  await page.evaluate(() => switchTab('vorschau'));
  await page.waitForTimeout(150);
  const previewInfo = await page.evaluate(() => {
    const f = document.querySelector('#modal .preview-frame');
    return {
      hasFrame: !!f,
      src: f ? (f.getAttribute('src') || '') : '',
      noSandbox: f ? !f.hasAttribute('sandbox') : false, // Sollwert-Änderung: sandbox entfallen (s. Check 2)
      interactive: f ? getComputedStyle(f).pointerEvents !== 'none' : false,
    };
  });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  const modalClosed = await page.evaluate(() => !document.getElementById('modal-overlay').classList.contains('open'));
  check('04_detail_modal_story_tabs',
    modalInfo.open && modalInfo.name === SPOTLIGHT_NAME && modalInfo.metaMarker
      && modalInfo.tabs.length === 4 && modalInfo.tabs[0] === 'Überblick'
      && modalInfo.tabs[1] === 'So ist es entstanden' && modalInfo.tabs[2] === 'Nachbauen'
      && modalInfo.tabs[3] === 'Vorschau' && storyOk
      && previewInfo.hasFrame && previewInfo.src.length > 3
      && previewInfo.noSandbox && previewInfo.interactive
      && modalClosed,
    { modalInfo, storyOk, previewInfo, modalClosed });

  // ---------- (5) Reaktion „Will ich auch“: vote:reaktion:* togglet + persistiert, KEINE Sterne ----------
  const firstId = await page.evaluate(() => document.querySelector('#sr-grid .sr-card').dataset.id);
  const before = await page.evaluate((id) => ({
    ls: localStorage.getItem('vote:reaktion:' + id),
    count: (document.querySelector(`#sr-grid #case-${id} [data-react-count="${id}"]`) || {}).textContent || '',
    pressed: (document.querySelector(`#sr-grid #case-${id} [data-react="${id}"]`) || {}).getAttribute('aria-pressed'),
  }), firstId);
  await page.evaluate((id) => { document.querySelector(`#sr-grid #case-${id} [data-react="${id}"]`).click(); }, firstId);
  await page.waitForTimeout(250);
  const afterOn = await page.evaluate((id) => ({
    toast: !!document.querySelector('#toast.show'),
    ls: localStorage.getItem('vote:reaktion:' + id),
    count: (document.querySelector(`#sr-grid #case-${id} [data-react-count="${id}"]`) || {}).textContent || '',
    pressed: (document.querySelector(`#sr-grid #case-${id} [data-react="${id}"]`) || {}).getAttribute('aria-pressed'),
    onClass: (document.querySelector(`#sr-grid #case-${id} [data-react="${id}"]`) || {}).classList.contains('-on'),
    noRateKeys: Object.keys(localStorage).filter(k => k.startsWith('rate:')).length === 0,
  }), firstId);
  await page.evaluate((id) => { document.querySelector(`#sr-grid #case-${id} [data-react="${id}"]`).click(); }, firstId);
  await page.waitForTimeout(250);
  const afterOff = await page.evaluate((id) => ({
    ls: localStorage.getItem('vote:reaktion:' + id),
    count: (document.querySelector(`#sr-grid #case-${id} [data-react-count="${id}"]`) || {}).textContent || '',
  }), firstId);
  // Reaktion wieder setzen und Persistenz über Reload prüfen
  await page.evaluate((id) => { document.querySelector(`#sr-grid #case-${id} [data-react="${id}"]`).click(); }, firstId);
  await page.waitForTimeout(150);
  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#sr-grid .sr-card', { timeout: 10000 });
  const reloadLs = await page.evaluate((id) => localStorage.getItem('vote:reaktion:' + id), firstId);
  check('05_reaction_vote_toggle_persist',
    (before.ls === null) && afterOn.ls === '1' && afterOn.pressed === 'true' && afterOn.onClass
      && afterOn.toast && afterOn.noRateKeys
      && Number(afterOn.count) === Number(before.count) + 1
      && afterOff.ls === null && Number(afterOff.count) === Number(before.count)
      && reloadLs === '1',
    { firstId, before, afterOn, afterOff, reloadLs });

  // ---------- (6) Nachbauen-Querverweise auf gültige SKILLS/PROMPTS/BAUSTEINE ----------
  // showroom.html lädt data/prompts.js und data/bausteine.js bewusst NICHT mehr eager
  // (Check 2b) — für die ID-Validierung hier die Ziel-Kataloge in die Seite injizieren
  // (derselbe Weg, den die globale Suche lazy geht; top-level const ist danach im
  // globalen Lexikal-Environment für evaluate sichtbar).
  if (await page.evaluate(() => typeof PROMPTS === 'undefined')) {
    await page.addScriptTag({ url: 'data/prompts.js' });
  }
  if (await page.evaluate(() => typeof BAUSTEINE === 'undefined')) {
    await page.addScriptTag({ url: 'data/bausteine.js' });
  }
  await page.evaluate((id) => { openModal(id); switchTab('nachbauen'); }, SPOTLIGHT_ID);
  await page.waitForTimeout(200);
  const xref = await page.evaluate(() => {
    const links = [...document.querySelectorAll('#modal-body .sr-xref a')].map(a => a.getAttribute('href'));
    const skillIds = (typeof SKILLS !== 'undefined') ? SKILLS.map(s => s.id) : [];
    const promptIds = (typeof PROMPTS !== 'undefined') ? PROMPTS.map(p => p.id) : [];
    const bausteinIds = (typeof BAUSTEINE !== 'undefined') ? BAUSTEINE.map(b => b.id) : [];
    const dataIds = (typeof BEISPIELDATEN !== 'undefined') ? BEISPIELDATEN.map(d => d.id) : [];
    const dec = h => decodeURIComponent(h.split('=').slice(1).join('='));
    return {
      links,
      count: links.length,
      skillsValid: links.filter(h => h.startsWith('skills.html?skill=')).every(h => skillIds.includes(dec(h))),
      promptsValid: links.filter(h => h.startsWith('prompts.html?p=')).every(h => promptIds.includes(dec(h))),
      bausteineValid: links.filter(h => h.startsWith('baukasten.html?b=')).every(h => bausteinIds.includes(dec(h))),
      datenValid: links.filter(h => h.startsWith('baukasten.html#bk-data-')).every(h => dataIds.includes(h.replace('baukasten.html#bk-data-', ''))),
      hasSkill: links.some(h => h.startsWith('skills.html?skill=')),
      hasPrompt: links.some(h => h.startsWith('prompts.html?p=')),
      hasBaustein: links.some(h => h.startsWith('baukasten.html?b=')),
    };
  });
  // Startprompt-Copy → Toast
  await page.evaluate(() => { const b = document.querySelector('#modal-body .sr-prompt-box button'); if (b) b.click(); });
  await page.waitForTimeout(250);
  const promptToast = await page.evaluate(() => ({
    toast: !!document.querySelector('#toast.show'),
    text: (document.getElementById('toast') || {}).textContent || '',
  }));
  // Über ALLE Cases: jede Querverweis-ID muss ein gültiges Ziel treffen
  const allXrefValid = await page.evaluate(() => {
    const skillIds = new Set(SKILLS.map(s => s.id));
    const promptIds = new Set(PROMPTS.map(p => p.id));
    const bausteinIds = new Set(BAUSTEINE.map(b => b.id));
    const dataIds = new Set(BEISPIELDATEN.map(d => d.id));
    return CASES.every(c => {
      const q = c.querverweise || {};
      return (q.skills || []).every(z => skillIds.has(z.id))
        && (q.prompts || []).every(z => promptIds.has(z.id))
        && (q.bausteine || []).every(z => bausteinIds.has(z.id))
        && (q.beispieldaten || []).every(z => dataIds.has(z.id));
    });
  });
  await page.evaluate(() => closeModal());
  check('06_nachbauen_xref_valid',
    xref.count > 0 && xref.skillsValid && xref.promptsValid && xref.bausteineValid && xref.datenValid
      && xref.hasSkill && xref.hasPrompt && xref.hasBaustein
      && allXrefValid && promptToast.toast && /prompt/i.test(promptToast.text),
    { xref, promptToast, allXrefValid });

  // ---------- (7) „Ansehen“-Links: neuer Tab + echte, abrufbare Dateien ----------
  const ansehen = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('#sr-grid .sr-card')];
    const rows = cards.map(c => {
      const a = c.querySelector('a.lib-btn[target="_blank"]');
      const id = c.dataset.id;
      const data = CASES.find(x => x.id === id);
      return {
        id,
        href: a ? a.getAttribute('href') : null,
        rel: a ? a.getAttribute('rel') : '',
        matchesData: !!a && a.getAttribute('href') === data.liveUrl,
      };
    });
    return {
      rows,
      count: rows.filter(r => r.href).length,
      allBlankNoopener: rows.every(r => r.href && /noopener/.test(r.rel)),
      allMatchData: rows.every(r => r.matchesData),
    };
  });
  let filesExist = ansehen.count === EXPECTED_TOTAL;
  for (const r of ansehen.rows) {
    const url = TARGET.replace(/showroom\.html.*$/, r.href);
    const resp = await page.request.get(url).catch(() => null);
    if (!resp || !resp.ok()) { filesExist = false; break; }
  }
  check('07_ansehen_live_files',
    ansehen.count === EXPECTED_TOTAL && ansehen.allBlankNoopener && ansehen.allMatchData && filesExist,
    { count: ansehen.count, allBlankNoopener: ansehen.allBlankNoopener, allMatchData: ansehen.allMatchData, filesExist });

  // ---------- (8) Deep-Link ?case=<id>: kanonischer Hash, Modal offen, Karte hervorgehoben ----------
  // Das Karten-Highlight ist BEWUSST transient: showroom.html setzt .-highlight und entfernt es
  // nach 2400 ms wieder. Auf der schweren Showroom-Seite (lazy Live-iframes) liegt zwischen
  // DOMContentLoaded (da läuft applyDeepLink und setzt .-highlight) und dem 'load'-Event (alle
  // iframes) oft > 2400 ms — ein einmaliges Lesen nach waitUntil:'load' verpasst das Fenster
  // reproduzierbar (Timing-Race, kein Produktfehler — das Highlight funktioniert real). Wir warten
  // daher nur bis 'domcontentloaded' (Skripte definiert, applyDeepLink läuft an) und pollen das
  // Highlight zeitnah, bevor der 2400-ms-Timer greift. Absicht unverändert: kanonischer Hash +
  // richtiges Modal offen + Zielkarte hervorgehoben.
  await page.goto('about:blank');
  await page.goto(TARGET + '?case=' + DEEPLINK_ID, { waitUntil: 'domcontentloaded' });
  let everHi = false;
  const deepT0 = Date.now();
  while (Date.now() - deepT0 < 2800) {
    const hi = await page.evaluate((id) => {
      const c = document.getElementById('case-' + id);
      return !!c && c.classList.contains('-highlight');
    }, DEEPLINK_ID).catch(() => false);
    if (hi) { everHi = true; break; }
    await page.waitForTimeout(30);
  }
  await page.waitForTimeout(200); // Modal-/Hash-Zustand ausrollen lassen
  const deepInfo = await page.evaluate((id) => {
    const card = document.getElementById('case-' + id);
    return {
      hash: location.hash,
      canonical: location.hash === '#case/' + id,
      modalOpen: document.getElementById('modal-overlay').classList.contains('open'),
      modalName: (document.getElementById('modal-name') || {}).textContent || '',
      highlightedNow: !!card && card.classList.contains('-highlight'),
    };
  }, DEEPLINK_ID);
  deepInfo.highlighted = everHi || deepInfo.highlightedNow; // im Poll-Fenster gesehen ODER noch aktiv
  check('08_deeplink_opens_case',
    deepInfo.canonical && deepInfo.modalOpen && deepInfo.modalName === DEEPLINK_NAME && deepInfo.highlighted,
    deepInfo);

  // ---------- (9) „Projekt einreichen“: Demo-Flow bis Danke ----------
  await page.evaluate(() => closeModal());
  await page.evaluate(() => { document.getElementById('sr-submit-cta').click(); });
  await page.waitForSelector('#submit-overlay.open', { timeout: 5000 });
  const flowInfo = await page.evaluate(() => ({
    title: (document.getElementById('sf-title') || {}).textContent || '',
    steps: document.querySelectorAll('#submit-overlay .sf-step').length,
    demoNote: (document.querySelector('#submit-overlay .sf-demo-note') || {}).textContent || '',
  }));
  await page.fill('#submit-overlay [data-sf-key="name"]', 'Reporting-Generator');
  await page.fill('#submit-overlay [data-sf-key="problem"]', 'Wöchentliche Reports von Hand zusammenzustellen kostet jeden Freitag eine Stunde.');
  await page.locator('#submit-overlay .sf-form button[type="submit"]').click();
  await page.waitForSelector('#sf-thanks', { timeout: 5000 });
  const thanksInfo = await page.evaluate(() => ({
    hasThanks: !!document.getElementById('sf-thanks'),
    draft: localStorage.getItem('submit:case:draft') || '',
  }));
  await page.evaluate(() => closeSubmitFlow());
  check('09_submit_flow_demo',
    /Zeig/.test(flowInfo.title) && flowInfo.steps === 3 && /Demo/.test(flowInfo.demoNote)
      && thanksInfo.hasThanks && thanksInfo.draft.includes('Reporting-Generator'),
    { flowInfo, thanksInfo });

  // ---------- (10) Nav & Footer: Showroom aktiv, Mehr-Dropdown, IDs erhalten ----------
  const navInfo = await page.evaluate(() => {
    const el = document.getElementById('nav-showroom');
    const menu = document.getElementById('nav-more-menu');
    return {
      exists: !!el, label: el ? el.textContent.trim() : '',
      active: !!el && el.classList.contains('active'),
      ariaCurrent: el ? el.getAttribute('aria-current') : '',
      hasCatalog: !!document.getElementById('nav-catalog'),
      hasPrompts: !!document.getElementById('nav-prompts'),
      hasHilfe: !!document.getElementById('nav-hilfe'),
      // E10-Merge: nav-lernen ist entfallen (Lernen ging in „Lernen & Hilfe“/nav-hilfe auf).
      hasBibliothek: !!document.getElementById('nav-bibliothek'),
      hasBaukasten: !!document.getElementById('nav-baukasten'),
      hasMoreBtn: !!document.getElementById('nav-more-btn'),
      moreHasShowroom: !!(menu && menu.querySelector('#nav-showroom')),
      moreHasBaukasten: !!(menu && menu.querySelector('#nav-baukasten')),
      moreBtnActive: !!document.getElementById('nav-more-btn') && document.getElementById('nav-more-btn').classList.contains('active'),
      footer: !!document.querySelector('.site-footer'),
    };
  });
  check('10_nav_showroom_active',
    navInfo.exists && navInfo.label === 'Showroom' && navInfo.active && navInfo.ariaCurrent === 'page'
      && navInfo.hasCatalog && navInfo.hasPrompts && navInfo.hasHilfe
      && navInfo.hasBibliothek && navInfo.hasBaukasten
      && navInfo.hasMoreBtn && navInfo.moreHasShowroom && navInfo.moreHasBaukasten
      && navInfo.moreBtnActive && navInfo.footer,
    navInfo);

  // ---------- (11) Viewport-spezifisch: Dropdown Desktop vs. flach mobil (aktives Item sichtbar) ----------
  if (vp.name === 'desktop') {
    await page.evaluate(() => document.getElementById('nav-more-btn').click());
    await page.waitForTimeout(150);
    const opened = await page.evaluate(() => ({
      expanded: document.getElementById('nav-more-btn').getAttribute('aria-expanded'),
      menuVisible: !document.getElementById('nav-more-menu').hidden,
    }));
    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);
    const closedAfterEsc = await page.evaluate(() => document.getElementById('nav-more-menu').hidden);
    check('11_more_dropdown_desktop',
      opened.expanded === 'true' && opened.menuVisible && closedAfterEsc,
      { opened, closedAfterEsc });
  } else {
    const mobileNav = await page.evaluate(() => {
      const btn = document.getElementById('nav-more-btn');
      const showroom = document.getElementById('nav-showroom');
      const nav = document.querySelector('.main-nav');
      let inViewport = false;
      if (showroom && nav) {
        const nr = nav.getBoundingClientRect(); const sr = showroom.getBoundingClientRect();
        inViewport = sr.left >= nr.left - 1 && sr.right <= nr.right + 1;
      }
      return {
        moreBtnHidden: !btn || getComputedStyle(btn).display === 'none',
        showroomVisible: !!showroom && showroom.offsetParent !== null,
        showroomInViewport: inViewport, // Mobil-Scroll-Fix holt das aktive Item mittig
      };
    });
    check('11_more_flat_mobile',
      mobileNav.moreBtnHidden && mobileNav.showroomVisible && mobileNav.showroomInViewport,
      mobileNav);
  }

  // ---------- (12) Abschluss ----------
  check('12_no_js_errors_total', jsErrors.length === 0, {
    jsErrors: [...jsErrors], blockedResourceErrors: blockedResourceErrors.length,
  });

  await context.close();
  const failed = Object.entries(checks).filter(([, c]) => !c.pass).map(([id]) => id);
  return { viewport: vp.name, size: vp.viewport, pass: failed.length === 0, failed, checks };
}

// ---------- Startseiten-Checks (index.html) ----------
async function runIndexChecks(browser) {
  const vp = VIEWPORTS[0];
  const context = await newPreparedContext(browser, vp);
  const page = await context.newPage();
  await page.route('**raw.githubusercontent.com**', r => r.abort());
  await page.route('**github.com**', r => r.abort());

  const jsErrors = [];
  page.on('pageerror', err => jsErrors.push('pageerror: ' + err.message));
  page.on('console', msg => {
    if (msg.type() !== 'error') return;
    if (!isBlockedResourceError(msg.text())) jsErrors.push('console.error: ' + msg.text());
  });

  const checks = {};
  const check = (id, pass, data) => { checks[id] = { pass: !!pass, ...data }; };

  await page.goto(INDEX_TARGET, { waitUntil: 'load' });
  await page.waitForTimeout(1700); // animateCount ausrollen lassen

  const indexInfo = await page.evaluate(() => ({
    routerTile: !!document.querySelector('.rt-grid a.rt-card[href="showroom.html"]'),
    routerTileDest: (document.querySelector('.rt-grid a.rt-card[href="showroom.html"] .rt-dest') || {}).textContent || '',
    noShowroomTeaser: !document.querySelector('.rt-card[data-teaser="showroom"]')
      && (typeof TEASER === 'undefined' || !('showroom' in TEASER)),
    baukastenTileStillThere: !!document.querySelector('.rt-grid a.rt-card[href="baukasten.html"]'),
    biblioTileStillThere: !!document.querySelector('.rt-grid a.rt-card[href="bibliothek.html"]'),
    areaCount: parseInt((document.getElementById('area-showroom-count') || {}).textContent || '-1', 10),
    areaMeta: (document.getElementById('area-showroom-meta') || {}).textContent || '',
    areaCta: !!document.querySelector('.area-card a.c-cta[href="showroom.html"]'),
    areaSpotHref: (document.querySelector('a.area-spot[href^="showroom.html?case="]') || { getAttribute: () => '' }).getAttribute('href') || '',
    areaSpotReact: (document.getElementById('area-showroom-spot-react') || {}).textContent || '',
    livePills: document.querySelectorAll('.area-card .area-pill.-live').length,
    soonPills: document.querySelectorAll('.area-card .area-pill.-soon').length,
    navShowroom: !!document.getElementById('nav-showroom'),
    newsHasShowroom: [...document.querySelectorAll('.news-item .news-text a')].some(a => a.getAttribute('href') === 'showroom.html'),
    newsHasPrompts: [...document.querySelectorAll('.news-item .news-text a')].some(a => a.getAttribute('href') === 'prompts.html'),
    newsHasLernen: [...document.querySelectorAll('.news-item .news-text a')].some(a => (a.getAttribute('href') || '').indexOf('lernen-hilfe.html') === 0),
    newsHasBibliothek: [...document.querySelectorAll('.news-item .news-text a')].some(a => a.getAttribute('href') === 'bibliothek.html'),
    newsHasBaukasten: [...document.querySelectorAll('.news-item .news-text a')].some(a => a.getAttribute('href') === 'baukasten.html'),
    newsCount: document.querySelectorAll('.news-item').length,
    dataCases: typeof CASES !== 'undefined' ? CASES.length : -1,
    dataEcht: typeof CASE_STATS !== 'undefined' ? CASE_STATS.echt : -1,
    dataBeispiel: typeof CASE_STATS !== 'undefined' ? CASE_STATS.beispiel : -1,
  }));
  check('i1_index_no_js_errors', jsErrors.length === 0, { jsErrors: [...jsErrors] });
  check('i2_router_tile_links_showroom',
    indexInfo.routerTile && indexInfo.noShowroomTeaser && /Showroom/.test(indexInfo.routerTileDest)
      && indexInfo.baukastenTileStillThere && indexInfo.biblioTileStillThere,
    { routerTile: indexInfo.routerTile, dest: indexInfo.routerTileDest, noShowroomTeaser: indexInfo.noShowroomTeaser,
      baukastenTileStillThere: indexInfo.baukastenTileStillThere, biblioTileStillThere: indexInfo.biblioTileStillThere });
  check('i3_counts_match_data',
    indexInfo.areaCount === EXPECTED_TOTAL && indexInfo.dataCases === EXPECTED_TOTAL
      && indexInfo.dataEcht === EXPECTED_ECHT && indexInfo.dataBeispiel === EXPECTED_BEISPIEL
      && indexInfo.areaMeta.includes(String(EXPECTED_ECHT)) && indexInfo.areaMeta.includes(String(EXPECTED_BEISPIEL)),
    { areaCount: indexInfo.areaCount, meta: indexInfo.areaMeta, dataCases: indexInfo.dataCases });
  check('i4_area_card_clickable',
    indexInfo.areaCta && indexInfo.areaSpotHref === 'showroom.html?case=' + SPOTLIGHT_ID
      && indexInfo.areaSpotReact.trim().length > 0 && indexInfo.navShowroom
      && indexInfo.livePills === 6 && indexInfo.soonPills === 0,
    { areaCta: indexInfo.areaCta, areaSpotHref: indexInfo.areaSpotHref,
      areaSpotReact: indexInfo.areaSpotReact, navShowroom: indexInfo.navShowroom,
      livePills: indexInfo.livePills, soonPills: indexInfo.soonPills });
  check('i5_news_mentions_showroom_and_interlinks',
    indexInfo.newsHasShowroom && indexInfo.newsCount >= 3 && indexInfo.newsCount <= 4
      && indexInfo.newsHasPrompts && indexInfo.newsHasLernen && indexInfo.newsHasBibliothek && indexInfo.newsHasBaukasten,
    { newsHasShowroom: indexInfo.newsHasShowroom, newsCount: indexInfo.newsCount,
      newsHasPrompts: indexInfo.newsHasPrompts, newsHasLernen: indexInfo.newsHasLernen,
      newsHasBibliothek: indexInfo.newsHasBibliothek, newsHasBaukasten: indexInfo.newsHasBaukasten });

  // Router-Kachel navigiert wirklich
  await page.click('.rt-grid a.rt-card[href="showroom.html"]');
  await page.waitForTimeout(1200);
  const landed = await page.evaluate(() =>
    location.pathname.endsWith('showroom.html') && document.querySelectorAll('#sr-grid .sr-card').length > 0);
  check('i6_router_tile_navigates', landed, { url: page.url() });

  // Nav-Regression: nav-showroom auf allen Bestandsseiten vorhanden, nicht aktiv
  const navPages = {};
  for (const p of ['skills.html', 'prompts.html', 'lernen-hilfe.html', 'bibliothek.html', 'baukasten.html']) {
    await page.goto(INDEX_TARGET.replace(/index\.html.*$/, p), { waitUntil: 'load' });
    await page.waitForSelector('#nav-showroom', { timeout: 10000 }).catch(() => {});
    navPages[p] = await page.evaluate(() => {
      const el = document.getElementById('nav-showroom');
      return {
        exists: !!el,
        href: el ? el.getAttribute('href') : '',
        notActive: !!el && !el.classList.contains('active'),
        hasBaukasten: !!document.getElementById('nav-baukasten'),
      };
    });
  }
  check('i7_nav_showroom_on_all_pages',
    Object.values(navPages).every(n => n.exists && n.href === 'showroom.html' && n.notActive && n.hasBaukasten),
    navPages);

  await context.close();
  const failed = Object.entries(checks).filter(([, c]) => !c.pass).map(([id]) => id);
  return { viewport: 'index-desktop', size: vp.viewport, pass: failed.length === 0, failed, checks };
}

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const results = { target: TARGET, indexTarget: INDEX_TARGET, timestamp: new Date().toISOString(), runs: [] };
  let allPass = true;
  try {
    for (const vp of VIEWPORTS) {
      const run = await runViewport(browser, vp);
      results.runs.push(run);
      if (!run.pass) allPass = false;
    }
    const idx = await runIndexChecks(browser);
    results.runs.push(idx);
    if (!idx.pass) allPass = false;
  } catch (err) {
    results.fatal = String(err && err.stack || err);
    allPass = false;
  } finally {
    await browser.close();
  }
  results.pass = allPass;
  console.log(JSON.stringify(results, null, 2));
  process.exit(allPass ? 0 : 1);
})();
