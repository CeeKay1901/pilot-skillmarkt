# Campaign Check — `kampagne.csv`

Erzeugt von `demo/build-data-artifacts.mjs`. Der Validator hat **6 Anzeigen** geprüft.
**Alle Findings unten stammen aus dem tatsächlichen Lauf.**

## ✗ Fehler (3) — blockieren den Launch
- Zeile 5 (Retargeting_B): `utm_medium` fehlt — Traffic wird nicht zugeordnet
- Zeile 5 (Retargeting_B): Landingpage nutzt unsicheres `http://`
- Zeile 7 (Search_B): `utm_campaign` fehlt

## ⚠ Warnungen (3)
- Zeile 3 (Herbst_B): `utm_source=Meta` nicht kleingeschrieben
- Zeile 3 (Herbst_B): `utm_campaign=Herbst_2026` nicht kleingeschrieben
- Zeile 4 (Retargeting_A): kein `budget_cap` gesetzt

## ✓ In Ordnung (3)
- Herbst_A: vollständig getaggt
- Herbst_B: vollständig getaggt
- Search_A: vollständig getaggt

---
_Regel des Skills: ✗ = Launch-Blocker, ⚠ = Optimierung. Jeder Fund mit Fundstelle._
