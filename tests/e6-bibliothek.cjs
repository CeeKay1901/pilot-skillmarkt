#!/usr/bin/env node
/**
 * E6-Messlatte für die Asset-Bibliothek (bibliothek.html) des pilot AI Marketplace.
 *
 * Prüft: reale Hero-Zahlen, Lizenz-Hygiene (nur OFL/MIT/ISC/CC0, KEINE Fontshare/
 * ITF-Fonts), Font-Kategorie-Filter, Font-Live-Vorschau am Größen-Regler,
 * Hex-Klick-Kopie, WCAG-Kontrast-Badges (echte Formel), Icon-Suche, Detail-Modal
 * mit Tabs, Bewertung (rate:asset:*), Deep-Link ?a=<id>, „Asset vorschlagen“-Demo,
 * die Nav-Regression (Mehr-Dropdown + IDs) und die Verzahnung mit der Startseite.
 * Muster: tests/e10-lernenhilfe.cjs.
 *
 * Aufruf:
 *   PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright node tests/e6-bibliothek.cjs [URL]
 *   Server extern: python3 -m http.server 8412 (im Projekt-Root)
 *   Default-URL: http://localhost:8412/bibliothek.html
 *
 * Ausgabe: strukturiertes JSON auf stdout. Exit 0 = alle grün, 1 = ein Check rot.
 */

const { chromium } = require('/usr/lib/node_modules/playwright');

// E11-IA: Die Asset-Bibliothek ist in vorlagen.html (Tab „Design-Assets“)
// aufgegangen; bibliothek.html ist nur noch ein Redirect-Stub (siehe Check 16
// unten). Suite akzeptiert weiter eine Basis-URL (Runner ruft alle Suiten mit
// der Origin auf) und ergänzt dann selbst vorlagen.html?tab=assets.
const ARG = process.argv[2] || 'http://localhost:8412/vorlagen.html?tab=assets';
const TARGET = /\.html/.test(ARG) ? ARG : new URL('vorlagen.html?tab=assets', ARG).href;
const INDEX_TARGET = TARGET.replace(/vorlagen\.html.*$/, 'index.html');

// Soll-Werte (Stand E6, 2026-07-17), abgeleitet aus data/assets.js:
const EXPECTED_TOTAL = 30;      // ASSETS = Fonts + Paletten + Muster + Icon-Sets
const EXPECTED_FONTS = 9;
const EXPECTED_PALETTES = 7;
const EXPECTED_PATTERNS = 10;   // 7 SVG-Muster + 3 Gradients
const EXPECTED_ICONS = 48;      // LUCIDE_ICONS (durchsuchbar)
const EXPECTED_ICONSETS = 4;
const HIGHLIGHT_ID = 'inter';
const DEEPLINK_ID = 'fraunces';
const ALLOWED_LICENSES = ['OFL', 'Apache-2.0', 'MIT', 'ISC', 'CC0'];
const FORBIDDEN_FONTS = ['satoshi', 'clash', 'general sans', 'cabinet'];

const VIEWPORTS = [
  { name: 'desktop', viewport: { width: 1280, height: 800 } },
  { name: 'mobile', viewport: { width: 390, height: 844 } },
];

