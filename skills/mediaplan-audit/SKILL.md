---
name: mediaplan-audit
description: Lädt deinen Mediaplan (Excel/CSV) und prüft ihn auf Rechenfehler, Budget-Abweichungen, Lücken im Flighting und unplausible KPIs — bevor er zum Kunden geht.
trigger: /mediaplan-check
tags: [media, analytics, qa, mediaplan, excel, budget]
difficulty: Mittel
time: —
author: Media-Team pilot
version: 1.0.0
---

# Mediaplan-Audit

Media-Pläne sind komplex und Flüchtigkeitsfehler teuer. Dieser Skill liest deinen Plan ein und prüft systematisch: Summiert sich das Budget korrekt? Passen Reichweite und TKP zusammen? Gibt es Lücken oder Overlaps im Timing? Ergebnis: eine klare Fehlerliste, priorisiert nach Relevanz.

## Auslöser — wann ich genutzt werde
Nutze diesen Skill für: Mediaplan-Review · Budget-Kontrolle · Flighting-Check · Vor Kunden-Freigabe.
Stichworte: media, analytics, qa, mediaplan, excel, budget.

## Vorgehen
1. Eingabe/Kontext erfassen (Datei, Text oder Auftrag).
2. Gegen Konventionen & Best Practices prüfen, Abweichungen finden.
3. Ergebnis strukturiert erzeugen (siehe Ausgabe).
4. Kurz zusammenfassen, was getan wurde.

## Ausgabe
Ampel-Report (✓ / ⚠ / ✗) mit konkreten Fundstellen und Empfehlung.

## Regeln
- Klar und für Nicht-Techniker:innen verständlich bleiben.
- Nichts erfinden — nur, was aus der Eingabe hervorgeht.
- Bei Unklarheit kurz nachfragen statt raten.

## Voraussetzungen
- Claude Code

_Beispiel-Ausgabe siehe `references/beispiel.md`._
