// pilot AI Marketplace — Lernen & Hilfe: GLOSSAR & FAQ (ausgelagerte Daten, E4; Glossar-Ausbau Juli 2026).
// Klassisches Script, definiert globale Konstanten:
//   GLOSSAR — 64 Begriffe. Je Eintrag:
//     id         URL-tauglich, eindeutig (Deep-Link lernen-hilfe.html?begriff=<id>)
//     wort       Anzeigename; buchstabe = A-Z-Sprungleiste (explizit, nicht abgeleitet)
//     thema      Themen-Gruppe für den Filter über der Liste:
//                'ki' (KI & Claude Code) | 'web' (Webseiten & Apps) |
//                'daten' (Daten & Dateien) | 'handwerk' (Handwerk & Werkzeuge)
//     satz       genau EIN einfacher Erklärsatz (Kopf des aufklappbaren Körpers)
//     analogie   Alltagsvergleich („Stell es dir so vor“) — für Einsteiger:innen
//                ohne Software-Hintergrund der wichtigste Zugang, daher Pflichtfeld
//     beispiel   EIN konkretes pilot-/Marketplace-Beispiel
//     tiefe      Vertiefung, 3-6 Sätze („Wenn du tiefer willst“)
//     stolper    optional: typischer Stolperstein/Verwechslung („Typischer Stolperstein“)
//     votes      Seed „hat geholfen“ (2-38, Staffelung nach Alltagsrelevanz;
//                Demo-Werte, auf der Seite gekennzeichnet). Anzeige =
//                getVotes('begriff', id, votes).
//     verweise   0-2 Querverweise: { t: 'skill'|'prompt'|'befehl'|'begriff', id, name? }
//                skill/prompt tragen den Anzeigenamen mit (deren Daten sind auf
//                lernen-hilfe.html nicht geladen); befehl/begriff werden zur Laufzeit
//                gegen BEFEHLE bzw. GLOSSAR aufgelöst.
//   FAQ — 10 häufige Blocker. Je Eintrag: id (Deep-Link lernen-hilfe.html?faq=<id>),
//     frage, intro (1 Satz), schritte (nummeriert gerendert), verweise (wie oben),
//     optional stimme { autor, rolle, text } (seeded PILOTS-Persona aus
//     data/contributors.js — Demo-Stimme, auf der Seite gekennzeichnet).
// Fakten der E4-Basis am 2026-07-16 gegen code.claude.com/docs verifiziert; Ausbau-Pass
// Juli 2026: alle Begriffe um analogie/tiefe erweitert, thema-Gruppen + 7 neue
// Einsteiger-Begriffe (cloud, code, datenbank, framework, programmiersprache,
// responsive, url); skill:/prompt:-ids gegen data/skills.js und data/prompts.js geprüft.
// Nachtrag 2026-07-24: +svg (thema web). Grund: SVG war das EINZIGE Dateiformat, das
// im Nutzertext der Asset-Bibliothek vorkommt (5×: Icon-Klick kopiert SVG, Logo-Download,
// Beispieldaten-Zähler) und trotzdem keinen Eintrag hatte — CSV, JSON, HTML, CSS und
// Markdown haben alle einen. Themen-Verteilung damit ki 13/web 15/daten 7/handwerk 14.
//
// AUSBAU 2026-08-03: 49 → 64 Begriffe. Die 15 neuen schließen die Lücken, die beim
// Durchlesen der Seite aus Sicht einer Einsteigerin am meisten auffielen — allen voran
// die beiden Werkzeuge selbst: claude-code und langdock standen als Wörter überall,
// hatten aber keinen Eintrag. Dazu die Begriffe, die im Alltag zuerst gebraucht werden
// (claude-md, slash-befehl, werkzeug-tool, berechtigung, few-shot-beispiel), die
// Web-Grundlagen hinter dem Veröffentlichen (statische-seite, hosting-domain,
// barrierefreiheit), das Arbeitsvokabular (mvp-prototyp, iteration, bibliothek-library)
// und zwei Dinge, an denen die Gruppe real hängen blieb (zeichensatz-umlaute,
// datenschutz-vertraulichkeit).
//   · Der Eintrag `langdock` klärt ausdrücklich die Doppelbenennung: Das Produkt heißt
//     beim Hersteller Langdock, unsere Oberfläche beschriftet es als „pilot AI“. In den
//     LERNINHALTEN bleibt der echte Produktname stehen — wer nach Anleitungen sucht,
//     findet sie nur darunter.
//   · `datenschutz-vertraulichkeit` verweist bewusst ans KI-Enablement-Team und
//     formuliert KEINE Richtlinie. Verbindlich ist allein die interne KI-Richtlinie
//     (gleiche Haltung wie faq-kundendaten weiter unten).
//   · `stolper` ist kein Pflichtfeld und wurde nur dort gefüllt, wo es einen echten,
//     wiederkehrenden Stolperstein gibt — nicht, um jedes Feld zu belegen.
//   · Zwei Verweise zeigten auf Skills, die es nach der Katalog-Kuration nicht mehr
//     gibt: framework → gsd wurde auf brainstorm-plan-execute umgebogen (das ist jetzt
//     der Framework-Eintrag des Katalogs), halluzination → verification-before-completion
//     auf superpowers (dort steckt die Prüf-Disziplin heute drin) plus den passenden
//     Glossar-Verweis wissen-anbinden.
// Themen-Verteilung damit ki 19/web 18/daten 8/handwerk 19.

