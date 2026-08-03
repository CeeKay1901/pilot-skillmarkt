// pilot AI Marketplace — Lernen-Sektion: RESSOURCEN (ausgelagerte Daten, Etappe E5).
// Klassisches Script, definiert globale Konstanten:
//   RESSOURCEN       — 19 kuratierte Lern-Ressourcen (16 externe + 3 interne Platzhalter).
//                      Externe Links wurden am 2026-07-17 verifiziert (Erreichbarkeit,
//                      Titel, Anbieter/Kanal, Dauer — YouTube per oEmbed + Watch-Page,
//                      Doku/Artikel per Volltext-Abruf); code-how-it-works am 2026-07-23
//                      (E12-Kuratierung), doku-claude-code am 2026-08-03.
//                      Redaktionsquellen: E5-Faktenblätter.
//   RESSOURCE_TYPEN  — Typ-Labels fürs UI (Reihenfolge = Tab-Reihenfolge)
//
// KURATIONS-PASS 2026-08-03: Von 28 auf 19 gestrafft. Gestrichen wurden zehn
// Einträge, die entweder dasselbe Thema doppelt abdeckten (drei weitere deutsche
// Einsteiger-Videos neben dem Grundkurs, zwei weitere Anthropic-Doku-Seiten neben
// Terminal-Guide und Best Practices) oder deutlich über dem Niveau der Gruppe
// lagen (die beiden mehrstündigen Skilljar-Kurse). Neu dazu: doku-claude-code —
// die Startseite der offiziellen Doku stand vorher nur im Seitenfuß und gehört
// als nachschlagbare Quelle ins Regal.
// Der Typ 'kurs' hat damit vorerst KEINEN Eintrag mehr. Er bleibt trotzdem in
// RESSOURCE_TYPEN: renderCatTabs() blendet Tabs mit Zähler 0 von selbst aus, und
// der nächste Kurs braucht dann keine Code-Änderung.
//
// Felder je Eintrag:
//   id            URL-tauglich, eindeutig (Deep-Link lernen-hilfe.html?r=<id>)
//   titel         redaktioneller Titel (nicht zwingend der Original-Seitentitel)
//   url           VERIFIZIERT erreichbar; null nur bei typ 'intern' (Platzhalter)
//   typ           'video' | 'artikel' | 'doku' | 'kurs' | 'podcast' | 'intern'
//   niveau        'einsteiger' | 'fortgeschritten'
//   dauerMin      Zahl in Minuten. Videolängen exakt von YouTube; dauerCa: true =
//                 konservative Schätzung (Lesezeit bzw. Anbieter-Angabe);
//                 dauerProFolge: true = Podcast, Angabe gilt pro Folge.
//   sprache       'de' | 'en'
//   plattform     'code' | 'langdock' | 'allgemein'
//   quelle        Anbieter/Kanal, wie verifiziert
//   fuerDich      der 1-Satz-Kompass („Für dich, wenn …“) — Pflicht
//   beschreibung  2–3 ehrliche Sätze, was drin ist (und was nicht)
//   gelernt       optional: „Das nimmst du mit“-Liste
//   intern        true nur bei den 3 pilot-Platzhaltern; UI kennzeichnet klar, kein Link,
//                 KEINE seeded Bewertung/Stimmen (eine Bewertung für etwas, das noch
//                 niemand gesehen hat, wäre unehrlich — Plan §1.1)
//   geprueft      Datum des Link-Checks (nur externe)
//   rating        Alt-Seed { average, count } — seit der Upvote-Umstellung liest ihn
//                 keine Anzeige/Sortierung mehr; bleibt als Seed-Fallback-Historie.
//                 Redaktionelle Demo-Werte, auf der Seite gekennzeichnet.
//   votes         Seed „Das hat mir geholfen“ (Demo-Wert, gekennzeichnet).
//                 Anzeige = getVotes('ressource', id, votes) — getrennt vom Rating.
//   votesRecent   Seed „Stimmen der letzten 90 Tage“ (Teilmenge von votes; Demo-Wert).
//                 Gelesen von bestRated() in shared/base.js: Der Rotations-Pool der
//                 Startseite ist Top-n nach GESAMT vereinigt mit Top-n nach RECENT.
//                 Ohne dieses Feld besteht der Pool nur aus der Gesamt-Hälfte und die
//                 Rotation steht still. Die beiden Ranglisten sind daher bewusst
//                 verschieden gestaffelt — was insgesamt vorn liegt, ist nicht
//                 automatisch das, was zuletzt gefragt war.
//   stimmen       optional: seeded Kurz-Kommentare der PILOTS-Personas
//   addedAt       Aufnahmedatum
//   tags          Suche (searchScore-fieldsOpt)

