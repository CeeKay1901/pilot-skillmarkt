# Implementierungsplan: pilot AI Marketplace

**Stand:** 2026-07-15 · **Status:** Finalisiert nach zwei Fragerunden (Grundsatz + GSD-Grauzonen) — zur Freigabe
**Ausgangspunkt:** Skill Marketplace (`index.html`, ~7.850 Zeilen, 3 Views, 39 Skills, live via GitHub Pages)
**Zielbild:** Vollständiger interner AI-Marktplatz für die pilot Agenturgruppe — ein Ort für Skills, Plugins, Frameworks, Prompts, Assets, Lernressourcen, Hilfe und einen Vibecoding-Showroom. Feedback, Kollaboration und Partizipation bleiben Leitmotiv; Einsteiger:innen (von Langdock kommend) finden überall einen geführten Einstieg.

---

## 1. Getroffene Grundsatzentscheidungen

| Frage | Entscheidung |
|---|---|
| Name | **pilot AI Marketplace** |
| Architektur | **Multi-Page-Aufbau**: zentrale Startseite + eine HTML-Seite pro Sektion, geteilte `shared/base.css` + `shared/base.js`, **kein Build-Schritt**, GitHub Pages |
| Feedback/Kollaboration | **Bleibt simuliert** (kuratierte Beispiel-Stimmen im Code + eigene Eingaben via localStorage), aber durchgängig inszeniert und ehrlich erklärt |
| Inhaltstiefe | **Leuchtturm + Breite**: pro Sektion 3–5 voll ausgearbeitete, sofort nutzbare Inhalte + 10–20 solide schlankere Einträge |
| Plugins & Frameworks | **Im Katalog als Typen** (Tabs: Alle / Skills / Plugins / Frameworks), gleiche Karten/Modals/Bewertungen, Typ-Erklärer |
| Prompt-Sammlung | **Beide Systeme** (Langdock + Claude Code) mit Plattform-Chips wie bei Skills |
| Asset-Bibliothek | **Design-Assets + pilot-Brand-Vorlagen** |
| Code-Bausteine & Beispieldaten | **Eigene Sektion „Baukasten“** |
| Schulung | **Nur kuratierter Ressourcen-Katalog** (kein eigener Lernpfad) |
| Hilfe-Center | Ja — **mit Partizipations-Dreh**: von Nutzern gerankte `/befehle` und CLI-Flags, bewertetes Glossar (KI- + SWE-Begriffe), alles was schnell Verständnis und Nutzung aufbaut |
| Nicht gewählt | Eigene News-Seite, Community-/Expertenverzeichnis, Agenten-Sektion (später möglich) |
| Vorgehen | **Etappen mit Checkpoints** — nach jeder Etappe schaust du drauf |

### 1.1 Vertiefte Entscheidungen (GSD-Fragerunde, 2026-07-15)

**Inszenierung & Ehrlichkeit**
- **Feste Persona-Riege**: ~10–12 fiktive Kolleg:innen in `data/contributors.js`
  (Vorname + Säule/Standort + Initialen-Avatar in pilot-Farben). Dieselben Personen
  tauchen überall wieder auf — bewerten, kommentieren, zeigen Showroom-Projekte.
- **Demo-Kennzeichnung dezent zentral**: ein Satz im Footer + Punkt im „Über diese
  Seite“-Modal („Bewertungen und Stimmen sind derzeit redaktionelle Demo-Daten —
  deine Eingaben bleiben lokal in deinem Browser“). Keine Labels an den Modulen.
- **Statistiken zeigen nur real Zählbares** (live aus den data/-Arrays gezählt:
  „39 Skills · 20 Prompts · …“). Keine erfundenen Aktivitätszahlen; Kopier-Zähler
  o.ä. nur dort, wo ein Feature sie zwingend braucht (z.B. „Meistkopiert“) und
  dann klein gehalten.

**Prompt-UX**
- **Prompt-Builder für die 5 Leuchttürme**: Eingabefelder (Kunde, Zielgruppe,
  Ton …) füllen den Prompt live, kopiert wird das fertige Stück. Die übrigen
  Prompts: gelb markierte `[PLATZHALTER]` im Text.
