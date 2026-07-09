# pilot Skill Marketplace — Bauplan & Ausführungsprompt

**Projekt:** Internal Skill Marketplace für pilot Agenturgruppe  
**Typ:** Single-File HTML/CSS/JS — kein Backend, kein Build-Step  
**Ziel:** POC der komplett autark ausführbar ist, sofort im Browser läuft  
**Pfad:** `/data/data/com.termux/files/home/project/pilot-skillmarkt/index.html`

---

## 1. Kontext & Anforderungen

### Was ist das?
Ein internes Tool für pilot-Mitarbeiter:innen ("Piloten"), um Claude-Code-Skills zu entdecken, zu bewerten und zu empfehlen. Der Marktplatz zeigt:
- **Von pilot gebaute Skills** (intern entwickelt, z.B. webaudit, ralph-loop)
- **Von Anthropic bereitgestellte Skills** (Claude Code Builtins, claude-api etc.)
- **GSD-Skills** (interne Produktivitäts-/Workflow-Automationen)
- Piloten können Skills empfehlen (Endorsement), bewerten (1–5 Sterne) und kommentieren

### Wer nutzt es?
Mitarbeiter:innen bei pilot — Strateginnen, Texter, Mediaplaner, Developer. Nicht alle sind technisch. Die UI muss intuitiv sein.

---

## 2. Design System (von pilot.de abgeleitet)

### Farbpalette
```css
--color-black:    #262626;   /* primärer Dunkelton, Hintergrundfarbe dark */
--color-white:    #fcfcfc;   /* primäres Weiß */
--color-yellow:   #ffe05e;   /* Akzentfarbe — Highlight, Hover, CTAs */
--color-gray-l:   #bab8ab;   /* helles Grau, Placeholder */
--color-gray-m:   #98978e;   /* mittleres Grau */
--color-gray-d:   #7b7a71;   /* dunkleres Grau, Borders */
--color-gray-dd:  #636159;   /* dunkelgrau */
--color-bg:       #f1f1ec;   /* sehr helles Beige, Seitenhintergrund */
```

### Typography
```css
/* Pilot nutzt "Centra No1" + "Centra No2" — wir fallen auf System-Fonts zurück */
font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;

/* Skalierung: 10px base → rem-Einheiten */
/* H1: 6.4rem (mobile) / 9.6rem (desktop)  — Centra No2 Book HL, light */
/* H2: 3.2rem / 4.0rem                     — Centra No2, medium */
/* H3: 2.4rem / 2.8rem                     — Centra No2, medium */
/* Body: 1.8rem / 2.0rem                   — Centra No1, regular */
/* Small/Label: 1.4rem                     — Centra No1, regular */
/* Overline: 1.6rem / 1.8rem, UPPERCASE    — Centra No2, medium */
```

### CTA-Klassen (aus pilot.de)
```css
.c-cta.-yellow-bg    /* Gelb gefüllt, schwarzer Text — primäre Aktion */
.c-cta.-black-bg     /* Schwarz gefüllt, weißer Text */
.c-cta.-black-border /* Outline schwarz — sekundäre Aktion */
.c-cta.-yellow-border /* Outline gelb — auf dunklem Hintergrund */
```
- `border-radius: 3rem` (immer pill-förmig)
- Transitions: `all .2s cubic-bezier(.17,.67,.83,.67)`

### Layout
- Max-width: `144rem` mit `padding: 0 8rem` (desktop) / `0 2rem` (mobile)
- Breakpoint: `1024px` (mobile-first)
- Header: `8.5rem` Desktop / `6.8rem` Mobile, fixed, `z-index: 10`
- Hintergrund der Seite: `#f1f1ec` (off-white beige)
- Dark sections: `background: #262626`, Text: `#fcfcfc`

---

## 3. Datenmodell

