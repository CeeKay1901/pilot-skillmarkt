---
name: webaudit
description: Vollständiger Web-Audit: Code-Analyse + Playwright-Visuals. Nutzen wenn User "audit", "review", "qa", "check", "bewerte", "analysiere", "untersuche" eine Website oder Web-App sagt — oder Begriffe wie "UX", "Design", "Usability", "Accessibility", "Performance", "SEO", "Features", "Lighthouse" erwähnt. Auch bei "/webaudit", "webaudit", "vibefeedback audit".
version: 2.0.0
tools: Read, Glob, Grep, Bash, Edit, Write, Agent
---

# Web Audit Skill

Ganzheitlicher Audit: nicht nur Bugs — sondern Design, UX, Usability, Content, Features, SEO, Performance, Accessibility, Security, Robustness. Produziert strukturierte FAIL/WARN/INFO-Findings mit Screenshots und optionalen Auto-Fixes.

## Invocation

```
/webaudit [path/to/project] [--fix] [--visual-only] [--code-only] [--url=https://...] [--focus=ux,design,seo]
```

- `path` — Projektverzeichnis (Standard: current dir)
- `--fix` — Fixes nach Audit autonom implementieren
- `--visual-only` — nur Playwright, kein Code-Scan
- `--code-only` — nur Code-Analyse, kein Playwright
- `--url` — Live-URL statt lokale Dateien
- `--focus` — nur bestimmte Dimensionen (kommagetrennt)

---

## Audit-Dimensionen (vollständig)

Der Audit deckt **10 Dimensionen** ab:

| # | Dimension | Was bewertet wird |
|---|-----------|-------------------|
| 1 | **Design** | Visuelle Hierarchie, Typografie, Farbe, Whitespace, Konsistenz |
| 2 | **UX / Usability** | User Flows, Affordanzen, Feedback, Onboarding, Cognitive Load |
| 3 | **Content & Copy** | Mikrokopie, CTAs, Fehlertexte, Leere Zustände, Tonalität |
| 4 | **Features** | Vollständigkeit, Auffindbarkeit, Konsistenz, Erwartete Funktionen |
| 5 | **SEO** | Meta-Tags, Semantik, Struktur, Crawlbarkeit, Social Sharing |
| 6 | **Accessibility** | WCAG 2.1 AA, Keyboard, ARIA, Kontrast, Screen Reader |
| 7 | **Performance** | Core Web Vitals, Ladezeit, Bundle-Größe, Ressourcen |
| 8 | **Security** | XSS, CSRF, Secrets, CSP, Input-Validierung |
| 9 | **Robustness** | Error Handling, Race Conditions, Memory Leaks, Edge Cases |
| 10 | **Visual/Responsive** | Dark Mode, Mobile, Touch Targets, Animationen, Zustände |

---

## Phase 0: Umgebungs-Erkennung

```bash
node --version 2>/dev/null && echo "NODE_OK" || echo "NODE_MISSING"
proot-distro list 2>/dev/null && echo "PROOT_OK" || echo "PROOT_MISSING"
proot-distro login ubuntu -- which chromium-browser 2>/dev/null && echo "CHROMIUM_OK" || echo "CHROMIUM_MISSING"
```

| Verfügbar | Tier | Scope |
|-----------|------|-------|
| Nichts | 0 | Code + manuelle Analyse |
| Node.js | 1 | Code + Grep-Checks |
| Node + Playwright + Chromium | 2 | Voll: Code + Screenshots + Metriken |
| proot-distro Ubuntu (Termux) | 2+ | Playwright via Ubuntu |

→ Termux-Setup: [references/playwright-setup.md](references/playwright-setup.md)

---

## Phase 1: Projekt-Erkundung

```bash
ls -la $TARGET_DIR
wc -c $TARGET_DIR/*.html $TARGET_DIR/*.js $TARGET_DIR/*.css 2>/dev/null
cat $TARGET_DIR/package.json 2>/dev/null | head -30
grep -c "." $TARGET_DIR/*.html 2>/dev/null
```