- **Vorschau als Chat-/Terminal-Inszenierung** bei Leuchttürmen: Langdock-Prompts
  als nachgestellte Chat-Ansicht (Prompt-Blase → KI-Antwort), Claude-Code-Prompts
  über die bestehende `playScript`-Terminal-Mechanik. Breite-Einträge: statischer
  Beispiel-Output.
- **Varianten als Tabs im Modal** (Standard · Kurz · Ausführlich — nur wo vorhanden).
- **Gliederung nach Aufgaben-Taxonomie** wie im Katalog (ein mentales Modell).

**Showroom**
- **Jeder inszenierte Case bekommt eine echte Mini-Demo** (Single-File-Tool im
  Repo), per Playwright gescreenshottet und **live verlinkt** — „Ansehen“ führt
  immer zu etwas Klickbarem.
- **Stories: Standard-Ansicht kompakt** (4–5 Sätze + Fakten-Box), ausführliche
  Fassung (Problem → erster Prompt → Stolperstein → Ergebnis) **optional
  aufklappbar** — ausgearbeitet nach Leuchtturm-Prinzip für die 2–3 Top-Cases.
- **Absender-Regel**: kleine Tools (TKP-Rechner, Umfrage-Auswertung) laufen als
  Persona-Cases; nur ein ausgewachsenes echtes Projekt (Kandidat: VibeFeedback)
  liefe unter Christophers Namen als stärkster Echtheits-Beweis (optionaler
  Leuchtturm-Case).

**Startseite & Navigation**
- **Der Outcome-Router IST der Hero** („Was willst du tun?“ mit 6–8 Ziel-Kacheln
  direkt im Sichtfeld), Sektions-Karten und „Meine Reise“ darunter.
- **Header: 5 sichtbare Punkte + „Mehr“**: Katalog · Prompts · Baukasten ·
  Showroom · Hilfe · Mehr ▾ (Lernen, Asset-Bibliothek) + Such-Lupe. Mobil: Burger.
- **Etappen-Zwischenstände**: die Startseite zeigt ab E1 alle 7 Sektions-Karten — fertige
  klickbar, kommende als „In Arbeit“-Teaser mit 1-Satz-Ausblick. Die Nav führt
  nur zu Fertigem (keine toten Links).
- **Globale Suche als Overlay auf jeder Seite** (E9): durchsucht alle
  data/-Arrays, gruppiert Treffer nach Typ, verlinkt direkt.

---

## 2. Zielarchitektur

### 2.1 Dateistruktur

```
pilot-skillmarkt/
├── index.html              ← NEU: Startseite (Überblick, Einstieg, Router)
├── skills.html             ← bisheriger Katalog inkl. Plugins/Frameworks
│                              + Views „Was sind Skills?“ und „Skill bauen“
├── prompts.html            ← Prompt-Sammlung
├── hilfe.html              ← Hilfe-Center (Befehle-Ranking, Glossar, FAQ)
├── lernen.html             ← kuratierter Ressourcen-Katalog
├── bibliothek.html         ← Asset-Bibliothek (Design + Brand)
├── baukasten.html          ← Code-Bausteine + Beispieldaten
├── showroom.html           ← Vibecoding-Showroom
├── shared/
│   ├── base.css            ← Design-Tokens + alle gemeinsamen Komponenten
│   └── base.js             ← Nav, Modal-Engine, Rating-Engine, Suche, Utils
├── data/
│   ├── skills.js           ← SKILLS-Array (aus index.html ausgelagert)
│   ├── prompts.js, befehle.js, glossar.js, ressourcen.js,
│   ├── assets.js, bausteine.js, cases.js
│   └── contributors.js     ← gemeinsame Personas für seeded Stimmen
├── skills/                 ← unverändert (SKILL.md-Dateien, manifest.json)
├── assets/                 ← unverändert (Fonts) + neue Download-Dateien
├── beispieldaten/          ← NEU: CSV/XLSX/Briefings/Bilder zum Üben
└── build-skills.mjs        ← unverändert
```

