# PLAN E10 — Erklärbarkeit, Sub-Tabs & Lernen-&-Hilfe-Merge

**Kontext:** pilot AI Marketplace (E1–E9 live). Vier von Christopher am 2026-07-22 entschiedene Änderungen, danach direkt per Ultracode umgesetzt. Konservative Leitplanken aus dem Projekt gelten weiter (Deutsch/Du, keine Emojis, editorial; Zähl-Logik NIE hardcoden; Demo-/Datenschutz-Kennzeichnung nie entfernen; Cmd+K, „Meine Reise", Glossar, echte Demo-Tools, base.js-Single-Source-Nav nicht kaputt machen; kein Vibe-Coding-Look).

## Entscheidungen (locked)

1. **„Was sind Skills?" → seiten-lokale Sub-Tabs.** Der reiche Onepager bleibt vollständig, wandert aber aus der globalen Header-Nav in eine seiten-lokale Sub-Navigation auf `skills.html`: `[ Katalog | Was sind Skills? | Skill bauen ]` (Tablist über dem Katalog). Global-Nav trägt nur noch **„Katalog"**. „Skill bauen" (nav-builder) wandert analog mit (gleiche Mechanik, gleicher Bereich).
2. **Hilfe + Lernen → ein Bereich „Lernen & Hilfe".** Neue Seite `lernen-hilfe.html` mit Sticky-Sub-Nav **Ressourcen · Befehle · Glossar · FAQ**. `hilfe.html` + `lernen.html` werden zu Redirect-Stubs (Deep-Links/Bookmarks bleiben gültig).
3. **Kompaktes Erklär-Modul je Bereich.** Einheitliches, kurzes „Was ist das? / Wofür nutze ich es? / So fange ich an"-Modul im Kopf von Prompts, Lernen&Hilfe, Bibliothek, Baukasten, Showroom. Der volle Onepager bleibt exklusiv bei Skills (kanonische Quelle für „was ist ein Skill/Plugin/Framework" — Querbegriffe verlinken dorthin, statt neu zu erklären → Redundanz-Leitplanke).
4. **Audit-getriebene Bugfixes & UX.** Nach dem Umbau Audit-Phase (Persona-Review + Webaudit über die geänderten Bereiche) + Fixes + alle beim Bau gefundenen Bugs.

**Global-Nav danach:** `Katalog · Prompts · Lernen & Hilfe` (primär) + `Mehr ▾` (Asset-Bibliothek · Baukasten · Showroom). 7 → 6 Bereiche.

---

## Stage 1 — Skills-Sub-Tabs (skills.html + base.js + e1 + index-Links)