Feststellen:
- Projekttyp (SPA, multi-page, single HTML, static, server-rendered)
- Zielgruppe und Zweck (aus Inhalt ableiten)
- Primäre User Flows (was soll der Nutzer tun?)
- Technologie-Stack
- Sprache und i18n-Bedarf

---

## Phase 2: Ganzheitliche Code-Analyse

### 2A — Design (statisch)

```bash
# Typografie: konsistente Font-Größen?
grep -n "font-size" $TARGET_DIR/*.css $TARGET_DIR/*.html | grep -v "var(--" | head -20

# Farben: alle als Custom Properties?
grep -n "#[0-9a-fA-F]\{3,6\}" $TARGET_DIR/*.css | grep -v "var(\|/\*" | wc -l
grep -n "\-\-" $TARGET_DIR/*.css | grep "color\|bg\|fg\|accent\|border" | head -20

# Spacing: konsistente Abstände?
grep -n "margin\|padding" $TARGET_DIR/*.css | grep -v "var(\|0\|auto" | head -15

# Animationen: sind sie sinnvoll?
grep -n "transition\|animation\|@keyframes" $TARGET_DIR/*.css | wc -l
```

**Bewerte mental:**
- Gibt es eine erkennbare visuelle Hierarchie? (Größe, Gewicht, Farbe als Ordnungs-Signal)
- Sind Abstände konsistent oder willkürlich?
- Hat die Seite eine klare Persönlichkeit / Identität oder wirkt sie generisch?
- Passt das Design zur Zielgruppe?

### 2B — UX & Usability (statisch)

```bash
# Primärer CTA vorhanden?
grep -n "class.*primary\|class.*cta\|class.*btn-main" $TARGET_DIR/*.html | head -5

# Ladeindikator / Feedback bei Aktionen?
grep -n "loading\|spinner\|disabled\|aria-busy" $TARGET_DIR/*.html | head -10

# Fehlermeldungen vorhanden?
grep -n "error\|fehler\|invalid\|ungültig" $TARGET_DIR/*.html | head -10

# Formular-Feedback
grep -n "required\|pattern\|validate\|constraint" $TARGET_DIR/*.html | head -10

# Navigation: Orientierung
grep -n "<nav\|breadcrumb\|back.*button\|zurück" $TARGET_DIR/*.html | head -5
```

**Bewerte mental:**
- Ist der primäre User Flow offensichtlich? (Was soll ich als Erstes tun?)
- Gibt es Feedback für jede Nutzeraktion? (Speichern, Laden, Fehler)
- Sind Fehlermeldungen verständlich und lösungsorientiert?
- Wie hoch ist der Cognitive Load? (Zu viele Optionen, zu viel Info auf einmal?)
- Gibt es eine klare Onboarding-Erfahrung für neue Nutzer?
- Sind Aktionen rückgängig machbar? (Undo, Bestätigung vor destruktiven Aktionen)

### 2C — Content & Copy (statisch)

```bash
# CTA-Texte: sind sie spezifisch?
grep -n "<button\|<a " $TARGET_DIR/*.html | grep -oi ">[^<]*<" | sort | uniq -c | sort -rn | head -20

# Leere Zustände: gibt es hilfreiche Texte?
grep -n "empty\|leer\|keine.*daten\|no.*items\|noch keine" $TARGET_DIR/*.html | head -10

# Placeholder-Texte als einziger Label-Ersatz?
grep -n "placeholder=" $TARGET_DIR/*.html | grep -v "aria-label\|<label" | head -10

# Lorem ipsum / Platzhalter-Content?
grep -in "lorem ipsum\|placeholder text\|example\.com\|todo\|fixme" $TARGET_DIR/*.html | head -5
```

**Bewerte mental:**
- Ist die Hauptaussage (Value Proposition) sofort klar? (5-Sekunden-Test)
- Sind CTAs handlungsorientiert? ("Jetzt starten" > "Klicken Sie hier")
- Sind Fehlermeldungen hilfreich? ("Bitte gültige URL eingeben" > "Ungültige Eingabe")
- Ist der Ton konsistent? (Sieze/Duze nicht mischen)
- Gibt es sinnvolle Leere-Zustände mit Handlungsaufforderung?

