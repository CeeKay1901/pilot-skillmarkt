// pilot AI Marketplace — Hilfe-Center, Säule 1: BEFEHLE & KNIFFE (ausgelagerte Daten, Etappe E4).
// Klassisches Script, definiert globale Konstanten:
//   BEFEHLE              — 28 Einträge (22 Claude Code + 6 Langdock). Alle Claude-Code-Fakten
//                          am 2026-07-16 gegen die offizielle Doku (code.claude.com/docs:
//                          interactive-mode, commands, cli-reference, memory) UND lokal gegen
//                          `claude --help` verifiziert; alle Langdock-Fakten gegen
//                          docs.langdock.com (tricks-and-shortcuts, prompt-library, projects,
//                          functionalities). Redaktionsquelle: E4-Faktenblatt.
//                          NACHZIEH-PASS 2026-08-03: Die zwölf Einträge, die nur aus nutzen +
//                          beispiel bestanden (datei-verweis, shell-modus, help, shortcut-panel,
//                          copy, context und alle sechs ld-*), haben einen `tipp` bekommen.
//                          Jede darin genannte Tatsache ist an diesem Tag neu gegen
//                          code.claude.com/docs (commands, interactive-mode, common-workflows)
//                          bzw. docs.langdock.com (resources/tricks-and-shortcuts,
//                          chat/prompt-library, chat/projects, chat/functionalities) geprüft.
//                          `/copy` steht dabei ausdrücklich weiter in der Befehlsreferenz —
//                          inklusive des Zusatzes `/copy N` und der Code-Block-Auswahl.
//   BEFEHL_LEUCHTTUERME  — Set der 5 IDs mit Mini-Terminal-Demo (playScript-Zeilenformat)
//   BEFEHL_KOMMENTARE    — seeded Kurz-Kommentare der PILOTS-Personas (nur Leuchttürme)
// Felder je Eintrag:
//   id           URL-tauglich, eindeutig (Deep-Link lernen-hilfe.html?befehl=<id>)
//   cmd          exakt kopier-/drückbarer Wortlaut (JetBrains Mono im UI)
//   kategorie    'slash' | 'cli' | 'taste' | 'langdock'  → Filter-Chips
//   plattform    'code' | 'langdock'
//   nutzen       1 Satz, Du-Form; beispiel = Mini-Beispiel (aufklappbar);
//   tipp         „Gut zu wissen“-Zusatz (aufgeklappt sichtbar) — steht seit dem
//                Nachzieh-Pass bei jedem Eintrag
//   votes        Seed „Hat mir geholfen“ (3–52, redaktionelle Rangfolge; Demo-Werte,
//                auf der Seite gekennzeichnet). Anzeige = getVotes('befehl', id, votes).
//   votesRecent  Seed „Stimmen der letzten 90 Tage“ (Teilmenge von votes; Demo-Wert).
//                Gelesen von bestRated() in shared/base.js: Der Rotations-Pool der
//                Startseite ist Top-n nach GESAMT vereinigt mit Top-n nach RECENT —
//                ohne dieses Feld bleibt der Pool die halbe Menge und die Rotation
//                steht still. Die Staffelung weicht bewusst von votes ab: Die
//                Dauerbrenner (/clear, Esc) stehen seit Monaten oben, zuletzt gefragt
//                waren dagegen die Entdeckungen der Gruppe — @-Verweise, Plan-Modus,
//                /rewind und die Langdock-Prompt-Bibliothek.
//   demo         nur Leuchttürme: { script: [...] } im playScript-Format (t: user|claude|tool|res|sys)

const BEFEHL_LEUCHTTUERME = new Set([
  'clear',
  'esc-unterbrechen',
  'compact',
  'resume',
  'shift-tab-modi'
]);