**Bauen:**
- `skills.html`: In-Page-Tablist über dem Katalog: Katalog | Was sind Skills? | Skill bauen. `role=tablist/tab`, `aria-selected`, Pfeiltasten-Nav, aktiver Tab synchron mit `showView()` + `?view=`/Hash. Verdrahtet mit bestehender `showView('catalog'|'explainer'|'builder')`-Logik (unverändert dahinter).
- `shared/base.js`: Die seiten-spezifische Injektion von `nav-explainer` + `nav-builder` in die GLOBALE Header-Nav entfernen. `nav-catalog` bleibt global (HARTE REGEL: bleibt im DOM). Der `sharedOnclick.katalog`-Mechanismus bleibt nur, soweit „Katalog" global auf `showView('catalog')` zeigt.
- Deep-Links `skills.html?view=explainer|builder` + alle internen `showView()`-Aufrufe (index.html:597 „Onepager"-Link, `type-info-link`, Explainer-CTAs) MÜSSEN weiter funktionieren und den richtigen Sub-Tab aktiv setzen.

**Messlatte:** `tests/e1-regression.cjs` — Z.198 `page.click('#nav-explainer')` auf den neuen Sub-Tab-Selektor umstellen; neue Checks: (a) globaler Nav hat KEINEN `nav-explainer`/`nav-builder`-Peer mehr, `nav-catalog` vorhanden; (b) Sub-Tab-Klick schaltet View; (c) `?view=explainer` öffnet den Explainer-Tab aktiv; (d) 0 JS-Fehler. Alle übrigen Messlatten bleiben grün.

**Checkpoint:** Christopher sieht Stage 1.

---

## Stage 2 — Lernen & Hilfe zusammenführen (die große Etappe)

**Bauen:**
- Neue `lernen-hilfe.html`: Sticky-Sub-Nav Ressourcen · Befehle · Glossar · FAQ. „Ressourcen" = Lernen-Inhalt (Zeitauswahl-Buckets + Ressourcen-Karten + Filter aus `lernen.html`), „Befehle/Glossar/FAQ" = Hilfe-Inhalt aus `hilfe.html`. Lädt `data/befehle.js` + `data/glossar.js` + `data/ressourcen.js`. Vote-Typen koexistieren (`vote:befehl|begriff|ressource`, typisiert). Deep-Links `?befehl=`, `?begriff=`, `?faq=`, `?r=` alle auf dieser Seite.
- `hilfe.html` + `lernen.html` → schlanke Redirect-Stubs auf `lernen-hilfe.html` mit Param-Erhalt (`?befehl/?begriff/?faq` bzw. `?r`).
- `shared/base.js`: Nav-Merge — EIN primärer Eintrag `{ id:'nav-hilfe', label:'Lernen & Hilfe', href:'lernen-hilfe.html' }` (id `nav-hilfe` wiederverwendet, minimiert Test-Churn); `nav-lernen` aus `sharedMoreItems` entfernt. Globale-Suche-hrefs Z.1311/1315 (befehl/begriff) + Z.1319 (ressource) → `lernen-hilfe.html?…`. Footer-Link Z.196 → `lernen-hilfe.html`.
- `index.html`: Router-Kacheln „Hilfe-Center" (Z.324) + „KI verstehen"→lernen (Z.342) auf den gemergten Bereich konsolidieren; Area-Karten `area-hilfe` + `area-lernen` (Z.420/443) zu EINER „Lernen & Hilfe"-Karte; `areas-sub` „alle sieben" → sechs; News-Bezüge + Meta-Description. Zähler weiter real gezählt (kein Hardcoding).

**Messlatte:** Neue `tests/e10-lernenhilfe.cjs` (Sub-Nav-Sprünge, Deep-Links befehl/begriff/faq/r, Redirect-Stubs, Vote-Typen, index-Merge-Karte, 0 JS-Fehler). `tests/e4-hilfe.cjs` + `tests/e5-lernen.cjs` in e10 überführen/retiren. Test-Sweep: `nav-lernen`-Referenzen in e5/e6/e7/e8 entfernen; `nav-hilfe`-Refs bleiben gültig. Alle Messlatten grün.

**Checkpoint.**

---

## Stage 3 — Kompakte Erklär-Module je Bereich

**Bauen:**
- Wiederverwendbares Muster in `shared/base.css` (`.area-intro`): kompakt, 3 Teile „Was ist das? / Wofür? / So fange ich an", pilot-CI, konsistent.
- Einbau im Kopf von Prompts, Lernen&Hilfe, Bibliothek, Baukasten, Showroom. Inhalte bereichsspezifisch, ehrlich, editorial. Querbegriffe (Skill/Plugin/Framework, Code vs. Langdock) verlinken auf den Skills-Onepager (Single Source), NICHT neu erklären.
- Abgleich mit dem letzten Pass: die frisch gekürzten „drei Handgriffe"-Einzeiler gehen im neuen Erklär-Modul auf (kein Doppel-Intro).
- Skills behält den Onepager (Sub-Tab), bekommt KEIN zusätzliches Modul.

**Messlatte:** Pro Bereich: Modul vorhanden, Querlink auf kanonischen Explainer vorhanden, kein Doppel-Intro, 0 JS-Fehler. Bestehende Messlatten grün.

**Checkpoint.**

---

## Stage 4 — Audit, Bugfixes, UX & Startseiten-Finalisierung

**Bauen:**
- Audit über die geänderten Bereiche: Persona-Review + Webaudit (vorhandene Skills). Findings + beim Bau gefundene Bugs beheben, Guardrails prüfen (Ehrlichkeit/Zähler, Demo-Labels, A11y der neuen Tablists/Sub-Navs, Deep-Link-Query-Erhalt).
- Startseite final: 6-Bereiche-Konsistenz (Router/Area/Zähler/„Meine Reise"), Meta/News aktuell.
- Globale Suche: neue Struktur (Sub-Tabs, gemergter Bereich) korrekt in Treffer-Deep-Links.

**Messlatte:** ALLE Messlatten grün (e1/e3/e6/e7/e8/e9 + neu e10), 0 Konsolenfehler auf allen Seiten, Ehrlichkeits-/Zähler-Leitplanken bestätigt.

**Schlussabnahme + Commit/Push (= Deploy) nach Christophers Freigabe.**

---

## Risiken & Regression-Fokus

- **Nav-Single-Source (base.js):** betrifft ALLE Seiten — Änderungen zentral, HARTE REGEL „aktive IDs im DOM" beachten, Tests mitziehen.
- **Deep-Link-Erhalt:** `?view=`, `?befehl/?begriff/?faq/?r` + Redirect-Stubs — Bookmarks/Querverweise dürfen nicht brechen (Link-Rot-Leitplanke).
- **Test-Churn:** `nav-explainer` (e1) + `nav-lernen` (e4/e5/e6/e7/e8) — sauber synchronisieren, keine falsch-grünen Tests.
- **Redundanz-Leitplanke:** Erklär-Module dürfen „was ist ein Skill" NICHT erneut breit erklären — nur bereichsspezifisch + auf Onepager verlinken.
- **Ehrlichkeit:** Zähler real gezählt lassen (Startseite 6 Bereiche), keine erfundenen Zahlen.

*Erhoben & entschieden 2026-07-22. Umsetzung per Ultracode, Stage für Stage mit Messlatte + Review.*