### Skill-Objekt
```js
{
  id: 'webaudit',
  name: 'webaudit',
  tagline: 'Vollständiger Web-Audit mit Playwright-Visuals',
  description: `Kombiniert statische Code-Analyse mit echten Browser-Screenshots via Playwright. 
    Prüft UX, Design, Accessibility, Performance, SEO und Funktionalität — 
    alles in einem strukturierten Audit-Report.`,
  longDescription: `Detaillierte technische Beschreibung, Anwendungsfälle, Hinweise...`,
  category: 'pilot-inhouse',        // 'pilot-inhouse' | 'anthropic' | 'gsd' | 'community'
  subcategory: 'qa',                // 'qa' | 'development' | 'content' | 'productivity' | 'ai' | 'analytics'
  trigger: '/webaudit',             // Slash-Command zum Aktivieren
  installSource: 'claude-code',     // 'claude-code' | 'npm' | 'manual'
  author: 'Christopher Kipp',       // Ursprünglicher Ersteller
  version: '1.2.0',
  addedAt: '2025-11-01',
  updatedAt: '2026-06-15',
  tags: ['web', 'audit', 'qa', 'ux', 'playwright', 'performance'],
  useCases: ['Website-Launch-Check', 'Redesign-Validierung', 'Client-Präsentation'],
  difficulty: 'medium',             // 'easy' | 'medium' | 'advanced'
  timeToRun: '5–15 Min',
  requirements: ['Playwright', 'Claude Code'],
  rating: { average: 4.6, count: 12 },
  endorsements: [                   // Piloten die empfehlen
    { name: 'Christopher Kipp', role: 'Innovation Lead', avatar: 'CK', comment: 'Unser Standard-Tool vor jedem Go-Live.' },
    { name: 'Mia Hoffmann', role: 'UX Designerin', avatar: 'MH', comment: 'Spart mir 2h pro Projekt.' }
  ],
  comments: [
    { author: 'Jan Richter', role: 'Developer', avatar: 'JR', date: '2026-05-12', text: 'Sehr detaillierter Output. Lighthouse-Integration wäre noch cool.', rating: 5 },
    { author: 'Sophie Klein', role: 'Projektmanagerin', avatar: 'SK', date: '2026-04-08', text: 'Auch für Nicht-Techniker gut verständlich.', rating: 4 }
  ],
  featured: true,
  new: false,
  badge: null,                      // 'neu' | 'hot' | 'empfohlen' | null
}
```

### Pilot-Objekt (Endorser-Profil)
```js
{
  name: 'Christopher Kipp',
  role: 'Innovation Lead',
  department: 'Strategie & Innovation',
  avatar: 'CK',
  endorsedSkills: ['webaudit', 'claude-api', 'ralph-loop'],
  bio: 'Baut und kuratiert interne KI-Tools bei pilot.'
}
```

---

## 4. Skills-Katalog (Seed-Daten — vollständig)

### Kategorie: pilot inhouse
Selbst entwickelte Skills der pilot Agenturgruppe.

| ID | Name | Trigger | Ersteller | Rating | Featured |
|----|------|---------|-----------|--------|---------|
| `webaudit` | webaudit | `/webaudit` | Christopher Kipp | 4.6 | ✓ |
| `ralph-loop` | Ralph Loop | `/ralph-loop` | Christopher Kipp | 4.2 | ✓ |
| `japan2026` | Japan2026 Planner | `—` | Christopher Kipp | 4.8 | ✗ |
| `kf-assistant` | KF Assistant | `—` | pilot Dev Team | 3.9 | ✗ |

### Kategorie: Anthropic / Claude Code
Offizielle Skills von Anthropic bzw. Claude Code Builtins.

| ID | Name | Trigger | Quelle | Rating | Featured |
|----|------|---------|--------|--------|---------|
| `init` | init | `/init` | Anthropic | 4.5 | ✓ |
| `review` | review | `/review` | Anthropic | 4.7 | ✓ |
| `security-review` | security-review | `/security-review` | Anthropic | 4.8 | ✓ |
| `claude-api` | claude-api | `/claude-api` | Anthropic | 4.3 | ✓ |
| `update-config` | update-config | `/update-config` | Anthropic | 4.0 | ✗ |
| `loop` | loop | `/loop` | Anthropic | 4.4 | ✓ |
| `schedule` | schedule | `/schedule` | Anthropic | 4.1 | ✗ |
| `simplify` | simplify | `/simplify` | Anthropic | 4.6 | ✗ |
| `less-permission-prompts` | less-permission-prompts | `/less-permission-prompts` | Anthropic | 3.8 | ✗ |
| `keybindings-help` | keybindings-help | `/keybindings-help` | Anthropic | 3.5 | ✗ |

