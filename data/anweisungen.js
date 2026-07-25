/* ============================================================
   pilot AI Marketplace — Projektanweisungen: data/anweisungen.js
   (Bibliotheks-Umbau 2026-07, Stufe 2).

   Klassisches Script (kein Modul), definiert eine globale Konstante.

   Definierte Globals:
     ANWEISUNGEN — 3 kopierfertige CLAUDE.md-Vorlagen, geschnitten nach
                   Projekttyp: kleines-tool | datenauswertung | einseiter.

   Wer diese Datei liest:
     1. Das Baukasten-Modul in `vorlagen.html` — zeigt Karte, Vorschau,
        „Warum steht das drin"-Aufklapper und den Kopieren-Knopf.
     2. Die globale Suche und „Deine Sachen" über `GSEARCH_GROUPS`
        (shared/base.js) — dafür sind `id`, `name`, `kurz` und `tags` da.
     3. Später die drei Startprojekt-Gerüste (Stufe 3): der `text` wird
        unverändert als `CLAUDE.md` ins ZIP gepackt.

   DESHALB: Dieser Text ist die EINZIGE Quelle. Kein zweiter Bestand in
   einem Gerüst-Ordner. Jeder `text` muss so, wie er hier steht, als echte
   `CLAUDE.md` in einem leeren Ordner funktionieren. Wo der Nutzer etwas
   ausfüllen soll, steht „noch offen" als sichtbare Markierung — das ist
   unschädlich, weil eine unausgefüllte Zeile die Anweisung nicht kaputt
   macht, sondern Claude anweist, nachzufragen.

   Felder je Eintrag:
     id          URL-tauglich, eindeutig (Deep-Link vorlagen.html?pa=<id>, Anker #bk-pa-<id>;
                 kurzer Parameter wie ?a= / ?b= / ?d= im selben Reiter)
     name        Anzeigename der Karte
     kurz        ein Satz: was diese Vorlage ist
     wofuer      1–2 Sätze: für welche Art Projekt
     passt       3–4 Merkmale — dann ist es die richtige Vorlage
     passtNicht  2–3 Merkmale, jeweils mit Verweis auf die passendere Vorlage
     tags        4–6 kleingeschriebene Schlagworte für die Suche
     warum       [{ abschnitt, grund }] — deckt jeden Hauptabschnitt von `text`
                 ab; `abschnitt` ist die Überschrift WÖRTLICH wie im `text`
                 (ohne die `##`), damit das UI beides nebeneinander zeigen kann
     text        der vollständige CLAUDE.md-Inhalt als Template-Literal

   ESCAPING — hier ist schon Zeit verloren gegangen, also genau lesen:
   `text` ist Markdown in einem JS-Template-Literal. Darin gilt
     Backtick        `  ->  \`     (jeder Code-Span, jeder ```-Zaun)
     Dollar-Klammer  ${ ->  \${    (sonst wertet JS es als Platzhalter aus)
     Backslash       \  ->  \\
   Nach jeder Änderung zwingend `node --check data/anweisungen.js` laufen
   lassen. Ein vergessener Backtick bricht die Datei nicht sichtbar an der
   Stelle, sondern verschluckt den halben Rest des Arrays.

   Absätze stehen im `text` bewusst als EINE lange Zeile (kein harter
   Umbruch bei 80 Zeichen). Markdown rendert identisch, und die Datei
   bleibt beim Richtwert von 40–70 Zeilen je Vorlage.

   Zahlen-Ehrlichkeit: Die Zeilen- und Spaltenangaben im Datenauswertungs-
   Text stammen aus `beispieldaten/umfrage-rohdaten.csv` (real gezählt).
   Die dort beschriebene Breit-/Langformat-Falle ist in diesem Projekt
   gemessen worden, nicht ausgedacht.
   ============================================================ */

