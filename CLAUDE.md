# CLAUDE.md — Arbeitsanleitung für dieses Repo

Kurz und verbindlich. Alles hier ist an der laufenden Seite verifiziert, nicht aus dem Gedächtnis notiert.

---

## Was das hier ist (Scope — zuerst lesen)

Der **pilot AI Marketplace** ist die **Arbeitsschnittstelle der Citizen-Coding-Projektgruppe** bei pilot (Media-Agentur, Hamburg) und **stellt deren Nutzern Ressourcen bereit**.

Er ist ausdrücklich **keine Demo, kein Showcase, kein Marketing-Artefakt**. Der Maßstab für jede Änderung ist **Arbeitstauglichkeit**: Auffindbarkeit, Vollständigkeit, Verlässlichkeit, Aktualität. Bei Zielkonflikten gewinnt „die Gruppe findet und nutzt die Ressource" gegen „sieht beeindruckend aus". Inszenierung ist Mittel, nie Selbstzweck.

**Zielgruppe:** Kolleg:innen ohne Software-Hintergrund, die von **Langdock** (Chat-KI) kommen und jetzt mit **Claude Code** eigene kleine Tools bauen. Also: keine Entwickler-Sprache, Fachbegriffe erklären, Analogien vor Technik.

**Stand der Trajektorie:** Die **Konsumseite ist echt und fertig** (Ressourcen finden, filtern, herunterladen). Die **Beitragsseite ist noch simuliert** — `openSubmitFlow` („Einreichen") ist ein Demo-Flow mit localStorage-Entwurf und reicht nichts ein; Bewertungen/Votes/Favoriten sind rein lokal pro Person. Zielbild ist die Zweiwege-Schnittstelle mit echten geteilten Signalen; der nächste substanzielle Schritt liegt in Persistenz/Backend, nicht im Design.

---

## Harte Regeln

1. **Kein Build-Step.** Vanilla HTML/CSS/JS. Die Seite muss auch per `file://` laufen. Keine Bundler, keine npm-Abhängigkeiten zur Laufzeit, keine externen CDNs.
2. **Zahlen-Ehrlichkeit.** Jede angezeigte Zahl muss aus den echten Daten berechnet sein. **Nie eine Zahl hart in den Fließtext tippen**, die aus einem Array kommt — sie driftet garantiert. Muster im Bestand: `<span id="page-sub-count">35</span>` wird zur Laufzeit aus `VISIBLE_SKILL_COUNT` überschrieben.
3. **Demo-Kennzeichnung bleibt.** Bewertungen, Votes, Stimmen und Personas sind Seed-Werte und überall als Demo gekennzeichnet. Diese Kennzeichnung nie entfernen, solange es kein Backend gibt.
4. **Echt vs. inszeniert bleibt getrennt.** Im Showroom tragen Karten „Echtes Team-Tool" bzw. „Beispiel-Projekt". Inszenierte Cases werden **fiktiven Personas** zugeordnet, nie der realen Person, unter deren Namen echte Tools laufen.
5. **Sprache:** Deutsch, **Du-Form**. Ausnahme: der Seiten-Claim spricht die Gruppe kollektiv mit „ihr" an („Ein Ort für alles, was ihr mit KI baut"). Das ist bewusst und konsistent — individuelle Anleitung duzt, Kollektiv-Aussagen siezen nie, sondern ihrzen.
6. **Nichts erfinden.** Keine Beispiel-Inhalte, Zitate oder Fakten dazudichten. Im Zweifel fragen oder weglassen.

---

## Aufbau