### Kategorie: GSD (pilot Produktivität)
Interne Workflow- und Automatisierungs-Skills.

| ID | Name | Trigger | Ersteller | Rating | Featured |
|----|------|---------|-----------|--------|---------|
| `briefing-gen` | Briefing Generator | `/briefing` | Marketing-Team | 4.4 | ✓ |
| `report-summary` | Report Summarizer | `/summarize` | Analytics-Team | 4.2 | ✓ |
| `meeting-notes` | Meeting Notes | `/meeting` | Collaboration-Team | 4.0 | ✗ |
| `campaign-check` | Campaign Checker | `/campaign-check` | Media-Team | 4.5 | ✓ |
| `pitch-deck` | Pitch Deck Assistant | `/pitch` | New Business | 3.9 | ✗ |
| `keyword-research` | Keyword Researcher | `/keywords` | SEO-Team | 4.3 | ✗ |

---

## 5. Features (priorisiert für POC)

### Muss (P0)
- [x] **Skill-Cards Grid** — responsives 3-spaltig (desktop) / 1-spaltig (mobile) Layout
- [x] **Skill-Detail-Modal** — Slide-in/Overlay mit vollständiger Beschreibung
- [x] **Suchfeld** — Live-Suche über Name, Tags, Beschreibung
- [x] **Kategorie-Filter** — Tabs: Alle / pilot inhouse / Anthropic / GSD
- [x] **Tag-Filter** — Multi-Select Chip-Buttons
- [x] **Sortierung** — Neueste / Meiste Bewertungen / Höchste Bewertung / A–Z
- [x] **Star-Rating-Anzeige** — 5-Sterne visuell auf Card und in Detail
- [x] **Endorsement-Badges** — Piloten-Avatare auf Card
- [x] **Featured-Section** — Hero-Bereich mit 3 Featured Skills

### Soll (P1)
- [x] **Rating abgeben** — User kann 1–5 Sterne klicken (localStorage)
- [x] **Kommentar schreiben** — Formular im Modal, gespeichert in localStorage
- [x] **Schwierigkeitsfilter** — Easy / Medium / Advanced Toggle
- [x] **"Neu"-Badge** — Skills die <30 Tage alt sind
- [x] **Piloten-Empfehlungs-Filter** — Zeige nur empfohlene Skills
- [x] **Anzahl-Badge** auf Filter-Tabs (z.B. "Anthropic (10)")

### Kann (P2)
- [x] **Copy-to-Clipboard** für Trigger-Command (z.B. `/webaudit`)
- [x] **Share-Link** (URL mit Skill-ID als Hash `#webaudit`)
- [x] **Dark/Light Toggle** (Seite hat bereits Dark-Sections)
- [x] **Piloten-Profile** Seite / Tab

---

## 6. Komponentenstruktur

```
index.html
├── <head>          CSS (inline) + Google Fonts (Inter als Fallback für Centra)
├── <header>        Fixed Header — pilot Logo + "Skill Marketplace" + Suche
├── <main>
│   ├── Hero-Section        Featured Skills (3 Karten, dunkler Hintergrund)
│   ├── Filter-Bar          Kategorie-Tabs + Chip-Filter + Sort-Dropdown
│   ├── Results-Info        "X Skills gefunden" + aktive Filter-Tags
│   ├── Skills-Grid         Card-Grid (alle gefilterten Skills)
│   └── Piloten-Section     "Unsere Empfehlungen von Piloten" (Testimonial-Row)
└── <footer>        Links, Copyright
    
<div id="modal">    Skill-Detail-Overlay (außerhalb von main)
├── Header (Name, Trigger-Badge, Close)
├── Meta-Row (Kategorie, Schwierigkeit, Dauer, Version)
├── Tabs (Übersicht | Bewertungen & Kommentare | Piloten)
├── Tab-Content:
│   ├── Übersicht: Beschreibung, Use Cases, Anforderungen
│   ├── Bewertungen: Stern-Eingabe + Kommentarformular + Kommentar-Liste
│   └── Piloten: Endorsement-Liste mit Zitaten
└── Footer: Trigger kopieren + Schließen
```

---

## 7. Filter-System im Detail

### Primäre Filter (immer sichtbar)
```
[Alle (28)] [pilot inhouse (4)] [Anthropic (10)] [GSD (6)] [Community (0)]
```

