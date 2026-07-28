# Herkunft der Motive in diesem Ordner

Alle Dateien hier sind **mit KI erzeugt** — mit [Unsora](https://tryunsora.com), Modell
`nano-banana-2`, am 28.07.2026. Es gibt keine fremde Vorlage, kein fremdes Bildmaterial und
keinen abfotografierten Gegenstand. Die Prompts stehen unten.

## Rechtelage — offen, und das steht hier so

Anders als bei den Fotos in `assets/bilder/` gibt es hier **keine geprüfte Lizenz**, die
zitiert werden könnte. Unsoras Nutzungsbedingungen äußern sich zum Eigentum an **erzeugten**
Ausgaben nicht: Der Satz „You retain ownership of your content" bezieht sich auf hochgeladene
Inhalte; kommerzielle Nutzungsrechte an Ausgaben werden nirgends eingeräumt (geprüft am
28.07.2026).

Daraus folgt bewusst **kein erfundenes Lizenzkürzel**. Es folgt aber auch keine Verschleierung:
Die Motive sind Gestaltung dieser Seite. Sie werden **nicht als Übungsmaterial zum Mitnehmen
angeboten** und stehen deshalb auch **nicht** in `data/bilder.js` — dort liegt nur Material, für
das die Nutzungsrechte belegt sind. Wer ein Motiv weiterverwenden will, insbesondere in
Kundenarbeit, klärt das vorher mit dem KI-Enablement-Team.

## Aufbereitung — die Farben sind nachgerechnet, nicht geraten

Das Modell trifft die pilot-CI nur ungefähr: Das Papier kam cremig (`#EFEBE0` statt `#F1F1EC`),
das Gelb als Zitrone (`#FFEE37` statt `#FFE05E`). Jedes Motiv wurde deshalb nachbearbeitet. Die
drei Druckfarben werden im Bild bestimmt, dann wird **jeder Pixel um die Differenz seiner
Farbgruppe verschoben** statt hart ersetzt — dadurch bleiben Papierkorn und Halbtonraster
erhalten, während die Farbmittel auf den CI-Tokens landen. Gemessene Restabweichung: Schwarz
exakt, Papier und Gelb höchstens 6 von 255.

Zwei Fallen dabei, beide real aufgetreten, beide korrigiert:

1. **Nicht auf den Mittelwert rechnen.** Der Gelb-Mittelwert lag scheinbar fast auf dem Ziel,
   während die satte Gelbfläche weit daneben lag — blasse Halbtonpunkte zogen den Durchschnitt
   in die Gegenrichtung. Gerechnet wird auf den **häufigsten** Ton je Farbe.
2. **Keine festen Perzentile zur Farbfindung.** Ein Perzentil setzt voraus, dass jede Farbe
   einen Mindestanteil hat. Das Schubladen-Motiv besteht zu 93 Prozent aus Papier — seine
   dunkelsten 12,5 Prozent sind immer noch Papier, und das Verfahren hielt daraufhin ein Tan
   für Schwarz und zog das halbe Bild ins Dunkle. Erkannt wird jetzt über **absolute**
   Schwellen: Gelb an seiner Gelbheit `(r+g)/2 − b`, Schwarz an seiner Helligkeit.

Ebenfalls verworfen: die Korrektur mehrfach zu wiederholen. Das sah nach Konvergenz aus,
divergierte aber — beim Motiv `lernen` meldete der zweite Durchlauf einen Restfehler von 216 und
trieb das Schwarz auf `#020212`. Die Farben werden **einmal** am Original gemessen und **einmal**
angewendet.

`korn.webp` ist der Sonderfall: reine Textur ohne Farbidentität, ein Drei-Farben-Modell hat dort
nichts zu greifen. Es liegt als **Graustufe** vor, die Farbe kommt aus dem CSS-Untergrund.

Format: WebP, Qualität 0,86 — `auftakt` und `korn` mit 0,72, weil beide sonst unverhältnismäßig
schwer werden (Rauschen komprimiert praktisch nicht). Kodiert mit Chromium über
`canvas.toDataURL`; die Umgebung hat weder cwebp noch ImageMagick noch Pillow.

## Einbindung

Alle Motive liegen als **CSS-Hintergrund**, nicht als `<img>`. Sie sind rein dekorativ und haben
in der Vorlesereihenfolge nichts verloren; der Text trägt die Aussage überall vollständig. Wer
sie nicht sieht, verliert keine Information. Die Seitenkopf-Motive entfallen unter 900 px — dort
ist der Platz für die Überschrift wichtiger als die Wiedererkennung.

## Dateien

- `analogie-kochbuch.webp` · 720×538 px · 32.644 Bytes · Onepager „Was sind Skills?", Typ-Karte Plugin
- `analogie-methode.webp` · 720×538 px · 22.000 Bytes · Onepager „Was sind Skills?", Typ-Karte Framework
- `analogie-rezept.webp` · 720×538 px · 19.102 Bytes · Onepager „Was sind Skills?", Typ-Karte Skill
- `auftakt.webp` · 1400×422 px · 115.316 Bytes · Band unter dem Auftakt der Startseite (beschnitten auf Flieger und Gelblinie)
- `baukasten.webp` · 660×447 px · 39.130 Bytes · Bereichs-Karte Baukasten
- `bibliothek.webp` · 800×447 px · 41.612 Bytes · Bereichs-Karte Asset-Bibliothek + Seitenkopf `vorlagen.html`
- `katalog.webp` · 800×447 px · 28.766 Bytes · Bereichs-Karte Skill-Katalog + Seitenkopf `skills.html`
- `korn.webp` · 400×400 px · 80.860 Bytes · Papierkorn auf den dunklen Einreichen-Bändern (Graustufe)
- `leer-sachen.webp` · 600×448 px · 26.406 Bytes · Leerer Zustand „Deine Sachen" auf der Startseite
- `leer-treffer.webp` · 600×448 px · 11.014 Bytes · Leerer Zustand `.empty-note` (alle Seiten)
- `lernen.webp` · 800×447 px · 28.886 Bytes · Bereichs-Karte Lernen & Hilfe + Seitenkopf `lernen-hilfe.html`
- `og.webp` · 1200×670 px · 149.088 Bytes · Hintergrund des Link-Vorschaubilds `og-image.png`
- `prompts.webp` · 786×440 px · 77.998 Bytes · Bereichs-Karte Prompt-Sammlung + Seitenkopf `prompts.html`
- `showroom.webp` · 800×447 px · 27.316 Bytes · Bereichs-Karte Showroom + Seitenkopf `showroom.html`

Zusammen: 700.138 Bytes.

`og-image.png` liegt in der Wurzel, nicht hier — es ist kein Motiv, sondern das fertige
Vorschaubild: Motiv `og.webp` als Hintergrund, Text mit echter Schrift darübergesetzt und per
Chromium bei 1200×630 abfotografiert. Der Text ist bewusst **nicht** generiert; erzeugte
Schrift wird zu Buchstabensuppe. Auf 5 Bit je Kanal posterisiert (637 KB → 265 KB), ohne
sichtbares Banding.

## Prompts

Alle Motive teilen sich denselben Stil-Zusatz:

> Two-colour risograph print, grainy duotone, ink colours strictly limited to deep charcoal
> black and fluorescent warm yellow printed on warm beige paper. Visible paper grain and
> halftone dot texture, slight misregistration offset between the two ink layers. Flat shapes
> only, no gradients, no 3D rendering, no realistic shading, no perspective depth. Absolutely
> no text, no letters, no numbers, no logos, no symbols resembling writing. Calm editorial
> composition with generous empty paper space.

Davor steht je Motiv die Beschreibung des Gegenstands: überlappende Kartenraster (Katalog),
Sprechblasen mit Linien statt Schrift (Prompts), Farbfelder mit Musterbögen (Bibliothek),
auseinandergezogene Bauteile (Baukasten), eine Wand leerer Bilderrahmen (Showroom),
aufgeschlagene Seiten mit Lesebändchen (Lernen), ein Layoutraster (OG), fliegende Papierflieger
(Auftakt), ein leeres Brett mit einer Nadel (leer-sachen), eine leere Schublade mit Fächern
(leer-treffer), Papierkorn (korn), eine Rezeptkarte (Analogie Skill), ein Kochbuchstapel mit
Lesebändchen (Analogie Plugin), ein Kreislauf-Diagramm (Analogie Framework).
