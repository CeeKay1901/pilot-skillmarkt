#!/usr/bin/env node
/**
 * E4-Messlatte für das Hilfe-Center (hilfe.html) des pilot AI Marketplace.
 *
 * Prüft die Kernflüsse der drei Säulen (Befehle-Ranking, Glossar, FAQ)
 * gegen eine beliebige Ziel-URL — Muster: tests/e3-prompts.cjs.
 *
 * Aufruf:
 *   PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright node tests/e4-hilfe.cjs [URL]
 *   Default-URL: http://localhost:8412/hilfe.html
 *   Die Startseiten-Checks (Router-Kachel, Live-Karte, News) laufen gegen
 *   index.html im selben Verzeichnis der Ziel-URL.
 *
 * Ausgabe: strukturiertes JSON auf stdout (pro Check pass/fail + Messwerte).
 * Exit-Code 0 = alle Checks grün, 1 = mindestens ein Check rot.
 */

const { chromium } = require('/usr/lib/node_modules/playwright');

const TARGET = process.argv[2] || 'http://localhost:8412/hilfe.html';
const INDEX_TARGET = TARGET.replace(/hilfe\.html.*$/, 'index.html');

// Soll-Werte (Stand E4, 2026-07-16), abgeleitet aus den Daten-Dateien:
// data/befehle.js — 28 Einträge (22 Claude Code + 6 Langdock), 5 Leuchttürme
//                   mit Mini-Terminal-Demo (BEFEHL_LEUCHTTUERME).
// data/glossar.js — GLOSSAR 44 Begriffe, FAQ 10 Blocker-Lösungen.
const EXPECTED_BEFEHLE = 28;
const EXPECTED_GLOSSAR = 44;
const EXPECTED_FAQ = 10;
const EXPECTED_LEUCHTTUERME = 5;

