# Backlog

Bewusst zurückgestellte Punkte — Quelle ist jeweils vermerkt. Aufräumen nur nach Rücksprache.

## Aus der Feedback-Runde 2026-08-03 (VibeFeedback, Testerin lisa)

- **„pilot AI" = Langdock in der Kommunikation vermitteln.** Die UI nennt die Plattform jetzt durchgehend „pilot AI" — auch in `data/skills.js` steht der Herstellername seit dem 2026-08-03 nicht mehr. Dass dahinter Langdock steckt, erklärt bisher nur der Glossar-Eintrag „Langdock"; das muss auch im Onboarding und in der FAQ ankommen. Prio niedrig. *(Item 19)*
- **Kopf- und Filterbereiche aller Kategorieseiten vereinheitlichen.** Jede Seite hat heute ein eigenes Kopf-/Filter-Layout; für bessere Leserführung ein gemeinsames Muster entwickeln. Erstmal keine Prio. *(Items 27, 28)*
- **Seiten-Suchfelder challengen.** Die „Nur diese Seite filtern"-Suchfelder (Prompts, Showroom u. a.) später gegen die globale Strg/Cmd+K-Suche abwägen — brauchen wir beides? *(Items 18, 38)*
- **Shortcut-Übersicht.** Eine aufrufbare Liste aller Tastaturkürzel (Strg+K etc.). *(Item 45)*
- **Footer-Zeile „Citizen Coding".** Zum Start korrekt, perspektivisch soll der Marketplace breiter positioniert werden — Zeile dann anpassen. *(Item 10)*

## Aus der Umsetzungs- und QA-Runde 2026-08-03

- **Befehle/Glossar-Voting optisch vereinheitlichen.** Ressourcen nutzen den gemeinsamen `.up-btn`; Befehle-Ranking und Glossar hängen noch an der seiteneigenen `.vote-btn`-Fassung. Funktional korrekt, Migration ist halb fertig.
- **Umfangs-Prüfer für den Showroom.** Die neuen `umfang{bytes,zeilen,dateien}`-Werte in `data/cases.js` driften beim Demo-Re-Export; ein Daten-gegen-Platte-Prüfer nach dem Muster von `tools/bilder-pakete.mjs --pruefen` fehlt noch.
- **Startseiten-Rotation: Feinheiten.** Alle sechs Kacheln teilen denselben Tagesversatz und rotieren deshalb im Gleichschritt. Die Asset-Kachel rotiert seit dem 2026-08-03 mit, allerdings nur über die 5 Schriften: Paletten, Muster und Icon-Sets tragen bewusst keine Stimmen-Seeds (keine Zahlen erfinden), ihr Pool ist damit genau so groß wie n.
- **Interne Lern-Ressourcen verlinken.** Die 3 `lr-intern-*`-Platzhalter (`url:null`) brauchen echte Ziele (Aufzeichnung, KI-Richtlinie, Q0-Austausch).
- **Pakete-Bereich unterfüllt.** Nur 1 Paket (Design-System) — zweites Paket ergänzen oder als Bibliothek-Unterpunkt führen.

## Aussortiert am 2026-08-03 (Kuration „Qualität statt Quantität")

53 Einträge entfernt — vollständige Begründungen im Kurations-Beschluss der Session; Kurzfassung: entwicklerlastig, Duplikat oder ohne Arbeitsbezug für die Zielgruppe.
- **Skills (10):** pitch-deck, theme-factory, web-artifacts-builder, algorithmic-art, canvas-design, webapp-testing, verification-before-completion, gsd, test-driven-development, ralph-loop
- **Prompts (6):** storyboard-rohfassung, bildbrief, pitch-einstieg, umfrage-fragen, persona-schaerfen, wettbewerber-werbung
- **Assets (14):** plus-jakarta-sans, manrope, newsreader, ibm-plex-mono · monochrom, gedeckt-natur, akzent-duo · crosshatch, diagonal, plus, waves, grad-grid-fade · heroicons, phosphor
- **Bausteine (4):** preis-karten, cta-band, testimonial-zitat, feature-liste
- **Projekte (3):** umfrage-dashboard, wettbewerbs-radar, moodboard-generator
- **Ressourcen (10):** code-crashkurs-mildenberger, code-einfach-erklaert-afki, code-quickstart, code-common-workflows, code-vibecoding-prod, code-in-action-kurs, lr-anthropic-ai-fluency, doku-prompt-engineering, lr-3b1b-llm, lr-ard-ki-podcast
- **Bilder (4):** notizbuch-stift-umschlag, gebaeude-baeume, wendeltreppe-oben, betonwand-lichtkante
- **Beispieldaten (2, in Bilder überführt):** testbild-produkt, testbild-kampagne

## Bekannte größere Ausbaustufe

- **Persistenz/Backend für Einreichen + geteilte Bewertungen.** Upvotes, „ausprobiert", Kommentare und der Varianten-Freigabe-Flow sind lokal pro Browser (Demo-Kennzeichnung beibehalten, keine Zahl vortäuschen). Echte Team-Signale brauchen ein Backend — nächster substanzieller Schritt Richtung Beta.
