/* ============================================================
   pilot AI Marketplace — Asset-Bibliothek: data/assets.js (Etappe E6).
   Klassisches Script (kein Modul), definiert globale Konstanten für
   bibliothek.html und die Startseiten-Zähler auf index.html.

   Definierte Globals:
     FONTS         — 9 frei nutzbare Webfonts (ausschließlich SIL Open Font
                     License 1.1). Jeder Eintrag trägt fontFaceCss + lokale
                     woff2-Datei unter assets/fonts/. Lizenz sichtbar am Asset.
                     WICHTIG: KEINE Fontshare/ITF-Free-Font-Schriften (Satoshi,
                     Clash Display, General Sans, Cabinet Grotesk) — die ITF Free
                     Font License ist NICHT OFL und daher hier bewusst nicht drin.
     ICONSETS      — 4 Icon-Bibliotheken (Lucide/ISC, Heroicons/MIT,
                     Phosphor/MIT, Simple Icons/CC0). anzahl = reale Set-Größe.
     LUCIDE_ICONS  — 48 durchsuchbare Lucide-Inline-SVGs (name + tags + svg);
                     ehrlicher Ausschnitt aus den 1747 Lucide-Icons.
     PALETTES      — 7 Farbpaletten. paare[].ratio/aa sind mit der echten
                     WCAG-Relativluminanz-Formel berechnet (keine Fantasiewerte).
     PATTERNS      — 10 Hintergründe (7 SVG-Muster + 3 CSS-Gradients).
     BRAND         — realer pilot-CI-Spickzettel (Tokens aus shared/base.css)
                     plus die zwei real vorliegenden Logo-SVGs. Kein erfundenes
                     offizielles Brand-Material.
     ASSETS        — vereinte, deep-linkbare Liste (Fonts + Paletten + Patterns
                     + Icon-Sets) mit typ-Feld und normalisiertem rating; Basis
                     für Detail-Modal, Bewertung (rate:asset:<id>) und Deep-Link
                     bibliothek.html?a=<id>. IDs über alle Typen eindeutig.

   Alle Zahlen sind real zählbar aus diesen Arrays. Nichts erfunden.
   ============================================================ */