const RESSOURCE_TYPEN = [
  { id: 'video',   label: 'Videos' },
  { id: 'doku',    label: 'Doku' },
  { id: 'artikel', label: 'Artikel' },
  { id: 'kurs',    label: 'Kurse' },
  { id: 'podcast', label: 'Podcasts' },
  { id: 'intern',  label: 'pilot-intern' }
];

const RESSOURCEN = [

  /* ==================== CLAUDE CODE: EINSTIEG ==================== */

  {
    id: 'code-grundkurs-keil',
    titel: 'Claude Code Grundkurs für Anfänger — alles Wichtige in 25 Minuten',
    url: 'https://www.youtube.com/watch?v=1bzK54GADM4',
    typ: 'video', niveau: 'einsteiger', dauerMin: 25, sprache: 'de', plattform: 'code',
    quelle: 'YouTube — Jonas Keil',
    fuerDich: 'du lieber jemandem 25 Minuten zuschaust, als Doku zu lesen — und sehen willst, dass Claude Code mehr kann als Websites bauen.',
    beschreibung: 'Deutschsprachiger Rundumschlag für den allerersten Kontakt: Was Claude Code ist, Installation, erste Projekte — und ausdrücklich auch Nicht-Programmier-Anwendungen wie Excel-Tabellen und PowerPoints erstellen lassen. Enthält einen kurzen, gekennzeichneten Hosting-Werbeblock.',
    gelernt: ['Was Claude Code ist — und was nicht', 'Installation Schritt für Schritt', 'Erste Projekte ohne Code-Vorwissen (Excel, PowerPoint, Website)'],
    geprueft: '2026-07-17',
    rating: { average: 4.7, count: 18 }, votes: 23, votesRecent: 6,
    stimmen: [
      { text: 'Nach diesem Video habe ich meine erste Excel-Auswertung von Claude bauen lassen. 25 Minuten, die sich lohnen.', autor: 'Sophie Klein', rolle: 'Projektmanagerin' },
      { text: 'Endlich ein Einstieg, der nicht bei „npm install“ anfängt, sondern bei dem, was man damit machen kann.', autor: 'Anna Schreiber', rolle: 'Content Strategin' }
    ],
    addedAt: '2026-07-17',
    tags: ['einstieg', 'grundkurs', 'tutorial', 'excel', 'powerpoint', 'deutsch']
  },
  {
    id: 'code-terminal-guide',
    titel: 'Terminal-Anleitung: Claude Code ohne Vorkenntnisse starten',
    url: 'https://code.claude.com/docs/de/terminal-guide',
    typ: 'doku', niveau: 'einsteiger', dauerMin: 10, dauerCa: true, sprache: 'de', plattform: 'code',
    quelle: 'Anthropic — Claude-Code-Doku',
    fuerDich: 'du beim Wort „Terminal“ bisher an den Flughafen gedacht hast und eine Schritt-für-Schritt-Anleitung ohne Vorwissen brauchst.',
    beschreibung: 'Die offizielle Anthropic-Anleitung für Menschen, die noch nie ein Terminal geöffnet haben: Terminal finden, Claude Code installieren, anmelden, erste Eingaben — getrennt für Mac und Windows, inklusive Lösungen für die häufigsten Fehlermeldungen. Deutsche Version der Doku; einzelne Passagen sind noch auf Englisch.',
    gelernt: ['Terminal öffnen auf Mac und Windows', 'Claude Code installieren und anmelden', 'Die häufigsten Fehlermeldungen selbst lösen'],
    geprueft: '2026-07-17',
    rating: { average: 4.6, count: 12 }, votes: 14, votesRecent: 9,
    stimmen: [
      { text: 'Ich hatte vor diesem Guide noch nie ein Terminal offen. Danach lief Claude Code.', autor: 'Sophie Klein', rolle: 'Projektmanagerin' },
      { text: 'Die Troubleshooting-Abschnitte fangen genau die Fehler ab, die in der Q0-Gruppe wirklich auftraten.', autor: 'Jan Richter', rolle: 'Tech Lead & Citizen-Coding-Mentor' }
    ],
    addedAt: '2026-07-17',
    tags: ['terminal', 'installation', 'einstieg', 'mac', 'windows', 'troubleshooting']
  },

  /* ==================== CLAUDE CODE: VERTIEFUNG ==================== */

  {
    id: 'code-mastering-30min',
    titel: 'Mastering Claude Code in 30 minutes (Boris Cherny, Anthropic)',
    url: 'https://www.youtube.com/watch?v=6eBSHbLKuN0',
    typ: 'video', niveau: 'fortgeschritten', dauerMin: 28, sprache: 'en', plattform: 'code',
    quelle: 'YouTube — Anthropic (offiziell)',
    fuerDich: 'du die Grundlagen kennst und vom Erfinder selbst hören willst, wie man mit Claude Code richtig gut wird.',
    beschreibung: 'Der Kopf hinter Claude Code zeigt in einer halben Stunde, wie das Werkzeug gedacht ist: vom ersten Prompt bis zu fortgeschrittenen Arbeitsweisen. Der meistgesehene offizielle Claude-Code-Vortrag — auf Englisch, aber gut zu folgen. Achtung: Auf YouTube kursieren Kopien unter fremden Kanälen; das hier ist das Original vom Anthropic-Kanal.',
    geprueft: '2026-07-17',
    rating: { average: 4.5, count: 16 }, votes: 21, votesRecent: 4,
    stimmen: [
      { text: 'Nach diesem Video versteht man, warum Claude Code anders tickt als ein Chat-Fenster.', autor: 'Christopher Kipp', rolle: 'Innovation Lead' },
      { text: 'Pflichtprogramm, sobald der erste eigene Prototyp steht.', autor: 'Jan Richter', rolle: 'Tech Lead & Citizen-Coding-Mentor' }
    ],
    addedAt: '2026-07-17',
    tags: ['mastering', 'anthropic', 'boris cherny', 'arbeitsweisen', 'vortrag']
  },
  {
    id: 'code-how-it-works',
    titel: 'So funktioniert Claude Code — die Arbeitsweise verstehen',
    url: 'https://code.claude.com/docs/de/how-claude-code-works',
    typ: 'doku', niveau: 'einsteiger', dauerMin: 15, dauerCa: true, sprache: 'de', plattform: 'code',
    quelle: 'Anthropic — Claude-Code-Doku',
    fuerDich: 'du verstehen willst, warum Claude Code anders tickt als ein Chat-Fenster — auf Deutsch, bevor du dich an die englischen Videos wagst.',
    beschreibung: 'Die offizielle deutsche Doku-Seite, die erklärt, wie Claude Code arbeitet: die „agentische Schleife“ aus Kontext sammeln, handeln und Ergebnis prüfen, welche Werkzeuge Claude nutzt, worauf es in deinem Projekt zugreift und wie Sessions, Kontextfenster und Sicherheits-Checkpoints zusammenhängen. Genau das Hintergrundwissen, das erklärt, warum die Befehle auf dieser Seite überhaupt nötig sind. Deutsche Doku-Version; einzelne Fachbegriffe bleiben englisch.',
    gelernt: ['Was die „agentische Schleife“ ist — und warum Claude Schritt für Schritt arbeitet', 'Worauf Claude Code in deinem Projekt zugreift', 'Wie Sessions, Kontextfenster und Checkpoints zusammenspielen'],
    geprueft: '2026-07-23',
    rating: { average: 4.4, count: 7 }, votes: 8, votesRecent: 8,
    stimmen: [
      { text: 'Der Text, den ich Neuen schicke, wenn sie fragen „warum vergisst Claude Sachen?“ — danach ergeben /clear und /compact plötzlich Sinn.', autor: 'Jan Richter', rolle: 'Tech Lead & Citizen-Coding-Mentor' }
    ],
    addedAt: '2026-07-23',
    tags: ['claude code', 'funktionsweise', 'agentische schleife', 'kontext', 'grundlagen', 'deutsch']
  },
  {
    id: 'code-best-practices',
    titel: 'Claude Code Best Practices: Bessere Ergebnisse, weniger Frust',
    url: 'https://code.claude.com/docs/en/best-practices',
    typ: 'doku', niveau: 'fortgeschritten', dauerMin: 25, dauerCa: true, sprache: 'en', plattform: 'code',
    quelle: 'Anthropic — Claude-Code-Doku',
    fuerDich: 'Claude bei dir manchmal „vergisst“, was du vor zehn Minuten gesagt hast, und du wissen willst, woran das liegt.',
    beschreibung: 'Die gesammelten Arbeitsmuster aus Anthropics eigenen Teams: erst erkunden und planen, dann bauen; Claude eine Prüfmöglichkeit geben; Kontext gezielt frisch halten; typische Fehlermuster erkennen. Der Text erklärt auch, warum lange Sessions schlechter werden — und was dagegen hilft.',
    gelernt: ['Erst erkunden und planen, dann bauen', 'Warum /clear zwischen Aufgaben so viel bringt', 'Was in die CLAUDE.md gehört — und was nicht'],
    geprueft: '2026-07-17',
    rating: { average: 4.6, count: 13 }, votes: 16, votesRecent: 5,
    stimmen: [
      { text: 'Die Tabelle „Include/Exclude“ für die CLAUDE.md allein ist den Besuch wert.', autor: 'Jan Richter', rolle: 'Tech Lead & Citizen-Coding-Mentor' },
      { text: 'Hier steht, warum man zwischen Aufgaben /clear tippt. Hat bei mir viel verändert.', autor: 'Christopher Kipp', rolle: 'Innovation Lead' }
    ],
    addedAt: '2026-07-17',
    tags: ['best practices', 'kontext', 'claude.md', 'arbeitsmuster', 'fehler']
  },
  {
    // Aufgenommen 2026-08-03 (Feedback): Die Doku-Startseite stand bis dahin nur im
    // Seitenfuß. Sie gehört ins Regal, weil sie die einzige Quelle ist, die nie
    // veraltet — jede Anleitung hier und anderswo tut das irgendwann.
    id: 'doku-claude-code',
    titel: 'Die offizielle Claude-Code-Doku — das Nachschlagewerk',
    url: 'https://code.claude.com/docs',
    typ: 'doku', niveau: 'fortgeschritten', dauerMin: 10, dauerCa: true, sprache: 'en', plattform: 'code',
    quelle: 'Anthropic — Claude-Code-Doku',
    fuerDich: 'du eine konkrete Frage zu Claude Code hast und die Antwort lieber an der Quelle nachschlägst, als dich durch ein Video zu spulen.',
    beschreibung: 'Die Startseite der offiziellen Dokumentation — von hier aus ist jedes Thema verlinkt: Befehle, Tastenkürzel, Berechtigungen, Gedächtnisdateien, MCP. Zum Nachschlagen gedacht, nicht zum Durchlesen; die Zeitangabe meint darum eine Frage, nicht die ganze Doku. Zwei ehrliche Einschränkungen: Der größte Teil ist englisch (einzelne Einstiegsseiten gibt es unter `/docs/de/` auf Deutsch, zwei davon stehen hier im Regal), und viele Seiten setzen Entwickler-Alltag voraus. Als Startpunkt ist sie deshalb nichts — als Nachschlagewerk ist sie unschlagbar, weil sie als Einzige immer den aktuellen Stand zeigt.',
    gelernt: ['Wo die verbindliche Antwort steht, wenn eine Anleitung veraltet ist', 'Die vollständige Referenz aller Befehle und Tastenkürzel', 'Welche Themen es überhaupt gibt — von Berechtigungen bis MCP'],
    geprueft: '2026-08-03',
    rating: { average: 4.3, count: 6 }, votes: 7, votesRecent: 7,
    stimmen: [
      { text: 'Wenn ein Tipp aus einem Video bei euch nicht funktioniert, schaut hier nach — meistens hat sich der Befehl geändert, nicht ihr euch vertippt.', autor: 'Jan Richter', rolle: 'Tech Lead & Citizen-Coding-Mentor' }
    ],
    addedAt: '2026-08-03',
    tags: ['doku', 'referenz', 'nachschlagen', 'anthropic', 'claude code', 'befehle']
  },
  {
    id: 'doku-github-pages',
    titel: 'GitHub Pages Schnellstart: Deine Seite kostenlos ins Netz',
    url: 'https://docs.github.com/de/pages/quickstart',
    typ: 'doku', niveau: 'einsteiger', dauerMin: 10, dauerCa: true, sprache: 'de', plattform: 'allgemein',
    quelle: 'GitHub-Doku (offiziell)',
    fuerDich: 'deine erste Website lokal fertig ist und du sie Kolleg:innen einfach als Link schicken willst.',
    beschreibung: 'Die offizielle deutsche GitHub-Anleitung, um eine mit Claude Code gebaute Seite kostenlos zu veröffentlichen: Repository anlegen, Veröffentlichung aktivieren, Titel anpassen — komplett im Browser, ohne Kommandozeile. Der fehlende letzte Schritt vieler Erstprojekte.',
    geprueft: '2026-07-17',
    rating: { average: 3.9, count: 5 }, votes: 5, votesRecent: 5,
    stimmen: [
      { text: 'Vom Prototyp zum teilbaren Link in einer Kaffeepause.', autor: 'Mia Hoffmann', rolle: 'Senior UX Designerin' }
    ],
    addedAt: '2026-07-17',
    tags: ['github pages', 'veröffentlichen', 'hosting', 'website', 'deployment']
  },

  /* ==================== LANGDOCK ==================== */

  {
    id: 'lr-langdock-einfuehrung',
    titel: 'Einführung in Langdock (offizielle Doku)',
    url: 'https://docs.langdock.com/de/using-langdock/get-started/introduction',
    typ: 'doku', niveau: 'einsteiger', dauerMin: 5, dauerCa: true, sprache: 'de', plattform: 'langdock',
    quelle: 'Langdock-Doku',
    fuerDich: 'du Langdock gerade zum ersten Mal geöffnet hast und wissen willst, was Chat, Agenten und Workflows eigentlich voneinander unterscheidet.',
    beschreibung: 'Der offizielle deutsche Einstieg in die Langdock-Doku. Stellt die fünf Kernbereiche vor — Chat, Agenten, Integrationen, Workflows und API — und verlinkt von dort in die jeweiligen Detail-Guides. Guter erster Klick, um die Plattform-Landkarte im Kopf zu haben.',
    geprueft: '2026-07-17',
    rating: { average: 4.5, count: 13 }, votes: 16, votesRecent: 3,
    stimmen: [
      { text: 'Hab ich allen aus meinem Projektteam als ersten Link geschickt — kurz und man weiß danach, wo was ist.', autor: 'Sophie Klein', rolle: 'Projektmanagerin' },
      { text: 'Endlich verstanden, wofür Agenten da sind.', autor: 'Anna Schreiber', rolle: 'Content Strategin' }
    ],
    addedAt: '2026-07-17',
    tags: ['langdock', 'einführung', 'chat', 'agenten', 'workflows']
  },
  {
    id: 'lr-langdock-ki-grundlagen',
    titel: 'Grundlagen von KI-Modellen (Langdock-Doku)',
    url: 'https://docs.langdock.com/de/using-langdock/guides/prompt-engineering/basics/basics',
    typ: 'doku', niveau: 'einsteiger', dauerMin: 10, dauerCa: true, sprache: 'de', plattform: 'langdock',
    quelle: 'Langdock-Doku',
    fuerDich: 'du Begriffe wie Token oder Kontextfenster schon oft gehört hast und sie dir einmal in zehn Minuten sauber erklären lassen willst.',
    beschreibung: 'Erklärt auf Deutsch und ohne Mathematik, wie die Sprachmodelle hinter Langdock funktionieren: Training als „Next-Token-Prediction“, Knowledge Cutoff, Kontextfenster als Arbeitsspeicher, Antworten als Wahrscheinlichkeiten. Begriffe wie Token und Inferenz werden in Infokästen direkt definiert.',
    gelernt: ['Wie ein Sprachmodell seine Antwort erzeugt', 'Was Token, Kontextfenster und Knowledge Cutoff bedeuten', 'Warum die KI manchmal „vergisst“'],
    geprueft: '2026-07-17',
    rating: { average: 4.7, count: 15 }, votes: 19, votesRecent: 6,
    stimmen: [
      { text: 'Verlinke ich in jedem Onboarding — danach sind 80 Prozent der „Warum vergisst die KI das?“-Fragen geklärt.', autor: 'Jan Richter', rolle: 'Tech Lead & Citizen-Coding-Mentor' },
      { text: 'Deutsch, kurz, korrekt. Genau das Niveau, das wir brauchen.', autor: 'Christopher Kipp', rolle: 'Innovation Lead' }
    ],
    addedAt: '2026-07-17',
    tags: ['ki-grundlagen', 'token', 'kontextfenster', 'llm', 'langdock']
  },
  {
    id: 'lr-langdock-prompt-tricks',
    titel: 'Prompting-Tipps & Tricks (Langdock-Doku)',
    // Link-Rot-Vorsorge (Prüflauf 2026-07-24): Die alte Adresse ohne /guides/ war
    // nur noch per Weiterleitung erreichbar. Weiterleitungen werden irgendwann
    // abgeschaltet — hier steht deshalb das aufgelöste Ziel, kein 301-Hop mehr.
    url: 'https://docs.langdock.com/de/using-langdock/guides/prompt-engineering/advanced-techniques/tricks',
    typ: 'doku', niveau: 'fortgeschritten', dauerMin: 8, dauerCa: true, sprache: 'de', plattform: 'langdock',
    quelle: 'Langdock-Doku',
    fuerDich: 'deine Prompts schon okay sind, aber die KI bei Dokument-Fragen manchmal plausibel klingende Dinge behauptet, die nicht drinstehen.',
    beschreibung: 'Die Fortgeschrittenen-Seite aus dem Langdock-Prompt-Guide: positiv statt mit Verneinungen formulieren, Expertenrollen zuweisen, Tonalität steuern — und der wichtigste Trick gegen Halluzinationen: nach wörtlichen Zitaten aus deinen Dokumenten fragen. Kurz, konkret, direkt in Langdock anwendbar.',
    geprueft: '2026-07-17',
    rating: { average: 4.3, count: 9 }, votes: 10, votesRecent: 2,
    stimmen: [
      { text: 'Der Zitat-Trick gegen Halluzinationen hat mir bei Reportings schon zweimal den Hintern gerettet.', autor: 'Lukas Weber', rolle: 'SEO Strategist' }
    ],
    addedAt: '2026-07-17',
    tags: ['prompting', 'tricks', 'halluzinationen', 'zitate', 'langdock']
  },

  /* ==================== KI-GRUNDLAGEN ==================== */

  {
    id: 'lr-digitaleprofis-chatgpt',
    titel: 'So funktioniert ChatGPT — Large Language Modelle einfach erklärt',
    url: 'https://www.youtube.com/watch?v=SLcAtQQ483Y',
    typ: 'video', niveau: 'einsteiger', dauerMin: 10, dauerCa: true, sprache: 'de', plattform: 'allgemein',
    quelle: 'YouTube — Digitale Profis',
    fuerDich: 'du die Funktionsweise lieber einmal auf Deutsch erklärt bekommst, bevor du dich an englische Videos wagst.',
    beschreibung: 'Deutschsprachiges Erklärvideo vom Kanal „Digitale Profis“ (zwei Informatiker, die u. a. mit Google Deutschland und LinkedIn zusammengearbeitet haben). Zeigt Schritt für Schritt, wie ChatGPT eine Antwort erzeugt und warum das Modell scheinbar alles weiß. Die deutsche Alternative zum 3Blue1Brown-Video — weniger Animation, dafür ohne Sprachhürde.',
    geprueft: '2026-07-17',
    rating: { average: 4.1, count: 8 }, votes: 9, votesRecent: 3,
    stimmen: [
      { text: 'Auf Deutsch und ohne Formeln — das hab ich meiner ganzen Familie weitergeleitet.', autor: 'Sophie Klein', rolle: 'Projektmanagerin' }
    ],
    addedAt: '2026-07-17',
    tags: ['chatgpt', 'llm', 'funktionsweise', 'deutsch', 'grundlagen']
  },
  {
    id: 'lr-itp-halluzinationen',
    titel: 'KI-Halluzinationen: Wenn die KI anfängt zu erfinden',
    url: 'https://www.it-p.de/blog/ki-halluzination/',
    typ: 'artikel', niveau: 'einsteiger', dauerMin: 5, sprache: 'de', plattform: 'allgemein',
    quelle: 'IT-P GmbH (Blog)',
    fuerDich: 'du wissen willst, warum die KI manchmal mit voller Überzeugung Quellen zitiert, die es gar nicht gibt.',
    beschreibung: 'Kompakter deutscher Artikel darüber, warum Sprachmodelle Inhalte erzeugen, die sprachlich perfekt klingen, aber faktisch erfunden sind — inklusive der Ursachen (Trainingsdaten, Optimierung auf plausible Antworten) und konkreter Gegenmittel wie kritischem Nachfragen. Zuletzt im Januar 2026 aktualisiert, kostenlos und ohne Anmeldung lesbar.',
    geprueft: '2026-07-17',
    rating: { average: 4.0, count: 7 }, votes: 8, votesRecent: 6,
    stimmen: [
      { text: 'Seitdem prüfe ich jede Quellenangabe aus der KI nach — der Artikel erklärt, warum das kein Bug ist, sondern Systemeigenschaft.', autor: 'Anna Schreiber', rolle: 'Content Strategin' }
    ],
    addedAt: '2026-07-17',
    tags: ['halluzinationen', 'fakten', 'quellen', 'risiken', 'grundlagen']
  },

  /* ==================== PROMPTING ==================== */

  {
    id: 'lr-mdz-prompting',
    titel: 'So schreibst du perfekte Prompts (Mittelstand-Digital Zentrum Berlin)',
    url: 'https://digitalzentrum-berlin.de/leitfaden-fur-perfekte-prompts-chatgpt',
    typ: 'artikel', niveau: 'einsteiger', dauerMin: 15, dauerCa: true, sprache: 'de', plattform: 'allgemein',
    quelle: 'Mittelstand-Digital Zentrum Berlin',
    fuerDich: 'deine Prompts bisher aus einem Satz bestehen und du systematisch lernen willst, was gute von mittelmäßigen Anfragen unterscheidet.',
    beschreibung: 'Ausführlicher, kostenloser Prompting-Leitfaden einer vom Bund geförderten Mittelstands-Initiative — ohne Verkaufsabsicht. Behandelt in sechs Schritten präzises Formulieren, Kontext, schrittweises Verfeinern, Beispiele mitgeben (Few-Shot), Rollen zuweisen und Chain-of-Thought, jeweils mit Beispielen aus dem Unternehmensalltag. Funktioniert für Langdock genauso wie für ChatGPT.',
    gelernt: ['Sechs Prompting-Techniken mit Praxisbeispielen', 'Rollen zuweisen und Beispiele mitgeben', 'Schrittweises Verfeinern statt Einmal-Schuss'],
    geprueft: '2026-07-17',
    rating: { average: 4.5, count: 12 }, votes: 14, votesRecent: 4,
    stimmen: [
      { text: 'Die Rollen- und Beispiel-Technik hat meine Briefing-Prompts sofort besser gemacht.', autor: 'Anna Schreiber', rolle: 'Content Strategin' },
      { text: 'Seriöse Quelle ohne Newsletter-Zwang — selten geworden.', autor: 'Sophie Klein', rolle: 'Projektmanagerin' }
    ],
    addedAt: '2026-07-17',
    tags: ['prompting', 'leitfaden', 'techniken', 'few-shot', 'rollen']
  },

  /* ==================== KI IM ARBEITS- UND AGENTUR-ALLTAG ==================== */

  {
    id: 'artikel-jessner-vibecoding',
    titel: 'Vibecoding ehrlich erklärt: Was es kann — und wo es scheitert',
    url: 'https://oliverjessner.at/blog/2026-02-03-vibe-coding-was-es-kann-und-wo-es-scheitert/',
    typ: 'artikel', niveau: 'einsteiger', dauerMin: 10, dauerCa: true, sprache: 'de', plattform: 'allgemein',
    quelle: 'Oliver Jessner (Tech-Journalist, Ex-CTO)',
    fuerDich: 'du wissen willst, was Vibecoding realistisch kann und wo es kracht, bevor du es selbst erlebst.',
    beschreibung: 'Nüchterner deutschsprachiger Überblick von einem Tech-Journalisten und früheren CTO: was Vibecoding wirklich gut kann (schnelle Prototypen ohne Programmierkenntnisse) — und wo es zuverlässig scheitert. Der Text benennt offen die typischen Fallen: Die Architektur entsteht eher zufällig als geplant, Sicherheitslücken bleiben unbemerkt, und die Wartung wird später teuer. Frei lesbar, keine Paywall — die vorderen Abschnitte sind für Einsteiger:innen gedacht, spätere Passagen werden etwas technischer.',
    geprueft: '2026-07-17',
    rating: { average: 4.2, count: 11 }, votes: 15, votesRecent: 5,
    stimmen: [
      { text: 'Der ehrlichste Text zum Thema, den ich kenne — er verspricht nichts, was die KI am Ende nicht halten kann.', autor: 'Anna Schreiber', rolle: 'Content Strategin' },
      { text: 'Der Abschnitt zu unbemerkten Sicherheitslücken sollte jede:r gelesen haben, bevor etwas öffentlich geht.', autor: 'Lukas Weber', rolle: 'SEO Strategist' }
    ],
    addedAt: '2026-07-17',
    tags: ['vibecoding', 'realitätscheck', 'grenzen', 'sicherheit', 'einordnung']
  },
  {
    id: 'lr-marketing-mit-ki',
    titel: 'Marketing mit KI: Einfach. Klar. Praxisnah. (Podcast)',
    url: 'https://podcasts.apple.com/de/podcast/marketing-mit-ki-einfach-klar-praxisnah/id1777376293',
    typ: 'podcast', niveau: 'einsteiger', dauerMin: 30, dauerCa: true, dauerProFolge: true, sprache: 'de', plattform: 'allgemein',
    quelle: 'rock&stars / KI Lotsen (Apple Podcasts)',
    fuerDich: 'du hören willst, wie andere Marketing-Teams KI konkret in Kampagnen und Prozessen einsetzen — nicht, was theoretisch irgendwann möglich wäre.',
    beschreibung: 'Zweiwöchentlicher deutscher Podcast speziell zu KI im Marketing — mit echten Anwendungsfällen statt Tool-Listen: KI-Strategie bei Gebr. Heinemann, EU AI Act für Marketer, Aufbau von KI-Agenten im Kampagnenalltag. Die Gäste kommen aus der Praxis, die Folgen bleiben mit rund 30 Minuten kompakt.',
    geprueft: '2026-07-17',
    rating: { average: 4.2, count: 8 }, votes: 7, votesRecent: 2,
    stimmen: [
      { text: 'Die AI-Act-Folge hat mir für ein Kundengespräch mehr gebracht als drei Whitepaper.', autor: 'Lukas Weber', rolle: 'SEO Strategist' },
      { text: 'Kompakt genug für den Arbeitsweg, konkret genug zum Mitschreiben.', autor: 'Anna Schreiber', rolle: 'Content Strategin' }
    ],
    addedAt: '2026-07-17',
    tags: ['podcast', 'marketing', 'kampagnen', 'ai act', 'praxis']
  },

  /* ==================== DATENSCHUTZ & VERANTWORTUNG ==================== */

  {
    id: 'lr-bsi-ki-checkliste',
    titel: 'Die Transparenz-Checkliste für KI-Anwendungen (BSI)',
    url: 'https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Technologien_sicher_gestalten/Kuenstliche-Intelligenz/KI-Transparenz/ki-transparenz_node.html',
    typ: 'artikel', niveau: 'einsteiger', dauerMin: 10, dauerCa: true, sprache: 'de', plattform: 'allgemein',
    quelle: 'BSI (Bundesamt für Sicherheit in der Informationstechnik)',
    fuerDich: 'du dir unsicher bist, welche Daten du bedenkenlos in ein KI-Tool eingeben kannst und welche besser nicht.',
    beschreibung: 'Das BSI erklärt in acht Punkten, worauf du vor und während der Nutzung einer KI-Anwendung achten solltest: Was passiert mit meinen Eingaben? Welche Berechtigungen braucht das Tool wirklich? Wie aktuell ist sein Wissen? Jeder Punkt kommt mit konkretem Beispiel und Risiko — behördlich nüchtern, aber gut lesbar.',
    geprueft: '2026-07-17',
    rating: { average: 3.9, count: 6 }, votes: 6, votesRecent: 4,
    stimmen: [
      { text: 'Nicht glamourös, aber genau die acht Fragen, die man sich vor jedem neuen Tool stellen sollte.', autor: 'Jan Richter', rolle: 'Tech Lead & Citizen-Coding-Mentor' }
    ],
    addedAt: '2026-07-17',
    tags: ['datenschutz', 'sicherheit', 'bsi', 'checkliste', 'verantwortung']
  },

  /* ==================== INTERNE PILOT-RESSOURCEN (Platzhalter — Link folgt) ==================== */
  // Bewusst OHNE rating/votes/stimmen: eine Bewertung für etwas, das noch niemand
  // gesehen hat, wäre unehrlich (Plan §1.1). Das UI zeigt „Link folgt“ statt Link.

  {
    id: 'lr-intern-langdock-aufzeichnung',
    titel: 'Langdock-Einführung (interne Aufzeichnung)',
    url: null,
    typ: 'intern', niveau: 'einsteiger', dauerMin: 45, dauerCa: true, sprache: 'de', plattform: 'langdock',
    quelle: 'pilot-intern',
    fuerDich: 'du Langdock lieber einmal anhand echter pilot-Beispiele gezeigt bekommst, statt dich allein durch die Doku zu klicken.',
    beschreibung: 'Aufzeichnung der internen Langdock-Einführung für pilot — mit unserem Workspace, unseren Agenten und unseren Beispielen statt generischer Demos. Wird hier verlinkt, sobald die Aufzeichnung freigegeben ist.',
    intern: true,
    addedAt: '2026-07-17',
    tags: ['langdock', 'intern', 'aufzeichnung', 'workspace']
  },
  {
    id: 'lr-intern-ki-richtlinie',
    titel: 'pilot KI-Richtlinie',
    url: null,
    typ: 'intern', niveau: 'einsteiger', dauerMin: 15, dauerCa: true, sprache: 'de', plattform: 'allgemein',
    quelle: 'pilot-intern',
    fuerDich: 'du vor dem ersten Kundenprojekt mit KI schwarz auf weiß wissen willst, was erlaubt ist — und was tabu.',
    beschreibung: 'Die verbindliche interne Richtlinie, welche KI-Tools bei pilot freigegeben sind und welche Daten (Kundendaten, Personendaten, Vertrauliches) wo eingegeben werden dürfen. Bis zur Verlinkung gilt: im Zweifel vorher das KI-Enablement-Team fragen.',
    intern: true,
    addedAt: '2026-07-17',
    tags: ['richtlinie', 'intern', 'datenschutz', 'freigabe', 'kundendaten']
  },
  {
    id: 'lr-intern-q0-austausch',
    titel: 'Q0-Testgruppe: Erfahrungsaustausch',
    url: null,
    typ: 'intern', niveau: 'einsteiger', dauerMin: 60, dauerCa: true, sprache: 'de', plattform: 'code',
    quelle: 'pilot-intern',
    fuerDich: 'du lieber von Kolleg:innen lernst, die dieselben Anfängerfehler gerade selbst gemacht haben.',
    beschreibung: 'Der regelmäßige Austausch der Q0-Testgruppe: Was hat mit Claude Code und Langdock funktioniert, was nicht, welche Skills lohnen sich? Kein Kurs, sondern Kolleg:innen, die zwei Schritte weiter sind. Termin- und Kanal-Link folgen.',
    intern: true,
    addedAt: '2026-07-17',
    tags: ['q0', 'intern', 'austausch', 'community', 'erfahrungen']
  }
];
