# skills/

Echte Claude-Code-Skills — **Source of Truth** für den pilot Skill Marketplace.

Jeder Unterordner ist ein Skill: ein Verzeichnis mit einer `SKILL.md`
(YAML-Frontmatter + Anleitung) und optionalen Zusatzdateien
(`references/`, `scripts/`).

Die Website liest diese Dateien **live** und spiegelt sie 1:1 im Tab
„Aufbau & Dateien" — inklusive „Auf GitHub ansehen"-Link auf genau die Datei hier.

## Aufbau einer SKILL.md

```markdown
---
name: mein-skill
description: Was der Skill tut + wann er passt. Daran erkennt Claude ihn automatisch.
trigger: /mein-skill
---

# Mein Skill

Anleitung, die Claude Code befolgt …
```

## Ändern / erweitern

1. Datei in `skills/<id>/` bearbeiten oder neuen Ordner anlegen.
2. `node build-skills.mjs` ausführen (aktualisiert `skills/manifest.json`).
3. Commit & Push → GitHub Pages spiegelt die Änderung.

> Hinweis: Die pilot-eigenen Skills sind einsatzfähige Vorlagen. Die
> Anthropic/Claude-Code-Skills sind an ihrem offiziellen Verhalten orientiert.

## Beweis: 1:1-Spiegelung selbst prüfen

Der Tab „Aufbau & Dateien" zeigt **byte-genau** die Dateien aus diesem Ordner.
Nachprüfbar mit:

```
node tools/verify-mirror.mjs
```

Das Skript öffnet die Live-Seite in einem echten Browser, liest für **jede**
Datei den angezeigten Inhalt aus und vergleicht ihn Zeichen für Zeichen mit dem
Repo-Rohinhalt (`raw.githubusercontent.com/.../main/skills/…`) — inklusive Pfad
und GitHub-Link. Erwartetes Ergebnis: **jede in `skills/manifest.json` gelistete
Datei identisch, 0 Abweichungen.**

> Hier stand einmal „68/68 Dateien". Die Zahl ist mit der Kuration (E16) falsch
> geworden und war ohnehin nicht zu halten: Sie hängt am Bestand, nicht an der
> Aussage. Der Sollwert steht im Manifest — dort und nirgends sonst.

Manueller Gegencheck: Skill öffnen → „Auf GitHub ansehen" klicken → die dort
gezeigte Datei ist exakt die im Viewer.
