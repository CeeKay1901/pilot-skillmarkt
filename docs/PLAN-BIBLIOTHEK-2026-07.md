# Implementierungsplan — Bibliothek, Inhalte, Neuigkeiten

**Stand:** 25.07.2026 · **Fassung 5** (Stufen 0 bis 4 umgesetzt, Ergebnisse eingetragen; offen ist nur noch Stufe 5)
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
| Startprojekte | **Drei neue schlanke Gerüste**: Dashboard · Auswerter · Einseiter. Je ein Ordner mit `CLAUDE.md`, `index.html` und Beispieldaten. Im Showroom als dritter Marker neben „Echtes Team-Tool" und „Beispiel-Projekt". *(Gebaut ohne `CLAUDE.md` im Ordner — sie kommt beim Packen aus `data/anweisungen.js`, damit es den Text genau einmal gibt. Begründung in Stufe 3.)* |
| Projektanweisungen | **Kopierbare Vorlagen**, geschnitten **nach Projekttyp** — passend zu den drei Gerüsten. Kein Formular-Baukasten in diesem Durchgang. |
| Neuigkeiten | Contentorientiert, unten auf der Startseite, **tagesweise gruppiert** statt eintragsweise (Begründung in Stufe 1). Handgepflegte Liste entfällt bis auf **optionale Tages-Überschriften**. |
| Datumsfeld | Neues Feld **`seit`** = „seit wann auf der Seite", **aus der Git-Historie ermittelt**, für alle Sammlungen (zehn bei der Entscheidung, seit Stufe 2 elf). `addedAt` bleibt unverändert die redaktionelle Entstehungszeit. |
| Merken / Bewerten | **Merken überall.** Bewerten nur, wo man etwas wirklich benutzt hat. |
| Alte Daten und Links | **Sauber vereinheitlichen, Altes verfällt.** Bewusst in Kauf genommen: gespeicherte Merkungen alter Typen und geteilte `?a=`/`?b=`-Links brechen. |
| Reihenfolge | **Kleines zuerst, Umbau zuletzt.** Jede Stufe geht einzeln live. |
| Einreichwege | **Vertagt aufs Backend.** Die vier simulierten Flows bleiben vorerst, wie sie sind. |
| Regressionssuiten | e6, e7 und **e9** werden in Stufe 5 neu geschrieben; jeder verschobene Sollwert bekommt im Test seine Begründung. Stufen 0 und 1 kamen ohne Teständerung aus, **die Stufen 2, 3 und 4 nicht**: Stufe 2 zog e9 und e11 nach, Stufe 3 erneut e9 und e11 (und verschärfte `e11:03`), Stufe 4 ergänzte einen Check in e1 und zwei Kommentare in e3 — nie wurde dabei eine Zusicherung schwächer (Details in der jeweiligen Stufe). |
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

## Stufe 2 — Projektanweisungen · **erledigt 25.07.2026**

Drei kopierbare `CLAUDE.md`-Vorlagen, geschnitten nach Projekttyp:

- **Kleines Tool** (`kleines-tool`, 76 Zeilen) — ein interaktives Werkzeug für eine Aufgabe
- **Datenauswertung** (`datenauswertung`, 92 Zeilen) — Datei rein, verdichtete Zahlen raus
- **Website / Einseiter** (`einseiter`, 72 Zeilen) — eine Seite zum Teilen

Jede Vorlage ist ausgeschrieben und kommentiert, sodass klar ist, *warum* welcher Abschnitt drinsteht: `warum` ist eine Liste aus `abschnitt` + `grund`, und jede der 27 Begründungen nennt **wörtlich** eine `##`-Überschrift aus dem Text. Damit fällt beides auf — eine Begründung ohne Abschnitt und ein Abschnitt ohne Begründung. Die Vorlagen liegen als dritter Block im Baukasten-Reiter und wandern mit Stufe 5 in den Reiter „Code".

**Der Bestand ist ein Datensatz, keine Datei.** Der Plan sprach von „drei Dateien", die der Baukasten liest und das ZIP packt. Gebaut wurde `data/anweisungen.js` mit dem Volltext im Feld `text`: Eine Datei hätte die Seite per `fetch` nachladen müssen, und unter `file://` ist Fetch blockiert (harte Regel 1). Für Stufe 3 ändert das den Weg, nicht die Zusicherung — die Gerüst-ZIPs müssen ihre `CLAUDE.md` aus demselben Datensatz schreiben, damit es weiterhin genau **einen** Bestand gibt.

### „Testwirkung: keine" war falsch

Der Plan hatte dieser Stufe keine Testarbeit zugewiesen und begründete das mit e7: Ein eigener Abschnitt mit eigener Klasse berührt `BAUSTEINE.length` nicht. Das stimmt, e7 blieb unverändert grün — nur war e7 die falsche Suite. Ein neuer **Inhaltstyp** wirkt nicht dort, wo er angezeigt wird, sondern dort, wo Typen **aufgezählt** werden. Drei Stellen in zwei bestehenden Suiten mussten nachgezogen werden:

1. **`DEEPLINK_RE` in `tests/e9-suche.cjs` ist eine Positivliste** gültiger Deep-Link-Formen, keine Plausibilitätsprüfung. Ein neuer Typ bringt zwangsläufig eine neue gültige Form mit. Eingriff: `vorlagen\.html\?pa=` ergänzt. Das schwächt nichts — die Liste bleibt abschließend, ein Tippfehler wie `?x=` fällt weiter durch.
2. **`abdeckung.globs === 10` in `tests/e11-neuigkeiten.cjs`** stand als harte Zahl im Test. Sie ist der Wächter gegen das **stille Verschwinden** einer Sammlung: Fiele eine Gattung aus `GSEARCH_GROUPS` heraus, wäre sie damit auch aus der Lücken-Prüfung heraus, und die meldete brav 0. Die Zahl wurde **bewusst auf 11 nachgezogen**, mit Begründung an Ort und Stelle. Die eigentliche Zusicherung `lueckenGesamt === 0` blieb unberührt.
3. **Check 03 in e11 war für den neuen Link blind.** Die Auflösungsprüfung kannte `a`, `b`, `d`, `skill`, `p` und die übrigen Parameter; ein **unbekannter** Parameter fiel auf „bereichsseite" durch und galt damit als aufgelöst, auch wenn er ins Leere zeigte. `pa` steht jetzt in der Parameterliste und `bk-pa-` in den Ankerpräfixen. Das ist eine **Verschärfung**, kein Nachgeben: Ein `?pa=`-Link muss nachweislich ein Element treffen.

