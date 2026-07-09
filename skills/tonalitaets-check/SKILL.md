---
name: tonalitaets-check
description: Prüft einen Text gegen die Marken-Tonalität und Sprachregeln (Anrede, Claims, No-Go-Wörter) und schlägt markengerechte Umformulierungen vor. Nutze diesen Skill vor Text-Freigaben, für Social-Copy, Newsletter oder um Konsistenz über mehrere Autor:innen zu sichern.
allowed-tools: Read
---

# Tonalitäts-Check

Prüfe Texte gegen den Marken-Styleguide und mach sie markengerecht.

## Wann ich starte
"Passt das zu unserer Tonalität?", "check mal diesen Text", vor Freigabe.

## Was ich brauche
Den Text + die Marken-Regeln. Liegt ein Styleguide vor (z. B.
`references/styleguide.md` oder eine Kundendatei), diesen nutzen; sonst nach
den wichtigsten Regeln fragen (Anrede, Ton, No-Go-Wörter, Claim).

## Vorgehen
1. Regeln laden/erfragen.
2. Text Zeile für Zeile prüfen: Anrede (Du/Sie), Tonalität, Satzlänge,
   verbotene Begriffe, Claim-Konformität.
3. Abweichungen markieren (⚠) und je Fall eine konkrete Alternative vorschlagen.
4. Kurzes Gesamturteil: passt / kleinere Anpassungen / überarbeiten.

## Ausgabe
Liste der Findings mit Fundstelle + Vorschlag, dann 1-Satz-Fazit.
Auf Wunsch: die überarbeitete Fassung.

## Regeln
- Nur an den definierten Regeln messen — keine eigenen Stil-Vorlieben aufdrängen.
- Inhaltliche Kernaussage nie verändern, nur Ton/Form.
