---
name: report-summary
description: Fasst lange Analysen, Performance-Reports und Marktdaten (PDF/Excel/Text) zu einer Executive Summary mit Key Insights und Handlungsempfehlungen zusammen. Nutze diesen Skill für wöchentliche Reports, Management-Updates oder Kunden-Zusammenfassungen.
allowed-tools: Read, Bash
---

# Report Summarizer

Aus 30 Seiten wird eine Seite, die man wirklich liest.

## Vorgehen
1. **Quelle lesen** (PDF/Excel/Text). Kernzahlen und Aussagen extrahieren. Aufbau & Verdichtungs-Fragen: `references/aufbau.md`.
2. **Verdichten**: Was ist passiert? Warum? Was heißt das?
3. **Insights hervorheben** (3–5), dann konkrete Handlungsempfehlungen.
4. Klar, deutsch, führungsgerecht formulieren.

## Ausgabe
```
## Executive Summary — <Report>
<2–4 Sätze Kernaussage>
▸ Key Insights (3–5, mit Zahl)
▸ Empfehlungen (konkret, priorisiert)
```

## Regeln
- Nur belegte Aussagen aus der Quelle. Keine erfundenen Zahlen.
- Executive-tauglich: kurz, relevant, entscheidungsorientiert.