const FONTS = [
  {
    id: "inter",
    name: "Inter",
    kategorie: "sans",
    stimmung: "Der ruhige pilot-Standard: eine neutrale, bildschirmoptimierte Grotesk, die in UI, Fließtext und Datentabellen gleichermaßen verlässlich trägt.",
    file: "assets/fonts/inter-variable.woff2",
    fontFamily: "Inter",
    fontFaceCss: "@font-face {\n  font-family: 'Inter';\n  src: url('assets/fonts/inter-variable.woff2') format('woff2-variations');\n  font-weight: 100 900;\n  font-style: normal;\n  font-display: swap;\n}",
    variable: true,
    gewichtBereich: "100–900",
    lizenz: "SIL Open Font License 1.1",
    lizenzUrl: "https://github.com/rsms/inter/blob/master/LICENSE.txt",
    quelle: "Rasmus Andersson — https://github.com/rsms/inter",
    pairing: "Als neutrale Basis mit Fraunces oder Newsreader für redaktionelle Überschriften kombinieren.",
    claudePrompt: "Binde die Schrift Inter lokal ein: lege inter-variable.woff2 unter assets/fonts/ ab und ergänze diesen @font-face-Block (font-weight: 100 900, format woff2-variations). Setze anschließend font-family: 'Inter', system-ui, sans-serif als Grundschrift für UI und Fließtext. Kein CDN, kein Google-Fonts-Request.",
    beispieltext: "Zwei flinke Boxer jagen die quirlige Eva.",
    seed: { anzahl: 9, rating: 4.9 }
  },
  {
    id: "manrope",
    name: "Manrope",
    kategorie: "sans",
    stimmung: "Modern-geometrische Grotesk mit weichen Rundungen und leicht verspieltem Charakter — freundlich, aber sachlich für Marken- und Produktoberflächen.",
    file: "assets/fonts/manrope-variable.woff2",
    fontFamily: "Manrope",
    fontFaceCss: "@font-face {\n  font-family: 'Manrope';\n  src: url('assets/fonts/manrope-variable.woff2') format('woff2-variations');\n  font-weight: 200 800;\n  font-style: normal;\n  font-display: swap;\n}",
    variable: true,
    gewichtBereich: "200–800",
    lizenz: "SIL Open Font License 1.1",
    lizenzUrl: "https://github.com/davelab6/manrope/blob/master/license.txt",
    quelle: "Mikhail Sharanda — https://github.com/davelab6/manrope",
    pairing: "Setzt kräftige Headlines gut in Szene; als Fließtext dazu Inter oder Newsreader.",
    claudePrompt: "Binde die Schrift Manrope lokal ein: lege manrope-variable.woff2 unter assets/fonts/ ab und ergänze diesen @font-face-Block (font-weight: 200 800, format woff2-variations). Setze dann font-family: 'Manrope', sans-serif für Überschriften oder als Grundschrift. Lokal einbetten, kein CDN.",
    beispieltext: "Vom Ziel bis zur Umsetzung in wenigen klaren Schritten.",
    seed: { anzahl: 7, rating: 4.6 }
  },
  {
    id: "plus-jakarta-sans",
    name: "Plus Jakarta Sans",
    kategorie: "sans",
    stimmung: "Geometrische Sans mit eigenständigen Details und leicht technischer Anmutung — bringt Frische in Interfaces, ohne aufdringlich zu wirken.",
    file: "assets/fonts/plus-jakarta-sans-variable.woff2",
    fontFamily: "Plus Jakarta Sans",
    fontFaceCss: "@font-face {\n  font-family: 'Plus Jakarta Sans';\n  src: url('assets/fonts/plus-jakarta-sans-variable.woff2') format('woff2-variations');\n  font-weight: 200 800;\n  font-style: normal;\n  font-display: swap;\n}",
    variable: true,
    gewichtBereich: "200–800",
    lizenz: "SIL Open Font License 1.1",
    lizenzUrl: "https://github.com/tokotype/PlusJakartaSans/blob/master/OFL.txt",
    quelle: "Tokotype (Gumpita Rahayu) — https://github.com/tokotype/PlusJakartaSans",
    pairing: "Als Interface-Schrift mit Space Grotesk für Akzente oder IBM Plex Mono für Codeblöcke.",
    claudePrompt: "Binde die Schrift Plus Jakarta Sans lokal ein: lege plus-jakarta-sans-variable.woff2 unter assets/fonts/ ab und ergänze diesen @font-face-Block (font-weight: 200 800, format woff2-variations). Setze dann font-family: 'Plus Jakarta Sans', sans-serif. Lokal einbetten, kein Google-Fonts-Request.",
    beispieltext: "Neue Werkzeuge, klar strukturiert und schnell verständlich.",
    seed: { anzahl: 6, rating: 4.4 }
  },
  {
    id: "space-grotesk",
    name: "Space Grotesk",
    kategorie: "sans",
    stimmung: "Proportionale Variante der Space-Mono-Familie: kantig, technisch, mit Retro-Sci-Fi-Note — ideal für Headlines mit Haltung und Produkt-Branding.",
    file: "assets/fonts/space-grotesk-variable.woff2",
    fontFamily: "Space Grotesk",
    fontFaceCss: "@font-face {\n  font-family: 'Space Grotesk';\n  src: url('assets/fonts/space-grotesk-variable.woff2') format('woff2-variations');\n  font-weight: 300 700;\n  font-style: normal;\n  font-display: swap;\n}",
    variable: true,
    gewichtBereich: "300–700",
    lizenz: "SIL Open Font License 1.1",
    lizenzUrl: "https://github.com/floriankarsten/space-grotesk/blob/master/OFL.txt",
    quelle: "Florian Karsten — https://github.com/floriankarsten/space-grotesk",
    pairing: "Als Display-Grotesk über ruhigem Inter-Fließtext; passt visuell zu Space Mono und IBM Plex Mono.",
    claudePrompt: "Binde die Schrift Space Grotesk lokal ein: lege space-grotesk-variable.woff2 unter assets/fonts/ ab und ergänze diesen @font-face-Block (font-weight: 300 700, format woff2-variations). Setze dann font-family: 'Space Grotesk', sans-serif für Überschriften. Lokal einbetten, kein CDN.",
    beispieltext: "Systeme, die mitdenken statt nur zu reagieren.",
    seed: { anzahl: 8, rating: 4.5 }
  },
  {
    id: "fraunces",
    name: "Fraunces",
    kategorie: "serif",
    stimmung: "Weiche Old-Style-Display-Serif mit Charakter und optischen Achsen — für ausdrucksstarke, redaktionelle Überschriften mit warmer, literarischer Note.",
    file: "assets/fonts/fraunces-variable.woff2",
    fontFamily: "Fraunces",
    fontFaceCss: "@font-face {\n  font-family: 'Fraunces';\n  src: url('assets/fonts/fraunces-variable.woff2') format('woff2-variations');\n  font-weight: 100 900;\n  font-style: normal;\n  font-display: swap;\n}",
    variable: true,
    gewichtBereich: "100–900",
    lizenz: "SIL Open Font License 1.1",
    lizenzUrl: "https://github.com/undercasetype/Fraunces/blob/master/OFL.txt",
    quelle: "Undercase Type (Phaedra Charles, Flavia Zimbardi) — https://github.com/undercasetype/Fraunces",
    pairing: "Große Fraunces-Headlines über ruhigem Inter- oder Manrope-Fließtext ergeben einen editorialen Kontrast.",
    claudePrompt: "Binde die Schrift Fraunces lokal ein: lege fraunces-variable.woff2 unter assets/fonts/ ab und ergänze diesen @font-face-Block (font-weight: 100 900, format woff2-variations). Setze dann font-family: 'Fraunces', serif nur für große Überschriften. Lokal einbetten, kein CDN.",
    beispieltext: "Gute Gestaltung beginnt mit einer ruhigen Idee.",
    seed: { anzahl: 7, rating: 4.7 }
  },
  {
    id: "newsreader",
    name: "Newsreader",
    kategorie: "serif",
    stimmung: "Lese-Serif für lange Texte am Bildschirm: ausgewogen, unaufgeregt und mit journalistischer Ruhe — trägt Artikel und redaktionelle Fließtexte.",
    file: "assets/fonts/newsreader-variable.woff2",
    fontFamily: "Newsreader",
    fontFaceCss: "@font-face {\n  font-family: 'Newsreader';\n  src: url('assets/fonts/newsreader-variable.woff2') format('woff2-variations');\n  font-weight: 200 800;\n  font-style: normal;\n  font-display: swap;\n}",
    variable: true,
    gewichtBereich: "200–800",
    lizenz: "SIL Open Font License 1.1",
    lizenzUrl: "https://github.com/productiontype/Newsreader/blob/master/OFL.txt",
    quelle: "Production Type — https://github.com/productiontype/Newsreader",
    pairing: "Als Fließtext-Serif unter Grotesk-Headlines aus Space Grotesk oder Manrope.",
    claudePrompt: "Binde die Schrift Newsreader lokal ein: lege newsreader-variable.woff2 unter assets/fonts/ ab und ergänze diesen @font-face-Block (font-weight: 200 800, format woff2-variations). Setze dann font-family: 'Newsreader', serif für Fließtext und Artikel. Lokal einbetten, kein Google-Fonts-Request.",
    beispieltext: "Ein klarer Satz sagt oft mehr als drei ausgeschmückte.",
    seed: { anzahl: 6, rating: 4.5 }
  },
  {
    id: "syne",
    name: "Syne",
    kategorie: "display",
    stimmung: "Experimentelle Display-Schrift aus dem Kunstkontext: eigenwillige Formen, starker Kontrast zwischen den Schnitten — für Plakate, Cover und markante Titel.",
    file: "assets/fonts/syne-variable.woff2",
    fontFamily: "Syne",
    fontFaceCss: "@font-face {\n  font-family: 'Syne';\n  src: url('assets/fonts/syne-variable.woff2') format('woff2-variations');\n  font-weight: 400 800;\n  font-style: normal;\n  font-display: swap;\n}",
    variable: true,
    gewichtBereich: "400–800",
    lizenz: "SIL Open Font License 1.1",
    lizenzUrl: "https://gitlab.com/bonjour-monde/fonderie/syne-typeface/-/blob/master/OFL.txt",
    quelle: "Bonjour Monde (Lucas Descroix) — https://gitlab.com/bonjour-monde/fonderie/syne-typeface",
    pairing: "Sparsam als Titelschrift einsetzen, darunter ruhiges Inter oder Newsreader für den Rest.",
    claudePrompt: "Binde die Schrift Syne lokal ein: lege syne-variable.woff2 unter assets/fonts/ ab und ergänze diesen @font-face-Block (font-weight: 400 800, format woff2-variations). Setze dann font-family: 'Syne', sans-serif ausschließlich für große Titel und Plakat-Momente. Lokal einbetten, kein CDN.",
    beispieltext: "Ideen brauchen manchmal eine laute Stimme.",
    seed: { anzahl: 5, rating: 4.3 }
  },
  {
    id: "jetbrains-mono",
    name: "JetBrains Mono",
    kategorie: "mono",
    stimmung: "Der pilot-Standard für Code und Terminal: monospaced mit großer x-Höhe, klar unterscheidbaren Zeichen und optionalen Ligaturen — ruhig beim langen Lesen von Code.",
    file: "assets/fonts/jetbrains-mono-variable.woff2",
    fontFamily: "JetBrains Mono",
    fontFaceCss: "@font-face {\n  font-family: 'JetBrains Mono';\n  src: url('assets/fonts/jetbrains-mono-variable.woff2') format('woff2-variations');\n  font-weight: 100 800;\n  font-style: normal;\n  font-display: swap;\n}",
    variable: true,
    gewichtBereich: "100–800",
    lizenz: "SIL Open Font License 1.1",
    lizenzUrl: "https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt",
    quelle: "JetBrains s.r.o. — https://github.com/JetBrains/JetBrainsMono",
    pairing: "Für Code- und Terminal-Blöcke; im Fließtext dazu Inter als Grundschrift.",
    claudePrompt: "Binde die Schrift JetBrains Mono lokal ein: lege jetbrains-mono-variable.woff2 unter assets/fonts/ ab und ergänze diesen @font-face-Block (font-weight: 100 800, format woff2-variations). Setze dann font-family: 'JetBrains Mono', monospace für Code, pre und Terminal. Lokal einbetten, kein CDN.",
    beispieltext: "const skill = laden('assets/fonts/jetbrains-mono.woff2');",
    seed: { anzahl: 9, rating: 4.8 }
  },
  {
    id: "ibm-plex-mono",
    name: "IBM Plex Mono",
    kategorie: "mono",
    stimmung: "Monospace mit humanistischer Wärme und leicht technischer Signatur — eine ruhige Alternative für Code, Daten und Beschriftungen mit Charakter.",
    file: "assets/fonts/ibm-plex-mono-400.woff2",
    fontFamily: "IBM Plex Mono",
    fontFaceCss: "@font-face {\n  font-family: 'IBM Plex Mono';\n  src: url('assets/fonts/ibm-plex-mono-400.woff2') format('woff2');\n  font-weight: 400;\n  font-style: normal;\n  font-display: swap;\n}",
    variable: false,
    gewichtBereich: "400",
    lizenz: "SIL Open Font License 1.1",
    lizenzUrl: "https://github.com/IBM/plex/blob/master/LICENSE.txt",
    quelle: "IBM Corp. (Mike Abbink, Bold Monday) — https://github.com/IBM/plex",
    pairing: "Als Mono-Alternative zu JetBrains Mono; passt zu Grotesk-Schriften wie Plus Jakarta Sans oder Space Grotesk.",
    claudePrompt: "Binde die Schrift IBM Plex Mono lokal ein: lege ibm-plex-mono-400.woff2 unter assets/fonts/ ab und ergänze diesen @font-face-Block (font-weight: 400, format woff2). Setze dann font-family: 'IBM Plex Mono', monospace für Code und Beschriftungen. Lokal einbetten, kein CDN.",
    beispieltext: "id: 04 // status: bereit // quelle: lokal",
    seed: { anzahl: 6, rating: 4.4 }
  }
];

