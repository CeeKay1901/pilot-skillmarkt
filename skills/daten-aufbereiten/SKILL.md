---
name: daten-aufbereiten
description: Bereinigt unordentliche Tabellen (Excel/CSV) – entfernt Duplikate, vereinheitlicht Formate, markiert Lücken – und macht sie analysefertig, auf Wunsch mit erster Auswertung. Nutze diesen Skill vor jeder Analyse oder zum Aufräumen von Export-Dateien.
allowed-tools: Read, Write, Bash, Glob
---

# Daten aufbereiten

Die undankbarste Arbeit vor jeder Analyse — übernommen.

## Vorgehen
1. **Datei einlesen** (CSV/Excel). Struktur, Spalten, Zeilenzahl erfassen. Schritt-für-Schritt-Checkliste: `references/checkliste.md`.
2. **Bereinigen**:
   - Duplikate erkennen und entfernen (Regel nennen).
   - Datums-/Zahlen-/Währungsformate vereinheitlichen.
   - Leere Pflichtfelder markieren (nicht raten).
   - Offensichtliche Tippfehler in Kategorien angleichen (nach Rückfrage).
3. **Analysefertig strukturieren** (konsistente Spalten, saubere Typen).
4. **Zusammenfassen**, was geändert wurde; auf Wunsch erste Kennzahlen.

## Ausgabe
Bereinigte Datei (`*_clean.csv`) + Änderungs-Log
(z. B. "214 Duplikate entfernt, Datumsformate vereinheitlicht").

## Regeln
- Originaldatei nie überschreiben — neue `_clean`-Datei anlegen.
- Nichts stillschweigend löschen/ändern, was Bedeutung tragen könnte — markieren & melden.
