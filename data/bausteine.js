/* ============================================================
   pilot AI Marketplace — Baukasten: data/bausteine.js (Etappe E7).
   Klassisches Script (kein Modul), definiert globale Konstanten für
   baukasten.html und die Startseiten-Zähler auf index.html.

   Definierte Globals:
     BAUSTEINE          — 12 selbst-enthaltene HTML+CSS-Bausteine als
                          Ausgangspunkt. Jeder Baustein ist ein Startpunkt,
                          den Claude für dich anpasst — deshalb trägt jeder
                          einen kopierfertigen „Sag Claude einfach: …“-Prompt.
                          Felder: id, name, kategorie (layout | inhalt |
                          formular | daten | navigation), leuchtturm,
                          schwierigkeit, beschreibung, einsatz, tags, code
                          (roher Quelltext = die Wahrheit), srcdoc
                          (vollständiges Vorschau-Dokument für die iframe-
                          Live-Vorschau, system-ui-Schrift, kein Netzwerk),
                          claudePrompt, seedKopien (Demo-Startwert „so oft
                          kopiert"), seedRating { schnitt, anzahl }. Ergänzt
                          um die normalisierten Felder rating {average,count}
                          und copyCount (siehe unten) — nur umbenannt, nichts
                          erfunden.
     BEISPIELDATEN      — 8 erfundene, anonymisierte Übungsdateien unter
                          beispieldaten/ (4 CSV + 2 Markdown + 2 SVG-
                          Testbilder). KEIN echtes Kundenmaterial. Größen/
                          Zeilen/Spalten sind real aus den Dateien gezählt.
                          Jede Datei trägt eine Übungsidee mit Querverweis
                          auf den passenden Baustein bzw. Skill/Prompt.
     BAUKASTEN_STATS    — real gezählte Kennzahlen (Bausteine, Leuchttürme,
                          Kategorien, Beispieldateien) für die Hero-Zahlen.
     BEISPIELDATEN_STATS— real gezählte Kennzahlen der Übungsdateien.

   LIZENZ/EIGENTUM: Alle Bausteine sind selbst geschriebenes, frei nutzbares
   pilot-Material — keine fremden Snippets, keine externen Abhängigkeiten
   (kein CDN, keine Web-Fonts, keine Lib). Die Vorschau nutzt bewusst einen
   system-ui-Font-Stack, damit sie im sandboxed iframe ohne Netzwerk rendert.
   Beispieldaten sind anonymisiert/erfunden-aber-plausibel und klar als
   Übungsdaten gekennzeichnet.

   Alle Zahlen sind real zählbar aus diesen Arrays / den Dateien. Nichts erfunden.
   ============================================================ */