const ICONSETS = [
  {
    "id": "lucide",
    "name": "Lucide",
    "anzahl": 1747,
    "stil": "Klare, gleichmäßige Strichlinien (2px, offene Enden) — der ruhige UI-Standard, den auch dieser Marketplace nutzt.",
    "lizenz": "ISC",
    "lizenzUrl": "https://lucide.dev/license",
    "quelleUrl": "https://lucide.dev/icons/",
    "wofuer": "Erste Wahl für Oberflächen-Icons: Navigation, Buttons, Status, Meta — konsistent mit der bestehenden LU-Map.",
    "claudePrompt": "Bitte füge das Lucide-Icon \"calendar\" als Inline-SVG ein: viewBox 0 0 24 24, fill=none, stroke=currentColor, stroke-width=2, stroke-linecap/linejoin=round. Nutze den echten Pfad von lucide.dev."
  },
  {
    "id": "heroicons",
    "name": "Heroicons",
    "anzahl": 324,
    "stil": "Von den Tailwind-Machern: je Icon in Outline (1.5px) und Solid — etwas weicher und runder als Lucide.",
    "lizenz": "MIT",
    "lizenzUrl": "https://github.com/tailwindlabs/heroicons/blob/master/LICENSE",
    "quelleUrl": "https://heroicons.com/",
    "wofuer": "Gute Alternative, wenn ein Solid-/Filled-Look gebraucht wird oder das Projekt ohnehin Tailwind-Ästhetik trägt.",
    "claudePrompt": "Bitte gib mir das Heroicons-Icon \"bell\" in der Outline-Variante als Inline-SVG (viewBox 0 0 24 24, stroke=currentColor). Quelle: heroicons.com."
  },
  {
    "id": "phosphor",
    "name": "Phosphor",
    "anzahl": 1512,
    "stil": "Flexible Familie in sechs Gewichten (Thin bis Fill) plus Duotone — verspielter und ausdrucksstärker.",
    "lizenz": "MIT",
    "lizenzUrl": "https://github.com/phosphor-icons/homepage/blob/master/LICENSE",
    "quelleUrl": "https://phosphoricons.com/",
    "wofuer": "Wenn ein Projekt eine eigene Handschrift braucht — etwa Duotone-Akzente oder besonders dünne/fette Striche.",
    "claudePrompt": "Bitte füge das Phosphor-Icon \"sparkle\" im Regular-Gewicht als Inline-SVG ein (viewBox 0 0 256 256, fill=currentColor). Quelle: phosphoricons.com."
  },
  {
    "id": "simple-icons",
    "name": "Simple Icons",
    "anzahl": 3469,
    "stil": "Einfarbige offizielle Marken-Logos (je ein Pfad) — nur für Brand-Bezüge, nicht für UI-Symbolik.",
    "lizenz": "CC0",
    "lizenzUrl": "https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md",
    "quelleUrl": "https://simpleicons.org/",
    "wofuer": "Ausschließlich für Marken-Logos (z. B. Slack, LinkedIn, GitHub). Achtung: Logos unterliegen dem Markenrecht der Eigentümer, CC0 gilt nur für die SVG-Datei.",
    "claudePrompt": "Bitte gib mir das Simple-Icons-Logo für \"slack\" als Inline-SVG (viewBox 0 0 24 24, fill=currentColor). Beachte: nur für echten Marken-Bezug verwenden."
  }
];

