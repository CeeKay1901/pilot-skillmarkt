---
name: report-automat
description: Richtet wiederkehrende Reports ein, die automatisch erstellt werden – Daten ziehen, aufbereiten, zusammenfassen, ablegen – nach Zeitplan. Nutze diesen Skill für wöchentliche/monatliche Reportings, die sonst jedes Mal von Hand entstehen.
allowed-tools: Bash, Read, Write, Glob
---

# Report-Automat

Reporting, das sich selbst erledigt. Der nächste Schritt nach
`daten-aufbereiten` und `report-summary`.

## Vorgehen
1. **Report definieren**: Quelle(n), gewünschte Auswertung, Format, Ablageort, Takt.
2. **Ablauf bauen**: Daten einlesen → bereinigen → zusammenfassen → ablegen.
3. **Einmal testen** mit echten Daten; Ergebnis prüfen lassen.
4. **Zeitplan einrichten** (z. B. montags 07:00) und Ablauf speichern.

## Ausgabe
Eingerichteter, wiederholbarer Report-Ablauf + Beschreibung, wann er läuft
und wo das Ergebnis liegt.

## Regeln
- Vor Aktivierung einen echten Testlauf zeigen.
- Keine sensiblen Daten an ungewollte Orte schreiben.