// Feste Anker für die Detail-Checks:
const DEMO_BEFEHL = 'clear';            // Leuchtturm mit Demo + kopierbarem Slash-Befehl
const DEEPLINK_BEFEHL = 'compact';      // hilfe.html?befehl=<id>
const DEEPLINK_BEGRIFF = 'token';       // hilfe.html?begriff=<id>
const DEEPLINK_FAQ = 'faq-kontext-voll';// hilfe.html#faq/<id>

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
    reducedMotion: 'reduce', // playScript rendert sofort komplett, Sprünge sind 'instant'
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

  // ---------- (1) Seite lädt mit 0 JS-Fehlern + Soll-Zahlen aller drei Säulen ----------
  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#rank-list .cmd-card', { timeout: 10000 });
  await page.waitForTimeout(600);
  const counts = await page.evaluate(() => ({
    cmdCards: document.querySelectorAll('#rank-list .cmd-card').length,
    gCards: document.querySelectorAll('#glossar-liste .g-card').length,
    faqCards: document.querySelectorAll('#faq-liste .faq-card').length,
    dataBefehle: BEFEHLE.length,
    dataGlossar: GLOSSAR.length,
    dataFaq: FAQ.length,
    leuchttuerme: BEFEHL_LEUCHTTUERME.size,
    demoTagged: document.querySelectorAll('#rank-list .lh-tag').length,
  }));
  check('01_load_counts_no_js_errors',
    jsErrors.length === 0
      && counts.cmdCards === EXPECTED_BEFEHLE && counts.dataBefehle === EXPECTED_BEFEHLE
      && counts.gCards === EXPECTED_GLOSSAR && counts.dataGlossar === EXPECTED_GLOSSAR
      && counts.faqCards === EXPECTED_FAQ && counts.dataFaq === EXPECTED_FAQ
      && counts.leuchttuerme === EXPECTED_LEUCHTTUERME
      && counts.demoTagged === EXPECTED_LEUCHTTUERME,
    { jsErrors: [...jsErrors], ...counts, blockedResourceErrors: blockedResourceErrors.length });

  // ---------- (2) Sprungnavigation: 3 Anker mit echten Zählern, Klick scrollt ----------
  const pillarInfo = await page.evaluate(() => ({
    links: [...document.querySelectorAll('.pillar-link')].map(a => a.getAttribute('href')),
    pnBefehle: parseInt((document.getElementById('pn-befehle') || {}).textContent || '-1', 10),
    pnGlossar: parseInt((document.getElementById('pn-glossar') || {}).textContent || '-1', 10),
    pnFaq: parseInt((document.getElementById('pn-faq') || {}).textContent || '-1', 10),
  }));
  await page.evaluate(() => { document.querySelector('.pillar-link[href="#faq"]').click(); });
  // Nativer Anker-Sprung gleitet per CSS scroll-behavior:smooth über die ganze
  // Seite — auf das Ankommen warten statt auf eine feste Zeit.
  await page.waitForFunction(() => {
    const el = document.getElementById('faq');
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.top > -r.height && r.top < innerHeight;
  }, null, { timeout: 8000 }).catch(() => {});
  const faqInView = await page.evaluate((id) => {
    const el = document.getElementById(id);
    if (!el) return { exists: false };
    const r = el.getBoundingClientRect();
    return { exists: true, top: r.top, inView: r.top > -r.height && r.top < innerHeight, hash: location.hash };
  }, 'faq');
  check('02_pillar_nav',
    pillarInfo.links.join(',') === '#befehle,#glossar,#faq'
      && pillarInfo.pnBefehle === EXPECTED_BEFEHLE
      && pillarInfo.pnGlossar === EXPECTED_GLOSSAR
      && pillarInfo.pnFaq === EXPECTED_FAQ
      && faqInView && faqInView.inView,
    { ...pillarInfo, faqInView });
  await page.evaluate(() => window.scrollTo(0, 0));

  // ---------- (3) Signature: Upvote sortiert live um + persistiert + togglet ----------
  // Kandidat dynamisch: erster Eintrag, dessen Vordermann höchstens votes+1 hat —
  // dessen Stimme MUSS die Position verbessern (Gleichstand: eigene Stimme gewinnt).
  const voteSetup = await page.evaluate(() => {
    const sorted = BEFEHLE.slice().sort((a, b) => b.votes - a.votes || a.cmd.localeCompare(b.cmd, 'de'));
    let cand = null;
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i - 1].votes <= sorted[i].votes + 1) { cand = sorted[i]; break; }
    }
    if (!cand) return null;
    const domIndex = [...document.querySelectorAll('#rank-list .cmd-card')].findIndex(el => el.dataset.id === cand.id);
    return { id: cand.id, seed: cand.votes, domIndex };
  });
  await page.evaluate((id) => { document.querySelector(`#befehl-${id} .vote-btn`).click(); }, voteSetup.id);
  await page.waitForTimeout(500);
  const afterVote = await page.evaluate((info) => {
    const cards = [...document.querySelectorAll('#rank-list .cmd-card')];
    const idx = cards.findIndex(el => el.dataset.id === info.id);
    const btn = document.querySelector(`#befehl-${info.id} .vote-btn`);
    return {
      idx,
      lsKey: localStorage.getItem('vote:befehl:' + info.id),
      count: parseInt(btn.querySelector('.vote-count').textContent, 10),
      pressed: btn.getAttribute('aria-pressed'),
      voted: btn.classList.contains('voted'),
      toast: !!document.querySelector('#toast.show'),
    };
  }, voteSetup);
  // Persistenz: Reload — Stimme und Sortierung bleiben
  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#rank-list .cmd-card', { timeout: 10000 });
  await page.waitForTimeout(400);
  const afterReload = await page.evaluate((info) => {
    const cards = [...document.querySelectorAll('#rank-list .cmd-card')];
    const idx = cards.findIndex(el => el.dataset.id === info.id);
    const btn = document.querySelector(`#befehl-${info.id} .vote-btn`);
    return {
      idx,
      count: parseInt(btn.querySelector('.vote-count').textContent, 10),
      voted: btn.classList.contains('voted'),
    };
  }, voteSetup);
  // Zurücknehmen: zweiter Klick togglet (Key weg, Zähler zurück, alte Position)
  await page.evaluate((id) => { document.querySelector(`#befehl-${id} .vote-btn`).click(); }, voteSetup.id);
  await page.waitForTimeout(500);
  const afterUnvote = await page.evaluate((info) => {
    const cards = [...document.querySelectorAll('#rank-list .cmd-card')];
    return {
      idx: cards.findIndex(el => el.dataset.id === info.id),
      lsKey: localStorage.getItem('vote:befehl:' + info.id),
      count: parseInt(document.querySelector(`#befehl-${info.id} .vote-count`).textContent, 10),
    };
  }, voteSetup);
  check('03_upvote_resorts_persists_toggles',
    voteSetup && voteSetup.domIndex > 0
      && afterVote.lsKey === '1' && afterVote.count === voteSetup.seed + 1
      && afterVote.pressed === 'true' && afterVote.voted && afterVote.toast
      && afterVote.idx < voteSetup.domIndex
      && afterReload.idx === afterVote.idx && afterReload.count === voteSetup.seed + 1 && afterReload.voted
      && afterUnvote.lsKey === null && afterUnvote.count === voteSetup.seed
      && afterUnvote.idx === voteSetup.domIndex,
    { voteSetup, afterVote, afterReload, afterUnvote });

  // ---------- (4) Befehl kopieren: exakter Wortlaut + Toast ----------
  const copyCmd = await page.evaluate((id) => {
    const btn = document.querySelector(`#befehl-${id} .cmd-copy`);
    if (!btn) return null;
    btn.click();
    return BEFEHLE.find(b => b.id === id).cmd;
  }, DEMO_BEFEHL);
  await page.waitForTimeout(400);
  const copyResult = await page.evaluate(() => ({
    copied: window.__copied || '',
    toast: !!document.querySelector('#toast.show'),
  }));
  check('04_copy_command', copyCmd === '/clear' && copyResult.copied === copyCmd && copyResult.toast,
    { expected: copyCmd, ...copyResult });

  // ---------- (5) Leuchtturm: Karte aufklappen, Terminal-Demo spielt ----------
  await page.evaluate((id) => toggleBefehl(id), DEMO_BEFEHL);
  await page.waitForTimeout(200);
  const demoBefore = await page.evaluate((id) => ({
    bodyVisible: !document.getElementById('cmd-body-' + id).hidden,
    hasPlayBtn: !!document.querySelector(`#term-${id} .term-play`),
  }), DEMO_BEFEHL);
  await page.evaluate((id) => { document.querySelector(`#term-${id} .term-play`).click(); }, DEMO_BEFEHL);
  await page.waitForTimeout(800); // reducedMotion: playScript rendert sofort komplett
  const demoAfter = await page.evaluate((id) => ({
    lines: document.getElementById('term-' + id).children.length,
    hasUserLine: !!document.querySelector(`#term-${id} .tl-user, #term-${id} [class*="user"]`),
  }), DEMO_BEFEHL);
  await page.evaluate((id) => toggleBefehl(id), DEMO_BEFEHL); // zuklappen stoppt Demo (E2-Lektion)
  check('05_lighthouse_terminal_demo',
    demoBefore.bodyVisible && demoBefore.hasPlayBtn && demoAfter.lines > 2,
    { ...demoBefore, ...demoAfter });

  // ---------- (6) Glossar-Suche filtert (mit Treffer-Status) + Reset ----------
  await page.fill('#glo-search', 'token');
  await page.waitForTimeout(600); // Debounce 120ms + Re-Render
  const searchState = await page.evaluate(() => ({
    cards: document.querySelectorAll('#glossar-liste .g-card').length,
    hitsVisible: !document.getElementById('glo-hits').hidden,
    hitsText: document.getElementById('glo-hits').textContent,
  }));
  await page.evaluate(() => clearGlossarSearch());
  await page.waitForTimeout(400);
  const searchReset = await page.evaluate(() => ({
    cards: document.querySelectorAll('#glossar-liste .g-card').length,
    hitsHidden: document.getElementById('glo-hits').hidden,
  }));
  check('06_glossar_search',
    searchState.cards > 0 && searchState.cards < EXPECTED_GLOSSAR
      && searchState.hitsVisible && /Treffer/.test(searchState.hitsText)
      && searchReset.cards === EXPECTED_GLOSSAR && searchReset.hitsHidden,
    { ...searchState, reset: searchReset });

  // ---------- (7) A-Z-Sprungleiste: aktive + ausgegraute Buchstaben, Sprung ----------
  const azInfo = await page.evaluate(() => ({
    enabled: [...document.querySelectorAll('#az-rail .az-btn:not([disabled])')].map(b => b.textContent.trim()),
    disabled: document.querySelectorAll('#az-rail .az-btn[disabled]').length,
  }));
  const jumpLetter = azInfo.enabled.includes('T') ? 'T' : azInfo.enabled[azInfo.enabled.length - 1];
  await page.evaluate((L) => jumpToLetter(L), jumpLetter);
  await page.waitForTimeout(500);
  const groupInView = await page.evaluate((L) => {
    const el = document.getElementById('g-gruppe-' + L);
    if (!el) return { exists: false };
    const r = el.getBoundingClientRect();
    return { exists: true, top: r.top, inView: r.top > -r.height && r.top < innerHeight };
  }, jumpLetter);
  check('07_az_rail',
    azInfo.enabled.length > 5 && azInfo.disabled > 0
      && azInfo.enabled.length + azInfo.disabled === 26
      && groupInView.exists && groupInView.inView,
    { ...azInfo, jumpLetter, groupInView });
  await page.evaluate(() => window.scrollTo(0, 0));

  // ---------- (8) Glossar-Tiefe klappt auf (Beispiel + Vertiefung sichtbar) ----------
  const tiefeId = await page.evaluate(() => (GLOSSAR.find(g => g.tiefe) || {}).id || null);
  await page.evaluate((id) => toggleBegriff(id), tiefeId);
  await page.waitForTimeout(200);
  const tiefeState = await page.evaluate((id) => {
    const body = document.getElementById('g-body-' + id);
    const btn = document.querySelector(`#begriff-${id} .g-toggle`);
    return {
      visible: !!body && !body.hidden,
      hasBeispiel: !!body && /pilot-Beispiel/.test(body.textContent),
      hasTiefe: !!body && /tiefer willst/.test(body.textContent),
      expanded: btn ? btn.getAttribute('aria-expanded') : '',
    };
  }, tiefeId);
  await page.evaluate((id) => toggleBegriff(id), tiefeId);
  check('08_glossar_tiefe',
    tiefeId && tiefeState.visible && tiefeState.hasBeispiel && tiefeState.hasTiefe
      && tiefeState.expanded === 'true',
    { tiefeId, ...tiefeState });

  // ---------- (9) FAQ-Akkordeon: öffnet mit Schritten, höchstens eine Karte offen ----------
  const faqIds = await page.evaluate(() => FAQ.slice(0, 2).map(f => f.id));
  await page.evaluate((id) => { document.querySelector(`#faqcard-${id} .faq-q`).click(); }, faqIds[0]);
  await page.waitForTimeout(200);
  const faqFirst = await page.evaluate((id) => ({
    open: !document.getElementById('faq-body-' + id).hidden,
    expanded: document.querySelector(`#faqcard-${id} .faq-q`).getAttribute('aria-expanded'),
    steps: document.querySelectorAll(`#faq-body-${id} .faq-steps li`).length,
  }), faqIds[0]);
  await page.evaluate((id) => { document.querySelector(`#faqcard-${id} .faq-q`).click(); }, faqIds[1]);
  await page.waitForTimeout(200);
  const faqSecond = await page.evaluate((ids) => ({
    firstClosed: document.getElementById('faq-body-' + ids[0]).hidden,
    secondOpen: !document.getElementById('faq-body-' + ids[1]).hidden,
    openBodies: [...document.querySelectorAll('#faq-liste .faq-body')].filter(b => !b.hidden).length,
  }), faqIds);
  check('09_faq_accordion',
    faqFirst.open && faqFirst.expanded === 'true' && faqFirst.steps >= 2
      && faqSecond.firstClosed && faqSecond.secondOpen && faqSecond.openBodies === 1,
    { faqIds, faqFirst, faqSecond });

  // ---------- (10) Deep-Links: alle 3 Schemata (Query wird zu Hash kanonisiert) ----------
  const deepResults = {};
  for (const [key, url, elId, bodySel] of [
    ['befehl', TARGET + '?befehl=' + DEEPLINK_BEFEHL, 'befehl-' + DEEPLINK_BEFEHL, '#cmd-body-' + DEEPLINK_BEFEHL],
    ['begriff', TARGET + '?begriff=' + DEEPLINK_BEGRIFF, 'begriff-' + DEEPLINK_BEGRIFF, '#g-body-' + DEEPLINK_BEGRIFF],
    ['faq', TARGET + '#faq/' + DEEPLINK_FAQ, 'faqcard-' + DEEPLINK_FAQ, '#faq-body-' + DEEPLINK_FAQ],
  ]) {
    await page.goto('about:blank');
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(1100); // applyDeepLink + Font-Nachjustierung (60ms) abwarten
    deepResults[key] = await page.evaluate(([elId, bodySel, kind, id]) => {
      const el = document.getElementById(elId);
      const body = document.querySelector(bodySel);
      const r = el ? el.getBoundingClientRect() : null;
      return {
        hash: location.hash,
        canonical: location.hash === '#' + kind + '/' + id,
        expanded: !!body && !body.hidden,
        inView: !!r && r.top > -r.height && r.top < innerHeight,
      };
    }, [elId, bodySel, key, key === 'befehl' ? DEEPLINK_BEFEHL : key === 'begriff' ? DEEPLINK_BEGRIFF : DEEPLINK_FAQ]);
  }
  check('10_deeplinks_all_three_schemas',
    Object.values(deepResults).every(r => r.canonical && r.expanded && r.inView),
    deepResults);

  // ---------- (11) Vote-Namespaces getrennt: Begriff-Stimme streut nicht ----------
  await page.goto('about:blank');
  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#rank-list .cmd-card', { timeout: 10000 });
  const nsInfo = await page.evaluate(() => {
    localStorage.clear();
    const g = GLOSSAR[0];
    voteBegriff(g.id);
    return {
      begriffKeys: Object.keys(localStorage).filter(k => k.startsWith('vote:begriff:')),
      befehlKeys: Object.keys(localStorage).filter(k => k.startsWith('vote:befehl:')),
      faqKeys: Object.keys(localStorage).filter(k => k.startsWith('vote:faq:')),
      sterneKeys: Object.keys(localStorage).filter(k => k.startsWith('rate:')),
    };
  });
  check('11_vote_namespaces_separate',
    nsInfo.begriffKeys.length === 1 && nsInfo.befehlKeys.length === 0
      && nsInfo.faqKeys.length === 0 && nsInfo.sterneKeys.length === 0,
    nsInfo);

  // ---------- (12) „Kniff einreichen": 3-Schritte-Demo-Flow bis zum Danke ----------
  await page.evaluate(() => { document.getElementById('submit-band-cta').click(); });
  await page.waitForSelector('#submit-overlay.open', { timeout: 5000 });
  const flowInfo = await page.evaluate(() => ({
    title: (document.getElementById('sf-title') || {}).textContent || '',
    steps: document.querySelectorAll('#submit-overlay .sf-step').length,
    demoNote: (document.querySelector('#submit-overlay .sf-demo-note') || {}).textContent || '',
  }));
  await page.fill('#submit-overlay [data-sf-key="titel"]', 'Screenshot direkt einfügen');
  await page.fill('#submit-overlay [data-sf-key="trick"]', 'Ctrl+V im Claude-Code-Fenster');
  await page.fill('#submit-overlay [data-sf-key="wofuer"]', 'Spart den Umweg über Datei speichern und Pfad angeben.');
  await page.locator('#submit-overlay .sf-form button[type="submit"]').click();
  await page.waitForSelector('#sf-thanks', { timeout: 5000 });
  const thanksInfo = await page.evaluate(() => ({
    hasThanks: !!document.getElementById('sf-thanks'),
    doneStep: !!document.querySelector('#submit-overlay .sf-step.-done'),
    draft: localStorage.getItem('submit:kniff:draft') || '',
  }));
  await page.evaluate(() => closeSubmitFlow());
  await page.waitForTimeout(200);
  check('12_submit_flow_demo',
    /Kniff/.test(flowInfo.title) && flowInfo.steps === 3 && /Demo/.test(flowInfo.demoNote)
      && thanksInfo.hasThanks && thanksInfo.doneStep
      && thanksInfo.draft.includes('Screenshot direkt einfügen'),
    { flowInfo, thanksInfo });

  // ---------- (13) Nav & Footer: Hilfe aktiv, Nachbarn verlinkt ----------
  const navInfo = await page.evaluate(() => {
    const el = document.getElementById('nav-hilfe');
    return {
      exists: !!el, label: el ? el.textContent.trim() : '',
      active: !!el && el.classList.contains('active'),
      hasCatalog: !!document.getElementById('nav-catalog'),
      hasPrompts: !!document.getElementById('nav-prompts'),
      footerHilfe: !!document.querySelector('.site-footer a#footer-hilfe[href="hilfe.html"]'),
    };
  });
  check('13_nav_and_footer',
    navInfo.exists && navInfo.label === 'Hilfe' && navInfo.active
      && navInfo.hasCatalog && navInfo.hasPrompts && navInfo.footerHilfe,
    navInfo);

  // ---------- (14) Querverweise lösen auf: befehl/begriff lokal, skill/prompt in den Nachbardaten ----------
  const refs = await page.evaluate(() => {
    const out = { skill: new Set(), prompt: new Set(), befehl: [], begriff: [] };
    [...GLOSSAR, ...FAQ].forEach(x => (x.verweise || []).forEach(v => {
      if (v.t === 'skill') out.skill.add(v.id);
      else if (v.t === 'prompt') out.prompt.add(v.id);
      else if (v.t === 'befehl') out.befehl.push(v.id);
      else if (v.t === 'begriff') out.begriff.push(v.id);
    }));
    const befehlIds = new Set(BEFEHLE.map(b => b.id));
    const begriffIds = new Set(GLOSSAR.map(g => g.id));
    return {
      skillRefs: [...out.skill], promptRefs: [...out.prompt],
      missingBefehl: out.befehl.filter(id => !befehlIds.has(id)),
      missingBegriff: out.begriff.filter(id => !begriffIds.has(id)),
    };
  });
  await page.goto(TARGET.replace(/hilfe\.html.*$/, 'skills.html'), { waitUntil: 'load' });
  await page.waitForTimeout(800);
  const missingSkills = await page.evaluate((refs) => {
    const ids = new Set(SKILLS.map(s => s.id));
    return refs.filter(r => !ids.has(r));
  }, refs.skillRefs);
  await page.goto(TARGET.replace(/hilfe\.html.*$/, 'prompts.html'), { waitUntil: 'load' });
  await page.waitForTimeout(800);
  const missingPrompts = await page.evaluate((refs) => {
    const ids = new Set(PROMPTS.map(p => p.id));
    return refs.filter(r => !ids.has(r));
  }, refs.promptRefs);
  check('14_xrefs_resolve',
    refs.missingBefehl.length === 0 && refs.missingBegriff.length === 0
      && missingSkills.length === 0 && missingPrompts.length === 0
      && refs.skillRefs.length > 0 && refs.promptRefs.length > 0,
    { skillRefs: refs.skillRefs.length, promptRefs: refs.promptRefs.length,
      missingSkills, missingPrompts,
      missingBefehl: refs.missingBefehl, missingBegriff: refs.missingBegriff });

  // ---------- Abschluss: über den ganzen Lauf gesammelte JS-Fehler ----------
  check('15_no_js_errors_total', jsErrors.length === 0, {
    jsErrors: [...jsErrors],
    blockedResourceErrors: blockedResourceErrors.length,
  });

  await context.close();

  const failed = Object.entries(checks).filter(([, c]) => !c.pass).map(([id]) => id);
  return { viewport: vp.name, size: vp.viewport, pass: failed.length === 0, failed, checks };
}