const LUCIDE_ICONS = [
  {
    "name": "search",
    "tags": "suche suchen finden lupe filter",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m21 21-4.34-4.34\" /> <circle cx=\"11\" cy=\"11\" r=\"8\" /></svg>"
  },
  {
    "name": "home",
    "tags": "startseite haus zuhause dashboard",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\" /> <path d=\"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" /></svg>"
  },
  {
    "name": "settings",
    "tags": "einstellungen zahnrad konfiguration optionen",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915\" /> <circle cx=\"12\" cy=\"12\" r=\"3\" /></svg>"
  },
  {
    "name": "user",
    "tags": "nutzer person profil account",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\" /> <circle cx=\"12\" cy=\"7\" r=\"4\" /></svg>"
  },
  {
    "name": "users",
    "tags": "nutzer team gruppe personen",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" /> <path d=\"M16 3.128a4 4 0 0 1 0 7.744\" /> <path d=\"M22 21v-2a4 4 0 0 0-3-3.87\" /> <circle cx=\"9\" cy=\"7\" r=\"4\" /></svg>"
  },
  {
    "name": "bell",
    "tags": "benachrichtigung glocke alarm hinweis",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M10.268 21a2 2 0 0 0 3.464 0\" /> <path d=\"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326\" /></svg>"
  },
  {
    "name": "mail",
    "tags": "email nachricht post brief",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7\" /> <rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\" /></svg>"
  },
  {
    "name": "calendar",
    "tags": "kalender datum termin planung",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M8 2v4\" /> <path d=\"M16 2v4\" /> <rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" /> <path d=\"M3 10h18\" /></svg>"
  },
  {
    "name": "clock",
    "tags": "uhr zeit dauer termin",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"M12 6v6l4 2\" /></svg>"
  },
  {
    "name": "check",
    "tags": "haken erledigt fertig bestätigen ok",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M20 6 9 17l-5-5\" /></svg>"
  },
  {
    "name": "x",
    "tags": "schließen abbrechen entfernen kreuz",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M18 6 6 18\" /> <path d=\"m6 6 12 12\" /></svg>"
  },
  {
    "name": "plus",
    "tags": "hinzufügen neu erstellen plus",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 12h14\" /> <path d=\"M12 5v14\" /></svg>"
  },
  {
    "name": "minus",
    "tags": "entfernen weniger minus reduzieren",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 12h14\" /></svg>"
  },
  {
    "name": "chevron-right",
    "tags": "pfeil weiter nächste rechts navigation",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m9 18 6-6-6-6\" /></svg>"
  },
  {
    "name": "chevron-down",
    "tags": "pfeil aufklappen dropdown unten mehr",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m6 9 6 6 6-6\" /></svg>"
  },
  {
    "name": "arrow-right",
    "tags": "pfeil weiter fortfahren rechts",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 12h14\" /> <path d=\"m12 5 7 7-7 7\" /></svg>"
  },
  {
    "name": "arrow-left",
    "tags": "pfeil zurück links navigation",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m12 19-7-7 7-7\" /> <path d=\"M19 12H5\" /></svg>"
  },
  {
    "name": "external-link",
    "tags": "externer link öffnen neuer tab verweis",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M15 3h6v6\" /> <path d=\"M10 14 21 3\" /> <path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\" /></svg>"
  },
  {
    "name": "download",
    "tags": "herunterladen speichern export pfeil",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 15V3\" /> <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" /> <path d=\"m7 10 5 5 5-5\" /></svg>"
  },
  {
    "name": "upload",
    "tags": "hochladen import datei senden",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 3v12\" /> <path d=\"m17 8-5-5-5 5\" /> <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" /></svg>"
  },
  {
    "name": "trash-2",
    "tags": "löschen papierkorb entfernen mülleimer",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M10 11v6\" /> <path d=\"M14 11v6\" /> <path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6\" /> <path d=\"M3 6h18\" /> <path d=\"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\" /></svg>"
  },
  {
    "name": "pencil",
    "tags": "bearbeiten stift ändern schreiben edit",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\" /> <path d=\"m15 5 4 4\" /></svg>"
  },
  {
    "name": "copy",
    "tags": "kopieren duplizieren zwischenablage",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\" /> <path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\" /></svg>"
  },
  {
    "name": "link",
    "tags": "link verknüpfung kette url verweis",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\" /> <path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\" /></svg>"
  },
  {
    "name": "file-text",
    "tags": "datei dokument text seite",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\" /> <path d=\"M14 2v5a1 1 0 0 0 1 1h5\" /> <path d=\"M10 9H8\" /> <path d=\"M16 13H8\" /> <path d=\"M16 17H8\" /></svg>"
  },
  {
    "name": "folder",
    "tags": "ordner verzeichnis ablage",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\" /></svg>"
  },
  {
    "name": "image",
    "tags": "bild foto grafik medien",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\" /> <circle cx=\"9\" cy=\"9\" r=\"2\" /> <path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\" /></svg>"
  },
  {
    "name": "play",
    "tags": "abspielen start wiedergabe video",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z\" /></svg>"
  },
  {
    "name": "pause",
    "tags": "pause anhalten stoppen",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"14\" y=\"3\" width=\"5\" height=\"18\" rx=\"1\" /> <rect x=\"5\" y=\"3\" width=\"5\" height=\"18\" rx=\"1\" /></svg>"
  },
  {
    "name": "star",
    "tags": "stern favorit bewertung merken",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\" /></svg>"
  },
  {
    "name": "heart",
    "tags": "herz gefällt like favorit",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5\" /></svg>"
  },
  {
    "name": "bookmark",
    "tags": "lesezeichen merken speichern",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z\" /></svg>"
  },
  {
    "name": "filter",
    "tags": "filter sortieren eingrenzen trichter",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z\" /></svg>"
  },
  {
    "name": "list",
    "tags": "liste aufzählung ansicht",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 5h.01\" /> <path d=\"M3 12h.01\" /> <path d=\"M3 19h.01\" /> <path d=\"M8 5h13\" /> <path d=\"M8 12h13\" /> <path d=\"M8 19h13\" /></svg>"
  },
  {
    "name": "grid-2x2",
    "tags": "raster kacheln ansicht gitter grid",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 3v18\" /> <path d=\"M3 12h18\" /> <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" /></svg>"
  },
  {
    "name": "eye",
    "tags": "auge anzeigen sichtbar vorschau",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\" /> <circle cx=\"12\" cy=\"12\" r=\"3\" /></svg>"
  },
  {
    "name": "lock",
    "tags": "schloss sperren sicher privat",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\" /> <path d=\"M7 11V7a5 5 0 0 1 10 0v4\" /></svg>"
  },
  {
    "name": "info",
    "tags": "information hinweis details i",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"M12 16v-4\" /> <path d=\"M12 8h.01\" /></svg>"
  },
  {
    "name": "circle-alert",
    "tags": "warnung achtung fehler hinweis",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\" /> <line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\" /> <line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\" /></svg>"
  },
  {
    "name": "circle-check",
    "tags": "erfolg bestätigt haken erledigt",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"m9 12 2 2 4-4\" /></svg>"
  },
  {
    "name": "menu",
    "tags": "menü navigation hamburger balken",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 5h16\" /> <path d=\"M4 12h16\" /> <path d=\"M4 19h16\" /></svg>"
  },
  {
    "name": "refresh-cw",
    "tags": "aktualisieren neu laden synchronisieren",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\" /> <path d=\"M21 3v5h-5\" /> <path d=\"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16\" /> <path d=\"M8 16H3v5\" /></svg>"
  },
  {
    "name": "share-2",
    "tags": "teilen weitergeben verbreiten",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"18\" cy=\"5\" r=\"3\" /> <circle cx=\"6\" cy=\"12\" r=\"3\" /> <circle cx=\"18\" cy=\"19\" r=\"3\" /> <line x1=\"8.59\" x2=\"15.42\" y1=\"13.51\" y2=\"17.49\" /> <line x1=\"15.41\" x2=\"8.59\" y1=\"6.51\" y2=\"10.49\" /></svg>"
  },
  {
    "name": "send",
    "tags": "senden absenden nachricht papierflieger",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z\" /> <path d=\"m21.854 2.147-10.94 10.939\" /></svg>"
  },
  {
    "name": "sparkles",
    "tags": "ki magie glanz funken ai neu",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\" /> <path d=\"M20 2v4\" /> <path d=\"M22 4h-4\" /> <circle cx=\"4\" cy=\"20\" r=\"2\" /></svg>"
  },
  {
    "name": "zap",
    "tags": "blitz schnell energie aktion",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z\" /></svg>"
  },
  {
    "name": "lightbulb",
    "tags": "idee glühbirne tipp einfall",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5\" /> <path d=\"M9 18h6\" /> <path d=\"M10 22h4\" /></svg>"
  },
  {
    "name": "message-square",
    "tags": "nachricht chat kommentar sprechblase",
    "svg": "<svg class=\"lu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z\" /></svg>"
  }
];

