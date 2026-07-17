#!/usr/bin/env node
/**
 * E5-Messlatte für den Lern-Bereich (lernen.html) des pilot AI Marketplace.
 *
 * Prüft Regal, Filter, Sortierung, Votes, Deep-Link, Einreichen-Flow und die
 * Verzahnung mit der Startseite — Muster: tests/e4-hilfe.cjs.
 *
 * Aufruf:
 *   PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright node tests/e5-lernen.cjs [URL]
 *   Default-URL: http://localhost:8412/lernen.html
 *   Die Startseiten-Checks (Router-Kachel, Live-Karte, News, Nav-Regression)
 *   laufen gegen index.html im selben Verzeichnis der Ziel-URL.
 *
 * Ausgabe: strukturiertes JSON auf stdout (pro Check pass/fail + Messwerte).
 * Exit-Code 0 = alle Checks grün, 1 = mindestens ein Check rot.
 */

const { chromium } = require('/usr/lib/node_modules/playwright');

const TARGET = process.argv[2] || 'http://localhost:8412/lernen.html';
const INDEX_TARGET = TARGET.replace(/lernen\.html.*$/, 'index.html');

// Soll-Werte (Stand E5, 2026-07-17), abgeleitet aus data/ressourcen.js:
// 27 Einträge gesamt = 24 externe (verifizierte Links) + 3 interne Platzhalter.
const EXPECTED_TOTAL = 27;
const EXPECTED_TYPEN = { video: 7, doku: 9, artikel: 4, kurs: 2, podcast: 2, intern: 3 };
const EXPECTED_EXTERN = 24;
const EXPECTED_INTERN = 3;
const EXPECTED_DE = 19;      // sprache === 'de'
const EXPECTED_LE15 = 14;    // dauerMin <= 15 (Zeit-Kachel „Kaffeepause“)
const EXPECTED_START = 'code-grundkurs-keil'; // RESSOURCE_START („Start hier“-Pin)
const DEEPLINK_ID = 'code-terminal-guide';    // lernen.html?r=<id>

const VIEWPORTS = [
  { name: 'desktop', viewport: { width: 1280, height: 800 } },
  { name: 'mobile', viewport: { width: 390, height: 844 } },
];

function isBlockedResourceError(text) {
  return /Failed to load resource|net::ERR_FAILED|net::ERR_BLOCKED|raw\.githubusercontent\.com|github\.com/i.test(text);
}

