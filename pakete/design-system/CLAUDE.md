# CLAUDE.md — pilot-Design-Paket

<!-- Claude Code liest diese Datei automatisch, sobald jemand in diesem Ordner `claude` startet.
     Sie gilt dann für jede Antwort in diesem Projekt.

     WARUM DIESE DATEI HIER ALS ECHTE DATEI LIEGT (und nicht, wie bei den drei
     Startprojekt-Gerüsten, als Text in `data/anweisungen.js`):
     Die Gerüste unter `startprojekte/` haben bewusst KEINE CLAUDE.md auf der Platte.
     Ihre kommt beim Packen des ZIP aus `data/anweisungen.js`, weil sie 1:1 einer dort
     vorhandenen Vorlage entspricht — zwei Kopien desselben Textes wären ein zweiter
     Bestand, der auseinanderläuft.
     Hier ist die Lage anders: Designregeln für ein Paket sind keine Projektstart-Vorlage.
     Ein `ANWEISUNGEN`-Eintrag ist eine kopierfertige CLAUDE.md für genau einen der drei
     Projekttypen (einseiter · kleines-tool · datenauswertung). Er trägt dazu die Felder
     `passt`, `passtNicht` und `warum`, und jede `warum[].abschnitt` muss WÖRTLICH im
     `text` vorkommen (geprüft von `tests/e12-anweisungen.cjs`, Check 03). Diese Datei
     hier ist nichts davon: sie beschreibt kein Projekt, das jemand startet, sondern wie
     etwas aussehen soll. Es gibt in `ANWEISUNGEN` keinen Eintrag, dem sie entspräche.
     Deshalb steht der Text hier, im Ordner, als richtige Datei.

     KORREKTUR 2026-07-25: An dieser Stelle stand zuvor, ein vierter `ANWEISUNGEN`-Eintrag
     würde „den Test e12 (`EXPECTED_TOTAL = 3`)" nachziehen. Das war falsch. Nachgesehen:
     `tests/e12-anweisungen.cjs` enthält die Zeichenkette `EXPECTED_TOTAL` überhaupt nicht;
     die Suite leitet ihre Sollzahl zur Laufzeit aus `ANWEISUNGEN.length` ab (Check 01,
     `abschnitt.kartenAnzahl === daten.length`). Hartcodierte `EXPECTED_TOTAL` gibt es nur
     in `e7-baukasten.cjs` (BAUSTEINE = 12) und `e8-showroom.cjs` (CASES = 10). Kein Test
     verbietet also einen vierten Eintrag. Die Begründung oben trägt auch ohne diese
     Behauptung — aber eine erfundene Fundstelle in genau der Datei, die weiter unten
     „Erfinde keine Fundstelle" fordert, durfte nicht stehen bleiben.
     Das ist kein Versehen und keine Inkonsistenz — bitte nicht „aufräumen". -->

## Was das hier ist

Ein Paket zum Mitnehmen. Darin stecken die Farben, Schriftregeln, Abstände und Bausteine, mit denen der pilot AI Marketplace gebaut ist. Du sollst damit etwas bauen, das aussieht, als gehörte es dazu.

Alle Werte in diesem Paket sind aus `shared/base.css` des Marketplace abgeschrieben, nicht neu erfunden. Wo eine Regel eine Fundstelle hat, steht sie dabei — in der Form `base.css:151`. Wo keine Fundstelle steht, ist es ein **Vorschlag**, und das Wort steht dann auch da.

**Was dieses Paket nicht ist:** Verbindliches, offizielles Brand-Material — Vorlagen, Logo-Guidelines, Schriftlizenzen — kommt ausschließlich vom pilot-Brand- und KI-Enablement-Team. Dieser Bausatz bildet nur die real im Marketplace genutzten Tokens und Logos ab. Wenn etwas nach außen geht, frag dort nach, bevor du dich auf diesen Ordner verlässt.

## Dateien

```
index.html     Beispielseite. Zeigt jeden Baustein einmal in echt.
               Per Doppelklick zu öffnen, ohne Server, ohne Netz.
tokens.css     Die Farben, Größen, Radien und Schatten als CSS-Variablen.
               Das ist die Datei, die du in dein Projekt einbindest.
schriften.css  Die drei @font-face-Blöcke. Standardmäßig NICHT eingebunden,
               siehe unten.
schriften.md   Woher die Schriftdateien kommen und unter welcher Lizenz.
CLAUDE.md      diese Datei — Regeln für dich, kein Programmcode.
```

`index.html` ist zum Anschauen und Abgucken da, nicht zum Weiterbauen. Fang ein neues Projekt mit einer leeren Datei an und bind `tokens.css` ein.

