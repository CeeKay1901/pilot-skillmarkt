// pilot AI Marketplace — Hilfe-Center, Säulen 2+3: GLOSSAR & FAQ (ausgelagerte Daten, Etappe E4).
// Klassisches Script, definiert globale Konstanten:
//   GLOSSAR — 44 Begriffe. Je Eintrag:
//     id         URL-tauglich, eindeutig (Deep-Link lernen-hilfe.html?begriff=<id>)
//     wort       Anzeigename; buchstabe = A-Z-Sprungleiste (explizit, nicht abgeleitet)
//     satz       genau EIN einfacher Erklärsatz (immer sichtbar)
//     beispiel   EIN konkretes pilot-/Marketplace-Beispiel (aufklappbar)
//     tiefe      optionale Vertiefung, 2-4 Sätze (aufklappbar)
//     votes      Seed „hat geholfen“ (2-38, Staffelung nach Alltagsrelevanz;
//                Demo-Werte, auf der Seite gekennzeichnet). Anzeige =
//                getVotes('begriff', id, votes).
//     verweise   0-2 Querverweise: { t: 'skill'|'prompt'|'befehl'|'begriff', id, name? }
//                skill/prompt tragen den Anzeigenamen mit (deren Daten sind auf
//                hilfe.html nicht geladen); befehl/begriff werden zur Laufzeit
//                gegen BEFEHLE bzw. GLOSSAR aufgelöst.
//   FAQ — 10 häufige Blocker. Je Eintrag: id (Deep-Link hilfe.html?faq=<id>),
//     frage, intro (1 Satz), schritte (nummeriert gerendert), verweise (wie oben),
//     optional stimme { autor, rolle, text } (seeded PILOTS-Persona aus
//     data/contributors.js — Demo-Stimme, auf der Seite gekennzeichnet).
// Fakten am 2026-07-16 gegen code.claude.com/docs (checkpointing, interactive-mode)
// verifiziert; alle skill:/prompt:-ids gegen data/skills.js (44) und data/prompts.js (23)
// geprüft, befehl:-ids gegen data/befehle.js. Redaktionsquelle: E4-Redaktionsblatt.