Alle Daten liegen als JS-Arrays in `<script src="data/...">`-Dateien — kein Fetch nötig,
kein Build, funktioniert wie bisher. Der bestehende Datei-Viewer (fetch von `REPO_RAW`)
bleibt unverändert.

### 2.2 shared/base.js — gemeinsame Engine

Aus `index.html` extrahiert und **verallgemeinert auf Item-Typen**:

- **`renderNav(activePage)`**: Header + Footer werden per JS injiziert → eine Quelle
  für Navigation auf allen 8 Seiten (kein Copy-paste-HTML pro Seite).
- **Modal-Engine**: generisches Detail-Modal mit Tabs (bisheriger Skill-Modal-Code,
  parametrisiert).
- **Rating-Engine**: Sterne + Kommentare + „hat geholfen“-Votes, localStorage-Keys
  nach Typ namespaced (`rate:prompt:<id>`, `vote:befehl:<id>`, …). `bayesScore()`
  zieht in base.js um und gilt für alle Kataloge.
- **Favoriten & „ausprobiert“** typ-übergreifend (`fav:<typ>:<id>`), damit die Startseite
  eine sektionsübergreifende „Meine Reise“ zeigen kann.
- **Utils**: `copyToClipboard`, `animateCount`, Lucide-`LU`-Icon-Map, Such-/Filter-
  Helfer, aktive-Filter-Leiste, `skillBadge()`-Logik als `itemBadge()`.

### 2.3 shared/base.css — Design-System

Extraktion des bestehenden CSS + Erledigung der bekannten offenen Baustellen:

- **Tokens vereinheitlichen**: Typo-Skala (die drei still auf 300 zurückziehenden
  h1-Regeln sind schon gefixt — jetzt als saubere Skala festschreiben), Grautöne
  und Radien konsolidieren (bekannte offene Punkte aus dem Audit).
- Komponenten: Cards, Chips, Pills, Modals, Hero-Muster, Filter-Leiste, Tabs,
  Terminal-Look, Footer — einmal definiert, überall gleich.
- pilot-CI unverändert: Schwarz `#262626`, Gelb `#ffe05e`, Beige `#f1f1ec`, Inter,
  editorial, wenig Emoji (Lucide-SVGs).

### 2.4 Navigation & Verlinkung

Header (desktop, entschieden): **Logo · Katalog · Prompts · Baukasten · Showroom ·
Hilfe · Mehr ▾** (Dropdown: Lernen, Asset-Bibliothek) · Such-Lupe (öffnet ab E9 das
globale Such-Overlay). Mobil: Burger-Menü mit allen Punkten. Die Nav führt während
der Bauphase nur zu fertigen Seiten — kommende Sektionen erscheinen ausschließlich
als „In Arbeit“-Teaser-Karten auf der Startseite.

- **Deep-Links bleiben gültig**: `index.html?skill=x` leitet per JS auf
  `skills.html?skill=x` weiter (alte geteilte Links brechen nicht).
- Jede Sektion bekommt eigenes Deep-Link-Schema (`prompts.html?p=…`,
  `hilfe.html?begriff=…`, `showroom.html?case=…`).

---

## 3. Gemeinsame Feature-Bausteine (jede Sektion bekommt sie)

Damit alle Sektionen „ähnlich umfangreich wie der Skill-Katalog“ sind, gilt pro
Sektion diese Grundausstattung:

1. **Inszenierter Kopf**: eigener Hero mit Zahl-Statistiken (`animateCount`) und
   1-Satz-Nutzenversprechen.
2. **Erklär-Block „Was ist das & wofür brauche ich es?“**: einklappbarer
   Onepager-Abschnitt im Stil von „Was sind Skills?“ (Anatomie, Beispiel, 3 Schritte
   zum ersten Erfolg) — der Einsteiger-Einstieg jeder Seite.
3. **Katalog**: Karten + Filter + Suche + Sortierung (empfohlen/Bewertung/Titel via
   Bayes-Score) + aktive-Filter-Leiste + Zählungen.