**Warum `schriften.css` nicht schon eingebunden ist:** Die drei `.woff2`-Dateien liegen nicht in diesem Paket, sondern kommen erst beim Packen des ZIP dazu. Eine `@font-face`-Regel schickt den Browser trotzdem sofort los — gemessen sind das zwei `net::ERR_FILE_NOT_FOUND` in der Konsole. Ein Paket, das seine eigene Regel „null Fehler in der Konsole" beim ersten Öffnen bricht, ist unbrauchbar als Maßstab. Sobald `assets/fonts/` daneben liegt, hängst du im `<head>` eine Zeile dazu:

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="schriften.css">
```

Bind `schriften.css` **nicht** ein, bevor die Dateien da sind.

## Die eine Zahl, die alles kippt

```css
html { font-size: 10px; }
```

Der Marketplace stellt die Grundschriftgröße auf 10 Pixel (`base.css:151`). Deshalb heißt in allen Werten hier `1rem` genau **10 Pixel**, nicht 16. `--r-lg: 1.6rem` sind also 16 Pixel, nicht 26.

Wenn du diese Zeile weglässt, wird jede Größe im Paket um Faktor 1,6 zu groß. Setz sie als Erstes, bevor du irgendetwas anderes stylst.

## Schrift

- **Inter** für alles Normale: Überschriften, Fließtext, Knöpfe, Formularfelder. Token `--font-sans` (`base.css:118`).
- **JetBrains Mono** für Technisches und für kleine Etiketten: Code, Terminal, Dachzeilen über Überschriften, Lizenz-Chips, Zahlenanzeigen. Token `--font-mono` (`base.css:119`). In `base.css` steht `var(--font-mono)` an 67 Stellen — Mono ist dort kein Code-Sonderfall, sondern die Sprache der kleinen Beschriftungen.
- **Die offizielle pilot-Brand-Schrift ist „Centra No1".** Sie ist kommerziell lizenziert und liegt diesem Paket **nicht** bei. Inter ist der freie Ersatz, den der Marketplace real benutzt (`data/assets.js`, `BRAND.ci.typo.hinweis`). Bau nichts, das behauptet, Centra No1 zu sein, und such keinen Nachbau.
- **Schriftgewichte:** im Bestand sind 500, 600 und 700 in Gebrauch — gezählt in `base.css`: 700 kommt 49-mal vor, 600 40-mal, 500 16-mal. Die Tokens `--fw-reg` (450) und `--fw-semi` (640) existieren, werden aber nur an fünf Stellen benutzt. Nimm für neue Sachen die drei Zahlen 500/600/700 und bleib dabei. Kein 300, kein 900.
- Schriften werden **lokal** eingebunden. Kein Google Fonts, kein CDN — im Marketplace steht das wörtlich über den Schriftblöcken: „FONTS (lokal, variable — kein CDN)" (`base.css:6`). Die fertigen `@font-face`-Blöcke liegen in `schriften.css`, die Herkunft und Lizenz in `schriften.md`.

## Farbe

Alle Farbwerte stehen in `tokens.css`. Greif sie über `var(--name)` ab und schreib keinen Hex-Wert direkt in dein CSS.

**Die Grundverteilung:**

- Hintergrund der Seite: `--c-bg-deep`. Flächen, die daraufliegen (Karten, Panels): `--paper`. Ränder: `--line` (`base.css:36, 37, 79`).
- Text: `--c-black`. Langer Fließtext: `--c-ink-strong`. Text in Karten und Zitaten: `--c-ink-body`. Nebentext, Meta, Beschriftungen: `--c-gray-m`. Die Rollen stehen als Kommentar an den Tokens selbst (`base.css:72–74`).
- `--c-gray-m` (#66655d) ist die **hellste** Farbe, die du für Text benutzen darfst. Sie ist nachgemessen: 5,86:1 auf Weiß, 4,99:1 im schlechtesten Fall (`base.css:72`). Alles Hellere fällt unter die Lesbarkeitsgrenze.

**Gelb** (`--c-yellow`, #ffe05e) ist der Akzent und hat feste Regeln:

1. **Gelb ist nie Fließtext auf hellem Grund.** Gelber Text kommt im ganzen Marketplace nur auf schwarzer Fläche vor — Dachzeile im Header (`base.css:189`), Marken-Zeile im Fußbereich (`base.css:526`), Label im dunklen Band (`base.css:1507`). Auf Papier wäre es unlesbar.
2. **Gelbe Fläche trägt immer schwarzen Text.** Der Kontrast ist 11,58:1 (`base.css:328`). Nie Weiß auf Gelb.
3. **Ein gelber Moment pro Sichtbereich.** Der Textmarker-Effekt `.mk` ist ausdrücklich sparsam einzusetzen, „ein Marker-Moment pro Sichtbereich" (`base.css:249`). Beim Hover gilt dasselbe: „eine gelbe Geste pro Hover, nicht zwei" (`base.css:306`).
4. **Ein bis zwei dunkle Momente pro Seite.** Das schwarze Band mit gelbem Label und gelbem Knopf ist der Anker einer Seite, kein Muster, das sich wiederholt (`base.css:1499`).
5. Gelb markiert: den aktiven Reiter (`base.css:617`), den gedrückten Stimmen-Knopf (`base.css:2413`), den wichtigsten Knopf (`base.css:629`), den Hover einer Karte (`base.css:309`). Es sortiert nicht und es warnt nicht.

Für Warnungen und Fehler gibt es `--c-warn` und `--c-err` (`base.css:87, 88`). Erfinde dafür kein Rot und kein Grün dazu.

## Abstände, Ecken, Schatten

**Ecken.** Es gibt sechs Radien: `--r-xs` bis `--r-pill` (`base.css:106–111`). Benutz nur diese. Nachgezählt in `base.css` (Kommentare abgezogen): 96 `border-radius`-Angaben, davon 80 auf einem dieser Tokens. Von den übrigen 16 sind 6 ein `50%` für runde Flächen und 2 ein `0` zum Zurücksetzen — beides Sonderfälle, keine Skala. Die letzten 8 sind feste rem- und px-Werte, also alte Reste und kein Vorbild.

Feste Zuordnungen aus dem Bestand:

- Inhaltskarte im Raster: `--r-lg` (16px). Das ist ausdrücklich entschieden und begründet (`base.css:1819–1822`).
- Knöpfe, Chips, Etiketten: `--r-pill` (Knopf `base.css:623`, Chip `base.css:259`, Etikett `base.css:333`).
- Eingabefelder und kleine Kästen: `--r-sm` (Feld `base.css:1185`, Hinweiskasten `base.css:1158`).

**Schatten.** Drei Stück: `--shadow-sm`, `--shadow-md`, `--shadow-lg` (`base.css:136–139`). Sie sind auf Ink getönt (`rgba(38,38,38,…)`), nicht auf reines Schwarz. Karten liegen im Ruhezustand auf `--shadow-sm`. Schreib keinen eigenen `box-shadow` mit `rgba(0,0,0,…)`.

**Der Hover einer Karte** ist kein weicher Schatten, sondern ein harter versetzter Block:

```css
transform: translate(-2px, -2px);
box-shadow: 6px 6px 0 var(--c-yellow);
border-color: var(--c-black);
```

Das ist die Karten-Sprache des Marketplace (`base.css:307–311`). Übernimm sie unverändert.

**Seitenränder.** `--pad-d` ist der Rand links und rechts: 8rem am Desktop, ab 1023 Pixel Fensterbreite auf 2rem heruntergesetzt (`base.css:102, 814–818`). Die Inhaltsbreite ist auf `--max-w` (144rem) begrenzt.

**Abstände zwischen Elementen — Vorschlag.** Dafür gibt es im Marketplace **kein Token**; die Werte stehen direkt an den Komponenten. Gezählt sind die häufigsten: `.4 · .5 · .6 · .8 · 1 · 1.2 · 1.4 · 1.6 · 1.8 · 2 · 2.4rem`. Als Vorschlag: bleib bei diesen Werten, statt beliebige Zwischengrößen zu setzen. Das ist eine beobachtete Gewohnheit, keine belegte Regel.

## Bausteine

`index.html` zeigt jeden einmal fertig. Guck dort ab, statt neu zu erfinden.

- **Seitenkopf:** Dachzeile in Mono mit gelbem Klotz davor, darunter die H1, darunter ein Satz in `--c-gray-m` (`base.css:223–241`).
- **Karte:** `--paper`, 1px `--line`, `--r-lg`, `--shadow-sm`, plus der Hover von oben (`base.css:292–302`). Diese vier zusammen sind ausdrücklich **ein** Primitiv — im Marketplace wurden drei abweichende Kombinationen für dieselbe Rolle bewusst darauf zusammengeführt (`base.css:1819–1822`).
- **Knopf:** eine Form, vier Varianten — gelb gefüllt, schwarz gefüllt, schwarz umrandet, gelb umrandet (`base.css:621–637`). Der wichtigste Knopf einer Seite ist der gelbe, und es gibt genau einen davon.
- **Eingabefeld:** `--c-white`, 1px `--c-gray-l`, `--r-sm`; im Fokus wird der Rand schwarz (`base.css:1183–1189`). Jedes Feld hat ein sichtbares `<label for="…">`.
- **Hinweiskasten:** `--c-bg` als Fläche, **gestrichelter** Rand `--line-strong`, `--r-sm`, Text in Mono (`base.css:1154–1160`). Der gestrichelte Rand bedeutet im Bestand: „das hier ist ein Hinweis, kein Inhalt".
- **Tabelle — Vorschlag.** Für Tabellen gibt es in `base.css` **keine** Komponente. Die in `index.html` ist aus vorhandenen Tokens zusammengesetzt: Kopfzeile in Mono und Versalien, Zeilentrenner `--line`, Zahlen rechtsbündig mit `font-variant-numeric: tabular-nums`. Übernimm sie, aber wisse, dass sie ein Vorschlag ist und keinen Bestand hinter sich hat.

## Das lässt du bleiben

- **Keine neue Farbe.** Wenn dir eine fehlt, sag das, statt eine dazuzumischen.
- **Kein CDN, keine Google Fonts, kein `fetch` auf eine fremde Adresse.** Alles liegt lokal, sonst ist die Seite ohne Netz leer.
- **Kein Framework, kein Build-Step.** Kein React, kein Tailwind, kein npm. HTML, CSS und JavaScript, wie sie sind.
- **Kein gelber Text auf hellem Grund** und kein weißer Text auf Gelb.
- **Deckkraft nicht zum Abschwächen von Text benutzen.** `opacity: .6` auf grauem Text ist nicht prüfbar und fällt regelmäßig unter die Lesbarkeitsgrenze. Setz stattdessen eine echte Farbe, also `--c-gray-m`. (Regel des Marketplace, nicht von mir erfunden: `CLAUDE.md` in der Repo-Wurzel, Abschnitt „Fallen". Wie so ein Fall aussieht, steht in `base.css:386–391`.)
- **Das pilot-Logo nicht verändern:** nicht neu zeichnen, nicht einfärben, nicht verzerren, nicht in ein anderes Zeichen einbauen. Schutzraum und Mindestgröße klärt das Brand-Team.
- **Nicht behaupten, das sei die offizielle Brand-Vorlage.** Ist es nicht, siehe oben.
- **Die Schriftdateien nicht in diesen Ordner kopieren.** Sie liegen im Marketplace unter `assets/fonts/` und kommen beim Packen dazu. Zwei Kopien derselben Datei sind ein zweiter Bestand.

## Fertig ist es, wenn

- Doppelklick auf `index.html` öffnet die Seite, und jeder Baustein ist da: Kopfbereich, Überschriften, Fließtext, Knöpfe in ihren Zuständen, Karte, Tabelle, Formularfeld, Hinweiskasten. Keine leere Fläche, kein abgeschnittener Kasten.
- Die Browser-Konsole (F12) zeigt **null** Fehler.
- Mit ausgeschaltetem WLAN sieht die Seite genauso aus. Im Netzwerk-Reiter steht keine einzige Anfrage an eine fremde Adresse.
- Eine Suche nach `http://` und `https://` im ganzen Ordner findet Treffer **nur** in Quellen- und Lizenzangaben — nie in `src=`, `href=` oder `url(...)` von etwas, das geladen wird.
- Bei 360 Pixel Fensterbreite ist alles lesbar und bedienbar, ohne seitliches Schieben. Bei 320 Pixel ebenfalls.
- Jeder Farbwert und jede Zahl in `tokens.css` steht wörtlich so in `shared/base.css`. Nichts ist gerundet, umgerechnet oder ausgedacht.
- Jede Regel in dieser Datei, die etwas über das Aussehen des Marketplace behauptet, nennt entweder ihre Fundstelle oder trägt das Wort „Vorschlag". (Die Verbote unter „Das lässt du bleiben" sind Projektregeln und keine Aussagen über `base.css` — wo sie eine Quelle haben, steht sie dabei.)
- Jede Zeilenangabe der Form `base.css:<zahl>` trifft. Nachgeprüft am 25.07.2026, Zeile für Zeile gegen `shared/base.css` (2.239 Zeilen).
- Der Hinweis, dass offizielles Brand-Material vom pilot-Brand- und KI-Enablement-Team kommt und Centra No1 nicht beiliegt, steht sichtbar auf der Beispielseite **und** in dieser Datei.
- Im Ordner liegt keine einzige `.woff2`-Datei.
- `schriften.css` ist genau dann eingebunden, wenn `assets/fonts/` daneben liegt — sonst nicht.
- Tab erreicht jeden Knopf und jedes Eingabefeld, und man sieht dabei, wo der Fokus steht: beim Knopf am Fokusring, beim Eingabefeld am schwarz werdenden Rand.

## Wenn du unsicher bist

Frag nach, bevor du baust. Besonders bei allem, was nach außen sichtbar wird: Logo-Einsatz, Schriftlizenz, Farbabweichung. Eine Rückfrage kostet eine Minute. Eine Seite, die nach pilot aussehen soll und es nicht darf, kostet mehr.

Und wenn du eine Regel brauchst, die hier nicht steht: sag, dass sie nicht belegt ist, und schlag sie als Vorschlag vor. Erfinde keine Fundstelle.