const GLOSSAR = [
  {
    id: 'agent',
    wort: 'Agent',
    buchstabe: 'A',
    thema: 'ki',
    votes: 24,
    satz: 'Ein Agent ist eine KI, die nicht nur antwortet, sondern selbstständig mehrere Arbeitsschritte nacheinander ausführt, um ein Ziel zu erreichen.',
    analogie: 'Wie der Unterschied zwischen einem Auskunftsschalter und einer Assistenz: Am Schalter bekommst du auf jede Frage genau eine Antwort — eine Assistenz nimmt den ganzen Auftrag an, erledigt die Zwischenschritte selbst und meldet sich, wenn etwas unklar ist.',
    beispiel: 'Wenn du Claude Code bittest, „alle Kampagnen-PDFs in diesem Ordner zusammenzufassen“, öffnet es die Dateien, liest sie, schreibt die Zusammenfassung und legt sie ab — ohne dass du jeden Schritt einzeln anstoßen musst.',
    tiefe: 'Der Unterschied zum Chat: Im Chat lieferst du alles an und bekommst eine Antwort. Ein Agent plant selbst, welche Schritte nötig sind, nutzt Werkzeuge (Dateien lesen, Befehle ausführen, ins Web schauen) und prüft seine Zwischenergebnisse — merkt er, dass ein Schritt nicht funktioniert hat, versucht er einen anderen Weg. Genau das macht Claude Code zum Agenten, während ein Langdock-Chat eher der Auskunftsschalter ist. Du bleibst trotzdem am Steuer: Bei wichtigen Aktionen wie dem Löschen von Dateien fragt Claude Code vorher nach deiner Freigabe, und mit Esc kannst du jederzeit unterbrechen und umsteuern.',
    stolper: '„Agent“ heißt nicht „läuft unbeaufsichtigt“. Der beste Arbeitsmodus ist wie mit einer neuen Kollegin: Aufgabe klar beschreiben, Zwischenstände anschauen, Feedback geben — nicht morgens beauftragen und abends überrascht sein.',
    verweise: [
      { t: 'skill', id: 'erste-automation', name: 'Erste Automation' },
      { t: 'skill', id: 'erste-schritte', name: 'Erste Schritte' }
    ]
  },
  {
    id: 'api',
    wort: 'API (Schnittstelle)',
    buchstabe: 'A',
    thema: 'daten',
    votes: 12,
    satz: 'Eine API ist eine vereinbarte Tür, durch die ein Programm ein anderes Programm um Daten oder Dienste bitten kann.',
    analogie: 'Eine API ist wie die Durchreiche einer Restaurantküche: Du musst nicht wissen, wie es in der Küche aussieht — du gibst deine Bestellung in fester Form auf und bekommst das fertige Gericht zurück.',
    beispiel: 'Wenn dein selbst gebautes Reporting-Tool aktuelle Wetterdaten für eine Out-of-Home-Kampagne anzeigen soll, holt es die über die API eines Wetterdienstes — automatisch, ohne dass jemand sie abtippt.',
    tiefe: 'API steht für „Application Programming Interface“, auf Deutsch Programmierschnittstelle. Praktisch heißt das: Anbieter A stellt Daten oder Funktionen unter einer festen Adresse bereit, Programm B ruft diese Adresse auf und bekommt eine strukturierte Antwort — meist im JSON-Format. So reden Programme miteinander, ohne dass ein Mensch etwas kopieren und einfügen muss. Viele APIs verlangen einen Schlüssel (API-Key): Der ist wie ein Ausweis, der sagt, wer da anfragt — und gehört deshalb nie öffentlich in den Code oder in ein öffentliches Repo. Wenn du für ein Tool eine API nutzen willst, sag Claude Code einfach, welche — es kennt die gängigen und schreibt die Anbindung für dich.',
    stolper: 'Nicht jede API ist frei nutzbar: Viele kosten Geld, brauchen eine Anmeldung oder erlauben nur wenige Anfragen pro Tag. Bevor du ein Tool auf eine API baust, kurz prüfen (oder Claude fragen), was der Anbieter erlaubt.',
    verweise: [
      { t: 'skill', id: 'erste-automation', name: 'Erste Automation' }
    ]
  },
  {
    id: 'backend',
    wort: 'Backend',
    buchstabe: 'B',
    thema: 'web',
    votes: 5,
    satz: 'Das Backend ist der unsichtbare Teil einer Anwendung, der auf einem Server läuft und im Hintergrund Daten speichert und verarbeitet.',
    analogie: 'Ein Restaurant: Der Gastraum mit Karte und Bedienung ist das Frontend — die Küche, in der gekocht, gelagert und abgerechnet wird, ist das Backend. Gäste sehen sie nie, aber ohne sie bleibt nur die Speisekarte.',
    beispiel: 'Der pilot AI Marketplace hat bewusst kein Backend — alles passiert in deinem Browser, deshalb braucht er keinen eigenen Server und keine Anmeldung.',
    tiefe: 'Faustregel: Alles, was du siehst und anklickst, ist Frontend; alles, was zentral gespeichert oder berechnet wird, ist Backend. Ein Backend läuft auf einem Server und bedeutet damit Betrieb, Wartung und meist ein Budget — deshalb ist es eine bewusste Entscheidung, ob ein Tool eines braucht. Nötig wird es erst, wenn mehrere Leute gemeinsame Daten teilen sollen: geteilte Bewertungen, ein zentrales Formular, Inhalte, die alle sehen. Für viele Citizen-Coding-Tools reicht ein reines Frontend völlig — Daten kommen dann aus einer CSV-Datei oder bleiben im localStorage des Browsers. Im Zweifel: erst die Frontend-Version bauen; ein Backend lässt sich später immer noch ergänzen.',
    verweise: [
      { t: 'skill', id: 'webseite-bauen', name: 'Webseite bauen' }
    ]
  },
  {
    id: 'barrierefreiheit',
    wort: 'Barrierefreiheit',
    buchstabe: 'B',
    thema: 'web',
    votes: 6,
    satz: 'Barrierefreiheit heißt, dass eine Webseite auch für Menschen nutzbar bleibt, die nicht gut sehen, keine Maus bedienen können oder auf Hilfsmittel angewiesen sind.',
    analogie: 'Wie die Rampe neben der Treppe: Gebaut wird sie für die, die keine Stufen steigen können — benutzt wird sie am Ende von allen mit Rollkoffer, Kinderwagen oder vollen Händen.',
    beispiel: 'Im Marketplace kommst du mit der Tabulatortaste durch jede Karte, und jeder Knopf trägt einen Namen, den ein Vorleseprogramm ansagen kann — deshalb funktioniert die Seite auch ganz ohne Maus.',
    tiefe: 'Vier Hebel decken das Meiste ab, und du bekommst sie fast geschenkt, wenn du sie im Auftrag erwähnst: ausreichender Farbkontrast, Bedienbarkeit per Tastatur, sprechende Beschriftungen für Knöpfe und Bilder — und Text, der sich vergrößern lässt, ohne dass das Layout zerfällt. Sag Claude Code einfach „bau das barrierefrei, Kontraste und Tastaturbedienung inklusive“, dann entsteht es von Anfang an richtig; nachträglich ist es deutlich mühsamer. Für Tools, die nur im Haus laufen, ist das eine Frage der Kollegialität — sobald etwas nach außen geht, kommen je nach Auftraggeber auch verbindliche Anforderungen dazu. Das Gröbste prüfst du selbst: Maus weglegen und versuchen, dein eigenes Tool nur mit Tab und Enter zu bedienen.',
    stolper: 'Der häufigste Fehler ist kein Programmierfehler, sondern eine Designentscheidung: hellgrauer Text auf weißem Grund. Er sieht auf dem eigenen guten Monitor elegant aus und ist im Zug bei Sonnenlicht schlicht nicht mehr lesbar.',
    verweise: [
      { t: 'begriff', id: 'css' },
      { t: 'begriff', id: 'responsive' }
    ]
  },
  {
    id: 'berechtigung',
    wort: 'Berechtigung',
    buchstabe: 'B',
    thema: 'ki',
    votes: 13,
    satz: 'Eine Berechtigung ist die Erlaubnis, die Claude Code von dir einholt, bevor es etwas an deinen Dateien ändert oder einen Befehl ausführt.',
    analogie: 'Wie die Unterschrift auf einer Freigabe: Die Kollegin kann alles vorbereiten — raus geht es erst, wenn du abgezeichnet hast.',
    beispiel: 'Beim ersten „Räum den Assets-Ordner auf“ fragt Claude Code Schritt für Schritt nach: Du siehst genau, welche Datei umbenannt werden soll, und bestätigst oder brichst ab.',
    tiefe: 'Claude Code kennt mehrere Berechtigungs-Modi, und du schaltest mit Shift+Tab zwischen ihnen um. Im Standard (im Anzeiger „Manual“) wird vor jeder Änderung gefragt. „Accept Edits“ lässt Datei-Änderungen ohne Rückfrage durchlaufen, andere Aktionen weiterhin nicht. Im Plan-Modus ändert Claude gar nichts, sondern legt erst einen Plan vor. Für den Anfang ist der Standard genau richtig: Die Rückfragen sind kein Misstrauen, sondern deine Gelegenheit mitzulesen — nebenbei lernst du dabei, wie Claude arbeitet. Was du oft brauchst, kannst du dauerhaft freigeben; dann fragt Claude Code beim nächsten Mal nicht mehr danach.',
    stolper: 'Der Plan-Modus ist keine Berechtigung, sondern eine Denkpause: Dort ändert Claude grundsätzlich nichts, auch wenn du zwischendurch etwas freigibst. Gebaut wird erst, wenn du den Plan abnimmst und den Modus verlässt.',
    verweise: [
      { t: 'befehl', id: 'shift-tab-modi' },
      { t: 'begriff', id: 'claude-code' }
    ]
  },
  {
    id: 'bibliothek-library',
    wort: 'Bibliothek (Library)',
    buchstabe: 'B',
    thema: 'handwerk',
    votes: 6,
    satz: 'Eine Bibliothek ist eine fertige Sammlung von Code-Bausteinen, die jemand anderes geschrieben hat und die du in dein Projekt einbaust, statt sie selbst zu bauen.',
    analogie: 'Wie das Regal mit fertigen Fonds in der Profiküche: Man könnte jeden selbst ansetzen — aber niemand tut das, wenn der fertige gut ist und das Gericht damit dreimal schneller auf dem Teller steht.',
    beispiel: 'Die Icons und Schriften der Vorlagen-Seite kommen aus solchen Bibliotheken — Claude Code bindet sie in dein Tool ein, und du hast einheitliche Symbole, ohne eines selbst zu zeichnen.',
    tiefe: 'Bibliotheken sind der Grund, warum aus einer Idee an einem Nachmittag ein Tool werden kann: Für Diagramme, Kalender oder sortierbare Tabellen gibt es erprobte Sammlungen, die das Standardproblem schon gelöst haben. Der Unterschied zum Framework ist die Richtung: Eine Bibliothek rufst DU auf, wenn du sie brauchst — ein Framework gibt umgekehrt den Rahmen vor, in den du dich einfügst. Zwei Fragen lohnen sich, bevor etwas eingebaut wird: Was erlaubt die Lizenz, und wird die Sammlung noch gepflegt? Beides kannst du Claude vorher fragen.',
    stolper: 'Jede eingebaute Bibliothek ist fremder Code in deinem Tool — mehr Fähigkeiten, aber auch mehr Ladezeit und mehr Abhängigkeit. Für kleine Tools gilt deshalb: einbauen, was gebraucht wird, nicht was interessant klingt.',
    verweise: [
      { t: 'begriff', id: 'framework' },
      { t: 'begriff', id: 'lizenz' }
    ]
  },
  {
    id: 'browser-konsole',
    wort: 'Browser-Konsole',
    buchstabe: 'B',
    thema: 'web',
    votes: 10,
    satz: 'Die Browser-Konsole ist ein verstecktes Fenster im Browser, in dem Webseiten ihre Fehlermeldungen und Statusmeldungen ausgeben.',
    analogie: 'Die Konsole ist der Fehlerspeicher beim Auto: Von außen siehst du nur die leuchtende Warnlampe — der Blick in den Speicher sagt der Werkstatt, was wirklich los ist.',
    beispiel: 'Wenn dein selbst gebautes Kampagnen-Dashboard plötzlich leer bleibt, öffnest du die Konsole (meist F12), kopierst die rote Fehlermeldung und gibst sie Claude Code — das ist oft der schnellste Weg zur Lösung.',
    tiefe: 'Öffnen: F12 drücken oder Rechtsklick auf die Seite → „Untersuchen“ → Reiter „Konsole“ (funktioniert in Chrome, Edge und Firefox fast gleich). Rote Zeilen sind Fehler, gelbe sind Warnungen — Warnungen darfst du meist ignorieren, Fehler sind heiße Spuren. Du musst die Meldungen nicht verstehen: Es reicht, sie wörtlich zu kopieren und Claude zu geben, am besten zusammen mit dem, was du gerade getan hast („beim Klick auf Export erscheint diese Meldung“). Damit ist die Konsole das wichtigste Diagnose-Werkzeug für alle, die Webseiten bauen, ohne Code lesen zu wollen.',
    verweise: [
      { t: 'prompt', id: 'fehlersuche-vibecoding', name: 'Fehlersuche im eigenen Tool' },
      { t: 'skill', id: 'webaudit', name: 'webaudit' }
    ]
  },
  {
    id: 'bug',
    wort: 'Bug',
    buchstabe: 'B',
    thema: 'handwerk',
    votes: 10,
    satz: 'Ein Bug ist ein Fehler in einem Programm, durch den es sich anders verhält als beabsichtigt.',
    analogie: 'Ein Bug ist wie ein Zahlendreher im Mediaplan: Das Dokument sieht ordentlich aus, aber an einer Stelle steckt ein Fehler, der still Chaos anrichtet — bis ihn jemand findet.',
    beispiel: 'Dein Umfrage-Tool zählt eine Antwort doppelt, wenn jemand zweimal schnell klickt — das ist ein klassischer Bug, kein Weltuntergang, sondern Alltag.',
    tiefe: 'Der Begriff geht auf eine echte Anekdote zurück: 1947 fand das Team der Informatikerin Grace Hopper eine Motte in einem Computer und klebte sie ins Logbuch — „first actual case of bug being found“. Wichtig für dich: Bugs sind Alltag und kein Zeichen, dass du etwas falsch gemacht hast — auch Profi-Software ist voll davon, es gibt nur eingespielte Wege, sie zu finden. Der schnellste davon ist eine gute Beschreibung: Was hast du getan, was hast du erwartet, was ist stattdessen passiert? Je konkreter („beim Klick auf Speichern verschwindet die dritte Zeile“), desto schneller findet Claude die Ursache.',
    verweise: [
      { t: 'skill', id: 'systematic-debugging', name: 'systematic-debugging' },
      { t: 'prompt', id: 'fehlersuche-vibecoding', name: 'Fehlersuche im eigenen Tool' }
    ]
  },
  {
    id: 'cache',
    wort: 'Cache',
    buchstabe: 'C',
    thema: 'web',
    votes: 8,
    satz: 'Der Cache ist ein Zwischenspeicher, in dem der Browser Teile einer Webseite aufbewahrt, damit sie beim nächsten Besuch schneller lädt.',
    analogie: 'Wie der Zettelstapel neben deiner Tastatur: Statt jedes Mal im Archiv zu suchen, nimmst du die Kopie, die du dir schon einmal gemacht hast. Praktisch — bis sich das Original ändert und dein Zettel veraltet ist.',
    beispiel: 'Du hast dein Team-Tool aktualisiert, aber eine Kollegin sieht noch die alte Version — ihr Browser zeigt sie aus dem Cache; ein beherztes Neuladen mit Strg+Shift+R holt die neue.',
    tiefe: 'Der Cache ist Freund und Falle zugleich: Er spart Ladezeit und Datenvolumen, zeigt aber manchmal veraltete Stände. Das klassische Symptom: Du (oder Claude) habt etwas geändert und veröffentlicht, aber im Browser „ist nichts passiert“ — dann zeigt der Browser noch die gespeicherte alte Version. Hartes Neuladen erzwingt die frische: Strg+Shift+R (Windows) bzw. Cmd+Shift+R (Mac). Sieht eine Kollegin noch den alten Stand, gilt bei ihr dasselbe. Erst wenn das harte Neuladen nichts ändert, lohnt die echte Fehlersuche — deshalb ist „Cache leeren“ völlig zu Recht das „Einmal aus- und wieder einschalten“ des Web.',
    stolper: 'Wenn hartes Neuladen nichts bringt, ist oft gar nicht der Cache schuld: Nach einem Push dauert es bei GitHub Pages ein bis zwei Minuten, bis die neue Fassung überhaupt online ist. Erst kurz warten, dann neu laden — und erst danach mit der Fehlersuche anfangen.',
    verweise: [
      { t: 'begriff', id: 'deploy' },
      { t: 'begriff', id: 'github-pages' }
    ]
  },
  {
    id: 'claude-code',
    wort: 'Claude Code',
    buchstabe: 'C',
    thema: 'ki',
    votes: 30,
    satz: 'Claude Code ist die KI von Anthropic als Programm für dein Terminal — sie beantwortet nicht nur Fragen, sondern arbeitet direkt in deinen Dateien und Ordnern.',
    analogie: 'Der Unterschied zum Chat-Fenster ist der zwischen Telefonberatung und Handwerker vor Ort: Am Telefon wird dir erklärt, wie es geht — vor Ort wird es gemacht, mit deinen Sachen, in deinem Raum.',
    beispiel: 'Du öffnest den Ordner mit den Kampagnen-Exports, tippst `claude` und sagst auf Deutsch: „Bau mir aus diesen CSVs eine Übersicht als Webseite.“ Am Ende liegt eine fertige Datei im Ordner — keine Anleitung im Chat.',
    tiefe: 'Drei Dinge machen den Unterschied zum Chat. Erstens der Zugriff: Claude Code liest und schreibt echte Dateien — in genau dem Ordner, in dem du es gestartet hast, und sonst nirgends. Zweitens die Werkzeuge: Es kann Dateien durchsuchen, Befehle ausführen und im Netz nachschlagen und plant selbst, welche Schritte dafür nötig sind. Drittens das Gedächtnis: Regeln, die dauerhaft gelten sollen, schreibst du in eine CLAUDE.md, dann kennt Claude sie in jeder Sitzung. Bedient wird trotzdem alles auf Deutsch in ganzen Sätzen — die `/`-Befehle sind Abkürzungen, keine Voraussetzung. Die Arbeitsteilung im Alltag: Langdock ist der Ort fürs Denken, Schreiben und Recherchieren, Claude Code der Ort zum Bauen.',
    stolper: 'Claude Code sieht nur den Ordner, in dem du es gestartet hast. Wenn es eine Datei „nicht findet“, liegt sie fast immer außerhalb dieses Ordners — es ist selten ein Fehler, meistens der falsche Startort.',
    verweise: [
      { t: 'begriff', id: 'terminal' },
      { t: 'begriff', id: 'claude-md' }
    ]
  },
  {
    id: 'claude-md',
    wort: 'CLAUDE.md',
    buchstabe: 'C',
    thema: 'ki',
    votes: 24,
    satz: 'Die CLAUDE.md ist eine einfache Textdatei in deinem Projektordner, in der die Regeln und Fakten stehen, die Claude Code in jeder Sitzung kennen soll.',
    analogie: 'Wie das Onboarding-Dokument für eine neue Kollegin: Alles, was du sonst jeden Montag neu erklären müsstest — Kundenname, Tonalität, Was-nicht-anfassen — steht einmal drin und gilt ab dann.',
    beispiel: 'In der CLAUDE.md deines Reporting-Tools stehen drei Zeilen: „Alle Texte in Du-Form“, „Der Kunde heißt immer ‚die Marke XY‘“, „Zahlen kommen aus der CSV, nie geschätzt“ — und du musst es nie wieder dazusagen.',
    tiefe: 'Angelegt wird sie mit `/init`, danach bearbeitest du sie wie jede andere Textdatei — es ist Markdown, also einfacher Text mit ein paar Zeichen für Überschriften und Listen. Claude Code liest sie beim Start automatisch und behält sie auch, wenn der Gesprächsverlauf mit `/compact` verdichtet wird. Hinein gehört, was dauerhaft und projektspezifisch gilt: Sprache und Ton, Namenskonventionen, Verbote, Besonderheiten des Projekts. Was nur heute zählt, sagst du im Gespräch. Und weniger ist mehr: Eine kurze, präzise Datei wirkt besser als eine lange Wunschliste — alles darin belegt dauerhaft Platz im Kontextfenster.',
    stolper: 'Die CLAUDE.md wirkt nur in dem Projektordner, in dem sie liegt. Startest du Claude Code woanders, gelten deine Regeln dort nicht — das ist der häufigste Grund für „warum hält es sich plötzlich nicht mehr daran?“.',
    verweise: [
      { t: 'befehl', id: 'init' },
      { t: 'begriff', id: 'systemprompt' }
    ]
  },
  {
    id: 'cli',
    wort: 'CLI (Kommandozeile)',
    buchstabe: 'C',
    thema: 'handwerk',
    votes: 6,
    satz: 'Ein CLI ist ein Programm, das du nicht mit Klicks bedienst, sondern mit getippten Befehlen im Terminal.',
    analogie: 'Grafische Oberfläche und CLI sind wie Speisekarte mit Bildern und Gespräch mit dem Koch: Die Karte zeigt, was es gibt — im Gespräch kannst du exakt sagen, was du willst, auch Dinge, die auf keiner Karte stehen.',
    beispiel: 'Claude Code ist ein CLI: Du tippst `claude` ins Terminal, und statt Buttons und Menüs gibt es ein Gespräch in Textform.',
    tiefe: 'CLI steht für „Command Line Interface“, das Gegenstück ist die grafische Oberfläche (GUI) mit Fenstern und Buttons. CLIs wirken auf den ersten Blick spröde, haben aber zwei große Stärken: Sie sind präzise (ein Befehl tut genau eine Sache) und wiederholbar (Befehle lassen sich verketten und automatisieren). Bei Claude Code ist die Hürde ohnehin klein: Du tippst normale deutsche Sätze, keine kryptischen Kommandos — nur ein paar /-Befehle wie /clear oder /help sind echte CLI-Tradition. Die wichtigsten davon findest du hier in Lernen & Hilfe unter „Befehle“.',
    verweise: [
      { t: 'skill', id: 'erste-schritte', name: 'Erste Schritte' }
    ]
  },
  {
    id: 'cloud',
    wort: 'Cloud',
    buchstabe: 'C',
    thema: 'handwerk',
    votes: 7,
    satz: 'Cloud heißt: Programme und Daten liegen nicht auf deinem Rechner, sondern auf Servern eines Anbieters — und du greifst übers Internet darauf zu.',
    analogie: 'Eigener Rechner oder Cloud ist wie Hausbibliothek oder Stadtbibliothek: Zu Hause gehört dir alles und du kommst auch offline heran — in der Stadtbibliothek steht viel mehr und sie ist von überall erreichbar, aber du brauchst den Weg dorthin (sprich: Internet).',
    beispiel: 'Langdock ist Cloud pur: Nichts davon läuft auf deinem Laptop, du brauchst nur den Browser. Claude Code dagegen wohnt in deinem Terminal und arbeitet an deinen lokalen Dateien — nur das „Denken“ passiert in der Cloud bei Anthropic.',
    tiefe: 'Hinter der „Wolke“ stecken sehr irdische Rechenzentren voller Server. Für deine Arbeit zählt vor allem die Frage: Wo sind meine Sachen? Lokal (auf deinem Rechner — schnell, offline verfügbar, aber nur dort) oder in der Cloud (überall verfügbar, teilbar, aber abhängig von Internet und Anbieter). Beim Vibecoding mischt sich beides ständig: Deine Dateien liegen lokal, das KI-Modell antwortet aus der Cloud, veröffentlicht wird über GitHub — wieder Cloud. Wichtig für den Alltag: Was in eine Cloud geht, verlässt deinen Rechner. Bei Kundendaten gilt deshalb dieselbe Vorsicht wie überall — siehe die FAQ ganz oben.',
    verweise: [
      { t: 'begriff', id: 'server' },
      { t: 'begriff', id: 'deploy' }
    ]
  },
  {
    id: 'code',
    wort: 'Code',
    buchstabe: 'C',
    thema: 'handwerk',
    votes: 13,
    satz: 'Code ist Text in einer Programmiersprache — Anweisungen, die ein Computer wörtlich ausführt.',
    analogie: 'Code ist ein Kochrezept für den Computer: exakte Zutaten, exakte Reihenfolge — und der Computer hält sich sklavisch daran, auch wenn im Rezept ein Fehler steht.',
    beispiel: 'Wenn du im Marketplace auf „Details“ klickst und ein Fenster aufgeht, führt dein Browser gerade Code aus — ein paar Dutzend Zeilen, die Claude Code genauso für dein eigenes Tool schreiben kann.',
    tiefe: 'Code ist nichts Magisches: einfache Textdateien, die du in jedem Editor öffnen kannst — erst ein Programm, das sie ausführt (etwa der Browser), macht daraus ein lebendiges Tool. Der Computer tut dabei exakt, was dasteht, nicht, was gemeint war — deshalb sind Tippfehler im Code echte Bugs und keine Lappalien. Beim Vibecoding sind die Rollen klar verteilt: Claude schreibt und liest den Code, du beschreibst das Ziel und prüfst das Verhalten. Trotzdem lohnt Neugier: Lass dir mit dem Prompt „Was tut diese Datei?“ Code in Alltagssprache erklären — du wirst überrascht sein, wie viel du wiedererkennst.',
    verweise: [
      { t: 'begriff', id: 'programmiersprache' },
      { t: 'prompt', id: 'code-verstehen', name: 'Was tut diese Datei?' }
    ]
  },
  {
    id: 'commit',
    wort: 'Commit',
    buchstabe: 'C',
    thema: 'handwerk',
    votes: 26,
    satz: 'Ein Commit ist ein gespeicherter Zwischenstand deines Projekts mit einer kurzen Notiz, was sich geändert hat.',
    analogie: 'Ein Commit ist ein Spielstand wie im Videospiel: Du speicherst an einem guten Punkt — und egal, was danach schiefgeht, du kannst genau dorthin zurück.',
    beispiel: 'Nach jedem funktionierenden Schritt an deinem Mediaplan-Tool sagst du Claude „mach einen Commit“ — so entsteht eine Kette von Sicherungspunkten, zu denen du jederzeit zurück kannst.',
    tiefe: 'Commits sind das Herz der Versionierung mit Git: Jeder Commit hält fest, wer wann was geändert hat, samt kurzer Notiz („Filter für Kanäle ergänzt“). Gute Gewohnheit: lieber viele kleine Commits nach jedem funktionierenden Schritt als ein riesiger am Ende — kleine Sicherungspunkte machen das Zurückgehen präzise. Kaputtgehen kann dabei nichts: Ein Commit fügt nur Historie hinzu, er verändert keine Dateien. In Claude Code musst du keine Git-Befehle können — „mach einen Commit“ oder „sichere den Stand“ genügt, die Notiz formuliert Claude gleich mit. Erst der Push lädt deine Commits dann zu GitHub hoch; bis dahin liegen sie nur auf deinem Rechner.',
    stolper: 'Ein Commit liegt ausschließlich auf deinem Rechner. Wer glaubt, damit sei etwas veröffentlicht, wundert sich, dass Kolleg:innen weiter den alten Stand sehen — dafür braucht es den Push.',
    verweise: [
      { t: 'skill', id: 'tool-teilen', name: 'Tool teilen' }
    ]
  },
  {
    id: 'css',
    wort: 'CSS',
    buchstabe: 'C',
    thema: 'web',
    votes: 13,
    satz: 'CSS ist die Sprache, die bestimmt, wie eine Webseite aussieht — Farben, Schriften, Abstände, Anordnung.',
    analogie: 'HTML ist der Rohbau, CSS sind Anstrich und Einrichtung: gleiche Wände — aber erst Farbe, Möbel und Licht machen daraus einen Raum, in dem man gern ist.',
    beispiel: '„Mach die Überschrift größer und den Hintergrund pilot-gelb“ — solche Wünsche setzt Claude Code in CSS um, ohne dass du eine Zeile davon selbst schreiben musst.',
    tiefe: 'CSS steht für „Cascading Style Sheets“. Die Dreier-Merkhilfe fürs Web: HTML ist das Skelett (Inhalt und Struktur), CSS die Kleidung (Aussehen), JavaScript die Muskeln (Verhalten). Praktisch heißt das: Wenn etwas „komisch aussieht“ — falsche Farbe, zu eng, verrutscht, am Handy zerschossen — ist fast immer CSS die Stellschraube, nicht der Inhalt. Formuliere Gestaltungswünsche ruhig in Alltagssprache („mehr Luft zwischen den Kästen“, „am Handy untereinander statt nebeneinander“) — Claude übersetzt das in die passenden CSS-Regeln. Farben, Schriften und fertige Bausteine im pilot-Look liefert dir die Vorlagen-Seite des Marketplace.',
    verweise: [
      { t: 'skill', id: 'webseite-bauen', name: 'Webseite bauen' }
    ]
  },
  {
    id: 'csv',
    wort: 'CSV',
    buchstabe: 'C',
    thema: 'daten',
    votes: 11,
    satz: 'CSV ist ein sehr einfaches Tabellenformat: eine Textdatei, in der die Spalten durch Kommas oder Semikolons getrennt sind.',
    analogie: 'Eine CSV ist eine Excel-Tabelle im Feinripp: keine Farben, keine Formeln, keine Reiter — nur die nackten Zellwerte, durch Semikolon oder Komma getrennt. Genau deshalb kann sie jedes Programm lesen.',
    beispiel: 'Der Export aus dem AdServer kommt als CSV — du gibst die Datei Claude Code und lässt dir erklären, welche Spalten drinstecken, bevor du daraus einen Report baust.',
    tiefe: 'CSV steht für „Comma-Separated Values“. Jede Zeile der Textdatei ist eine Tabellenzeile, die erste enthält meist die Spaltennamen. Der große Vorteil: Praktisch jedes Programm kann CSV lesen und schreiben — Excel, der AdServer, Google Sheets und Claude. Die Stolperfallen im deutschen Raum: Oft trennt ein Semikolon statt des Kommas (weil das Komma bei uns das Dezimalzeichen ist), und Umlaute können nach dem Export kaputt aussehen — ein Zeichensatz-Problem namens Encoding. Beides kann Claude beim Einlesen für dich geradeziehen; sag am besten dazu, aus welchem System der Export stammt.',
    verweise: [
      { t: 'prompt', id: 'csv-erklaeren', name: 'CSV-Datei erklären lassen' },
      { t: 'skill', id: 'daten-aufbereiten', name: 'Daten aufbereiten' }
    ]
  },
  {
    id: 'dateipfad',
    wort: 'Datei-Pfad',
    buchstabe: 'D',
    thema: 'daten',
    votes: 17,
    satz: 'Ein Datei-Pfad ist die vollständige Adresse einer Datei auf deinem Rechner, Ordner für Ordner aufgeschrieben.',
    analogie: 'Ein Pfad ist die Postanschrift einer Datei: Land, Stadt, Straße, Hausnummer — nur eben Laufwerk, Ordner, Unterordner, Dateiname.',
    beispiel: '`C:\\Projekte\\kampagnen-tool\\index.html` sagt Claude Code exakt, welche Datei gemeint ist — viel eindeutiger als „die Datei von gestern“.',
    tiefe: 'Windows trennt Ordner mit `\\` (Backslash), Mac und Linux mit `/`. Es gibt absolute Pfade (die komplette Adresse ab Laufwerk, z. B. `C:\\Projekte\\kampagnen-tool\\index.html`) und relative (der Weg vom aktuellen Ordner aus, z. B. `daten/export.csv`). In Claude Code kannst du Dateien mit `@` erwähnen und bekommst beim Tippen Vorschläge — das erspart das Abtippen. Zwei Tricks bei Unsicherheit: die Datei im Explorer/Finder suchen und den Pfad aus der Adressleiste kopieren — oder die Datei einfach ins Terminalfenster ziehen, dann fügt sich ihr Pfad von selbst ein.',
    stolper: 'Leerzeichen und Umlaute in Ordnernamen sind die häufigste Ursache für „Datei nicht gefunden“. `C:\\Meine Projekte\\Kampagne Müller\\` geht oft gut, aber nicht immer — bei neu angelegten Projektordnern zahlt sich `kampagne-mueller` aus.',
    verweise: [
      { t: 'befehl', id: 'datei-verweis' },
      { t: 'skill', id: 'erste-schritte', name: 'Erste Schritte' }
    ]
  },
  {
    id: 'datenbank',
    wort: 'Datenbank',
    buchstabe: 'D',
    thema: 'daten',
    votes: 6,
    satz: 'Eine Datenbank ist ein Programm, das große Mengen strukturierter Daten dauerhaft speichert und blitzschnell durchsuchbar macht.',
    analogie: 'Excel-Liste und Datenbank verhalten sich wie Schuhkarton voller Visitenkarten und gepflegtes CRM: Bei kleinen Mengen tut es beides — bei Zehntausenden Einträgen und vielen gleichzeitigen Zugriffen nur noch eines.',
    beispiel: 'Euer Mediaplanungs-System hat eine Datenbank im Rücken: Jede Buchung, jeder Kunde, jeder Tarif liegt dort — und der Export, den du als CSV bekommst, ist ein Auszug daraus.',
    tiefe: 'Datenbanken laufen fast immer auf einem Server und gehören damit zur Backend-Welt: Sie sind der Ort, an dem „richtige“ Anwendungen ihre zentralen Daten halten — widerspruchsfrei, auch wenn hundert Leute gleichzeitig arbeiten. Für deine ersten Tools brauchst du in der Regel keine: Eine CSV-Datei als Datengrundlage oder der localStorage des Browsers als Speicher decken die meisten Feierabend-Tools ab. Die Faustregel: Solange nur du (oder jede:r für sich) Daten hältst, reichen Datei und Browser — sobald ein Team dieselben Daten gemeinsam pflegen soll, wird eine Datenbank fällig. Und dann lohnt der Draht zu Technology & Data.',
    verweise: [
      { t: 'begriff', id: 'csv' },
      { t: 'begriff', id: 'backend' }
    ]
  },
  {
    id: 'datenschutz-vertraulichkeit',
    wort: 'Datenschutz & Vertraulichkeit',
    buchstabe: 'D',
    thema: 'handwerk',
    votes: 22,
    satz: 'Datenschutz und Vertraulichkeit heißen hier ganz praktisch: bewusst entscheiden, welche Daten du überhaupt in ein KI-Werkzeug eingibst.',
    analogie: 'Wie die Entscheidung, was du in einer vollen Bahn ins Telefon sprichst: Nicht jedes Gespräch ist geheim — Kundennamen, Zahlen und Personendaten sagt man dort trotzdem nicht laut.',
    beispiel: 'Der Mediaplan-Export soll ausgewertet werden: Kundennamen und Ansprechpartner:innen vorher ersetzen — für die Rechenarbeit braucht die KI die Zahlen, nicht die Namen.',
    tiefe: 'Zwei Fragen tragen weit. Erstens: Verlässt die Eingabe deinen Rechner? Bei Langdock und bei Claude Code geht die Anfrage an den Anbieter — auch wenn deine Dateien lokal liegen, wandert der Inhalt, den Claude liest, in die Anfrage mit. Zweitens: Wären diese Daten ein Problem, wenn sie an der falschen Stelle auftauchten? Bei personenbezogenen Daten, Kundenunterlagen und Zugangsdaten ist die Antwort fast immer ja. Der beste Reflex ist Anonymisieren statt Verzichten: Namen durch Platzhalter ersetzen, rechnen lassen, danach die echten Namen wieder einsetzen. Was bei pilot konkret erlaubt ist, steht ausdrücklich NICHT hier: Verbindlich ist allein die interne KI-Richtlinie. Im Zweifel — und vor jedem Kundenprojekt — fragst du das KI-Enablement-Team; diese Seite erfindet dazu bewusst keine Regel.',
    stolper: 'Die häufigste Lücke ist nicht die Eingabe, sondern das Veröffentlichen: Was in ein öffentliches Repo gepusht wird, steht im Netz — samt der Beispieldatei mit echten Kundenzahlen, die „nur zum Testen“ mit hochgerutscht ist.',
    verweise: [
      { t: 'begriff', id: 'cloud' },
      { t: 'begriff', id: 'github-pages' }
    ]
  },
  {
    id: 'debugging',
    wort: 'Debugging',
    buchstabe: 'D',
    thema: 'handwerk',
    votes: 9,
    satz: 'Debugging ist die systematische Suche nach der Ursache eines Fehlers — erst verstehen, dann reparieren.',
    analogie: 'Debugging ist Arztbesuch statt Wunderpille: erst Symptome beschreiben, dann Diagnose, dann Behandlung. Wer nur „mach, dass es weggeht“ sagt, bekommt Behandlungen für die falsche Krankheit.',
    beispiel: 'Statt Claude zehnmal „fix es!“ zu schreiben, sagst du: „Der CSV-Import bricht bei Zeile 200 ab, hier ist die Fehlermeldung“ — das ist Debugging, und es spart dir Stunden.',
    tiefe: 'Der häufigste Anfängerfehler ist, wild Lösungen zu raten, statt die Ursache einzukreisen — dabei entstehen gern zwei neue Probleme. Gutes Vorgehen in drei Schritten: den Fehler zuverlässig reproduzieren („passiert immer, wenn ich …“), die Fehlermeldung wörtlich kopieren (gern aus der Browser-Konsole) und den letzten funktionierenden Stand benennen („gestern ging es noch, seit dem neuen Filter nicht mehr“). Mit diesen drei Zutaten findet Claude die Ursache meist in Minuten statt Stunden. Der Skill systematic-debugging gibt Claude genau diese Disziplin mit: erst Hypothese bilden und prüfen, dann reparieren.',
    verweise: [
      { t: 'skill', id: 'systematic-debugging', name: 'systematic-debugging' },
      { t: 'prompt', id: 'fehlersuche-vibecoding', name: 'Fehlersuche im eigenen Tool' }
    ]
  },
  {
    id: 'deploy',
    wort: 'Deploy',
    buchstabe: 'D',
    thema: 'web',
    votes: 25,
    satz: 'Ein Deploy ist der Moment, in dem dein Projekt von deinem Rechner ins Internet wandert und für andere erreichbar wird.',
    analogie: 'Ein Deploy ist die Drucklegung: Bis dahin ist alles Entwurf auf deinem Schreibtisch — mit dem Deploy hängt das Plakat draußen und alle sehen es.',
    beispiel: 'Dein Briefing-Generator läuft lokal? Nach dem Deploy auf GitHub Pages kann das ganze Team ihn unter einer normalen Web-Adresse öffnen — ohne irgendwas zu installieren.',
    tiefe: '„Deployen“ heißt wörtlich „ausrollen“. Bei GitHub Pages ist der Deploy an Git gekoppelt: Du pushst deine Änderungen, GitHub baut die Seite neu, und ein bis zwei Minuten später ist die Live-Adresse aktuell. Es gibt also keinen separaten „Hochladen“-Knopf — die Versionierung ist gleichzeitig der Veröffentlichungsweg. Zwei Dinge lernt man dabei schnell: Erstens dauert es einen Moment (nicht wundern, wenn die Änderung nicht sofort da ist), zweitens zeigt der Browser danach manchmal noch die alte Version aus dem Cache — hartes Neuladen hilft. Und: Was deployed ist, ist bei öffentlichen Repos öffentlich — vertrauliche Inhalte gehören da nie hinein.',
    verweise: [
      { t: 'skill', id: 'tool-teilen', name: 'Tool teilen' },
      { t: 'skill', id: 'webseite-bauen', name: 'Webseite bauen' }
    ]
  },
  {
    id: 'few-shot-beispiel',
    wort: 'Few-Shot (Beispiele mitgeben)',
    buchstabe: 'F',
    thema: 'ki',
    votes: 14,
    satz: 'Few-Shot heißt: Du gibst der KI ein bis drei Beispiele für das gewünschte Ergebnis mit — sie erkennt daran das Muster und liefert den Rest im selben Stil.',
    analogie: 'Wie ein Muster-Dokument für die neue Werkstudentin: Statt den Stil zu beschreiben, legst du zwei fertige Beispiele daneben — „so ungefähr“ ist damit in einer Sekunde geklärt.',
    beispiel: '„Schreib 10 Betreffzeilen im Stil dieser drei: …“ liefert deutlich brauchbarere Ergebnisse als „Schreib 10 Betreffzeilen, bitte knackig“ — das Muster steckt in den Beispielen, nicht im Adjektiv.',
    tiefe: 'Der Name kommt aus der Fachsprache: „Zero-Shot“ ist eine Anweisung ohne Beispiel, „Few-Shot“ eine mit einigen. Am stärksten wirkt es bei allem, was sich schlecht beschreiben lässt — Tonalität, Aufbau, Länge, Formatierung. Drei Regeln aus der Praxis: Die Beispiele müssen gut sein, denn die KI übernimmt auch ihre Schwächen; sie müssen zueinander passen, sonst entsteht Beliebigkeit; und zwei bis drei reichen fast immer. Umgekehrt wirkt auch ein Gegenbeispiel: „So ausdrücklich NICHT: …“ grenzt genauso wirksam ein.',
    stolper: 'Beispiele schlagen Anweisungen. Wenn du „kurz“ schreibst, aber drei lange Beispiele mitschickst, gewinnen die Beispiele — und du wunderst dich über die Länge der Antwort.',
    verweise: [
      { t: 'begriff', id: 'prompt' },
      { t: 'begriff', id: 'platzhalter' }
    ]
  },
  {
    id: 'framework',
    wort: 'Framework',
    buchstabe: 'F',
    thema: 'web',
    votes: 8,
    satz: 'Ein Framework ist ein vorgefertigtes Grundgerüst für Software: Statt bei null anzufangen, baust du in einen bewährten Rahmen hinein, der viele Standardprobleme schon gelöst hat.',
    analogie: 'Ein Framework ist ein Fertighaus-Bausatz: Statik, Leitungen und Grundriss-Logik sind gelöst — du entscheidest über Räume und Einrichtung. Schneller als selbst mauern, solange du willst, was der Bausatz vorsieht.',
    beispiel: 'Wenn Entwickler:innen bei pilot von React oder Vue reden, meinen sie Web-Frameworks. Für deine ersten Tools braucht es die nicht — Claude Code baut sie bewusst ohne Framework, als einzelne HTML-Datei, die überall läuft.',
    tiefe: 'Das Wort begegnet dir in zwei Bedeutungen. In der Software-Welt: eine Code-Grundlage wie React, auf der Profi-Anwendungen aufsetzen — mächtig, aber mit Lernkurve und eigener Werkzeugkette, für Feierabend-Tools meist Overkill. Im Katalog des Marketplace: die dritte Art von Eintrag neben Skill und Plugin — dort meint „Framework“ eine komplette Arbeitsweise für die Zusammenarbeit mit Claude (etwa: erst planen, dann bauen), kein Code-Paket. Die Merkhilfe aus dem Katalog: Skill = Rezept, Plugin = Kochbuch, Framework = Art zu kochen. Beide Bedeutungen teilen den Kern: ein Rahmen, der Struktur vorgibt, damit nicht jede:r alles neu erfindet.',
    verweise: [
      { t: 'skill', id: 'brainstorm-plan-execute', name: 'Brainstorm → Plan → Execute' },
      { t: 'begriff', id: 'plugin' }
    ]
  },
  {
    id: 'frontend',
    wort: 'Frontend',
    buchstabe: 'F',
    thema: 'web',
    votes: 6,
    satz: 'Das Frontend ist der sichtbare Teil einer Anwendung — alles, was du im Browser siehst und anklickst.',
    analogie: 'Das Frontend ist Schaufenster und Verkaufsraum: alles, was Besucher:innen sehen und anfassen. Was im Lager passiert (Backend), bekommen sie nicht mit.',
    beispiel: 'Katalog, Suchfeld und die „Hilfreich“-Knöpfe im pilot AI Marketplace sind Frontend; es gibt dahinter keinen Server, die ganze Seite läuft in deinem Browser — deine Stimme bleibt deshalb auch nur in deinem Browser.',
    tiefe: 'Frontend besteht typischerweise aus drei Sprachen: HTML (Struktur), CSS (Aussehen) und JavaScript (Verhalten) — alle drei laufen direkt im Browser der Nutzer:innen. Reine Frontend-Tools sind ideal für den Einstieg ins Vibecoding: Sie sind schnell gebaut, laufen ohne Server, lassen sich als einzelne Datei verschicken oder über GitHub Pages teilen — und sie können keine zentralen Daten kaputt machen. Der ganze pilot AI Marketplace ist bewusst so gebaut. Erst wenn mehrere Leute gemeinsame, zentrale Daten brauchen, kommt ein Backend ins Spiel.',
    verweise: [
      { t: 'skill', id: 'webseite-bauen', name: 'Webseite bauen' },
      { t: 'skill', id: 'prototyp-bauen', name: 'Prototyp bauen' }
    ]
  },
  {
    id: 'git',
    wort: 'Git',
    buchstabe: 'G',
    thema: 'handwerk',
    votes: 22,
    satz: 'Git ist ein Werkzeug, das jede Änderung an deinem Projekt protokolliert, sodass du jederzeit zu einem früheren Stand zurückkehren kannst.',
    analogie: 'Git ist das Fahrtenbuch deines Projekts: Jede Änderung steht drin — wer, wann, was, warum. Und anders als bei „final_v2_NEU“-Dateien lässt sich jede alte Version wiederherstellen.',
    beispiel: 'Claude hat beim Umbau deines Reporting-Tools etwas zerlegt? Mit Git holst du den Stand von heute Vormittag zurück — nichts ist verloren.',
    tiefe: 'Git ist seit Jahren der Standard für Versionierung und die Grundlage von GitHub. So endet das `final_v2_NEU_wirklich-final`-Chaos: Statt Dateien umzubenennen, hält Git jede Version mit Datum, Autor:in und Notiz in einer sauberen Kette von Commits fest. Du musst die Befehle nicht auswendig können: Sag Claude Code „sichere den Stand“ oder „geh zum letzten Commit zurück“, und es übersetzt das in Git. Wichtig ist nur das Prinzip: regelmäßig sichern — dann ist Experimentieren risikofrei, weil sich jeder Umbau rückgängig machen lässt. Genau diese Sicherheit macht Vibecoding entspannt: Du kannst Claude mutig umbauen lassen, der letzte gute Stand ist immer nur einen Satz entfernt.',
    stolper: 'Git und GitHub werden ständig verwechselt: Git ist das Werkzeug auf deinem Rechner, GitHub die Website, auf der Git-Projekte liegen und geteilt werden. Du kannst Git ohne GitHub nutzen — andersherum nicht.',
    verweise: [
      { t: 'skill', id: 'tool-teilen', name: 'Tool teilen' }
    ]
  },
  {
    id: 'github-pages',
    wort: 'GitHub Pages',
    buchstabe: 'G',
    thema: 'web',
    votes: 18,
    satz: 'GitHub Pages ist ein kostenloser Dienst, der die Dateien aus einem GitHub-Projekt als echte Webseite ins Internet stellt.',
    analogie: 'GitHub Pages ist der Schaukasten am Projektgebäude: Was du in den Projektordner legst und pushst, hängt kurz darauf öffentlich sichtbar aus — ohne dass du eine eigene Vitrine (sprich: einen Server) mieten musst.',
    beispiel: 'Der pilot AI Marketplace selbst liegt auf GitHub Pages — keine Server-Miete, keine IT-Tickets, einfach Dateien hochladen und die Seite ist live.',
    tiefe: 'Voraussetzung ist ein Repo auf GitHub; in dessen Einstellungen aktivierst du Pages einmalig, ab dann wird jeder Push automatisch veröffentlicht. Die Adresse hat die Form `benutzername.github.io/projektname`. Es funktioniert nur für statische Seiten (HTML, CSS, JavaScript ohne eigenes Backend) — genau das, was bei Citizen-Coding-Tools meist entsteht — und kostet nichts. Die Einrichtung kann Claude Code komplett übernehmen: „Veröffentliche das über GitHub Pages“ reicht als Auftrag. Achtung: Ein öffentliches Repo bedeutet eine öffentliche Seite — Kundendaten, vertrauliche Unterlagen oder API-Schlüssel haben dort nie etwas verloren.',
    stolper: 'Öffentlich heißt wirklich öffentlich, und zwar für ALLE Dateien im Repo — nicht nur für die, auf die eine Seite verlinkt. Eine Test-CSV mit echten Kundenzahlen ist damit über ihre Adresse abrufbar, obwohl sie nirgends verlinkt ist.',
    verweise: [
      { t: 'skill', id: 'tool-teilen', name: 'Tool teilen' },
      { t: 'skill', id: 'webseite-bauen', name: 'Webseite bauen' }
    ]
  },
  {
    id: 'halluzination',
    wort: 'Halluzination',
    buchstabe: 'H',
    thema: 'ki',
    votes: 33,
    satz: 'Eine Halluzination ist eine KI-Antwort, die überzeugend klingt, aber frei erfunden ist.',
    analogie: 'Wie ein eloquenter Kollege, der in Meetings nie „weiß ich nicht“ sagt: Neun Antworten sind brillant — die zehnte ist frei erfunden und klingt exakt genauso souverän.',
    beispiel: 'Claude nennt dir eine „Studie von Nielsen 2024“ mit exakten Prozentzahlen für deine Pitch-Folie — bevor die ins Kundendeck wandert, prüfst du, ob es die Studie überhaupt gibt.',
    tiefe: 'Der Grund liegt in der Funktionsweise: Sprachmodelle erzeugen Text, der wahrscheinlich klingt — nicht Text, der garantiert stimmt. Sie „wissen“ nicht im menschlichen Sinn, sie setzen plausibel fort. Besonders anfällig: konkrete Zahlen, Quellenangaben, Studien, Namen, Paragrafen, Links — und alles nach dem Wissensstand des Modells. Die Gegenmittel: Quellen mitliefern lassen und stichprobenartig öffnen, kritische Fakten vor Kundenkontakt selbst prüfen, der KI ausdrücklich erlauben, „weiß ich nicht“ zu sagen, und ihr eigene Dokumente mitgeben (Wissen anbinden) — mit echter Grundlage sinkt die Erfindungsquote deutlich. Faustregel: KI-Ergebnisse behandeln wie den Entwurf einer neuen Praktikantin — hilfreich, aber vor Veröffentlichung gegengelesen.',
    stolper: 'Halluzinationen erkennt man nicht am Tonfall — genau das ist der Punkt. Eine erfundene Studie klingt exakt so souverän wie eine echte; „das wirkte plausibel“ ist deshalb keine Prüfung, sondern das Symptom.',
    verweise: [
      { t: 'skill', id: 'superpowers', name: 'superpowers' },
      { t: 'begriff', id: 'wissen-anbinden' }
    ]
  },
  {
    id: 'hosting-domain',
    wort: 'Hosting & Domain',
    buchstabe: 'H',
    thema: 'web',
    votes: 7,
    satz: 'Hosting ist der Platz, an dem deine Webseite dauerhaft liegt und ausgeliefert wird; die Domain ist der Name, unter dem man sie im Browser erreicht.',
    analogie: 'Hosting ist das gemietete Ladenlokal, die Domain das Schild darüber. Ohne Laden nützt das schönste Schild nichts — und ohne Schild findet niemand den Laden, selbst wenn geöffnet ist.',
    beispiel: 'Der pilot AI Marketplace wird von GitHub Pages gehostet und ist unter einer `github.io`-Adresse erreichbar: Hosting kostenlos, Adresse inklusive, kein eigener Server im Spiel.',
    tiefe: 'Für Citizen-Coding-Tools ist beides meist keine Kostenfrage: GitHub Pages hostet statische Seiten gratis und liefert eine Adresse der Form `name.github.io/projekt` gleich mit. Eine eigene Domain wie `mein-tool.de` ist ein separater Mietvertrag bei einem Anbieter, kostet ein paar Euro im Jahr und wird dann auf das Hosting gezeigt. Technisch ist das einfach — die Entscheidung ist es nicht: Eine eigene Domain sieht nach offiziellem pilot-Angebot aus. Für alles, was nach außen sichtbar wird, gilt deshalb: erst intern klären, dann mieten. Für Tools, die nur im Haus genutzt werden, reicht die kostenlose Adresse vollkommen.',
    stolper: 'Gehostet heißt öffentlich erreichbar, auch ohne eigene Domain. Eine GitHub-Pages-Adresse ist nicht geheim, nur unbekannt — wer den Link hat, kommt hinein. Ein Passwort gibt es dort nicht.',
    verweise: [
      { t: 'begriff', id: 'github-pages' },
      { t: 'begriff', id: 'url' }
    ]
  },
  {
    id: 'html',
    wort: 'HTML',
    buchstabe: 'H',
    thema: 'web',
    votes: 15,
    satz: 'HTML ist die Sprache, die den Inhalt und die Struktur einer Webseite beschreibt — Überschriften, Absätze, Links, Bilder.',
    analogie: 'HTML ist der Rohbau eines Hauses: Wände, Türen, Räume — was wo ist. Noch ohne Farbe (CSS) und ohne Strom (JavaScript), aber das Haus steht.',
    beispiel: 'Eine einzelne HTML-Datei reicht schon für ein nützliches Tool: Dein erster Prototyp bei pilot kann eine `index.html` sein, die du per Doppelklick im Browser öffnest.',
    tiefe: 'HTML steht für „HyperText Markup Language“. Es ist keine Programmiersprache, sondern eine Auszeichnungssprache: Sie sagt „das hier ist eine Überschrift, das ein Absatz, das ein Link“ — sie rechnet nichts aus. Der Clou für den Einstieg: Eine einzelne HTML-Datei kann CSS und JavaScript gleich mit enthalten und ist damit ein komplettes, lauffähiges Tool — per Doppelklick im Browser zu öffnen, ohne Installation, ohne Server. Genau so entstehen die meisten ersten Vibecoding-Projekte, und genau so sind auch die Demos im Showroom gebaut. Wenn du wissen willst, was in so einer Datei steckt: Der Prompt „Was tut diese Datei?“ lässt Claude sie dir Abschnitt für Abschnitt erklären.',
    verweise: [
      { t: 'skill', id: 'webseite-bauen', name: 'Webseite bauen' },
      { t: 'prompt', id: 'code-verstehen', name: 'Was tut diese Datei?' }
    ]
  },
  {
    id: 'iteration',
    wort: 'Iteration',
    buchstabe: 'I',
    thema: 'handwerk',
    votes: 10,
    satz: 'Eine Iteration ist eine Runde aus Bauen, Anschauen und Nachbessern — und die Arbeitsweise, in der beim Vibecoding praktisch alles entsteht.',
    analogie: 'Wie Layout-Runden mit der Kreation: Die erste Fassung ist nie die letzte, aber ohne sie gibt es nichts zu besprechen. Erst am Konkreten fällt auf, was fehlt.',
    beispiel: 'Runde eins: Die Tabelle wird angezeigt. Runde zwei: Sie ist sortierbar. Runde drei: Sie sieht nach pilot aus. Jede Runde dauert Minuten — und nach jeder weißt du besser, was du eigentlich willst.',
    tiefe: 'Der Fehler, den fast alle einmal machen, ist der Wunschzettel: alle zwölf Anforderungen in einen Auftrag, eine halbe Stunde warten — und am Ende ein Ergebnis, bei dem niemand mehr weiß, welcher Teil schiefging. Kleine Runden sind schneller UND sicherer: Nach jeder siehst du etwas Laufendes, kannst korrigieren, solange die Änderung klein ist, und den guten Stand mit einem Commit sichern. Eine bewährte Reihenfolge: erst die eine Funktion, um die es wirklich geht, dann die Bequemlichkeiten, dann das Aussehen. Läuft eine Runde in die falsche Richtung, nicht weiterreparieren — zum letzten guten Stand zurück und neu beschreiben.',
    stolper: 'Iterieren heißt nicht „einfach nochmal versuchen“. Bringt dieselbe Anweisung zum dritten Mal dasselbe falsche Ergebnis, liegt es an der Beschreibung, nicht an der KI — dann lohnt es, das Ziel neu zu formulieren statt es lauter zu wiederholen.',
    verweise: [
      { t: 'begriff', id: 'vibecoding' },
      { t: 'begriff', id: 'commit' }
    ]
  },
  {
    id: 'javascript',
    wort: 'JavaScript',
    buchstabe: 'J',
    thema: 'web',
    votes: 14,
    satz: 'JavaScript ist die Programmiersprache, die Webseiten interaktiv macht — alles, was auf Klicks reagiert, rechnet oder sich bewegt.',
    analogie: 'Im Haus-Bild ist JavaScript Elektrik und Mechanik: Lichtschalter, Türöffner, Rollläden — alles, was auf Knopfdruck reagiert und wirklich etwas tut.',
    beispiel: 'Dass im Marketplace die Skill-Liste beim Tippen sofort gefiltert wird, ist JavaScript — es läuft direkt in deinem Browser, ohne Server.',
    tiefe: 'Nicht verwechseln mit Java — trotz des Namens sind das zwei völlig verschiedene Sprachen; die Ähnlichkeit war in den Neunzigern schlicht Marketing. JavaScript ist die Sprache, in der Claude Code die meisten Citizen-Coding-Tools baut, weil sie überall läuft, wo ein Browser ist — niemand muss etwas installieren. Alles, was in einer Seite rechnet, filtert, sortiert oder auf Klicks reagiert, ist JavaScript: die Live-Suche im Katalog genauso wie der TKP-Rechner im Showroom. Du musst die Sprache nicht schreiben können; es hilft aber, sie grob zu erkennen — Zeilen mit `function`, `const` oder `=>` sind JavaScript. Für alles Weitere gilt: Claude schreibt, du beschreibst.',
    verweise: [
      { t: 'skill', id: 'webseite-bauen', name: 'Webseite bauen' },
      { t: 'prompt', id: 'code-verstehen', name: 'Was tut diese Datei?' }
    ]
  },
  {
    id: 'json',
    wort: 'JSON',
    buchstabe: 'J',
    thema: 'daten',
    votes: 11,
    satz: 'JSON ist ein Textformat, in dem Daten sauber strukturiert gespeichert werden — mit geschweiften Klammern, Anführungszeichen und Doppelpunkten.',
    analogie: 'JSON ist ein sauber ausgefülltes Formular: Vor jedem Wert steht, was er bedeutet — „Kunde: Grünwerk, Budget: 120.000“ — statt dass sich die Bedeutung wie bei CSV nur aus der Spaltenüberschrift ergibt.',
    beispiel: 'Die Skills des Marketplace stecken in einer Datenstruktur im JSON-Stil: pro Skill Name, Beschreibung, Kategorie — für Menschen lesbar, für Programme perfekt verarbeitbar.',
    tiefe: 'JSON steht für „JavaScript Object Notation“ und ist das Lieblingsformat von APIs und Konfigurationsdateien. Der Aufbau besteht aus Schlüssel-Wert-Paaren wie `"name": "Campaign Checker"`, die sich verschachteln lassen — ein Eintrag kann Listen enthalten, die wieder eigene Einträge haben. Gegenüber CSV kann JSON also echte Struktur abbilden, nicht nur flache Tabellen. Begegnen wird es dir an zwei Stellen: als Antwortformat, wenn ein Tool Daten von einer API holt, und als Einstellungsdatei (z. B. `settings.json`). Wenn du eine JSON-Datei bekommst und nur Klammern siehst: Gib sie Claude und lass sie dir als Tabelle oder in Alltagssprache erklären.',
    verweise: [
      { t: 'skill', id: 'daten-aufbereiten', name: 'Daten aufbereiten' },
      { t: 'prompt', id: 'csv-erklaeren', name: 'CSV-Datei erklären lassen' }
    ]
  },
  {
    id: 'kontextfenster',
    wort: 'Kontextfenster',
    buchstabe: 'K',
    thema: 'ki',
    votes: 34,
    satz: 'Das Kontextfenster ist das Kurzzeitgedächtnis der KI — alles, was sie in einem Gespräch gleichzeitig im Blick behalten kann.',
    analogie: 'Wie ein Schreibtisch: Was darauf liegt, hat die KI im Blick — was nicht mehr draufpasst, rutscht hinten herunter. Ein aufgeräumter Schreibtisch pro Aufgabe schlägt einen überquellenden für alles.',
    beispiel: 'Du fütterst Claude Code mit einem 80-Seiten-Briefing, drei PDFs und zwei Stunden Gespräch — irgendwann ist das Fenster voll, und Details vom Anfang gehen verloren.',
    tiefe: 'Die Größe wird in Token gemessen, und alles zählt hinein: deine Nachrichten, Claudes Antworten, gelesene Dateien, Suchergebnisse. Ist das Fenster voll, gehen Details vom Gesprächsanfang verloren — Claude wirkt dann „vergesslich“ oder verwechselt frühere Entscheidungen. In Claude Code helfen zwei Befehle: /compact fasst das bisherige Gespräch zusammen und macht Platz, /clear startet komplett frisch (deine Dateien bleiben unberührt). Gute Gewohnheiten: pro Aufgabe eine Session, lange Dokumente gezielt referenzieren statt komplett hineinzukippen — und bei großen Projekten Zwischenstände in eine Notizdatei schreiben lassen, die die nächste Session einfach liest.',
    stolper: 'Ein volles Kontextfenster ist kein Fehler und nichts Kaputtes — die Sitzung wird nur ungenauer. Der übliche Reflex, dieselbe Anweisung noch einmal und ausführlicher zu wiederholen, füllt es allerdings weiter; /compact oder /clear lösen es in einem Schritt.',
    verweise: [
      { t: 'befehl', id: 'compact' },
      { t: 'prompt', id: 'uebergabe-doku', name: 'Übergabe-Doku vor dem Urlaub' }
    ]
  },
  {
    id: 'langdock',
    wort: 'Langdock',
    buchstabe: 'L',
    thema: 'ki',
    votes: 27,
    satz: 'Langdock ist die Chat-Plattform, über die bei pilot mit KI gearbeitet wird — in unserer Oberfläche trägt sie den Namen „pilot AI“.',
    analogie: 'Langdock ist der gemeinsame Besprechungsraum für die KI-Arbeit: dieselben Modelle, dieselben Regeln, dieselben abgelegten Unterlagen für alle — statt dass jede:r privat mit einem anderen Werkzeug telefoniert.',
    beispiel: 'Du öffnest „pilot AI“ im Browser, wählst oben links ein Modell und lässt dir das Kunden-Briefing zusammenfassen — dieselbe Oberfläche, mit der deine Kolleg:innen ebenfalls arbeiten.',
    tiefe: 'Beim Hersteller heißt das Produkt Langdock, bei uns steht „pilot AI“ darüber — gemeint ist dasselbe. Wenn du also in der Doku, in Schulungsunterlagen oder hier im Marketplace „Langdock“ liest, suchst du bei uns nach „pilot AI“. Die Plattform bündelt fünf Bereiche: Chat (das Gespräch mit einem Modell), Agenten (eigene Assistenten für wiederkehrende Aufgaben), Integrationen (Anbindung eurer Werkzeuge), Workflows (Automationen) und eine API. Der Vorteil gegenüber privaten KI-Zugängen ist die gemeinsame Grundlage: geteilte Prompts, geteilte Assistenten und ein Rahmen, in dem geregelt ist, was mit Eingaben passiert. Die Abgrenzung zu Claude Code in einem Satz: Langdock ist der Ort zum Denken, Schreiben und Recherchieren, Claude Code der Ort zum Bauen.',
    stolper: 'Zwei Namen, ein Werkzeug: „pilot AI“ ist keine Eigenentwicklung und kein zweites Produkt, sondern unsere Beschriftung für Langdock. Wer im Netz nach Anleitungen oder Tastenkürzeln sucht, findet sie ausschließlich unter „Langdock“.',
    verweise: [
      { t: 'begriff', id: 'agent' },
      { t: 'begriff', id: 'claude-code' }
    ]
  },
  {
    id: 'lizenz',
    wort: 'Lizenz',
    buchstabe: 'L',
    thema: 'handwerk',
    votes: 2,
    satz: 'Eine Lizenz ist der rechtliche Beipackzettel von Software: Sie legt fest, was du damit tun darfst — nutzen, verändern, weitergeben.',
    analogie: 'Eine Lizenz ist wie die Bildrechte-Angabe bei Stockfotos: Das Bild liegt frei im Netz — aber ob du es kommerziell nutzen, bearbeiten und ohne Namensnennung einsetzen darfst, steht im Kleingedruckten.',
    beispiel: 'Bevor du eine gefundene Icon-Bibliothek in dein pilot-Tool einbaust, wirf einen Blick auf die Lizenz — die Lucide-Icons im Marketplace etwa sind unter einer freien Lizenz erlaubt.',
    tiefe: 'Häufige Open-Source-Lizenzen wie MIT oder Apache 2.0 sind sehr großzügig: nutzen, ändern, weitergeben erlaubt — meist nur gegen Namensnennung. Auch die Bausteine der Vorlagen-Seite (Schriften unter der Open Font License, Icons unter MIT/ISC) sind so lizenziert; deshalb kannst du sie bedenkenlos in pilot-Tools einsetzen. Vorsicht dagegen bei „nur für private Nutzung“, „non-commercial“ — und bei ganz fehlender Lizenzangabe: Keine Lizenz heißt rechtlich „alle Rechte vorbehalten“, nicht „frei für alle“. Im Zweifel Claude fragen, was eine Lizenz konkret erlaubt, und bei Kundenprojekten zusätzlich intern absichern.',
    verweise: [
      { t: 'skill', id: 'superpowers', name: 'superpowers' }
    ]
  },
  {
    id: 'localstorage',
    wort: 'localStorage',
    buchstabe: 'L',
    thema: 'web',
    votes: 9,
    satz: 'localStorage ist ein kleiner Speicher direkt in deinem Browser, in dem eine Webseite Daten nur auf deinem Rechner ablegen kann.',
    analogie: 'localStorage ist die Schreibtischschublade der Webseite: Jede Seite hat in deinem Browser ihre eigene, kann Dinge hineinlegen und wiederfinden — aber die Schublade deiner Kollegin ist eine andere, und niemand sonst kommt heran.',
    beispiel: 'Wenn du im Skills-Bereich für einen Skill stimmst, speichert dein Browser das in localStorage — es verlässt nie deinen Rechner.',
    tiefe: 'Deshalb sieht jede:r im Marketplace nur die eigenen Stimmen und Favoriten — es gibt keinen Server dahinter, nichts verlässt deinen Rechner. Die Daten überleben das Schließen des Browsers und bleiben, bis du die Website-Daten löschst („Browserdaten löschen“ trifft auch localStorage — dann sind z. B. Favoriten weg). Für erste Tools ist localStorage ideal: Speichern ohne Backend, ohne Anmeldung, ohne Datenschutz-Kopfschmerz. Die Grenzen: Er gehört zu genau einem Browser auf genau einem Gerät (Handy und Laptop teilen nichts), fasst nur wenige Megabyte und ist kein Ort für Vertrauliches. Sag Claude einfach „merk dir die Eingaben lokal im Browser“ — es weiß dann, was gemeint ist.',
    stolper: 'Weil alles nur lokal liegt, ist es auch nur lokal wieder weg: Wer „Browserdaten löschen“ anklickt oder das Tool in einem privaten Fenster öffnet, findet seine Eingaben nicht wieder. Für alles, was nicht verloren gehen darf, gehört ein Export ins Tool.',
    verweise: [
      { t: 'skill', id: 'prototyp-bauen', name: 'Prototyp bauen' }
    ]
  },
  {
    id: 'markdown',
    wort: 'Markdown',
    buchstabe: 'M',
    thema: 'daten',
    votes: 20,
    satz: 'Markdown ist eine einfache Schreibweise, mit der du reinen Text formatierst — etwa `#` für Überschriften und `**fett**` für Fettdruck.',
    analogie: 'Markdown ist Kurzschrift für Formatierung: Statt im Menü auf „fett“ zu klicken, tippst du zwei Sternchen — und jedes Programm, das Markdown versteht, macht daraus echten Fettdruck.',
    beispiel: 'Claude antwortet oft in Markdown, und Dateien wie `README.md` oder `CLAUDE.md` in deinem Projekt sind Markdown — der Anhang `.md` verrät es.',
    tiefe: 'Der Charme: Markdown bleibt auch unformatiert gut lesbar und funktioniert überall — in GitHub, Notion, Langdock und Claude. Die wichtigsten Zeichen lernst du in fünf Minuten: `#` Überschrift, `-` Aufzählung, `**fett**`, Backticks für Code, `[Text](Adresse)` für Links. Für dich ist Markdown doppelt relevant: Claude antwortet oft darin — und die Steuer-Dateien der KI-Welt sind Markdown: `CLAUDE.md` mit deinen Projektregeln, `SKILL.md` als Herz jedes Skills, `README.md` als Projektbeschreibung. Wer Markdown lesen kann, kann also jeden Skill im Katalog verstehen — wirf im Skill-Fenster einen Blick in den Tab „Dateien & Download“.',
    verweise: [
      { t: 'prompt', id: 'uebergabe-doku', name: 'Übergabe-Doku vor dem Urlaub' },
      { t: 'skill', id: 'meeting-notes', name: 'Meeting Notes' }
    ]
  },
  {
    id: 'mcp',
    wort: 'MCP',
    buchstabe: 'M',
    thema: 'ki',
    votes: 16,
    satz: 'MCP ist ein offener Standard, über den KI-Werkzeuge wie Claude sicher mit anderen Programmen und Datenquellen verbunden werden können.',
    analogie: 'MCP ist der USB-Standard der KI-Welt: ein genormter Stecker zwischen KI und Werkzeugen — einmal genormt, passt jedes Gerät an jeden Rechner.',
    beispiel: 'Über einen MCP-Server könnte Claude Code direkt in eurem Projektmanagement-Tool Tickets lesen — statt dass du alles per Copy-and-paste hin- und herträgst.',
    tiefe: 'MCP steht für „Model Context Protocol“, einen offenen Standard, den Anthropic angestoßen hat. Ein „MCP-Server“ ist so ein Stecker für ein bestimmtes System — eine Datenbank, ein Kalender, ein Ticketsystem, ein Design-Tool. Einmal verbunden, kann Claude dort selbst nachschlagen oder arbeiten, statt dass du Inhalte per Copy-and-paste hin- und herträgst. Der Standard sorgt dafür, dass jedes Werkzeug nur einmal angebunden werden muss — nicht für jede KI neu. Für den Einstieg musst du MCP nicht einrichten; es reicht zu wissen, dass Claude Code so erweiterbar ist. Wenn euer Team später z. B. das Projektmanagement-Tool anbinden will, ist das ein Fall fürs KI-Enablement-Team.',
    verweise: [
      { t: 'skill', id: 'erste-automation', name: 'Erste Automation' }
    ]
  },
  {
    id: 'modell',
    wort: 'Modell',
    buchstabe: 'M',
    thema: 'ki',
    votes: 7,
    satz: 'Ein Modell ist das trainierte „Gehirn“ hinter einer KI — verschiedene Modelle unterscheiden sich in Fähigkeiten, Tempo und Kosten.',
    analogie: 'Modelle sind wie Besetzungen für eine Aufgabe: Die erfahrene Senior-Beraterin arbeitet gründlicher, aber teurer — der fixe Junior ist schneller und günstiger. Wen du besetzt, hängt an der Aufgabe.',
    beispiel: 'In Langdock wählst du oben aus, welches Modell antwortet — dieselbe Frage kann je nach Modell unterschiedlich gut, schnell und ausführlich beantwortet werden.',
    tiefe: 'Modelle entstehen durch Training auf riesigen Textmengen und haben einen Wissensstand mit Stichtag — Ereignisse danach kennen sie nicht von selbst; dafür müssen sie suchen oder Dokumente mitbekommen. Verschiedene Modelle unterscheiden sich in Gründlichkeit, Tempo und Kosten. Faustregel: großes Modell für komplexe Aufgaben wie Konzeption und kniffliges Debugging, kleines für schnelle Routine. Claude Code nutzt die Claude-Modelle von Anthropic und wählt eine sinnvolle Vorbelegung; mit /model kannst du wechseln. In Langdock wählst du das Modell oben im Chat — dort stehen auch Modelle anderer Anbieter wie GPT (OpenAI) oder Gemini (Google) zur Auswahl, und dieselbe Frage kann je nach Modell spürbar anders beantwortet werden.',
    stolper: 'Neuer oder größer heißt nicht automatisch besser für deine Aufgabe: Bei Routinearbeit ist das große Modell nur langsamer, ohne mehr zu liefern. Und ein Modellwechsel mitten in der Arbeit repariert keinen unklaren Auftrag.',
    verweise: [
      { t: 'befehl', id: 'model' }
    ]
  },
  {
    id: 'mvp-prototyp',
    wort: 'MVP (kleinste nutzbare Version)',
    buchstabe: 'M',
    thema: 'handwerk',
    votes: 11,
    satz: 'Ein MVP ist die kleinste Version deines Tools, die schon jemandem echten Nutzen bringt — bewusst unfertig, aber benutzbar.',
    analogie: 'Wie der Testaufbau eines Messestands: keine Beleuchtung, kein Teppich, aber man kann davorstehen und sehen, ob die Idee trägt. Was fehlt, entscheidet man danach — mit Blick auf etwas Echtes.',
    beispiel: 'Dein Timing-Tool soll später Kalender anbinden, erinnern und exportieren. Das MVP kann genau eines: die Excel-Datei einlesen und die Deadlines nach Datum sortieren. Spart schon das Zeit, lohnt der Rest.',
    tiefe: 'MVP steht für „Minimum Viable Product“, also die kleinste tragfähige Fassung. Der Punkt ist nicht Sparsamkeit, sondern Lernen: Erst wenn jemand ein Tool wirklich benutzt, zeigt sich, ob die Idee funktioniert — und meistens will man danach etwas anderes bauen als ursprünglich geplant. Für den Zuschnitt hilft eine Frage: Welche EINE Sache muss es können, damit sich das Öffnen lohnt? Alles Weitere ist Runde zwei. Prototyp und MVP werden oft gleichbedeutend benutzt; genau genommen ist ein Prototyp zum Zeigen gedacht und ein MVP zum Benutzen — beim Vibecoding fällt beides meist zusammen, weil der Prototyp ohnehin schon läuft.',
    stolper: 'Ein MVP, das nur du selbst benutzt, hat seinen Zweck noch nicht erfüllt. Der Erkenntnisgewinn kommt, wenn eine Kollegin es ohne deine Erklärung öffnet — dabei fallen in zehn Minuten mehr Lücken auf als in zwei Wochen Nachdenken.',
    verweise: [
      { t: 'begriff', id: 'iteration' },
      { t: 'skill', id: 'prototyp-bauen', name: 'Prototyp bauen' }
    ]
  },
  {
    id: 'open-source',
    wort: 'Open Source',
    buchstabe: 'O',
    thema: 'handwerk',
    votes: 3,
    satz: 'Open Source bedeutet, dass der Quellcode einer Software öffentlich einsehbar ist und je nach Lizenz frei genutzt und verändert werden darf.',
    analogie: 'Open Source ist ein öffentliches Rezeptbuch: Jede:r darf nachkochen, abwandeln und die eigene Variante wieder hineinschreiben — deshalb muss niemand mehr das Grundrezept neu erfinden.',
    beispiel: 'Viele Skills im Marketplace stammen aus offenen Community-Sammlungen — du kannst nachlesen, was sie tun, sie anpassen und deine Version wieder teilen.',
    tiefe: 'Open Source ist der Grund, warum du beim Citizen Coding selten bei null anfängst: Bibliotheken, Icons, Schriften und ganze Skill-Sammlungen liegen frei verfügbar bereit — die Community-Skills im Katalog stammen aus offenen GitHub-Sammlungen, und auch Git selbst ist Open Source. Das Gegenteil heißt „proprietär“: Quellcode unter Verschluss, Nutzung nur per Kauf oder Abo. „Öffentlich einsehbar“ heißt aber nicht automatisch „alles erlaubt“ — was genau erlaubt ist (kommerzielle Nutzung, Veränderung, Weitergabe), regelt die jeweilige Lizenz. Und Offenheit ist keine Einbahnstraße: Wenn du einen Community-Skill verbesserst, kannst du deine Version wieder mit allen teilen.',
    stolper: 'Kostenlos und frei verwendbar sind zwei verschiedene Dinge. Fehlt bei einem Fundstück im Netz die Lizenzangabe ganz, heißt das rechtlich „alle Rechte vorbehalten“ — nicht „frei für alle“. In Kundenprojekten ist das der teuerste Irrtum.',
    verweise: [
      { t: 'skill', id: 'superpowers', name: 'superpowers' },
      { t: 'begriff', id: 'lizenz' }
    ]
  },
  {
    id: 'platzhalter',
    wort: 'Platzhalter',
    buchstabe: 'P',
    thema: 'daten',
    votes: 5,
    satz: 'Ein Platzhalter ist eine markierte Lücke in einer Textvorlage, die du vor dem Abschicken mit deinen echten Angaben füllst.',
    analogie: 'Wie ein Serienbrief: „Sehr geehrte/r [NAME]“ — die Vorlage bleibt gleich, nur die Lücken werden pro Empfänger:in gefüllt.',
    beispiel: 'Unter „Prompts“ stehen Platzhalter in eckigen Klammern wie [KUNDE] oder [ZIELGRUPPE] — beim Kopieren bleiben sie stehen, damit du sie bewusst ersetzt.',
    tiefe: 'Platzhalter machen Prompts wiederverwendbar: einmal gut formuliert, hundertmal befüllt. Unter „Prompts“ stehen sie in eckigen Klammern wie [KUNDE] oder [ZIELGRUPPE]; beim Kopieren bleiben sie absichtlich stehen, damit du sie bewusst ersetzt — bei den Highlight-Prompts füllt der Prompt-Builder die Lücken live aus deinen Eingaben. Kontrolliere vor dem Absenden, dass keine eckige Klammer übrig ist: Ein vergessener Platzhalter ist die häufigste Ursache für seltsam generische Antworten — die KI beantwortet dann wörtlich die Frage nach „[ZIELGRUPPE]“ statt nach deiner echten. Dieselbe Idee gibt es übrigens im Code: Dort heißen die benannten Lücken Variablen.',
    verweise: [
      { t: 'prompt', id: 'briefing-zusammenfassung', name: 'Briefing-Zusammenfassung' },
      { t: 'prompt', id: 'betreffzeilen-batterie', name: 'Betreffzeilen-Batterie' }
    ]
  },
  {
    id: 'plugin',
    wort: 'Plugin',
    buchstabe: 'P',
    thema: 'ki',
    votes: 8,
    satz: 'Ein Plugin ist ein Erweiterungspaket, das einem Programm neue Funktionen hinzufügt, ohne dass das Programm selbst umgebaut wird.',
    analogie: 'Ein Plugin ist wie eine App auf dem Smartphone: Das Telefon funktioniert auch ohne — aber mit der App kann es auf einen Schlag mehr, ohne dass jemand das Telefon umbaut.',
    beispiel: 'Die Superpowers-Sammlung installierst du als Plugin in Claude Code — danach stehen dir auf einen Schlag mehrere neue Skills wie Brainstorming und systematisches Debugging zur Verfügung.',
    tiefe: 'In Claude Code bringen Plugins ganze Bündel mit: mehrere Skills, eigene /-Befehle, teils Verbindungen zu anderen Werkzeugen. Der Unterschied zum einzelnen Skill: Ein Skill ist eine Fähigkeit, ein Plugin das Paket, in dem eine oder mehrere davon geliefert werden — wie App (Paket) und ihre Funktionen (Fähigkeiten). Installiert wird per Befehl (/plugins bzw. `/plugin install paketname`), danach einmal neu laden, fertig — die Katalog-Einträge mit Plugin-Kennzeichen zeigen dir die Schritte im Detailfenster. Deinstallieren geht genauso einfach; du kannst also gefahrlos ausprobieren.',
    verweise: [
      { t: 'skill', id: 'superpowers', name: 'superpowers' }
    ]
  },
  {
    id: 'programmiersprache',
    wort: 'Programmiersprache',
    buchstabe: 'P',
    thema: 'handwerk',
    votes: 8,
    satz: 'Eine Programmiersprache ist eine formale Sprache mit festen Vokabeln und strenger Grammatik, in der Menschen dem Computer Anweisungen schreiben.',
    analogie: 'Programmiersprachen sind Fremdsprachen mit einem sehr pedantischen Zuhörer: Ein fehlendes Komma, und der Computer versteht gar nichts mehr — dafür gibt es keine Missverständnisse, wenn alles stimmt.',
    beispiel: 'Für Webseiten-Tools reicht das Trio HTML, CSS und JavaScript — in genau diesen dreien baut Claude Code die meisten pilot-Prototypen; Python siehst du eher bei Daten-Auswertungen.',
    tiefe: 'Es gibt Hunderte Programmiersprachen, aber das Prinzip ist immer gleich: eindeutige Anweisungen, die ein Computer ausführen kann. Für deinen Einstieg zählen wenige Namen: JavaScript (läuft in jedem Browser — deshalb die Sprache der meisten Citizen-Coding-Tools) und Python (beliebt für Datenanalysen und Automatisierung). Streng genommen sind HTML und CSS keine Programmiersprachen — sie beschreiben Struktur und Aussehen, rechnen kann von den dreien nur JavaScript. Welche Sprache dein Tool nutzt, entscheidet in der Praxis Claude anhand der Aufgabe. Lernen musst du keine — aber es hilft, die Namen zuordnen zu können, wenn sie im Gespräch fallen.',
    verweise: [
      { t: 'begriff', id: 'javascript' },
      { t: 'begriff', id: 'code' }
    ]
  },
  {
    id: 'prompt',
    wort: 'Prompt',
    buchstabe: 'P',
    thema: 'ki',
    votes: 38,
    satz: 'Ein Prompt ist die Anweisung, die du der KI gibst — je klarer Aufgabe, Kontext und gewünschtes Ergebnis, desto besser die Antwort.',
    analogie: 'Ein Prompt ist ein Briefing im Agentur-Sinn: Dieselbe Aufgabe kann als Zweizeiler in der Kaffeeküche kommen oder als sauberes Briefing mit Ziel, Zielgruppe, Ton und Format — der Unterschied im Ergebnis ist bei der KI derselbe wie bei der Kreation.',
    beispiel: 'Statt „Fass das zusammen“ lieber: „Fasse dieses Kunden-Briefing in 5 Stichpunkten für die Kreation zusammen, Ton sachlich, max. 100 Wörter“ — gleicher Aufwand, deutlich besseres Ergebnis.',
    tiefe: 'Ein guter Prompt beantwortet vier Fragen: Was soll entstehen? Für wen? In welchem Format? Was ist der Kontext? Dazu zwei Profi-Handgriffe: Beispiele mitgeben („so soll es klingen: …“) und eine Rolle setzen („du bist eine erfahrene Mediaplanerin“) — beides hebt die Qualität spürbar. Höflichkeitsprosa brauchst du dagegen keine; klar schlägt förmlich. Und wenn ein Ergebnis danebenliegt: nicht von vorn anfangen, sondern nachsteuern („kürzer, sachlicher, ohne Fachjargon“) — die KI behält den Zusammenhang. Unter „Prompts“ findest du im Marketplace erprobte Vorlagen mit Platzhaltern; Kopieren ist ausdrücklich erwünscht.',
    verweise: [
      { t: 'prompt', id: 'vibecoding-kickoff', name: 'Vibecoding-Kickoff' },
      { t: 'prompt', id: 'meeting-todos', name: 'Meeting-Protokoll → To-do-Liste' }
    ]
  },
  {
    id: 'push',
    wort: 'Push',
    buchstabe: 'P',
    thema: 'handwerk',
    votes: 23,
    satz: 'Ein Push lädt deine lokal gespeicherten Commits auf einen zentralen Server wie GitHub hoch.',
    analogie: 'Commit und Push sind Speichern und Abgeben: Gespeichert (committet) wird lokal bei dir, so oft du willst — erst die Abgabe (der Push) legt den Stand sichtbar für alle auf den Server.',
    beispiel: 'Erst nach dem Push sehen deine Kolleg:innen den neuen Stand deines Tools — und wenn GitHub Pages aktiv ist, aktualisiert sich damit auch gleich die Live-Seite.',
    tiefe: 'Die Merkreihenfolge: ändern → committen (lokal sichern) → pushen (zu GitHub hochladen). Erst nach dem Push sehen andere deinen Stand — und wenn GitHub Pages aktiv ist, aktualisiert sich damit auch die Live-Seite; der Push ist dann gleichzeitig der Veröffentlichungs-Knopf. Das Gegenstück ist der Pull, der fremde Änderungen zu dir holt — wichtig, sobald zwei Leute am selben Repo arbeiten. Sag Claude Code einfach „committe und pushe das“ — es erledigt beide Schritte und zeigt dir vorher, was hochgeht. Ein prüfender Blick lohnt sich: Was in ein öffentliches Repo gepusht ist, steht öffentlich im Netz.',
    verweise: [
      { t: 'skill', id: 'tool-teilen', name: 'Tool teilen' }
    ]
  },
  {
    id: 'refactoring',
    wort: 'Refactoring',
    buchstabe: 'R',
    thema: 'handwerk',
    votes: 3,
    satz: 'Refactoring bedeutet, Code aufzuräumen und besser zu strukturieren, ohne sein Verhalten nach außen zu verändern.',
    analogie: 'Refactoring ist Aufräumen in der Werkstatt: Es wird nichts Neues gebaut — aber danach hat jedes Werkzeug seinen Platz, und der nächste Handgriff dauert Sekunden statt Minuten.',
    beispiel: 'Dein über Wochen gewachsenes Kampagnen-Tool funktioniert, aber jeder Umbau wird zäh — „bitte refactore das übersichtlicher“ lässt Claude aufräumen, und danach gehen Änderungen wieder leicht.',
    tiefe: 'Die goldene Regel: Nach dem Refactoring muss alles exakt so funktionieren wie vorher — nur der Code darunter ist ordentlicher. Typische Aufräumarbeiten: doppelte Stellen zusammenführen, kryptische Namen verständlich machen, Riesen-Blöcke in Häppchen zerlegen. Warum das nötig wird: Schnell gewachsener Code — gerade beim Vibecoding — sammelt Unordnung an wie ein Schreibtisch in heißen Projektwochen; irgendwann erzeugt jede kleine Änderung drei neue Probleme. Das ist der Moment für „bitte refactore das übersichtlicher“. Vorher den Stand committen, dann ist es risikofrei; danach kurz durchklicken, ob alles noch tut. Und bewusst nicht mischen: erst aufräumen, dann neue Funktionen — beides gleichzeitig macht die Fehlersuche schwer.',
    verweise: [
      { t: 'prompt', id: 'code-verstehen', name: 'Was tut diese Datei?' }
    ]
  },
  {
    id: 'repo',
    wort: 'Repo (Repository)',
    buchstabe: 'R',
    thema: 'handwerk',
    votes: 28,
    satz: 'Ein Repo ist der Projektordner deines Tools samt seiner kompletten Änderungsgeschichte.',
    analogie: 'Ein Repo ist der Leitz-Ordner des Projekts: alle Unterlagen an einem Ort, inklusive aller früheren Fassungen — und auf GitHub steht dieser Ordner in einem Regal, zu dem du anderen Zugang geben kannst.',
    beispiel: 'Dein Reporting-Tool lebt in einem Repo auf GitHub — dort liegen alle Dateien, jede frühere Version und die Live-Seite via GitHub Pages an einem Ort.',
    tiefe: 'Repository heißt wörtlich „Lager“. Lokal ist das Repo ein normaler Ordner, in dem Git unsichtbar Buch führt (in einem versteckten Unterordner namens `.git`); auf GitHub liegt die Kopie, über die du teilst und veröffentlichst. Repos können öffentlich sein (jede:r kann lesen — Standard bei Open Source und Voraussetzung für kostenlose GitHub-Pages-Seiten) oder privat (nur Eingeladene). Faustregel: ein Tool, ein Repo — das hält Historie, Veröffentlichung und Zuständigkeiten sauber. „Leg dafür ein neues Repo an“ genügt als Anweisung an Claude Code; es erstellt den Ordner, richtet Git ein und verbindet auf Wunsch GitHub.',
    verweise: [
      { t: 'skill', id: 'tool-teilen', name: 'Tool teilen' }
    ]
  },
  {
    id: 'responsive',
    wort: 'Responsive',
    buchstabe: 'R',
    thema: 'web',
    votes: 9,
    satz: 'Responsive heißt: Eine Webseite passt ihr Layout automatisch an die Bildschirmgröße an — vom großen Monitor bis zum Handy.',
    analogie: 'Wie Wasser, das die Form seines Gefäßes annimmt: gleicher Inhalt — aber am Desktop drei Spalten nebeneinander, auf dem Handy ordentlich untereinander.',
    beispiel: 'Zieh das Browserfenster des Marketplace schmal: Die Karten ordnen sich von drei Spalten auf eine um, die Navigation rückt zusammen — das ist responsives Verhalten.',
    tiefe: 'Technisch steckt CSS dahinter: Regeln wie „unter 640 Pixel Breite: eine Spalte statt drei“ (sogenannte Media Queries). Wichtig ist Responsive vor allem, weil Kolleg:innen dein Tool oft zuerst am Handy öffnen — ein Link im Team-Chat wird unterwegs angetippt. Deshalb gehört in jeden Bau-Auftrag der Halbsatz „und mobil soll es gut aussehen“; Claude legt das Layout dann von vornherein anpassungsfähig an. Testen geht ohne Handy: Browserfenster schmal ziehen oder in den Entwicklertools (F12) die Handy-Ansicht wählen. Und wenn etwas nur mobil kaputt aussieht, sag Claude genau das — „am Handy überlappen die Karten“ ist eine präzise, reparierbare Fehlerbeschreibung.',
    stolper: 'Ein schmal gezogenes Browserfenster ist nicht dasselbe wie ein Handy: fingerbreite Bedienelemente, die Tastatur, die das halbe Bild verdeckt, und langsamere Verbindungen fallen dabei nicht auf. Wird ein Tool wirklich unterwegs benutzt, einmal am echten Gerät öffnen.',
    verweise: [
      { t: 'begriff', id: 'css' },
      { t: 'skill', id: 'webseite-bauen', name: 'Webseite bauen' }
    ]
  },
  {
    id: 'server',
    wort: 'Server',
    buchstabe: 'S',
    thema: 'web',
    votes: 5,
    satz: 'Ein Server ist ein Rechner, der dauerhaft läuft und anderen Rechnern auf Anfrage Daten oder Webseiten liefert.',
    analogie: 'Ein Server ist ein Kellner im Wortsinn: ein Rechner, der bedient — du bestellst eine Adresse, er bringt die Seite. Und wie im Restaurant gilt: Ist der Kellner überlastet oder in der Pause, wartet der ganze Tisch.',
    beispiel: 'Wenn du den Marketplace aufrufst, liefert ein Server von GitHub die Dateien aus — danach arbeitet die Seite komplett in deinem Browser weiter.',
    tiefe: '„Der Server ist down“ heißt schlicht: Der liefernde Rechner antwortet gerade nicht. Server sind normale Computer — nur ohne Bildschirm, dafür in Rechenzentren, dauerhaft eingeschaltet und übers Internet erreichbar; „Cloud“ ist letztlich ein anderes Wort für „auf fremden Servern“. Für Citizen-Coding-Tools brauchst du meist keinen eigenen: Statische Seiten liefert GitHub Pages aus, um deren Server kümmert sich GitHub — kostenlos. Ein eigener Server (und damit ein Backend) wird erst nötig, wenn zentrale Daten oder Logins ins Spiel kommen — und dann ist das ein Fall für ein Gespräch mit Technology & Data, nicht für einen Alleingang.',
    verweise: [
      { t: 'skill', id: 'webseite-bauen', name: 'Webseite bauen' }
    ]
  },
  {
    id: 'session',
    wort: 'Session (Sitzung)',
    buchstabe: 'S',
    thema: 'ki',
    votes: 21,
    satz: 'Eine Session ist ein zusammenhängendes Gespräch mit der KI — mit allem, was darin bereits gesagt und getan wurde.',
    analogie: 'Eine Session ist ein Beratungstermin: Innerhalb des Termins muss niemand wiederholen, was schon gesagt wurde — der nächste Termin startet frisch, außer man bringt die Notizen des letzten mit.',
    beispiel: 'Vormittags Mediaplan-Tool, nachmittags Social-Kalender? Starte für die zweite Aufgabe eine neue Session, sonst schleppt Claude den ganzen Vormittag als Ballast mit.',
    tiefe: 'In Claude Code beendet /clear die aktuelle Session und beginnt frisch; mit /resume kehrst du zu früheren Sessions zurück — nichts geht verloren, jede Sitzung wird aufbewahrt. Faustregel: eine Aufgabe, eine Session. Das hält das Kontextfenster frei und die Antworten präzise — Altlasten aus einer anderen Aufgabe verwirren das Modell spürbar. Für Übergaben (an Kolleg:innen oder an dein Zukunfts-Ich nach dem Urlaub) gilt: Wichtiges nicht im Gesprächsverlauf vergraben, sondern in eine Datei schreiben lassen — Dateien überleben jede Session, Gespräche nur bis zum nächsten /clear.',
    verweise: [
      { t: 'befehl', id: 'clear' },
      { t: 'prompt', id: 'uebergabe-doku', name: 'Übergabe-Doku vor dem Urlaub' }
    ]
  },
  {
    id: 'skill',
    wort: 'Skill',
    buchstabe: 'S',
    thema: 'ki',
    votes: 36,
    satz: 'Ein Skill ist eine gespeicherte Fähigkeit für Claude — eine Anleitung, die es bei Bedarf lädt, um eine bestimmte Aufgabe besonders gut zu erledigen.',
    analogie: 'Ein Skill ist die laminierte Arbeitsanweisung im Ordner der KI: Für Standardaufgaben muss niemand mehr erklären, wie es geht — die KI zieht das passende Blatt und arbeitet danach.',
    beispiel: 'Mit dem pptx-Skill baut Claude Code echte PowerPoint-Dateien nach pilot-Vorlage — das Wissen, wie das geht, steckt im Skill, nicht in deinem Prompt.',
    tiefe: 'Technisch ist ein Skill ein Ordner mit einer Anleitung im Markdown-Format (`SKILL.md`), oft plus Referenzdateien wie Checklisten oder Beispiel-Ausgaben. Claude zieht ihn automatisch heran, wenn deine Aufgabe zur Beschreibung passt — oder du rufst ihn per /-Befehl direkt auf. Der Unterschied zum Prompt: Einen Prompt schreibst du jedes Mal neu, ein Skill ist dauerhaft installiert und bringt sein Wissen mit. Genau das macht Skills zum Teamwerkzeug: Einmal gut gebaut, arbeitet jede:r damit auf demselben Niveau — das Wissen steckt im Skill, nicht im Kopf einer einzelnen Person. Im Katalog findest du die geprüfte Sammlung samt Blick in die Dateien; mit skill-creator baust du eigene, und der Onepager „Was sind Skills?“ erklärt das Konzept in Ruhe.',
    verweise: [
      { t: 'skill', id: 'skill-creator', name: 'skill-creator' },
      { t: 'skill', id: 'erste-schritte', name: 'Erste Schritte' }
    ]
  },
  {
    id: 'slash-befehl',
    wort: 'Slash-Befehl',
    buchstabe: 'S',
    thema: 'handwerk',
    votes: 15,
    satz: 'Ein Slash-Befehl ist eine Kurzanweisung, die mit einem Schrägstrich beginnt — etwa `/clear` oder `/help` — und die Claude Code sofort ausführt, statt sie als Frage zu behandeln.',
    analogie: 'Wie die Funktionstasten neben dem Fließtext: Ausformulieren geht immer — aber für die zehn Dinge, die du täglich tust, gibt es einen Griff, der schneller ist.',
    beispiel: 'Statt „bitte fang ein neues Gespräch an und vergiss alles bisherige“ tippst du `/clear` — ein Zeichen, ein Wort, erledigt.',
    tiefe: 'Tippst du nur `/`, öffnet sich die Liste aller verfügbaren Befehle und filtert beim Weitertippen mit — auswendig lernen musst du also nichts. In der Liste stehen nicht nur die eingebauten Befehle, sondern auch die Skills und Plugin-Befehle, die bei dir installiert sind: Ein Skill mit eigenem Namen ist am Ende ebenfalls ein `/`-Befehl. Umgekehrt heißt das: Nicht jeder Befehl aus einer fremden Anleitung taucht bei dir auf, manche hängen an Plattform oder Plan. Die Handvoll, die im Alltag wirklich zählt, steht hier auf der Seite unter „Befehle & Kniffe“ — sortiert danach, wie oft sie geholfen hat.',
    stolper: 'Der Schrägstrich muss am Anfang der Zeile stehen. Mitten im Satz ist `/clear` einfach Text — Claude liest es dann als Wunsch und antwortet darauf, statt den Befehl auszuführen.',
    verweise: [
      { t: 'befehl', id: 'help' },
      { t: 'begriff', id: 'skill' }
    ]
  },
  {
    id: 'statische-seite',
    wort: 'Statische Seite',
    buchstabe: 'S',
    thema: 'web',
    votes: 8,
    satz: 'Eine statische Seite besteht nur aus fertigen Dateien, die der Server unverändert ausliefert — dort rechnet nichts, alles Weitere passiert in deinem Browser.',
    analogie: 'Wie ein gedruckter Prospekt gegenüber einem Beratungsgespräch: Der Prospekt ist für alle gleich und sofort da; wer eine individuelle Auskunft braucht, muss jemanden fragen, der nachschlägt.',
    beispiel: 'Der pilot AI Marketplace ist eine statische Seite: Alle Skills, Prompts und Vorlagen stecken in den ausgelieferten Dateien, das Filtern und Sortieren erledigt dein Browser — deshalb läuft die Seite weiter, auch wenn die Verbindung nach dem Laden abreißt.',
    tiefe: 'Das Gegenstück ist die dynamische Seite: Dort setzt ein Server jede Ansicht neu zusammen, meist aus einer Datenbank — nötig, sobald es Logins, gemeinsame Daten oder Inhalte gibt, die sich pro Person unterscheiden. Statisch heißt dabei nicht unbeweglich: Suche, Filter, Rechner und Animationen laufen als JavaScript im Browser und fühlen sich genauso lebendig an. Für Citizen-Coding-Tools ist das fast immer die richtige Wahl — kein Server, keine Betriebskosten, keine Wartung, und veröffentlicht wird über GitHub Pages, das ausschließlich statische Seiten ausliefert. Die Grenze ist erreicht, wenn mehrere Leute dieselben Daten gemeinsam ändern sollen.',
    stolper: 'Daten in einer statischen Seite sind für alle einsehbar, die die Seite laden — auch dann, wenn sie im Tool erst nach einem Klick erscheinen. Eine „nur für uns“-Ansicht gibt es dort nicht: Was ausgeliefert wird, ist lesbar.',
    verweise: [
      { t: 'begriff', id: 'github-pages' },
      { t: 'begriff', id: 'backend' }
    ]
  },
  {
    id: 'svg',
    wort: 'SVG',
    buchstabe: 'S',
    thema: 'web',
    votes: 9,
    satz: 'SVG ist ein Bildformat, das ein Bild nicht aus Bildpunkten aufbaut, sondern als Bauanleitung beschreibt — deshalb bleibt es in jeder Größe gestochen scharf.',
    analogie: 'Ein normales Foto ist ein Mosaik aus festen Steinchen: Vergrößerst du es, siehst du die Steinchen. Ein SVG ist stattdessen der Bauplan — „Kreis hier, Linie dort“. Den kann man auf Plakatgröße ziehen, ohne dass etwas ausfranst, weil das Bild jedes Mal neu gezeichnet wird.',
    beispiel: 'Die Icons in der Asset-Bibliothek sind SVGs: Du klickst eines an, der Code landet in der Zwischenablage, und du fügst ihn direkt in deine Seite ein — ganz ohne Bilddatei.',
    tiefe: 'SVG steht für „Scalable Vector Graphics“, also skalierbare Vektorgrafik. Eine SVG-Datei ist in Wahrheit Text: Darin steht, aus welchen Formen, Pfaden und Farben das Bild besteht. Das hat drei praktische Folgen. Erstens bleibt es bei jeder Größe scharf — vom 16-Pixel-Icon bis zum Messeplakat. Zweitens sind die Dateien meist winzig, was Seiten schnell macht. Drittens kannst du ein SVG direkt in den HTML-Code schreiben („inline“) und es dann per CSS umfärben — genau davon lebt die Icon-Sammlung hier: Ein Icon nimmt automatisch die Textfarbe an, statt dass du es in fünf Farben abspeicherst. Gut geeignet ist SVG für Logos, Icons, Diagramme und Muster; für Fotos bleibt es bei JPG oder PNG, denn eine Bauanleitung für ein Foto wäre riesig.',
    stolper: 'Weil ein SVG echter Code ist, sollte man nur Dateien aus vertrauenswürdigen Quellen ungeprüft einbinden — eine SVG kann theoretisch Skripte enthalten. Bei den Bibliotheken hier (Lucide und Simple Icons) ist das kein Thema; bei einem SVG aus einer beliebigen Google-Suche schaust du besser einmal in die Datei oder lässt Claude draufsehen.',
    verweise: [
      { t: 'begriff', id: 'html' },
      { t: 'begriff', id: 'css' }
    ]
  },
  {
    id: 'systemprompt',
    wort: 'Systemprompt',
    buchstabe: 'S',
    thema: 'ki',
    votes: 7,
    satz: 'Der Systemprompt ist die unsichtbare Grundanweisung, die der KI vor deiner ersten Nachricht mitgegeben wird und ihr Verhalten im ganzen Gespräch prägt.',
    analogie: 'Der Systemprompt ist die Stellenbeschreibung der KI: Rolle, Regeln und Tonfall stehen fest, bevor das erste Gespräch beginnt — und gelten in jedem Gespräch, ohne dass jemand sie wiederholt.',
    beispiel: 'Wenn ein Langdock-Assistent immer höflich auf Deutsch und im pilot-Ton antwortet, steht das nicht in deiner Frage — es steht in seinem Systemprompt.',
    tiefe: 'Der Systemprompt wird der KI unsichtbar vor deiner ersten Nachricht mitgegeben und prägt das ganze Gespräch: welche Rolle sie einnimmt, welche Regeln gelten, wie sie klingt. Deshalb antworten zwei Assistenten mit demselben Modell völlig unterschiedlich — der Unterschied steckt im Systemprompt. In Langdock legst du ihn beim Bauen eines Assistenten selbst fest; er ist dort der wirksamste Hebel für konsistentes Verhalten. In Claude Code übernimmt die Datei `CLAUDE.md` in deinem Projekt eine ähnliche Aufgabe: Dort hinterlegst du dauerhafte Regeln wie „antworte auf Deutsch“ oder „frag nach, bevor du Dateien löschst“ — der Befehl /init legt sie dir an. Verhält sich eine KI „seltsam“, lohnt der erste Blick genau dorthin.',
    verweise: [
      { t: 'befehl', id: 'init' },
      { t: 'skill', id: 'skill-creator', name: 'skill-creator' }
    ]
  },
  {
    id: 'terminal',
    wort: 'Terminal',
    buchstabe: 'T',
    thema: 'handwerk',
    votes: 29,
    satz: 'Das Terminal ist das Textfenster deines Rechners, in dem du Programme durch getippte Befehle startest und bedienst.',
    analogie: 'Terminal und Explorer zeigen denselben Rechner — wie Telefon und E-Mail dieselbe Firma erreichen: Der Explorer ist die Klick-Ansicht deiner Ordner, das Terminal die Tipp-Ansicht. Gleicher Inhalt, anderer Kanal.',
    beispiel: 'Claude Code lebt im Terminal: Du öffnest es, tippst `claude`, und ab da unterhältst du dich — auf Deutsch, nicht in Geheimcode.',
    tiefe: 'Auf dem Mac heißt es Terminal, auf Windows meist PowerShell oder ebenfalls Terminal. Die schwarze Optik ist reine Gewohnheitssache — es ist nur ein anderes Fenster auf dieselben Dateien, die du auch im Explorer/Finder siehst. Kaputtmachen kannst du durch Öffnen und Tippen nichts: Befehle laufen erst, wenn du Enter drückst, und Claude Code fragt bei riskanten Aktionen ohnehin nach. Die zwei wichtigsten Handgriffe für den Anfang: mit `cd Ordnername` in deinen Projektordner wechseln und mit `claude` loslegen — ab da redest du auf Deutsch weiter. Nach ein paar Tagen ist der Respekt weg; das Terminal ist schlicht der Ort, an dem Claude Code wohnt.',
    verweise: [
      { t: 'skill', id: 'erste-schritte', name: 'Erste Schritte' }
    ]
  },
  {
    id: 'token',
    wort: 'Token',
    buchstabe: 'T',
    thema: 'ki',
    votes: 31,
    satz: 'Ein Token ist ein kleines Textstück — etwa eine Silbe oder ein kurzes Wort —, in das die KI jeden Text zerlegt, bevor sie ihn verarbeitet.',
    analogie: 'Token sind die Legosteine des Textes: Die KI liest nicht Wörter, sondern Silben-Bausteine — „Mediaplanung“ besteht aus mehreren Steinen, „und“ ist ein einziger.',
    beispiel: 'Dein 50-Seiten-Mediaplan-Export sind für Claude zigtausend Token — deshalb ist bei sehr langen Dokumenten irgendwann das Kurzzeitgedächtnis voll.',
    tiefe: 'Als Faustregel entsprechen 1.000 Token grob 700 deutschen Wörtern — etwa anderthalb A4-Seiten. Token sind die Währung der KI-Welt: Die Größe des Kontextfensters wird in Token gemessen, die Preise der Anbieter ebenso („pro Million Token“), und auch Grenzen wie „Dokument zu lang“ sind Token-Grenzen. Deutsch kostet übrigens etwas mehr Token als Englisch, weil die Modelle englische Wörter kompakter zerlegen. Selbst zählen musst du nie — aber der Begriff erklärt zwei Alltagsphänomene: warum „einfach alles reinkopieren“ irgendwann kippt, und warum kompakte, aufgeräumte Eingaben schneller und günstiger sind.',
    stolper: 'Token sind keine Wörter. Ein deutsches Kompositum wie „Kampagnenauswertung“ kann mehrere Token kosten, ein englisches „and“ genau eines — Wörter zählen bringt deshalb wenig, die Textmenge grob abschätzen schon.',
    verweise: [
      { t: 'begriff', id: 'kontextfenster' },
      { t: 'prompt', id: 'fachbegriff-erklaerer', name: 'Fachbegriff-Erklärer' }
    ]
  },
  {
    id: 'url',
    wort: 'URL',
    buchstabe: 'U',
    thema: 'web',
    votes: 9,
    satz: 'Eine URL ist die vollständige Adresse einer Seite oder Datei im Internet — das, was oben in der Adresszeile deines Browsers steht.',
    analogie: 'Wie eine Postanschrift, nur von grob nach fein gelesen: Die Domain (etwa pilot.de) ist das Gebäude, der Pfad dahinter sind Etage und Zimmer — und Anhängsel mit ? sind Zusatzwünsche an den Empfänger.',
    beispiel: 'Öffne im Skills-Bereich einen Skill und schau in die Adresszeile: Die URL enthält seinen Namen — kopierst du sie in den Team-Chat, landet deine Kollegin exakt bei diesem Skill statt auf der Startseite.',
    tiefe: 'URL steht für „Uniform Resource Locator“. Die Bestandteile von links nach rechts: das Protokoll (`https://` — das s heißt verschlüsselt), die Domain (der gemietete Name, z. B. `github.io`), dahinter der Pfad zur konkreten Seite oder Datei — im Grunde ein Dateipfad im Netz. Nach einem `?` folgen manchmal Parameter (Schlüssel-Wert-Paare wie `?skill=pptx`), mit denen eine Seite gezielt in einen bestimmten Zustand springt; solche „Deep-Links“ nutzt auch der Marketplace für alles Teilbare. Für deine eigenen Tools gut zu wissen: Sobald etwas über GitHub Pages veröffentlicht ist, hat es eine URL — und alles, was eine URL hat, lässt sich verlinken, teilen und als Lesezeichen speichern.',
    verweise: [
      { t: 'begriff', id: 'github-pages' },
      { t: 'begriff', id: 'dateipfad' }
    ]
  },
  {
    id: 'vibecoding',
    wort: 'Vibecoding',
    buchstabe: 'V',
    thema: 'ki',
    votes: 19,
    satz: 'Vibecoding heißt, Software zu bauen, indem du der KI in normaler Sprache beschreibst, was du willst — statt selbst Code zu schreiben.',
    analogie: 'Vibecoding verhält sich zum Programmieren wie Bauherrin zum Maurer: Du musst keine Wand hochziehen können — aber du musst wissen, wie viele Zimmer du willst, und den Rohbau abnehmen.',
    beispiel: '„Ich brauche ein Tool, das unsere Excel-Timings in eine Team-Übersicht verwandelt“ — zwei Stunden später klickst du durch deinen ersten funktionierenden Prototyp.',
    tiefe: 'Der Begriff stammt vom KI-Forscher Andrej Karpathy (Anfang 2025) und wurde binnen Monaten zum Namen einer echten Arbeitsweise. Wichtig für die Praxis: Beschreiben ersetzt das Tippen von Code, aber nicht das Denken — je klarer du weißt, was das Tool können soll, für wen es ist und was „fertig“ heißt, desto besser wird es. Der Vibecoding-Kickoff-Prompt hilft, genau das vorab zu sortieren. Zweite Lektion aus der Praxis: klein anfangen (erst die Kernfunktion, dann Extras), Zwischenstände anschauen, regelmäßig committen. Was dabei herauskommt, zeigt der Showroom — echte Feierabend-Tools von Kolleg:innen, keine Informatik-Projekte.',
    verweise: [
      { t: 'skill', id: 'prototyp-bauen', name: 'Prototyp bauen' },
      { t: 'prompt', id: 'vibecoding-kickoff', name: 'Vibecoding-Kickoff' }
    ]
  },
  {
    id: 'werkzeug-tool',
    wort: 'Werkzeug (Tool)',
    buchstabe: 'W',
    thema: 'ki',
    votes: 12,
    satz: 'Ein Werkzeug ist eine Fähigkeit, die die KI selbst benutzen kann — Dateien lesen, Befehle ausführen, im Netz suchen — statt nur Text zu erzeugen.',
    analogie: 'Der Unterschied zwischen jemandem, der dir erklärt, wo der Ordner steht, und jemandem, der aufsteht und ihn holt. Werkzeuge sind die Hände zum Kopf.',
    beispiel: 'Wenn in Claude Code die Zeile „Read(mediaplan.csv) — 48 Zeilen gelesen“ vorbeiläuft, hat es gerade ein Werkzeug benutzt: Die Datei wurde wirklich geöffnet, nicht erraten.',
    tiefe: 'Genau das trennt einen Agenten vom Chat: Der Chat kann antworten, ein Agent kann handeln — und entscheidet selbst, welches Werkzeug ein Schritt braucht. Dass die Werkzeugaufrufe sichtbar mitlaufen, ist Absicht: An diesen Zeilen erkennst du, worauf eine Antwort beruht. Bei Aktionen mit Folgen — Dateien ändern oder löschen, Befehle ausführen — fragt Claude Code vorher nach; das ist die Berechtigungs-Ebene. Erweitern lässt sich der Werkzeugkasten über MCP: Damit kommen Verbindungen zu weiteren Systemen dazu, etwa einem Ticket- oder Design-Tool.',
    stolper: 'Werkzeug heißt nicht Allmacht: Claude Code kann nur, wofür es ein Werkzeug hat — und nur in dem Ordner, in dem du es gestartet hast. „Schau mal in mein Postfach“ geht ohne passende Anbindung schlicht nicht; kommt trotzdem eine Antwort, ist sie geraten.',
    verweise: [
      { t: 'begriff', id: 'agent' },
      { t: 'begriff', id: 'mcp' }
    ]
  },
  {
    id: 'wissen-anbinden',
    wort: 'Wissen anbinden',
    buchstabe: 'W',
    thema: 'ki',
    votes: 4,
    satz: 'Wissen anbinden heißt, der KI eigene Dokumente oder Datenquellen zur Verfügung zu stellen, damit sie mit euren Inhalten antwortet statt nur mit ihrem Trainingswissen.',
    analogie: 'Der Unterschied zwischen einem Berater am ersten Tag und einem mit Zugang zum Firmen-Laufwerk: gleich schlau — aber nur einer kann in euren echten Unterlagen nachschlagen, statt aus dem Allgemeinwissen zu antworten.',
    beispiel: 'Ein Langdock-Assistent mit den pilot-Styleguides im Gepäck beantwortet Tonalitätsfragen aus euren echten Regeln — nicht aus dem Ungefähren.',
    tiefe: 'Fachleute nennen das Prinzip RAG („Retrieval-Augmented Generation“): Vor der Antwort werden die passenden Stellen aus deinen Dokumenten herausgesucht und der KI ins Kontextfenster gelegt — sie zitiert dann aus euren echten Regeln statt aus dem Ungefähren. In Langdock passiert das über hochgeladene Dokumente oder angebundene Wissensquellen eines Assistenten; in Claude Code geht es noch direkter — es liest Dateien aus deinem Projektordner einfach selbst, du legst sie nur hinein. Der große Vorteil gegenüber einem Nachtraining des Modells: Dokument aktualisieren genügt. Eine Nebenwirkung sollte man kennen: Die Antwort ist nur so gut wie die angebundenen Dokumente — ein veralteter Styleguide erzeugt selbstbewusst veraltete Antworten.',
    verweise: [
      { t: 'skill', id: 'briefing-gen', name: 'Briefing Generator' }
    ]
  },
  {
    id: 'zeichensatz-umlaute',
    wort: 'Zeichensatz (Umlaut-Problem)',
    buchstabe: 'Z',
    thema: 'daten',
    votes: 9,
    satz: 'Der Zeichensatz legt fest, wie Buchstaben als Zahlen gespeichert werden — passt er beim Öffnen nicht zu dem beim Speichern, werden aus Umlauten Zeichensalat.',
    analogie: 'Wie zwei Menschen mit unterschiedlichen Alphabet-Tabellen: Beide lesen dieselbe Zahlenfolge, aber nur einer bekommt „Müller“ heraus — der andere „MÃ¼ller“.',
    beispiel: 'Der CSV-Export aus dem AdServer sieht in Excel plötzlich aus wie „KampagnenstÃ¤rke“ — die Datei ist in Ordnung, nur das öffnende Programm nimmt den falschen Zeichensatz an.',
    tiefe: 'Der heutige Standard heißt UTF-8 und kann praktisch alle Schriftzeichen der Welt darstellen; Probleme entstehen fast immer dort, wo ein älteres System noch etwas anderes ausgibt oder erwartet — typisch bei Exporten aus Kampagnen- und Buchhaltungssystemen. Zwei Muster helfen bei der Diagnose: Stehen statt der Umlaute zwei fremde Zeichen (Ã¤, Ã¶, ÃŸ), wurde UTF-8 als älterer Zeichensatz gelesen — die Information ist noch da. Stehen dort Fragezeichen oder Rauten, ist sie beim Speichern bereits verloren gegangen. Repariert wird das nicht per Suchen-und-Ersetzen, sondern beim Einlesen: Gib Claude die Datei und sag dazu, aus welchem System sie stammt.',
    stolper: 'Öffnest du eine kaputt angezeigte Datei in Excel und speicherst sie wieder, wird der Schaden oft echt. Vor jedem Reparaturversuch das Original behalten — die unversehrte Fassung ist der schnellste Weg zurück.',
    verweise: [
      { t: 'begriff', id: 'csv' },
      { t: 'skill', id: 'daten-aufbereiten', name: 'Daten aufbereiten' }
    ]
  }
];

/* FAQ / TROUBLESHOOTING — 10 häufige Blocker mit Schritt-für-Schritt-Lösung.
   befehl:-Verweise beim Merge gegen data/befehle.js abgeglichen (esc → esc-unterbrechen,
   plan-modus → shift-tab-modi, esc-esc → esc-unterbrechen; claude-version und init
   ohne passenden Eintrag → entfernt). */
const FAQ = [
  // Kundendaten-FAQ bewusst an Position 1 (User-Entscheidung): die PII-Frage
  // ist die wichtigste Antwort der Liste und soll niemandem entgehen.
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
