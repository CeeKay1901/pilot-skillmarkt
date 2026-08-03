/* ============================================================
   pilot AI Marketplace — Pakete: data/pakete.js

   Klassisches Script (kein Modul), definiert globale Konstanten.

   Definierte Globals:
     PAKETE        — Bausätze zum Mitnehmen: fertige Ordner, die man
                     herunterlädt und in ein eigenes Projekt legt.
     PAKETE_STATS  — real gezählte Kennzahlen, berechnet aus PAKETE.

   Was ein Paket ist — und was es von den Nachbarn unterscheidet:
     Ein STARTPROJEKT ist ein Gerüst, das schon läuft: Doppelklick, und
     es passiert etwas. Man baut es weiter.
     Eine PROJEKTANWEISUNG (ANWEISUNGEN) ist Text: sie beschreibt, WIE
     gebaut wird, und wird als CLAUDE.md ins Projekt gelegt.
     Ein PAKET ist keins von beidem. Es ist Material — Farben, Schriften,
     Regeln, Beispiele —, das man in ein Projekt hineinlegt, das es
     schon gibt. Man baut es nicht weiter, man benutzt es.

   Ein Paket darf zweierlei enthalten, und beides steht getrennt drin:
     `dateien`  eigene Dateien, die auf der Platte liegen.
     `verweise` Zeiger auf Einträge, die es hier ohnehin schon gibt.
                Ein Paket kopiert also keine Schrift und keine Palette
                in seinen Ordner, es sagt, welche es benutzt. Kein
                zweiter Bestand — dieselbe Regel wie bei den Gerüsten
                unter `startprojekte/`, die ihre CLAUDE.md nicht auf der
                Platte liegen haben.

   Felder je Eintrag:
     id        kebab-case, stabil. Zugleich Ordnername unter `pakete/`,
               Name des ZIP (`<id>.zip`) und Deep-Link `?paket=<id>`.
     name      Anzeigename der Karte
     kurz      ein Satz für die Karte
     wofuer    zwei bis drei Sätze: wann nimmt man das, wann nicht
     inhalt    Klartext-Liste dessen, was drinsteckt. Für Menschen
               geschrieben, nicht für die Maschine — die Maschine liest
               `dateien` und `verweise`.
     ordner    repo-relativer Ordner mit den eigenen Dateien, oder null
               (ein Paket, das nur aus Verweisen besteht, ist erlaubt).
     dateien   REPO-RELATIVE Pfade der EIGENEN Dateien des Pakets, also
               genau das, was im Ordner liegt. Achtung, das ist ANDERS als
               in `data/startprojekte.js`: dort sind die Pfade relativ zu
               `ordner`. Hier stehen sie vollständig, damit ein Paket ohne
               `ordner` (nur Verweise) dieselbe Feldform behalten kann.
               Beim Packen heisst der Eintrag im ZIP `<id>/` + Pfad ohne
               `ordner`-Präfix.
               Diese Liste ist gegen `find <ordner> -type f` abgeglichen,
               nicht abgeschrieben: keine Datei fehlt, keine ist zu viel.
     verweise  Array von { typ, id, name } auf Einträge anderer Sammlungen.
     tags      3–6 kleingeschriebene deutsche Schlagworte für die Suche

   WARUM `verweise` DEN ANZEIGENAMEN SELBST TRÄGT (und nicht nachschlägt):
     Naheliegend wäre { typ, id } und die Seite holt den Namen aus der
     Zielsammlung. Das geht hier nicht, ohne etwas kaputt zu machen.
     `vorlagen.html` lädt bewusst NUR anweisungen.js, assets.js,
     bausteine.js und seit.js — SKILLS und PROMPTS kommen dort erst auf
     Anforderung nach. Genau das prüft `tests/e9-suche.cjs` Check 04
     (`preload.promptsUndef`). Ein Paket, das auf einen Skill oder einen
     Prompt verweist, würde die Seite zwingen, diese Sammlungen vorab zu
     laden — und der Test würde rot, ohne dass jemand den Zusammenhang
     sieht.
     Die Lösung ist nicht „dann eben keine Skill-Verweise", sondern: JEDER
     Verweis trägt seinen Anzeigenamen selbst. Eine Regel statt einer
     Ausnahmeliste, die niemand im Kopf behält. Die anzeigende Seite
     braucht damit KEINE fremde Sammlung — sie baut den Link aus `typ`
     über `GSEARCH_GROUPS` (shared/base.js) und nimmt `name`, wie er hier
     steht.
     Preis der Entscheidung, offen benannt: `name` ist eine zweite Kopie
     und kann von der Quelle abweichen. Deshalb ist er kurz gehalten (nur
     der Anzeigename, keine Beschreibung), und deshalb gehört in die
     Testsuite dieser Sammlung eine Prüfung, die jeden `verweis` gegen
     seine Zielsammlung hält: typ+id müssen existieren, und `name` muss
     mit dem Namen dort übereinstimmen. Ohne diese Prüfung driftet es.
     Nachgemessen am 25.07.2026: alle drei Verweise unten existieren in
     ASSETS und tragen dort exakt diese Namen.

   KEINE EXTERNEN URLS in dieser Datei. `node tools/qa/index.mjs links`
   liest alle Dateien in `data/` und prüft jede http(s)-Adresse einzeln,
   Exit 1 bei Nicht-200. Alles hier ist repo-relativ — auch damit die
   Seite per `file://` funktioniert.

   Zahlen-Ehrlichkeit: In `kurz`, `wofuer` und `inhalt` steht keine Zahl,
   die aus einer Datei kommt. Die Zahl der Dateien, der Verweise und der
   Pakete rechnet die Seite aus PAKETE_STATS bzw. `dateien.length`.
   ============================================================ */

