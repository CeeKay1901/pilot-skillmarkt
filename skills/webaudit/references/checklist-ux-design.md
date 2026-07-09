# UX, Design, Content, Features & SEO Checkliste

Qualitative und quantitative Checks für alles jenseits von Code-Korrektheit.

---

## 1. Design

### Visuelle Hierarchie
- [ ] Es gibt eine klare Haupt-Aussage (H1 / Hero) — visuell größer und dominanter als alles andere
- [ ] Überschriften-Größen erzeugen deutliche Stufen (Ratio h1:body ≥ 2.5x, idealerweise 3x+)
- [ ] Primärer CTA sticht visuell heraus (Farbe, Größe, Kontrast)
- [ ] Sekundäre Infos treten optisch zurück (Farbe, Gewicht, Größe)
- [ ] Fließtext hat ausreichend Zeilenabstand (line-height 1.4–1.6)

### Typografie
- [ ] Max. 2–3 Schriftfamilien auf der ganzen Seite
- [ ] Font-Scale ist definiert und konsistent (nicht willkürliche px-Werte)
- [ ] Zeichenzahl pro Zeile: 45–75 (Desktop), 35–50 (Mobile)
- [ ] Keine serifenlose Schrift unter 13px im Fließtext
- [ ] Überschriften und Body-Text haben ausreichend Kontrast zueinander (Gewicht, Größe oder Farbe)
- [ ] Schrift-Rendering: kein subpixel-Antialiasing-Flackern, sauber bei 1x und 2x DPR

