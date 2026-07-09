# Persona Review — pilot Skill Marketplace
**Datum:** 2026-07-08 | **Depth:** full | **Personas:** 6

---

## Übersicht-Matrix

| Persona | Ersteindruck | Flow | Aufgabe | Vertrauen | Score | Top-Pain |
|---------|------------|------|---------|-----------|-------|---------|
| P1 Teamleiterin | ★★★★☆ | ★★★☆☆ | ★★☆☆☆ | ★★★☆☆ | 3.0 | Kein Rollen-/Abteilungsfilter |
| P2 Neuer Pilot | ★★★☆☆ | ★★☆☆☆ | ★☆☆☆☆ | ★★★☆☆ | 2.25 | "Was ist ein Skill?" — keine Erklärung |
| P3 Power User | ★★★★☆ | ★★★★☆ | ★★★★☆ | ★★★★☆ | 4.0 | Kein Changelog, kein Quellcode-Link |
| P4 Kreative | ★★★☆☆ | ★★★☆☆ | ★★★☆☆ | ★★★☆☆ | 3.0 | Tag-Filter zeigt irrelevante Tech-Tags |
| P5 Skeptiker | ★★★☆☆ | ★★★☆☆ | ★★★☆☆ | ★★☆☆☆ | 2.75 | Demo-Daten erkennbar, kein echter Output |
| P6 Mobile User | ★★★☆☆ | ★★★☆☆ | ★★★☆☆ | ★★★☆☆ | 3.0 | Kein Swipe-Down, Filter nimmt viel Platz |

---

## Findings nach Persona

### P1 — Erika Maier, Media-Planning Lead
*"Ich suche was das meinem 6-köpfigen Team konkret bringt."*

**FAIL:** Keine Abteilungs-/Rollen-Orientierung. Alle 20 Skills sind gleichwertig — kein "Für Media-Teams" Einstiegspunkt. Sie muss alle durchscrollen.

**FAIL:** Filter funktioniert nach Technik-Taxonomie (Kategorien: pilot/Anthropic/GSD), nicht nach Nutzen für Teams. "GSD" ist interner Begriff — sie versteht ihn nicht direkt.

**FAIL:** Keine Statistiken. Wie viele Piloten nutzen das? Wie oft? Das fehlt als Entscheidungshilfe für "Soll ich das meinem Team empfehlen?"

**WARN:** Featured Skills im Hero sind zu viele (6 Stück). Das Signal "Empfohlen" geht unter.

**WARN:** "pilot inhouse" vs "Anthropic" — für sie egal. Was zählt: Löst es ihr Problem?

**INFO:** Rating + Endorsement-System ist die stärkste Vertrauens-Komponente. Mehr Gewicht geben.

---

### P2 — Tobias Kern, Neuer Pilot (Tag 3 im Job)
*"Ich soll Claude Code nutzen. Was zur Hölle ist ein 'Skill'?"*

**FAIL:** Kein Onboarding. Das Wort "Skill" ist nirgends erklärt. Neulinge verlassen die Seite ohne Orientierung.

**FAIL:** Trigger `/webaudit` — was ist das? Wo tippe ich das ein? In welche App? Es gibt keine Getting-Started-Anleitung.

**FAIL:** CTA "Skill kopieren" ohne Kontext. Kopiert in was? Terminal? Chat? → Er öffnet WhatsApp und fragt einen Kollegen.

**FAIL:** Hero-Headline "Unsere Skills." ist nichtssagend für jemanden ohne Kontext. Was ist der Mehrwert in einer Zeile?

**WARN:** 20 Skills auf einmal sind überwältigend für einen Neuling. Keine "Für Einsteiger" Filterung.

**INFO:** Die Piloten-Cards unten sind hilfreiche Social Proof — er vertraut Namensnennungen von Kollegen.

---

### P3 — Jan Richter, Lead Developer
*"Ich will den Trigger, die Anforderungen, den Changelog — fertig."*

**OK:** Trigger-Badge im Modal mit Copy-Funktion ist perfekt. Sofort verwendbar.

