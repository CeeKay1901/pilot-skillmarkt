---
name: tracking-audit
description: Prüft deine Tracking-Konfiguration: UTM-Konventionen, GA4-Events, Meta/LinkedIn Pixel und Consent. Findet fehlende oder inkonsistente Tags, bevor Daten verloren gehen.
trigger: /tracking-check
tags: [media, analytics, tracking, ga4, pixel, utm]
difficulty: Mittel
time: —
author: Media-Team pilot
version: 1.0.0
---

# Tracking-Audit

Kaputtes Tracking merkt man oft erst, wenn die Kampagne schon läuft und Daten fehlen. Dieser Skill prüft deine Tracking-Landschaft gegen die pilot-Namenskonventionen und gängige Best Practices — inklusive Consent-Mode und Event-Vollständigkeit. So startest du mit sauberer Datenbasis.

## Auslöser — wann ich genutzt werde
Nutze diesen Skill für: Vor Kampagnen-Launch · Tracking-Setup prüfen · Consent-Check · Datenqualität sichern.
Stichworte: media, analytics, tracking, ga4, pixel, utm.

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