4. **Detail-Modal** mit Tabs: Inhalt/Vorschau · Beispiel-Ergebnis · Bewertungen &
   Stimmen · (typspezifisch: Dateien, Varianten, Nachbauen …).
5. **Partizipation**: seeded Bewertungen/Kommentare von der festen Persona-Riege
   (~10–12 fiktive Kolleg:innen in `contributors.js`: Vorname + Säule/Standort +
   Initialen-Avatar, konsistent über alle Sektionen — das Team fühlt sich echt an),
   eigene Bewertung/Kommentar (localStorage), **„Einreichen“-CTA** mit Demo-Flow
   („So würde dein Beitrag den Weg in den Katalog finden“ — 3 Schritte, Formular,
   Danke-Zustand). Demo-Charakter wird zentral gekennzeichnet (Footer-Satz +
   „Über diese Seite“-Modal), nicht an jedem Modul.
6. **Einsteiger-Pfad**: „Fang hier an“-Pin (je 1 Einstiegs-Item pro Sektion),
   kopierbare Startprompts wo sinnvoll, Querverweis zurück zum Router der Startseite.
7. **Querverweise**: Items verlinken aufeinander (Showroom-Case → benutzte Skills
   & Prompts; Prompt → passender Skill; Baustein → Showroom-Case, der ihn nutzt).

---

## 4. Die Sektionen im Detail

### 4.1 Startseite (`index.html`) — „Ein Ort für alles, was ihr mit KI baut“

- **Der Outcome-Router IST der Hero** (entschieden): „Was willst du tun?“ mit 6–8
  Ziel-Kacheln direkt im Sichtfeld — „Präsentation bauen“ → Skill pptx · „Besseren
  Prompt schreiben“ → Prompts · „Sehen, was möglich ist“ → Showroom · „Ich hänge
  fest“ → Hilfe-Center · „Etwas Hübsches bauen“ → Baukasten/Bibliothek ·
  „KI verstehen“ → Lernen. Dazu schlanke Stats-Zeile mit **ausschließlich real
  gezählten Zahlen** aus den data/-Arrays. Der Router im Skill-Katalog bleibt,
  wird aber skills-spezifisch.
- **Sektions-Karten** darunter, mit Live-Zählern und je einem hervorgehobenen
  Leuchtturm-Item; noch nicht gebaute Sektionen als „In Arbeit“-Teaser mit
  1-Satz-Ausblick (ab E1 sichtbar — die Vision ist von Anfang an erkennbar).
- **„Meine Reise“**: sektionsübergreifender Fortschritt (Favoriten, Ausprobiert,
  abgegebene Stimmen) — macht Partizipation für den Einzelnen sichtbar.
- **„Neu dazugekommen“**: kleine, manuell gepflegte Liste (kein eigener News-Bereich).
- **Getting-Started kompakt**: die bewährten 4 Schritte inkl. Step-0
  („Claude Code startklar machen“) als Kurzfassung + Link in den Katalog;
  „Citizen Coding“ wird hier erstmals **in einem Satz definiert** (offener Punkt).

### 4.2 Katalog (`skills.html`) — Skills, Plugins & Frameworks (Umbau)

Bestehender Katalog zieht 1:1 um, dann Erweiterung:

- **Typ-Taxonomie**: jedes Item bekommt `itemType: 'skill' | 'plugin' | 'framework'`.
  Typ-Tabs über dem Katalog (Alle / Skills / Plugins / Frameworks), Typ-Badge auf
  der Karte, **Typ-Erklärer** („Skill = eine Fähigkeit · Plugin = Paket aus Skills
  und Befehlen · Framework = komplette Arbeitsweise“) analog zum bisherigen
  Plattform-Explainer.
- **Neue Inhalte** (kuratiert, echt existierend):
  - Plugins (3–4): superpowers (obra), ralph-loop, + 1–2 weitere geprüfte
    Community-Plugins. Modal-Tab „Installation“ mit `/plugin`-Terminal-Demo.
  - Frameworks (2–3): GSD (planen→bauen→prüfen), Test-Driven Development als
    Arbeitsweise, Brainstorm→Plan→Execute-Kette (superpowers-Workflow). Frameworks
    haben statt Download einen „So arbeitest du damit“-Ablauf im Modal.
