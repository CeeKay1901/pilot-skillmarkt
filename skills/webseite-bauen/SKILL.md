---
name: webseite-bauen
description: Baut eine responsive Landingpage oder kleine Website im pilot-Design – ohne Programmierkenntnisse der Nutzer:in. Nutze diesen Skill für Kampagnen-Landingpages, interne Info-Seiten, Event-Anmeldeseiten oder Website-Prototypen.
allowed-tools: Read, Write, Bash
---

# Webseite bauen

Erstelle eine fertige, responsive Website aus der Beschreibung der Nutzer:in.
Ergebnis ist eine eigenständige HTML-Datei, die sofort im Browser läuft.

## Wann ich starte
"Baue eine Landingpage / Website / Anmeldeseite für …".

## Was ich brauche
Zweck der Seite, grobe Inhalte (Texte, Sektionen, CTA), gewünschter Look.
Fehlt etwas, kurz nachfragen — aber nicht überfragen.

## Vorgehen
1. **Struktur festlegen**: Hero (Claim + CTA), 2–4 Inhaltssektionen, ggf. Formular, Footer.
2. **Als EINE HTML-Datei bauen** — CSS und JS inline. Siehe `references/design.md`
   für Farben, Typo und Layout-Regeln (pilot-CI).
3. **Responsiv**: Desktop und Mobil; nichts läuft horizontal über; Bilder `max-width:100%`.
4. **Vorschau öffnen**, damit die Person es sofort sieht.
5. **Iterieren**: "Was soll anders sein?" → anpassen, bis es passt.

## Ausgabe
Eine `.html`-Datei (eigenständig, teilbar) + kurze Notiz, was drin ist.

## Regeln
- Alles inline in einer Datei → per Doppelklick teilbar.
- pilot-Design einhalten (`references/design.md`).
- Barrierefreiheit-Basics: Alt-Texte, ausreichende Kontraste, sinnvolle Überschriften.
- Kein Tracking/keine externen Skripte ohne ausdrückliche Zustimmung.