const BAUSTEINE = [

  /* ============================================================ *
   * 1 · HEADER / HERO  — LEUCHTTURM                              *
   * ============================================================ */
  {
    id: 'header-hero',
    name: 'Header mit Hero',
    kategorie: 'layout',
    leuchtturm: true,
    schwierigkeit: 'einfach',
    beschreibung: 'Der erste Bildschirm einer Landingpage: Navigationsleiste, große Schlagzeile mit Akzentwort, kurzer Untertitel und zwei Buttons. Löst den klassischen „above the fold“-Auftakt in einem Rutsch.',
    einsatz: 'Startseite für eine neue Kampagnen-Landingpage oder ein internes Tool, das Kolleg:innen sofort verstehen sollen.',
    tags: ['header', 'hero', 'navigation', 'landingpage', 'startseite', 'schlagzeile', 'buttons', 'oben'],
    code: `<style>
  /* --- pilot-Look: diese vier Werte tauschst du am ehesten aus --- */
  .pi-hero {
    --akzent:  #ffe05e;   /* Signal-Gelb — hier deine Markenfarbe */
    --dunkel:  #262626;   /* Text & Buttons */
    --papier:  #f1f1ec;   /* Hintergrund */
    --leise:   #8d8b80;   /* zurückgenommener Text */
    --schrift: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: var(--papier); color: var(--dunkel);
    font-family: var(--schrift);
  }
  .pi-hero * { box-sizing: border-box; }
  .pi-hero__bar { display:flex; align-items:center; justify-content:space-between; gap:1rem; max-width:1080px; margin:0 auto; padding:1.4rem 2rem; }
  .pi-hero__logo { font-weight:800; letter-spacing:-.02em; font-size:1.25rem; }
  .pi-hero__logo span { background:var(--akzent); padding:.1em .35em; border-radius:.25rem; }
  .pi-hero__nav { display:flex; gap:1.6rem; font-size:.95rem; font-weight:500; }
  .pi-hero__nav a { color:var(--dunkel); text-decoration:none; opacity:.7; }
  .pi-hero__nav a:hover { opacity:1; }
  .pi-hero__wrap { max-width:820px; margin:0 auto; padding:5rem 2rem 6rem; text-align:center; }
  .pi-hero__tag { display:inline-block; font-size:.75rem; font-weight:700; text-transform:uppercase; letter-spacing:.14em; background:var(--dunkel); color:#fff; padding:.4rem .85rem; border-radius:2rem; margin-bottom:1.6rem; }
  .pi-hero__title { font-size:clamp(2.4rem,6vw,4rem); line-height:1.04; letter-spacing:-.03em; font-weight:800; margin:0 0 1.2rem; }
  .pi-hero__title mark { background:var(--akzent); color:inherit; padding:0 .12em; border-radius:.15em; }
  .pi-hero__sub { font-size:clamp(1.05rem,2.2vw,1.3rem); color:var(--leise); max-width:560px; margin:0 auto 2.4rem; line-height:1.5; }
  .pi-hero__cta { display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; }
  .pi-hero__btn { font:inherit; font-weight:600; font-size:1rem; padding:.9rem 1.8rem; border-radius:.5rem; border:2px solid var(--dunkel); cursor:pointer; text-decoration:none; transition:background .15s, color .15s; }
  .pi-hero__btn--primary { background:var(--dunkel); color:#fff; }
  .pi-hero__btn--primary:hover { background:var(--akzent); color:var(--dunkel); border-color:var(--akzent); }
  .pi-hero__btn--ghost { background:transparent; color:var(--dunkel); }
  .pi-hero__btn--ghost:hover { background:var(--dunkel); color:#fff; }
</style>

<header class="pi-hero">
  <div class="pi-hero__bar">
    <div class="pi-hero__logo"><span>pi</span>lot</div>
    <nav class="pi-hero__nav">
      <a href="#">Leistungen</a>
      <a href="#">Cases</a>
      <a href="#">Team</a>
      <a href="#">Kontakt</a>
    </nav>
  </div>
  <div class="pi-hero__wrap">
    <span class="pi-hero__tag">Media-Agentur</span>
    <!-- Schlagzeile & Akzentwort hier anpassen -->
    <h1 class="pi-hero__title">Kampagnen, die <mark>wirklich</mark> ankommen.</h1>
    <p class="pi-hero__sub">Wir planen, buchen und messen Mediakampagnen — datengetrieben und ohne Umwege.</p>
    <div class="pi-hero__cta">
      <a href="#" class="pi-hero__btn pi-hero__btn--primary">Projekt starten</a>
      <a href="#" class="pi-hero__btn pi-hero__btn--ghost">Mehr erfahren</a>
    </div>
  </div>
</header>`,
    srcdoc: `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0}</style></head><body>
<style>
  .pi-hero{--akzent:#ffe05e;--dunkel:#262626;--papier:#f1f1ec;--leise:#8d8b80;--schrift:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:var(--papier);color:var(--dunkel);font-family:var(--schrift)}
  .pi-hero *{box-sizing:border-box}
  .pi-hero__bar{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;max-width:1080px;margin:0 auto;padding:1.4rem 2rem}
  .pi-hero__logo{font-weight:800;letter-spacing:-.02em;font-size:1.25rem}
  .pi-hero__logo span{background:var(--akzent);padding:.1em .35em;border-radius:.25rem}
  .pi-hero__nav{display:flex;gap:1.6rem;font-size:.95rem;font-weight:500}
  .pi-hero__nav a{color:var(--dunkel);text-decoration:none;opacity:.7}
  .pi-hero__nav a:hover{opacity:1}
  .pi-hero__wrap{max-width:820px;margin:0 auto;padding:5rem 2rem 6rem;text-align:center}
  .pi-hero__tag{display:inline-block;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.14em;background:var(--dunkel);color:#fff;padding:.4rem .85rem;border-radius:2rem;margin-bottom:1.6rem}
  .pi-hero__title{font-size:clamp(2.4rem,6vw,4rem);line-height:1.04;letter-spacing:-.03em;font-weight:800;margin:0 0 1.2rem}
  .pi-hero__title mark{background:var(--akzent);color:inherit;padding:0 .12em;border-radius:.15em}
  .pi-hero__sub{font-size:clamp(1.05rem,2.2vw,1.3rem);color:var(--leise);max-width:560px;margin:0 auto 2.4rem;line-height:1.5}
  .pi-hero__cta{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
  .pi-hero__btn{font:inherit;font-weight:600;font-size:1rem;padding:.9rem 1.8rem;border-radius:.5rem;border:2px solid var(--dunkel);cursor:pointer;text-decoration:none;transition:background .15s,color .15s}
  .pi-hero__btn--primary{background:var(--dunkel);color:#fff}
  .pi-hero__btn--primary:hover{background:var(--akzent);color:var(--dunkel);border-color:var(--akzent)}
  .pi-hero__btn--ghost{background:transparent;color:var(--dunkel)}
  .pi-hero__btn--ghost:hover{background:var(--dunkel);color:#fff}
</style>
<header class="pi-hero">
  <div class="pi-hero__bar">
    <div class="pi-hero__logo"><span>pi</span>lot</div>
    <nav class="pi-hero__nav"><a href="#">Leistungen</a><a href="#">Cases</a><a href="#">Team</a><a href="#">Kontakt</a></nav>
  </div>
  <div class="pi-hero__wrap">
    <span class="pi-hero__tag">Media-Agentur</span>
    <h1 class="pi-hero__title">Kampagnen, die <mark>wirklich</mark> ankommen.</h1>
    <p class="pi-hero__sub">Wir planen, buchen und messen Mediakampagnen — datengetrieben und ohne Umwege.</p>
    <div class="pi-hero__cta">
      <a href="#" class="pi-hero__btn pi-hero__btn--primary">Projekt starten</a>
      <a href="#" class="pi-hero__btn pi-hero__btn--ghost">Mehr erfahren</a>
    </div>
  </div>
</header>
</body></html>`,
    claudePrompt: 'Nutze diesen Baustein als Ausgangspunkt und passe ihn an: Behalte die Struktur (Nav-Leiste oben, große Schlagzeile, Untertitel, zwei Buttons). Ersetze das Logo durch „[dein Projektname]“, die Navigationspunkte durch [deine Menüpunkte], die Schlagzeile durch „[deine Aussage]“ mit dem hervorgehobenen Akzentwort „[Wort]“, und die Button-Texte durch „[Button 1]“ und „[Button 2]“. Wenn du eine andere Markenfarbe brauchst, ändere die CSS-Variable --akzent. Tipp: Für den passenden Ton hilft dir der Skill frontend-design.',
    seedKopien: 34,
    seedRating: { schnitt: 4.8, anzahl: 11 }
  },

  /* ============================================================ *
   * 2 · KARTEN-GRID                                              *
   * ============================================================ */
  {
    id: 'karten-grid',
    name: 'Karten-Grid',
    kategorie: 'layout',
    leuchtturm: false,
    schwierigkeit: 'einfach',
    beschreibung: 'Ein responsives Raster aus gleich aussehenden Karten mit Icon, Titel, Text und Link. Umbricht automatisch von vier auf eine Spalte. Löst „mehrere gleichwertige Dinge übersichtlich nebeneinander“.',
    einsatz: 'Leistungs- oder Teamübersicht auf einer Website, oder Kachel-Startseite für ein internes Tool-Verzeichnis.',
    tags: ['grid', 'karten', 'cards', 'raster', 'kacheln', 'leistungen', 'responsive', 'icons'],
    code: `<style>
  .pi-grid {
    --akzent:  #ffe05e;   /* Icon-Hintergrund */
    --dunkel:  #262626;
    --papier:  #f4f1ea;   /* Sektions-Hintergrund */
    --karte:   #ffffff;   /* Kartenfläche */
    --leise:   #6b6b6b;
    --linie:   #e6e3da;
    --schrift: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: var(--papier); color: var(--dunkel); font-family: var(--schrift);
    padding: 4rem 1.5rem;
  }
  .pi-grid * { box-sizing: border-box; }
  .pi-grid__head { max-width:1080px; margin:0 auto 2.5rem; }
  .pi-grid__head h2 { font-size:clamp(1.8rem,4vw,2.6rem); letter-spacing:-.02em; margin:0 0 .5rem; font-weight:800; }
  .pi-grid__head p { color:var(--leise); font-size:1.1rem; margin:0; }
  /* Spaltenbreite über minmax steuern — kleiner = mehr Spalten */
  .pi-grid__list { max-width:1080px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:1.4rem; }
  .pi-card { background:var(--karte); border:1px solid var(--linie); border-radius:.9rem; padding:1.8rem; display:flex; flex-direction:column; gap:.8rem; transition:transform .15s ease, box-shadow .15s ease; }
  .pi-card:hover { transform:translateY(-4px); box-shadow:0 12px 30px rgba(38,38,38,.09); }
  .pi-card__icon { width:2.8rem; height:2.8rem; border-radius:.6rem; background:var(--akzent); display:flex; align-items:center; justify-content:center; }
  .pi-card__icon svg { width:1.5rem; height:1.5rem; stroke:var(--dunkel); fill:none; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
  .pi-card h3 { margin:0; font-size:1.2rem; font-weight:700; }
  .pi-card p { margin:0; color:var(--leise); font-size:.98rem; line-height:1.55; flex:1; }
  .pi-card a { color:var(--dunkel); font-weight:600; font-size:.95rem; text-decoration:none; display:inline-flex; align-items:center; gap:.4rem; }
  .pi-card a:hover { gap:.7rem; }
  .pi-card a svg { width:1rem; height:1rem; stroke:currentColor; fill:none; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
</style>

<section class="pi-grid">
  <div class="pi-grid__head">
    <h2>Was wir können</h2>
    <p>Vier Leistungen, ein Ziel: messbare Wirkung.</p>
  </div>
  <div class="pi-grid__list">
    <!-- Eine Karte kopieren, um weitere hinzuzufügen -->
    <article class="pi-card">
      <div class="pi-card__icon"><svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-6"/></svg></div>
      <h3>Mediaplanung</h3>
      <p>Kanäle, Budgets und Timing — abgestimmt auf deine Zielgruppe.</p>
      <a href="#">Mehr <svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
    </article>
    <article class="pi-card">
      <div class="pi-card__icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg></div>
      <h3>Zielgruppen</h3>
      <p>Wir finden die Menschen, die deine Botschaft wirklich brauchen.</p>
      <a href="#">Mehr <svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
    </article>
    <article class="pi-card">
      <div class="pi-card__icon"><svg viewBox="0 0 24 24"><path d="M13 2 3 14h7l-1 8 10-12h-7z"/></svg></div>
      <h3>Kreation</h3>
      <p>Ideen, die auffallen — vom ersten Entwurf bis zum finalen Motiv.</p>
      <a href="#">Mehr <svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
    </article>
    <article class="pi-card">
      <div class="pi-card__icon"><svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/></svg></div>
      <h3>Reporting</h3>
      <p>Klare Zahlen statt Bauchgefühl — nach jeder Kampagne.</p>
      <a href="#">Mehr <svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
    </article>
  </div>
</section>`,
    srcdoc: `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0}</style></head><body>
<style>
  .pi-grid{--akzent:#ffe05e;--dunkel:#262626;--papier:#f4f1ea;--karte:#fff;--leise:#6b6b6b;--linie:#e6e3da;--schrift:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:var(--papier);color:var(--dunkel);font-family:var(--schrift);padding:4rem 1.5rem}
  .pi-grid *{box-sizing:border-box}
  .pi-grid__head{max-width:1080px;margin:0 auto 2.5rem}
  .pi-grid__head h2{font-size:clamp(1.8rem,4vw,2.6rem);letter-spacing:-.02em;margin:0 0 .5rem;font-weight:800}
  .pi-grid__head p{color:var(--leise);font-size:1.1rem;margin:0}
  .pi-grid__list{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1.4rem}
  .pi-card{background:var(--karte);border:1px solid var(--linie);border-radius:.9rem;padding:1.8rem;display:flex;flex-direction:column;gap:.8rem;transition:transform .15s ease,box-shadow .15s ease}
  .pi-card:hover{transform:translateY(-4px);box-shadow:0 12px 30px rgba(38,38,38,.09)}
  .pi-card__icon{width:2.8rem;height:2.8rem;border-radius:.6rem;background:var(--akzent);display:flex;align-items:center;justify-content:center}
  .pi-card__icon svg{width:1.5rem;height:1.5rem;stroke:var(--dunkel);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
  .pi-card h3{margin:0;font-size:1.2rem;font-weight:700}
  .pi-card p{margin:0;color:var(--leise);font-size:.98rem;line-height:1.55;flex:1}
  .pi-card a{color:var(--dunkel);font-weight:600;font-size:.95rem;text-decoration:none;display:inline-flex;align-items:center;gap:.4rem}
  .pi-card a:hover{gap:.7rem}
  .pi-card a svg{width:1rem;height:1rem;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
</style>
<section class="pi-grid">
  <div class="pi-grid__head"><h2>Was wir können</h2><p>Vier Leistungen, ein Ziel: messbare Wirkung.</p></div>
  <div class="pi-grid__list">
    <article class="pi-card"><div class="pi-card__icon"><svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-6"/></svg></div><h3>Mediaplanung</h3><p>Kanäle, Budgets und Timing — abgestimmt auf deine Zielgruppe.</p><a href="#">Mehr <svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a></article>
    <article class="pi-card"><div class="pi-card__icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg></div><h3>Zielgruppen</h3><p>Wir finden die Menschen, die deine Botschaft wirklich brauchen.</p><a href="#">Mehr <svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a></article>
    <article class="pi-card"><div class="pi-card__icon"><svg viewBox="0 0 24 24"><path d="M13 2 3 14h7l-1 8 10-12h-7z"/></svg></div><h3>Kreation</h3><p>Ideen, die auffallen — vom ersten Entwurf bis zum finalen Motiv.</p><a href="#">Mehr <svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a></article>
    <article class="pi-card"><div class="pi-card__icon"><svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/></svg></div><h3>Reporting</h3><p>Klare Zahlen statt Bauchgefühl — nach jeder Kampagne.</p><a href="#">Mehr <svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a></article>
  </div>
</section>
</body></html>`,
    claudePrompt: 'Nutze diesen Baustein als Ausgangspunkt und passe ihn an: Behalte das Karten-Raster, aber mach [Anzahl] Karten daraus. Setze die Überschrift auf „[deine Überschrift]“ und befülle jede Karte mit Titel und einem Satz zu [dein Thema, z. B. deine Leistungen]. Die Icons darfst du passend austauschen. Farben nur ändern, wenn nötig, über die CSS-Variablen oben.',
    seedKopien: 28,
    seedRating: { schnitt: 4.6, anzahl: 9 }
  },

  /* ============================================================ *
   * 3 · BILD-TEXT-SPLIT                                          *
   * ============================================================ */
  {
    id: 'bild-text-split',
    name: 'Bild-Text-Split',
    kategorie: 'layout',
    leuchtturm: false,
    schwierigkeit: 'einfach',
    beschreibung: 'Zwei Spalten nebeneinander: links eine Bildfläche (hier als anpassbare Inline-Grafik), rechts Überschrift, Fließtext, Häkchen-Liste und Button. Auf dem Handy stapeln sich beide. Löst den erklärenden Abschnitt „zeigen und erklären“.',
    einsatz: 'Vorstellung eines Angebots oder Tools auf einer Landingpage, wo ein Screenshot oder eine Grafik neben dem Text stehen soll.',
    tags: ['bild', 'text', 'split', 'zweispaltig', 'feature', 'abschnitt', 'illustration', 'responsive'],
    code: `<style>
  .pi-split {
    --akzent:  #ffe05e;
    --dunkel:  #262626;
    --papier:  #f1f1ec;
    --leise:   #6b6b6b;
    --schrift: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: var(--papier); color: var(--dunkel); font-family: var(--schrift);
    padding: 4rem 1.5rem;
  }
  .pi-split * { box-sizing: border-box; }
  .pi-split__row { max-width:1000px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:3rem; align-items:center; }
  /* Reihenfolge tauschen: dem Media-Block "order:2" geben, um Bild nach rechts zu holen */
  .pi-split__media { aspect-ratio:4/3; border-radius:1rem; overflow:hidden; background:var(--dunkel); }
  .pi-split__media svg { width:100%; height:100%; display:block; }
  .pi-split__body h2 { font-size:clamp(1.6rem,3.5vw,2.3rem); letter-spacing:-.02em; margin:0 0 1rem; font-weight:800; }
  .pi-split__body p { color:var(--leise); line-height:1.6; font-size:1.05rem; margin:0 0 1.2rem; }
  .pi-split__body ul { list-style:none; padding:0; margin:0 0 1.6rem; display:grid; gap:.6rem; }
  .pi-split__body li { display:flex; gap:.6rem; align-items:center; font-size:1rem; }
  .pi-split__body li svg { width:1.3rem; height:1.3rem; flex:none; }
  .pi-split__btn { font:inherit; font-weight:600; font-size:1rem; padding:.85rem 1.6rem; border-radius:.5rem; border:2px solid var(--dunkel); background:var(--dunkel); color:#fff; cursor:pointer; text-decoration:none; }
  .pi-split__btn:hover { background:var(--akzent); color:var(--dunkel); border-color:var(--akzent); }
  @media (max-width:640px) { .pi-split__row { grid-template-columns:1fr; gap:1.8rem; } }
</style>

<section class="pi-split">
  <div class="pi-split__row">
    <div class="pi-split__media">
      <!-- Platzhalter-Grafik: durch <img src="..."> ersetzen oder Formen/Farben anpassen -->
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Platzhalter-Illustration">
        <rect width="400" height="300" fill="#262626"/>
        <circle cx="300" cy="95" r="72" fill="#ffe05e"/>
        <rect x="40" y="58" width="92" height="92" rx="18" fill="none" stroke="#ffe05e" stroke-width="6"/>
        <rect x="40" y="176" width="200" height="18" rx="9" fill="#f1f1ec" opacity=".9"/>
        <rect x="40" y="210" width="130" height="18" rx="9" fill="#f1f1ec" opacity=".5"/>
      </svg>
    </div>
    <div class="pi-split__body">
      <h2>Ein Dashboard, das alle verstehen</h2>
      <p>Schluss mit verstreuten Tabellen. Alle Kampagnen-Kennzahlen an einem Ort — live, klar und ohne Excel-Formeln.</p>
      <ul>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Alle KPIs auf einen Blick</li>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Automatisch aktualisiert</li>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Teilbar per Link</li>
      </ul>
      <a href="#" class="pi-split__btn">Demo ansehen</a>
    </div>
  </div>
</section>`,
    srcdoc: `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0}</style></head><body>
<style>
  .pi-split{--akzent:#ffe05e;--dunkel:#262626;--papier:#f1f1ec;--leise:#6b6b6b;--schrift:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:var(--papier);color:var(--dunkel);font-family:var(--schrift);padding:4rem 1.5rem}
  .pi-split *{box-sizing:border-box}
  .pi-split__row{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center}
  .pi-split__media{aspect-ratio:4/3;border-radius:1rem;overflow:hidden;background:var(--dunkel)}
  .pi-split__media svg{width:100%;height:100%;display:block}
  .pi-split__body h2{font-size:clamp(1.6rem,3.5vw,2.3rem);letter-spacing:-.02em;margin:0 0 1rem;font-weight:800}
  .pi-split__body p{color:var(--leise);line-height:1.6;font-size:1.05rem;margin:0 0 1.2rem}
  .pi-split__body ul{list-style:none;padding:0;margin:0 0 1.6rem;display:grid;gap:.6rem}
  .pi-split__body li{display:flex;gap:.6rem;align-items:center;font-size:1rem}
  .pi-split__body li svg{width:1.3rem;height:1.3rem;flex:none}
  .pi-split__btn{font:inherit;font-weight:600;font-size:1rem;padding:.85rem 1.6rem;border-radius:.5rem;border:2px solid var(--dunkel);background:var(--dunkel);color:#fff;cursor:pointer;text-decoration:none}
  .pi-split__btn:hover{background:var(--akzent);color:var(--dunkel);border-color:var(--akzent)}
  @media (max-width:640px){.pi-split__row{grid-template-columns:1fr;gap:1.8rem}}
</style>
<section class="pi-split">
  <div class="pi-split__row">
    <div class="pi-split__media">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Platzhalter-Illustration"><rect width="400" height="300" fill="#262626"/><circle cx="300" cy="95" r="72" fill="#ffe05e"/><rect x="40" y="58" width="92" height="92" rx="18" fill="none" stroke="#ffe05e" stroke-width="6"/><rect x="40" y="176" width="200" height="18" rx="9" fill="#f1f1ec" opacity=".9"/><rect x="40" y="210" width="130" height="18" rx="9" fill="#f1f1ec" opacity=".5"/></svg>
    </div>
    <div class="pi-split__body">
      <h2>Ein Dashboard, das alle verstehen</h2>
      <p>Schluss mit verstreuten Tabellen. Alle Kampagnen-Kennzahlen an einem Ort — live, klar und ohne Excel-Formeln.</p>
      <ul>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Alle KPIs auf einen Blick</li>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Automatisch aktualisiert</li>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Teilbar per Link</li>
      </ul>
      <a href="#" class="pi-split__btn">Demo ansehen</a>
    </div>
  </div>
</section>
</body></html>`,
    claudePrompt: 'Nutze diesen Baustein als Ausgangspunkt und passe ihn an: Behalte den Zwei-Spalten-Aufbau (Bild links, Text rechts). Setze die Überschrift auf „[deine Überschrift]“, den Absatz auf [worum es geht] und ersetze die drei Häkchen-Punkte durch [deine drei Vorteile]. Wenn du ein echtes Bild hast, tausche die Platzhalter-Grafik gegen ein <img>-Tag aus. Für die Reihenfolge Bild rechts statt links gib dem Media-Block order:2.',
    seedKopien: 19,
    seedRating: { schnitt: 4.4, anzahl: 7 }
  },

  /* ============================================================ *
   * 4 · FOOTER                                                   *
   * ============================================================ */
  {
    id: 'footer',
    name: 'Footer',
    kategorie: 'navigation',
    leuchtturm: false,
    schwierigkeit: 'einfach',
    beschreibung: 'Der Seitenabschluss: dunkler Fuß mit Logo, kurzem Claim, mehreren Linkspalten und einer Zeile mit Copyright, Rechtslinks und kleinen Icons. Löst „unten sauber abschließen und Wichtiges verlinken“.',
    einsatz: 'Abschluss jeder Website oder Landingpage — Impressum, Datenschutz und Kontaktwege gehören hier gebündelt hin.',
    tags: ['footer', 'fuß', 'navigation', 'impressum', 'links', 'kontakt', 'abschluss', 'copyright'],
    code: `<style>
  .pi-foot {
    --akzent:  #ffe05e;
    --dunkel:  #262626;   /* Footer-Hintergrund */
    --hell:    #f1f1ec;
    --leise:   #a3a19a;   /* zurückgenommene Links */
    --linie:   rgba(255,255,255,.12);
    --schrift: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: var(--dunkel); color: var(--hell); font-family: var(--schrift);
    padding: 3.5rem 1.5rem 1.8rem;
  }
  .pi-foot * { box-sizing: border-box; }
  .pi-foot__top { max-width:1080px; margin:0 auto; display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:2rem; padding-bottom:2.5rem; border-bottom:1px solid var(--linie); }
  .pi-foot__brand-logo { font-weight:800; font-size:1.35rem; letter-spacing:-.02em; margin:0 0 .8rem; }
  .pi-foot__brand-logo span { background:var(--akzent); color:var(--dunkel); padding:.1em .35em; border-radius:.25rem; }
  .pi-foot__brand p { color:var(--leise); font-size:.95rem; line-height:1.55; margin:0; max-width:26ch; }
  .pi-foot__col h4 { font-size:.8rem; text-transform:uppercase; letter-spacing:.1em; color:var(--akzent); margin:0 0 1rem; }
  .pi-foot__col ul { list-style:none; padding:0; margin:0; display:grid; gap:.55rem; }
  .pi-foot__col a { color:var(--leise); text-decoration:none; font-size:.95rem; }
  .pi-foot__col a:hover { color:var(--hell); }
  .pi-foot__bar { max-width:1080px; margin:1.8rem auto 0; display:flex; align-items:center; justify-content:space-between; gap:1rem; flex-wrap:wrap; }
  .pi-foot__bar small { color:var(--leise); font-size:.85rem; }
  .pi-foot__legal { display:flex; gap:1.2rem; }
  .pi-foot__legal a { color:var(--leise); text-decoration:none; font-size:.85rem; }
  .pi-foot__legal a:hover { color:var(--hell); }
  .pi-foot__social { display:flex; gap:.7rem; }
  .pi-foot__social a { width:2rem; height:2rem; border-radius:50%; border:1px solid var(--linie); display:flex; align-items:center; justify-content:center; }
  .pi-foot__social a:hover { background:var(--akzent); border-color:var(--akzent); }
  .pi-foot__social svg { width:1.05rem; height:1.05rem; stroke:var(--hell); fill:none; stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round; }
  .pi-foot__social a:hover svg { stroke:var(--dunkel); }
  @media (max-width:640px) { .pi-foot__top { grid-template-columns:1fr 1fr; } }
</style>

<footer class="pi-foot">
  <div class="pi-foot__top">
    <div class="pi-foot__brand">
      <div class="pi-foot__brand-logo"><span>pi</span>lot</div>
      <p>Media-Agentur für Kampagnen, die messbar wirken.</p>
    </div>
    <!-- Spalte kopieren, um weitere Rubriken zu ergänzen -->
    <div class="pi-foot__col"><h4>Agentur</h4><ul><li><a href="#">Über uns</a></li><li><a href="#">Team</a></li><li><a href="#">Karriere</a></li></ul></div>
    <div class="pi-foot__col"><h4>Leistungen</h4><ul><li><a href="#">Mediaplanung</a></li><li><a href="#">Kreation</a></li><li><a href="#">Reporting</a></li></ul></div>
    <div class="pi-foot__col"><h4>Kontakt</h4><ul><li><a href="#">Anfrage</a></li><li><a href="#">Standorte</a></li><li><a href="#">Presse</a></li></ul></div>
  </div>
  <div class="pi-foot__bar">
    <small>&copy; 2026 pilot — Alle Rechte vorbehalten.</small>
    <div class="pi-foot__legal"><a href="#">Impressum</a><a href="#">Datenschutz</a></div>
    <div class="pi-foot__social">
      <a href="#" aria-label="E-Mail"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></a>
      <a href="#" aria-label="Website"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18"/></svg></a>
    </div>
  </div>
</footer>`,
    srcdoc: `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0}</style></head><body>
<style>
  .pi-foot{--akzent:#ffe05e;--dunkel:#262626;--hell:#f1f1ec;--leise:#a3a19a;--linie:rgba(255,255,255,.12);--schrift:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:var(--dunkel);color:var(--hell);font-family:var(--schrift);padding:3.5rem 1.5rem 1.8rem}
  .pi-foot *{box-sizing:border-box}
  .pi-foot__top{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:2rem;padding-bottom:2.5rem;border-bottom:1px solid var(--linie)}
  .pi-foot__brand-logo{font-weight:800;font-size:1.35rem;letter-spacing:-.02em;margin:0 0 .8rem}
  .pi-foot__brand-logo span{background:var(--akzent);color:var(--dunkel);padding:.1em .35em;border-radius:.25rem}
  .pi-foot__brand p{color:var(--leise);font-size:.95rem;line-height:1.55;margin:0;max-width:26ch}
  .pi-foot__col h4{font-size:.8rem;text-transform:uppercase;letter-spacing:.1em;color:var(--akzent);margin:0 0 1rem}
  .pi-foot__col ul{list-style:none;padding:0;margin:0;display:grid;gap:.55rem}
  .pi-foot__col a{color:var(--leise);text-decoration:none;font-size:.95rem}
  .pi-foot__col a:hover{color:var(--hell)}
  .pi-foot__bar{max-width:1080px;margin:1.8rem auto 0;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
  .pi-foot__bar small{color:var(--leise);font-size:.85rem}
  .pi-foot__legal{display:flex;gap:1.2rem}
  .pi-foot__legal a{color:var(--leise);text-decoration:none;font-size:.85rem}
  .pi-foot__legal a:hover{color:var(--hell)}
  .pi-foot__social{display:flex;gap:.7rem}
  .pi-foot__social a{width:2rem;height:2rem;border-radius:50%;border:1px solid var(--linie);display:flex;align-items:center;justify-content:center}
  .pi-foot__social a:hover{background:var(--akzent);border-color:var(--akzent)}
  .pi-foot__social svg{width:1.05rem;height:1.05rem;stroke:var(--hell);fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
  .pi-foot__social a:hover svg{stroke:var(--dunkel)}
  @media (max-width:640px){.pi-foot__top{grid-template-columns:1fr 1fr}}
</style>
<footer class="pi-foot">
  <div class="pi-foot__top">
    <div class="pi-foot__brand"><div class="pi-foot__brand-logo"><span>pi</span>lot</div><p>Media-Agentur für Kampagnen, die messbar wirken.</p></div>
    <div class="pi-foot__col"><h4>Agentur</h4><ul><li><a href="#">Über uns</a></li><li><a href="#">Team</a></li><li><a href="#">Karriere</a></li></ul></div>
    <div class="pi-foot__col"><h4>Leistungen</h4><ul><li><a href="#">Mediaplanung</a></li><li><a href="#">Kreation</a></li><li><a href="#">Reporting</a></li></ul></div>
    <div class="pi-foot__col"><h4>Kontakt</h4><ul><li><a href="#">Anfrage</a></li><li><a href="#">Standorte</a></li><li><a href="#">Presse</a></li></ul></div>
  </div>
  <div class="pi-foot__bar">
    <small>&copy; 2026 pilot — Alle Rechte vorbehalten.</small>
    <div class="pi-foot__legal"><a href="#">Impressum</a><a href="#">Datenschutz</a></div>
    <div class="pi-foot__social">
      <a href="#" aria-label="E-Mail"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></a>
      <a href="#" aria-label="Website"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18"/></svg></a>
    </div>
  </div>
</footer>
</body></html>`,
    claudePrompt: 'Nutze diesen Baustein als Ausgangspunkt und passe ihn an: Behalte den dunklen Footer mit Linkspalten und der unteren Zeile. Ersetze Logo und Claim durch „[dein Projekt]“ und [dein Claim], benenne die drei Linkspalten in [deine Rubriken] um und passe die Links an. Impressum und Datenschutz bitte auf deine echten Seiten verlinken. Farben nur bei Bedarf über die CSS-Variablen ändern.',
    seedKopien: 22,
    seedRating: { schnitt: 4.5, anzahl: 8 }
  },

  /* ============================================================ *
   * 5 · CTA-BAND                                                 *
   * ============================================================ */
  {
    id: 'cta-band',
    name: 'CTA-Band',
    kategorie: 'inhalt',
    leuchtturm: false,
    schwierigkeit: 'einfach',
    beschreibung: 'Ein breites, dunkles Aufforderungs-Band mit kräftiger Aussage und einem Button. Setzt einen klaren Handlungsimpuls zwischen zwei Abschnitten. Löst „jetzt soll die Besucherin etwas tun“.',
    einsatz: 'Trennt Abschnitte auf einer Landingpage und schiebt zur nächsten Aktion — etwa „Beratungstermin anfragen“ nach der Leistungsübersicht.',
    tags: ['cta', 'call to action', 'band', 'aufforderung', 'button', 'aktion', 'abschluss'],
    code: `<style>
  .pi-cta {
    --akzent:  #ffe05e;   /* Button & Akzentwort */
    --dunkel:  #262626;   /* Band-Hintergrund */
    --hell:    #ffffff;
    --schrift: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: var(--dunkel); color: var(--hell); font-family: var(--schrift);
    padding: 4rem 1.5rem;
  }
  .pi-cta * { box-sizing: border-box; }
  .pi-cta__inner { max-width:900px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:2rem; flex-wrap:wrap; }
  .pi-cta__text { flex:1; min-width:260px; }
  .pi-cta__text h2 { font-size:clamp(1.6rem,4vw,2.4rem); letter-spacing:-.02em; line-height:1.1; margin:0 0 .6rem; font-weight:800; }
  .pi-cta__text h2 mark { background:var(--akzent); color:var(--dunkel); padding:0 .12em; border-radius:.15em; }
  .pi-cta__text p { margin:0; color:rgba(255,255,255,.7); font-size:1.05rem; }
  .pi-cta__btn { font:inherit; font-weight:700; font-size:1.05rem; padding:1rem 2rem; border-radius:.6rem; border:none; background:var(--akzent); color:var(--dunkel); cursor:pointer; text-decoration:none; white-space:nowrap; transition:transform .15s ease; }
  .pi-cta__btn:hover { transform:translateY(-2px); }
</style>

<section class="pi-cta">
  <div class="pi-cta__inner">
    <div class="pi-cta__text">
      <!-- Aussage & Akzentwort anpassen -->
      <h2>Bereit für die <mark>nächste Kampagne</mark>?</h2>
      <p>Wir melden uns innerhalb eines Werktags.</p>
    </div>
    <a href="#" class="pi-cta__btn">Beratung anfragen</a>
  </div>
</section>`,
    srcdoc: `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0}</style></head><body>
<style>
  .pi-cta{--akzent:#ffe05e;--dunkel:#262626;--hell:#fff;--schrift:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:var(--dunkel);color:var(--hell);font-family:var(--schrift);padding:4rem 1.5rem}
  .pi-cta *{box-sizing:border-box}
  .pi-cta__inner{max-width:900px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:2rem;flex-wrap:wrap}
  .pi-cta__text{flex:1;min-width:260px}
  .pi-cta__text h2{font-size:clamp(1.6rem,4vw,2.4rem);letter-spacing:-.02em;line-height:1.1;margin:0 0 .6rem;font-weight:800}
  .pi-cta__text h2 mark{background:var(--akzent);color:var(--dunkel);padding:0 .12em;border-radius:.15em}
  .pi-cta__text p{margin:0;color:rgba(255,255,255,.7);font-size:1.05rem}
  .pi-cta__btn{font:inherit;font-weight:700;font-size:1.05rem;padding:1rem 2rem;border-radius:.6rem;border:none;background:var(--akzent);color:var(--dunkel);cursor:pointer;text-decoration:none;white-space:nowrap;transition:transform .15s ease}
  .pi-cta__btn:hover{transform:translateY(-2px)}
</style>
<section class="pi-cta">
  <div class="pi-cta__inner">
    <div class="pi-cta__text"><h2>Bereit für die <mark>nächste Kampagne</mark>?</h2><p>Wir melden uns innerhalb eines Werktags.</p></div>
    <a href="#" class="pi-cta__btn">Beratung anfragen</a>
  </div>
</section>
</body></html>`,
    claudePrompt: 'Nutze diesen Baustein als Ausgangspunkt und passe ihn an: Behalte das dunkle Band mit Text links und Button rechts. Setze die Aussage auf „[deine Frage/Aussage]“ mit dem hervorgehobenen Wort „[Akzentwort]“, den kleinen Zusatz auf [Detail] und den Button auf „[Button-Text]“. Verlinke den Button auf [dein Ziel, z. B. dein Kontaktformular].',
    seedKopien: 17,
    seedRating: { schnitt: 4.3, anzahl: 6 }
  },

  /* ============================================================ *
   * 6 · FEATURE-LISTE                                            *
   * ============================================================ */
  {
    id: 'feature-liste',
    name: 'Feature-Liste',
    kategorie: 'inhalt',
    leuchtturm: false,
    schwierigkeit: 'einfach',
    beschreibung: 'Ein flaches Raster aus Merkmalen — je Eintrag ein Icon, ein Titel und ein Satz. Ohne Kartenrahmen, ruhiger als das Karten-Grid. Löst „mehrere Vorteile knapp aufzählen“.',
    einsatz: 'Vorteile eines Angebots oder Funktionen eines internen Tools kompakt auflisten, etwa unter dem Hero.',
    tags: ['features', 'liste', 'vorteile', 'merkmale', 'icons', 'aufzählung', 'raster'],
    code: `<style>
  .pi-feat {
    --akzent:  #ffe05e;
    --dunkel:  #262626;
    --papier:  #f1f1ec;
    --leise:   #6b6b6b;
    --schrift: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: var(--papier); color: var(--dunkel); font-family: var(--schrift);
    padding: 4rem 1.5rem;
  }
  .pi-feat * { box-sizing: border-box; }
  .pi-feat__head { max-width:900px; margin:0 auto 2.8rem; text-align:center; }
  .pi-feat__head h2 { font-size:clamp(1.8rem,4vw,2.6rem); letter-spacing:-.02em; margin:0 0 .5rem; font-weight:800; }
  .pi-feat__head p { color:var(--leise); font-size:1.1rem; margin:0; }
  .pi-feat__list { max-width:900px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:2rem 2.5rem; }
  .pi-feat__item { display:flex; gap:1rem; align-items:flex-start; }
  .pi-feat__ic { width:2.6rem; height:2.6rem; flex:none; border-radius:.6rem; background:var(--dunkel); display:flex; align-items:center; justify-content:center; }
  .pi-feat__ic svg { width:1.4rem; height:1.4rem; stroke:var(--akzent); fill:none; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
  .pi-feat__item h3 { margin:.1rem 0 .35rem; font-size:1.1rem; font-weight:700; }
  .pi-feat__item p { margin:0; color:var(--leise); font-size:.98rem; line-height:1.55; }
</style>

<section class="pi-feat">
  <div class="pi-feat__head">
    <h2>Warum pilot</h2>
    <p>Was du bei jeder Zusammenarbeit bekommst.</p>
  </div>
  <div class="pi-feat__list">
    <!-- Ein Item kopieren, Icon/Titel/Text anpassen -->
    <div class="pi-feat__item">
      <div class="pi-feat__ic"><svg viewBox="0 0 24 24"><path d="M13 2 3 14h7l-1 8 10-12h-7z"/></svg></div>
      <div><h3>Schnell startklar</h3><p>Vom Briefing zum ersten Plan in wenigen Tagen.</p></div>
    </div>
    <div class="pi-feat__item">
      <div class="pi-feat__ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div>
      <div><h3>Immer aktuell</h3><p>Live-Reporting statt Monatsende-Überraschungen.</p></div>
    </div>
    <div class="pi-feat__item">
      <div class="pi-feat__ic"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></div>
      <div><h3>Nachweisbar wirksam</h3><p>Jede Maßnahme wird gemessen und belegt.</p></div>
    </div>
    <div class="pi-feat__item">
      <div class="pi-feat__ic"><svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-8 0v2"/><circle cx="12" cy="7" r="4"/></svg></div>
      <div><h3>Feste Ansprechpartner</h3><p>Ein Team, das dein Projekt wirklich kennt.</p></div>
    </div>
  </div>
</section>`,
    srcdoc: `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0}</style></head><body>
<style>
  .pi-feat{--akzent:#ffe05e;--dunkel:#262626;--papier:#f1f1ec;--leise:#6b6b6b;--schrift:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:var(--papier);color:var(--dunkel);font-family:var(--schrift);padding:4rem 1.5rem}
  .pi-feat *{box-sizing:border-box}
  .pi-feat__head{max-width:900px;margin:0 auto 2.8rem;text-align:center}
  .pi-feat__head h2{font-size:clamp(1.8rem,4vw,2.6rem);letter-spacing:-.02em;margin:0 0 .5rem;font-weight:800}
  .pi-feat__head p{color:var(--leise);font-size:1.1rem;margin:0}
  .pi-feat__list{max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:2rem 2.5rem}
  .pi-feat__item{display:flex;gap:1rem;align-items:flex-start}
  .pi-feat__ic{width:2.6rem;height:2.6rem;flex:none;border-radius:.6rem;background:var(--dunkel);display:flex;align-items:center;justify-content:center}
  .pi-feat__ic svg{width:1.4rem;height:1.4rem;stroke:var(--akzent);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
  .pi-feat__item h3{margin:.1rem 0 .35rem;font-size:1.1rem;font-weight:700}
  .pi-feat__item p{margin:0;color:var(--leise);font-size:.98rem;line-height:1.55}
</style>
<section class="pi-feat">
  <div class="pi-feat__head"><h2>Warum pilot</h2><p>Was du bei jeder Zusammenarbeit bekommst.</p></div>
  <div class="pi-feat__list">
    <div class="pi-feat__item"><div class="pi-feat__ic"><svg viewBox="0 0 24 24"><path d="M13 2 3 14h7l-1 8 10-12h-7z"/></svg></div><div><h3>Schnell startklar</h3><p>Vom Briefing zum ersten Plan in wenigen Tagen.</p></div></div>
    <div class="pi-feat__item"><div class="pi-feat__ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div><div><h3>Immer aktuell</h3><p>Live-Reporting statt Monatsende-Überraschungen.</p></div></div>
    <div class="pi-feat__item"><div class="pi-feat__ic"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></div><div><h3>Nachweisbar wirksam</h3><p>Jede Maßnahme wird gemessen und belegt.</p></div></div>
    <div class="pi-feat__item"><div class="pi-feat__ic"><svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-8 0v2"/><circle cx="12" cy="7" r="4"/></svg></div><div><h3>Feste Ansprechpartner</h3><p>Ein Team, das dein Projekt wirklich kennt.</p></div></div>
  </div>
</section>
</body></html>`,
    claudePrompt: 'Nutze diesen Baustein als Ausgangspunkt und passe ihn an: Behalte das Icon-Titel-Text-Raster. Setze die Überschrift auf „[deine Überschrift]“ und ersetze die vier Einträge durch [deine Vorteile/Funktionen] mit je einem kurzen Satz. Passende Icons darfst du wählen. Wenn du mehr Einträge brauchst, kopiere einen pi-feat__item-Block.',
    seedKopien: 15,
    seedRating: { schnitt: 4.4, anzahl: 6 }
  },

  /* ============================================================ *
   * 7 · PREIS-/PAKET-KARTEN  — LEUCHTTURM                        *
   * ============================================================ */
  {
    id: 'preis-karten',
    name: 'Preis- und Paket-Karten',
    kategorie: 'inhalt',
    leuchtturm: true,
    schwierigkeit: 'mittel',
    beschreibung: 'Drei Pakete nebeneinander, das mittlere hervorgehoben mit Empfehlungs-Fähnchen. Je Paket Name, Preis, Leistungs-Häkchen und Button. Löst die klassische „welches Paket passt“-Entscheidung.',
    einsatz: 'Leistungspakete einer Agentur transparent zeigen, oder Stufen eines internen Angebots (etwa Support-Level) vergleichbar machen.',
    tags: ['preise', 'pakete', 'tarife', 'pricing', 'vergleich', 'plan', 'empfohlen', 'karten'],
    code: `<style>
  .pi-preis {
    --akzent:  #ffe05e;   /* Hervorhebung des empfohlenen Pakets */
    --dunkel:  #262626;
    --papier:  #f4f1ea;
    --karte:   #ffffff;
    --leise:   #6b6b6b;
    --linie:   #e6e3da;
    --schrift: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: var(--papier); color: var(--dunkel); font-family: var(--schrift);
    padding: 4rem 1.5rem;
  }
  .pi-preis * { box-sizing: border-box; }
  .pi-preis__head { text-align:center; max-width:640px; margin:0 auto 2.8rem; }
  .pi-preis__head h2 { font-size:clamp(1.8rem,4vw,2.6rem); letter-spacing:-.02em; margin:0 0 .5rem; font-weight:800; }
  .pi-preis__head p { color:var(--leise); font-size:1.1rem; margin:0; }
  .pi-preis__row { max-width:1000px; margin:0 auto; display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; align-items:stretch; }
  .pi-plan { background:var(--karte); border:1px solid var(--linie); border-radius:1rem; padding:2rem 1.8rem; display:flex; flex-direction:column; position:relative; }
  /* Hervorgehobenes Paket: Klasse pi-plan--top am mittleren Element */
  .pi-plan--top { border:2px solid var(--dunkel); box-shadow:0 16px 40px rgba(38,38,38,.12); }
  .pi-plan__fahne { position:absolute; top:-.85rem; left:50%; transform:translateX(-50%); background:var(--akzent); color:var(--dunkel); font-size:.72rem; font-weight:700; text-transform:uppercase; letter-spacing:.1em; padding:.35rem .8rem; border-radius:2rem; white-space:nowrap; }
  .pi-plan__name { font-size:1.15rem; font-weight:700; margin:0 0 .4rem; }
  .pi-plan__preis { font-size:2.6rem; font-weight:800; letter-spacing:-.02em; line-height:1; margin:.3rem 0 .2rem; }
  .pi-plan__preis span { font-size:1rem; font-weight:500; color:var(--leise); }
  .pi-plan__hint { color:var(--leise); font-size:.9rem; margin:0 0 1.4rem; }
  .pi-plan__list { list-style:none; padding:0; margin:0 0 1.8rem; display:grid; gap:.7rem; flex:1; }
  .pi-plan__list li { display:flex; gap:.55rem; align-items:flex-start; font-size:.95rem; line-height:1.4; }
  .pi-plan__list svg { width:1.15rem; height:1.15rem; flex:none; margin-top:.1rem; }
  .pi-plan__btn { font:inherit; font-weight:600; font-size:1rem; padding:.85rem 1rem; border-radius:.55rem; border:2px solid var(--dunkel); background:transparent; color:var(--dunkel); cursor:pointer; text-align:center; text-decoration:none; transition:background .15s, color .15s; }
  .pi-plan__btn:hover { background:var(--dunkel); color:#fff; }
  .pi-plan--top .pi-plan__btn { background:var(--dunkel); color:#fff; }
  .pi-plan--top .pi-plan__btn:hover { background:var(--akzent); color:var(--dunkel); border-color:var(--akzent); }
  @media (max-width:760px) { .pi-preis__row { grid-template-columns:1fr; max-width:400px; } }
</style>

<section class="pi-preis">
  <div class="pi-preis__head">
    <h2>Pakete, die mitwachsen</h2>
    <p>Fair kalkuliert, jederzeit wechselbar.</p>
  </div>
  <div class="pi-preis__row">
    <!-- Paket-Karte kopieren; das mittlere trägt die Klasse pi-plan--top -->
    <div class="pi-plan">
      <h3 class="pi-plan__name">Start</h3>
      <div class="pi-plan__preis">990&thinsp;&euro; <span>/ Monat</span></div>
      <p class="pi-plan__hint">Für erste Kampagnen.</p>
      <ul class="pi-plan__list">
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> 1 Kanal</li>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Monats-Reporting</li>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> E-Mail-Support</li>
      </ul>
      <a href="#" class="pi-plan__btn">Auswählen</a>
    </div>
    <div class="pi-plan pi-plan--top">
      <span class="pi-plan__fahne">Empfohlen</span>
      <h3 class="pi-plan__name">Wachstum</h3>
      <div class="pi-plan__preis">2.490&thinsp;&euro; <span>/ Monat</span></div>
      <p class="pi-plan__hint">Für laufende Kampagnen.</p>
      <ul class="pi-plan__list">
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Bis zu 4 Kanäle</li>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Live-Dashboard</li>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Fester Ansprechpartner</li>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Monatliche Strategie</li>
      </ul>
      <a href="#" class="pi-plan__btn">Auswählen</a>
    </div>
    <div class="pi-plan">
      <h3 class="pi-plan__name">Individuell</h3>
      <div class="pi-plan__preis">auf Anfrage</div>
      <p class="pi-plan__hint">Für große Etats.</p>
      <ul class="pi-plan__list">
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Alle Kanäle</li>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Eigenes Team</li>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> SLA nach Wunsch</li>
      </ul>
      <a href="#" class="pi-plan__btn">Kontakt</a>
    </div>
  </div>
</section>`,
    srcdoc: `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0}</style></head><body>
<style>
  .pi-preis{--akzent:#ffe05e;--dunkel:#262626;--papier:#f4f1ea;--karte:#fff;--leise:#6b6b6b;--linie:#e6e3da;--schrift:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:var(--papier);color:var(--dunkel);font-family:var(--schrift);padding:4rem 1.5rem}
  .pi-preis *{box-sizing:border-box}
  .pi-preis__head{text-align:center;max-width:640px;margin:0 auto 2.8rem}
  .pi-preis__head h2{font-size:clamp(1.8rem,4vw,2.6rem);letter-spacing:-.02em;margin:0 0 .5rem;font-weight:800}
  .pi-preis__head p{color:var(--leise);font-size:1.1rem;margin:0}
  .pi-preis__row{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;align-items:stretch}
  .pi-plan{background:var(--karte);border:1px solid var(--linie);border-radius:1rem;padding:2rem 1.8rem;display:flex;flex-direction:column;position:relative}
  .pi-plan--top{border:2px solid var(--dunkel);box-shadow:0 16px 40px rgba(38,38,38,.12)}
  .pi-plan__fahne{position:absolute;top:-.85rem;left:50%;transform:translateX(-50%);background:var(--akzent);color:var(--dunkel);font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;padding:.35rem .8rem;border-radius:2rem;white-space:nowrap}
  .pi-plan__name{font-size:1.15rem;font-weight:700;margin:0 0 .4rem}
  .pi-plan__preis{font-size:2.6rem;font-weight:800;letter-spacing:-.02em;line-height:1;margin:.3rem 0 .2rem}
  .pi-plan__preis span{font-size:1rem;font-weight:500;color:var(--leise)}
  .pi-plan__hint{color:var(--leise);font-size:.9rem;margin:0 0 1.4rem}
  .pi-plan__list{list-style:none;padding:0;margin:0 0 1.8rem;display:grid;gap:.7rem;flex:1}
  .pi-plan__list li{display:flex;gap:.55rem;align-items:flex-start;font-size:.95rem;line-height:1.4}
  .pi-plan__list svg{width:1.15rem;height:1.15rem;flex:none;margin-top:.1rem}
  .pi-plan__btn{font:inherit;font-weight:600;font-size:1rem;padding:.85rem 1rem;border-radius:.55rem;border:2px solid var(--dunkel);background:transparent;color:var(--dunkel);cursor:pointer;text-align:center;text-decoration:none;transition:background .15s,color .15s}
  .pi-plan__btn:hover{background:var(--dunkel);color:#fff}
  .pi-plan--top .pi-plan__btn{background:var(--dunkel);color:#fff}
  .pi-plan--top .pi-plan__btn:hover{background:var(--akzent);color:var(--dunkel);border-color:var(--akzent)}
  @media (max-width:760px){.pi-preis__row{grid-template-columns:1fr;max-width:400px}}
</style>
<section class="pi-preis">
  <div class="pi-preis__head"><h2>Pakete, die mitwachsen</h2><p>Fair kalkuliert, jederzeit wechselbar.</p></div>
  <div class="pi-preis__row">
    <div class="pi-plan">
      <h3 class="pi-plan__name">Start</h3>
      <div class="pi-plan__preis">990&thinsp;&euro; <span>/ Monat</span></div>
      <p class="pi-plan__hint">Für erste Kampagnen.</p>
      <ul class="pi-plan__list">
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> 1 Kanal</li>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Monats-Reporting</li>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> E-Mail-Support</li>
      </ul>
      <a href="#" class="pi-plan__btn">Auswählen</a>
    </div>
    <div class="pi-plan pi-plan--top">
      <span class="pi-plan__fahne">Empfohlen</span>
      <h3 class="pi-plan__name">Wachstum</h3>
      <div class="pi-plan__preis">2.490&thinsp;&euro; <span>/ Monat</span></div>
      <p class="pi-plan__hint">Für laufende Kampagnen.</p>
      <ul class="pi-plan__list">
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Bis zu 4 Kanäle</li>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Live-Dashboard</li>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Fester Ansprechpartner</li>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Monatliche Strategie</li>
      </ul>
      <a href="#" class="pi-plan__btn">Auswählen</a>
    </div>
    <div class="pi-plan">
      <h3 class="pi-plan__name">Individuell</h3>
      <div class="pi-plan__preis">auf Anfrage</div>
      <p class="pi-plan__hint">Für große Etats.</p>
      <ul class="pi-plan__list">
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Alle Kanäle</li>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Eigenes Team</li>
        <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffe05e"/><path d="m8 12 3 3 5-6" fill="none" stroke="#262626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> SLA nach Wunsch</li>
      </ul>
      <a href="#" class="pi-plan__btn">Kontakt</a>
    </div>
  </div>
</section>
</body></html>`,
    claudePrompt: 'Nutze diesen Baustein als Ausgangspunkt und passe ihn an: Behalte die drei Pakete und die Hervorhebung des mittleren (Klasse pi-plan--top mit Empfohlen-Fähnchen). Setze Paketnamen auf [deine Namen], Preise auf [deine Preise] und ersetze die Häkchen-Punkte durch [deine Leistungen je Paket]. Wenn du vier Pakete brauchst, kopiere eine pi-plan-Karte und stell die Spaltenzahl in .pi-preis__row auf repeat(4,1fr).',
    seedKopien: 26,
    seedRating: { schnitt: 4.7, anzahl: 10 }
  },

  /* ============================================================ *
   * 8 · TESTIMONIAL / ZITAT                                      *
   * ============================================================ */
  {
    id: 'testimonial-zitat',
    name: 'Testimonial / Zitat',
    kategorie: 'inhalt',
    leuchtturm: false,
    schwierigkeit: 'einfach',
    beschreibung: 'Ein hervorgehobenes Kundenzitat mit großem Anführungszeichen, Name, Rolle und Monogramm-Avatar. Löst „Vertrauen durch eine echte Stimme aufbauen“.',
    einsatz: 'Kundenstimme auf einer Landingpage oder eine Referenz-Aussage im Angebot — Beispieltext, kein echtes Kundenmaterial.',
    tags: ['testimonial', 'zitat', 'kundenstimme', 'referenz', 'vertrauen', 'quote', 'avatar'],
    code: `<style>
  .pi-quote {
    --akzent:  #ffe05e;   /* großes Anführungszeichen & Avatar */
    --dunkel:  #262626;
    --papier:  #f1f1ec;
    --leise:   #6b6b6b;
    --schrift: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: var(--papier); color: var(--dunkel); font-family: var(--schrift);
    padding: 4.5rem 1.5rem;
  }
  .pi-quote * { box-sizing: border-box; }
  .pi-quote__card { max-width:720px; margin:0 auto; text-align:center; position:relative; }
  .pi-quote__mark { font-size:5rem; line-height:.6; color:var(--akzent); font-family:Georgia, "Times New Roman", serif; display:block; margin-bottom:.5rem; }
  .pi-quote__text { font-size:clamp(1.3rem,3vw,1.8rem); line-height:1.4; font-weight:500; letter-spacing:-.01em; margin:0 0 2rem; }
  .pi-quote__who { display:flex; align-items:center; justify-content:center; gap:.9rem; }
  .pi-quote__avatar { width:3rem; height:3rem; border-radius:50%; background:var(--akzent); color:var(--dunkel); display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1.1rem; }
  .pi-quote__name { text-align:left; }
  .pi-quote__name strong { display:block; font-size:1rem; }
  .pi-quote__name span { color:var(--leise); font-size:.9rem; }
</style>

<section class="pi-quote">
  <figure class="pi-quote__card">
    <span class="pi-quote__mark" aria-hidden="true">&ldquo;</span>
    <!-- Zitat, Name, Rolle und Initialen anpassen -->
    <blockquote class="pi-quote__text">Zum ersten Mal sehen wir sofort, welche Kampagne wirklich liefert. Das hat unsere Abstimmungen radikal verkürzt.</blockquote>
    <figcaption class="pi-quote__who">
      <div class="pi-quote__avatar">MK</div>
      <div class="pi-quote__name"><strong>Maria Kern</strong><span>Marketingleitung, Beispiel GmbH</span></div>
    </figcaption>
  </figure>
</section>`,
    srcdoc: `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0}</style></head><body>
<style>
  .pi-quote{--akzent:#ffe05e;--dunkel:#262626;--papier:#f1f1ec;--leise:#6b6b6b;--schrift:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:var(--papier);color:var(--dunkel);font-family:var(--schrift);padding:4.5rem 1.5rem}
  .pi-quote *{box-sizing:border-box}
  .pi-quote__card{max-width:720px;margin:0 auto;text-align:center;position:relative}
  .pi-quote__mark{font-size:5rem;line-height:.6;color:var(--akzent);font-family:Georgia,"Times New Roman",serif;display:block;margin-bottom:.5rem}
  .pi-quote__text{font-size:clamp(1.3rem,3vw,1.8rem);line-height:1.4;font-weight:500;letter-spacing:-.01em;margin:0 0 2rem}
  .pi-quote__who{display:flex;align-items:center;justify-content:center;gap:.9rem}
  .pi-quote__avatar{width:3rem;height:3rem;border-radius:50%;background:var(--akzent);color:var(--dunkel);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.1rem}
  .pi-quote__name{text-align:left}
  .pi-quote__name strong{display:block;font-size:1rem}
  .pi-quote__name span{color:var(--leise);font-size:.9rem}
</style>
<section class="pi-quote">
  <figure class="pi-quote__card">
    <span class="pi-quote__mark" aria-hidden="true">&ldquo;</span>
    <blockquote class="pi-quote__text">Zum ersten Mal sehen wir sofort, welche Kampagne wirklich liefert. Das hat unsere Abstimmungen radikal verkürzt.</blockquote>
    <figcaption class="pi-quote__who">
      <div class="pi-quote__avatar">MK</div>
      <div class="pi-quote__name"><strong>Maria Kern</strong><span>Marketingleitung, Beispiel GmbH</span></div>
    </figcaption>
  </figure>
</section>
</body></html>`,
    claudePrompt: 'Nutze diesen Baustein als Ausgangspunkt und passe ihn an: Behalte das zentrierte Zitat mit Avatar. Setze den Zitattext auf „[dein Zitat]“, den Namen auf [Name], die Rolle auf [Position, Firma] und die zwei Initialen im Avatar entsprechend. Wichtig: Nur echte, freigegebene Aussagen verwenden — dieser Beispieltext ist erfunden.',
    seedKopien: 12,
    seedRating: { schnitt: 4.2, anzahl: 5 }
  },

  /* ============================================================ *
   * 9 · KONTAKTFORMULAR  — LEUCHTTURM                            *
   * ============================================================ */
  {
    id: 'kontaktformular',
    name: 'Kontaktformular-Optik',
    kategorie: 'formular',
    leuchtturm: true,
    schwierigkeit: 'mittel',
    beschreibung: 'Ein vollständig gestaltetes Kontaktformular mit Info-Spalte und Feldern (Name, E-Mail, Betreff-Auswahl, Nachricht, Einwilligung). Sauberer Fokus-Zustand, kein echtes Versenden. Löst „professionell aussehende Anfrage-Strecke“.',
    einsatz: 'Kontaktseite einer Website oder Anfrage-Maske eines internen Tools. Hinweis: Der Versand muss separat angebunden werden.',
    tags: ['formular', 'kontakt', 'eingabe', 'felder', 'input', 'anfrage', 'nachricht', 'einwilligung'],
    code: `<style>
  .pi-form {
    --akzent:  #ffe05e;   /* Fokus-Rahmen & Button */
    --dunkel:  #262626;
    --papier:  #f4f1ea;
    --karte:   #ffffff;
    --leise:   #6b6b6b;
    --linie:   #dcd8cd;
    --schrift: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: var(--papier); color: var(--dunkel); font-family: var(--schrift);
    padding: 4rem 1.5rem;
  }
  .pi-form * { box-sizing: border-box; }
  .pi-form__wrap { max-width:900px; margin:0 auto; background:var(--karte); border:1px solid var(--linie); border-radius:1rem; overflow:hidden; display:grid; grid-template-columns:1fr 1.4fr; }
  .pi-form__aside { background:var(--dunkel); color:#fff; padding:2.5rem 2rem; }
  .pi-form__aside h2 { font-size:1.6rem; letter-spacing:-.02em; margin:0 0 .6rem; font-weight:800; }
  .pi-form__aside p { color:rgba(255,255,255,.7); font-size:.98rem; line-height:1.55; margin:0 0 2rem; }
  .pi-form__contact { list-style:none; padding:0; margin:0; display:grid; gap:1rem; }
  .pi-form__contact li { display:flex; gap:.7rem; align-items:center; font-size:.95rem; }
  .pi-form__contact svg { width:1.2rem; height:1.2rem; stroke:var(--akzent); fill:none; stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round; flex:none; }
  .pi-form__fields { padding:2.5rem 2rem; display:grid; gap:1.1rem; }
  .pi-form__field { display:grid; gap:.35rem; }
  .pi-form__field label { font-size:.85rem; font-weight:600; }
  .pi-form__field input, .pi-form__field select, .pi-form__field textarea { font:inherit; font-size:.95rem; padding:.7rem .85rem; border:1.5px solid var(--linie); border-radius:.5rem; background:#fff; color:var(--dunkel); width:100%; }
  .pi-form__field textarea { resize:vertical; min-height:110px; }
  .pi-form__field input:focus, .pi-form__field select:focus, .pi-form__field textarea:focus { outline:none; border-color:var(--dunkel); box-shadow:0 0 0 3px var(--akzent); }
  .pi-form__row { display:grid; grid-template-columns:1fr 1fr; gap:1.1rem; }
  .pi-form__check { display:flex; gap:.55rem; align-items:flex-start; font-size:.85rem; color:var(--leise); line-height:1.4; }
  .pi-form__check input { margin-top:.15rem; accent-color:var(--dunkel); }
  .pi-form__btn { font:inherit; font-weight:700; font-size:1rem; padding:.9rem 1rem; border-radius:.55rem; border:none; background:var(--dunkel); color:#fff; cursor:pointer; transition:background .15s, color .15s; }
  .pi-form__btn:hover { background:var(--akzent); color:var(--dunkel); }
  @media (max-width:680px) { .pi-form__wrap { grid-template-columns:1fr; } .pi-form__row { grid-template-columns:1fr; } }
</style>

<section class="pi-form">
  <!-- Der Absende-Button ist bewusst type="button": Versand muss separat angebunden werden. -->
  <form class="pi-form__wrap" onsubmit="return false">
    <aside class="pi-form__aside">
      <h2>Sag uns, was ansteht</h2>
      <p>Wir melden uns innerhalb eines Werktags mit einer ersten Einschätzung.</p>
      <ul class="pi-form__contact">
        <li><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg> kontakt@beispiel.de</li>
        <li><svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19 19 0 0 1-8.3-3 19 19 0 0 1-5.8-5.8 19 19 0 0 1-3-8.3A2 2 0 0 1 4.7 3h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.5 10.9a16 16 0 0 0 5 5l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg> 040 / 123 456</li>
        <li><svg viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg> Hamburg</li>
      </ul>
    </aside>
    <div class="pi-form__fields">
      <div class="pi-form__row">
        <div class="pi-form__field"><label for="pf-name">Name</label><input id="pf-name" type="text" placeholder="Vor- und Nachname"></div>
        <div class="pi-form__field"><label for="pf-mail">E-Mail</label><input id="pf-mail" type="email" placeholder="name@firma.de"></div>
      </div>
      <div class="pi-form__field">
        <label for="pf-thema">Betreff</label>
        <select id="pf-thema">
          <option>Neue Kampagne</option>
          <option>Laufendes Projekt</option>
          <option>Allgemeine Frage</option>
        </select>
      </div>
      <div class="pi-form__field"><label for="pf-msg">Nachricht</label><textarea id="pf-msg" placeholder="Worum geht es?"></textarea></div>
      <label class="pi-form__check"><input type="checkbox"> Ich bin mit der Verarbeitung meiner Daten gemäß Datenschutzerklärung einverstanden.</label>
      <button type="button" class="pi-form__btn">Anfrage senden</button>
    </div>
  </form>
</section>`,
    srcdoc: `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0}</style></head><body>
<style>
  .pi-form{--akzent:#ffe05e;--dunkel:#262626;--papier:#f4f1ea;--karte:#fff;--leise:#6b6b6b;--linie:#dcd8cd;--schrift:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:var(--papier);color:var(--dunkel);font-family:var(--schrift);padding:4rem 1.5rem}
  .pi-form *{box-sizing:border-box}
  .pi-form__wrap{max-width:900px;margin:0 auto;background:var(--karte);border:1px solid var(--linie);border-radius:1rem;overflow:hidden;display:grid;grid-template-columns:1fr 1.4fr}
  .pi-form__aside{background:var(--dunkel);color:#fff;padding:2.5rem 2rem}
  .pi-form__aside h2{font-size:1.6rem;letter-spacing:-.02em;margin:0 0 .6rem;font-weight:800}
  .pi-form__aside p{color:rgba(255,255,255,.7);font-size:.98rem;line-height:1.55;margin:0 0 2rem}
  .pi-form__contact{list-style:none;padding:0;margin:0;display:grid;gap:1rem}
  .pi-form__contact li{display:flex;gap:.7rem;align-items:center;font-size:.95rem}
  .pi-form__contact svg{width:1.2rem;height:1.2rem;stroke:var(--akzent);fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none}
  .pi-form__fields{padding:2.5rem 2rem;display:grid;gap:1.1rem}
  .pi-form__field{display:grid;gap:.35rem}
  .pi-form__field label{font-size:.85rem;font-weight:600}
  .pi-form__field input,.pi-form__field select,.pi-form__field textarea{font:inherit;font-size:.95rem;padding:.7rem .85rem;border:1.5px solid var(--linie);border-radius:.5rem;background:#fff;color:var(--dunkel);width:100%}
  .pi-form__field textarea{resize:vertical;min-height:110px}
  .pi-form__field input:focus,.pi-form__field select:focus,.pi-form__field textarea:focus{outline:none;border-color:var(--dunkel);box-shadow:0 0 0 3px var(--akzent)}
  .pi-form__row{display:grid;grid-template-columns:1fr 1fr;gap:1.1rem}
  .pi-form__check{display:flex;gap:.55rem;align-items:flex-start;font-size:.85rem;color:var(--leise);line-height:1.4}
  .pi-form__check input{margin-top:.15rem;accent-color:var(--dunkel)}
  .pi-form__btn{font:inherit;font-weight:700;font-size:1rem;padding:.9rem 1rem;border-radius:.55rem;border:none;background:var(--dunkel);color:#fff;cursor:pointer;transition:background .15s,color .15s}
  .pi-form__btn:hover{background:var(--akzent);color:var(--dunkel)}
  @media (max-width:680px){.pi-form__wrap{grid-template-columns:1fr}.pi-form__row{grid-template-columns:1fr}}
</style>
<section class="pi-form">
  <form class="pi-form__wrap">
    <aside class="pi-form__aside">
      <h2>Sag uns, was ansteht</h2>
      <p>Wir melden uns innerhalb eines Werktags mit einer ersten Einschätzung.</p>
      <ul class="pi-form__contact">
        <li><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg> kontakt@beispiel.de</li>
        <li><svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19 19 0 0 1-8.3-3 19 19 0 0 1-5.8-5.8 19 19 0 0 1-3-8.3A2 2 0 0 1 4.7 3h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.5 10.9a16 16 0 0 0 5 5l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg> 040 / 123 456</li>
        <li><svg viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg> Hamburg</li>
      </ul>
    </aside>
    <div class="pi-form__fields">
      <div class="pi-form__row">
        <div class="pi-form__field"><label for="pf-name">Name</label><input id="pf-name" type="text" placeholder="Vor- und Nachname"></div>
        <div class="pi-form__field"><label for="pf-mail">E-Mail</label><input id="pf-mail" type="email" placeholder="name@firma.de"></div>
      </div>
      <div class="pi-form__field"><label for="pf-thema">Betreff</label><select id="pf-thema"><option>Neue Kampagne</option><option>Laufendes Projekt</option><option>Allgemeine Frage</option></select></div>
      <div class="pi-form__field"><label for="pf-msg">Nachricht</label><textarea id="pf-msg" placeholder="Worum geht es?"></textarea></div>
      <label class="pi-form__check"><input type="checkbox"> Ich bin mit der Verarbeitung meiner Daten gemäß Datenschutzerklärung einverstanden.</label>
      <button type="button" class="pi-form__btn">Anfrage senden</button>
    </div>
  </form>
</section>
</body></html>`,
    claudePrompt: 'Nutze diesen Baustein als Ausgangspunkt und passe ihn an: Behalte den zweispaltigen Aufbau (Info-Spalte links, Felder rechts) und die Fokus-Optik. Ändere die Kontaktdaten (E-Mail, Telefon, Ort) auf [deine Angaben], die Betreff-Auswahl auf [deine Optionen] und die Feld-Beschriftungen bei Bedarf. Hinweis für Claude: Der Button ist type="button" und versendet nichts — wenn ich echten Versand will, binde bitte [z. B. einen Formspree-Endpoint oder mailto] an.',
    seedKopien: 31,
    seedRating: { schnitt: 4.6, anzahl: 10 }
  },

  /* ============================================================ *
   * 10 · CHART-SETUP (Inline-SVG + CSS, KEINE Lib) — LEUCHTTURM  *
   * ============================================================ */
  {
    id: 'chart-setup',
    name: 'Chart-Setup (ohne Bibliothek)',
    kategorie: 'daten',
    leuchtturm: true,
    schwierigkeit: 'mittel',
    beschreibung: 'Zwei Diagramme ganz ohne Chart-Bibliothek: ein Balkendiagramm aus reinem CSS und ein Liniendiagramm als Inline-SVG mit Fläche und Rasterlinien. Werte stehen direkt im Markup und sind leicht austauschbar. Löst „Zahlen schnell sichtbar machen“.',
    einsatz: 'Kampagnen-KPIs oder Budgetverläufe in einem selbstgebauten Dashboard oder Report darstellen, ohne externe Skripte laden zu müssen.',
    tags: ['chart', 'diagramm', 'balken', 'linie', 'svg', 'css', 'kpi', 'dashboard', 'daten', 'ohne lib'],
    code: `<style>
  .pi-chart {
    --akzent:  #ffe05e;   /* Hauptbalken / Fläche */
    --dunkel:  #262626;   /* Linie & Achsentext */
    --papier:  #f4f1ea;
    --karte:   #ffffff;
    --leise:   #6b6b6b;
    --linie:   #e6e3da;
    --schrift: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: var(--papier); color: var(--dunkel); font-family: var(--schrift);
    padding: 4rem 1.5rem;
  }
  .pi-chart * { box-sizing: border-box; }
  .pi-chart__grid { max-width:1000px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; }
  .pi-chart__card { background:var(--karte); border:1px solid var(--linie); border-radius:1rem; padding:1.8rem; }
  .pi-chart__card h3 { margin:0 0 .2rem; font-size:1.05rem; font-weight:700; }
  .pi-chart__card p { margin:0 0 1.4rem; font-size:.85rem; color:var(--leise); }
  /* --- CSS-Balkendiagramm: Werte über die "height" je Balken setzen (0-100%) --- */
  .pi-bars { display:flex; align-items:flex-end; gap:.7rem; height:180px; border-bottom:2px solid var(--linie); }
  .pi-bars__col { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; height:100%; gap:.4rem; }
  .pi-bars__bar { width:100%; background:var(--dunkel); border-radius:.3rem .3rem 0 0; position:relative; transition:height .3s ease; }
  .pi-bars__bar--hi { background:var(--akzent); }
  .pi-bars__val { font-size:.75rem; font-weight:700; }
  .pi-bars__lab { font-size:.75rem; color:var(--leise); }
  /* --- SVG-Liniendiagramm: Punkte in "points"/"d" austauschen (y: 0 oben, 180 unten) --- */
  .pi-line { width:100%; height:auto; display:block; overflow:visible; }
</style>

<section class="pi-chart">
  <div class="pi-chart__grid">

    <div class="pi-chart__card">
      <h3>Reichweite je Kanal</h3>
      <p>In Millionen Kontakten (Beispieldaten)</p>
      <div class="pi-bars">
        <!-- height = Wert; höchsten Balken mit --hi hervorheben -->
        <div class="pi-bars__col"><span class="pi-bars__val">2,1</span><div class="pi-bars__bar" style="height:42%"></div><span class="pi-bars__lab">Display</span></div>
        <div class="pi-bars__col"><span class="pi-bars__val">3,4</span><div class="pi-bars__bar" style="height:68%"></div><span class="pi-bars__lab">Social</span></div>
        <div class="pi-bars__col"><span class="pi-bars__val">1,5</span><div class="pi-bars__bar" style="height:30%"></div><span class="pi-bars__lab">Video</span></div>
        <div class="pi-bars__col"><span class="pi-bars__val">4,9</span><div class="pi-bars__bar pi-bars__bar--hi" style="height:98%"></div><span class="pi-bars__lab">Suche</span></div>
        <div class="pi-bars__col"><span class="pi-bars__val">2,7</span><div class="pi-bars__bar" style="height:54%"></div><span class="pi-bars__lab">Audio</span></div>
      </div>
    </div>

    <div class="pi-chart__card">
      <h3>Klicks im Verlauf</h3>
      <p>Sechs Wochen (Beispieldaten)</p>
      <svg class="pi-line" viewBox="0 0 320 180" role="img" aria-label="Liniendiagramm der Klicks">
        <!-- Rasterlinien -->
        <line x1="0" y1="45"  x2="320" y2="45"  stroke="#e6e3da" stroke-width="1"/>
        <line x1="0" y1="90"  x2="320" y2="90"  stroke="#e6e3da" stroke-width="1"/>
        <line x1="0" y1="135" x2="320" y2="135" stroke="#e6e3da" stroke-width="1"/>
        <line x1="0" y1="178" x2="320" y2="178" stroke="#c9c5ba" stroke-width="1.5"/>
        <!-- Fläche unter der Linie -->
        <path d="M0,140 L64,120 L128,128 L192,86 L256,96 L320,44 L320,178 L0,178 Z" fill="#ffe05e" opacity=".35"/>
        <!-- Linie selbst -->
        <polyline points="0,140 64,120 128,128 192,86 256,96 320,44" fill="none" stroke="#262626" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- Datenpunkte -->
        <circle cx="0"   cy="140" r="4" fill="#262626"/>
        <circle cx="64"  cy="120" r="4" fill="#262626"/>
        <circle cx="128" cy="128" r="4" fill="#262626"/>
        <circle cx="192" cy="86"  r="4" fill="#262626"/>
        <circle cx="256" cy="96"  r="4" fill="#262626"/>
        <circle cx="320" cy="44"  r="5" fill="#ffe05e" stroke="#262626" stroke-width="2.5"/>
      </svg>
    </div>

  </div>
</section>`,
    srcdoc: `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0}</style></head><body>
<style>
  .pi-chart{--akzent:#ffe05e;--dunkel:#262626;--papier:#f4f1ea;--karte:#fff;--leise:#6b6b6b;--linie:#e6e3da;--schrift:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:var(--papier);color:var(--dunkel);font-family:var(--schrift);padding:4rem 1.5rem}
  .pi-chart *{box-sizing:border-box}
  .pi-chart__grid{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
  .pi-chart__card{background:var(--karte);border:1px solid var(--linie);border-radius:1rem;padding:1.8rem}
  .pi-chart__card h3{margin:0 0 .2rem;font-size:1.05rem;font-weight:700}
  .pi-chart__card p{margin:0 0 1.4rem;font-size:.85rem;color:var(--leise)}
  .pi-bars{display:flex;align-items:flex-end;gap:.7rem;height:180px;border-bottom:2px solid var(--linie)}
  .pi-bars__col{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;gap:.4rem}
  .pi-bars__bar{width:100%;background:var(--dunkel);border-radius:.3rem .3rem 0 0;position:relative;transition:height .3s ease}
  .pi-bars__bar--hi{background:var(--akzent)}
  .pi-bars__val{font-size:.75rem;font-weight:700}
  .pi-bars__lab{font-size:.75rem;color:var(--leise)}
  .pi-line{width:100%;height:auto;display:block;overflow:visible}
  @media (max-width:680px){.pi-chart__grid{grid-template-columns:1fr}}
</style>
<section class="pi-chart">
  <div class="pi-chart__grid">
    <div class="pi-chart__card">
      <h3>Reichweite je Kanal</h3>
      <p>In Millionen Kontakten (Beispieldaten)</p>
      <div class="pi-bars">
        <div class="pi-bars__col"><span class="pi-bars__val">2,1</span><div class="pi-bars__bar" style="height:42%"></div><span class="pi-bars__lab">Display</span></div>
        <div class="pi-bars__col"><span class="pi-bars__val">3,4</span><div class="pi-bars__bar" style="height:68%"></div><span class="pi-bars__lab">Social</span></div>
        <div class="pi-bars__col"><span class="pi-bars__val">1,5</span><div class="pi-bars__bar" style="height:30%"></div><span class="pi-bars__lab">Video</span></div>
        <div class="pi-bars__col"><span class="pi-bars__val">4,9</span><div class="pi-bars__bar pi-bars__bar--hi" style="height:98%"></div><span class="pi-bars__lab">Suche</span></div>
        <div class="pi-bars__col"><span class="pi-bars__val">2,7</span><div class="pi-bars__bar" style="height:54%"></div><span class="pi-bars__lab">Audio</span></div>
      </div>
    </div>
    <div class="pi-chart__card">
      <h3>Klicks im Verlauf</h3>
      <p>Sechs Wochen (Beispieldaten)</p>
      <svg class="pi-line" viewBox="0 0 320 180" role="img" aria-label="Liniendiagramm der Klicks">
        <line x1="0" y1="45" x2="320" y2="45" stroke="#e6e3da" stroke-width="1"/>
        <line x1="0" y1="90" x2="320" y2="90" stroke="#e6e3da" stroke-width="1"/>
        <line x1="0" y1="135" x2="320" y2="135" stroke="#e6e3da" stroke-width="1"/>
        <line x1="0" y1="178" x2="320" y2="178" stroke="#c9c5ba" stroke-width="1.5"/>
        <path d="M0,140 L64,120 L128,128 L192,86 L256,96 L320,44 L320,178 L0,178 Z" fill="#ffe05e" opacity=".35"/>
        <polyline points="0,140 64,120 128,128 192,86 256,96 320,44" fill="none" stroke="#262626" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="0" cy="140" r="4" fill="#262626"/>
        <circle cx="64" cy="120" r="4" fill="#262626"/>
        <circle cx="128" cy="128" r="4" fill="#262626"/>
        <circle cx="192" cy="86" r="4" fill="#262626"/>
        <circle cx="256" cy="96" r="4" fill="#262626"/>
        <circle cx="320" cy="44" r="5" fill="#ffe05e" stroke="#262626" stroke-width="2.5"/>
      </svg>
    </div>
  </div>
</section>
</body></html>`,
    claudePrompt: 'Nutze diesen Baustein als Ausgangspunkt und passe ihn an: Behalte beide Diagramme ohne externe Bibliothek. Setze die Balkenwerte auf [meine Zahlen] — ändere dafür je Balken das height (0-100%) und die Beschriftung; den größten Balken mit der Klasse pi-bars__bar--hi hervorheben. Beim Liniendiagramm die Punkte in polyline points und im Flächen-path auf meine Werte umrechnen (y: 0 oben, 178 unten). Wenn du unsicher bist, gib mir deine Rohzahlen und ich lasse Claude die Koordinaten ausrechnen. Als Beispieldaten passt eine CSV aus dem Baukasten-Ordner Beispieldaten.',
    seedKopien: 29,
    seedRating: { schnitt: 4.9, anzahl: 12 }
  },

  /* ============================================================ *
   * 11 · TABELLEN-LOOK                                           *
   * ============================================================ */
  {
    id: 'tabellen-look',
    name: 'Tabellen-Look',
    kategorie: 'daten',
    leuchtturm: false,
    schwierigkeit: 'einfach',
    beschreibung: 'Eine sauber gestaltete Datentabelle mit dunkler Kopfzeile, Zebra-Zeilen, rechtsbündigen Zahlen, Status-Badges und horizontalem Scrollen auf kleinen Bildschirmen. Löst „Zahlen und Zustände lesbar auflisten“.',
    einsatz: 'Kampagnen-, Budget- oder Aufgabenübersicht in einem internen Tool — überall, wo strukturierte Zeilen mit Status gebraucht werden.',
    tags: ['tabelle', 'table', 'daten', 'zeilen', 'zebra', 'status', 'badge', 'übersicht', 'liste'],
    code: `<style>
  .pi-tab {
    --akzent:  #ffe05e;
    --dunkel:  #262626;   /* Kopfzeile */
    --papier:  #f1f1ec;
    --karte:   #ffffff;
    --leise:   #6b6b6b;
    --linie:   #e6e3da;
    --zebra:   #faf9f4;
    --schrift: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: var(--papier); color: var(--dunkel); font-family: var(--schrift);
    padding: 4rem 1.5rem;
  }
  .pi-tab * { box-sizing: border-box; }
  .pi-tab__wrap { max-width:960px; margin:0 auto; background:var(--karte); border:1px solid var(--linie); border-radius:1rem; overflow:hidden; }
  .pi-tab__head { padding:1.4rem 1.6rem; border-bottom:1px solid var(--linie); }
  .pi-tab__head h3 { margin:0; font-size:1.15rem; font-weight:700; }
  /* Scroll-Container: schützt vor horizontalem Überlauf auf schmalen Screens */
  .pi-tab__scroll { overflow-x:auto; }
  table.pi-tab__t { width:100%; border-collapse:collapse; min-width:560px; font-size:.92rem; }
  .pi-tab__t thead th { background:var(--dunkel); color:#fff; text-align:left; font-weight:600; padding:.85rem 1.6rem; white-space:nowrap; }
  .pi-tab__t tbody td { padding:.85rem 1.6rem; border-bottom:1px solid var(--linie); }
  .pi-tab__t tbody tr:nth-child(even) { background:var(--zebra); }
  .pi-tab__t tbody tr:hover { background:#f3efe4; }
  .pi-tab__num { text-align:right; font-variant-numeric:tabular-nums; }
  .pi-badge { display:inline-flex; align-items:center; gap:.35rem; font-size:.78rem; font-weight:600; padding:.25rem .6rem; border-radius:2rem; }
  .pi-badge::before { content:""; width:.5rem; height:.5rem; border-radius:50%; }
  .pi-badge--live { background:#e9f6ec; color:#1c7a3a; } .pi-badge--live::before { background:#1c7a3a; }
  .pi-badge--plan { background:#fff5cc; color:#8a6d00; } .pi-badge--plan::before { background:#caa300; }
  .pi-badge--stop { background:#f6e9e9; color:#a13333; } .pi-badge--stop::before { background:#a13333; }
</style>

<section class="pi-tab">
  <div class="pi-tab__wrap">
    <div class="pi-tab__head"><h3>Kampagnen-Übersicht</h3></div>
    <div class="pi-tab__scroll">
      <table class="pi-tab__t">
        <thead>
          <tr><th>Kampagne</th><th>Kanal</th><th class="pi-tab__num">Budget</th><th class="pi-tab__num">CTR</th><th>Status</th></tr>
        </thead>
        <tbody>
          <!-- Zeile kopieren, Status-Klasse: --live / --plan / --stop -->
          <tr><td>Frühjahr Sale</td><td>Social</td><td class="pi-tab__num">12.500 &euro;</td><td class="pi-tab__num">3,2 %</td><td><span class="pi-badge pi-badge--live">Aktiv</span></td></tr>
          <tr><td>Marken-Push</td><td>Display</td><td class="pi-tab__num">8.900 &euro;</td><td class="pi-tab__num">1,1 %</td><td><span class="pi-badge pi-badge--plan">Geplant</span></td></tr>
          <tr><td>Sommer Video</td><td>Video</td><td class="pi-tab__num">21.000 &euro;</td><td class="pi-tab__num">2,7 %</td><td><span class="pi-badge pi-badge--live">Aktiv</span></td></tr>
          <tr><td>Restposten</td><td>Suche</td><td class="pi-tab__num">3.400 &euro;</td><td class="pi-tab__num">4,5 %</td><td><span class="pi-badge pi-badge--stop">Pausiert</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>`,
    srcdoc: `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0}</style></head><body>
<style>
  .pi-tab{--akzent:#ffe05e;--dunkel:#262626;--papier:#f1f1ec;--karte:#fff;--leise:#6b6b6b;--linie:#e6e3da;--zebra:#faf9f4;--schrift:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:var(--papier);color:var(--dunkel);font-family:var(--schrift);padding:4rem 1.5rem}
  .pi-tab *{box-sizing:border-box}
  .pi-tab__wrap{max-width:960px;margin:0 auto;background:var(--karte);border:1px solid var(--linie);border-radius:1rem;overflow:hidden}
  .pi-tab__head{padding:1.4rem 1.6rem;border-bottom:1px solid var(--linie)}
  .pi-tab__head h3{margin:0;font-size:1.15rem;font-weight:700}
  .pi-tab__scroll{overflow-x:auto}
  table.pi-tab__t{width:100%;border-collapse:collapse;min-width:560px;font-size:.92rem}
  .pi-tab__t thead th{background:var(--dunkel);color:#fff;text-align:left;font-weight:600;padding:.85rem 1.6rem;white-space:nowrap}
  .pi-tab__t tbody td{padding:.85rem 1.6rem;border-bottom:1px solid var(--linie)}
  .pi-tab__t tbody tr:nth-child(even){background:var(--zebra)}
  .pi-tab__t tbody tr:hover{background:#f3efe4}
  .pi-tab__num{text-align:right;font-variant-numeric:tabular-nums}
  .pi-badge{display:inline-flex;align-items:center;gap:.35rem;font-size:.78rem;font-weight:600;padding:.25rem .6rem;border-radius:2rem}
  .pi-badge::before{content:"";width:.5rem;height:.5rem;border-radius:50%}
  .pi-badge--live{background:#e9f6ec;color:#1c7a3a}.pi-badge--live::before{background:#1c7a3a}
  .pi-badge--plan{background:#fff5cc;color:#8a6d00}.pi-badge--plan::before{background:#caa300}
  .pi-badge--stop{background:#f6e9e9;color:#a13333}.pi-badge--stop::before{background:#a13333}
</style>
<section class="pi-tab">
  <div class="pi-tab__wrap">
    <div class="pi-tab__head"><h3>Kampagnen-Übersicht</h3></div>
    <div class="pi-tab__scroll">
      <table class="pi-tab__t">
        <thead><tr><th>Kampagne</th><th>Kanal</th><th class="pi-tab__num">Budget</th><th class="pi-tab__num">CTR</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>Frühjahr Sale</td><td>Social</td><td class="pi-tab__num">12.500 &euro;</td><td class="pi-tab__num">3,2 %</td><td><span class="pi-badge pi-badge--live">Aktiv</span></td></tr>
          <tr><td>Marken-Push</td><td>Display</td><td class="pi-tab__num">8.900 &euro;</td><td class="pi-tab__num">1,1 %</td><td><span class="pi-badge pi-badge--plan">Geplant</span></td></tr>
          <tr><td>Sommer Video</td><td>Video</td><td class="pi-tab__num">21.000 &euro;</td><td class="pi-tab__num">2,7 %</td><td><span class="pi-badge pi-badge--live">Aktiv</span></td></tr>
          <tr><td>Restposten</td><td>Suche</td><td class="pi-tab__num">3.400 &euro;</td><td class="pi-tab__num">4,5 %</td><td><span class="pi-badge pi-badge--stop">Pausiert</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
</body></html>`,
    claudePrompt: 'Nutze diesen Baustein als Ausgangspunkt und passe ihn an: Behalte den Tabellen-Look (dunkle Kopfzeile, Zebra-Zeilen, Status-Badges, Scroll-Container). Ersetze die Spalten durch [meine Spalten] und fülle die Zeilen mit [meinen Daten]. Für Status nutze die Badge-Klassen pi-badge--live, --plan oder --stop. Zahlenspalten bekommen die Klasse pi-tab__num, damit sie rechtsbündig stehen. Beispieldaten findest du im Baukasten-Ordner Beispieldaten.',
    seedKopien: 24,
    seedRating: { schnitt: 4.5, anzahl: 9 }
  },

  /* ============================================================ *
   * 12 · STAT-KENNZAHLEN-BAND                                    *
   * ============================================================ */
  {
    id: 'stat-band',
    name: 'Kennzahlen-Band',
    kategorie: 'daten',
    leuchtturm: false,
    schwierigkeit: 'einfach',
    beschreibung: 'Ein Band aus großen Kennzahlen mit kurzer Beschriftung — vier Werte nebeneinander, auf dem Handy gestapelt. Löst „Erfolge auf einen Blick zeigen“.',
    einsatz: 'Ergebnisse einer Kampagne oder Eckdaten der Agentur prominent auf einer Landingpage oder im Report zeigen.',
    tags: ['statistik', 'kennzahlen', 'kpi', 'zahlen', 'band', 'metriken', 'erfolge', 'counter'],
    code: `<style>
  .pi-stat {
    --akzent:  #ffe05e;   /* die großen Zahlen */
    --dunkel:  #262626;   /* Band-Hintergrund */
    --leise:   rgba(255,255,255,.65);
    --linie:   rgba(255,255,255,.14);
    --schrift: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: var(--dunkel); color:#fff; font-family: var(--schrift);
    padding: 3.5rem 1.5rem;
  }
  .pi-stat * { box-sizing: border-box; }
  .pi-stat__row { max-width:1000px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; }
  .pi-stat__item { text-align:center; padding:.5rem 1rem; }
  .pi-stat__item + .pi-stat__item { border-left:1px solid var(--linie); }
  .pi-stat__num { font-size:clamp(2.2rem,5vw,3.2rem); font-weight:800; letter-spacing:-.02em; line-height:1; color:var(--akzent); font-variant-numeric:tabular-nums; }
  .pi-stat__lab { margin-top:.6rem; font-size:.92rem; color:var(--leise); }
  @media (max-width:640px) { .pi-stat__row { grid-template-columns:1fr 1fr; gap:2rem 1rem; } .pi-stat__item + .pi-stat__item { border-left:none; } }
</style>

<section class="pi-stat">
  <div class="pi-stat__row">
    <!-- Zahl und Beschriftung je Kennzahl anpassen -->
    <div class="pi-stat__item"><div class="pi-stat__num">120+</div><div class="pi-stat__lab">Kampagnen pro Jahr</div></div>
    <div class="pi-stat__item"><div class="pi-stat__num">4,9x</div><div class="pi-stat__lab">Durchschnittlicher ROAS</div></div>
    <div class="pi-stat__item"><div class="pi-stat__num">18</div><div class="pi-stat__lab">Menschen im Team</div></div>
    <div class="pi-stat__item"><div class="pi-stat__num">96%</div><div class="pi-stat__lab">bleiben länger als ein Jahr</div></div>
  </div>
</section>`,
    srcdoc: `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0}</style></head><body>
<style>
  .pi-stat{--akzent:#ffe05e;--dunkel:#262626;--leise:rgba(255,255,255,.65);--linie:rgba(255,255,255,.14);--schrift:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:var(--dunkel);color:#fff;font-family:var(--schrift);padding:3.5rem 1.5rem}
  .pi-stat *{box-sizing:border-box}
  .pi-stat__row{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}
  .pi-stat__item{text-align:center;padding:.5rem 1rem}
  .pi-stat__item + .pi-stat__item{border-left:1px solid var(--linie)}
  .pi-stat__num{font-size:clamp(2.2rem,5vw,3.2rem);font-weight:800;letter-spacing:-.02em;line-height:1;color:var(--akzent);font-variant-numeric:tabular-nums}
  .pi-stat__lab{margin-top:.6rem;font-size:.92rem;color:var(--leise)}
  @media (max-width:640px){.pi-stat__row{grid-template-columns:1fr 1fr;gap:2rem 1rem}.pi-stat__item + .pi-stat__item{border-left:none}}
</style>
<section class="pi-stat">
  <div class="pi-stat__row">
    <div class="pi-stat__item"><div class="pi-stat__num">120+</div><div class="pi-stat__lab">Kampagnen pro Jahr</div></div>
    <div class="pi-stat__item"><div class="pi-stat__num">4,9x</div><div class="pi-stat__lab">Durchschnittlicher ROAS</div></div>
    <div class="pi-stat__item"><div class="pi-stat__num">18</div><div class="pi-stat__lab">Menschen im Team</div></div>
    <div class="pi-stat__item"><div class="pi-stat__num">96%</div><div class="pi-stat__lab">bleiben länger als ein Jahr</div></div>
  </div>
</section>
</body></html>`,
    claudePrompt: 'Nutze diesen Baustein als Ausgangspunkt und passe ihn an: Behalte das dunkle Kennzahlen-Band. Setze die vier Zahlen auf [meine Werte] und die Beschriftungen darunter auf [was sie bedeuten]. Wenn du drei oder fünf Kennzahlen brauchst, ändere in .pi-stat__row die Spaltenzahl (repeat(3,1fr) bzw. repeat(5,1fr)). Bitte nur real belegbare Zahlen verwenden.',
    seedKopien: 14,
    seedRating: { schnitt: 4.3, anzahl: 6 }
  }

];