Damit hat die Plan-Regel „in den Stufen 0–4 wird keine bestehende Testdatei angefasst" **nicht gehalten**. Sie war zu grob. Was gehalten hat, ist die Zusicherung dahinter: Keine Prüfung wurde aufgeweicht, keine Zeile geändert, um etwas grün zu bekommen — zwei der drei Eingriffe machen die Prüfung enger als vorher, der dritte ist ein bewusst nachgezogener Sollwert mit Begründung im Test.

### Zwei Ausfälle, die nichts gemeldet hätten

Beide wären ohne Fehlermeldung durchgegangen, und beide hätten grüne Checks hinterlassen:

- **`_gsGlobal()` ist ein `switch` über feste Namen.** Ohne neuen `case` fällt die Sammlung **still** aus dem Neuigkeiten-Block. Die Checks 01, 02 und 09 in e11 wären grün geblieben, weil sie Form und Vollständigkeit des Blocks prüfen, nicht seine Herkunft. Aufgefallen ist das in der Vorab-Simulation, nicht im Test.
- **`vorlagen.html` lud `data/seit.js` überhaupt nie.** `istNeu()` gab dort also immer `false` zurück, das „Neu"-Fähnchen konnte auf der Seite gar nicht erscheinen. Die naheliegende Prüfung „Fähnchen == `istNeu()`" wäre trotzdem grün geblieben, weil **beide Seiten leer** waren.

**Verallgemeinert, und ab hier für den ganzen Plan gültig:** Eine Gleichheitsprüfung zwischen zwei abgeleiteten Größen ist wertlos, solange nicht mindestens eine Seite **nachweislich ungleich null** ist. Wer „erwartet == gerendert" prüft, muss zusätzlich prüfen, dass „erwartet" überhaupt etwas erwartet.

### Umgesetzt

