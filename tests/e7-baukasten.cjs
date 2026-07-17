#!/usr/bin/env node
/**
 * E7-Messlatte für den Baukasten (baukasten.html) des pilot AI Marketplace.
 *
 * Prüft: reale Hero-Zahlen (== data), Anzahl Baustein-Karten == BAUSTEINE.length,
 * iframe-Live-Vorschau (srcdoc gesetzt + escaped + sandbox="", keine relativen
 * Font-Pfade), Detail-Modal mit Tabs (Vorschau · Code · Sag Claude · Bewertungen),
 * Code-Kopie erhöht den copies:baustein:*-Zähler, „Sag Claude"-Prompt kopierbar,
 * Meistkopiert-Sortierung, Bewertung (rate:baustein:*), Deep-Link ?b=<id>,
 * Beispieldaten-Downloads auf existierende Dateien + gültige Übungsidee-Ziele,
 * „Baustein einreichen"-Demo, die Nav-Regression (Mehr-Dropdown + IDs) und die
 * Verzahnung mit der Startseite. Muster: tests/e6-bibliothek.cjs.
 *
 * Aufruf:
 *   PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright node tests/e7-baukasten.cjs [URL]
 *   Server extern: python3 -m http.server 8412 (im Projekt-Root)
 *   Default-URL: http://localhost:8412/baukasten.html
 *
 * Ausgabe: strukturiertes JSON auf stdout. Exit 0 = alle grün, 1 = ein Check rot.
 */

const { chromium } = require('/usr/lib/node_modules/playwright');

const TARGET = process.argv[2] || 'http://localhost:8412/baukasten.html';
const INDEX_TARGET = TARGET.replace(/baukasten\.html.*$/, 'index.html');

