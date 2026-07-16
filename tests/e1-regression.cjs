#!/usr/bin/env node
/**
 * E1-Regressions-Messlatte für den pilot Skill Marketplace.
 *
 * Prüft die Kernflüsse des Katalogs (Stand VOR dem E1-Refactoring) gegen eine
 * beliebige Ziel-URL — damit nach dem Umzug (Katalog -> skills.html) exakt
 * dieselben Checks gegen die neue Struktur laufen können.
 *
 * Aufruf:
 *   PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright node tests/e1-regression.cjs [URL]
 *   Default-URL: http://localhost:8412/skills.html
 *
 * Hinweis Datei-Viewer: die Seite fetcht Skill-Dateien zuerst von
 * raw.githubusercontent.com — für lokale Läufe werden github-Hosts geblockt,
 * dann greift der lokale skills/-Fallback. Geblockte Ressourcen-Fehler zählen
 * NICHT als JS-Fehler.
 *
 * Ausgabe: strukturiertes JSON auf stdout (pro Check pass/fail + Messwerte).
 * Exit-Code 0 = alle Checks grün, 1 = mindestens ein Check rot.
 */

const { chromium } = require('/usr/lib/node_modules/playwright');

const TARGET = process.argv[2] || 'http://localhost:8412/skills.html';

// Soll-Werte (Stand E2 Schritt 2, 2026-07-16): sichtbare Karten pro Aufgaben-Tab,
// Merge-Karten zählen als 1 Karte. Änderung ggü. E1-Baseline (31/3/8/5/4/4/7):
//  +5 neue Einträge — Plugins superpowers & ralph-loop (Bauen), Frameworks
//  gsd & test-driven-development (Bauen) und brainstorm-plan-execute (Loslegen).
//  frontend-design & skill-creator wurden zu itemType 'plugin' konvertiert
//  (bleiben in Bauen — der Default-Typ-Tab „Alle" zählt sie weiter mit).
const EXPECTED_TAB_COUNTS = {
  'Alle': 36,
  'Loslegen': 4,
  'Bauen': 12,
  'Texten': 5,
  'Gestalten': 4,
  'Präsentieren': 4,
  'Media': 7,
};

const VIEWPORTS = [
  { name: 'desktop', viewport: { width: 1280, height: 800 } },
  { name: 'mobile', viewport: { width: 390, height: 844 } },
];

function isBlockedResourceError(text) {
  return /Failed to load resource|net::ERR_FAILED|net::ERR_BLOCKED|raw\.githubusercontent\.com|github\.com/i.test(text);
}