### Sekundäre Filter (Chip-Buttons, multi-select)
```
Schwierigkeit: [Einfach] [Mittel] [Fortgeschritten]
Tags: [qa] [development] [content] [productivity] [ai] [analytics] [web] [automation]
```

### Empfehlungs-Filter
```
☑ Nur von Piloten empfohlen
```

### Sortierung (Dropdown)
```
Empfohlen ▾ | Höchste Bewertung | Meiste Bewertungen | Neueste | A–Z
```

### Filter-State
- Alle Filter im URL-Hash serialisiert (`#cat=anthropic&tag=qa&sort=rating`)
- Reset-Button wenn aktive Filter vorhanden

---

## 8. Rating & Kommentar-System

### Rating
- 5-Sterne-Widget: SVG-Sterne, interaktiv (hover + click)
- Rating wird in `localStorage` unter `pilot_ratings_${skillId}` gespeichert
- Globaler Average wird live aus Seed-Daten + localStorage berechnet
- Anzeige: `★ 4.6 (12 Bewertungen)` — kompakt auf Card, expandiert im Modal

### Kommentar-Formular
```html
<input placeholder="Name">
<input placeholder="Deine Rolle">
<textarea placeholder="Dein Kommentar...">
<div class="star-input">  <!-- Bewertung direkt im Formular -->
<button>Kommentar abschicken</button>
```
- Gespeichert in `localStorage` unter `pilot_comments_${skillId}` als Array
- Validierung: Name + Kommentar Pflichtfelder
- Anzeige: Neueste Kommentare zuerst, Avatar aus Initialen generiert
- Format: `[Initial-Avatar] [Name] · [Rolle] · [Datum] ⭐⭐⭐⭐⭐`

---

## 9. Piloten-Empfehlungs-System

### Endorsement auf Card
- Zeige bis zu 3 Piloten-Avatare (Initials-Circles in pilot-Gelb)
- Tooltip bei Hover: "Empfohlen von: Mia Hoffmann, Jan Richter, ..."
- Badge: `★ Piloten-Empfehlung` wenn ≥2 Endorsements

### Endorsement im Modal
- Piloten-Tab: Liste aller Endorser mit Name, Rolle, Zitat
- Avatar: 4rem Kreis mit Initialen, `background: #ffe05e`, `color: #262626`

### Piloten-Section auf Startseite
- Testimonial-Karussell / Grid: "Das sagen unsere Piloten"
- Format: Großes Zitat + Avatar + Name + empfohlener Skill

---

## 10. Tech-Stack & Implementierung

### Stack
- **Kein Framework** — Vanilla JS + CSS, alles inline im HTML
- **Kein Build-Step** — öffnet sofort im Browser
- **Kein Backend** — alle Daten inline als JS-Array, Ratings/Comments in localStorage
- **Optional:** `data:`-URI für kleines pilot-Logo (SVG)

### CSS-Architektur
```
:root { /* Design Tokens */ }
/* Reset (minimal) */
/* Layout (header, main, footer, grid) */
/* Components: card, modal, filter-bar, star-rating, tag-chip, avatar */
/* States: active, hover, featured, new-badge */
/* Animations: modal-slide-in, fade, card-hover */
/* Responsive: @media (max-width: 1023px) */
```

### JS-Architektur
```js
const SKILLS = [...];     // Seed-Daten
const PILOTS = [...];     // Piloten-Profile

const state = {
  category: 'all',
  tags: [],
  difficulty: [],
  onlyEndorsed: false,
  sort: 'recommended',
  search: '',
  activeSkill: null,
  activeTab: 'overview',
};

function render() { /* Hauptrender-Funktion */ }
function filterSkills() { /* Filter + Sortierung */ }
function openModal(skillId) { /* Modal öffnen */ }
function submitRating(skillId, stars) { /* localStorage */ }
function submitComment(skillId, data) { /* localStorage */ }
function copyTrigger(trigger) { /* Clipboard + Toast */ }
function updateURL() { /* Hash-Sync */ }
function restoreFromURL() { /* Hash-Restore */ }
```

---

## 11. Visuelles Konzept — Screen-by-Screen