### Farbe & Palette
- [ ] Alle Farben kommen aus einem definierten Token-System (`--var`)
- [ ] Akzentfarbe wird sparsam eingesetzt (Fokus auf Aktionen, nicht dekorativ)
- [ ] Hintergrundfarbe ist nicht reines Weiß (#fff) oder reines Schwarz (#000) — leichte Tönung = weniger Anstrengung
- [ ] Farbpalette hat interne Logik (analoges / komplementäres System)
- [ ] Keine zufälligen Grautöne — entweder System oder keines
- [ ] Farbe allein trägt keine Information (immer Icon oder Text dazu)

### Spacing & Layout-Rhythmus
- [ ] Abstände folgen einem Grid oder Scale (4px / 8px / 16px / 24px / 32px / 48px / 64px)
- [ ] Großzügiger Whitespace > kein Whitespace (Atmen lassen)
- [ ] Sections sind visuell klar voneinander getrennt (Farbe, Abstand oder Linie — konsequent eines)
- [ ] Karten/Boxen haben einheitliche Innenabstände
- [ ] Elemente in einem Grid sind tatsächlich ausgerichtet (kein optisches Zittern)

### Konsistenz
- [ ] Alle Buttons gleicher Typ sehen gleich aus (primary = immer dieselbe Farbe/Form)
- [ ] Hover-States konsistent (immer gleiche Art von Feedback)
- [ ] Border-Radius konsistent (nicht mal 4px, mal 12px, mal 999px ohne System)
- [ ] Iconset einheitlich (nicht Mix aus verschiedenen Bibliotheken)
- [ ] Schatten-System: maximal 2–3 Stufen (ambient, card, modal), konsistent eingesetzt

### Ästhetik & Persönlichkeit
- [ ] Das Design hat eine erkennbare Persönlichkeit (nicht austauschbar generisch)
- [ ] Hero/Einstieg macht neugierig oder gibt Orientierung (kein bloßer Titel + Stockfoto)
- [ ] Visuelle Sprache passt zur Zielgruppe und zum Produkt
- [ ] Dekorationen dienen der Orientierung oder Stimmung — keine leere Ornamentik
- [ ] Bilder/Illustrationen konsistent im Stil (nicht Mix aus verschiedenen Quellen)

---

## 2. UX & Usability

### Erster Eindruck (5-Sekunden-Test)
- [ ] Value Proposition sofort klar: Was ist das? Für wen? Warum?
- [ ] Primäre Aktion sofort erkennbar (kein Suchen nach dem Einstieg)
- [ ] Seite lädt ohne sichtbares Flackern oder Layout-Sprünge (kein CLS)
- [ ] Keine überfrachtete erste Ansicht (Cognitive Load < Aufmerksamkeitsspanne)

### User Flows
- [ ] Primärer Flow hat ≤ 3 Schritte bis zum Kern-Feature
- [ ] Jeder Schritt zeigt klar, was als Nächstes kommt
- [ ] Kein Dead End: nach jeder Aktion gibt es einen sinnvollen Weiterweg
- [ ] Zurück-Navigation / Abbrechen immer möglich
- [ ] Destruktive Aktionen haben Bestätigung ("Wirklich löschen?")

### Feedback & Systemstatus
- [ ] Jede Nutzeraktion hat sichtbares Feedback innerhalb 100ms (visuell) oder 1s (Ladeanzeige)
- [ ] Ladezeiten > 300ms: Spinner oder Skeleton-Screen
- [ ] Ladezeiten > 2s: Fortschrittsanzeige mit Kontext
- [ ] Erfolgsmeldungen sind sichtbar und verständlich (Toast, Inline-Bestätigung)
- [ ] Button deaktiviert während Aktion läuft (verhindert Doppel-Submit)
- [ ] Formulare zeigen Validierungs-Feedback live oder beim Verlassen des Feldes (nicht erst nach Submit)

### Fehlerprävention & -behandlung
- [ ] Inputs mit Constraints zeigen Format-Hinweis (placeholder oder helper text)
- [ ] Required-Felder klar markiert (Sternchen + Erklärung)
- [ ] Fehlermeldungen: was ist falsch + wie fixe ich es (nie nur "Ungültige Eingabe")
- [ ] Fehlermeldungen stehen beim verursachenden Element (nicht nur oben auf der Seite)
- [ ] Netzwerkfehler werden mit Retry-Option angezeigt
- [ ] Leere Suche / kein Ergebnis: hilfreicher Text + alternativer Weg

### Onboarding & Orientierung
- [ ] Neuer Nutzer versteht innerhalb von 30s, was er tun soll
- [ ] Erster Start: hilfreich leerer Zustand (nicht: leere Liste ohne Kontext)
- [ ] Wichtige Features sind auffindbar ohne Handbuch
- [ ] Tooltips / Helper-Text für komplexe Features
- [ ] Progressive Disclosure: Komplexität erst zeigen wenn nötig

### Effizienz (für wiederkehrende Nutzer)
- [ ] Häufige Aktionen sind mit ≤ 2 Klicks erreichbar
- [ ] Tastaturkürzel für Power-User-Aktionen (wenn relevant)
- [ ] Zuletzt verwendete Eingaben / Auswahl werden erinnert (wenn sinnvoll)
- [ ] Massenaktionen möglich wenn nötig (nicht jede Aktion einzeln)

### Kognitive Last
- [ ] Maximal 7±2 gleichzeitig sichtbare Optionen (Miller's Law)
- [ ] Ähnliche Informationen sind gruppiert (Gestalt: Nähe)
- [ ] Keine redundanten Kontrollen (nicht dieselbe Aktion an 3 Stellen)
- [ ] Wichtiges wird nicht durch Unwichtiges konkurriert (klare Priorisierung)

---

## 3. Content & Copy

### Value Proposition
- [ ] H1 oder Hero-Text sagt in einem Satz, was das Produkt ist und für wen
- [ ] Kein Jargon der Entwickler — Sprache der Zielgruppe
- [ ] Nutzen klar (nicht Feature-Liste: "Was habe ich davon?" beantwortet)
- [ ] Konkret statt vage ("Feedback in 60 Sekunden erfassen" > "Schnelles Feedback-Tool")

### CTAs (Call to Action)
- [ ] CTAs sind handlungsorientiert (Verb + Substantiv: "Audit starten", nicht "Los")
- [ ] Primärer CTA sagt was passiert danach ("Kostenlos testen — kein Account nötig")
- [ ] Maximal ein primärer CTA pro Sichtbereich
- [ ] Kein "Klicken Sie hier" oder "Mehr erfahren" ohne Kontext
- [ ] CTA-Label bleibt nach Klick konsistent mit dem was folgt

### Mikrokopie
- [ ] Placeholder-Texte geben konkreten Beispielwert (nicht "Eingabe...")
- [ ] Button-Labels spezifisch für Kontext (nicht überall "OK" / "Bestätigen")
- [ ] Tooltips erklären den Nutzen, nicht die Funktion ("Zeigt Element-Details" > "Hover-Modus")
- [ ] Modal-Titel ist eine Aussage, kein Button-Label
- [ ] Ladetext kontextspezifisch ("Seite wird analysiert..." > "Lädt...")

### Fehlertexte
- [ ] Fehlermeldungen: keine technischen Begriffe (kein "500 Internal Server Error")
- [ ] Fehlermeldungen bieten Lösung oder nächsten Schritt
- [ ] Fehlertexte nicht entschuldigend, nicht schuldzuweisend — neutral und hilfreich
- [ ] Validierungsfehler vor Submit erklären Format ("Format: https://beispiel.de")

### Leere Zustände
- [ ] Jeder leere Zustand hat: Kontext (warum leer?) + Handlungsaufforderung
- [ ] Erster Start: motivierender Einstieg, kein leeres Nichts
- [ ] Zero-State-Illustration oder Icon unterstützt Verständnis (optional, aber hilfreich)
- [ ] Keine generischen Texte: "Keine Elemente" → "Noch kein Feedback — jetzt ersten Kommentar hinzufügen"

### Ton & Konsistenz
- [ ] Duzen oder Siezen — konsistent durch die ganze App
- [ ] Deutsch oder Englisch — konsistent (kein Mix)
- [ ] Produktname konsistent geschrieben
- [ ] Kein Lorem Ipsum oder Platzhalter im finalen Stand
- [ ] Texte vollständig und fehlerfrei (kein "TODO" im UI)

---

## 4. Features

### Vollständigkeit
- [ ] Alle im Hero/Headline versprochenen Features tatsächlich vorhanden
- [ ] Kern-Feature ohne Anmeldung testbar (wenn möglich)
- [ ] Exportieren / Speichern / Teilen vorhanden wenn erwartet
- [ ] Such- / Filterfunktion wenn mehr als ~10 Items möglich sind
- [ ] Sortierung wenn Reihenfolge relevant ist

### Auffindbarkeit
- [ ] Alle Features innerhalb von 3 Klicks erreichbar
- [ ] Keine Features ausschließlich über Tooltips oder Hover sichtbar (mobile!)
- [ ] Wichtige Aktionen nicht im Hamburger-Menü versteckt wenn direkter Zugang möglich
- [ ] Keine Funktionen nur über nicht-offensichtliche Gesten (Swipe, Doppelklick) — oder zumindest mit Hinweis

### Konsistenz
- [ ] Gleiche Aktion überall gleich benannt und gleich aussehend
- [ ] Gleiche Tastaturkürzel konsistent (nicht Strg+S in einem Formular, Strg+Enter im anderen)
- [ ] Gleiches Verhalten bei Escape, Enter, Tab in allen Modals/Formularen
- [ ] Speichern-Mechanismus konsistent (autosave vs. manuell — konsistent kommunizieren)

### Fehlende Basis-Features (prüfen je nach Kontext)
- [ ] **Undo** wenn Aktionen destruktiv sind
- [ ] **Offline-Handling** wenn App ohne Internet nutzbar sein soll
- [ ] **Deeplinks** — kann ich einen bestimmten Zustand teilen/bookmarken?
- [ ] **Barrierefreiheits-Features** — Schriftgrößenanpassung, Hochkontrast-Unterstützung
- [ ] **Keyboard-Only-Nutzbarkeit** für alle Kern-Features

---

## 5. SEO

### Technisch
- [ ] `<title>` vorhanden, einzigartig, 50–60 Zeichen, beschreibend
- [ ] `<meta name="description">` vorhanden, 120–158 Zeichen, kein Keyword-Stuffing
- [ ] `<link rel="canonical">` wenn Seite unter mehreren URLs erreichbar
- [ ] `robots.txt` vorhanden (auch wenn simpel)
- [ ] `sitemap.xml` vorhanden bei Multi-Page-Sites
- [ ] HTTPS — keine Mixed-Content-Warnungen

### Semantik
- [ ] Genau eine `<h1>` pro Seite, enthält primäres Keyword
- [ ] Überschriften-Hierarchie logisch (h1 → h2 → h3)
- [ ] `<main>`, `<article>`, `<section>` korrekt eingesetzt
- [ ] Wichtige Links haben beschreibenden Text (kein "hier klicken")
- [ ] Bilder haben sinnvolle `alt`-Attribute (Keyword wo natürlich)

### Social Sharing
- [ ] `og:title` vorhanden
- [ ] `og:description` vorhanden
- [ ] `og:image` vorhanden (1200×630px empfohlen)
- [ ] `og:url` korrekt
- [ ] `twitter:card` gesetzt (`summary_large_image`)

### Strukturierte Daten (falls relevant)
- [ ] `application/ld+json` Block für primären Content-Typ
- [ ] Breadcrumbs als strukturierte Daten (bei Navigation)
- [ ] FAQPage Schema wenn FAQ-Bereich vorhanden
- [ ] SoftwareApplication Schema bei App-Landing-Pages

### Performance für SEO
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Bilder mit `width` und `height` Attributen (verhindert CLS)
- [ ] Fonts mit `font-display: swap` oder `optional`
- [ ] `<link rel="preload">` für LCP-kritische Ressource