const BEFEHLE = [

  /* ==================== CLAUDE CODE (22) ==================== */

  {
    id: 'clear',
    cmd: '/clear',
    kategorie: 'slash',
    plattform: 'code',
    nutzen: 'Startet eine frische Unterhaltung mit leerem Gedächtnis — dein wichtigster Befehl, wenn Claude „komisch wird“ oder du das Thema wechselst.',
    beispiel: 'Du hast eine Stunde am Kampagnen-Reporting gearbeitet und willst jetzt eine Landingpage bauen? Erst `/clear`, dann mischt Claude die beiden Themen nicht durcheinander.',
    tipp: 'Keine Angst: `/clear` löscht nichts unwiederbringlich — die vorherige Unterhaltung bleibt über `/resume` erreichbar.',
    votes: 52, votesRecent: 9,
    demo: {
      script: [
        { t: 'sys',    text: 'Kontext: 1 Stunde Kampagnen-Reporting für Kunde A' },
        { t: 'user',   text: '/clear' },
        { t: 'sys',    text: 'Neue Unterhaltung gestartet — Kontext ist leer' },
        { t: 'user',   text: 'Bau mir eine Übersicht aus @media-plan.csv' },
        { t: 'claude', text: 'Gern — ich lese die Datei und baue die Übersicht.' },
        { t: 'tool',   text: 'Read(media-plan.csv)', html: '<b>Read</b>(media-plan.csv)' },
        { t: 'res',    text: '48 Zeilen gelesen', html: '<span class="r-num">48</span> Zeilen gelesen' },
        { t: 'claude', text: 'Fertig: 6 Kanäle, sortiert nach Budget. Kein Reporting-Ballast von vorhin dabei.' }
      ]
    }
  },
  {
    id: 'esc-unterbrechen',
    cmd: 'Esc',
    kategorie: 'taste',
    plattform: 'code',
    nutzen: 'Stoppt Claude sofort mitten in der Antwort, damit du umsteuern kannst — die bisherige Arbeit bleibt erhalten, nichts geht verloren.',
    beispiel: 'Claude schreibt gerade 12 Social-Posts, aber du merkst nach Post 2: falsche Tonalität. Einmal `Esc`, kurz korrigieren, weiter — statt 10 unbrauchbare Posts abzuwarten.',
    tipp: 'Zwei Ebenen: einmal `Esc` stoppt Claude. Zweimal `Esc` auf leerem Eingabefeld öffnet das Rewind-Menü — die Zeitmaschine (siehe `/rewind`). Steht noch Text im Feld, löscht Doppel-Esc den Entwurf.',
    votes: 48, votesRecent: 7,
    demo: {
      script: [
        { t: 'user',   text: 'Schreib Social-Posts für alle 12 Produkte aus der Liste' },
        { t: 'claude', text: 'Ich lege los. Post 1 von 12: "Entdecke jetzt das neue…"' },
        { t: 'sys',    text: '[Esc gedrückt]' },
        { t: 'sys',    text: 'Interrupted — Claude gestoppt, bisherige Arbeit bleibt erhalten' },
        { t: 'user',   text: 'Stopp — nur die 3 Top-Produkte, und bitte halb so lang' },
        { t: 'claude', text: 'Alles klar, ich schreibe nur Post 1–3 im Kurzformat.' }
      ]
    }
  },
  {
    id: 'compact',
    cmd: '/compact',
    kategorie: 'slash',
    plattform: 'code',
    nutzen: 'Fasst die bisherige Unterhaltung zusammen und macht so Platz im Gedächtnis frei — deine Rettung, wenn lange Sessions zäh werden oder die Kontext-Warnung kommt.',
    beispiel: '`/compact Behalte die finalen Textentwürfe und die Kundenvorgaben` — Claude verdichtet den Rest und arbeitet nahtlos weiter.',
    tipp: 'Der eigentliche Kniff ist der optionale Zusatz: sag `/compact` direkt mit, was beim Zusammenfassen erhalten bleiben soll. Deine Projekt-CLAUDE.md überlebt das Verdichten übrigens immer.',
    votes: 45, votesRecent: 8,
    demo: {
      script: [
        { t: 'sys',    text: 'Context low — Kontext zu 85 % voll' },
        { t: 'user',   text: '/compact Behalte die finalen Textentwürfe und die Kundenvorgaben' },
        { t: 'sys',    text: 'Compacting conversation…' },
        { t: 'sys',    text: 'Zusammenfassung erstellt — Kontext wieder frei, Entwürfe und Vorgaben bleiben' },
        { t: 'user',   text: 'Weiter mit Entwurf 4' },
        { t: 'claude', text: 'Gern — Entwurf 4, aufbauend auf den drei Varianten von vorhin.' }
      ]
    }
  },
  {
    id: 'resume',
    cmd: '/resume',
    kategorie: 'slash',
    plattform: 'code',
    nutzen: 'Öffnet eine Liste deiner früheren Unterhaltungen — du springst zurück in eine alte Session, als hättest du nie aufgehört.',
    beispiel: 'Gestern Newsletter-Konzept angefangen, heute weitermachen: `/resume` tippen, Session aus der Liste wählen, „Wo waren wir?“ fragen.',
    tipp: 'Terminal-Pendant: `claude --resume` öffnet dieselbe Liste direkt beim Start — und `claude -c` (eigener Eintrag weiter unten) springt ohne Menü sofort in die letzte Session.',
    votes: 41, votesRecent: 5,
    demo: {
      script: [
        { t: 'user',   text: '/resume' },
        { t: 'sys',    text: 'Wähle eine Unterhaltung:' },
        { t: 'sys',    text: '  › Gestern 17:42 — Newsletter-Konzept (24 Nachrichten)' },
        { t: 'sys',    text: '    Montag 09:15 — Wettbewerbs-Recherche (41 Nachrichten)' },
        { t: 'sys',    text: '[Enter] Newsletter-Konzept geladen' },
        { t: 'user',   text: 'Wo waren wir stehen geblieben?' },
        { t: 'claude', text: 'Wir hatten Betreffzeile B favorisiert. Nächster Schritt laut Plan: den Call-to-Action testen.' }
      ]
    }
  },
  {
    id: 'shift-tab-modi',
    cmd: 'Shift+Tab',
    kategorie: 'taste',
    plattform: 'code',
    nutzen: 'Schaltet zwischen den Arbeitsmodi um — im Plan-Modus erklärt Claude erst, was es vorhat, bevor irgendetwas verändert wird. Perfekt für alle, die erst schauen wollen.',
    beispiel: 'Vor dem Aufräumen des Asset-Ordners: `Shift+Tab` bis „plan mode“ erscheint. Claude legt einen Plan vor, du gibst erst dann frei.',
    tipp: 'Shift+Tab schaltet der Reihe nach durch drei Modi: Standard (im Anzeiger „Manual“ — Claude fragt vor jeder Änderung), Accept Edits (Datei-Änderungen laufen ohne Rückfrage, andere Befehle weiterhin mit) und Plan (Claude plant erst und ändert nichts, bis du freigibst). Für den Anfang genügen dir Standard und Plan.',
    votes: 38, votesRecent: 12,
    demo: {
      script: [
        { t: 'sys',    text: '[Shift+Tab] plan mode on — Claude plant erst, ändert noch nichts' },
        { t: 'user',   text: 'Räum unseren Assets-Ordner auf und benenne alles einheitlich um' },
        { t: 'claude', text: 'Ich habe 34 Dateien gesichtet. Mein Plan:' },
        { t: 'claude', text: '1. Schema kunde_datum_inhalt  2. 6 Duplikate in /alt verschieben  3. Umbenennen' },
        { t: 'sys',    text: 'Plan bereit — ausführen? (ja / nein / anpassen)' },
        { t: 'user',   text: 'ja' },
        { t: 'sys',    text: '[Shift+Tab] zurück im Standard-Modus — Claude führt den Plan aus' }
      ]
    }
  },
  {
    id: 'datei-verweis',
    cmd: '@',
    kategorie: 'taste',
    plattform: 'code',
    nutzen: 'Tippe `@` und die ersten Buchstaben eines Dateinamens — Claude Code schlägt Dateien zum Auswählen vor, damit du nie wieder Pfade abtippen musst.',
    beispiel: '„Fasse @briefing-kunde-mueller.docx in 5 Punkten zusammen“ — die Datei landet vollständig in der Unterhaltung, ohne dass Claude sie vorher suchen und öffnen muss.',
    tipp: 'Das funktioniert auch für ganze Ordner: `@kampagnen/` liefert die Dateiliste (die Inhalte bleiben draußen) — der schnellste Weg zu „was liegt da eigentlich?“. Mehrere Verweise in einer Nachricht sind erlaubt („vergleiche @alt.csv und @neu.csv“), und in der Vorschlagsliste übernimmst du den markierten Pfad mit Tab oder Enter.',
    votes: 35, votesRecent: 14
  },
  {
    id: 'claude-continue',
    cmd: 'claude -c',
    kategorie: 'cli',
    plattform: 'code',
    nutzen: 'Startet Claude Code und macht sofort dort weiter, wo deine letzte Unterhaltung in diesem Ordner aufgehört hat — ohne Auswahlmenü, ein Befehl, weiter geht’s.',
    beispiel: 'Mittagspause, Terminal zu. Danach: `claude -c` — und der komplette Vormittag ist wieder da.',
    tipp: 'Abgrenzung: `claude -c` = letzte Session sofort, `claude --resume` = Liste zum Auswählen.',
    votes: 33, votesRecent: 4
  },
  {
    id: 'shell-modus',
    cmd: '!',
    kategorie: 'taste',
    plattform: 'code',
    nutzen: 'Ein `!` am Zeilenanfang führt einen Terminal-Befehl direkt aus — das Ergebnis landet in der Unterhaltung und Claude reagiert darauf.',
    beispiel: '`! ls` zeigt dir, welche Dateien im Projektordner liegen — und du kannst direkt fragen: „Welche davon gehören zur Kampagne?“',
    tipp: 'Zwei Dinge, die man beim ersten Mal sucht: Aus dem Shell-Modus kommst du mit `Esc` wieder heraus (im leeren Feld tut es auch Backspace). Und du musst nach dem Befehl nicht extra nachfragen — Claude sieht die Ausgabe und geht von selbst darauf ein.',
    votes: 30, votesRecent: 6
  },
  {
    id: 'model',
    cmd: '/model',
    kategorie: 'slash',
    plattform: 'code',
    nutzen: 'Zeigt dir, welches Claude-Modell gerade arbeitet, und lässt dich wechseln — etwa auf ein schnelleres Modell für einfache Fleißaufgaben.',
    beispiel: 'Für die große Konzept-Arbeit das Standard-Modell, fürs Umformatieren von 30 Produkttexten reicht ein schnelleres: `/model` und auswählen.',
    tipp: 'Beim Start geht es auch direkt: `claude --model <name>`.',
    votes: 28, votesRecent: 5
  },
  {
    id: 'init',
    cmd: '/init',
    kategorie: 'slash',
    plattform: 'code',
    nutzen: 'Legt eine CLAUDE.md-Gedächtnisdatei für deinen Projektordner an — darin stehen Regeln und Fakten, die Claude ab dann in jeder Session kennt.',
    beispiel: 'Einmal `/init` im Kundenordner, dann Regeln ergänzen wie „Alle Texte in Du-Form, Kunde heißt immer ‚die Marke XY‘“ — nie wieder erklären.',
    tipp: 'Eine bestehende CLAUDE.md wird nicht überschrieben — `/init` schlägt dann Verbesserungen vor.',
    votes: 26, votesRecent: 7
  },
  {
    id: 'help',
    cmd: '/help',
    kategorie: 'slash',
    plattform: 'code',
    nutzen: 'Zeigt dir direkt in Claude Code alle verfügbaren Befehle und Hilfen an — wenn du nicht mehr weiterweißt, ist das dein Startpunkt.',
    beispiel: 'Blackout, wie hieß der Befehl fürs Zusammenfassen? `/help` tippen — oder einfach `/` und ein paar Buchstaben, die Liste filtert mit.',
    tipp: 'Im Alltag ist das nackte `/` der schnellere Griff: Die Liste zeigt nicht nur die eingebauten Befehle, sondern auch alle Skills und Plugin-Befehle, die bei dir installiert sind. Umgekehrt heißt das aber auch — nicht jeder Befehl aus einer fremden Anleitung taucht bei dir auf; manche hängen an Plattform oder Plan.',
    votes: 23, votesRecent: 3
  },
  {
    id: 'verlauf-pfeil',
    cmd: '↑',
    kategorie: 'taste',
    plattform: 'code',
    nutzen: 'Blättert durch deine früheren Eingaben — perfekt, um einen langen Prompt noch mal zu verwenden oder leicht abzuwandeln.',
    beispiel: 'Der ausgetüftelte Prompt von vorhin soll noch mal laufen, nur mit anderem Kunden? Pfeil hoch, Namen tauschen, Enter.',
    tipp: 'Der Verlauf wird pro Arbeitsordner gespeichert — und mit `Ctrl+R` kannst du ihn durchsuchen.',
    votes: 21, votesRecent: 3
  },
  {
    id: 'ctrl-c',
    cmd: 'Ctrl+C',
    kategorie: 'taste',
    plattform: 'code',
    nutzen: 'Der Not-Aus: bricht eine laufende Aktion ab — und bei leerem Feld beendet zweimal Drücken Claude Code komplett. Nichts davon macht etwas kaputt.',
    beispiel: 'Ein Befehl läuft und läuft und du willst raus: `Ctrl+C`. Feierabend? Zweimal `Ctrl+C` und das Terminal gehört wieder dir.',
    tipp: 'Die eigentliche Botschaft: du kannst hier nichts kaputt machen — `Ctrl+C` bricht nur ab, es löscht keine Arbeit.',
    votes: 20, votesRecent: 4
  },
  {
    id: 'shortcut-panel',
    cmd: '?',
    kategorie: 'taste',
    plattform: 'code',
    nutzen: 'Ein `?` im leeren Eingabefeld blendet die Spickzettel-Übersicht aller Tastenkürzel ein — die eingebaute Kurzfassung dieser Seite.',
    beispiel: 'Du hast vergessen, wie der Plan-Modus ging? `?` tippen, Kürzel nachschauen, `?` blendet das Panel wieder aus.',
    tipp: 'Der Haken, über den alle einmal stolpern: Das klappt nur im LEEREN Eingabefeld. Steht schon Text darin, schreibt `?` einfach ein Fragezeichen mitten in deinen Satz.',
    votes: 18, votesRecent: 6
  },
  {
    id: 'rewind',
    cmd: '/rewind',
    kategorie: 'slash',
    plattform: 'code',
    nutzen: 'Die Zeitmaschine: setzt Dateien und Unterhaltung auf einen früheren Stand zurück, wenn eine Änderung doch keine gute Idee war.',
    beispiel: 'Die neue Version der Präsentations-Gliederung war vorher besser? `/rewind`, Checkpoint von vor 10 Minuten wählen, alles ist wieder wie davor.',
    tipp: 'Schneller Weg dorthin: zweimal `Esc` auf leerem Eingabefeld öffnet dasselbe Rewind-Menü.',
    votes: 16, votesRecent: 11
  },
  {
    id: 'mehrzeilig',
    cmd: 'Shift+Enter',
    kategorie: 'taste',
    plattform: 'code',
    nutzen: 'Macht einen Zeilenumbruch, ohne die Nachricht abzuschicken — für längere Briefings direkt im Eingabefeld.',
    beispiel: 'Du diktierst drei Anforderungen als Liste: nach jedem Punkt `Shift+Enter`, erst am Ende Enter zum Abschicken.',
    tipp: 'Klappt nicht in jedem Terminal von Haus aus — `Ctrl+J` erzeugt dagegen überall einen Zeilenumbruch, ebenso der Fallback `\\` + Enter, beide ohne Einrichtung. Für VS Code & Co. richtet einmalig `/terminal-setup` das Shift+Enter-Kürzel ein.',
    votes: 14, votesRecent: 2
  },
  {
    id: 'bild-einfuegen',
    cmd: 'Ctrl+V',
    kategorie: 'taste',
    plattform: 'code',
    nutzen: 'Fügt einen Screenshot aus der Zwischenablage direkt in die Unterhaltung ein — Claude kann das Bild ansehen und dazu arbeiten.',
    beispiel: 'Screenshot vom Kunden-Feedback ins Terminal einfügen und fragen: „Welche der Anmerkungen betreffen die Startseite?“',
    tipp: 'Je nach Terminal heißt der Griff anders: `Ctrl+V`, `Cmd+V` (iTerm2) oder `Alt+V` (Windows und WSL) — genau so steht es in der Doku.',
    votes: 12, votesRecent: 5
  },
  {
    id: 'copy',
    cmd: '/copy',
    kategorie: 'slash',
    plattform: 'code',
    nutzen: 'Kopiert Claudes letzte Antwort in deine Zwischenablage — sauberer als mühsames Markieren mit der Maus im Terminal.',
    beispiel: 'Claude hat den Social-Media-Plan fertig formuliert: `/copy`, rüber in Teams oder Langdock, fertig.',
    tipp: '`/copy 2` holt die vorletzte Antwort — die Rettung, wenn du nach dem guten Ergebnis noch eine Nachfrage hinterhergeschickt hast. Stecken Code-Blöcke in der Antwort, fragt Claude vorher, ob du einen einzelnen davon oder alles willst; mit `w` landet die Auswahl statt in der Zwischenablage in einer Datei.',
    votes: 10, votesRecent: 4
  },
  {
    id: 'memory',
    cmd: '/memory',
    kategorie: 'slash',
    plattform: 'code',
    nutzen: 'Zeigt dir alles, was sich Claude für dieses Projekt gemerkt hat, und lässt dich die Gedächtnisdateien direkt bearbeiten.',
    beispiel: 'Claude nennt den Kunden hartnäckig falsch? `/memory` öffnen, den Eintrag korrigieren — ab sofort stimmt’s in jeder Session.',
    tipp: 'Noch einfacher: schreib Claude „merk dir: …“ — das Auto-Memory speichert es selbst. Alles ist einfaches Markdown.',
    votes: 9, votesRecent: 3
  },
  {
    id: 'context',
    cmd: '/context',
    kategorie: 'slash',
    plattform: 'code',
    nutzen: 'Zeigt als Grafik, wie voll Claudes Arbeitsgedächtnis gerade ist — so weißt du, wann es Zeit für `/compact` oder `/clear` wird.',
    beispiel: 'Die Session fühlt sich träge an? `/context` zeigt: 90 % voll. Dann `/compact` — und es läuft wieder rund.',
    tipp: 'Das farbige Raster sagt nicht nur, WIE voll es ist, sondern auch WOMIT — und weist auf die größten Platzfresser hin. Reicht der Platz nicht mehr, nennt die Ausgabe gleich den Befehl, der wieder welchen schafft; du musst dich also nicht zwischen `/compact` und `/clear` entscheiden.',
    votes: 7, votesRecent: 7
  },
  {
    id: 'usage',
    cmd: '/usage',
    kategorie: 'slash',
    plattform: 'code',
    nutzen: 'Zeigt dir deinen Verbrauch und deine Plan-Limits — gut zu wissen, bevor du ein großes Projekt startest.',
    beispiel: 'Freitagnachmittag noch eine große Recherche starten? Kurz `/usage` checken, ob dein Kontingent das hergibt.',
    tipp: 'Falls du `/cost` aus älteren Anleitungen kennst: das ist heute nur noch ein Alias für `/usage`.',
    votes: 5, votesRecent: 2
  },
  {
    id: 'doctor',
    cmd: '/doctor',
    kategorie: 'slash',
    plattform: 'code',
    nutzen: 'Der Gesundheitscheck: prüft deine Claude-Code-Installation und behebt viele Probleme gleich selbst.',
    beispiel: 'Claude Code startet komisch oder ein Befehl fehlt plötzlich? `/doctor` laufen lassen, bevor du Kolleg:innen fragst.',
    tipp: 'Im Terminal zeigt `claude doctor` dieselbe Diagnose an — reparieren kann aber nur `/doctor` innerhalb der Session.',
    votes: 3, votesRecent: 1
  },

  /* ==================== LANGDOCK-PENDANTS (6) ==================== */

  {
    id: 'ld-prompt-bibliothek',
    cmd: '@',
    kategorie: 'langdock',
    plattform: 'langdock',
    nutzen: 'Tippe `@` ins Langdock-Eingabefeld, um gespeicherte Prompts aus der Bibliothek direkt in den Chat zu laden — das Langdock-Pendant zu unseren Prompt-Rezepten.',
    beispiel: '`@` tippen, „Prompts“ wählen, dein gespeichertes Briefing-Template einsetzen — mit `{{Variablen}}`, die Langdock beim Einfügen abfragt.',
    tipp: 'Die geschweiften Klammern sind der eigentliche Kniff: `Schreib eine {{Tonalität}} Mail an {{Empfänger}}` wird einmal gespeichert und danach jedes Mal abgefragt — ein Template statt zwanzig fast gleicher Kopien. Prompts und ganze Prompt-Ordner kannst du privat lassen, für den gesamten Workspace freigeben oder auf einzelne Gruppen begrenzen.',
    votes: 24, votesRecent: 10
  },
  {
    id: 'ld-command-bar',
    cmd: 'Cmd+K (Mac) / Ctrl+K (Windows)',
    kategorie: 'langdock',
    plattform: 'langdock',
    nutzen: 'Öffnet die Langdock-Kommandozentrale — Chat-Verlauf durchsuchen, gepinnte Agents finden, Einstellungen erreichen, alles ohne Maus.',
    beispiel: '„Wo war der Chat zur Q3-Kampagne?“ — `Cmd+K`, Stichwort tippen, Treffer öffnen.',
    tipp: 'Die Leiste sucht nicht nur, sie legt auch an: `Cmd+K` drücken, „new project“ tippen — so entsteht ein Langdock-Projekt, ohne dass du die Seitenleiste durchsuchst. Auch die Einstellungen erreichst du von hier, ohne dich durchzuklicken.',
    votes: 22, votesRecent: 4
  },
  {
    id: 'ld-modellwahl',
    cmd: 'Modellname oben links anklicken',
    kategorie: 'langdock',
    plattform: 'langdock',
    nutzen: 'Über den Modellnamen oben links im Chat wechselst du jederzeit das KI-Modell — sogar mitten im Gespräch, ohne dass der Verlauf verloren geht.',
    beispiel: 'Erst Claude fürs Konzept, dann testweise dieselbe Frage an GPT — einfach oben links umschalten, die nächste Nachricht nutzt das neue Modell.',
    tipp: 'Der Wechsel wirkt ab der nächsten Nachricht, der bisherige Verlauf bleibt vollständig stehen — du verlierst also nichts. Die Langdock-Doku empfiehlt genau diese Arbeitsteilung: das stärkere Modell fürs Denken und Konzipieren, danach ein schnelleres für die Fleißarbeit.',
    votes: 19, votesRecent: 3
  },
  {
    id: 'ld-projekte',
    cmd: 'Sidebar → Projects → +',
    kategorie: 'langdock',
    plattform: 'langdock',
    nutzen: 'Ein Langdock-Projekt bündelt Chats zu einem Thema und gibt allen darin dieselben Dateien und Anweisungen mit — wie ein CLAUDE.md fürs Chatten.',
    beispiel: 'Projekt „Kunde Müller“ mit Styleguide-PDF und der Anweisung „immer förmliche Ansprache“ — jeder neue Chat darin kennt beides automatisch.',
    tipp: 'Ein Projekt besteht aus drei Dingen: Name, angehängte Dateien und eigene Anweisungen. Anlegen geht auch ohne Seitenleiste — `Cmd+K` drücken, „new project“ tippen. Ergänzt du später eine Datei oder änderst die Anweisungen, gilt das laut Doku für alle künftigen Chats des Projekts.',
    votes: 17, votesRecent: 9
  },
  {
    id: 'ld-neuer-chat',
    cmd: 'Cmd+Shift+O (Mac) / Ctrl+Shift+O (Windows)',
    kategorie: 'langdock',
    plattform: 'langdock',
    nutzen: 'Startet blitzschnell einen neuen Chat — das Langdock-Pendant zu `/clear`: neues Thema, frischer Kontext.',
    beispiel: 'Reporting fertig, jetzt Textarbeit: `Cmd+Shift+O` statt mit der Maus zum „Neuer Chat“-Knopf zu wandern.',
    tipp: 'In der Langdock-Desktop-App liegt derselbe Griff zusätzlich auf `Cmd+N` bzw. `Ctrl+N`. Und wenn du zum Lesen Platz brauchst: `Cmd+Shift+S` bzw. `Ctrl+Shift+S` klappt die Seitenleiste weg und wieder auf.',
    votes: 8, votesRecent: 2
  },
  {
    id: 'ld-antwort-kopieren',
    cmd: 'Cmd+Shift+C (Mac) / Ctrl+Shift+C (Windows)',
    kategorie: 'langdock',
    plattform: 'langdock',
    nutzen: 'Kopiert die letzte Antwort in deine Zwischenablage — das Langdock-Pendant zu `/copy` in Claude Code.',
    beispiel: 'Der finale Textvorschlag steht: `Cmd+Shift+C` und direkt ins CMS oder in die Mail einfügen.',
    tipp: 'Das Kürzel nimmt immer die LETZTE Antwort. Willst du eine frühere, fahr mit der Maus darüber — dort sitzt derselbe Kopier-Knopf, gleich daneben der Kreispfeil für „nochmal, anders formuliert“.',
    votes: 6, votesRecent: 2
  }
];