async function newPreparedContext(browser, vp) {
  return browser.newContext({
    viewport: vp.viewport,
    reducedMotion: 'reduce', // Sprünge sind 'instant', Karten-Animationen sofort fertig
  });
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

  // ---------- (1) Laden: 0 JS-Fehler + Soll-Zahlen (gesamt & pro Typ, Daten == DOM) ----------
  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#res-list .res-card', { timeout: 10000 });
  await page.waitForTimeout(600);
  const counts = await page.evaluate(() => {
    const byTyp = {};
    RESSOURCEN.forEach(r => { byTyp[r.typ] = (byTyp[r.typ] || 0) + 1; });
    return {
      domCards: document.querySelectorAll('#res-list .res-card').length,
      dataTotal: RESSOURCEN.length,
      byTyp,
      dataExtern: RESSOURCEN.filter(r => !!r.url).length,
      dataIntern: RESSOURCEN.filter(r => r.intern).length,
      idsUnique: new Set(RESSOURCEN.map(r => r.id)).size === RESSOURCEN.length,
      resultsCount: parseInt((document.getElementById('results-count') || {}).textContent || '-1', 10),
    };
  });
  check('01_load_counts_no_js_errors',
    jsErrors.length === 0
      && counts.domCards === EXPECTED_TOTAL && counts.dataTotal === EXPECTED_TOTAL
      && counts.resultsCount === EXPECTED_TOTAL && counts.idsUnique
      && counts.dataExtern === EXPECTED_EXTERN && counts.dataIntern === EXPECTED_INTERN
      && Object.keys(EXPECTED_TYPEN).every(t => counts.byTyp[t] === EXPECTED_TYPEN[t])
      && Object.keys(counts.byTyp).length === Object.keys(EXPECTED_TYPEN).length,
    { jsErrors: [...jsErrors], ...counts, blockedResourceErrors: blockedResourceErrors.length });

  // ---------- (2) „Start hier“-Pin: genau 1×, richtige ID, ganz oben ----------
  const pinInfo = await page.evaluate(() => {
    const pins = [...document.querySelectorAll('#res-list .res-card.start-here')];
    const first = document.querySelector('#res-list .res-card');
    return {
      pinCount: pins.length,
      pinId: pins[0] ? pins[0].dataset.id : '',
      pinIsFirst: !!first && first.classList.contains('start-here'),
      ribbonText: (document.querySelector('.start-here-ribbon') || {}).textContent || '',
      matchesData: typeof RESSOURCE_START !== 'undefined' && pins[0] && pins[0].dataset.id === RESSOURCE_START,
    };
  });
  check('02_start_here_pin',
    pinInfo.pinCount === 1 && pinInfo.pinId === EXPECTED_START && pinInfo.pinIsFirst
      && pinInfo.matchesData && /Start hier/.test(pinInfo.ribbonText),
    pinInfo);

  // ---------- (3) Externe Links: target=_blank + rel=noopener + https, interne ohne href ----------
  const linkInfo = await page.evaluate(() => {
    const extern = [...document.querySelectorAll('#res-list .res-card a.res-title')];
    const internCards = [...document.querySelectorAll('#res-list .res-card.-intern')];
    return {
      externLinks: extern.length,
      allBlank: extern.every(a => a.getAttribute('target') === '_blank'),
      allNoopener: extern.every(a => /\bnoopener\b/.test(a.getAttribute('rel') || '')),
      allHttps: extern.every(a => /^https:\/\//.test(a.getAttribute('href') || '')),
      noDuplicates: new Set(extern.map(a => a.getAttribute('href'))).size === extern.length,
      internCards: internCards.length,
      internNoLink: internCards.every(c => !c.querySelector('a.res-title')),
      internTagged: internCards.every(c => !!c.querySelector('.intern-tag')),
      internNoVote: internCards.every(c => !c.querySelector('.vote-btn')),
      internHint: internCards.every(c => /Noch nicht bewertbar/.test(c.textContent)),
    };
  });
  check('03_extern_links_and_intern_placeholders',
    linkInfo.externLinks === EXPECTED_EXTERN && linkInfo.allBlank && linkInfo.allNoopener
      && linkInfo.allHttps && linkInfo.noDuplicates
      && linkInfo.internCards === EXPECTED_INTERN && linkInfo.internNoLink
      && linkInfo.internTagged && linkInfo.internNoVote && linkInfo.internHint,
    linkInfo);

  // ---------- (4) Filter kombinieren: Typ-Tab + Niveau-Chip + Sprache-Chip ----------
  await page.evaluate(() => setTyp('video'));
  await page.evaluate(() => setNiveau('einsteiger'));
  await page.evaluate(() => setSprache('de'));
  await page.waitForTimeout(300);
  const comboInfo = await page.evaluate(() => {
    const expected = RESSOURCEN.filter(r =>
      r.typ === 'video' && r.niveau === 'einsteiger' && r.sprache === 'de').length;
    const cards = [...document.querySelectorAll('#res-list .res-card')];
    const byId = Object.fromEntries(RESSOURCEN.map(r => [r.id, r]));
    return {
      expected,
      domCards: cards.length,
      allMatch: cards.every(c => {
        const r = byId[c.dataset.id];
        return r && r.typ === 'video' && r.niveau === 'einsteiger' && r.sprache === 'de';
      }),
      pills: document.querySelectorAll('#active-filters .active-pill').length,
      barVisible: !document.getElementById('active-filters').hidden,
      noPin: !document.querySelector('#res-list .res-card.start-here'),
    };
  });
  await page.evaluate(() => resetFilters());
  await page.waitForTimeout(300);
  const afterReset = await page.evaluate(() => ({
    domCards: document.querySelectorAll('#res-list .res-card').length,
    barHidden: document.getElementById('active-filters').hidden,
    pinBack: !!document.querySelector('#res-list .res-card.start-here'),
  }));
  check('04_filters_combine_and_reset',
    comboInfo.expected > 0 && comboInfo.domCards === comboInfo.expected && comboInfo.allMatch
      && comboInfo.pills === 3 && comboInfo.barVisible && comboInfo.noPin
      && afterReset.domCards === EXPECTED_TOTAL && afterReset.barHidden && afterReset.pinBack,
    { ...comboInfo, afterReset });

  // ---------- (5) Signature: Zeit-Kachel „bis 15 Min“ setzt Dauer-Filter + scrollt ----------
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(() => { document.querySelector('#zeit-tiles .zeit-tile[data-dauer="15"]').click(); });
  await page.waitForFunction(() => {
    const el = document.getElementById('main-content');
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.top > -r.height && r.top < innerHeight;
  }, null, { timeout: 8000 }).catch(() => {});
  const zeitInfo = await page.evaluate(() => {
    const byId = Object.fromEntries(RESSOURCEN.map(r => [r.id, r]));
    const cards = [...document.querySelectorAll('#res-list .res-card')];
    const grid = document.getElementById('main-content').getBoundingClientRect();
    return {
      tileActive: document.querySelector('#zeit-tiles .zeit-tile[data-dauer="15"]').classList.contains('active'),
      tilePressed: document.querySelector('#zeit-tiles .zeit-tile[data-dauer="15"]').getAttribute('aria-pressed'),
      domCards: cards.length,
      allLe15: cards.every(c => byId[c.dataset.id] && byId[c.dataset.id].dauerMin <= 15),
      gridInView: grid.top > -grid.height && grid.top < innerHeight,
      chipActive: [...document.querySelectorAll('#filter-chips .role-chip')].some(c =>
        c.classList.contains('active') && /bis 15 Min/.test(c.textContent)),
    };
  });
  // Zweiter Klick auf dieselbe Kachel togglet den Filter wieder weg
  await page.evaluate(() => { document.querySelector('#zeit-tiles .zeit-tile[data-dauer="15"]').click(); });
  await page.waitForTimeout(300);
  const zeitOff = await page.evaluate(() => ({
    domCards: document.querySelectorAll('#res-list .res-card').length,
    tileActive: document.querySelector('#zeit-tiles .zeit-tile[data-dauer="15"]').classList.contains('active'),
  }));
  check('05_zeit_tile_signature',
    zeitInfo.tileActive && zeitInfo.tilePressed === 'true'
      && zeitInfo.domCards === EXPECTED_LE15 && zeitInfo.allLe15
      && zeitInfo.gridInView && zeitInfo.chipActive
      && zeitOff.domCards === EXPECTED_TOTAL && !zeitOff.tileActive,
    { ...zeitInfo, zeitOff });

  // ---------- (6) Sortierung: Standard = bayesScore, „Kürzeste zuerst“ wechselt + löst Pin ----------
  const sortDefault = await page.evaluate(() => {
    const domIds = [...document.querySelectorAll('#res-list .res-card')].map(c => c.dataset.id);
    // Erwartung identisch zur Seiten-Logik: extern nach bayesScore, intern (ohne
    // Rating) ans Ende; der Pin steht unabhängig davon ganz vorn.
    const expected = RESSOURCEN.slice().sort((a, b) => {
      const av = a.rating ? bayesScore(a) : 0, bv = b.rating ? bayesScore(b) : 0;
      if (bv !== av) return bv - av;
      return (b.votes || 0) - (a.votes || 0) || a.titel.localeCompare(b.titel, 'de');
    }).map(r => r.id);
    const pinned = [RESSOURCE_START].concat(expected.filter(id => id !== RESSOURCE_START));
    return {
      matchesBayes: domIds.join(',') === pinned.join(','),
      internAtEnd: domIds.slice(-3).every(id => RESSOURCEN.find(r => r.id === id).intern),
    };
  });
  // Nicht page.selectOption: das Panel ist mobil eingeklappt (hidden) — der
  // Wertwechsel läuft deshalb direkt über das change-Event.
  await page.evaluate(() => {
    const sel = document.getElementById('sort-select');
    sel.value = 'dauer';
    sel.dispatchEvent(new Event('change'));
  });
  await page.waitForTimeout(300);
  const sortDauer = await page.evaluate(() => {
    const byId = Object.fromEntries(RESSOURCEN.map(r => [r.id, r]));
    const domIds = [...document.querySelectorAll('#res-list .res-card')].map(c => c.dataset.id);
    const durations = domIds.map(id => byId[id].dauerMin);
    return {
      sortedAsc: durations.every((d, i) => i === 0 || durations[i - 1] <= d),
      firstIsMin: durations[0] === Math.min(...RESSOURCEN.map(r => r.dauerMin)),
      noPin: !document.querySelector('#res-list .res-card.start-here'),
    };
  });
  await page.evaluate(() => {
    const sel = document.getElementById('sort-select');
    sel.value = 'bewertung';
    sel.dispatchEvent(new Event('change'));
  });
  await page.waitForTimeout(300);
  const sortBack = await page.evaluate(() => ({
    pinBack: !!document.querySelector('#res-list .res-card.start-here'),
  }));
  check('06_sort_switches',
    sortDefault.matchesBayes && sortDefault.internAtEnd
      && sortDauer.sortedAsc && sortDauer.firstIsMin && sortDauer.noPin
      && sortBack.pinBack,
    { sortDefault, sortDauer, sortBack });

  // ---------- (7) Vote: „Das hat mir geholfen“ persistiert + togglet ----------
  const voteSetup = await page.evaluate((startId) => {
    const r = RESSOURCEN.find(x => x.id === startId);
    return { id: r.id, seed: r.votes };
  }, EXPECTED_START);
  await page.evaluate((id) => { document.querySelector(`#res-${id} .vote-btn`).click(); }, voteSetup.id);
  await page.waitForTimeout(400);
  const afterVote = await page.evaluate((info) => {
    const btn = document.querySelector(`#res-${info.id} .vote-btn`);
    return {
      lsKey: localStorage.getItem('vote:ressource:' + info.id),
      count: parseInt(btn.querySelector('.vote-count').textContent, 10),
      pressed: btn.getAttribute('aria-pressed'),
      voted: btn.classList.contains('voted'),
      toast: !!document.querySelector('#toast.show'),
      // Namespace-Trennung: keine Streuung in andere Vote-Typen oder Sterne
      foreignKeys: Object.keys(localStorage).filter(k =>
        k.startsWith('vote:befehl:') || k.startsWith('vote:begriff:') || k.startsWith('rate:')).length,
    };
  }, voteSetup);
  // Persistenz: Reload — Stimme bleibt
  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#res-list .res-card', { timeout: 10000 });
  await page.waitForTimeout(400);
  const afterReload = await page.evaluate((info) => {
    const btn = document.querySelector(`#res-${info.id} .vote-btn`);
    return {
      count: parseInt(btn.querySelector('.vote-count').textContent, 10),
      voted: btn.classList.contains('voted'),
    };
  }, voteSetup);
  // Zurücknehmen: zweiter Klick togglet (Key weg, Zähler zurück)
  await page.evaluate((id) => { document.querySelector(`#res-${id} .vote-btn`).click(); }, voteSetup.id);
  await page.waitForTimeout(400);
  const afterUnvote = await page.evaluate((info) => ({
    lsKey: localStorage.getItem('vote:ressource:' + info.id),
    count: parseInt(document.querySelector(`#res-${info.id} .vote-count`).textContent, 10),
    pressed: document.querySelector(`#res-${info.id} .vote-btn`).getAttribute('aria-pressed'),
  }), voteSetup);
  check('07_vote_persists_and_toggles',
    afterVote.lsKey === '1' && afterVote.count === voteSetup.seed + 1
      && afterVote.pressed === 'true' && afterVote.voted && afterVote.toast
      && afterVote.foreignKeys === 0
      && afterReload.count === voteSetup.seed + 1 && afterReload.voted
      && afterUnvote.lsKey === null && afterUnvote.count === voteSetup.seed
      && afterUnvote.pressed === 'false',
    { voteSetup, afterVote, afterReload, afterUnvote });

  // ---------- (8) Aufklappen: „Mehr dazu“ zeigt Beschreibung + Prüfdatum ----------
  await page.evaluate((id) => toggleRessource(id), EXPECTED_START);
  await page.waitForTimeout(200);
  const expandInfo = await page.evaluate((id) => {
    const body = document.getElementById('res-body-' + id);
    const btn = document.querySelector(`#res-${id} .res-toggle`);
    return {
      visible: !!body && !body.hidden,
      expanded: btn ? btn.getAttribute('aria-expanded') : '',
      hasBeschreibung: !!body && /Was drin ist/.test(body.textContent),
      hasGeprueft: !!body && /Link geprüft am/.test(body.textContent),
    };
  }, EXPECTED_START);
  await page.evaluate((id) => toggleRessource(id), EXPECTED_START);
  check('08_card_expands',
    expandInfo.visible && expandInfo.expanded === 'true'
      && expandInfo.hasBeschreibung && expandInfo.hasGeprueft,
    expandInfo);

  // ---------- (9) Deep-Link ?r=<id>: kanonischer Hash, Karte im Viewport, aufgeklappt, hervorgehoben ----------
  await page.goto('about:blank');
  await page.goto(TARGET + '?r=' + DEEPLINK_ID, { waitUntil: 'load' });
  await page.waitForTimeout(1100); // applyDeepLink + Font-Nachjustierung (60ms) abwarten
  const deepInfo = await page.evaluate((id) => {
    const el = document.getElementById('res-' + id);
    const body = document.getElementById('res-body-' + id);
    const r = el ? el.getBoundingClientRect() : null;
    return {
      hash: location.hash,
      canonical: location.hash === '#r/' + id,
      inView: !!r && r.top > -r.height && r.top < innerHeight,
      expanded: !!body && !body.hidden,
      highlighted: !!el && el.classList.contains('-highlight'),
    };
  }, DEEPLINK_ID);
  check('09_deeplink_scrolls_and_highlights',
    deepInfo.canonical && deepInfo.inView && deepInfo.expanded && deepInfo.highlighted,
    deepInfo);

  // ---------- (10) „Ressource vorschlagen“: Demo-Flow bis zum Danke ----------
  await page.evaluate(() => { document.getElementById('submit-band-cta').click(); });
  await page.waitForSelector('#submit-overlay.open', { timeout: 5000 });
  const flowInfo = await page.evaluate(() => ({
    title: (document.getElementById('sf-title') || {}).textContent || '',
    steps: document.querySelectorAll('#submit-overlay .sf-step').length,
    demoNote: (document.querySelector('#submit-overlay .sf-demo-note') || {}).textContent || '',
  }));
  await page.fill('#submit-overlay [data-sf-key="titel"]', 'Large Language Models explained briefly');
  await page.fill('#submit-overlay [data-sf-key="link"]', 'https://example.org/llm-explained');
  await page.fill('#submit-overlay [data-sf-key="warum"]', 'Erklärt in 8 Minuten, was ein LLM ist — ohne Mathe.');
  await page.locator('#submit-overlay .sf-form button[type="submit"]').click();
  await page.waitForSelector('#sf-thanks', { timeout: 5000 });
  const thanksInfo = await page.evaluate(() => ({
    hasThanks: !!document.getElementById('sf-thanks'),
    doneStep: !!document.querySelector('#submit-overlay .sf-step.-done'),
    draft: localStorage.getItem('submit:ressource:draft') || '',
  }));
  await page.evaluate(() => closeSubmitFlow());
  await page.waitForTimeout(200);
  check('10_submit_flow_demo',
    /Ressource/.test(flowInfo.title) && flowInfo.steps === 3 && /Demo/.test(flowInfo.demoNote)
      && thanksInfo.hasThanks && thanksInfo.doneStep
      && thanksInfo.draft.includes('Large Language Models'),
    { flowInfo, thanksInfo });

  // ---------- (11) Nav & Footer: Lernen aktiv, Nachbarn verlinkt ----------
  const navInfo = await page.evaluate(() => {
    const el = document.getElementById('nav-lernen');
    return {
      exists: !!el, label: el ? el.textContent.trim() : '',
      active: !!el && el.classList.contains('active'),
      ariaCurrent: el ? el.getAttribute('aria-current') : '',
      hasCatalog: !!document.getElementById('nav-catalog'),
      hasPrompts: !!document.getElementById('nav-prompts'),
      hasHilfe: !!document.getElementById('nav-hilfe'),
      footer: !!document.querySelector('.site-footer'),
    };
  });
  check('11_nav_lernen_active',
    navInfo.exists && navInfo.label === 'Lernen' && navInfo.active
      && navInfo.ariaCurrent === 'page'
      && navInfo.hasCatalog && navInfo.hasPrompts && navInfo.hasHilfe && navInfo.footer,
    navInfo);

  // ---------- (12) Mobil: Filterpanel startet eingeklappt ----------
  if (vp.name === 'mobile') {
    await page.goto('about:blank');
    await page.goto(TARGET, { waitUntil: 'load' });
    await page.waitForSelector('#res-list .res-card', { timeout: 10000 });
    const mobileInfo = await page.evaluate(() => ({
      toggleExpanded: document.getElementById('filter-toggle-btn').getAttribute('aria-expanded'),
      panelHidden: document.getElementById('filter-collapsible').hidden,
    }));
    await page.evaluate(() => toggleMobileFilter());
    const mobileOpen = await page.evaluate(() => ({
      toggleExpanded: document.getElementById('filter-toggle-btn').getAttribute('aria-expanded'),
      panelHidden: document.getElementById('filter-collapsible').hidden,
    }));
    check('12_mobile_filter_collapsed',
      mobileInfo.toggleExpanded === 'false' && mobileInfo.panelHidden
        && mobileOpen.toggleExpanded === 'true' && !mobileOpen.panelHidden,
      { start: mobileInfo, open: mobileOpen });
  }

  // ---------- Abschluss: über den ganzen Lauf gesammelte JS-Fehler ----------
  check('13_no_js_errors_total', jsErrors.length === 0, {
    jsErrors: [...jsErrors],
    blockedResourceErrors: blockedResourceErrors.length,
  });

  await context.close();

  const failed = Object.entries(checks).filter(([, c]) => !c.pass).map(([id]) => id);
  return { viewport: vp.name, size: vp.viewport, pass: failed.length === 0, failed, checks };
}

// ---------- Startseiten-Checks (index.html): Verzahnung des Lern-Bereichs ----------
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
    routerTile: !!document.querySelector('.rt-grid a.rt-card[href="lernen.html"]'),
    routerTileDest: (document.querySelector('.rt-grid a.rt-card[href="lernen.html"] .rt-dest') || {}).textContent || '',
    noLernenTeaser: !document.querySelector('.rt-card[data-teaser="lernen"]')
      && (typeof TEASER === 'undefined' || !('lernen' in TEASER)),
    statLernen: parseInt((document.getElementById('stat-lernen') || {}).textContent || '-1', 10),
    areaLernenCount: parseInt((document.getElementById('area-lernen-count') || {}).textContent || '-1', 10),
    areaLernenMeta: (document.getElementById('area-lernen-meta') || {}).textContent || '',
    areaCta: !!document.querySelector('.area-card a.c-cta[href="lernen.html"]'),
    areaSpotHref: (document.querySelector('a.area-spot[href^="lernen.html?r="]') || { getAttribute: () => '' }).getAttribute('href') || '',
    areaSpotRating: (document.getElementById('area-lernen-spot-rating') || {}).textContent || '',
    livePills: document.querySelectorAll('.area-card .area-pill.-live').length,
    soonPills: document.querySelectorAll('.area-card .area-pill.-soon').length,
    navLernen: !!document.getElementById('nav-lernen'),
    newsHasLernen: [...document.querySelectorAll('.news-item .news-text a')].some(a => a.getAttribute('href') === 'lernen.html'),
    newsCount: document.querySelectorAll('.news-item').length,
    dataRessourcen: typeof RESSOURCEN !== 'undefined' ? RESSOURCEN.length : -1,
  }));
  check('i1_index_no_js_errors', jsErrors.length === 0, { jsErrors: [...jsErrors] });
  check('i2_router_tile_links_lernen',
    indexInfo.routerTile && indexInfo.noLernenTeaser && /Ressourcen/.test(indexInfo.routerTileDest),
    { routerTile: indexInfo.routerTile, dest: indexInfo.routerTileDest, noLernenTeaser: indexInfo.noLernenTeaser });
  check('i3_counts_match_data',
    indexInfo.statLernen === EXPECTED_TOTAL && indexInfo.areaLernenCount === EXPECTED_TOTAL
      && indexInfo.dataRessourcen === EXPECTED_TOTAL
      && indexInfo.areaLernenMeta.includes(String(EXPECTED_DE))
      && indexInfo.areaLernenMeta.includes(String(EXPECTED_LE15)),
    { statLernen: indexInfo.statLernen, areaLernenCount: indexInfo.areaLernenCount,
      meta: indexInfo.areaLernenMeta, dataRessourcen: indexInfo.dataRessourcen });
  check('i4_area_card_clickable',
    indexInfo.areaCta && indexInfo.areaSpotHref === 'lernen.html?r=' + EXPECTED_START
      && indexInfo.areaSpotRating.trim().length > 0 && indexInfo.navLernen
      && indexInfo.livePills === 7 && indexInfo.soonPills === 0,
    { areaCta: indexInfo.areaCta, areaSpotHref: indexInfo.areaSpotHref,
      areaSpotRating: indexInfo.areaSpotRating, navLernen: indexInfo.navLernen,
      livePills: indexInfo.livePills, soonPills: indexInfo.soonPills });
  check('i5_news_mentions_lernen',
    indexInfo.newsHasLernen && indexInfo.newsCount >= 3 && indexInfo.newsCount <= 4,
    { newsHasLernen: indexInfo.newsHasLernen, newsCount: indexInfo.newsCount });

  // Router-Kachel navigiert wirklich
  await page.click('.rt-grid a.rt-card[href="lernen.html"]');
  await page.waitForTimeout(1200);
  const landedOnLernen = await page.evaluate(() =>
    location.pathname.endsWith('lernen.html') && document.querySelectorAll('#res-list .res-card').length > 0);
  check('i6_router_tile_navigates', landedOnLernen, { url: page.url() });

  // Nav-Regression: Lernen-Punkt auf allen Bestandsseiten vorhanden, nicht aktiv
  const navPages = {};
  for (const p of ['skills.html', 'prompts.html', 'hilfe.html']) {
    await page.goto(INDEX_TARGET.replace(/index\.html.*$/, p), { waitUntil: 'load' });
    await page.waitForSelector('#nav-lernen', { timeout: 10000 }).catch(() => {});
    navPages[p] = await page.evaluate(() => {
      const el = document.getElementById('nav-lernen');
      return {
        exists: !!el,
        href: el ? el.getAttribute('href') : '',
        notActive: !!el && !el.classList.contains('active'),
      };
    });
  }
  check('i7_nav_lernen_on_all_pages',
    Object.values(navPages).every(n => n.exists && n.href === 'lernen.html' && n.notActive),
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