- **Feedback sichtbarer** (Verbesserung Bestand): rotierendes Modul „Stimmen aus
  dem Team“ im Katalogkopf; nach Klick auf „ausprobiert“ ein sanfter
  Kommentar-CTA („Wie lief’s? 20 Sekunden Feedback“).
- „Was sind Skills?“ und „Skill bauen“ bleiben als Views auf dieser Seite;
  der Erklärer bekommt einen Abschnitt zu Plugins/Frameworks.

### 4.3 Prompt-Sammlung (`prompts.html`)

- **Datenmodell**: id, Titel, Aufgaben-Gruppe (gleiche Verb-Taxonomie wie Katalog:
  texten/gestalten/präsentieren/media/…), `platforms` (langdock/code),
  Schwierigkeit, Prompt-Text mit `[PLATZHALTERN]`, optionale Varianten,
  Beispiel-Ergebnis, **„Warum funktioniert das?“**-Erklärung (2–3 Sätze
  Prompt-Technik — der Lern-Effekt), Tags, seeded Stimmen.
- **Features**: Ein-Klick-Kopieren (Platzhalter bleiben gelb markiert),
  **interaktiver Prompt-Builder bei den 5 Leuchttürmen** (Eingabefelder füllen den
  Prompt live, kopiert wird das fertige Stück), Plattform-Chips + Filter,
  Varianten als Modal-Tabs (Standard · Kurz · Ausführlich), **Vorschau als
  Inszenierung**: Langdock-Leuchttürme mit nachgestellter Chat-Ansicht
  (Prompt-Blase → KI-Antwort), Claude-Code-Prompts mit der bestehenden
  `playScript`-Terminal-Demo; Breite-Einträge mit statischem Beispiel-Output.
- **Partizipation**: „Variante einreichen“ (Demo-Flow) — Prompts sind der
  natürlichste Remix-Kandidat; Ranking „Meistkopiert“ (seeded Zähler + lokale Kopien).
- **Inhalte**: 5 Leuchttürme (voll: Varianten + Beispiel-Output + Warum-Erklärung,
  z.B. Briefing-Zusammenfassung, Kampagnen-Claim-Werkstatt, Excel-Formel-Erklärer,
  Vibecoding-Kickoff-Prompt, Feedback-Formulierer) + 15–20 solide Einträge über
  alle Aufgaben-Gruppen und Säulen.

### 4.4 Hilfe-Center (`hilfe.html`)

Drei Säulen, alle mit Ranking/Bewertung durch Nutzer:

1. **Befehle & Kniffe**: `/befehle`, Flags und Tastentricks für Claude Code
   (`/clear`, `/compact`, `/model`, `ESC ESC`, `--resume`, Shift+Tab, …) sowie
   Langdock-Pendants. Jede Karte: Befehl (kopierbar), 1-Satz-Nutzen, Mini-Beispiel,
   **„Hat mir geholfen“-Upvote** → Liste sortiert sich nach Votes (seeded + lokal).
   Das von dir gewünschte Nutzer-Ranking ist hier das Kern-Feature.
2. **Glossar**: die wichtigsten KI- und Software-Begriffe (Token, Kontext, Prompt,
   MCP, Repo, Deploy, localStorage, …) — je 1 einfacher Satz + 1 pilot-Beispiel +
   optionale Tiefe zum Aufklappen. Suchfeld, A–Z-Sprungleiste, „hat geholfen“-Voting,
   Querverweise auf Skills/Prompts, die den Begriff praktisch zeigen.
3. **Troubleshooting/FAQ**: 8–12 häufige Blocker („Claude Code startet nicht“,
   „Kontext voll — was tun?“, „Wie teile ich mein Tool?“) als aufklappbare Karten
   mit Schritt-für-Schritt-Lösung.