### Screen 1: Hero / Featured
```
┌─────────────────────────────────────────────────────┐
│ [pilot logo]          Skill Marketplace   [Suche 🔍] │ ← Header, bg #262626
├─────────────────────────────────────────────────────┤
│                                                     │
│  Unsere Tools.                                      │ ← H1, Centra No2, weiß
│  Entdecke & teile Skills.                           │ ← Subline, gelb underline
│                                                     │
│  ┌──────────────┐ ┌──────────────┐ ┌─────────────┐ │ ← Featured 3x Cards
│  │ ★ FEATURED   │ │ ★ FEATURED   │ │ ★ FEATURED  │ │    border-left: 4px #ffe05e
│  │ webaudit     │ │ review       │ │ briefing-gen│ │
│  │ ⭐ 4.6 (12)  │ │ ⭐ 4.7 (18)  │ │ ⭐ 4.4 (9)  │ │
│  └──────────────┘ └──────────────┘ └─────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
  bg: #262626
```

### Screen 2: Filter + Grid
```
┌─────────────────────────────────────────────────────┐
│ [Alle 28][pilot inhouse 4][Anthropic 10][GSD 6]     │ ← Kategorie-Tabs
│ Schwierigkeit: [Einfach][Mittel][Fortgeschritten]   │
│ Tags: [qa][web][ai][automation]... [⭐ Nur empfohlene]│
│ 28 Skills gefunden  ────────────  Sortierung ▾      │
├────────────┬────────────┬──────────────────────────-┤
│ webaudit   │ review     │ security-review            │
│ pilot      │ Anthropic  │ Anthropic                  │
│ ⭐4.6 ●●○  │ ⭐4.7 ●●●  │ ⭐4.8 ●●●                  │
│ CK MH +1  │ JR SK      │ CK                        │
├────────────┼────────────┼────────────────────────────┤
│ claude-api │ briefing.. │ campaign-check             │
│ ...        │ ...        │ ...                        │
└─────────────────────────────────────────────────────┘
  bg: #f1f1ec
```

### Screen 3: Skill Detail Modal
```
┌─────────────────────────────────────────────────────┐
│ webaudit               [/webaudit 📋]          [✕] │ ← Header
│ pilot inhouse · Mittel · 5–15 Min · v1.2.0         │
├─────────────────────────────────────────────────────┤
│ [Übersicht] [Bewertungen & Kommentare] [Piloten]    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Vollständiger Web-Audit mit Code-Analyse +         │ ← Description
│  Playwright-Visuals. Prüft UX, Design,             │
│  Accessibility, Performance und SEO.               │
│                                                     │
│  Anwendungsfälle:                                  │ ← Use Cases
│  • Website-Launch-Check                            │
│  • Redesign-Validierung                            │
│  • Client-Präsentation                             │
│                                                     │
│  Tags: [web] [qa] [ux] [playwright] [performance]  │
│                                                     │
│  [Skill installieren]  [/webaudit kopieren]         │ ← CTAs
└─────────────────────────────────────────────────────┘
```

---

## 12. Seed-Daten (vollständig, alle Skills)

Alle Skills müssen vollständig mit echten Beschreibungen, Tags, Use Cases und Endorsements in der JS-Data definiert sein. Keine Platzhalter.

### pilot inhouse Skills

**webaudit** — Vollständiger Web-Audit mit Code + Visual  
Trigger: `/webaudit` | Gebaut von: Christopher Kipp | Tags: web, qa, ux, playwright, performance  
Beschreibung: Kombiniert statische Code-Analyse mit echten Browser-Screenshots via Playwright. Prüft UX, Design, Accessibility (WCAG), Performance, SEO und Funktionalität. Output: strukturierter Markdown-Report mit konkreten Handlungsempfehlungen. Besonders wertvoll für Launch-Checks und Client-Reviews.  
Endorsements: Christopher Kipp ("Standard vor jedem Go-Live"), Mia Hoffmann ("Spart 2h pro Projekt")  
Rating: 4.6 (12) | Difficulty: mittel | Zeit: 5–15 Min

**ralph-loop** — Iterativer Claude-Loop mit Selbst-Pacing  
Trigger: `/ralph-loop` | Gebaut von: Christopher Kipp | Tags: automation, ai, workflow  
Beschreibung: Startet einen autonomen Claude-Loop der sich selbst auf Grundlage von Ergebnissen neu startet. Ideal für iterative Optimierungsaufgaben, Monitoring und längere Analyse-Prozesse. Includes Start/Cancel-Funktionalität.  
Endorsements: Christopher Kipp ("Für komplexe Mehrschritt-Aufgaben unverzichtbar")  
Rating: 4.2 (7) | Difficulty: fortgeschritten | Zeit: variabel

