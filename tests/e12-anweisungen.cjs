#!/usr/bin/env node
/**
 * E12-Messlatte — Projektanweisungen (data/anweisungen.js) im Baukasten-Reiter
 * von vorlagen.html.
 *
 * (Die Nummer ist schlicht der nächste freie Datei-Slot; e1/e3/e6–e11 sind belegt.)
 *
 * Die elfte Sammlung bringt einen eigenen Typ mit: key 'anweisung', Global
 * ANWEISUNGEN, Deep-Link vorlagen.html?pa=<id>, Anker #bk-pa-<id>, Speicher-
 * Präfixe copies:/tried:/rate:/fav: jeweils mit :anweisung:. Genau an dieser
 * Typisierung hängt alles, was danach schiefgehen kann — deshalb der Schwerpunkt
 * auf Namensraum-Sauberkeit (Check 06).
 *
 * Prüft:
 *   01 · Der Abschnitt existiert (h2#pa-h · span#pa-count · div#bk-pa-grid),
 *        das Raster enthält GENAU ANWEISUNGEN.length Karten, #pa-count nennt
 *        dieselbe Zahl, und keine Karte ist leer (data-id, id="bk-pa-<id>",
 *        sichtbarer Text).
 *   02 · Datenvollständigkeit: jeder Eintrag hat alle neun Felder gefüllt;
 *        passt/passtNicht/tags/warum sind nicht-leere Arrays; nirgends ein
 *        offensichtlicher Platzhalter (TODO · TBD · Lorem · XXX · <hier).
 *   03 · `warum` deckt `text`: jede warum[].abschnitt kommt WÖRTLICH im
 *        zugehörigen `text` vor. Zusicherung gegen auseinanderlaufende
 *        Begründungen — die Erklärung neben dem Abschnitt darf nicht auf eine
 *        Überschrift zeigen, die es im Text gar nicht (mehr) gibt.
 *   04 · Der Text ist eine brauchbare CLAUDE.md: ≥ 25 Zeilen und mindestens
 *        eine Markdown-Überschrift je Eintrag. Die Schwelle ist BEWUSST niedrig:
 *        sie soll Verfall fangen (jemand kürzt eine Vorlage auf drei Zeilen),
 *        nicht Stil vorschreiben.
 *   05 · Kopieren: Klick auf [data-copy-anweisung] erhöht copies:anweisung:<id>
 *        um 1, setzt tried:anweisung:<id>, aktualisiert [data-pa-copies] sichtbar
 *        — und der Wert überlebt einen Reload.
 *   06 · NAMENSRAUM-SAUBERKEIT (die wichtigste Prüfung). Nach Kopieren UND
 *        Bewerten UND Merken auf einer Anweisungs-Karte darf KEIN Schlüssel
 *        copies:/tried:/rate:/fav:baustein:<anweisungs-id> existieren, und
 *        rate:anweisung:<id> + fav:anweisung:<id> MÜSSEN existieren.
 *        Grund: setRating(id, n) kennt keinen Typ-Parameter und fällt über
 *        _ratingType() auf window.RatingConfig.type zurück — im Bausteine-Reiter
 *        also auf 'baustein'. Dieser Fehler ist im UI unsichtbar: die Sterne
 *        leuchten, „Deine Sachen" zeigt den Eintrag falsch typisiert oder gar
 *        nicht, und niemand merkt es. Nur der Schlüssel verrät es.
 *   07 · Deep-Link vorlagen.html?pa=<id> öffnet den BAUKASTEN-Reiter (nicht
 *        Assets), #bk-pa-<id> existiert, liegt im Viewport und trägt kurzzeitig
 *        die Hervorhebung. Zusätzlich: KEIN Modal offen. Der Assets-Wächter in
 *        vorlagen.html schliesst bei jedem Hash, der nicht #a/, #b/ oder
 *        #bk-data- ist, per closeModal() — ein offenes/geschlossenes Modal ist
 *        das sichtbare Symptom eines nicht erweiterten Wächters.
 *   08 · Globale Suche: Strg+K, Tippen eines Begriffs aus tags liefert eine
 *        Trefferzeile mit href auf vorlagen.html?pa= unter der Gruppenüberschrift
 *        „Projektanweisungen". Geprüft mit JEDEM tag des ersten Eintrags.
 *   09 · Merken erscheint in „Deine Sachen" mit dem Typ-Label „Projektanweisung"
 *        (DS_TYPE_LABEL.anweisung). Ohne GSEARCH_GROUPS-Eintrag speichert der
 *        Stern zwar, aber die Auflösung fällt still aus.
 *   10 · Seiteneigenes Suchfeld (#search) filtert den Abschnitt: ein Suchwort,
 *        das nur EINE Anweisung trifft, reduziert #bk-pa-grid auf 1 Karte UND
 *        #pa-count auf dieselbe Zahl (Zähler-Ehrlichkeit — ein Zähler, der beim
 *        Gesamtstand stehen bleibt, verspricht mehr als der Reiter liefert).
 *   11 · 0 JS-Fehler auf vorlagen.html (Konsole + pageerror), beide Viewports.
 *   12 · Der vollständige `text` steht im DOM (nicht nur ein Auszug): Kopf-,
 *        Mittel- und Schlusszeile jeder Vorlage sind in der Karte auffindbar.
 *   13 · .card-neu-flag mit Text „Neu" genau dann, wenn istNeu('ANWEISUNGEN', id)
 *        — gerendert == abgeleitet, gleiche Zusicherung wie e11:07 für
 *        skills.html/prompts.html.
 *
 * Die Datenprüfungen 02–04 laufen auch dann, wenn vorlagen.html die Datei noch
 * gar nicht einbindet: fehlt das Global, wird data/anweisungen.js nachgeladen
 * (Feld `datenQuelle` sagt, welcher Fall vorlag). So trennt der Bericht sauber
 * „Daten sind unvollständig" von „Seite bindet die Daten nicht ein".
 *
 * Aufruf:
 *   PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright node tests/e12-anweisungen.cjs [URL]
 *   Server extern: python3 -m http.server 8412 (im Projekt-Root)
 *   Default-URL: http://localhost:8412/vorlagen.html
 *
 * Ausgabe: strukturiertes JSON auf stdout. Exit 0 = alle grün, 1 = ein Check rot.
 */

