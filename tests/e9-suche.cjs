#!/usr/bin/env node
/**
 * E9-Messlatte für das GLOBALE Such-Overlay + „Über diese Seite" des pilot AI Marketplace.
 *
 * Prüft (rein additive Features aus shared/base.js/base.css, gebaut von Agent „base"):
 *   01 · Lupe (#nav-suche-btn) mit aria-label auf ≥2 Seiten (skills.html UND prompts.html).
 *   02 · Cmd/Ctrl+K öffnet #gsearch-overlay.open, #gsearch-input ist fokussiert.
 *   03 · Tippen eines gruppenübergreifenden Begriffs liefert ≥1 Gruppen-Header + Treffer als
 *        role="option" mit korrektem Deep-Link-href (Regex je Typ).
 *   04 · Lazy-Load: auf bibliothek.html (lädt SKILLS/PROMPTS NICHT) liefert die Suche nach einem
 *        Prompt trotzdem Treffer — Beleg für dynamisches Nachladen der fehlenden data/*.js.
 *   05 · Esc schließt das Overlay (.open weg), Fokus zurück auf die Lupe/Opener.
 *   06 · 0 JS-Fehler über den ganzen Flow (blocked-resource-Errors gefiltert wie e8).
 *   07 · Tastatur-Navigation: ArrowDown setzt aria-activedescendant + .is-active.
 *   08 · Footer #footer-about öffnet #about-overlay mit dem Absender-Satz §1.1.
 *
 * Aufruf:
 *   PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright node tests/e9-suche.cjs [URL]
 *   Server extern: python3 -m http.server 8412 (im Projekt-Root) — das Lazy-Nachladen der
 *   data/*.js braucht einen HTTP-Server (kein file://).
 *   Default-URL: http://localhost:8412/skills.html
 *
 * Ausgabe: strukturiertes JSON auf stdout. Exit 0 = alle grün, 1 = ein Check rot.
 */

const { chromium } = require('/usr/lib/node_modules/playwright');

// E11-Soll: Suite akzeptiert jetzt auch eine Basis-URL (Runner ruft alle Suiten
// mit der Origin auf) und ergänzt dann selbst skills.html.
const ARG = process.argv[2] || 'http://localhost:8412/skills.html';
const TARGET = /\.html/.test(ARG) ? ARG : new URL('skills.html', ARG).href;
const PROMPTS_TARGET = TARGET.replace(/skills\.html.*$/, 'prompts.html');
const BIBLIO_TARGET = TARGET.replace(/skills\.html.*$/, 'bibliothek.html');