const GLOSSAR = [
  {
    id: 'agent',
    wort: 'Agent',
    buchstabe: 'A',
    votes: 24,
    satz: 'Ein Agent ist eine KI, die nicht nur antwortet, sondern selbstständig mehrere Arbeitsschritte nacheinander ausführt, um ein Ziel zu erreichen.',
    beispiel: 'Wenn du Claude Code bittest, „alle Kampagnen-PDFs in diesem Ordner zusammenzufassen“, öffnet es die Dateien, liest sie, schreibt die Zusammenfassung und legt sie ab — ohne dass du jeden Schritt einzeln anstoßen musst.',
    tiefe: 'Der Unterschied zum Chat: Im Chat lieferst du alles an und bekommst eine Antwort. Ein Agent plant selbst, welche Schritte nötig sind, nutzt Werkzeuge (Dateien lesen, Befehle ausführen, ins Web schauen) und prüft Zwischenergebnisse. Du bleibst trotzdem am Steuer — Claude Code fragt bei wichtigen Aktionen nach deiner Freigabe.',
    verweise: [
      { t: 'skill', id: 'erste-automation', name: 'Erste Automation' },
      { t: 'skill', id: 'erste-schritte', name: 'Erste Schritte' }
    ]
  },
  {
    id: 'api',
    wort: 'API (Schnittstelle)',
    buchstabe: 'A',
    votes: 12,
    satz: 'Eine API ist eine vereinbarte Tür, durch die ein Programm ein anderes Programm um Daten oder Dienste bitten kann.',
    beispiel: 'Wenn dein selbst gebautes Reporting-Tool aktuelle Wetterdaten für eine Out-of-Home-Kampagne anzeigen soll, holt es die über die API eines Wetterdienstes — automatisch, ohne dass jemand sie abtippt.',
    tiefe: 'API steht für „Application Programming Interface“. Praktisch heißt das: Anbieter A stellt Daten unter einer festen Adresse bereit, Programm B ruft diese Adresse auf und bekommt eine strukturierte Antwort (oft im JSON-Format). Viele APIs verlangen einen Schlüssel (API-Key) — der ist wie ein Ausweis und gehört nie öffentlich in den Code.',
    verweise: [
      { t: 'skill', id: 'erste-automation', name: 'Erste Automation' }
    ]
  },
  {
    id: 'backend',
    wort: 'Backend',
    buchstabe: 'B',
    votes: 5,
    satz: 'Das Backend ist der unsichtbare Teil einer Anwendung, der auf einem Server läuft und im Hintergrund Daten speichert und verarbeitet.',
    beispiel: 'Der pilot AI Marketplace hat bewusst kein Backend — alles passiert in deinem Browser, deshalb braucht er keinen eigenen Server und keine Anmeldung.',
    tiefe: 'Faustregel: Alles, was du siehst und anklickst, ist Frontend; alles, was zentral gespeichert oder berechnet wird, ist Backend. Ein Backend brauchst du erst, wenn mehrere Leute gemeinsame Daten teilen sollen — etwa gemeinsame Bewertungen statt lokaler. Für viele Citizen-Coding-Tools reicht ein reines Frontend völlig.',
    verweise: [
      { t: 'skill', id: 'webseite-bauen', name: 'Webseite bauen' }
    ]
  },
  {
    id: 'browser-konsole',
    wort: 'Browser-Konsole',
    buchstabe: 'B',
    votes: 10,
    satz: 'Die Browser-Konsole ist ein verstecktes Fenster im Browser, in dem Webseiten ihre Fehlermeldungen und Statusmeldungen ausgeben.',
    beispiel: 'Wenn dein selbst gebautes Kampagnen-Dashboard plötzlich leer bleibt, öffnest du die Konsole (meist F12), kopierst die rote Fehlermeldung und gibst sie Claude Code — das ist oft der schnellste Weg zur Lösung.',
    tiefe: 'Öffnen: F12 oder Rechtsklick → „Untersuchen“ → Reiter „Konsole“ (Chrome/Edge/Firefox). Rote Zeilen sind Fehler, gelbe Warnungen. Du musst sie nicht verstehen — es reicht, sie wörtlich an Claude weiterzugeben.',
    verweise: [
      { t: 'prompt', id: 'fehlersuche-vibecoding', name: 'Fehlersuche im eigenen Tool' },
      { t: 'skill', id: 'webaudit', name: 'webaudit' }
    ]
  },
  {
    id: 'bug',
    wort: 'Bug',
    buchstabe: 'B',
    votes: 10,
    satz: 'Ein Bug ist ein Fehler in einem Programm, durch den es sich anders verhält als beabsichtigt.',
    beispiel: 'Dein Umfrage-Tool zählt eine Antwort doppelt, wenn jemand zweimal schnell klickt — das ist ein klassischer Bug, kein Weltuntergang, sondern Alltag.',
    tiefe: 'Der Begriff stammt angeblich von einer echten Motte in einem frühen Computer. Wichtig für dich: Bugs sind normal und kein Zeichen, dass du etwas falsch gemacht hast. Beschreibe Claude, was du erwartet hast und was stattdessen passiert ist — je konkreter, desto schneller die Reparatur.',
    verweise: [
      { t: 'skill', id: 'systematic-debugging', name: 'systematic-debugging' },
      { t: 'prompt', id: 'fehlersuche-vibecoding', name: 'Fehlersuche im eigenen Tool' }
    ]
  },
  {
    id: 'cache',
    wort: 'Cache',
    buchstabe: 'C',
    votes: 8,
    satz: 'Der Cache ist ein Zwischenspeicher, in dem der Browser Teile einer Webseite aufbewahrt, damit sie beim nächsten Besuch schneller lädt.',
    beispiel: 'Du hast dein Team-Tool aktualisiert, aber eine Kollegin sieht noch die alte Version — ihr Browser zeigt sie aus dem Cache; ein beherztes Neuladen mit Strg+Shift+R holt die neue.',
    tiefe: 'Der Cache ist Freund und Falle zugleich: Er spart Ladezeit, zeigt aber manchmal veraltete Stände. Wenn nach einem Deploy „nichts passiert ist“, prüfe zuerst den Cache, bevor du einen Fehler suchst. Hartes Neuladen: Strg+Shift+R (Windows) bzw. Cmd+Shift+R (Mac).',
    verweise: []
  },
  {
    id: 'cli',
    wort: 'CLI (Kommandozeile)',
    buchstabe: 'C',
    votes: 6,
    satz: 'Ein CLI ist ein Programm, das du nicht mit Klicks bedienst, sondern mit getippten Befehlen im Terminal.',
    beispiel: 'Claude Code ist ein CLI: Du tippst `claude` ins Terminal, und statt Buttons und Menüs gibt es ein Gespräch in Textform.',
    tiefe: 'CLI steht für „Command Line Interface“, das Gegenstück ist die grafische Oberfläche (GUI) mit Fenstern und Buttons. CLIs wirken erst spröde, sind aber präzise und schnell — und bei Claude Code tippst du ohnehin normale deutsche Sätze, keine kryptischen Kommandos.',
    verweise: [
      { t: 'skill', id: 'erste-schritte', name: 'Erste Schritte' }
    ]
  },
  {
    id: 'commit',
    wort: 'Commit',
    buchstabe: 'C',
    votes: 26,
    satz: 'Ein Commit ist ein gespeicherter Zwischenstand deines Projekts mit einer kurzen Notiz, was sich geändert hat.',
    beispiel: 'Nach jedem funktionierenden Schritt an deinem Mediaplan-Tool sagst du Claude „mach einen Commit“ — so entsteht eine Kette von Sicherungspunkten, zu denen du jederzeit zurück kannst.',
    tiefe: 'Commits sind das Herz der Versionierung mit Git: Jeder Commit hält fest, wer wann was geändert hat. Gute Gewohnheit: lieber viele kleine Commits („Filter für Kanäle ergänzt“) als einen riesigen am Ende. Kaputt gehen kann dabei nichts — Commits fügen nur Historie hinzu.',
    verweise: [
      { t: 'skill', id: 'tool-teilen', name: 'Tool teilen' }
    ]
  },
  {
    id: 'csv',
    wort: 'CSV',
    buchstabe: 'C',
    votes: 11,
    satz: 'CSV ist ein sehr einfaches Tabellenformat: eine Textdatei, in der die Spalten durch Kommas oder Semikolons getrennt sind.',
    beispiel: 'Der Export aus dem AdServer kommt als CSV — du gibst die Datei Claude Code und lässt dir erklären, welche Spalten drinstecken, bevor du daraus einen Report baust.',
    tiefe: 'CSV steht für „Comma-Separated Values“. Der Vorteil: Jedes Programm kann es lesen, von Excel bis Claude. Die Stolperfalle im deutschen Raum: Oft trennt ein Semikolon statt Komma, und Umlaute können kaputt aussehen — beides kann Claude beim Einlesen für dich geradeziehen.',
    verweise: [
      { t: 'prompt', id: 'csv-erklaeren', name: 'CSV-Datei erklären lassen' },
      { t: 'skill', id: 'daten-aufbereiten', name: 'Daten aufbereiten' }
    ]
  },
  {
    id: 'css',
    wort: 'CSS',
    buchstabe: 'C',
    votes: 13,
    satz: 'CSS ist die Sprache, die bestimmt, wie eine Webseite aussieht — Farben, Schriften, Abstände, Anordnung.',
    beispiel: '„Mach die Überschrift größer und den Hintergrund pilot-gelb“ — solche Wünsche setzt Claude Code in CSS um, ohne dass du eine Zeile davon selbst schreiben musst.',
    tiefe: 'CSS steht für „Cascading Style Sheets“. Merkhilfe: HTML ist das Skelett (Inhalt und Struktur), CSS die Kleidung (Aussehen), JavaScript die Muskeln (Verhalten). Wenn etwas „komisch aussieht“, ist fast immer CSS die Stellschraube.',
    verweise: [
      { t: 'skill', id: 'webseite-bauen', name: 'Webseite bauen' }
    ]
  },
  {
    id: 'dateipfad',
    wort: 'Datei-Pfad',
    buchstabe: 'D',
    votes: 17,
    satz: 'Ein Datei-Pfad ist die vollständige Adresse einer Datei auf deinem Rechner, Ordner für Ordner aufgeschrieben.',
    beispiel: '`C:\\Projekte\\kampagnen-tool\\index.html` sagt Claude Code exakt, welche Datei gemeint ist — viel eindeutiger als „die Datei von gestern“.',
    tiefe: 'Windows trennt Ordner mit `\\`, Mac und Linux mit `/`. In Claude Code kannst du Dateien mit `@` erwähnen und bekommst Vorschläge beim Tippen. Tipp bei Unsicherheit: Datei im Explorer/Finder suchen und den Pfad aus der Adressleiste kopieren.',
    verweise: [
      { t: 'befehl', id: 'datei-verweis' },
      { t: 'skill', id: 'erste-schritte', name: 'Erste Schritte' }
    ]
  },
  {
    id: 'debugging',
    wort: 'Debugging',
    buchstabe: 'D',
    votes: 9,
    satz: 'Debugging ist die systematische Suche nach der Ursache eines Fehlers — erst verstehen, dann reparieren.',
    beispiel: 'Statt Claude zehnmal „fix es!“ zu schreiben, sagst du: „Der CSV-Import bricht bei Zeile 200 ab, hier ist die Fehlermeldung“ — das ist Debugging, und es spart dir Stunden.',
    tiefe: 'Der häufigste Anfängerfehler ist, wild Lösungen zu raten statt die Ursache einzukreisen. Gutes Vorgehen: Fehler zuverlässig reproduzieren, Fehlermeldung wörtlich kopieren, letzten funktionierenden Stand benennen. Der Skill systematic-debugging gibt Claude genau diese Disziplin mit.',
    verweise: [
      { t: 'skill', id: 'systematic-debugging', name: 'systematic-debugging' },
      { t: 'prompt', id: 'fehlersuche-vibecoding', name: 'Fehlersuche im eigenen Tool' }
    ]
  },
  {
    id: 'deploy',
    wort: 'Deploy',
    buchstabe: 'D',
    votes: 25,
    satz: 'Ein Deploy ist der Moment, in dem dein Projekt von deinem Rechner ins Internet wandert und für andere erreichbar wird.',
    beispiel: 'Dein Briefing-Generator läuft lokal? Nach dem Deploy auf GitHub Pages kann das ganze Team ihn unter einer normalen Web-Adresse öffnen — ohne irgendwas zu installieren.',
    tiefe: '„Deployen“ heißt wörtlich „ausrollen“. Bei GitHub Pages ist der Deploy an Git gekoppelt: Du pushst deine Änderungen, kurz darauf ist die Live-Seite aktuell. Es gibt also keinen separaten „Hochladen“-Knopf — die Versionierung ist gleichzeitig der Veröffentlichungsweg.',
    verweise: [
      { t: 'skill', id: 'tool-teilen', name: 'Tool teilen' },
      { t: 'skill', id: 'webseite-bauen', name: 'Webseite bauen' }
    ]
  },
  {
    id: 'fine-tuning',
    wort: 'Fine-Tuning',
    buchstabe: 'F',
    votes: 2,
    satz: 'Fine-Tuning bedeutet, ein KI-Modell mit eigenen Trainingsdaten nachzutrainieren, damit es sich dauerhaft anders verhält — das ist aufwendig und für unseren Alltag fast nie nötig.',
    beispiel: 'Damit Claude im pilot-Ton schreibt, brauchst du kein Fine-Tuning — ein guter Prompt mit Tonalitäts-Beispielen (oder der Tonalitäts-Check-Skill) erreicht dasselbe in fünf Minuten.',
    tiefe: 'Die Abgrenzung: Prompts und Skills ändern das Verhalten pro Gespräch, Fine-Tuning verändert das Modell selbst — mit eigenem Trainingslauf, Kosten und Pflegeaufwand. Faustregel: Erst Prompt, dann Wissen anbinden, und Fine-Tuning nur, wenn Spezialist:innen es nach Prüfung empfehlen. Für Citizen Coding bei pilot ist es kein Werkzeug im Alltag.',
    verweise: [
      { t: 'skill', id: 'tonalitaets-check', name: 'Tonalitäts-Check' }
    ]
  },
  {
    id: 'frontend',
    wort: 'Frontend',
    buchstabe: 'F',
    votes: 6,
    satz: 'Das Frontend ist der sichtbare Teil einer Anwendung — alles, was du im Browser siehst und anklickst.',
    beispiel: 'Katalog, Suchfeld und Bewertungssterne im pilot AI Marketplace sind Frontend; es gibt dahinter keinen Server, die ganze Seite läuft in deinem Browser.',
    tiefe: 'Frontend besteht typischerweise aus HTML (Struktur), CSS (Aussehen) und JavaScript (Verhalten). Reine Frontend-Tools sind ideal für den Einstieg: Sie sind schnell gebaut, leicht zu teilen und können keine zentralen Daten kaputt machen.',
    verweise: [
      { t: 'skill', id: 'webseite-bauen', name: 'Webseite bauen' },
      { t: 'skill', id: 'prototyp-bauen', name: 'Prototyp bauen' }
    ]
  },
  {
    id: 'git',
    wort: 'Git',
    buchstabe: 'G',
    votes: 22,
    satz: 'Git ist ein Werkzeug, das jede Änderung an deinem Projekt protokolliert, sodass du jederzeit zu einem früheren Stand zurückkehren kannst.',
    beispiel: 'Claude hat beim Umbau deines Reporting-Tools etwas zerlegt? Mit Git holst du den Stand von heute Vormittag zurück — nichts ist verloren.',
    tiefe: 'Git ist der Standard für Versionierung und die Grundlage von GitHub. Du musst die Befehle nicht auswendig können: Sag Claude Code „sichere den Stand“ oder „geh zum letzten Commit zurück“, und es übersetzt das in Git. Wichtig ist nur das Prinzip: regelmäßig sichern, dann ist Experimentieren risikofrei.',
    verweise: [
      { t: 'skill', id: 'tool-teilen', name: 'Tool teilen' }
    ]
  },
  {
    id: 'github-pages',
    wort: 'GitHub Pages',
    buchstabe: 'G',
    votes: 18,
    satz: 'GitHub Pages ist ein kostenloser Dienst, der die Dateien aus einem GitHub-Projekt als echte Webseite ins Internet stellt.',
    beispiel: 'Der pilot AI Marketplace selbst liegt auf GitHub Pages — keine Server-Miete, keine IT-Tickets, einfach Dateien hochladen und die Seite ist live.',
    tiefe: 'Voraussetzung ist ein Repo auf GitHub; in den Einstellungen aktivierst du Pages, und ab dann wird jeder Push automatisch veröffentlicht. Es funktioniert nur für statische Seiten (HTML, CSS, JavaScript) — genau das, was bei Citizen-Coding-Tools meist entsteht. Achtung: Öffentliche Repos bedeuten öffentliche Seiten — keine vertraulichen Inhalte hineinlegen.',
    verweise: [
      { t: 'skill', id: 'tool-teilen', name: 'Tool teilen' },
      { t: 'skill', id: 'webseite-bauen', name: 'Webseite bauen' }
    ]
  },
  {
    id: 'halluzination',
    wort: 'Halluzination',
    buchstabe: 'H',
    votes: 33,
    satz: 'Eine Halluzination ist eine KI-Antwort, die überzeugend klingt, aber frei erfunden ist.',
    beispiel: 'Claude nennt dir eine „Studie von Nielsen 2024“ mit exakten Prozentzahlen für deine Pitch-Folie — bevor die ins Kundendeck wandert, prüfst du, ob es die Studie überhaupt gibt.',
    tiefe: 'Sprachmodelle erzeugen Text, der wahrscheinlich klingt — nicht Text, der garantiert stimmt. Besonders anfällig: konkrete Zahlen, Quellenangaben, Namen, Paragrafen und alles nach dem Wissensstand des Modells. Gegenmittel: Quellen mitliefern lassen, kritische Fakten selbst prüfen und der KI erlauben, „weiß ich nicht“ zu sagen.',
    verweise: [
      { t: 'skill', id: 'verification-before-completion', name: 'verification-before-completion' }
    ]
  },
  {
    id: 'html',
    wort: 'HTML',
    buchstabe: 'H',
    votes: 15,
    satz: 'HTML ist die Sprache, die den Inhalt und die Struktur einer Webseite beschreibt — Überschriften, Absätze, Links, Bilder.',
    beispiel: 'Eine einzelne HTML-Datei reicht schon für ein nützliches Tool: Dein erster Prototyp bei pilot kann eine `index.html` sein, die du per Doppelklick im Browser öffnest.',
    tiefe: 'HTML steht für „HyperText Markup Language“. Es ist keine Programmiersprache, sondern eine Auszeichnungssprache: Sie sagt „das hier ist eine Überschrift“, nicht „rechne das aus“. Zusammen mit CSS (Aussehen) und JavaScript (Verhalten) ergibt es das komplette Frontend.',
    verweise: [
      { t: 'skill', id: 'webseite-bauen', name: 'Webseite bauen' },
      { t: 'prompt', id: 'code-verstehen', name: 'Was tut diese Datei?' }
    ]
  },
  {
    id: 'javascript',
    wort: 'JavaScript',
    buchstabe: 'J',
    votes: 14,
    satz: 'JavaScript ist die Programmiersprache, die Webseiten interaktiv macht — alles, was auf Klicks reagiert, rechnet oder sich bewegt.',
    beispiel: 'Dass im Marketplace die Skill-Liste beim Tippen sofort gefiltert wird, ist JavaScript — es läuft direkt in deinem Browser, ohne Server.',
    tiefe: 'Nicht verwechseln mit Java — trotz des Namens sind das zwei völlig verschiedene Sprachen. JavaScript ist die Sprache, in der Claude Code die meisten Citizen-Coding-Tools baut, weil sie überall läuft, wo ein Browser ist. Du musst sie nicht schreiben können; es hilft aber, sie beim Lesen grob zu erkennen.',
    verweise: [
      { t: 'skill', id: 'webseite-bauen', name: 'Webseite bauen' },
      { t: 'prompt', id: 'code-verstehen', name: 'Was tut diese Datei?' }
    ]
  },
  {
    id: 'json',
    wort: 'JSON',
    buchstabe: 'J',
    votes: 11,
    satz: 'JSON ist ein Textformat, in dem Daten sauber strukturiert gespeichert werden — mit geschweiften Klammern, Anführungszeichen und Doppelpunkten.',
    beispiel: 'Die 44 Skills des Marketplace stecken in einer Datenstruktur im JSON-Stil: pro Skill Name, Beschreibung, Kategorie — für Menschen lesbar, für Programme perfekt verarbeitbar.',
    tiefe: 'JSON steht für „JavaScript Object Notation“ und ist das Lieblingsformat von APIs und Konfigurationsdateien. Der Aufbau: Schlüssel-Wert-Paare wie `"name": "Campaign Checker"`. Wenn du eine JSON-Datei bekommst und nur Klammern siehst — gib sie Claude und lass sie dir als Tabelle erklären.',
    verweise: [
      { t: 'skill', id: 'daten-aufbereiten', name: 'Daten aufbereiten' },
      { t: 'prompt', id: 'csv-erklaeren', name: 'CSV-Datei erklären lassen' }
    ]
  },
  {
    id: 'kontextfenster',
    wort: 'Kontextfenster',
    buchstabe: 'K',
    votes: 34,
    satz: 'Das Kontextfenster ist das Kurzzeitgedächtnis der KI — alles, was sie in einem Gespräch gleichzeitig im Blick behalten kann.',
    beispiel: 'Du fütterst Claude Code mit einem 80-Seiten-Briefing, drei PDFs und zwei Stunden Gespräch — irgendwann ist das Fenster voll, und Details vom Anfang gehen verloren.',
    tiefe: 'Die Größe wird in Token gemessen. Wenn es eng wird, hilft in Claude Code der Befehl /compact (fasst das Gespräch zusammen) oder /clear (frischer Start). Gute Gewohnheit: pro Aufgabe eine Sitzung, und lange Dokumente lieber gezielt referenzieren als komplett hineinkippen.',
    verweise: [
      { t: 'befehl', id: 'compact' },
      { t: 'prompt', id: 'uebergabe-doku', name: 'Übergabe-Doku vor dem Urlaub' }
    ]
  },
  {
    id: 'lizenz',
    wort: 'Lizenz',
    buchstabe: 'L',
    votes: 2,
    satz: 'Eine Lizenz ist der rechtliche Beipackzettel von Software: Sie legt fest, was du damit tun darfst — nutzen, verändern, weitergeben.',
    beispiel: 'Bevor du eine gefundene Icon-Bibliothek in dein pilot-Tool einbaust, wirf einen Blick auf die Lizenz — die Lucide-Icons im Marketplace etwa sind unter einer freien Lizenz erlaubt.',
    tiefe: 'Häufige Open-Source-Lizenzen wie MIT oder Apache 2.0 sind sehr großzügig: nutzen, ändern, weitergeben erlaubt, meist nur mit Namensnennung. Vorsicht bei „nur für private Nutzung“ oder fehlender Lizenzangabe — im Zweifel Claude fragen, was die Lizenz konkret erlaubt, und bei Kundenprojekten intern absichern.',
    verweise: [
      { t: 'skill', id: 'superpowers', name: 'superpowers' }
    ]
  },
  {
    id: 'localstorage',
    wort: 'localStorage',
    buchstabe: 'L',
    votes: 9,
    satz: 'localStorage ist ein kleiner Speicher direkt in deinem Browser, in dem eine Webseite Daten nur auf deinem Rechner ablegen kann.',
    beispiel: 'Wenn du im Katalog einen Skill bewertest, speichert dein Browser das in localStorage — es verlässt nie deinen Rechner.',
    tiefe: 'Deshalb sieht jede:r im Marketplace die eigenen Bewertungen, aber niemand die der anderen — es gibt keinen Server dahinter. Die Daten bleiben erhalten, bis du die Website-Daten im Browser löschst. Für erste Tools ist localStorage ideal: Speichern ohne Backend, ohne Anmeldung, ohne Datenschutz-Kopfschmerz.',
    verweise: [
      { t: 'skill', id: 'prototyp-bauen', name: 'Prototyp bauen' }
    ]
  },
  {
    id: 'markdown',
    wort: 'Markdown',
    buchstabe: 'M',
    votes: 20,
    satz: 'Markdown ist eine einfache Schreibweise, mit der du reinen Text formatierst — etwa `#` für Überschriften und `**fett**` für Fettdruck.',
    beispiel: 'Claude antwortet oft in Markdown, und Dateien wie `README.md` oder `CLAUDE.md` in deinem Projekt sind Markdown — der Anhang `.md` verrät es.',
    tiefe: 'Der Charme: Markdown bleibt auch unformatiert gut lesbar und funktioniert überall — in GitHub, Notion, Langdock und Claude. Die wichtigsten Zeichen lernst du in fünf Minuten: `#` Überschrift, `-` Aufzählung, `**fett**`, Backticks für Code. Ideal für Doku, Protokolle und Übergaben.',
    verweise: [
      { t: 'prompt', id: 'uebergabe-doku', name: 'Übergabe-Doku vor dem Urlaub' },
      { t: 'skill', id: 'meeting-notes', name: 'Meeting Notes' }
    ]
  },
  {
    id: 'mcp',
    wort: 'MCP',
    buchstabe: 'M',
    votes: 16,
    satz: 'MCP ist ein offener Standard, über den KI-Werkzeuge wie Claude sicher mit anderen Programmen und Datenquellen verbunden werden können.',
    beispiel: 'Über einen MCP-Server könnte Claude Code direkt in eurem Projektmanagement-Tool Tickets lesen — statt dass du alles per Copy-and-paste hin- und herträgst.',
    tiefe: 'MCP steht für „Model Context Protocol“. Die Idee: ein genormter Stecker zwischen KI und Werkzeugen — einmal gebaut, überall nutzbar. Ein „MCP-Server“ ist so ein Stecker für ein bestimmtes System (Datenbank, Kalender, Ticketsystem). Für den Einstieg musst du MCP nicht einrichten; es reicht zu wissen, dass Claude damit erweiterbar ist.',
    verweise: [
      { t: 'skill', id: 'erste-automation', name: 'Erste Automation' }
    ]
  },
  {
    id: 'modell',
    wort: 'Modell',
    buchstabe: 'M',
    votes: 7,
    satz: 'Ein Modell ist das trainierte „Gehirn“ hinter einer KI — verschiedene Modelle unterscheiden sich in Fähigkeiten, Tempo und Kosten.',
    beispiel: 'In Langdock wählst du oben aus, welches Modell antwortet — dieselbe Frage kann je nach Modell unterschiedlich gut, schnell und ausführlich beantwortet werden.',
    tiefe: 'Modelle entstehen durch Training auf riesigen Textmengen und haben einen Wissensstand mit Stichtag — Ereignisse danach kennen sie nicht von selbst. Faustregel: großes Modell für komplexe Aufgaben, kleines für schnelle Routineaufgaben. Claude Code nutzt Claude-Modelle von Anthropic.',
    verweise: [
      { t: 'befehl', id: 'model' }
    ]
  },
  {
    id: 'open-source',
    wort: 'Open Source',
    buchstabe: 'O',
    votes: 3,
    satz: 'Open Source bedeutet, dass der Quellcode einer Software öffentlich einsehbar ist und je nach Lizenz frei genutzt und verändert werden darf.',
    beispiel: 'Viele Skills im Marketplace stammen aus offenen Community-Sammlungen — du kannst nachlesen, was sie tun, sie anpassen und deine Version wieder teilen.',
    tiefe: 'Open Source ist der Grund, warum du beim Citizen Coding selten bei null anfängst: Bibliotheken, Icons, Schriften und ganze Skill-Sammlungen liegen frei verfügbar bereit. „Öffentlich einsehbar“ heißt aber nicht automatisch „alles erlaubt“ — was genau erlaubt ist, regelt die Lizenz.',
    verweise: [
      { t: 'skill', id: 'superpowers', name: 'superpowers' },
      { t: 'begriff', id: 'lizenz' }
    ]
  },
  {
    id: 'platzhalter',
    wort: 'Platzhalter',
    buchstabe: 'P',
    votes: 5,
    satz: 'Ein Platzhalter ist eine markierte Lücke in einer Textvorlage, die du vor dem Abschicken mit deinen echten Angaben füllst.',
    beispiel: 'In der Prompt-Bibliothek stehen Platzhalter in eckigen Klammern wie [KUNDE] oder [ZIELGRUPPE] — beim Kopieren bleiben sie stehen, damit du sie bewusst ersetzt.',
    tiefe: 'Platzhalter machen Prompts wiederverwendbar: Einmal gut formuliert, hundertmal befüllt. Kontrolliere vor dem Absenden, dass keine eckige Klammer übrig ist — ein vergessener Platzhalter ist die häufigste Ursache für seltsam generische Antworten.',
    verweise: [
      { t: 'prompt', id: 'briefing-zusammenfassung', name: 'Briefing-Zusammenfassung' },
      { t: 'prompt', id: 'betreffzeilen-batterie', name: 'Betreffzeilen-Batterie' }
    ]
  },
  {
    id: 'plugin',
    wort: 'Plugin',
    buchstabe: 'P',
    votes: 8,
    satz: 'Ein Plugin ist ein Erweiterungspaket, das einem Programm neue Funktionen hinzufügt, ohne dass das Programm selbst umgebaut wird.',
    beispiel: 'Die Superpowers-Sammlung installierst du als Plugin in Claude Code — danach stehen dir auf einen Schlag mehrere neue Skills wie Brainstorming und systematisches Debugging zur Verfügung.',
    tiefe: 'In Claude Code können Plugins ganze Bündel mitbringen: Skills, Befehle und Verbindungen zu anderen Werkzeugen. Der Unterschied zum einzelnen Skill: Ein Skill ist eine Fähigkeit, ein Plugin ist das Paket, in dem eine oder mehrere davon geliefert werden.',
    verweise: [
      { t: 'skill', id: 'superpowers', name: 'superpowers' }
    ]
  },
  {
    id: 'prompt',
    wort: 'Prompt',
    buchstabe: 'P',
    votes: 38,
    satz: 'Ein Prompt ist die Anweisung, die du der KI gibst — je klarer Aufgabe, Kontext und gewünschtes Ergebnis, desto besser die Antwort.',
    beispiel: 'Statt „Fass das zusammen“ lieber: „Fasse dieses Kunden-Briefing in 5 Stichpunkten für die Kreation zusammen, Ton sachlich, max. 100 Wörter“ — gleicher Aufwand, deutlich besseres Ergebnis.',
    tiefe: 'Ein guter Prompt beantwortet vier Fragen: Was soll entstehen? Für wen? In welchem Format? Was ist der Kontext? In der Prompt-Bibliothek des Marketplace findest du 23 erprobte Vorlagen mit Platzhaltern — Kopieren ist ausdrücklich erwünscht.',
    verweise: [
      { t: 'prompt', id: 'vibecoding-kickoff', name: 'Vibecoding-Kickoff' },
      { t: 'prompt', id: 'meeting-todos', name: 'Meeting-Protokoll → To-do-Liste' }
    ]
  },
  {
    id: 'push',
    wort: 'Push',
    buchstabe: 'P',
    votes: 23,
    satz: 'Ein Push lädt deine lokal gespeicherten Commits auf einen zentralen Server wie GitHub hoch.',
    beispiel: 'Erst nach dem Push sehen deine Kolleg:innen den neuen Stand deines Tools — und wenn GitHub Pages aktiv ist, aktualisiert sich damit auch gleich die Live-Seite.',
    tiefe: 'Merkreihenfolge: ändern → committen (lokal sichern) → pushen (hochladen). Das Gegenstück ist der Pull, der fremde Änderungen zu dir holt. Sag Claude Code einfach „committe und pushe das“ — es erledigt beide Schritte und zeigt dir vorher, was hochgeht.',
    verweise: [
      { t: 'skill', id: 'tool-teilen', name: 'Tool teilen' }
    ]
  },
  {
    id: 'refactoring',
    wort: 'Refactoring',
    buchstabe: 'R',
    votes: 3,
    satz: 'Refactoring bedeutet, Code aufzuräumen und besser zu strukturieren, ohne sein Verhalten nach außen zu verändern.',
    beispiel: 'Dein über Wochen gewachsenes Kampagnen-Tool funktioniert, aber jeder Umbau wird zäh — „bitte refactore das übersichtlicher“ lässt Claude aufräumen, und danach gehen Änderungen wieder leicht.',
    tiefe: 'Die goldene Regel: Nach dem Refactoring muss alles exakt so funktionieren wie vorher — nur der Code darunter ist ordentlicher. Guter Zeitpunkt: wenn ein Tool wächst und du merkst, dass jede kleine Änderung drei neue Probleme erzeugt. Vorher den Stand committen, dann ist es risikofrei.',
    verweise: [
      { t: 'prompt', id: 'code-verstehen', name: 'Was tut diese Datei?' }
    ]
  },
  {
    id: 'repo',
    wort: 'Repo (Repository)',
    buchstabe: 'R',
    votes: 28,
    satz: 'Ein Repo ist der Projektordner deines Tools samt seiner kompletten Änderungsgeschichte.',
    beispiel: 'Dein Reporting-Tool lebt in einem Repo auf GitHub — dort liegen alle Dateien, jede frühere Version und die Live-Seite via GitHub Pages an einem Ort.',
    tiefe: 'Repository heißt wörtlich „Lager“. Lokal ist das Repo ein normaler Ordner, in dem Git unsichtbar Buch führt; auf GitHub liegt die Kopie, über die du teilst und veröffentlichst. Faustregel: ein Tool, ein Repo.',
    verweise: [
      { t: 'skill', id: 'tool-teilen', name: 'Tool teilen' }
    ]
  },
  {
    id: 'server',
    wort: 'Server',
    buchstabe: 'S',
    votes: 5,
    satz: 'Ein Server ist ein Rechner, der dauerhaft läuft und anderen Rechnern auf Anfrage Daten oder Webseiten liefert.',
    beispiel: 'Wenn du den Marketplace aufrufst, liefert ein Server von GitHub die Dateien aus — danach arbeitet die Seite komplett in deinem Browser weiter.',
    tiefe: '„Der Server ist down“ heißt schlicht: Der liefernde Rechner antwortet gerade nicht. Für Citizen-Coding-Tools brauchst du meist keinen eigenen Server — statische Seiten auf GitHub Pages reichen, und um deren Server kümmert sich GitHub.',
    verweise: [
      { t: 'skill', id: 'webseite-bauen', name: 'Webseite bauen' }
    ]
  },
  {
    id: 'session',
    wort: 'Session (Sitzung)',
    buchstabe: 'S',
    votes: 21,
    satz: 'Eine Session ist ein zusammenhängendes Gespräch mit der KI — mit allem, was darin bereits gesagt und getan wurde.',
    beispiel: 'Vormittags Mediaplan-Tool, nachmittags Social-Kalender? Starte für die zweite Aufgabe eine neue Session, sonst schleppt Claude den ganzen Vormittag als Ballast mit.',
    tiefe: 'In Claude Code beendet /clear die aktuelle Session und beginnt frisch; mit /resume kehrst du zu früheren Sessions zurück, ohne dass etwas verloren ist. Faustregel: eine Aufgabe, eine Session — das hält das Kontextfenster frei und die Antworten präzise.',
    verweise: [
      { t: 'befehl', id: 'clear' },
      { t: 'prompt', id: 'uebergabe-doku', name: 'Übergabe-Doku vor dem Urlaub' }
    ]
  },
  {
    id: 'skill',
    wort: 'Skill',
    buchstabe: 'S',
    votes: 36,
    satz: 'Ein Skill ist eine gespeicherte Fähigkeit für Claude — eine Anleitung, die es bei Bedarf lädt, um eine bestimmte Aufgabe besonders gut zu erledigen.',
    beispiel: 'Mit dem pptx-Skill baut Claude Code echte PowerPoint-Dateien nach pilot-Vorlage — das Wissen, wie das geht, steckt im Skill, nicht in deinem Prompt.',
    tiefe: 'Technisch ist ein Skill ein Ordner mit einer Anleitung im Markdown-Format, die Claude automatisch heranzieht, wenn deine Aufgabe passt — oder die du per /-Befehl direkt aufrufst. Der Unterschied zum Prompt: Ein Prompt schreibst du jedes Mal, ein Skill ist dauerhaft installiert. Im Katalog findest du 44 Stück, und mit skill-creator baust du eigene.',
    verweise: [
      { t: 'skill', id: 'skill-creator', name: 'skill-creator' },
      { t: 'skill', id: 'erste-schritte', name: 'Erste Schritte' }
    ]
  },
  {
    id: 'systemprompt',
    wort: 'Systemprompt',
    buchstabe: 'S',
    votes: 7,
    satz: 'Der Systemprompt ist die unsichtbare Grundanweisung, die der KI vor deiner ersten Nachricht mitgegeben wird und ihr Verhalten im ganzen Gespräch prägt.',
    beispiel: 'Wenn ein Langdock-Assistent immer höflich auf Deutsch und im pilot-Ton antwortet, steht das nicht in deiner Frage — es steht in seinem Systemprompt.',
    tiefe: 'Man kann ihn sich als Stellenbeschreibung der KI vorstellen: Rolle, Regeln, Tonalität. In Claude Code übernimmt die Datei CLAUDE.md in deinem Projekt eine ähnliche Aufgabe — dort hinterlegst du dauerhafte Regeln wie „antworte auf Deutsch“ oder „frag nach, bevor du Dateien löschst“.',
    verweise: [
      { t: 'befehl', id: 'init' },
      { t: 'skill', id: 'skill-creator', name: 'skill-creator' }
    ]
  },
  {
    id: 'temperatur',
    wort: 'Temperatur (Kreativität)',
    buchstabe: 'T',
    votes: 4,
    satz: 'Die Temperatur ist ein Regler dafür, wie vorhersehbar oder überraschend eine KI formuliert — niedrig heißt nüchtern und gleichförmig, hoch heißt freier und wagemutiger.',
    beispiel: 'Für 20 Claim-Ideen darf es kreativ zugehen, für die Zusammenfassung eines Kundenvertrags willst du null Überraschung — in Langdock lässt sich das bei manchen Assistenten einstellen.',
    tiefe: 'Technisch steuert die Temperatur, wie stark das Modell auch unwahrscheinlichere Wörter in Betracht zieht. Im Alltag mit Claude Code stellst du sie nicht selbst ein — du erreichst dasselbe über die Aufgabenstellung: „gib mir zehn wilde Varianten“ versus „bleib streng bei den Fakten“.',
    verweise: [
      { t: 'prompt', id: 'claim-werkstatt', name: 'Kampagnen-Claim-Werkstatt' }
    ]
  },
  {
    id: 'terminal',
    wort: 'Terminal',
    buchstabe: 'T',
    votes: 29,
    satz: 'Das Terminal ist das Textfenster deines Rechners, in dem du Programme durch getippte Befehle startest und bedienst.',
    beispiel: 'Claude Code lebt im Terminal: Du öffnest es, tippst `claude`, und ab da unterhältst du dich — auf Deutsch, nicht in Geheimcode.',
    tiefe: 'Auf dem Mac heißt es Terminal, auf Windows meist PowerShell oder ebenfalls Terminal. Die schwarze Optik ist reine Gewohnheitssache: Es ist nur ein anderes Fenster. Die zwei wichtigsten Handgriffe für den Anfang: mit `cd Ordnername` in deinen Projektordner wechseln und mit `claude` loslegen.',
    verweise: [
      { t: 'skill', id: 'erste-schritte', name: 'Erste Schritte' }
    ]
  },
  {
    id: 'token',
    wort: 'Token',
    buchstabe: 'T',
    votes: 31,
    satz: 'Ein Token ist ein kleines Textstück — etwa eine Silbe oder ein kurzes Wort —, in das die KI jeden Text zerlegt, bevor sie ihn verarbeitet.',
    beispiel: 'Dein 50-Seiten-Mediaplan-Export sind für Claude zigtausend Token — deshalb ist bei sehr langen Dokumenten irgendwann das Kurzzeitgedächtnis voll.',
    tiefe: 'Als Faustregel entsprechen 1.000 Token grob 700 deutschen Wörtern. Token sind die Währung der KI-Welt: Kontextfenster-Größen und Nutzungskosten werden in Token gemessen. Du musst nie selbst zählen — aber der Begriff erklärt, warum „einfach alles reinkopieren“ Grenzen hat.',
    verweise: [
      { t: 'begriff', id: 'kontextfenster' },
      { t: 'prompt', id: 'fachbegriff-erklaerer', name: 'Fachbegriff-Erklärer' }
    ]
  },
  {
    id: 'versionierung',
    wort: 'Versionierung',
    buchstabe: 'V',
    votes: 3,
    satz: 'Versionierung bedeutet, jede Änderung an einem Projekt nachvollziehbar zu speichern, sodass frühere Stände jederzeit wiederherstellbar sind.',
    beispiel: 'Statt `final_v2_NEU_wirklich-final.pptx`-Chaos hat dein Tool im Repo eine saubere Kette von Commits — jede Version hat Datum, Autor:in und eine Notiz.',
    tiefe: 'Das Standardwerkzeug dafür ist Git. Der Gewinn ist vor allem psychologisch: Wer weiß, dass nichts verloren gehen kann, traut sich zu experimentieren. Genau deshalb ist „regelmäßig committen“ die vielleicht wichtigste Citizen-Coding-Gewohnheit.',
    verweise: [
      { t: 'skill', id: 'tool-teilen', name: 'Tool teilen' }
    ]
  },
  {
    id: 'vibecoding',
    wort: 'Vibecoding',
    buchstabe: 'V',
    votes: 19,
    satz: 'Vibecoding heißt, Software zu bauen, indem du der KI in normaler Sprache beschreibst, was du willst — statt selbst Code zu schreiben.',
    beispiel: '„Ich brauche ein Tool, das unsere Excel-Timings in eine Team-Übersicht verwandelt“ — zwei Stunden später klickst du durch deinen ersten funktionierenden Prototyp.',
    tiefe: 'Der Begriff stammt von KI-Forscher Andrej Karpathy (2025). Wichtig für die Praxis: Beschreiben ersetzt das Tippen von Code, aber nicht das Denken — je klarer du weißt, was das Tool können soll, desto besser wird es. Der Vibecoding-Kickoff-Prompt hilft dir, genau das vorab zu sortieren.',
    verweise: [
      { t: 'skill', id: 'prototyp-bauen', name: 'Prototyp bauen' },
      { t: 'prompt', id: 'vibecoding-kickoff', name: 'Vibecoding-Kickoff' }
    ]
  },
  {
    id: 'wissen-anbinden',
    wort: 'Wissen anbinden',
    buchstabe: 'W',
    votes: 4,
    satz: 'Wissen anbinden heißt, der KI eigene Dokumente oder Datenquellen zur Verfügung zu stellen, damit sie mit euren Inhalten antwortet statt nur mit ihrem Trainingswissen.',
    beispiel: 'Ein Langdock-Assistent mit den pilot-Styleguides im Gepäck beantwortet Tonalitätsfragen aus euren echten Regeln — nicht aus dem Ungefähren.',
    tiefe: 'Fachleute nennen das Prinzip RAG („Retrieval-Augmented Generation“): Vor der Antwort werden die passenden Stellen aus deinen Dokumenten herausgesucht und der KI mitgegeben. In Claude Code geht es noch direkter — es liest Dateien aus deinem Projektordner einfach selbst. Der große Vorteil gegenüber Fine-Tuning: Dokument aktualisieren genügt, kein Nachtraining nötig.',
    verweise: [
      { t: 'skill', id: 'briefing-gen', name: 'Briefing Generator' }
    ]
  }
];