**OK:** Version-Number, Requirements, Difficulty — alle da. Gut.

**WARN:** Kein Changelog oder "Was ist neu in v1.2.0?" Das ist für Tech-User relevant beim Update-Entscheid.

**WARN:** Kein Quellcode-Link. Für inhouse Skills (webaudit, ralph-loop) wäre ein GitHub-Link wertvoll.

**WARN:** "longDescription" in der Übersicht ist zu kurz für Deep-Diver. Konkrete Beispiel-Outputs fehlen.

**INFO:** Comment-System gut — er kann als Reviewer Findings direkt posten.

---

### P4 — Anna Schreiber, Content Strategin
*"Ich bin keine Technikerin. Ich will was das mir täglich hilft."*

**FAIL:** Tag-Filter zeigt "development", "git", "owasp", "pull-request" — komplett irrelevant für sie. Das erste was sie sieht unter "Filter": Tech-Kram. Sie fühlt sich nicht angesprochen.

**FAIL:** Kategorie "Anthropic" klingt nach Technologie-Firma. Sie weiß nicht was das bedeutet.

**WARN:** GSD-Sektion gut — aber "GSD" als Begriff ist nicht selbsterklärend. "Produktivität & Workflows" wäre besser.

**OK:** Briefing Generator, Meeting Notes, Report Summarizer — perfekte Tools für sie. Aber die findet sie erst nach Scrollen.

**INFO:** Endorsements von Kolleginnen (Sophie, Anna) sind sehr überzeugend. Mehr Gewicht in der Card-Ansicht.

---

### P5 — Thomas Wolf, Skeptiker (Senior Strategist, "KI ist Hype")
*"Ich schaue kurz. Sobald was faul riecht, bin ich weg."*

**FAIL:** Alle Bewertungen sind rund und verdächtig hoch (3.5–4.8). Kein einziger Skill unter 3.5. Das wirkt wie Demo-Daten. Ein echter Skeptiker bemerkt das sofort.

**FAIL:** Keine Screenshots von echten Skill-Outputs. "Sehr detaillierter Output" — zeig's mir!

**FAIL:** Endorsements wie "Gold wert für Client-Präsentationen" ohne konkretes Beispiel. Werbetexte statt echte Erfahrungen.

**WARN:** "pilot Dev Team" als Autor ohne klaren Ansprechpartner. Wer ist verantwortlich wenn was nicht funktioniert?

**OK:** Security-Review als Skill mit OWASP-Referenz — das klingt seriös. Schafft Vertrauen.

---

### P6 — Christopher Kipp, Mobile User (Samsung S911B, Chrome)
*"Ich nutze das auch unterwegs. Dauert's lang? Scrolle ich viel?"*

**FAIL:** Kein Swipe-Down-Geste zum Schließen des Modals. Standard-Erwartung auf Mobile.

**WARN:** Filter-Leiste ist sticky — gut — aber nimmt 30%+ des Viewports. Bei 6.8rem Header + Filter-Bar bleibt wenig für Cards.

**WARN:** Hero-Sektion nimmt massiv Platz (8rem padding oben/unten). Beim ersten Scrollen sieht man keine Skills.

**WARN:** Tag-Chips in Filter-Leiste wrappen auf 2–3 Zeilen auf Mobile → Filter-Leiste wird riesig.

**OK:** Modal als Bottom Sheet auf Mobile (border-radius oben) — sehr gut, sieht nativ aus.

**OK:** 1-Spalten-Grid auf Mobile — cards sind groß und tappable.

---

## Konsolidierte Findings (Persona-übergreifend)

### Alle Personas betreffen:
1. **Kein Kontext für Neulinge** — Was ist ein Skill, wie nutzt man ihn? P1, P2, P4 alle betroffen
2. **Tag-Filter unstrukturiert** — 30+ Tags ohne Gruppierung. P1, P4 verloren
3. **Keine Rollen-Orientierung** — Jeder durchsucht alles; kein "Für mich: [Rolle wählen]"
4. **Featured-Verwässerung** — 6 Featured-Skills im Hero, kein echter Spotlight
5. **Bewertungen wirken Demo-haft** — Zu gleichmäßig, zu hoch, zu poliert