// Soll-Werte (Stand E7, 2026-07-17), abgeleitet aus data/bausteine.js:
const EXPECTED_TOTAL = 12;          // BAUSTEINE.length
const EXPECTED_LEUCHTTUERME = 4;
const EXPECTED_DATEIEN = 5;         // BEISPIELDATEN.length
const LEUCHTTURM = 'header-hero';
const LEUCHTTURM_NAME = 'Header mit Hero';
const DEEPLINK_ID = 'chart-setup';
const DEEPLINK_NAME = 'Chart-Setup (ohne Bibliothek)';

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
  await page.waitForSelector('#bk-grid .baustein-card', { timeout: 10000 });
  await page.waitForTimeout(600);
  const counts = await page.evaluate(() => ({
    dataTotal: BAUSTEINE.length,
    dataLeucht: BAUSTEINE.filter(b => b.leuchtturm).length,
    dataDateien: BEISPIELDATEN.length,
    statTotal: BAUKASTEN_STATS.total,
    statDateien: BEISPIELDATEN_STATS.total,
    domCards: document.querySelectorAll('#bk-grid .baustein-card').length,
    domDataCards: document.querySelectorAll('#bk-data-grid .bk-data-card').length,
    idsUnique: new Set(BAUSTEINE.map(b => b.id)).size === BAUSTEINE.length,
    heroBausteine: parseInt((document.getElementById('bk-stat-bausteine') || {}).textContent || '-1', 10),
    heroLeucht: parseInt((document.getElementById('bk-stat-leuchttuerme') || {}).textContent || '-1', 10),
    heroDateien: parseInt((document.getElementById('bk-stat-dateien') || {}).textContent || '-1', 10),
  }));
  check('01_load_counts_no_js_errors',
    jsErrors.length === 0
      && counts.dataTotal === EXPECTED_TOTAL && counts.statTotal === EXPECTED_TOTAL && counts.idsUnique
      && counts.domCards === EXPECTED_TOTAL
      && counts.dataLeucht === EXPECTED_LEUCHTTUERME
      && counts.dataDateien === EXPECTED_DATEIEN && counts.statDateien === EXPECTED_DATEIEN
      && counts.domDataCards === EXPECTED_DATEIEN
      && counts.heroBausteine === EXPECTED_TOTAL && counts.heroLeucht === EXPECTED_LEUCHTTUERME
      && counts.heroDateien === EXPECTED_DATEIEN,
    { jsErrors: [...jsErrors], ...counts, blockedResourceErrors: blockedResourceErrors.length });

  // ---------- (2) iframe-Live-Vorschau: srcdoc gesetzt + sandbox="" + kein externer src ----------
  const frameInfo = await page.evaluate(() => {
    const frames = [...document.querySelectorAll('#bk-grid .baustein-card .preview-frame')];
    return {
      count: frames.length,
      allSrcdoc: frames.every(f => (f.getAttribute('srcdoc') || '').length > 50),
      allSandboxEmpty: frames.every(f => f.getAttribute('sandbox') === ''),
      noExternalSrc: frames.every(f => f.getAttribute('src') === null),
    };
  });
  check('02_live_preview_iframe',
    frameInfo.count === EXPECTED_TOTAL && frameInfo.allSrcdoc && frameInfo.allSandboxEmpty && frameInfo.noExternalSrc,
    frameInfo);

  // ---------- (3) srcdoc escaped + system-Font, keine relativen Font-Pfade ----------
  const srcdocInfo = await page.evaluate(() => {
    const frames = [...document.querySelectorAll('#bk-grid .baustein-card .preview-frame')];
    const attrs = frames.map(f => f.getAttribute('srcdoc') || '');
    return {
      allSystemFont: attrs.every(a => /system-ui/.test(a)),
      noRelativeFonts: attrs.every(a => !/assets\/fonts/.test(a) && !/\.woff2/.test(a)),
      // Attribut sauber escaped: im serialisierten outerHTML kommt srcdoc=" genau
      // einmal vor — die inneren " des Markups sind als &quot; kodiert, brechen das
      // Attribut also nicht auf (sonst gäbe es mehrere srcdoc="-Treffer / kaputtes DOM).
      escapedAttr: frames.every(f => (f.outerHTML.match(/srcdoc="/g) || []).length === 1),
    };
  });
  check('03_srcdoc_escaped_no_relative_fonts',
    srcdocInfo.allSystemFont && srcdocInfo.noRelativeFonts && srcdocInfo.escapedAttr,
    srcdocInfo);

  // ---------- (4) Detail-Modal: Tabs Vorschau/Code/Sag Claude/Bewertungen, switchTab, Esc ----------
  await page.evaluate((id) => openModal(id), LEUCHTTURM);
  await page.waitForSelector('#modal-overlay.open', { timeout: 5000 });
  const modalInfo = await page.evaluate(() => {
    const tabs = [...document.querySelectorAll('#modal .modal-tabs .tab-btn')].map(b => b.textContent.trim());
    return {
      open: document.getElementById('modal-overlay').classList.contains('open'),
      name: (document.getElementById('modal-name') || {}).textContent || '',
      tabs,
      hasPreviewFrame: !!document.querySelector('#modal .preview-frame'),
      previewSandbox: (document.querySelector('#modal .preview-frame') || { getAttribute: () => null }).getAttribute('sandbox'),
      previewSrcdoc: ((document.querySelector('#modal .preview-frame') || { getAttribute: () => '' }).getAttribute('srcdoc') || '').length,
    };
  });
  await page.evaluate(() => switchTab('code'));
  await page.waitForTimeout(150);
  const codeOk = await page.evaluate(() => /am-code/.test(document.getElementById('modal-body').innerHTML));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  const modalClosed = await page.evaluate(() => !document.getElementById('modal-overlay').classList.contains('open'));
  check('04_detail_modal_tabs',
    modalInfo.open && modalInfo.name === LEUCHTTURM_NAME && modalInfo.tabs.length === 4
      && modalInfo.tabs[0] === 'Vorschau' && modalInfo.tabs[1] === 'Code'
      && modalInfo.tabs[2] === 'Sag Claude' && modalInfo.tabs[3] === 'Bewertungen'
      && modalInfo.hasPreviewFrame && modalInfo.previewSandbox === '' && modalInfo.previewSrcdoc > 50
      && codeOk && modalClosed,
    { modalInfo, codeOk, modalClosed });

  // ---------- (5) Code-Kopie erhöht copies:baustein:* + Meta-Text steigt + persistiert ----------
  const firstId = await page.evaluate(() => document.querySelector('#bk-grid .baustein-card').dataset.id);
  const before = await page.evaluate((id) => ({
    ls: localStorage.getItem('copies:baustein:' + id),
    text: (document.querySelector(`#bk-grid #baustein-${id} [data-copies="${id}"]`) || {}).textContent || '',
  }), firstId);
  await page.evaluate((id) => { document.querySelector(`#bk-grid #baustein-${id} [data-copy-code]`).click(); }, firstId);
  await page.waitForTimeout(300);
  const after = await page.evaluate((id) => ({
    toast: !!document.querySelector('#toast.show'),
    ls: localStorage.getItem('copies:baustein:' + id),
    tried: localStorage.getItem('tried:baustein:' + id),
    text: (document.querySelector(`#bk-grid #baustein-${id} [data-copies="${id}"]`) || {}).textContent || '',
  }), firstId);
  check('05_copy_code_and_meistkopiert',
    (before.ls === null || before.ls === '0') && after.ls === '1' && after.tried === '1'
      && after.toast && after.text !== before.text && /kopiert/.test(after.text),
    { firstId, before, after });

  // ---------- (6) Meistkopiert-Sortierung: erste Karte hat höchsten copyCountOf ----------
  await page.selectOption('#bk-sort', 'copies');
  await page.waitForTimeout(300);
  const sortInfo = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('#bk-grid .baustein-card')];
    const firstId = cards[0].dataset.id;
    const cc = (id) => { const b = BAUSTEINE.find(x => x.id === id); const loc = parseInt(localStorage.getItem('copies:baustein:' + id) || '0', 10); return (b.copyCount || 0) + (isNaN(loc) ? 0 : loc); };
    const maxId = BAUSTEINE.map(b => b.id).sort((a, b) => cc(b) - cc(a))[0];
    return { firstId, maxId, firstCC: cc(firstId), maxCC: cc(maxId) };
  });
  check('06_sort_meistkopiert',
    sortInfo.firstCC === sortInfo.maxCC && sortInfo.firstCC > 0,
    sortInfo);

  // ---------- (7) „Sag Claude"-Prompt kopierbar (Toast) ----------
  await page.evaluate((id) => { const b = document.querySelector(`#baustein-${id} button[onclick^="copyBausteinPrompt"]`); if (b) b.click(); }, firstId);
  await page.waitForTimeout(300);
  const promptToast = await page.evaluate(() => ({
    toast: !!document.querySelector('#toast.show'),
    text: (document.getElementById('toast') || {}).textContent || '',
  }));
  check('07_sag_claude_prompt_copy', promptToast.toast && /Prompt/.test(promptToast.text), promptToast);

  // ---------- (8) Beispieldaten: Download-Links existieren + Übungsidee-Ziele gültig ----------
  const dataLinks = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('#bk-data-grid .bk-data-card')];
    const dl = cards.map(c => (c.querySelector('a[download]') || {}).getAttribute && c.querySelector('a[download]').getAttribute('href')).filter(Boolean);
    const xref = [];
    cards.forEach(c => c.querySelectorAll('.bk-data-xref a').forEach(a => xref.push(a.getAttribute('href'))));
    const bausteinIds = BAUSTEINE.map(b => b.id);
    return {
      dlHrefs: dl,
      dlCount: dl.length,
      allBeispieldaten: dl.every(h => /^beispieldaten\/.+\.(csv|md)$/.test(h)),
      xrefHrefs: xref,
      xrefCount: xref.length,
      // Baukasten-Querverweise müssen auf existierende Baustein-IDs zeigen
      bausteinRefsValid: xref.filter(h => h.startsWith('baukasten.html?b='))
        .every(h => bausteinIds.includes(h.replace('baukasten.html?b=', ''))),
      hasBausteinRef: xref.some(h => h.startsWith('baukasten.html?b=')),
      pageRefs: [...new Set(xref.filter(h => !h.startsWith('baukasten.html?b=')).map(h => h.split('?')[0]))],
    };
  });
  // HEAD-Check: jede Download-Datei ist wirklich abrufbar
  let dlExist = dataLinks.dlCount === EXPECTED_DATEIEN && dataLinks.allBeispieldaten;
  for (const href of dataLinks.dlHrefs) {
    const url = TARGET.replace(/baukasten\.html.*$/, href);
    const resp = await page.request.get(url).catch(() => null);
    if (!resp || !resp.ok()) { dlExist = false; break; }
  }
  // Ziel-Seiten der Querverweise (skills.html / prompts.html) existieren
  let pageRefsExist = true;
  for (const ref of dataLinks.pageRefs) {
    const url = TARGET.replace(/baukasten\.html.*$/, ref);
    const resp = await page.request.get(url).catch(() => null);
    if (!resp || !resp.ok()) { pageRefsExist = false; break; }
  }
  check('08_beispieldaten_downloads_and_xref',
    dlExist && dataLinks.bausteinRefsValid && dataLinks.hasBausteinRef && dataLinks.xrefCount > 0 && pageRefsExist,
    dataLinks);

  // ---------- (9) Bewertung: rate:baustein:* persistiert + Namespace sauber ----------
  await page.evaluate((id) => { openModal(id); switchTab('ratings'); }, DEEPLINK_ID);
  await page.waitForTimeout(200);
  await page.evaluate((id) => { document.querySelector(`#star-input-${id} .star-btn[data-val="4"]`).click(); }, DEEPLINK_ID);
  await page.waitForTimeout(200);
  const rateInfo = await page.evaluate((id) => ({
    lsKey: localStorage.getItem('rate:baustein:' + id),
    foreignKeys: Object.keys(localStorage).filter(k => k.startsWith('rate:skill:') || k.startsWith('rate:prompt:') || k.startsWith('rate:asset:') || k.startsWith('vote:')).length,
  }), DEEPLINK_ID);
  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#bk-grid .baustein-card', { timeout: 10000 });
  const rateReload = await page.evaluate((id) => localStorage.getItem('rate:baustein:' + id), DEEPLINK_ID);
  check('09_rating_persists_namespaced',
    rateInfo.lsKey === '4' && rateInfo.foreignKeys === 0 && rateReload === '4',
    { rateInfo, rateReload });

  // ---------- (10) Deep-Link ?b=<id>: kanonischer Hash, Modal offen, Karte hervorgehoben ----------
  await page.goto('about:blank');
  await page.goto(TARGET + '?b=' + DEEPLINK_ID, { waitUntil: 'load' });
  await page.waitForTimeout(1100); // applyDeepLink + fonts.ready-Reanchor
  const deepInfo = await page.evaluate((id) => {
    const card = document.getElementById('baustein-' + id);
    return {
      hash: location.hash,
      canonical: location.hash === '#b/' + id,
      modalOpen: document.getElementById('modal-overlay').classList.contains('open'),
      modalName: (document.getElementById('modal-name') || {}).textContent || '',
      highlighted: !!card && card.classList.contains('-highlight'),
    };
  }, DEEPLINK_ID);
  check('10_deeplink_opens_baustein',
    deepInfo.canonical && deepInfo.modalOpen && deepInfo.modalName === DEEPLINK_NAME && deepInfo.highlighted,
    deepInfo);

  // ---------- (11) „Baustein einreichen": Demo-Flow bis Danke ----------
  await page.evaluate(() => closeModal());
  await page.evaluate(() => { document.getElementById('bk-submit-cta').click(); });
  await page.waitForSelector('#submit-overlay.open', { timeout: 5000 });
  const flowInfo = await page.evaluate(() => ({
    title: (document.getElementById('sf-title') || {}).textContent || '',
    steps: document.querySelectorAll('#submit-overlay .sf-step').length,
    demoNote: (document.querySelector('#submit-overlay .sf-demo-note') || {}).textContent || '',
  }));
  await page.fill('#submit-overlay [data-sf-key="name"]', 'Preis-Tabelle mit Hover');
  await page.selectOption('#submit-overlay [data-sf-key="kategorie"]', 'Daten');
  await page.fill('#submit-overlay [data-sf-key="wofuer"]', 'Vergleich von Paketen mit hervorgehobener Empfehlung.');
  await page.locator('#submit-overlay .sf-form button[type="submit"]').click();
  await page.waitForSelector('#sf-thanks', { timeout: 5000 });
  const thanksInfo = await page.evaluate(() => ({
    hasThanks: !!document.getElementById('sf-thanks'),
    draft: localStorage.getItem('submit:baustein:draft') || '',
  }));
  await page.evaluate(() => closeSubmitFlow());
  check('11_submit_flow_demo',
    /Baustein/.test(flowInfo.title) && flowInfo.steps === 3 && /Demo/.test(flowInfo.demoNote)
      && thanksInfo.hasThanks && thanksInfo.draft.includes('Preis-Tabelle mit Hover'),
    { flowInfo, thanksInfo });

  // ---------- (12) Nav & Footer: Baukasten aktiv, Mehr-Dropdown, IDs erhalten ----------
  const navInfo = await page.evaluate(() => {
    const el = document.getElementById('nav-baukasten');
    const menu = document.getElementById('nav-more-menu');
    return {
      exists: !!el, label: el ? el.textContent.trim() : '',
      active: !!el && el.classList.contains('active'),
      ariaCurrent: el ? el.getAttribute('aria-current') : '',
      hasCatalog: !!document.getElementById('nav-catalog'),
      hasPrompts: !!document.getElementById('nav-prompts'),
      hasHilfe: !!document.getElementById('nav-hilfe'),
      hasLernen: !!document.getElementById('nav-lernen'),
      hasBibliothek: !!document.getElementById('nav-bibliothek'),
      hasMoreBtn: !!document.getElementById('nav-more-btn'),
      moreHasLernen: !!(menu && menu.querySelector('#nav-lernen')),
      moreHasBibliothek: !!(menu && menu.querySelector('#nav-bibliothek')),
      moreHasBaukasten: !!(menu && menu.querySelector('#nav-baukasten')),
      moreBtnActive: !!document.getElementById('nav-more-btn') && document.getElementById('nav-more-btn').classList.contains('active'),
      footer: !!document.querySelector('.site-footer'),
    };
  });
  check('12_nav_baukasten_active',
    navInfo.exists && navInfo.label === 'Baukasten' && navInfo.active && navInfo.ariaCurrent === 'page'
      && navInfo.hasCatalog && navInfo.hasPrompts && navInfo.hasHilfe && navInfo.hasLernen && navInfo.hasBibliothek
      && navInfo.hasMoreBtn && navInfo.moreHasLernen && navInfo.moreHasBibliothek && navInfo.moreHasBaukasten
      && navInfo.moreBtnActive && navInfo.footer,
    navInfo);

  // ---------- (13) Viewport-spezifisch: Dropdown Desktop vs. flach mobil ----------
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
    check('13_more_dropdown_desktop',
      opened.expanded === 'true' && opened.menuVisible && closedAfterEsc,
      { opened, closedAfterEsc });
  } else {
    const mobileNav = await page.evaluate(() => {
      const btn = document.getElementById('nav-more-btn');
      const baukasten = document.getElementById('nav-baukasten');
      const biblio = document.getElementById('nav-bibliothek');
      return {
        moreBtnHidden: !btn || getComputedStyle(btn).display === 'none',
        baukastenVisible: !!baukasten && baukasten.offsetParent !== null,
        biblioVisible: !!biblio && biblio.offsetParent !== null,
      };
    });
    check('13_more_flat_mobile',
      mobileNav.moreBtnHidden && mobileNav.baukastenVisible && mobileNav.biblioVisible,
      mobileNav);
  }

  // ---------- Abschluss ----------
  check('14_no_js_errors_total', jsErrors.length === 0, {
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
  await page.waitForTimeout(1600); // animateCount ausrollen lassen

  const indexInfo = await page.evaluate(() => ({
    routerTile: !!document.querySelector('.rt-grid a.rt-card[href="baukasten.html"]'),
    routerTileDest: (document.querySelector('.rt-grid a.rt-card[href="baukasten.html"] .rt-dest') || {}).textContent || '',
    biblioTileStillThere: !!document.querySelector('.rt-grid a.rt-card[href="bibliothek.html"]'),
    noBaukastenTeaser: !document.querySelector('.rt-card[data-teaser="baukasten"]')
      && (typeof TEASER === 'undefined' || !('baukasten' in TEASER)),
    areaCount: parseInt((document.getElementById('area-baukasten-count') || {}).textContent || '-1', 10),
    areaMeta: (document.getElementById('area-baukasten-meta') || {}).textContent || '',
    areaCta: !!document.querySelector('.area-card a.c-cta[href="baukasten.html"]'),
    areaSpotHref: (document.querySelector('a.area-spot[href^="baukasten.html?b="]') || { getAttribute: () => '' }).getAttribute('href') || '',
    areaSpotRating: (document.getElementById('area-baukasten-spot-rating') || {}).textContent || '',
    livePills: document.querySelectorAll('.area-card .area-pill.-live').length,
    soonPills: document.querySelectorAll('.area-card .area-pill.-soon').length,
    navBaukasten: !!document.getElementById('nav-baukasten'),
    newsHasBaukasten: [...document.querySelectorAll('.news-item .news-text a')].some(a => a.getAttribute('href') === 'baukasten.html'),
    newsCount: document.querySelectorAll('.news-item').length,
    dataBausteine: typeof BAUSTEINE !== 'undefined' ? BAUSTEINE.length : -1,
  }));
  check('i1_index_no_js_errors', jsErrors.length === 0, { jsErrors: [...jsErrors] });
  check('i2_router_tile_links_baukasten',
    indexInfo.routerTile && indexInfo.noBaukastenTeaser && /Baukasten/.test(indexInfo.routerTileDest)
      && indexInfo.biblioTileStillThere,
    { routerTile: indexInfo.routerTile, dest: indexInfo.routerTileDest, noBaukastenTeaser: indexInfo.noBaukastenTeaser, biblioTileStillThere: indexInfo.biblioTileStillThere });
  check('i3_counts_match_data',
    indexInfo.areaCount === EXPECTED_TOTAL && indexInfo.dataBausteine === EXPECTED_TOTAL
      && indexInfo.areaMeta.includes(String(EXPECTED_LEUCHTTUERME))
      && indexInfo.areaMeta.includes(String(EXPECTED_DATEIEN)),
    { areaCount: indexInfo.areaCount, meta: indexInfo.areaMeta, dataBausteine: indexInfo.dataBausteine });
  check('i4_area_card_clickable',
    indexInfo.areaCta && indexInfo.areaSpotHref === 'baukasten.html?b=' + LEUCHTTURM
      && indexInfo.areaSpotRating.trim().length > 0 && indexInfo.navBaukasten
      && indexInfo.livePills === 6 && indexInfo.soonPills === 1,
    { areaCta: indexInfo.areaCta, areaSpotHref: indexInfo.areaSpotHref,
      areaSpotRating: indexInfo.areaSpotRating, navBaukasten: indexInfo.navBaukasten,
      livePills: indexInfo.livePills, soonPills: indexInfo.soonPills });
  check('i5_news_mentions_baukasten',
    indexInfo.newsHasBaukasten && indexInfo.newsCount >= 3 && indexInfo.newsCount <= 4,
    { newsHasBaukasten: indexInfo.newsHasBaukasten, newsCount: indexInfo.newsCount });

  // Router-Kachel navigiert wirklich
  await page.click('.rt-grid a.rt-card[href="baukasten.html"]');
  await page.waitForTimeout(1200);
  const landed = await page.evaluate(() =>
    location.pathname.endsWith('baukasten.html') && document.querySelectorAll('#bk-grid .baustein-card').length > 0);
  check('i6_router_tile_navigates', landed, { url: page.url() });

  // Nav-Regression: nav-baukasten auf allen Bestandsseiten vorhanden, nicht aktiv
  const navPages = {};
  for (const p of ['skills.html', 'prompts.html', 'hilfe.html', 'lernen.html', 'bibliothek.html']) {
    await page.goto(INDEX_TARGET.replace(/index\.html.*$/, p), { waitUntil: 'load' });
    await page.waitForSelector('#nav-baukasten', { timeout: 10000 }).catch(() => {});
    navPages[p] = await page.evaluate(() => {
      const el = document.getElementById('nav-baukasten');
      return {
        exists: !!el,
        href: el ? el.getAttribute('href') : '',
        notActive: !!el && !el.classList.contains('active'),
        hasLernen: !!document.getElementById('nav-lernen'),
        hasBibliothek: !!document.getElementById('nav-bibliothek'),
      };
    });
  }
  check('i7_nav_baukasten_on_all_pages',
    Object.values(navPages).every(n => n.exists && n.href === 'baukasten.html' && n.notActive && n.hasLernen && n.hasBibliothek),
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