Umfang: ~25 Befehle, ~40 Begriffe, ~10 FAQ. Leuchttürme: die 5 wichtigsten
Befehle mit Mini-Terminal-Demo (bestehende `playScript`-Mechanik wiederverwendet).

### 4.5 Lernen (`lernen.html`)

- **Kuratierter Ressourcen-Katalog** (bewusst kein eigener Kurs): ~25 Einträge —
  echte, geprüfte Links (Anthropic-Doku & -Kurse, gute YouTube-Erklärungen,
  Artikel, Langdock-Hilfe, interne pilot-Ressourcen als Platzhalter).
- **Datenmodell**: Typ (Video/Artikel/Doku/Kurs/intern), Niveau
  (Einsteiger/Fortgeschritten), Dauer, Sprache (DE/EN), Plattform-Bezug, 1-Satz
  „Für dich, wenn …“-Empfehlung, seeded Bewertungen.
- **Features**: Filter nach Niveau/Typ/Dauer/Sprache, „Start hier“-Pin
  (die eine Ressource für den Anfang), Sortierung nach Team-Bewertung.
- **Partizipation**: „Ressource vorschlagen“-Demo-Flow; „Das hat mir geholfen“-Votes.

### 4.6 Asset-Bibliothek (`bibliothek.html`)

- **Design-Assets** (orientiert an deiner lokalen design-assets-Bibliothek,
  Auswahl mit klarer Lizenz — nur OFL/MIT/CC0):
  - 8–10 Webfonts mit **Live-Vorschau** (editierbarer Beispieltext, Größen-Slider),
    Download + „Sag Claude: binde Font X lokal ein“-Startprompt.
  - 3–4 Icon-Sets (Lucide & Co.) mit durchsuchbarem Icon-Browser (SVG kopieren).
  - 6–8 Farbpaletten (inkl. pilot-CI) mit Klick-kopier-Hex-Swatches und
    Kontrast-Hinweis (AA-tauglich ja/nein — Einsteiger-Schutz).
  - Hintergrund-Patterns/Gradients mit Vorschau.
- **pilot-Brand-Vorlagen**: CI-Spickzettel (Farben, Typo, Ton), PPT- und
  Doc-Vorlage als Download, Logo-Nutzungs-Merkblatt, Tonalitäts-Kurzreferenz —
  verzahnt mit den Skills `brand-guidelines`/`tonalitaets-check`.
- Jedes Asset: Karte + Modal mit Vorschau, Einsatz-Beispiel, Download/Copy,
  Bewertungen. Leuchttürme: Font-Preview, Icon-Browser, Paletten-Kopierer.

### 4.7 Baukasten (`baukasten.html`)

- **Code-Bausteine** (~12, davon 4 Leuchttürme): Header/Hero, Karten-Grid,
  Kontaktformular-Optik, Chart-Setup, Tabellen-Look, Footer … Jeder Baustein:
  **Live-Vorschau** (sandboxed iframe mit `srcdoc` — kein Fetch, kein Build),
  Code-Ansicht mit Copy-Button, und der eigentliche Clou für Einsteiger:
  ein kopierbarer **„Sag Claude einfach: …“-Prompt** („Nutze diesen Baustein als
  Ausgangspunkt und passe ihn an …“) — Bausteine werden über Claude benutzt,
  nicht von Hand eingebaut.
- **Beispieldaten & Testdateien** (`beispieldaten/`): 3–4 anonymisierte
  CSV/XLSX-Datensätze (Kampagnen-KPIs, Budget-Plan, Umfrage-Rohdaten),
  2 Dummy-Briefings, Testbilder — jeweils mit „Übungsidee“: welcher Skill/Prompt
  damit ausprobiert werden kann (Querverweis!). Kein echtes Kundenmaterial.
- **Partizipation**: „Baustein einreichen“ (Demo-Flow), „Meistkopiert“-Ranking.

### 4.8 Showroom (`showroom.html`)

