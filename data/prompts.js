// pilot AI Marketplace — Prompt-Sammlung (ausgelagerte Daten, Etappe E3).
// Klassisches Script, definiert globale Konstanten:
//   PROMPTS           — alle Einträge (5 Leuchttürme mit builder/variants/preview + 18 Breite-Einträge)
//   PROMPT_PLATFORMS  — Plattform-Liste (eigene Kopie; skills.js wird auf prompts.html nicht geladen)
//   PROMPT_SPOTLIGHT  — Set der 5 Leuchtturm-IDs
//   PROMPT_START      — „Fang hier an“-Kandidat der Redaktion
// Platzhalter-Konvention: [GROSSBUCHSTABEN] in eckigen Klammern — werden im UI gelb
// markiert und beim Kopieren UNVERÄNDERT mitkopiert. rating/copyCount sind Demo-Seeds
// (zentral im Footer gekennzeichnet), Kommentare sind seeded Stimmen der PILOTS-Personas.

const PROMPT_PLATFORMS = [
  { id: 'code',     label: 'Claude Code', short: 'Code' },
  { id: 'langdock', label: 'Langdock',    short: 'Langdock' }
];

const PROMPT_SPOTLIGHT = new Set([
  'briefing-zusammenfassung',
  'excel-formel-erklaerer',
  'vibecoding-kickoff',
  'feedback-formulierer',
  'claim-werkstatt'
]);

const PROMPT_START = 'meeting-todos';

