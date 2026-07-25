#!/usr/bin/env node
/**
 * E11-Messlatte — Neuigkeiten-Block auf der Startseite + das Feld `seit`.
 *
 * (Die Nummer ist schlicht der nächste freie Datei-Slot; e1/e3/e6–e10 sind belegt.)
 *
 * Prüft:
 *   01 · Der Block existiert, ist nicht leer und zeigt 3–4 Meldungen.
 *   02 · Meldungen sind absteigend nach Datum sortiert, und solange ältere Tage
 *        existieren, schliesst genau EINE Sammelmeldung („Davor") den Block.
 *   03 · Jede Meldung hat ≥1 Link; JEDER Link löst wirklich auf (HTTP 200 und
 *        Modal offen / Anker getroffen / Bereichsseite) — kein toter Verweis.
 *   04 · Jedes Datum trägt die Jahreszahl. (Die früheren handgeschriebenen
 *        Meldungen schrieben „23. Juli" ohne Jahr und wären ab 2027 falsch.)
 *   05 · Kein Datum ist erfunden: jedes angezeigte Datum kommt als Wert in SEIT vor.
 *   06 · SEIT deckt ALLE Einträge ALLER elf Sammlungen ab. Eine stille Lücke
 *        würde Einträge dauerhaft aus dem Block fallen lassen, ohne aufzufallen.
 *   07 · Das „Neu"-Fähnchen auf skills.html/prompts.html deckt sich exakt mit
 *        istNeu() — gerendert == abgeleitet, kein Sonderweg.
 *   08 · Das tote Datenfeld badge ist weg und kommt nicht zurück.
 *   09 · ENTWURFSVORGABE aus e3:i5, e6:i5, e7:i5 und e8:i5: der Block enthält Links auf
 *        prompts.html, showroom.html, vorlagen.html, vorlagen.html?tab=assets und
 *        lernen-hilfe.html*. Geliefert von der Sammelmeldung. Diese Prüfung steht
 *        hier, damit ein Umbau des Blocks HIER auffällt — mit Begründung — statt
 *        vier fremde Suiten unerklärt rot zu färben.
 *   10 · 0 JS-Fehler über den ganzen Flow.
 *
 * Aufruf:
 *   PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright node tests/e11-neuigkeiten.cjs [URL]
 *   Server extern: python3 -m http.server 8412 (im Projekt-Root)
 *   Default-URL: http://localhost:8412/index.html
 *
 * Ausgabe: strukturiertes JSON auf stdout. Exit 0 = alle grün, 1 = ein Check rot.
 */

const { chromium } = require('/usr/lib/node_modules/playwright');

const ARG = process.argv[2] || 'http://localhost:8412/index.html';
const TARGET = /\.html/.test(ARG) ? ARG : new URL('index.html', ARG).href;
const BASIS = TARGET.replace(/[^/]*$/, '');

/* Grösse des Blocks: drei einzelne Tage plus höchstens eine Sammelmeldung.
   Steht als Zahl im Test, weil sie eine Entscheidung ist und keine Zufälligkeit
   — alle vier i5-Prüfungen verlangen 3–4 .news-item. Wer sie ändert, ändert
   bewusst auch e3:i5, e6:i5, e7:i5 und e8:i5. */
const TAGE_MIN = 3, TAGE_MAX = 4;

/* Der vollständige Vertrag mit den vier fremden i5-Prüfungen — siehe Check 09.
   e3:i5 prompts.html · e6:i5 vorlagen.html?tab=assets · e7:i5 vorlagen.html ·
   e8:i5 alle davon plus showroom.html und lernen-hilfe.html (Präfix).
   Erfüllt werden sie von der Sammelmeldung, die alle älteren Tage aufnimmt und
   deshalb dauerhaft jeden Bereich nennt, in dem je etwas erschienen ist. */
const PFLICHT_LINKS = ['prompts.html', 'showroom.html', 'vorlagen.html', 'vorlagen.html?tab=assets'];
const PFLICHT_PRAEFIX = ['lernen-hilfe.html'];

const VIEWPORTS = [
  { name: 'desktop', viewport: { width: 1280, height: 800 } },
  { name: 'mobile', viewport: { width: 390, height: 844 } },
];

function isBlockedResourceError(text) {
  return /Failed to load resource|net::ERR_FAILED|net::ERR_BLOCKED|raw\.githubusercontent\.com|github\.com/i.test(text);
}