1. **`data/anweisungen.js`** — drei Einträge mit je neun Feldern (`id`, `name`, `kurz`, `wofuer`, `passt`, `passtNicht`, `tags`, `warum`, `text`). Alle gefüllt, 0 Platzhalter.
2. **Der neue Typ `anweisung` ist an fünf Stellen registriert:** `GSEARCH_GROUPS`, der `switch` in `_gsGlobal()`, `GSEARCH_SOURCES` (alle drei in `shared/base.js`), `DS_TYPE_LABEL` und `SAMMLUNGEN` in `tools/seit.mjs`. **Der Plan nannte eine Stelle** („das ist die einzige Stelle, an der ein neuer Typ registriert wird, samt `DS_TYPE_LABEL`"). Vier der fünf melden sich nicht, wenn sie fehlen.
3. **`data/seit.js` nachgezogen:** 243 → **246 Einträge**, fünf → **sechs Inhaltstage**. `tools/seit.mjs --pruefen` meldet 0 Lücken, und die Einfrier-Regel hat gehalten: die 243 vorhandenen Daten wurden unverändert übernommen.
4. **`vorlagen.html` lädt jetzt `data/seit.js`** — vorher nicht, siehe oben.
5. **Neuigkeiten-Block:** der 25.07. ist der jüngste Inhaltstag und hat seine optionale Überschrift (`NEWS_TITEL`); der 18.07. rutscht dafür in die Sammelmeldung. Die Rechenprobe unter Stufe 1 ist damit der Stand von vor dieser Stufe.
6. **Eigener localStorage-Namensraum:** `copies` · `tried` · `rate` · `fav`, je mit `:anweisung:`. Gegengeprüft, weil `window.RatingConfig` auf `vorlagen.html` als Seiten-Default auf `baustein` steht und ein Sterne-Widget ohne expliziten Typ **still** dorthin schreiben würde.
7. **Deep-Link `?pa=<id>`** scrollt zum Eintrag und hebt ihn hervor, ohne ein Modal zu öffnen.

### Testwirkung

**Zwei bestehende Suiten angefasst**, Begründung oben und jeweils auch im Test selbst. Neu: `tests/e12-anweisungen.cjs`, 13 Checks über zwei Viewports.

| Suite | vorher | nachher |
|---|---|---|
| e1 · e3 · e6 · e7 · e8 · e10 | grün | grün, unverändert |
| e9 | grün | grün, `DEEPLINK_RE` um `vorlagen\.html\?pa=` ergänzt |
| e11 | grün | grün, `globs` 10 → 11, Check 03 um `pa` und `bk-pa-` verschärft |
| e12 (neu) | — | grün, 13 Checks, zwei Viewports |

### Abnahme — gemessen

| Kriterium | Ergebnis |
|---|---|
| Vorlagen | 3 — `kleines-tool` 76 Zeilen, `datenauswertung` 92, `einseiter` 72 |
| Pflichtfelder je Vorlage | **9 von 9** gefüllt · Platzhalter **0** |
| `warum` trifft wörtlich eine `##`-Überschrift | **27 von 27** |
| Registrierstellen des neuen Typs | **5 von 5** |
| `SEIT`-Abdeckung | **246 von 246**, 0 Lücken (`--pruefen`), sechs Inhaltstage |
| Einfrier-Regel | 243 vorhandene Daten unverändert übernommen |
| Namensraum | `:anweisung:` gesetzt · **0** `:baustein:`-Schlüssel mit Anweisungs-ID |
| Deep-Link `?pa=<id>` | scrollt, hebt hervor, öffnet kein Modal |
| Globale Suche | findet unter der Gruppe „Projektanweisungen" |
| „Deine Sachen" | zeigt das Label „Projektanweisung" |
| e12 (neu) | grün, 13 Checks × 2 Viewports |
| alle neun Suiten (e1, e3, e6–e12) | Exit 0 |
| `qa` kontrast · a11y · zaehler · responsive · robust · links | alle sauber, keine Browser-Waisen |

---

## Stufe 3 — Startprojekte · **erledigt 25.07.2026**

Drei Ordner unter `startprojekte/`, je mit `index.html` und passenden Beispieldaten:

1. **Dashboard-Gerüst** (`dashboard`, 1 Datei) — CSV rein, Diagramme raus. Die Übungsdatei `beispieldaten/kampagnen-kpis.csv` steckt wortgleich als eingebauter String im Gerüst, damit unter `file://` sofort etwas zu sehen ist; eine eigene Datei daneben wäre ein zweiter Bestand.
2. **Auswerter-Gerüst** (`auswerter`, 4 Dateien) — Rückläufe verdichten. **Erkennt Breit- und Langformat und schreibt sichtbar hin, welches es erkannt hat.** Das behebt eine gemessene Falle: `beispieldaten/umfrage-rohdaten.csv` ist Breitformat (32 Zeilen, Spalten `Q1_Markenbekanntheit` … `Q5_Zufrieden`), der bestehende Auswerter im Showroom erwartet Langformat und liefert dafür stumm 33 Pseudo-„Fragen" statt einer Fehlermeldung.
3. **Einseiter-Gerüst** (`einseiter`, 2 Dateien) — eine teilbare Seite für Kampagne oder Ergebnis.

Zusammen **7 Dateien**.

**Die `CLAUDE.md` liegt NICHT im Ordner.** Die Vorab-Beschreibung sagte „je mit `CLAUDE.md`, `index.html` und passenden Beispieldaten" — gebaut ist es anders, und zwar aus dem Grund, den Stufe 2 schon festgehalten hat: Der Text der drei Vorlagen ist ein Datensatz (`data/anweisungen.js`), kein Dateibestand. Er wandert beim Packen als String ins ZIP. Damit gibt es ihn **genau einmal**, und ein Gerüst kann nicht mit einer veralteten Kopie seiner eigenen Anleitung ausgeliefert werden. Gemessen: **0** `CLAUDE.md` unter `startprojekte/`. Die Zuordnung ist 1:1 — `einseiter`→`einseiter`, `dashboard`→`kleines-tool`, `auswerter`→`datenauswertung`.

### Der Abnahmemaßstab war die eigene Vorlage, nicht der Augenschein

Geprüft wurde jedes Gerüst gegen die **„Fertig ist es, wenn"-Liste der jeweils EIGENEN Vorlage** aus Stufe 2 — nicht gegen „sieht fertig aus". Der Grund steckt in der Bauform: Gerüst und Vorlage liegen zusammen im ZIP. Ein Gerüst, das gegen seine mitgelieferte `CLAUDE.md` verstößt, ist ab dem ersten Prompt kaputt, weil die Anleitung dann etwas anderes verlangt als der Code danebenliegend vormacht.

**Zwei echte Befunde, beide behoben und nachgeprüft:**

1. **Der Auswerter erfand Fragen, statt das Fehlen zu melden.** Bei einer Langformat-Datei **ohne Antwortspalte** nahm er die Kennungsspalte als Ersatz und gab 32 Pseudo-Fragen `R-0001`…`R-0032` aus — genau der Fehler, gegen den seine eigene Vorlage schreibt („Fehlt eine Spalte, sagst du das"). Der vorhandene Schutz griff nicht: er prüfte `fragen.length === verwertet`, und 32 ≠ 160. Jetzt zusätzlich: eine Spalte **taugt nicht als Antwortspalte**, wenn sie zusammen mit der Fragespalte den vollständigen Schlüssel der Tabelle bildet (gemessen an der Prüfdatei: 32 Kennungen × 5 Fragen = 160 Zeilen). Dazu eine zweite Plausibilitätsprobe, die unabhängig vom Erkennungsweg greift — sie schlägt an, wenn in jeder Frage-Gruppe jeder Antwortwert genau einmal steht und alle Gruppen dieselben Werte tragen. Das ist eine Kreuztabelle, keine Messung.
2. **Das Dashboard behauptete eine Rechnung, die nicht stattgefunden hatte.** Bei leerer Spalte oder Nenner 0 zeigte die Kachel nur einen Strich, während die Fußnote weiter sagte, die Quote sei aus den Summen berechnet. Jetzt steht dort „keine Zahl" **mit Grund und ohne Einheit**, und der Fuß nennt entweder den Rechenweg oder den Grund — nie beides durcheinander.

### Eigene Liste statt Eingriff in `CASES`

Die Gerüste kommen als **eigenes Array `STARTPROJEKTE`** in einen **eigenen Abschnitt** des Showrooms, mit dem dritten Marker „Startprojekt" — nicht als drei zusätzliche `CASES`-Einträge. Zwei Gründe:

- **Schema.** `CASES` hat sechzehn Felder, darunter `persona`, `story`, `zitat`, `aufwand`, `liveUrl`, `reaktionSeed`. Ein Gerüst hat davon keines. Sechs Felder wären leer oder erfunden — und „nichts erfinden" ist eine Hausregel.
- **Marker.** `istEcht` ist ein Boolean. Ein dritter Zustand passt da nicht hinein, ohne das Feld für alle zehn Bestandsprojekte umzubauen.

Der Marker bleibt trotzdem der dritte in der gemeinsamen visuellen Reihe — der Nutzen der Entscheidung aus der Fragerunde bleibt also erhalten, nur die Datenhaltung ist sauber getrennt.

**Das hat gehalten.** `e8:03_ehrlichkeits_marker` prüft `EXPECTED_TOTAL = 10`, `EXPECTED_ECHT = 4`, `EXPECTED_BEISPIEL = 6` und dass **jede `.sr-card` genau einen** Marker trägt. Der neue Abschnitt hat eine eigene Kartenklasse (`.sp-card`), liegt ausserhalb `#sr-grid` und lässt diese Zusicherungen unberührt: e8 blieb ohne eine geänderte Zeile grün. Wären die Gerüste in `CASES` gewandert, wäre e8:03 rot geworden.

*Nicht in diesem Durchgang:* Der bestehende Umfrage-Auswerter im Showroom bekommt keine Formatprüfung — die Entscheidung war, das im Gerüst zu lösen.

### Eingebaut: Anker-Muster, nicht Modal + iframe

Der Abschnitt `#startprojekte` sitzt in `showroom.html` **zwischen den Projekten und dem Meistgewollt-Ranking** (gemessen im DOM: `main-content` → `startprojekte` → Ranking). Er folgt dem Muster der Projektanweisungen — Abschnitt, Karte, `#sp-<id>`, kurze Hervorhebung — und **nicht** dem Case-Muster mit Modal und Vorschau-iframe. Drei Gründe, alle gemessen:

- **`e8:04_detail_modal_story_tabs` nagelt genau vier Modal-Reiter fest** („Überblick", „So ist es entstanden", „Nachbauen", „Vorschau"). Ein fünfter Reiter oder ein zweites Modal-Schema hätte den Test angefasst — die Regel für Stufe 0–4 lautet: kein Sollwert verschieben, um etwas grün zu bekommen.
- **`loading="lazy"` verzögert hier nichts.** Gemessen auf `showroom.html`: 10 Karten, 10 iframes, `page.frames().length` = **11** (Hauptframe plus zehn). Drei weitere iframes wären drei weitere Frames, nicht drei gesparte.
- **Für ein Gerüst sagt die Dateiliste mehr als ein geschrumpfter Screenshot.** Eine leere Startseite mit Platzhaltertext ist als Miniatur nicht zu unterscheiden von einer anderen leeren Startseite mit Platzhaltertext. Die Karte zeigt stattdessen, was im Ordner liegt.

### ZIP

Dateiname `<id>.zip`. Die Dateien kommen über das **Hausmuster aus `skills.html`**: erst GitHub-Roh (`REPO_RAW`), dann repo-relativ. Scheitert auch nur eine Datei, gibt es **kein ZIP**, sondern eine sichtbare Meldung an der Karte — ein stillschweigend unvollständiges Gerüst wäre schlimmer als keines. Die `CLAUDE.md` wird nicht geholt, sondern aus `ANWEISUNGEN` in den Puffer geschrieben.

**Bekannter Preis dieser Reihenfolge, als Fallstrick festgehalten:** Wer die Seite lokal von einem Arbeitsstand ausliefert, dessen Änderungen noch nicht auf `main` sind, bekommt im ZIP **den gepushten Stand**, nicht den eigenen. Auf der veröffentlichten Seite sind beide identisch; unter `file://` ist der Netzweg der einzige, der trägt. Der Eintrag steht jetzt auch in `CLAUDE.md` unter den Fallstricken.

### Registrierung: sechs Stellen, nicht fünf

Zu den fünf Pflichtstellen aus `CLAUDE.md` (`GSEARCH_GROUPS`, `switch` in `_gsGlobal()`, `GSEARCH_SOURCES`, `DS_TYPE_LABEL`, `SAMMLUNGEN` in `tools/seit.mjs`) kommt eine sechste: **der Script-Tag auf `index.html`**. Ohne ihn fällt die Sammlung **still** aus dem Neuigkeiten-Block, weil eine nicht geladene Sammlung dort übersprungen wird. Gemeldet hat das `e11:06` als `"STARTPROJEKTE:<Sammlung fehlt>"` — als fehlende **Sammlung**, nicht als fehlendes Datum. Das ist die dritte Variante desselben Musters aus Stufe 2: Eine Registry hilft nur so weit, wie der Wert überhaupt im Fenster liegt.

### Umgesetzt

1. **`data/startprojekte.js`** — drei Einträge mit je neun Feldern (`id`, `name`, `kurz`, `wofuer`, `anweisung`, `ordner`, `liveUrl`, `dateien`, `tags`). `dateien` listet den Ordnerinhalt **ohne** `CLAUDE.md`, weil die nicht auf der Platte liegt.
2. **Drei Gerüste unter `startprojekte/`**, 7 Dateien, jedes gegen die „Fertig ist es, wenn"-Liste seiner eigenen Vorlage abgenommen.
3. **Auswerter:** Schlüssel-Prüfung (`versch × verschFrage === zeilen.length`) plus zweite, erkennungsweg-unabhängige Plausibilitätsprobe. Statt Pseudo-Fragen kommt eine Meldung mit Grund und Vorschlag.
4. **Dashboard:** „keine Zahl" mit Grund statt Strich, Fußnote sagt Rechenweg **oder** Grund.
5. **Abschnitt `#startprojekte`** in `showroom.html`, Anker-Muster, eigene Klassen `.sp-*`.
6. **ZIP-Download je Gerüst**, `<id>.zip`, `CLAUDE.md` aus `ANWEISUNGEN`.
7. **Sechs Registrierstellen**, Deep-Link `showroom.html?g=<id>` → `#sp-<id>`.
8. **`data/seit.js` nachgezogen:** 246 → **249 Einträge** über **zwölf** Sammlungen, weiter sechs Inhaltstage.

### Testwirkung

**Die Vorhersage aus Fassung 2 ist eingetroffen.** Dort stand: „Sobald `STARTPROJEKTE` eine eigene Sammlung in `GSEARCH_GROUPS` mit eigenem Deep-Link wird, wiederholen sich zwei der drei Funde aus Stufe 2 unvermeidlich: die Positivliste `DEEPLINK_RE` in e9 und die Sammlungszahl in `e11:06` (dann 11 → 12)." Genau so kam es. Dazu kam eine Parameterliste und ein Ankerpräfix in `e11:03` — und **ein unvorhergesehener Fund**:

**`e11:03` („jeder Link löst auf") hat nie geprüft, ob der Hash irgendwo hinzeigt.** Die Prüfung stand auf `if (location.hash) return 'hash'`. Weil fast jede Bereichsseite ihren Query-Parameter beim Laden in einen Hash umschreibt, hat dieser Zweig die eigentliche Ankersuche darunter **nie erreicht**. Gemessen mit je einer echten id über alle zwölf Sammlungen: **5 endeten auf `modal`, 7 auf `hash`, die Präfixschleife lief bei keiner einzigen.** `showroom.html?g=gibtsnicht` wäre als „aufgelöst" durchgegangen. Ein Hash ist eben kein Nachweis, sondern nur eine Absichtserklärung der Seite. Jetzt muss der Hash sich ausweisen: entweder er **ist** die id eines Elements, oder der zugehörige Anker muss über die Präfixliste auffindbar sein. Dabei fielen **zwei Präfixe auf, die selbst blind waren**: `r-` heisst in Wahrheit `res-`, `faq-` heisst `faqcard-`. Beide korrigiert. **Rot-Nachweis:** kappt man beide Wege für die Startprojekte, meldet Check 03 genau die drei `?g=`-Links als tot.

Das ist dieselbe Lehre wie in Stufe 2, eine Ebene tiefer: Eine Prüfung, die auf halbem Weg „gut genug" zurückgibt, ist keine Prüfung. Sie war seit ihrer ersten Zeile grün, ohne je etwas zu prüfen.

| Suite | vorher | nachher |
|---|---|---|
| e1 · e3 · e6 · e7 · e8 · e10 · e12 | grün | grün, unverändert |
| e9 | grün | grün, `DEEPLINK_RE` um `showroom\.html\?g=` ergänzt |
| e11 | grün | grün, `globs` 11 → 12, Check 03 um `g`/`sp-` ergänzt **und** von „Hash genügt" auf „Hash muss sich ausweisen" verschärft |
| e13 (neu) | — | grün, 15 Checks, zwei Viewports |

`tests/e13-startprojekte.cjs` prüft die Dateiliste **in beiden Richtungen** gegen die Platte (Datenliste ohne Datei und Datei ohne Datenlisten-Eintrag fallen beide auf) und **entpackt das ZIP byteweise**. Genau dort liegt die Fehlerklasse, die kein DOM-Test findet: eine Dateiliste, die neben der Platte herläuft, sieht auf der Seite tadellos aus und liefert ein kaputtes ZIP. Die Zähne der Suite sind per Mutationstest nachgewiesen — sieben Mutanten, jeder färbte exakt die ihm zugeordneten Checks rot.

### Abnahme — gemessen

| Kriterium | Ergebnis |
|---|---|
| Gerüste auf der Platte | 3 Ordner, **7 Dateien** (`einseiter` 2 · `dashboard` 1 · `auswerter` 4) |
| `CLAUDE.md` im Ordner | **0** — kommt beim Packen aus `data/anweisungen.js` |
| Zuordnung Gerüst → Vorlage | **3 von 3**, 1:1 |
| Dateiliste gegen die Platte | in **beiden** Richtungen deckungsgleich (`e13:05`) |
| Pflichtfelder je Gerüst | **9 von 9** gefüllt, keine Platzhalter (`e13:01`) |
| Läuft per `file://` | **3 von 3** — **0** `fetch`/`XMLHttpRequest` in den Gerüsten, 0 externe Ressourcen (Dateien kommen über `FileReader`/Ablegen herein) |
| Abnahme gegen die eigene „Fertig ist es, wenn"-Liste | **3 von 3** bestanden, nach den zwei Korrekturen oben |
| Auswerter, Langformat ohne Antwortspalte | meldet das Fehlen · **0** erfundene Fragen (vorher 32: `R-0001`…`R-0032`; Prüfdatei 160 Zeilen = 32 × 5) |
| Auswerter, beide Formate | erkannt und **sichtbar benannt** — Breitformat 32 Zeilen, Langformat 160 Zeilen |
| ZIP | `<id>.zip`, byteweise entpackt und gegen die Platte verglichen (`e13:11`) |
| ZIP im Fehlerfall | kein halbes ZIP, sondern sichtbare Meldung an der Karte (`e13:11b`) |
| Showroom-Vorschau | **kein `sandbox`-Attribut** an 10 von 10 iframes — die Planannahme war falsch, Korrektur direkt unter dieser Tabelle |
| Startprojekt-Abschnitt | 3 `.sp-card` und **0** iframes (im DOM gezählt); ausserhalb `#sr-grid`, ohne Sterne-Widget (`e13:04`) |
| Abschnittsreihenfolge | `main-content` → `startprojekte` → Meistgewollt |
| Registrierstellen des neuen Typs | **6 von 6** |
| `SEIT`-Abdeckung | **249 von 249** über zwölf Sammlungen, 0 Lücken (`--pruefen`), sechs Inhaltstage |
| e13 (neu) | grün, 15 Checks × 2 Viewports |
| alle zehn Suiten (e1, e3, e6–e13) | Exit 0, `failed: []` |

**Eine Planannahme war falsch und wird hier ausdrücklich korrigiert.** Die Abnahme dieser Stufe verlangte ursprünglich: „Jedes Gerüst läuft per `file://` **und** im iframe (die Showroom-Vorschau ist ein iframe mit `sandbox`)." Der Klammersatz stimmt nicht. Gemessen auf `showroom.html`: **kein einziges** `sandbox`-Attribut, und `tests/e8-showroom.cjs:120` verlangt dessen Abwesenheit ausdrücklich (`allNoSandbox`, mit Begründung vom 22.07.2026 im Test: die Kombination `allow-scripts allow-same-origin` bot bei eigenen lokalen Dateien faktisch keine Isolation und erzeugte je iframe eine Konsolenwarnung). Die Einschränkung im Raster ist **rein visuell**: `pointer-events: none`, dazu `aria-hidden` und `tabindex="-1"`. Wer sich beim Bauen auf die Klammer verlassen hätte, hätte eine Isolation angenommen, die es nicht gibt.

---

## Stufe 4 — Restliste aus der Bestandsaufnahme · **erledigt 25.07.2026**

### 1 · Changelog-Reiter — ersatzlos entfernt

Der Reiter wurde **allen 35 sichtbaren Skills** zugeteilt und war vollständig erfunden: `renderModalChangelog()` erzeugte den Text aus der Versionsnummer. Er wies im ersten Satz selbst darauf hin, dass die echten Änderungen im Repo stehen — eine Rubrik, die ihre eigene Wertlosigkeit ankündigt, gehört nicht auf eine Seite, deren Maßstab Verlässlichkeit ist.

Gemessen nach dem Ausbau: `grep -ric changelog` repo-weit (ohne `.git`, ohne `docs/`) = **0**. `skills.html` ist von **4.130 auf 4.075 Zeilen** geschrumpft, netto **−55**. Die Reiterleiste eines Skills hieß vorher „Übersicht · Dateien & Download · Bewertungen · Piloten · Changelog", jetzt ohne den letzten; Plugin und Framework sind unverändert. Nachgewiesen, dass kein Reiter ohne Renderer übrigbleibt.

Geteilte Links der Form `skills.html#<id>/changelog` fallen **still** auf „Übersicht" zurück — gemessen, und genau so, wie es vorher schon bei Typen ohne diesen Reiter war: die Hash-Auflösung filtert über `MODAL_TABS` **und** über `modalTabsFor(skill)` und fällt sonst auf `'overview'` zurück. Eine sichtbare Meldung für tote Deep-Links ist Punkt 8 in Stufe 5 und wurde hier bewusst **nicht** vorgebaut: sie gehört an eine Stelle, nicht an fünf.

**Der Plan lag bei den Fundstellen daneben.** Er nannte fünf: Eintrag in `modalTabsFor()`, `renderModalChangelog()`, Eintrag in `MODAL_TABS`, Zeile in der Tab-Zuordnung, die `.changelog-*`-Regeln. Gemessen waren es **sieben Blöcke** (`git show -U0 … -- skills.html | grep -c '^@@'` = 7). Ihm fehlten:

- **der statische Reiter-Knopf im Modal-Markup** (`<button … data-tab="changelog">Changelog</button>`) — ein Reiter, den `modalTabsFor()` gar nicht mehr ausgibt, wäre als Leiche im HTML stehengeblieben;
- **ein dreizeiliger Kommentar über `modalTabsFor()`**, der die Plugin-Abweichung über den Changelog erklärte und zusätzlich behauptete „Skills behalten ihre 5 Tabs" — nach dem Umbau sind es 4. Der Kommentar wäre nicht nur übrig, sondern **falsch** gewesen.

Mit der Plan-Liste wäre die eigene Abnahme dieser Stufe (`grep -c changelog` = 0) fehlgeschlagen. Das ist die dritte Wiederholung desselben Musters: Eine aus dem Kopf geschriebene Fundstellenliste ist eine Vermutung, kein Messergebnis.

**Ebenfalls zu korrigieren:** Der Plan schrieb „25 der 35 stehen auf `1.0.0` und bekommen damit denselben Zweizeiler". Die 25 stimmt — aber den Zweizeiler bekamen **26**. `renderModalChangelog()` verzweigte über `patch > 0 ? … : minor > 0 ? … : ['Erste öffentliche Version', 'Basis-Funktionalität implementiert']`, und `campaign-check` steht auf `2.0.0`: Minor und Patch sind dort ebenfalls 0, der Major spielt in der Verzweigung keine Rolle. Wer nach der Versionszeichenkette zählt statt nach dem Zweig, zählt einen zu wenig. Pikant daran: Die richtige Zahl stand die ganze Zeit im **eigenen Messprotokoll** dieses Plans („26 Skills erzeugen einen Eintrag, 9 erzeugen zwei"). Die Stufenbeschreibung hat sie nicht von dort übernommen, sondern neu aus dem Kopf gebildet.

### 2 · Meta-Zahl — abgesichert

Neuer Check **`01b_meta_bestandszahl_stimmt`** in `tests/e1-regression.cjs`. Er vergleicht die Zahl in `description`, `og:description` und `twitter:description` von `skills.html` mit `VISIBLE_SKILL_COUNT` — **zur Laufzeit aus der Seite geholt, nicht in den Test getippt**. Damit kann der Test nicht mitdriften: eine falsche Zahl in den Meta-Tags lässt sich nicht dadurch grün bekommen, dass man den Sollwert im Test nachzieht, denn es gibt dort keinen.

Verglichen wird ausdrücklich **nicht** gegen die Kartenzahl im Reiter „Alle": die ist **37**, weil Merge-Karten als eine Karte zählen (Check 02 nagelt genau das fest). Wer hier die Kartenzahl einsetzt, baut einen Test, der von Tag eins rot ist — und zieht dann die Meta-Tags auf einen falschen Wert nach.

Verlangt wird **genau eine Zahl je Tag**. Eine zweite Zahl in der Beschreibung machte unentscheidbar, welche die Bestandszahl ist; wer eine zweite braucht, muss diesen Test bewusst anfassen. Dazu eine Untergrenze (`soll > 0`, drei gefundene Tags), damit nicht „keine Zahl == keine Zahl" grün wird — die Lehre aus Stufe 2, hier vorbeugend angewandt.

**Rot-Nachweis geführt:** Setzt man die Meta-Zahl auf 34, wird **genau dieser eine** Check rot, alle anderen bleiben grün.

### 3 · Baukasten-Prompts gekennzeichnet — und die Planannahme widerlegt

Der Plan sagte: „5 von 23 Prompts haben `builder`, `variants` und `preview` (dieselben fünf); **auf der Karte ist das nicht erkennbar**." Der erste Teil stimmt, der zweite nicht. Gemessen: Die fünf trugen **bereits ein Fähnchen** — beschriftet „Highlight", gespeist aus einem handgepflegten Set `PROMPT_SPOTLIGHT` in `data/prompts.js`, das **exakt dieselben fünf IDs** enthielt.

Es fehlte also kein Marker. Es fehlten zwei andere Dinge:

- Das Wort sagte nicht, was man tun kann. „Highlight" ist eine redaktionelle Meinung; „Baukasten" ist eine Fähigkeit.
- Daneben stand ein **zweiter Bestand**. Zwei Listen mit derselben Mitgliedschaft laufen genau bis zum ersten neuen Eintrag parallel — und dann lautlos auseinander. Der erste Prompt mit `builder`, den jemand ergänzt hätte, wäre ohne Fähnchen erschienen, ohne Fehlermeldung.

**Entschieden und umgesetzt:** `PROMPT_SPOTLIGHT` ersatzlos entfernt (`typeof PROMPT_SPOTLIGHT` = `undefined`, 0 Vorkommen im Repo). Fähnchen, Kartenrand und Sortierung hängen jetzt alle drei an **`p.builder`** — an der Fähigkeit selbst, nicht an einer Liste über sie. Beschriftung **„Baukasten"**, mit einem erklärenden Satz als `title` und zusätzlich als `.sr-only`-Text, damit der Hinweis nicht nur an der Maus hängt. Die Klassen `-spot`/`.card-spot-flag` heißen jetzt `-baukasten`/`.card-baukasten-flag`, damit der Selektor dasselbe Wort trägt wie die Karte — ein Test, der `.card-spot-flag` sucht, während auf der Karte „Baukasten" steht, ist beim nächsten Lesen eine Rätselaufgabe.

### Testwirkung

Die Vorhersage „keine" hat für den Changelog gehalten und für die anderen beiden Punkte nicht — beide Male aber ohne dass eine Zusicherung aufgeweicht wurde.

| Suite | vorher | nachher |
|---|---|---|
| e1 | grün, 16 Checks | grün, **17** — `01b_meta_bestandszahl_stimmt` dazu, sonst keine Zeile geändert |
| e3 | grün, 18 Checks | grün, **18** — zwei Kommentare nachgezogen, die auf die gelöschte Konstante `PROMPT_SPOTLIGHT` zeigten; kein Sollwert, kein Selektor, keine Zusicherung berührt |
| e6 · e7 · e8 · e9 · e10 · e11 · e12 · e13 | grün | grün, unverändert |

**Die Zahl im Plan war überholt.** Dort stand „0 Treffer über alle sieben Suiten". Das Ergebnis stimmt weiterhin — `grep -ic changelog tests/*.cjs` meldet für jede Datei 0 —, aber die Grundgesamtheit sind inzwischen **zehn** Suiten (e1, e3, e6–e13). Sieben war der Stand vor den Stufen 1, 2 und 3.

### Abnahme — gemessen

| Kriterium | Ergebnis |
|---|---|
| `changelog` im Repo (ohne `.git`, ohne `docs/`) | **0** Treffer, `grep -ric` |
| `changelog` in den Suiten | **0** in allen **zehn** |
| `skills.html` | 4.130 → **4.075** Zeilen, netto **−55** |
| Fundstellen | **7** Blöcke — der Plan nannte 5 |
| Reiterleiste Skill | vorher 5, nachher **4** (Übersicht · Dateien & Download · Bewertungen · Piloten) |
| Reiterleiste Plugin / Framework | unverändert |
| Reiter ohne Renderer | **0** |
| `#<id>/changelog` | fällt **still** auf „Übersicht" zurück, wie vorher schon bei Typen ohne den Reiter |
| Meta-Zahl in `description` · `og:` · `twitter:` | 3 × **35** == `VISIBLE_SKILL_COUNT`, zur Laufzeit geholt |
| Rot-Nachweis Meta-Test | Meta-Zahl auf 34 → **genau** `01b` rot, alles andere grün |
| Prompts mit `builder` / `variants` / `preview` | **5 / 5 / 5**, dieselben fünf IDs |
| `PROMPT_SPOTLIGHT` | **entfernt**, 0 Vorkommen |
| Fähnchen, Kartenrand, Sortierung | alle drei an `p.builder` |
| e1 · e3 | grün, 17 bzw. 18 Checks |

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

| Stufe | e1 | e3 | e6 | e7 | e8 | e9 | e10 | e11 | e12 | e13 | Neue Tests |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|---|
| **0 · Sofort-Fixes** ✔ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — | Kontrast/Umbruch je Farbfeld |
| **1 · `seit` + Neuigkeiten** ✔ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **neu** | — | — | `e11-neuigkeiten` (10 Checks) |
| **2 · Projektanweisungen** ✔ | ✓ | ✓ | ✓ | ✓ | ✓ | **△** | ✓ | **△** | **neu** | — | `e12-anweisungen` (13 Checks × 2 Viewports) |
| **3 · Startprojekte** ✔ | ✓ | ✓ | ✓ | ✓ | ✓ | **△** | ✓ | **△** | ✓ | **neu** | `e13-startprojekte` (15 Checks × 2 Viewports) |
| **4 · Restliste** ✔ | **△** | **△** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | `e1:01b` Meta-Zahl-Regression |
| 5 · Umbau | ✓ | — | **✎** | **✎** | — | **✎** | ✓ | ✓ | ? | ? | — |

✔ erledigt · ✓ bleibt unverändert grün · △ angepasst, ohne eine Zusicherung aufzuweichen · ✎ wird neu geschrieben · ? Wirkung nicht vorhergesagt, vor der Stufe zu messen

**Reale Check-Zahlen nach Stufe 4**, gezählt mit dem in `CLAUDE.md` dokumentierten Kommando: e1 **17** · e3 **18** · e6 **17** · e7 **15** · e8 **15** · e9 **8** · e10 **7** · e11 **10** · e12 **13** · e13 **15**. Alle zehn Exit 0.

**Die Regel für den ganzen Plan hieß:** In den Stufen 0–4 wird **keine bestehende Testdatei angefasst** — kein Sollwert verschoben, keine Zeile geändert. **Sie hat in drei von fünf Stufen nicht gehalten** (Stufe 2: e9 und e11 · Stufe 3: e9 und e11 · Stufe 4: e1 und e3, jeweils Begründung dort). Sie war zu grob formuliert: Ein neuer Inhaltstyp berührt zwangsläufig jede Liste, die Typen aufzählt, und zwei davon stehen in Tests; ein entfernter Bestand berührt jeden Kommentar, der auf ihn zeigt. Es bleibt die schärfere Fassung: **Kein Sollwert wird verschoben, um etwas grün zu bekommen.** Wird einer bewusst nachgezogen, steht die Begründung an Ort und Stelle im Test — so geschehen bei `globs` 10 → 11 → 12. Diese Fassung hat über alle fünf Stufen gehalten: kein Eingriff hat eine Prüfung geschwächt, drei haben sie verschärft (`?pa=`, `?g=`, und der Hash-Nachweis in `e11:03`). Erst Stufe 5 schreibt e6, e7 und e9 neu.

**In Stufe 0 und 1 hat die alte Regel gehalten — und zweimal zu einem besseren Entwurf geführt, nicht zu einem Kompromiss:**

- Stufe 1 wurde **tagesweise** gebaut, weil eintragsweise acht Glossarbegriffe gezeigt hätte.
- Stufe 1 bekam die **Sammelmeldung**, weil ein reines Zeitfenster den Anfang stillschweigend abschneidet. Dass damit vier fremde `i5`-Prüfungen grün bleiben, ist die Folge, nicht der Zweck — die Prüfungen verlangten das Richtige.
- Stufe 3 bekommt aus demselben Grund eine eigene Datenliste statt eines Eingriffs in `CASES`.

Nicht weil Tests unantastbar wären, sondern weil ein Entwurf, der eine grüne Zusicherung bricht, erst begründen muss, warum die Zusicherung falsch war — und in allen drei Fällen war sie es nicht.

**Eine Lehre aus Stufe 1, die für den Rest gilt:** Ich hatte `e3:i5` und `e8:i5` bei der Planung übersehen, weil ich nach den Namen aus e6/e7 gesucht hatte statt nach dem Muster. Vor jeder weiteren Stufe wird deshalb **über alle Suiten** nach dem betroffenen Selektor gesucht, nicht nach dem erwarteten Check-Namen.

**Eine Lehre aus Stufe 2, die für den Rest gilt:** Eine Gleichheitsprüfung zwischen zwei abgeleiteten Größen ist wertlos, solange nicht mindestens eine Seite nachweislich ungleich null ist. `vorlagen.html` lud `data/seit.js` nie — „Fähnchen == `istNeu()`" wäre dort mit 0 gegen 0 grün geblieben. Und: Der Selektor allein reicht nicht, gesucht wird auch nach den **Aufzählungen** — Positivlisten gültiger Formen und harte Sammlungszahlen kennen den neuen Typ nicht von selbst.

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
- **`skills.html` wächst in diesem Plan nicht** — die Projektanweisungen landen bewusst in `vorlagen.html`, obwohl der Skill-Baukasten die passende Maschine hätte. Grund: über 4.000 Zeilen und drei Views in einer Datei sind bereits die Stelle mit dem höchsten Risiko für ungewollte Nebenwirkungen. *(Die Zahl im Text lautete „4.124" und war schon bei der Niederschrift überholt. Gemessen mit `wc -l`: vor Stufe 4 **4.130**, danach **4.075** — die Datei ist als einzige in diesem Plan geschrumpft, um die 55 Zeilen des Changelog-Reiters.)*
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

Elf Suchtypen in `GSEARCH_GROUPS` über zehn Sammlungen — `SKILLS` bedient `skill` und `plugin`. *(Stand vor Stufe 2. Seither **dreizehn Suchtypen über zwölf Sammlungen**, gemessen aus `shared/base.js`: `ANWEISUNGEN`/`anweisung` kam mit Stufe 2 dazu, `STARTPROJEKTE`/`startprojekt` mit Stufe 3. Die Summe datierbarer Einträge liegt bei **249** — `tools/seit.mjs --pruefen`: „249 Einträge, 6 Tage, 0 nicht im Bestand".)*

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
- **Changelog:** 0 Treffer über alle sieben Suiten. `e1` liest die Reiterleiste aus, prüft aber nur „Dateien & Download" und „Bewertungen" — der Reiter ist ungeschützt und kann ersatzlos weg. *(„Sieben Suiten" ist der Stand dieses Messprotokolls vom 25.07.2026, vor e11, e12 und e13. Bei der Umsetzung in Stufe 4 gegen alle **zehn** nachgemessen — weiterhin 0 Treffer.)*