/* FAQ / TROUBLESHOOTING — 10 häufige Blocker mit Schritt-für-Schritt-Lösung.
   befehl:-Verweise beim Merge gegen data/befehle.js abgeglichen (esc → esc-unterbrechen,
   plan-modus → shift-tab-modi, esc-esc → esc-unterbrechen; claude-version und init
   ohne passenden Eintrag → entfernt). */
const FAQ = [
  {
    id: 'faq-startet-nicht',
    frage: 'Claude Code startet nicht — das Terminal sagt „command not found“',
    intro: 'Meist ist Claude Code nicht (mehr) installiert oder das Terminal kennt den Befehl noch nicht — beides ist in wenigen Minuten behoben.',
    schritte: [
      'Schließe das Terminal komplett und öffne ein neues Fenster — nach einer frischen Installation kennt erst das neue Fenster den Befehl.',
      'Tippe `claude --version` und drücke Enter: Erscheint eine Versionsnummer, läuft alles — dann war nur das alte Fenster das Problem.',
      'Kommt wieder „command not found“, installiere Claude Code neu nach der offiziellen Anleitung unter code.claude.com/docs (oder der pilot-internen Einstiegsanleitung).',
      'Tippe nach der Installation im neuen Terminalfenster erneut `claude --version` zur Kontrolle.',
      'Wenn es weiterhin hakt: Frag im KI-Enablement-Kanal nach — mit einem Foto der Fehlermeldung geht es am schnellsten.'
    ],
    verweise: [
      { t: 'befehl', id: 'doctor' },
      { t: 'begriff', id: 'terminal' },
      { t: 'begriff', id: 'cli' },
      { t: 'skill', id: 'erste-schritte', name: 'Erste Schritte' }
    ]
  },
  {
    id: 'faq-kontext-voll',
    frage: '„Kontext voll“ — Claude wird vergesslich oder meldet, das Gespräch sei zu lang',
    intro: 'Das Kurzzeitgedächtnis (Kontextfenster) ist begrenzt — du kannst es zusammenfassen lassen oder frisch starten, ohne Arbeit zu verlieren.',
    schritte: [
      'Tippe `/compact` — Claude fasst das bisherige Gespräch zusammen und macht damit Platz frei, ohne den Faden zu verlieren.',
      'Ist die Aufgabe ohnehin abgeschlossen, tippe stattdessen `/clear` für einen komplett frischen Start — deine Dateien bleiben natürlich unberührt.',
      'Beginnst du eine neue, andere Aufgabe: Starte grundsätzlich eine neue Session, statt die alte weiterzuziehen.',
      'Bei langen Projekten: Lass dir vor dem Wechsel den Zwischenstand in eine Notizdatei schreiben („Fasse zusammen, was wir entschieden haben, in NOTIZEN.md“) — die kann die nächste Session einfach lesen.'
    ],
    verweise: [
      { t: 'befehl', id: 'compact' },
      { t: 'befehl', id: 'clear' },
      { t: 'begriff', id: 'kontextfenster' },
      { t: 'begriff', id: 'session' },
      { t: 'prompt', id: 'uebergabe-doku', name: 'Übergabe-Doku vor dem Urlaub' }
    ],
    stimme: {
      autor: 'Sophie Klein',
      rolle: 'Projektmanagerin',
      text: '/compact war der Aha-Moment — ich dachte immer, ich müsste bei langen Sessions alles wegwerfen und neu erklären.'
    }
  },
  {
    id: 'faq-rueckgaengig',
    frage: 'Claude hat etwas kaputt gemacht — wie mache ich das rückgängig?',
    intro: 'Claude Code sichert vor jeder deiner Eingaben automatisch den Stand deiner Dateien — du kannst also zurückspulen.',
    schritte: [
      'Drücke zweimal `Esc` (bei leerem Eingabefeld) oder tippe `/rewind` — es öffnet sich eine Liste deiner bisherigen Eingaben.',
      'Wähle den Zeitpunkt, an dem noch alles gut war, und dann „Restore code“ — deine Dateien springen auf diesen Stand zurück (wahlweise auch samt Gespräch).',
      'Wichtig zu wissen: Zurückgespult werden nur Claudes direkte Datei-Bearbeitungen — was Terminal-Befehle verändert haben (z. B. gelöschte Dateien), holt das Rückspulen nicht zurück.',
      'Für alles Dauerhafte nutze Git: Wenn du zwischendurch committet hast, sag einfach „geh zurück zum letzten Commit“ — das ist das robusteste Sicherheitsnetz.',
      'Gewöhne dir deshalb an, nach jedem funktionierenden Zwischenstand zu sagen: „Mach einen Commit.“'
    ],
    verweise: [
      { t: 'befehl', id: 'rewind' },
      { t: 'befehl', id: 'esc-unterbrechen' },
      { t: 'begriff', id: 'git' },
      { t: 'begriff', id: 'commit' },
      { t: 'skill', id: 'tool-teilen', name: 'Tool teilen' }
    ],
    stimme: {
      autor: 'Jan Richter',
      rolle: 'Tech Lead & Citizen-Coding-Mentor',
      text: 'Zweimal Esc, Stand auswählen, fertig — seit ich das im Onboarding zeige, hat niemand mehr Angst, etwas auszuprobieren.'
    }
  },
  {
    id: 'faq-tool-teilen',
    frage: 'Wie teile ich mein Tool mit Kolleg:innen?',
    intro: 'Der Standardweg bei pilot: Projekt in ein GitHub-Repo, GitHub Pages anschalten, Link verschicken — Claude erledigt die technischen Schritte für dich.',
    schritte: [
      'Sag Claude Code in deinem Projektordner: „Lege ein GitHub-Repository für dieses Projekt an und pushe den aktuellen Stand.“',
      'Sag danach: „Aktiviere GitHub Pages für dieses Repo“ — kurz darauf hat dein Tool eine echte Web-Adresse.',
      'Öffne die Adresse selbst im Browser und klick einmal alles durch, bevor du sie weitergibst.',
      'Teile den Link im Team-Kanal — Kolleg:innen brauchen nichts zu installieren, ein Browser genügt.',
      'Für spätere Updates: Änderungen machen, „committe und pushe“ sagen — die Live-Seite aktualisiert sich von selbst (Kolleg:innen ggf. an hartes Neuladen erinnern, Stichwort Cache).'
    ],
    verweise: [
      { t: 'begriff', id: 'repo' },
      { t: 'begriff', id: 'github-pages' },
      { t: 'begriff', id: 'deploy' },
      { t: 'begriff', id: 'cache' },
      { t: 'skill', id: 'tool-teilen', name: 'Tool teilen' }
    ],
    stimme: {
      autor: 'Mia Hoffmann',
      rolle: 'Senior UX Designerin',
      text: 'Mein Moodboard-Tool war schneller online, als ich früher gebraucht hätte, um eine E-Mail mit Anhängen zu schreiben.'
    }
  },
  {
    id: 'faq-abgebrochen',
    frage: 'Die Antwort ist mittendrin abgebrochen — was nun?',
    intro: 'Kein Drama: Bereits erledigte Arbeit bleibt erhalten, du kannst Claude einfach weitermachen lassen.',
    schritte: [
      'Schreib schlicht „mach weiter“ — Claude setzt dort an, wo es aufgehört hat.',
      'Prüfe kurz das letzte Zwischenergebnis: „Zeig mir, was du bis jetzt geändert hast.“',
      'Falls du selbst mit `Esc` unterbrochen hast: Auch dann ist nichts verloren — die bisherige Arbeit bleibt bestehen, du kannst umsteuern oder fortsetzen.',
      'Bricht es wiederholt an derselben Stelle ab, verkleinere die Aufgabe: „Mach erst nur Schritt 1, dann sehen wir weiter.“',
      'Ist das Gespräch sehr lang, hilf mit `/compact` nach — volle Kontexte machen Abbrüche wahrscheinlicher.'
    ],
    verweise: [
      { t: 'befehl', id: 'esc-unterbrechen' },
      { t: 'befehl', id: 'compact' },
      { t: 'begriff', id: 'kontextfenster' },
      { t: 'begriff', id: 'session' }
    ]
  },
  {
    id: 'faq-versteht-falsch',
    frage: 'Claude versteht meine Aufgabe falsch — was mache ich besser?',
    intro: 'Fast immer fehlt Kontext: Was für dich selbstverständlich ist, muss im Prompt stehen.',
    schritte: [
      'Drücke `Esc`, sobald du merkst, dass es in die falsche Richtung läuft — nicht höflich bis zum Ende warten.',
      'Formuliere neu mit den vier W: Was soll entstehen, für wen, in welchem Format, mit welchem Kontext („Eine Tabelle für die Kundin, aus dieser CSV, Spalten: Kanal, Budget, Zeitraum“).',
      'Lass Claude vorab den Plan erklären: „Beschreib erst in 3 Sätzen, was du vorhast — noch nichts ändern.“',
      'Bei größeren Bauvorhaben: Lass dich vorher interviewen (Prompt „Lass dich interviewen, bevor du baust“) — das deckt Missverständnisse auf, bevor sie Code werden.',
      'Wenn das Gespräch schon verfahren ist: `/clear` und mit der besseren Formulierung frisch starten — das ist oft schneller als Korrigieren.'
    ],
    verweise: [
      { t: 'befehl', id: 'esc-unterbrechen' },
      { t: 'befehl', id: 'clear' },
      { t: 'befehl', id: 'shift-tab-modi' },
      { t: 'begriff', id: 'prompt' },
      { t: 'prompt', id: 'tool-anforderungen', name: 'Lass dich interviewen, bevor du baust' },
      { t: 'prompt', id: 'vibecoding-kickoff', name: 'Vibecoding-Kickoff' }
    ],
    stimme: {
      autor: 'Anna Schreiber',
      rolle: 'Content Strategin',
      text: 'Seit ich Claude erst den Plan erklären lasse, bevor es losläuft, sind die Ergebnisse beim ersten Anlauf brauchbar.'
    }
  },
  {
    id: 'faq-dateien-finden',
    frage: 'Wo finde ich meine Dateien wieder?',
    intro: 'Claude Code arbeitet immer in dem Ordner, in dem du es gestartet hast — dort (oder in Unterordnern) landet alles.',
    schritte: [
      'Frag Claude direkt: „Wo liegt die Datei, die du gerade erstellt hast? Gib mir den vollständigen Pfad.“',
      'Frag Claude: „In welchem Ordner arbeiten wir? Gib mir den vollständigen Pfad.“ — Claude nennt dir das aktuelle Projektverzeichnis.',
      'Öffne diesen Ordner im Explorer (Windows) bzw. Finder (Mac) — sortiere nach Änderungsdatum, die neuesten Dateien stehen oben.',
      'Für die Zukunft: Starte Claude Code immer bewusst in einem festen Projektordner (z. B. `Dokumente/projekte/mein-tool`) statt irgendwo — dann gibt es nur einen Ort, an dem du suchen musst.'
    ],
    verweise: [
      { t: 'begriff', id: 'dateipfad' },
      { t: 'begriff', id: 'repo' },
      { t: 'skill', id: 'erste-schritte', name: 'Erste Schritte' }
    ],
    stimme: {
      autor: 'Christopher Kipp',
      rolle: 'Innovation Lead',
      text: 'Ein Ordner pro Projekt, immer dort starten — die halbe Orientierung im Citizen Coding ist damit erledigt.'
    }
  },
  {
    id: 'faq-langdock-oder-code',
    frage: 'Langdock oder Claude Code — was nehme ich wofür?',
    intro: 'Kurzformel: Langdock für Antworten und Texte, Claude Code, wenn Dateien entstehen oder sich verändern sollen.',
    schritte: [
      'Frag dich zuerst: Reicht mir eine Antwort oder ein Text zum Kopieren? Dann Langdock — schneller Chat, Assistenten, ideal fürs Tagesgeschäft.',
      'Sollen echte Dateien entstehen oder bearbeitet werden (Tabellen, Präsentationen, ein kleines Tool)? Dann Claude Code — es arbeitet direkt in deinen Ordnern.',
      'Wiederholt sich eine Aufgabe regelmäßig? Claude Code, denn dort kannst du sie als Skill oder kleines Tool dauerhaft festhalten.',
      'Willst du etwas fürs Team bauen und teilen? Claude Code plus GitHub Pages — am Ende steht ein Link für alle.',
      'Im Zweifel: In Langdock anfangen und die Idee schärfen, mit dem Ergebnis in Claude Code bauen — die beiden ergänzen sich, es ist kein Entweder-oder.'
    ],
    verweise: [
      { t: 'begriff', id: 'vibecoding' },
      { t: 'begriff', id: 'agent' },
      { t: 'skill', id: 'erste-schritte', name: 'Erste Schritte' },
      { t: 'prompt', id: 'vibecoding-kickoff', name: 'Vibecoding-Kickoff' }
    ],
    stimme: {
      autor: 'Lukas Weber',
      rolle: 'SEO Strategist',
      text: 'Keyword-Fragen kläre ich in Langdock, aber sobald eine CSV im Spiel ist, wechsle ich zu Claude Code — die Datei anfassen kann nur eins von beiden.'
    }
  },
  {
    id: 'faq-kundendaten',
    frage: 'Darf ich Kundendaten eingeben?',
    intro: 'Ehrliche Antwort: Das entscheidet nicht diese Seite, sondern die pilot-interne Richtlinie — hier steht nur die sichere Grundhaltung bis zur Klärung.',
    // Redaktionshinweis (PLAN §1.1 Ehrlichkeit): Schritt 3 verweist bewusst auf
    // den Kanal statt auf einen Link — es gibt (noch) keinen bestätigten Link zur
    // internen KI-/Datenschutz-Richtlinie und wir erfinden keinen. Launch-Checkliste:
    // Sobald die zuständige Stelle den echten Richtlinien-Link bestätigt, hier
    // ergänzen.
    schritte: [
      'Grundregel bis zur Klärung: Keine echten personenbezogenen Daten (Namen, E-Mail-Adressen, Kundenlisten) und keine vertraulichen Kundenunterlagen eingeben.',
      'Arbeite mit anonymisierten oder erfundenen Beispieldaten — für das Bauen und Testen eines Tools sind „Kunde A, Budget 100.000“ genauso gut wie echte Zahlen.',
      'Frag beim KI-Enablement-Team nach der aktuellen internen KI-/Datenschutz-Richtlinie — dort bekommst du den verbindlichen Stand für Kundendaten.',
      'Im konkreten Kundenfall: Hol dir die Freigabe der Unit-Leitung bzw. des Datenschutz-Teams, bevor Kundenmaterial in ein KI-Werkzeug wandert.',
      'Denk an die Veröffentlichungsseite: Was in ein öffentliches Repo oder auf GitHub Pages geht, steht im Internet — Kundendaten haben dort nie etwas verloren.'
    ],
    verweise: [
      { t: 'begriff', id: 'github-pages' },
      { t: 'begriff', id: 'repo' },
      { t: 'begriff', id: 'localstorage' }
    ]
  },
  {
    id: 'faq-skill-reagiert-nicht',
    frage: 'Skill installiert, aber er reagiert nicht — woran liegt’s?',
    intro: 'Meist ist es eine Kleinigkeit: falscher Name, falscher Ort oder die Session kennt den Skill noch nicht.',
    schritte: [
      'Tippe `/` und fang an, den Skill-Namen zu tippen — erscheint er in der Vorschlagsliste, ist er installiert; wähl ihn direkt dort aus.',
      'Erscheint er nicht: Beende die Session und starte Claude Code neu — frisch installierte Skills tauchen erst in einer neuen Sitzung zuverlässig auf.',
      'Prüfe Ort und Schreibweise: Der Skill-Ordner muss dort liegen, wo die Installationsanleitung ihn vorsieht (im Projekt unter `.claude/skills/` bzw. global unter `~/.claude/skills/`), und exakt so heißen wie im Aufruf.',
      'Bei Skills aus einem Plugin: Kontrolliere, ob das Plugin selbst korrekt installiert ist (Anleitung der jeweiligen Sammlung, z. B. Superpowers).',
      'Wenn nichts hilft: Frag Claude selbst — „Welche Skills stehen dir gerade zur Verfügung?“ — und vergleiche die Liste mit deiner Erwartung.'
    ],
    verweise: [
      { t: 'befehl', id: 'help' },
      { t: 'begriff', id: 'skill' },
      { t: 'begriff', id: 'plugin' },
      { t: 'begriff', id: 'session' },
      { t: 'skill', id: 'skill-creator', name: 'skill-creator' },
      { t: 'skill', id: 'superpowers', name: 'superpowers' }
    ]
  }
];
