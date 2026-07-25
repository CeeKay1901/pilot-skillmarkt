#!/usr/bin/env node
/**
 * E14-Messlatte — die zwei NEUEN Reiter von vorlagen.html: „Daten" (BILDER,
 * data/bilder.js) und „Pakete" (PAKETE, data/pakete.js), dazu die Vier-Reiter-
 * Schaltung, die beide erst erreichbar macht.
 *
 * WARUM EINE EIGENE SUITE UND KEINE ERWEITERUNG VON e6/e7
 * ------------------------------------------------------
 * e6 misst die Design-Assets, e7 die Code-Bausteine — beide sind Suiten ÜBER
 * EINE SAMMLUNG, und beide sind mit 17 bzw. 15 Checks schon voll. Bilder und
 * Pakete sind zwei weitere Sammlungen mit eigenen Datendateien, eigenen Typen
 * (`bild`, `paket`), eigenen Deep-Links und einem eigenen Download-Weg. Sie in
 * e6 zu hängen hiesse, eine Suite mit „Assets" im Namen über vier Sammlungen
 * laufen zu lassen; ein späterer Rotbefund zeigte dann auf die falsche Datei.
 * Dieselbe Begründung, die e12 (Projektanweisungen) und e13 (Startprojekte)
 * ihre eigenen Slots gegeben hat.
 *
 * EINE AUSNAHME, BEWUSST: die Lücke in `tests/e9-suche.cjs` wird DORT
 * geschlossen, nicht hier. Der Vertrag ist die Positivliste DEEPLINK_RE, und
 * die steht in e9. Eine zweite Kopie hier wäre ein zweiter Bestand — genau
 * das, was das Repo überall vermeidet. Siehe e9 Check 09.
 *
 * Prüft:
 *   01 · BILDER-Raster (#bild-grid): genau BILDER.length Karten, jede mit
 *        id="bild-<id>" und data-id, IDs eindeutig, keine ID fehlt, keine
 *        zusätzliche. Sollwert kommt aus dem Array, nicht aus dieser Datei.
 *   02 · Jede Bildkarte trägt ein nicht-leeres alt UND eine SICHTBARE Lizenz
 *        UND einen SICHTBAREN Urheber. Abnahmebedingung des Bilder-Plans; im
 *        Altbestand war genau das schon einmal rot.
 *   03 · width/height der Vorschaubilder gegen naturalWidth/naturalHeight.
 *        Rasterbilder exakt (sonst springt das Layout beim Laden), SVG nur im
 *        Seitenverhältnis — Begründung an Ort und Stelle unten.
 *   04 · PAKETE-Raster (#pk-grid): genau PAKETE.length Karten, id="paket-<id>".
 *   05 · Jeder `verweise`-Eintrag wird mit SEINEM EIGENEN `name` angezeigt, und
 *        derselbe Name steht auch in der Zielsammlung (typ+id existieren dort).
 *        Der Anzeigename ist eine zweite Kopie; ohne diese Prüfung driftet er —
 *        so steht es im Kopf von data/pakete.js.
 *   06 · VERTRAG AUS e9:04, hier von der anderen Seite gehalten: vorlagen.html
 *        lädt SKILLS und PROMPTS NICHT. Die Paketkarte zeigt trotzdem alle
 *        Verweisnamen — Beleg, dass die Paketdaten ihre Anzeigenamen selbst
 *        tragen und die Seite keine fremde Sammlung braucht.
 *   07 · Vier Reiter: jeder lässt sich öffnen, genau ein Panel sichtbar,
 *        aria-selected folgt, und window.RatingConfig.type ist asset · baustein
 *        · daten · paket.
 *   08 · ?tab= inklusive Aliasse (assets/design, code/bausteine, daten, pakete)
 *        landet im richtigen Panel; ohne Parameter ist Code der Standard.
 *   09 · Reiterwechsel leert #search UND stellt ALLE Abschnittszähler auf die
 *        volle Zahl zurück. Die „volle Zahl" wird vorher am ungefilterten Stand
 *        abgelesen, nicht getippt.
 *   10 · TYP-TRENNUNG IM localStorage. CLAUDE.md: ein Sterne-Widget ohne
 *        expliziten Typ schreibt STILL nach rate:baustein: bzw. in den Typ des
 *        gerade aktiven Reiters. Nach Merken auf einer Bild- und einer
 *        Paketkarte muss fav:bild:<id> bzw. fav:paket:<id> stehen — und KEIN
 *        einziger Schlüssel, der eine BILDER-/PAKETE-ID unter einem fremden Typ
 *        führt. Gleiche Machart wie e6:11 und e7:09 („0 Fremdschlüssel").
 *   11 · Deep-Link ?bild=<id>: öffnet den Daten-Reiter, die Karte trägt
 *        kurzzeitig .-highlight, kein #modal-overlay.open.
 *   12 · Deep-Link ?paket=<id>: dasselbe im Paket-Reiter.
 *   13 · Totes Ziel (?bild=/?paket= mit unbekannter ID): #toast.show erscheint,
 *        und der auslösende Parameter UND der Hash sind danach aus der URL raus.
 *        Übrige Parameter (utm) überleben — Hausmuster aus lernen-hilfe.html.
 *   14 · ZIP des Pakets: Download entgegennehmen, ENTPACKEN, Inhalt Byte für
 *        Byte gegen die Platte halten. Die Soll-Liste wird zur Laufzeit
 *        gebildet: `dateien` aus PAKETE plus die url(...)-Angaben der GEHOLTEN
 *        schriften.css. Nicht aus data/assets.js — ASSETS kennt den
 *        Kursiv-Schnitt nicht als eigenen Eintrag.
 *   15 · Fehlt auch nur eine Datei, gibt es KEIN ZIP, sondern eine sichtbare
 *        Meldung. Abgewürgt wird die Kursiv-Schriftdatei: genau die, die NUR
 *        über die url(...)-Liste ins Paket kommt.
 *   16 · 0 JS-Fehler über den ganzen Lauf (blocked-resource-Meldungen gefiltert
 *        wie in e8/e13 — raw.githubusercontent.com ist absichtlich geblockt).
 *
 * ARBEITSSTAND STATT GEPUSHTEM STAND: downloadPaket holt wie
 * `downloadStartprojekt` ZUERST von REPO_RAW, dann repo-relativ (CLAUDE.md,
 * „Fallen"). Ohne Blockade packte diese Suite den zuletzt gepushten Stand und
 * behauptete, sie habe den Arbeitsstand geprüft. Deshalb sind
 * raw.githubusercontent.com und github.com per page.route(...abort()) dicht.
 *
 * Aufruf:
 *   PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright node tests/e14-bilder-pakete.cjs [URL]
 *   Server extern: python3 -m http.server 8412 (im Projekt-Root)
 *   Default-URL: http://localhost:8412/vorlagen.html
 *
 * Ausgabe: strukturiertes JSON auf stdout. Exit 0 = alle grün, 1 = ein Check rot.
 */