```
index.html            Startseite = Verteiler auf die sechs Bereiche
skills.html           Katalog + Onepager „Was sind Skills?" + Skill-Baukasten (3 Views)
prompts.html          Prompt-Sammlung mit Live-Baukasten und Varianten
vorlagen.html         Asset-Bibliothek + Code-Baukasten (E11-Merge zweier Seiten)
showroom.html         Projekte: echte Team-Tools + Beispiel-Projekte
lernen-hilfe.html     Ressourcen + Befehle + Glossar + FAQ (E11-Merge zweier Seiten)

shared/base.css       Design-System + alle geteilten Komponenten (~1.900 Zeilen)
shared/base.js        Engine: Nav, Modal, Rating, Suche, Deep-Links (~1.800 Zeilen)
data/*.js             9 Datendateien, klassische Scripts mit globalen Konstanten
tests/*.cjs           7 Playwright-Regressionssuiten
skills/<id>/          echte Skill-Dateien (Source of Truth für den Datei-Viewer)
demo/, beispieldaten/ echte Artefakte und Übungsdaten
docs/                 historische Planungsdokumente (E1–E10), nicht mehr aktuell
```

**Redirect-Stubs in der Wurzel:** `bibliothek.html`+`baukasten.html` → `vorlagen.html`, `hilfe.html`+`lernen.html` → `lernen-hilfe.html`. Alte geteilte Links müssen weiter funktionieren — nicht löschen.

**Echte Tools in der Wurzel:** `tkp-rechner.html`, `umfrage-auswertung.html`. Die sind als `CASES[].liveUrl` verlinkt — nicht verschieben.

---

## Architektur-Konventionen

- **`shared/base.js` ist ein klassisches Script**, keine Module. Funktionen sind global, **weil inline `onclick` im HTML davon abhängt**. Nicht auf ESM umstellen, ohne alle `onclick` mitzuziehen.
- **`renderNav(activePage, opts)`** injiziert Header und Footer auf allen Seiten. Die Nav ist flach mit fünf Punkten (Katalog · Prompts · Vorlagen · Showroom · Lernen & Hilfe). Das frühere „Mehr ▾"-Dropdown gibt es seit E11 **nicht mehr**.
- **Pro Seite typisieren:** `window.RatingConfig = { type: 'prompt' }` bzw. `window.ModalConfig = {...}` als erste Script-Zeile. Das typisiert die gesamte Rating-/Favoriten-/Tried-Engine.
- **localStorage ist typ-genamespaced:** `rate:<typ>:<id>`, `fav:<typ>:<id>`, `tried:<typ>:<id>`, `vote:<typ>:<id>`.
- **Alle localStorage-Zugriffe müssen gekapselt bleiben** (`lsGet`/`lsSet`/`lsRemove` in base.js, try/catch). Privatmodus darf die Seite nicht töten.
- **Deep-Links:** `?param=` wird auf die Hash-Form umgeschrieben, übrige Query-Parameter bleiben erhalten (utm überlebt).

---

## Testen

**Immer mit der Basis-URL aufrufen.** Alle sieben Suiten leiten ihre Zielseite selbst ab; mit einer Seiten-URL laufen e6 und e9 falsch-negativ.

```bash
# Server (beide, manche Suiten haben unterschiedliche Defaults)
nohup python3 -m http.server 8401 >/dev/null 2>&1 &
nohup python3 -m http.server 8412 >/dev/null 2>&1 &

for t in e1-regression e3-prompts e6-bibliothek e7-baukasten e8-showroom e9-suche e10-lernenhilfe; do
  PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright node tests/$t.cjs http://localhost:8412/
done
```

**Sollwerte (alle grün, 0 Fehler):** e1 35 · e3 46 · e6 45 · e7 41 · e8 39 · e9 16 · e10 24

Playwright-Aufruf in eigenen Skripten:
```js
const { chromium } = require('/usr/lib/node_modules/playwright');
const b = await chromium.launch({ args: ['--no-sandbox'] });
```

### Prüfwerkzeuge über die Suiten hinaus

`tools/qa/` enthält wiederverwendbare Prüfungen, jede aus einem real aufgetretenen Fehler entstanden (Details in `tools/qa/README.md`):

