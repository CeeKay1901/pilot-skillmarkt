# Implementierungsplan — Bibliothek, Inhalte, Neuigkeiten

**Stand:** 25.07.2026 · **Grundlage:** Bestandsaufnahme vom selben Tag (gemessen, nicht geschätzt) und eine Fragerunde mit sechs Entscheidungsblöcken.

Dieses Dokument hält fest, **was entschieden ist**, damit es nicht neu verhandelt wird, und **in welcher Reihenfolge gebaut wird**. Es ersetzt keine der harten Regeln aus `CLAUDE.md` — die gelten weiter, besonders „kein Build-Step", „Zahlen-Ehrlichkeit" und „ändere nie einen Test, um ihn grün zu bekommen".

---

## Entschieden

| Frage | Entscheidung |
|---|---|
| Umfang Vorlagen-Umbau | **Eine Engine, sichtbar getrennte Bereiche.** Assets, Code-Bausteine und Beispieldaten teilen ein Modell; der Typ wird ein Filter, aber die Kategorien bleiben optisch klar getrennt. |
| Grobe Reiter | **Design · Code · Daten · Pakete** |
| Paket-Begriff | Ein Paket darf **Verweise auf vorhandene Einträge UND eigene Dateien** enthalten. |
| Design-Systeme | **Mehrere möglich** (pilot-CI, später Kunden-CI, projekttyp-spezifische Regelwerke). Paket-Inhalt: Tokens, Schriften, Muster, Beispielseite **plus CLAUDE.md mit den Designregeln**. Ohne Logos — die bleiben ein eigener Eintrag mit eigener Nutzungsregel. |
| Kunden-CI | Kommt erst nach dem Umzug in die eigene Organisation (dann privat). Das Modell wird jetzt schon mehrfach-fähig gebaut. |
| Bilder | Bereich **startet jetzt** mit den vorhandenen Testbildern plus echten Fotos aus freien Quellen als Übungsmaterial. Die spätere echte Bildbibliothek wird **verlinkt bzw. aus dem Backend bedient**, nicht ins Repo gelegt. |
| Startprojekte | **Drei neue schlanke Gerüste**: Dashboard · Auswerter · Einseiter. Je ein Ordner mit `CLAUDE.md`, `index.html` und Beispieldaten. Im Showroom als dritter Marker neben „Echtes Team-Tool" und „Beispiel-Projekt". |
| Projektanweisungen | **Kopierbare Vorlagen**, geschnitten **nach Projekttyp** — passend zu den drei Gerüsten. Kein Formular-Baukasten in diesem Durchgang. |
| Neuigkeiten | **Die letzten acht Einträge, gattungsübergreifend**, unten auf der Startseite. Handgepflegte Liste entfällt. |
| Datumsfeld | Neues Feld **`seit`** = „seit wann auf der Seite", **aus der Git-Historie ermittelt**, für alle neun Gattungen. `addedAt` bleibt unverändert die redaktionelle Entstehungszeit. |
| Merken / Bewerten | **Merken überall.** Bewerten nur, wo man etwas wirklich benutzt hat. |
| Alte Daten und Links | **Sauber vereinheitlichen, Altes verfällt.** Bewusst in Kauf genommen: gespeicherte Merkungen alter Typen und geteilte `?a=`/`?b=`-Links brechen. |
| Reihenfolge | **Kleines zuerst, Umbau zuletzt.** Jede Stufe geht einzeln live. |
| Einreichwege | **Vertagt aufs Backend.** Die vier simulierten Flows bleiben vorerst, wie sie sind. |
| Regressionssuiten | e6 und e7 werden **neu geschrieben**, jeder verschobene Sollwert bekommt im Test seine Begründung. |
| Changelog-Reiter | **Streichen.** |

---

## Stufe 0 — Sofort-Fixes

Unabhängig vom Umbau, weil sie täglich Substanz kosten und im Umbau nicht automatisch mitkommen.

1. **Farbfelder am Handy.** Gemessen bei 390 px: bei allen sieben Paletten werden Felder abgeschnitten, bei „pilot CI" zwei — die Hausfarbe ist dort nicht antippbar. Ursache: `.pal-swatches` ist ein `flex` mit `overflow: hidden`, die `.swatch` haben kein `min-width: 0`. Lösung: umbrechen statt abschneiden.
2. **Hex-Werte dauerhaft sichtbar.** `.swatch-hex` steht auf `opacity: 0` und erscheint nur bei Hover — auf Touch-Geräten also nie. Ersetzen durch eine echte, dauerhaft sichtbare Beschriftung mit je nach Untergrund heller oder dunkler Schrift.