const PALETTES = [
  {
    "id": "pilot-ci",
    "name": "pilot CI",
    "stimmung": "Die Hausfarben dieses Marketplace: Signal-Gelb auf Ink-Schwarz, getragen von warmem Papier statt kaltem Weiß.",
    "farben": [
      {
        "hex": "#262626",
        "name": "Ink-Schwarz"
      },
      {
        "hex": "#ffe05e",
        "name": "Signal-Gelb"
      },
      {
        "hex": "#ffd400",
        "name": "Acid-Gelb"
      },
      {
        "hex": "#f1f1ec",
        "name": "Papier"
      },
      {
        "hex": "#f4f1ea",
        "name": "Papier warm"
      },
      {
        "hex": "#66655d",
        "name": "Grau mittel"
      }
    ],
    "paare": [
      {
        "fg": "#262626",
        "bg": "#f1f1ec",
        "ratio": 13.36,
        "aa": "ja"
      },
      {
        "fg": "#262626",
        "bg": "#ffe05e",
        "ratio": 11.58,
        "aa": "ja"
      },
      {
        "fg": "#66655d",
        "bg": "#f1f1ec",
        "ratio": 5.17,
        "aa": "ja"
      },
      {
        "fg": "#ffe05e",
        "bg": "#262626",
        "ratio": 11.58,
        "aa": "ja"
      }
    ]
  },
  {
    "id": "warm-editorial",
    "name": "Warm editorial",
    "stimmung": "Redaktioneller Ton aus Terrakotta und Creme — ruhig, hochwertig, für lange Texte und Magazin-Layouts.",
    "farben": [
      {
        "hex": "#2b2118",
        "name": "Espresso"
      },
      {
        "hex": "#c2571a",
        "name": "Terrakotta"
      },
      {
        "hex": "#e8a04b",
        "name": "Ocker"
      },
      {
        "hex": "#f5ede0",
        "name": "Creme"
      },
      {
        "hex": "#8a7d6b",
        "name": "Taupe"
      }
    ],
    "paare": [
      {
        "fg": "#2b2118",
        "bg": "#f5ede0",
        "ratio": 13.55,
        "aa": "ja"
      },
      {
        "fg": "#c2571a",
        "bg": "#f5ede0",
        "ratio": 3.87,
        "aa": "nur groß"
      },
      {
        "fg": "#8a7d6b",
        "bg": "#f5ede0",
        "ratio": 3.46,
        "aa": "nur groß"
      },
      {
        "fg": "#f5ede0",
        "bg": "#c2571a",
        "ratio": 3.87,
        "aa": "nur groß"
      }
    ]
  },
  {
    "id": "tech-kuehl",
    "name": "Tech kühl",
    "stimmung": "Klares Blau auf fast weißem Grund — sachlich, digital, für Dashboards und Datenprodukte.",
    "farben": [
      {
        "hex": "#0f172a",
        "name": "Nachtblau"
      },
      {
        "hex": "#2563eb",
        "name": "Signalblau"
      },
      {
        "hex": "#38bdf8",
        "name": "Himmel"
      },
      {
        "hex": "#f8fafc",
        "name": "Nebelweiß"
      },
      {
        "hex": "#64748b",
        "name": "Schiefer"
      }
    ],
    "paare": [
      {
        "fg": "#0f172a",
        "bg": "#f8fafc",
        "ratio": 17.06,
        "aa": "ja"
      },
      {
        "fg": "#2563eb",
        "bg": "#f8fafc",
        "ratio": 4.94,
        "aa": "ja"
      },
      {
        "fg": "#64748b",
        "bg": "#f8fafc",
        "ratio": 4.55,
        "aa": "ja"
      },
      {
        "fg": "#38bdf8",
        "bg": "#0f172a",
        "ratio": 8.33,
        "aa": "ja"
      }
    ]
  },
  {
    "id": "high-contrast",
    "name": "High Contrast",
    "stimmung": "Maximale Lesbarkeit: reines Schwarz-Weiß mit einem einzigen Warnrot als Akzent — barrierearm und laut.",
    "farben": [
      {
        "hex": "#000000",
        "name": "Schwarz"
      },
      {
        "hex": "#ffffff",
        "name": "Weiß"
      },
      {
        "hex": "#e11d1d",
        "name": "Signalrot"
      },
      {
        "hex": "#1a1a1a",
        "name": "Fast-Schwarz"
      },
      {
        "hex": "#f2f2f2",
        "name": "Fast-Weiß"
      }
    ],
    "paare": [
      {
        "fg": "#000000",
        "bg": "#ffffff",
        "ratio": 21,
        "aa": "ja"
      },
      {
        "fg": "#ffffff",
        "bg": "#000000",
        "ratio": 21,
        "aa": "ja"
      },
      {
        "fg": "#e11d1d",
        "bg": "#ffffff",
        "ratio": 4.78,
        "aa": "ja"
      },
      {
        "fg": "#ffffff",
        "bg": "#e11d1d",
        "ratio": 4.78,
        "aa": "ja"
      }
    ]
  },
  {
    "id": "gedeckt-natur",
    "name": "Gedeckt Natur",
    "stimmung": "Erdige Grün- und Sandtöne — organisch, vertrauenswürdig, für Nachhaltigkeits- und Bildungsthemen.",
    "farben": [
      {
        "hex": "#2f3a2e",
        "name": "Waldgrün"
      },
      {
        "hex": "#4f7a52",
        "name": "Moos"
      },
      {
        "hex": "#a3b18a",
        "name": "Salbei"
      },
      {
        "hex": "#e9e4d6",
        "name": "Sand"
      },
      {
        "hex": "#6b6455",
        "name": "Lehm"
      }
    ],
    "paare": [
      {
        "fg": "#2f3a2e",
        "bg": "#e9e4d6",
        "ratio": 9.36,
        "aa": "ja"
      },
      {
        "fg": "#4f7a52",
        "bg": "#e9e4d6",
        "ratio": 3.9,
        "aa": "nur groß"
      },
      {
        "fg": "#6b6455",
        "bg": "#e9e4d6",
        "ratio": 4.62,
        "aa": "ja"
      },
      {
        "fg": "#a3b18a",
        "bg": "#2f3a2e",
        "ratio": 5.22,
        "aa": "ja"
      }
    ]
  },
  {
    "id": "monochrom",
    "name": "Monochrom",
    "stimmung": "Reine Graustufen ohne Buntfarbe — zeitlos und zurückhaltend, lässt Inhalt und Typo sprechen.",
    "farben": [
      {
        "hex": "#171717",
        "name": "Kohle"
      },
      {
        "hex": "#404040",
        "name": "Anthrazit"
      },
      {
        "hex": "#737373",
        "name": "Grau"
      },
      {
        "hex": "#d4d4d4",
        "name": "Hellgrau"
      },
      {
        "hex": "#fafafa",
        "name": "Weiß"
      }
    ],
    "paare": [
      {
        "fg": "#171717",
        "bg": "#fafafa",
        "ratio": 17.18,
        "aa": "ja"
      },
      {
        "fg": "#404040",
        "bg": "#fafafa",
        "ratio": 9.93,
        "aa": "ja"
      },
      {
        "fg": "#737373",
        "bg": "#fafafa",
        "ratio": 4.54,
        "aa": "ja"
      },
      {
        "fg": "#737373",
        "bg": "#d4d4d4",
        "ratio": 3.2,
        "aa": "nur groß"
      }
    ]
  },
  {
    "id": "akzent-duo",
    "name": "Akzent-Duo",
    "stimmung": "Zwei kräftige Komplementär-Akzente — Violett und Limette — auf neutralem Grund für Kampagnen mit Zug.",
    "farben": [
      {
        "hex": "#1e1b2e",
        "name": "Tiefviolett"
      },
      {
        "hex": "#6d28d9",
        "name": "Violett"
      },
      {
        "hex": "#bef264",
        "name": "Limette"
      },
      {
        "hex": "#f5f3ff",
        "name": "Lavendelweiß"
      },
      {
        "hex": "#7c7692",
        "name": "Graulila"
      }
    ],
    "paare": [
      {
        "fg": "#1e1b2e",
        "bg": "#f5f3ff",
        "ratio": 15.3,
        "aa": "ja"
      },
      {
        "fg": "#6d28d9",
        "bg": "#f5f3ff",
        "ratio": 6.48,
        "aa": "ja"
      },
      {
        "fg": "#1e1b2e",
        "bg": "#bef264",
        "ratio": 12.84,
        "aa": "ja"
      },
      {
        "fg": "#7c7692",
        "bg": "#f5f3ff",
        "ratio": 3.94,
        "aa": "nur groß"
      }
    ]
  }
];

