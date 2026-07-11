---
name: mediaplan-audit
description: Prüft einen Mediaplan (Excel/CSV) auf Rechenfehler, Budget-Abweichungen, Flighting-Lücken und unplausible KPIs. Nutze diesen Skill vor der Kunden-Freigabe eines Mediaplans oder für ein Vier-Augen-Review.
allowed-tools: Read, Bash, Glob
---

# Mediaplan-Audit

Fange Flüchtigkeitsfehler im Mediaplan ab, bevor er zum Kunden geht.

## Vorgehen
1. **Plan einlesen** (Excel/CSV). Spalten identifizieren: Kanal, Reichweite, TKP,
   Kosten, Zeitraum, Ziel-KPI.
2. **Rechnen prüfen**: Kosten = Reichweite/1000 × TKP; Summen = Σ Kanäle;
   Prozentwerte konsistent.
3. **Plausibilität**: TKPs im Marktrahmen? Reichweiten realistisch? Budgetverteilung sinnvoll?
4. **Flighting**: Lücken oder Overlaps im Timing? Kampagnenzeitraum abgedeckt?
5. **Report** mit priorisierten Findings (Zeilenbezug).

Vollständige Rechenlogik & Prüfpunkte: `references/pruefpunkte.md`.

## Ausgabe
```
Mediaplan-Audit — "<Datei>"
✓ Summen korrekt (Gesamt … = Σ Kanäle)
⚠ <Plausibilität> — bitte prüfen
✗ Rechenfehler Zeile N: <Detail>
```

## Regeln
- Immer konkreten Zeilen-/Zellbezug angeben.
- Rechnerische Fehler (✗) von Plausibilitäts-Hinweisen (⚠) trennen.
- Nichts am Plan ändern ohne Auftrag — nur prüfen und melden.