**Prüfung:** bei 390 px kein abgeschnittenes Feld über alle sieben Paletten; Hex-Wert ohne Hover lesbar; Kontrast jeder Beschriftung gegen ihr eigenes Farbfeld gemessen (WCAG 1.4.3).

---

## Stufe 1 — Datumsfeld und Neuigkeiten

1. **`seit` ermitteln.** Für jeden Eintrag aller neun Gattungen das erste Auftauchen im Repo bestimmen (`git log -S"<id>" --reverse`). Stichprobe hat funktioniert. Ergebnis als Feld in die Datendateien, mit Herkunftsvermerk im Dateikopf.
   *Bekannte Eigenheit:* Einige Datendateien haben nur zwei bis drei Commits — viele Einträge teilen sich dann ein Datum. Das ist die Wahrheit (sie kamen gemeinsam) und wird nicht künstlich gestreut.
2. **Neuigkeiten-Block** unten auf der Startseite: die letzten acht Einträge über alle Gattungen, je mit Typ-Kennzeichnung und Deep-Link. Die vier handgeschriebenen `<li>` mit Datumsangaben ohne Jahr entfallen.
3. **`badge: "neu"` auflösen.** Steht heute bei 28 von 45 Skills und wird nirgends gerendert. Künftig aus `seit` abgeleitet statt gepflegt.

**Prüfung:** Block zeigt acht Einträge, alle Links lösen auf, kein Datum ist geschätzt; ein neuer Testfall stellt sicher, dass der Block nie leer und nie länger als acht wird.

---

## Stufe 2 — Projektanweisungen

Drei kopierbare `CLAUDE.md`-Vorlagen, geschnitten nach Projekttyp:

- **Kleines Tool** — ein interaktives Werkzeug für eine Aufgabe
- **Datenauswertung** — Datei rein, verdichtete Zahlen raus
- **Website / Einseiter** — eine Seite zum Teilen

Jede Vorlage ist ausgeschrieben und kommentiert, sodass klar ist, *warum* welcher Abschnitt drinsteht. Sie liegen zunächst als dritter Block im Baukasten-Reiter und wandern mit Stufe 5 in den Reiter „Code".

**Doppelte Nutzung ohne doppelten Bestand:** Dieselben drei Dateien sind die `CLAUDE.md` der drei Startprojekt-Gerüste aus Stufe 3.

Merkbar und bewertbar (man benutzt sie).

---

## Stufe 3 — Startprojekte

Drei Ordner, je mit `CLAUDE.md`, `index.html` und passenden Beispieldaten:

1. **Dashboard-Gerüst** — CSV rein, Diagramme raus. Nutzt `kampagnen-kpis.csv` und knüpft am vorhandenen Chart-Baustein an.
2. **Auswerter-Gerüst** — Rückläufe verdichten. **Erkennt Breit- und Langformat und schreibt sichtbar hin, welches es erkannt hat.** Das behebt eine gemessene Falle: `umfrage-rohdaten.csv` ist Breitformat, der bestehende Auswerter im Showroom erwartet Langformat und liefert dafür stumm 33 Pseudo-„Fragen" statt einer Fehlermeldung.
3. **Einseiter-Gerüst** — eine teilbare Seite für Kampagne oder Ergebnis.

Im Showroom als dritter Marker **„Startprojekt"** neben den beiden vorhandenen, mit ZIP-Download. Die ZIP-Funktion liegt bereits in `shared/base.js` und wird nur benutzt.

*Nicht in diesem Durchgang:* Der bestehende Umfrage-Auswerter im Showroom bekommt keine Formatprüfung — die Entscheidung war, das im Gerüst zu lösen.

**Prüfung:** jedes Gerüst läuft per `file://` und im iframe; das ZIP enthält alle Dateien; der Auswerter erkennt beide Formate nachweislich und benennt sie.

---

## Stufe 4 — Restliste aus der Bestandsaufnahme

1. **Changelog-Reiter streichen.** Steht bei 30 von 37 Skills, liefert bei allen praktisch denselben aus der Versionsnummer erzeugten Text. Der Reiter weist selbst darauf hin, dass die echten Änderungen im Repo stehen.
2. **Meta-Zahl absichern.** „35 echte Skills" steht dreifach fest in den Meta-Tags von `skills.html` und kein Test schützt sie. Laufzeit-Berechnung hilft hier nicht, weil Suchmaschinen und Link-Vorschauen das statische HTML lesen — also ein Regressionstest, der rot wird, sobald die Zahl von `VISIBLE_SKILL_COUNT` abweicht.
3. **Prompt-Baukasten kennzeichnen.** 5 von 23 Prompts haben `builder`/`variants`/`preview`; auf der Karte ist das nicht erkennbar. Erst kennzeichnen, Ausrollen auf weitere Prompts danach entscheiden.

