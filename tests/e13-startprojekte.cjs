#!/usr/bin/env node
/**
 * E13-Messlatte — Startprojekte (data/startprojekte.js) im Abschnitt
 * „Startprojekte" von showroom.html.
 *
 * (Die Nummer ist schlicht der nächste freie Datei-Slot; e1/e3/e6–e12 sind belegt.)
 *
 * Die zwölfte Sammlung bringt einen eigenen Typ mit: key 'startprojekt', Global
 * STARTPROJEKTE, Deep-Link showroom.html?g=<id>, Anker #sp-<id>, Speicher-Präfix
 * fav:startprojekt:<id>. Anders als alle bisherigen Sammlungen hat sie eine
 * zweite Wahrheit ausserhalb der Datendatei: den ORDNER AUF DER PLATTE. Genau
 * dort liegt die Fehlerklasse, die kein DOM-Test findet — eine Dateiliste, die
 * neben der Platte herläuft, sieht auf der Seite tadellos aus und liefert ein
 * kaputtes ZIP. Deshalb prüfen 05 und 11 beide Richtungen und packen das ZIP
 * wirklich aus.
 *
 * Der Abschnitt folgt bewusst dem ANKER-Muster der Projektanweisungen
 * (Abschnitt + Karte + #-Anker + Hervorhebung), NICHT dem Case-Muster mit
 * iframe und Modal. Er liegt ausserhalb #sr-grid — mehrere Prüfungen hier
 * (03, 04) schützen genau diese Trennung, weil e8 im Case-Grid mit festen
 * Zahlen arbeitet (10 Karten, 4 echt, 6 Beispiel) und e8:05 Sterne-Freiheit
 * über den GESAMTEN localStorage der Seite verlangt.
 *
 * Prüft:
 *   01 · Bestand: STARTPROJEKTE ist geladen, hat GENAU 3 Einträge, IDs sind
 *        eindeutig, jedes Vertragsfeld ist vorhanden und nicht leer, `dateien`
 *        ist ein nicht-leeres Array OHNE CLAUDE.md, `ordner`/`liveUrl` folgen
 *        dem Vertragsmuster, keine externe URL (qa links würde sonst Exit 1
 *        melden), kein Platzhalter-Text.
 *   02 · Abschnitt: section#startprojekte mit h2#sp-h, span#sp-count und
 *        div#sp-grid, in der DOKUMENTREIHENFOLGE nach dem Case-Bereich und vor
 *        „Meistgewollt". Der Zähler nennt eine Zahl, die zur Datenlage passt.
 *        UNTERGRENZE: die Datenlage ist zuvor auf === 3 festgenagelt (01) —
 *        ohne sie wäre „Zähler == Daten" bei leeren Daten (0 == 0) grün.
 *   03 · Karten: genau 3 .sp-card, Anker-ID sp-<id>, data-id, sichtbarer Name,
 *        Kurztext, Dateiliste, .sp-marker und die drei Knöpfe des Vertrags
 *        („Ansehen" als a[target=_blank][rel~=noopener] auf liveUrl · „Ordner
 *        als ZIP" · Anleitung auf vorlagen.html?pa=<anweisung>). Zusätzlich:
 *        das seiteneigene Suchfeld #search lässt den Abschnitt unberührt — der
 *        Vertrag verbietet, die Projekt-Filter auf ihn auszuweiten — und eine
 *        auf der Karte genannte Dateizahl ist gezählt, nicht getippt.
 *   04 · Trennung vom Case-Grid: KEINE .sp-card in #sr-grid, keine .sr-badge in
 *        einer .sp-card, kein iframe und kein Sterne-Bewertungs-Widget im
 *        Abschnitt, #sr-grid trägt unverändert CASES.length Karten, die
 *        verbotenen Hero-Zähler-IDs fehlen weiterhin, und die Projekt-Filter
 *        (#sr-art/#sr-cats/#sr-sort) tragen keinen Wert, der nicht aus CASES
 *        stammt. Dieser Check ist reiner Fremdschutz: e8:01/02/03/03b/07 pinnen
 *        dort feste Zahlen, und ein Gerüst im falschen Raster färbt vier fremde
 *        Prüfungen rot, ohne dass jemand den Zusammenhang sieht.
 *   05 · Dateiliste == Platte, BEIDE Richtungen. Jede Datei aus `dateien` wird
 *        per HTTP abgerufen (200 verlangt), und der Ordner wird rekursiv
 *        gelesen: liegt dort etwas, das nicht gelistet ist? Zusätzlich darf in
 *        KEINEM Gerüst-Ordner eine CLAUDE.md liegen — die kommt beim Packen aus
 *        data/anweisungen.js, eine zweite auf der Platte wäre ein zweiter
 *        Bestand, der garantiert ausläuft.
 *        UNTERGRENZE: geprüfteDateien > 0 und jeder Ordner hat ≥ 1 Datei —
 *        sonst wäre „Liste == Platte" bei zwei leeren Mengen grün.
 *   06 · Zuordnung zur Bauvorschrift: jedes `anweisung`-Feld zeigt auf eine
 *        existierende ANWEISUNGEN-id, alle drei sind verschieden, und jede
 *        Vorlage wird genau einmal verwendet. Der Anleitungs-Knopf der Karte
 *        zeigt auf dieselbe id (DOM == Daten).
 *        UNTERGRENZE: ANWEISUNGEN.length > 0 und 3 geprüfte Zuordnungen.
 *   07 · Deep-Link showroom.html?g=<id> normalisiert zu #sp-<id>, fährt die
 *        Karte an, hebt sie kurz hervor und öffnet KEIN Modal. Unbekannte id:
 *        still, keine JS-Fehler, keine Hervorhebung. Fremde Query-Parameter
 *        (utm_source) überleben die Normalisierung.
 *   08 · GEGENPROBE: ?case=<id> funktioniert unverändert weiter (kanonischer
 *        Hash #case/<id> + Modal offen + richtiger Name), und bei ?case=&g=
 *        behält der Case-Zweig die Oberhand. e8:08 prüft denselben Weg — hier
 *        steht er, damit ein Schaden IN DIESER Suite auffällt, statt e8 ohne
 *        erkennbaren Zusammenhang rot zu färben.
 *   09 · Merken: der Stern schreibt fav:startprojekt:<id>. DER ENTSCHEIDENDE
 *        TEIL: danach existiert KEIN Schlüssel rate: — e8:05 (tests/e8-showroom.cjs:255)
 *        prüft das über den gesamten localStorage der Seite. Gemessen wird am
 *        ENDE des Laufs, nach ZIP und allen Deep-Links, nicht direkt nach dem
 *        Klick. Ausserdem: „Deine Sachen" zeigt das Label „Startprojekt" (nicht
 *        „Projekt"), und das aria-label des Sterns trägt den Projektnamen —
 *        der typlose Rückfall in onFavoritesChanged wäre sonst unsichtbar.
 *   10 · Globale Suche: Strg+K, ein Tag des ersten Gerüsts liefert eine
 *        Trefferzeile mit href der Form showroom.html?g= UNTER DER EIGENEN
 *        Gruppenüberschrift „Startprojekte" (nicht unter „Projekte").
 *        UNTERGRENZE: ≥ 1 Treffer je geprüftem Tag, ≥ 1 geprüfter Tag.
 *   11 · ZIP: Download auslösen, Datei entgegennehmen, ENTPACKEN. Verlangt:
 *        Dateiname <id>.zip, Signatur PK\x03\x04, Zentralverzeichnis nennt
 *        genau `dateien` + CLAUDE.md (jeweils unter <id>/), jede gepackte Datei
 *        ist BYTE-GLEICH mit der auf der Platte, und der Text der CLAUDE.md ist
 *        ZEICHENGLEICH mit ANWEISUNGEN[].text.
 *        UNTERGRENZE: text.length > 200 — ein leerer Text wäre sonst mit einer
 *        leeren Datei „gleich".
 *   11b· Der Gegenfall zum Vertrag („Scheitert auch nur eine Datei: sichtbare
 *        Meldung, KEIN Download"): eine Datei des Gerüsts wird auf Netzebene
 *        abgewürgt, dann wird gepackt. Erwartet: KEIN Download-Ereignis und
 *        eine sichtbare Meldung an der Karte oder im Toast. Ein stillschweigend
 *        unvollständiges ZIP ist die eine Fehlerart, die niemand bemerkt —
 *        das Gerüst liefe, sähe falsch aus, und keiner wüsste warum.
 *   12 · Zwei Viewports: kein horizontaler Überlauf und jeder Knopf im
 *        Abschnitt sichtbar, innerhalb des Fensters und ≥ 24 px hoch/breit.
 *   13 · 0 JS-Fehler (Konsole + pageerror) über den gesamten Lauf.
 *   14 · data/seit.js kennt jedes Gerüst (Schlüssel STARTPROJEKTE:<id> mit
 *        Datum), und das „Neu"-Fähnchen deckt sich mit istNeu(). Die zweite
 *        Hälfte allein wäre wertlos: ohne SEIT-Eintrag ist istNeu() IMMER
 *        falsch, es erscheint nie ein Fähnchen, und „0 gerendert == 0 erwartet"
 *        wäre grün — genau der Fehlschluss, an dem die vorige Stufe fast
 *        vorbeigelaufen wäre. Deshalb steht die Abdeckung (3 Schlüssel, je ein
 *        Datum) VOR dem Vergleich. Dieser Check ist die Wache über Schritt 2
 *        der Commit-Reihenfolge des Vertrags: erst data/startprojekte.js +
 *        startprojekte/** committen, DANN `node tools/seit.mjs`. Vorher ist er
 *        zu Recht rot — tools/seit.mjs leitet das Datum aus `git log -S` ab und
 *        findet zu einer nicht committeten Datei nichts.
 *
 * Die Datenprüfungen 01/05/06 laufen auch dann, wenn showroom.html die Datei
 * noch gar nicht einbindet: fehlt das Global, wird data/startprojekte.js
 * nachgeladen (Feld `datenQuelle` sagt, welcher Fall vorlag). So trennt der
 * Bericht „Daten sind unvollständig" von „Seite bindet die Daten nicht ein".
 *
 * GitHub wird geblockt (page.route → abort), wie in e8/e12. Das ist hier
 * inhaltlich wichtig: fetchBytes versucht laut Vertrag ZUERST REPO_RAW. Ohne
 * Block packte das ZIP den zuletzt GEPUSHTEN Stand statt des Arbeitsstands auf
 * der Platte — Check 11 verglühe dann an einer Differenz, die kein Fehler ist.
 *
 * Aufruf:
 *   PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright node tests/e13-startprojekte.cjs [URL]
 *   Server extern: python3 -m http.server 8412 (im Projekt-Root)
 *   Default-URL: http://localhost:8412/showroom.html
 *
 * Ausgabe: strukturiertes JSON auf stdout. Exit 0 = alle grün, 1 = ein Check rot.
 */