const ANWEISUNGEN = [

  /* ============================================================ *
   * 1 · KLEINES TOOL                                             *
   * ============================================================ */
  {
    id: 'kleines-tool',
    name: 'Kleines Tool',
    kurz: 'Projektanweisung für ein interaktives Werkzeug, das eine einzige Aufgabe erledigt und per Doppelklick läuft.',
    wofuer: 'Für ein Werkzeug mit Eingabefeldern und einem Ergebnis: Rechner, Umrechner, Checkliste, Generator. Alles passiert in einer Datei im Browser, ohne Server und ohne Installation.',
    passt: [
      'Jemand tippt Werte ein und bekommt sofort ein Ergebnis',
      'Es reicht eine Seite ohne Menü, Login oder Datenbank',
      'Du willst es per Doppelklick öffnen und als Datei weitergeben',
      'Die Rechnung dahinter kannst du selbst nachprüfen'
    ],
    passtNicht: [
      'Der Ausgangspunkt ist eine vorhandene Datei mit vielen Zeilen, aus der Kennzahlen werden sollen — dafür ist „Datenauswertung" gemacht',
      'Es wird am Ende nichts gerechnet, sondern etwas gelesen und weitergegeben — dann nimm „Website / Einseiter"',
      'Mehrere Personen sollen dieselben Daten sehen und ändern — das kann keine der drei Vorlagen, dafür braucht es einen Server'
    ],
    tags: ['tool', 'rechner', 'formular', 'einzeldatei', 'interaktiv', 'browser'],
    warum: [
      {
        abschnitt: 'Das baue ich hier',
        grund: 'Vier Zeilen, die du ausfüllst, bevor irgendetwas entsteht. Sie stehen absichtlich ganz oben: Claude liest die Datei von vorn und weiß dadurch schon beim ersten Satz, worum es geht, statt es aus deiner Frage zu erraten.'
      },
      {
        abschnitt: 'Was hier „kleines Tool" heißt',
        grund: 'Grenzt den Umfang ab. Ohne diesen Abschnitt wächst aus „ein Rechner" nach und nach eine Anwendung mit Login und Datenbank, weil jede einzelne Bitte für sich sinnvoll klingt.'
      },
      {
        abschnitt: 'So wird es geöffnet',
        grund: 'Legt den einen Weg fest, auf dem du das Tool tatsächlich benutzt. Damit ist auch entschieden, was nicht geht: alles, was erst nach einem gestarteten Server funktioniert.'
      },
      {
        abschnitt: 'Harte Regeln',
        grund: 'Die Punkte, bei denen Nachgeben später teuer wird. Vor allem Regel 1 und 2 halten das Projekt in dem Zustand, in dem du es auch ohne Hilfe wieder öffnen kannst.'
      },
      {
        abschnitt: 'Dateien',
        grund: 'Sagt, was es geben darf. Eine kurze, vollständige Liste ist der einfachste Schutz gegen einen Ordner, in dem nach zwei Wochen niemand mehr die richtige Datei findet.'
      },
      {
        abschnitt: 'Bedienung',
        grund: 'Die Anforderungen, die sonst wegfallen, weil sie im Auftrag nicht vorkommen: Tastatur, Beschriftungen, Handy-Breite. Nachträglich einzubauen ist deutlich mühsamer als gleich mitzunehmen.'
      },
      {
        abschnitt: 'Das lässt du bleiben',
        grund: 'Eine ausdrückliche Nein-Liste wirkt stärker als jede allgemeine Ermahnung, weil sie genau die Punkte trifft, die sonst „nur eben kurz" dazukommen.'
      },
      {
        abschnitt: 'Fertig ist es, wenn',
        grund: 'Macht „funktioniert" nachprüfbar. Ohne diese Liste heißt fertig nur, dass keine Fehlermeldung zu sehen war — das ist keine Prüfung, sondern eine Hoffnung.'
      },
      {
        abschnitt: 'Wenn du unsicher bist',
        grund: 'Erlaubt die Rückfrage ausdrücklich. Ohne diesen Satz füllt Claude Lücken mit plausiblen Annahmen, und plausibel falsch ist schwerer zu bemerken als eine offene Frage.'
      }
    ],
    text: `# CLAUDE.md — Kleines Tool

<!-- Claude Code liest diese Datei automatisch, sobald du in diesem Ordner \`claude\` startest.
     Sie gilt dann für jede Antwort in diesem Projekt. Fang oben an: „Das baue ich hier"
     füllst du aus, der Rest kann so bleiben. -->

## Das baue ich hier

- **Zweck:** noch offen — ein Satz, was das Tool ausrechnen oder erledigen soll.
- **Für wen:** noch offen — nur für mich, fürs Team oder zum Weitergeben.
- **Eingabe:** noch offen — welche Werte tippt jemand ein.
- **Ergebnis:** noch offen — welche Zahl oder welcher Satz kommt heraus.

Solange irgendwo „noch offen" steht, fragst du mich danach, bevor du baust. Nicht raten.

## Was hier „kleines Tool" heißt

Eine einzige Seite, die eine Aufgabe erledigt: oben etwas eingeben, unten steht das Ergebnis. Kein Login, kein Server, keine Datenbank, keine zweite Seite. Wenn dir auffällt, dass mein Wunsch mehr braucht als das, sagst du mir das, statt es still einzubauen.

## So wird es geöffnet

Doppelklick auf \`index.html\` im Dateimanager, die Seite öffnet sich im Browser. Das ist der einzige Weg, den ich benutze, und damit der Maßstab für jede Änderung: Was erst nach einem gestarteten Server funktioniert, funktioniert für mich nicht.

## Harte Regeln

1. **Alles in einer Datei.** HTML, CSS und JavaScript stehen zusammen in \`index.html\`. Ein Tool, das man als eine einzige Datei verschicken kann, kommt auch an.
2. **Kein Build-Step, keine Installation.** Kein npm, kein React, kein Vite, kein Kompilieren. Ich soll eine Datei öffnen, nicht ein Projekt aufsetzen.
3. **Keine externen Bibliotheken, keine CDN-Adressen, keine Web-Fonts.** Sonst ist das Tool ohne Netz leer. Für die Schrift reicht \`font-family: system-ui, sans-serif\`.
4. **Gerechnet wird im Browser.** Keine Eingabe wird irgendwohin geschickt.
5. **Deutsche Oberfläche, deutsche Zahlen.** Komma als Dezimaltrennzeichen, Punkt als Tausendertrennung, Einheit dahinter:
   \`\`\`js
   const anzeige = wert.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
   feld.textContent = \`\${anzeige} €\`;   // ergibt z. B. 1.284,50 €
   \`\`\`
6. **Sofort rechnen.** Das Ergebnis aktualisiert sich bei jeder Eingabe. Einen „Berechnen"-Knopf gibt es nur, wenn ich ausdrücklich darum bitte.
7. **Falsche Eingaben abfangen.** Leeres Feld, Buchstaben im Zahlenfeld, Null als Teiler: dort steht dann ein kurzer, verständlicher Hinweis. Niemals \`NaN\`, \`Infinity\` oder \`undefined\` auf dem Bildschirm.
8. **Erklär mir jede Änderung in zwei Sätzen** — was du geändert hast und warum. Ich muss das Tool in einem halben Jahr ohne dich noch verstehen.

## Dateien

\`\`\`
index.html   das ganze Tool: Aufbau, Aussehen, Rechnung
CLAUDE.md    diese Datei — Regeln für dich, kein Programmcode
\`\`\`

Mehr Dateien nur, wenn ich vorher zustimme. Ein zweites \`script.js\` ist kein Fortschritt, sondern eine Datei mehr, die beim Weitergeben fehlen kann.

## Bedienung

- Jedes Eingabefeld hat eine sichtbare Beschriftung (\`<label for="...">\`).
- Alles ist mit der Tastatur erreichbar: Tab springt sinnvoll weiter, Enter löst aus.
- Auf dem Handy bei 360 Pixel Breite lesbar, ohne seitliches Schieben.
- Das Ergebnis ist die größte Zahl auf der Seite, die Eingaben sind kleiner.
- Ab vier Eingabefeldern: unter jedem Feld ein kurzer Satz, was hineingehört.

## Das lässt du bleiben

- Kein Tracking, keine Analyse-Skripte, kein Cookie-Banner.
- Kein Umbau auf ein Framework, auch nicht „weil es sauberer wäre".
- Keine Bilder, Symbole oder Schriften von fremden Servern.
- \`index.html\` wird nicht umbenannt und nicht in einen Unterordner verschoben.
- Keine erfundenen Zahlen im Ergebnisfeld. Ein Platzhalter im Eingabefeld ist in Ordnung, ein ausgedachtes Ergebnis nicht.

## Fertig ist es, wenn

- Doppelklick auf \`index.html\` öffnet das Tool und das Ergebnis erscheint.
- Drei Eingaben, die ich von Hand nachrechne, stimmen mit der Anzeige überein.
- Leeres Feld und Unsinn im Feld ergeben einen Hinweis, kein \`NaN\`.
- Die Browser-Konsole (F12) bleibt leer, auch nach mehreren Eingaben.
- Mit ausgeschaltetem WLAN sieht die Seite genauso aus.
- Bei 360 Pixel Fensterbreite ist alles lesbar und bedienbar.

## Wenn du unsicher bist

Frag nach, bevor du baust. Besonders bei Rundung, Einheiten und Sonderfällen: Wert ist 0, Feld ist leer, Prozent von was genau. Eine Rückfrage kostet mich eine Minute, ein Tool mit einer falschen Formel kostet mich das Vertrauen darin.
`
  },

  /* ============================================================ *
   * 2 · DATENAUSWERTUNG                                          *
   * ============================================================ */
  {
    id: 'datenauswertung',
    name: 'Datenauswertung',
    kurz: 'Projektanweisung für eine Auswertung: Datei rein, verdichtete Zahlen raus — mit Pflicht zur sichtbaren Formatprüfung.',
    wofuer: 'Für Auswertungen bestehender Dateien: CSV-Export, Umfrage-Rückläufe, Kampagnenzahlen. Der Schwerpunkt liegt nicht auf der Oberfläche, sondern darauf, dass die Zahlen stimmen und nachvollziehbar bleiben.',
    passt: [
      'Es gibt bereits eine Datei mit vielen Zeilen, aus der wenige Zahlen werden sollen',
      'Die Datei kommt aus Excel, einem Tool-Export oder einem Umfrage-Werkzeug',
      'Du musst die Zahlen anschließend jemandem gegenüber vertreten können',
      'Dieselbe Auswertung wird später mit einer neuen Datei wiederholt'
    ],
    passtNicht: [
      'Es gibt noch keine Datei, die Werte werden von Hand eingetippt — dann passt „Kleines Tool" besser',
      'Die Zahlen stehen schon fest und sollen nur verständlich dargestellt und geteilt werden — dafür ist „Website / Einseiter" gedacht',
      'Die Datei enthält personenbezogene Daten, die nicht auf deinen Rechner dürfen — das klärst du vor dem Bauen, nicht danach'
    ],
    tags: ['daten', 'csv', 'auswertung', 'kennzahlen', 'excel', 'umfrage'],
    warum: [
      {
        abschnitt: 'Das werte ich hier aus',
        grund: 'Datei, Frage und Ergebnisform stehen vor dem ersten Rechenschritt fest. Eine Auswertung ohne festgelegte Frage liefert immer irgendein Ergebnis, nur selten das gebrauchte.'
      },
      {
        abschnitt: 'Der Ablauf',
        grund: 'Beschreibt die Auswertung als einmaligen Durchlauf statt als Dauerbetrieb. Das hält das Projekt klein und erklärt, warum es hier keine Datenbank und keinen Server gibt.'
      },
      {
        abschnitt: 'Erst hinsehen, dann rechnen',
        grund: 'Trennzeichen, Dezimalkomma, Kodierung und Kopfzeile entscheiden über jede folgende Zahl. Deutsche Excel-Exporte brechen fast alle an genau diesen Stellen, und zwar lautlos.'
      },
      {
        abschnitt: 'Breitformat oder Langformat — benenne es',
        grund: 'Die eine Falle, die in diesem Projekt schon zugeschnappt ist: Ein Auswerter erwartete Langformat, bekam Breitformat und meldete stumm 33 Pseudo-Fragen statt fünf. Deshalb ist das erkannte Format hier eine Pflichtausgabe und keine interne Annahme.'
      },
      {
        abschnitt: 'Zahlen-Regeln',
        grund: 'Sechs Regeln gegen die typischen stillen Fehler: erfundene Spalten, weggeworfene Zeilen, Scheingenauigkeit, Prozente ohne Nenner. Jede Regel steht für eine Zahl, die sonst irgendwann in einer Präsentation landet.'
      },
      {
        abschnitt: 'Dateien',
        grund: 'Trennt Rohdaten und Ergebnis. Die Rohdatei wird nie überschrieben — sonst lässt sich ein Fehler in der Auswertung später nicht mehr nachvollziehen, weil der Ausgangszustand fehlt.'
      },
      {
        abschnitt: 'Das lässt du bleiben',
        grund: 'Vor allem: nichts hochladen und nichts glätten. Beides passiert schnell aus Hilfsbereitschaft und ist bei Kunden- oder Personendaten nicht mehr zurückzunehmen.'
      },
      {
        abschnitt: 'Fertig ist es, wenn',
        grund: 'Prüft die Auswertung gegen eine zweite, unabhängige Rechnung und gegen eine absichtlich kaputte Datei. Eine Auswertung, die auch bei Murks eine Zahl liefert, ist nicht fertig.'
      },
      {
        abschnitt: 'Wenn du unsicher bist',
        grund: 'Bei Daten ist die Rückfrage besonders wichtig, weil eine falsche Annahme über eine Spalte nicht sichtbar scheitert, sondern eine glaubwürdig aussehende Zahl erzeugt.'
      }
    ],
    text: `# CLAUDE.md — Datenauswertung

<!-- Claude Code liest diese Datei automatisch, sobald du in diesem Ordner \`claude\` startest.
     Sie gilt dann für jede Antwort in diesem Projekt. Fang oben an: „Das werte ich hier aus"
     füllst du aus, der Rest kann so bleiben. -->

## Das werte ich hier aus

- **Datei:** noch offen — Name der Datei, die ausgewertet wird. Sie liegt im Ordner \`daten/\`.
- **Frage:** noch offen — welche Frage soll die Auswertung beantworten, in einem Satz.
- **Ergebnis:** noch offen — Zahlen auf dem Bildschirm, eine neue Datei oder beides.
- **Wiederholung:** noch offen — einmalig oder regelmäßig mit einer neuen Datei.

Solange irgendwo „noch offen" steht, fragst du mich danach, bevor du rechnest.

## Der Ablauf

Datei rein, verdichtete Zahlen raus. Ein Durchlauf, kein Dauerbetrieb: keine Datenbank, keine Anmeldung, kein Server. Die Auswertung ist eine Seite \`index.html\`, die ich per Doppelklick öffne und in die ich die Datei auswähle oder ihren Inhalt hineinkopiere. Gelesen wird sie im Browser, sie verlässt meinen Rechner nicht.

## Erst hinsehen, dann rechnen

Bevor du die erste Zahl berechnest, siehst du dir die ersten Zeilen an und schreibst mir sichtbar hin, was du vorgefunden hast:

- **Trennzeichen** — Semikolon oder Komma. Exporte aus deutschem Excel nutzen \`;\`.
- **Dezimaltrennung** — Komma (\`1,53\`) oder Punkt (\`1.53\`). Ein Prozentzeichen oder ein Tausenderpunkt in der Zelle macht aus der Zahl Text; das fällt beim Rechnen nicht auf, sondern erst am unplausiblen Ergebnis.
- **Kodierung** — stehen Umlaute richtig da oder als \`Ã¤\`.
- **Kopfzeile** — echte Spaltennamen, oder steht darüber noch eine Titelzeile.
- **Zeilen und Spalten** — gezählt, nicht geschätzt.
- **Format** — Breitformat oder Langformat, siehe nächster Abschnitt.

## Breitformat oder Langformat — benenne es

**Breitformat:** eine Zeile pro Person, eine Spalte pro Frage.

\`\`\`
Respondenten_ID;Alter_Bucket;Q1_Markenbekanntheit;Q2_Weiterempfehlung
R-0001;18-24;4;5
\`\`\`

**Langformat:** eine Zeile pro Antwort, die Frage steht als Wert in einer Spalte.

\`\`\`
Respondenten_ID;Frage;Antwort
R-0001;Q1_Markenbekanntheit;4
\`\`\`

Beide Formen sind üblich, und eine Auswertung, die für die eine gebaut ist, liefert für die andere trotzdem Zahlen — nur falsche. Genau das ist hier schon passiert: erwartet wurde Langformat, geliefert wurde Breitformat, und die Auswertung meldete stumm 33 Pseudo-Fragen statt der fünf tatsächlichen. Deshalb gilt:

1. **Schreib das erkannte Format ins Ergebnis**, gut sichtbar über den Zahlen, in Worten und mit Beleg: \`Format erkannt: Breitformat — 32 Datenzeilen, 5 Fragespalten (Q1 bis Q5)\`.
2. **Bist du unsicher, ratest du nicht.** Dann zeigst du mir die ersten drei Zeilen und fragst, welches Format es ist.
3. **Passt die Datei zu keinem der beiden Formate**, brichst du mit einer Meldung ab. Eine Fehlermeldung ist besser als eine Zahl, die niemand nachrechnet.

## Zahlen-Regeln

1. **Nichts erfinden.** Fehlt eine Spalte, sagst du das. Du suchst dir keine ähnlich heißende als Ersatz und rechnest nicht mit einem geschätzten Wert weiter.
2. **Nichts stumm wegwerfen.** Gib immer aus: Zeilen gelesen, davon verwertet, davon übersprungen — mit dem Grund fürs Überspringen.
3. **Erst am Schluss runden**, und nur auf so viele Stellen, wie die Ausgangsdaten hergeben. Ein Durchschnitt aus ganzen Zahlen ist nicht \`4,283719\`.
4. **Bezugsgröße immer dazu.** Nicht „Durchschnitt 4,1", sondern „Durchschnitt 4,1 über 28 von 32 Antworten".
5. **Prozent braucht einen Nenner.** Schreib dazu, worauf sich der Anteil bezieht und ob leere Antworten mitgezählt werden.
6. **Nichts geht ins Netz.** Kein Hochladen, kein Aufruf eines fremden Dienstes, keine nachgeladene Bibliothek. Die Auswertung läuft vollständig auf meinem Rechner.

## Dateien

\`\`\`
index.html   die Auswertung: Datei einlesen, prüfen, rechnen, anzeigen
daten/       die Rohdaten, unverändert — wird nie überschrieben
CLAUDE.md    diese Datei — Regeln für dich, kein Programmcode
\`\`\`

Die Rohdatei bleibt, wie sie ist. Korrekturen an den Daten passieren im Code, sichtbar und benannt, nicht durch stilles Überschreiben der Quelle.

## Das lässt du bleiben

- Keine Datei an einen Dienst schicken, auch nicht „nur kurz zum Prüfen".
- Keine Zeilen glätten, keine Ausreißer entfernen, keine Lücken auffüllen, ohne dass ich zugestimmt habe und es im Ergebnis steht.
- Keine Diagrammbibliothek aus dem Netz. Balken aus \`div\`-Elementen mit prozentualer Breite reichen völlig.
- Keine zweite Wahrheit: Eine Kennzahl wird an genau einer Stelle berechnet, nicht an dreien mit leicht abweichendem Ergebnis.
- Keine Zahl ohne Beschriftung. Eine nackte 4,1 ist keine Aussage.

## Fertig ist es, wenn

- Die Auswertung nennt das erkannte Format, bevor die erste Zahl kommt.
- Gelesene, verwertete und übersprungene Zeilen sind ausgewiesen und ergeben zusammen die Zeilenzahl der Datei.
- Eine Kennzahl habe ich in einer Tabellenkalkulation nachgerechnet und sie stimmt.
- Eine absichtlich kaputte Datei (falsches Trennzeichen, fehlende Spalte) führt zu einer Meldung, nicht zu einem Ergebnis.
- Die Browser-Konsole (F12) bleibt leer.
- Mit ausgeschaltetem WLAN läuft die Auswertung genauso.

## Wenn du unsicher bist

Frag nach. Besonders bei der Bedeutung einer Spalte, beim Umgang mit leeren Zellen und bei der Frage, worauf sich ein Prozentwert bezieht. Eine falsche Annahme über die Daten fällt nicht als Fehler auf, sondern als glaubwürdig aussehende Zahl — und die steht dann in einer Präsentation.
`
  },

  /* ============================================================ *
   * 3 · WEBSITE / EINSEITER                                      *
   * ============================================================ */
  {
    id: 'einseiter',
    name: 'Website / Einseiter',
    kurz: 'Projektanweisung für eine einzelne Seite zum Weitergeben — offline lauffähig, lesbar auf dem Handy, ohne Tracking.',
    wofuer: 'Für eine Seite, die etwas erklärt oder zeigt und dann geteilt wird: Kampagnenüberblick, Ergebnisseite, Einladung, internes Erklärstück. Kein Menü, keine Unterseiten.',
    passt: [
      'Der Inhalt steht im Wesentlichen fest und soll gut lesbar werden',
      'Die Seite wird verschickt oder verlinkt, oft auf dem Handy geöffnet',
      'Eine Seite reicht, ein Menü mit Unterseiten wäre zu viel',
      'Sie soll auch ohne Netz und als PDF-Ausdruck funktionieren'
    ],
    passtNicht: [
      'Jemand soll etwas eingeben und ein Ergebnis bekommen — das ist „Kleines Tool"',
      'Die Zahlen auf der Seite müssen erst aus einer Datei berechnet werden — dann fang mit „Datenauswertung" an',
      'Es sollen Angaben von Besuchern entgegengenommen werden — das geht ohne Server nicht und gehört nicht in diese Vorlage'
    ],
    tags: ['website', 'einseiter', 'landingpage', 'teilen', 'html', 'offline'],
    warum: [
      {
        abschnitt: 'Das steht auf der Seite',
        grund: 'Thema, Publikum, Kernaussage und Abschluss zuerst. Wer das überspringt, bekommt eine ansehnliche Seite, auf der nicht steht, was hängen bleiben soll.'
      },
      {
        abschnitt: 'Was hier „Einseiter" heißt',
        grund: 'Legt fest, dass es eine Seite bleibt. Ein Menü führt zu Unterseiten, Unterseiten führen zu einem Projekt, das man nicht mehr als einen Ordner verschicken kann.'
      },
      {
        abschnitt: 'So wird sie geöffnet und geteilt',
        grund: 'Nennt die drei Wege der Weitergabe und die technische Folge daraus: relative Pfade. Ein Pfad, der mit einem Schrägstrich beginnt, funktioniert beim Doppelklick nicht — das ist der häufigste Grund für leere Bilder beim Empfänger.'
      },
      {
        abschnitt: 'Harte Regeln',
        grund: 'Vor allem Regel 3: Alles, was aus dem Netz nachgeladen wird, fehlt genau dann, wenn es darauf ankommt — im Zug, im Kundentermin, im weitergeleiteten Ordner.'
      },
      {
        abschnitt: 'Aufbau der Seite',
        grund: 'Eine feste Reihenfolge erspart die Diskussion über die Gliederung und sorgt dafür, dass Kernaussage und Abschluss nicht im Mittelteil untergehen.'
      },
      {
        abschnitt: 'Dateien',
        grund: 'Zeigt, was mitgeschickt werden muss, damit die Seite beim Empfänger vollständig ist. Wer nur die HTML-Datei anhängt und die Bilder vergisst, merkt es selbst nicht.'
      },
      {
        abschnitt: 'Das lässt du bleiben',
        grund: 'Deckt die Punkte ab, die eine geteilte Seite unangenehm machen: fremde Server, Formulare ohne Empfänger, Animationen vor dem Text und erfundene Inhalte.'
      },
      {
        abschnitt: 'Fertig ist sie, wenn',
        grund: 'Prüft die Seite unter den Bedingungen, unter denen sie wirklich geöffnet wird: ohne Netz, auf schmalem Bildschirm, als Ausdruck — und von jemandem, der nicht dabei war.'
      },
      {
        abschnitt: 'Wenn du unsicher bist',
        grund: 'Fehlender Text ist bei Seiten der Normalfall. Die Regel dazu lautet: Lücke offen lassen und melden, statt sie mit Blindtext oder erfundenen Aussagen zu schließen.'
      }
    ],
    text: `# CLAUDE.md — Website / Einseiter

<!-- Claude Code liest diese Datei automatisch, sobald du in diesem Ordner \`claude\` startest.
     Sie gilt dann für jede Antwort in diesem Projekt. Fang oben an: „Das steht auf der Seite"
     füllst du aus, der Rest kann so bleiben. -->

## Das steht auf der Seite

- **Thema:** noch offen — worum geht es, in fünf Wörtern.
- **Wer liest das:** noch offen — Team, Kundschaft, Bewerbende, alle.
- **Was hängen bleiben soll:** noch offen — ein Satz, der nach dem Lesen im Kopf ist.
- **Was danach passieren soll:** noch offen — antworten, Termin buchen, etwas herunterladen oder schlicht Bescheid wissen.

Solange irgendwo „noch offen" steht, fragst du mich danach, bevor du baust.

## Was hier „Einseiter" heißt

Eine Seite, die man weitergibt. Man scrollt von oben nach unten und ist fertig. Kein Menü, keine Unterseiten, kein Blog, kein Login. Wenn ein Inhalt so umfangreich wird, dass er eine zweite Seite bräuchte, sagst du mir das, statt eine Navigation einzubauen.

## So wird sie geöffnet und geteilt

Doppelklick auf \`index.html\`, dann öffnet sich die Seite im Browser. Weitergegeben wird sie auf drei Wegen: als angehängte Datei, als gezippter Ordner oder auf einen Webspace gelegt. Alle drei müssen funktionieren. Daraus folgt eine technische Regel: **alle Pfade relativ**. \`bilder/logo.png\` funktioniert überall, \`/bilder/logo.png\` bleibt beim Doppelklick leer.

## Harte Regeln

1. **Eine Datei plus Bilder.** Aufbau, Aussehen und das wenige Verhalten stehen in \`index.html\`, Bilder liegen daneben im Ordner \`bilder/\`.
2. **Kein Build-Step, kein Generator, kein Framework.** Kein npm, kein React, kein Aufsetzen von Tailwind. Wer die Datei öffnet, soll den Text darin wiedererkennen.
3. **Vollständig offline.** Keine Google Fonts, keine CDN-Adresse, kein nachgeladenes Symbol-Paket, keine eingebettete Karte, kein Video von einem fremden Server. Für die Schrift reicht \`font-family: system-ui, sans-serif\`.
4. **Handy zuerst.** Der Entwurf muss bei 360 Pixel Breite funktionieren, alles Weitere ist Zugabe. Fließtext höchstens rund 70 Zeichen pro Zeile.
5. **Echte Struktur statt gestylter Absätze.** Genau eine \`<h1>\`, darunter \`<h2>\` für die Abschnitte. Jedes inhaltstragende Bild bekommt einen \`alt\`-Text. Wichtige Aussagen stehen als Text da, nicht in einer Bilddatei.
6. **Lesbarer Kontrast.** Dunkler Text auf hellem Grund oder umgekehrt, keine graue Schrift auf hellgrauem Grund. Links sind auch ohne Farbe als Link erkennbar.
7. **Kein Tracking.** Keine Analyse-Skripte, keine Zählpixel, kein Cookie-Banner. Es gibt nichts zu bannern. Wenn du meinst, hier fehle eines, ist versehentlich etwas eingebaut worden, das nicht hierher gehört.
8. **Text ist Inhalt, nicht Füllmaterial.** Kein Blindtext, keine erfundenen Zitate, Zahlen, Logos oder Kundennamen. Fehlt ein Text, lässt du die Stelle leer und sagst mir, was fehlt.

## Aufbau der Seite

1. **Kopf** — Titel und ein Satz, worum es geht. Ohne Scrollen lesbar.
2. **Kern** — drei bis fünf Abschnitte mit eigener Überschrift, je ein Gedanke.
3. **Abschluss** — was jetzt zu tun ist, mit Kontakt. Ein Mail-Link genügt.
4. **Fuß** — wer die Seite gemacht hat und von wann sie ist.

## Dateien

\`\`\`
index.html   die ganze Seite: Aufbau, Aussehen, Text
bilder/      alle verwendeten Bilder, relativ eingebunden
CLAUDE.md    diese Datei — Regeln für dich, kein Programmcode
\`\`\`

Weitergegeben wird immer der ganze Ordner. Wer nur \`index.html\` anhängt, verschickt eine Seite ohne Bilder.

## Das lässt du bleiben

- Keine Schriften, Symbole oder Bilder von fremden Adressen einbinden.
- Kein Formular, das Angaben irgendwohin sendet. Ohne Server geht das ohnehin nicht, ein Mail-Link ist die ehrliche Lösung.
- Keine Animation, die den Text erst nach Sekunden erscheinen lässt.
- Keine automatisch startenden Videos oder Töne.
- Keine Seite, die ohne JavaScript leer ist. Der Text steht im HTML.

## Fertig ist sie, wenn

- WLAN aus, Doppelklick: alles ist da, auch Bilder und Schriften.
- Bei 360 Pixel Breite muss man nicht seitlich schieben.
- Strg+P ergibt ein lesbares PDF — viele leiten Seiten so weiter.
- Die Browser-Konsole (F12) bleibt leer.
- Der Ordner als ZIP an mich selbst geschickt und wieder entpackt sieht genauso aus.
- Jemand, der nicht dabei war, liest die Seite in unter zwei Minuten und kann danach sagen, worum es ging und was zu tun ist.

## Wenn du unsicher bist

Frag nach, vor allem beim Text. Lieber eine offene Stelle mit dem Hinweis „hier fehlt mir eine Aussage von dir" als ein glatter Satz, den ich später jemandem gegenüber vertreten muss, ohne ihn geschrieben zu haben.
`
  }

];
