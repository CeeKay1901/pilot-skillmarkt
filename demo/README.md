# demo/

Die **echten Ergebnisse** hinter der Demo-Matrix im Onepager „Was sind Skills?".
Kein Beispiel ist erfunden — jedes Artefakt wurde von einem Skript erzeugt, das
hier im Ordner liegt. Wer will, kann es nachrechnen.

| Demo-Fall | Artefakt | Erzeugt von |
|---|---|---|
| Prototyp bauen → TKP-Rechner | `../tkp-rechner.html` | Claude Code (`/prototyp`) — echtes, rechnendes Tool |
| Prototyp bauen → Umfrage-Auswerter | `../umfrage-auswertung.html` | Claude Code (`/prototyp`) — parst echtes CSV |
| webaudit → Gebautes Tool prüfen | `webaudit/report.html` | `build-webaudit-report.mjs` (echter Browser-Lauf) |
| pptx → Pitch-Deck | `pptx/pitch-deck.pptx` | `build-pptx.mjs` aus `pptx/konzept.md` |
| Daten aufbereiten | `daten/daten_clean.csv`, `daten/aenderungen.md` | `build-data-artifacts.mjs` |
| Campaign Checker | `campaign-check/report.md` | `build-data-artifacts.mjs` (echter Validator) |
| Content Recycling | `content-recycling/varianten.md` | Ausgabe des Skills aus `case-study.md` |

## Neu erzeugen

```bash
node demo/build-data-artifacts.mjs          # Daten + Campaign-Check
PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright \
  node demo/build-webaudit-report.mjs       # echter Audit + Screenshots
npm i pptxgenjs && node demo/build-pptx.mjs # echtes .pptx
```

## Anmerkungen

- Der **webaudit-Report** stammt aus einem echten Chromium-Lauf: Screenshots,
  Ladezeit, Kontrastwerte und der Funktionstest (500.000 × 12 € → 6.000,00 €)
  sind gemessen, nicht geschrieben. Die Ladezeit steht als Messwert im Kopf und
  wird nicht bewertet — sie hängt am Netz, nicht am Tool. Der erste Lauf fand einen **echten
  WCAG-Fehler** im TKP-Rechner (Eingabefelder ohne Label-Verknüpfung) — der
  wurde im Tool behoben. Es bleiben 2 Empfehlungen (fehlende Open-Graph-Tags,
  render-blockierender Webfont) → Score 90/100.
- Die Zahlen im **Änderungs-Log** (2 Duplikate, 7 von 9 Zeilen, 8.495,70 €)
  zählt das Skript, es schätzt sie nicht.
- Der **Campaign-Validator** meldet genau die Fehler, die in `kampagne.csv`
  tatsächlich stecken (fehlendes `utm_medium`, `http://`-Landingpage, fehlende
  `utm_campaign`).
- `viewer.html` rendert die Markdown-Ergebnisse direkt auf der Seite
  (`viewer.html?f=<pfad>.md`).
