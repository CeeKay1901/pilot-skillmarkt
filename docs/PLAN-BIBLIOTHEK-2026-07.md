# Implementierungsplan — Bibliothek, Inhalte, Neuigkeiten

**Stand:** 25.07.2026 · **Fassung 3** (Stufen 0 und 1 umgesetzt, Ergebnisse eingetragen)
**Grundlage:** Bestandsaufnahme vom 25.07.2026, eine Fragerunde mit sechs Entscheidungsblöcken, und ein Messlauf gegen den Ist-Zustand (Protokoll am Ende).

Dieses Dokument hält fest, **was entschieden ist**, damit es nicht neu verhandelt wird, und **in welcher Reihenfolge gebaut wird**. Es ersetzt keine der harten Regeln aus `CLAUDE.md` — die gelten weiter, besonders „kein Build-Step", „Zahlen-Ehrlichkeit" und „ändere nie einen Test, um ihn grün zu bekommen".

---

## Was Fassung 2 gegenüber Fassung 1 korrigiert

Die erste Fassung entstand direkt aus der Fragerunde und trug Zahlen aus der Bestandsaufnahme weiter, ohne sie noch einmal gegen den Code zu halten. Beim Nachmessen sind vier Fehler und sechs Lücken aufgefallen. Sie stehen hier zusammen, weil sie erklären, warum Stufe 1 und Stufe 3 anders aussehen als vorher.

**Falsch war:**

1. **„Changelog steht bei 30 von 37 Skills."** Nein. Ein Datenfeld `changelog` existiert überhaupt nicht (0 Treffer in `data/skills.js`). Der Reiter wird in `modalTabsFor()` **jedem** Eintrag mit `itemType: 'skill'` zugeteilt, also **allen 35 sichtbaren Skills**. 26 davon erzeugen genau einen Eintrag, 9 erzeugen zwei.
2. **„Alle neun Gattungen."** Es sind **zehn Datensammlungen** und **elf Suchtypen** — `SKILLS` bedient sowohl `skill` als auch `plugin`.
3. **„`badge: neu` bei 28 von 45 Skills."** Die 28 stimmt, die 45 sind aber keine Skills: 38 Skills + 4 Plugins + 3 Frameworks. Unter den 35 **sichtbaren** Skills tragen 24 das Abzeichen.
4. **„Die vier handgeschriebenen `<li>` entfallen."** Der Zählwert stimmt, die Schlussfolgerung nicht. Drei der vier sind **Bereichs-Eröffnungen** („Der Baukasten ist da"), keine Eintragsmeldungen. Eine eintragsweise Liste kann das nicht ausdrücken — die Information ginge verloren.

**Gefehlt hat:**

5. **Stufe 1 hätte zwei grüne Tests zerlegt.** `e6:i5_news_mentions_bibliothek` und `e7:i5_news_mentions_baukasten` prüfen beide `newsCount >= 3 && newsCount <= 4` **und** dass ein `.news-item .news-text a` genau auf `vorlagen.html?tab=assets` bzw. `vorlagen.html` zeigt. Acht Einträge hätten beide rot gemacht — in einer Stufe, der der Plan gar keine Testarbeit zugewiesen hatte.
6. **Stufe 3 hätte einen dritten grünen Test zerlegt.** `e8:03_ehrlichkeits_marker` verlangt fest `EXPECTED_TOTAL = 10`, `EXPECTED_ECHT = 4`, `EXPECTED_BEISPIEL = 6` und dass **jede** Karte genau **einen** Marker trägt. Ein dritter Marker sprengt das, und `istEcht: true|false` kann drei Zustände gar nicht abbilden.
7. **Der Neuigkeiten-Block wäre in seiner geplanten Form unbrauchbar geworden.** Der Messlauf über alle 243 Einträge ergibt nur **fünf verschiedene Tage**; 219 der 243 liegen auf dem 16. und 17. Juli. „Die letzten acht Einträge" wären buchstäblich **acht Glossarbegriffe vom 24. Juli** — sonst nichts. Details unten in Stufe 1.
8. **Der `seit`-Generator ist nicht trivial.** Die ID-Schreibweise wechselt sogar *innerhalb* von `data/assets.js`: Schriften stehen als `id: "inter"`, Muster als `"id": "dots"`. Ein naiver Pickaxe liefert für ganze Blöcke stumm null Treffer — im Test zurückgewiesen für `dots` und `grid`.
9. **Startprojekte passen nicht in das `CASES`-Schema.** Ein Gerüst hat keine `persona`, keine `story`, kein `zitat`, keinen `aufwand`, keine `liveUrl`, keinen `reaktionSeed` — sechs von sechzehn Feldern wären leer oder erfunden.
10. **Bilder im Repo sind unwiderruflich.** `.git` liegt heute bei 13 MB. Binärdateien lassen sich nachträglich nicht mehr aus der Historie entfernen, ohne sie umzuschreiben. Ohne Größenbudget wächst das Repo dauerhaft.

**Was sich dadurch ändert:** Stufe 1 wird tagesweise statt eintragsweise gebaut (und bleibt dadurch testneutral), Stufe 3 bekommt eine eigene Datenliste statt eines Eingriffs in `CASES` (und bleibt dadurch ebenfalls testneutral), und Stufe 5 ist kleiner als gedacht, weil zwei Bausteine schon da sind.

---

## Entschieden