const PROMPTS = [

  /* ==================== LEUCHTTÜRME (5) ==================== */

  {
    id: 'briefing-zusammenfassung',
    name: 'Briefing-Zusammenfassung',
    tagline: 'Langes Kunden-Briefing rein, arbeitsfähige Zusammenfassung mit priorisierten Rückfragen raus — ohne dass die KI Lücken mit Erfindungen füllt.',
    taskGroup: 'texten',
    platforms: { langdock: true },
    difficulty: 'easy',
    tags: ['briefing', 'kunde', 'zusammenfassung', 'rückfragen', 'kickoff'],
    promptText: `Du bist erfahrene:r Berater:in in einer Mediaagentur und bereitest Kunden-Briefings
für dein Team auf. Du liest genau, unterscheidest Fakten von Vermutungen und
benennst offene Punkte, statt sie zu überspielen.

Fasse das folgende Briefing von [KUNDE] so zusammen, dass das Team in drei Minuten
arbeitsfähig ist. Die Zusammenfassung richtet sich an: [EMPFÄNGER].

Halte dich exakt an dieses Format:

**In einem Satz:** Worum geht es? (max. 25 Wörter)
**Ziele:** Als Liste, messbare Ziele zuerst. Markiere unscharfe Ziele mit „(unscharf)“.
**Zielgruppe & Markt:** Stichpunkte.
**Budget & Timing:** Nur, was wirklich im Text steht. Fehlt etwas, schreibe „nicht genannt“.
**Muss / Kann:** Harte Vorgaben und Wünsche, klar getrennt.
**Offene Fragen an den Kunden:** 3–7 präzise Fragen, priorisiert — die wichtigste
zuerst. Formuliere sie so, dass wir sie direkt in eine E-Mail übernehmen können.

Wichtig: Erfinde nichts. Wenn Angaben fehlen oder sich widersprechen, benenne das
ausdrücklich. Übernimm alle Zahlen wörtlich aus dem Briefing.

Hier das Briefing:
[BRIEFING-TEXT]`,
    variants: [
      {
        id: 'kurz', label: 'Kurz',
        promptText: `Fasse das folgende Kunden-Briefing von [KUNDE] zusammen:
1. Kernaufgabe in einem Satz.
2. Ziele als Liste (messbare zuerst).
3. Budget & Timing — fehlende Angaben als „nicht genannt“ kennzeichnen.
4. Die fünf wichtigsten offenen Fragen an den Kunden, priorisiert.
Erfinde nichts, übernimm Zahlen wörtlich.

[BRIEFING-TEXT]`
      },
      {
        id: 'ausfuehrlich', label: 'Ausführlich',
        promptText: `Du bist erfahrene:r Berater:in in einer Mediaagentur und bereitest Kunden-Briefings
für dein Team auf. Du liest genau, unterscheidest Fakten von Vermutungen und
benennst offene Punkte, statt sie zu überspielen.

Analysiere das folgende Briefing von [KUNDE] in zwei Durchgängen.

Durchgang 1 — Zusammenfassung für [EMPFÄNGER]:
**In einem Satz:** Worum geht es? (max. 25 Wörter)
**Ziele:** Liste, messbare zuerst, unscharfe mit „(unscharf)“ markiert.
**Zielgruppe & Markt:** Stichpunkte.
**Budget & Timing:** Nur, was im Text steht; Fehlendes als „nicht genannt“.
**Muss / Kann:** Harte Vorgaben und Wünsche, getrennt.
**Originalzitate:** Die 2–3 Sätze aus dem Briefing, die die Erwartung des Kunden
am deutlichsten zeigen — wörtlich, in Anführungszeichen.

Durchgang 2 — kritischer Blick:
**Widersprüche & Risiken:** Wo passt etwas nicht zusammen (z. B. Ziel vs. Budget,
Timing vs. Umfang)? Benenne jedes Risiko in einem Satz.
**Offene Fragen an den Kunden:** 3–7 Fragen, priorisiert.
**Entwurf Rückfragen-E-Mail:** Kurze, freundliche E-Mail an den Kunden mit den
Top-3-Fragen — versandfertig, ohne Floskeln.

Wichtig: Erfinde nichts. Übernimm Zahlen wörtlich. Kennzeichne jede eigene
Einschätzung ausdrücklich als Einschätzung.

Hier das Briefing:
[BRIEFING-TEXT]`
      }
    ],
    builder: {
      fields: [
        { key: 'kunde', ph: '[KUNDE]', label: 'Kunde / Marke', type: 'text', placeholder: 'z. B. „Grünwerk Gartenmärkte“' },
        { key: 'empfaenger', ph: '[EMPFÄNGER]', label: 'Für wen ist die Zusammenfassung?', type: 'select', options: ['das gemischte Projektteam', 'die Media-Planung', 'die Kreation', 'die Geschäftsleitung (nur Kernpunkte)'] },
        { key: 'briefingText', ph: '[BRIEFING-TEXT]', label: 'Briefing einfügen', type: 'textarea', placeholder: 'Kompletten Briefing-Text hier einfügen — E-Mail, Word-Inhalt oder Gesprächsnotizen …' }
      ]
    },
    warum: 'Der Prompt kombiniert Rollen-Priming („liest genau, überspielt nichts“) mit einem harten Format-Anker: Die feste Gliederung zwingt das Modell, jede Rubrik zu füllen — und die Regel „Fehlendes als ‚nicht genannt‘ markieren“ verwandelt das größte Risiko (erfundene Details) in den größten Nutzen: Genau aus diesen Lücken entstehen die priorisierten Rückfragen. „Zahlen wörtlich übernehmen“ verhindert stilles Runden oder Umrechnen.',
    exampleOutput: `**In einem Satz:** Frühjahrskampagne für Grünwerk Gartenmärkte mit Fokus auf jüngere
Zielgruppen und Sichtbarkeit der neuen Eigenmarke „Grünwerk Bio“.

**Ziele:**
- Sichtbarkeit der Eigenmarke „Grünwerk Bio“ erhöhen (unscharf — kein Messwert genannt)
- Jüngere Zielgruppe erreichen, ohne Stammkundschaft zu verlieren (unscharf)

**Zielgruppe & Markt:**
- Bestehende Stammkundschaft plus „deutlich jüngere“ Käufer:innen — Altersgruppe
  nicht definiert
- Gartenmarkt-Frühjahrsgeschäft

**Budget & Timing:**
- Budget: „im Rahmen des Vorjahres, eher etwas drunter“ — konkrete Summe nicht genannt
- Start: idealerweise KW 12, spätestens vor Ostern

**Muss / Kann:**
- Muss: Eigenmarke „Grünwerk Bio“ sichtbar machen (Vorstands-Priorität); Start vor Ostern
- Kann: Radio als Kanal („hat letztes Jahr gut funktioniert“)

**Offene Fragen an den Kunden:**
1. Welches Budget steht konkret zur Verfügung? „Im Rahmen des Vorjahres, eher drunter“
   lässt eine Spanne offen, die die Kanalplanung wesentlich verändert.
2. Wie ist „deutlich jünger“ definiert — welche Altersgruppe soll erreicht werden?
3. Gibt es für „Grünwerk Bio“ ein Absatz- oder Bekanntheitsziel, an dem wir den
   Erfolg messen sollen?`,
    preview: {
      mode: 'chat',
      chat: [
        { role: 'user', text: `Du bist erfahrene:r Berater:in in einer Mediaagentur und bereitest Kunden-Briefings für dein Team auf. […]

Fasse das folgende Briefing von **Grünwerk Gartenmärkte** so zusammen, dass das Team in drei Minuten arbeitsfähig ist. Die Zusammenfassung richtet sich an: **das gemischte Projektteam**. […]

Hier das Briefing:
**„Hallo zusammen, anbei wie besprochen unsere Gedanken zur Frühjahrskampagne. Wir wollen dieses Jahr deutlich jünger werden, ohne die Stammkundschaft zu verlieren. Schwerpunkt Online, aber Radio hat letztes Jahr gut funktioniert. Budget bewegt sich im Rahmen des Vorjahres, eher etwas drunter. Start idealerweise KW 12, spätestens aber vor Ostern. Wichtig ist dem Vorstand vor allem, dass wir die neue Eigenmarke ‚Grünwerk Bio‘ sichtbar machen …“** *(insgesamt 2 Seiten)*` },
        { role: 'ai', text: `**In einem Satz:** Frühjahrskampagne für Grünwerk Gartenmärkte mit Fokus auf jüngere Zielgruppen und Sichtbarkeit der neuen Eigenmarke „Grünwerk Bio“.

**Ziele:**
- Sichtbarkeit der Eigenmarke „Grünwerk Bio“ erhöhen (unscharf — kein Messwert genannt)
- Jüngere Zielgruppe erreichen, ohne Stammkundschaft zu verlieren (unscharf)

**Zielgruppe & Markt:**
- Bestehende Stammkundschaft plus „deutlich jüngere“ Käufer:innen — Altersgruppe nicht definiert
- Gartenmarkt-Frühjahrsgeschäft

**Budget & Timing:**
- Budget: „im Rahmen des Vorjahres, eher etwas drunter“ — konkrete Summe nicht genannt
- Start: idealerweise KW 12, spätestens vor Ostern

**Muss / Kann:**
- Muss: Eigenmarke „Grünwerk Bio“ sichtbar machen (Vorstands-Priorität); Start vor Ostern
- Kann: Radio als Kanal („hat letztes Jahr gut funktioniert“)

…

**Offene Fragen an den Kunden:**
1. Welches Budget steht konkret zur Verfügung? „Im Rahmen des Vorjahres, eher drunter“ lässt eine Spanne offen, die die Kanalplanung wesentlich verändert.
2. Wie ist „deutlich jünger“ definiert — welche Altersgruppe soll erreicht werden?
3. Gibt es für „Grünwerk Bio“ ein Absatz- oder Bekanntheitsziel, an dem wir den Erfolg messen sollen?
…` }
      ]
    },
    copyCount: 41,
    rating: { average: 4.5, count: 18 },
    comments: [
      { author: 'Sophie Klein', role: 'Projektmanagerin', initials: 'SK', date: '2026-07-03', rating: 4.6, text: 'Läuft bei mir vor jedem Kickoff. Die Rückfragen-Liste geht fast unverändert in die Mail an den Kunden — das allein spart mir eine halbe Stunde.' },
      { author: 'Anna Schreiber', role: 'Content Strategin', initials: 'AS', date: '2026-06-24', rating: 4.4, text: 'Das „(unscharf)“-Markieren ist Gold wert. Vorher habe ich vage Ziele erst in der Konzeption bemerkt, jetzt sehe ich sie in Minute drei.' },
      { author: 'Christopher Kipp', role: 'Innovation Lead', initials: 'CK', date: '2026-06-18', rating: 4.3, text: 'Guter Einstiegs-Prompt, um zu zeigen, was Format-Vorgaben bewirken. Bei sehr kurzen Briefings nehme ich die Kurz-Variante, sonst wirkt das Gerüst überdimensioniert.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'briefing-gen',
    skillRefName: 'Briefing Generator',
    skillRefNote: 'Wer aus der Zusammenfassung im nächsten Schritt ein strukturiertes Kreativ-Briefing machen will, findet dort den Werkzeug-Weg.'
  },

  {
    id: 'claim-werkstatt',
    name: 'Kampagnen-Claim-Werkstatt',
    tagline: 'Zehn Claim-Varianten mit Tonalitäts-Steuerung — plus Bewertungsraster, damit du nicht zehnmal Mittelmaß bekommst, sondern zwei Favoriten mit Begründung.',
    taskGroup: 'texten',
    platforms: { langdock: true },
    difficulty: 'medium',
    tags: ['claim', 'kampagne', 'tonalität', 'kreation', 'varianten'],
    promptText: `Du bist Senior-Texter:in mit fünfzehn Jahren Erfahrung in Markenkampagnen. Du
entwickelst Claims, die man sich merkt — kurz, konkret, ohne Werbefloskeln.

Aufgabe: Entwickle 10 Claim-Varianten für [MARKE] ([PRODUKT]).
Zielgruppe: [ZIELGRUPPE]
Tonalität: [TONALITÄT]
Kernbotschaft, die ankommen muss: [KERNBOTSCHAFT]

Regeln:
- Maximal 6 Wörter pro Claim.
- Keine abgenutzten Werbewörter („einfach“, „innovativ“, „Erlebnis“, „Genuss pur“,
  „neu gedacht“).
- Mindestens 3 Varianten mit Wortspiel oder überraschendem Bild, mindestens 3
  ganz geradeaus und wörtlich.
- Deutsch. Wenn Englisch für diese Zielgruppe stärker wäre: maximal 2 englische
  Varianten, jeweils mit einem Satz Begründung.

Format: Erst die nummerierte Liste. Danach eine Bewertungstabelle mit den Spalten
Claim | Merkfähigkeit (1–5) | Passung zur Tonalität (1–5) | Risiko/Missverständnis.
Sprich zum Schluss eine Empfehlung für die Top 2 aus und begründe jede in einem Satz.`,
    variants: [
      {
        id: 'kurz', label: 'Kurz',
        promptText: `Entwickle 5 Claim-Varianten für [MARKE] ([PRODUKT]). Zielgruppe: [ZIELGRUPPE].
Tonalität: [TONALITÄT]. Kernbotschaft: [KERNBOTSCHAFT].
Maximal 6 Wörter pro Claim, keine Werbefloskeln, mindestens einer ganz wörtlich
und einer mit überraschendem Bild. Nenne am Ende deinen Favoriten mit einem Satz
Begründung.`
      },
      {
        id: 'ausfuehrlich', label: 'Ausführlich',
        promptText: `Du bist Senior-Texter:in mit fünfzehn Jahren Erfahrung in Markenkampagnen. Du
entwickelst Claims, die man sich merkt — kurz, konkret, ohne Werbefloskeln.

Briefing:
Marke/Produkt: [MARKE] ([PRODUKT])
Zielgruppe: [ZIELGRUPPE]
Gewünschte Tonalität: [TONALITÄT]
Kernbotschaft: [KERNBOTSCHAFT]

Arbeite in drei Schritten:

Schritt 1 — Tonwörter: Sammle 8–10 Wörter und Bilder, die zur Tonalität und zur
Zielgruppe passen (und 3, die tabu sind). Kurz kommentieren.

Schritt 2 — Claims: Entwickle je 4 Claims in drei Richtungen:
a) wörtlich und selbstbewusst, b) Wortspiel oder überraschendes Bild,
c) aus Sicht der Zielgruppe formuliert (ihre Sprache, ihr Alltag).
Maximal 6 Wörter pro Claim, keine abgenutzten Werbewörter („einfach“, „innovativ“,
„Erlebnis“, „Genuss pur“, „neu gedacht“).

Schritt 3 — Auswahl: Bewerte alle 12 in einer Tabelle mit den Spalten
Claim | Merkfähigkeit (1–5) | Passung zur Tonalität (1–5) | Risiko/Missverständnis.
Wähle die Top 2 und liefere zu jedem: eine passende Headline-Verlängerung
(max. 12 Wörter) und einen Satz, wo der Claim NICHT funktionieren würde.`
      }
    ],
    builder: {
      fields: [
        { key: 'marke', ph: '[MARKE]', label: 'Marke', type: 'text', placeholder: 'z. B. „VELOMO“' },
        { key: 'produkt', ph: '[PRODUKT]', label: 'Produkt / Angebot', type: 'text', placeholder: 'z. B. „E-Bike-Abo für Pendler:innen“' },
        { key: 'zielgruppe', ph: '[ZIELGRUPPE]', label: 'Zielgruppe', type: 'text', placeholder: 'z. B. „urbane Pendler:innen, 28–45, genervt vom Stau“' },
        { key: 'tonalitaet', ph: '[TONALITÄT]', label: 'Tonalität', type: 'select', options: ['selbstbewusst und direkt', 'warm und nahbar', 'frech mit Augenzwinkern', 'seriös-premium', 'nüchtern und klar'] },
        { key: 'kernbotschaft', ph: '[KERNBOTSCHAFT]', label: 'Kernbotschaft', type: 'text', placeholder: 'z. B. „Radfahren ohne Anschaffungskosten — jederzeit kündbar“' }
      ]
    },
    warum: 'Die harten Beschränkungen (maximal sechs Wörter, verbotene Floskel-Liste) nehmen dem Modell den bequemsten Ausweg — generisches Werbedeutsch — und die erzwungene Vielfalt („mindestens 3 mit Bild, mindestens 3 wörtlich“) verhindert zehn Variationen derselben Idee. Das Bewertungsraster am Ende ist ein zweiter Denkschritt: Das Modell muss seine eigenen Vorschläge kritisch prüfen (erst erzeugen, dann bewerten), was die Top-2-Empfehlung deutlich verlässlicher macht als ein Einzelschuss.',
    exampleOutput: `1. Dein Stau fährt ohne dich.
2. Abo statt Anschaffung. Fahrtwind inklusive.
3. Steig um. Kündige, wann du willst.
4. VELOMO. Vorbeifahren statt Stillstehen.
5. Kein Kaufpreis. Kein Stau. Kein Aber.
   … (Claims 6–10 hier gekürzt)

| Claim | Merkfähigkeit | Tonalität | Risiko/Missverständnis |
| (Auszug — bewertet werden alle 10) |
| Dein Stau fährt ohne dich. | 5 | 5 | gering — Bild sofort verständlich |
| Kein Kaufpreis. Kein Stau. Kein Aber. | 4 | 5 | „Kein Kaufpreis“ könnte als „gratis“ gelesen werden |
| Steig um. Kündige, wann du willst. | 3 | 4 | zwei Botschaften konkurrieren |

Empfehlung Top 2:
„Dein Stau fährt ohne dich.“ — dreht das tägliche Ärgernis der Zielgruppe in
ein selbstbewusstes Bild, ohne das Produkt erklären zu müssen.
„Kein Kaufpreis. Kein Stau. Kein Aber.“ — transportiert die Kernbotschaft am
direktesten; das Preis-Missverständnis lässt sich über die Subline auffangen.`,
    preview: {
      mode: 'chat',
      chat: [
        { role: 'user', text: `Du bist Senior-Texter:in mit fünfzehn Jahren Erfahrung in Markenkampagnen. […]

Aufgabe: Entwickle 10 Claim-Varianten für **VELOMO** (**E-Bike-Abo für Pendler:innen**).
Zielgruppe: **urbane Pendler:innen, 28–45, genervt vom Stau**
Tonalität: **selbstbewusst und direkt**
Kernbotschaft: **Radfahren ohne Anschaffungskosten — jederzeit kündbar**

Regeln: Maximal 6 Wörter pro Claim. Keine abgenutzten Werbewörter […]` },
        { role: 'ai', text: `1. Dein Stau fährt ohne dich.
2. Abo statt Anschaffung. Fahrtwind inklusive.
3. Steig um. Kündige, wann du willst.
4. VELOMO. Vorbeifahren statt Stillstehen.
5. Kein Kaufpreis. Kein Stau. Kein Aber.

…

| Claim | Merkfähigkeit | Tonalität | Risiko/Missverständnis |
| Dein Stau fährt ohne dich. | 5 | 5 | gering — Bild sofort verständlich |
| Kein Kaufpreis. Kein Stau. Kein Aber. | 4 | 5 | „Kein Kaufpreis“ könnte als „gratis“ gelesen werden |
| Steig um. Kündige, wann du willst. | 3 | 4 | zwei Botschaften konkurrieren |

…

**Empfehlung Top 2:**
**„Dein Stau fährt ohne dich.“** — dreht das tägliche Ärgernis der Zielgruppe in ein selbstbewusstes Bild, ohne das Produkt erklären zu müssen.
**„Kein Kaufpreis. Kein Stau. Kein Aber.“** — transportiert die Kernbotschaft am direktesten; das Preis-Missverständnis lässt sich über die Subline auffangen.` }
      ]
    },
    copyCount: 14,
    rating: { average: 4.2, count: 11 },
    comments: [
      { author: 'Anna Schreiber', role: 'Content Strategin', initials: 'AS', date: '2026-07-08', rating: 4.5, text: 'Die Floskel-Verbotsliste macht den Unterschied. Ohne sie kommt „Einfach besser ankommen“, mit ihr kommen Sachen, die ich ins Review mitnehme.' },
      { author: 'Mia Hoffmann', role: 'Senior UX Designerin', initials: 'MH', date: '2026-06-29', rating: 4.2, text: 'Nutze ich zweckentfremdet für Microcopy — Button-Texte und Empty States. Die Bewertungstabelle hilft mir, dem Team Entscheidungen zu begründen.' },
      { author: 'Christopher Kipp', role: 'Innovation Lead', initials: 'CK', date: '2026-06-21', rating: 4.0, text: 'Gutes Lehrstück für „erst erzeugen, dann bewerten“. Die Claims selbst sind Rohmaterial, kein Endprodukt — genau so sollte man es auch verkaufen.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'tonalitaets-check',
    skillRefName: 'Tonalitäts-Check',
    skillRefNote: 'Prüft fertige Texte gegen die Marken-Tonalität — die natürliche zweite Station nach der Claim-Werkstatt.'
  },

  {
    id: 'excel-formel-erklaerer',
    name: 'Excel-Formel-Erklärer',
    tagline: 'Kryptische Formel aus dem geerbten Mediaplan? Rein damit — raus kommt Klartext, ein durchgerechnetes Beispiel und eine robustere Alternative.',
    taskGroup: 'praesentieren',
    platforms: { langdock: true },
    difficulty: 'easy',
    tags: ['excel', 'formel', 'erklären', 'sverweis', 'tabellen'],
    promptText: `Du bist Excel-Expert:in und erklärst Formeln für Kolleg:innen ohne Excel-Tiefenwissen —
geduldig, präzise, und ohne Fachbegriffe unerklärt stehen zu lassen.

Erkläre die folgende Formel. Kontext der Datei: [KONTEXT]

[FORMEL]

Gehe so vor:
1. **In einem Satz:** Was macht die Formel, in Alltagssprache?
2. **Schritt für Schritt:** Zerlege sie von innen nach außen. Erkläre jede Funktion
   beim ersten Auftreten in maximal einem Satz.
3. **Mini-Beispiel:** Rechne die Formel mit erfundenen, einfachen Zahlen einmal
   komplett durch.
4. **Stolperfallen:** Wo liefert diese Formel falsche oder irreführende Ergebnisse
   (leere Zellen, Text statt Zahl, #NV, verschobene Bereiche)?
5. **Besser machen:** Gibt es eine modernere oder robustere Alternative? Zeige die
   verbesserte Formel und erkläre in zwei Sätzen, warum sie besser ist. Wenn die
   Formel schon gut ist, sag das ehrlich und lass sie in Ruhe.

Wichtig: Ich arbeite mit [EXCEL-VERSION]. Schlage nur Funktionen vor, die es dort gibt.`,
    variants: [
      {
        id: 'kurz', label: 'Kurz',
        promptText: `Erkläre diese Excel-Formel ([EXCEL-VERSION]) in Alltagssprache: erst in einem Satz,
dann Schritt für Schritt von innen nach außen. Nenne zum Schluss die eine wichtigste
Stolperfalle.

[FORMEL]`
      },
      {
        id: 'ausfuehrlich', label: 'Ausführlich',
        promptText: `Du bist Excel-Expert:in und erklärst Formeln für Kolleg:innen ohne Excel-Tiefenwissen —
geduldig, präzise, und ohne Fachbegriffe unerklärt stehen zu lassen.

Ich habe diese Formel geerbt und muss die Datei künftig selbst pflegen.
Kontext der Datei: [KONTEXT]
Meine Excel-Version: [EXCEL-VERSION] — schlage nur Funktionen vor, die es dort gibt.

[FORMEL]

Arbeite die folgenden Punkte ab:
1. **In einem Satz:** Was macht die Formel, in Alltagssprache?
2. **Schritt für Schritt:** Zerlege sie von innen nach außen; jede Funktion beim
   ersten Auftreten in maximal einem Satz erklären.
3. **Testtabelle:** Erstelle eine kleine Tabelle mit 4–5 erfundenen Testfällen
   (normale Werte, leere Zelle, Text statt Zahl, nicht gefundener Wert) und dem
   jeweiligen Ergebnis der Formel.
4. **Stolperfallen:** Alle Fälle aus der Testtabelle, in denen das Ergebnis falsch
   oder irreführend ist — mit Begründung.
5. **Neubau:** Baue die Formel so, wie du sie heute schreiben würdest (robuster,
   lesbarer, ggf. modernere Funktionen). Erkläre jede Abweichung vom Original.
6. **Doku-Kommentar:** Formuliere einen Kommentar von 1–2 Sätzen, den ich als
   Zellnotiz hinterlegen kann, damit die nächste Person die Formel versteht.`
      }
    ],
    builder: {
      fields: [
        { key: 'formel', ph: '[FORMEL]', label: 'Die Formel', type: 'textarea', placeholder: 'z. B. =WENN(ISTFEHLER(SVERWEIS(A2;Plan!$A$2:$F$500;6;FALSCH));"prüfen";SVERWEIS(A2;Plan!$A$2:$F$500;6;FALSCH))' },
        { key: 'kontext', ph: '[KONTEXT]', label: 'Worum geht es in der Datei?', type: 'text', placeholder: 'z. B. „Mediaplan, Spalte gleicht gebuchtes Budget mit Rechnungen ab“' },
        { key: 'excelVersion', ph: '[EXCEL-VERSION]', label: 'Deine Excel-Version', type: 'select', options: ['Microsoft 365', 'Excel 2019', 'Excel 2016 oder älter', 'Google Sheets'] }
      ]
    },
    warum: '„Von innen nach außen zerlegen“ erzwingt echte Denkschritte statt einer bloßen Umschreibung der Formel — das Modell muss jede Verschachtelung einzeln auflösen. Das durchgerechnete Mini-Beispiel ist eine eingebaute Selbstkontrolle: Rechenfehler oder Fehlinterpretationen fallen an konkreten Zahlen sofort auf. Und die Versions-Angabe verhindert den Klassiker, dass dir Funktionen empfohlen werden, die es in deinem Excel gar nicht gibt (XVERWEIS existiert erst ab Microsoft 365 bzw. Excel 2021).',
    exampleOutput: `In einem Satz: Die Formel sucht den Wert aus Zelle A2 in der Tabelle „Plan“
und holt den zugehörigen Eintrag aus Spalte 6 — wird nichts gefunden, steht
statt einer Fehlermeldung das Wort „prüfen“ in der Zelle.

Schritt für Schritt (von innen nach außen):
- SVERWEIS(A2;Plan!$A$2:$F$500;6;FALSCH) — sucht A2 in der ersten Spalte des
  Bereichs und gibt den Wert aus der 6. Spalte zurück; FALSCH heißt: nur
  exakte Treffer.
- ISTFEHLER(…) — prüft, ob diese Suche einen Fehler (meist #NV) ergibt.
- WENN(…;"prüfen";…) — bei Fehler: „prüfen“, sonst: das Suchergebnis.

Mini-Beispiel: Steht in A2 „Radio-Q2“ und in Plan-Zeile 17 „Radio-Q2 | … |
48.000“, liefert die Formel 48.000. Steht in A2 „Radio Q2“ (mit Leerzeichen),
findet SVERWEIS nichts → Ergebnis „prüfen“.

Stolperfallen:
- ISTFEHLER fängt alle Fehler ab — auch echte Probleme wie #BEZUG! sehen dann
  aus wie ein harmloses „nicht gefunden“.
- Der Bereich endet fest bei Zeile 500; Zeile 501 wird stillschweigend ignoriert.

Besser machen (Microsoft 365):
=XVERWEIS(A2;Plan!$A$2:$A$500;Plan!$F$2:$F$500;"prüfen")
XVERWEIS hat den „nicht gefunden“-Fall eingebaut — die Formel sucht nur noch
einmal statt zweimal und bricht nicht, wenn Spalten eingefügt werden.`,
    preview: {
      mode: 'chat',
      chat: [
        { role: 'user', text: `Du bist Excel-Expert:in und erklärst Formeln für Kolleg:innen ohne Excel-Tiefenwissen […]

Erkläre die folgende Formel. Kontext der Datei: **Mediaplan, Spalte gleicht gebuchtes Budget mit Rechnungen ab**

**\`=WENN(ISTFEHLER(SVERWEIS(A2;Plan!$A$2:$F$500;6;FALSCH));"prüfen";SVERWEIS(A2;Plan!$A$2:$F$500;6;FALSCH))\`**

[…] Wichtig: Ich arbeite mit **Microsoft 365**. Schlage nur Funktionen vor, die es dort gibt.` },
        { role: 'ai', text: `**In einem Satz:** Die Formel sucht den Wert aus Zelle A2 in der Tabelle „Plan“ und holt den zugehörigen Eintrag aus Spalte 6 — wird nichts gefunden, steht statt einer Fehlermeldung das Wort „prüfen“ in der Zelle.

**Schritt für Schritt (von innen nach außen):**
- \`SVERWEIS(A2;Plan!$A$2:$F$500;6;FALSCH)\` — sucht A2 in der ersten Spalte des Bereichs und gibt den Wert aus der 6. Spalte zurück; \`FALSCH\` heißt: nur exakte Treffer.
- \`ISTFEHLER(…)\` — prüft, ob diese Suche einen Fehler (meist #NV) ergibt.
- \`WENN(…;"prüfen";…)\` — bei Fehler: „prüfen“, sonst: das Suchergebnis. Dafür wird der SVERWEIS ein zweites Mal ausgeführt.

**Mini-Beispiel:** Steht in A2 „Radio-Q2“ und in Plan-Zeile 17 „Radio-Q2 | … | 48.000“, liefert die Formel 48.000. Steht in A2 „Radio Q2“ (mit Leerzeichen statt Bindestrich), findet SVERWEIS nichts → Ergebnis „prüfen“.

**Stolperfallen:**
- \`ISTFEHLER\` fängt *alle* Fehler ab — auch echte Probleme wie #BEZUG! sehen dann aus wie ein harmloses „nicht gefunden“.
- Der Bereich endet fest bei Zeile 500; Zeile 501 wird stillschweigend ignoriert.
…

**Besser machen (Microsoft 365):**
\`=XVERWEIS(A2;Plan!$A$2:$A$500;Plan!$F$2:$F$500;"prüfen")\`
XVERWEIS hat den „nicht gefunden“-Fall eingebaut — die Formel sucht nur noch einmal statt zweimal und bricht nicht, wenn Spalten eingefügt werden, weil sie die Zielspalte direkt benennt statt sie zu zählen.` }
      ]
    },
    copyCount: 34,
    rating: { average: 4.4, count: 16 },
    comments: [
      { author: 'Sophie Klein', role: 'Projektmanagerin', initials: 'SK', date: '2026-07-10', rating: 4.7, text: 'Ich habe einen Mediaplan mit sieben verschachtelten WENNs geerbt. Nach drei Durchläufen mit diesem Prompt verstehe ich die Datei zum ersten Mal wirklich.' },
      { author: 'Jan Richter', role: 'Tech Lead & Citizen-Coding-Mentor', initials: 'JR', date: '2026-06-27', rating: 4.3, text: 'Fachlich sauber, und die Versions-Zeile ist der unterschätzte Teil — davor haben Kolleg:innen ständig XVERWEIS-Vorschläge für Excel 2016 bekommen.' },
      { author: 'Lukas Weber', role: 'SEO Strategist', initials: 'LW', date: '2026-06-19', rating: 4.1, text: 'Die Testtabelle aus der ausführlichen Variante nutze ich als Mini-QA für Reporting-Sheets. Bei Google-Sheets-Formeln als Version „Google Sheets“ wählen, dann stimmen auch die Funktionsnamen.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'xlsx',
    skillRefName: 'xlsx',
    skillRefNote: 'Wenn es über einzelne Formeln hinausgeht und Claude die ganze Arbeitsmappe lesen, prüfen oder umbauen soll.'
  },

  {
    id: 'vibecoding-kickoff',
    name: 'Vibecoding-Kickoff',
    tagline: 'Der erste Prompt für dein eigenes kleines Tool — mit den fünf Angaben, die Claude wirklich braucht, statt sie zu raten: Zweck, Nutzer, Daten, Aussehen, Fertig-Kriterium. Hier lieferst du die Angaben selbst; willst du dich lieber ausfragen lassen, nimm „Lass dich interviewen“.',
    taskGroup: 'bauen',
    platforms: { code: true },
    difficulty: 'medium',
    tags: ['claude-code', 'kickoff', 'erstes-tool', 'vibecoding', 'html'],
    promptText: `Ich möchte ein kleines internes Tool bauen. Ich bin kein:e Entwickler:in — erkläre
mir wichtige Entscheidungen kurz, bevor du sie triffst.

**Was das Tool tut:** [ZWECK]
**Wer es benutzt:** [NUTZER]
**Womit es arbeitet:** [DATEN]
**Wie es aussehen soll:** [AUSSEHEN]
**Woran ich merke, dass es fertig ist:** [ERFOLGSKRITERIUM]

Rahmenbedingungen:
- Eine einzige HTML-Datei, ohne Build-Schritt und ohne Server — ich will sie per
  Doppelklick öffnen und per E-Mail teilen können.
- Keine externen Dienste, alles läuft lokal im Browser.
- Deutsche Beschriftungen.

Stelle mir zuerst deine 2–3 wichtigsten Rückfragen, falls etwas unklar ist. Baue
dann eine erste Version, die ich sofort ausprobieren kann — lieber klein und
funktionierend als vollständig. Sag mir am Ende, wie ich sie öffne und was ich
testen soll.`,
    variants: [
      {
        id: 'kurz', label: 'Kurz', hint: 'Für Mini-Tools, bei denen es wenig zu klären gibt.',
        promptText: `Baue mir ein kleines Tool als einzelne HTML-Datei (kein Server, keine externen
Dienste, deutsche Beschriftungen): [ZWECK]. Nutzer: [NUTZER].
Fertig ist es, wenn: [ERFOLGSKRITERIUM].
Ich bin kein:e Entwickler:in — sag mir am Ende, wie ich die Datei öffne und was
ich testen soll.`
      },
      {
        id: 'ausfuehrlich', label: 'Ausführlich', hint: 'Wenn du echte Daten hast und ans Weiterbauen denkst.',
        promptText: `Ich möchte ein kleines internes Tool bauen. Ich bin kein:e Entwickler:in — erkläre
mir wichtige Entscheidungen kurz, bevor du sie triffst, und benutze keine
Fachbegriffe ohne Erklärung.

**Was das Tool tut:** [ZWECK]
**Wer es benutzt:** [NUTZER]
**Womit es arbeitet:** [DATEN]
**Wie es aussehen soll:** [AUSSEHEN]
**Woran ich merke, dass es fertig ist:** [ERFOLGSKRITERIUM]

So sehen meine Daten beispielhaft aus (Ausschnitt, ggf. anonymisiert):
[DATENBEISPIEL]

Rahmenbedingungen:
- Eine einzige HTML-Datei, ohne Build-Schritt und ohne Server — per Doppelklick
  zu öffnen, per E-Mail teilbar.
- Keine externen Dienste, alles läuft lokal im Browser. Es verlassen keine Daten
  meinen Rechner.
- Deutsche Beschriftungen.

Vorgehen:
1. Stelle mir zuerst deine wichtigsten Rückfragen (maximal 3).
2. Skizziere dann in 3–5 Stichpunkten, was Version 1 kann und was du bewusst
   weglässt — warte auf mein Okay.
3. Baue Version 1. Denke an die unschönen Fälle: leere Eingaben, falsche Formate,
   sehr große Werte.
4. Sag mir am Ende: wie ich die Datei öffne, welche 3 Dinge ich testen soll, und
   welche 2–3 Ausbau-Ideen du für Version 2 siehst (nur auflisten, nicht bauen).`
      }
    ],
    builder: {
      // [DATENBEISPIEL] (nur Ausführlich-Variante) bewusst OHNE Builder-Feld:
      // bleibt gelb markiert und wird beim Einfügen echter Daten von Hand ersetzt.
      fields: [
        { key: 'zweck', ph: '[ZWECK]', label: 'Was soll das Tool tun?', type: 'textarea', placeholder: 'z. B. „einen TKP-Rechner: Budget, Kontakte und TKP — zwei Felder ausfüllen, das dritte wird berechnet“' },
        { key: 'nutzer', ph: '[NUTZER]', label: 'Wer benutzt es?', type: 'text', placeholder: 'z. B. „Kolleg:innen aus der Mediaplanung, im Kundentermin auch mal am Beamer“' },
        { key: 'daten', ph: '[DATEN]', label: 'Womit arbeitet es?', type: 'text', placeholder: 'z. B. „nur die drei eingetippten Werte — nichts wird gespeichert oder hochgeladen“' },
        { key: 'aussehen', ph: '[AUSSEHEN]', label: 'Wie soll es aussehen?', type: 'text', placeholder: 'z. B. „schlicht und aufgeräumt, Gelb als Akzentfarbe, große Eingabefelder“' },
        { key: 'erfolgskriterium', ph: '[ERFOLGSKRITERIUM]', label: 'Woran merkst du: fertig?', type: 'text', placeholder: 'z. B. „wenn ich zwei Felder ausfülle, steht im dritten sofort das richtige Ergebnis“' }
      ]
    },
    warum: 'Die fünf Angaben — Zweck, Nutzer, Daten, Aussehen, Fertig-Kriterium — sind genau die Dinge, die Claude sonst raten müsste, und Raten ist die Hauptquelle für enttäuschende erste Versuche. Die Rahmenbedingungen (eine Datei, kein Server) treffen die Technik-Entscheidungen vorab, sodass keine Zeit in einem Setup landet, das du nicht betreiben kannst. Und die Bitte um Rückfragen plus eine bewusst kleine erste Version macht aus dem Blindflug ein Gespräch: Du korrigierst nach zwei Minuten, nicht nach zwanzig.',
    exampleOutput: `⏺ Klare Beschreibung — zwei kurze Rückfragen, bevor ich baue:
  1. Sollen Beträge in Euro mit zwei Nachkommastellen angezeigt werden?
  2. Gibst du die Reichweite in Kontakten ein oder in Tausend Kontakten?

› Euro mit zwei Nachkommastellen. Eingabe in Kontakten — rechne du in Tausend um.

⏺ Verstanden. Ich baue eine einzelne HTML-Datei mit drei großen Feldern
  (Budget, Kontakte, TKP). Das jeweils leere Feld wird automatisch berechnet;
  bei ungültigen Eingaben erscheint ein Hinweis statt eines Ergebnisses.

⏺ Write(tkp-rechner.html)
⎿ Wrote 187 lines to tkp-rechner.html

⏺ Fertig. Öffne tkp-rechner.html per Doppelklick im Browser.
  Zum Testen: 50.000 € Budget und 2.500.000 Kontakte eingeben — im TKP-Feld
  sollte 20,00 € stehen. Prüfe zuletzt, was bei 0 Kontakten passiert —
  dort zeige ich einen Hinweis statt einer Division durch null.`,
    preview: {
      mode: 'terminal',
      script: [
        { t: 'user', text: 'Ich möchte ein kleines internes Tool bauen. Ich bin kein:e Entwickler:in. Was das Tool tut: ein TKP-Rechner — Budget, Kontakte und TKP, zwei Felder ausfüllen, das dritte wird berechnet. Wer es benutzt: Kolleg:innen aus der Mediaplanung. Fertig ist es, wenn im dritten Feld sofort das richtige Ergebnis steht. […]' },
        { t: 'claude', text: 'Klare Beschreibung — zwei kurze Rückfragen, bevor ich baue: 1. Sollen Beträge in Euro mit zwei Nachkommastellen angezeigt werden? 2. Gibst du die Reichweite in Kontakten ein oder in Tausend Kontakten? (Der TKP rechnet pro tausend Kontakte.)', pause: 1100 },
        { t: 'user', text: 'Euro mit zwei Nachkommastellen. Eingabe in Kontakten — rechne du in Tausend um.' },
        { t: 'claude', text: 'Verstanden. Ich baue eine einzelne HTML-Datei mit drei großen Feldern (Budget, Kontakte, TKP). Das jeweils leere Feld wird automatisch berechnet; bei ungültigen Eingaben erscheint ein Hinweis statt eines Ergebnisses.', pause: 900 },
        { t: 'tool', html: '<b>Write</b>(tkp-rechner.html)', pause: 500 },
        { t: 'res', html: 'Wrote 187 lines to tkp-rechner.html', pause: 700 },
        { t: 'claude', text: 'Fertig. Öffne tkp-rechner.html per Doppelklick im Browser. Zum Testen: 50.000 € Budget und 2.500.000 Kontakte eingeben — im TKP-Feld sollte 20,00 € stehen. Prüfe zuletzt, was bei 0 Kontakten passiert — dort zeige ich einen Hinweis statt einer Division durch null.', pause: 500 }
      ]
    },
    copyCount: 27,
    rating: { average: 4.5, count: 13 },
    comments: [
      { author: 'Jan Richter', role: 'Tech Lead & Citizen-Coding-Mentor', initials: 'JR', date: '2026-07-12', rating: 4.6, text: 'Der Prompt verhindert die drei häufigsten Kickoff-Fehler, die ich in der Q0-Gruppe sehe: kein Fertig-Kriterium, keine Daten-Angabe, und Claude baut einen Server, den niemand betreiben kann.' },
      { author: 'Christopher Kipp', role: 'Innovation Lead', initials: 'CK', date: '2026-07-01', rating: 4.5, text: '„Lieber klein und funktionierend als vollständig“ ist der wichtigste Satz darin. Die erste Version nach zehn Minuten in der Hand zu haben verändert, wie Leute über KI-Tools denken.' },
      { author: 'Mia Hoffmann', role: 'Senior UX Designerin', initials: 'MH', date: '2026-06-23', rating: 4.3, text: 'Ich fülle das Aussehen-Feld inzwischen sehr konkret aus — eine Referenz plus Akzentfarbe genügt, und die erste Version sieht schon nach etwas aus statt nach Standard-Grau.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'prototyp-bauen',
    skillRefName: 'Prototyp bauen',
    skillRefNote: 'Derselbe Weg als geführter Skill mit Trigger /prototyp — der Kickoff-Prompt ist die freie Variante davon.'
  },

  {
    id: 'feedback-formulierer',
    name: 'Feedback-Formulierer',
    tagline: 'Hartes inhaltliches Feedback, das ankommt statt zu verletzen — die KI ändert die Verpackung, nicht die Substanz. Mit eingebauter Kontrolle, ob die Schärfe noch stimmt. Für internes Feedback an Kolleg:innen; für ausgehende Kundenmails nimm den E-Mail-Ton-Check.',
    taskGroup: 'texten',
    platforms: { langdock: true },
    difficulty: 'easy',
    tags: ['feedback', 'kommunikation', 'zusammenarbeit', 'e-mail', 'kritik'],
    promptText: `Du hilfst mir, inhaltlich hartes Feedback so zu formulieren, dass es wertschätzend,
konkret und umsetzbar ist. Wichtig: Du schwächst die Substanz nicht ab — du änderst
nur die Verpackung.

Situation: Ich gebe Feedback zu [ARBEITSERGEBNIS]. Die Person ist [BEZIEHUNG].
Übermittlung: [KANAL].

Das ist meine ungeschönte Einschätzung:
[ROHFEEDBACK]

Formuliere daraus ein Feedback nach diesen Regeln:
- Beginne mit dem, was konkret gut ist — aber nur, wenn es ehrlich stimmt.
  Kein Pflicht-Lob.
- Jeder Kritikpunkt in drei Teilen: Beobachtung („mir ist aufgefallen …“) statt
  Urteil („das ist schlecht“), ein konkretes Beispiel, und was stattdessen hilft.
- Trenne klar: Was muss sich ändern — und was ist Geschmackssache. Kennzeichne
  Geschmackssache ausdrücklich als solche.
- Ende mit einem konkreten nächsten Schritt und einem Gesprächsangebot.
- So kurz wie möglich, kein Absatz ohne Funktion. Keine Floskeln wie „nicht böse
  gemeint“ oder „nur mein Senf“.

Gib mir danach in zwei Sätzen zurück: Welchen Punkt aus meinem Rohfeedback hast du
am stärksten umformuliert? So kann ich prüfen, ob die Schärfe noch stimmt.`,
    variants: [
      {
        id: 'kurz', label: 'Kurz',
        promptText: `Formuliere mein ungeschöntes Feedback zu [ARBEITSERGEBNIS] wertschätzend, aber ohne
die Substanz abzuschwächen. Jeder Kritikpunkt als: Beobachtung + Beispiel + was
stattdessen hilft. Keine Floskeln, kein Pflicht-Lob. Übermittlung: [KANAL].

Mein Rohfeedback:
[ROHFEEDBACK]`
      },
      {
        id: 'ausfuehrlich', label: 'Ausführlich', hint: 'Für heikle Fälle — mit Perspektivwechsel und zwei Fassungen.',
        promptText: `Du hilfst mir, inhaltlich hartes Feedback so zu formulieren, dass es wertschätzend,
konkret und umsetzbar ist. Wichtig: Du schwächst die Substanz nicht ab — du änderst
nur die Verpackung.

Situation: Ich gebe Feedback zu [ARBEITSERGEBNIS]. Die Person ist [BEZIEHUNG].
Übermittlung: [KANAL].

Das ist meine ungeschönte Einschätzung:
[ROHFEEDBACK]

Arbeite in vier Schritten:

1. **Sortieren:** Liste die Kritikpunkte aus meinem Rohfeedback auf und ordne jeden
   ein: „muss sich ändern“ / „Geschmackssache“ / „eigentlich kein Feedback, sondern
   mein Frust“. Frust-Punkte fliegen raus — sag mir aber, welche das waren.
2. **Perspektivwechsel:** Wie wird die Person das Feedback vermutlich lesen? Nenne
   die eine Formulierung mit dem größten Verletzungsrisiko.
3. **Zwei Fassungen:** Schreibe das Feedback in zwei Varianten —
   a) direkt und knapp (für ein Gespräch unter erfahrenen Kolleg:innen),
   b) ausführlicher mit mehr Einordnung (wenn die Person das Thema zum ersten Mal
   hört oder unsicher ist).
   Beide: Beobachtung + Beispiel + was stattdessen hilft, pro Kritikpunkt. Ende mit
   konkretem nächsten Schritt und Gesprächsangebot. Keine Floskeln.
4. **Schärfe-Kontrolle:** Welchen Punkt hast du am stärksten umformuliert, und ist
   dabei inhaltlich etwas verloren gegangen? Antworte ehrlich in zwei Sätzen.`
      }
    ],
    builder: {
      fields: [
        { key: 'arbeitsergebnis', ph: '[ARBEITSERGEBNIS]', label: 'Worauf gibst du Feedback?', type: 'text', placeholder: 'z. B. „dem Entwurf der Kundenpräsentation für den Quartals-Review“' },
        { key: 'beziehung', ph: '[BEZIEHUNG]', label: 'Wer ist die Person für dich?', type: 'select', options: ['ein:e Kolleg:in aus meinem Team', 'ein:e Kolleg:in aus einem anderen Team', 'eine Person, die ich fachlich anleite', 'ein:e externe:r Dienstleister:in'] },
        { key: 'kanal', ph: '[KANAL]', label: 'Wie kommt es an?', type: 'select', options: ['per E-Mail', 'schriftlich im Chat', 'mündlich — ich will mich vorbereiten'] },
        { key: 'rohfeedback', ph: '[ROHFEEDBACK]', label: 'Dein ungeschöntes Rohfeedback', type: 'textarea', placeholder: 'Schreib hier ehrlich rein, was dich stört — genau so, wie du es NICHT abschicken würdest …' }
      ]
    },
    warum: 'Der Satz „du änderst nur die Verpackung, nicht die Substanz“ zieht die Grenze, an der solche Prompts sonst scheitern: Ohne ihn spült das Modell die Kritik weich, bis nichts mehr übrig ist. Das Dreier-Muster Beobachtung + Beispiel + Alternative ist ein bewährtes Feedback-Format als harter Anker — es zwingt zu Konkretem statt zu Urteilen. Und die Schärfe-Kontrolle am Ende („welchen Punkt hast du am stärksten umformuliert?“) baut eine Prüfschleife ein: Du bleibst Absender:in und unterschreibst nichts, was du nicht meinst.',
    exampleOutput: `Hallo [Name],

danke für den Entwurf — die Charts ab Folie 20 sind stark: klare Achsen, eine
Botschaft pro Folie. Genau dieses Niveau wünsche ich mir für das ganze Deck.

Drei Punkte, die sich aus meiner Sicht vor dem Versand ändern müssen:

Umfang: Mir ist aufgefallen, dass der Entwurf 40 Folien hat. Für einen
Quartals-Review sind erfahrungsgemäß 15–20 realistisch. Was hilft: Detailfolien
in einen Anhang verschieben — dann geht nichts verloren.

Textmenge: Auf vielen Folien (z. B. 7 und 12) muss man die Kernaussage im
Fließtext suchen. Was hilft: pro Folie eine Aussage als Headline, der Rest in
die Notizen.

Empfehlung: Aktuell endet das Deck ohne klare Handlungsempfehlung. […]

Geschmackssache, daher nur als Anregung: […]

Lass uns gern morgen 15 Minuten dazu telefonieren — die Umbauten sind
überschaubar, und der Kern ist gut.

---

Schärfe-Kontrolle: Am stärksten umformuliert habe ich „liest kein Kunde“ —
daraus wurde die Erfahrungs-Angabe mit 15–20 Folien. Die Substanz (das Deck
muss deutlich kürzer werden) ist vollständig erhalten.`,
    preview: {
      mode: 'chat',
      chat: [
        { role: 'user', text: `Du hilfst mir, inhaltlich hartes Feedback so zu formulieren, dass es wertschätzend, konkret und umsetzbar ist. […]

Situation: Ich gebe Feedback zu **dem Entwurf der Kundenpräsentation für den Quartals-Review**. Die Person ist **ein:e Kolleg:in aus meinem Team**. Übermittlung: **per E-Mail**.

Das ist meine ungeschönte Einschätzung:
**„Die Präsentation ist viel zu lang, 40 Folien liest kein Kunde. Auf der Hälfte der Folien steht ein Roman, die Kernaussage muss man suchen. Und es gibt keine einzige klare Empfehlung — der Kunde fragt am Ende garantiert: und was sollen wir jetzt tun? Die Charts ab Folie 20 sind dagegen richtig gut.“**` },
        { role: 'ai', text: `Hier ist dein Feedback, versandfertig:

---

Hallo [Name],

danke für den Entwurf — die Charts ab Folie 20 sind stark: klare Achsen, eine Botschaft pro Folie. Genau dieses Niveau wünsche ich mir für das ganze Deck.

Drei Punkte, die sich aus meiner Sicht vor dem Versand ändern müssen:

**Umfang:** Mir ist aufgefallen, dass der Entwurf 40 Folien hat. Für einen Quartals-Review sind erfahrungsgemäß 15–20 realistisch. Was hilft: Detailfolien in einen Anhang verschieben — dann geht nichts verloren.

**Textmenge:** Auf vielen Folien (z. B. 7 und 12) muss man die Kernaussage im Fließtext suchen. Was hilft: pro Folie eine Aussage als Headline, der Rest in die Notizen.

**Empfehlung:** Aktuell endet das Deck ohne klare Handlungsempfehlung. […]

Geschmackssache, daher nur als Anregung: […]

Lass uns gern morgen 15 Minuten dazu telefonieren — die Umbauten sind überschaubar, und der Kern ist gut.

---

**Schärfe-Kontrolle:** Am stärksten umformuliert habe ich „liest kein Kunde“ — daraus wurde die Erfahrungs-Angabe mit 15–20 Folien. Die Substanz (das Deck muss deutlich kürzer werden) ist vollständig erhalten.` }
      ]
    },
    copyCount: 21,
    rating: { average: 4.2, count: 12 },
    comments: [
      { author: 'Sophie Klein', role: 'Projektmanagerin', initials: 'SK', date: '2026-07-06', rating: 4.4, text: 'Die Schärfe-Kontrolle am Ende ist der beste Teil. Einmal hat mir die KI zurückgemeldet, dass sie meinen Kernpunkt entschärft hatte — ohne die Frage hätte ich es nicht gemerkt.' },
      { author: 'Anna Schreiber', role: 'Content Strategin', initials: 'AS', date: '2026-06-30', rating: 4.2, text: 'Ich nutze die ausführliche Variante für Text-Feedback an Freie. Schritt 1 sortiert meinen Frust aus — was übrig bleibt, ist tatsächlich das Feedback, das ich geben wollte.' },
      { author: 'Christopher Kipp', role: 'Innovation Lead', initials: 'CK', date: '2026-06-22', rating: 4.1, text: 'Wichtig fürs Onboarding: Das Ergebnis ist ein Entwurf, kein Autopilot. Lesen, anpassen, dann erst senden — genau dafür ist die Kontrollfrage am Ende da.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'internal-comms',
    skillRefName: 'internal-comms',
    skillRefNote: 'Für interne Kommunikation über Feedback hinaus: Ankündigungen, Team-Updates, heikle Mails.'
  },

  /* ==================== BREITE-EINTRÄGE (18) ==================== */

  {
    id: 'meeting-todos',
    name: 'Meeting-Protokoll → To-do-Liste',
    tagline: 'Aus wirren Meeting-Notizen wird in einer Minute eine saubere Aufgabenliste mit Verantwortlichen und Fristen.',
    taskGroup: 'loslegen',
    platforms: { langdock: true },
    difficulty: 'easy',
    tags: ['meetings', 'todos', 'protokoll', 'organisation', 'einstieg'],
    promptText: `Du bist eine erfahrene Projektassistenz in einer Media-Agentur. Unten findest du ein rohes Meeting-Protokoll.

Extrahiere daraus alle Aufgaben und erstelle eine To-do-Liste als Tabelle mit den Spalten: Aufgabe | Verantwortlich | Frist | Offene Frage.

Regeln:
- Erfinde nichts. Wenn Verantwortliche:r oder Frist im Text fehlen, schreibe „unklar“ und formuliere die nötige Rückfrage in der Spalte „Offene Frage“.
- Sortiere nach Frist, dringendste zuerst.
- Fasse danach in 2–3 Sätzen zusammen, welche Entscheidungen im Meeting getroffen wurden (keine Aufgaben, nur Entscheidungen).

Protokoll:
[PROTOKOLL-TEXT]`,
    warum: 'Der Format-Anker (Tabelle mit festen Spalten) zwingt die KI, jede Aufgabe vollständig zu erfassen — fehlt eine Spalte, fällt es sofort auf. Die „unklar“-Regel ist ein Anti-Halluzinations-Riegel: Statt plausible Fristen zu erfinden, muss die KI Lücken offenlegen. Und die Trennung von Aufgaben und Entscheidungen verhindert, dass beides zu einem Brei zusammenläuft.',
    exampleOutput: `| Aufgabe                                  | Verantwortlich | Frist   | Offene Frage                       |
|------------------------------------------|----------------|---------|------------------------------------|
| Angebot für Quellgold-Sommerkampagne     | Daria          | Mi, 22.7. | —                                |
| Motivauswahl an Kunde senden             | Tim            | Fr, 24.7. | Welche 3 Motive? Im Meeting offen. |
| Budget-Freigabe Q4 einholen              | unklar         | 31.7.   | Wer spricht mit dem Kunden — Daria oder KAM? |
| Reporting-Vorlage aktualisieren          | Selin          | unklar  | Vor oder nach dem Kunden-Termin?   |

Entscheidungen: Die Sommerkampagne startet wie geplant am 10.8., das Zusatzbudget
für Social wird erst nach dem Q3-Reporting entschieden. Der Jour fixe wechselt
ab August auf 14-tägig.`,
    copyCount: 29,
    rating: { average: 4.6, count: 14 },
    endorsedBy: ['Sophie Klein', 'Christopher Kipp'],
    comments: [
      { author: 'Sophie Klein', role: 'Projektmanagerin', initials: 'SK', date: '2026-07-09', rating: 4.7, text: 'Mein meistgenutzter Prompt. Die Spalte „Offene Frage“ fängt genau das ab, was sonst zwischen den Zeilen verloren geht.' },
      { author: 'Christopher Kipp', role: 'Innovation Lead', initials: 'CK', date: '2026-06-26', rating: 4.5, text: 'Der perfekte erste Prompt: Jede:r hat Meeting-Notizen, und das Ergebnis überzeugt sofort.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'meeting-notes',
    skillRefName: 'Meeting Notes'
  },

  {
    id: 'uebergabe-doku',
    name: 'Übergabe-Doku vor dem Urlaub',
    tagline: 'Aus deinem Gedanken-Auswurf wird eine Übergabe, mit der deine Vertretung wirklich arbeiten kann.',
    taskGroup: 'loslegen',
    platforms: { langdock: true },
    difficulty: 'easy',
    tags: ['uebergabe', 'urlaub', 'dokumentation', 'organisation'],
    promptText: `Du hilfst mir, eine Urlaubsübergabe zu schreiben, die meine Vertretung ohne Rückfragen arbeitsfähig macht. Ich gebe dir unten einen unsortierten Gedanken-Auswurf zu meinen laufenden Themen.

Erstelle daraus eine Übergabe-Doku mit dieser Struktur:
1) Laufende Projekte — je Projekt: Status in einem Satz, nächster Schritt, Ansprechpartner:in
2) Termine & Deadlines im Zeitraum [ABWESENHEIT-VON-BIS]
3) „Wenn X passiert, dann …“ — die 3 wahrscheinlichsten Störfälle mit konkreter Handlungsanweisung
4) Wo liegt was — Dateien, Vorlagen, Zugänge (nur Orte nennen, keine Passwörter)

Stelle mir am Ende maximal 5 Rückfragen zu Punkten, die für die Vertretung kritisch, aber in meinen Notizen unklar sind.

Meine Notizen:
[NOTIZEN]`,
    warum: 'Die vorgegebene Vier-Punkte-Struktur ist ein Format-Anker, der aus losen Notizen ein vollständiges Dokument erzwingt — besonders Punkt 3 („Wenn X, dann …“) holt Wissen aus dem Kopf, das man sonst nie aufschreibt. Die Rückfragen am Ende drehen die Rollen um: Die KI prüft aktiv auf Lücken, statt nur zu formatieren.',
    exampleOutput: `ÜBERGABE 3.–21. AUGUST — LAUFENDE PROJEKTE

1) Veloru E-Bikes, Herbstkampagne: Mediaplan liegt beim Kunden zur Freigabe.
   Nächster Schritt: Bei Freigabe Buchung auslösen (Vorlage im Kampagnenordner).
   Ansprechpartner: Jonas (Einkauf).
2) Kornwerk Müsli, Always-on Social: Läuft stabil, wöchentliches Reporting
   freitags. Nächster Schritt: Report aus Vorlage ziehen, an Frau Berg senden.

WENN X PASSIERT, DANN …
- Veloru lehnt den Plan ab → Termin mit Jonas + mir nach dem 21.8., nichts umbuchen.
- Kornwerk-Zahlen brechen ein (>20 %) → zuerst Tracking prüfen, dann Frau Berg anrufen.

RÜCKFRAGEN: Wer vertritt dich im Kornwerk-Jour-fixe am 12.8.? Wo liegt die
Buchungsvorlage genau — Kampagnenordner oder Team-Laufwerk?`,
    copyCount: 15,
    rating: { average: 4.5, count: 8 },
    comments: [
      { author: 'Sophie Klein', role: 'Projektmanagerin', initials: 'SK', date: '2026-07-02', rating: 4.6, text: 'Habe ich vor dem Sommerurlaub getestet: Die Störfall-Liste war das, wofür meine Vertretung am dankbarsten war.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'doc-coauthoring',
    skillRefName: 'doc-coauthoring'
  },

  {
    id: 'fachbegriff-erklaerer',
    name: 'Fachbegriff-Erklärer',
    tagline: 'Versteh jeden Media- oder Tech-Begriff so gut, dass du ihn morgen einer Kundin erklären kannst.',
    taskGroup: 'loslegen',
    platforms: { langdock: true },
    difficulty: 'easy',
    tags: ['lernen', 'fachbegriffe', 'wissen', 'kundengespraech'],
    promptText: `Erkläre mir [FACHBEGRIFF] so, dass ich es morgen einer Kundin erklären könnte. Ich arbeite in einer Media-Agentur im Bereich [MEIN-BEREICH] und habe zu diesem Thema kein tiefes Fachwissen.

Baue die Erklärung genau so auf:
1) Kernidee in einem Satz, ohne Fachsprache
2) Eine Alltags-Analogie
3) Ein konkretes Beispiel aus dem Agentur-Alltag
4) Die zwei häufigsten Missverständnisse zu diesem Begriff
5) Ein Prüfsatz: eine Frage, mit der ich selbst testen kann, ob ich es verstanden habe

Länge: maximal 250 Wörter. Wenn der Begriff mehrdeutig ist, frag zuerst nach, welche Bedeutung ich meine.`,
    warum: 'Der fünfteilige Aufbau ist ein Lern-Gerüst: Analogie und Alltags-Beispiel verankern den Begriff, die „häufigsten Missverständnisse“ adressieren genau die Stellen, an denen Halbwissen entsteht. Die Kontext-Angabe ([MEIN-BEREICH]) sorgt dafür, dass Beispiele aus deiner Arbeitswelt kommen statt aus dem Lehrbuch — und die Nachfrage-Klausel fängt mehrdeutige Begriffe ab, bevor die Erklärung in die falsche Richtung läuft.',
    exampleOutput: `ATTRIBUTIONSMODELL — in einem Satz: Eine Rechenregel, die festlegt, welcher
Werbekontakt wie viel „Verdienst“ an einem Kauf bekommt.

Analogie: Ein Fußballtor. Der Stürmer schießt (letzter Klick), aber Vorlage
und Spielaufbau waren genauso beteiligt. Das Attributionsmodell entscheidet,
wer im Spielbericht wie viel Anerkennung bekommt.

Agentur-Beispiel: Eine Kundin sieht erst ein YouTube-Video, klickt eine Woche
später auf eine Suchanzeige und kauft. „Last Click“ gibt der Suchanzeige 100 % —
das Video geht leer aus, obwohl es den Anstoß gab.

Missverständnisse: 1) Es gibt kein „richtiges“ Modell — jedes setzt andere
Schwerpunkte. 2) Attribution misst nicht Wirkung, sondern verteilt sie nur um.

Prüfsatz: Kannst du erklären, warum dieselbe Kampagne unter zwei Modellen
verschieden gut aussieht?`,
    copyCount: 21,
    rating: { average: 4.3, count: 10 },
    comments: [
      { author: 'Christopher Kipp', role: 'Innovation Lead', initials: 'CK', date: '2026-07-05', rating: 4.4, text: 'Der Prüfsatz am Ende ist das Beste daran — man merkt sofort, ob man es wirklich verstanden hat.' },
      { author: 'Lukas Weber', role: 'SEO Strategist', initials: 'LW', date: '2026-06-25', rating: 4.1, text: 'Nutze ich, um Nicht-Media-Kolleg:innen Begriffe aus meinen Reports zu übersetzen.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'erste-schritte',
    skillRefName: 'Erste Schritte'
  },

  {
    id: 'code-verstehen',
    name: 'Was tut diese Datei?',
    tagline: 'Lass dir jede Datei deines Projekts in Alltagssprache erklären — ohne eine Zeile Code zu lesen.',
    taskGroup: 'bauen',
    platforms: { code: true },
    difficulty: 'easy',
    tags: ['code-verstehen', 'vibecoding', 'lernen', 'claude-code'],
    promptText: `Erkläre mir, was die Datei [DATEINAME] in diesem Projekt tut — für jemanden ohne Programmierkenntnisse.

Beantworte dabei:
1) Was ist die Aufgabe dieser Datei, in einem Satz?
2) Was passiert Schritt für Schritt, wenn sie läuft? Maximal 5 Schritte, in Alltagssprache.
3) Mit welchen anderen Dateien im Projekt arbeitet sie zusammen — und wofür?
4) Was würde kaputtgehen, wenn ich sie lösche?

Benutze keinen Fachbegriff, ohne ihn direkt in Klammern zu erklären. Zeige mir keinen Code, außer ich frage danach.`,
    warum: 'Die vier Fragen sind so gewählt, dass ein mentales Modell entsteht statt einer Code-Zusammenfassung: Aufgabe, Ablauf, Verbindungen, Konsequenzen. Die „Was ginge kaputt?“-Frage erzwingt, dass Claude die Datei im Kontext des ganzen Projekts betrachtet — genau das, was Einsteiger:innen ohne diesen Prompt nie erfahren würden. Das Fachbegriff-Verbot hält die Antwort auf dem richtigen Niveau.',
    exampleOutput: `DATEI: rechner.js

1) Aufgabe: Diese Datei ist das Gehirn deines TKP-Rechners — sie rechnet aus
   den Eingaben das Ergebnis aus.

2) Ablauf: (1) Sie wartet, bis jemand auf „Berechnen“ klickt. (2) Sie liest
   Budget und Reichweite aus den Eingabefeldern. (3) Sie prüft, ob beides
   Zahlen sind — wenn nicht, zeigt sie eine Fehlermeldung. (4) Sie teilt das
   Budget durch die Reichweite und multipliziert mit 1.000. (5) Sie schreibt
   das Ergebnis in das graue Feld unten auf der Seite.

3) Zusammenarbeit: index.html (dort liegen die Eingabefelder, die diese Datei
   ausliest) und style.css (nur Optik, keine Logik).

4) Ohne diese Datei: Die Seite sähe normal aus, aber der Berechnen-Knopf
   würde nichts mehr tun.`,
    copyCount: 16,
    rating: { average: 4.4, count: 9 },
    comments: [
      { author: 'Jan Richter', role: 'Tech Lead & Citizen-Coding-Mentor', initials: 'JR', date: '2026-07-07', rating: 4.6, text: 'Genau so lernt man sein eigenes Vibecoding-Projekt kennen. Empfehle ich in jeder Sprechstunde.' },
      { author: 'Sophie Klein', role: 'Projektmanagerin', initials: 'SK', date: '2026-06-28', rating: 4.2, text: 'Ich hatte Respekt vor meinen eigenen Dateien. Jetzt frage ich einfach — Frage 4 hat mir die Angst vorm Löschen genommen.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'erste-schritte',
    skillRefName: 'Erste Schritte'
  },

  {
    id: 'fehlersuche-vibecoding',
    name: 'Fehlersuche im eigenen Tool',
    tagline: 'Erst Diagnose, dann Reparatur — so findet Claude den echten Fehler statt Symptome zu übertünchen.',
    taskGroup: 'bauen',
    platforms: { code: true },
    difficulty: 'advanced',
    tags: ['debugging', 'vibecoding', 'fehlersuche', 'claude-code'],
    promptText: `In meinem Tool funktioniert etwas nicht.

Beobachtetes Verhalten: [WAS-PASSIERT]
Erwartetes Verhalten: [WAS-PASSIEREN-SOLLTE]
So lässt es sich auslösen: [SCHRITTE-ZUM-NACHSTELLEN]

Wichtig: Repariere noch nichts. Gehe erst auf Fehlersuche:
1) Nenne die drei wahrscheinlichsten Ursachen und in welcher Datei du sie jeweils vermutest.
2) Prüfe die Kandidaten im Code und sag mir, welche Ursache es wirklich ist — mit Beleg (Dateiname + betroffene Stelle, in Alltagssprache erklärt).
3) Schlage dann die kleinstmögliche Korrektur vor und erkläre in einem Satz, warum sie das Problem behebt und nichts anderes verändert.

Warte auf mein Okay, bevor du etwas änderst.`,
    warum: 'Das Trio „beobachtet / erwartet / nachstellbar“ ist die klassische Bug-Report-Struktur — sie gibt Claude genau die Informationen, mit denen sich ein Fehler eingrenzen lässt. Das „Repariere noch nichts“ erzwingt Denkschritte vor der Aktion: Erst Hypothesen, dann Beleg, dann minimaler Eingriff. Das verhindert das typische Vibecoding-Desaster, bei dem die KI beim „Fixen“ gleich drei andere Dinge mit umbaut.',
    exampleOutput: `HYPOTHESEN
1. Das Datum wird als Text statt als Zahl verglichen (vermutet: auswertung.js)
2. Der Filter überspringt die erste Tabellenzeile (vermutet: auswertung.js)
3. Die CSV-Datei nutzt Semikolons, der Code erwartet Kommas (vermutet: einlesen.js)

BEFUND NACH PRÜFUNG
Es ist Ursache 3. In einlesen.js wird jede Zeile am Komma getrennt — deine
Export-Datei aus Excel trennt aber mit Semikolon. Deshalb landet die komplette
Zeile in einer einzigen Spalte, und der Filter findet nie einen Treffer.
Ursachen 1 und 2 habe ich geprüft: Datumsvergleich und Schleife sind korrekt.

VORSCHLAG (kleinstmöglich)
Eine Zeile in einlesen.js: beim Einlesen zuerst prüfen, ob die Kopfzeile
Semikolons enthält, und dann das passende Trennzeichen verwenden.
Ändert nichts am Rest — Auswertung und Anzeige bleiben unberührt. Okay?`,
    copyCount: 11,
    rating: { average: 4.5, count: 7 },
    comments: [
      { author: 'Jan Richter', role: 'Tech Lead & Citizen-Coding-Mentor', initials: 'JR', date: '2026-07-11', rating: 4.7, text: 'Die wichtigste Zeile ist „Repariere noch nichts“. Wer das weglässt, bekommt Umbauten statt Diagnosen.' },
      { author: 'Mia Hoffmann', role: 'Senior UX Designerin', initials: 'MH', date: '2026-07-01', rating: 4.3, text: 'Hat meinen Prototyp gerettet, ohne ihn umzukrempeln. Die Drei-Hypothesen-Struktur macht die Antwort nachvollziehbar.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'systematic-debugging',
    skillRefName: 'systematic-debugging'
  },

  {
    id: 'tool-anforderungen',
    name: 'Lass dich interviewen, bevor du baust',
    tagline: 'Die KI stellt dir die Fragen — und aus deinen Antworten wird ein Steckbrief, der dein Tool-Projekt auf Kurs hält. Der Gegenentwurf zum Vibecoding-Kickoff, bei dem du die Angaben selbst mitbringst.',
    taskGroup: 'bauen',
    platforms: { langdock: true, code: true },
    difficulty: 'easy',
    tags: ['anforderungen', 'vibecoding', 'planung', 'interview', 'kickoff'],
    promptText: `Ich möchte ein kleines Tool bauen: [TOOL-IDEE-IN-EINEM-SATZ].

Bevor wir starten: Interviewe mich. Stelle mir nacheinander — nicht alle auf einmal — die 5 bis 7 wichtigsten Fragen, um die Anforderungen zu klären:
- Wer soll es nutzen?
- Was ist die eine Kernfunktion?
- Was soll bewusst NICHT rein?
- Wie soll das Ergebnis aussehen?
- Woran erkennen wir, dass es gelungen ist?

Frage bei vagen Antworten genau einmal nach. Fasse am Ende alles als kurzen Steckbrief zusammen: Ziel, Nutzer:innen, Muss-Funktionen, Nicht-Ziele, offene Risiken.

Erst wenn ich den Steckbrief bestätige, geht es weiter.`,
    warum: 'Der Prompt dreht die übliche Richtung um: Statt dass du der KI alles perfekt vorformulierst, holt sie sich die Informationen selbst — Frage für Frage, damit du wirklich nachdenkst statt durchzuwinken. Die Nicht-Ziele sind der heimliche Star: Sie verhindern, dass dein Mini-Tool zur Featurewüste wird. Und der bestätigte Steckbrief ist ein Kontrollpunkt, auf den du dich später berufen kannst („steht nicht im Steckbrief“).',
    exampleOutput: `STECKBRIEF: URLAUBSPLANER FÜRS TEAM

Ziel: Auf einen Blick sehen, wer aus dem 8er-Team wann weg ist, damit
Kampagnen-Deadlines nicht in Abwesenheiten fallen.
Nutzer:innen: Unser Team + Teamleitung; niemand sonst.
Muss-Funktionen: Kalenderansicht pro Monat, Einträge anlegen/löschen,
Warnhinweis wenn mehr als 3 Personen gleichzeitig fehlen.
Nicht-Ziele: KEINE Genehmigungs-Workflows, KEINE Anbindung an HR-Systeme,
KEINE Vertretungsregeln — das bleibt beim bestehenden Prozess.
Offene Risiken: Wo liegen die Daten? (Klären, bevor echte Namen reinkommen.)

Passt der Steckbrief so? Dann schlage ich als Nächstes den einfachsten
Bauplan vor: eine einzige HTML-Datei, die ihr im Team-Ordner teilt.`,
    copyCount: 18,
    rating: { average: 4.4, count: 8 },
    comments: [
      { author: 'Mia Hoffmann', role: 'Senior UX Designerin', initials: 'MH', date: '2026-07-08', rating: 4.5, text: 'So starte ich jeden Prototyp. Die Nicht-Ziele-Frage hat mir schon dreimal den Scope gerettet.' },
      { author: 'Jan Richter', role: 'Tech Lead & Citizen-Coding-Mentor', initials: 'JR', date: '2026-06-29', rating: 4.4, text: 'Wer mit diesem Steckbrief in die Sprechstunde kommt, ist doppelt so schnell fertig.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'brainstorming',
    skillRefName: 'brainstorming'
  },

  {
    id: 'social-post-serie',
    name: 'Social-Post-Serie aus einem Text',
    tagline: 'Ein Blogartikel, fünf Posts — jeder mit eigenem Gedanken statt fünfmal derselben Kürzung.',
    taskGroup: 'texten',
    platforms: { langdock: true },
    difficulty: 'easy',
    tags: ['social-media', 'content-recycling', 'posts', 'redaktion'],
    promptText: `Du bist Social-Media-Redakteur:in für [KUNDE-MARKE]. Zielgruppe: [ZIELGRUPPE]. Tonalität: [TONALITÄT].

Unten steht ein längerer Text (z. B. Blogartikel oder Pressemitteilung). Entwickle daraus eine Serie von 5 Posts für [PLATTFORM].

Pro Post:
- Ein Hook-Satz, der beim Scrollen stoppt
- 2–4 Sätze Kern
- Ein Call-to-Action

Regeln: Jeder Post trägt EINEN eigenen Gedanken aus dem Text — keine Wiederholungen, keine bloßen Kürzungen des Originals. Kennzeichne pro Post in Klammern, welche Textstelle die Quelle ist. Maximal 3 passende Hashtags, keine Hashtag-Wüsten.

Text:
[ROHTEXT]`,
    warum: 'Die Ein-Gedanke-pro-Post-Regel ist die entscheidende Leitplanke: Ohne sie liefert die KI fünf Varianten derselben Zusammenfassung. Die Quellen-Kennzeichnung zwingt sie, den Text wirklich zu durchforsten statt frei zu assoziieren — und macht deine Abnahme schneller, weil du jede Behauptung prüfen kannst. Rollen-Priming plus Tonalitäts-Platzhalter halten die Serie markenkonform.',
    exampleOutput: `POST 2/5 — Kornwerk Müsli, LinkedIn (Quelle: Absatz 3, Lieferkette)

Hook: 4.000 Kilometer weniger — pro Charge.

Kern: Seit März kommt unser Hafer nicht mehr aus drei Ländern, sondern von
vier Höfen aus einem Umkreis von 80 Kilometern. Das war kein Selbstläufer:
Zwei Ernten mussten wir überbrücken, einen Hof haben wir bei der
Zertifizierung begleitet. Jetzt steht die Lieferkette — und sie ist kürzer,
planbarer und nachvollziehbar bis aufs Feld.

CTA: Welcher Hof liefert deinen Hafer? Die Karte gibt's im Kommentar.

#Regionalität #Lieferkette #Kornwerk`,
    copyCount: 27,
    rating: { average: 4.3, count: 12 },
    comments: [
      { author: 'Anna Schreiber', role: 'Content Strategin', initials: 'AS', date: '2026-07-04', rating: 4.6, text: 'Die Quellen-Klammer ist Gold: Ich sehe sofort, ob die KI erfunden oder gelesen hat.' },
      { author: 'Mia Hoffmann', role: 'Senior UX Designerin', initials: 'MH', date: '2026-06-24', rating: 4.0, text: 'Nutze ich für unsere Projekt-Posts. Fünf echte Blickwinkel statt fünf Zusammenfassungen.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'content-recycling',
    skillRefName: 'Content Recycling'
  },

  {
    id: 'betreffzeilen-batterie',
    name: 'Betreffzeilen-Batterie',
    tagline: 'Zehn Betreffzeilen in fünf Macharten — statt zehnmal derselben Idee in anderen Worten.',
    taskGroup: 'texten',
    platforms: { langdock: true },
    difficulty: 'easy',
    tags: ['email', 'newsletter', 'betreffzeilen', 'crm', 'texten'],
    promptText: `Du bist CRM-Texter:in. Schreibe 10 Betreffzeilen für eine E-Mail an [ZIELGRUPPE] zum Thema [THEMA-ODER-ANLASS]. Absender ist [KUNDE-MARKE], Tonalität: [TONALITÄT].

Liefere je 2 Betreffzeilen in diesen 5 Macharten:
1) Neugier
2) Nutzenversprechen
3) Dringlichkeit (ehrlich — kein künstlicher Druck, keine falsche Verknappung)
4) Frage
5) Zahl oder Fakt

Vorgaben: Maximal 45 Zeichen pro Betreffzeile. Zu jeder Zeile ein passender Preheader (maximal 80 Zeichen), der den Betreff weiterführt statt ihn zu wiederholen.

Markiere am Ende deine 2 Favoriten und begründe in je einem Satz, warum sie funktionieren dürften.`,
    warum: 'Die fünf Macharten sind erzwungene Vielfalt: Ohne diese Kategorien produziert die KI zehn Variationen desselben Musters. Die harten Zeichen-Limits sind Format-Anker, die direkt aus der Praxis kommen (mobile Inbox schneidet ab) — und die Favoriten-Begründung liefert dir gleich Argumente für die Abstimmung mit Kunde oder Team.',
    exampleOutput: `Kunde: finable (Banking-App) · Anlass: neues Gemeinschaftskonto · Du-Ton

NEUGIER
1. Eure Miete hat ein neues Zuhause (32)
   Preheader: Das Gemeinschaftskonto ist da — eingerichtet in 4 Minuten.
2. Wer zahlt eigentlich das Klopapier? (35)
   Preheader: Ab heute egal. Ein Konto für alles, was ihr teilt.

NUTZENVERSPRECHEN
3. Nie wieder Ausgaben nachrechnen (31)
   Preheader: finable teilt eure Fixkosten automatisch fair auf.

ZAHL/FAKT
9. 4 Minuten bis zum ersten Wir-Konto (34)
   Preheader: Zu zweit eröffnen, ohne Termin, ohne Papier.

FAVORITEN: Nr. 2 (konkretes Alltagsbild, das jede WG kennt) und Nr. 9
(messbares Versprechen, senkt die Einstiegshürde).`,
    copyCount: 19,
    rating: { average: 4.2, count: 7 },
    comments: [
      { author: 'Anna Schreiber', role: 'Content Strategin', initials: 'AS', date: '2026-06-27', rating: 4.4, text: 'Die Macharten-Aufteilung nehme ich inzwischen auch für Headlines und Anzeigentexte.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'tonalitaets-check',
    skillRefName: 'Tonalitäts-Check'
  },

  {
    id: 'email-ton-check',
    name: 'E-Mail-Ton-Check vor dem Absenden',
    tagline: 'Lies deine Mail einmal mit den Augen der Empfängerin — bevor sie es tut. Für ausgehende (Kunden-)Mails; internes Feedback an Kolleg:innen formuliert der Feedback-Formulierer.',
    taskGroup: 'texten',
    platforms: { langdock: true },
    difficulty: 'easy',
    tags: ['email', 'tonalitaet', 'kommunikation', 'kundenkontakt'],
    promptText: `Prüfe die folgende E-Mail, bevor ich sie abschicke.

Empfänger:in: [EMPFAENGER-UND-BEZIEHUNG, z. B. „Kundin, eher förmlich, letztes Projekt lief holprig“]
Anlass: [ANLASS]

Sag mir:
1) Wie kommt der Ton vermutlich an? Ein Satz — aus Sicht der Empfängerin formuliert.
2) Welche Formulierungen könnten falsch verstanden werden oder schärfer klingen als gemeint? Zitiere sie wörtlich.
3) Fehlt etwas Entscheidendes: klare Bitte, Frist, nächster Schritt?

Schreibe die Mail danach einmal neu: gleicher Inhalt, gleiche Kernaussage, aber im passenden Ton — und mindestens ein Drittel kürzer.

E-Mail:
[E-MAIL-TEXT]`,
    warum: 'Der Prompt nutzt Perspektivwechsel als Technik: Die KI liest die Mail nicht als Text, sondern als Empfängerin mit Vorgeschichte — deshalb ist der Kontext-Platzhalter („letztes Projekt lief holprig“) so wichtig. Das wörtliche Zitieren kritischer Stellen macht das Feedback überprüfbar statt gefühlig. Und die Kürzungs-Vorgabe verhindert, dass die „diplomatischere“ Version doppelt so lang und wattig wird.',
    exampleOutput: `1) SO KOMMT ES AN: „Man macht mir Vorwürfe für eine Verzögerung, die ich
   nicht allein zu verantworten habe.“

2) KRITISCHE STELLEN:
   - „wie bereits mehrfach erwähnt“ → liest sich als Rüge, nicht als Erinnerung
   - „Wir können so nicht weiterarbeiten“ → klingt nach Ultimatum,
     gemeint war vermutlich: „uns fehlen Unterlagen“

3) ES FEHLT: ein konkretes Datum. „zeitnah“ ist keine Frist.

NEUFASSUNG (–40 %):
Liebe Frau Berg, für den Kampagnenstart am 1.9. fehlen uns noch die
freigegebenen Motive. Können Sie uns diese bis Freitag, 24.7., senden?
Dann halten wir den Termin sicher. Falls etwas hakt: Rufen Sie mich gern
kurz an. Herzliche Grüße`,
    copyCount: 23,
    rating: { average: 4.4, count: 11 },
    comments: [
      { author: 'Sophie Klein', role: 'Projektmanagerin', initials: 'SK', date: '2026-07-10', rating: 4.5, text: 'Mein Absicherungsritual bei heiklen Kundenmails. Punkt 2 hat mich schon vor echten Missverständnissen bewahrt.' },
      { author: 'Anna Schreiber', role: 'Content Strategin', initials: 'AS', date: '2026-06-30', rating: 4.2, text: 'Die Kürzungs-Regel ist klug — sonst wird aus diplomatisch schnell schwammig.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'tonalitaets-check',
    skillRefName: 'Tonalitäts-Check'
  },

  {
    id: 'umfrage-fragen',
    name: 'Umfrage-Fragen ohne Schieflage',
    tagline: 'Fragebogen-Entwurf mit eingebauter Methodenprüfung — keine Suggestivfragen, keine Doppeldeutigkeiten.',
    taskGroup: 'texten',
    platforms: { langdock: true },
    difficulty: 'advanced',
    tags: ['umfrage', 'marktforschung', 'insights', 'fragebogen'],
    promptText: `Du bist Marktforscher:in mit Erfahrung im Fragebogen-Design. Ich plane eine Befragung zu [THEMA] bei [ZIELGRUPPE]. Erkenntnisziel: [WAS-WIR-HERAUSFINDEN-WOLLEN].

Entwickle 8–10 Fragen: überwiegend geschlossene Fragen mit ausformulierten Antwortskalen, dazu maximal 2 offene Fragen.

Regeln:
- Keine Suggestivfragen („Wie sehr schätzen Sie …?“)
- Keine doppelläufigen Fragen (zwei Dinge in einer Frage)
- Alltagssprache statt Fachjargon — die Befragten sind keine Expert:innen

Gib zu jeder Frage in einem Halbsatz an, welche Auswertung sie später ermöglicht. Nenne am Ende die 2 größten Verzerrungsrisiken dieser Befragung und wie die Fragereihenfolge sie abmildert.`,
    warum: 'Die expliziten Verbotsregeln adressieren genau die zwei Fehler, die KI-generierte (und menschliche) Fragebögen am häufigsten ruinieren: Suggestion und Doppelläufigkeit. Der „Wozu dient diese Frage?“-Halbsatz erzwingt Rückwärtsdenken von der Auswertung her — Fragen ohne Auswertungsziel fliegen so von selbst raus. Die Verzerrungs-Reflexion am Ende macht aus dem Entwurf ein methodisch begründbares Dokument.',
    exampleOutput: `BEFRAGUNG: Warum kündigen Nutzer:innen die Veloru-App nach dem Probemonat?

F3 (geschlossen): „Wie oft haben Sie die App im Probemonat geöffnet?“
   täglich / mehrmals pro Woche / etwa wöchentlich / seltener / gar nicht
   → ermöglicht: Kündiger nach Nutzungsintensität segmentieren

F4 (geschlossen): „Welche Funktion haben Sie am häufigsten genutzt?“
   Routenplanung / Akku-Übersicht / Werkstatt-Buchung / Community / keine
   → ermöglicht: Zusammenhang Kündigungsgrund ↔ Kernfunktion prüfen

F8 (offen): „Was hätte anders sein müssen, damit Sie geblieben wären?“
   → ermöglicht: Kündigungsgründe finden, die unsere Antwortlisten nicht abdecken

VERZERRUNGSRISIKEN: 1) Nur Reagierer antworten — die Verärgertsten und die
Wohlwollendsten. Abmilderung: neutrale Nutzungsfragen vor Bewertungsfragen.
2) F8 zu früh gestellt färbt alle Folgeantworten — deshalb steht sie am Ende.`,
    copyCount: 6,
    rating: { average: 4.1, count: 6 },
    comments: [
      { author: 'Christopher Kipp', role: 'Innovation Lead', initials: 'CK', date: '2026-07-03', rating: 4.3, text: 'Nutzen wir für interne Feedback-Umfragen. Die Verzerrungs-Sektion hebt das Ergebnis über Bauchgefühl-Niveau.' },
      { author: 'Lukas Weber', role: 'SEO Strategist', initials: 'LW', date: '2026-06-21', rating: 3.9, text: 'Gute Basis. Für echte Kundenstudien lasse ich die Skalen danach nochmal vom Insights-Team prüfen.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'markt-research',
    skillRefName: 'Markt-Research'
  },

  {
    id: 'bildbrief',
    name: 'Bildbrief für das Design-Team',
    tagline: 'So präzise briefen, dass zwei Designer:innen unabhängig voneinander ähnliche Entwürfe liefern würden.',
    taskGroup: 'gestalten',
    platforms: { langdock: true },
    difficulty: 'advanced',
    tags: ['briefing', 'design', 'bildsprache', 'kampagne', 'art-direction'],
    promptText: `Du bist Art Buyer:in in einer Agentur und schreibst einen Bildbrief an das Design-Team.

Kampagne: [KAMPAGNE-KUNDE]
Kernbotschaft: [KERNBOTSCHAFT]
Zielgruppe: [ZIELGRUPPE]
Kanäle/Formate: [KANAELE-FORMATE]

Erstelle den Bildbrief mit diesen Abschnitten:
1) Bildidee in einem Satz
2) Stimmung & Lichtführung
3) Bildaufbau: Vordergrund, Mittelgrund, Hintergrund — und wo Platz für Headline und Logo bleibt
4) Farbwelt, mit Bezug zum CI: [CI-FARBEN-FALLS-BEKANNT]
5) No-Gos: was das Motiv auf keinen Fall zeigen darf
6) Drei Referenz-Beschreibungen im Stil von „so ähnlich wie …, aber …“

Qualitätsmaßstab: So präzise schreiben, dass zwei verschiedene Designer:innen unabhängig voneinander ähnliche Entwürfe liefern würden.`,
    warum: 'Der Qualitätsmaßstab am Ende ist der eigentliche Trick: „Zwei Designer:innen, ähnliche Entwürfe“ gibt der KI ein prüfbares Kriterium für Präzision — vage Adjektive („modern“, „emotional“) fallen daran durch. Die Abschnitte 3 und 5 erzwingen die Angaben, die in echten Briefings am häufigsten fehlen: Layout-Reserven für Text und explizite No-Gos.',
    exampleOutput: `BILDBRIEF — Quellgold „Echte Pause“, OOH + Social

1) BILDIDEE: Eine Person hat mitten im hektischen Umfeld einen sichtbar
   ruhigen Moment — die Welt um sie herum ist bewegungsunscharf, sie nicht.

2) STIMMUNG & LICHT: Später Nachmittag, warmes Seitenlicht, keine Studio-
   Anmutung. Die Ruhe kommt aus der Haltung, nicht aus einem leeren Set.

3) BILDAUFBAU: Vordergrund rechts die Person mit Flasche (Etikett lesbar,
   nicht frontal-werblich). Mittelgrund: unscharfe Passanten. Oberes Drittel
   bleibt ruhig für die Headline, Logo-Reserve unten rechts.

4) FARBWELT: Warme Naturtöne, das Quellgold-Gelbgold als Akzent auf Etikett
   und Headline — kein kühles Blau, das die Kategorie sonst dominiert.

5) NO-GOS: kein inszeniertes Lachen in die Kamera, keine Berg-/Quell-Klischees,
   kein Kondenswasser-Overkill, keine sterile Büro-Szene.

6) REFERENZ: „So ähnlich wie die ruhigen Momente in Bahn-Werbung —
   aber urban, ohne Reise-Kontext und ohne Sehnsuchts-Pathos.“`,
    copyCount: 8,
    rating: { average: 4.2, count: 5 },
    comments: [
      { author: 'Mia Hoffmann', role: 'Senior UX Designerin', initials: 'MH', date: '2026-07-06', rating: 4.5, text: 'Endlich Briefings, in denen steht, wo die Headline hin soll. Abschnitt 3 sollte Pflicht sein.' },
      { author: 'Anna Schreiber', role: 'Content Strategin', initials: 'AS', date: '2026-06-26', rating: 4.1, text: 'Die No-Gos sparen eine komplette Korrekturschleife. Aus Erfahrung.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'moodboard',
    skillRefName: 'Moodboard-Generator'
  },

  {
    id: 'storyboard-rohfassung',
    name: 'Storyboard-Rohfassung für einen Spot',
    tagline: 'Von der Idee zur Szenen-Tabelle — mit Dramaturgie-Regeln, die für Social wirklich gelten.',
    taskGroup: 'gestalten',
    platforms: { langdock: true },
    difficulty: 'advanced',
    tags: ['storyboard', 'video', 'bewegtbild', 'social', 'dramaturgie'],
    promptText: `Du bist Creative Producer:in. Erstelle eine Storyboard-Rohfassung für einen [LAENGE, z. B. 20-sekündigen] Spot für [KUNDE-PRODUKT].

Kernbotschaft: [KERNBOTSCHAFT]
Zielgruppe: [ZIELGRUPPE]
Kanal: [KANAL, z. B. Instagram Reels]

Gliedere in 5–7 Szenen als Tabelle: Szene | Dauer (Sek.) | Bild (was sehen wir?) | Ton/Voiceover | Text-Einblendung.

Dramaturgie-Vorgaben:
- Die ersten 3 Sekunden müssen ohne Ton funktionieren und einen Grund zum Weiterschauen liefern.
- Die Marke taucht frühestens in Szene [MARKEN-EINSTIEG-SZENE] auf.
- Der Spot endet mit: [CALL-TO-ACTION].

Schlage danach eine alternative Eröffnungsszene vor, falls die erste zu erwartbar ist — und sag ehrlich, welche der beiden du produzieren würdest.`,
    warum: 'Die Tabellen-Struktur trennt sauber, was in Bewegtbild-Briefings gern verschwimmt: Bild, Ton und Text-Ebene pro Szene. Die Dramaturgie-Vorgaben kodieren echtes Plattform-Wissen als harte Regeln („3 Sekunden ohne Ton“ — die Realität stummer Feeds), statt auf den Geschmack der KI zu hoffen. Die erzwungene Alternative zur Eröffnung liefert dir automatisch eine zweite Option für die Kreativ-Abstimmung.',
    exampleOutput: `SPOT: Veloru E-Bikes, 20 Sek., Instagram Reels — „Der Berg ist jetzt flach“

| Sz | Sek | Bild                          | Ton/VO              | Text-Einblendung     |
|----|-----|-------------------------------|---------------------|----------------------|
| 1  | 0–3 | POV Lenker: steile Straße     | (stumm wirksam)     | „Kennst du die?“     |
|    |     | kippt ins Bild, Fahrerin      | leises Atmen        |                      |
|    |     | schaltet NICHT ab             |                     |                      |
| 2  | 3–7 | Gesicht: kein Kampf, Grinsen  | Musik setzt ein     | —                    |
| 3  | 7–12| Seitenfahrt: sie überholt     | VO: „Gleiche        | —                    |
|    |     | einen Rennradfahrer bergauf   | Straße. Neuer Tag.“ |                      |
| 4  | 12–16| Ankunft oben, Blick zurück   | Musik-Peak          | „Der Berg ist        |
|    |     | Veloru-Logo am Rahmen sichtbar|                     | jetzt flach.“        |
| 5  | 16–20| Packshot Bike + App          | VO: CTA             | „Probefahrt buchen“  |

ALTERNATIVE ERÖFFNUNG: Rennradfahrer-POV, der überholt WIRD — ich würde die
Original-Szene 1 nehmen: POV erzeugt mehr Identifikation als Schadenfreude.`,
    copyCount: 4,
    rating: { average: 4.1, count: 4 },
    comments: [
      { author: 'Anna Schreiber', role: 'Content Strategin', initials: 'AS', date: '2026-07-01', rating: 4.3, text: 'Die Rohfassung ersetzt kein Kreativ-Team, aber sie macht das erste Meeting doppelt so konkret.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'briefing-gen',
    skillRefName: 'Briefing Generator'
  },

  {
    id: 'management-sprache',
    name: 'Reporting-Zahlen in Management-Sprache',
    tagline: 'Aus Rohzahlen wird ein Absatz, den auch Entscheider ohne Media-Wissen verstehen — ohne Beschönigung.',
    taskGroup: 'praesentieren',
    platforms: { langdock: true },
    difficulty: 'easy',
    tags: ['reporting', 'management', 'zahlen', 'kundenkommunikation'],
    promptText: `Du bist Beratungs-Direktor:in und übersetzt Kampagnen-Reportings für Entscheider:innen ohne Media-Fachwissen.

Unten stehen die Rohzahlen aus [ZEITRAUM] für [KUNDE-KAMPAGNE]. Schreibe daraus einen Management-Absatz (maximal 120 Wörter) plus 3 Bullet-Takeaways.

Regeln:
- Jede genannte Zahl braucht einen Vergleichspunkt: Vormonat, Ziel oder Benchmark. Nackte Zahlen sind verboten.
- Fachbegriffe übersetzen: statt „CTR 2,1 %“ → „von 100 Personen, die die Anzeige sahen, haben 2 geklickt“.
- Keine Beschönigung: Was unter Ziel liegt, klar benennen — aber immer mit dem nächsten Schritt verbinden.

Zahlen:
[REPORTING-ZAHLEN]`,
    warum: 'Die Vergleichspunkt-Pflicht ist die Kernregel: Eine Zahl ohne Referenz ist für Fachfremde bedeutungslos — mit dieser Regel kann die KI gar keine leeren Zahlenreihen produzieren. Die Übersetzungs-Vorgabe mit Beispiel (Few-Shot im Kleinen) zeigt konkret, wie „übersetzen“ gemeint ist. Und die Nicht-Beschönigen-Regel plus Pflicht zum nächsten Schritt hält die Zusammenfassung ehrlich, ohne sie destruktiv zu machen.',
    exampleOutput: `MANAGEMENT-SUMMARY — Quellgold Sommerkampagne, Juni

Die Kampagne erreicht mehr Menschen als geplant, überzeugt sie aber noch
nicht überall zum Klick. 4,2 Mio. Kontakte liegen 12 % über Ziel — der
Mediaeinkauf war günstiger als kalkuliert. Von 100 Personen, die eine
Anzeige sahen, klickten allerdings nur knapp 1 (Ziel: 2). Auffällig: Auf
YouTube schauen 68 von 100 das Video zu Ende (Benchmark: 45) — die Botschaft
trägt, der Klick-Anreiz fehlt. Nächster Schritt: In KW 30 testen wir zwei
neue Endcards mit klarerer Handlungsaufforderung.

• Reichweite 12 % über Ziel bei geringeren Kosten
• Klickrate bei der Hälfte des Ziels — Endcard-Test startet KW 30
• Videobotschaft funktioniert nachweislich (68 % sehen bis zum Ende)`,
    copyCount: 25,
    rating: { average: 4.5, count: 13 },
    comments: [
      { author: 'Sophie Klein', role: 'Projektmanagerin', initials: 'SK', date: '2026-07-11', rating: 4.7, text: 'Mein Freitag-Ritual: Zahlen rein, Management-Absatz raus, einmal gegenlesen. Spart mir jede Woche eine Stunde.' },
      { author: 'Lukas Weber', role: 'SEO Strategist', initials: 'LW', date: '2026-06-28', rating: 4.4, text: 'Die Vergleichspunkt-Regel sollte in jedem Reporting gelten, auch ohne KI.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'report-summary',
    skillRefName: 'Report Summarizer'
  },

  {
    id: 'csv-erklaeren',
    name: 'CSV-Datei erklären lassen',
    tagline: 'Wirf Claude Code eine Export-Datei hin und bekomme Überblick, Auffälligkeiten und Datenprobleme — mit Belegen.',
    taskGroup: 'praesentieren',
    platforms: { code: true },
    difficulty: 'easy',
    tags: ['daten', 'csv', 'analyse', 'claude-code', 'exploration'],
    promptText: `Im Projektordner liegt die Datei [DATEINAME.CSV]. Verschaffe mir einen Überblick:

1) Was steht in dieser Tabelle — welche Spalten gibt es und was bedeuten sie vermutlich?
2) Wie viele Zeilen sind es, und welcher Zeitraum ist abgedeckt?
3) Nenne die 3 auffälligsten Muster oder Ausreißer — und zeige zu jedem die konkreten Zeilen aus der Datei als Beleg.
4) Welche Datenprobleme siehst du: Lücken, Dubletten, unplausible Werte?

Wichtig: Unterscheide klar zwischen dem, was in den Daten steht, und dem, was du daraus vermutest. Verändere die Datei nicht.`,
    warum: 'Die Beleg-Pflicht in Punkt 3 ist der Halluzinations-Schutz: Jede behauptete Auffälligkeit muss mit echten Zeilen aus der Datei unterlegt sein — was Claude nicht belegen kann, kann es nicht behaupten. Die Steht-drin-vs.-Vermutung-Trennung trainiert nebenbei einen gesunden Umgang mit KI-Analysen. Das Änderungsverbot macht den Prompt gefahrlos wiederholbar.',
    exampleOutput: `DATEI: kampagnen-export-juni.csv — 1.847 Zeilen, 1.–30. Juni

SPALTEN (steht in den Daten): datum, kanal, kampagne, impressions, klicks,
kosten_eur. Vermutung: Der Export kommt aus dem Kampagnen-Tool, eine Zeile
pro Kanal und Tag.

AUFFÄLLIGKEITEN
1. Am 14.6. und 15.6. fehlen alle Social-Zeilen komplett (Beleg: zwischen
   Zeile 802 und 803 springt das Datum). Vermutung: Tracking-Ausfall.
2. Zeile 1.204: 412.000 Impressions bei 3,20 € Kosten — das Hundertfache
   des Tagesdurchschnitts. Vermutlich ein Komma-/Einheitenfehler im Export.
3. „Display“ und „display“ tauchen als getrennte Kanäle auf (Zeilen 88 ff.
   vs. 1.400 ff.) — jede Auswertung nach Kanal zählt hier doppelt.

EMPFEHLUNG: Erst 1–3 klären, dann auswerten. Sag Bescheid, wenn ich dir
eine bereinigte Kopie (Original bleibt unberührt) anlegen soll.`,
    copyCount: 14,
    rating: { average: 4.4, count: 8 },
    comments: [
      { author: 'Jan Richter', role: 'Tech Lead & Citizen-Coding-Mentor', initials: 'JR', date: '2026-07-09', rating: 4.5, text: 'Die Beleg-Pflicht macht den Unterschied zwischen Analyse und Anekdote.' },
      { author: 'Lukas Weber', role: 'SEO Strategist', initials: 'LW', date: '2026-06-30', rating: 4.3, text: 'Findet in jedem Export die Groß-/Kleinschreibungs-Dubletten, die mir Auswertungen zerschossen haben.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'daten-aufbereiten',
    skillRefName: 'Daten aufbereiten'
  },

  {
    id: 'pitch-einstieg',
    name: 'Pitch-Einstieg dramaturgisch',
    tagline: 'Drei erprobte Dramaturgien für die ersten zwei Minuten — im Wortlaut, nicht als Stichwortliste.',
    taskGroup: 'praesentieren',
    platforms: { langdock: true },
    difficulty: 'advanced',
    tags: ['pitch', 'praesentation', 'dramaturgie', 'new-business'],
    promptText: `Du bist Pitch-Coach für Agentur-Präsentationen. Wir pitchen bei [KUNDE] zum Thema [AUFGABE-IN-EINEM-SATZ]. Unser strategischer Kerngedanke: [KERNGEDANKE]. Im Raum sitzen: [PUBLIKUM].

Entwickle 3 unterschiedliche dramaturgische Einstiege für die ersten 2 Minuten:
a) Einstieg über eine unbequeme Wahrheit aus der Welt des Kunden
b) Einstieg über eine konkrete Szene aus dem Alltag der Zielgruppe
c) Einstieg über eine überraschende Zahl (nur echte, dir bekannte Zahlen — sonst markiere die Stelle im Text deutlich mit „Zahl noch prüfen“)

Pro Variante:
- Die ersten 3 gesprochenen Sätze im Wortlaut
- Das erste Chart, beschrieben in einem Satz (nicht gestaltet)
- Die Brücke zum Kerngedanken, in einem Satz

Bewerte am Ende in je einem Satz, welcher Einstieg zu welchem Publikumstyp passt — und welchen du bei diesem Publikum wählen würdest.`,
    warum: 'Die drei vorgegebenen Dramaturgie-Muster sind erzwungene Vielfalt: Sie zwingen zu echt unterschiedlichen Ansätzen statt dreier Variationen derselben Idee. „Im Wortlaut“ ist die entscheidende Format-Vorgabe — gesprochene Sätze lassen sich proben und bewerten, Stichpunkte nicht. Und die Anweisung, ungesicherte Zahlen als „Zahl noch prüfen“ zu markieren, baut den Fakten-Check direkt in den Prompt ein, statt erfundene Statistiken zu riskieren.',
    exampleOutput: `VARIANTE B — Szene aus dem Alltag (Pitch: Stadtwerke Nordheide, Ökostrom-Tarif)

Gesprochen: „Es ist Dienstag, 19:40 Uhr. Lena, 34, hat die Kinder ins Bett
gebracht und öffnet zum dritten Mal in diesem Monat den Tarifvergleich.
Nach vier Minuten macht sie ihn wieder zu — nicht weil es zu teuer ist,
sondern weil sie niemandem dort glaubt.“

Erstes Chart: Ein einziger Satz auf dunklem Grund: „Das Problem ist nicht
der Preis. Es ist das Misstrauen.“

Brücke: „Und genau deshalb reden wir heute nicht über Rabatte, sondern
darüber, wie die Stadtwerke das einzige Energieversprechen abgeben, das
man überprüfen kann.“

PASSUNG: B für gemischte Runden mit Marketing-Beteiligung; bei einem rein
kaufmännischen Vorstand Variante c — dann zieht die Zahl.`,
    copyCount: 7,
    rating: { average: 4.0, count: 6 },
    comments: [
      { author: 'Christopher Kipp', role: 'Innovation Lead', initials: 'CK', date: '2026-07-07', rating: 4.4, text: '„Im Wortlaut“ ist der Unterschied zwischen einem Konzept und etwas, das man am nächsten Tag proben kann.' },
      { author: 'Mia Hoffmann', role: 'Senior UX Designerin', initials: 'MH', date: '2026-06-25', rating: 3.8, text: 'Gute Rohlinge. Die Szenen brauchen danach noch echtes Kunden-Detail, sonst bleiben sie austauschbar.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'slides-aus-daten',
    skillRefName: 'Slides aus Daten'
  },

  {
    id: 'persona-schaerfen',
    name: 'Zielgruppen-Persona schärfen',
    tagline: 'Macht aus der glatten Allerwelts-Persona eine Person mit Widersprüchen, Verhalten und prüfbaren Annahmen.',
    taskGroup: 'media',
    platforms: { langdock: true },
    difficulty: 'advanced',
    tags: ['persona', 'zielgruppe', 'strategie', 'insights'],
    promptText: `Du bist Stratege:in in einer Media-Agentur. Unten steht unsere bisherige Zielgruppen-Beschreibung für [KUNDE-PRODUKT]. Sie ist zu glatt. Schärfe sie:

1) Streiche alles, was auf praktisch jede Zielgruppe zutrifft — und benenne diese Allerwelts-Aussagen ehrlich („trifft auf 80 % aller Deutschen zu“).
2) Formuliere zu jedem verbliebenen Merkmal ein konkretes Verhalten im Alltag: statt „preisbewusst“ → „bucht Urlaub erst nach drei Vergleichsportalen“.
3) Ergänze: das zentrale Spannungsfeld der Person (was sie will vs. was sie tatsächlich tut), drei Medienmomente eines typischen Tages und einen Satz, den diese Person wirklich sagen würde.
4) Liste 3 Annahmen aus dieser Persona, die wir mit Daten prüfen sollten, bevor wir sie dem Kunden zeigen.

Bisherige Beschreibung:
[PERSONA-ENTWURF]`,
    warum: 'Der Prompt arbeitet mit Negativ-Filterung: Erst wird das Austauschbare aktiv entfernt („trifft auf 80 % zu“) — das ist wirksamer, als um „mehr Tiefe“ zu bitten. Die Merkmal-zu-Verhalten-Übersetzung mit eingebautem Beispiel (Few-Shot) macht Eigenschaften kampagnenfähig, weil Verhalten targetierbar ist und Adjektive nicht. Punkt 4 kennzeichnet die Persona ehrlich als Hypothese statt als Wahrheit.',
    exampleOutput: `PERSONA GESCHÄRFT — Kornwerk Müsli, „Bewusste Berufstätige“

GESTRICHEN (Allerwelts-Aussagen): „legt Wert auf Qualität“, „ist viel
online“, „achtet auf ihre Gesundheit“ — trifft auf nahezu alle Käufergruppen zu.

VERHALTEN STATT ADJEKTIV:
- „ernährungsbewusst“ → liest im Laden die Zutatenliste, aber nur die ersten
  drei Zutaten; bricht bei mehr als einem unbekannten Begriff ab
- „nachhaltig orientiert“ → zahlt 50 Cent mehr für regional, aber nicht 2 Euro

SPANNUNGSFELD: Will sich morgens Zeit fürs Frühstück nehmen — isst aber an
3 von 5 Arbeitstagen am Schreibtisch. Kauft das Müsli fürs Wunsch-Ich.

SATZ, DEN SIE SAGEN WÜRDE: „Ich will nicht nachdenken müssen, ob das Zeug
okay ist — das soll einfach stimmen.“

ZU PRÜFENDE ANNAHMEN: 1) Kauft sie wirklich im Supermarkt, nicht online?
2) Ist der Preis-Schmerzpunkt real bei ~4,50 €? 3) Morgens erreichbar — oder
ist der Pendel-Podcast der einzige Medienmoment mit Aufmerksamkeit?`,
    copyCount: 13,
    rating: { average: 4.2, count: 7 },
    comments: [
      { author: 'Lukas Weber', role: 'SEO Strategist', initials: 'LW', date: '2026-07-05', rating: 4.4, text: 'Verhalten statt Adjektive — daraus kann ich Kanäle und Suchintentionen ableiten. Aus „qualitätsbewusst“ nicht.' },
      { author: 'Anna Schreiber', role: 'Content Strategin', initials: 'AS', date: '2026-06-27', rating: 4.2, text: 'Der Satz, den die Person wirklich sagen würde, ist der beste Tonalitäts-Test für jede Copy.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'persona-builder',
    skillRefName: 'Persona-Builder'
  },

  {
    id: 'wettbewerber-werbung',
    name: 'Wettbewerber-Werbung analysieren',
    tagline: 'Strukturierte Konkurrenz-Analyse, die sauber trennt: Was ist belegt, was ist Spekulation — und wo ist die Lücke?',
    taskGroup: 'media',
    platforms: { langdock: true, code: true },
    difficulty: 'advanced',
    tags: ['wettbewerb', 'analyse', 'werbung', 'strategie', 'positionierung'],
    promptText: `Du bist Werbe-Analyst:in. Unten beschreibe ich [ANZAHL] Anzeigen von [WETTBEWERBER] — Texte, Motive und Kanäle, soweit bekannt.

Analysiere strukturiert:
1) Welches Kernversprechen fährt der Wettbewerber, und an wen richtet es sich erkennbar?
2) Welche Machart wiederholt sich über die Anzeigen hinweg — Tonalität, Bildwelt, Formate?
3) Was lässt sich daraus über die dahinterliegende Strategie ableiten? Markiere dabei jede Ableitung als „belegt durch Anzeige X“ oder „Spekulation“.
4) Die Lücke: Welche Botschaft oder Zielgruppe besetzt der Wettbewerber NICHT, die [UNSER-KUNDE] glaubwürdig besetzen könnte?

Format: kurze Analyse pro Punkt, dann ein 5-Zeilen-Fazit, das ich so in den Kunden-Jour-fixe mitnehmen kann.

Anzeigen:
[ANZEIGEN-BESCHREIBUNGEN]`,
    warum: 'Die Belegt-oder-Spekulation-Markierung ist die zentrale Technik: Sie erlaubt der KI, Hypothesen zu bilden (das ist ihr Mehrwert), zwingt sie aber, deren Status offenzulegen — so wird die Analyse im Kundengespräch verteidigbar. Die Lücken-Frage in Punkt 4 dreht die Analyse vom Beschreiben ins Verwertbare: Konkurrenzbeobachtung ist nur so viel wert wie die Chance, die sie aufzeigt.',
    exampleOutput: `WETTBEWERBS-BLICK: „PurAqua“ (6 Anzeigen, Mai–Juli)

1) KERNVERSPRECHEN: Leistung — „Hydration für Menschen, die Ziele haben“.
   Richtet sich erkennbar an sportlich-ambitionierte 20–35-Jährige.
2) MACHART: Immer Einzelpersonen im Workout, kühle Blautöne, harte Schnitte,
   Produkt als Trophäe am Ende. Kein einziges soziales Setting.
3) STRATEGIE: Positionierung als Sport-Utility statt Alltagsgetränk (belegt
   durch Anzeigen 1–5). Vermutlich Vorbereitung einer Functional-Range mit
   Zusätzen (Spekulation — gestützt nur auf den Claim in Anzeige 6).
4) DIE LÜCKE: PurAqua zeigt nie Alltag, nie Gemeinschaft, nie Ruhe. Quellgold
   kann „das Wasser für die Pause dazwischen“ besetzen — glaubwürdig, weil
   die eigene Bildwelt schon dort ist.

FAZIT FÜRS JOUR-FIXE: PurAqua kauft die Leistungs-Nische. Nicht folgen —
die Alltagslücke ist größer und unbesetzt.`,
    copyCount: 10,
    rating: { average: 4.3, count: 6 },
    comments: [
      { author: 'Lukas Weber', role: 'SEO Strategist', initials: 'LW', date: '2026-07-08', rating: 4.5, text: 'Die Spekulations-Markierung hat mir im Kundentermin den Rücken gerettet, als nach Quellen gefragt wurde.' },
      { author: 'Christopher Kipp', role: 'Innovation Lead', initials: 'CK', date: '2026-06-29', rating: 4.2, text: 'Punkt 4 ist der Unterschied zwischen Beobachten und Beraten.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'markt-research',
    skillRefName: 'Markt-Research'
  },

  {
    id: 'kampagnen-learnings',
    name: 'Kampagnen-Learnings strukturieren',
    tagline: 'Aus dem Notiz-Wust nach Kampagnenende werden maximal 7 Learnings, die auch in 6 Monaten noch tragen.',
    taskGroup: 'media',
    platforms: { langdock: true, code: true },
    difficulty: 'advanced',
    tags: ['learnings', 'kampagne', 'retrospektive', 'wissensmanagement'],
    promptText: `Du bist Media-Berater:in und bereitest den Abschluss-Termin für [KAMPAGNE-KUNDE] vor. Unten stehen unsortierte Notizen aus dem Kampagnenverlauf: Zahlen, Beobachtungen, Team-Feedback.

Strukturiere sie zu Learnings, pro Learning genau so:
- Kernaussage in einer Zeile
- Beleg aus den Notizen (wörtlich oder als Zahl)
- Konsequenz für die nächste Kampagne: „Beim nächsten Mal: …“

Regeln:
- Trenne strikt in drei Blöcke: „Hat funktioniert“ / „Hat nicht funktioniert“ / „Können wir nicht bewerten (fehlende Daten)“.
- Maximal 7 Learnings — wähle die mit der größten Wiederverwendbarkeit, nicht die dramatischsten.
- Formuliere zum Schluss die 2 wichtigsten Learnings als Sätze, die auch in 6 Monaten ohne jeden Kontext verständlich sind.

Notizen:
[NOTIZEN]`,
    warum: 'Das Learning-Schema (Aussage → Beleg → Konsequenz) verhindert die zwei häufigsten Retro-Fehler: Behauptungen ohne Grundlage und Erkenntnisse ohne Folgen. Der dritte Block „können wir nicht bewerten“ ist ungewöhnlich und wertvoll — er verhindert, dass die KI aus dünnen Daten trotzdem ein Urteil presst. Die 6-Monate-Regel erzwingt kontextfreie Formulierungen, also genau die Form, in der Learnings wirklich wiederverwendbar sind.',
    exampleOutput: `LEARNINGS — Veloru Herbstkampagne 2026

HAT FUNKTIONIERT
1. Händler-Kooperation schlägt reine Awareness.
   Beleg: 61 % der Probefahrt-Buchungen kamen über die 12 Händler-Landingpages.
   Beim nächsten Mal: Händler-Seiten von Tag 1 an einplanen, nicht ab Woche 3.

HAT NICHT FUNKTIONIERT
2. Ein Motiv für alle Kanäle.
   Beleg: Das OOH-Motiv erzielte als Social-Asset nur ein Drittel der
   Interaktionsrate der nativ produzierten Reels.
   Beim nächsten Mal: Pro Kanal mindestens ein natives Format budgetieren.

KÖNNEN WIR NICHT BEWERTEN
3. Podcast-Wirkung — der Rabattcode wurde auch außerhalb der Podcast-
   Zielgruppe geteilt; die Zahlen sind nicht zuordenbar.
   Beim nächsten Mal: kanalexklusive Codes vergeben.

IN 6 MONATEN NOCH VERSTÄNDLICH: „Native Formate pro Kanal schlagen adaptierte
Motive deutlich.“ / „Vertriebspartner-Seiten gehören in Phase 1, nicht Phase 2.“`,
    copyCount: 12,
    rating: { average: 4.3, count: 9 },
    comments: [
      { author: 'Sophie Klein', role: 'Projektmanagerin', initials: 'SK', date: '2026-07-12', rating: 4.6, text: 'Der „Können wir nicht bewerten“-Block ist ehrlicher als jede Retro, die ich vorher moderiert habe.' },
      { author: 'Lukas Weber', role: 'SEO Strategist', initials: 'LW', date: '2026-07-02', rating: 4.1, text: 'Die 6-Monate-Regel klingt banal, aber genau daran scheitern sonst alle Learnings-Dokumente.' }
    ],
    addedAt: '2026-07-16',
    skillRef: 'campaign-check',
    skillRefName: 'Campaign Checker'
  }

];