- **Case-Format** (das Herzstück): Screenshot/Vorschau, „So ist es entstanden“-Story
  — **Standard-Ansicht kompakt** (4–5 Sätze + Fakten-Box: Dauer, Skills, Aufwand),
  ausführliche Fassung (Ausgangsproblem → erster Prompt → Stolperstein → Ergebnis)
  **optional aufklappbar**, voll ausgearbeitet bei den 2–3 Top-Cases —,
  **verwendete Skills & Prompts als klickbare Querverweise**, ehrliche Zeitangabe
  („Feierabend-Projekt, ~2 Stunden“), Zitat der Erbauer:in, Live-Link.
- **Inhalte — Mix echt + inszeniert, alles klickbar**:
  - Basis echt (3–4): TKP-Rechner und Umfrage-Auswertung (liegen schon im Repo
    unter `tools/`) und weitere kleine reale Tools — laufen als **Persona-Cases**
    (Absender-Regel aus 1.1). Optionaler Leuchtturm: ein ausgewachsenes Projekt
    (Kandidat: VibeFeedback) unter Christophers Namen.
  - Inszeniert (5–6): plausible Kolleg:innen-Projekte quer über die Säulen
    (Media: Flighting-Visualisierer · Insights: Umfrage-Dashboard · Creation:
    Moodboard-Generator · Office: Urlaubsübergabe-Helfer …), realistisch
    dimensioniert — Feierabend-Format, keine Wunder-Projekte. **Jeder inszenierte
    Case bekommt eine echte Single-File-Mini-Demo im Repo** (Playwright-Screenshot
    + Live-Link — „Ansehen“ führt immer zu etwas Klickbarem). Personas aus
    `contributors.js`.
- **Features**: Filter nach Säule/Aufwand/Projektart, „Projekt des Monats“-Spotlight,
  Detail-Modal mit Story-Tabs, „Nachbauen“-Tab (Startprompt + Links zu Bausteinen
  und Beispieldaten — die Brücke zum Baukasten).
- **Partizipation**: prominentester Einreichen-Flow der ganzen Seite
  („Zeig, was du gebaut hast“) — der Showroom lebt von Beiträgen; Reaktionen
  („Will ich auch!“-Button) statt Sterne-Rating.

---

## 5. Verbesserungen am Bestand (Feedback · Partizipation · Einsteiger)

Zusätzlich zu den Sektions-Umbauten, verteilt über die Etappen:

1. **Token-Konsolidierung** (E1): Typo-Skala, Grautöne, Radien in base.css — erledigt
   die offenen Punkte aus dem letzten Audit nebenbei.
2. **„Citizen Coding“ in einem Satz** definieren (Startseite + Erklärer) — offener Punkt.
3. **Stimmen sichtbarer**: „Stimmen aus dem Team“-Module (Katalogkopf + Startseite),
   Kommentar-CTA nach „ausprobiert“.
4. **Einreichen ehrlich inszenieren**: einheitlicher Demo-Flow-Baustein mit klarer
   Kennzeichnung, wie der echte Weg aussähe — statt totem Button.
5. **Einsteiger-Konsistenz**: jede Sektion hat denselben Dreiklang
   (Erklär-Block → „Fang hier an“-Pin → kopierbarer Startprompt), sodass das auf
   der Katalog-Seite Gelernte überall trägt.
6. **Filter-Entrümpelung Katalog** (offener Punkt): Quellen-Filter einklappen,
   Fokus auf Aufgaben-Tabs + Typ-Tabs.

---

## 6. Etappenplan (mit Checkpoints)

Nach jeder Etappe: Playwright-Verifikation (Desktop + Mobil, 0 JS-Fehler),
Commit + Push (= live), kurzer Report an dich → du schaust drauf, wir justieren.

