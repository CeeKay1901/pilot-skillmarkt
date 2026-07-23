#!/usr/bin/env node
/**
 * E3-Messlatte für die Prompt-Sammlung (prompts.html) des pilot AI Marketplace.
 *
 * Prüft die Kernflüsse der Prompt-Sammlung (Etappe E3) gegen eine beliebige
 * Ziel-URL — Muster: tests/e1-regression.cjs.
 *
 * Aufruf:
 *   PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright node tests/e3-prompts.cjs [URL]
 *   Default-URL: http://localhost:8412/prompts.html
 *   Die Startseiten-Checks (Router-Kachel, Zähler) laufen gegen index.html
 *   im selben Verzeichnis der Ziel-URL.
 *
 * Ausgabe: strukturiertes JSON auf stdout (pro Check pass/fail + Messwerte).
 * Exit-Code 0 = alle Checks grün, 1 = mindestens ein Check rot.
 */

const { chromium } = require('/usr/lib/node_modules/playwright');

// E11-Soll: Suite akzeptiert jetzt auch eine Basis-URL (Runner ruft alle Suiten
// mit der Origin auf) und ergänzt dann selbst prompts.html.
const ARG = process.argv[2] || 'http://localhost:8412/prompts.html';
const TARGET = /\.html/.test(ARG) ? ARG : new URL('prompts.html', ARG).href;
const INDEX_TARGET = TARGET.replace(/prompts\.html.*$/, 'index.html');

// Soll-Werte (Stand E3, 2026-07-16), abgeleitet aus data/prompts.js:
// 23 Einträge gesamt — loslegen 3, bauen 4, texten 7, gestalten 2,
// praesentieren 4, media 3. 5 Leuchttürme (PROMPT_SPOTLIGHT) mit Builder.
const EXPECTED_TOTAL = 23;
const EXPECTED_TAB_COUNTS = {
  'Alle': 23,
  'Loslegen': 3,
  'Bauen': 4,
  'Texten': 7,
  'Gestalten': 2,
  'Präsentieren': 4,
  'Media': 3,
};
// Leuchttürme für die Detail-Checks (siehe PROMPT_SPOTLIGHT in data/prompts.js):
const CHAT_LIGHTHOUSE = 'briefing-zusammenfassung';   // preview.mode 'chat', Builder-Feld 'kunde', Varianten Kurz/Ausführlich
const TERMINAL_LIGHTHOUSE = 'vibecoding-kickoff';     // preview.mode 'terminal'
const PLAIN_PROMPT = 'meeting-todos';                 // Breite-Eintrag ohne Varianten/Builder (PROMPT_START)

const VIEWPORTS = [
  { name: 'desktop', viewport: { width: 1280, height: 800 } },
  { name: 'mobile', viewport: { width: 390, height: 844 } },
];

function isBlockedResourceError(text) {
  return /Failed to load resource|net::ERR_FAILED|net::ERR_BLOCKED|raw\.githubusercontent\.com|github\.com/i.test(text);
}