const PATTERNS = [
  {
    "id": "dots",
    "name": "Punktraster",
    "typ": "pattern",
    "datei": "assets/patterns/dots.svg",
    "css": "background-color: #f1f1ec; background-image: url('assets/patterns/dots.svg'); background-size: 24px 24px;",
    "stimmung": "Dezente Punkte — leichte Struktur für helle Sektionen ohne vom Inhalt abzulenken.",
    "lizenz": "design-assets (MIT-artig frei)"
  },
  {
    "id": "grid",
    "name": "Raster",
    "typ": "pattern",
    "datei": "assets/patterns/grid.svg",
    "css": "background-color: #f1f1ec; background-image: url('assets/patterns/grid.svg'); background-size: 40px 40px;",
    "stimmung": "Technisches Gitternetz — Blueprint-Anmutung für Tool- und Daten-Kontexte.",
    "lizenz": "design-assets (MIT-artig frei)"
  },
  {
    "id": "topo",
    "name": "Höhenlinien",
    "typ": "pattern",
    "datei": "assets/patterns/topo.svg",
    "css": "background-color: #f1f1ec; background-image: url('assets/patterns/topo.svg'); background-size: 240px 240px;",
    "stimmung": "Topografische Ringe — organische Tiefe für Hero-Flächen und Karten.",
    "lizenz": "design-assets (MIT-artig frei)"
  },
  {
    "id": "waves",
    "name": "Wellen",
    "typ": "pattern",
    "datei": "assets/patterns/waves.svg",
    "css": "background-color: #f1f1ec; background-image: url('assets/patterns/waves.svg'); background-size: 48px 16px;",
    "stimmung": "Sanfte Wellenlinien — verspielt und ruhig zugleich, gut für Fußzeilen.",
    "lizenz": "design-assets (MIT-artig frei)"
  },
  {
    "id": "crosshatch",
    "name": "Schraffur",
    "typ": "pattern",
    "datei": "assets/patterns/crosshatch.svg",
    "css": "background-color: #f1f1ec; background-image: url('assets/patterns/crosshatch.svg'); background-size: 16px 16px;",
    "stimmung": "Feine Kreuzschraffur — handzeichnerische Textur mit editorialem Charakter.",
    "lizenz": "design-assets (MIT-artig frei)"
  },
  {
    "id": "diagonal",
    "name": "Diagonalstreifen",
    "typ": "pattern",
    "datei": "assets/patterns/diagonal.svg",
    "css": "background-color: #f1f1ec; background-image: url('assets/patterns/diagonal.svg'); background-size: 12px 12px;",
    "stimmung": "Enge Diagonalen — dynamische Bewegung für Badges und kleine Flächen.",
    "lizenz": "design-assets (MIT-artig frei)"
  },
  {
    "id": "plus",
    "name": "Pluszeichen",
    "typ": "pattern",
    "datei": "assets/patterns/plus.svg",
    "css": "background-color: #f1f1ec; background-image: url('assets/patterns/plus.svg'); background-size: 32px 32px;",
    "stimmung": "Verstreute Plus-Marker — luftiges Raster mit technischem Augenzwinkern.",
    "lizenz": "design-assets (MIT-artig frei)"
  },
  {
    "id": "grad-pilot-glow",
    "name": "pilot Gelb-Glow",
    "typ": "gradient",
    "datei": null,
    "css": "background: radial-gradient(at 80% 0%, rgba(255,224,94,.55) 0, transparent 50%), radial-gradient(at 10% 90%, rgba(255,212,0,.18) 0, transparent 55%), #f1f1ec;",
    "stimmung": "Warmes Papier mit Gelb-Schimmer aus der Ecke — die Signatur-Hero-Fläche von pilot.",
    "lizenz": "design-assets (MIT-artig frei)"
  },
  {
    "id": "grad-grid-fade",
    "name": "Raster mit Fade",
    "typ": "gradient",
    "datei": null,
    "css": "background-image: linear-gradient(rgb(128 128 128 / .12) 1px, transparent 1px), linear-gradient(90deg, rgb(128 128 128 / .12) 1px, transparent 1px); background-size: 40px 40px; mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, #000 40%, transparent 100%);",
    "stimmung": "Feines Gitter, das zum Rand ausblendet — Tech-Look ohne harte Kanten.",
    "lizenz": "design-assets (MIT-artig frei)"
  },
  {
    "id": "grad-aurora",
    "name": "Aurora-Mesh",
    "typ": "gradient",
    "datei": null,
    "css": "background: radial-gradient(at 20% 25%, #a7f3d0 0, transparent 55%), radial-gradient(at 80% 20%, #bae6fd 0, transparent 55%), radial-gradient(at 65% 80%, #ddd6fe 0, transparent 55%), radial-gradient(at 15% 85%, #fbcfe8 0, transparent 50%), #fafaf9;",
    "stimmung": "Weiches, mehrfarbiges Verlaufsnetz — leichter, freundlicher Hintergrund für helle Layouts.",
    "lizenz": "design-assets (MIT-artig frei)"
  }
];