// WCAG-Relativluminanz — Gegenprobe zu den in den Daten gespeicherten Ratios.
function _lin(c) { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
function _lum(hex) {
  const h = hex.replace('#', '');
  return 0.2126 * _lin(parseInt(h.slice(0, 2), 16)) + 0.7152 * _lin(parseInt(h.slice(2, 4), 16)) + 0.0722 * _lin(parseInt(h.slice(4, 6), 16));
}
function wcag(fg, bg) { const a = _lum(fg), b = _lum(bg); return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05); }

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

  // ---------- (1) Laden: 0 JS-Fehler + Soll-Zahlen (Daten == DOM) ----------
  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#font-grid .font-card', { timeout: 10000 });
  await page.waitForTimeout(600);
  const counts = await page.evaluate(() => ({
    dataTotal: ASSETS.length,
    dataFonts: FONTS.length,
    dataPalettes: PALETTES.length,
    dataPatterns: PATTERNS.length,
    dataIcons: LUCIDE_ICONS.length,
    dataIconsets: ICONSETS.length,
    domFonts: document.querySelectorAll('#font-grid .font-card').length,
    domPalettes: document.querySelectorAll('#pal-grid .pal-card').length,
    domPatterns: document.querySelectorAll('#pat-grid .pat-card').length,
    domIcons: document.querySelectorAll('#icon-grid .icon-cell').length,
    domIconsets: document.querySelectorAll('#iconset-grid .iconset-card').length,
    idsUnique: new Set(ASSETS.map(a => a.id)).size === ASSETS.length,
    heroFonts: parseInt((document.getElementById('stat-fonts') || {}).textContent || '-1', 10),
    heroIcons: parseInt((document.getElementById('stat-icons') || {}).textContent || '-1', 10),
    heroPalettes: parseInt((document.getElementById('stat-palettes') || {}).textContent || '-1', 10),
    heroPatterns: parseInt((document.getElementById('stat-patterns') || {}).textContent || '-1', 10),
  }));
  // E11-Soll: die Hero-Stat-Zähler (#stat-fonts/-icons/-palettes/-patterns) sind mit
  // dem Hero entfallen (kompakter .page-head) — Daten==DOM bleibt der volle Abgleich;
  // zusätzlich wird abgesichert, dass die alten Stat-Zähler wirklich weg sind (-1).
  check('01_load_counts_no_js_errors',
    jsErrors.length === 0
      && counts.dataTotal === EXPECTED_TOTAL && counts.idsUnique
      && counts.dataFonts === EXPECTED_FONTS && counts.domFonts === EXPECTED_FONTS
      && counts.dataPalettes === EXPECTED_PALETTES && counts.domPalettes === EXPECTED_PALETTES
      && counts.dataPatterns === EXPECTED_PATTERNS && counts.domPatterns === EXPECTED_PATTERNS
      && counts.dataIcons === EXPECTED_ICONS && counts.domIcons === EXPECTED_ICONS
      && counts.dataIconsets === EXPECTED_ICONSETS && counts.domIconsets === EXPECTED_ICONSETS
      && counts.heroFonts === -1 && counts.heroIcons === -1
      && counts.heroPalettes === -1 && counts.heroPatterns === -1,
    { jsErrors: [...jsErrors], ...counts, blockedResourceErrors: blockedResourceErrors.length });

  // ---------- (2) Lizenz-Hygiene (Kern E6) ----------
  const licInfo = await page.evaluate((forbidden) => {
    const fonts = FONTS.map(f => f.lizenz);
    const iconsets = ICONSETS.map(s => s.lizenz);
    const names = FONTS.map(f => f.name.toLowerCase());
    return {
      fontsAllOFL: FONTS.every(f => /Open Font License/i.test(f.lizenz)),
      iconsetsOk: ICONSETS.every(s => ['ISC', 'MIT', 'CC0'].includes(s.lizenz)),
      noForbidden: !names.some(n => forbidden.some(bad => n.includes(bad))),
      fontCardsHaveLicense: [...document.querySelectorAll('#font-grid .font-card')].every(c => /OFL|Open Font/i.test(c.textContent)),
      iconsetCardsHaveLicense: [...document.querySelectorAll('#iconset-grid .iconset-card')].every(c => /ISC|MIT|CC0/.test(c.textContent)),
      patternsHaveNote: [...document.querySelectorAll('#pat-grid .pat-card')].every(c => /frei|MIT|CC0/i.test(c.textContent)),
      fonts, iconsets,
    };
  }, FORBIDDEN_FONTS);
  check('02_license_hygiene',
    licInfo.fontsAllOFL && licInfo.iconsetsOk && licInfo.noForbidden
      && licInfo.fontCardsHaveLicense && licInfo.iconsetCardsHaveLicense && licInfo.patternsHaveNote,
    licInfo);

  // ---------- (3) Externe Quell-Links: target=_blank + rel=noopener + https ----------
  const linkInfo = await page.evaluate(() => {
    const ext = [...document.querySelectorAll('#iconset-grid a[target="_blank"]')];
    return {
      count: ext.length,
      allBlank: ext.every(a => a.getAttribute('target') === '_blank'),
      allNoopener: ext.every(a => /\bnoopener\b/.test(a.getAttribute('rel') || '')),
      allHttps: ext.every(a => /^https:\/\//.test(a.getAttribute('href') || '')),
    };
  });
  check('03_external_links_safe',
    linkInfo.count === EXPECTED_ICONSETS && linkInfo.allBlank && linkInfo.allNoopener && linkInfo.allHttps,
    linkInfo);

  // ---------- (4) Font-Kategorie-Filter: Serif zeigt nur Serifen, Reset zeigt alle ----------
  await page.evaluate(() => setFontKat('serif'));
  await page.waitForTimeout(200);
  const filterInfo = await page.evaluate(() => {
    const byId = Object.fromEntries(FONTS.map(f => [f.id, f]));
    const cards = [...document.querySelectorAll('#font-grid .font-card')];
    const expected = FONTS.filter(f => f.kategorie === 'serif').length;
    return {
      expected, domCards: cards.length,
      allSerif: cards.every(c => byId[c.dataset.id] && byId[c.dataset.id].kategorie === 'serif'),
      catActive: [...document.querySelectorAll('#font-cats .cat-tab')].some(t => t.classList.contains('active') && /Serif/.test(t.textContent)),
    };
  });
  await page.evaluate(() => setFontKat('all'));
  await page.waitForTimeout(200);
  const afterReset = await page.evaluate(() => document.querySelectorAll('#font-grid .font-card').length);
  check('04_font_category_filter',
    filterInfo.expected > 0 && filterInfo.domCards === filterInfo.expected && filterInfo.allSerif
      && filterInfo.catActive && afterReset === EXPECTED_FONTS,
    { ...filterInfo, afterReset });

  // ---------- (5) Signature: Font-Live-Vorschau reagiert auf den Größen-Regler ----------
  const beforeSize = await page.evaluate(() => document.getElementById('ff-sample-' + 'inter').style.fontSize);
  await page.evaluate(() => {
    const s = document.getElementById('ff-size-inter');
    s.value = '72'; s.dispatchEvent(new Event('input'));
  });
  await page.waitForTimeout(150);
  const afterSize = await page.evaluate(() => ({
    sampleSize: document.getElementById('ff-sample-inter').style.fontSize,
    valLabel: document.getElementById('ff-size-val-inter').textContent,
  }));
  check('05_font_preview_slider',
    beforeSize === '34px' && afterSize.sampleSize === '72px' && /72/.test(afterSize.valLabel),
    { beforeSize, ...afterSize });

  // ---------- (6) Hex-Klick kopiert (Toast) ----------
  await page.evaluate(() => { document.querySelector('#pal-grid .pal-card .swatch').click(); });
  await page.waitForTimeout(300);
  const copyInfo = await page.evaluate(() => ({
    toast: !!document.querySelector('#toast.show'),
    toastText: (document.getElementById('toast') || {}).textContent || '',
  }));
  check('06_hex_copy_toast', copyInfo.toast && /#/.test(copyInfo.toastText), copyInfo);

  // ---------- (7) Kontrast-Badges: vorhanden + WCAG-korrekt ----------
  const palData = await page.evaluate(() => PALETTES.map(p => ({ id: p.id, paare: p.paare })));
  const badgeInfo = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('#pal-grid .pal-card')];
    let badges = 0;
    const labels = new Set();
    cards.forEach(c => c.querySelectorAll('.kontrast-badge').forEach(b => { badges++; labels.add(b.textContent.trim()); }));
    return { badges, labels: [...labels], expectedPairs: PALETTES.reduce((s, p) => s + p.paare.length, 0) };
  });
  // Gegenprobe: jedes gespeicherte ratio stimmt mit der echten WCAG-Rechnung überein
  const ratioOk = palData.every(p => p.paare.every(pr => Math.abs(wcag(pr.fg, pr.bg) - pr.ratio) < 0.15));
  const labelsPlausible = badgeInfo.labels.every(l => ['AA', 'AA groß', 'unter AA'].includes(l));
  check('07_contrast_badges_wcag',
    badgeInfo.badges === badgeInfo.expectedPairs && badgeInfo.badges > 0
      && ratioOk && labelsPlausible && badgeInfo.labels.length > 0,
    { ...badgeInfo, ratioOk });

  // ---------- (8) Icon-Suche filtert ----------
  await page.evaluate(() => { const s = document.getElementById('icon-search'); s.value = 'kalender'; s.dispatchEvent(new Event('input')); });
  await page.waitForTimeout(300);
  const searchInfo = await page.evaluate(() => {
    const expected = LUCIDE_ICONS.filter(i => (i.name + ' ' + i.tags).toLowerCase().includes('kalender')).length;
    return { expected, domCells: document.querySelectorAll('#icon-grid .icon-cell').length };
  });
  await page.evaluate(() => { const s = document.getElementById('icon-search'); s.value = ''; s.dispatchEvent(new Event('input')); });
  await page.waitForTimeout(200);
  const searchReset = await page.evaluate(() => document.querySelectorAll('#icon-grid .icon-cell').length);
  check('08_icon_search_filters',
    searchInfo.expected > 0 && searchInfo.expected < EXPECTED_ICONS
      && searchInfo.domCells === searchInfo.expected && searchReset === EXPECTED_ICONS,
    { ...searchInfo, searchReset });

  // ---------- (9) Download-Links zeigen auf existierende woff2 ----------
  const dlInfo = await page.evaluate(() => {
    const links = [...document.querySelectorAll('#font-grid .font-card a[download]')];
    return {
      count: links.length,
      allWoff2: links.every(a => /^assets\/fonts\/.+\.woff2$/.test(a.getAttribute('href'))),
      hrefs: links.map(a => a.getAttribute('href')),
    };
  });
  // HEAD-Check: jede referenzierte Datei ist wirklich abrufbar
  let allExist = dlInfo.count === EXPECTED_FONTS && dlInfo.allWoff2;
  for (const href of dlInfo.hrefs) {
    // E11-IA: TARGET zeigt jetzt auf vorlagen.html — Basis-URL entsprechend ableiten.
    const url = TARGET.replace(/vorlagen\.html.*$/, href);
    const resp = await page.request.get(url).catch(() => null);
    if (!resp || !resp.ok()) { allExist = false; break; }
  }
  check('09_download_links_exist', allExist, dlInfo);

  // ---------- (10) Detail-Modal: Tabs (Vorschau/Einsatz/Bewertungen), switchTab, Esc ----------
  await page.evaluate((id) => openModal(id), HIGHLIGHT_ID);
  await page.waitForSelector('#modal-overlay.open', { timeout: 5000 });
  const modalInfo = await page.evaluate(() => {
    const tabs = [...document.querySelectorAll('#modal .modal-tabs .tab-btn')].map(b => b.textContent.trim());
    return {
      open: document.getElementById('modal-overlay').classList.contains('open'),
      name: (document.getElementById('modal-name') || {}).textContent || '',
      tabs,
      hasPreview: /am-font-sample|am-preview/.test(document.getElementById('modal-body').innerHTML),
    };
  });
  await page.evaluate(() => switchTab('einsatz'));
  await page.waitForTimeout(150);
  const einsatzOk = await page.evaluate(() => /@font-face|am-code/.test(document.getElementById('modal-body').innerHTML));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  const modalClosed = await page.evaluate(() => !document.getElementById('modal-overlay').classList.contains('open'));
  check('10_detail_modal_tabs',
    modalInfo.open && modalInfo.name === 'Inter' && modalInfo.tabs.length === 3
      && modalInfo.tabs[0] === 'Vorschau' && modalInfo.tabs[1] === 'Einsatz' && modalInfo.tabs[2] === 'Bewertungen'
      && modalInfo.hasPreview && einsatzOk && modalClosed,
    { modalInfo, einsatzOk, modalClosed });

  // ---------- (11) Bewertung: rate:asset:* persistiert + Namespace sauber ----------
  await page.evaluate((id) => { openModal(id); switchTab('ratings'); }, HIGHLIGHT_ID);
  await page.waitForTimeout(200);
  await page.evaluate((id) => { document.querySelector(`#star-input-${id} .star-btn[data-val="4"]`).click(); }, HIGHLIGHT_ID);
  await page.waitForTimeout(200);
  const rateInfo = await page.evaluate((id) => ({
    lsKey: localStorage.getItem('rate:asset:' + id),
    foreignKeys: Object.keys(localStorage).filter(k => k.startsWith('rate:skill:') || k.startsWith('rate:prompt:') || k.startsWith('vote:')).length,
  }), HIGHLIGHT_ID);
  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#font-grid .font-card', { timeout: 10000 });
  const rateReload = await page.evaluate((id) => localStorage.getItem('rate:asset:' + id), HIGHLIGHT_ID);
  check('11_rating_persists_namespaced',
    rateInfo.lsKey === '4' && rateInfo.foreignKeys === 0 && rateReload === '4',
    { rateInfo, rateReload });

  // ---------- (12) Deep-Link ?a=<id>: kanonischer Hash, Modal offen, Karte hervorgehoben ----------
  // Das Karten-Highlight ist BEWUSST transient: vorlagen.html setzt .-highlight und entfernt es
  // nach 2400 ms wieder. Auf der schweren Seite (lazy Vorschau-iframes) liegt zwischen DOMContent-
  // Loaded (da läuft applyDeepLink und setzt .-highlight) und dem 'load'-Event oft > 2400 ms — ein
  // einmaliges Lesen nach waitUntil:'load' verpasst das Fenster (Timing-Race, kein Produktfehler).
  // Wir warten daher nur bis 'domcontentloaded' und pollen das Highlight zeitnah, bevor der
  // 2400-ms-Timer greift. Absicht unverändert: kanonischer Hash + richtiges Modal offen + Karte hervorgehoben.
  // E11-IA: TARGET trägt bereits ?tab=assets — die Deep-Link-URL sauber per URL()
  // zusammenbauen statt zu konkatenieren (sonst entstünde ein zweites „?“ im String).
  await page.goto('about:blank');
  const deepUrlA = new URL(TARGET);
  deepUrlA.searchParams.set('a', DEEPLINK_ID);
  await page.goto(deepUrlA.href, { waitUntil: 'domcontentloaded' });
  let everHi = false;
  const deepT0 = Date.now();
  while (Date.now() - deepT0 < 2800) {
    const hi = await page.evaluate((id) => {
      const c = document.getElementById('asset-' + id);
      return !!c && c.classList.contains('-highlight');
    }, DEEPLINK_ID).catch(() => false);
    if (hi) { everHi = true; break; }
    await page.waitForTimeout(30);
  }
  await page.waitForTimeout(200); // Modal-/Hash-Zustand ausrollen lassen
  const deepInfo = await page.evaluate((id) => {
    const card = document.getElementById('asset-' + id);
    return {
      hash: location.hash,
      canonical: location.hash === '#a/' + id,
      modalOpen: document.getElementById('modal-overlay').classList.contains('open'),
      modalName: (document.getElementById('modal-name') || {}).textContent || '',
      highlightedNow: !!card && card.classList.contains('-highlight'),
    };
  }, DEEPLINK_ID);
  deepInfo.highlighted = everHi || deepInfo.highlightedNow; // im Poll-Fenster gesehen ODER noch aktiv
  check('12_deeplink_opens_asset',
    deepInfo.canonical && deepInfo.modalOpen && deepInfo.modalName === 'Fraunces' && deepInfo.highlighted,
    deepInfo);

  // ---------- (13) „Asset vorschlagen“: Demo-Flow bis Danke ----------
  await page.evaluate(() => closeModal());
  await page.evaluate(() => { document.getElementById('lib-submit-cta').click(); });
  await page.waitForSelector('#submit-overlay.open', { timeout: 5000 });
  const flowInfo = await page.evaluate(() => ({
    title: (document.getElementById('sf-title') || {}).textContent || '',
    steps: document.querySelectorAll('#submit-overlay .sf-step').length,
    demoNote: (document.querySelector('#submit-overlay .sf-demo-note') || {}).textContent || '',
  }));
  await page.fill('#submit-overlay [data-sf-key="name"]', 'Space Mono');
  await page.fill('#submit-overlay [data-sf-key="quelle"]', 'https://github.com/googlefonts/spacemono');
  await page.selectOption('#submit-overlay [data-sf-key="lizenz"]', 'OFL');
  await page.fill('#submit-overlay [data-sf-key="warum"]', 'Charakterstarke Monospace für Terminal-Momente und Headlines.');
  await page.locator('#submit-overlay .sf-form button[type="submit"]').click();
  await page.waitForSelector('#sf-thanks', { timeout: 5000 });
  const thanksInfo = await page.evaluate(() => ({
    hasThanks: !!document.getElementById('sf-thanks'),
    draft: localStorage.getItem('submit:asset:draft') || '',
  }));
  await page.evaluate(() => closeSubmitFlow());
  check('13_submit_flow_demo',
    /Asset/.test(flowInfo.title) && flowInfo.steps === 3 && /Demo/.test(flowInfo.demoNote)
      && thanksInfo.hasThanks && thanksInfo.draft.includes('Space Mono'),
    { flowInfo, thanksInfo });

  // ---------- (14) Nav & Footer: 5 flache Links, #nav-vorlagen aktiv, kein Mehr-Dropdown ----------
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
  check('14_nav_vorlagen_active_no_dropdown',
    navInfo.exists && navInfo.label === 'Vorlagen' && navInfo.href === 'vorlagen.html'
      && navInfo.active && navInfo.ariaCurrent === 'page' && navInfo.navLinkCount === 5
      && navInfo.hasCatalog && navInfo.hasPrompts && navInfo.hasShowroom && navInfo.hasHilfe
      && navInfo.noMoreBtn && navInfo.noMoreMenu && navInfo.noBibliothek && navInfo.noBaukasten
      && navInfo.footer,
    navInfo);

  // ---------- (15) Alle 5 Nav-Punkte sichtbar — Desktop wie Mobil (kein Dropdown mehr) ----------
  // E11-IA: da es keinen Dropdown-Fall mehr gibt, ersetzt ein einzelner Sichtbarkeits-
  // Check je Viewport den früheren Desktop/Mobil-Ast.
  const flatNav = await page.evaluate(() => {
    const links = [...document.querySelectorAll('.site-header .main-nav .nav-link')];
    return { count: links.length, allVisible: links.every(a => a.offsetParent !== null) };
  });
  check('15_nav_flat_all_viewports', flatNav.count === 5 && flatNav.allVisible, flatNav);

  // ---------- (16) Redirect-Stub: bibliothek.html?a=<id> -> vorlagen.html, Assets-Tab + Modal ----------
  // E11-IA: NEU — bibliothek.html hält Deep-Links am Leben. ?a=<id> muss auf
  // vorlagen.html landen, den Assets-Tab aktivieren und das passende Modal öffnen.
  const stubBase = TARGET.replace(/vorlagen\.html.*$/, '');
  await page.goto('about:blank');
  await page.goto(stubBase + 'bibliothek.html?a=' + DEEPLINK_ID, { waitUntil: 'load' });
  await page.waitForFunction(() => /vorlagen\.html/.test(location.pathname), { timeout: 6000 }).catch(() => {});
  await page.waitForTimeout(400);
  const stubInfo = await page.evaluate(() => ({
    landedOnVorlagen: location.pathname.endsWith('vorlagen.html'),
    hasTabAssets: new URLSearchParams(location.search).get('tab') === 'assets',
    assetsTabActive: !!document.getElementById('vltab-assets') && document.getElementById('vltab-assets').classList.contains('active'),
    panelAssetsVisible: !!document.getElementById('panel-assets') && !document.getElementById('panel-assets').hidden,
    modalOpen: !!document.getElementById('modal-overlay') && document.getElementById('modal-overlay').classList.contains('open'),
    modalName: (document.getElementById('modal-name') || {}).textContent || '',
  }));
  check('16_stub_bibliothek_redirect_deeplink',
    stubInfo.landedOnVorlagen && stubInfo.hasTabAssets && stubInfo.assetsTabActive
      && stubInfo.panelAssetsVisible && stubInfo.modalOpen && stubInfo.modalName === 'Fraunces',
    stubInfo);

  // ---------- Abschluss ----------
  check('17_no_js_errors_total', jsErrors.length === 0, {
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

  // E11-IA: die Bibliotheks-Kachel/CTA/Spot verlinken jetzt vorlagen.html?tab=assets
  // bzw. vorlagen.html?a=<id> statt bibliothek.html (Punkt 4 der IA-Vorgabe).
  const indexInfo = await page.evaluate(() => ({
    routerTile: !!document.querySelector('.rt-grid a.rt-card[href="vorlagen.html?tab=assets"]'),
    routerTileDest: (document.querySelector('.rt-grid a.rt-card[href="vorlagen.html?tab=assets"] .rt-dest') || {}).textContent || '',
    noBaukastenTeaser: !document.querySelector('.rt-card[data-teaser="baukasten"]')
      && (typeof TEASER === 'undefined' || !('baukasten' in TEASER)),
    areaCount: parseInt((document.getElementById('area-bibliothek-count') || {}).textContent || '-1', 10),
    areaMeta: (document.getElementById('area-bibliothek-meta') || {}).textContent || '',
    areaCta: !!document.querySelector('.area-card a.c-cta[href="vorlagen.html?tab=assets"]'),
    areaSpotHref: (document.querySelector('a.area-spot[href^="vorlagen.html?a="]') || { getAttribute: () => '' }).getAttribute('href') || '',
    areaSpotRating: (document.getElementById('area-bibliothek-spot-rating') || {}).textContent || '',
    livePills: document.querySelectorAll('.area-card .area-pill.-live').length,
    soonPills: document.querySelectorAll('.area-card .area-pill.-soon').length,
    navVorlagen: !!document.getElementById('nav-vorlagen'),
    newsHasBibliothek: [...document.querySelectorAll('.news-item .news-text a')].some(a => a.getAttribute('href') === 'vorlagen.html?tab=assets'),
    newsCount: document.querySelectorAll('.news-item').length,
    dataAssets: typeof ASSETS !== 'undefined' ? ASSETS.length : -1,
  }));
  check('i1_index_no_js_errors', jsErrors.length === 0, { jsErrors: [...jsErrors] });
  check('i2_router_tile_links_vorlagen_assets',
    indexInfo.routerTile && indexInfo.noBaukastenTeaser && /Bibliothek/.test(indexInfo.routerTileDest),
    { routerTile: indexInfo.routerTile, dest: indexInfo.routerTileDest, noBaukastenTeaser: indexInfo.noBaukastenTeaser });
  check('i3_counts_match_data',
    indexInfo.areaCount === EXPECTED_TOTAL && indexInfo.dataAssets === EXPECTED_TOTAL
      && indexInfo.areaMeta.includes(String(EXPECTED_FONTS))
      && indexInfo.areaMeta.includes(String(EXPECTED_ICONSETS))
      && indexInfo.areaMeta.includes(String(EXPECTED_PALETTES))
      && indexInfo.areaMeta.includes(String(EXPECTED_PATTERNS)),
    { areaCount: indexInfo.areaCount, meta: indexInfo.areaMeta, dataAssets: indexInfo.dataAssets });
  check('i4_area_card_clickable',
    indexInfo.areaCta && indexInfo.areaSpotHref === 'vorlagen.html?a=' + HIGHLIGHT_ID
      && indexInfo.areaSpotRating.trim().length > 0 && indexInfo.navVorlagen
      && indexInfo.livePills === 6 && indexInfo.soonPills === 0,
    { areaCta: indexInfo.areaCta, areaSpotHref: indexInfo.areaSpotHref,
      areaSpotRating: indexInfo.areaSpotRating, navVorlagen: indexInfo.navVorlagen,
      livePills: indexInfo.livePills, soonPills: indexInfo.soonPills });
  check('i5_news_mentions_bibliothek',
    indexInfo.newsHasBibliothek && indexInfo.newsCount >= 3 && indexInfo.newsCount <= 4,
    { newsHasBibliothek: indexInfo.newsHasBibliothek, newsCount: indexInfo.newsCount });

  // Router-Kachel navigiert wirklich
  await page.click('.rt-grid a.rt-card[href="vorlagen.html?tab=assets"]');
  await page.waitForTimeout(1200);
  const landed = await page.evaluate(() =>
    location.pathname.endsWith('vorlagen.html')
      && new URLSearchParams(location.search).get('tab') === 'assets'
      && document.querySelectorAll('#font-grid .font-card').length > 0);
  check('i6_router_tile_navigates', landed, { url: page.url() });

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