| Frage | Entscheidung |
|---|---|
| Umfang Vorlagen-Umbau | **Eine Engine, sichtbar getrennte Bereiche.** Assets, Code-Bausteine und Beispieldaten teilen ein Modell; der Typ wird ein Filter, aber die Kategorien bleiben optisch klar getrennt. |
| Grobe Reiter | **Design · Code · Daten · Pakete** (heute: Bausteine · Design-Assets) |
| Paket-Begriff | Ein Paket darf **Verweise auf vorhandene Einträge UND eigene Dateien** enthalten. |
| Design-Systeme | **Mehrere möglich** (pilot-CI, später Kunden-CI, projekttyp-spezifische Regelwerke). Paket-Inhalt: Tokens, Schriften, Muster, Beispielseite **plus CLAUDE.md mit den Designregeln**. Ohne Logos — die bleiben ein eigener Eintrag mit eigener Nutzungsregel. |
| Kunden-CI | Kommt erst nach dem Umzug in die eigene Organisation (dann privat). Das Modell wird jetzt schon mehrfach-fähig gebaut. |
| Bilder | Bereich **startet jetzt** mit den zwei vorhandenen Test-SVGs plus echten Fotos aus freien Quellen als Übungsmaterial. Die spätere echte Bildbibliothek wird **verlinkt bzw. aus dem Backend bedient**, nicht ins Repo gelegt. |
| Startprojekte | **Drei neue schlanke Gerüste**: Dashboard · Auswerter · Einseiter. Je ein Ordner mit `CLAUDE.md`, `index.html` und Beispieldaten. Im Showroom als dritter Marker neben „Echtes Team-Tool" und „Beispiel-Projekt". |
| Projektanweisungen | **Kopierbare Vorlagen**, geschnitten **nach Projekttyp** — passend zu den drei Gerüsten. Kein Formular-Baukasten in diesem Durchgang. |
| Neuigkeiten | Contentorientiert, unten auf der Startseite, **tagesweise gruppiert** statt eintragsweise (Begründung in Stufe 1). Handgepflegte Liste entfällt bis auf **optionale Tages-Überschriften**. |
| Datumsfeld | Neues Feld **`seit`** = „seit wann auf der Seite", **aus der Git-Historie ermittelt**, für alle zehn Sammlungen. `addedAt` bleibt unverändert die redaktionelle Entstehungszeit. |
| Merken / Bewerten | **Merken überall.** Bewerten nur, wo man etwas wirklich benutzt hat. |
| Alte Daten und Links | **Sauber vereinheitlichen, Altes verfällt.** Bewusst in Kauf genommen: gespeicherte Merkungen alter Typen und geteilte `?a=`/`?b=`-Links brechen. |
| Reihenfolge | **Kleines zuerst, Umbau zuletzt.** Jede Stufe geht einzeln live. |
| Einreichwege | **Vertagt aufs Backend.** Die vier simulierten Flows bleiben vorerst, wie sie sind. |
| Regressionssuiten | e6, e7 und **e9** werden in Stufe 5 neu geschrieben; jeder verschobene Sollwert bekommt im Test seine Begründung. Stufen 0–4 kommen ohne Teständerung aus — in 0 und 1 nachgewiesen. |
| Changelog-Reiter | **Streichen.** |

---

## Reihenfolge und Zwänge

Die Stufen gehen einzeln live. Drei Abhängigkeiten sind echt und nicht verhandelbar:

- **Stufe 2 vor Stufe 3.** Die drei `CLAUDE.md`-Vorlagen aus Stufe 2 *sind* die `CLAUDE.md` der drei Gerüste aus Stufe 3. Ein Bestand, zwei Zugänge — aber nur, wenn er zuerst existiert.
- **Stufe 1 vor Stufe 5.** `seit` muss für den Altbestand ermittelt sein, **bevor** Stufe 5 IDs vereinheitlicht. Danach findet der Pickaxe die alte Historie nicht mehr. Deshalb gilt ab Stufe 1 die **Einfrier-Regel**: der Generator füllt nur Lücken und überschreibt **nie** ein vorhandenes Datum.
- **Stufe 0 hängt an nichts.** Kann jederzeit vorgezogen werden.

Stufe 4 ist unabhängig von allen anderen und kann eingeschoben werden, wo es passt.

---

## Stufe 0 — Sofort-Fixes · **erledigt 25.07.2026**

**Warum zuerst:** Unabhängig vom Umbau, kosten täglich Substanz, kommen im Umbau nicht automatisch mit.

1. **Farbfelder am Handy.** Gemessen bei 390 px: bei allen sieben Paletten werden Felder abgeschnitten, bei „pilot CI" zwei — die Hausfarbe ist dort nicht antippbar. Ursache: `.pal-swatches` ist ein `flex` mit `overflow: hidden`, die `.swatch` haben kein `min-width: 0`. Lösung: umbrechen statt abschneiden.
2. **Hex-Werte dauerhaft sichtbar.** `.swatch-hex` steht auf `opacity: 0` und erscheint nur bei Hover — auf Touch-Geräten also nie.

**Eine Vorgabe hat beim Bauen nicht gehalten.** Der Plan schrieb „Beschriftung mit je nach Untergrund heller oder dunkler Schrift". Nachgemessen über alle 36 Farben: **drei erreichen mit *keiner* der beiden Textfarben 4,5:1** — `#c2571a` 4,38:1 · `#7c7692` 4,21:1 · `#8a7d6b` 3,92:1. Der Ansatz hätte die eigene Abnahme nicht bestanden. Gebaut wurde stattdessen eine **deckende Plakette** (`#262626` auf `#fcfcfc`): 14,75:1 auf jedem Feld, unabhängig von der Farbe darunter. Die Abnahme unten ist entsprechend korrigiert — Beschriftung gegen **ihren eigenen Hintergrund**, nicht gegen das Farbfeld.

**Umgesetzt:** `flex-basis: 8rem` + `min-width: 0` + `flex-wrap`. Der Wert trifft alle drei Breiten: 306 px (Handy) → 3 pro Zeile, 507 px (Desktop, `.pal-grid` zweispaltig) → alle 6, ~686 px (Tablet, einspaltig) → alle 6. Dazu `.swatch:hover` von der Kurzform `flex: 1.4` auf `flex-grow: 1.4` — die Kurzform hätte die `basis` auf 0 zurückgesetzt und den Umbruch beim Hover neu berechnet.

**Testwirkung:** keine. `e6:07_contrast_badges_wcag` prüft die Kontrast-Abzeichen der Paare, nicht die Beschriftung der Felder.

