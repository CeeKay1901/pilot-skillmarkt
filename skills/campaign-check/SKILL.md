---
name: campaign-check
description: Prüft Kampagnen-Setups auf Vollständigkeit und Fehler: Tracking-Codes, UTM-Parameter, Zielgruppen, Budget-Allocation und KPI-Definitionen.
trigger: /campaign-check
tags: [analytics, qa, media, campaign, tracking, utm]
difficulty: Mittel
time: —
author: Media-Team pilot
version: 2.0.0
---

# Campaign Checker

Für Media-Teams bei pilot entwickelt. Validiert die kritischen Punkte eines Kampagnen-Setups und findet Fehler, bevor sie Media-Budget kosten. Klare Ampel-Logik: was passt, was ist eine Warnung, was ein echter Fehler.

## Auslöser — wann ich genutzt werde
Nutze diesen Skill für: Vor Kampagnen-Launch · UTM-Audit · Tracking-Validierung · Budget-Review.
Stichworte: analytics, qa, media, campaign, tracking, utm.

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