const { chromium } = require('/usr/lib/node_modules/playwright');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ARG = process.argv[2] || 'http://localhost:8412/vorlagen.html';
const TARGET = /\.html/.test(ARG) ? ARG : new URL('vorlagen.html', ARG).href;

const REPO_WURZEL = path.resolve(__dirname, '..');

/* Die vier Reiter EINMAL: interner Schlüssel, Tab-Button, Panel und der Typ,
   den window.RatingConfig währenddessen tragen muss. Alle vier Angaben stehen
   so in vorlagen.html (VL_TABS) — hier stehen sie als Zusicherung, nicht als
   Kopie zum Nachschlagen: wer dort einen Wert ändert, muss hier begründen. */
const REITER = [
  { key: 'assets',    panel: 'panel-assets',    tab: 'vltab-assets',    rating: 'asset' },
  { key: 'bausteine', panel: 'panel-bausteine', tab: 'vltab-bausteine', rating: 'baustein' },
  { key: 'daten',     panel: 'panel-daten',     tab: 'vltab-daten',     rating: 'daten' },
  { key: 'pakete',    panel: 'panel-pakete',    tab: 'vltab-pakete',    rating: 'paket' },
];
/* ?tab=<wert> → erwarteter Reiter. `design` und `code` sind die sichtbaren
   Namen, `assets` und `bausteine` die Vertragswerte aus e6/e7/e8/e11.
   null = kein Parameter, also der Standard-Reiter. */
const TAB_PARAM = [
  { param: 'assets', soll: 'assets' },
  { param: 'design', soll: 'assets' },
  { param: 'bausteine', soll: 'bausteine' },
  { param: 'code', soll: 'bausteine' },
  { param: 'daten', soll: 'daten' },
  { param: 'pakete', soll: 'pakete' },
  { param: null, soll: 'bausteine' },   // Standard ohne Parameter
];

/* Speicher-Präfixe, die typ-genamespaced sind (CLAUDE.md: rate:/fav:/tried:/
   vote:/copies: jeweils <praefix>:<typ>:<id>). Check 10 durchsucht sie alle. */
const LS_PRAEFIXE = ['rate', 'fav', 'tried', 'vote', 'copies'];

const VIEWPORTS = [
  { name: 'desktop', viewport: { width: 1280, height: 800 } },
  { name: 'mobile', viewport: { width: 390, height: 844 } },
];

function isBlockedResourceError(text) {
  return /Failed to load resource|net::ERR_FAILED|net::ERR_BLOCKED|raw\.githubusercontent\.com|github\.com/i.test(text);
}

/* ===== ZIP-Leser — übernommen aus tests/e13-startprojekte.cjs =====
   shared/base.js:414 packt mit der store-Methode (Methode 0, unkomprimiert);
   Methode 8 wird trotzdem behandelt, damit ein späterer Wechsel auf deflate
   diese Suite nicht falsch-rot färbt. Gelesen wird das Zentralverzeichnis —
   nur dort steht verbindlich, was das Archiv zu enthalten BEHAUPTET. */
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

/* url(...)-Pfade aus einer CSS-Datei — dieselbe Regel wie schriftPfadeAus in
   vorlagen.html: nur repo-relative Angaben, http(s)/data/protokollrelativ raus.
   Hier steht sie ein zweites Mal, WEIL sie hier den Sollwert bildet: die Suite
   soll nicht dieselbe Funktion gegen sich selbst prüfen. Sie liest die Datei
   von der PLATTE, während die Seite die geholte Fassung liest — stimmen beide
   Listen überein, hat der Packer die richtige Quelle benutzt. */