/* Seeded Kurz-Kommentare der PILOTS-Personas (data/contributors.js) — nur Leuchttürme.
   Demo-Stimmen, auf der Seite als redaktionelle Demo-Werte gekennzeichnet. */
const BEFEHL_KOMMENTARE = [
  {
    befehlId: 'clear',
    autor: 'Sophie Klein',
    rolle: 'Projektmanagerin',
    text: 'Seit ich vor jedem neuen Report /clear tippe, wirft Claude die Kunden nicht mehr durcheinander. Klingt banal, war für mich der größte Aha-Moment.'
  },
  {
    befehlId: 'clear',
    autor: 'Jan Richter',
    rolle: 'Tech Lead & Citizen-Coding-Mentor',
    text: 'Häufigste Frage in der Testgruppe: „Claude wird komisch, was tun?“ Die Antwort ist in neun von zehn Fällen: /clear. Ihr verliert dabei nichts — die alte Session bleibt über /resume erreichbar.'
  },
  {
    befehlId: 'esc-unterbrechen',
    autor: 'Anna Schreiber',
    rolle: 'Content Strategin',
    text: 'Ich habe anfangs brav gewartet, bis Claude fertig war — obwohl die Richtung längst falsch war. Einmal Esc drücken spart fünf Minuten und viel Gescrolle.'
  },
  {
    befehlId: 'compact',
    autor: 'Lukas Weber',
    rolle: 'SEO Strategist',
    text: 'Bei einer langen Keyword-Analyse kam die Kontext-Warnung. /compact mit dem Zusatz „behalte die Keyword-Liste“ — und es ging nahtlos weiter, ohne dass etwas Wichtiges fehlte.'
  },
  {
    befehlId: 'resume',
    autor: 'Mia Hoffmann',
    rolle: 'Senior UX Designerin',
    text: 'Laptop zu, Feierabend. Am nächsten Morgen /resume — und der komplette Landingpage-Stand war wieder da. Fühlt sich an wie ein Spielstand.'
  },
  {
    befehlId: 'shift-tab-modi',
    autor: 'Christopher Kipp',
    rolle: 'Innovation Lead',
    text: 'Plan-Modus ist mein Standard-Tipp für alle Neuen: Claude erklärt erst, was es vorhat, und du gibst frei. Nebenbei lernst du dabei enorm viel darüber, wie Claude arbeitet.'
  },
  {
    befehlId: 'shift-tab-modi',
    autor: 'Sophie Klein',
    rolle: 'Projektmanagerin',
    text: 'Shift+Tab hat mir die Angst genommen, etwas kaputt zu machen. Erst der Plan, dann mein Okay — genauso will ich das als PM.'
  }
];
