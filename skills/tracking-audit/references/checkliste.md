# Tracking-Audit — Prüf-Checkliste

Punkt für Punkt vor dem Launch. Alles auf ✓, sonst blockt (✗) oder optimieren (⚠).

## UTM-Konvention
- [ ] Alle bezahlten Links tragen utm_source, utm_medium, utm_campaign
- [ ] Schreibweise einheitlich (klein, keine Leerzeichen → Bindestrich)
- [ ] source = Plattform (meta, google, linkedin), medium = Kanaltyp (cpc, social, email)
- [ ] campaign-Name folgt Namensschema (z. B. 2026_q4_herbst)
- [ ] Kein utm auf internen Links (verfälscht die Attribution)

## GA4-Events
- [ ] Definierte Conversions vorhanden (z. B. purchase, lead, signup)
- [ ] Jedes Event feuert genau einmal (kein Doppel-Trigger)
- [ ] Event-Namen konsistent (snake_case, GA4-Empfehlung)
- [ ] Key Events / Conversions im Interface markiert

## Pixel (Meta / LinkedIn)
- [ ] Basis-Pixel auf allen Seiten
- [ ] Conversion-Events (Lead, Purchase) einmalig, korrekt zugeordnet
- [ ] Keine doppelten Pixel-IDs / Alt-Installationen

## Consent
- [ ] Consent-Mode aktiv: Tags feuern erst nach Einwilligung
- [ ] Ablehnen wird respektiert (kein stilles Tracking)
- [ ] Consent-Status wird an GA4 / Pixel weitergegeben

## Ampel
✓ vorhanden & korrekt · ⚠ vorhanden, aber optimierbar · ✗ fehlt / blockt Datenqualität