function urlPfadeAus(cssText) {
  const pfade = [];
  const re = /url\(\s*['"]?([^'")]+)['"]?\s*\)/g;
  let m;
  while ((m = re.exec(cssText)) !== null) {
    const p = m[1].trim();
    if (/^(https?:|data:|\/\/)/i.test(p)) continue;
    if (pfade.indexOf(p) === -1) pfade.push(p);
  }
  return pfade;
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
    const text = msg.text();
    if (isBlockedResourceError(text)) blockedResourceErrors.push(text);
    else jsErrors.push('console.error: ' + text);
  });

  const checks = {};
  const check = (id, pass, data) => { checks[id] = { pass: !!pass, ...data }; };

  // Einblend-Animationen erzwingen, sonst misst man Elemente mit opacity: 0.
  const enthuellen = () => page.evaluate(() => {
    document.querySelectorAll('.anim-reveal').forEach(e => e.classList.add('in-view'));
  });
  const reiterOeffnen = async (key) => {
    await page.evaluate(k => vlShowTab(k, true), key);
    await page.waitForTimeout(150);
    await enthuellen();
  };

  await page.goto(TARGET, { waitUntil: 'load' });
  /* Ohne catch reisst ein leeres Raster die ganze Suite mit — der Bericht nennte
     dann keinen roten Check, sondern einen Stacktrace. Fehlt hier etwas, sollen
     die zuständigen Checks (01/04) das sagen. */
  await page.waitForSelector('#pk-grid .pk-card', { timeout: 15000, state: 'attached' }).catch(() => {});
  await page.waitForSelector('#bild-grid .bild-card', { timeout: 5000, state: 'attached' }).catch(() => {});
  await enthuellen();

  // ---------- (06) vorlagen.html lädt SKILLS/PROMPTS NICHT ----------
  /* ZUERST gemessen, weil jede spätere Prüfung die Seite dazu bringen könnte,
     eine Sammlung nachzuladen (die globale Suche tut genau das). Der Vertrag
     gilt für den FRISCHEN Seitenzustand — nur der sagt etwas darüber, ob die
     Paketkarte fremde Daten braucht. */
  const ohneFremd = await page.evaluate(() => ({
    skillsUndef: (typeof SKILLS === 'undefined'),
    promptsUndef: (typeof PROMPTS === 'undefined'),
    bilderDa: (typeof BILDER !== 'undefined'),
    paketeDa: (typeof PAKETE !== 'undefined'),
    // Zeigt die Karte trotzdem jeden Verweisnamen? Das ist der Beleg, dass die
    // Daten ihren Anzeigenamen selbst tragen.
    verweisNamenDa: PAKETE.every(p => {
      const karte = document.getElementById('paket-' + p.id);
      if (!karte) return false;
      const txt = (karte.textContent || '');
      return (p.verweise || []).every(v => txt.indexOf(v.name) !== -1);
    }),
  }));
  check('06_vorlagen_ohne_skills_prompts',
    ohneFremd.skillsUndef && ohneFremd.promptsUndef
      && ohneFremd.bilderDa && ohneFremd.paketeDa && ohneFremd.verweisNamenDa,
    ohneFremd);

  // ---------- (09) Volle Zählerstände am ungefilterten Stand ablesen ----------
  /* Muss VOR jeder Sucheingabe passieren: „die volle Zahl" ist hier kein
     getippter Sollwert, sondern das, was die Seite ohne Suchbegriff anzeigt. */
  const zaehlerVoll = await page.evaluate(() => {
    const out = {};
    document.querySelectorAll('.lib-sec-count, .vl-count').forEach(el => {
      if (el.id) out[el.id] = (el.textContent || '').trim();
    });
    return out;
  });

  // ---------- (01) BILDER-Raster vollständig ----------
  await reiterOeffnen('daten');
  const bilder = await page.evaluate(() => {
    const karten = [...document.querySelectorAll('#bild-grid .bild-card')];
    const ids = karten.map(k => k.dataset.id || '');
    return {
      soll: BILDER.length,
      ist: karten.length,
      idsEindeutig: new Set(ids).size === ids.length,
      fehlend: BILDER.map(b => b.id).filter(id => ids.indexOf(id) === -1),
      zusaetzlich: ids.filter(id => !BILDER.some(b => b.id === id)),
      ankerVollstaendig: BILDER.every(b => {
        const el = document.getElementById('bild-' + b.id);
        return !!el && el.classList.contains('bild-card');
      }),
      leereKarten: karten.filter(k => (k.textContent || '').trim().length < 20).map(k => k.dataset.id),
    };
  });
  check('01_bilder_raster_vollstaendig',
    bilder.ist === bilder.soll && bilder.soll > 0 && bilder.idsEindeutig
      && bilder.fehlend.length === 0 && bilder.zusaetzlich.length === 0
      && bilder.ankerVollstaendig && bilder.leereKarten.length === 0,
    bilder);

  // ---------- (02) alt · Lizenz · Urheber, jeweils sichtbar ----------
  /* „Sichtbar" heisst hier: im offenen Reiter gerendert (offsetParent gesetzt),
     nicht per display:none/visibility versteckt, und mit Text drin. Ein leeres
     Element wäre juristisch dasselbe wie ein fehlendes. */
  const belege = await page.evaluate(() => {
    const sichtbar = el => {
      if (!el) return false;
      if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') return false;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) === 0) return false;
      return (el.textContent || '').trim().length > 0;
    };
    return [...document.querySelectorAll('#bild-grid .bild-card')].map(k => {
      const img = k.querySelector('img');
      const lz = k.querySelector('.bild-lizenz-wert');
      const ur = k.querySelector('.bild-urheber');
      return {
        id: k.dataset.id,
        alt: img ? (img.getAttribute('alt') || '') : null,
        lizenzSichtbar: sichtbar(lz),
        lizenzText: lz ? lz.textContent.trim() : '',
        urheberSichtbar: sichtbar(ur),
        urheberText: ur ? ur.textContent.trim() : '',
      };
    });
  });
  /* Untergrenze für den Urheber: „Urheber:" allein ist ein Etikett ohne Inhalt.
     Deshalb muss nach dem Doppelpunkt noch etwas stehen. */
  const belegMaengel = belege.filter(b =>
    b.alt === null || b.alt.trim().length === 0
    || !b.lizenzSichtbar || !b.urheberSichtbar
    || b.urheberText.replace(/^Urheber:\s*/i, '').length < 2);
  check('02_bilder_alt_lizenz_urheber',
    belege.length > 0 && belegMaengel.length === 0,
    { karten: belege.length, maengel: belegMaengel });

  // ---------- (03) width/height gegen naturalWidth/naturalHeight ----------
  const masse = await page.evaluate(async () => {
    const imgs = [...document.querySelectorAll('#bild-grid .bild-card img')];
    // loading="lazy" ist für die Anzeige richtig und für die Messung im Weg.
    imgs.forEach(i => { i.loading = 'eager'; });
    await Promise.all(imgs.map(i => (i.complete && i.naturalWidth)
      ? Promise.resolve()
      : new Promise(res => {
          i.addEventListener('load', res, { once: true });
          i.addEventListener('error', res, { once: true });
          setTimeout(res, 8000);
        })));
    return imgs.map(i => ({
      src: i.getAttribute('src') || '',
      w: parseInt(i.getAttribute('width') || '0', 10),
      h: parseInt(i.getAttribute('height') || '0', 10),
      nw: i.naturalWidth, nh: i.naturalHeight,
    }));
  });
  /* ZWEI MASSSTÄBE, UND DAS IST KEIN AUFWEICHEN:
     Ein Rasterbild (WebP) hat eine echte Eigengrösse; naturalWidth/naturalHeight
     sind exakt die Pixel der Datei. Weicht das Attribut davon ab, reserviert der
     Browser den falschen Platz und das Layout springt beim Laden — also exakte
     Gleichheit.
     Ein SVG mit reinem viewBox (so liegen die zwei Testbilder auf der Platte,
     nachgesehen am 25.07.2026: kein width-/height-Attribut im Wurzelelement) hat
     KEINE Eigengrösse in Pixeln. Der Browser meldet dann seine Standardbox
     300×150, ins Seitenverhältnis eingepasst — bei 1600×900 also 267×150. Eine
     Gleichheitsprüfung verlangte hier, dass im HTML 267×150 steht; damit wäre
     das Attribut falsch und der Test hätte ihn dazu gezwungen. Was das Layout
     bei einem SVG stabil hält, ist ausschliesslich das Verhältnis — genau das
     wird geprüft.
     Die Toleranz deckt die Rundung der Standardbox ab (bei 16:9 ein Fehler von
     0,13 %) und ist mit 1,5 % weit unter jedem echten Fehler: ein vertauschtes
     Paar oder ein falsches Bild liegt zweistellig daneben. */
  const SVG_VERHAELTNIS_TOLERANZ = 0.015;
  const massMaengel = masse.filter(m => {
    if (!m.w || !m.h || !m.nw || !m.nh) return true;
    if (!/\.svg(\?|#|$)/i.test(m.src)) return m.w !== m.nw || m.h !== m.nh;
    const soll = m.w / m.h, ist = m.nw / m.nh;
    return Math.abs(soll - ist) / soll > SVG_VERHAELTNIS_TOLERANZ;
  });
  check('03_bilder_masse_stabil',
    masse.length > 0 && masse.length === bilder.soll && massMaengel.length === 0,
    { gemessen: masse.length, maengel: massMaengel, alle: masse });

  // ---------- (04) PAKETE-Raster vollständig ----------
  await reiterOeffnen('pakete');
  const pakete = await page.evaluate(() => {
    const karten = [...document.querySelectorAll('#pk-grid .pk-card')];
    const ids = karten.map(k => k.dataset.id || '');
    return {
      soll: PAKETE.length,
      ist: karten.length,
      idsEindeutig: new Set(ids).size === ids.length,
      fehlend: PAKETE.map(p => p.id).filter(id => ids.indexOf(id) === -1),
      zusaetzlich: ids.filter(id => !PAKETE.some(p => p.id === id)),
      ankerVollstaendig: PAKETE.every(p => {
        const el = document.getElementById('paket-' + p.id);
        return !!el && el.classList.contains('pk-card');
      }),
      zipKnopfProKarte: PAKETE.every(p => !!document.querySelector(`[data-pk-zip="${p.id}"]`)),
    };
  });
  check('04_pakete_raster_vollstaendig',
    pakete.ist === pakete.soll && pakete.soll > 0 && pakete.idsEindeutig
      && pakete.fehlend.length === 0 && pakete.zusaetzlich.length === 0
      && pakete.ankerVollstaendig && pakete.zipKnopfProKarte,
    pakete);

  // ---------- (05) verweise: eigener Name angezeigt UND gegen Ziel gehalten ----------
  /* Zwei Fragen in einem Check, weil sie zusammengehören:
       (a) Steht auf der Karte genau der `name` aus dem Verweis?
       (b) Gibt es typ+id in der Zielsammlung, und heisst der Eintrag dort ebenso?
     (b) braucht ggf. eine Sammlung, die vorlagen.html NICHT lädt. Deshalb läuft
     (b) auf einer ZWEITEN Seite: der Vertrag aus Check 06 misst den frischen
     Zustand der ersten, und der darf durch diese Prüfung nicht verfälscht
     werden. Die Zielsammlung wird über GSEARCH_GROUPS → GSEARCH_SOURCES
     ermittelt, also über dieselbe Registry, aus der die Seite ihre Links baut. */
  const angezeigt = await page.evaluate(() => {
    return PAKETE.map(p => {
      const karte = document.getElementById('paket-' + p.id);
      const knoten = karte ? [...karte.querySelectorAll('.pk-verweise > *')] : [];
      return {
        id: p.id,
        soll: (p.verweise || []).map(v => ({ typ: v.typ, id: v.id, name: v.name })),
        ist: knoten.map(n => ({
          // sr-only-Typzusatz („(Asset)") gehört nicht zum Namen.
          text: (n.textContent || '').replace(/\s*\([^)]*\)\s*$/, '').trim(),
          href: n.getAttribute ? (n.getAttribute('href') || '') : '',
        })),
      };
    });
  });
  const namenPassen = angezeigt.every(p =>
    p.ist.length === p.soll.length
    && p.soll.every((v, i) => p.ist[i] && p.ist[i].text === v.name
        && p.ist[i].href.indexOf(encodeURIComponent(v.id)) !== -1));

  const pruefSeite = await context.newPage();
  await pruefSeite.route('**raw.githubusercontent.com**', r => r.abort());
  await pruefSeite.route('**github.com**', r => r.abort());
  await pruefSeite.goto(TARGET, { waitUntil: 'domcontentloaded' });
  const quellen = await pruefSeite.evaluate(() => {
    const typen = [...new Set(PAKETE.flatMap(p => (p.verweise || []).map(v => v.typ)))];
    return typen.map(t => {
      const g = (typeof GSEARCH_GROUPS !== 'undefined') ? GSEARCH_GROUPS.find(x => x.key === t) : null;
      const s = (g && typeof GSEARCH_SOURCES !== 'undefined')
        ? GSEARCH_SOURCES.find(x => x.glob === g.glob) : null;
      return { typ: t, glob: g ? g.glob : null, src: s ? s.src : null,
               schonDa: !!g && typeof _gsGlobal === 'function' && _gsGlobal(g.glob) !== undefined };
    });
  });
  for (const q of quellen) {
    if (q.glob && !q.schonDa && q.src) {
      await pruefSeite.addScriptTag({ url: new URL(q.src, TARGET).href }).catch(() => {});
    }
  }
  const zielAbgleich = await pruefSeite.evaluate(() => {
    const abweichungen = [];
    PAKETE.forEach(p => (p.verweise || []).forEach(v => {
      const g = GSEARCH_GROUPS.find(x => x.key === v.typ);
      if (!g) { abweichungen.push(`${p.id}/${v.typ}:${v.id}: unbekannter typ`); return; }
      const liste = _gsGlobal(g.glob);
      if (!liste) { abweichungen.push(`${p.id}/${v.typ}:${v.id}: ${g.glob} nicht ladbar`); return; }
      const ziel = liste.find(x => x.id === v.id);
      if (!ziel) { abweichungen.push(`${p.id}/${v.typ}:${v.id}: existiert nicht in ${g.glob}`); return; }
      const dortName = g.title(ziel);
      if (dortName !== v.name) abweichungen.push(`${p.id}/${v.typ}:${v.id}: heisst dort „${dortName}", hier „${v.name}"`);
    }));
    return { abweichungen, geprueft: PAKETE.reduce((s, p) => s + (p.verweise || []).length, 0) };
  });
  await pruefSeite.close();
  check('05_pakete_verweise_mit_namen',
    namenPassen && zielAbgleich.abweichungen.length === 0 && zielAbgleich.geprueft > 0,
    { namenPassen, angezeigt, quellen, ...zielAbgleich });

  // ---------- (07) Vier Reiter öffnen, RatingConfig folgt ----------
  const reiterErgebnis = [];
  for (const r of REITER) {
    await reiterOeffnen(r.key);
    reiterErgebnis.push(await page.evaluate(o => {
      const panels = o.alle.map(x => ({
        key: x.key,
        sichtbar: !document.getElementById(x.panel).hidden,
        gewaehlt: document.getElementById(x.tab).getAttribute('aria-selected') === 'true',
      }));
      return {
        key: o.r.key,
        nurEinPanel: panels.filter(p => p.sichtbar).length === 1,
        richtigesPanel: panels.every(p => p.sichtbar === (p.key === o.r.key)),
        ariaStimmt: panels.every(p => p.gewaehlt === (p.key === o.r.key)),
        ratingTyp: (window.RatingConfig || {}).type || null,
        ratingSoll: o.r.rating,
      };
    }, { r, alle: REITER }));
  }
  check('07_vier_reiter_umschalten',
    reiterErgebnis.length === REITER.length
      && reiterErgebnis.every(r => r.nurEinPanel && r.richtigesPanel && r.ariaStimmt
                                   && r.ratingTyp === r.ratingSoll),
    { reiter: reiterErgebnis });

  // ---------- (08) ?tab= und Aliasse ----------
  const tabParam = [];
  for (const t of TAB_PARAM) {
    const url = TARGET + (t.param ? '?tab=' + t.param : '');
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(200);
    tabParam.push(await page.evaluate(o => {
      const sichtbar = o.alle.filter(x => !document.getElementById(x.panel).hidden).map(x => x.key);
      return { param: o.param, soll: o.soll, sichtbar,
               ratingTyp: (window.RatingConfig || {}).type || null };
    }, { param: t.param, soll: t.soll, alle: REITER }));
  }
  check('08_tab_param_und_alias',
    tabParam.length === TAB_PARAM.length
      && tabParam.every(t => t.sichtbar.length === 1 && t.sichtbar[0] === t.soll
                             && t.ratingTyp === (REITER.find(r => r.key === t.soll) || {}).rating),
    { tabParam });

  // ---------- (09) Reiterwechsel leert Suche und setzt alle Zähler zurück ----------
  /* Gefiltert wird im Daten-Reiter mit einem Begriff, der dort GARANTIERT etwas
     wegfiltert (der erste Tag des ersten Bildes trifft nicht alle elf) — sonst
     prüfte der Check ein Zurücksetzen, das gar nicht nötig war. */
  await page.goto(TARGET + '?tab=daten', { waitUntil: 'load' });
  await page.waitForTimeout(250);
  await enthuellen();
  const filterBegriff = await page.evaluate(() => (BILDER[0].tags || [])[0] || BILDER[0].name.split(' ')[0]);
  await page.fill('#search', filterBegriff);
  await page.waitForTimeout(450);   // Debounce 150 ms + Rendern
  const gefiltert = await page.evaluate(() => ({
    karten: document.querySelectorAll('#bild-grid .bild-card').length,
    bilderZaehler: (document.getElementById('bilder-count') || {}).textContent.trim(),
    tabZaehler: (document.getElementById('vl-count-daten') || {}).textContent.trim(),
  }));
  await page.evaluate(() => vlShowTab('pakete', true));
  await page.waitForTimeout(300);
  const nachWechsel = await page.evaluate(() => {
    const out = { suchfeld: (document.getElementById('search') || {}).value, zaehler: {} };
    document.querySelectorAll('.lib-sec-count, .vl-count').forEach(el => {
      if (el.id) out.zaehler[el.id] = (el.textContent || '').trim();
    });
    out.bildKarten = document.querySelectorAll('#bild-grid .bild-card').length;
    return out;
  });
  const zaehlerAbweichung = Object.keys(zaehlerVoll)
    .filter(id => nachWechsel.zaehler[id] !== zaehlerVoll[id])
    .map(id => `${id}: „${nachWechsel.zaehler[id]}" statt „${zaehlerVoll[id]}"`);
  check('09_reiterwechsel_leert_suche',
    // UNTERGRENZE: der Filter muss vorher überhaupt gegriffen haben, sonst wäre
    // „alles wieder voll" eine Aussage über nichts.
    gefiltert.karten > 0 && gefiltert.karten < bilder.soll
      && nachWechsel.suchfeld === ''
      && nachWechsel.bildKarten === bilder.soll
      && Object.keys(zaehlerVoll).length >= 6
      && zaehlerAbweichung.length === 0,
    { filterBegriff, gefiltert, suchfeld: nachWechsel.suchfeld,
      bildKartenNachWechsel: nachWechsel.bildKarten,
      zaehlerGeprueft: Object.keys(zaehlerVoll).length, zaehlerAbweichung });

  // ---------- (10) Typ-Trennung im localStorage ----------
  /* Der Stern auf einer Bild-/Paketkarte ist ein MERKEN-Stern (fav:<typ>:<id>).
     Er übergibt seinen Typ explizit — täte er es nicht, landete er im Typ des
     gerade aktiven Reiters: im Daten-Reiter also unter fav:daten:<bild-id>,
     obwohl der Reiter ZWEI Sammlungen trägt (Beispieldaten und Bilder). Das ist
     im UI unsichtbar: der Stern leuchtet, und „Deine Sachen" zeigt den Eintrag
     falsch typisiert oder gar nicht. Nur der Schlüssel verrät es. */
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.goto(TARGET + '?tab=daten', { waitUntil: 'load' });
  await page.waitForTimeout(250);
  await enthuellen();
  /* Klick mit kurzer Frist und ohne Ausnahme: fehlt der Stern (weil die Karte
     fehlt), soll DIESER Check rot werden und der Lauf weiterlaufen. Ein harter
     page.click() liefe 30 s in einen Timeout und risse die ganze Suite mit —
     der Bericht nennte dann gar keinen Check mehr, sondern nur einen Stacktrace.
     Genau das ist beim ersten Rotnachweis passiert. */
  const sternKlick = async (sel) => {
    try { await page.locator(sel).click({ timeout: 5000 }); return true; }
    catch (e) { return false; }
  };
  const bildId = await page.evaluate(() => BILDER[0].id);
  const bildGeklickt = await sternKlick(`#bild-${bildId} .fav-btn`);
  await page.waitForTimeout(200);
  await page.evaluate(() => vlShowTab('pakete', true));
  await page.waitForTimeout(250);
  const paketId = await page.evaluate(() => PAKETE[0].id);
  const paketGeklickt = await sternKlick(`#paket-${paketId} .fav-btn`);
  await page.waitForTimeout(200);
  // Reload: ein Schlüssel, der den Neuladen nicht überlebt, hilft niemandem.
  await page.goto(TARGET + '?tab=pakete', { waitUntil: 'load' });
  await page.waitForTimeout(250);
  const namensraum = await page.evaluate(o => {
    const alle = Object.keys(localStorage);
    const idsBild = BILDER.map(b => b.id);
    const idsPaket = PAKETE.map(p => p.id);
    /* Fremdschlüssel = ein typ-genamespaceter Schlüssel, dessen ID-Teil zu
       BILDER bzw. PAKETE gehört, dessen Typ-Teil aber nicht `bild`/`paket` ist.
       Abgeleitet aus den Arrays, nicht aus einer Aufzählung möglicher Typen —
       ein NEUER falscher Typ fiele einer Aufzählung durch. */
    const fremd = [];
    alle.forEach(k => {
      const teile = k.split(':');
      if (teile.length < 3 || o.praefixe.indexOf(teile[0]) === -1) return;
      const typ = teile[1];
      const id = teile.slice(2).join(':');
      if (idsBild.indexOf(id) !== -1 && typ !== 'bild') fremd.push(k);
      if (idsPaket.indexOf(id) !== -1 && typ !== 'paket') fremd.push(k);
    });
    return {
      favBild: localStorage.getItem('fav:bild:' + o.bildId),
      favPaket: localStorage.getItem('fav:paket:' + o.paketId),
      fremd,
      sternBildAktiv: !!document.querySelector(`#bild-${o.bildId} .fav-btn.active`)
        || (function () { const el = document.querySelector(`#bild-${o.bildId} .fav-btn`); return !!el && el.getAttribute('aria-pressed') === 'true'; })(),
      sternPaketAktiv: (function () { const el = document.querySelector(`#paket-${o.paketId} .fav-btn`); return !!el && el.getAttribute('aria-pressed') === 'true'; })(),
      schluesselGesamt: alle.length,
    };
  }, { bildId, paketId, praefixe: LS_PRAEFIXE });
  check('10_typtrennung_localstorage',
    bildGeklickt && paketGeklickt
      && namensraum.favBild === '1' && namensraum.favPaket === '1'
      && namensraum.fremd.length === 0
      && namensraum.sternBildAktiv && namensraum.sternPaketAktiv,
    { bildId, paketId, bildGeklickt, paketGeklickt, ...namensraum });
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });

  // ---------- (11/12) Deep-Links ?bild= und ?paket= ----------
  /* Die Hervorhebung liegt nur ~2400 ms an; deshalb wie e8:08/e13:07 nur bis
     domcontentloaded warten und zeitnah pollen. */
  const deepLink = async (param, id, panelKey, ankerPraefix) => {
    await page.goto('about:blank');
    await page.goto(`${TARGET}?${param}=${encodeURIComponent(id)}&utm_source=e14`,
      { waitUntil: 'domcontentloaded' });
    let jeHervorgehoben = false;
    const t0 = Date.now();
    while (Date.now() - t0 < 2800) {
      const hi = await page.evaluate(a => {
        const el = document.getElementById(a);
        return !!el && el.classList.contains('-highlight');
      }, ankerPraefix + id).catch(() => false);
      if (hi) { jeHervorgehoben = true; break; }
      await page.waitForTimeout(120);
    }
    return {
      param, id, jeHervorgehoben,
      ...(await page.evaluate(o => {
        const el = document.getElementById(o.anker);
        const panel = document.getElementById(o.panel);
        const ov = document.getElementById('modal-overlay');
        return {
          ankerDa: !!el,
          panelSichtbar: !!panel && !panel.hidden,
          andereVersteckt: o.alle.filter(x => x.key !== o.key)
            .every(x => document.getElementById(x.panel).hidden),
          modalOffen: !!ov && ov.classList.contains('open'),
          utmBleibt: location.search.indexOf('utm_source=e14') !== -1,
          imBlick: (function () {
            if (!el) return false;
            const r = el.getBoundingClientRect();
            return r.bottom > 0 && r.top < window.innerHeight;
          })(),
        };
      }, { anker: ankerPraefix + id, panel: REITER.find(r => r.key === panelKey).panel,
           key: panelKey, alle: REITER })),
    };
  };
  const dlBild = await deepLink('bild', await (async () => {
    await page.goto(TARGET, { waitUntil: 'domcontentloaded' });
    return page.evaluate(() => BILDER[BILDER.length - 1].id);
  })(), 'daten', 'bild-');
  check('11_deeplink_bild',
    dlBild.ankerDa && dlBild.panelSichtbar && dlBild.andereVersteckt
      && dlBild.jeHervorgehoben && dlBild.imBlick && !dlBild.modalOffen && dlBild.utmBleibt,
    dlBild);

  const dlPaket = await deepLink('paket', await page.evaluate(() => PAKETE[0].id), 'pakete', 'paket-');
  check('12_deeplink_paket',
    dlPaket.ankerDa && dlPaket.panelSichtbar && dlPaket.andereVersteckt
      && dlPaket.jeHervorgehoben && dlPaket.imBlick && !dlPaket.modalOffen && dlPaket.utmBleibt,
    dlPaket);

  // ---------- (13) Totes Deep-Link-Ziel: Toast, Parameter UND Hash raus ----------
  const tot = [];
  for (const param of ['bild', 'paket']) {
    await page.goto('about:blank');
    await page.goto(`${TARGET}?${param}=gibtsnicht-e14&utm_source=e14`, { waitUntil: 'load' });
    // Der Toast blendet sich nach 2500 ms selbst aus — früh genug nachsehen.
    let gesehen = false;
    const t0 = Date.now();
    while (Date.now() - t0 < 2200) {
      gesehen = await page.evaluate(() => {
        const t = document.getElementById('toast');
        return !!t && t.classList.contains('show') && (t.textContent || '').trim().length > 0;
      }).catch(() => false);
      if (gesehen) break;
      await page.waitForTimeout(100);
    }
    tot.push(await page.evaluate(o => ({
      param: o.param,
      toastGesehen: o.gesehen,
      toastText: (document.getElementById('toast') || {}).textContent || '',
      paramWeg: !new URLSearchParams(location.search).has(o.param),
      hashWeg: location.hash === '',
      utmBleibt: new URLSearchParams(location.search).get('utm_source') === 'e14',
    }), { param, gesehen }));
  }
  check('13_totes_ziel_meldet_und_raeumt',
    tot.length === 2 && tot.every(t => t.toastGesehen && t.paramWeg && t.hashWeg && t.utmBleibt),
    { tot });

  // ---------- (14) ZIP: packen, entgegennehmen, entpacken, gegen Platte halten ----------
  await page.goto(TARGET + '?tab=pakete', { waitUntil: 'load' });
  await page.waitForSelector('#pk-grid .pk-card', { timeout: 15000 }).catch(() => {});
  await enthuellen();
  const paketDaten = await page.evaluate(() => PAKETE.map(p => ({
    id: p.id, ordner: p.ordner, dateien: p.dateien || [],
  })));
  const zips = [];
  for (const p of paketDaten) {
    /* SOLL-LISTE ZUR LAUFZEIT: die eigenen Dateien aus PAKETE, dazu die
       url(...)-Angaben JEDER mitgepackten CSS von der Platte. Keine getippte 8,
       und ausdrücklich NICHT aus data/assets.js — ASSETS führt den
       Kursiv-Schnitt nicht als eigenen Eintrag, das ZIP wäre dann still zu
       klein. */
    const soll = new Map();   // ZIP-Name → Pfad auf der Platte (repo-relativ)
    for (const d of p.dateien) {
      const rel = (p.ordner && d.indexOf(p.ordner) === 0) ? d.slice(p.ordner.length) : d;
      soll.set(p.id + '/' + rel, d);
    }
    for (const d of p.dateien) {
      if (!/\.css$/i.test(d)) continue;
      const platte = path.join(REPO_WURZEL, d);
      if (!fs.existsSync(platte)) continue;
      for (const u of urlPfadeAus(fs.readFileSync(platte, 'utf8'))) {
        soll.set(p.id + '/' + u, u);
      }
    }

    let ergebnis = { id: p.id, ok: false, sollAnzahl: soll.size };
    try {
      const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 40000 }),
        page.evaluate(id => {
          const btn = document.querySelector(`[data-pk-zip="${id}"]`);
          if (btn) btn.click();
        }, p.id),
      ]);
      const buf = fs.readFileSync(await download.path());
      const gelesen = zipLesen(buf);
      const namen = gelesen.ok ? gelesen.eintraege.map(e => e.name) : [];
      /* Nicht nur die Namen: der Inhalt jeder gepackten Datei wird Byte für Byte
         gegen die Platte gehalten. Ein ZIP mit richtigen Namen und falschem
         Inhalt sieht in jeder Dateiliste heil aus. */
      const inhaltAbweichung = [];
      let verglichen = 0;
      for (const e of (gelesen.ok ? gelesen.eintraege : [])) {
        const quelle = soll.get(e.name);
        if (!quelle) continue;   // als „zusaetzlich" unten gemeldet
        const platte = path.join(REPO_WURZEL, quelle);
        if (!fs.existsSync(platte)) { inhaltAbweichung.push(quelle + ': nicht auf der Platte'); continue; }
        const sollBytes = fs.readFileSync(platte);
        verglichen++;
        if (!e.inhalt || !Buffer.from(e.inhalt).equals(sollBytes)) {
          inhaltAbweichung.push(`${e.name}: ${e.inhalt ? e.inhalt.length : -1} statt ${sollBytes.length} Byte`);
        }
      }
      const statusText = await page.evaluate(id => {
        const el = document.getElementById('pk-status-' + id);
        return el && !el.hidden ? (el.textContent || '').trim() : '';
      }, p.id);
      ergebnis = {
        id: p.id, sollAnzahl: soll.size,
        dateiname: download.suggestedFilename(),
        groesse: buf.length,
        /* Signatur des lokalen Dateikopfs (PK\x03\x04) als Zahl statt als
           Zeichenkette: e13 vergleicht hier gegen ein Literal mit zwei ECHTEN
           Steuerbytes im Quelltext — unsichtbar in jedem Diff und in jedem
           grep. Derselbe Wert, nur lesbar. */
        signatur: buf.length > 4 && buf.readUInt32LE(0) === 0x04034b50,
        gelesen: gelesen.ok, grund: gelesen.grund || null,
        namen,
        fehlend: [...soll.keys()].filter(n => namen.indexOf(n) === -1),
        zusaetzlich: namen.filter(n => !soll.has(n)),
        verglichen, inhaltAbweichung, statusText,
      };
      ergebnis.ok = ergebnis.dateiname === p.id + '.zip' && ergebnis.signatur && ergebnis.gelesen
        && ergebnis.fehlend.length === 0 && ergebnis.zusaetzlich.length === 0
        && inhaltAbweichung.length === 0
        // UNTERGRENZE: „keine Abweichung" ist bei 0 Vergleichen keine Aussage.
        && verglichen === soll.size && verglichen > p.dateien.length
        && /\d/.test(statusText);
    } catch (e) {
      ergebnis.fehler = String(e && e.message || e);
      ergebnis.statusText = await page.evaluate(id => {
        const el = document.getElementById('pk-status-' + id);
        return el ? (el.textContent || '').trim() : '';
      }, p.id).catch(() => '');
    }
    zips.push(ergebnis);
  }
  check('14_paket_zip_vollstaendig',
    zips.length === paketDaten.length && zips.length > 0 && zips.every(z => z.ok),
    { zips });

  // ---------- (15) Eine fehlende Datei: sichtbare Meldung, KEIN halbes ZIP ----------
  /* Abgewürgt wird eine Datei aus der ABGELEITETEN Liste (die url(...) der
     Paket-CSS), nicht eine aus `dateien`. Genau die ist der empfindliche Teil:
     sie steht in keiner Datenliste, und ein Packer, der sie stillschweigend
     wegliesse, lieferte ein ZIP, dem man nichts ansieht. */
  const bruch = (() => {
    for (const p of paketDaten) {
      for (const d of p.dateien) {
        if (!/\.css$/i.test(d)) continue;
        const platte = path.join(REPO_WURZEL, d);
        if (!fs.existsSync(platte)) continue;
        const u = urlPfadeAus(fs.readFileSync(platte, 'utf8'))[0];
        if (u) return { paket: p.id, pfad: u };
      }
    }
    return null;
  })();
  if (!bruch) {
    check('15_paket_zip_bricht_sichtbar_ab', false,
      { grund: 'keine per url(...) nachgeladene Datei gefunden — Vertrag nicht prüfbar' });
  } else {
    const muster = '**/' + bruch.pfad;
    await page.route(muster, r => r.abort());
    const vorher = await page.evaluate(id => {
      const el = document.getElementById('pk-status-' + id);
      return el && !el.hidden ? (el.textContent || '').trim() : '';
    }, bruch.paket);
    let downloadTrotzdem = false;
    const lauscher = page.waitForEvent('download', { timeout: 20000 })
      .then(() => { downloadTrotzdem = true; }).catch(() => null);
    await page.evaluate(id => {
      const btn = document.querySelector(`[data-pk-zip="${id}"]`);
      if (btn) btn.click();
    }, bruch.paket);
    await page.waitForTimeout(9000);   // 2 Versuche × 2 Adressen + 300 ms Pause, je Datei
    const nachher = await page.evaluate(o => {
      const el = document.getElementById('pk-status-' + o.paket);
      const toast = document.getElementById('toast');
      return {
        statusSichtbar: !!el && !el.hidden && (el.textContent || '').trim().length > 0,
        statusText: el ? (el.textContent || '').trim() : '',
        nenntDatei: el ? (el.textContent || '').indexOf(o.pfad) !== -1 : false,
        toastSichtbar: !!toast && toast.classList.contains('show'),
        toastText: toast ? (toast.textContent || '').trim() : '',
      };
    }, bruch);
    await lauscher;
    await page.unroute(muster).catch(() => {});
    check('15_paket_zip_bricht_sichtbar_ab',
      !downloadTrotzdem && nachher.statusSichtbar && nachher.nenntDatei
        && nachher.statusText !== vorher,
      { ...bruch, downloadTrotzdem, vorher, ...nachher });
  }

  // ---------- (16) keine JS-Fehler ----------
  check('16_keine_js_fehler', jsErrors.length === 0,
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
