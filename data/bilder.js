/* ============================================================
   pilot AI Marketplace — Bilder: data/bilder.js.
   Klassisches Script (kein Modul), definiert globale Konstanten.
   Kein export/import — die Datei wird per <script src> geladen und
   muss auch unter file:// tragen.

   Definierte Globals:
     BILDER       — 11 frei nutzbare Bilder als Übungsmaterial: 9 Fotos
                    (WebP, längste Kante 1600, dazu je eine Vorschau mit
                    längster Kante 400) und 2 selbst gezeichnete Test-SVGs.
                    Felder: id, name, datei, vorschau, format, breite,
                    hoehe, bytes, beschreibung, tags, lizenz, lizenzUrl,
                    quelle, urheber.
     BILDER_STATS — abgeleitete Kennzahlen, aus dem Array gerechnet.

   HERKUNFT DER ZAHLEN: breite/hoehe der Fotos stammen aus dem WebP-
   Dateikopf (VP8X-Container, Canvas-Maße), breite/hoehe der SVGs aus
   deren viewBox, bytes aus der Datei auf der Platte. Nicht aus
   Dateinamen und nicht aus einem Manifest abgeschrieben.

   LIZENZ — zwei verschiedene Sachlagen, bewusst nicht gleichgemacht:

   (1) Die neun Fotos stehen unter der Unsplash License. Das ist eine
       eigene Lizenz und ausdrücklich weder CC0 noch MIT — sie wird hier
       deshalb auch nicht als solche geführt. Sie erlaubt kommerzielle
       Nutzung und verlangt KEINE Namensnennung. Trotzdem trägt jeder
       Eintrag seinen urheber: Herkunft wird hier auch dort genannt, wo
       sie nicht verlangt ist. Der lange Beleg je Datei (Maße, Bytes,
       Prüfdatum) steht in assets/bilder/HERKUNFT.md.

   (2) Die zwei Test-SVGs sind Eigenarbeit dieses Repos — von Hand
       gezeichnete Vektorgrafik, keine fremde Vorlage, kein fremder
       Code. Dafür gibt es kein Lizenzkürzel, und es wird auch keines
       erfunden: lizenzUrl und quelle stehen auf null. Belegbar ist die
       Urheberschaft an zwei Stellen im Repo — am Kopfkommentar der
       beiden Dateien („Übungsmaterial des pilot AI Marketplace") und am
       Commit 30e4988 vom 23.07.2026, der sie gebracht hat (Autor
       CeeKay1901). Die Marken darin (Quellgold, VELOMO) sind erfunden.

   FALLE FÜR DIE LINKPRÜFUNG: `node tools/qa/index.mjs links` schickt
   einen festen Chrome-126-User-Agent. Unsplash antwortet genau darauf
   mit 401 (Anti-Scraper-Schranke), während dieselbe URL per Plain-curl
   200 liefert — am 25.07.2026 für alle zehn URLs hier einzeln gemessen.
   Die Links sind also nicht tot, der Prüfer sieht sie nur nicht. Wer
   die Meldung als Link-Rot liest, löscht eine korrekte Quellenangabe.

   Alle Zahlen sind aus diesem Array bzw. den Dateien zählbar.
   ============================================================ */