/* ---- Normalisierte Felder für die Rating-/Kopier-Engine (base.js) ----
   getEffectiveRating() erwartet item.rating = { average, count }; der
   „Meistkopiert“-Zähler liest item.copyCount. Beides wird hier NUR aus den
   vorhandenen Seed-Feldern abgeleitet (umbenannt), nichts erfunden. */
BAUSTEINE.forEach(function (b) {
  b.rating = b.seedRating ? { average: b.seedRating.schnitt, count: b.seedRating.anzahl } : null;
  b.copyCount = b.seedKopien || 0;
});

/* ============================================================ *
 * BEISPIELDATEN — erfundene, anonymisierte Übungsdateien.       *
 * Größe/Zeilen/Spalten real aus den Dateien gezählt. KEIN echtes*
 * Kundenmaterial. Jede Datei: Übungsidee + Querverweis-Ziele.  *
 * ============================================================ */
const BEISPIELDATEN = [
  {
    id: 'kampagnen-kpis',
    datei: 'kampagnen-kpis.csv',
    pfad: 'beispieldaten/kampagnen-kpis.csv',
    format: 'CSV',
    groesseBytes: 1773,
    zeilen: 24,
    datensaetze: 23,
    spalten: 9,
    spaltenHinweis: 'Kampagne · Marke · Kanal · Impressions · Klicks · CTR · Conversions · Spend_EUR · CPA_EUR',
    beschreibung: 'Kampagnen-Leistungsdaten von vier erfundenen Marken über mehrere Kanäle: Impressions, Klicks, CTR, Conversions, Spend und CPA. Der ideale Rohstoff, um aus nackten Zahlen ein kleines Dashboard zu bauen.',
    uebungstext: 'Lad die Datei in Claude und sag: „Bau mir aus diesen KPIs ein Balkendiagramm nach Kanal.“ Nimm den Chart-Baustein als Ausgangspunkt.',
    uebungZiele: [
      { label: 'Chart-Baustein öffnen', href: 'baukasten.html?b=chart-setup', typ: 'baustein' },
      { label: 'Prompt „CSV erklären“', href: 'prompts.html?p=csv-erklaeren', typ: 'prompt' }
    ]
  },
  {
    id: 'budget-plan',
    datei: 'budget-plan.csv',
    pfad: 'beispieldaten/budget-plan.csv',
    format: 'CSV',
    groesseBytes: 813,
    zeilen: 20,
    datensaetze: 19,
    spalten: 6,
    spaltenHinweis: 'Monat · Kanal · Plan_Budget_EUR · Ist_Ausgabe_EUR · Abweichung_EUR · Abweichung_Prozent',
    beschreibung: 'Media-Budget nach Monat und Kanal mit Plan-, Ist- und Abweichungswerten. Gut geeignet, um eine saubere Tabelle mit farbig hervorgehobenen Abweichungen zu bauen.',
    uebungstext: 'Sag Claude: „Mach aus dieser Budget-Tabelle eine übersichtliche HTML-Tabelle und färbe negative Abweichungen rot.“ Der Tabellen-Baustein ist der Startpunkt.',
    uebungZiele: [
      { label: 'Tabellen-Baustein öffnen', href: 'baukasten.html?b=tabellen-look', typ: 'baustein' },
      { label: 'Skill „xlsx“', href: 'skills.html?skill=xlsx', typ: 'skill' }
    ]
  },
  {
    id: 'social-post-performance',
    datei: 'social-post-performance.csv',
    pfad: 'beispieldaten/social-post-performance.csv',
    format: 'CSV',
    groesseBytes: 1044,
    zeilen: 16,
    datensaetze: 15,
    spalten: 10,
    spaltenHinweis: 'Datum · Marke · Plattform · Format · Reichweite · Likes · Kommentare · Shares · Saves · Engagement_Rate',
    beschreibung: 'Reichweite, Likes, Kommentare, Shares, Saves und Engagement-Rate einzelner Social-Posts über mehrere Plattformen und Formate. Zeigt schön, welches Format wirklich zieht.',
    uebungstext: 'Sag Claude: „Zeig mir die drei stärksten Posts als Kennzahlen-Band.“ Das Stat-Band ist die Vorlage dafür.',
    uebungZiele: [
      { label: 'Stat-Band-Baustein öffnen', href: 'baukasten.html?b=stat-band', typ: 'baustein' },
      { label: 'Prompt „CSV erklären“', href: 'prompts.html?p=csv-erklaeren', typ: 'prompt' }
    ]
  },
  {
    id: 'umfrage-rohdaten',
    datei: 'umfrage-rohdaten.csv',
    pfad: 'beispieldaten/umfrage-rohdaten.csv',
    format: 'CSV',
    groesseBytes: 2164,
    zeilen: 33,
    datensaetze: 32,
    spalten: 9,
    spaltenHinweis: 'Respondenten_ID · Alter_Bucket · Region · Q1–Q5 (Skala) · Offene_Antwort',
    beschreibung: 'Rohantworten einer erfundenen Markenumfrage — Alters-Bucket, Region, fünf Skalenfragen und eine offene Antwort je Person. Übungsstoff für Auswertung und Visualisierung.',
    uebungstext: 'Sag Claude: „Fasse die Skalenfragen als Durchschnitt je Region zusammen und mach ein Diagramm daraus.“ Der Chart-Baustein passt dafür.',
    uebungZiele: [
      { label: 'Chart-Baustein öffnen', href: 'baukasten.html?b=chart-setup', typ: 'baustein' },
      { label: 'Prompt „CSV erklären“', href: 'prompts.html?p=csv-erklaeren', typ: 'prompt' }
    ]
  },
  {
    id: 'briefing-website-relaunch',
    datei: 'briefing-website-relaunch.md',
    pfad: 'beispieldaten/briefing-website-relaunch.md',
    format: 'Markdown',
    groesseBytes: 1612,
    zeilen: 46,
    datensaetze: null,
    spalten: null,
    spaltenHinweis: 'Ausgangslage · Ziele · Zielgruppe · Pflichtseiten · Ton',
    beschreibung: 'Ein erfundenes Kunden-Briefing für einen Website-Relaunch — Ausgangslage, Ziele, Zielgruppe, Pflichtseiten und gewünschter Ton. Übungsstoff für Zusammenfassung und die erste Hero-Sektion.',
    uebungstext: 'Sag Claude: „Fasse dieses Briefing in fünf Bulletpoints zusammen und schreib mir daraus eine Hero-Schlagzeile.“ Der Header-Hero-Baustein wird dein Gerüst.',
    uebungZiele: [
      { label: 'Header-Hero-Baustein öffnen', href: 'baukasten.html?b=header-hero', typ: 'baustein' },
      { label: 'Prompt „Briefing zusammenfassen“', href: 'prompts.html?p=briefing-zusammenfassung', typ: 'prompt' }
    ]
  },
  {
    id: 'briefing-social-kampagne',
    datei: 'briefing-social-kampagne.md',
    pfad: 'beispieldaten/briefing-social-kampagne.md',
    format: 'Markdown',
    groesseBytes: 1823,
    zeilen: 51,
    datensaetze: null,
    spalten: null,
    spaltenHinweis: 'Ausgangslage · Aufgabe · Zielgruppe · Kanäle · Kernbotschaften · Ton',
    beschreibung: 'Ein erfundenes Kampagnen-Briefing der Marke Grünwerk: Social-Media-Kampagne zum Saisonstart mit Zielgruppe, Kanälen, Kernbotschaften und Tonalität. Übungsstoff für Content-Planung.',
    uebungstext: 'Sag Claude: „Entwickle aus diesem Briefing eine Social-Post-Serie für die erste Kampagnenwoche.“ Die Ergebnisse kannst du im Karten-Grid-Baustein als Redaktionsplan anordnen.',
    uebungZiele: [
      { label: 'Karten-Grid-Baustein öffnen', href: 'baukasten.html?b=karten-grid', typ: 'baustein' },
      { label: 'Prompt „Social-Post-Serie“', href: 'prompts.html?p=social-post-serie', typ: 'prompt' }
    ]
  },
  {
    id: 'testbild-produkt',
    datei: 'testbild-produkt.svg',
    pfad: 'beispieldaten/testbild-produkt.svg',
    format: 'SVG',
    groesseBytes: 1694,
    zeilen: 26,
    datensaetze: null,
    spalten: null,
    spaltenHinweis: '1200 × 900 (4:3) · Flächen in pilot-Farben · als Testbild gekennzeichnet',
    beschreibung: 'Ein Produkt-Platzhalterbild der erfundenen Marke VELOMO — stilisiertes E-Bike als flache Vektorgrafik. Zum Üben, wenn ein Layout ein Bild braucht, du aber noch keins hast.',
    uebungstext: 'Sag Claude: „Bau das Testbild als <img> in den Bild-Text-Baustein ein.“ Und wenn du ein echtes Motiv willst: Der Prompt „Bildbrief“ hilft dir, es sauber zu beschreiben.',
    uebungZiele: [
      { label: 'Bild-Text-Baustein öffnen', href: 'baukasten.html?b=bild-text-split', typ: 'baustein' },
      { label: 'Prompt „Bildbrief“', href: 'prompts.html?p=bildbrief', typ: 'prompt' }
    ]
  },
  {
    id: 'testbild-kampagne',
    datei: 'testbild-kampagne.svg',
    pfad: 'beispieldaten/testbild-kampagne.svg',
    format: 'SVG',
    groesseBytes: 2063,
    zeilen: 29,
    datensaetze: null,
    spalten: null,
    spaltenHinweis: '1600 × 900 (16:9) · Headline als Platzhalter-Balken · als Testbild gekennzeichnet',
    beschreibung: 'Ein Kampagnen-Platzhalterbild der erfundenen Marke Quellgold im Querformat — mit freier Fläche, wo später Claim und Call-to-Action hinkommen. Gut als Startpunkt für eine Kampagnen-Sektion.',
    uebungstext: 'Sag Claude: „Bau eine Hero-Sektion, die dieses Kampagnenbild großflächig nutzt.“ Den passenden Claim für die Platzhalter-Balken textest du mit der Claim-Werkstatt.',
    uebungZiele: [
      { label: 'Header-Hero-Baustein öffnen', href: 'baukasten.html?b=header-hero', typ: 'baustein' },
      { label: 'Prompt „Claim-Werkstatt“', href: 'prompts.html?p=claim-werkstatt', typ: 'prompt' }
    ]
  }
];

