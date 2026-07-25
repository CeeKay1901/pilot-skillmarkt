# Schriften

Zwei Schriften, beide frei lizenziert, beide lokal eingebunden. Kein Google Fonts, kein CDN — eine Seite, die eine Schrift von einem fremden Server holt, verrät jedem Besuch an diesen Server und sieht ohne Netz anders aus.

## Warum die Schriftdateien nicht in diesem Ordner liegen

In diesem Paket sind **keine `.woff2`-Dateien**. Das ist Absicht.

Sie liegen im pilot AI Marketplace unter `assets/fonts/` und werden beim Packen des ZIP dazugelegt — genauso, wie es bei den drei Startprojekt-Gerüsten läuft. Eine zweite Kopie derselben Datei im Repo wäre ein zweiter Bestand: zwei Stände, die auseinanderlaufen, ohne dass jemand merkt, welcher der richtige ist.

## So schaltest du die Schriften ein

Zwei Schritte, in dieser Reihenfolge.

**Schritt 1 — die Dateien ablegen.** Leg diese drei aus dem Marketplace-Ordner `assets/fonts/` hierher:

```
assets/fonts/inter-variable.woff2           47 KB
assets/fonts/inter-variable-italic.woff2    51 KB
assets/fonts/jetbrains-mono-variable.woff2  39 KB
```

Der Ordner `assets/fonts/` muss **neben** `tokens.css` liegen, nicht darüber und nicht darunter.

**Schritt 2 — die Datei einbinden.** Ergänze im `<head>` deiner Seite eine Zeile, direkt nach `tokens.css`:

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="schriften.css">
```

In `index.html` steht diese Zeile schon drin, nur auskommentiert. Nimm die Kommentarzeichen weg, dann ist die Beispielseite in Inter gesetzt.

## Warum das nicht schon eingeschaltet ist

`schriften.css` ist absichtlich nicht vorab eingebunden. Eine `@font-face`-Regel schickt den Browser sofort los, die Schriftdatei zu holen — auch wenn sie nicht da ist. Solange die drei `.woff2` fehlen, meldet die Konsole dann zwei Fehler (`net::ERR_FILE_NOT_FOUND`, gemessen).

Dieses Paket sagt in seiner `CLAUDE.md`, dass die Browser-Konsole beim Öffnen leer bleiben muss. Ein Paket, das seine eigene Regel gleich beim ersten Öffnen bricht, taugt nicht als Maßstab. Deshalb ist das Einschalten ein sichtbarer Schritt statt einer stillen Fehlermeldung.

Solange die Schriften aus sind, greift die Ausweichliste aus `--font-sans` (Helvetica Neue, Arial, System-Sans). Die Beispielseite bleibt vollständig lesbar — Farben, Abstände, Ecken und Schatten stimmen alle. Nur die Schrift ist nicht die richtige.

## Inter

- **Wofür:** Überschriften, Fließtext, Knöpfe, Formulare — alles außer Code. Token `--font-sans`.
- **Art:** Variable Font, Gewichtsbereich 100–900, dazu ein eigener Schnitt für Kursiv.
- **Lizenz:** SIL Open Font License 1.1 — frei nutzbar, auch kommerziell, auch eingebettet in eine Website.
- **Urheber:** Rasmus Andersson.
- **Bezugsquelle:** `https://github.com/rsms/inter`
- **Lizenztext:** `https://github.com/rsms/inter/blob/master/LICENSE.txt`

## JetBrains Mono

- **Wofür:** Code, Terminal, Prompt-Ausschnitte — und im pilot-Marketplace zusätzlich für kleine Etiketten: Dachzeilen, Lizenz-Chips, Zahlenanzeigen. Token `--font-mono`.
- **Art:** Variable Font, Gewichtsbereich 100–800.
- **Lizenz:** SIL Open Font License 1.1.
- **Urheber:** JetBrains s.r.o.
- **Bezugsquelle:** `https://github.com/JetBrains/JetBrainsMono`
- **Lizenztext:** `https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt`

Die Adressen in diesem Abschnitt sind Herkunftsangaben zum Nachschlagen. Es wird von keiner Datei dieses Pakets etwas von dort geladen.

## Centra No1 — die offizielle Schrift, die hier fehlt

Die verbindliche pilot-Brand-Schrift heißt **Centra No1**. Sie ist **kommerziell lizenziert** und liegt diesem Paket **nicht** bei.

Inter ist der freie Ersatz, den der Marketplace real benutzt. Das ist eine bewusste Entscheidung dort und kein Provisorium — aber es heißt eben auch: Was du mit diesem Paket baust, ist in der offiziellen Brand-Schrift **nicht** gesetzt.

Wenn du etwas baust, das nach außen geht, klär die Schriftfrage vorher mit dem pilot-Brand- und KI-Enablement-Team. Verbindliches Brand-Material — Vorlagen, Logo-Guidelines, Schriftlizenzen — kommt ausschließlich von dort. Such dir keinen Nachbau von Centra No1 und benenn keine andere Schrift so um.

## Wenn du eine dritte Schrift brauchst

Brauchst du normalerweise nicht. Zwei Schriften reichen für alles, was dieses Paket abdeckt, und jede weitere macht das Ergebnis unruhiger, nicht besser.

Falls doch: Der Marketplace führt in seiner Bibliothek weitere frei lizenzierte Schriften (unter anderem Fraunces, Manrope, Newsreader, Plus Jakarta Sans, Space Grotesk, Syne, IBM Plex Mono) — jeweils mit Lizenz und Bezugsquelle. Nimm eine von dort, statt eine neue zu suchen.
