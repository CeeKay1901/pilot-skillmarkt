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
2. **Zahlen-Ehrlichkeit.** Jede angezeigte Zahl muss aus den echten Daten berechnet sein. **Nie eine Zahl hart in den Fließtext tippen**, die aus einem Array kommt — sie driftet garantiert. Muster im Bestand: `<span id="page-sub-count">35</span>` (`skills.html:941`) wird zur Laufzeit aus `VISIBLE_SKILL_COUNT` überschrieben. **Wo das nicht geht, muss ein Test die Zahl halten:** die drei Meta-Tags von `skills.html` (`description`, `og:description`, `twitter:description`) werden von Suchmaschinen und Link-Vorschauen als statisches HTML gelesen, eine Laufzeit-Berechnung erreicht sie nie. Dafür gibt es `e1:01b_meta_bestandszahl_stimmt` — er holt den Sollwert **zur Laufzeit** aus `VISIBLE_SKILL_COUNT` und kann deshalb nicht mitdriften. Nicht gegen die Kartenzahl im Reiter „Alle" prüfen: die ist 37, weil Merge-Karten als eine zählen.
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

shared/base.css       Design-System + alle geteilten Komponenten (~2.240 Zeilen)
shared/base.js        Engine: Nav, Modal, Rating, Suche, Deep-Links (~2.070 Zeilen)
data/*.js             14 Datendateien, klassische Scripts mit globalen Konstanten
                      (data/seit.js ist ERZEUGT — tools/seit.mjs, nicht von Hand pflegen)
tests/*.cjs           11 Playwright-Regressionssuiten (e1, e3, e6–e14)
tools/seit.mjs        ermittelt aus der Git-Historie, seit wann ein Eintrag hier steht
skills/<id>/          echte Skill-Dateien (Source of Truth für den Datei-Viewer)
startprojekte/<id>/   drei leere Gerüste zum Weiterbauen (ZIP-Download im Showroom;
                      die CLAUDE.md liegt NICHT dabei — sie kommt aus data/anweisungen.js)
demo/, beispieldaten/ echte Artefakte und Übungsdaten
docs/                 Planungsdokumente — ein aktiver Plan, der Rest historisch
```

**Redirect-Stubs in der Wurzel:** `bibliothek.html`+`baukasten.html` → `vorlagen.html`, `hilfe.html`+`lernen.html` → `lernen-hilfe.html`. Alte geteilte Links müssen weiter funktionieren — nicht löschen.

**Echte Tools in der Wurzel:** `tkp-rechner.html`, `umfrage-auswertung.html`. Die sind als `CASES[].liveUrl` verlinkt — nicht verschieben.

---

## Architektur-Konventionen

- **`shared/base.js` ist ein klassisches Script**, keine Module. Funktionen sind global, **weil inline `onclick` im HTML davon abhängt**. Nicht auf ESM umstellen, ohne alle `onclick` mitzuziehen.
- **`renderNav(activePage, opts)`** injiziert Header und Footer auf allen Seiten. Die Nav ist flach mit fünf Punkten (Katalog · Prompts · Vorlagen · Showroom · Lernen & Hilfe). Das frühere „Mehr ▾"-Dropdown gibt es seit E11 **nicht mehr**.
- **Pro Seite typisieren:** `window.RatingConfig = { type: 'prompt' }` bzw. `window.ModalConfig = {...}` als erste Script-Zeile. Das typisiert die gesamte Rating-/Favoriten-/Tried-Engine.
- **localStorage ist typ-genamespaced:** `rate:<typ>:<id>`, `fav:<typ>:<id>`, `tried:<typ>:<id>`, `vote:<typ>:<id>`.
- **Ein neuer Inhaltstyp heißt sechs Pflichtstellen.** Registriere ihn in `GSEARCH_GROUPS`, im `switch` von `_gsGlobal()`, in `GSEARCH_SOURCES` (alle drei in base.js), in `DS_TYPE_LABEL`, in `SAMMLUNGEN` von `tools/seit.mjs` — **und als `<script src="data/…">`-Tag auf `index.html`**. Die sechste Stelle ist die zuletzt gefundene: Der Neuigkeiten-Block steht auf der Startseite und überspringt jede Sammlung, deren Global dort nicht geladen ist. Ohne den Script-Tag fällt sie also **still** heraus, obwohl alle fünf anderen Stellen stimmen. Gemeldet hat das bei `STARTPROJEKTE` nur `e11:06`, und zwar als `"STARTPROJEKTE:<Sammlung fehlt>"` — nicht als fehlendes Datum. Dazu ein `?param=`-Deep-Link auf der Zielseite und der Typ **explizit** beim Merken, Bewerten und Kopieren (`toggleFavorite(event, id, 'typ')`, `renderInteractiveStars(id, 'typ')`). `GSEARCH_GROUPS` ist die gemeinsame Quelle für globale Suche UND „Deine Sachen" — sie liefert Titel, Kurzinfo und Deep-Link; ohne Eintrag speichert der Stern zwar, aber „Deine Sachen" kann ihn nicht auflösen und zeigt ihn gar nicht an. Zwei der Auslassungen bleiben stumm: `_gsGlobal()` ist ein `switch` über feste Namen, ein fehlender `case` lässt die Sammlung **still** aus dem Neuigkeiten-Block fallen, und ein Sterne-Widget ohne expliziten Typ schreibt still nach `rate:baustein:`, weil `window.RatingConfig` ein Seiten-Default ist und auf `vorlagen.html` im Baukasten-Reiter auf `baustein` steht. Beides ohne Fehlermeldung. Merkbar sind aktuell: Skills, Prompts, Bausteine, Assets, Beispieldaten, Bilder, Pakete, Projektanweisungen, Startprojekte, Projekte, Ressourcen.
- **Nicht alles braucht einen Stern.** Merken löst „ich finde es in einer großen Menge nicht wieder". Bei kleinen, immer sichtbaren Mengen (die zwei Logos im Marken-Panel) ist der Stern Rauschen. Wo bewusst keiner sitzt, gehört die Begründung als Kommentar daneben — sonst liest es die nächste Prüfung als Lücke.
- **`seit` statt `addedAt`, wenn es um „neu" geht.** `addedAt` in `data/skills.js` ist die redaktionelle Entstehungszeit und liegt bei 30 von 45 Einträgen **vor** dem ersten Commit (Daten bis Oktober 2025). Wann etwas hier erschienen ist, steht ausschließlich in `data/seit.js` — erzeugt von `tools/seit.mjs` aus der Git-Historie, Schlüssel `<Global>:<id>`. Der Generator **überschreibt nie** (Einfrier-Regel): sobald IDs umbenannt werden, findet der Pickaxe die alte Historie nicht mehr. **Reihenfolge bei neuen Einträgen:** erst die Datendatei committen, dann `node tools/seit.mjs`, dann `--pruefen` (muss 0 Lücken melden). Das Datum kommt aus der Git-Historie — bei einer nicht committeten Datendatei findet der Pickaxe nichts, und der Lauf bricht hart ab, statt still ein Loch zu lassen.
- **Der Neuigkeiten-Block ist abgeleitet, nicht gepflegt** (`newsHtml`/`newsMeldungen` in base.js). Drei Tage einzeln plus **eine Sammelmeldung** für alles Ältere. Die Sammelmeldung ist kein Schmuck: sie hält die Zahl der Meldungen dauerhaft bei 3–4 und nennt dauerhaft jeden Bereich — genau das prüfen `e3:i5`, `e6:i5`, `e7:i5` und `e8:i5` an `index.html`. Ein reines Zeitfenster erfüllt das nur zufällig und nur so lange, bis der jeweilige Launch-Tag herausfällt. Bewacht von `tests/e11-neuigkeiten.cjs` (Check 09), damit ein Umbau **dort** auffällt statt vier fremde Suiten unerklärt rot zu färben.
- **Alle localStorage-Zugriffe müssen gekapselt bleiben** (`lsGet`/`lsSet`/`lsRemove` in base.js, try/catch). Privatmodus darf die Seite nicht töten.
- **Deep-Links:** `?param=` wird auf die Hash-Form umgeschrieben, übrige Query-Parameter bleiben erhalten (utm überlebt).
- **Klickbare Karten: nie die Karte selbst zur Schaltfläche machen.** Eine Karte, die Sterne, Chips oder Kopieren-Knöpfe enthält, darf kein `role="button"` + `tabindex="0"` tragen — eine Schaltfläche darf keine Schaltflächen enthalten (axe `nested-interactive`; das waren einmal 66 Knoten). Muster im Bestand:
  ```html
  <article class="skill-card" onclick="openModal('id')">      <!-- Maus: ganze Fläche -->
    <h3 class="skill-name"><button type="button" class="card-open-btn"
        onclick="event.stopPropagation();openModal('id')">Titel</button></h3>
  ```
  Der Titel trägt Aktion, Tastaturzugang und Fokusring (`.card-open-btn`, base.css). `event.stopPropagation()` verhindert das Doppel-Öffnen. Die Karte reagiert über `:focus-within` sichtbar mit. Ausnahme: Karten **ohne** interaktive Kinder (`.ex-starter-card`) dürfen `role="button"` behalten.

---

## Testen

**Immer mit der Basis-URL aufrufen.** Alle elf Suiten leiten ihre Zielseite selbst ab; mit einer Seiten-URL laufen e6 und e9 falsch-negativ.

```bash
# Server (beide, manche Suiten haben unterschiedliche Defaults)
nohup python3 -m http.server 8401 >/dev/null 2>&1 &
nohup python3 -m http.server 8412 >/dev/null 2>&1 &

for t in e1-regression e3-prompts e6-bibliothek e7-baukasten e8-showroom e9-suche e10-lernenhilfe e11-neuigkeiten e12-anweisungen e13-startprojekte e14-bilder-pakete; do
  PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright node tests/$t.cjs http://localhost:8412/
done
```

**Maßgeblich ist der Exit-Code (0 = alle Checks grün) und `"failed": []`** — nicht eine gezählte Zahl.

Zur Warnung, weil es schon zu falschen Berichten geführt hat: `grep -c '"pass": true'` zählt **keine Checks**, sondern Zeichenketten-Treffer inklusive verschachtelter Teilergebnisse. Dieselbe Suite kommt damit auf 46, während sie real 18 Checks hat. Wenn du eine Zahl brauchen solltest:

```bash
node tests/e3-prompts.cjs http://localhost:8412/ | grep -oE '"[0-9]{2}[a-z]?_[a-z0-9_]+":' | sort -u | wc -l
```

Reale Check-Zahlen (25.07.2026, mit genau diesem Kommando gezählt): e1 17 · e3 18 · e6 17 · e7 15 · e8 15 · e9 9 · e10 7 · e11 10 · e12 13 · e13 15 · e14 16. e12, e13 und e14 laufen über zwei Viewports, zählen aber jeden Check einmal.

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

Zwei weitere Prüfer stehen daneben, beide ohne Browser und in Sekunden durch:

```bash
node tools/muster-datauri.mjs --pruefen   # Dateipfade, eingebettete Muster und jede
                                          # Ziffer in den Asset-Beschreibungen
node tools/bilder-pakete.mjs --pruefen    # BILDER und PAKETE gegen die Platte:
                                          # Pfade, Bytes, Pixelmaße, BILDER_STATS,
                                          # Paketinhalte, url() der Paket-CSS
```

Beide prüfen **Daten gegen Platte**, nie Daten gegen Daten. Der Anlass ist derselbe: eine Byte- oder Maßangabe in `data/*.js` wird still falsch, wenn die Datei neu exportiert wird — die Seite bleibt dabei in sich stimmig und zeigt trotzdem Unsinn an.

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
- **Der Datei-Viewer lädt zuerst von GitHub raw** (`REPO_RAW`, `skills.html:2404`), erst dann lokal. Lokale Änderungen an `skills/` sind im Modal also **erst nach dem Push** sichtbar. Zum lokalen Vorschauen `raw.githubusercontent.com` und `github.com` per `page.route(...abort())` blocken, dann greift der lokale Fallback (HTTP-Server nötig, `file://`-Fetch blockt).
- **Dasselbe gilt für die Startprojekt-ZIPs** (`REPO_RAW`, `showroom.html:695`, benutzt von `downloadStartprojekt`): erst `REPO_RAW`, dann repo-relativ. Wer die Seite lokal von einem Arbeitsstand ausliefert, dessen Änderungen noch nicht auf `main` sind, bekommt im ZIP **den gepushten Stand** — nicht den eigenen. Auf der veröffentlichten Seite sind beide identisch, und unter `file://` ist der Netzweg der einzige, der überhaupt trägt; deshalb steht er vorn. Zum Prüfen des Arbeitsstands dieselben zwei Hosts blocken. Scheitert eine Datei auf beiden Wegen, gibt es bewusst **kein** ZIP, sondern eine sichtbare Meldung an der Karte — ein stillschweigend unvollständiges Gerüst wäre schlimmer als keines.
- **Nach Änderungen an `skills/<id>/`** immer `node build-skills.mjs` laufen lassen → schreibt `skills/manifest.json` (Viewer-Liste) und `skills/files-all.json` (Download).
- **Screenshots lügen bei `position: sticky`** — in Fullpage-Screenshots rendern sticky-Elemente am Dokumentanfang. Nicht als Bug melden, ohne im Viewport nachzumessen.
- **Lazy geladene iframes** sind auf Screenshots leer, obwohl sie laden. Mit `page.frames().length` gegenprüfen.

---

## Deploy

**Push auf `main` = Deploy** (GitHub Pages, `https://ceekay1901.github.io/pilot-skillmarkt/`). `.nojekyll` muss bleiben. Vor dem Push: alle elf Suiten grün und 0 Konsolenfehler auf allen sechs Seiten.

---

## Parallelarbeit mit mehreren Agenten

Bewährtes Muster: **disjunkte Datei-Eigentümer**. Eine Datei gehört genau einem Agenten, sonst überschreiben sie sich gegenseitig. Sinnvoller Schnitt:

1. `shared/base.css` + `shared/base.js`
2. `index.html` + `skills.html` + `prompts.html`
3. `vorlagen.html` + `showroom.html` + `lernen-hilfe.html`

`data/*.js` und `tests/*.cjs` behält die Hauptsitzung. Findet ein Agent etwas außerhalb seines Eigentums, meldet er es zurück, statt es zu ändern.
