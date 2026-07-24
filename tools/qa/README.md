# tools/qa — Prüfwerkzeuge

Wiederverwendbare Qualitätsprüfungen für den Marketplace. Jede davon ist aus einem **real aufgetretenen Fehler** entstanden — und jede enthält im Code die Falle, die beim ersten Bauen zu einem Fehlbefund geführt hat. Das ist der eigentliche Wert: Die Werkzeuge wissen, wie man sich hier vermisst.

```bash
node tools/qa/index.mjs <prüfung> [basis-url]     # Standard: http://localhost:8401/
```

| Prüfung | Findet | Entstanden aus |
|---|---|---|
| `kontrast` | WCAG-Kontrast **inkl. kumulierter Deckkraft** | Zähler waren per `opacity` auf 2,07:1 gedrückt — keine naive Prüfung sah das je |
| `zaehler` | Reiter, die mehr versprechen als sie liefern | „Texten 5" lieferte unter aktiver Suche **null** — auf vier Seiten |
| `robust` | Absturz durch vergifteten localStorage | Ein `null` im Speicher leerte den kompletten Katalog |
| `responsive` | Body-Overflow, unerreichbare Bedienelemente, Tap-Ziele | Der Such-Button ragte zwischen 1024 und 1052 px aus dem Bild |
| `a11y` | WCAG-Verstöße via axe-core | ergänzt die eigenen Prüfungen um etablierte Regelwerke |
| `links` | Link-Rot in `data/*.js` | ein Artikel rutschte unbemerkt hinter eine Paywall |
| `manifest` | Skill-Dateiliste vs. Platte | Viewer zeigt sonst veraltete Dateien |
| `aufraeumen` | verwaiste Browser-Prozesse | **Ursache der Termux-Abstürze**, siehe unten |
| `alles` | kontrast + zaehler + robust + responsive | |

Exit-Code 0 = sauber, 1 = mindestens ein Befund.

## Drei Fallen, die hier fest verdrahtet sind

**Einblend-Animationen.** Die Seite blendet Inhalte per IntersectionObserver ein. Wer das nicht erzwingt, misst Elemente mit `opacity: 0`. Eine komplette Kontrastprüfung meldete deswegen einmal „Alpha 0" für alles. `lib.mjs` erzwingt `.anim-reveal`→`.in-view` und `.cat-reveal`→`.in` vor jeder Messung.

**Kumulierte Deckkraft.** Eine Prüfung, die nur `color` gegen `background-color` rechnet, übersieht die halbe Fehlerklasse. Lehre fürs Projekt: **Deckkraft taugt nicht zur Text-Abschwächung**, weil sie nicht prüfbar ist — immer eine echte Farbe setzen.

**Stilles Überspringen.** Ein falscher Selektor erzeugt keinen Fehler, sondern eine Lücke, die in der Ausgabe wie „ok" aussieht — die gefährlichste Fehlmessung überhaupt. `zaehler` bricht deshalb **hart ab**, wenn ein Selektor nicht greift, statt weiterzulaufen.

## Warum axe-core und nicht Pa11y oder Lighthouse

`vendor/axe.min.js` ist eine einzelne Browser-Datei ohne Abhängigkeiten. Sie wird per `addScriptTag` in die schon geladene Seite injiziert und läuft in **derselben** Chromium-Instanz — kein npm-Projekt, kein Build-Step, kein zweiter Browser. Pa11y und Lighthouse bringen je eine eigene Browser-Kette mit; auf Termux ist der Speicher der Engpass.

Aktualisieren:
```bash
curl -sSo tools/qa/vendor/axe.min.js https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js
```

**Wichtige Einschränkung:** axe deckt nur automatisch Prüfbares ab. Tastaturbedienung, Fokusreihenfolge, sinnvolle Alternativtexte und Verständlichkeit bleiben Handarbeit. „axe sagt sauber" heißt **nicht** „barrierefrei".

## `aufraeumen` — gegen die Termux-Abstürze

Wird ein Playwright-Skript abgebrochen, überlebt sein `headless_shell` und wird an init durchgereicht (**PPID 1**). Diese Waisen sammeln sich an. Gemessen mitten in einer Sitzung: 6 Waisen = 119 MB, bei nur **97 MB freiem RAM** und 3,5 GB bereits belegtem Swap. Androids Low-Memory-Killer greift sich dann den größten Prozess — Claude Code selbst. Genau so entstehen die scheinbar grundlosen Sitzungsabbrüche.

`aufraeumen` beendet **ausschließlich** Prozesse mit PPID 1; Browser mit lebendem Elternprozess gehören einem laufenden Skript und bleiben unangetastet. Bei langen Sitzungen regelmäßig laufen lassen, und **nicht mehr als zwei Playwright-Agenten gleichzeitig** beschäftigen.