---

## Stufe 5 — Der Bibliotheks-Umbau

**Zuerst das Datenmodell, dann die Karten, dann die Pakete.** Nicht am Layout anfangen.

1. **Gemeinsames Modell.** Jeder Eintrag: `id`, `typ`, `name`, `beschreibung`, `vorschau`, `dateien[]`, `lizenz`, `tags`, `seit`. Dateien werden über eine Referenz adressiert, die heute ein lokaler Pfad ist und später eine URL aus dem Objektspeicher sein kann — ohne dass das Modell sich ändert.
2. **Eine Karte, ein Modal, eine Suche, ein Filter.** Damit verschwinden von selbst: die 21 nicht anklickbaren Assets, das zweite Suchfeld, der Bausteine-Zähler, der den Kategoriefilter ignoriert, der fehlende Leerzustand im Assets-Reiter.
3. **Zwei Navigationsebenen.** Reiter `Design · Code · Daten · Pakete`, darin die Kategorien als klar getrennte Bereiche mit eigenen Überschriften.
4. **Pakete als Typ.** Verweise auf vorhandene IDs und eigene Dateien; das ZIP wird zur Laufzeit gepackt.
5. **Design-System pilot** als erstes Paket: Tokens, Schriften, Muster, Beispielseite, `CLAUDE.md` mit den Designregeln.
6. **Bild-Bereich** mit den vorhandenen Testbildern plus freien Fotos. Jede Lizenz wird pro Bild geprüft und angezeigt — keine Aufnahme ohne belegte Lizenz.
7. **Muster-CSS lauffähig machen.** Sieben der zehn Hintergründe kopieren heute einen relativen Pfad, der außerhalb des Repos ins Leere zeigt, und es gibt keinen SVG-Download. Entweder Download je Muster oder das SVG als `data:`-URI in den kopierten Schnipsel.
8. **Tote Deep-Links melden sich.** Da alte Links bewusst verfallen, bekommt ein nicht auflösbarer Deep-Link eine sichtbare Meldung statt wie heute stillzuschweigen.
9. **Suiten e6 und e7 neu**, jeder verschobene Sollwert mit Begründung im Test.

---

## Bewusst nicht in diesem Plan

- **Echte Einreichwege** für Prompt-Variante, Baustein, Asset und Projekt — vertagt aufs Backend. Bis dahin bleiben vier Entwürfe im localStorage liegen, ohne Weg nach draußen. Das ist eine bekannte, akzeptierte Sackgasse.
- **Geteilte Bewertungen, Stimmen und Merklisten** — brauchen Persistenz, kommen mit dem Backend.
- **Kunden-CI** — nach dem Umzug in die eigene Organisation.
- **Abläufe / Schritt-für-Schritt-Rezepte** — verworfen.
- **Ansprechpartner, Selbstbeschreibung, KI-Richtlinie, Zugangs- und Kostenfragen, Warnhinweis zur lokalen Speicherung** — als nicht benötigt eingestuft.

---

## Risiken und offene Punkte

- **Geteilte Links brechen.** Bewusste Entscheidung. Abgefedert durch Punkt 8 in Stufe 5 — wer einem alten Link folgt, erfährt wenigstens, dass sein Ziel nicht mehr existiert.
- **Gespeicherte Merkungen und Bewertungen alter Typen verfallen.** Ebenfalls bewusst.
- **Bildlizenzen.** Freie Quellen sind nicht automatisch frei von Auflagen. Jedes aufgenommene Foto braucht eine belegte Lizenz und Quellenangabe; im Zweifel wird es nicht aufgenommen.
- **Git-Historie als Datumsquelle** funktioniert (Stichprobe erfolgreich), liefert aber grobe Cluster, wo Einträge gemeinsam eingecheckt wurden.
- **`skills.html` wächst in diesem Plan nicht** — die Projektanweisungen landen bewusst in `vorlagen.html`, obwohl der Skill-Baukasten die passende Maschine hätte. Grund: 4.124 Zeilen und drei Views in einer Datei sind bereits die Stelle mit dem höchsten Risiko für ungewollte Nebenwirkungen.