**kf-assistant** — Kreativ-Briefing Assistent  
Trigger: kein Slash-Command (direkter Workflow) | Tags: content, ai, briefing  
Beschreibung: Internes Tool für das Kreativ-Team. Unterstützt bei der Strukturierung von Kreativ-Briefings durch gezielte Fragen und Template-Generierung.  
Rating: 3.9 (5) | Difficulty: einfach | Zeit: 10 Min

### Anthropic Skills

**init** — CLAUDE.md Initialisierung  
Trigger: `/init` | Tags: development, setup, documentation  
Beschreibung: Erstellt automatisch eine vollständige CLAUDE.md Datei für das aktuelle Projekt. Analysiert Dateistruktur, erkennt Tech-Stack, dokumentiert Konventionen. Basis für jeden neuen Claude-Code-Einsatz.  
Rating: 4.5 (23) | Difficulty: einfach | Zeit: 2–5 Min

**review** — Pull Request Review  
Trigger: `/review` | Tags: development, qa, code-review  
Beschreibung: Führt einen strukturierten Code-Review für den aktuellen Branch durch. Analysiert Diff, prüft auf Bugs, Security-Issues, Performance-Probleme und Code-Style. Output: Kommentare pro Datei + Gesamtbewertung.  
Rating: 4.7 (31) | Difficulty: mittel | Zeit: 3–10 Min

**security-review** — Security Review  
Trigger: `/security-review` | Tags: development, security, qa  
Beschreibung: Dedizierter Security-Scan für Code-Änderungen. Prüft auf OWASP Top 10, Injection-Vulnerabilities, Auth-Schwächen, Daten-Exposition. Besonders wichtig vor Releases und bei Auth-Änderungen.  
Rating: 4.8 (19) | Difficulty: mittel | Zeit: 5–15 Min

**claude-api** — Claude API / Anthropic SDK  
Trigger: `/claude-api` | Tags: development, ai, api  
Beschreibung: Spezialisierter Assistent für die Entwicklung mit der Anthropic API / Claude SDK. Beinhaltet Prompt Caching, Tool Use, Batch Processing und Migration zwischen Modell-Versionen. Optimiert automatisch für Cache-Effizienz.  
Rating: 4.3 (14) | Difficulty: fortgeschritten | Zeit: variabel

**loop** — Wiederkehrende Aufgaben  
Trigger: `/loop` | Tags: automation, workflow, productivity  
Beschreibung: Führt einen Prompt oder Slash-Command wiederholt auf einem selbst-gewählten Intervall aus. Ideal für Monitoring, wiederholte Checks und iterative Aufgaben. Selbst-pacing: Claude wählt sinnvollen Takt.  
Rating: 4.4 (16) | Difficulty: einfach | Zeit: —

**schedule** — Geplante Remote Agents  
Trigger: `/schedule` | Tags: automation, workflow  
Beschreibung: Erstellt, verwaltet und führt geplante Remote-Agents auf Cron-Schedule aus. Automatisiert wiederkehrende Aufgaben ohne manuellen Eingriff.  
Rating: 4.1 (8) | Difficulty: mittel | Zeit: —

**simplify** — Code Vereinfachung & Review  
Trigger: `/simplify` | Tags: development, refactoring, qa  
Beschreibung: Analysiert kürzlich geänderten Code auf Wiederverwendbarkeit, Qualität und Effizienz. Identifiziert unnötige Komplexität und schlägt Vereinfachungen vor.  
Rating: 4.6 (11) | Difficulty: einfach | Zeit: 2–5 Min

**update-config** — Claude Code Konfiguration  
Trigger: `/update-config` | Tags: setup, development, configuration  
Beschreibung: Konfiguriert Claude Code via settings.json. Automatisierte Verhaltensweisen ("bei X tue Y"), Permissions, Env-Variablen und Hooks. Notwendig wenn Standardverhalten angepasst werden soll.  
Rating: 4.0 (9) | Difficulty: mittel | Zeit: variabel