const BILDER = [

  /* ============================================================ *
   * FOTOS — Unsplash License, 9 Stück.                           *
   * ============================================================ */
  {
    id: 'notizbuch-stift-umschlag',
    name: 'Notizbuch mit Füller',
    datei: 'assets/bilder/notizbuch-stift-umschlag.webp',
    vorschau: 'assets/bilder/notizbuch-stift-umschlag-klein.webp',
    format: 'WebP',
    breite: 1600,
    hoehe: 1600,
    bytes: 203330,
    beschreibung: 'Aufsicht auf ein braunes Lederheft mit Gummiband, darauf ein karierter Block und ein goldener Füller, daneben ein grober Juteteppich. Quadratisch und hell — passt als Kopfbild für alles, wo es um Notieren, Planen und Festhalten geht.',
    tags: ['notizbuch', 'schreibtisch', 'aufsicht', 'hell'],
    lizenz: 'Unsplash License',
    lizenzUrl: 'https://unsplash.com/license',
    quelle: 'https://unsplash.com/photos/gold-and-silver-pen-on-brown-envelope-bdvycycdu-M',
    urheber: 'Hayley Maxwell'
  },
  {
    id: 'haftnotizen-wand',
    name: 'Leere Haftnotizen',
    datei: 'assets/bilder/haftnotizen-wand.webp',
    vorschau: 'assets/bilder/haftnotizen-wand-klein.webp',
    format: 'WebP',
    breite: 1600,
    hoehe: 1067,
    bytes: 186008,
    beschreibung: 'Zwei unbeschriebene Haftnotizen, eine orange und eine gelbgrün, auf einer hellgrauen Fläche mit weichem Schatten. Beide Zettel sind leer, du kannst also im Layout eigenen Text darüberlegen — gutes Übungsstück für eine Bild-Text-Sektion.',
    tags: ['haftnotiz', 'workshop', 'farbig', 'freiflaeche'],
    lizenz: 'Unsplash License',
    lizenzUrl: 'https://unsplash.com/license',
    quelle: 'https://unsplash.com/photos/yellow-sticky-notes-on-white-wall-Vq1FQ_uNppw',
    urheber: 'Paper Textures'
  },
  {
    id: 'besprechungstisch-leer',
    name: 'Leerer Besprechungsraum',
    datei: 'assets/bilder/besprechungstisch-leer.webp',
    vorschau: 'assets/bilder/besprechungstisch-leer-klein.webp',
    format: 'WebP',
    breite: 1600,
    hoehe: 1067,
    bytes: 204696,
    beschreibung: 'Ein menschenleerer Konferenzraum: langer Holztisch, eine Reihe heller Stühle, raumhohe Fensterfront mit fahlem Tageslicht. Nimm es, wenn ein Entwurf ein sachliches Büromotiv braucht, das niemanden abbildet.',
    tags: ['besprechungsraum', 'buero', 'innenraum', 'fensterfront'],
    lizenz: 'Unsplash License',
    lizenzUrl: 'https://unsplash.com/license',
    quelle: 'https://unsplash.com/photos/oval-brown-wooden-conference-table-and-chairs-inside-conference-room-GWe0dlVD9e0',
    urheber: 'Benjamin Child'
  },
  {
    id: 'gebaeude-baeume',
    name: 'Heller Bau mit Bäumen',
    datei: 'assets/bilder/gebaeude-baeume.webp',
    vorschau: 'assets/bilder/gebaeude-baeume-klein.webp',
    format: 'WebP',
    breite: 1200,
    hoehe: 1600,
    bytes: 176804,
    beschreibung: 'Heller Steinbau mit geschwungener Wand, davor zwei runde Pinien und ein gepflasterter Vorplatz, oben blasser Himmel. Hochformat mit viel ruhiger Fläche — brauchbar als Seitenbild neben einem Textblock.',
    tags: ['architektur', 'aussen', 'natur', 'hell'],
    lizenz: 'Unsplash License',
    lizenzUrl: 'https://unsplash.com/license',
    quelle: 'https://unsplash.com/photos/green-trees-beside-white-concrete-building-WfCePInWrlQ',
    urheber: 'niklas schoenberger'
  },
  {
    id: 'betonwand-lichtkante',
    name: 'Betonwand mit Lichtkante',
    datei: 'assets/bilder/betonwand-lichtkante.webp',
    vorschau: 'assets/bilder/betonwand-lichtkante-klein.webp',
    format: 'WebP',
    breite: 1067,
    hoehe: 1600,
    bytes: 121574,
    beschreibung: 'Eine beigegraue Betonfläche mit weichem Verlauf, unten zwei helle geometrische Lichtkanten. Fast motivlos und deshalb der ruhigste Hintergrund im Bestand — gut zum Üben von hellem Text auf Bild.',
    tags: ['betonwand', 'textur', 'minimal', 'hintergrund'],
    lizenz: 'Unsplash License',
    lizenzUrl: 'https://unsplash.com/license',
    quelle: 'https://unsplash.com/photos/concrete-wall-with-geometric-light-and-shadow-u7VDgNGb78w',
    urheber: 'Bernard Hermant'
  },
  {
    id: 'farbflaechen-wand',
    name: 'Gemalte Farbflächen',
    datei: 'assets/bilder/farbflaechen-wand.webp',
    vorschau: 'assets/bilder/farbflaechen-wand-klein.webp',
    format: 'WebP',
    breite: 1600,
    hoehe: 1065,
    bytes: 288626,
    beschreibung: 'Eine Wand mit großen gemalten Flächen in Gelb, Dunkelblau, Rosa und Weiß, Pinselstruktur und abgeplatzte Farbe deutlich sichtbar. Das farbstärkste Bild hier — nimm es, wenn du testen willst, wie ein Layout mit einem lauten Hintergrund umgeht.',
    tags: ['farbflaeche', 'geometrie', 'farbig', 'hintergrund'],
    lizenz: 'Unsplash License',
    lizenzUrl: 'https://unsplash.com/license',
    quelle: 'https://unsplash.com/photos/blue-yellow-and-brown-wall-decor-KZNTEn2r6tw',
    urheber: 'Photo Boards'
  },
  {
    id: 'wendeltreppe-oben',
    name: 'Wendeltreppe von oben',
    datei: 'assets/bilder/wendeltreppe-oben.webp',
    vorschau: 'assets/bilder/wendeltreppe-oben-klein.webp',
    format: 'WebP',
    breite: 1600,
    hoehe: 1067,
    bytes: 265690,
    beschreibung: 'Blick von oben in eine weiße Wendeltreppe: gefliestes Stufenband als Spirale, in der Mitte ein Fleck grünes Laub. Starke Form mit klarem Blickfang — geeignet, wenn ein Aufmacher Struktur zeigen soll statt Inhalt.',
    tags: ['treppe', 'architektur', 'aufsicht', 'geometrie'],
    lizenz: 'Unsplash License',
    lizenzUrl: 'https://unsplash.com/license',
    quelle: 'https://unsplash.com/photos/white-and-brown-concrete-spiral-stairs-WHPsxhB4mWQ',
    urheber: 'Dan Freeman'
  },
  {
    id: 'notizbuch-holztisch',
    name: 'Notizbuch auf Holztisch',
    datei: 'assets/bilder/notizbuch-holztisch.webp',
    vorschau: 'assets/bilder/notizbuch-holztisch-klein.webp',
    format: 'WebP',
    breite: 1600,
    hoehe: 1067,
    bytes: 184088,
    beschreibung: 'Ein aufgeschlagenes, leeres Linienheft auf dunklem Holz, daneben ein grüner Kugelschreiber, zwei Bleistifte und ein Stiftköcher. Die linke Bildhälfte ist beinahe weiß und leer — die Fläche, auf der du im Layout Text unterbringst.',
    tags: ['notizbuch', 'schreibtisch', 'dunkel', 'freiflaeche'],
    lizenz: 'Unsplash License',
    lizenzUrl: 'https://unsplash.com/license',
    quelle: 'https://unsplash.com/photos/open-notebook-with-pen-and-pencils-on-desk-n9AaeihA9HI',
    urheber: 'Clay Banks'
  },
  {
    id: 'baukoerper-himmel',
    name: 'Betonbau vor blauem Himmel',
    datei: 'assets/bilder/baukoerper-himmel.webp',
    vorschau: 'assets/bilder/baukoerper-himmel-klein.webp',
    format: 'WebP',
    breite: 1067,
    hoehe: 1600,
    bytes: 143104,
    beschreibung: 'Schräg gestellte Sichtbeton-Scheiben eines flachen Baus, darüber wolkenloser blauer Himmel, der gut die Hälfte des Hochformats einnimmt. Der große leere Himmelsbereich nimmt eine Schlagzeile auf, ohne dass du am Bild etwas ändern musst.',
    tags: ['architektur', 'betonwand', 'aussen', 'himmel'],
    lizenz: 'Unsplash License',
    lizenzUrl: 'https://unsplash.com/license',
    quelle: 'https://unsplash.com/photos/white-concrete-building-under-blue-sky-during-daytime-4G6DOKSwO8U',
    urheber: 'Victor'
  },

  /* ============================================================ *
   * TEST-SVGS — Eigenarbeit dieses Repos, 2 Stück.               *
   * Von Hand gezeichnet, keine fremde Vorlage. Deshalb kein      *
   * Lizenzkürzel, quelle null. Beleg: Kopfkommentar der Dateien  *
   * plus Commit 30e4988 vom 23.07.2026 (Autor CeeKay1901).       *
   * breite/hoehe kommen aus der viewBox der jeweiligen Datei.    *
   * Beide liegen zusätzlich als BEISPIELDATEN in bausteine.js —  *
   * dort als Übungsdatei, hier als Bild. Gleiche id, aber        *
   * anderer Typ, also getrennte Namensräume für Deep-Link,       *
   * Sterne und tools/seit.mjs (dessen Pickaxe je Datendatei      *
   * sucht).                                                      *
   * ============================================================ */
  {
    id: 'testbild-kampagne',
    name: 'Testbild Kampagne',
    datei: 'beispieldaten/testbild-kampagne.svg',
    vorschau: 'beispieldaten/testbild-kampagne.svg',
    format: 'SVG',
    breite: 1600,
    hoehe: 900,
    bytes: 2063,
    beschreibung: 'Querformatiges Platzhalterbild in pilot-Farben: gelbe Fläche mit stilisierter Flasche links, rechts Balken statt Schlagzeile und ein Platzhalter-Knopf. Die Marke Quellgold darin ist frei erfunden, es ist kein Kundenmaterial — nimm es, wenn eine Kampagnen-Sektion ein Bild braucht und du noch keins hast.',
    tags: ['testbild', 'platzhalter', 'kampagne', 'vektor'],
    lizenz: 'Eigenarbeit dieses Repos, frei nutzbar',
    lizenzUrl: null,
    quelle: null,
    urheber: 'pilot AI Marketplace (CeeKay1901)'
  },
  {
    id: 'testbild-produkt',
    name: 'Testbild Produkt',
    datei: 'beispieldaten/testbild-produkt.svg',
    vorschau: 'beispieldaten/testbild-produkt.svg',
    format: 'SVG',
    breite: 1200,
    hoehe: 900,
    bytes: 1694,
    beschreibung: 'Produkt-Platzhalter in pilot-Farben: ein stilisiertes E-Bike als flache Strichzeichnung auf hellem Grund, unten ein dunkles Band. Die Marke VELOMO darin ist frei erfunden, es ist kein Kundenmaterial — gedacht zum Üben, wenn ein Layout ein Produktbild braucht.',
    tags: ['testbild', 'platzhalter', 'produkt', 'vektor'],
    lizenz: 'Eigenarbeit dieses Repos, frei nutzbar',
    lizenzUrl: null,
    quelle: null,
    urheber: 'pilot AI Marketplace (CeeKay1901)'
  }
];

