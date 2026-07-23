// pilot AI Marketplace — E8-Showroom: Case-Datensatz (data/cases.js-Kandidat).
// Klassisches Script, definiert globale Konstante: CASES.
//
// EHRLICHKEIT (Kern dieser Etappe):
//   istEcht:true  = echtes, im Repo vorhandenes Team-Tool/Artefakt. liveUrl zeigt auf die reale Datei.
//                   Attribution: real gebaut (Christopher Kipp) bzw. neutral vom pilot-Tool erzeugt.
//   istEcht:false = inszeniertes Beispiel-Projekt. Zeigt, was möglich ist, ist einer Persona aus
//                   data/contributors.js zugeordnet (redaktionelle Demo-Zuordnung, zentral im Footer
//                   gekennzeichnet). Die Mini-Demo unter liveUrl ist ECHT, klickbar und funktioniert.
//
// reaktionSeed sind Demo-Startwerte (klein, ehrlich als Seed erkennbar), keine gemessenen Kennzahlen.
// Zeit-/Aufwandsangaben sind grobe Einordnungen ("Feierabend-Projekt"), keine exakten Messungen.
// Alle Querverweis-IDs existieren in data/skills.js, data/prompts.js, data/bausteine.js (BAUSTEINE + BEISPIELDATEN).