**Abnahme — gemessen bei 320 / 390 / 768 / 1280 px, je 36 Felder:**

| Kriterium | Ergebnis |
|---|---|
| Streifen mit Überlauf (`scrollWidth > clientWidth`) | **0** von 7, auf allen vier Breiten |
| Kontrast Beschriftung gegen ihren Hintergrund (WCAG 1.4.3) | **14,75:1** — Minimum über alle 36 |
| Beschriftung ohne Hover sichtbar | **36 von 36** (`opacity` 1) |
| Tippfläche unter 44 px | **0** |
| Beschriftung außerhalb ihres Feldes | **0** |
| e6 | grün, 24 Checks, 41 Instanzen, `failed: []` |
| `qa kontrast` · `qa a11y` · `qa responsive` | alle sechs Seiten sauber |

**Nebenbefund, mitbehoben.** `qa responsive` meldete 6× `button.card-open-btn` mit 21 px Höhe auf `skills.html` — ein Rückstand aus dem `nested-interactive`-Umbau, den die vorige Runde nicht bemerkt hat, weil sie `responsive` nicht noch einmal laufen ließ. Kein echter Verstoß: WCAG 2.5.8 nimmt Ziele aus, deren Funktion über ein anderes, ausreichend großes Bedienelement erreichbar ist — und die Karte trägt bei allen vier Kartentypen **denselben `onclick`-Rumpf** wie ihr Titel-Button (geprüft: `.skill-card`, `.group-card`, `.prompt-card`, `.pilot-card`). Das Werkzeug kannte nur die Fließtext-Ausnahme. Jetzt kennt es beide — und vergleicht dafür den `onclick`-Rumpf, nicht bloß „ein klickbarer Vorfahr existiert", damit z. B. die kleinen `.pilot-skill-chip` (andere Aktion als ihre Karte) weiter auffallen. Mit drei eingeschleusten Proben gegengeprüft.

---

## Stufe 1 — Datumsfeld und Neuigkeiten · **erledigt 25.07.2026**

### Der Befund, der die Form bestimmt

Der Generator wurde gebaut und über alle 243 Einträge laufen gelassen, **bevor** der Block entworfen wurde. Ergebnis:

| Tag | Einträge | Zusammensetzung |
|---|---:|---|
| 2026-07-16 | 66 | Skills 43, Prompts 23 |
| 2026-07-17 | 153 | Glossar 41, Assets 30, Befehle 28, Ressourcen 27, Bausteine 12, FAQ 10, Beispieldaten 5 |
| 2026-07-18 | 10 | Projekte 10 |
| 2026-07-23 | 6 | Skills 2, Beispieldaten 3, Ressourcen 1 |
| 2026-07-24 | 8 | Glossar 8 |

**219 von 243 Einträgen liegen auf zwei Tagen.** „Die letzten acht Einträge, gattungsübergreifend" ergäbe damit: acht Glossarbegriffe vom 24. Juli. Nicht gattungsübergreifend, nicht repräsentativ, und in einer Woche unverändert. **Deshalb tagesweise** — ein Tag ist die Meldung, nicht der Eintrag. Das arbeitet mit der Bündelung statt gegen sie und macht den Tiebreaker überflüssig: innerhalb eines Tages wird nach Menge, fester Gattungsreihenfolge und Name sortiert, also deterministisch.

### Die Form hat sich beim Bauen noch einmal geändert

Der Plan sah **vier Tage** vor. Beim Testlauf fielen `e3:i5_news_mentions_prompts` und `e8:i5_news_mentions_showroom_and_interlinks` rot aus — **zwei Prüfungen, die meine Analyse übersehen hatte.** Ich hatte nur nach `newsHasBibliothek`/`newsHasBaukasten` gesucht und dabei nicht bemerkt, dass e3 und e8 eigene `i5`-Varianten mitbringen. Der vollständige Vertrag lautet:

| Suite | verlangt einen Link auf |
|---|---|
| e3:i5 | `prompts.html` |
| e6:i5 | `vorlagen.html?tab=assets` |
| e7:i5 | `vorlagen.html` |
| e8:i5 | alle drei plus `showroom.html` und `lernen-hilfe.html*` |

Alle vier zusätzlich mit „3–4 `.news-item`". Die Prompt-Sammlung stammt vom 16. Juli und fiel aus dem Vier-Tage-Fenster — also fehlte `prompts.html`.