async function runViewport(browser, vp) {
  const context = await browser.newContext({ viewport: vp.viewport });
  const page = await context.newPage();

  // Externe GitHub-Hosts blocken -> lokaler skills/-Fallback greift.
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

  // ---------- (1) Seite lädt mit 0 JS-Fehlern ----------
  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#skills-grid .skill-card', { timeout: 10000 });
  await page.waitForTimeout(600);
  check('01_load_no_js_errors', jsErrors.length === 0, {
    jsErrors: [...jsErrors],
    blockedResourceErrors: blockedResourceErrors.length,
  });

  // ---------- (2) Katalog: Aufgaben-Tabs + Karten-Anzahl pro Tab ----------
  const tabLabels = await page.evaluate(() =>
    [...document.querySelectorAll('#cat-tabs .cat-tab')].map(b => b.textContent.trim())
  );
  const measuredCounts = {};
  for (const label of Object.keys(EXPECTED_TAB_COUNTS)) {
    const clicked = await page.evaluate((lbl) => {
      const btn = [...document.querySelectorAll('#cat-tabs .cat-tab')]
        .find(b => b.textContent.trim().startsWith(lbl));
      if (!btn) return false;
      btn.click();
      return true;
    }, label);
    await page.waitForTimeout(250);
    measuredCounts[label] = clicked
      ? await page.evaluate(() => document.querySelectorAll('#skills-grid .skill-card').length)
      : -1;
  }
  const countsOk = Object.entries(EXPECTED_TAB_COUNTS)
    .every(([k, v]) => measuredCounts[k] === v);
  check('02_catalog_tabs_and_counts', tabLabels.length >= 7 && countsOk, {
    tabLabels,
    expected: EXPECTED_TAB_COUNTS,
    measured: measuredCounts,
  });
  // Zurück auf "Alle"
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('#cat-tabs .cat-tab')]
      .find(b => b.textContent.trim().startsWith('Alle'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(250);

  // ---------- (3) Suche filtert ('pptx' -> Treffer, Merge-Karten aufgelöst) ----------
  const searchSel = vp.name === 'mobile' ? '#search-m' : '#search';
  await page.fill(searchSel, 'pptx');
  await page.waitForTimeout(700); // Debounce
  const searchResult = await page.evaluate(() => ({
    cards: document.querySelectorAll('#skills-grid .skill-card').length,
    groupCards: document.querySelectorAll('#skills-grid .group-card').length,
    resultsText: (document.getElementById('results-count') || {}).textContent || '',
  }));
  check('03_search_pptx', searchResult.cards > 0 && searchResult.groupCards === 0, searchResult);
  await page.fill(searchSel, '');
  await page.waitForTimeout(700);

  // ---------- (4) Skill-Modal per Kartenklick: Tabs + Runway + Startprompt-Kopierknopf ----------
  await page.locator('#skills-grid .skill-card').first().click();
  await page.waitForSelector('#modal-overlay.open', { timeout: 5000 });
  await page.waitForTimeout(300);
  const modalInfo = await page.evaluate(() => ({
    name: (document.getElementById('modal-name') || {}).textContent || '',
    tabs: [...document.querySelectorAll('#modal .tab-btn')].map(b => b.textContent.trim()),
    hasRunway: !!document.querySelector('#modal .runway'),
    hasStartpromptCopy: !!document.querySelector('#modal .startprompt-copy'),
  }));
  const hasFilesTab = modalInfo.tabs.some(t => /Dateien\s*&\s*Download/.test(t));
  const hasRatingsTab = modalInfo.tabs.some(t => /Bewertungen/.test(t));
  check('04_modal_opens_with_tabs_and_runway',
    modalInfo.name.length > 0 && hasFilesTab && hasRatingsTab
      && modalInfo.hasRunway && modalInfo.hasStartpromptCopy,
    modalInfo);

  // ---------- (5) Rating: Sterne klickbar, localStorage-Key entsteht ----------
  await page.click('#modal .tab-btn[data-tab="ratings"]');
  await page.waitForSelector('#modal .star-input .star-btn', { timeout: 5000 });
  await page.locator('#modal .star-input .star-btn').nth(3).click(); // 4 Sterne
  await page.waitForTimeout(300);
  const ratingKeys = await page.evaluate(() =>
    Object.keys(localStorage).filter(k => k.startsWith('skill-rating-'))
  );
  check('05_rating_stars_localstorage', ratingKeys.length > 0, { ratingKeys });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  // ---------- (6) Deep-Link öffnet Modal direkt ----------
  // IST-Stand: Deep-Links sind hash-basiert (#skill-id), NICHT ?skill= — das
  // Script probiert beide Formen und dokumentiert, welche greift.
  let deepLinkMode = null;
  for (const [mode, url] of [
    ['query', TARGET + '?skill=erste-schritte'],
    ['hash', TARGET + '#erste-schritte'],
  ]) {
    await page.goto('about:blank');
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(900);
    const open = await page.evaluate(() => {
      const ov = document.getElementById('modal-overlay');
      return !!(ov && ov.classList.contains('open'))
        && ((document.getElementById('modal-name') || {}).textContent || '').length > 0;
    });
    if (open) { deepLinkMode = mode; break; }
  }
  const deepLinkName = deepLinkMode
    ? await page.evaluate(() => document.getElementById('modal-name').textContent.trim())
    : '';
  check('06_deeplink_opens_modal', deepLinkMode !== null, {
    workingMode: deepLinkMode,
    modalName: deepLinkName,
    note: 'IST-Stand: hash-Deep-Link (#skill-id); ?skill= wird nicht unterstützt',
  });

  // ---------- (7) Outcome-Router: Kachel-Klick öffnet Modal ----------
  await page.goto('about:blank');
  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#outcome-router .outcome-card', { timeout: 10000 });
  await page.locator('#outcome-router .outcome-card').first().click();
  await page.waitForSelector('#modal-overlay.open', { timeout: 5000 });
  const outcomeModalName = await page.evaluate(() =>
    (document.getElementById('modal-name') || {}).textContent.trim());
  check('07_outcome_router_tile_opens_modal', outcomeModalName.length > 0, {
    modalName: outcomeModalName,
  });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  // ---------- (8) View-Wechsel 'Was sind Skills?' und 'Skill bauen' ----------
  await page.click('#nav-explainer');
  await page.waitForTimeout(400);
  const explainerVisible = await page.evaluate(() => {
    const v = document.getElementById('view-explainer');
    return !!v && !v.hidden && v.offsetHeight > 0;
  });
  // ---------- (10) Bundle-Download-Buttons vorhanden (im Explainer-View) ----------
  const bundleInfo = await page.evaluate(() => ({
    starter: !!document.querySelector('[onclick*="downloadStarterPack"]'),
    power: !!document.querySelector('[onclick*="downloadPowerPack"]'),
  }));
  await page.click('#nav-builder');
  await page.waitForTimeout(400);
  const builderVisible = await page.evaluate(() => {
    const v = document.getElementById('view-builder');
    return !!v && !v.hidden && v.offsetHeight > 0;
  });
  await page.click('#nav-catalog');
  await page.waitForTimeout(400);
  const catalogBack = await page.evaluate(() => {
    const v = document.getElementById('view-catalog');
    return !!v && !v.hidden;
  });
  check('08_view_switch_explainer_builder',
    explainerVisible && builderVisible && catalogBack,
    { explainerVisible, builderVisible, catalogBack });
  check('10_bundle_download_buttons', bundleInfo.starter && bundleInfo.power, bundleInfo);

  // ---------- (9) Favorit setzen ----------
  await page.locator('#skills-grid .skill-card .fav-btn').first().click();
  await page.waitForTimeout(300);
  const favState = await page.evaluate(() => {
    let favs = [];
    try { favs = JSON.parse(localStorage.getItem('skill-favorites') || '[]'); } catch (e) {}
    return {
      favorites: favs,
      activeBtn: !!document.querySelector('#skills-grid .fav-btn.active'),
      modalAccidentallyOpened: !!document.querySelector('#modal-overlay.open'),
    };
  });
  check('09_favorite_toggle',
    favState.favorites.length > 0 && favState.activeBtn && !favState.modalAccidentallyOpened,
    favState);

  // ---------- (11) Getting-Started-Fortschritt #gs-progress existiert ----------
  const gsExists = await page.evaluate(() => !!document.getElementById('gs-progress'));
  check('11_gs_progress_exists', gsExists, { exists: gsExists });

  // ---------- Abschluss: über den ganzen Lauf gesammelte JS-Fehler ----------
  check('12_no_js_errors_total', jsErrors.length === 0, {
    jsErrors: [...jsErrors],
    blockedResourceErrors: blockedResourceErrors.length,
  });

  await context.close();

  const failed = Object.entries(checks).filter(([, c]) => !c.pass).map(([id]) => id);
  return { viewport: vp.name, size: vp.viewport, pass: failed.length === 0, failed, checks };
}

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const results = { target: TARGET, timestamp: new Date().toISOString(), runs: [] };
  let allPass = true;
  try {
    for (const vp of VIEWPORTS) {
      const run = await runViewport(browser, vp);
      results.runs.push(run);
      if (!run.pass) allPass = false;
    }
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