async function runViewport(browser, vp) {
  const context = await browser.newContext({ viewport: vp.viewport, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.route('**raw.githubusercontent.com**', r => r.abort());
  await page.route('**github.com**', r => r.abort());

  const jsErrors = [];
  page.on('pageerror', err => jsErrors.push('pageerror: ' + err.message));
  page.on('console', msg => {
    if (msg.type() !== 'error') return;
    const t = msg.text();
    if (!isBlockedResourceError(t)) jsErrors.push('console.error: ' + t);
  });

  const checks = {};
  const check = (id, pass, data) => { checks[id] = { pass: !!pass, ...data }; };

  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('.news-item', { timeout: 10000 }).catch(() => {});

  const block = await page.evaluate(() => {
    const items = [...document.querySelectorAll('.news-item')];
    return {
      anzahl: items.length,
      meldungen: items.map(li => ({
        datum: (li.querySelector('.news-date') || {}).textContent || '',
        titel: ((li.querySelector('.news-title') || {}).textContent || '').trim(),
        text: ((li.querySelector('.news-text') || {}).textContent || '').trim(),
        links: [...li.querySelectorAll('.news-text a')].map(a => a.getAttribute('href')),
      })),
      /* Rohdaten der Sortierung: newsMeldungen() liefert genau das, was gerendert
         wird (die einzelnen Tage plus ggf. die Sammelmeldung) — mit ISO-Datum.
         Die Anzeige zeigt nur die deutsche Schreibweise. */
      iso: (typeof newsMeldungen === 'function') ? newsMeldungen().map(m => m.datum) : null,
      sammel: (typeof newsMeldungen === 'function') ? newsMeldungen().filter(m => m.sammel).length : -1,
      tageGesamt: (typeof newsTage === 'function') ? newsTage().length : -1,
      seitWerte: (typeof SEIT !== 'undefined') ? Object.keys(SEIT).map(k => SEIT[k]) : [],
    };
  });

  // ---------- (1) Block vorhanden, richtige Grösse, nichts leer ----------
  const leere = block.meldungen.filter(m => !m.titel || !m.text || !m.datum.trim());
  check('01_block_vorhanden_und_gefuellt',
    block.anzahl >= TAGE_MIN && block.anzahl <= TAGE_MAX && leere.length === 0,
    { anzahl: block.anzahl, erlaubt: `${TAGE_MIN}..${TAGE_MAX}`, leere: leere.length });

  // ---------- (2) absteigend sortiert, Sammelmeldung schliesst den Block ----------
  /* Solange es mehr Tage gibt als einzeln gezeigt werden, MUSS genau eine
     Sammelmeldung dabei sein — sie ist der Grund, warum die Bereichslinks aus
     Check 09 nicht mit der Zeit herausfallen. */
  const iso = block.iso || [];
  const absteigend = iso.length > 1 && iso.every((d, i) => i === 0 || iso[i - 1] >= d);
  const sammelNoetig = block.tageGesamt > iso.length - (block.sammel > 0 ? 1 : 0);
  check('02_absteigend_sortiert_mit_sammelmeldung',
    iso.length === block.anzahl && absteigend && block.sammel === (sammelNoetig ? 1 : 0),
    { iso, sammelmeldungen: block.sammel, tageGesamt: block.tageGesamt });

  // ---------- (3) jede Meldung verlinkt, jeder Link löst auf ----------
  const ohneLink = block.meldungen.filter(m => m.links.length === 0);
  const alleHrefs = [...new Set(block.meldungen.flatMap(m => m.links))];
  const tot = [];
  for (const h of alleHrefs) {
    const resp = await page.goto(BASIS + h, { waitUntil: 'domcontentloaded' }).catch(() => null);
    await page.waitForTimeout(700);
    const status = resp ? resp.status() : 0;
    const aufgeloest = await page.evaluate(() => {
      const m = document.getElementById('modal-overlay');
      if (m && m.classList.contains('open')) return 'modal';
      const q = new URLSearchParams(location.search);
      /* VERSCHÄRFUNG (elfte Sammlung): `pa` gehörte in diese Liste, sonst war die
         Prüfung für den neuen Link BLIND — ein unbekannter Parameter fällt unten
         auf 'bereichsseite' durch und gälte damit als aufgelöst, auch wenn er ins
         Leere zeigt. Mit `pa` in der Liste UND 'bk-pa-' in den Ankerpräfixen muss
         ein ?pa=-Link nachweislich ein Element treffen.
         Dieselbe Verschärfung für die zwölfte Sammlung: `g` (Startprojekte) in der
         Liste, 'sp-' in den Ankerpräfixen. Ohne beides wäre showroom.html?g=xyz
         still als „Bereichsseite" durchgegangen. */
      const id = q.get('a') || q.get('b') || q.get('d') || q.get('pa') || q.get('g') || q.get('skill') || q.get('p')
        || q.get('case') || q.get('befehl') || q.get('begriff') || q.get('faq') || q.get('r');
      if (!id) return 'bereichsseite';
      if (location.hash && location.hash.length > 1) return 'hash';
      /* location.hash kann „#begriff/cloud" sein — kein gültiger CSS-Selektor.
         Deshalb getElementById statt querySelector. */
      for (const pre of ['asset-', 'bk-data-', 'bk-pa-', 'sp-', 'case-', 'begriff-', 'r-', 'faq-', 'befehl-'])
        if (document.getElementById(pre + id)) return 'element';
      return null;
    });
    if (status !== 200 || !aufgeloest) tot.push({ href: h, status, aufgeloest });
  }
  check('03_alle_links_loesen_auf', ohneLink.length === 0 && tot.length === 0,
    { geprueft: alleHrefs.length, ohneLink: ohneLink.length, tot });

  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('.news-item', { timeout: 10000 }).catch(() => {});

  // ---------- (4) Jahreszahl am Datum ----------
  const ohneJahr = block.meldungen.filter(m => !/\b(19|20)\d{2}\b/.test(m.datum));
  check('04_datum_mit_jahr', ohneJahr.length === 0,
    { daten: block.meldungen.map(m => m.datum.trim()), ohneJahr: ohneJahr.length });

  // ---------- (5) kein erfundenes Datum ----------
  const bekannt = new Set(block.seitWerte);
  const fremd = iso.filter(d => !bekannt.has(d));
  check('05_kein_erfundenes_datum', iso.length > 0 && fremd.length === 0,
    { fremd, seitTage: [...bekannt].sort() });

  // ---------- (6) SEIT deckt alle elf Sammlungen lückenlos ----------
  const abdeckung = await page.evaluate(() => {
    if (typeof SEIT === 'undefined' || typeof GSEARCH_GROUPS === 'undefined') return null;
    const globs = [...new Set(GSEARCH_GROUPS.map(g => g.glob))];
    const luecken = [], proGlob = {};
    globs.forEach(gl => {
      let arr; try { arr = eval(gl); } catch (e) { arr = null; }
      if (!Array.isArray(arr)) { luecken.push(gl + ':<Sammlung fehlt>'); return; }
      proGlob[gl] = arr.length;
      arr.forEach(it => { if (!SEIT[gl + ':' + it.id]) luecken.push(gl + ':' + it.id); });
    });
    return { globs: globs.length, proGlob, luecken: luecken.slice(0, 12), lueckenGesamt: luecken.length };
  });
  /* Die Zahl der Sammlungen ist der Wächter gegen ein STILLES VERSCHWINDEN: fiele
     eine Gattung aus GSEARCH_GROUPS heraus, wäre sie damit auch aus dieser Prüfung
     heraus — und die Lücken-Zählung meldete brav 0. Deshalb steht sie als Sollwert
     im Test und wird ausschliesslich beim BEWUSSTEN Hinzufügen einer Sammlung
     nachgezogen: 10 → 11 mit den Projektanweisungen (ANWEISUNGEN, Deep-Link
     vorlagen.html?pa=), 11 → 12 mit den Startprojekten (STARTPROJEKTE, Deep-Link
     showroom.html?g=). Die eigentliche Zusicherung — lueckenGesamt === 0, also
     SEIT kennt JEDEN Eintrag JEDER Sammlung — bleibt davon unberührt. */
  check('06_seit_deckt_alle_sammlungen',
    !!abdeckung && abdeckung.globs === 12 && abdeckung.lueckenGesamt === 0, abdeckung || {});

  // ---------- (7) „Neu"-Fähnchen == istNeu() ----------
  const flaggen = {};
  for (const [seite, glob] of [['skills.html', 'SKILLS'], ['prompts.html', 'PROMPTS']]) {
    await page.goto(BASIS + seite, { waitUntil: 'load' });
    await page.waitForTimeout(1200);
    flaggen[seite] = await page.evaluate(g => {
      const gerendert = document.querySelectorAll('.card-neu-flag').length;
      const arr = (g === 'SKILLS') ? SKILLS : PROMPTS;
      const erwartet = (typeof istNeu === 'function') ? arr.filter(it => istNeu(g, it.id)).length : -1;
      return { gerendert, erwartet };
    }, glob);
  }
  check('07_neu_flagge_deckt_sich_mit_ableitung',
    Object.keys(flaggen).every(s => flaggen[s].erwartet >= 0 && flaggen[s].gerendert === flaggen[s].erwartet),
    flaggen);

  // ---------- (8) totes badge-Feld bleibt weg ----------
  /* Zurück auf skills.html: Check 07 endet auf prompts.html, und dort ist SKILLS
     gar nicht geladen — die Prüfung hätte sonst „undefiniert" statt „leer"
     gemessen und wäre aus dem falschen Grund rot geworden. */
  await page.goto(BASIS + 'skills.html', { waitUntil: 'load' });
  await page.waitForTimeout(600);
  const badgeReste = await page.evaluate(() =>
    (typeof SKILLS === 'undefined') ? -1 : SKILLS.filter(s => 'badge' in s).length);
  check('08_kein_gepflegtes_badge_feld', badgeReste === 0, { badgeReste });

  // ---------- (9) Vertrag mit e3:i5 / e6:i5 / e7:i5 / e8:i5 ----------
  const fehlend = PFLICHT_LINKS.filter(h => !alleHrefs.includes(h))
    .concat(PFLICHT_PRAEFIX.filter(pre => !alleHrefs.some(h => h.indexOf(pre) === 0)));
  check('09_bereichslinks_fuer_e3_e6_e7_e8', fehlend.length === 0,
    { pflicht: PFLICHT_LINKS.concat(PFLICHT_PRAEFIX.map(p => p + '*')), fehlend });

  // ---------- (10) keine JS-Fehler ----------
  check('10_keine_js_fehler', jsErrors.length === 0, { jsErrors: jsErrors.slice(0, 3) });

  await context.close();
  const pass = Object.values(checks).every(c => c.pass);
  return { viewport: vp.name, pass, checks };
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