### 2D — Features (statisch)

```bash
# Tastaturkürzel dokumentiert?
grep -n "keyboard\|shortcut\|hotkey\|keydown\|keyup" $TARGET_DIR/*.html | head -10

# Suche vorhanden? (wenn nötig)
grep -n 'type="search"\|role="search"\|search.*input' $TARGET_DIR/*.html | head -5

# Export / Teilen / Kopieren?
grep -n "export\|share\|copy.*clip\|download" $TARGET_DIR/*.html | head -10

# Offline-Fähigkeit?
grep -rn "serviceWorker\|workbox\|offline" $TARGET_DIR/*.html $TARGET_DIR/*.js | head -5
```

**Bewerte mental:**
- Gibt es für die Zielgruppe erwartbare Features, die fehlen?
- Sind alle Features auffindbar? (nicht in einem verschachtelten Menü versteckt)
- Sind ähnliche Aktionen konsistent implementiert? (Speichern immer gleich)
- Gibt es Shortcuts / Power-User-Features für häufige Aktionen?
- Progressive Disclosure: Sind komplexe Features erst bei Bedarf sichtbar?

### 2E — SEO (statisch)

```bash
# Meta-Tags
grep -n "<title\|<meta name.*description\|<meta name.*keywords\|<link rel.*canonical" $TARGET_DIR/*.html

# Open Graph / Social Sharing
grep -n "og:title\|og:description\|og:image\|twitter:card" $TARGET_DIR/*.html

# Semantische HTML-Struktur
grep -n "<main\|<article\|<section\|<aside\|<header\|<footer\|<nav" $TARGET_DIR/*.html

# robots.txt / sitemap
ls $TARGET_DIR/robots.txt $TARGET_DIR/sitemap.xml 2>/dev/null

# Strukturierte Daten
grep -n "application/ld+json\|schema.org\|itemtype" $TARGET_DIR/*.html

# Kanonische URL
grep -n "rel.*canonical" $TARGET_DIR/*.html
```

### 2F — Security, Accessibility, Performance, Robustness

→ Vollständige Checklisten: [references/checklist-code.md](references/checklist-code.md)

**Schnell-Scan:**
```bash
# XSS
grep -rn "innerHTML\s*=\|dangerouslySetInnerHTML\|eval(" $TARGET_DIR --include="*.js" --include="*.html" | grep -v "node_modules"

# A11y: lang, alt, labels
grep -n "<html" $TARGET_DIR/*.html | grep -v "lang="
grep -n "<img" $TARGET_DIR/*.html | grep -v "alt="

# Render-blocking scripts
grep -n "<script src" $TARGET_DIR/*.html | grep -v "async\|defer"

# Promises ohne catch
grep -n "\.then(" $TARGET_DIR/*.html $TARGET_DIR/*.js | grep -v "\.catch\|\.finally" | head -10

# Dark Mode / Reduced Motion
grep -n "prefers-color-scheme\|prefers-reduced-motion" $TARGET_DIR/*.css $TARGET_DIR/*.html | wc -l
```

---

## Phase 3: Visueller Audit (Playwright)

→ Script-Template: [scripts/playwright-audit.js](scripts/playwright-audit.js)
→ Setup-Guide: [references/playwright-setup.md](references/playwright-setup.md)

**Screenshot-Philosophie:**

Jeder Screenshot spiegelt den **tatsächlichen User-View**. Es gibt drei Typen:

| Funktion | Wann verwenden |
|----------|----------------|
| `shotAboveFold(page, name)` | Standard: was der User auf Load sieht (scroll=0, viewport-only) |
| `shotViewport(page, name)` | Aktueller Scroll-Zustand des User-Views (z.B. nach Tab/Interaktion) |
| `shotWithContext(page, selector, name)` | Problem-Element in Kontext: scrollt zum Element + 80px Padding, viewport shot |
| `shotFull(page, name)` | Nur für Layout-Struktur-Analyse, nicht für visuellen Audit |

**Niemals:** `element.screenshot()` (kontextloser Crop) oder `fullPage: true` als Standardscreenshot.

