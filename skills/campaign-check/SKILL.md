---
name: campaign-check
description: Validiert ein Kampagnen-Setup vor dem Launch – Tracking, UTM-Parameter, Zielgruppen, Budget-Allocation, KPI-Definitionen – mit klarer Ampel-Logik. Nutze diesen Skill vor jedem Kampagnenstart oder für ein Tracking-/Setup-Audit.
allowed-tools: Read, Bash, Grep
---

# Campaign Checker

Finde Fehler im Kampagnen-Setup, bevor sie Media-Budget kosten.

## Wann ich starte
Vor Kampagnen-Launch, "check mal unser Setup", UTM-/Tracking-Audit.

## Vorgehen
1. **Setup einlesen**: Plan/Export, UTM-Liste, Tracking-Doku, Budgetplan.
2. **Systematisch prüfen** nach `references/checkliste.md`.
3. **Ampel vergeben** je Punkt: ✓ ok · ⚠ Warnung · ✗ Fehler.
4. **Report** mit priorisierten Findings + konkretem Fix je Punkt.

## Ausgabe
```
Campaign Check — "<Kampagne>"
✓ <ok-Punkt>
⚠ <Warnung> → <Empfehlung>
✗ <Fehler> → <Fix, blockt Launch>
```

## Regeln
- ✗ = Launch-Blocker klar kennzeichnen.
- Jeder Fund mit konkreter Fundstelle + Fix.