| # | Etappe | Inhalt | Ergebnis |
|---|---|---|---|
| **E1** | **Fundament & Umzug** | `shared/base.css` + `shared/base.js` extrahieren (inkl. Token-Konsolidierung), SKILLS → `data/skills.js`, Katalog zieht nach `skills.html`, neue Startseite auf `index.html` (Router-Hero, Sektions-Karten — künftige Sektionen als „In Arbeit“-Teaser), Deep-Link-Weiterleitung, JS-injizierte Nav | Alles Bisherige funktioniert unverändert unter neuer Struktur; Startseite live |
| **E2** | **Katalog-Ausbau** | Typ-Taxonomie Skill/Plugin/Framework, Typ-Tabs + Badges + Erklärer, 3–4 Plugins + 2–3 Frameworks kuratiert, Install-Demos, „Stimmen aus dem Team“, Filter-Entrümpelung | Katalog = Erweiterungs-Katalog |
| **E3** | **Prompt-Sammlung** | `prompts.html` komplett: 5 Leuchttürme + 15–20 Einträge, Kopieren/Varianten/Warum-Erklärungen, Plattform-Chips, Einreichen-Flow | Zweite große Sektion live |
| **E4** | **Hilfe-Center** | `hilfe.html`: Befehle-Ranking (~25), Glossar (~40), FAQ (~10), Upvotes, Terminal-Demos | Einsteiger-Sicherheitsnetz steht |
| **E5** | **Lernen** | `lernen.html`: ~25 kuratierte, geprüfte Ressourcen mit Filtern + Bewertungen | |
| **E6** | **Asset-Bibliothek** | `bibliothek.html`: Fonts mit Live-Preview, Icon-Browser, Paletten, Patterns, Brand-Vorlagen | |
| **E7** | **Baukasten** | `baukasten.html`: ~12 Bausteine mit iframe-Live-Vorschau + „Sag Claude“-Prompts, `beispieldaten/` mit Übungsideen | |
| **E8** | **Showroom** | `showroom.html`: 3–4 echte + 5–6 inszenierte Cases **inkl. Bau der Mini-Demos** (aufwändigste Inhalts-Etappe), kompakt/aufklappbare Stories, Nachbauen-Tabs, Einreichen-Flow, Querverweise in beide Richtungen | Emotionaler Höhepunkt der Seite |
| **E9** | **Verzahnung & Politur** | Querverweise komplettieren, Startseiten-Zähler/„Meine Reise“ final, **globales Such-Overlay auf allen Seiten** (durchsucht alle data/-Arrays, Treffer nach Typ gruppiert), Persona-Review + Webaudit über das Gesamtding, Feinschliff | Gesamtabnahme |

Grobe Einschätzung: E1 ist die größte Einzeletappe (Refactoring mit
Regressions-Risiko), E3/E4/E8 sind inhaltsschwer, E5/E6/E7 mittel.
Reihenfolge E3–E8 ist nach deinem Feedback frei umsortierbar.

---

## 7. Risiken & Leitplanken

- **E1 ist ein Refactoring am lebenden Objekt** → Playwright-Regressionstest
  vorher als Messlatte aufnehmen (Kernflüsse: Filter, Modal, Rating, Download,
  Deep-Link, Outcome-Router), erst nach grünem Lauf pushen.
- **Kein Build bleibt Gesetz**: alle neuen Features müssen mit `<script src>`-Daten
  und iframe-`srcdoc` auskommen; der fetch-basierte Datei-Viewer bleibt der einzige
  Teil, der HTTP braucht (wie heute).
- **Simulation ehrlich halten**: seeded Stimmen wirken echt, aber Einreichen-Flows
  sagen klar, dass es eine Demo ist — kein falsches Versprechen an Kolleg:innen.
- **Lizenz-Hygiene** in Bibliothek/Baukasten: nur OFL/MIT/CC0-Material, Lizenz
  steht am Asset.
- **Sprache & Ton**: durchgängig Deutsch, Du-Form, editorial, Lucide statt Emoji —
  wie bisher.
- **Performance**: data/-Dateien pro Seite laden nur, was die Seite braucht;
  die Startseite lädt für Zähler/Suche alle, aber `defer`.

---

## 8. Offen / bewusst verschoben

- Agenten & Automationen-Sektion, News-Bereich, Community-Verzeichnis (Kandidaten
  für später — Architektur lässt jede weitere Sektion als neue Seite + data-Datei zu).
- Echte geteilte Bewertungen (giscus/Backend) — Umstieg möglich, Rating-Engine
  wird dafür sauber gekapselt.