### Widersprüche zwischen Personas:
| Konflikt | P3 Power User | P2 Newbie | Empfehlung |
|----------|--------------|---------|-----------|
| Informationsdichte | Mehr Tiefe, Changelog | Einfache Erklärung | Progressive Disclosure: "Einfach / Details" Toggle |
| Tag-Filter Sichtbarkeit | Alle Tags | Weniger Tags | Gruppiering: Rolle-Tags oben, Tech-Tags aufklappbar |
| Trigger-CTA | Direkt kopieren | Was ist das? | Tooltip "Diesen Befehl in Claude Code eingeben" |

---

## Priorisierter Verbesserungsplan

### 🔴 Sofort — High Impact, Low Effort

1. **Getting-Started Banner** — Kleine Callout-Box unter Hero: "Neu hier? So nutzt du Skills in 3 Schritten." mit aufklappbarem How-To
2. **Rollen-Quick-Filter** — Chips über dem Grid: [👩‍💻 Entwicklung] [✍️ Content & Kreation] [📊 Analytics] [📋 Projektmanagement] — filtert nach Subcategory
3. **Featured auf 3 reduzieren** — Nur die Top-3 Featured-Skills im Hero, echter Spotlight-Effekt
4. **Tag-Filter bereinigen** — Top-8 Most-used Tags zeigen, Rest hinter "Mehr Filter →"
5. **Trigger-Badge Tooltip** — Beim Hover/Click: "Im Claude Code Terminal eingeben: /webaudit"
6. **Mobile Filter-Kollaps** — Filter-Leiste auf Mobile standardmäßig kollabiert, mit Toggle-Button

### 🟡 Kurzfristig — High Impact, Medium Effort

7. **"Was ist ein Skill?" Floating Info** — Icon ⓘ neben "Skill Marketplace" im Header, öffnet kurzes Overlay
8. **Skill-Card: Mehr Persönlichkeit** — Skill-Kategorie-Icon (z.B. 🔍 für qa, 🤖 für ai) für schnelle visuelle Orientierung
9. **Output-Beispiel im Modal** — Textbox "So sieht der Output aus:" mit echtem Beispiel-Snippet
10. **Swipe-Down Mobile Modal** — Touch-Event für modal-close via Swipe nach unten
11. **Subcategory als Primär-Tab** — Tabs: [Alle] [Entwicklung] [Inhalt] [Analyse] [Automatisierung] statt Anthropic/GSD-Taxonomie

### 🟢 Mittelfristig — Medium Impact, Any Effort

12. **"Heute neu" Ticker** — Top-Bar zeigt neuste Skills
13. **Skill-Install-Guide** — Dedizierte Seite/Modal "Wie installiere ich einen Skill?"
14. **Echte Bewertungs-Varianz** — Einige Skills mit 3.0–3.3 um Authentizität zu erhöhen
15. **Piloten-Sektion interaktiver** — Klick auf Piloten-Card → filtert nach dessen endorsed Skills

---

## Iterations-Ziele für Ralph Loop

**Iteration 1 — Orientierung & Onboarding**
- Getting-Started Callout
- Rollen-Filter Chips
- Tag-Filter reduzieren auf Top-8
- Featured auf 3 reduzieren
- "Was ist ein Skill?" Info-Button

**Iteration 2 — Visual Polish & Mobile**
- Skill-Icons / Emojis pro Subcategory
- Mobile Filter-Kollaps
- Swipe-Down Modal
- Hero-Padding reduzieren
- Trigger-Badge Tooltip verbessern

**Iteration 3 — Vertrauen & Tiefe**
- Output-Beispiel-Snippet im Modal
- Realistischere Bewertungsverteilung
- Piloten-Cards klickbar → Filter-Action
- Subcategory-Tabs als Primärnavigation
- Install-Anleitung im Modal

---

*Review erstellt: 2026-07-08 · 6 Personas · 15 Findings · 3 Iterations geplant*