**Szenarien:**

| # | Szenario | Viewport | Shots |
|---|----------|----------|-------|
| 1 | Landing (Light) | 1440×900 | `01a` above-fold + `01b` full (layout only) |
| 2 | Landing (Dark) | 1440×900 | `02` above-fold (direkter Light/Dark-Vergleich) |
| 3 | Mobile | 390×844 | `03a` above-fold + `03b` full + Context-Shots bei Issues |
| 4 | Tablet | 768×1024 | `04` above-fold |
| 5 | Keyboard-Nav | 1280×800 | `05` viewport nach Tab (Focus-Ring sichtbar in Kontext) |
| 6 | Reduced Motion | 1280×800 | `06a` Context-Shot offendes Element + `06b` above-fold |
| 7 | Error-States | 1440×900 | `09` Context-Shot: scrollt zu Input/Error-Message |
| 8 | A11y-Issues | 1280×800 | `07a/b` Context-Shots: Problem-Element mit Umgebung |

**Design-spezifische visuelle Checks:**
```javascript
// Visuelle Hierarchie: Verhältnis h1 zu body text
const typographyRatio = await page.evaluate(() => {
  const h1 = document.querySelector('h1');
  const body = document.querySelector('p, li, td');
  if (!h1 || !body) return null;
  const h1Size = parseFloat(window.getComputedStyle(h1).fontSize);
  const bodySize = parseFloat(window.getComputedStyle(body).fontSize);
  return { h1: h1Size, body: bodySize, ratio: (h1Size / bodySize).toFixed(1) };
});
// Gutes Verhältnis: 2.5x – 4x

// Whitespace: Padding / Margin ausreichend?
const spacing = await page.evaluate(() => {
  const main = document.querySelector('main, .main, #main, body > div');
  if (!main) return null;
  const s = window.getComputedStyle(main);
  return { paddingTop: s.paddingTop, paddingLeft: s.paddingLeft };
});

// Maximale Zeilenlänge (Lesbarkeit)
const lineLength = await page.evaluate(() => {
  const p = document.querySelector('p');
  return p ? p.getBoundingClientRect().width : null;
});
// Ideal: 45–75 Zeichen ≈ 400–650px bei 16px
```

---

## Phase 4: Findings-Report

```
## Web Audit Report — [Projektname]
**Datum:** YYYY-MM-DD | **Tier:** 0/1/2 | **Dauer:** Xs

### Gesamtbewertung
| Dimension | Score | Grade | Top-Finding |
|-----------|-------|-------|-------------|
| Design | XX | B | Kein konsistentes Spacing-System |
| UX/Usability | XX | A | — |
| Content & Copy | XX | C | CTAs zu generisch |
| Features | XX | B | Keine Tastaturkürzel |
| SEO | XX | D | Kein OG-Image, fehlende Meta-Description |
| Accessibility | XX | B | 3 Inputs ohne Label |
| Performance | XX | A | FCP 1.2s ✓ |
| Security | XX | A | — |
| Robustness | XX | B | 2 Promises ohne catch |
| Visual/Responsive | XX | B | Dark Mode BG korrekt |
| **Gesamt** | **XX** | **B** | |

---

### Findings

#### FAIL — [Titel]
**Dimension:** Design / UX / Content / Features / SEO / A11y / Performance / Security / Robustness / Visual
**Datei:** path/to/file.html:42
**Problem:** Was genau falsch ist und warum es wichtig ist.
**Fix:** Konkreter Code-Diff oder Handlungsanweisung.
**Screenshot:** `audit_shots/name.png`

#### WARN — [Titel]
...

#### INFO — [Titel] *(Verbesserungspotenzial, kein kritischer Fehler)*
...
```

### Severity-Definitionen

| Level | Wann |
|-------|------|
| **FAIL** | Security-Lücke, Crash-Risiko, WCAG AA-Verletzung, komplett fehlende erwartete Funktion, SEO-Blocker |
| **WARN** | Degradierte UX, Conversion-Killer, Design-Inkonsistenz, Performance-Problem, Content-Gap |
| **INFO** | Enhancement-Potential, Nice-to-have, Design-Vorschlag, Best-Practice-Gap |