```bash
node tools/qa/index.mjs kontrast     # WCAG-Kontrast inkl. kumulierter Deckkraft
node tools/qa/index.mjs zaehler      # Reiter, die mehr versprechen als sie liefern
node tools/qa/index.mjs robust       # Absturz durch vergifteten localStorage
node tools/qa/index.mjs responsive   # Overflow, unerreichbare Bedienelemente, Tap-Ziele
node tools/qa/index.mjs a11y         # axe-core, injiziert — kein npm nötig
node tools/qa/index.mjs links        # Link-Rot in data/*.js
node tools/qa/index.mjs manifest     # Skill-Dateiliste vs. Platte
node tools/qa/index.mjs aufraeumen   # verwaiste Browser-Prozesse (gegen Abstürze!)
```

**Bei langen Sitzungen regelmäßig `aufraeumen` laufen lassen.** Abgebrochene Playwright-Skripte hinterlassen `headless_shell`-Waisen (PPID 1), die den Speicher füllen, bis Androids Low-Memory-Killer den Claude-Prozess beendet. Und **höchstens zwei Playwright-Agenten gleichzeitig** — mehr war in dieser Umgebung zweimal die Ursache abgebrochener Läufe.

**Ändere niemals einen Test, um ihn grün zu bekommen.** Ändere die Ursache. Wenn ein Sollwert sich legitim verschiebt (neuer Glossar-Eintrag o. ä.), zieh ihn bewusst nach und schreib in den Test, warum.

---

## Fallen, die schon Zeit gekostet haben

- **Einblend-Animationen verfälschen jede Messung.** Vor Messungen erzwingen:
  ```js
  document.querySelectorAll('.anim-reveal').forEach(e => e.classList.add('in-view'));
  document.querySelectorAll('.cat-reveal').forEach(e => e.classList.add('in'));   // nur skills.html
  ```
  Ohne das misst du Elemente mit `opacity: 0` und bekommst Unsinn.
- **Kontrastprüfung muss kumulierte `opacity` einrechnen.** Eine Prüfung, die nur `color` gegen `background` rechnet, übersieht die halbe Fehlerklasse. Deckkraft taugt grundsätzlich **nicht** zur Text-Abschwächung, weil sie nicht prüfbar ist — stattdessen eine echte Farbe setzen.
- **Prüfe Vollständigkeit nie mit `| head`.** Ein abgeschnittener Grep hat schon dazu geführt, dass eine Suite nach einer Änderung rot wurde.
- **Der Datei-Viewer lädt zuerst von GitHub raw** (`REPO_RAW`, `skills.html:2288`), erst dann lokal. Lokale Änderungen an `skills/` sind im Modal also **erst nach dem Push** sichtbar. Zum lokalen Vorschauen `raw.githubusercontent.com` und `github.com` per `page.route(...abort())` blocken, dann greift der lokale Fallback (HTTP-Server nötig, `file://`-Fetch blockt).
- **Nach Änderungen an `skills/<id>/`** immer `node build-skills.mjs` laufen lassen → schreibt `skills/manifest.json` (Viewer-Liste) und `skills/files-all.json` (Download).
- **Screenshots lügen bei `position: sticky`** — in Fullpage-Screenshots rendern sticky-Elemente am Dokumentanfang. Nicht als Bug melden, ohne im Viewport nachzumessen.
- **Lazy geladene iframes** sind auf Screenshots leer, obwohl sie laden. Mit `page.frames().length` gegenprüfen.

---

## Deploy

**Push auf `main` = Deploy** (GitHub Pages, `https://ceekay1901.github.io/pilot-skillmarkt/`). `.nojekyll` muss bleiben. Vor dem Push: alle sieben Suiten grün und 0 Konsolenfehler auf allen sechs Seiten.

---

## Parallelarbeit mit mehreren Agenten

Bewährtes Muster: **disjunkte Datei-Eigentümer**. Eine Datei gehört genau einem Agenten, sonst überschreiben sie sich gegenseitig. Sinnvoller Schnitt:

1. `shared/base.css` + `shared/base.js`
2. `index.html` + `skills.html` + `prompts.html`
3. `vorlagen.html` + `showroom.html` + `lernen-hilfe.html`

`data/*.js` und `tests/*.cjs` behält die Hauptsitzung. Findet ein Agent etwas außerhalb seines Eigentums, meldet er es zurück, statt es zu ändern.
