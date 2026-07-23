# Erprobte Muster für erste Projekte

Diese Muster sind die häufigsten Erst-Projekte der Testgruppe. Jedes Muster hat
einen **kopierfertigen Startprompt** — Platzhalter in `[eckigen Klammern]` durch
deine Angaben ersetzen, in Claude Code einfügen, loslegen. Alle Muster ergeben
**eine** HTML-Datei, die per Doppelklick im Browser läuft und teilbar ist.

Faustregel: erst das kleinste sinnvolle Tool bauen, dann iterieren. Lieber ein
Feld zu wenig als drei zu viel.

---

## Muster 1 — Kleines Auswertungs-Tool (Daten rein → Kennzahlen raus)

Für den Klassiker: ein Export (CSV) soll schnell zu Zahlen und Balken werden,
ohne jedes Mal Excel-Formeln zu bauen.

**Wann:** Umfrage-Antworten, GA/GSC-Export, Kampagnen-Liste, Budget-Tabelle.

**Startprompt:**
```
Bau mir ein Auswertungs-Tool als eine HTML-Datei. Ich füge eine CSV mit den
Spalten [SPALTEN, z. B. Kanal, Kosten, Klicks] ein (oder lade sie hoch). Das Tool soll:
- die Zeilen einlesen und nach [GRUPPIERUNG, z. B. Kanal] gruppieren,
- je Gruppe [KENNZAHL, z. B. Summe der Kosten und CTR] berechnen und als Balken zeigen,
- die wichtigste Aussage oben in einem Satz nennen.
Rechne live bei jeder neuen Eingabe. Zeig Beispiel-Daten als Platzhalter, die ich
überschreiben kann. Keine externen Bibliotheken, offline lauffähig.
```

**Achte auf:** Prozente müssen sich zu 100 summieren; leere Zellen nicht raten,
sondern sichtbar als „fehlt" markieren. Verlang eine Beispielrechnung zum Beleg.

---

## Muster 2 — Interne Mini-Seite (Übersicht / Statusboard / Linkliste)

Für eine kleine Seite, die Ordnung schafft: eine Übersicht, die das Team an einer
Stelle sieht, statt sie aus fünf Chats zusammenzusuchen.

**Wann:** Projekt-Status, Tool-Sammlung fürs Team, Onboarding-Checkliste, FAQ.

**Startprompt:**
```
Bau mir eine interne Übersichtsseite als eine HTML-Datei zum Thema [THEMA].
Inhalt: [was drauf soll, z. B. eine Karten-Liste aus Titel, Kurzbeschreibung,
Status-Ampel und Link]. Die Einträge stehen als einfache Liste oben im Code, damit
ich sie ohne Programmierkenntnisse ergänzen kann. Oben ein Suchfeld, das die Karten
live filtert. Mobil bedienbar, pilot-Design.
```

**Achte auf:** Die Daten (Einträge) klar von der Darstellung trennen, damit
Kolleg:innen sie pflegen können. Ein Suchfeld schlägt zehn Reiter.

---

## Muster 3 — Formular + Ausgabe (Eingaben → fertiges Ergebnis)

Für Tools, die aus ein paar Eingaben etwas Verwertbares machen: einen Text, eine
Berechnung, eine formatierte Zusammenfassung zum Kopieren.

**Wann:** Angebots-/UTM-Generator, Briefing-Kurzfassung, Kostenschätzer,
Textbaustein-Zusammensteller.

**Startprompt:**
```
Bau mir ein Formular-Tool als eine HTML-Datei. Eingabefelder: [FELDER, z. B.
Kampagne, Quelle, Medium]. Beim Klick auf „Erzeugen" soll daraus [ERGEBNIS, z. B.
ein fertiger UTM-Link / ein formatierter Kurztext] entstehen, das ich mit einem
Knopf in die Zwischenablage kopieren kann. Pflichtfelder prüfen und freundlich
melden, wenn etwas fehlt. Keine Bibliotheken, offline lauffähig, pilot-Design.
```

**Achte auf:** Validierung vor Ausgabe (Pflichtfelder, Format). Ein sichtbarer
„Kopieren"-Knopf macht das Ergebnis erst nützlich.

---

## Muster 4 — Rechner (Live-Berechnung)

Eingabefelder + Ergebnis, das sich bei jeder Eingabe sofort neu berechnet.

**Wann:** TKP-/Reichweiten-Rechner, Marge, Streuverlust, einfache Prognosen.

**Startprompt:**
```
Bau mir einen Rechner als eine HTML-Datei: Eingaben [z. B. Reichweite, TKP,
Streuverlust], Ergebnis [z. B. Kontaktpreis netto], live berechnet bei jeder
Eingabe. Zeig eine Beispielrechnung als Beleg. pilot-Design, mobil bedienbar.
```

Die Berechnungslogik kannst du an `scripts/berechnung.js` als Vorlage anlehnen —
eine klar benannte Funktion pro Rechenschritt, damit sie prüfbar bleibt.

---

## Design (für alle Muster)

pilot-Farben: Schwarz `#262626`, Gelb `#ffe05e`, Papier/Beige `#f1f1ec`.
Großzügiger Weißraum, klare Hierarchie (eine Überschrift, dann das Wesentliche),
große Klickflächen, auf dem Handy bedienbar. Keine Deko, die nichts erklärt.

---

## Do / Don'ts

**Do**
- Klein anfangen: das kleinste Tool, das den Zweck erfüllt — dann erweitern.
- Beispiel-/Platzhalterdaten mitliefern, damit man sofort sieht, was passiert.
- Ergebnisse belegen lassen: „Rechne ein Beispiel vor und zeig, dass es stimmt."
- Daten von Darstellung trennen, damit Nicht-Entwickler:innen pflegen können.
- Nach dem Bauen öffnen und durchklicken (siehe Skill `webapp-testing`).

**Don'ts**
- Keine externen Bibliotheken/CDNs — bricht offline und beim Weitergeben.
- Nicht mehrere Dateien: eine HTML-Datei bleibt per Doppelklick teilbar.
- Keine erfundenen Zahlen — fehlende Werte sichtbar als „fehlt" markieren.
- Kein Fachjargon in der Oberfläche; die Bedienung muss sich selbst erklären.
- Nicht zehn Features auf einmal — ein Muster sauber, dann das nächste.