/* ---- Real gezählte Kennzahlen (Hero-Zahlen, Startseiten-Meta) ---- */
const BAUKASTEN_STATS = {
  total: BAUSTEINE.length,
  leuchttuerme: BAUSTEINE.filter(function (b) { return b.leuchtturm; }).length,
  kategorien: Array.from(new Set(BAUSTEINE.map(function (b) { return b.kategorie; }))).length,
  einfach: BAUSTEINE.filter(function (b) { return b.schwierigkeit === 'einfach'; }).length,
  mittel: BAUSTEINE.filter(function (b) { return b.schwierigkeit === 'mittel'; }).length,
  beispieldaten: BEISPIELDATEN.length
};

const BEISPIELDATEN_STATS = {
  total: BEISPIELDATEN.length,
  csv: BEISPIELDATEN.filter(function (d) { return d.format === 'CSV'; }).length,
  markdown: BEISPIELDATEN.filter(function (d) { return d.format === 'Markdown'; }).length,
  svg: BEISPIELDATEN.filter(function (d) { return d.format === 'SVG'; }).length,
  gesamtBytes: BEISPIELDATEN.reduce(function (s, d) { return s + d.groesseBytes; }, 0),
  gesamtZeilen: BEISPIELDATEN.reduce(function (s, d) { return s + d.zeilen; }, 0)
};