const { chromium } = require('/usr/lib/node_modules/playwright');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ARG = process.argv[2] || 'http://localhost:8412/showroom.html';
const TARGET = /\.html/.test(ARG) ? ARG : new URL('showroom.html', ARG).href;
const BASIS = TARGET.replace(/[^/]*$/, '');
const DATEN_URL = BASIS + 'data/startprojekte.js';
const ANWEISUNGEN_URL = BASIS + 'data/anweisungen.js';
const CASES_URL = BASIS + 'data/cases.js';

/* Der Typ heisst überall 'startprojekt' (Speicher, Suche, Favoriten), das
   Global heisst STARTPROJEKTE, der Deep-Link-Parameter g, der Anker sp-.
   Diese vier Namen stehen hier EINMAL, weil jede Prüfung unten sie braucht.
   Quelle: stufe3-domvertrag.md, Abschnitte „Karte", „Deep-Link", „Registrierung". */
const TYP = 'startprojekt';
const GLOB = 'STARTPROJEKTE';
const PARAM = 'g';
const ANKER = 'sp-';

const GRUPPEN_LABEL = 'Startprojekte';   // Gruppenüberschrift globale Suche
const DS_LABEL = 'Startprojekt';         // DS_TYPE_LABEL in „Deine Sachen"

/* Drei Gerüste, je eines pro Projekttyp aus ANWEISUNGEN (einseiter · kleines-tool
   · datenauswertung). Die Zahl steht hier als HARTE Untergrenze, nicht als
   Bequemlichkeit: mehrere Prüfungen vergleichen zwei abgeleitete Grössen
   (Zähler == Daten, Liste == Platte, Fähnchen == Ableitung). Solche Vergleiche
   sind bei zwei leeren Mengen grün und beweisen dann NICHTS. Erst diese Zahl
   macht sie zu einer Aussage. Verschiebt sie sich legitim, hier bewusst
   nachziehen — und nur hier. */
const ERWARTET_ANZAHL = 3;

/* Vertragsfelder je Eintrag (stufe3-domvertrag.md, Abschnitt „Daten"). */
const FELDER = ['id', 'name', 'kurz', 'wofuer', 'anweisung', 'ordner', 'liveUrl', 'dateien', 'tags'];
const ARRAY_FELDER = ['dateien', 'tags'];

/* Wurzel der Gerüst-Ordner, relativ zum Repo. Auf der Platte gelesen, nicht
   über HTTP: nur so fällt eine Datei auf, die im Ordner liegt und in `dateien`
   FEHLT (die Gegenrichtung, die ein reiner 200er-Test nie sieht). */
const REPO = path.resolve(__dirname, '..');
const ORDNER_WURZEL = path.join(REPO, 'startprojekte');

/* Platzhalter, die in einer ausgelieferten Beschreibung nichts zu suchen haben.
   Bewusst kurz und eindeutig — kein deutsches Wort enthält diese Folgen. */
const PLATZHALTER = /(TODO|TBD|Lorem|XXX|<hier)/i;

const MIN_TAP = 24;          // Tap-Ziel-Untergrenze aus dem Vertrag (qa responsive)
const MIN_CLAUDEMD = 200;    // Untergrenze für den CLAUDE.md-Textvergleich (Check 11)

const VIEWPORTS = [
  { name: 'desktop', viewport: { width: 1280, height: 800 } },
  { name: 'mobile', viewport: { width: 390, height: 844 } },
];

function isBlockedResourceError(text) {
  return /Failed to load resource|net::ERR_FAILED|net::ERR_BLOCKED|raw\.githubusercontent\.com|github\.com/i.test(text);
}

// Erste ganze Zahl aus einem Zählertext („3 Gerüste · …").
function ersteZahl(s) {
  const m = String(s == null ? '' : s).match(/\d+/);
  return m ? parseInt(m[0], 10) : -1;
}

// Rekursive Dateiliste eines Ordners, Pfade mit „/" und relativ zum Startordner.
function dateienAufDerPlatte(dir, praefix) {
  praefix = praefix || '';
  const out = [];
  let eintraege;
  try { eintraege = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return out; }
  for (const e of eintraege) {
    if (e.isDirectory()) out.push(...dateienAufDerPlatte(path.join(dir, e.name), praefix + e.name + '/'));
    else out.push(praefix + e.name);
  }
  return out;
}

/* ===== ZIP-Leser (nur so viel, wie der Beweis braucht) =====
   shared/base.js:408 packt mit der store-Methode (Methode 0, unkomprimiert);
   Methode 8 wird trotzdem behandelt, damit ein späterer Wechsel auf deflate
   diese Suite nicht falsch-rot färbt. Gelesen wird das Zentralverzeichnis —
   nur dort steht verbindlich, was das Archiv ZU ENTHALTEN BEHAUPTET; die
   Nutzdaten kommen anschliessend aus der lokalen Kopfzeile. */
