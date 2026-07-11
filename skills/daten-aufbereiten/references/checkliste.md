# Daten-Aufbereitung — Checkliste

## Vor dem Anfassen
- [ ] Kopie anlegen (`*_clean`), Original nie überschreiben
- [ ] Zeilen-/Spaltenzahl notieren (Vorher/Nachher-Vergleich)

## Duplikate
- [ ] Regel festlegen: Was ist ein Duplikat? (volle Zeile vs. Schlüsselspalte)
- [ ] Anzahl entfernter Zeilen ins Log

## Formate vereinheitlichen (DE-Konvention)
- Datum → TT.MM.JJJJ
- Zahl → intern reine Zahl (Tausenderpunkt/Anzeige erst am Ende)
- Währung → "1.200 €" → 1200 (Symbol & Trenner raus, Wert numerisch)
- Text-Kategorien → einheitliche Schreibweise ("meta"/"Meta"/"META" → Meta)

## Lücken & Fehler
- [ ] Leere Pflichtfelder markieren (nicht raten, nicht füllen)
- [ ] Unmögliches (negative Kosten, Datum in der Zukunft) markieren
- [ ] Tippfehler in Kategorien nur nach Rückfrage angleichen

## Abschluss
- [ ] Änderungs-Log schreiben (was, wie viel, welche Regel)
- [ ] Typen prüfen (Zahl bleibt Zahl, Datum bleibt Datum)