/* ---- Abgeleitete Kennzahlen. Gerechnet, nicht getippt: keine Zahl
   im Fließtext, die aus diesem Array kommt. ---- */
const BILDER_STATS = {
  total: BILDER.length,
  webp: BILDER.filter(function (b) { return b.format === 'WebP'; }).length,
  svg: BILDER.filter(function (b) { return b.format === 'SVG'; }).length,
  querformat: BILDER.filter(function (b) { return b.breite > b.hoehe; }).length,
  hochformat: BILDER.filter(function (b) { return b.breite < b.hoehe; }).length,
  quadratisch: BILDER.filter(function (b) { return b.breite === b.hoehe; }).length,
  mitQuelle: BILDER.filter(function (b) { return !!b.quelle; }).length,
  lizenzen: Array.from(new Set(BILDER.map(function (b) { return b.lizenz; }))).length,
  urheber: Array.from(new Set(BILDER.map(function (b) { return b.urheber; }))).length,
  schlagworte: Array.from(new Set(BILDER.reduce(function (a, b) { return a.concat(b.tags); }, []))).length,
  gesamtBytes: BILDER.reduce(function (s, b) { return s + b.bytes; }, 0),
  groessteKante: BILDER.reduce(function (m, b) { return Math.max(m, b.breite, b.hoehe); }, 0)
};