const { chromium } = require('/usr/lib/node_modules/playwright');

const ARG = process.argv[2] || 'http://localhost:8412/vorlagen.html';
const TARGET = /\.html/.test(ARG) ? ARG : new URL('vorlagen.html', ARG).href;
const BASIS = TARGET.replace(/[^/]*$/, '');
const DATEN_URL = BASIS + 'data/anweisungen.js';

/* Der Typ heisst überall 'anweisung' (Speicher, Suche, Favoriten), das Global
   heisst ANWEISUNGEN, der Deep-Link-Parameter pa, der Anker bk-pa-. Diese vier
   Namen stehen hier EINMAL, weil jede Prüfung unten sie braucht. */
const TYP = 'anweisung';
const GLOB = 'ANWEISUNGEN';
const PARAM = 'pa';
const ANKER = 'bk-pa-';

const GRUPPEN_LABEL = 'Projektanweisungen';   // Gruppenüberschrift globale Suche
const DS_LABEL = 'Projektanweisung';          // DS_TYPE_LABEL in „Deine Sachen"

/* Platzhalter, die in einer ausgelieferten Vorlage nichts zu suchen haben.
   Bewusst kurz und eindeutig — kein deutsches Wort enthält diese Folgen. */
const PLATZHALTER = /(TODO|TBD|Lorem|XXX|<hier)/i;

const MIN_ZEILEN = 25;   // siehe Check 04: Verfallsgrenze, keine Stilvorgabe

const VIEWPORTS = [
  { name: 'desktop', viewport: { width: 1280, height: 800 } },
  { name: 'mobile', viewport: { width: 390, height: 844 } },
];

function isBlockedResourceError(text) {
  return /Failed to load resource|net::ERR_FAILED|net::ERR_BLOCKED|raw\.githubusercontent\.com|github\.com/i.test(text);
}

// Erste ganze Zahl aus einem Zählertext („3 Anweisungen · …" / „1 von 3 …").
function ersteZahl(s) {
  const m = String(s == null ? '' : s).match(/\d+/);
  return m ? parseInt(m[0], 10) : -1;
}