const BRAND = {
  "ci": {
    "farben": [
      {
        "hex": "#262626",
        "name": "Ink-Schwarz",
        "token": "--c-black",
        "wofuer": "Text, Header, schwarze Flächen"
      },
      {
        "hex": "#ffe05e",
        "name": "Signal-Gelb",
        "token": "--c-yellow",
        "wofuer": "Akzent, Hover-Marker, empfohlen-Badge"
      },
      {
        "hex": "#fcfcfc",
        "name": "Weiß",
        "token": "--c-white",
        "wofuer": "Text auf Schwarz, helle Kontraste"
      },
      {
        "hex": "#f1f1ec",
        "name": "Papier",
        "token": "--c-bg",
        "wofuer": "Basis-Hintergrund (CI-Beige)"
      },
      {
        "hex": "#f4f1ea",
        "name": "Papier warm",
        "token": "--paper-warm",
        "wofuer": "Warme Zwischenflächen"
      },
      {
        "hex": "#66655d",
        "name": "Grau mittel",
        "token": "--c-gray-m",
        "wofuer": "Meta-Text (AA auf Papier)"
      }
    ],
    "typo": {
      "sans": "'Inter' (lokal eingebunden, kein CDN/Google-Fonts-Request) — Gewichte 450/640, clamp-Skala.",
      "mono": "'JetBrains Mono' für Code, Terminal und Prompt-Snippets.",
      "hinweis": "Die offizielle pilot-Brand-Schrift ist \"Centra No1\" (kommerziell, nicht in dieser Bibliothek). Inter ist der freie, DSGVO-freundliche Ersatz, den dieser Marketplace real verwendet."
    },
    "ton": "Deutsch, Du-Form, editorial und sachlich. Keine Marketing-Ausrufe, keine Emojis. Symbole ausschließlich als Lucide-Inline-SVGs. Für die zentrale Einstiegsseite gilt durchgängig der Begriff „Startseite“.",
    "quelle": "Verifizierbar in shared/base.css (Custom Properties) — dies ist der reale CI-Spickzettel dieses Marketplace, keine offizielle Vorlage."
  },
  "logos": [
    {
      "id": "pilot-logo",
      "name": "pilot Logo (dunkel auf hell)",
      "datei": "assets/brand/pilot-logo.svg",
      "wofuer": "Für helle Hintergründe (Papier/Weiß)."
    },
    {
      "id": "pilot-logo-dark",
      "name": "pilot Logo (hell auf dunkel)",
      "datei": "assets/brand/pilot-logo-dark.svg",
      "wofuer": "Für dunkle Hintergründe (Ink-Schwarz)."
    }
  ],
  "logoHinweis": "Die beiden SVGs sind die real in der Bibliothek vorliegenden pilot-Logos. Verwendung nur im echten pilot-Kontext; Schutzraum und Mindestgröße bitte mit dem Brand-Team abstimmen.",
  "querverweise": [
    {
      "label": "Skill: brand-guidelines",
      "href": "skills.html?skill=brand-guidelines"
    },
    {
      "label": "Skill: tonalitaets-check",
      "href": "skills.html?skill=tonalitaets-check"
    }
  ],
  "hinweis": "Verbindliches, offizielles Brand-Material (Vorlagen, Logo-Guidelines, Schriftlizenzen) kommt ausschließlich vom pilot-Brand- und KI-Enablement-Team — dieser Bausatz bildet nur die real im Marketplace genutzten Tokens und Logos ab."
};