function zipLesen(buf) {
  const ende = Math.max(0, buf.length - 22 - 65536);
  let eocd = -1;
  for (let i = buf.length - 22; i >= ende; i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) return { ok: false, grund: 'kein End-of-Central-Directory gefunden' };
  const anzahl = buf.readUInt16LE(eocd + 10);
  const cdOff = buf.readUInt32LE(eocd + 16);
  const eintraege = [];
  let p = cdOff;
  for (let i = 0; i < anzahl; i++) {
    if (p + 46 > buf.length || buf.readUInt32LE(p) !== 0x02014b50) {
      return { ok: false, grund: 'Zentralverzeichnis-Signatur fehlt bei Eintrag ' + i, eintraege };
    }
    const methode = buf.readUInt16LE(p + 10);
    const compSize = buf.readUInt32LE(p + 20);
    const rohSize = buf.readUInt32LE(p + 24);
    const nLen = buf.readUInt16LE(p + 28);
    const eLen = buf.readUInt16LE(p + 30);
    const cLen = buf.readUInt16LE(p + 32);
    const lhOff = buf.readUInt32LE(p + 42);
    const name = buf.slice(p + 46, p + 46 + nLen).toString('utf8');
    let inhalt = null;
    if (lhOff + 30 <= buf.length && buf.readUInt32LE(lhOff) === 0x04034b50) {
      const lnLen = buf.readUInt16LE(lhOff + 26);
      const leLen = buf.readUInt16LE(lhOff + 28);
      const start = lhOff + 30 + lnLen + leLen;
      const roh = buf.slice(start, start + compSize);
      try { inhalt = methode === 0 ? roh : zlib.inflateRawSync(roh); } catch (e) { inhalt = null; }
    }
    eintraege.push({ name, methode, groesse: rohSize, inhalt });
    p += 46 + nLen + eLen + cLen;
  }
  return { ok: true, anzahl, eintraege };
}