const CASES = [

  /* ==================== ECHTE CASES (im Repo vorhanden) ==================== */

  {
    id: 'umfrage-auswerter',
    titel: 'Umfrage-Auswerter',
    saeule: 'insights',
    art: 'tool',
    istEcht: true,
    persona: 'Christopher Kipp',
    aufwand: 'Feierabend-Projekt · ~1,5 Std',
    aufwandStufe: 'mini',
    kurz: 'Ein Single-File-Tool, das rohe Umfrage-Antworten als CSV entgegennimmt und pro Frage eine Antwortverteilung als Balken zeichnet. Erste Spalte ist die Frage, der Rest die Antwort — eine Zeile pro abgegebener Antwort. Kein Excel, keine Pivot-Tabelle, kein Login. Einfügen, auf „Auswerten“ klicken, fertig. Bewusst schmal gehalten: es zählt und stapelt, mehr nicht — und genau das reicht für den schnellen Blick nach einem Team-Voting.',
    story: {
      ausgangsproblem: 'Nach jeder internen Kurzumfrage landeten die Antworten als CSV-Wust im Postfach. Der Weg über Excel-Pivot war jedes Mal dieselbe Fummelei — für ein Ergebnis, das man in zwei Minuten sehen wollte.',
      ersterPrompt: 'Baue mir eine einzelne HTML-Datei, in die ich Umfrage-Daten als CSV einfüge. Format je Zeile: Frage;Antwort. Das Tool soll pro Frage zählen, wie oft jede Antwort vorkommt, und das als horizontale Balken mit Prozentwerten zeigen. Reines HTML/CSS/JS in einer Datei, keine Bibliothek, kein Netzwerk, funktioniert per Doppelklick.',
      stolperstein: 'Die erste Version kam mit Antworten durcheinander, die selbst ein Komma enthielten — sie wurden fälschlich als zweite Spalte gelesen. Erst die Regel „erste Spalte = Frage, alles Weitere zusammenfügen“ hat das sauber gemacht.',
      ergebnis: 'Ein 100-Zeilen-Tool mit „Beispieldaten laden“-Knopf. Balken animieren beim Rendern, Prozentwerte sind gerundet, mobil kippt das Raster auf schmalere Spalten. Liegt als echte Datei im Repo-Root.'
    },
    faktenBox: {
      dauer: '~1,5 Stunden an einem Abend',
      skills: ['prototyp-bauen', 'daten-aufbereiten'],
      prompts: ['umfrage-fragen', 'csv-erklaeren'],
      bausteine: ['chart-setup', 'tabellen-look']
    },
    zitat: 'Das Tool ist absichtlich dumm — es zählt und stapelt. Aber genau das wollte ich nach dem Voting sehen, nicht eine halbe Stunde Pivot-Arbeit.',
    nachbauStartprompt: 'Ich habe Umfrage-Ergebnisse als CSV (Frage;Antwort, eine Zeile pro Antwort). Baue mir eine einzelne HTML-Datei ohne externe Bibliothek, die pro Frage die Antwortverteilung als Balkendiagramm mit Prozentwerten zeigt, einen Button „Beispieldaten laden“ hat und offline per Doppelklick läuft. pilot-CI: Schwarz #262626, Gelb #ffe05e, Papier #f1f1ec, Schrift system-ui.',
    querverweise: {
      skills: [
        { id: 'prototyp-bauen', label: 'Prototyp bauen' },
        { id: 'daten-aufbereiten', label: 'Daten aufbereiten' }
      ],
      prompts: [
        { id: 'umfrage-fragen', label: 'Umfrage-Fragen ohne Schieflage' },
        { id: 'csv-erklaeren', label: 'CSV-Datei erklären lassen' }
      ],
      bausteine: [
        { id: 'chart-setup', label: 'Chart-Setup (ohne Bibliothek)' },
        { id: 'tabellen-look', label: 'Tabellen-Look' }
      ],
      beispieldaten: [
        { id: 'umfrage-rohdaten', label: 'Umfrage-Rohdaten (CSV)' }
      ]
    },
    liveUrl: 'umfrage-auswertung.html',
    reaktionSeed: 23,
    spotlight: true
  },

  {
    id: 'tkp-rechner',
    titel: 'TKP-Rechner',
    saeule: 'media',
    art: 'tool',
    istEcht: true,
    persona: 'Christopher Kipp',
    aufwand: 'Feierabend-Projekt · ~1 Std',
    aufwandStufe: 'mini',
    kurz: 'Ein kleiner Media-Rechner: Brutto-Reichweite, TKP und Streuverlust rein — Gesamtkosten, Netto-Kontakte in der Zielgruppe und der Netto-Kontaktpreis raus. Alles rechnet live beim Tippen, ohne „Berechnen“-Knopf. Die Formeln stehen offen unter dem Ergebnis, damit niemand einer Blackbox vertrauen muss. Ein Werkzeug für die schnelle Plausibilitätsprüfung im Media-Gespräch, nicht für die finale Kalkulation.',
    story: {
      ausgangsproblem: 'Im Media-Alltag will man den Netto-Kontaktpreis oft nur überschlagen — und öffnet doch wieder ein Spreadsheet mit denselben drei Formeln. Ein Ein-Zweck-Rechner sollte das ersetzen.',
      ersterPrompt: 'Baue mir eine einzelne HTML-Seite als TKP-Rechner. Eingaben: Brutto-Reichweite, TKP in Euro pro 1000 Kontakte, Streuverlust in Prozent. Ausgaben: Gesamtkosten, Netto-Kontakte in der Zielgruppe, Netto-Kontaktpreis. Live-Berechnung beim Tippen, keine Bibliothek, läuft offline.',
      stolperstein: 'Der Netto-Kontaktpreis wurde negativ oder unendlich, sobald der Streuverlust 100 Prozent erreichte. Ein Kappen auf 0–100 Prozent und ein Fallback für „keine Netto-Kontakte“ haben das entschärft.',
      ergebnis: 'Ein fokussierter Rechner mit deutscher Zahlenformatierung, tabellarischen Ziffern und offengelegten Formeln in der Fußzeile. Liegt als echte Datei im Repo-Root und rechnet ohne Netzwerk.'
    },
    faktenBox: {
      dauer: '~1 Stunde an einem Abend',
      skills: ['prototyp-bauen'],
      prompts: ['tool-anforderungen'],
      bausteine: ['stat-band', 'kontaktformular']
    },
    zitat: 'Ich wollte keine App, ich wollte drei Zahlen rein und eine Zahl raus — und die Formel sichtbar daneben.',
    nachbauStartprompt: 'Baue mir einen TKP-Rechner als einzelne HTML-Datei. Eingaben: Brutto-Reichweite, TKP (Euro pro 1000 Kontakte), Streuverlust in Prozent. Ausgaben live beim Tippen: Gesamtkosten, Netto-Kontakte in der Zielgruppe, Netto-Kontaktpreis. Zeige die Formeln offen an, deutsche Zahlenformate, keine externe Bibliothek, offline per Doppelklick. pilot-CI: Schwarz #262626, Gelb #ffe05e, Papier #f1f1ec.',
    querverweise: {
      skills: [
        { id: 'prototyp-bauen', label: 'Prototyp bauen' }
      ],
      prompts: [
        { id: 'tool-anforderungen', label: 'Lass dich interviewen, bevor du baust' }
      ],
      bausteine: [
        { id: 'stat-band', label: 'Kennzahlen-Band' },
        { id: 'kontaktformular', label: 'Kontaktformular-Optik' }
      ],
      beispieldaten: [
        { id: 'budget-plan', label: 'Budget-Plan (CSV)' }
      ]
    },
    liveUrl: 'tkp-rechner.html',
    reaktionSeed: 14,
    spotlight: false
  },

  {
    id: 'webaudit-report',
    titel: 'webaudit-Report',
    saeule: 'performance',
    art: 'dashboard',
    istEcht: true,
    persona: 'pilot-Tool',
    aufwand: 'Skill-Lauf · Minuten',
    aufwandStufe: 'mini',
    kurz: 'Ein echter Prüfbericht, den der Skill „webaudit“ über den TKP-Rechner erzeugt hat. Der Report gibt einen Gesamt-Score von 95 von 100 aus, listet 0 Fehler, 1 Warnung und 13 bestandene Checks — jeder Fund mit Fundstelle. Erzeugt hat ihn kein Mensch, sondern der Audit-Lauf selbst; deshalb ist er neutral als pilot-Tool attribuiert. Zeigt gut, wie aus einem Skill ein teilbares, statisches HTML-Artefakt wird.',
    story: {
      ausgangsproblem: 'Vor dem Teilen eines selbstgebauten Tools will man wissen, ob Grundlagen wie Zugänglichkeit, Meta-Angaben und offensichtliche Fehler stimmen — ohne selbst Prüf-Checklisten abzuarbeiten.',
      ersterPrompt: 'Führe einen webaudit über tkp-rechner.html aus und schreibe das Ergebnis als eigenständigen HTML-Report: Gesamt-Score, Fehler, Warnungen und bestandene Checks, jeder Fund mit konkreter Fundstelle.',
      stolperstein: 'Ein Report ist nur so ehrlich wie seine Fundstellen. Wichtig war, dass jeder Punkt auf eine echte Stelle in der geprüften Datei zeigt und nichts Erfundenes als bestanden ausgegeben wird.',
      ergebnis: 'Ein 150-KB-HTML-Report mit Score 95/100, farbcodierten Kategorien und nachprüfbaren Fundstellen. Statisch, offline lesbar, direkt weiterzureichen.'
    },
    faktenBox: {
      dauer: 'ein Skill-Lauf, wenige Minuten',
      skills: ['webaudit'],
      prompts: ['code-verstehen'],
      bausteine: ['stat-band', 'tabellen-look']
    },
    zitat: '',
    nachbauStartprompt: 'Prüfe meine HTML-Datei mit dem Skill webaudit und gib mir das Ergebnis als eigenständigen, offline lesbaren HTML-Report: Gesamt-Score von 100, Liste der Fehler, Warnungen und bestandenen Checks, jeder Fund mit Fundstelle in der Datei.',
    querverweise: {
      skills: [
        { id: 'webaudit', label: 'webaudit' }
      ],
      prompts: [
        { id: 'code-verstehen', label: 'Was tut diese Datei?' }
      ],
      bausteine: [
        { id: 'stat-band', label: 'Kennzahlen-Band' },
        { id: 'tabellen-look', label: 'Tabellen-Look' }
      ],
      beispieldaten: []
    },
    liveUrl: 'demo/webaudit/report.html',
    reaktionSeed: 9,
    spotlight: false
  },

  {
    id: 'kampagnen-check',
    titel: 'Kampagnen-Check',
    saeule: 'performance',
    art: 'helfer',
    istEcht: true,
    persona: 'pilot-Tool',
    aufwand: 'Skill-Lauf · Minuten',
    aufwandStufe: 'mini',
    kurz: 'Ein Validierungs-Report für eine Kampagnen-CSV: Der Skill „Campaign Checker“ prüft je Anzeige die UTM-Tags, die Landingpage und den Budget-Cap und spricht am Ende eine klare Empfehlung aus — hier: STOPP wegen drei Blockern in zwei von sechs Anzeigen. Jeder Fund nennt Zeile und Grund, dazu drei konkrete Fixes. Kein Dashboard-Zauber, sondern eine nachprüfbare Startklar-Checkliste aus dem tatsächlichen Validator-Lauf.',
    story: {
      ausgangsproblem: 'Kurz vor dem Kampagnen-Launch schleichen sich Tracking-Fehler ein: ein fehlendes utm_medium, eine http-Landingpage, ein vergessener Budget-Cap. Solche Blocker fallen oft erst auf, wenn der Traffic schon falsch verbucht ist.',
      ersterPrompt: 'Prüfe meine kampagne.csv mit dem Campaign Checker: Sind alle UTM-Parameter gesetzt und kleingeschrieben, sind die Landingpages sicher und erreichbar, ist überall ein Budget-Cap? Gib mir je Anzeige einen Status und am Ende eine klare Launch-Empfehlung mit konkreten Fixes.',
      stolperstein: 'Die Grenze zwischen „echtem Blocker“ und „nur Optimierung“ musste klar sein: fehlendes utm_campaign blockt den Launch, ein groß geschriebenes utm_source ist nur eine Warnung. Ohne diese Trennung wäre jeder Report ein Alarm.',
      ergebnis: 'Ein Markdown-Report mit Status-Tabelle je Anzeige, drei Fehlern, drei Warnungen und einer Drei-Punkte-Fixliste — jeder Fund mit Zeilennummer, nachprüfbar in der CSV.'
    },
    faktenBox: {
      dauer: 'ein Skill-Lauf, wenige Minuten',
      skills: ['campaign-check', 'tracking-audit'],
      prompts: ['kampagnen-learnings'],
      bausteine: ['tabellen-look']
    },
    zitat: '',
    nachbauStartprompt: 'Prüfe meine Kampagnen-CSV mit dem Campaign Checker: je Anzeige UTM-Tags, Landingpage und Budget-Cap. Trenne echte Launch-Blocker klar von Optimierungs-Warnungen, nenne jeden Fund mit Zeilennummer und schließe mit einer eindeutigen Launch-Empfehlung plus konkreten Fixes ab.',
    querverweise: {
      skills: [
        { id: 'campaign-check', label: 'Campaign Checker' },
        { id: 'tracking-audit', label: 'Tracking-Audit' }
      ],
      prompts: [
        { id: 'kampagnen-learnings', label: 'Kampagnen-Learnings strukturieren' }
      ],
      bausteine: [
        { id: 'tabellen-look', label: 'Tabellen-Look' }
      ],
      beispieldaten: [
        { id: 'kampagnen-kpis', label: 'Kampagnen-KPIs (CSV)' }
      ]
    },
    liveUrl: 'demo/viewer.html?f=campaign-check/report.md',
    reaktionSeed: 11,
    spotlight: false
  },

  /* ==================== INSZENIERTE BEISPIEL-CASES (Demo, klickbar) ==================== */

  {
    id: 'flighting-visualisierer',
    titel: 'Flighting-Visualisierer',
    saeule: 'media',
    art: 'visualisierung',
    istEcht: false,
    persona: 'Sophie Klein',
    aufwand: 'Feierabend-Projekt · ~2 Std',
    aufwandStufe: 'mini',
    kurz: 'Ein Beispiel-Projekt, das einen Media-Flightplan sichtbar macht: pro Kanal eine Zeitleiste über die Wochen einer Kampagne, die Balkenbreite zeigt die Laufzeit, die Farbintensität das Wochenbudget. So sieht man auf einen Blick, wo sich Kanäle überlappen und wo Lücken klaffen. Bewusst klein: es visualisiert eine eingegebene Tabelle, es plant nicht selbst. Zeigt, wie aus einer Budget-CSV in einem Abend eine lesbare Übersicht wird.',
    story: {
      ausgangsproblem: 'Ein Flightplan lebt in einer Tabelle mit Wochenspalten — und niemand sieht darin auf einen Blick, wann welcher Kanal läuft. Die Überlappungen und Lücken erkennt man erst, wenn man es aufmalt.',
      ersterPrompt: 'Baue mir eine einzelne HTML-Seite, die einen Media-Flightplan visualisiert. Eingabe: eine kleine Tabelle mit Kanal, Startwoche, Endwoche und Wochenbudget. Ausgabe: pro Kanal eine Zeitleiste über die Wochen, Balken zeigen die Laufzeit, dunklere Balken = höheres Budget. Keine Bibliothek, offline lauffähig.',
      stolperstein: 'Die Skalierung der Wochen: Sobald eine Kampagne 4 statt 12 Wochen hatte, brach das Raster. Ein festes Wochenraster, das sich an die längste Laufzeit anpasst, hat das gelöst.',
      ergebnis: 'Ein Beispiel-Tool mit vorgeladenem Muster-Flightplan, das man direkt editieren kann. Balken pro Kanal, Budget als Farbintensität, mobil scrollt die Zeitleiste horizontal.'
    },
    faktenBox: {
      dauer: '~2 Stunden (Beispiel-Einordnung)',
      skills: ['prototyp-bauen', 'mediaplan-audit'],
      prompts: ['tool-anforderungen', 'csv-erklaeren'],
      bausteine: ['chart-setup', 'tabellen-look']
    },
    zitat: 'Als Projektmanagerin will ich Überlappungen sehen, nicht in Wochenspalten zählen — der Balken sagt es sofort.',
    nachbauStartprompt: 'Baue mir einen Flighting-Visualisierer als einzelne HTML-Datei. Eingabe: editierbare Tabelle mit Kanal, Startwoche, Endwoche, Wochenbudget. Ausgabe: pro Kanal eine Zeitleiste über alle Wochen, Balken für die Laufzeit, dunklere Balken für höheres Budget. Vorgeladenes Beispiel, keine externe Bibliothek, offline per Doppelklick, mobil horizontal scrollbar. pilot-CI: Schwarz #262626, Gelb #ffe05e, Papier #f1f1ec.',
    querverweise: {
      skills: [
        { id: 'prototyp-bauen', label: 'Prototyp bauen' },
        { id: 'mediaplan-audit', label: 'Mediaplan-Audit' }
      ],
      prompts: [
        { id: 'tool-anforderungen', label: 'Lass dich interviewen, bevor du baust' },
        { id: 'csv-erklaeren', label: 'CSV-Datei erklären lassen' }
      ],
      bausteine: [
        { id: 'chart-setup', label: 'Chart-Setup (ohne Bibliothek)' },
        { id: 'tabellen-look', label: 'Tabellen-Look' }
      ],
      beispieldaten: [
        { id: 'budget-plan', label: 'Budget-Plan (CSV)' }
      ]
    },
    liveUrl: 'demo/showroom/flighting-visualisierer.html',
    reaktionSeed: 8,
    spotlight: false
  },

  {
    id: 'umfrage-dashboard',
    titel: 'Umfrage-Dashboard',
    saeule: 'insights',
    art: 'dashboard',
    istEcht: false,
    persona: 'Jan Richter',
    aufwand: 'Halber Tag · ~4 Std',
    aufwandStufe: 'halber-tag',
    kurz: 'Ein Beispiel-Projekt, das über die einfache Balken-Auswertung hinausgeht: aus einer Umfrage-CSV baut es ein kleines Dashboard mit Kennzahlen-Kacheln (Anzahl Antworten, Zufriedenheit als Durchschnitt, größter Kanal) plus Verteilungs-Balken je Frage. Ein NPS-artiger Wert wird aus einer 1–5-Skala grob geschätzt und ehrlich als Näherung ausgewiesen. Zeigt, wie aus rohen Antworten in wenigen Stunden ein teilbares Übersichtsbild wird.',
    story: {
      ausgangsproblem: 'Die reine Balken-Auswertung beantwortet „wie ist die Verteilung“, aber nicht „wie steht es insgesamt“. Für die Runde am Montag fehlten die drei, vier Kennzahlen ganz oben.',
      ersterPrompt: 'Erweitere eine Umfrage-Auswertung zu einem kleinen Dashboard. Aus einer CSV (Frage;Antwort) sollen oben Kennzahlen-Kacheln stehen: Gesamtzahl Antworten, Durchschnitts-Zufriedenheit auf einer 1–5-Skala, meistgenannter Kanal. Darunter je Frage die Verteilung als Balken. Alles in einer HTML-Datei, keine Bibliothek.',
      stolperstein: 'Die Zufriedenheit als Zahl brauchte eine Zuordnung von Textantworten wie „Sehr zufrieden“ auf Werte 1–5. Diese Zuordnung musste sichtbar und die abgeleitete Kennzahl klar als Schätzung markiert sein — sonst wirkt eine Näherung wie eine Messung.',
      ergebnis: 'Ein Beispiel-Dashboard mit Kennzahlen-Band oben, Verteilungs-Balken darunter und einer offen gelegten Skala-Zuordnung. Der Zufriedenheitswert ist ausdrücklich als Näherung gekennzeichnet.'
    },
    faktenBox: {
      dauer: '~4 Stunden (Beispiel-Einordnung)',
      skills: ['daten-aufbereiten', 'prototyp-bauen'],
      prompts: ['umfrage-fragen', 'csv-erklaeren'],
      bausteine: ['stat-band', 'chart-setup', 'tabellen-look']
    },
    zitat: 'Ein Dashboard darf schätzen — aber es muss dazusagen, dass es schätzt. Sonst ist es keine Datenarbeit mehr.',
    nachbauStartprompt: 'Baue mir ein Umfrage-Dashboard als einzelne HTML-Datei. Eingabe: CSV mit Frage;Antwort. Oben ein Band aus Kennzahlen-Kacheln (Gesamtzahl Antworten, Durchschnitts-Zufriedenheit auf 1–5, meistgenannter Kanal), darunter je Frage die Antwortverteilung als Balken. Zeige die Skala-Zuordnung offen und markiere abgeleitete Werte klar als Näherung. Keine externe Bibliothek, offline per Doppelklick, mobil-tauglich. pilot-CI: Schwarz #262626, Gelb #ffe05e, Papier #f1f1ec.',
    querverweise: {
      skills: [
        { id: 'daten-aufbereiten', label: 'Daten aufbereiten' },
        { id: 'prototyp-bauen', label: 'Prototyp bauen' }
      ],
      prompts: [
        { id: 'umfrage-fragen', label: 'Umfrage-Fragen ohne Schieflage' },
        { id: 'csv-erklaeren', label: 'CSV-Datei erklären lassen' }
      ],
      bausteine: [
        { id: 'stat-band', label: 'Kennzahlen-Band' },
        { id: 'chart-setup', label: 'Chart-Setup (ohne Bibliothek)' },
        { id: 'tabellen-look', label: 'Tabellen-Look' }
      ],
      beispieldaten: [
        { id: 'umfrage-rohdaten', label: 'Umfrage-Rohdaten (CSV)' }
      ]
    },
    liveUrl: 'demo/showroom/umfrage-dashboard.html',
    reaktionSeed: 17,
    spotlight: false
  },

  {
    id: 'moodboard-generator',
    titel: 'Moodboard-Generator',
    saeule: 'creation',
    art: 'generator',
    istEcht: false,
    persona: 'Mia Hoffmann',
    aufwand: 'Feierabend-Projekt · ~3 Std',
    aufwandStufe: 'mini',
    kurz: 'Ein Beispiel-Projekt für den frühen Kreativ-Moment: aus ein paar Stichworten und einer Stimmung würfelt das Tool eine harmonische Farbpalette samt Schrift-Paarung und legt sie als Moodboard-Kacheln nebeneinander. Keine Bilder aus dem Netz, alles aus Code — Flächen, Verläufe, Typo-Proben. Zum Weiterreichen ans Design-Team oder als Startpunkt fürs echte Board. Bewusst simpel: es inspiriert, es ersetzt keine Designerin.',
    story: {
      ausgangsproblem: 'Am Anfang eines Projekts steht oft eine leere Fläche und die Frage „welche Richtung“. Ein grober visueller Anstoß — Farbe, Kontrast, Schriftgefühl — hilft mehr als ein weißes Blatt.',
      ersterPrompt: 'Baue mir einen Moodboard-Generator als einzelne HTML-Datei. Eingabe: ein paar Stichworte und eine Stimmung (z. B. ruhig, energetisch, edel). Ausgabe: eine harmonische Farbpalette, eine passende Schrift-Paarung und Moodboard-Kacheln, die das als Flächen und Typo-Proben zeigen. Alles aus Code, keine externen Bilder, keine Bibliothek.',
      stolperstein: 'Zufällige Farben sahen schnell schmutzig aus. Erst über einen HSL-Ansatz mit festen Abständen im Farbkreis wurden die Paletten verlässlich harmonisch statt beliebig.',
      ergebnis: 'Ein Beispiel-Generator mit „Neu würfeln“-Knopf, der aus Stichworten und Stimmung immer wieder ein stimmiges Board erzeugt — Palette, Schriften, Kacheln. Rein aus CSS und JS, offline.'
    },
    faktenBox: {
      dauer: '~3 Stunden (Beispiel-Einordnung)',
      skills: ['moodboard', 'frontend-design'],
      prompts: ['bildbrief'],
      bausteine: ['karten-grid', 'header-hero']
    },
    zitat: 'Ich brauche kein fertiges Design vom Tool — ich brauche einen Funken, gegen den ich denken kann.',
    nachbauStartprompt: 'Baue mir einen Moodboard-Generator als einzelne HTML-Datei. Eingabe: Stichworte und eine Stimmung. Ausgabe: eine harmonische Farbpalette (HSL-basiert, verlässlich stimmig), eine Schrift-Paarung und Moodboard-Kacheln aus reinen CSS-Flächen und Typo-Proben, plus einen „Neu würfeln“-Knopf. Keine externen Bilder, keine Bibliothek, offline per Doppelklick, mobil-tauglich. pilot-CI: Schwarz #262626, Gelb #ffe05e, Papier #f1f1ec.',
    querverweise: {
      skills: [
        { id: 'moodboard', label: 'Moodboard-Generator' },
        { id: 'frontend-design', label: 'frontend-design' }
      ],
      prompts: [
        { id: 'bildbrief', label: 'Bildbrief für das Design-Team' }
      ],
      bausteine: [
        { id: 'karten-grid', label: 'Karten-Grid' },
        { id: 'header-hero', label: 'Header mit Hero' }
      ],
      beispieldaten: [
        { id: 'briefing-website-relaunch', label: 'Briefing Website-Relaunch (MD)' }
      ]
    },
    liveUrl: 'demo/showroom/moodboard-generator.html',
    reaktionSeed: 21,
    spotlight: false
  },

  {
    id: 'urlaubsuebergabe-helfer',
    titel: 'Urlaubsübergabe-Helfer',
    saeule: 'office',
    art: 'helfer',
    istEcht: false,
    persona: 'Anna Schreiber',
    aufwand: 'Feierabend-Projekt · ~2 Std',
    aufwandStufe: 'mini',
    kurz: 'Ein Beispiel-Projekt gegen das schlechte Gewissen vor dem Urlaub: ein geführtes Formular fragt Projekte, Ansprechpartner, laufende Aufgaben und Notfall-Kontakte ab und setzt daraus eine saubere, kopierfertige Übergabe-Doku zusammen. Vorschau live neben dem Formular, ein Klick kopiert den fertigen Text. Kein Speicher, kein Konto — reine Formatierungs-Hilfe, damit die Vertretung nichts sucht.',
    story: {
      ausgangsproblem: 'Übergaben vor dem Urlaub entstehen meist auf den letzten Drücker und lesen sich entsprechend: Stichworte, Lücken, kein roter Faden. Die Vertretung sucht dann doch wieder nach.',
      ersterPrompt: 'Baue mir einen Urlaubsübergabe-Helfer als einzelne HTML-Datei. Ein Formular fragt Projekte, jeweils den Status, offene Aufgaben, Ansprechpartner und Notfall-Kontakte ab. Daraus soll live eine gut strukturierte Übergabe-Doku entstehen, die ich mit einem Klick kopieren kann. Keine Bibliothek, kein Speicher, offline lauffähig.',
      stolperstein: 'Der kopierte Text übernahm anfangs leere Felder als hohle Überschriften. Erst das konsequente Weglassen leerer Abschnitte machte die Doku sauber statt löchrig.',
      ergebnis: 'Ein Beispiel-Helfer mit Formular links, Live-Vorschau rechts und „Übergabe kopieren“-Knopf. Auf dem Handy stapeln sich Formular und Vorschau untereinander.'
    },
    faktenBox: {
      dauer: '~2 Stunden (Beispiel-Einordnung)',
      skills: ['internal-comms', 'meeting-notes'],
      prompts: ['uebergabe-doku', 'management-sprache'],
      bausteine: ['feature-liste', 'footer']
    },
    zitat: 'Eine gute Übergabe ist Fürsorge für die Vertretung — das Tool nimmt mir nur die Formatierung ab, nicht das Mitdenken.',
    nachbauStartprompt: 'Baue mir einen Urlaubsübergabe-Helfer als einzelne HTML-Datei. Links ein Formular für Projekte, Status, offene Aufgaben, Ansprechpartner und Notfall-Kontakte; rechts eine Live-Vorschau der fertigen Übergabe-Doku und ein „Übergabe kopieren“-Knopf. Leere Felder werden im Ergebnis weggelassen. Keine externe Bibliothek, kein Speicher, offline per Doppelklick, mobil untereinander. pilot-CI: Schwarz #262626, Gelb #ffe05e, Papier #f1f1ec.',
    querverweise: {
      skills: [
        { id: 'internal-comms', label: 'internal-comms' },
        { id: 'meeting-notes', label: 'Meeting Notes' }
      ],
      prompts: [
        { id: 'uebergabe-doku', label: 'Übergabe-Doku vor dem Urlaub' },
        { id: 'management-sprache', label: 'Reporting-Zahlen in Management-Sprache' }
      ],
      bausteine: [
        { id: 'feature-liste', label: 'Feature-Liste' },
        { id: 'footer', label: 'Footer' }
      ],
      beispieldaten: []
    },
    liveUrl: 'demo/showroom/urlaubsuebergabe-helfer.html',
    reaktionSeed: 6,
    spotlight: false
  },

  {
    id: 'utm-link-baukasten',
    titel: 'UTM-Link-Baukasten',
    saeule: 'performance',
    art: 'tool',
    istEcht: false,
    persona: 'Lukas Weber',
    aufwand: 'Feierabend-Projekt · ~2 Std',
    aufwandStufe: 'mini',
    kurz: 'Ein Beispiel-Projekt für sauberes Tracking von Anfang an: Ziel-URL und die UTM-Parameter eintragen — Source, Medium, Campaign, optional Content und Term — und das Tool baut den korrekt kodierten Link zusammen, kleingeschrieben und ohne Leerzeichen-Fallen. Ein Klick kopiert ihn, eine kleine Liste sammelt die zuletzt gebauten Links für eine Kampagne. Bewusst schmal: es baut und prüft Links, es verwaltet keine Kampagnen.',
    story: {
      ausgangsproblem: 'UTM-Links per Hand zusammenzustöpseln geht schnell schief: ein Großbuchstabe hier, ein Leerzeichen da — und schon zerfällt die Auswertung in doppelte Quellen.',
      ersterPrompt: 'Baue mir einen UTM-Link-Baukasten als einzelne HTML-Datei. Eingaben: Ziel-URL, utm_source, utm_medium, utm_campaign und optional utm_content und utm_term. Das Tool soll die Werte kleinschreiben, Leerzeichen ersetzen, korrekt kodieren und den fertigen Link zeigen. Ein Kopier-Knopf und eine Liste der zuletzt gebauten Links. Keine Bibliothek, offline lauffähig.',
      stolperstein: 'Bei fehlender Ziel-URL oder leerem Pflichtfeld entstand ein kaputter Link mit hängenden Und-Zeichen. Eine kleine Prüfung, die Pflichtfelder markiert und leere Parameter weglässt, hat das geheilt.',
      ergebnis: 'Ein Beispiel-Tool, das aus Eingaben einen sauberen, kodierten Tracking-Link baut, ihn auf einen Klick kopiert und die letzten Links merkt. Kleinschreibung und Kodierung passieren automatisch.'
    },
    faktenBox: {
      dauer: '~2 Stunden (Beispiel-Einordnung)',
      skills: ['tracking-audit', 'prototyp-bauen'],
      prompts: ['tool-anforderungen'],
      bausteine: ['kontaktformular', 'tabellen-look']
    },
    zitat: 'Ein falsch getaggter Link kostet dich später Stunden in der Auswertung — lieber baut ihn ein Tool immer gleich richtig.',
    nachbauStartprompt: 'Baue mir einen UTM-Link-Baukasten als einzelne HTML-Datei. Eingaben: Ziel-URL, utm_source, utm_medium, utm_campaign, optional utm_content und utm_term. Werte automatisch kleinschreiben, Leerzeichen ersetzen, korrekt kodieren, leere Parameter weglassen. Zeige den fertigen Link, biete einen Kopier-Knopf und eine Liste der zuletzt gebauten Links. Keine externe Bibliothek, offline per Doppelklick, mobil-tauglich. pilot-CI: Schwarz #262626, Gelb #ffe05e, Papier #f1f1ec.',
    querverweise: {
      skills: [
        { id: 'tracking-audit', label: 'Tracking-Audit' },
        { id: 'prototyp-bauen', label: 'Prototyp bauen' }
      ],
      prompts: [
        { id: 'tool-anforderungen', label: 'Lass dich interviewen, bevor du baust' }
      ],
      bausteine: [
        { id: 'kontaktformular', label: 'Kontaktformular-Optik' },
        { id: 'tabellen-look', label: 'Tabellen-Look' }
      ],
      beispieldaten: [
        { id: 'kampagnen-kpis', label: 'Kampagnen-KPIs (CSV)' }
      ]
    },
    liveUrl: 'demo/showroom/utm-link-baukasten.html',
    reaktionSeed: 13,
    spotlight: false
  },

  {
    id: 'wettbewerbs-radar',
    titel: 'Wettbewerbs-Radar',
    saeule: 'strategy',
    art: 'dashboard',
    istEcht: false,
    persona: 'Anna Schreiber',
    aufwand: 'Halber Tag · ~4 Std',
    aufwandStufe: 'halber-tag',
    kurz: 'Ein Beispiel-Projekt für den strategischen Überblick: mehrere Wettbewerber werden auf wenigen selbst gewählten Achsen bewertet — etwa Preis, Reichweite, Innovation, Markenstärke — und das Tool zeichnet daraus ein Radar-Diagramm plus eine Vergleichstabelle. Man sieht sofort, wo das eigene Haus vorn liegt und wo eine Lücke klafft. Ausdrücklich mit eigenen Einschätzungen gefüttert: es ist ein Denk- und Diskussionswerkzeug, kein Marktforschungs-Ersatz.',
    story: {
      ausgangsproblem: 'Wettbewerbsvergleiche versanden oft in langen Fließtext-Tabellen, in denen niemand die eigentliche Aussage sieht. Ein Bild, das Stärken und Lücken sofort zeigt, fehlt.',
      ersterPrompt: 'Baue mir einen Wettbewerbs-Radar als einzelne HTML-Datei. Ich gebe mehrere Wettbewerber und wenige Bewertungsachsen ein (z. B. Preis, Reichweite, Innovation, Markenstärke) und vergebe je Achse einen Wert von 1 bis 5. Das Tool soll daraus ein Radar-Diagramm und eine Vergleichstabelle zeichnen. Keine Bibliothek, offline lauffähig.',
      stolperstein: 'Ein Radar aus reinem SVG zu zeichnen, ohne Chart-Bibliothek, brauchte etwas Trigonometrie für die Achspunkte. Bei mehr als vier, fünf Wettbewerbern wurde das Bild zudem unlesbar — also eine bewusste Obergrenze und dezente Farben.',
      ergebnis: 'Ein Beispiel-Dashboard mit SVG-Radar, Vergleichstabelle und dem klaren Hinweis, dass die Werte eigene Einschätzungen sind. Ein Denkwerkzeug für den Strategie-Termin, keine gemessene Wahrheit.'
    },
    faktenBox: {
      dauer: '~4 Stunden (Beispiel-Einordnung)',
      skills: ['wettbewerbs-monitor', 'markt-research'],
      prompts: ['wettbewerber-werbung'],
      bausteine: ['karten-grid', 'stat-band']
    },
    zitat: 'Das Radar liefert keine Wahrheit, es strukturiert unsere Einschätzung — und plötzlich diskutieren alle über dieselbe Lücke.',
    nachbauStartprompt: 'Baue mir einen Wettbewerbs-Radar als einzelne HTML-Datei. Eingabe: mehrere Wettbewerber und wenige Bewertungsachsen (z. B. Preis, Reichweite, Innovation, Markenstärke), je Achse ein Wert von 1 bis 5. Ausgabe: ein Radar-Diagramm aus reinem SVG plus eine Vergleichstabelle, mit dem sichtbaren Hinweis, dass die Werte eigene Einschätzungen sind. Keine externe Bibliothek, offline per Doppelklick, mobil-tauglich. pilot-CI: Schwarz #262626, Gelb #ffe05e, Papier #f1f1ec.',
    querverweise: {
      skills: [
        { id: 'wettbewerbs-monitor', label: 'Wettbewerbs-Monitor' },
        { id: 'markt-research', label: 'Markt-Research' }
      ],
      prompts: [
        { id: 'wettbewerber-werbung', label: 'Wettbewerber-Werbung analysieren' }
      ],
      bausteine: [
        { id: 'karten-grid', label: 'Karten-Grid' },
        { id: 'stat-band', label: 'Kennzahlen-Band' }
      ],
      beispieldaten: []
    },
    liveUrl: 'demo/showroom/wettbewerbs-radar.html',
    reaktionSeed: 12,
    spotlight: false
  }

];

// Abgeleitete Kennzahlen — NUR real Zählbares aus CASES (keine erfundenen Werte).
// total       = Anzahl aller Projekte
// echt        = echte, im Repo vorhandene Team-Tools (istEcht:true)
// beispiel    = inszenierte Beispiel-Projekte (istEcht:false), Demo aber echt klickbar
// saeulen     = Anzahl verschiedener Säulen, die die Projekte abdecken
const CASE_STATS = {
  total: CASES.length,
  echt: CASES.filter(c => c.istEcht).length,
  beispiel: CASES.filter(c => !c.istEcht).length,
  saeulen: new Set(CASES.map(c => c.saeule)).size
};