async function newPreparedContext(browser, vp) {
  const context = await browser.newContext({
    viewport: vp.viewport,
    reducedMotion: 'reduce', // Terminal-Vorschau rendert sofort komplett (playScript-Pfad)
  });
  // Clipboard-Stub: kopierten Text deterministisch abgreifen (headless-sicher)
  await context.addInitScript(() => {
    window.__copied = null;
    const stub = { writeText: t => { window.__copied = t; return Promise.resolve(); } };
    try { Object.defineProperty(navigator, 'clipboard', { value: stub, configurable: true }); } catch (e) {}
  });
  return context;
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

  // ---------- (1) Seite lädt mit 0 JS-Fehlern ----------
  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#prompts-grid .prompt-card', { timeout: 10000 });
  await page.waitForTimeout(600);
  const totalCards = await page.evaluate(() => document.querySelectorAll('#prompts-grid .prompt-card').length);
  check('01_load_no_js_errors', jsErrors.length === 0 && totalCards === EXPECTED_TOTAL, {
    jsErrors: [...jsErrors],
    totalCards, expectedTotal: EXPECTED_TOTAL,
    blockedResourceErrors: blockedResourceErrors.length,
  });

  // ---------- (1b) Karten-Anriss: Clamp schneidet keine dritte Zeile an ----------
  // Der Zwei-Zeilen-Clamp liegt auf dem padding-freien Inner-Element .cp-clamp.
  // Sichtbare Höhe muss ein ganzes Vielfaches der Zeilenhöhe sein (max. 2 Zeilen) —
  // ein Rest bedeutet: eine Zeile ist horizontal angeschnitten (alter E3-Bug).
  const clampInfo = await page.evaluate(() => {
    const els = [...document.querySelectorAll('#prompts-grid .card-prompt .cp-clamp')];
    let bad = 0, clamped = 0;
    els.forEach(el => {
      const lh = parseFloat(getComputedStyle(el).lineHeight);
      const lines = el.clientHeight / lh;
      if (Math.abs(lines - Math.round(lines)) > 0.05 || Math.round(lines) > 2) bad++;
      if (el.scrollHeight > el.clientHeight + 1) clamped++; // Clamp greift wirklich
    });
    return { count: els.length, bad, clamped };
  });
  check('01b_card_prompt_clamp_clean',
    clampInfo.count === EXPECTED_TOTAL && clampInfo.bad === 0 && clampInfo.clamped > 0,
    clampInfo);

  // ---------- (2) Aufgaben-Tabs: Karten-Anzahl pro Tab ----------
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
      ? await page.evaluate(() => document.querySelectorAll('#prompts-grid .prompt-card').length)
      : -1;
  }
  const countsOk = Object.entries(EXPECTED_TAB_COUNTS)
    .every(([k, v]) => measuredCounts[k] === v);
  check('02_task_tabs_and_counts', tabLabels.length >= 7 && countsOk, {
    tabLabels, expected: EXPECTED_TAB_COUNTS, measured: measuredCounts,
  });
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('#cat-tabs .cat-tab')]
      .find(b => b.textContent.trim().startsWith('Alle'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(250);

  // ---------- (3) Suche filtert ('briefing' -> Treffer, weniger als alle) ----------
  // E11-Soll: das separate Mobil-Suchfeld #search-m ist entfallen — das Feld #search
  // sitzt jetzt im Inhalts-Slot [data-page-search] und ist auf allen Breiten sichtbar.
  const searchSel = '#search';
  const slotInfo = await page.evaluate(() => {
    const slot = document.querySelector('[data-page-search]');
    const field = document.getElementById('search');
    return {
      fieldInSlot: !!slot && !!field && slot.contains(field),
      fieldVisible: !!field && field.offsetParent !== null,
      noMobileField: !document.getElementById('search-m'),
    };
  });
  check('03a_search_slot_in_toolbar',
    slotInfo.fieldInSlot && slotInfo.fieldVisible && slotInfo.noMobileField, slotInfo);
  await page.fill(searchSel, 'briefing');
  await page.waitForTimeout(700); // Debounce
  const searchResult = await page.evaluate(() => ({
    cards: document.querySelectorAll('#prompts-grid .prompt-card').length,
    resultsText: (document.getElementById('results-count') || {}).textContent || '',
  }));
  check('03_search_briefing',
    searchResult.cards > 0 && searchResult.cards < EXPECTED_TOTAL, searchResult);
  await page.fill(searchSel, '');
  await page.waitForTimeout(700);

  // ---------- (4) Plattform-Chip filtert (Langdock) ----------
  const pfResult = await page.evaluate(() => {
    const chip = [...document.querySelectorAll('#filter-chips .role-chip')]
      .find(b => b.textContent.trim() === 'Langdock');
    if (!chip) return null;
    chip.click();
    return true;
  });
  await page.waitForTimeout(300);
  const pfMeasured = await page.evaluate(() => ({
    cards: document.querySelectorAll('#prompts-grid .prompt-card').length,
    expected: PROMPTS.filter(p => !!p.platforms.langdock).length,
  }));
  check('04_platform_filter_langdock',
    pfResult === true && pfMeasured.cards === pfMeasured.expected && pfMeasured.cards < EXPECTED_TOTAL,
    pfMeasured);
  await page.evaluate(() => resetFilters());
  await page.waitForTimeout(300);

  // ---------- (5) Modal + Tabs + Varianten + „Warum funktioniert das?" ----------
  await page.evaluate((id) => openModal(id), CHAT_LIGHTHOUSE);
  await page.waitForSelector('#modal-overlay.open', { timeout: 5000 });
  await page.waitForTimeout(300);
  const modalInfo = await page.evaluate(() => ({
    name: (document.getElementById('modal-name') || {}).textContent || '',
    tabs: [...document.querySelectorAll('#modal .tab-btn')].map(b => b.textContent.trim()),
    variantLabels: [...document.querySelectorAll('#modal .variant-seg button')].map(b => b.textContent.trim()),
    hasWarum: !!document.querySelector('#modal .warum-box'),
    hasBuilder: !!document.querySelector('#modal .pb-wrap'),
    hasLive: !!document.getElementById('prompt-live'),
    hasXref: !!document.querySelector('#modal .skill-xref a[href*="skills.html?skill="]'),
    hasSubmitCta: !!document.querySelector('#modal .modal-submit-row button'),
  }));
  check('05_modal_tabs_variants_warum',
    modalInfo.name.length > 0
      && modalInfo.tabs.some(t => /^Prompt$/.test(t))
      && modalInfo.tabs.some(t => /Bewertungen/.test(t))
      && modalInfo.variantLabels.join(',') === 'Standard,Kurz,Ausführlich'
      && modalInfo.hasWarum && modalInfo.hasBuilder && modalInfo.hasLive
      && modalInfo.hasXref && modalInfo.hasSubmitCta,
    modalInfo);

  // ---------- (6) Builder füllt live + Kopieren liefert eingesetzten Text ----------
  const builderInput = `#pb-${CHAT_LIGHTHOUSE}-kunde`;
  await page.fill(builderInput, 'Grünwerk Testkunde');
  await page.waitForTimeout(200);
  const builderState = await page.evaluate(() => {
    const live = document.getElementById('prompt-live');
    return {
      liveHasValue: !!live && live.textContent.includes('Grünwerk Testkunde'),
      filledMark: !!live && !!live.querySelector('mark.ph.-filled'),
      openMark: !!live && !!live.querySelector('mark.ph:not(.-filled)'),
    };
  });
  await page.evaluate((id) => copyCurrentPrompt(null, id), CHAT_LIGHTHOUSE);
  await page.waitForTimeout(300);
  const copiedBuilder = await page.evaluate(() => window.__copied || '');
  check('06_builder_live_and_copy',
    builderState.liveHasValue && builderState.filledMark && builderState.openMark
      && copiedBuilder.includes('Grünwerk Testkunde')      // eingesetzter Wert im Rohtext
      && /\[[A-ZÄÖÜ][^\]]*\]/.test(copiedBuilder),          // leere Platzhalter bleiben roh erhalten
    { ...builderState, copiedLength: copiedBuilder.length });
  await page.evaluate((id) => resetBuilder(id), CHAT_LIGHTHOUSE);
  await page.waitForTimeout(200);

  // ---------- (7) Variante wechselt den Prompt-Text ----------
  const variantSwitch = await page.evaluate(() => {
    const before = document.getElementById('prompt-live').textContent;
    const btn = [...document.querySelectorAll('#modal .variant-seg button')]
      .find(b => b.textContent.trim() === 'Kurz');
    if (!btn) return null;
    btn.click();
    return { before };
  });
  await page.waitForTimeout(250);
  const variantAfter = await page.evaluate(() => ({
    after: document.getElementById('prompt-live').textContent,
    activeSeg: (document.querySelector('#modal .variant-seg button.active') || {}).textContent || '',
  }));
  check('07_variant_switch',
    variantSwitch !== null && variantAfter.after !== variantSwitch.before
      && variantAfter.activeSeg.trim() === 'Kurz',
    { activeSeg: variantAfter.activeSeg, changed: variantSwitch ? variantAfter.after !== variantSwitch.before : false });

  // ---------- (8) Vorschau: Chat-Inszenierung (Langdock-Leuchtturm) ----------
  await page.evaluate(() => switchTab('vorschau'));
  await page.waitForTimeout(400);
  const chatPreview = await page.evaluate(() => ({
    hasChat: !!document.querySelector('#modal .chat'),
    userMsgs: document.querySelectorAll('#modal .chat-msg.-user').length,
    aiMsgs: document.querySelectorAll('#modal .chat-msg.-ai').length,
  }));
  check('08_preview_chat', chatPreview.hasChat && chatPreview.userMsgs > 0 && chatPreview.aiMsgs > 0, chatPreview);

  // ---------- (9) Rating landet im prompt-Namespace (rate:prompt:<id>, KEIN skill-Key) ----------
  await page.evaluate(() => switchTab('ratings'));
  await page.waitForSelector('#modal .star-input .star-btn', { timeout: 5000 });
  await page.locator('#modal .star-input .star-btn').nth(3).click(); // 4 Sterne
  await page.waitForTimeout(300);
  const ratingKeys = await page.evaluate(() => ({
    promptKeys: Object.keys(localStorage).filter(k => k.startsWith('rate:prompt:')),
    skillKeys: Object.keys(localStorage).filter(k => k.startsWith('rate:skill:') || k.startsWith('skill-rating-')),
  }));
  check('09_rating_prompt_namespace',
    ratingKeys.promptKeys.length > 0 && ratingKeys.skillKeys.length === 0, ratingKeys);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  // ---------- (10) Terminal-Vorschau (Claude-Code-Leuchtturm) rendert Zeilen ----------
  await page.evaluate((id) => openModal(id), TERMINAL_LIGHTHOUSE);
  await page.waitForSelector('#modal-overlay.open', { timeout: 5000 });
  await page.evaluate(() => switchTab('vorschau'));
  await page.waitForTimeout(700); // reducedMotion: playScript rendert sofort komplett
  const termPreview = await page.evaluate(() => ({
    hasTerminal: !!document.querySelector('#modal .ex-terminal'),
    lines: (document.getElementById('prompt-term-body') || { children: [] }).children.length,
  }));
  check('10_preview_terminal', termPreview.hasTerminal && termPreview.lines > 2, termPreview);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  // ---------- (11) Deep-Link: ?p=<id> UND #<id> öffnen das Modal ----------
  const deepLinkResults = {};
  for (const [mode, url] of [
    ['query', TARGET + '?p=' + PLAIN_PROMPT],
    ['hash', TARGET + '#' + CHAT_LIGHTHOUSE],
  ]) {
    await page.goto('about:blank');
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(900);
    deepLinkResults[mode] = await page.evaluate(() => {
      const ov = document.getElementById('modal-overlay');
      return !!(ov && ov.classList.contains('open'))
        ? (document.getElementById('modal-name') || {}).textContent.trim() : '';
    });
  }
  check('11_deeplink_query_and_hash',
    deepLinkResults.query.length > 0 && deepLinkResults.hash.length > 0, deepLinkResults);

  // ---------- (12) Meistkopiert: lokaler Zähler steigt nach Karten-Kopieren ----------
  await page.goto('about:blank');
  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#prompts-grid .prompt-card', { timeout: 10000 });
  const copyCounter = await page.evaluate((startId) => {
    const before = parseInt(localStorage.getItem('copies:prompt:' + startId) || '0', 10);
    const card = document.querySelector('#prompts-grid .prompt-card .prompt-copy-chip');
    if (!card) return null;
    const cardId = card.closest('.prompt-card').getAttribute('onclick').match(/'([^']+)'/)[1];
    const beforeCard = parseInt(localStorage.getItem('copies:prompt:' + cardId) || '0', 10);
    const displayBefore = (document.querySelector(`[data-copies="${cardId}"]`) || {}).textContent || '';
    card.click();
    return { cardId, beforeCard, displayBefore };
  }, PLAIN_PROMPT);
  await page.waitForTimeout(400);
  const copyCounterAfter = copyCounter ? await page.evaluate((info) => ({
    afterCard: parseInt(localStorage.getItem('copies:prompt:' + info.cardId) || '0', 10),
    displayAfter: (document.querySelector(`[data-copies="${info.cardId}"]`) || {}).textContent || '',
    toastShown: !!document.querySelector('#toast.show'),
    copied: (window.__copied || '').length > 0,
  }), copyCounter) : null;
  check('12_copy_counter_increments',
    copyCounter && copyCounterAfter
      && copyCounterAfter.afterCard === copyCounter.beforeCard + 1
      && copyCounterAfter.displayAfter !== copyCounter.displayBefore
      && copyCounterAfter.toastShown && copyCounterAfter.copied,
    { ...copyCounter, ...copyCounterAfter });

  // ---------- (13) „Variante einreichen": Flow öffnet, Danke-Zustand erreichbar ----------
  // (a) aus dem Modal
  await page.evaluate((id) => openModal(id), CHAT_LIGHTHOUSE);
  await page.waitForSelector('#modal-overlay.open', { timeout: 5000 });
  await page.locator('#modal .modal-submit-row button').click();
  await page.waitForSelector('#submit-overlay.open', { timeout: 5000 });
  const flowInfo = await page.evaluate(() => ({
    title: (document.getElementById('sf-title') || {}).textContent || '',
    steps: document.querySelectorAll('#submit-overlay .sf-step').length,
    demoNote: (document.querySelector('#submit-overlay .sf-demo-note') || {}).textContent || '',
    prefilled: (document.querySelector('#submit-overlay [data-sf-key="bezug"]') || {}).value || '',
  }));
  await page.fill('#submit-overlay [data-sf-key="name"]', 'Test Pilotin');
  await page.fill('#submit-overlay [data-sf-key="variante"]', 'Fasse [BRIEFING-TEXT] in drei Sätzen zusammen.');
  await page.locator('#submit-overlay .sf-form button[type="submit"]').click();
  await page.waitForSelector('#sf-thanks', { timeout: 5000 });
  const thanksInfo = await page.evaluate(() => ({
    hasThanks: !!document.getElementById('sf-thanks'),
    doneStep: !!document.querySelector('#submit-overlay .sf-step.-done'),
    draft: localStorage.getItem('submit:prompt:draft') || '',
  }));
  await page.evaluate(() => closeSubmitFlow());
  await page.waitForTimeout(200);
  const flowClosed = await page.evaluate(() => ({
    submitClosed: !document.getElementById('submit-overlay').classList.contains('open'),
    modalStillOpen: document.getElementById('modal-overlay').classList.contains('open'),
  }));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  // (b) Sektions-CTA am Seitenende existiert und öffnet den Flow
  const bandOpens = await page.evaluate(() => {
    const cta = document.getElementById('submit-band-cta');
    if (!cta) return false;
    cta.click();
    return document.getElementById('submit-overlay').classList.contains('open');
  });
  await page.evaluate(() => closeSubmitFlow());
  check('13_submit_flow_demo',
    /Demo/.test(flowInfo.demoNote) && flowInfo.steps === 3
      && flowInfo.prefilled.length > 0
      && thanksInfo.hasThanks && thanksInfo.doneStep && thanksInfo.draft.includes('Test Pilotin')
      && flowClosed.submitClosed && flowClosed.modalStillOpen
      && bandOpens === true,
    { flowInfo, thanksInfo, flowClosed, bandOpens });

  // ---------- (14) Nav enthält „Prompts" als aktiven Punkt ----------
  const navInfo = await page.evaluate(() => {
    const el = document.getElementById('nav-prompts');
    return {
      exists: !!el, label: el ? el.textContent.trim() : '',
      active: !!el && el.classList.contains('active'),
      hasCatalog: !!document.getElementById('nav-catalog'),
    };
  });
  check('14_nav_has_prompts', navInfo.exists && navInfo.label === 'Prompts' && navInfo.active && navInfo.hasCatalog, navInfo);

  // ---------- (15) Skill-Querverweise: jede skillRef existiert im Katalog-Datensatz ----------
  // (Voll-Check „Modal öffnet wirklich" für alle 19 IDs: scratchpad/e3/check-xrefs.cjs,
  //  am 2026-07-16 grün — hier die schnelle Daten-Gegenprobe + 1 echter Klickpfad.)
  const xrefRefs = await page.evaluate(() => [...new Set(PROMPTS.filter(p => p.skillRef).map(p => p.skillRef))]);
  await page.goto(TARGET.replace(/prompts\.html.*$/, 'skills.html'), { waitUntil: 'load' });
  await page.waitForTimeout(800);
  const xrefCheck = await page.evaluate((refs) => {
    const ids = new Set(SKILLS.map(s => s.id));
    return { total: refs.length, missing: refs.filter(r => !ids.has(r)) };
  }, xrefRefs);
  await page.goto(TARGET.replace(/prompts\.html.*$/, 'skills.html?skill=' + encodeURIComponent(xrefRefs[0])), { waitUntil: 'load' });
  await page.waitForTimeout(900);
  const xrefModalOpen = await page.evaluate(() =>
    !!document.querySelector('#modal-overlay.open')
    && ((document.getElementById('modal-name') || {}).textContent || '').trim().length > 0);
  check('15_skill_xrefs_resolve', xrefCheck.missing.length === 0 && xrefModalOpen,
    { ...xrefCheck, sampleDeepLinkOpens: xrefModalOpen, sample: xrefRefs[0] });

  // ---------- Abschluss: über den ganzen Lauf gesammelte JS-Fehler ----------
  check('16_no_js_errors_total', jsErrors.length === 0, {
    jsErrors: [...jsErrors],
    blockedResourceErrors: blockedResourceErrors.length,
  });

  await context.close();

  const failed = Object.entries(checks).filter(([, c]) => !c.pass).map(([id]) => id);
  return { viewport: vp.name, size: vp.viewport, pass: failed.length === 0, failed, checks };
}

