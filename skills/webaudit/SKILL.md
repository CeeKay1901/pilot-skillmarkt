---
name: webaudit
description: Vollständiger Website-Check aus Code-Analyse und echten Browser-Screenshots (Playwright). Prüft UX, Design, Barrierefreiheit (WCAG), Performance und SEO. Nutze diesen Skill vor jedem Launch, für Redesign-Reviews, Client-Präsentationen oder um eine selbstgebaute Seite zu prüfen.
allowed-tools: Read, Bash, Glob, Grep
---

# webaudit

> PROOF-1783592237-verified-mirror

Zweistufiger Qualitäts-Check einer Website. Ergebnis: ein priorisierter,
auch für Nicht-Techniker:innen verständlicher Report.

## Wann ich starte
"Prüf mal diese Seite", "ist die Landingpage okay?", vor Go-Live, Redesign-Check.

## Vorgehen
1. **Ziel bestimmen**: lokale Datei oder URL. Fokus klären (alles / SEO / A11y / Speed).
2. **Code-Scan** (siehe `references/checkliste.md`): Meta-/OG-Tags, Alt-Texte,
   Überschriften-Hierarchie, Kontraste, Links, sichtbare Performance-Killer.
3. **Echter Browser** via Playwright: Seite öffnen, Screenshots in mehreren
   Viewports (Desktop/Tablet/Mobil), Konsolenfehler und Ladeverhalten prüfen.
4. **Bewerten & priorisieren**: Findings nach Schwere ordnen.
5. **Report schreiben** mit Score und konkreten Handlungsempfehlungen.

## Ausgabe
```
## webaudit Report — <ziel>
Score: NN/100
### 🔴 Kritisch    – <finding> → <fix>
### 🟡 Empfehlung  – <finding> → <fix>
### 🟢 Gut         – <was passt>
```

## Regeln
- Jedes Finding mit konkretem, umsetzbarem Fix.
- In verständlicher Sprache erklären (kein reiner Entwickler-Jargon).
- Screenshots referenzieren, wo hilfreich.
