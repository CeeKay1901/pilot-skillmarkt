# pilot AI Marketplace (Skillmarkt) — Status 2026-08-03

**Kurz:** Interner Marktplatz für KI-Skills/Prompts/Vorlagen. Statische Seite, läuft live.

## Live & Deployment
- **URL:** https://skillmarkt.apps.pilot.onmercury.io — **HTTP 200 ✅**
- **Hosting:** pilot Coolify, **static / Port 80** (mesh-only)
- **Kein Build-Step** — reines HTML/JS

## Repo & Git
- **Repo:** `pilot-group-citizen-coding/citizencoding-skillmarkt` (Branch `main`), privat
- **59 Commits**, ~17 MB (ohne .git), Working-Tree **sauber** (0 offene Änderungen)
- **Letzter Commit:** 2026-07-27 — *Skillmarktplatz auf Stand von CeeKay1901/pilot-skillmarkt spiegeln (57 Commits)*
- **Eigene `CLAUDE.md` im Repo = maßgebliche Arbeitsanleitung**

## Bereiche / Seiten
Sechs Bereiche: **Katalog · Prompts · Vorlagen · Showroom · Lernen & Hilfe**
Seiten: `index`, `skills`, `baukasten`, `bibliothek`, `prompts`, `showroom`, `lernen`, `lernen-hilfe`, `hilfe`, `tkp-rechner`

## Pflege-Rezept (wichtig bei jedem Re-Sync)
Wird periodisch aus dem persönlichen Quell-Repo `CeeKay1901/pilot-skillmarkt` nachgezogen. **Jeder Re-Sync braucht dieselben drei Nacharbeiten:**
1. **Semgrep-Fixes** zurückspielen (vettete Skill-Fixes wiederherstellen, `base.js` nosemgrep)
2. **CeeKay1901-Verweise** auf Org-Repo / Live-Domain umbiegen (Repo-Links + OG/Meta-URLs)
3. **`REPO_RAW`** entfernen

## Offen / Beobachten
- Nichts Dringendes offen. Nächster Re-Sync aus dem Quell-Repo bei Bedarf → Rezept oben beachten.
- CI-Merke: „dependency review" fällt org-weit durch (privat ohne GHAS); Semgrep meckert data:-URI-Favicons.
