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

// E11-IA: Der Baukasten ist in vorlagen.html (Tab „Bausteine", Standard-Tab)
// aufgegangen; baukasten.html ist nur noch ein Redirect-Stub (siehe neuer Test
// weiter unten). Suite akzeptiert weiter eine Basis-URL (Runner ruft alle
// Suiten mit der Origin auf) und ergänzt dann selbst vorlagen.html.
const ARG = process.argv[2] || 'http://localhost:8412/vorlagen.html';
const TARGET = /\.html/.test(ARG) ? ARG : new URL('vorlagen.html', ARG).href;
const INDEX_TARGET = TARGET.replace(/vorlagen\.html.*$/, 'index.html');

// Soll-Werte (Stand E7, 2026-07-17), abgeleitet aus data/bausteine.js:
const EXPECTED_TOTAL = 12;          // BAUSTEINE.length
const EXPECTED_LEUCHTTUERME = 4;
const EXPECTED_DATEIEN = 8;         // BEISPIELDATEN.length (E7-Nachschlag: +1 Briefing, +2 SVG-Testbilder)
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
  // E11-Soll: die Hero-Stat-Zähler (#bk-stat-*) sind mit dem Hero entfallen
  // (kompakter .page-head) — Daten==DOM==BAUKASTEN_STATS bleibt der volle Abgleich;
  // zusätzlich wird abgesichert, dass die alten Stat-Zähler wirklich weg sind (-1).
  check('01_load_counts_no_js_errors',
    jsErrors.length === 0
      && counts.dataTotal === EXPECTED_TOTAL && counts.statTotal === EXPECTED_TOTAL && counts.idsUnique
      && counts.domCards === EXPECTED_TOTAL
      && counts.dataLeucht === EXPECTED_LEUCHTTUERME
      && counts.dataDateien === EXPECTED_DATEIEN && counts.statDateien === EXPECTED_DATEIEN
      && counts.domDataCards === EXPECTED_DATEIEN
      && counts.heroBausteine === -1 && counts.heroLeucht === -1
      && counts.heroDateien === -1,
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
      allBeispieldaten: dl.every(h => /^beispieldaten\/.+\.(csv|md|svg)$/.test(h)),
      xrefHrefs: xref,
      xrefCount: xref.length,
      // Baustein-Querverweise müssen auf existierende Baustein-IDs zeigen
      // E11-IA: data/bausteine.js verlinkt jetzt direkt auf vorlagen.html?b= (kein Stub-Hop)
      bausteinRefsValid: xref.filter(h => h.startsWith('vorlagen.html?b='))
        .every(h => bausteinIds.includes(h.replace('vorlagen.html?b=', ''))),
      hasBausteinRef: xref.some(h => h.startsWith('vorlagen.html?b=')),
      pageRefs: [...new Set(xref.filter(h => !h.startsWith('vorlagen.html?b=')).map(h => h.split('?')[0]))],
    };
  });
  // HEAD-Check: jede Download-Datei ist wirklich abrufbar
  // E11-IA: TARGET zeigt jetzt auf vorlagen.html — Basis-URL entsprechend ableiten.
  let dlExist = dataLinks.dlCount === EXPECTED_DATEIEN && dataLinks.allBeispieldaten;
  for (const href of dataLinks.dlHrefs) {
    const url = TARGET.replace(/vorlagen\.html.*$/, href);
    const resp = await page.request.get(url).catch(() => null);
    if (!resp || !resp.ok()) { dlExist = false; break; }
  }
  // Ziel-Seiten der Querverweise (skills.html / prompts.html) existieren
  let pageRefsExist = true;
  for (const ref of dataLinks.pageRefs) {
    const url = TARGET.replace(/vorlagen\.html.*$/, ref);
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

  // ---------- (12) Nav & Footer: 5 flache Links, #nav-vorlagen aktiv, kein Mehr-Dropdown ----------
  // E11-IA: das „Mehr ▾"-Dropdown (#nav-more-btn/#nav-more-menu) und die separaten
  // #nav-bibliothek/#nav-baukasten sind entfallen — die Hauptnav zeigt jetzt exakt
  // 5 flache Punkte, #nav-vorlagen führt auf vorlagen.html und ist hier aktiv.
  const navInfo = await page.evaluate(() => {
    const el = document.getElementById('nav-vorlagen');
    const navLinks = [...document.querySelectorAll('.site-header .main-nav .nav-link')];
    return {
      exists: !!el, label: el ? el.textContent.trim() : '',
      href: el ? el.getAttribute('href') : '',
      active: !!el && el.classList.contains('active'),
      ariaCurrent: el ? el.getAttribute('aria-current') : '',
      navLinkCount: navLinks.length,
      hasCatalog: !!document.getElementById('nav-catalog'),
      hasPrompts: !!document.getElementById('nav-prompts'),
      hasShowroom: !!document.getElementById('nav-showroom'),
      hasHilfe: !!document.getElementById('nav-hilfe'),
      noMoreBtn: !document.getElementById('nav-more-btn'),
      noMoreMenu: !document.getElementById('nav-more-menu'),
      noBibliothek: !document.getElementById('nav-bibliothek'),
      noBaukasten: !document.getElementById('nav-baukasten'),
      footer: !!document.querySelector('.site-footer'),
    };
  });
  check('12_nav_vorlagen_active_no_dropdown',
    navInfo.exists && navInfo.label === 'Vorlagen' && navInfo.href === 'vorlagen.html'
      && navInfo.active && navInfo.ariaCurrent === 'page' && navInfo.navLinkCount === 5
      && navInfo.hasCatalog && navInfo.hasPrompts && navInfo.hasShowroom && navInfo.hasHilfe
      && navInfo.noMoreBtn && navInfo.noMoreMenu && navInfo.noBibliothek && navInfo.noBaukasten
      && navInfo.footer,
    navInfo);

  // ---------- (13) Alle 5 Nav-Punkte sichtbar — Desktop wie Mobil (kein Dropdown mehr) ----------
  // E11-IA: da es keinen Dropdown-Fall mehr gibt, ersetzt ein einzelner Sichtbarkeits-
  // Check je Viewport den früheren Desktop/Mobil-Ast.
  const flatNav = await page.evaluate(() => {
    const links = [...document.querySelectorAll('.site-header .main-nav .nav-link')];
    return { count: links.length, allVisible: links.every(a => a.offsetParent !== null) };
  });
  check('13_nav_flat_all_viewports', flatNav.count === 5 && flatNav.allVisible, flatNav);

  // ---------- (14) Redirect-Stub: baukasten.html?b=<id> -> vorlagen.html, Bausteine-Tab + Modal ----------
  // E11-IA: NEU — baukasten.html hält Deep-Links am Leben. ?b=<id> muss auf
  // vorlagen.html landen (Bausteine ist der Standard-Tab) und das passende Modal öffnen.
  const stubBase = TARGET.replace(/vorlagen\.html.*$/, '');
  await page.goto('about:blank');
  await page.goto(stubBase + 'baukasten.html?b=' + DEEPLINK_ID, { waitUntil: 'load' });
  await page.waitForFunction(() => /vorlagen\.html/.test(location.pathname), { timeout: 6000 }).catch(() => {});
  await page.waitForTimeout(1100); // applyDeepLink + fonts.ready-Reanchor (wie Check 10)
  const stubInfo = await page.evaluate(() => ({
    landedOnVorlagen: location.pathname.endsWith('vorlagen.html'),
    bausteineTabActive: !!document.getElementById('vltab-bausteine') && document.getElementById('vltab-bausteine').classList.contains('active'),
    panelBausteineVisible: !!document.getElementById('panel-bausteine') && !document.getElementById('panel-bausteine').hidden,
    modalOpen: !!document.getElementById('modal-overlay') && document.getElementById('modal-overlay').classList.contains('open'),
    modalName: (document.getElementById('modal-name') || {}).textContent || '',
  }));
  check('14_stub_baukasten_redirect_deeplink',
    stubInfo.landedOnVorlagen && stubInfo.bausteineTabActive && stubInfo.panelBausteineVisible
      && stubInfo.modalOpen && stubInfo.modalName === DEEPLINK_NAME,
    stubInfo);

  // ---------- Abschluss ----------
  check('15_no_js_errors_total', jsErrors.length === 0, {
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

  // E11-IA: die Baukasten-Kachel/CTA/Spot verlinken jetzt vorlagen.html (Bausteine-
  // Standard-Tab) bzw. vorlagen.html?b=<id> statt baukasten.html (Punkt 4 der IA-
  // Vorgabe). Die Assets-Kachel (vormals Bibliothek) bleibt als eigene Kachel auf
  // vorlagen.html?tab=assets bestehen — beide Kacheln führen auf dieselbe Seite.
  const indexInfo = await page.evaluate(() => ({
    areaCtaText: (document.querySelector('.areas-grid .area-cta-row a[href="vorlagen.html"]') || {}).textContent || '',
    assetsCtaStillThere: !!document.querySelector('.areas-grid .area-cta-row a[href="vorlagen.html?tab=assets"]'),
    noRouter: !document.querySelector('.rt-grid') && !document.querySelector('.rt-card')
      && (typeof TEASER === 'undefined' || !('baukasten' in TEASER)),
    areaCount: parseInt((document.getElementById('area-baukasten-count') || {}).textContent || '-1', 10),
    areaMeta: (document.getElementById('area-baukasten-meta') || {}).textContent || '',
    areaCta: !!document.querySelector('.area-card a.c-cta[href="vorlagen.html"]'),
    areaSpotHref: (document.querySelector('a.area-spot[href^="vorlagen.html?b="]') || { getAttribute: () => '' }).getAttribute('href') || '',
    areaSpotRating: (document.getElementById('area-baukasten-spot-rating') || {}).textContent || '',
    livePills: document.querySelectorAll('.area-card .area-pill.-live').length,
    soonPills: document.querySelectorAll('.area-card .area-pill.-soon').length,
    navVorlagen: !!document.getElementById('nav-vorlagen'),
    newsHasBaukasten: [...document.querySelectorAll('.news-item .news-text a')].some(a => a.getAttribute('href') === 'vorlagen.html'),
    newsCount: document.querySelectorAll('.news-item').length,
    dataBausteine: typeof BAUSTEINE !== 'undefined' ? BAUSTEINE.length : -1,
  }));
  check('i1_index_no_js_errors', jsErrors.length === 0, { jsErrors: [...jsErrors] });
    // E12: Schnellzugriff-Kacheln (.rt-grid) auf Nutzerwunsch entfernt —
    // der Index-Einstieg in den Bereich läuft über die Bereichs-Karten-CTAs.
  check('i2_area_card_links_vorlagen',
    indexInfo.noRouter && /Baukasten/.test(indexInfo.areaCtaText) && indexInfo.assetsCtaStillThere,
    { noRouter: indexInfo.noRouter, ctaText: indexInfo.areaCtaText, assetsCtaStillThere: indexInfo.assetsCtaStillThere });
  check('i3_counts_match_data',
    indexInfo.areaCount === EXPECTED_TOTAL && indexInfo.dataBausteine === EXPECTED_TOTAL
      && indexInfo.areaMeta.includes(String(EXPECTED_LEUCHTTUERME))
      && indexInfo.areaMeta.includes(String(EXPECTED_DATEIEN)),
    { areaCount: indexInfo.areaCount, meta: indexInfo.areaMeta, dataBausteine: indexInfo.dataBausteine });
  check('i4_area_card_clickable',
    indexInfo.areaCta && indexInfo.areaSpotHref === 'vorlagen.html?b=' + LEUCHTTURM
      && indexInfo.areaSpotRating.trim().length > 0 && indexInfo.navVorlagen
      && indexInfo.livePills === 6 && indexInfo.soonPills === 0,
    { areaCta: indexInfo.areaCta, areaSpotHref: indexInfo.areaSpotHref,
      areaSpotRating: indexInfo.areaSpotRating, navVorlagen: indexInfo.navVorlagen,
      livePills: indexInfo.livePills, soonPills: indexInfo.soonPills });
  check('i5_news_mentions_baukasten',
    indexInfo.newsHasBaukasten && indexInfo.newsCount >= 3 && indexInfo.newsCount <= 4,
    { newsHasBaukasten: indexInfo.newsHasBaukasten, newsCount: indexInfo.newsCount });

  // Bereichs-CTA navigiert wirklich
  await page.click('.areas-grid .area-cta-row a[href="vorlagen.html"]');
  await page.waitForTimeout(1200);
  const landed = await page.evaluate(() =>
    location.pathname.endsWith('vorlagen.html') && document.querySelectorAll('#bk-grid .baustein-card').length > 0);
  check('i6_area_cta_navigates', landed, { url: page.url() });

  // Nav-Regression: nav-vorlagen auf allen Bestandsseiten vorhanden, mit korrektem
  // href — aktiv genau dann, wenn die jeweilige Seite selbst vorlagen.html ist.
  const navPages = {};
  for (const p of ['skills.html', 'prompts.html', 'lernen-hilfe.html', 'showroom.html', 'vorlagen.html']) {
    await page.goto(INDEX_TARGET.replace(/index\.html.*$/, p), { waitUntil: 'load' });
    await page.waitForSelector('#nav-vorlagen', { timeout: 10000 }).catch(() => {});
    navPages[p] = await page.evaluate((page) => {
      const el = document.getElementById('nav-vorlagen');
      return {
        exists: !!el,
        href: el ? el.getAttribute('href') : '',
        activeMatchesPage: !!el && el.classList.contains('active') === (page === 'vorlagen.html'),
      };
    }, p);
  }
  check('i7_nav_vorlagen_on_all_pages',
    Object.values(navPages).every(n => n.exists && n.href === 'vorlagen.html' && n.activeMatchesPage),
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
