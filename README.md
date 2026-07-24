# pilot AI Marketplace

**→ [ceekay1901.github.io/pilot-skillmarkt](https://ceekay1901.github.io/pilot-skillmarkt/)**

Die Arbeitsschnittstelle der Citizen-Coding-Projektgruppe bei pilot. Hier liegen die Ressourcen, mit denen Kolleg:innen eigene kleine Tools, Auswertungen und Webseiten bauen — Skills, Prompts, Vorlagen, Beispiel-Projekte und Lernmaterial, alles an einem Ort und alles zum Mitnehmen.

Die Seite richtet sich an Kolleg:innen **ohne Software-Hintergrund**, die von Langdock kommen und jetzt mit Claude Code arbeiten. Deshalb: Analogien vor Technik, jeder Fachbegriff im Glossar, nichts erfunden.

---

## Die sechs Bereiche

| Bereich | Was drinsteckt |
|---|---|
| **Katalog** (`skills.html`) | Geprüfte Skills, Plugins und Frameworks — mit Blick in die echten Dateien, Startprompt und Download. Dazu der Onepager „Was sind Skills?" und ein Baukasten für eigene Skills. |
| **Prompts** (`prompts.html`) | Kopierfertige Prompts mit Platzhaltern, Varianten und Live-Baukasten — plus der Erklärung, *warum* sie funktionieren. |
| **Vorlagen** (`vorlagen.html`) | Asset-Bibliothek (Schriften, Icons, Farbpaletten, Muster — Lizenz an jedem Asset sichtbar) und Code-Bausteine mit Live-Vorschau. |
| **Showroom** (`showroom.html`) | Echte Team-Tools und Beispiel-Projekte, jeweils mit der ehrlichen Geschichte, wie sie entstanden sind — und einem Weg zum Nachbauen. |
| **Lernen & Hilfe** (`lernen-hilfe.html`) | Geprüfte Lern-Ressourcen, Befehle im Team-Ranking, Glossar und Schritt-für-Schritt-Lösungen für typische Blocker. |
| **Startseite** (`index.html`) | Verteiler auf alles, mit Live-Zählern und „Deine Sachen". |

Über allem liegt eine **globale Suche** (Strg/Cmd + K) über alle Ressourcentypen hinweg.

**Bestand, Stand 24.07.2026:** 35 sichtbare Skills (dazu 4 Plugins, 3 Frameworks) · 23 Prompts · 30 Assets · 12 Bausteine · 10 Projekte (4 davon echte Team-Tools) · 28 Lern-Ressourcen · 28 Befehle · 49 Glossar-Begriffe · 10 FAQ. Die Seite rechnet diese Zahlen live aus den Daten aus — die Angabe hier ist eine Momentaufnahme.

---

## Was echt ist und was Demo

Das Projekt nimmt Ehrlichkeit ernst, weil es sonst als interne Wissensquelle wertlos wäre:

- **Echt:** alle Skill-Dateien unter `skills/`, die Download-Pakete, die Assets, die Beispieldaten, die vier als „Echtes Team-Tool" markierten Projekte und alle Artefakte unter `demo/` (jedes davon wurde von einem Skript erzeugt, das daneben liegt — nachrechenbar).
- **Demo:** Bewertungen, Votes, Kommentare und Personas sind Startwerte und auf der Seite als solche gekennzeichnet. Sie sind **lokal pro Person** im Browser gespeichert, es gibt kein geteiltes Backend.
- **Inszeniert:** die als „Beispiel-Projekt" markierten Cases im Showroom. Sie sind fiktiven Personas zugeordnet, nie realen Personen.

Der „Einreichen"-Fluss ist derzeit ebenfalls ein Demo-Fluss — er zeigt den Ablauf, reicht aber noch nichts ein.

---

## Lokal starten

Kein Build-Step, keine Abhängigkeiten. Die Seite läuft direkt per Doppelklick auf `index.html`.

Für den vollen Funktionsumfang (der Datei-Viewer und die Beispieldaten brauchen `fetch`, das unter `file://` blockiert wird) einen kleinen Server starten:

```bash
python3 -m http.server 8401
# → http://localhost:8401/
```

---

## Mitarbeiten

- **Inhalte** liegen in `data/*.js` — klassische Scripts mit globalen Konstanten, direkt editierbar.
- **Skill-Dateien** liegen unter `skills/<id>/`. Nach Änderungen `node build-skills.mjs` laufen lassen (schreibt `manifest.json` und `files-all.json` neu).
- **Design und Engine** liegen zentral in `shared/base.css` und `shared/base.js` — Änderungen dort wirken auf allen sechs Seiten.
- **Vor jedem Push** die sieben Regressionssuiten laufen lassen (siehe `CLAUDE.md`).

**Push auf `main` veröffentlicht sofort** (GitHub Pages).

Arbeitsanleitung, Konventionen und die bekannten Fallstricke stehen in **[CLAUDE.md](CLAUDE.md)**. Historische Planungsdokumente liegen in `docs/`.
