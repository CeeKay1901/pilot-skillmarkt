---
name: tracking-audit
description: Validiert die Tracking-Konfiguration einer Kampagne oder Website – UTM-Konventionen, GA4-Events, Meta/LinkedIn-Pixel und Consent – und findet fehlende oder inkonsistente Tags. Nutze diesen Skill vor dem Launch oder wenn Daten fehlen/unplausibel wirken.
allowed-tools: Read, Bash, Grep, Glob
---

# Tracking-Audit

Sichere eine saubere Datenbasis, bevor die Kampagne startet.

## Vorgehen
1. **Bestand erfassen**: UTM-Liste, Tag-/GTM-Export, Pixel-IDs, Consent-Setup. Vollständige Prüfpunkte: `references/checkliste.md`.
2. **UTM prüfen**: Konvention (source/medium/campaign), Vollständigkeit, Konsistenz.
3. **Events prüfen**: definierte GA4-/Pixel-Events vorhanden, feuern einmalig, korrekt benannt.
4. **Consent prüfen**: Tracking startet erst nach Einwilligung (Consent-Mode).
5. **Report** mit Ampel + Fix je Fund.

## Ausgabe
```
Tracking-Audit — "<Kampagne>"
✓ UTM-Konvention eingehalten
⚠ <Event doppelt / uneinheitlich> → <Fix>
✗ <Consent fehlt / Event feuert nicht> → <Fix>
```

## Regeln
- Klar sagen, was blockt (✗) und was nur Optimierung ist (⚠).
- Für tiefes Debugging auf GTM/Tag-Assistant verweisen — hier: strukturierte Erstprüfung.