**Gelöst wurde das nicht durch Anpassen der Tests, sondern durch eine bessere Bauform:** drei Tage einzeln, plus **eine Sammelmeldung** („Davor: der Aufbau des Marketplace") für alles Ältere. Das ist unabhängig von den Tests die richtigere Lösung — ein reines Zeitfenster hätte den Anfang stillschweigend abgeschnitten, und wer die Seite später öffnet, hätte nie erfahren, dass Katalog und Prompt-Sammlung existieren. Die Sammelmeldung wächst nach hinten statt zu verfallen.

**Damit ist auch die Zeitbombe entschärft,** die in Fassung 2 noch als offener Punkt stand: Weil die Sammelmeldung jeden Tag aufnimmt, der aus dem Fenster fällt, bleiben Meldungszahl (3–4) und Bereichslinks **dauerhaft** vollständig. Sie sind jetzt eine Eigenschaft der Bauform, nicht ein Zufall des Datenstands.

### Umgesetzt

1. **`tools/seit.mjs` → `data/seit.js`**, flache Zuordnung `"<Global>:<id>" → "JJJJ-MM-TT"`. Eigene Datei statt Eingriff in die zehn Datendateien.
   - Ermittlung per `git log --format=%cs --reverse --pickaxe-regex -S'"?id"?: *["\']<id>["\']'`.
   - **Die Regex fasst beide Schreibweisen.** `data/assets.js` mischt sie: Schriften als `id: "inter"`, Muster als `"id": "dots"`. Der naive Pickaxe liefert für `dots` und `grid` null Treffer — nachgewiesen.
   - **Kein stiller Ausfall:** ein Eintrag ohne Datum bricht den Lauf ab und wird benannt.
   - **Einfrier-Regel:** vorhandene Daten werden nie überschrieben. Gemessen: erster Lauf 48 s, zweiter 0,09 s (243 übernommen, 0 neu ermittelt).
   - Datumsquelle ist das Commit-Datum; über alle 91 Commits stimmen Autor- und Commit-Datum überein.
2. **Neuigkeiten-Block** aus `SEIT` + `GSEARCH_GROUPS`. Wenig am Tag (≤ 12): Einträge namentlich mit Deep-Link. Viel am Tag: Gattung + Zahl mit Bereichslink — bei 153 Einträgen wären drei herausgegriffene Namen Zufall, keine Information.
3. **`GSEARCH_GROUPS` bekam `bereich`** — die Übersichtsseite je Gattung. Aus dem Deep-Link ableitbar war sie nicht: Assets wohnen unter `vorlagen.html?tab=assets`, ihr Deep-Link ist `vorlagen.html?a=…`.
4. **Optionale Tages-Überschrift** (`NEWS_TITEL`, plus Schlüssel `sammel`). Nur die Überschrift ist redaktionell; Einträge, Zahlen und Links sind abgeleitet und können nicht veralten. Formuliert so, dass sie nicht verfällt: rutscht ein Tag in die Sammelmeldung, wird seine Überschrift schlicht nicht mehr benutzt.
5. **`badge` restlos entfernt** — 45 Vorkommen (28 `"neu"`, 5 `"empfohlen"`, 12 `null`), von niemandem gelesen. An seine Stelle tritt `istNeu()`: neu ist, was zu den **zwei jüngsten Inhaltstagen** gehört. Bewusst ohne Uhrzeitbezug — eine Regel wie „jünger als 14 Tage" hinge an der Uhr des Geräts und wäre nicht prüfbar. Gemessen: **2 statt 28** Skills tragen das Fähnchen, 0 Prompts. Gegengeprüft, dass ausser `badge` kein Feld verlorenging (0 Abweichungen über alle 45 Einträge).

### Testwirkung

**Keine bestehende Testdatei angefasst.** Neu: `tests/e11-neuigkeiten.cjs`, 10 Checks über zwei Viewports.

| Suite | vorher | nachher |
|---|---|---|
| e1 · e3 · e6 · e7 · e8 · e9 · e10 | grün | grün, unverändert |
| e11 (neu) | — | grün, 10 Checks, 20 Instanzen |

Check 09 in e11 hält den Vertrag mit den vier fremden `i5`-Prüfungen fest, damit ein künftiger Umbau **dort** auffällt — mit Begründung — statt vier Suiten unerklärt rot zu färben.

### Abnahme — gemessen

| Kriterium | Ergebnis |
|---|---|
| Meldungen im Block | 4 (3 Tage + Sammelmeldung), Vorgabe 3–4 |
| Sortierung | absteigend, Sammelmeldung schliesst ab |
| Deep-Links | **17 von 17** lösen auf (HTTP 200 **und** Modal/Anker/Bereichsseite erreicht) |
| Datum mit Jahreszahl | 4 von 4 |
| Erfundene Daten | 0 — jedes angezeigte Datum kommt in `SEIT` vor |
| `SEIT`-Abdeckung | **243 von 243** Einträgen über alle zehn Sammlungen, 0 Lücken |
| „Neu"-Fähnchen == `istNeu()` | 2/2 auf `skills.html`, 0/0 auf `prompts.html` |
| totes `badge`-Feld | 0 Vorkommen |
| Pflicht-Bereichslinks | 6 von 6 vorhanden |
| JS-Fehler | 0 |
| `qa` kontrast · a11y · zaehler · responsive · robust | alle sauber |

*Rechenprobe der Anzeige:* 8 (24.07.) + 6 (23.07.) + 10 (18.07.) + 216 (Sammelmeldung) = 240 = 243 minus die drei `HIDDEN`-Einträge.

---

## Stufe 2 — Projektanweisungen

Drei kopierbare `CLAUDE.md`-Vorlagen, geschnitten nach Projekttyp:

- **Kleines Tool** — ein interaktives Werkzeug für eine Aufgabe
- **Datenauswertung** — Datei rein, verdichtete Zahlen raus
- **Website / Einseiter** — eine Seite zum Teilen

Jede Vorlage ist ausgeschrieben und kommentiert, sodass klar ist, *warum* welcher Abschnitt drinsteht. Sie liegen zunächst als dritter Block im Baukasten-Reiter und wandern mit Stufe 5 in den Reiter „Code".

**Doppelte Nutzung ohne doppelten Bestand:** Dieselben drei Dateien sind die `CLAUDE.md` der drei Startprojekt-Gerüste aus Stufe 3. Sie liegen einmal im Repo; der Baukasten liest sie, das ZIP packt sie.

Merkbar und bewertbar (man benutzt sie). Neuer Typ in `GSEARCH_GROUPS` — das ist die einzige Stelle, an der ein neuer Typ registriert wird, samt `DS_TYPE_LABEL`.

**Testwirkung:** keine. e7 prüft `BAUSTEINE.length` gegen die Kartenzahl im Baustein-Raster (`#bk-grid .baustein-card`) — ein eigener Abschnitt mit eigener Klasse berührt das nicht.

**Abnahme:**
- Jede Vorlage ist mit einem Klick kopierbar und läuft als `CLAUDE.md` unverändert in einem leeren Ordner.
- Die drei Dateien liegen genau einmal im Repo (kein zweiter Bestand im Gerüst-Ordner).
- Suche findet sie (Strg+K), Merken funktioniert, Typ-Label erscheint in „Deine Sachen".
- e7 bleibt grün (22 Checks).

---

## Stufe 3 — Startprojekte

Drei Ordner, je mit `CLAUDE.md`, `index.html` und passenden Beispieldaten:

1. **Dashboard-Gerüst** — CSV rein, Diagramme raus. Nutzt `beispieldaten/kampagnen-kpis.csv` und knüpft am vorhandenen Chart-Baustein an.
2. **Auswerter-Gerüst** — Rückläufe verdichten. **Erkennt Breit- und Langformat und schreibt sichtbar hin, welches es erkannt hat.** Das behebt eine gemessene Falle: `beispieldaten/umfrage-rohdaten.csv` ist Breitformat (32 Zeilen, Spalten `Q1_Markenbekanntheit` … `Q5_Zufrieden`), der bestehende Auswerter im Showroom erwartet Langformat und liefert dafür stumm 33 Pseudo-„Fragen" statt einer Fehlermeldung.
3. **Einseiter-Gerüst** — eine teilbare Seite für Kampagne oder Ergebnis.

### Eigene Liste statt Eingriff in `CASES`

Die Gerüste kommen als **eigenes Array `STARTPROJEKTE`** in einen **eigenen Abschnitt** des Showrooms, mit dem dritten Marker „Startprojekt" — nicht als drei zusätzliche `CASES`-Einträge. Zwei Gründe:

- **Schema.** `CASES` hat sechzehn Felder, darunter `persona`, `story`, `zitat`, `aufwand`, `liveUrl`, `reaktionSeed`. Ein Gerüst hat davon keines. Sechs Felder wären leer oder erfunden — und „nichts erfinden" ist eine Hausregel.
- **Marker.** `istEcht` ist ein Boolean. Ein dritter Zustand passt da nicht hinein, ohne das Feld für alle zehn Bestandsprojekte umzubauen.

Der Marker bleibt trotzdem der dritte in der gemeinsamen visuellen Reihe — der Nutzen der Entscheidung aus der Fragerunde bleibt also erhalten, nur die Datenhaltung ist sauber getrennt.

ZIP-Download je Gerüst. Die ZIP-Funktion liegt bereits in `shared/base.js` und wird nur benutzt.

*Nicht in diesem Durchgang:* Der bestehende Umfrage-Auswerter im Showroom bekommt keine Formatprüfung — die Entscheidung war, das im Gerüst zu lösen.

**Testwirkung:** keine, genau wegen der eigenen Liste. `e8:03_ehrlichkeits_marker` prüft `EXPECTED_TOTAL = 10`, `EXPECTED_ECHT = 4`, `EXPECTED_BEISPIEL = 6` und dass **jede `.sr-card` genau einen** Marker trägt. Der neue Abschnitt bekommt eine eigene Kartenklasse und lässt diese Zusicherungen unberührt. Wären die Gerüste in `CASES` gewandert, wäre e8:03 rot geworden.

**Abnahme:**
- Jedes Gerüst läuft per `file://` **und** im iframe (die Showroom-Vorschau ist ein iframe mit `sandbox`).
- Das ZIP enthält alle Dateien des Ordners und entpackt sich in einen lauffähigen Stand.
- Der Auswerter erkennt beide Formate nachweislich und **benennt** das erkannte Format sichtbar — geprüft mit `umfrage-rohdaten.csv` (breit) und einer Langformat-Variante.
- Kein Gerüst hat ein leeres Pflichtfeld.
- e8 bleibt grün.

---

## Stufe 4 — Restliste aus der Bestandsaufnahme

1. **Changelog-Reiter streichen.** Der Reiter wird **allen 35 sichtbaren Skills** zugeteilt und ist vollständig erfunden: `renderModalChangelog()` erzeugt den Text aus der Versionsnummer. 25 der 35 stehen auf `1.0.0` und bekommen damit denselben Zweizeiler („Erste öffentliche Version", „Basis-Funktionalität implementiert"). Der Reiter weist im ersten Satz selbst darauf hin, dass die echten Änderungen im Repo stehen. Zu entfernen: der Eintrag in `modalTabsFor()`, `renderModalChangelog()`, der Eintrag in `MODAL_TABS`, die Zeile in der Tab-Zuordnung und die sechs `.changelog-*`-Regeln.
2. **Meta-Zahl absichern.** „35 echte Skills" steht dreimal fest in den Meta-Tags von `skills.html` (`description`, `og:description`, `twitter:description`) und kein Test schützt sie. Laufzeit-Berechnung hilft hier nicht, weil Suchmaschinen und Link-Vorschauen das statische HTML lesen — also ein Regressionstest, der rot wird, sobald eine der drei Zahlen von `VISIBLE_SKILL_COUNT` abweicht. Die vierte Fundstelle (`#page-sub-count`, Zeile 950) wird zur Laufzeit gefüllt und ist bereits abgesichert.
3. **Prompt-Baukasten kennzeichnen.** 5 von 23 Prompts haben `builder`, `variants` und `preview` (dieselben fünf); auf der Karte ist das nicht erkennbar. Erst kennzeichnen, Ausrollen auf weitere Prompts danach entscheiden.

**Testwirkung:** keine. Nachgemessen: **kein einziger Test erwähnt `changelog`** (0 Treffer über alle sieben Suiten). `e1` liest zwar die komplette Reiterleiste aus, prüft davon aber nur „Dateien & Download" und „Bewertungen". Der Reiter kann ersatzlos verschwinden.

**Abnahme:**
- Kein Modal zeigt noch einen Changelog-Reiter; keine Leiche im CSS (`grep -c changelog skills.html` = 0).
- Der neue Meta-Test wird rot, wenn man `VISIBLE_SKILL_COUNT` verändert, ohne die drei Meta-Tags nachzuziehen — einmal nachgewiesen.
- Die fünf Prompts mit Baukasten sind auf der Karte erkennbar, die anderen 18 nicht.
- e1 und e3 grün.

---

## Stufe 5 — Der Bibliotheks-Umbau

**Zuerst das Datenmodell, dann die Karten, dann die Pakete.** Nicht am Layout anfangen.

### Ausgangslage — kleiner als gedacht

Beim Nachsehen sind zwei Bausteine schon da, die der Plan neu bauen wollte:

- **Die vereinte Liste existiert.** `ASSETS` ist bereits ein dünner Index über alle vier Asset-Typen (`id`, `typ`, `name`, `rating`, `ref`) mit dem Volldatensatz hinter `ref`. Genau die zweischichtige Form, die das gemeinsame Modell braucht. Was fehlt, ist nicht das Modell, sondern **eine gemeinsame Karte und ein gemeinsames Modal**.
- **Die getrennten Bereiche existieren.** `vorlagen.html` hat bereits neun `.lib-section` mit eigener Überschrift und abwechselndem Hintergrund. Die zweite Navigationsebene, die du wolltest, ist also eine **Umgruppierung von zwei Reitern auf vier**, kein Neuaufbau.

Das reduziert Stufe 5 spürbar. Der Umbau bleibt trotzdem die größte Stufe — aber das Risiko liegt in den Karten und Deep-Links, nicht in der Struktur.

### Arbeit

1. **Gemeinsames Modell.** Jeder Eintrag: `id`, `typ`, `name`, `beschreibung`, `vorschau`, `dateien[]`, `lizenz`, `tags`, `seit`. Dateien werden über eine Referenz adressiert, die heute ein lokaler Pfad ist und später eine URL aus dem Objektspeicher sein kann — ohne dass das Modell sich ändert. `seit` sitzt an den **Quell-Arrays** (`FONTS`, `PALETTES`, `PATTERNS`, `ICONSETS`), nicht am abgeleiteten Index.
2. **Eine Karte, ein Modal, eine Suche, ein Filter.** Damit verschwinden von selbst:
   - die **21 nicht anklickbaren Assets** — nur die 9 Schriften haben heute einen „Details"-Knopf, Paletten, Muster und Icon-Sets haben keinen;
   - das zweite Suchfeld;
   - die **beiden** Reiter-Zähler, die die Suche ignorieren (`vl-count-bausteine` steht fest auf `BAUSTEINE.length`, `vl-count-assets` auf `ASSETS.length`);
   - der fehlende Leerzustand. **Präzisierung:** Schriften, Paletten, Muster und der Icon-Browser haben einen; der Brand-Abschnitt hat keinen, und kein Zähler reagiert auf die Suche.
3. **Zwei Navigationsebenen.** Reiter `Design · Code · Daten · Pakete`, darin die Kategorien als klar getrennte Bereiche mit eigenen Überschriften. Zuordnung der neun bestehenden Abschnitte: Design ← Schriften, Icons, Paletten, Muster, Brand · Code ← Bausteine, Meistkopiert, Projektanweisungen · Daten ← Beispieldaten, Bilder · Pakete ← neu.
4. **Pakete als Typ.** Verweise auf vorhandene IDs und eigene Dateien; das ZIP wird zur Laufzeit gepackt.
5. **Design-System pilot** als erstes Paket: Tokens, Schriften, Muster, Beispielseite, `CLAUDE.md` mit den Designregeln.
6. **Bild-Bereich** mit den zwei vorhandenen Test-SVGs plus freien Fotos.
   - Jede Lizenz wird **pro Bild** geprüft und angezeigt — keine Aufnahme ohne belegte Lizenz und Quellenangabe.
   - **Größenbudget: höchstens 2 MB für den gesamten Bildbestand**, WebP, längste Kante 1600 px. Grund: Binärdateien bleiben dauerhaft in der Historie (`.git` liegt heute bei 13 MB von 15 MB Gesamtgröße) und lassen sich nicht mehr sauber entfernen. Ohne Build-Step gibt es keine Bildpipeline, die das später repariert.
   - Zahl der Fotos: so viele wie das Budget trägt, Richtwert acht bis zwölf.
7. **Muster-CSS lauffähig machen.** Sieben der zehn Hintergründe (die SVG-Muster; die drei Verläufe sind selbsttragend) kopieren heute `url('assets/patterns/…')` — ein relativer Pfad, der außerhalb des Repos ins Leere zeigt. **Entschieden:** der **kopierte Schnipsel bekommt das SVG als `data:`-URI** (er muss überall funktionieren, wo man ihn einfügt — das ist das Versprechen des Kopieren-Knopfs), **und das Modal bietet zusätzlich die `.svg`-Datei zum Download** (wer die Datei will, soll sie bekommen). Die sieben SVGs sind zwischen 134 und 576 Bytes groß, der `data:`-URI bläht den Schnipsel also nicht auf.
8. **Tote Deep-Links melden sich.** Da alte Links bewusst verfallen, bekommt ein nicht auflösbarer Deep-Link (`?a=`, `?b=`, `?d=` mit unbekannter ID) eine sichtbare Meldung statt wie heute stillzuschweigen.
9. **Suiten e6, e7 und e9 neu.** e9 gehört dazu, weil `DEEPLINK_RE` die Parameter `vorlagen.html?a=`, `?b=` und `?d=` fest verdrahtet — eine Vereinheitlichung der Typen bricht die Zusicherung. Jeder verschobene Sollwert bekommt seine Begründung im Test. Die Kopfkommentare von e6 und e7 werden mitgezogen: sie beschreiben noch `bibliothek.html`/`baukasten.html` und ein „Mehr ▾"-Dropdown, das es nicht mehr gibt.

**Abnahme:**
- Alle 30 Assets sind anklickbar und öffnen dasselbe Modal.
- Jeder Reiter-Zähler zeigt die **gefilterte** Zahl, jeder Abschnitt hat einen Leerzustand.
- Kopierter Muster-CSS funktioniert in einer leeren HTML-Datei außerhalb des Repos — einmal nachgewiesen.
- Kein Bild ohne belegte Lizenz; `du -sh` über den Bildordner unter 2 MB.
- Ein erfundener Deep-Link erzeugt eine sichtbare Meldung.
- e6, e7, e9 neu geschrieben und grün; e1, e3, e8, e10 unverändert grün.

---

## Testwirkung im Überblick

Ausgangslage vor dem Start gemessen (25.07.2026, gegen `localhost:8412`): **e6 grün, 24 Checks in 41 Instanzen. e7 grün, 22 Checks in 37 Instanzen.** Exit-Code 0, `failed: []` bei beiden.

| Stufe | e1 | e3 | e6 | e7 | e8 | e9 | e10 | e11 | Neue Tests |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|---|
| **0 · Sofort-Fixes** ✔ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | Kontrast/Umbruch je Farbfeld |
| **1 · `seit` + Neuigkeiten** ✔ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **neu** | `e11-neuigkeiten` (10 Checks) |
| 2 · Projektanweisungen | — | — | — | ✓ | — | ✓ | — | — | — |
| 3 · Startprojekte | — | — | — | — | ✓ | — | — | — | Formaterkennung Auswerter |
| 4 · Restliste | ✓ | ✓ | — | — | — | — | — | — | Meta-Zahl-Regression |
| 5 · Umbau | ✓ | — | **✎** | **✎** | — | **✎** | ✓ | ✓ | — |

✔ erledigt · ✓ bleibt unverändert grün · ✎ wird neu geschrieben

**Regel für den ganzen Plan:** In den Stufen 0–4 wird **keine bestehende Testdatei angefasst** — kein Sollwert verschoben, keine Zeile geändert. Nur neue Tests kommen dazu. Erst Stufe 5 schreibt e6, e7 und e9 neu, und dort bekommt jeder verschobene Sollwert seine Begründung an Ort und Stelle.

**In Stufe 0 und 1 hat die Regel gehalten — und zweimal zu einem besseren Entwurf geführt, nicht zu einem Kompromiss:**

- Stufe 1 wurde **tagesweise** gebaut, weil eintragsweise acht Glossarbegriffe gezeigt hätte.
- Stufe 1 bekam die **Sammelmeldung**, weil ein reines Zeitfenster den Anfang stillschweigend abschneidet. Dass damit vier fremde `i5`-Prüfungen grün bleiben, ist die Folge, nicht der Zweck — die Prüfungen verlangten das Richtige.
- Stufe 3 bekommt aus demselben Grund eine eigene Datenliste statt eines Eingriffs in `CASES`.

Nicht weil Tests unantastbar wären, sondern weil ein Entwurf, der eine grüne Zusicherung bricht, erst begründen muss, warum die Zusicherung falsch war — und in allen drei Fällen war sie es nicht.

**Eine Lehre aus Stufe 1, die für den Rest gilt:** Ich hatte `e3:i5` und `e8:i5` bei der Planung übersehen, weil ich nach den Namen aus e6/e7 gesucht hatte statt nach dem Muster. Vor jeder weiteren Stufe wird deshalb **über alle Suiten** nach dem betroffenen Selektor gesucht, nicht nach dem erwarteten Check-Namen.

---

## Bewusst nicht in diesem Plan

- **Echte Einreichwege** für Prompt-Variante, Baustein, Asset und Projekt — vertagt aufs Backend. Bis dahin bleiben vier Entwürfe im localStorage liegen (`submit:<typ>:draft`), ohne Weg nach draußen. Das ist eine bekannte, akzeptierte Sackgasse. Der einzige echte Weg ist heute der Skill-Baukasten, der ein GitHub-Issue öffnet.
- **Geteilte Bewertungen, Stimmen und Merklisten** — brauchen Persistenz, kommen mit dem Backend.
- **Kunden-CI** — nach dem Umzug in die eigene Organisation.
- **Abläufe / Schritt-für-Schritt-Rezepte** — verworfen.
- **Ansprechpartner, Selbstbeschreibung, KI-Richtlinie, Zugangs- und Kostenfragen, Warnhinweis zur lokalen Speicherung** — als nicht benötigt eingestuft.
- **Formatprüfung im bestehenden Showroom-Auswerter** — bewusst nur im neuen Gerüst gelöst.

---

## Risiken und offene Punkte

- **Geteilte Links brechen.** Bewusste Entscheidung. Abgefedert durch Punkt 8 in Stufe 5 — wer einem alten Link folgt, erfährt wenigstens, dass sein Ziel nicht mehr existiert.
- **Gespeicherte Merkungen und Bewertungen alter Typen verfallen.** Ebenfalls bewusst. Betroffen sind die Präfixe `rate:asset:`, `fav:asset:`, `rate:baustein:`, `fav:baustein:` und `tried:*` der umbenannten Typen. Die Migrationsschicht in `shared/base.js` deckt nur die alten `skill-*`-Keys ab und hilft hier nicht.
- **Bildlizenzen.** Freie Quellen sind nicht automatisch frei von Auflagen. Jedes aufgenommene Foto braucht eine belegte Lizenz und Quellenangabe; im Zweifel wird es nicht aufgenommen.
- **Bilder sind unumkehrbar.** Was einmal im Repo liegt, bleibt in der Historie. Das Größenbudget in Stufe 5 ist deshalb eine harte Grenze, keine Richtschnur.
- **Git-Historie als Datumsquelle** funktioniert (243 von 243 Einträgen datiert, Autor- und Commit-Datum über alle 91 Commits identisch), liefert aber grobe Cluster: fünf Tage, davon zwei mit 90 % der Einträge. Die tagesweise Form macht daraus eine Stärke — aber der Block wird nur dann neu, wenn wirklich ein neuer Inhaltstag dazukommt. Das ist ehrlich und zugleich der Preis: an ruhigen Wochen steht dort dasselbe wie letzte Woche.
- **`badge: "neu"` ist von 28 auf 2 geschrumpft** (erledigt). Wer die alte Zahl erwartet, wird sie vermissen. Sie war nur nie wahr.
- ~~**Zeitbombe im Neuigkeiten-Block**~~ — in Fassung 2 stand hier, dass die Bereichslinks irgendwann aus dem Zeitfenster fallen und vier Prüfungen rot färben. Mit der Sammelmeldung aus Stufe 1 kann das nicht mehr passieren: sie nimmt jeden herausfallenden Tag auf. **Erledigt, nicht vertagt.**
- **`skills.html` wächst in diesem Plan nicht** — die Projektanweisungen landen bewusst in `vorlagen.html`, obwohl der Skill-Baukasten die passende Maschine hätte. Grund: 4.124 Zeilen und drei Views in einer Datei sind bereits die Stelle mit dem höchsten Risiko für ungewollte Nebenwirkungen.
- **Stufe 5 ist die einzige Stufe, die nicht in einem Zug live gehen sollte.** Modell, Karten und Pakete sind drei eigene Auslieferungen. Wer sie bündelt, hat im Fehlerfall keinen Punkt zum Zurückgehen.

---

## Anhang — Messprotokoll 25.07.2026

Alle Zahlen im Plan stammen von hier. Methode jeweils dabei, damit sie nachprüfbar bleiben.

**Datenbestand** (Datendateien in Node ausgewertet, nicht gegrept):

| Sammlung | Einträge | Datei |
|---|---:|---|
| SKILLS | 45 (38 Skills, 4 Plugins, 3 Frameworks; 3 davon `HIDDEN` → `VISIBLE_SKILL_COUNT` 35) | `data/skills.js` |
| PROMPTS | 23 (davon 5 mit `builder`/`variants`/`preview`) | `data/prompts.js` |
| BEFEHLE | 28 | `data/befehle.js` |
| GLOSSAR | 49 | `data/glossar.js` |
| FAQ | 10 | `data/glossar.js` |
| RESSOURCEN | 28 | `data/ressourcen.js` |
| ASSETS | 30 (9 Schriften, 7 Paletten, 10 Hintergründe, 4 Icon-Sets) | `data/assets.js` |
| BAUSTEINE | 12 | `data/bausteine.js` |
| BEISPIELDATEN | 8 | `data/bausteine.js` |
| CASES | 10 (4 echt, 6 Beispiel) | `data/cases.js` |
| **Summe datierbarer Einträge** | **243** | |

Elf Suchtypen in `GSEARCH_GROUPS` über zehn Sammlungen — `SKILLS` bedient `skill` und `plugin`.

**Einzelbefunde:**

- `badge: 'neu'` 28×, `badge: 'empfohlen'` 5× — auf alle 45 Katalogeinträge, davon 24 auf den 35 sichtbaren Skills. Wird nirgends gerendert.
- Kein Datenfeld `changelog`. Der Reiter kommt aus `modalTabsFor()` für jedes `itemType: 'skill'` und wird in `renderModalChangelog()` aus `version` + `updatedAt` erzeugt. Versionsverteilung: `1.0.0` 25×, `1.1.0` 4×, `1.2.0` 2×, je 1× `0.9.0`/`1.0.1`/`1.0.2`/`2.0.0`. 26 Skills erzeugen einen Eintrag, 9 erzeugen zwei.
- „35 echte Skills" in `skills.html` Zeilen 7, 12, 17 (Meta) — plus Zeile 950, die zur Laufzeit gefüllt wird.
- 30 von 45 Einträgen haben `addedAt` **vor** dem ersten Commit (09.07.2026); Spanne `2025-10-01` bis `2026-07-23`. Deshalb das eigene Feld `seit`.
- 7 der 10 Hintergründe sind SVG-Muster mit `datei`-Verweis und relativem `url()` im kopierten CSS (134–576 Bytes je Datei); 3 sind selbsttragende Verläufe.
- Nur die 9 Schriften haben einen „Details"-Knopf → **21 Assets ohne Modal**.
- `vl-count-bausteine` = `BAUSTEINE.length`, `vl-count-assets` = `ASSETS.length` — beide fest, beide ignorieren Suche und Filter.
- Leerzustand vorhanden bei Schriften, Paletten, Mustern (`.vl-grid-empty`) und Icons (`.icon-empty`); Brand-Abschnitt ohne.
- `beispieldaten/umfrage-rohdaten.csv`: 32 Datenzeilen, Breitformat, Spalten `Respondenten_ID;Alter_Bucket;Region;Q1_…;…;Q5_Zufrieden;Offene_Antwort`.
- Repo 15 MB gesamt, davon 13 MB `.git`; `assets/` 422 KB (Schriften 372 KB).
- 91 Commits, erster am 09.07.2026, Autor- und Commit-Datum bei allen identisch.

**`seit`-Generator, Prototyp:** 243 von 243 Einträgen datiert, kein Ausfall, Laufzeit 53 s. Fallstrick nachgewiesen: `-S'id: "dots"'` liefert 0 Commits, weil `data/assets.js` bei den Mustern `"id": "dots"` schreibt und bei den Schriften `id: "inter"`. Die Regex muss beide Formen fassen.

**Testlauf (Baseline):** `e6` Exit 0, `pass: true`, 24 Check-IDs, 41 Instanzen, `failed: []`. `e7` Exit 0, `pass: true`, 22 Check-IDs, 37 Instanzen, `failed: []`. Ziel jeweils `http://localhost:8412/vorlagen.html`.

**Zusicherungen, die die Stufen berühren** (deshalb die Entwurfsentscheidungen in 1 und 3):

- `e6:i5` / `e7:i5` — `.news-item` zwischen 3 und 4, und ein `.news-item .news-text a` mit `href` exakt `vorlagen.html?tab=assets` bzw. `vorlagen.html`.
- `e8:03_ehrlichkeits_marker` — `EXPECTED_TOTAL = 10`, `EXPECTED_ECHT = 4`, `EXPECTED_BEISPIEL = 6`, jede `.sr-card` mit genau **einem** Marker.
- `e9` — `DEEPLINK_RE` mit fest verdrahteten `vorlagen.html?a=`, `?b=`, `?d=`.
- `e7:01` — Kartenzahl in `#bk-grid .baustein-card` gleich `BAUSTEINE.length`.
- **Changelog:** 0 Treffer über alle sieben Suiten. `e1` liest die Reiterleiste aus, prüft aber nur „Dateien & Download" und „Bewertungen" — der Reiter ist ungeschützt und kann ersatzlos weg.