**less-permission-prompts** — Permission-Optimierung  
Trigger: `/less-permission-prompts` | Tags: setup, productivity  
Beschreibung: Scannt Transcripts nach häufigen Read-only Bash- und MCP-Tool-Calls und fügt eine priorisierte Allowlist zur settings.json hinzu. Reduziert Unterbrechungen durch Permission-Dialoge.  
Rating: 3.8 (6) | Difficulty: einfach | Zeit: 5 Min

**keybindings-help** — Tastenkürzel-Konfiguration  
Trigger: `/keybindings-help` | Tags: setup, productivity  
Beschreibung: Hilft beim Anpassen von Tastaturkürzeln in Claude Code. Chord-Bindings, Rebinding, Modifikation von ~/.claude/keybindings.json.  
Rating: 3.5 (4) | Difficulty: einfach | Zeit: 5 Min

### GSD Skills (pilot Produktivität)

**briefing-gen** — Briefing Generator  
Trigger: `/briefing` | Tags: content, productivity, templates  
Beschreibung: Generiert strukturierte Kreativ-, Media- und Projektbriefings aus wenigen Eckdaten. Stellt gezielte Rückfragen, ergänzt Marktkontext und erstellt ein vollständiges Briefing-Dokument nach pilot-Standard.  
Rating: 4.4 (17) | Difficulty: einfach | Zeit: 5–10 Min

**report-summary** — Report Summarizer  
Trigger: `/summarize` | Tags: analytics, content, productivity  
Beschreibung: Fasst lange Analysen, Performance-Reports und Marktdaten kompakt zusammen. Input: PDF, Excel oder Text. Output: Executive Summary + Key Insights + Handlungsempfehlungen in Deutsch.  
Rating: 4.2 (13) | Difficulty: einfach | Zeit: 3–8 Min

**meeting-notes** — Meeting Notes  
Trigger: `/meeting` | Tags: productivity, collaboration  
Beschreibung: Wandelt rohe Mitschriften oder Sprach-Transkripte in strukturierte Meeting-Protokolle um. Format: Agenda, Beschlüsse, Action Items (wer, was, bis wann), nächste Schritte.  
Rating: 4.0 (10) | Difficulty: einfach | Zeit: 2–5 Min

**campaign-check** — Campaign Checker  
Trigger: `/campaign-check` | Tags: analytics, qa, media  
Beschreibung: Prüft Kampagnen-Setups auf Vollständigkeit und Fehler. Tracking-Codes, UTM-Parameter, Zielgruppen-Definitionen, Budget-Allocation und KPI-Definitionen. Besonders für Media-Launches.  
Rating: 4.5 (21) | Difficulty: mittel | Zeit: 10–20 Min

**pitch-deck** — Pitch Deck Assistent  
Trigger: `/pitch` | Tags: content, new-business, templates  
Beschreibung: Unterstützt bei der Erstellung von Pitch-Decks. Strukturiert Argumentation, erstellt Slide-by-Slide Outline, formuliert Value Propositions und passt Tonalität an Zielgruppe an.  
Rating: 3.9 (7) | Difficulty: mittel | Zeit: 15–30 Min

**keyword-research** — Keyword Researcher  
Trigger: `/keywords` | Tags: seo, analytics, content  
Beschreibung: Führt strukturierte Keyword-Analysen durch. Gruppiert Keywords nach Intent (informational, navigational, transactional), bewertet Schwierigkeit und erstellt Content-Cluster-Empfehlungen.  
Rating: 4.3 (15) | Difficulty: mittel | Zeit: 10–15 Min

---

## 13. Piloten-Profile (Endorser)