// ---------- Startseiten-Checks (index.html): Verzahnung des Hilfe-Centers ----------
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
    routerTile: !!document.querySelector('.rt-grid a.rt-card[href="hilfe.html"]'),
    routerTileDest: (document.querySelector('.rt-grid a.rt-card[href="hilfe.html"] .rt-dest') || {}).textContent || '',
    noHilfeTeaser: !document.querySelector('.rt-card[data-teaser="hilfe"]'),
    areaHilfeCount: parseInt((document.getElementById('area-hilfe-count') || {}).textContent || '-1', 10),
    areaHilfeMeta: (document.getElementById('area-hilfe-meta') || {}).textContent || '',
    areaCta: !!document.querySelector('.area-card a.c-cta[href="hilfe.html"]'),
    areaSpotHref: (document.querySelector('a.area-spot[href^="hilfe.html?befehl="]') || { getAttribute: () => '' }).getAttribute('href') || '',
    areaSpotVotes: (document.getElementById('area-hilfe-spot-votes') || {}).textContent || '',
    navHilfe: !!document.getElementById('nav-hilfe'),
    footerHilfe: !!document.querySelector('.site-footer a#footer-hilfe[href="hilfe.html"]'),
    newsHasHilfe: [...document.querySelectorAll('.news-item .news-text a')].some(a => a.getAttribute('href') === 'hilfe.html'),
    newsCount: document.querySelectorAll('.news-item').length,
    dataBefehle: typeof BEFEHLE !== 'undefined' ? BEFEHLE.length : -1,
    dataGlossar: typeof GLOSSAR !== 'undefined' ? GLOSSAR.length : -1,
    dataFaq: typeof FAQ !== 'undefined' ? FAQ.length : -1,
  }));
  check('i1_index_no_js_errors', jsErrors.length === 0, { jsErrors: [...jsErrors] });
  check('i2_router_tile_links_hilfe',
    indexInfo.routerTile && indexInfo.noHilfeTeaser && /Hilfe-Center/.test(indexInfo.routerTileDest),
    { routerTile: indexInfo.routerTile, dest: indexInfo.routerTileDest, noHilfeTeaser: indexInfo.noHilfeTeaser });
  check('i3_counts_match_data',
    indexInfo.areaHilfeCount === EXPECTED_BEFEHLE && indexInfo.dataBefehle === EXPECTED_BEFEHLE
      && indexInfo.areaHilfeMeta.includes(String(EXPECTED_GLOSSAR))
      && indexInfo.areaHilfeMeta.includes(String(EXPECTED_FAQ))
      && indexInfo.dataGlossar === EXPECTED_GLOSSAR && indexInfo.dataFaq === EXPECTED_FAQ,
    { areaHilfeCount: indexInfo.areaHilfeCount,
      meta: indexInfo.areaHilfeMeta, dataBefehle: indexInfo.dataBefehle });
  check('i4_area_card_clickable',
    indexInfo.areaCta && /^hilfe\.html\?befehl=/.test(indexInfo.areaSpotHref)
      && indexInfo.areaSpotVotes.trim().length > 0 && indexInfo.navHilfe && indexInfo.footerHilfe,
    { areaCta: indexInfo.areaCta, areaSpotHref: indexInfo.areaSpotHref,
      areaSpotVotes: indexInfo.areaSpotVotes, navHilfe: indexInfo.navHilfe, footerHilfe: indexInfo.footerHilfe });
  check('i5_news_mentions_hilfe',
    indexInfo.newsHasHilfe && indexInfo.newsCount >= 3 && indexInfo.newsCount <= 4,
    { newsHasHilfe: indexInfo.newsHasHilfe, newsCount: indexInfo.newsCount });

  // Router-Kachel navigiert wirklich
  await page.click('.rt-grid a.rt-card[href="hilfe.html"]');
  await page.waitForTimeout(1200);
  const landedOnHilfe = await page.evaluate(() =>
    location.pathname.endsWith('hilfe.html') && !!document.getElementById('rank-list'));
  check('i6_router_tile_navigates', landedOnHilfe, { url: page.url() });

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
