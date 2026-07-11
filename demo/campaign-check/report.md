# Campaign Check — `kampagne.csv`

**Launch-Empfehlung: STOPP** — 3 Blocker in 2 von 6 Anzeigen. Nach den 3 Fixes unten ist das Setup startklar.

Erzeugt von `demo/build-data-artifacts.mjs`. **Alle Findings stammen aus dem tatsächlichen Validator-Lauf.**

## Status je Anzeige

| Anzeige | UTM | Landingpage | Budget-Cap | Status |
|---|---|---|---|---|
| Herbst_A | ✓ | ✓ | ✓ | **✓ startklar** |
| Herbst_B | ⚠ | ✓ | ✓ | **⚠ prüfen** |
| Retargeting_A | ✓ | ✓ | ⚠ | **⚠ prüfen** |
| Retargeting_B | ✗ | ✗ | ✓ | **✗ Blocker** |
| Search_A | ✓ | ✓ | ✓ | **✓ startklar** |
| Search_B | ✗ | ✓ | ✓ | **✗ Blocker** |

## ✗ Fehler (3) — blockieren den Launch
- Zeile 5 (Retargeting_B): `utm_medium` fehlt — Traffic wird nicht zugeordnet
- Zeile 5 (Retargeting_B): Landingpage nutzt unsicheres `http://`
- Zeile 7 (Search_B): `utm_campaign` fehlt

## ⚠ Warnungen (3)
- Zeile 3 (Herbst_B): `utm_source=Meta` nicht kleingeschrieben
- Zeile 3 (Herbst_B): `utm_campaign=Herbst_2026` nicht kleingeschrieben
- Zeile 4 (Retargeting_A): kein `budget_cap` gesetzt

## ✓ In Ordnung (2)
- Herbst_A: vollständig getaggt
- Search_A: vollständig getaggt

## So behebst du es — 3 Änderungen, dann GO
1. Zeile 5: `utm_medium=cpc` ergänzen
2. Zeile 5: Landingpage auf `https://` umstellen — und das Ziel prüfen (zeigt auf /404)
3. Zeile 7: `utm_campaign=herbst_2026` ergänzen

---
_Regel des Skills: ✗ = Launch-Blocker, ⚠ = Optimierung. Jeder Fund mit Fundstelle — nachprüfbar in `kampagne.csv`._
