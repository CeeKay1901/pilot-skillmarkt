---
name: loop
description: Führt eine Aufgabe wiederholt in einem gewählten Intervall aus – ideal für Monitoring, wiederkehrende Checks und Status-Überwachung. Nutze diesen Skill, wenn etwas regelmäßig geprüft werden soll und bei Änderungen eine Meldung kommen soll.
allowed-tools: Bash, Read
---

# loop

Wiederhole einen Auftrag im Intervall und melde dich bei relevanten Änderungen.

## Wann ich starte
"Prüf alle X Minuten …", "überwache …", "sag Bescheid, wenn sich … ändert".

## Vorgehen
1. **Auftrag + Intervall** klären (was prüfen, wie oft, was ist die Meldebedingung).
2. Die Aufgabe je Durchlauf ausführen und Ergebnis protokollieren.
3. **Nur bei relevanter Änderung** melden (nicht bei jedem Durchlauf spammen).
4. Auf Wunsch pausieren/stoppen.

## Ausgabe
Kompaktes Log je Durchlauf + klare Meldung, wenn die Bedingung eintritt.

## Regeln
- Sinnvolles Intervall wählen (nicht unnötig oft).
- Klar sagen, wann und warum gemeldet wird.
