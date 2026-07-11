---
name: meeting-notes
description: Wandelt rohe Mitschriften oder Transkripte in strukturierte Protokolle mit Agenda, Beschlüssen und Action Items (wer, was, bis wann). Nutze diesen Skill nach Meetings, für Kickoff-Protokolle oder aus Sprachnotizen.
allowed-tools: Read, Write
---

# Meeting Notes

Aus unstrukturiertem Input ein sauberes, actionable Protokoll.

## Vorgehen
1. **Input lesen** (Mitschrift, Transkript, Sprachnotiz-Text).
2. **Strukturieren** nach Format: Teilnehmer, Agenda, Beschlüsse, Action Items, nächste Schritte (Vorlage: `references/vorlage.md`).
3. **Action Items schärfen**: je Aufgabe Verantwortliche:r + Frist. Fehlt Info → `[?]`.
4. Knapp und klar formulieren.

## Ausgabe
```
## Protokoll — <Anlass> (<Datum>)
Teilnehmer: …
Beschlüsse: …
Action Items:
- [ ] <wer>: <was> (bis <wann>)
Nächste Schritte: …
```

## Regeln
- Nichts hinzudichten — nur, was im Input steht. Unklares als `[?]` markieren.
- Action Items niemals ohne Verantwortliche:n lassen (sonst `[?]`).