---

## Phase 5: Design- & UX-Review (qualitativ)

Nach den automatisierten Checks: qualitative Bewertung mit Screenshots.

### 5-Sekunden-Test (simuliert)
Screenshot des Landing-Bereichs ansehen und beantworten:
1. Was ist das Produkt/der Service?
2. Für wen ist es?
3. Was soll ich als Nächstes tun?

Wenn eine dieser Fragen nicht sofort klar ist → WARN "Value Proposition unklar".

### Gestalt-Prinzipien prüfen
- **Nähe**: Zusammengehöriges nah beieinander?
- **Ähnlichkeit**: Gleiche Funktion = gleiches Aussehen?
- **Fortsetzung**: Führt das Layout das Auge?
- **Figur/Grund**: Ist der Fokuspunkt klar?

### Heuristische Evaluation (Nielsen's 10)
1. **Sichtbarkeit des Systemstatus** — Feedback auf Aktionen?
2. **Übereinstimmung mit der Realität** — Spricht die App die Sprache des Nutzers?
3. **Nutzerkontrolle & Freiheit** — Undo/Redo, Abbrechen möglich?
4. **Konsistenz & Standards** — Gleiches immer gleich?
5. **Fehlerprävention** — Werden Fehler verhindert, nicht nur gemeldet?
6. **Wiedererkennung statt Erinnerung** — Optionen sichtbar, nicht memorierbar?
7. **Flexibilität & Effizienz** — Shortcuts für Power User?
8. **Ästhetik & Minimalismus** — Nur das Nötigste?
9. **Hilfe bei Fehlern** — Fehlermeldungen klar und lösungsorientiert?
10. **Hilfe & Dokumentation** — Wo nötig verfügbar?

---

## Phase 6: Auto-Fix (wenn --fix)

Fix-Priorität:
1. FAIL Security → immer zuerst
2. FAIL A11y → kritische Barrieren
3. FAIL Robustness → Crash-Risiken
4. WARN Performance → messbar verbesserbar
5. WARN Content → einfache Text-Fixes
6. WARN Design → CSS-Fixes (Spacing, Farben)

**Nicht auto-fixen:**
- Design-Entscheidungen (Farbpalette, Layout-Konzept)
- Feature-Implementierungen die mehr als ~20 Zeilen benötigen
- Security-Issues die Architektur-Änderungen erfordern
- Content (Texte brauchen Redaktion, kein Auto-Fix)

---

## Quality Scoring

| Dimension | Gewicht | Score 0-100 | Grade |
|-----------|---------|-------------|-------|
| Design | 10% | X | A-F |
| UX/Usability | 15% | X | A-F |
| Content & Copy | 10% | X | A-F |
| Features | 10% | X | A-F |
| SEO | 10% | X | A-F |
| Accessibility | 15% | X | A-F |
| Performance | 10% | X | A-F |
| Security | 10% | X | A-F |
| Robustness | 5% | X | A-F |
| Visual/Responsive | 5% | X | A-F |
| **Gesamt (gewichtet)** | 100% | **X** | **A-F** |

Noten:
- **A (90-100)**: Produktionsreif, keine wesentlichen Probleme
- **B (75-89)**: Gut, mit kleinen Abstrichen shippable
- **C (55-74)**: Merkliche Lücken, Überarbeitung vor Launch nötig
- **D (35-54)**: Mehrere ernste Probleme
- **F (<35)**: Kritisch, nicht shippbar

---

## Referenz-Dateien

- [Code-Checkliste](references/checklist-code.md) — Security, A11y, Performance, Robustness, CSS
- [Design & UX-Checkliste](references/checklist-ux-design.md) — Design, Usability, Content, Features, SEO
- [Visual-Checkliste](references/checklist-visual.md) — Playwright-Szenarien, Viewports, Zustände
- [Playwright-Setup (Termux)](references/playwright-setup.md) — ARM64 proot-distro Anleitung
- [Playwright-Audit-Script](scripts/playwright-audit.js) — 10-Block generisches Audit-Template