async function runViewport(browser, vp) {
  const context = await browser.newContext({
    viewport: vp.viewport, reducedMotion: 'reduce', acceptDownloads: true,
  });
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
  await page.waitForSelector('#sr-grid .sr-card', { timeout: 10000 }).catch(() => {});
  await page.waitForSelector('#sp-grid .sp-card', { timeout: 8000 }).catch(() => {});

  // ---------- Daten beschaffen (Seite bevorzugt, sonst nachladen) ----------
  const holeGlobal = async (name, url) => {
    const da = await page.evaluate(g => typeof window[g] !== 'undefined'
      || (0, eval)('typeof ' + g) !== 'undefined', name);
    if (da) return 'seite';
    return page.addScriptTag({ url }).then(() => 'nachgeladen').catch(() => 'fehlt');
  };
  const datenQuelle = await holeGlobal(GLOB, DATEN_URL);
  const anweisungQuelle = await holeGlobal('ANWEISUNGEN', ANWEISUNGEN_URL);
  const caseQuelle = await holeGlobal('CASES', CASES_URL);

  const daten = await page.evaluate(g => {
    let arr; try { arr = (0, eval)(g); } catch (e) { return null; }
    return Array.isArray(arr) ? JSON.parse(JSON.stringify(arr)) : null;
  }, GLOB);
  // Von ANWEISUNGEN nur id/name/text — der Rest ist für diese Suite Ballast.
  const anweisungen = await page.evaluate(() => {
    try {
      return ANWEISUNGEN.map(a => ({ id: a.id, name: a.name, text: String(a.text || '') }));
    } catch (e) { return null; }
  }).catch(() => null);
  const cases = await page.evaluate(() => {
    try { return CASES.map(c => ({ id: c.id, titel: c.titel, art: c.art, saeule: c.saeule })); } catch (e) { return null; }
  }).catch(() => null);

  const ALLE_CHECKS = [
    '01_daten_bestand', '02_abschnitt_platz_und_zaehler', '03_karten_anker_und_knoepfe',
    '04_getrennt_vom_case_grid', '05_dateiliste_deckt_ordner', '06_anweisung_zuordnung',
    '07_deeplink_g_hebt_hervor', '08_deeplink_case_unbeschaedigt',
    '09_merken_ohne_rate_und_richtiges_label', '10_globale_suche_eigene_gruppe',
    '11_zip_inhalt_stimmt', '11b_zip_bricht_sichtbar_ab',
    '12_kein_ueberlauf_knoepfe_erreichbar', '14_seit_kennt_geruest_und_neu_flagge',
  ];

  if (!daten || !daten.length) {
    // Ohne Daten ist jede weitere Prüfung sinnlos — alle rot, mit Grund.
    const grund = { datenQuelle, url: DATEN_URL, hinweis: GLOB + ' nicht ladbar' };
    ALLE_CHECKS.forEach(id => check(id, false, grund));
    check('13_keine_js_fehler', jsErrors.length === 0,
      { jsErrors: jsErrors.slice(0, 5), blockedResourceErrors: blockedResourceErrors.length });
    await context.close();
    const failed0 = Object.entries(checks).filter(([, c]) => !c.pass).map(([id]) => id);
    return { viewport: vp.name, size: vp.viewport, pass: false, failed: failed0, checks };
  }

  const ERSTE = daten[0];

  // ---------- (1) Bestand: 3 Einträge, Felder vollständig, Vertragsform ----------
  const maengel = [];
  const ids = daten.map(s => s.id);
  if (new Set(ids).size !== ids.length) maengel.push('IDs nicht eindeutig: ' + ids.join(', '));
  daten.forEach(s => {
    FELDER.forEach(f => {
      const v = s[f];
      if (v === undefined || v === null) { maengel.push(`${s.id || '?'}.${f}: fehlt`); return; }
      if (ARRAY_FELDER.includes(f)) {
        if (!Array.isArray(v) || v.length === 0) maengel.push(`${s.id}.${f}: kein nicht-leeres Array`);
      } else if (typeof v !== 'string' || !v.trim()) {
        maengel.push(`${s.id}.${f}: leer`);
      }
    });
    // Vertragsform der Pfade: ordner == startprojekte/<id>/ und liveUrl darin.
    if (s.ordner !== 'startprojekte/' + s.id + '/') maengel.push(`${s.id}.ordner: „${s.ordner}" statt startprojekte/${s.id}/`);
    if (typeof s.liveUrl !== 'string' || s.liveUrl.indexOf('startprojekte/' + s.id + '/') !== 0) {
      maengel.push(`${s.id}.liveUrl: „${s.liveUrl}" liegt nicht im eigenen Ordner`);
    }
    // CLAUDE.md gehört NICHT in die Liste — sie entsteht erst beim Packen.
    (Array.isArray(s.dateien) ? s.dateien : []).forEach(d => {
      if (typeof d !== 'string' || !d.trim()) maengel.push(`${s.id}.dateien: leerer Eintrag`);
      else if (/(^|\/)claude\.md$/i.test(d)) maengel.push(`${s.id}.dateien enthält CLAUDE.md — die kommt aus ANWEISUNGEN`);
      else if (/^\//.test(d) || d.indexOf('..') !== -1) maengel.push(`${s.id}.dateien: „${d}" ist kein Pfad im Ordner`);
    });
    // Keine externen URLs (qa links liest data/ und bricht sonst mit Exit 1 ab).
    const blob = JSON.stringify(FELDER.map(f => s[f]));
    if (/https?:\/\//i.test(blob)) maengel.push(`${s.id}: externe URL im Datensatz`);
    const tr = blob.match(PLATZHALTER);
    if (tr) maengel.push(`${s.id}: Platzhalter „${tr[0]}"`);
  });
  check('01_daten_bestand',
    daten.length === ERWARTET_ANZAHL && maengel.length === 0,
    { erwartet: ERWARTET_ANZAHL, gefunden: daten.length, ids, datenQuelle, maengel: maengel.slice(0, 12) });

  // ---------- (2) Abschnitt: Platz in der Dokumentreihenfolge + Zähler ----------
  const abschnitt = await page.evaluate(() => {
    const sec = document.getElementById('startprojekte');
    const grid = document.getElementById('sp-grid');
    const cnt = document.getElementById('sp-count');
    const h2 = document.getElementById('sp-h');
    const hinweis = document.getElementById('sp-hinweis');
    // Nachbarn: der Case-Bereich ist der Abschnitt um #sr-grid, „Meistgewollt"
    // der um #sr-rank (Fallback über die Überschrift, falls das Raster umzieht).
    const caseSec = document.getElementById('sr-grid') ? document.getElementById('sr-grid').closest('section') : null;
    let rankSec = document.getElementById('sr-rank') ? document.getElementById('sr-rank').closest('section') : null;
    if (!rankSec) {
      rankSec = [...document.querySelectorAll('section')].find(s => {
        const h = s.querySelector('h2');
        return h && /Meistgewollt/i.test(h.textContent || '');
      }) || null;
    }
    // Node.DOCUMENT_POSITION_FOLLOWING === 4: „other" steht NACH „node".
    const folgt = (a, b) => !!a && !!b && !!(a.compareDocumentPosition(b) & 4);
    return {
      sectionDa: !!sec,
      ariaLabelledby: sec ? sec.getAttribute('aria-labelledby') : null,
      h2Da: !!h2, h2Text: h2 ? h2.textContent.trim() : '',
      countDa: !!cnt && cnt.classList.contains('lib-sec-count'),
      countText: cnt ? cnt.textContent.trim() : '',
      gridDa: !!grid && grid.classList.contains('sp-grid'),
      gridImAbschnitt: !!sec && !!grid && sec.contains(grid),
      hinweisDa: !!hinweis, hinweisLaenge: hinweis ? hinweis.textContent.trim().length : 0,
      caseSecDa: !!caseSec, rankSecDa: !!rankSec,
      nachCases: folgt(caseSec, sec),
      vorRanking: folgt(sec, rankSec),
    };
  });
  check('02_abschnitt_platz_und_zaehler',
    abschnitt.sectionDa && abschnitt.h2Da && abschnitt.h2Text.length > 0
      && abschnitt.ariaLabelledby === 'sp-h'
      && abschnitt.countDa && abschnitt.gridDa && abschnitt.gridImAbschnitt
      && abschnitt.hinweisDa && abschnitt.hinweisLaenge > 0
      && abschnitt.caseSecDa && abschnitt.rankSecDa
      && abschnitt.nachCases && abschnitt.vorRanking
      // Zähler == Daten IST ein Vergleich zweier abgeleiteter Grössen; er trägt
      // nur zusammen mit der Untergrenze aus Check 01 (daten.length === 3).
      && daten.length === ERWARTET_ANZAHL
      && ersteZahl(abschnitt.countText) === daten.length,
    { erwartet: daten.length, ...abschnitt });

  // ---------- (3) Karten: Anker, Inhalt, die drei Knöpfe ----------
  const karten = await page.evaluate(d => {
    const grid = document.getElementById('sp-grid');
    const cards = grid ? [...grid.querySelectorAll('article.sp-card')] : [];
    return {
      anzahl: cards.length,
      reihen: cards.map(k => {
        const id = k.dataset.id || '';
        const sp = d.find(x => x.id === id) || null;
        const txt = (k.textContent || '').replace(/\s+/g, ' ').trim();
        const ansehen = k.querySelector('a[target="_blank"]');
        const zipBtn = [...k.querySelectorAll('button')].find(b => /zip/i.test(b.textContent || ''));
        const anleitung = [...k.querySelectorAll('a[href]')].find(a => /vorlagen\.html\?pa=/.test(a.getAttribute('href') || ''));
        const liste = k.querySelector('ul.sp-dateien');
        const posten = liste ? [...liste.querySelectorAll('li')].map(li => li.textContent.trim()) : [];
        return {
          id,
          bekannt: !!sp,
          ankerOk: k.id === 'sp-' + id,
          sichtbar: k.getClientRects().length > 0,
          nameDa: !!sp && txt.indexOf(sp.name) !== -1,
          kurzDa: !!sp && txt.indexOf(String(sp.kurz).slice(0, 40)) !== -1,
          wofuerDa: !!sp && txt.indexOf(String(sp.wofuer).slice(0, 40)) !== -1,
          markerDa: !!k.querySelector('.sp-marker'),
          markerText: (k.querySelector('.sp-marker') || { textContent: '' }).textContent.trim(),
          listeDa: !!liste,
          // Jede Datei aus den Daten muss in der Liste auftauchen …
          fehlendeInListe: sp ? (sp.dateien || []).filter(f => !posten.some(p => p.indexOf(f) !== -1)) : ['?'],
          // … und die Liste darf nichts Fremdes nennen (CLAUDE.md ist erlaubt:
          // sie kommt beim Packen dazu und wird auf der Karte so ausgewiesen).
          fremdeInListe: sp ? posten.filter(p => !(sp.dateien || []).some(f => p.indexOf(f) !== -1) && !/claude\.md/i.test(p)) : [],
          // Zahlen-Ehrlichkeit (CLAUDE.md, harte Regel 2): steht auf der Karte
          // eine Dateizahl, muss sie gezählt sein. Erlaubt sind beide ehrlichen
          // Lesarten — der Ordner wie er ist, oder das ZIP inklusive CLAUDE.md.
          // Tolerant formuliert: fehlt die Angabe ganz, ist nichts zu prüfen;
          // der Vertrag schreibt sie nicht vor. Steht sie da, muss sie stimmen.
          dateiZahl: (txt.match(/(\d+)\s+Dateien/) || [])[1] || null,
          dateiZahlEhrlich: (() => {
            const m = txt.match(/(\d+)\s+Dateien/);
            if (!m || !sp) return true;
            const n = parseInt(m[1], 10), soll = (sp.dateien || []).length;
            return n === soll || n === soll + 1;
          })(),
          ansehenDa: !!ansehen,
          ansehenHref: ansehen ? ansehen.getAttribute('href') : null,
          ansehenPasst: !!ansehen && !!sp && ansehen.getAttribute('href') === sp.liveUrl,
          ansehenRel: ansehen ? (ansehen.getAttribute('rel') || '') : '',
          zipDa: !!zipBtn,
          anleitungHref: anleitung ? anleitung.getAttribute('href') : null,
        };
      }),
    };
  }, daten);
  // Seiteneigene Suche darf den Abschnitt NICHT anfassen (Vertrag: #search &
  // Co. gehören den Projekten). Ein Wort, das kein Projekt trifft, würde bei
  // falscher Verdrahtung die Gerüste mit ausblenden — und der Zähler löge.
  let sucheUnberuehrt = null;
  const sucheDa = await page.$('#search');
  if (sucheDa) {
    await page.fill('#search', 'zzqxnichttrifft');
    await page.waitForTimeout(500);
    sucheUnberuehrt = await page.evaluate(() => ({
      karten: document.querySelectorAll('#sp-grid .sp-card').length,
      countText: (document.getElementById('sp-count') || { textContent: '' }).textContent.trim(),
    }));
    await page.fill('#search', '');
    await page.waitForTimeout(400);
  }
  const kartenOk = karten.reihen.length === daten.length
    && karten.reihen.every(r => r.bekannt && r.ankerOk && r.sichtbar && r.nameDa && r.kurzDa
      && r.wofuerDa && r.markerDa && r.markerText.length > 0 && r.listeDa
      && r.fehlendeInListe.length === 0 && r.fremdeInListe.length === 0
      && r.dateiZahlEhrlich
      && r.ansehenDa && r.ansehenPasst && /noopener/.test(r.ansehenRel) && r.zipDa);
  check('03_karten_anker_und_knoepfe',
    karten.anzahl === ERWARTET_ANZAHL && kartenOk
      && (!sucheDa || (sucheUnberuehrt && sucheUnberuehrt.karten === daten.length
        && ersteZahl(sucheUnberuehrt.countText) === daten.length)),
    { erwartet: ERWARTET_ANZAHL, ...karten, suchfeldDa: !!sucheDa, sucheUnberuehrt });

  // ---------- (4) Trennung vom Case-Grid (Fremdschutz für e8) ----------
  const trennung = await page.evaluate(() => ({
    spImCaseGrid: document.querySelectorAll('#sr-grid .sp-card').length,
    srBadgeInSpKarte: document.querySelectorAll('#sp-grid .sp-card .sr-badge').length,
    /* Vertrag, Abschnitt „Karte": „Kein iframe. Keine Sterne-Bewertung."
       Beides ist im Bild unauffällig und im Schaden teuer: drei weitere iframes
       sind drei real geladene Frames (die Messung im Vertrag: 10 Karten → 11
       Frames), und ein Sterne-Widget ohne expliziten Typ schreibt still nach
       rate:… — was e8:05 über den GESAMTEN localStorage rot färbt. Check 09
       fängt nur die Schreibwirkung; hier steht das Widget selbst. */
    iframeImAbschnitt: document.querySelectorAll('#startprojekte iframe').length,
    sterneWidget: document.querySelectorAll('#startprojekte .star-btn, #startprojekte [id^="star-input-"], #startprojekte .stars-input').length,
    caseKarten: document.querySelectorAll('#sr-grid .sr-card').length,
    verboteneIds: ['sr-stat-total', 'sr-stat-echt', 'sr-stat-beispiel', 'sr-stat-saeulen']
      .filter(id => !!document.getElementById(id)),
    // Der Vertrag verbietet, die Projekt-Filter um Startprojekt-Werte zu
    // erweitern (e8:03b). Geprüft wird die Werte-Liste, nicht ihr Aussehen.
    artWerte: [...document.querySelectorAll('#sr-art option')].map(o => o.value),
    sortWerte: [...document.querySelectorAll('#sr-sort option')].map(o => o.value),
    catWerte: [...document.querySelectorAll('#sr-cats [data-cat]')].map(b => b.dataset.cat),
  }));
  /* „Nicht erweitert" wird AUS DEN PROJEKTDATEN abgeleitet, nicht aus den
     Startprojekt-IDs: die erste Fassung dieses Checks verglich die Filterwerte
     mit den IDs der Gerüste und schlug am Bestand fehl — der Art-Filter kennt
     seit jeher den Wert `dashboard`, und ein Gerüst heisst zufällig genauso.
     Ein Namensgleichklang ist kein Vertragsbruch. Belastbar ist: jeder Wert im
     Art-/Säulen-Filter muss in CASES vorkommen, die Sortierung kennt ihre drei
     Bestandswerte. Ein Startprojekt-Wert wäre in keiner dieser Quellen. */
  const casesArten = new Set((cases || []).map(c => c.art).filter(Boolean));
  const casesSaeulen = new Set((cases || []).map(c => c.saeule).filter(Boolean));
  const SORT_BESTAND = ['recommended', 'meistgewollt', 'alpha'];
  const filterVerseucht = [
    ...trennung.artWerte.filter(v => v !== 'all' && !casesArten.has(v)).map(v => 'sr-art: ' + v),
    ...trennung.catWerte.filter(v => v !== 'all' && !casesSaeulen.has(v)).map(v => 'sr-cats: ' + v),
    ...trennung.sortWerte.filter(v => SORT_BESTAND.indexOf(v) === -1).map(v => 'sr-sort: ' + v),
  ];
  check('04_getrennt_vom_case_grid',
    trennung.spImCaseGrid === 0 && trennung.srBadgeInSpKarte === 0
      && trennung.iframeImAbschnitt === 0 && trennung.sterneWidget === 0
      && trennung.verboteneIds.length === 0 && filterVerseucht.length === 0
      // UNTERGRENZE: „0 Gerüste im Case-Grid" wäre auch bei einem LEEREN
      // Case-Grid wahr. Deshalb muss das Grid nachweislich die Cases tragen.
      && Array.isArray(cases) && cases.length > 0 && trennung.caseKarten === cases.length,
    { ...trennung, casesErwartet: Array.isArray(cases) ? cases.length : -1, caseQuelle, filterVerseucht });

  // ---------- (5) Dateiliste == Platte, beide Richtungen ----------
  const httpFehler = [];
  let gepruefteDateien = 0;
  for (const sp of daten) {
    for (const d of (sp.dateien || [])) {
      const url = BASIS + sp.ordner + d;
      gepruefteDateien++;
      const resp = await page.request.get(url).catch(() => null);
      if (!resp || !resp.ok()) httpFehler.push(`${resp ? resp.status() : 'kein Zugriff'} · ${sp.ordner}${d}`);
    }
  }
  const wurzelDa = fs.existsSync(ORDNER_WURZEL);
  const aufPlatte = wurzelDa ? dateienAufDerPlatte(ORDNER_WURZEL) : [];
  const erwarteteAufPlatte = new Set();
  daten.forEach(sp => (sp.dateien || []).forEach(d => erwarteteAufPlatte.add(sp.id + '/' + d)));
  const nichtGelistet = aufPlatte.filter(f => !erwarteteAufPlatte.has(f));
  const nichtAufPlatte = [...erwarteteAufPlatte].filter(f => aufPlatte.indexOf(f) === -1);
  const claudeAufPlatte = aufPlatte.filter(f => /(^|\/)claude\.md$/i.test(f));
  const ordnerLeer = daten.filter(sp => aufPlatte.filter(f => f.indexOf(sp.id + '/') === 0).length === 0).map(sp => sp.id);
  check('05_dateiliste_deckt_ordner',
    httpFehler.length === 0 && wurzelDa
      && nichtGelistet.length === 0 && nichtAufPlatte.length === 0
      && claudeAufPlatte.length === 0
      // UNTERGRENZEN: ohne sie wäre „leere Liste == leerer Ordner" grün.
      && gepruefteDateien > 0 && aufPlatte.length > 0 && ordnerLeer.length === 0,
    { ordnerWurzel: ORDNER_WURZEL, wurzelDa, gepruefteDateien, dateienAufPlatte: aufPlatte.length,
      httpFehler: httpFehler.slice(0, 8), nichtGelistet, nichtAufPlatte, claudeAufPlatte, ordnerLeer });

  // ---------- (6) Zuordnung zur Bauvorschrift (ANWEISUNGEN) ----------
  const anwIds = Array.isArray(anweisungen) ? anweisungen.map(a => a.id) : [];
  const zuordnung = daten.map(s => s.anweisung);
  const unbekannteAnweisung = zuordnung.filter(a => anwIds.indexOf(a) === -1);
  const mehrfach = zuordnung.filter((a, i) => zuordnung.indexOf(a) !== i);
  const anleitungFalsch = karten.reihen.filter(r => {
    const sp = daten.find(x => x.id === r.id);
    return !sp || r.anleitungHref !== 'vorlagen.html?pa=' + encodeURIComponent(sp.anweisung);
  }).map(r => `${r.id}: ${r.anleitungHref}`);
  check('06_anweisung_zuordnung',
    unbekannteAnweisung.length === 0 && mehrfach.length === 0
      && new Set(zuordnung).size === zuordnung.length
      && anleitungFalsch.length === 0
      // UNTERGRENZEN: „jede id ist bekannt" ist bei leerer ANWEISUNGEN-Liste
      // nur wahr, wenn auch die Zuordnungen leer sind — beides ausschliessen.
      && anwIds.length > 0 && zuordnung.length === ERWARTET_ANZAHL,
    { zuordnung, anweisungenBekannt: anwIds.length, anweisungQuelle,
      unbekannteAnweisung, mehrfach, anleitungFalsch });

  // ---------- (14) data/seit.js kennt die Gerüste + „Neu"-Fähnchen ----------
  const seit = await page.evaluate(o => {
    const da = (typeof SEIT !== 'undefined') && !!SEIT;
    const proId = {};
    o.ids.forEach(id => { proId[id] = da ? (SEIT[o.glob + ':' + id] || null) : null; });
    const erwartet = (typeof istNeu === 'function') ? o.ids.filter(id => istNeu(o.glob, id)) : null;
    const grid = document.getElementById('sp-grid');
    const flaggen = grid ? [...grid.querySelectorAll('.card-neu-flag')] : [];
    return {
      seitDa: da,
      schluesselGesamt: da ? Object.keys(SEIT).length : -1,
      proId,
      neueTage: (typeof neueTage === 'function') ? neueTage() : null,
      erwarteteIds: erwartet,
      gerenderteIds: flaggen.map(f => {
        const k = f.closest('article.sp-card');
        return k ? (k.dataset.id || '') : '';
      }),
      texteOk: flaggen.every(f => f.textContent.trim() === 'Neu'),
    };
  }, { glob: GLOB, ids: daten.map(s => s.id) });
  const ohneDatum = Object.entries(seit.proId)
    .filter(([, v]) => !v || !/^\d{4}-\d{2}-\d{2}$/.test(String(v))).map(([k]) => k);
  const neuGleich = Array.isArray(seit.erwarteteIds)
    && seit.erwarteteIds.slice().sort().join('|') === seit.gerenderteIds.slice().sort().join('|');
  check('14_seit_kennt_geruest_und_neu_flagge',
    // ZUERST die Abdeckung — sie ist die Untergrenze, ohne die der Vergleich
    // darunter bei „0 == 0" grün wäre, obwohl SEIT die Sammlung gar nicht kennt.
    seit.seitDa && ohneDatum.length === 0
      && Object.keys(seit.proId).length === ERWARTET_ANZAHL
      && Array.isArray(seit.erwarteteIds) && neuGleich && seit.texteOk,
    { ohneDatum, neuGleich, ...seit });

  // ---------- (12) Kein Überlauf, Knöpfe erreichbar (je Viewport) ----------
  // Einblend-Animationen vorher erzwingen — sonst misst man opacity:0-Elemente
  // (CLAUDE.md, „Fallen"). Der Abschnitt selbst rendert beim Init.
  await page.evaluate(() => {
    document.querySelectorAll('.anim-reveal').forEach(e => e.classList.add('in-view'));
    document.querySelectorAll('.cat-reveal').forEach(e => e.classList.add('in'));
  });
  await page.waitForTimeout(200);
  const layout = await page.evaluate(o => {
    const doc = document.documentElement;
    const sec = document.getElementById('startprojekte');
    const els = sec ? [...sec.querySelectorAll('a, button')] : [];
    const probleme = [];
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      const txt = (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 28);
      if (r.width < 1 || r.height < 1) { probleme.push(`unsichtbar: ${txt}`); return; }
      if (r.height < o.min || r.width < o.min) probleme.push(`zu klein (${Math.round(r.width)}×${Math.round(r.height)}): ${txt}`);
      if (r.left < -1 || r.right > window.innerWidth + 1) probleme.push(`ausserhalb: ${txt}`);
    });
    return {
      scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth,
      ueberlauf: doc.scrollWidth > doc.clientWidth + 1,
      knoepfe: els.length, probleme: probleme.slice(0, 10),
    };
  }, { min: MIN_TAP });
  check('12_kein_ueberlauf_knoepfe_erreichbar',
    !layout.ueberlauf && layout.probleme.length === 0
      // UNTERGRENZE: „keine Probleme" ist bei 0 gemessenen Knöpfen wertlos.
      // Drei Karten × (Ansehen · ZIP · Anleitung · Stern) = 12.
      && layout.knoepfe >= ERWARTET_ANZAHL * 3,
    layout);

  // ---------- (9a) Merken: Stern setzen ----------
  const merkId = ERSTE.id;
  const geklickt = await page.evaluate(o => {
    const karte = document.getElementById('sp-' + o.id);
    if (!karte) return { karteDa: false, sternDa: false };
    const stern = karte.querySelector(`.fav-btn[data-fav-id="${CSS.escape(o.id)}"]`)
      || karte.querySelector('.fav-btn')
      || [...karte.querySelectorAll('button')].find(b => /[★☆]/.test(b.textContent || ''));
    if (stern) stern.click();
    return { karteDa: true, sternDa: !!stern };
  }, { id: merkId });
  await page.waitForTimeout(350);
  const nachKlick = await page.evaluate(o => {
    const karte = document.getElementById('sp-' + o.id);
    const stern = karte ? (karte.querySelector(`.fav-btn[data-fav-id="${CSS.escape(o.id)}"]`) || karte.querySelector('.fav-btn')) : null;
    return {
      favWert: localStorage.getItem('fav:' + o.typ + ':' + o.id),
      fremdeFav: ['case', 'skill', 'baustein', 'anweisung']
        .filter(t => localStorage.getItem('fav:' + t + ':' + o.id) !== null),
      ariaLabel: stern ? (stern.getAttribute('aria-label') || '') : '',
      ariaPressed: stern ? stern.getAttribute('aria-pressed') : '',
    };
  }, { id: merkId, typ: TYP });

  // ---------- (10) Globale Suche: eigene Gruppe + Deep-Link-Form ----------
  await page.keyboard.press('Control+k');
  let gsOffen = await page.waitForSelector('#gsearch-overlay.open', { timeout: 5000 }).then(() => true).catch(() => false);
  if (!gsOffen) {
    await page.keyboard.press('Meta+k');
    gsOffen = await page.waitForSelector('#gsearch-overlay.open', { timeout: 3000 }).then(() => true).catch(() => false);
  }
  const suchTags = (ERSTE.tags || []).slice(0, 4);
  const suchErgebnis = [];
  for (const tag of suchTags) {
    await page.fill('#gsearch-input', tag);
    await page.waitForFunction(
      pre => [...document.querySelectorAll('#gsearch-results .gs-opt[role="option"]')]
        .some(a => (a.getAttribute('href') || '').indexOf(pre) === 0),
      'showroom.html?' + PARAM + '=', { timeout: 4000 }
    ).catch(() => {});
    await page.waitForTimeout(150);
    suchErgebnis.push(await page.evaluate(o => {
      const wurzel = document.getElementById('gsearch-results');
      const alle = wurzel ? [...wurzel.querySelectorAll('.gs-opt[role="option"]')] : [];
      const treffer = alle.filter(a => (a.getAttribute('href') || '').indexOf(o.pre) === 0);
      // Die Trefferliste ist EINE flache <ul>: die Gruppe eines Treffers ist die
      // zuletzt davor stehende .gs-group-label. Genau so wird „eigene Gruppe"
      // überhaupt beweisbar — die blosse Existenz der Überschrift wäre es nicht.
      const gruppeVon = el => {
        const knoten = wurzel ? [...wurzel.querySelectorAll('.gs-group-label, .gs-opt[role="option"]')] : [];
        let label = '';
        for (const k of knoten) {
          if (k.classList.contains('gs-group-label')) label = k.textContent.trim();
          if (k === el) return label;
        }
        return '';
      };
      return {
        tag: o.tag,
        treffer: treffer.length,
        hrefs: treffer.slice(0, 3).map(a => a.getAttribute('href')),
        gruppen: treffer.map(gruppeVon),
        alleGruppen: wurzel ? [...wurzel.querySelectorAll('.gs-group-label')].map(g => g.textContent.trim()) : [],
      };
    }, { tag, pre: 'showroom.html?' + PARAM + '=' }));
  }
  check('10_globale_suche_eigene_gruppe',
    gsOffen && suchTags.length > 0
      && suchErgebnis.every(r => r.treffer >= 1
        && r.gruppen.every(g => g === GRUPPEN_LABEL)
        && r.alleGruppen.indexOf(GRUPPEN_LABEL) !== -1),
    { overlayOffen: gsOffen, gruppenLabel: GRUPPEN_LABEL, ergebnisse: suchErgebnis });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);

  // ---------- (9b) „Deine Sachen": Typ-Label ----------
  await page.evaluate(() => { if (typeof openDeineSachen === 'function') openDeineSachen(); });
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
      titel: meins.map(a => (a.querySelector('.ds-item-title') || { textContent: '' }).textContent.trim()),
    };
  }, { typ: TYP, param: PARAM, id: merkId });
  await page.evaluate(() => { if (typeof closeDeineSachen === 'function') closeDeineSachen(); });
  await page.waitForTimeout(200);

  // ---------- (11) ZIP: packen, entgegennehmen, ENTPACKEN, Inhalt vergleichen ----------
  const zips = [];
  for (const sp of daten) {
    const a = (anweisungen || []).find(x => x.id === sp.anweisung) || null;
    let ergebnis = { id: sp.id, ok: false };
    try {
      const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 25000 }),
        page.evaluate(id => {
          const karte = document.getElementById('sp-' + id);
          const btn = karte ? [...karte.querySelectorAll('button')].find(b => /zip/i.test(b.textContent || '')) : null;
          if (btn) btn.click();
        }, sp.id),
      ]);
      const datei = await download.path();
      const buf = fs.readFileSync(datei);
      const gelesen = zipLesen(buf);
      const namen = gelesen.ok ? gelesen.eintraege.map(e => e.name) : [];
      const soll = (sp.dateien || []).map(d => sp.id + '/' + d).concat([sp.id + '/CLAUDE.md']);
      const claude = gelesen.ok ? gelesen.eintraege.find(e => /\/claude\.md$/i.test(e.name)) : null;
      const claudeText = claude && claude.inhalt ? claude.inhalt.toString('utf8') : null;
      /* Nicht nur die NAMEN im Zentralverzeichnis: der Inhalt jeder gepackten
         Datei wird Byte für Byte gegen die Platte gehalten. Ein ZIP mit den
         richtigen Namen und falschem Inhalt sieht in jeder Dateiliste heil aus
         und fällt erst auf, wenn jemand das Gerüst öffnet. */
      const inhaltAbweichung = [];
      let inhaltVerglichen = 0;
      for (const e of (gelesen.ok ? gelesen.eintraege : [])) {
        if (/\/claude\.md$/i.test(e.name)) continue;
        const rel = e.name.replace(sp.id + '/', '');
        const platte = path.join(ORDNER_WURZEL, sp.id, rel);
        if (!fs.existsSync(platte)) { inhaltAbweichung.push(rel + ': nicht auf der Platte'); continue; }
        const soll = fs.readFileSync(platte);
        inhaltVerglichen++;
        if (!e.inhalt || !Buffer.from(e.inhalt).equals(soll)) {
          inhaltAbweichung.push(`${rel}: ${e.inhalt ? e.inhalt.length : -1} statt ${soll.length} Byte`);
        }
      }
      ergebnis = {
        id: sp.id,
        dateiname: download.suggestedFilename(),
        groesse: buf.length,
        signatur: buf.slice(0, 4).toString('latin1') === 'PK',
        gelesen: gelesen.ok, grund: gelesen.grund || null,
        namen,
        fehlend: soll.filter(n => namen.indexOf(n) === -1),
        zusaetzlich: namen.filter(n => soll.indexOf(n) === -1),
        claudeDa: !!claude,
        claudeLaenge: claudeText === null ? -1 : claudeText.length,
        anweisungDa: !!a,
        claudeGleich: !!a && claudeText !== null && claudeText === a.text,
        anweisungLaenge: a ? a.text.length : -1,
        inhaltVerglichen, inhaltAbweichung,
      };
      ergebnis.ok = ergebnis.dateiname === sp.id + '.zip' && ergebnis.signatur && ergebnis.gelesen
        && ergebnis.fehlend.length === 0 && ergebnis.zusaetzlich.length === 0
        && ergebnis.claudeDa && ergebnis.claudeGleich
        && inhaltAbweichung.length === 0
        // UNTERGRENZE: „keine Abweichung" ist bei 0 Vergleichen keine Aussage.
        && inhaltVerglichen === (sp.dateien || []).length && inhaltVerglichen > 0
        // UNTERGRENZE: ein leerer `text` wäre mit einer leeren Datei „gleich".
        && ergebnis.anweisungLaenge > MIN_CLAUDEMD;
    } catch (e) {
      ergebnis.fehler = String(e && e.message || e);
      // Sichtbare Meldung statt stiller Download? Der Vertrag verlangt genau das.
      ergebnis.statusText = await page.evaluate(id => {
        const el = document.getElementById('sp-status-' + id);
        const karte = document.getElementById('sp-' + id);
        if (el && !el.hidden) return el.textContent.trim();
        return karte ? (karte.querySelector('[role="status"]') || { textContent: '' }).textContent.trim() : '';
      }, sp.id).catch(() => '');
    }
    zips.push(ergebnis);
  }
  check('11_zip_inhalt_stimmt',
    zips.length === ERWARTET_ANZAHL && zips.every(z => z.ok),
    { zips });

  // ---------- (11b) Fehlt eine Datei: sichtbare Meldung, KEIN Download ----------
  /* Der Vertrag ist an dieser Stelle unbedingt formuliert („Scheitert auch nur
     eine Datei: sichtbare Meldung, KEIN Download"). Geprüft wird er, indem
     genau eine Datei des Gerüsts auf Netzebene abgewürgt wird — die GitHub-Route
     ist ohnehin schon blockiert, damit bleibt keine Quelle übrig. Erwartet:
     kein Download-Ereignis und eine sichtbare Änderung an der Karte oder ein
     Toast. WELCHES Element die Meldung trägt, schreibt der Vertrag nicht vor —
     deshalb wird der Kartentext vorher/nachher verglichen statt eine ID
     festgeschrieben, die es so vielleicht gar nicht geben soll. */
  const bruchSp = daten.find(s => (s.dateien || []).length > 0) || ERSTE;
  const bruchDatei = bruchSp.dateien[0];
  const bruchMuster = '**/' + bruchSp.ordner + bruchDatei;
  await page.unroute(bruchMuster).catch(() => {});
  await page.route(bruchMuster, r => r.abort());
  const kartentextVorher = await page.evaluate(id => {
    const k = document.getElementById('sp-' + id);
    return k ? (k.textContent || '').replace(/\s+/g, ' ').trim() : '';
  }, bruchSp.id);
  let downloadTrotzdem = false;
  const lauscher = page.waitForEvent('download', { timeout: 12000 })
    .then(d => { downloadTrotzdem = true; return d; }).catch(() => null);
  await page.evaluate(id => {
    const karte = document.getElementById('sp-' + id);
    const btn = karte ? [...karte.querySelectorAll('button')].find(b => /zip/i.test(b.textContent || '')) : null;
    if (btn) btn.click();
  }, bruchSp.id);
  await page.waitForTimeout(6000);   // 2 Versuche × 2 Adressen + 300 ms Pause
  const bruch = await page.evaluate(o => {
    const k = document.getElementById('sp-' + o.id);
    const toast = document.getElementById('toast');
    return {
      kartentext: k ? (k.textContent || '').replace(/\s+/g, ' ').trim() : '',
      toastSichtbar: !!toast && toast.classList.contains('show'),
      toastText: toast ? toast.textContent.trim() : '',
      nenntDatei: k ? (k.textContent || '').indexOf(o.datei) !== -1 : false,
    };
  }, { id: bruchSp.id, datei: bruchDatei });
  await lauscher;
  await page.unroute(bruchMuster).catch(() => {});
  const meldungSichtbar = (bruch.kartentext !== kartentextVorher && bruch.kartentext.length > kartentextVorher.length)
    || (bruch.toastSichtbar && bruch.toastText.length > 0);
  check('11b_zip_bricht_sichtbar_ab',
    !downloadTrotzdem && meldungSichtbar
      // UNTERGRENZE: die Karte muss vorher überhaupt Text gehabt haben, sonst
      // wäre „Text hat sich geändert" eine Aussage über nichts.
      && kartentextVorher.length > 40,
    { id: bruchSp.id, datei: bruchDatei, downloadTrotzdem, meldungSichtbar,
      textVorherLaenge: kartentextVorher.length, ...bruch });

  // ---------- (7) Deep-Link ?g=<id> ----------
  /* Die Hervorhebung liegt nur ~2400 ms an, und auf dieser Seite liegen zwischen
     DOMContentLoaded (da läuft applyDeepLink) und 'load' (10 lazy iframes) oft
     mehr als 2400 ms. Deshalb wie e8:08: nur bis 'domcontentloaded' warten und
     das Highlight zeitnah pollen. */
  const deepId = ERSTE.id;
  await page.goto('about:blank');
  await page.goto(TARGET + '?' + PARAM + '=' + encodeURIComponent(deepId) + '&utm_source=e13',
    { waitUntil: 'domcontentloaded' });
  let jeHervorgehoben = false;
  const t0 = Date.now();
  while (Date.now() - t0 < 2800) {
    const hi = await page.evaluate(id => {
      const el = document.getElementById('sp-' + id);
      return !!el && el.classList.contains('-highlight');
    }, deepId).catch(() => false);
    if (hi) { jeHervorgehoben = true; break; }
    await page.waitForTimeout(30);
  }
  await page.waitForTimeout(600);   // Scroll + fonts.ready-Reanchor ausrollen lassen
  const deep = await page.evaluate(id => {
    const el = document.getElementById('sp-' + id);
    const r = el ? el.getBoundingClientRect() : null;
    const ov = document.getElementById('modal-overlay');
    return {
      zielDa: !!el,
      hash: location.hash,
      search: location.search,
      // „im Viewport" = das Ziel schneidet den sichtbaren Bereich. Bewusst nicht
      // „vollständig sichtbar": eine Karte mit Dateiliste ist auf 390×844 höher
      // als das Fenster und könnte das nie erfüllen.
      imViewport: !!r && r.bottom > 0 && r.top < window.innerHeight,
      rect: r ? { top: Math.round(r.top), bottom: Math.round(r.bottom) } : null,
      modalOffen: !!ov && ov.classList.contains('open'),
    };
  }, deepId);
  const fehlerVorUnbekannt = jsErrors.length;
  // Unbekannte id: still zurückkehren — kein Modal, keine Hervorhebung, kein Fehler.
  await page.goto(TARGET + '?' + PARAM + '=gibtesnicht-e13', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(900);
  const unbekannt = await page.evaluate(() => {
    const ov = document.getElementById('modal-overlay');
    return {
      hash: location.hash,
      modalOffen: !!ov && ov.classList.contains('open'),
      hervorgehoben: document.querySelectorAll('.sp-card.-highlight').length,
      karten: document.querySelectorAll('#sp-grid .sp-card').length,
    };
  });
  check('07_deeplink_g_hebt_hervor',
    deep.zielDa && deep.hash === '#' + ANKER + deepId && deep.imViewport
      && jeHervorgehoben && !deep.modalOffen
      && /utm_source=e13/.test(deep.search)
      && !unbekannt.modalOffen && unbekannt.hervorgehoben === 0
      && unbekannt.karten === ERWARTET_ANZAHL   // Untergrenze: Seite hat wirklich gerendert
      && jsErrors.length === fehlerVorUnbekannt,
    { id: deepId, jeHervorgehoben, ...deep, unbekannt,
      neueJsFehler: jsErrors.slice(fehlerVorUnbekannt, fehlerVorUnbekannt + 3) });

  // ---------- (8) GEGENPROBE: ?case= bleibt unbeschädigt ----------
  const caseId = Array.isArray(cases) && cases.length ? cases[0].id : null;
  const caseTitel = Array.isArray(cases) && cases.length ? cases[0].titel : null;
  let caseDeep = { hinweis: 'CASES nicht ladbar' };
  let caseUndG = { hinweis: 'CASES nicht ladbar' };
  if (caseId) {
    await page.goto(TARGET + '?case=' + encodeURIComponent(caseId), { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#modal-overlay.open', { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(300);
    caseDeep = await page.evaluate(() => {
      const ov = document.getElementById('modal-overlay');
      return {
        hash: location.hash,
        modalOffen: !!ov && ov.classList.contains('open'),
        modalName: (document.getElementById('modal-name') || { textContent: '' }).textContent.trim(),
      };
    });
    // Beide Parameter: der Case-Zweig muss die Oberhand behalten (Vertrag).
    await page.goto(TARGET + '?case=' + encodeURIComponent(caseId) + '&' + PARAM + '=' + encodeURIComponent(deepId),
      { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#modal-overlay.open', { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(300);
    caseUndG = await page.evaluate(() => {
      const ov = document.getElementById('modal-overlay');
      return {
        hash: location.hash,
        modalOffen: !!ov && ov.classList.contains('open'),
        modalName: (document.getElementById('modal-name') || { textContent: '' }).textContent.trim(),
      };
    });
  }
  check('08_deeplink_case_unbeschaedigt',
    !!caseId && caseDeep.hash === '#case/' + caseId && caseDeep.modalOffen
      && caseDeep.modalName === caseTitel && caseTitel && caseTitel.length > 0
      && caseUndG.hash === '#case/' + caseId && caseUndG.modalOffen,
    { caseId, caseTitel, caseDeep, caseUndG });

  // ---------- (9c) Abschluss Merken: rate:-Freiheit am ENDE des Laufs ----------
  /* Bewusst hier und nicht direkt nach dem Klick: zwischen Klick und dieser
     Messung liegen ZIP-Download, globale Suche, „Deine Sachen" und drei
     Navigationen. e8:05 liest den localStorage der Seite als Ganzes — eine
     Sterne-Bewertung, die IRGENDWO auf diesem Weg entsteht, färbt dort eine
     fremde Suite rot. localStorage überlebt die Navigationen im selben Context. */
  const speicherEnde = await page.evaluate(o => ({
    alleSchluessel: Object.keys(localStorage).slice(0, 40),
    rateSchluessel: Object.keys(localStorage).filter(k => k.indexOf('rate:') === 0),
    favWert: localStorage.getItem('fav:' + o.typ + ':' + o.id),
  }), { typ: TYP, id: merkId });
  const spName = ERSTE.name || '';
  check('09_merken_ohne_rate_und_richtiges_label',
    geklickt.karteDa && geklickt.sternDa
      && nachKlick.favWert === '1' && nachKlick.fremdeFav.length === 0
      && nachKlick.ariaPressed === 'true'
      // aria-label muss den Projektnamen tragen: der typlose Rückfall in
      // onFavoritesChanged setzte hier „Projekt" (Vertrag, letzter Abschnitt).
      && !!spName && nachKlick.ariaLabel.indexOf(spName) !== -1
      && speicherEnde.favWert === '1'
      && speicherEnde.rateSchluessel.length === 0
      && ds.labelKonstante === DS_LABEL
      && ds.treffer >= 1 && ds.metas.length > 0 && ds.metas.every(m => m === DS_LABEL),
    { id: merkId, name: spName, geklickt, nachKlick, deineSachen: ds, speicherEnde });

  // ---------- (13) keine JS-Fehler ----------
  check('13_keine_js_fehler', jsErrors.length === 0,
    { jsErrors: jsErrors.slice(0, 6), blockedResourceErrors: blockedResourceErrors.length });

  await context.close();
  const failed = Object.entries(checks).filter(([, c]) => !c.pass).map(([id]) => id);
  return { viewport: vp.name, size: vp.viewport, pass: failed.length === 0, failed, checks };
}

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const results = { target: TARGET, repo: REPO, timestamp: new Date().toISOString(), runs: [] };
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