```js
const PILOTS = [
  {
    name: 'Christopher Kipp',
    initials: 'CK',
    role: 'Innovation Lead',
    department: 'Strategie & Innovation',
    skills: ['webaudit', 'claude-api', 'ralph-loop', 'review', 'loop'],
    bio: 'Entwickelt und kuratiert KI-Tools für das gesamte pilot-Ökosystem.'
  },
  {
    name: 'Mia Hoffmann',
    initials: 'MH',
    role: 'Senior UX Designerin',
    department: 'UX & Design',
    skills: ['webaudit', 'briefing-gen', 'simplify'],
    bio: 'Nutzt KI-Tools um Design-Qualität und Effizienz zu steigern.'
  },
  {
    name: 'Jan Richter',
    initials: 'JR',
    role: 'Lead Developer',
    department: 'Tech & Platforms',
    skills: ['review', 'security-review', 'claude-api', 'update-config'],
    bio: 'Setzt auf automatisierte Reviews für schnellere Release-Zyklen.'
  },
  {
    name: 'Sophie Klein',
    initials: 'SK',
    role: 'Projektmanagerin',
    department: 'Projektmanagement',
    skills: ['meeting-notes', 'report-summary', 'campaign-check', 'briefing-gen'],
    bio: 'Automatisiert repetitive Aufgaben um mehr Zeit für Strategie zu haben.'
  },
  {
    name: 'Lukas Weber',
    initials: 'LW',
    role: 'SEO Strategist',
    department: 'Performance Marketing',
    skills: ['keyword-research', 'webaudit', 'report-summary'],
    bio: 'Kombiniert KI-Tools mit SEO-Expertise für bessere Sichtbarkeit.'
  },
  {
    name: 'Anna Schreiber',
    initials: 'AS',
    role: 'Content Strategin',
    department: 'Content & Kreation',
    skills: ['briefing-gen', 'pitch-deck', 'meeting-notes', 'report-summary'],
    bio: 'Nutzt KI als Kreativ-Partner für Content und Kampagnen.'
  }
];
```

---

## 14. Animations & Interactions

### Card Hover
```css
.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(38,38,38,.12);
}
```

### Modal
- Öffnen: Slide-up aus unten + Fade-in Overlay
- Schließen: Reverse-Animation
- ESC-Key schließt Modal
- Click auf Overlay schließt Modal

### Filter-Wechsel
- Cards faden beim Filter-Wechsel kurz aus/ein (100ms opacity)
- Kategorie-Tab wechselt mit gelber Unterstreichung

### Toast-Notification
- Erscheint unten-mitte bei "Kopiert!" und "Kommentar gespeichert"
- pilot-Design: `bg: #262626`, `border-radius: 2.5rem`
- Auto-dismissal nach 2.5s

### Star-Rating (interaktiv)
- Hover: Sterne füllen sich progressiv mit Gelb
- Hover-Out: Zeigt gespeicherten Wert
- Click: Speichert + Mini-Animation (scale 1.2 → 1)

---

## 15. Ausführungsschritte (für Bau der App)

1. **Grundstruktur** — HTML-Skelett mit Head, Header, Main, Footer, Modal-Div
2. **CSS** — Design Tokens, Reset, Layout, Typographie
3. **Skill-Daten** — Alle Skills + Piloten als JS-Konstanten
4. **State & Render** — State-Objekt, Hauptrender-Funktion, Card-Template
5. **Filter-System** — filterSkills(), Tab-Clicks, Chip-Toggles, Sort-Dropdown
6. **Suchfeld** — Live-Search mit Debounce (150ms)
7. **Modal** — openModal(), Tab-Wechsel, Close-Logik
8. **Rating-System** — Star-Widget (Anzeige + Input), localStorage-Integration
9. **Kommentar-System** — Formular, localStorage, Render-Liste
10. **Copy + Toast** — Clipboard-API, Toast-Komponente
11. **URL-Sync** — Hash-Serialisierung aller Filter-States
12. **Featured Hero** — Separate Render-Funktion für Hero-Sektion
13. **Piloten-Section** — Render-Funktion für Endorser-Grid
14. **Responsive** — Mobile-Breakpoints, Touch-Optimierungen
15. **Polish** — Animationen, Transitions, Edge Cases, Empty States

---

## 16. Datei-Output

```
/data/data/com.termux/files/home/project/pilot-skillmarkt/
├── index.html      ← Alles in einer Datei (~1500–2000 Zeilen)
└── PLAN.md         ← Dieser Plan
```

**Die App muss:**
- ohne Server funktionieren (`file://` öffenbar)
- responsive sein (Chrome für Android ist Hauptbrowser)
- localStorage für Ratings/Comments nutzen (kein Backend nötig)
- vollständig Deutsch sein (Interface + Labels)
- 100% auf dem Pilot Design System basieren

---

*Plan erstellt: 2026-07-08 · Für autonome Ausführung durch Claude Code*
