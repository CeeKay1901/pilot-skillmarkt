/* ============================================================
   pilot AI Marketplace — Startprojekte: data/startprojekte.js
   (Bibliotheks-Umbau 2026-07, Stufe 3).

   Klassisches Script (kein Modul), definiert eine globale Konstante.

   Definierte Globals:
     STARTPROJEKTE — 3 Gerüste zum Herunterladen, je eines pro Projekttyp
                     aus ANWEISUNGEN: einseiter | dashboard | auswerter.

   Was ein Gerüst ist: ein Ordner, der schon läuft, aber noch nichts von
   dir weiss. Doppelklick auf die `index.html` und es passiert etwas — mit
   Beispielinhalt, den du ersetzt. Kein Server, keine Installation, kein
   Netz. Das ist der Unterschied zur Projektanweisung nebenan: die
   beschreibt, WIE gebaut wird, das Gerüst ist schon gebaut.

   Wer diese Datei liest:
     1. Der Abschnitt „Startprojekte" in `showroom.html` — Karte,
        Dateiliste, ZIP-Knopf, Verweis auf die passende Anleitung.
     2. Die globale Suche und „Deine Sachen" über `GSEARCH_GROUPS`
        (shared/base.js) — dafür sind `id`, `name`, `kurz` und `tags` da.

   Felder je Eintrag:
     id         URL-tauglich, eindeutig. Zugleich Ordnername und Name des
                ZIP (`<id>.zip`). Deep-Link `showroom.html?g=<id>`, daraus
                normalisiert der Anker `#sp-<id>`.
     name       Anzeigename der Karte
     kurz       ein Satz: was das Gerüst beim Öffnen tut
     wofuer     1–2 Sätze: für welche Art Aufgabe man es nimmt
     anweisung  `id` aus ANWEISUNGEN (data/anweisungen.js). Deren `text`
                wird beim Packen unverändert als `CLAUDE.md` ins ZIP
                gelegt. Zuordnung 1:1, jede Vorlage genau einmal —
                dashboard→kleines-tool, auswerter→datenauswertung,
                einseiter→einseiter. Kein zweiter Bestand als String-Kopie.
     ordner     Pfad im Repo, mit Schrägstrich am Ende
     liveUrl    was der Knopf „Ansehen" öffnet (repo-relativ)
     dateien    Ist-Zustand des Ordners, Pfade relativ zu `ordner`.
                OHNE `CLAUDE.md` — die gibt es auf der Platte nicht, sie
                entsteht erst beim Packen aus ANWEISUNGEN. Diese Liste ist
                gegen `find startprojekte/<id> -type f` abgeglichen, nicht
                abgeschrieben; sie ist zugleich die Packliste des ZIP.
     tags       4–6 kleingeschriebene Schlagworte für die Suche

   KEINE EXTERNEN URLS in dieser Datei. `node tools/qa/index.mjs links`
   liest alle Dateien in `data/` und prüft jede http(s)-Adresse einzeln,
   Exit 1 bei Nicht-200. Alles hier ist repo-relativ — auch damit die
   Seite per `file://` funktioniert.

   REIHENFOLGE: nach Einstiegshöhe, nicht alphabetisch. Der Einseiter
   verlangt nur, Text zu ersetzen — da kann nichts rechnen und nichts
   schiefgehen. Das Dashboard verlangt eine eigene Tabelle. Der Auswerter
   verlangt zusätzlich, das Datenformat zu verstehen, das er meldet. Wer
   von oben nach unten liest, findet den ersten Erfolg zuerst.

   Zahlen-Ehrlichkeit: In `kurz` und `wofuer` steht keine Zahl, die aus
   einer Datei kommt. Die Zahl der Dateien und der Startprojekte rechnet
   die Seite aus `dateien.length` bzw. `STARTPROJEKTE.length`.
   ============================================================ */

const STARTPROJEKTE = [

  {
    id: 'einseiter',
    name: 'Einseiter',
    kurz: 'Eine Seite zum Weitergeben — Titel, Kernsatz, drei Zahlen, Bild und Kontakt stehen schon da und werden von dir überschrieben.',
    wofuer: 'Für alles, was heute eine Präsentation wäre, obwohl ein Link reichen würde: Rückblick, Zwischenstand, Übersicht für Leute, die nicht dabei waren. Gerechnet wird nichts — du tauschst nur Texte. Die Stellen, an denen noch eine echte Angabe fehlt, sind auf der Seite gelb markiert, damit keine vergessen wird.',
    anweisung: 'einseiter',
    ordner: 'startprojekte/einseiter/',
    liveUrl: 'startprojekte/einseiter/index.html',
    dateien: ['index.html', 'bilder/platzhalter.svg'],
    tags: ['einseiter', 'rückblick', 'weitergeben', 'text', 'html', 'offline'],
  },

  {
    id: 'dashboard',
    name: 'Kampagnen-Dashboard',
    kurz: 'Tabelle rein, Diagramme raus: Kacheln mit den Summen, ein Balkenvergleich je Gruppe und ein Streudiagramm für zwei Zahlen.',
    wofuer: 'Für wiederkehrende Zahlen, die du sonst jedes Mal von Hand in Excel formst. Es liest eine CSV-Datei oder eine aus Excel kopierte Tabelle, erkennt das Trennzeichen selbst und rechnet im Browser. Unter jedem Diagramm steht der Rechenweg, damit du prüfen kannst, was es aus deiner Datei gemacht hat.',
    anweisung: 'kleines-tool',
    ordner: 'startprojekte/dashboard/',
    liveUrl: 'startprojekte/dashboard/index.html',
    dateien: ['index.html'],
    tags: ['dashboard', 'diagramm', 'kennzahlen', 'csv', 'excel', 'einzeldatei'],
  },

  {
    id: 'auswerter',
    name: 'Umfrage-Auswerter',
    kurz: 'Wertet eine Antwort-Tabelle aus und schreibt zuerst hin, welches Format es erkannt hat — erkennt es nichts, rechnet es nichts.',
    wofuer: 'Für Tabellen mit Antworten: je Frage die Verteilung, dazu eine offene Bilanz, in der gelesene, verwertete und übersprungene Zeilen zusammen genau die Zeilenzahl der Datei ergeben. Im Ordner liegen die beiden üblichen Tabellenformate als Beispiel und eine absichtlich unbrauchbare Datei, damit du siehst, wie das Gerüst sich weigert statt zu raten.',
    anweisung: 'datenauswertung',
    ordner: 'startprojekte/auswerter/',
    liveUrl: 'startprojekte/auswerter/index.html',
    dateien: [
      'index.html',
      'daten/umfrage-breitformat.csv',
      'daten/umfrage-langformat.csv',
      'daten/probe-kaputt.txt',
    ],
    tags: ['umfrage', 'auswertung', 'csv', 'daten', 'tabelle', 'kennzahlen'],
  },

];