/* ===== VEREINTE ASSET-LISTE (deep-linkbar, bewertbar) =====
   Ein Asset = ein Eintrag mit stabiler id + typ. Fonts bringen ihr
   redaktionelles Seed-Rating aus dem Datensatz mit (seed → {average,count});
   Paletten/Muster/Icon-Sets starten ehrlich ohne Seed (rating: null) und
   sind trotzdem bewertbar. IDs sind über alle Typen hinweg eindeutig. */
const ASSETS = [
  ...FONTS.map(f => ({
    id: f.id, typ: 'font', name: f.name, kategorie: f.kategorie,
    rating: f.seed ? { average: f.seed.rating, count: f.seed.anzahl } : null,
    ref: f
  })),
  ...PALETTES.map(p => ({ id: p.id, typ: 'palette', name: p.name, rating: null, ref: p })),
  ...PATTERNS.map(p => ({ id: p.id, typ: 'pattern', name: p.name, rating: null, ref: p })),
  ...ICONSETS.map(s => ({ id: s.id, typ: 'iconset', name: s.name, rating: null, ref: s }))
];

/* Aggregierter @font-face-CSS-Block aller Bibliotheks-Fonts — bibliothek.html
   injiziert ihn ins seiten-eigene <style>, damit die Live-Vorschauen im echten
   Font rendern (und NICHT in base.css landen, wo andere Seiten sie mitschleppen). */
const FONTS_FACE_CSS = FONTS.map(f => f.fontFaceCss).join('\n\n');

/* Reale Kennzahlen (aus den Arrays gezählt) — für Hero/Startseite. */
const ASSET_STATS = {
  fonts: FONTS.length,
  iconsets: ICONSETS.length,
  iconsSearchable: LUCIDE_ICONS.length,
  iconsTotal: ICONSETS.reduce((s, x) => s + x.anzahl, 0),
  palettes: PALETTES.length,
  patterns: PATTERNS.length,
  patternsSvg: PATTERNS.filter(p => p.typ === 'pattern').length,
  gradients: PATTERNS.filter(p => p.typ === 'gradient').length,
  total: ASSETS.length
};