// ---------- Startseiten-Checks (index.html): Verzahnung der Prompt-Sammlung ----------
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
  await page.waitForTimeout(1500); // animateCount ausrollen lassen

  const indexInfo = await page.evaluate(() => ({
    routerTile: !!document.querySelector('.rt-grid a.rt-card[href="prompts.html"]'),
    routerTileDest: (document.querySelector('.rt-grid a.rt-card[href="prompts.html"] .rt-dest') || {}).textContent || '',
    noPromptTeaser: !document.querySelector('.rt-card[data-teaser="prompts"]'),
    statPrompts: parseInt((document.getElementById('stat-prompts') || {}).textContent || '-1', 10),
    areaPromptCount: parseInt((document.getElementById('area-prompt-count') || {}).textContent || '-1', 10),
    areaCta: !!document.querySelector('.area-live-sm a.c-cta[href="prompts.html"]'),
    areaSpotHref: (document.querySelector('.area-live-sm .area-spot') || { getAttribute: () => '' }).getAttribute('href') || '',
    areaSpotRating: (document.getElementById('area-prompt-spot-rating') || {}).textContent || '',
    navPrompts: !!document.getElementById('nav-prompts'),
    newsHasPrompts: [...document.querySelectorAll('.news-item .news-text a')].some(a => a.getAttribute('href') === 'prompts.html'),
    newsCount: document.querySelectorAll('.news-item').length,
    expected: PROMPTS.length,
  }));
  check('i1_index_no_js_errors', jsErrors.length === 0, { jsErrors: [...jsErrors] });
  check('i2_router_tile_links_prompts',
    indexInfo.routerTile && indexInfo.noPromptTeaser && /Sammlung/.test(indexInfo.routerTileDest),
    { routerTile: indexInfo.routerTile, dest: indexInfo.routerTileDest, noPromptTeaser: indexInfo.noPromptTeaser });
  // E11-Soll: die Hero-Stat-Zeile (#stat-prompts) ist mit dem Hero der Startseite
  // entfallen — der Daten-Abgleich läuft jetzt allein über die Bereichs-Karte
  // (#area-prompt-count); zusätzlich wird abgesichert, dass die Stat-Zeile weg ist.
  check('i3_counts_match_data',
    indexInfo.statPrompts === -1 && indexInfo.areaPromptCount === indexInfo.expected
      && indexInfo.expected === EXPECTED_TOTAL,
    { statPrompts: indexInfo.statPrompts, areaPromptCount: indexInfo.areaPromptCount, expected: indexInfo.expected });
  check('i4_area_card_clickable',
    indexInfo.areaCta && /^prompts\.html\?p=/.test(indexInfo.areaSpotHref)
      && indexInfo.areaSpotRating.trim().length > 0 && indexInfo.navPrompts,
    { areaCta: indexInfo.areaCta, areaSpotHref: indexInfo.areaSpotHref, navPrompts: indexInfo.navPrompts });
  check('i5_news_mentions_prompts',
    indexInfo.newsHasPrompts && indexInfo.newsCount >= 3 && indexInfo.newsCount <= 4,
    { newsHasPrompts: indexInfo.newsHasPrompts, newsCount: indexInfo.newsCount });

  // Router-Kachel navigiert wirklich
  await page.click('.rt-grid a.rt-card[href="prompts.html"]');
  await page.waitForTimeout(1200);
  const landedOnPrompts = await page.evaluate(() =>
    location.pathname.endsWith('prompts.html') && !!document.getElementById('prompts-grid'));
  check('i6_router_tile_navigates', landedOnPrompts, { url: page.url() });

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