async function runViewport(browser, vp) {
  const context = await browser.newContext({ viewport: vp.viewport, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.route('**raw.githubusercontent.com**', r => r.abort());
  await page.route('**github.com**', r => r.abort());

  const jsErrors = [];
  const blockedResourceErrors = [];
  page.on('pageerror', err => jsErrors.push('pageerror: ' + err.message));
  page.on('console', msg => {
    if (msg.type() !== 'error') return;
    const t = msg.text();
    if (isBlockedResourceError(t)) blockedResourceErrors.push(t);
    else jsErrors.push('console.error: ' + t);
  });

  const checks = {};
  const check = (id, pass, data) => { checks[id] = { pass: !!pass, ...data }; };

  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#bk-grid .baustein-card', { timeout: 10000 }).catch(() => {});
  await page.waitForSelector('#bk-pa-grid .bk-pa-card', { timeout: 8000 }).catch(() => {});

  // ---------- Daten beschaffen (Seite bevorzugt, sonst nachladen) ----------
  let datenQuelle = 'seite';
  const globDa = await page.evaluate(g => typeof window[g] !== 'undefined'
    || (0, eval)('typeof ' + g) !== 'undefined', GLOB);
  if (!globDa) {
    datenQuelle = await page.addScriptTag({ url: DATEN_URL })
      .then(() => 'nachgeladen').catch(() => 'fehlt');
  }
  const daten = await page.evaluate(g => {
    let arr; try { arr = (0, eval)(g); } catch (e) { return null; }
    return Array.isArray(arr) ? JSON.parse(JSON.stringify(arr)) : null;
  }, GLOB);

  if (!daten || !daten.length) {
    // Ohne Daten ist jede weitere Prüfung sinnlos — alle 13 rot, mit Grund.
    const grund = { datenQuelle, url: DATEN_URL, hinweis: 'ANWEISUNGEN nicht ladbar' };
    ['01_abschnitt_raster_und_zaehler', '02_daten_vollstaendig', '03_warum_deckt_text',
      '04_text_ist_brauchbare_claudemd', '05_kopieren_zaehlt_und_ueberlebt_reload',
      '06_namensraum_sauber', '07_deeplink_pa_oeffnet_baukasten', '08_globale_suche_gruppe',
      '09_deine_sachen_typ_label', '10_seitensuche_filtert_und_zaehlt_ehrlich',
      '12_volltext_steht_im_dom', '13_neu_flagge_deckt_sich_mit_ableitung']
      .forEach(id => check(id, false, grund));
    check('11_keine_js_fehler', jsErrors.length === 0,
      { jsErrors: jsErrors.slice(0, 5), blockedResourceErrors: blockedResourceErrors.length });
    await context.close();
    const failed0 = Object.entries(checks).filter(([, c]) => !c.pass).map(([id]) => id);
    return { viewport: vp.name, size: vp.viewport, pass: false, failed: failed0, checks };
  }

  const ERSTE = daten[0];

  // ---------- (2) Datenvollständigkeit ----------
  const FELDER = ['id', 'name', 'kurz', 'wofuer', 'passt', 'passtNicht', 'tags', 'warum', 'text'];
  const ARRAYS = ['passt', 'passtNicht', 'tags', 'warum'];
  const datenMaengel = [];
  daten.forEach(a => {
    FELDER.forEach(f => {
      const v = a[f];
      if (v === undefined || v === null) { datenMaengel.push(`${a.id || '?'}.${f}: fehlt`); return; }
      if (ARRAYS.includes(f)) {
        if (!Array.isArray(v) || v.length === 0) datenMaengel.push(`${a.id}.${f}: kein nicht-leeres Array`);
      } else if (typeof v !== 'string' || !v.trim()) {
        datenMaengel.push(`${a.id}.${f}: leer`);
      }
    });
    // warum-Einträge tragen beide Teilfelder
    (Array.isArray(a.warum) ? a.warum : []).forEach((w, i) => {
      if (!w || typeof w.abschnitt !== 'string' || !w.abschnitt.trim()) datenMaengel.push(`${a.id}.warum[${i}].abschnitt: leer`);
      if (!w || typeof w.grund !== 'string' || !w.grund.trim()) datenMaengel.push(`${a.id}.warum[${i}].grund: leer`);
    });
    // Platzhalter über ALLE Felder (inkl. Array-Inhalte und warum-Objekte)
    const blob = JSON.stringify(FELDER.map(f => a[f]));
    const tr = blob.match(PLATZHALTER);
    if (tr) datenMaengel.push(`${a.id}: Platzhalter „${tr[0]}"`);
  });
  check('02_daten_vollstaendig', datenMaengel.length === 0,
    { eintraege: daten.length, ids: daten.map(a => a.id), datenQuelle, maengel: datenMaengel.slice(0, 12) });

  // ---------- (3) `warum` deckt `text` ----------
  const warumLuecken = [];
  daten.forEach(a => {
    const text = String(a.text || '');
    (Array.isArray(a.warum) ? a.warum : []).forEach(w => {
      const ab = String((w && w.abschnitt) || '');
      if (!ab || text.indexOf(ab) === -1) warumLuecken.push(`${a.id}: „${ab}" steht nicht im text`);
    });
  });
  check('03_warum_deckt_text', warumLuecken.length === 0,
    { geprueft: daten.reduce((n, a) => n + (a.warum || []).length, 0), luecken: warumLuecken.slice(0, 12) });

  // ---------- (4) Der Text ist eine brauchbare CLAUDE.md ----------
  const textMasse = daten.map(a => ({
    id: a.id,
    zeilen: String(a.text || '').split('\n').length,
    ueberschrift: /^#{1,6}\s+\S/m.test(String(a.text || '')),
  }));
  check('04_text_ist_brauchbare_claudemd',
    textMasse.every(t => t.zeilen >= MIN_ZEILEN && t.ueberschrift),
    { mindestZeilen: MIN_ZEILEN, textMasse });

  // ---------- (1) Abschnitt, Raster, Zähler, keine leere Karte ----------
  const abschnitt = await page.evaluate(a => {
    const sec = document.querySelector('section.lib-section h2#pa-h')
      ? document.querySelector('section.lib-section h2#pa-h').closest('section.lib-section') : null;
    const grid = document.getElementById('bk-pa-grid');
    const cnt = document.getElementById('pa-count');
    const karten = grid ? [...grid.querySelectorAll('article.bk-pa-card')] : [];
    return {
      sectionDa: !!sec,
      h2Da: !!document.getElementById('pa-h'),
      countDa: !!cnt && cnt.classList.contains('lib-sec-count'),
      gridDa: !!grid && grid.classList.contains('bk-pa-grid'),
      gridImAbschnitt: !!sec && !!grid && sec.contains(grid),
      kartenAnzahl: karten.length,
      countText: cnt ? cnt.textContent.trim() : '',
      karten: karten.map(k => ({
        id: k.id,
        dataId: k.dataset.id || '',
        idPasst: k.id === 'bk-pa-' + (k.dataset.id || ''),
        textLaenge: (k.textContent || '').trim().length,
        sichtbar: k.getClientRects().length > 0,
      })),
      unbekannt: karten.map(k => k.dataset.id || '').filter(id => !a.some(x => x.id === id)),
    };
  }, daten);
  const leereKarten = abschnitt.karten.filter(k => !k.dataId || !k.idPasst || k.textLaenge < 40);
  check('01_abschnitt_raster_und_zaehler',
    abschnitt.sectionDa && abschnitt.h2Da && abschnitt.countDa && abschnitt.gridDa
      && abschnitt.gridImAbschnitt
      && abschnitt.kartenAnzahl === daten.length
      && ersteZahl(abschnitt.countText) === daten.length
      && leereKarten.length === 0 && abschnitt.unbekannt.length === 0,
    { erwartet: daten.length, ...abschnitt, leereKarten });

  // ---------- (12) Der vollständige Text steht im DOM ----------
  /* Nicht nur „irgendein Text": Kopf-, Mittel- und Schlusszeile jeder Vorlage
     müssen in der Karte auffindbar sein. Ein Auszug („die ersten 20 Zeilen …")
     fällt damit auf — er wäre für die Nutzung als CLAUDE.md wertlos. */
  const volltext = await page.evaluate(a => {
    const norm = s => s.replace(/\s+/g, ' ').trim();
    return a.map(x => {
      const karte = document.getElementById('bk-pa-' + x.id);
      const zeilen = String(x.text || '').split('\n').map(z => z.trim()).filter(z => z.length > 25);
      const proben = zeilen.length >= 3
        ? [zeilen[0], zeilen[Math.floor(zeilen.length / 2)], zeilen[zeilen.length - 1]] : zeilen;
      if (!karte) return { id: x.id, karte: false, fehlend: proben.length };
      const hay = norm(karte.textContent || '');
      return { id: x.id, karte: true, proben: proben.length, fehlend: proben.filter(p => hay.indexOf(norm(p)) === -1).length };
    });
  }, daten);
  check('12_volltext_steht_im_dom',
    volltext.length > 0 && volltext.every(v => v.karte && v.proben > 0 && v.fehlend === 0),
    { volltext });

  // ---------- (13) „Neu"-Fähnchen == istNeu(GLOB, id) ----------
  const neu = await page.evaluate(o => {
    const grid = document.getElementById('bk-pa-grid');
    const flaggen = grid ? [...grid.querySelectorAll('.card-neu-flag')] : [];
    const erwartet = (typeof istNeu === 'function')
      ? o.ids.filter(id => istNeu(o.glob, id)) : null;
    return {
      gerendert: flaggen.length,
      texteOk: flaggen.every(f => f.textContent.trim() === 'Neu'),
      erwartet: erwartet === null ? -1 : erwartet.length,
      erwarteteIds: erwartet,
      gerenderteIds: flaggen.map(f => {
        const k = f.closest('article.bk-pa-card');
        return k ? (k.dataset.id || '') : '';
      }),
    };
  }, { glob: GLOB, ids: daten.map(a => a.id) });
  const neuIdsGleich = Array.isArray(neu.erwarteteIds)
    && neu.erwarteteIds.slice().sort().join('|') === neu.gerenderteIds.slice().sort().join('|');
  check('13_neu_flagge_deckt_sich_mit_ableitung',
    neu.erwartet >= 0 && neu.gerendert === neu.erwartet && neu.texteOk && neuIdsGleich,
    neu);

  // ---------- (5) Kopieren zählt, markiert „ausprobiert", überlebt Reload ----------
  const kopId = ERSTE.id;
  const vorher = await page.evaluate(o => {
    const z = document.querySelector(`[data-pa-copies="${CSS.escape(o.id)}"]`);
    return {
      copies: localStorage.getItem('copies:' + o.typ + ':' + o.id),
      tried: localStorage.getItem('tried:' + o.typ + ':' + o.id),
      knopfDa: !!document.querySelector(`[data-copy-${o.typ}="${CSS.escape(o.id)}"]`),
      zaehlerDa: !!z,
      zaehlerText: z ? z.textContent.trim() : '',
      zaehlerSichtbar: !!z && z.getClientRects().length > 0,
    };
  }, { id: kopId, typ: TYP });
  await page.evaluate(o => {
    const b = document.querySelector(`[data-copy-${o.typ}="${CSS.escape(o.id)}"]`);
    if (b) b.click();
  }, { id: kopId, typ: TYP });
  await page.waitForTimeout(400);
  const nachher = await page.evaluate(o => {
    const z = document.querySelector(`[data-pa-copies="${CSS.escape(o.id)}"]`);
    return {
      copies: localStorage.getItem('copies:' + o.typ + ':' + o.id),
      tried: localStorage.getItem('tried:' + o.typ + ':' + o.id),
      zaehlerText: z ? z.textContent.trim() : '',
      zaehlerSichtbar: !!z && z.getClientRects().length > 0,
    };
  }, { id: kopId, typ: TYP });
  await page.reload({ waitUntil: 'load' });
  await page.waitForSelector('#bk-pa-grid .bk-pa-card', { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(300);
  const nachReload = await page.evaluate(o => {
    const z = document.querySelector(`[data-pa-copies="${CSS.escape(o.id)}"]`);
    return {
      copies: localStorage.getItem('copies:' + o.typ + ':' + o.id),
      tried: localStorage.getItem('tried:' + o.typ + ':' + o.id),
      zaehlerText: z ? z.textContent.trim() : '',
    };
  }, { id: kopId, typ: TYP });
  const vorZahl = ersteZahl(vorher.zaehlerText), nachZahl = ersteZahl(nachher.zaehlerText);
  check('05_kopieren_zaehlt_und_ueberlebt_reload',
    vorher.knopfDa && vorher.zaehlerDa
      && (vorher.copies === null || vorher.copies === '0')
      && nachher.copies === '1' && nachher.tried === '1'
      && nachher.zaehlerSichtbar && nachher.zaehlerText !== vorher.zaehlerText
      && nachZahl === vorZahl + 1
      && nachReload.copies === '1' && ersteZahl(nachReload.zaehlerText) === nachZahl,
    { id: kopId, vorher, nachher, nachReload });

  // ---------- (6) Namensraum-Sauberkeit ----------
  /* Bewerten und Merken auf DERSELBEN Karte. Beide Bedienelemente folgen den
     Hausmustern (.up-btn[data-up-id], .fav-btn[data-fav-id]), gesucht wird
     zuerst innerhalb der Karte. Aufklapper werden vorher geöffnet, damit ein
     Widget in einem <details> nicht als „fehlt" gilt.

     NACHGEZOGEN (2026-08-03): Bewertet wird nicht mehr mit fünf Sternen
     (#star-input-<id> .star-btn[data-val]), sondern mit dem gemeinsamen
     Upvote-Knopf aus base.js — vorlagen.html rendert ihn für Anweisungen als
     renderUpvoteBtn(a.id, 'anweisung', …). Entsprechend heißt der erwartete
     Schlüssel vote:anweisung:<id> statt rate:anweisung:<id>.

     Der Prüf-GEDANKE ist unverändert und ausgerechnet hier der wichtigste im
     ganzen Repo: `baustein` ist der Seiten-Default von vorlagen.html
     (window.RatingConfig). Ein Widget, das seinen Typ nicht explizit mitgibt,
     schreibt also lautlos in den FALSCHEN Namensraum. Deshalb wird weiterhin
     beides geprüft — der eigene Schlüssel entsteht UND kein baustein-Schlüssel
     mit dieser id. Die Fremd-Prüfung deckt jetzt zusätzlich vote:baustein: ab. */
  const bedient = await page.evaluate(o => {
    const karte = document.getElementById('bk-pa-' + o.id);
    if (karte) karte.querySelectorAll('details').forEach(d => { d.open = true; });
    const suche = sel => (karte && karte.querySelector(sel)) || document.querySelector(sel);
    const stimme = suche(`.up-btn[data-up-id="${CSS.escape(o.id)}"]`);
    const fav = suche(`.fav-btn[data-fav-id="${CSS.escape(o.id)}"]`);
    if (stimme) stimme.click();
    if (fav) fav.click();
    return {
      stimmeGefunden: !!stimme,
      // Der Typ am Knopf selbst — eine falsche Verdrahtung fällt so schon hier
      // auf und nicht erst indirekt über einen fehlenden Speicher-Schlüssel.
      stimmeTyp: stimme ? stimme.getAttribute('data-up-typ') : null,
      favGefunden: !!fav,
    };
  }, { id: kopId });
  await page.waitForTimeout(400);
  const namensraum = await page.evaluate(o => {
    const k = p => localStorage.getItem(p + ':' + o.id);
    return {
      fremd: {
        copies: k('copies:baustein'), tried: k('tried:baustein'),
        rate: k('rate:baustein'), vote: k('vote:baustein'), fav: k('fav:baustein'),
      },
      eigen: {
        copies: k('copies:' + o.typ), tried: k('tried:' + o.typ),
        vote: k('vote:' + o.typ), fav: k('fav:' + o.typ),
      },
      alleSchluesselMitId: Object.keys(localStorage).filter(x => x.endsWith(':' + o.id)),
    };
  }, { id: kopId, typ: TYP });
  const fremdTreffer = Object.entries(namensraum.fremd).filter(([, v]) => v !== null).map(([k]) => k);
  check('06_namensraum_sauber',
    bedient.stimmeGefunden && bedient.stimmeTyp === TYP && bedient.favGefunden
      && fremdTreffer.length === 0
      && namensraum.eigen.vote !== null && namensraum.eigen.fav !== null,
    { id: kopId, ...bedient, fremdTreffer, ...namensraum });

  // ---------- (10) Seiteneigenes Suchfeld filtert den Abschnitt ehrlich ----------
  /* Suchwort aus den Daten ableiten statt hart eintippen: gesucht wird ein Wort
     aus Name/Tags des ERSTEN Eintrags, das in KEINEM anderen Eintrag irgendwo
     vorkommt. Damit ist der Sollwert „genau 1 Karte" aus den Daten begründet
     und driftet nicht, wenn Vorlagen umbenannt werden. */
  const begriff = (() => {
    const blob = a => JSON.stringify(a).toLowerCase();
    for (let i = 0; i < daten.length; i++) {
      const andere = daten.filter((_, j) => j !== i).map(blob).join(' ');
      const woerter = ((daten[i].name || '') + ' ' + (daten[i].tags || []).join(' '))
        .toLowerCase().match(/[a-zäöüß0-9]{5,}/g) || [];
      for (const w of woerter) if (andere.indexOf(w) === -1) return { wort: w, id: daten[i].id };
    }
    return null;
  })();
  if (begriff) {
    await page.fill('#search', begriff.wort);
    await page.waitForTimeout(600);   // Debounce 150 ms + Rendern
    const gefiltert = await page.evaluate(() => {
      const grid = document.getElementById('bk-pa-grid');
      const cnt = document.getElementById('pa-count');
      const karten = grid ? [...grid.querySelectorAll('article.bk-pa-card')] : [];
      return {
        karten: karten.length,
        ids: karten.map(k => k.dataset.id || ''),
        countText: cnt ? cnt.textContent.trim() : '',
      };
    });
    check('10_seitensuche_filtert_und_zaehlt_ehrlich',
      gefiltert.karten === 1 && gefiltert.ids[0] === begriff.id
        && ersteZahl(gefiltert.countText) === 1,
      { begriff, ...gefiltert });
    await page.fill('#search', '');
    await page.waitForTimeout(400);
  } else {
    check('10_seitensuche_filtert_und_zaehlt_ehrlich', false,
      { hinweis: 'kein eindeutiges Suchwort in den Daten gefunden (Name/Tags zu ähnlich)' });
  }

  // ---------- (7) Deep-Link ?pa=<id> ----------
  await page.goto('about:blank');
  await page.goto(TARGET + '?' + PARAM + '=' + encodeURIComponent(kopId), { waitUntil: 'load' });
  const zielDa = await page.waitForSelector('#' + ANKER + kopId, { timeout: 8000 })
    .then(() => true).catch(() => false);
  // Die Hervorhebung liegt nur ~2,4 s an — deshalb aktiv darauf warten statt
  // einmal blind nach fester Zeit zu messen (siehe highlightCard in vorlagen.html).
  const hervorgehoben = await page.waitForFunction(
    sel => { const el = document.getElementById(sel); return !!el && el.classList.contains('-highlight'); },
    ANKER + kopId, { timeout: 3500 }
  ).then(() => true).catch(() => false);
  await page.waitForTimeout(800);   // Scroll + fonts.ready-Reanchor ausrollen lassen
  const deep = await page.evaluate(sel => {
    const el = document.getElementById(sel);
    const r = el ? el.getBoundingClientRect() : null;
    const tabB = document.getElementById('vltab-bausteine');
    const panelB = document.getElementById('panel-bausteine');
    const panelA = document.getElementById('panel-assets');
    const ov = document.getElementById('modal-overlay');
    return {
      zielDa: !!el,
      /* „im Viewport" = das Ziel schneidet den sichtbaren Bereich. Absichtlich
         nicht „vollständig sichtbar": eine Karte mit einer kompletten CLAUDE.md
         ist auf 390×844 höher als das Fenster und könnte das nie erfüllen. */
      imViewport: !!r && r.bottom > 0 && r.top < window.innerHeight,
      rect: r ? { top: Math.round(r.top), bottom: Math.round(r.bottom) } : null,
      bausteineTabAktiv: !!tabB && tabB.classList.contains('active'),
      panelBausteineSichtbar: !!panelB && !panelB.hidden,
      panelAssetsVersteckt: !!panelA && panelA.hidden,
      modalOffen: !!ov && ov.classList.contains('open'),
      hash: location.hash,
    };
  }, ANKER + kopId);
  check('07_deeplink_pa_oeffnet_baukasten',
    zielDa && deep.zielDa && deep.imViewport && hervorgehoben
      && deep.bausteineTabAktiv && deep.panelBausteineSichtbar && deep.panelAssetsVersteckt
      && !deep.modalOffen,
    { id: kopId, hervorgehoben, ...deep });

  // ---------- (8) Globale Suche: Gruppe + Deep-Link je tag ----------
  await page.goto(TARGET, { waitUntil: 'load' });
  await page.waitForSelector('#nav-suche-btn', { timeout: 10000 }).catch(() => {});
  await page.keyboard.press('Control+k');
  let offen = await page.waitForSelector('#gsearch-overlay.open', { timeout: 5000 }).then(() => true).catch(() => false);
  if (!offen) {
    await page.keyboard.press('Meta+k');
    offen = await page.waitForSelector('#gsearch-overlay.open', { timeout: 3000 }).then(() => true).catch(() => false);
  }
  const suchTags = (ERSTE.tags || []).slice(0, 6);
  const suchErgebnis = [];
  for (const tag of suchTags) {
    await page.fill('#gsearch-input', tag);
    await page.waitForFunction(
      o => [...document.querySelectorAll('#gsearch-results .gs-opt[role="option"]')]
        .some(a => (a.getAttribute('href') || '').indexOf(o.pre) === 0),
      { pre: 'vorlagen.html?' + PARAM + '=' }, { timeout: 4000 }
    ).catch(() => {});
    await page.waitForTimeout(150);
    suchErgebnis.push(await page.evaluate(o => {
      const opts = [...document.querySelectorAll('#gsearch-results .gs-opt[role="option"]')];
      const treffer = opts.filter(a => (a.getAttribute('href') || '').indexOf(o.pre) === 0);
      return {
        tag: o.tag,
        treffer: treffer.length,
        hrefs: treffer.slice(0, 3).map(a => a.getAttribute('href')),
        gruppe: [...document.querySelectorAll('#gsearch-results .gs-group-label')]
          .map(g => g.textContent.trim()).indexOf(o.label) !== -1,
        gruppen: [...document.querySelectorAll('#gsearch-results .gs-group-label')].map(g => g.textContent.trim()),
      };
    }, { tag, pre: 'vorlagen.html?' + PARAM + '=', label: GRUPPEN_LABEL }));
  }
  check('08_globale_suche_gruppe',
    offen && suchTags.length > 0 && suchErgebnis.every(r => r.treffer >= 1 && r.gruppe),
    { overlayOffen: offen, gruppenLabel: GRUPPEN_LABEL, ergebnisse: suchErgebnis });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);

  // ---------- (9) „Deine Sachen": Typ-Label ----------
  await page.evaluate(() => openDeineSachen());
  await page.waitForSelector('#ds-overlay.open', { timeout: 5000 }).catch(() => {});
  await page.waitForFunction(() => !document.querySelector('#ds-overlay .ds-loading'), { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(400);
  const ds = await page.evaluate(o => {
    const items = [...document.querySelectorAll('#ds-overlay .ds-item')];
    const meins = items.filter(a => (a.getAttribute('href') || '').indexOf('?' + o.param + '=' + o.id) !== -1);
    return {
      labelKonstante: (typeof DS_TYPE_LABEL !== 'undefined') ? (DS_TYPE_LABEL[o.typ] || null) : null,
      itemsGesamt: items.length,
      treffer: meins.length,
      metas: meins.map(a => {
        const m = a.querySelector('.ds-item-meta');
        return m ? m.textContent.replace(/[★☆\s]+$/, '').trim() : '';
      }),
      titel: meins.map(a => {
        const t = a.querySelector('.ds-item-title');
        return t ? t.textContent.trim() : '';
      }),
    };
  }, { typ: TYP, param: PARAM, id: kopId });
  check('09_deine_sachen_typ_label',
    ds.labelKonstante === DS_LABEL && ds.treffer >= 1 && ds.metas.every(m => m === DS_LABEL),
    { erwartetesLabel: DS_LABEL, id: kopId, ...ds });
  await page.evaluate(() => closeDeineSachen());
  await page.waitForTimeout(200);

  // ---------- (11) keine JS-Fehler ----------
  check('11_keine_js_fehler', jsErrors.length === 0,
    { jsErrors: jsErrors.slice(0, 5), blockedResourceErrors: blockedResourceErrors.length });

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