const PAKETE = [

  {
    id: 'design-system',
    name: 'pilot-Design-Paket',
    kurz: 'Die Farben, Schriften, Ecken und Schatten des Marketplace als fertige CSS-Datei, mit einer Beispielseite, auf der jeder Baustein einmal in echt steht.',
    wofuer: 'Nimm es, wenn du etwas baust, das nach pilot aussehen soll — ein internes Tool, eine Auswertung, eine Seite zum Weitergeben. Du bindest eine Datei ein und hast Farben, Größen und Abstände, ohne dich zu entscheiden. Nimm es NICHT für Material, das nach außen geht: verbindliche Vorlagen, Logo-Guidelines und Schriftlizenzen kommen ausschließlich vom pilot-Brand- und KI-Enablement-Team, und die offizielle Brand-Schrift Centra No1 liegt hier nicht bei.',
    inhalt: [
      'tokens.css — alle Farben, Größen, Radien und Schatten als CSS-Variablen, Wert für Wert aus shared/base.css abgeschrieben.',
      'index.html — eine Beispielseite, die jeden Baustein einmal fertig zeigt: Kopfbereich, Überschriften, Knöpfe in ihren vier Zuständen, Karte mit Stimmen-Knopf, Tabelle, Formularfeld, Hinweiskasten, dunkles Band. Öffnet per Doppelklick, ohne Server und ohne Netz.',
      'CLAUDE.md — die Designregeln in Worten, damit Claude Code sie beim Bauen kennt. Jede Regel nennt ihre Fundstelle in shared/base.css oder trägt das Wort „Vorschlag".',
      'schriften.css — die fertigen @font-face-Blöcke für Inter und JetBrains Mono. Absichtlich noch nicht eingebunden; wie du sie einschaltest, steht in schriften.md.',
      'schriften.md — woher die Schriften kommen, unter welcher Lizenz sie stehen, und warum die offizielle pilot-Schrift nicht dabei ist.',
      'Die drei Schriftdateien aus assets/fonts/ — sie liegen nicht im Paketordner, sondern kommen erst beim Packen dazu. Zwei Kopien derselben Datei im Repo wären ein zweiter Bestand.',
    ],
    ordner: 'pakete/design-system/',
    /* Ist-Zustand des Ordners, gegen `find pakete/design-system -type f`
       abgeglichen, nicht abgeschrieben. Fünf Dateien, keine mehr, keine
       weniger — im Ordner liegt insbesondere KEINE .woff2.

       DIE SCHRIFTDATEIEN GEHÖREN INS ZIP, ABER NICHT IN DIESE LISTE.
       `schriften.css` sucht drei Dateien unter `assets/fonts/` neben sich.
       Die liegen im Marketplace unter `assets/fonts/` und werden erst beim
       Packen dazugelegt, unter `design-system/assets/fonts/`. Sie hier
       aufzuführen hiesse, dieselbe Dateiliste ein zweites Mal zu führen —
       genau das, was dieses Repo sonst überall vermeidet.
       Woher die Packliste stattdessen kommt: aus `schriften.css` selbst.
       Die Datei nennt ihre drei Schriften als `url('assets/fonts/…')`, das
       ist die einzige Stelle, an der sie stehen, und sie ist maschinell
       lesbar. Wer packt, holt zuerst die fünf Dateien unten, liest dann die
       `url(...)`-Angaben aus der geholten `schriften.css` und holt die auch.
       Die Verweise unten taugen dafür NICHT vollständig: der ASSETS-Eintrag
       `inter` führt nur `inter-variable.woff2`, den Kursiv-Schnitt gibt es
       dort nicht als eigenen Eintrag.

       Fehlerfall wie bei `downloadStartprojekt` (showroom.html): schlägt
       auch nur eine Datei fehl, gibt es KEIN ZIP, sondern eine sichtbare
       Meldung an der Karte. Ein Paket, dessen `schriften.css` ins Leere
       zeigt, wäre schlimmer als kein Paket. */
    dateien: [
      'pakete/design-system/index.html',
      'pakete/design-system/tokens.css',
      'pakete/design-system/schriften.css',
      'pakete/design-system/schriften.md',
      'pakete/design-system/CLAUDE.md',
    ],
    /* Nachgesehen, nicht geraten — jeder Verweis ist an einer Stelle im Paket
       festzumachen:
         inter           `schriften.css` lädt inter-variable.woff2 und
                         inter-variable-italic.woff2; `tokens.css` setzt
                         --font-sans: 'Inter', …
         jetbrains-mono  `schriften.css` lädt jetbrains-mono-variable.woff2;
                         `tokens.css` setzt --font-mono: 'JetBrains Mono', …
         pilot-ci        fünf der sechs Farbwerte dieser Palette stehen wörtlich
                         in `tokens.css` (#262626 · #ffe05e · #f1f1ec · #f4f1ea ·
                         #66655d). Nur Acid-Gelb #ffd400 nicht — das ist im
                         Marketplace kein Token, sondern lebt in der Palette.
                         Der Kontrastwert 11,58:1, den CLAUDE.md nennt, ist das
                         Paar Schwarz-auf-Signal-Gelb aus genau dieser Palette.
         lucide          NEU seit der Feedback-Runde 2026-08: Der Kartenfuß der
                         Beispielseite zeigt den Stimmen-Knopf des Marketplace
                         statt der abgeschafften Sterne-Zeile, und der trägt den
                         Lucide-Pfeil `arrow-up` als Inline-SVG. Genau zwei
                         Vorkommen, sonst kein Icon im Paket. Bis dahin stand
                         hier die Begründung „kein Verweis auf ein Icon-Set, die
                         Beispielseite enthält kein einziges <svg>" — die stimmt
                         seitdem nicht mehr, also steht der Verweis jetzt da.
                         Eine Datei kommt dadurch nicht ins ZIP: ICONSETS führt
                         `dateien: []`, das SVG steht wörtlich in der index.html.

       Was hier bewusst NICHT steht:
         Kein Verweis auf ein Muster (PATTERNS). Nachgesehen statt vermutet:
         das Paket benutzt keinen einzigen der zehn Hintergründe. Der einzige
         Verlauf im Paket ist der Textmarker `.mk` (base.css:250–252) — ein
         Bauteil, kein Hintergrund-Asset. Ein Verweis auf ein Muster wäre
         hübsch und falsch.
         Kein vierter Eintrag in ANWEISUNGEN für die CLAUDE.md dieses Pakets.
         Ein ANWEISUNGEN-Eintrag ist eine Projektstart-Vorlage für einen der
         drei Projekttypen; Designregeln sind das nicht. Die CLAUDE.md liegt
         deshalb als echte Datei im Ordner. Die ausführliche Begründung steht
         als Kommentar oben in `pakete/design-system/CLAUDE.md`. */
    verweise: [
      { typ: 'asset', id: 'inter', name: 'Inter' },
      { typ: 'asset', id: 'jetbrains-mono', name: 'JetBrains Mono' },
      { typ: 'asset', id: 'pilot-ci', name: 'pilot CI' },
      { typ: 'asset', id: 'lucide', name: 'Lucide' },
    ],
    tags: ['design', 'farben', 'schriften', 'css', 'vorlage', 'pilot'],
  },

];

/* Real gezählte Kennzahlen — berechnet, nicht getippt. Muster:
   BEISPIELDATEN_STATS in data/bausteine.js.
   `sammlungen` ist die Zahl der verschiedenen Zielsammlungen über alle
   Verweise hinweg; sie beantwortet die Frage „aus wie vielen Ecken der
   Bibliothek zieht ein Paket zusammen". */
const PAKETE_STATS = {
  total: PAKETE.length,
  mitOrdner: PAKETE.filter(p => !!p.ordner).length,
  dateien: PAKETE.reduce((s, p) => s + (p.dateien || []).length, 0),
  verweise: PAKETE.reduce((s, p) => s + (p.verweise || []).length, 0),
  sammlungen: new Set(PAKETE.flatMap(p => (p.verweise || []).map(v => v.typ))).size,
  tags: new Set(PAKETE.flatMap(p => p.tags || [])).size,
};