// Deep-Link-Muster je Typ (Vertrag). Ein gültiger Treffer-href matcht genau eines davon.
const DEEPLINK_RE = /(skills\.html\?skill=|prompts\.html\?p=|hilfe\.html\?(befehl|begriff)=|lernen\.html\?r=|bibliothek\.html\?a=|baukasten\.html\?b=|showroom\.html\?case=)/;

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

  // ---------- (1) Lupe auf ≥2 Seiten ----------
  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#nav-suche-btn', { timeout: 10000 });
  const lupeSkills = await page.evaluate(() => {
    const b = document.getElementById('nav-suche-btn');
    return { present: !!b, aria: b ? (b.getAttribute('aria-label') || '') : '' };
  });
  await page.goto(PROMPTS_TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#nav-suche-btn', { timeout: 10000 });
  const lupePrompts = await page.evaluate(() => {
    const b = document.getElementById('nav-suche-btn');
    return { present: !!b, aria: b ? (b.getAttribute('aria-label') || '') : '' };
  });
  check('01_lupe_present_multi_page',
    lupeSkills.present && lupeSkills.aria.length > 3 && lupePrompts.present && lupePrompts.aria.length > 3,
    { lupeSkills, lupePrompts });

  // ---------- (2) Cmd/Ctrl+K öffnet Overlay, Input fokussiert ----------
  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#nav-suche-btn', { timeout: 10000 });
  await page.keyboard.press('Control+k');
  let opened = await page.waitForSelector('#gsearch-overlay.open', { timeout: 5000 }).then(() => true).catch(() => false);
  if (!opened) { await page.keyboard.press('Meta+k'); opened = await page.waitForSelector('#gsearch-overlay.open', { timeout: 3000 }).then(() => true).catch(() => false); }
  await page.waitForTimeout(200);
  const openInfo = await page.evaluate(() => ({
    open: !!(document.getElementById('gsearch-overlay') && document.getElementById('gsearch-overlay').classList.contains('open')),
    inputFocused: document.activeElement === document.getElementById('gsearch-input'),
    dialogRole: (document.querySelector('#gsearch-overlay .gsearch-panel') || {}).getAttribute ? document.querySelector('#gsearch-overlay .gsearch-panel').getAttribute('role') : null,
  }));
  check('02_cmdk_opens', opened && openInfo.open && openInfo.inputFocused && openInfo.dialogRole === 'dialog', openInfo);

  // ---------- (3) Tippen liefert typgruppierte Treffer mit gültigen Deep-Links ----------
  await page.fill('#gsearch-input', 'prompt');
  await page.waitForFunction(() => document.querySelectorAll('#gsearch-results .gs-opt[role="option"]').length > 0, { timeout: 6000 }).catch(() => {});
  await page.waitForTimeout(200);
  const resultInfo = await page.evaluate(() => {
    const groups = [...document.querySelectorAll('#gsearch-results .gs-group-label')].map(g => g.textContent.trim());
    const opts = [...document.querySelectorAll('#gsearch-results .gs-opt[role="option"]')];
    return {
      groupCount: groups.length,
      groups,
      optCount: opts.length,
      hrefs: opts.slice(0, 12).map(a => a.getAttribute('href') || ''),
      allHaveVisiblePath: opts.every(a => !!a.querySelector('.gs-opt-path')),
    };
  });
  const allHrefValid = resultInfo.hrefs.length > 0 && resultInfo.hrefs.every(h => DEEPLINK_RE.test(h));
  check('03_typing_grouped_results',
    resultInfo.groupCount >= 1 && resultInfo.optCount >= 1 && allHrefValid && resultInfo.allHaveVisiblePath,
    { ...resultInfo, allHrefValid });

  // ---------- (7) Tastatur-Navigation: ArrowDown -> aria-activedescendant + .is-active ----------
  await page.locator('#gsearch-input').focus();
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(150);
  const navInfo = await page.evaluate(() => {
    const input = document.getElementById('gsearch-input');
    const active = document.querySelector('#gsearch-results .gs-opt.is-active');
    return {
      aad: input ? (input.getAttribute('aria-activedescendant') || '') : '',
      hasActive: !!active,
      activeIsOption: active ? active.getAttribute('role') === 'option' : false,
    };
  });
  check('07_keyboard_nav', navInfo.hasActive && navInfo.activeIsOption && navInfo.aad.length > 0, navInfo);

  // ---------- (5) Esc schließt, Fokus zurück auf Opener ----------
  // Erst das per Cmd+K geöffnete Overlay schließen (Opener war body), dann über
  // einen Lupe-KLICK neu öffnen (Opener = Lupe) und die Fokus-Rückgabe prüfen.
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  await page.click('#nav-suche-btn');
  await page.waitForSelector('#gsearch-overlay.open', { timeout: 5000 });
  await page.waitForTimeout(150);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  const closeInfo = await page.evaluate(() => ({
    open: !!(document.getElementById('gsearch-overlay') && document.getElementById('gsearch-overlay').classList.contains('open')),
    focusBackOnLupe: document.activeElement === document.getElementById('nav-suche-btn'),
  }));
  check('05_esc_closes', !closeInfo.open && closeInfo.focusBackOnLupe, closeInfo);

  // ---------- (4) Lazy-Load: bibliothek.html lädt SKILLS/PROMPTS nicht, findet Prompt trotzdem ----------
  await page.goto(BIBLIO_TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#nav-suche-btn', { timeout: 10000 });
  // data/*.js deklarieren mit `const` → globale lexikalische Bindung, KEINE window-
  // Eigenschaft. Deshalb den Bezeichner direkt per typeof prüfen (nicht window.PROMPTS).
  const preload = await page.evaluate(() => ({
    promptsUndef: (typeof PROMPTS === 'undefined'),
    skillsUndef: (typeof SKILLS === 'undefined'),
  }));
  await page.evaluate(() => openGlobalSearch());
  await page.waitForSelector('#gsearch-overlay.open', { timeout: 5000 });
  await page.fill('#gsearch-input', 'prompt');
  const lazyGotResults = await page.waitForFunction(
    () => document.querySelectorAll('#gsearch-results .gs-opt[role="option"]').length > 0,
    { timeout: 8000 }
  ).then(() => true).catch(() => false);
  const lazyInfo = await page.evaluate(() => ({
    nowLoadedPrompts: (typeof PROMPTS !== 'undefined'),
    optCount: document.querySelectorAll('#gsearch-results .gs-opt[role="option"]').length,
    hasPromptDeeplink: [...document.querySelectorAll('#gsearch-results .gs-opt[role="option"]')].some(a => /prompts\.html\?p=/.test(a.getAttribute('href') || '')),
  }));
  check('04_lazy_load',
    preload.promptsUndef && lazyGotResults && lazyInfo.nowLoadedPrompts && lazyInfo.optCount >= 1 && lazyInfo.hasPromptDeeplink,
    { preload, lazyInfo, lazyGotResults });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);

  // ---------- (8) Footer „Über diese Seite" öffnet Modal mit §1.1-Satz ----------
  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#footer-about', { timeout: 10000 });
  await page.click('#footer-about');
  const aboutOpened = await page.waitForSelector('#about-overlay.open', { timeout: 5000 }).then(() => true).catch(() => false);
  await page.waitForTimeout(150);
  const aboutInfo = await page.evaluate(() => {
    const ov = document.getElementById('about-overlay');
    const txt = ov ? (ov.textContent || '') : '';
    return {
      open: !!(ov && ov.classList.contains('open')),
      dialogRole: ov ? ((ov.querySelector('[role="dialog"]') || {}).getAttribute ? ov.querySelector('[role="dialog"]').getAttribute('role') : null) : null,
      hasAbsenderSatz: /redaktionelle Demo-Daten/.test(txt) && /bleiben lokal in deinem Browser/.test(txt) && /es wird nichts gesendet/.test(txt),
    };
  });
  // Esc schließt auch das About-Modal
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  const aboutClosed = await page.evaluate(() => !(document.getElementById('about-overlay') && document.getElementById('about-overlay').classList.contains('open')));
  check('08_about_modal',
    aboutOpened && aboutInfo.open && aboutInfo.dialogRole === 'dialog' && aboutInfo.hasAbsenderSatz && aboutClosed,
    aboutInfo);

  // ---------- (6) 0 JS-Fehler über den ganzen Flow ----------
  check('06_no_js_errors', jsErrors.length === 0, { jsErrors: [...jsErrors], blockedResourceErrors: blockedResourceErrors.length });

  await context.close();
  return checks;
}

(async () => {
  const browser = await chromium.launch();
  const results = { target: TARGET, viewports: {} };
  let allPass = true;
  try {
    for (const vp of VIEWPORTS) {
      const checks = await runViewport(browser, vp);
      results.viewports[vp.name] = checks;
      for (const id of Object.keys(checks)) if (!checks[id].pass) allPass = false;
    }
  } finally {
    await browser.close();
  }
  results.allPass = allPass;
  console.log(JSON.stringify(results, null, 2));
  process.exit(allPass ? 0 : 1);
})();
