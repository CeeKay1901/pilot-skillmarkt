// pilot AI Marketplace — Katalogdaten (ausgelagert aus index.html, Etappe E1).
// Klassisches Script, definiert globale Konstanten: SKILLS, SPOTLIGHT, HIDDEN,
// TASK_GROUP, TASK_LABELS, GROUPS, START_PROMPTS, STARTER_JOURNEY, BUNDLES,
// PLATFORMS, ROLES, ALL_ROLES, ROLE_MAP, DEMOS.
// Ableitungen/Seiteneffekte (TASK_GROUP-Mutation, MEMBER_OF) bleiben bei der Seiten-Logik.

    const SKILLS = [
      {
        "id": "erste-schritte",
        "votesRecent": 6,
        "platforms": { "code": true, "langdock": false },
        "name": "Erste Schritte",
        "tagline": "Von pilot AI zu Claude Code — dein geführter Einstieg",
        "description": "Erklärt Schritt für Schritt, wie Claude Code funktioniert: Projektordner, der erste Auftrag, wie Claude direkt in deinen Dateien arbeitet. Speziell für Umsteiger:innen von Chat-Tools.",
        "longDescription": "Du kennst KI bisher als Chat — du fragst, sie antwortet. Claude Code geht weiter: Es arbeitet direkt in deinen Dateien und Ordnern, baut Dinge und erledigt Aufgaben. Dieser Skill nimmt dich an die Hand: Was ist ein „Projekt“? Wie gebe ich einen Auftrag? Wie prüfe ich das Ergebnis? Alles in einfacher Sprache, ohne Programmier-Vorwissen — der ideale erste Schritt nach der KI-Schulung.",
        "exampleOutput": "Willkommen bei Claude Code — dein Einstieg\n\n1) Du arbeitest immer in einem Ordner = deinem \"Projekt\"\n2) Sag mir einfach auf Deutsch, was du brauchst\n3) Ich erledige es direkt in den Dateien — du prüfst & gibst frei\n\nProbier es gleich aus:\n\"Erstelle eine Tabelle mit allen Kampagnen aus dieser PDF\"",
        "category": "pilot",
        "subcategory": "einstieg",
        "trigger": "/erste-schritte",
        "author": "pilot KI-Enablement",
        "version": "1.0.0",
        "addedAt": "2026-06-01",
        "updatedAt": "2026-07-01",
        "tags": [
          "einstieg",
          "onboarding",
          "grundlagen",
          "citizen-coding"
        ],
        "useCases": [
          "Erster Tag mit Claude Code",
          "Umstieg von Langdock",
          "Nach der KI-Schulung",
          "Team-Onboarding"
        ],
        "difficulty": "easy",
        "timeToRun": "10 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4.8,
          "count": 24
        },
        "endorsedBy": [
          "Christopher Kipp",
          "Sophie Klein"
        ],
        "endorsements": [
          {
            "name": "Christopher Kipp",
            "role": "Innovation Lead",
            "initials": "CK",
            "text": "Der Startpunkt für alle, die von Langdock kommen. Nimmt die Scheu vorm Terminal."
          },
          {
            "name": "Sophie Klein",
            "role": "Projektmanagerin",
            "initials": "SK",
            "text": "Endlich verstanden, warum Claude Code mehr ist als ein Chat. Sehr gut erklärt."
          }
        ],
        "comments": [
          {
            "author": "Anna Schreiber",
            "role": "Content Strategin",
            "initials": "AS",
            "date": "2026-06-20",
            "text": "Als absolute Nicht-Technikerin hatte ich nach 10 Minuten mein erstes Ergebnis. Top.",
            "rating": 5
          }
        ],
        "featured": true
      },
      {
        "id": "prototyp-bauen",
        "votesRecent": 5,
        "platforms": { "code": true, "langdock": false },
        "name": "Prototyp bauen",
        "tagline": "Deine Idee in ein kleines funktionierendes Tool verwandeln",
        "description": "Beschreibe in normaler Sprache, welches interne Tool oder welchen Helfer du brauchst — Claude Code baut dir einen lauffähigen Prototyp. Rechner, Formulare, Dashboards, Mini-Apps.",
        "longDescription": "Das Herzstück von Citizen Coding: Du hast eine Idee für ein kleines Tool, das dir oder deinem Team Arbeit abnimmt — aber kannst nicht programmieren? Genau dafür ist dieser Skill da. Du beschreibst dein Tool, Claude baut es, du testest es sofort im Browser und sagst, was anders sein soll. So entstehen aus Ideen in Minuten echte, nutzbare Werkzeuge — vom Budget-Rechner bis zum kleinen internen Dashboard.",
        "exampleOutput": "Auftrag: \"Ein Tool, das mir aus Reichweite und\nTKP den Netto-Kontaktpreis rechnet\"\n\n✓ Eingabefelder erstellt (Reichweite, TKP, Streuverlust)\n✓ Berechnungslogik implementiert\n✓ Ergebnis-Anzeige mit Live-Update\n✓ pilot-Design angewendet\n\n→ tkp-rechner.html erstellt · im Browser geöffnet\n   Sag mir, was du noch anpassen möchtest.",
        "category": "pilot",
        "subcategory": "bauen",
        "trigger": "/prototyp",
        "author": "pilot KI-Enablement",
        "version": "1.1.0",
        "addedAt": "2026-05-15",
        "updatedAt": "2026-07-05",
        "tags": [
          "citizen-coding",
          "bauen",
          "prototyp",
          "tools",
          "no-code"
        ],
        "useCases": [
          "Internes Mini-Tool",
          "Budget-/Kontakt-Rechner",
          "Kleines Dashboard",
          "Formular-Helfer"
        ],
        "difficulty": "easy",
        "timeToRun": "15–45 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4.7,
          "count": 18
        },
        "endorsedBy": [
          "Christopher Kipp",
          "Jan Richter",
          "Mia Hoffmann"
        ],
        "endorsements": [
          {
            "name": "Christopher Kipp",
            "role": "Innovation Lead",
            "initials": "CK",
            "text": "DER Skill für Citizen Coding. Kolleg:innen bauen plötzlich eigene Tools — das ist der Durchbruch."
          },
          {
            "name": "Jan Richter",
            "role": "Tech Lead & Citizen-Coding-Mentor",
            "initials": "JR",
            "text": "Ich betreue die Testgruppe: Damit entstehen erstaunlich gute erste Prototypen ohne Vorkenntnisse."
          },
          {
            "name": "Mia Hoffmann",
            "role": "Senior UX Designerin",
            "initials": "MH",
            "text": "Perfekt, um Ideen schnell greifbar zu machen, bevor wir groß investieren."
          }
        ],
        "comments": [
          {
            "author": "Lukas Weber",
            "role": "SEO Strategist",
            "initials": "LW",
            "date": "2026-06-28",
            "text": "Habe mir einen kleinen Ranking-Tracker gebaut. Hätte ich nie für möglich gehalten.",
            "rating": 5
          },
          {
            "author": "Sophie Klein",
            "role": "Projektmanagerin",
            "initials": "SK",
            "date": "2026-06-12",
            "text": "Für größere Projekte braucht es dann doch Begleitung, aber der Einstieg ist genial.",
            "rating": 4
          }
        ],
        "featured": true
      },
      {
        "id": "webseite-bauen",
        "votesRecent": 4,
        "platforms": { "code": true, "langdock": false },
        "name": "Webseite bauen",
        "tagline": "Landingpage oder Mini-Website — ganz ohne Programmieren",
        "description": "Von der Kampagnen-Landingpage bis zur kleinen Projekt-Website: Beschreibe Inhalt und Look, Claude Code baut eine responsive Seite im pilot-Design, die du direkt im Browser siehst.",
        "longDescription": "Schnell eine Landingpage für eine Kampagne, eine interne Info-Seite oder ein kleines Portfolio? Statt Wochen im Tool-Backlog baust du sie selbst. Du lieferst Texte, Bilder-Ideen und Wunsch-Look — Claude erstellt eine fertige, responsive Website (Desktop + Mobile), die du live anpassen kannst. Ideal für schnelle Kampagnen-Assets und Prototypen, die man Kund:innen zeigen kann.",
        "exampleOutput": "Auftrag: \"Landingpage für unsere Herbst-Kampagne,\npilot-Look, mit Anmeldeformular\"\n\n✓ Hero mit Kampagnen-Claim + CTA\n✓ 3 Feature-Sektionen\n✓ Anmeldeformular (Name, E-Mail, DSGVO-Hinweis)\n✓ Mobil-optimiert · pilot-Farben & Typo\n\n→ herbst-kampagne.html · Vorschau im Browser geöffnet",
        "category": "pilot",
        "subcategory": "bauen",
        "trigger": "/webseite",
        "author": "pilot KI-Enablement",
        "version": "1.0.2",
        "addedAt": "2026-05-20",
        "updatedAt": "2026-06-30",
        "tags": [
          "citizen-coding",
          "bauen",
          "website",
          "landingpage",
          "design"
        ],
        "useCases": [
          "Kampagnen-Landingpage",
          "Interne Info-Seite",
          "Event-Anmeldeseite",
          "Portfolio-Prototyp"
        ],
        "difficulty": "easy",
        "timeToRun": "20–60 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4.5,
          "count": 15
        },
        "endorsedBy": [
          "Mia Hoffmann",
          "Christopher Kipp"
        ],
        "endorsements": [
          {
            "name": "Mia Hoffmann",
            "role": "Senior UX Designerin",
            "initials": "MH",
            "text": "Die Ergebnisse sehen erstaunlich professionell aus. Perfekt für schnelle Kampagnen-Pages."
          },
          {
            "name": "Christopher Kipp",
            "role": "Innovation Lead",
            "initials": "CK",
            "text": "Für größere Sites braucht es weiter Profis — aber für 80% unserer Anlässe reicht das völlig."
          }
        ],
        "comments": [
          {
            "author": "Anna Schreiber",
            "role": "Content Strategin",
            "initials": "AS",
            "date": "2026-06-18",
            "text": "Hab in einer Stunde eine Event-Seite gebaut. Die Kollegen waren baff.",
            "rating": 5
          }
        ],
        "featured": true
      },
      {
        "id": "erste-automation",
        "votesRecent": 3,
        "platforms": { "code": true, "langdock": false },
        "name": "Erste Automation",
        "tagline": "Aus einer nervigen Routine deine erste kleine Automation",
        "description": "Nenne eine wiederkehrende manuelle Aufgabe — Claude Code baut daraus einen wiederverwendbaren Ablauf, den du immer wieder starten kannst.",
        "longDescription": "Jede:r hat diese eine Aufgabe, die man jede Woche stumpf von Hand macht: Dateien umbenennen, Daten aus Mails ziehen, immer denselben Report-Aufbau. Dieser Skill hilft dir, genau diese Routine einmal zu beschreiben und in einen wiederholbaren Ablauf zu verwandeln — dein erster echter Automations-Erfolg im Citizen Coding.",
        "exampleOutput": "Routine: \"Jeden Montag Screenshots aus dem\nReporting-Ordner in einen Wochenordner sortieren\"\n\n✓ Ablauf gebaut: erkennt Datum → legt KWxx-Ordner an\n✓ Verschiebt & benennt Dateien einheitlich\n✓ Als /montags-sortierung gespeichert\n\nNächste Woche einfach den Befehl erneut ausführen.",
        "category": "pilot",
        "subcategory": "einstieg",
        "trigger": "/erste-automation",
        "author": "pilot KI-Enablement",
        "version": "1.0.0",
        "addedAt": "2026-06-10",
        "updatedAt": "2026-06-28",
        "tags": [
          "einstieg",
          "citizen-coding",
          "automation",
          "produktivität"
        ],
        "useCases": [
          "Wiederkehrende Aufgabe automatisieren",
          "Dateien sortieren",
          "Erste Automation"
        ],
        "difficulty": "easy",
        "timeToRun": "15 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4.4,
          "count": 12
        },
        "endorsedBy": [
          "Sophie Klein"
        ],
        "endorsements": [
          {
            "name": "Sophie Klein",
            "role": "Projektmanagerin",
            "initials": "SK",
            "text": "Mein erstes „Aha“: eine 20-Minuten-Routine läuft jetzt auf Knopfdruck."
          }
        ],
        "comments": [
          {
            "author": "Jan Richter",
            "role": "Tech Lead & Citizen-Coding-Mentor",
            "initials": "JR",
            "date": "2026-06-25",
            "text": "Guter Brückenskill zwischen „nur chatten“ und richtig automatisieren.",
            "rating": 4
          }
        ],
        "featured": false
      },
      {
        "id": "tool-teilen",
        "votesRecent": 1,
        "platforms": { "code": true, "langdock": false },
        "name": "Tool teilen",
        "tagline": "Dein fertiges Tool oder deine Website mit dem Team teilen",
        "description": "Bring dein selbstgebautes Tool zu den Kolleg:innen: als teilbare Datei, im internen Netz oder als Link. Claude erklärt und macht die passenden Schritte.",
        "longDescription": "Ein Tool nützt erst, wenn andere es nutzen können. Dieser Skill hilft dir, deinen Prototyp oder deine Seite so aufzubereiten, dass du sie einfach weitergeben kannst — als eigenständige Datei zum Doppelklicken, im gemeinsamen Laufwerk oder als interner Link. Inklusive kurzer „So benutzt du es“-Anleitung für deine Kolleg:innen.",
        "exampleOutput": "Dein Tool \"tkp-rechner.html\" teilen\n\n✓ Als eigenständige Datei verpackt (läuft per Doppelklick)\n✓ Kurzanleitung \"So nutzt du den TKP-Rechner\" erstellt\n✓ In den Team-Ordner /Tools/ gelegt\n\nTipp: Für eine echte Web-Adresse frag das Tech-Team\nnach internem Hosting.",
        "category": "pilot",
        "subcategory": "bauen",
        "trigger": "/tool-teilen",
        "author": "pilot KI-Enablement",
        "version": "0.9.0",
        "addedAt": "2026-06-15",
        "updatedAt": "2026-07-02",
        "tags": [
          "bauen",
          "citizen-coding",
          "teilen",
          "collaboration"
        ],
        "useCases": [
          "Tool ans Team geben",
          "Datei zum Weitergeben",
          "Kurzanleitung erstellen"
        ],
        "difficulty": "easy",
        "timeToRun": "10 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4.1,
          "count": 8
        },
        "endorsedBy": [],
        "endorsements": [],
        "comments": [
          {
            "author": "Christopher Kipp",
            "role": "Innovation Lead",
            "initials": "CK",
            "date": "2026-07-01",
            "text": "Wichtiger Schritt, damit aus Einzel-Experimenten echte Team-Tools werden.",
            "rating": 4
          }
        ],
        "featured": false
      },
      {
        "id": "webaudit",
        "votesRecent": 4,
        "platforms": { "code": true, "langdock": false },
        "name": "webaudit",
        "tagline": "Der große Website-Check: UX, Performance, SEO & Barrierefreiheit",
        "description": "Der umfangreichste Skill hier — vier Checklisten und ein Browser-Skript, zusammen über 1.200 Zeilen Anleitung. Kombiniert Code-Analyse mit echten Browser-Screenshots via Playwright und liefert einen priorisierten Report. Kein Fünf-Minuten-Helfer, sondern die volle Prüfung.",
        "longDescription": "Ob selbstgebaute Landingpage oder Kunden-Website: webaudit ist bei pilot der Standard-Check für Qualität. Zweistufige Analyse — Code-Scan plus echter Browser mit Screenshots verschiedener Bildschirmgrößen. Ergebnis: ein klar priorisierter Report, den auch Nicht-Techniker:innen verstehen. Ehrlich zum Umfang: Der Skill bringt vier lange Checklisten (Code, UX/Design, Visuelles, Playwright-Setup) und ein Prüfskript mit — er arbeitet gründlich und braucht entsprechend Zeit und einmal Playwright auf deinem Rechner. Für einen schnellen Blick auf eine Seite ist das zu viel; vor einem Launch oder Client-Review ist es genau richtig.",
        "exampleOutput": "## webaudit Report — herbst-kampagne.html\n**Score:** 78/100\n\n### 🔴 Kritisch (1)\n- 6 Bilder ohne Alt-Text → Barrierefreiheit (WCAG)\n\n### 🟡 Empfehlung (3)\n- Ladezeit mobil 3,1s — Bilder komprimieren\n- Kein Open-Graph-Bild fürs Teilen auf Social\n- Kontrast im Footer zu gering",
        "category": "pilot",
        "subcategory": "bauen",
        "trigger": "/webaudit",
        "author": "Christopher Kipp",
        "version": "1.2.0",
        "addedAt": "2025-11-01",
        "updatedAt": "2026-06-15",
        "tags": [
          "web",
          "qa",
          "ux",
          "playwright",
          "performance",
          "seo",
          "accessibility"
        ],
        "useCases": [
          "Website-Launch-Check",
          "Eigene Landingpage prüfen",
          "Client-Präsentation",
          "Accessibility-Audit"
        ],
        "difficulty": "medium",
        "timeToRun": "5–15 Min",
        "requirements": [
          "Playwright",
          "Claude Code"
        ],
        "rating": {
          "average": 4.6,
          "count": 12
        },
        "endorsedBy": [
          "Christopher Kipp",
          "Mia Hoffmann",
          "Lukas Weber"
        ],
        "endorsements": [
          {
            "name": "Christopher Kipp",
            "role": "Innovation Lead",
            "initials": "CK",
            "text": "Unser Standard vor jedem Go-Live. Spart dem Team locker 3–4 Stunden pro Projekt."
          },
          {
            "name": "Mia Hoffmann",
            "role": "Senior UX Designerin",
            "initials": "MH",
            "text": "Die Screenshot-Funktion ist Gold wert für Client-Präsentationen."
          },
          {
            "name": "Lukas Weber",
            "role": "SEO Strategist",
            "initials": "LW",
            "text": "SEO-Check ist solide, ersetzt aber keine vollständige Keyword-Analyse."
          }
        ],
        "comments": [
          {
            "author": "Jan Richter",
            "role": "Tech Lead & Citizen-Coding-Mentor",
            "initials": "JR",
            "date": "2026-05-12",
            "text": "Sehr detaillierter Output. Perfekt, um selbstgebaute Seiten vor dem Teilen zu prüfen.",
            "rating": 5
          },
          {
            "author": "Anna Schreiber",
            "role": "Content Strategin",
            "initials": "AS",
            "date": "2026-03-15",
            "text": "Findet broken Links und fehlende Alt-Texte zuverlässig.",
            "rating": 5
          }
        ],
        "featured": false
      },
      {
        "id": "briefing-gen",
        "votesRecent": 4,
        "platforms": { "code": true, "langdock": true },
        "name": "Briefing Generator",
        "tagline": "Strukturierte Briefings in Minuten statt Stunden",
        "description": "Generiert Kreativ-, Media- und Projektbriefings aus wenigen Eckdaten. Gezielte Rückfragen, Marktkontext, vollständiges Dokument nach pilot-Standard.",
        "longDescription": "Kennt die pilot-Briefing-Templates für Kreation, Media und PM. Führt dich mit gezielten Fragen durch den Prozess, ergänzt Marktkontext und liefert ein vollständig ausgefülltes Briefing — in unter 10 Minuten statt 2 Stunden.",
        "exampleOutput": "## Kreativ-Briefing: Herbst-Kampagne 2026\n\n**Kunde:** Mustermarke GmbH · **Budget:** 120.000 €\n**Zeitraum:** 01.09.–30.11.2026\n\n**Zielgruppe:** Frauen 35–55, einkommensstark, kaufentscheidend\n**Kernbotschaft:** \"Qualität, die man spürt — jeden Tag.\"\n\n**Must-haves:**\n- Produktnahaufnahme (warmes Licht)\n- Real People statt Models · CTA: \"Jetzt entdecken\"",
        "category": "pilot",
        "subcategory": "content",
        "trigger": "/briefing",
        "author": "Marketing-Team pilot",
        "version": "1.1.0",
        "addedAt": "2025-10-01",
        "updatedAt": "2026-05-15",
        "tags": [
          "content",
          "productivity",
          "templates",
          "briefing",
          "kreativ",
          "media"
        ],
        "useCases": [
          "Kreativ-Briefing",
          "Media-Briefing",
          "Projekt-Briefing",
          "Client-Onboarding"
        ],
        "difficulty": "easy",
        "timeToRun": "5–10 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4.4,
          "count": 17
        },
        "endorsedBy": [
          "Anna Schreiber",
          "Mia Hoffmann"
        ],
        "endorsements": [
          {
            "name": "Anna Schreiber",
            "role": "Content Strategin",
            "initials": "AS",
            "text": "Nutze ich für jedes Briefing. Die Rückfragen sind erstaunlich klug und sparen echte Zeit."
          },
          {
            "name": "Mia Hoffmann",
            "role": "Senior UX Designerin",
            "initials": "MH",
            "text": "Endlich einheitliche Briefings im Team. Große Erleichterung."
          }
        ],
        "comments": [
          {
            "author": "Sophie Klein",
            "role": "Projektmanagerin",
            "initials": "SK",
            "date": "2026-05-02",
            "text": "Standard-Tool bei uns geworden. Spart jede Woche Stunden.",
            "rating": 5
          }
        ],
        "featured": true
      },
      {
        "id": "campaign-check",
        "votesRecent": 5,
        "platforms": { "code": true, "langdock": true },
        "name": "Campaign Checker",
        "tagline": "Der Gesamtcheck kurz vor Launch: läuft die Kampagne startklar?",
        "description": "Der breite Check über das fertige Kampagnen-Setup: Anzeigen, Landingpages, Zielgruppen, Budget-Caps und KPI-Definitionen — mit Ampel je Anzeige und Launch-Empfehlung. Für Tiefenprüfungen gibt es zwei Spezialisten: den Mediaplan-Audit (die Excel) und den Tracking-Audit (UTM, GA4, Pixel).",
        "longDescription": "Für Media-Teams bei pilot entwickelt. Der Gesamtcheck kurz vor dem Go-Live: Er geht über das komplette Setup und sagt am Ende klar „start“ oder „stopp“ — mit Ampel-Logik je Anzeige (was passt, was ist eine Warnung, was ein echter Fehler) und Zeilennummer zu jedem Fund. Er streift Tracking und Budget, geht dort aber bewusst nicht in die Tiefe: Die Excel prüft der Mediaplan-Audit, die Messung der Tracking-Audit. Nimm diesen hier, wenn du EINE Antwort brauchst — können wir starten?",
        "exampleOutput": "Campaign Check — \"Herbst-Kampagne 2026\"\n\n✓ UTM-Parameter vollständig (12/12 Anzeigen)\n✓ Conversion-Tracking aktiv (GA4 + Meta Pixel)\n⚠ 2 Warnungen\n  · Budget-Cap auf Ad-Set-Ebene fehlt (3 Ad-Sets)\n  · Zielgruppen-Overlap Meta: 34% (Empfehlung <20%)\n✗ 1 Fehler\n  · Landing-Page-URL 404 bei Anzeige \"Retargeting-B\"",
        "category": "pilot",
        "subcategory": "media",
        "trigger": "/campaign-check",
        "author": "Media-Team pilot",
        "version": "2.0.0",
        "addedAt": "2025-10-15",
        "updatedAt": "2026-04-01",
        "tags": [
          "analytics",
          "qa",
          "media",
          "campaign",
          "tracking",
          "utm"
        ],
        "useCases": [
          "Vor Kampagnen-Launch",
          "UTM-Audit",
          "Tracking-Validierung",
          "Budget-Review"
        ],
        "difficulty": "medium",
        "timeToRun": "10–20 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4.5,
          "count": 21
        },
        "endorsedBy": [
          "Sophie Klein",
          "Lukas Weber"
        ],
        "endorsements": [
          {
            "name": "Sophie Klein",
            "role": "Projektmanagerin",
            "initials": "SK",
            "text": "Hat uns schon mehrfach vor fehlerhaftem Tracking gerettet. Pflicht vor jedem Launch."
          },
          {
            "name": "Lukas Weber",
            "role": "SEO Strategist",
            "initials": "LW",
            "text": "UTM-Validierung ist sehr akkurat. Findet auch subtile Fehler in der Struktur."
          }
        ],
        "comments": [
          {
            "author": "Anna Schreiber",
            "role": "Content Strategin",
            "initials": "AS",
            "date": "2026-02-15",
            "text": "Super auch für Content-Kampagnen. UTM-Fehler werden zuverlässig gefunden.",
            "rating": 5
          }
        ],
        "featured": true
      },
      {
        "id": "mediaplan-audit",
        "votesRecent": 4,
        "platforms": { "code": true, "langdock": true },
        "name": "Mediaplan-Audit",
        "tagline": "Nur die Excel: Rechenfehler, Budget und Flighting im Plan",
        "description": "Prüft das Dokument, nicht die laufende Kampagne: Lädt deinen Mediaplan als Excel/CSV und rechnet ihn nach — Summen, TKP-Plausibilität, Lücken im Flighting. Das Setup in den Werbekonten prüft der Campaign Checker, die Messung der Tracking-Audit.",
        "longDescription": "Media-Pläne sind komplex und Flüchtigkeitsfehler teuer. Dieser Skill arbeitet ausschließlich auf der Plan-Datei — er sieht kein Werbekonto und kein Tracking, sondern rechnet und prüft die Tabelle: Summiert sich das Budget korrekt? Passen Reichweite und TKP zusammen? Gibt es Lücken oder Overlaps im Timing? Ergebnis: eine klare Fehlerliste mit Zeilenbezug, priorisiert nach Relevanz — der richtige Schritt, bevor der Plan zum Kunden geht.",
        "exampleOutput": "Mediaplan-Audit — \"Q4_Plan_Mustermarke.xlsx\"\n\n✓ Summen korrekt (Gesamt 480.000 € = Σ Kanäle)\n⚠ TKP TikTok (2,10 €) unter Marktschnitt — plausibel?\n⚠ Lücke im Flighting: KW46 kein Kanal aktiv\n✗ Rechenfehler Zeile 23: Reichweite × TKP ≠ Kosten",
        "category": "pilot",
        "subcategory": "media",
        "trigger": "/mediaplan-check",
        "author": "Media-Team pilot",
        "version": "1.0.0",
        "addedAt": "2026-05-01",
        "updatedAt": "2026-06-20",
        "tags": [
          "media",
          "analytics",
          "qa",
          "mediaplan",
          "excel",
          "budget"
        ],
        "useCases": [
          "Mediaplan-Review",
          "Budget-Kontrolle",
          "Flighting-Check",
          "Vor Kunden-Freigabe"
        ],
        "difficulty": "medium",
        "timeToRun": "5–10 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4.3,
          "count": 9
        },
        "endorsedBy": [
          "Lukas Weber"
        ],
        "endorsements": [
          {
            "name": "Lukas Weber",
            "role": "SEO Strategist",
            "initials": "LW",
            "text": "Fängt genau die Flüchtigkeitsfehler ab, die man nach dem 5. Plan übersieht."
          }
        ],
        "comments": [
          {
            "author": "Sophie Klein",
            "role": "Projektmanagerin",
            "initials": "SK",
            "date": "2026-06-10",
            "text": "Vier-Augen-Prinzip auf Knopfdruck. Sehr beruhigend vor Freigaben.",
            "rating": 4
          }
        ],
        "featured": false
      },
      {
        "id": "tracking-audit",
        "votesRecent": 4,
        "platforms": { "code": true, "langdock": true },
        "name": "Tracking-Audit",
        "tagline": "Nur die Messung: UTM, GA4, Pixel und Consent",
        "description": "Prüft ausschließlich, ob am Ende Daten ankommen: UTM-Konventionen, GA4-Events, Meta-/LinkedIn-Pixel und Consent-Mode. Zu Budget und Flighting sagt er nichts — dafür gibt es den Mediaplan-Audit; den Rundum-Blick vor Launch hat der Campaign Checker.",
        "longDescription": "Kaputtes Tracking merkt man oft erst, wenn die Kampagne schon läuft und Daten fehlen. Dieser Skill schaut nur auf die Messstrecke: Heißen die UTM-Parameter nach pilot-Konvention? Feuern die GA4-Events, und feuern sie genau einmal? Sind Pixel und Consent-Mode richtig verdrahtet? Ergebnis ist eine Liste konkreter Tag-Fehler — keine Aussage über Budget, Zielgruppen oder Landingpages. So startest du mit sauberer Datenbasis.",
        "exampleOutput": "Tracking-Audit — Kampagne \"Frühjahr 2026\"\n\n✓ UTM-Konvention eingehalten (utm_source/medium/campaign)\n✓ GA4 \"purchase\"-Event feuert korrekt\n⚠ Meta Pixel: \"Lead\"-Event doppelt hinterlegt\n✗ Consent-Mode fehlt → Tracking startet ohne Einwilligung",
        "category": "pilot",
        "subcategory": "media",
        "trigger": "/tracking-check",
        "author": "Media-Team pilot",
        "version": "1.0.0",
        "addedAt": "2026-04-20",
        "updatedAt": "2026-06-05",
        "tags": [
          "media",
          "analytics",
          "tracking",
          "ga4",
          "pixel",
          "utm"
        ],
        "useCases": [
          "Vor Kampagnen-Launch",
          "Tracking-Setup prüfen",
          "Consent-Check",
          "Datenqualität sichern"
        ],
        "difficulty": "medium",
        "timeToRun": "8–15 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4.2,
          "count": 11
        },
        "endorsedBy": [
          "Lukas Weber",
          "Jan Richter"
        ],
        "endorsements": [
          {
            "name": "Lukas Weber",
            "role": "SEO Strategist",
            "initials": "LW",
            "text": "Erspart uns das mühsame manuelle Durchklicken aller Tags."
          },
          {
            "name": "Jan Richter",
            "role": "Tech Lead & Citizen-Coding-Mentor",
            "initials": "JR",
            "text": "Solide erste Prüfung. Für tiefes Debugging weiterhin GTM nötig."
          }
        ],
        "comments": [],
        "featured": false
      },
      {
        "id": "keyword-research",
        "votesRecent": 3,
        "platforms": { "code": true, "langdock": true },
        "name": "Keyword Researcher",
        "tagline": "SEO Keyword-Analyse mit Content-Cluster-Empfehlungen",
        "description": "Strukturierte Keyword-Analysen: gruppiert nach Suchintention, bewertet Schwierigkeit und erstellt Content-Cluster-Empfehlungen für organisches Wachstum.",
        "longDescription": "Kombiniert SEO-Expertise mit KI. Analysiert Seed-Keywords, erweitert sie systematisch, gruppiert nach Intent und Thema und empfiehlt einen Content-Cluster-Plan. Als erste, schnelle Analyse sehr wertvoll — ersetzt kein professionelles SEO-Tool, beschleunigt aber die Strategie.",
        "exampleOutput": "# Keyword-Analyse: \"Nachhaltige Kosmetik\"\n\nCluster 1 · Ratgeber (informational)\n- naturkosmetik selber machen — niedrig\n- clean beauty erklärung — mittel\n\nCluster 2 · Vergleich (navigational)\n- naturkosmetik marken vergleich — mittel\n- beste refill kosmetik — mittel\n\nCluster 3 · Kauf (transaktional)\n- naturkosmetik kaufen — hoch\n\n→ Content-Cluster: Pillar \"Nachhaltige Kosmetik — der Guide\"\n  + 4 Ratgeber-Artikel als Support (interne Verlinkung)",
        "category": "pilot",
        "subcategory": "media",
        "trigger": "/keywords",
        "author": "SEO-Team pilot",
        "version": "1.1.0",
        "addedAt": "2025-12-01",
        "updatedAt": "2026-04-15",
        "tags": [
          "seo",
          "analytics",
          "content",
          "keywords",
          "content-strategy"
        ],
        "useCases": [
          "SEO-Strategie",
          "Content-Planning",
          "Wettbewerbsanalyse",
          "Nischen-Identifikation"
        ],
        "difficulty": "medium",
        "timeToRun": "10–15 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4.3,
          "count": 15
        },
        "endorsedBy": [
          "Lukas Weber"
        ],
        "endorsements": [
          {
            "name": "Lukas Weber",
            "role": "SEO Strategist",
            "initials": "LW",
            "text": "Content-Cluster-Empfehlungen sind sehr durchdacht. Spart mir echte Research-Zeit."
          }
        ],
        "comments": [
          {
            "author": "Anna Schreiber",
            "role": "Content Strategin",
            "initials": "AS",
            "date": "2026-03-25",
            "text": "Intent-Klassifikation ist sehr akkurat. Top für Content-Strategie.",
            "rating": 5
          }
        ],
        "featured": false
      },
      {
        "id": "content-recycling",
        "votesRecent": 3,
        "platforms": { "code": true, "langdock": true },
        "name": "Content Recycling",
        "tagline": "Ein Asset — zehn Kanäle. Automatisch adaptiert.",
        "description": "Aus einem bestehenden Inhalt (Artikel, Case, Whitepaper) macht der Skill kanalgerechte Varianten: LinkedIn-Post, Instagram-Caption, Newsletter-Teaser, Kurzvideo-Skript.",
        "longDescription": "Guter Content ist teuer — also hol das Maximum raus. Du gibst ein bestehendes Asset, Claude erzeugt daraus kanalgerechte Formate mit passender Länge, Tonalität und Hashtags. Von einem Case entstehen so in Minuten Posts für alle relevanten Kanäle, konsistent in der Botschaft.",
        "exampleOutput": "Quelle: Case Study \"Reichweiten-Rekord Marke X\" (2 Seiten)\n\n✓ LinkedIn-Post (Business-Ton, 1.100 Zeichen, 3 Hashtags)\n✓ Instagram-Caption (locker, Emojis, CTA \"Link in Bio\")\n✓ Newsletter-Teaser (Betreff + 3 Sätze)\n✓ Kurzvideo-Skript (30 Sek., 5 Szenen)\n\nAlle Varianten mit konsistenter Kernbotschaft.",
        "category": "pilot",
        "subcategory": "content",
        "trigger": "/content-recycling",
        "author": "Content-Team pilot",
        "version": "1.0.0",
        "addedAt": "2026-05-05",
        "updatedAt": "2026-06-25",
        "tags": [
          "content",
          "social-media",
          "repurposing",
          "kreativ",
          "productivity"
        ],
        "useCases": [
          "Multichannel-Content",
          "Social-Media-Planung",
          "Content aus Case Studies",
          "Newsletter"
        ],
        "difficulty": "easy",
        "timeToRun": "5–10 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4.5,
          "count": 14
        },
        "endorsedBy": [
          "Anna Schreiber",
          "Mia Hoffmann"
        ],
        "endorsements": [
          {
            "name": "Anna Schreiber",
            "role": "Content Strategin",
            "initials": "AS",
            "text": "Aus einem Case werden zehn Posts. Das vervielfacht unsere Content-Ausbeute."
          },
          {
            "name": "Mia Hoffmann",
            "role": "Senior UX Designerin",
            "initials": "MH",
            "text": "Die Kanal-Anpassung sitzt wirklich gut — nicht einfach copy-paste."
          }
        ],
        "comments": [
          {
            "author": "Lukas Weber",
            "role": "SEO Strategist",
            "initials": "LW",
            "date": "2026-06-15",
            "text": "Spart enorm Zeit. Feinschliff macht man eh selbst, aber die Basis stimmt.",
            "rating": 4
          }
        ],
        "featured": true
      },
      {
        "id": "tonalitaets-check",
        "votesRecent": 2,
        "platforms": { "code": true, "langdock": true },
        "name": "Tonalitäts-Check",
        "tagline": "Texte gegen die Marken-Tonalität & CD prüfen",
        "description": "Prüft einen Text gegen definierte Marken-Tonalität und Sprachregeln (Duz/Siez, Claims, No-Gos) und schlägt konkrete Umformulierungen vor.",
        "longDescription": "Jede Marke hat ihre Stimme — und die soll über alle Texte konsistent bleiben. Dieser Skill kennt die Tonalitäts-Vorgaben (aus deinem Style-Guide) und prüft Texte darauf: Anrede, Satzlänge, verbotene Begriffe, Claim-Konformität. Findet Abweichungen und liefert markengerechte Alternativen.",
        "exampleOutput": "Tonalitäts-Check gegen \"Marke X Styleguide\"\n\n⚠ Zeile 2: \"Sie\" verwendet — Marke duzt konsequent\n⚠ \"günstig\" ist ein No-Go-Wort → Vorschlag: \"fair\"\n✓ Satzlänge & Ton passen zur Markenstimme\n💡 Claim am Ende ergänzen: \"Qualität, die man spürt.\"",
        "category": "pilot",
        "subcategory": "content",
        "trigger": "/tonalitaet",
        "author": "Content-Team pilot",
        "version": "1.0.0",
        "addedAt": "2026-05-18",
        "updatedAt": "2026-06-22",
        "tags": [
          "content",
          "copywriting",
          "branding",
          "ci",
          "qa"
        ],
        "useCases": [
          "Text-Freigabe",
          "Marken-Konsistenz",
          "Style-Guide-Check",
          "Social-Copy prüfen"
        ],
        "difficulty": "easy",
        "timeToRun": "2–5 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4.2,
          "count": 10
        },
        "endorsedBy": [
          "Anna Schreiber",
          "Mia Hoffmann"
        ],
        "endorsements": [
          {
            "name": "Anna Schreiber",
            "role": "Content Strategin",
            "initials": "AS",
            "text": "Wie ein zweites Paar Augen, das den Styleguide auswendig kennt."
          }
        ],
        "comments": [
          {
            "author": "Mia Hoffmann",
            "role": "Senior UX Designerin",
            "initials": "MH",
            "date": "2026-06-08",
            "text": "Sehr nützlich, wenn viele Leute an Texten arbeiten. Hält den Ton konsistent.",
            "rating": 4
          }
        ],
        "featured": false
      },
      {
        "id": "social-kalender",
        "votesRecent": 2,
        "platforms": { "code": true, "langdock": true },
        "name": "Social-Media-Kalender",
        "tagline": "Redaktionsplan aus Themen & Terminen generieren",
        "description": "Erstellt aus Themen, Kanälen und Zeitraum einen strukturierten Redaktionsplan: Posting-Termine, Formatvorschläge, Hooks und passende Hashtags.",
        "longDescription": "Aus einer Liste von Themen und Terminen macht dieser Skill einen fertigen Redaktionsplan pro Kanal — mit sinnvoller Verteilung über die Woche, Formatvorschlägen (Reel, Carousel, Story), ersten Hook-Ideen und Hashtag-Sets. Als Tabelle, die du direkt weiterverarbeiten kannst.",
        "exampleOutput": "Redaktionsplan KW 38 — LinkedIn & Instagram\n\nMo · LinkedIn · Case-Teaser (Carousel) · Hook: \"480.000 €...\"\nMi · Instagram · Behind-the-Scenes (Reel) · #agenturleben\nFr · LinkedIn · Experten-Tipp (Text) · Hook: \"3 Fehler...\"\n\n→ Als Tabelle social_kw38.csv exportiert",
        "category": "pilot",
        "subcategory": "content",
        "trigger": "/social-kalender",
        "author": "Content-Team pilot",
        "version": "1.0.0",
        "addedAt": "2026-06-01",
        "updatedAt": "2026-06-28",
        "tags": [
          "content",
          "social-media",
          "planung",
          "redaktionsplan",
          "productivity"
        ],
        "useCases": [
          "Redaktionsplanung",
          "Social-Media-Kalender",
          "Content-Vorlauf",
          "Kampagnen-Begleitung"
        ],
        "difficulty": "easy",
        "timeToRun": "5–10 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4,
          "count": 9
        },
        "endorsedBy": [
          "Anna Schreiber"
        ],
        "endorsements": [
          {
            "name": "Anna Schreiber",
            "role": "Content Strategin",
            "initials": "AS",
            "text": "Gibt mir in Minuten ein solides Gerüst, das ich nur noch feinjustiere."
          }
        ],
        "comments": [],
        "featured": false
      },
      {
        "id": "meeting-notes",
        "votesRecent": 2,
        "platforms": { "code": true, "langdock": true },
        "name": "Meeting Notes",
        "tagline": "Rohe Mitschriften zu strukturierten Protokollen",
        "description": "Wandelt Mitschriften oder Transkripte in strukturierte Protokolle: Agenda, Beschlüsse, Action Items (wer, was, bis wann), nächste Schritte.",
        "longDescription": "Versteht unstrukturierten Meeting-Input — auch aus Sprachnotizen — und formt daraus saubere, actionable Protokolle im pilot-Format. Hilfreich immer dann, wenn während des Meetings keine Zeit für strukturierte Notizen bleibt.",
        "exampleOutput": "## Protokoll — Kickoff Mustermarke (08.07.)\n\nTeilnehmer: SK, AS, LW\nBeschlüsse: Kampagnenstart 01.09. bestätigt\n\nAction Items:\n- [ ] AS: Kreativ-Briefing bis 15.07.\n- [ ] LW: Keyword-Set bis 12.07.\n- [ ] SK: Mediaplan v1 bis 18.07.",
        "category": "pilot",
        "subcategory": "content",
        "trigger": "/meeting",
        "author": "Collaboration-Team pilot",
        "version": "1.0.1",
        "addedAt": "2026-01-01",
        "updatedAt": "2026-03-15",
        "tags": [
          "productivity",
          "collaboration",
          "meetings",
          "documentation",
          "action-items"
        ],
        "useCases": [
          "Client-Meetings",
          "Strategierunden",
          "Kickoff-Protokolle",
          "Retrospektiven"
        ],
        "difficulty": "easy",
        "timeToRun": "2–5 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4,
          "count": 10
        },
        "endorsedBy": [
          "Sophie Klein",
          "Anna Schreiber"
        ],
        "endorsements": [
          {
            "name": "Sophie Klein",
            "role": "Projektmanagerin",
            "initials": "SK",
            "text": "Action Items werden nie mehr vergessen. Protokoll in 3 Minuten fertig."
          },
          {
            "name": "Anna Schreiber",
            "role": "Content Strategin",
            "initials": "AS",
            "text": "Auch aus Sprachnotizen entstehen gute Protokolle. Sehr praktisch unterwegs."
          }
        ],
        "comments": [],
        "featured": false
      },
      {
        "id": "markt-research",
        "votesRecent": 3,
        "platforms": { "code": true, "langdock": true },
        "name": "Markt-Research",
        "tagline": "Strukturierte Markt- & Zielgruppen-Recherche mit Quellen",
        "description": "Recherchiert strukturiert zu Markt, Wettbewerb und Zielgruppe — mit nachvollziehbaren Quellen. Ergebnis: verdichtetes Briefing statt 20 offener Tabs.",
        "longDescription": "Statt stundenlang selbst zu googeln, gibst du das Thema vor — Claude recherchiert strukturiert, prüft mehrere Quellen und verdichtet die Erkenntnisse zu einem klaren Research-Briefing: Marktgröße, Trends, Wettbewerber, Zielgruppen-Insights. Jede Aussage mit Quellenangabe, damit du sie belegen kannst.",
        "exampleOutput": "Research-Briefing: Markt \"Nachhaltige Kosmetik DE\"\n\n▸ Marktvolumen: ~1,4 Mrd. € (2025), +8% p.a. [Quelle 1]\n▸ Top-Treiber: Gen Z, Refill-Konzepte, Clean Beauty\n▸ Wettbewerb: 3 Platzhirsche, viele Newcomer [Quelle 2,3]\n▸ Zielgruppen-Insight: Preisbereitschaft +15% bei Transparenz\n\nQuellen: 5 geprüfte Fundstellen (Liste am Ende)",
        "category": "pilot",
        "subcategory": "strategy",
        "trigger": "/markt-research",
        "author": "Strategie-Team pilot",
        "version": "1.1.0",
        "addedAt": "2026-04-10",
        "updatedAt": "2026-07-01",
        "tags": [
          "strategy",
          "research",
          "insights",
          "markt",
          "wettbewerb"
        ],
        "useCases": [
          "New-Business-Recherche",
          "Marktanalyse",
          "Zielgruppen-Insights",
          "Pitch-Vorbereitung"
        ],
        "difficulty": "medium",
        "timeToRun": "10–20 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4.6,
          "count": 16
        },
        "endorsedBy": [
          "Christopher Kipp",
          "Sophie Klein"
        ],
        "endorsements": [
          {
            "name": "Christopher Kipp",
            "role": "Innovation Lead",
            "initials": "CK",
            "text": "Verkürzt die Vorrecherche für Pitches drastisch — und mit Quellen belegbar."
          },
          {
            "name": "Sophie Klein",
            "role": "Projektmanagerin",
            "initials": "SK",
            "text": "Der Quellen-Nachweis macht es endlich präsentationsfähig."
          }
        ],
        "comments": [
          {
            "author": "Anna Schreiber",
            "role": "Content Strategin",
            "initials": "AS",
            "date": "2026-06-05",
            "text": "Immer als Startpunkt nutzen, dann selbst vertiefen. Spart den halben Tag.",
            "rating": 5
          }
        ],
        "featured": false
      },
      {
        "id": "persona-builder",
        "votesRecent": 2,
        "platforms": { "code": true, "langdock": true },
        "name": "Persona-Builder",
        "tagline": "Zielgruppen-Personas aus Briefing & Daten",
        "description": "Erstellt greifbare Zielgruppen-Personas aus Briefing-Angaben oder Daten: Demografie, Ziele, Pain Points, Mediennutzung und Ansprache-Empfehlung.",
        "longDescription": "Aus deinen Briefing-Angaben oder vorhandenen Daten formt dieser Skill anschauliche Personas, die dem ganzen Team helfen, die Zielgruppe zu verstehen — inklusive Motivation, Pain Points, bevorzugter Kanäle und konkreter Ansprache-Tipps für Kreation und Media.",
        "exampleOutput": "Persona: \"Nachhaltige Nina\", 34\n\nZiele: bewusst konsumieren, Zeit sparen\nPain Points: Greenwashing-Skepsis, Preis vs. Anspruch\nMedien: Instagram, Podcasts, Newsletter\nAnsprache: ehrlich, faktenbasiert, kein Öko-Pathos\nKanal-Tipp: Reels + Testimonials von Real People",
        "category": "pilot",
        "subcategory": "strategy",
        "trigger": "/persona",
        "author": "Strategie-Team pilot",
        "version": "1.0.0",
        "addedAt": "2026-05-12",
        "updatedAt": "2026-06-18",
        "tags": [
          "strategy",
          "personas",
          "zielgruppe",
          "insights",
          "kreativ"
        ],
        "useCases": [
          "Zielgruppen-Definition",
          "Kampagnen-Planung",
          "Briefing-Ergänzung",
          "Workshop-Input"
        ],
        "difficulty": "easy",
        "timeToRun": "5–10 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4.1,
          "count": 11
        },
        "endorsedBy": [
          "Anna Schreiber"
        ],
        "endorsements": [
          {
            "name": "Anna Schreiber",
            "role": "Content Strategin",
            "initials": "AS",
            "text": "Macht die Zielgruppe fürs ganze Team greifbar. Gutes Workshop-Material."
          }
        ],
        "comments": [
          {
            "author": "Mia Hoffmann",
            "role": "Senior UX Designerin",
            "initials": "MH",
            "date": "2026-06-02",
            "text": "Guter erster Wurf. Echte Interviews ersetzt es natürlich nicht.",
            "rating": 4
          }
        ],
        "featured": false
      },
      {
        "id": "daten-aufbereiten",
        "votesRecent": 5,
        "platforms": { "code": true, "langdock": false },
        "name": "Daten aufbereiten",
        "tagline": "Excel & CSV bereinigen, sortieren, analysefertig machen",
        "description": "Lädt eine unordentliche Tabelle und macht sie sauber: Duplikate raus, Formate vereinheitlicht, Spalten sortiert, Pivot-fertig — inklusive kurzer Zusammenfassung.",
        "longDescription": "Die undankbarste Arbeit vor jeder Analyse: Daten putzen. Dieser Skill übernimmt das. Er erkennt Duplikate, vereinheitlicht Datums- und Zahlenformate, füllt oder markiert Lücken und bringt die Tabelle in eine analysefertige Struktur. Auf Wunsch gleich mit erster Auswertung. Perfekt für alle, die viel mit Export-Dateien hantieren.",
        "exampleOutput": "Aufbereitung — \"export_roh.csv\" (4.812 Zeilen)\n\n✓ 214 Duplikate entfernt\n✓ Datumsformate vereinheitlicht (→ TT.MM.JJJJ)\n✓ Währung bereinigt (\"1.200 €\" → 1200)\n✓ 37 leere Pflichtfelder markiert (gelb)\n\n→ daten_clean.csv erstellt · analysefertig",
        "category": "pilot",
        "subcategory": "data",
        "trigger": "/daten-aufbereiten",
        "author": "Analytics-Team pilot",
        "version": "1.0.0",
        "addedAt": "2026-05-08",
        "updatedAt": "2026-06-24",
        "tags": [
          "data",
          "analytics",
          "excel",
          "csv",
          "datenqualität",
          "productivity"
        ],
        "useCases": [
          "Rohdaten bereinigen",
          "Vor der Analyse",
          "Export-Dateien aufräumen",
          "Reporting-Vorbereitung"
        ],
        "difficulty": "easy",
        "timeToRun": "3–8 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4.6,
          "count": 17
        },
        "endorsedBy": [
          "Jan Richter",
          "Sophie Klein"
        ],
        "endorsements": [
          {
            "name": "Jan Richter",
            "role": "Tech Lead & Citizen-Coding-Mentor",
            "initials": "JR",
            "text": "Der heimliche Star. Nimmt allen die stumpfste Arbeit ab — riesiger Zeitgewinn."
          },
          {
            "name": "Sophie Klein",
            "role": "Projektmanagerin",
            "initials": "SK",
            "text": "Ich verstehe endlich, was mit meinen Export-Chaos-Dateien passieren muss."
          }
        ],
        "comments": [
          {
            "author": "Lukas Weber",
            "role": "SEO Strategist",
            "initials": "LW",
            "date": "2026-06-20",
            "text": "Für GSC- und GA-Exporte perfekt. Spart mir jede Woche eine Stunde.",
            "rating": 5
          }
        ],
        "featured": true
      },
      {
        "id": "report-summary",
        "votesRecent": 3,
        "platforms": { "code": true, "langdock": true },
        "name": "Report Summarizer",
        "tagline": "Lange Reports kompakt und actionable zusammengefasst",
        "description": "Fasst Analysen, Performance-Reports und Marktdaten zusammen. Input: PDF, Excel, Text. Output: Executive Summary + Key Insights + Handlungsempfehlungen auf Deutsch.",
        "longDescription": "Optimiert für pilot-Reporting-Formate: Media-Performance, Marktanalysen, Wettbewerbsanalysen. Destilliert den Kern, hebt die wichtigsten Insights hervor und formuliert nächste Schritte in klarem Deutsch — aus 30 Seiten wird eine Seite, die man wirklich liest.",
        "exampleOutput": "## Executive Summary — Q2 Media-Report\n\nKanal-Mix 18% über Ziel. Haupttreiber: Paid Social\n(ROAS 4,2) und SEA (ROAS 3,8).\n\n▸ Key Insights\n- CTR Meta +34% ggü. Q1 (Creative-Refresh)\n- CPM YouTube +22% → Budget prüfen\n▸ Empfehlung: 15% Budget Display → Paid Social",
        "category": "pilot",
        "subcategory": "data",
        "trigger": "/summarize",
        "author": "Analytics-Team pilot",
        "version": "1.2.0",
        "addedAt": "2025-11-15",
        "updatedAt": "2026-06-01",
        "tags": [
          "analytics",
          "content",
          "productivity",
          "reports",
          "summarization"
        ],
        "useCases": [
          "Wöchentliche Performance-Reports",
          "Marktanalysen",
          "Wettbewerbsanalysen",
          "Management-Summaries"
        ],
        "difficulty": "easy",
        "timeToRun": "3–8 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4.2,
          "count": 13
        },
        "endorsedBy": [
          "Sophie Klein",
          "Lukas Weber"
        ],
        "endorsements": [
          {
            "name": "Sophie Klein",
            "role": "Projektmanagerin",
            "initials": "SK",
            "text": "Wöchentliche Reports dauern jetzt 15 Min statt 90. Game-Changer für uns."
          },
          {
            "name": "Lukas Weber",
            "role": "SEO Strategist",
            "initials": "LW",
            "text": "Für GA- und Search-Console-Reports sehr präzise."
          }
        ],
        "comments": [
          {
            "author": "Anna Schreiber",
            "role": "Content Strategin",
            "initials": "AS",
            "date": "2026-05-05",
            "text": "Executive Summarys sind meist ohne Nachbearbeitung verwendbar.",
            "rating": 5
          }
        ],
        "featured": true
      },
      {
        "id": "moodboard",
        "votesRecent": 2,
        "platforms": { "code": true, "langdock": true },
        "name": "Moodboard-Generator",
        "tagline": "Visuelle Richtung & Moodboard-Struktur aus dem Briefing",
        "description": "Aus Briefing oder Kampagnen-Idee entsteht eine visuelle Richtung: Stil-Achsen, Farbwelten, Bildsprache, Referenz-Stichworte — als strukturiertes Moodboard-Gerüst.",
        "longDescription": "Der schnelle Start in die visuelle Konzeption: Aus deinem Briefing leitet der Skill eine kohärente visuelle Richtung ab — Stimmung, Farbwelten, Bildsprache, Typo-Gefühl und konkrete Referenz-Stichworte zum Suchen. Kein fertiges Design, aber ein starkes Gerüst, das Kreation und Kunde ausrichtet.",
        "exampleOutput": "Moodboard — \"Refill-Kosmetik, Gen Z\"\n\nStimmung: frisch, ehrlich, unperfekt-nahbar\nFarbwelt: warmes Beige · Salbeigrün · Terrakotta\nBildsprache: echte Haut, Tageslicht, keine Studio-Optik\nTypo: humanistisch, leicht, viel Luft\nReferenz-Stichworte: \"clean beauty editorial\", \"refill ritual\"",
        "category": "pilot",
        "subcategory": "content",
        "trigger": "/moodboard",
        "author": "Creation-Team pilot",
        "version": "1.0.0",
        "addedAt": "2026-06-05",
        "updatedAt": "2026-07-02",
        "tags": [
          "content",
          "kreativ",
          "design",
          "moodboard",
          "konzept"
        ],
        "useCases": [
          "Visuelle Konzeption",
          "Kreativ-Kickoff",
          "Kunden-Ausrichtung",
          "Design-Briefing"
        ],
        "difficulty": "easy",
        "timeToRun": "5–10 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4.3,
          "count": 9
        },
        "endorsedBy": [
          "Mia Hoffmann",
          "Anna Schreiber"
        ],
        "endorsements": [
          {
            "name": "Mia Hoffmann",
            "role": "Senior UX Designerin",
            "initials": "MH",
            "text": "Gibt der ersten Design-Runde eine klare Richtung. Spart Leerlauf."
          },
          {
            "name": "Anna Schreiber",
            "role": "Content Strategin",
            "initials": "AS",
            "text": "Richtet Kreation und Kunde früh auf dieselbe Vision aus."
          }
        ],
        "comments": [],
        "featured": false
      },
      {
        "id": "slides-aus-daten",
        "votesRecent": 2,
        "platforms": { "code": true, "langdock": true },
        "name": "Slides aus Daten",
        "tagline": "Aus Zahlen eine präsentationsreife Story",
        "description": "Nimmt eine Datentabelle und macht daraus eine Slide-Struktur mit Kernaussagen, passenden Chart-Vorschlägen und Sprechernotizen — bereit für die Präsentation.",
        "longDescription": "Der Weg von der Excel-Tabelle zur Story: Der Skill analysiert deine Zahlen, findet die Kernaussagen und baut daraus eine schlüssige Slide-Struktur — pro Slide eine Botschaft, ein Chart-Vorschlag und eine kurze Sprechernotiz. Ideal für Performance-Reviews und Ergebnis-Präsentationen.",
        "exampleOutput": "Slides aus \"q2_ergebnisse.csv\"\n\nSlide 1 · Titel: \"Q2 über Plan — +18%\"\nSlide 2 · \"Paid Social treibt den Erfolg\" (Balkenchart)\nSlide 3 · \"YouTube-CPM steigt — Handlungsbedarf\" (Linie)\nSlide 4 · Empfehlung & nächste Schritte\n+ Sprechernotizen je Slide",
        "category": "pilot",
        "subcategory": "data",
        "trigger": "/slides",
        "author": "Analytics-Team pilot",
        "version": "1.0.0",
        "addedAt": "2026-06-12",
        "updatedAt": "2026-07-03",
        "tags": [
          "data",
          "analytics",
          "presentations",
          "reporting",
          "storytelling"
        ],
        "useCases": [
          "Ergebnis-Präsentation",
          "Performance-Review",
          "Management-Update",
          "Kunden-Report"
        ],
        "difficulty": "medium",
        "timeToRun": "8–15 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 4.2,
          "count": 8
        },
        "endorsedBy": [
          "Sophie Klein"
        ],
        "endorsements": [
          {
            "name": "Sophie Klein",
            "role": "Projektmanagerin",
            "initials": "SK",
            "text": "Aus Zahlen wird eine Story mit rotem Faden — genau das, was in Präsentationen zählt."
          }
        ],
        "comments": [],
        "featured": false
      },
      {
        "category": "anthropic",
        "author": "Anthropic",
        "version": "1.0.0",
        "addedAt": "2026-07-01",
        "updatedAt": "2026-07-09",
        "requirements": [
          "Claude Code"
        ],
        "endorsements": [],
        "comments": [],
        "trigger": null,
        "id": "pptx",
        "votesRecent": 4,
        "platforms": { "code": true, "langdock": false },
        "install": "builtin",
        "name": "pptx",
        "subcategory": "content",
        "difficulty": "medium",
        "timeToRun": "5–20 Min",
        "featured": true,
        "tagline": "PowerPoint-Präsentationen erstellen, lesen & bearbeiten",
        "description": "Offizieller Anthropic-Skill für .pptx: Decks erstellen (auch aus Inhalten/Daten), Text extrahieren, Folien, Layouts, Sprechernotizen und Kommentare bearbeiten.",
        "longDescription": "Der offizielle Claude-Code-Skill rund um PowerPoint. Erstellt vollständige Präsentationen, liest und extrahiert Inhalte aus bestehenden Decks, bearbeitet Folien, Templates, Layouts und Notizen. Für die Agentur ideal für Pitch-Decks und Ergebnis-Präsentationen.",
        "exampleOutput": "Auftrag: „Bau aus q3-ergebnisse.md ein Deck für Grünwerk“\n\n✓ 8 Folien angelegt (16:9)\n    1 Titel · 2 Ausgangslage · 3–5 Ergebnisse je Kanal\n    6 Learnings · 7 Empfehlung · 8 Nächste Schritte\n✓ Sprechernotiz je Folie ergänzt\n✓ Balkendiagramm auf Folie 4 aus der Tabelle erzeugt\n\n→ gruenwerk-q3.pptx geschrieben — öffnet in PowerPoint\n    Sag mir, welche Folie ich anders aufziehen soll.",
        "tags": [
          "präsentation",
          "pptx",
          "pitch",
          "office",
          "deck"
        ],
        "useCases": [
          "Pitch-Deck erstellen",
          "Ergebnis-Präsentation",
          "Deck aus Daten",
          "Inhalte aus Deck extrahieren"
        ],
        "rating": {
          "average": 4.7,
          "count": 9
        },
        "endorsedBy": [
          "Anna Schreiber",
          "Sophie Klein"
        ]
      },
      {
        "category": "anthropic",
        "author": "Anthropic",
        "version": "1.0.0",
        "addedAt": "2026-07-01",
        "updatedAt": "2026-07-09",
        "requirements": [
          "Claude Code"
        ],
        "endorsements": [],
        "comments": [],
        "trigger": null,
        "id": "xlsx",
        "votesRecent": 3,
        "platforms": { "code": true, "langdock": false },
        "install": "builtin",
        "name": "xlsx",
        "subcategory": "data",
        "difficulty": "medium",
        "timeToRun": "5–15 Min",
        "featured": false,
        "tagline": "Excel-Dateien erstellen, auswerten & bearbeiten",
        "description": "Offizieller Anthropic-Skill für .xlsx: Tabellen erstellen, Formeln, Auswertungen, Daten aus bestehenden Dateien lesen und bearbeiten.",
        "longDescription": "Der offizielle Claude-Code-Skill für Excel. Erstellt und bearbeitet Arbeitsmappen mit Formeln, formatiert Tabellen, liest und wertet vorhandene Daten aus. Für Mediapläne, Reportings und Datenaufbereitung.",
        "exampleOutput": "Auftrag: „Mach aus den vier Kanal-Exporten eine Auswertung“\n\n✓ velomo-q3.xlsx angelegt\n    Blatt „Rohdaten“    4 Exporte untereinander, 1.284 Zeilen\n    Blatt „Auswertung“  je Kanal: Kosten, Klicks, CPC\n    Blatt „Chart“       Balken Kosten je Kanal\n✓ Formeln statt Festwerten (=SUMMEWENN je Kanal)\n✓ Format: € mit zwei Stellen, Tausenderpunkt\n\nNicht geraten: 12 Zeilen ohne Kanal-Angabe sind gelb\nmarkiert und stehen in keiner Summe.",
        "tags": [
          "excel",
          "xlsx",
          "tabellen",
          "office",
          "daten"
        ],
        "useCases": [
          "Mediaplan erstellen",
          "Daten auswerten",
          "Report-Tabelle",
          "Formeln & Pivot"
        ],
        "rating": {
          "average": 4.6,
          "count": 7
        },
        "endorsedBy": [
          "Sophie Klein"
        ]
      },
      {
        "category": "anthropic",
        "author": "Anthropic",
        "version": "1.0.0",
        "addedAt": "2026-07-01",
        "updatedAt": "2026-07-09",
        "requirements": [
          "Claude Code"
        ],
        "endorsements": [],
        "comments": [],
        "trigger": null,
        "id": "docx",
        "votesRecent": 2,
        "platforms": { "code": true, "langdock": false },
        "install": "builtin",
        "name": "docx",
        "subcategory": "content",
        "difficulty": "medium",
        "timeToRun": "5–15 Min",
        "featured": false,
        "tagline": "Word-Dokumente erstellen & bearbeiten (inkl. Änderungen/Kommentare)",
        "description": "Offizieller Anthropic-Skill für .docx: Dokumente erstellen, formatieren, Änderungen nachverfolgen, Kommentare setzen, Inhalte extrahieren.",
        "longDescription": "Der offizielle Claude-Code-Skill für Word. Erstellt und bearbeitet Dokumente, verwaltet Änderungsverfolgung und Kommentare, extrahiert Inhalte. Für Reports, Konzepte und formelle Dokumente.",
        "exampleOutput": "Auftrag: „Schreib das Konzept sauber aus und markier die\noffenen Stellen“\n\n✓ konzept-velomo.docx erstellt (Überschriften + Inhaltsverzeichnis)\n✓ Änderungsverfolgung an — deine Fassung bleibt daneben lesbar\n✓ 3 Kommentare gesetzt:\n    S. 2  „Budget noch nicht bestätigt“\n    S. 4  „Quelle für die 34 % fehlt“\n    S. 6  „Timing kollidiert mit KW 46“\n\n→ Bereit zum Weiterreichen.",
        "tags": [
          "word",
          "docx",
          "dokument",
          "office",
          "report"
        ],
        "useCases": [
          "Report/Konzept schreiben",
          "Dokument formatieren",
          "Änderungen & Kommentare",
          "Text extrahieren"
        ],
        "rating": {
          "average": 4.5,
          "count": 6
        },
        "endorsedBy": [
          "Anna Schreiber"
        ]
      },
      {
        "category": "anthropic",
        "author": "Anthropic",
        "version": "1.0.0",
        "addedAt": "2026-07-01",
        "updatedAt": "2026-07-09",
        "requirements": [
          "Claude Code"
        ],
        "endorsements": [],
        "comments": [],
        "trigger": null,
        "id": "pdf",
        "votesRecent": 2,
        "platforms": { "code": true, "langdock": false },
        "install": "builtin",
        "name": "pdf",
        "subcategory": "data",
        "difficulty": "medium",
        "timeToRun": "3–15 Min",
        "featured": false,
        "tagline": "PDFs erstellen, auslesen & Formulare verarbeiten",
        "description": "Offizieller Anthropic-Skill für PDF: Text/Tabellen extrahieren, Formulare ausfüllen, PDFs erzeugen und zusammenführen.",
        "longDescription": "Der offizielle Claude-Code-Skill für PDF. Liest Inhalte und Tabellen aus, füllt Formulare, erzeugt und kombiniert PDFs. Für Angebote, ausfüllbare Formulare und Daten aus PDF-Reports.",
        "exampleOutput": "Auftrag: „Zieh die Preistabellen aus den Mediadaten in eine CSV“\n\n✓ quellgold-mediadaten.pdf gelesen (24 Seiten)\n✓ 3 Tabellen erkannt (S. 8, S. 11, S. 17)\n✓ preise.csv geschrieben — 46 Zeilen\n\nNicht übernommen (statt still zu schlucken):\n    S. 14  Tabelle ist ein Bild → nicht auslesbar\n    S. 19  Fußnote „Preise zzgl. AE“ — separat notiert",
        "tags": [
          "pdf",
          "formulare",
          "extraktion",
          "office",
          "daten"
        ],
        "useCases": [
          "Daten aus PDF ziehen",
          "Formular ausfüllen",
          "PDF erzeugen",
          "PDFs zusammenführen"
        ],
        "rating": {
          "average": 4.4,
          "count": 5
        },
        "endorsedBy": []
      },
      {
        "category": "anthropic",
        "author": "Anthropic",
        "version": "1.0.0",
        "addedAt": "2026-07-01",
        "updatedAt": "2026-07-09",
        "requirements": [
          "Claude Code"
        ],
        "endorsements": [],
        "comments": [],
        "trigger": null,
        "id": "brand-guidelines",
        "votesRecent": 2,
        "platforms": { "code": true, "langdock": false },
        "install": "plugin",
        "name": "brand-guidelines",
        "subcategory": "content",
        "difficulty": "easy",
        "timeToRun": "2–5 Min",
        "featured": false,
        "tagline": "Marken-Look (Farben & Typo) auf Artefakte anwenden",
        "description": "Offizieller Anthropic-Skill, der Marken-Farben und Typografie konsistent auf Artefakte anwendet. Als Vorlage für die eigene CI anpassbar.",
        "longDescription": "Wendet ein definiertes Marken-Styling (Farben, Typografie, Formatierung) konsistent auf erzeugte Artefakte an. Im Original für die Anthropic-CI — ideal als Vorlage, um die pilot- bzw. Kunden-CI zu hinterlegen.",
        "exampleOutput": "Hinterlegt in brand-guidelines.md (pilot-Fassung):\n    Farben   Gelb #ffe05e · Schwarz #262626 · Papier #f1f1ec\n    Schrift  Inter — Überschriften 700, Fließtext 400\n\nAuftrag: „Zieh den Report auf unseren Look“\n\n✓ report.html auf die Palette umgestellt\n✓ Überschriften-Hierarchie vereinheitlicht (H1–H3)\n✓ Kontrast nachgerechnet: 14 von 14 Textstellen ≥ 4,5:1\n\n⚠ Diagramm hat 5 Serien, die Palette gibt 3 Farben her —\n    zwei Zwischentöne vorgeschlagen, bitte einmal freigeben.",
        "tags": [
          "branding",
          "ci",
          "design",
          "styling",
          "marke"
        ],
        "useCases": [
          "CI konsistent anwenden",
          "Artefakte im Marken-Look",
          "Design-Standards durchsetzen"
        ],
        "rating": {
          "average": 4.3,
          "count": 4
        },
        "endorsedBy": [
          "Mia Hoffmann"
        ]
      },
      {
        "category": "anthropic",
        "author": "Anthropic",
        "version": "1.0.0",
        "addedAt": "2026-07-01",
        "updatedAt": "2026-07-16",
        "requirements": [
          "Claude Code"
        ],
        "endorsements": [
          {
            "name": "Christopher Kipp",
            "role": "Innovation Lead",
            "initials": "CK",
            "text": "Das Werkzeug, das aus Skill-Nutzer:innen Skill-Beitragende macht — der direkte Weg zu neuen pilot-Skills hier."
          }
        ],
        "comments": [],
        "trigger": null,
        "id": "skill-creator",
        "votesRecent": 4,
        "itemType": "plugin",
        "platforms": { "code": true, "langdock": false },
        "name": "skill-creator",
        "subcategory": "bauen",
        "difficulty": "advanced",
        "timeToRun": "15–40 Min",
        "featured": true,
        "tagline": "Für später: eigene Skills bauen und beisteuern",
        "description": "Für den Moment, in dem du selbst etwas beisteuern willst: Dieses offizielle Anthropic-Plugin baut mit dir einen eigenen Skill — Struktur, SKILL.md, gute description, Referenzen und Tests. Nichts, was du am ersten Tag brauchst; hol es dir, wenn du einen Ablauf drei Mal erklärt hast.",
        "longDescription": "Erst benutzen, später beisteuern — dieser Eintrag gehört in die zweite Phase. Wenn du merkst, dass du Claude immer wieder dasselbe erklärst, macht der skill-creator daraus einen wiederverwendbaren Skill: Du sagst „Erstell mir einen Skill, der …“, und Claude führt dich durch Aufbau, gute description (für den Auto-Trigger), Ordnerstruktur und Qualität. Fertige Skill-Ordner kannst du mit Kolleg:innen teilen und hier einreichen. Ehrlich gesagt: Gute Skills brauchen mehrere Runden Ausprobieren und Nachschärfen — der erste Wurf ist selten perfekt (das sagt Anthropic selbst so). Die Eval-Funktionen sind Fortgeschrittenen-Terrain; einen einfachen Skill schafft aber auch ein:e Einsteiger:in im Dialog. Wer nur schnell eine SKILL.md braucht: Der Reiter „Skill bauen“ auf dieser Seite tut das ohne Installation.",
        "exampleOutput": "Du: \"Erstell mir einen Skill, der aus unseren\nKampagnen-Kennzahlen einen Report im pilot-Stil macht\"\n\n✓ Fragen geklärt: Eingabeformat, Report-Aufbau, Ton\n✓ Skill-Ordner angelegt: kampagnen-report/\n  SKILL.md · references/beispiel.md\n→ Zum Teilen bereit — und zum Einreichen bei den pilot Skills",
        "filesMirrored": true,
        "source": "https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator",
        "installCmd": "/plugin install skill-creator@claude-plugins-official",
        "contains": "1 großer Skill inklusive drei Hilfs-Agents (analyzer, comparator, grader), Referenz-Dokumenten und einem Eval-Werkzeug, mit dem sich messen lässt, ob ein Skill zuverlässig funktioniert. Keine Slash-Befehle — du sagst einfach „Erstell mir einen Skill, der …“.",
        "installDemo": [
          {"t":"user","text":"/plugin install skill-creator@claude-plugins-official"},
          {"t":"sys","text":"Detailansicht öffnet sich: 1 Skill + 3 Hilfs-Agents (analyzer, comparator, grader) · Context cost in Tokens","pause":900},
          {"t":"sys","text":"Scope wählen: User (überall) · Project (fürs Team im Repo) · Local (nur du, nur hier)","pause":950},
          {"t":"res","html":"Installiert im Scope „User“ <span class=\"r-ok\">✓</span>","pause":700},
          {"t":"user","text":"/reload-plugins"},
          {"t":"res","html":"Plugins neu geladen <span class=\"r-ok\">✓</span>","pause":650},
          {"t":"user","text":"Erstell mir einen Skill, der aus Kampagnen-Kennzahlen einen Report im pilot-Stil macht."},
          {"t":"claude","text":"Gern — ich stelle dir erst ein paar Fragen zu Eingabeformat und Report-Aufbau, dann baue ich den Skill-Ordner nach den Anthropic-Best-Practices.","pause":400}
        ],
        "tags": [
          "einstieg",
          "skills",
          "bauen",
          "meta",
          "citizen-coding"
        ],
        "useCases": [
          "Eigenen Skill erstellen",
          "SKILL.md schreiben",
          "Team-Skill standardisieren"
        ],
        "rating": {
          "average": 4.7,
          "count": 10
        },
        "endorsedBy": [
          "Christopher Kipp",
          "Jan Richter"
        ]
      },
      {
        "category": "anthropic",
        "author": "Anthropic",
        "version": "1.0.0",
        "addedAt": "2026-07-01",
        "updatedAt": "2026-07-09",
        "requirements": [
          "Claude Code"
        ],
        "endorsements": [],
        "comments": [],
        "trigger": null,
        "id": "internal-comms",
        "votesRecent": 2,
        "platforms": { "code": true, "langdock": true },
        "install": "plugin",
        "name": "internal-comms",
        "subcategory": "content",
        "difficulty": "easy",
        "timeToRun": "3–10 Min",
        "featured": false,
        "tagline": "Interne Kommunikation: Updates, Newsletter, FAQs",
        "description": "Offizieller Anthropic-Skill für interne Kommunikation — Team-Updates, Newsletter, Ankündigungen und FAQ-Antworten in passendem Ton.",
        "longDescription": "Der offizielle Claude-Code-Skill für interne Kommunikation. Formuliert Team-Updates, Newsletter, Ankündigungen und FAQ-Antworten klar und im passenden Ton — mit Beispielen als Referenz.",
        "exampleOutput": "Auftrag: „Kündige intern an, dass der Grünwerk-Etat startet“\n\nBetreff: Ab Montag: Grünwerk — wer ist wofür da\n\nKurz: Der Etat startet am 1. September. Für euch ändert\nsich nur eins — Anfragen laufen ab sofort über das\nProjektpostfach statt über Einzelmails.\n\nWer macht was\n· Beratung: Ansprechperson für alles Richtung Kunde\n· Media: Planung und Buchung\n· Kreation: Assets und Freigaben\n\nWas ihr jetzt tun müsst\n· Projektpostfach abonnieren (Link unten)\n· Kickoff am Mittwoch, 10 Uhr, in den Kalender\n\nFragen sammeln wir in der FAQ — einfach auf diese Mail\nantworten.",
        "tags": [
          "kommunikation",
          "intern",
          "newsletter",
          "updates",
          "content"
        ],
        "useCases": [
          "Team-Update",
          "Interner Newsletter",
          "Ankündigung",
          "FAQ beantworten"
        ],
        "rating": {
          "average": 4.2,
          "count": 4
        },
        "endorsedBy": [
          "Anna Schreiber"
        ]
      }
      ,{
        "id": "frontend-design",
        "votesRecent": 2,
        "itemType": "plugin",
        "platforms": { "code": true, "langdock": false },
        "name": "frontend-design",
        "tagline": "Webseiten & Tools, die nicht nach Baukasten aussehen",
        "description": "Offizielles Anthropic-Plugin mit genau einem Skill: Design-Leitplanken für markante, hochwertige Oberflächen — Typografie, Farben, Layout. Läuft automatisch mit, wenn Claude etwas mit UI baut. Inhalt auf Englisch.",
        "longDescription": "Wer mit Claude eine Webseite oder ein kleines Tool baut, bekommt schnell ein generisches „KI-Template“-Aussehen. Dieses Plugin gibt Claude eine Design-Haltung mit: bewusste Typo-Entscheidungen, stimmige Farbwelten, Layouts mit Charakter. Perfekte Ergänzung zu unseren Bau-Skills (webseite-bauen, prototyp-bauen) — einmal installiert, wirkt es bei jedem UI-Auftrag mit, ganz ohne Bedienung. Ehrlich gesagt: Es ersetzt keine CI-Vorgaben — Kunden-Guidelines gibst du weiterhin selbst in den Prompt. Und es ist bewusst meinungsstark, manchmal gewagter, als der Kunde es will. Inhalt auf Englisch.",
        "exampleOutput": "Du: \"Bau mir eine Microsite für den Kunden-Pitch\"\n\nOhne Plugin: das übliche Template-Einerlei.\nMit Plugin wählt Claude eine eigene Richtung —\nund begründet sie:\n\"Editorial-Look: enge Headline-Typo, viel Weißraum,\n eine Akzentfarbe aus dem Kampagnenmotiv.\"",
        "category": "anthropic",
        "subcategory": "bauen",
        "trigger": null,
        "author": "Anthropic",
        "version": "1.0.0",
        "addedAt": "2026-07-10",
        "updatedAt": "2026-07-16",
        "featured": false,
        "tags": ["design", "web", "bauen", "ui", "typografie"],
        "useCases": ["Landingpages mit Charakter", "Interne Tools aufwerten", "Kunden-Prototypen präsentabel machen"],
        "difficulty": "easy",
        "timeToRun": "läuft automatisch mit",
        "requirements": ["Claude Code"],
        "rating": { "average": 4.6, "count": 3 },
        "endorsedBy": ["Mia Hoffmann"],
        "endorsements": [
          {
            "name": "Mia Hoffmann",
            "role": "Senior UX Designerin",
            "initials": "MH",
            "text": "Der Unterschied zwischen „KI-Template“ und „kann man dem Kunden zeigen“. Brand Guidelines musst du trotzdem selbst mitgeben."
          }
        ],
        "comments": [],
        "filesMirrored": true,
        "source": "https://github.com/anthropics/claude-plugins-official/tree/main/plugins/frontend-design",
        "installCmd": "/plugin install frontend-design@claude-plugins-official",
        "contains": "Genau 1 Skill (frontend-design) mit Design-Leitlinien zu Typografie, Farbwahl und Layout. Keine Slash-Befehle — der Skill springt automatisch an, sobald Claude Oberflächen baut.",
        "installDemo": [
          {"t":"user","text":"/plugin install frontend-design@claude-plugins-official"},
          {"t":"sys","text":"Detailansicht öffnet sich: 1 Skill (frontend-design) · keine Befehle · Context cost in Tokens","pause":900},
          {"t":"sys","text":"Scope wählen: User (überall) · Project (fürs Team im Repo) · Local (nur du, nur hier)","pause":950},
          {"t":"res","html":"Installiert im Scope „User“ <span class=\"r-ok\">✓</span>","pause":700},
          {"t":"user","text":"/reload-plugins"},
          {"t":"res","html":"Plugins neu geladen <span class=\"r-ok\">✓</span>","pause":650},
          {"t":"sys","text":"Nichts weiter zu tun — der Skill wirkt ab jetzt automatisch mit, sobald Claude etwas mit Oberfläche baut.","pause":400}
        ]
      },
      {
        "id": "doc-coauthoring",
        "votesRecent": 3,
        "platforms": { "code": true, "langdock": true },
        "name": "doc-coauthoring",
        "install": "plugin",
        "tagline": "Konzepte & Papiere strukturiert gemeinsam schreiben",
        "description": "Offizieller Anthropic-Skill: führt in drei Phasen durch das Schreiben von Konzepten, Proposals und Entscheidungsvorlagen — Kontext sammeln, gemeinsam verfeinern, am Leser testen. Inhalt auf Englisch.",
        "longDescription": "Statt „schreib mir ein Konzept“ und einem mittelmäßigen Erstwurf: Dieser Skill strukturiert das Schreiben als geführten Prozess. Erst hilft Claude, dein Wissen in den Text zu bekommen (Brain-Dump, gezielte Fragen), dann verfeinert ihr Abschnitt für Abschnitt, zum Schluss prüft Claude den Text aus Sicht der Zielgruppe. Stark für Kundenkonzepte, interne Vorlagen und New-Business-Papiere. Inhalt auf Englisch.",
        "exampleOutput": "Phase 1 — Kontext einsammeln\nClaude: „Erzähl mir in eigenen Worten, was Quellgold im\nSommer erreichen will. Ich frage danach gezielt nach.“\n  → 6 Rückfragen, darunter: „Woran merkt ihr im Oktober,\n    dass es funktioniert hat?“\n\nPhase 2 — Abschnitt für Abschnitt verfeinern\nGliederung abgestimmt (5 Abschnitte), dann schreibt Claude\nje Abschnitt und du korrigierst.\n  Abschnitt 3 zweimal überarbeitet — „zu allgemein“\n\nPhase 3 — Am Leser testen\nGelesen aus Sicht „Marketingleitung, 5 Minuten Zeit“:\n  ⚠ Kernaussage steht erst auf Seite 2 → nach vorn geholt\n  ⚠ Zwei Fachbegriffe ungeklärt (Incrementality, MMM)\n  ✓ Entscheidungsfrage am Ende klar gestellt\n\n→ konzept-quellgold.md — bereit für die Runde.",
        "category": "anthropic",
        "subcategory": "content",
        "trigger": null,
        "author": "Anthropic",
        "version": "1.0.0",
        "addedAt": "2026-07-10",
        "updatedAt": "2026-07-10",
        "featured": false,
        "tags": ["content", "konzept", "proposal", "schreiben", "workflow"],
        "useCases": ["Kundenkonzepte", "Entscheidungsvorlagen", "New-Business-Papiere"],
        "difficulty": "easy",
        "timeToRun": "15–30 Min",
        "requirements": ["Claude Code"],
        "rating": { "average": 4.4, "count": 3 },
        "endorsedBy": [],
        "endorsements": [],
        "comments": []
      },
      {
        "id": "brainstorming",
        "votesRecent": 8,
        "platforms": { "code": true, "langdock": true },
        "name": "brainstorming",
        "tagline": "Erst denken, dann bauen — Anforderungen im Dialog klären",
        "description": "Der meistempfohlene Community-Skill: Bevor Claude baut, stellt er dir die richtigen Fragen — Ziel, Nutzer:innen, Grenzen. Aus deinen Antworten wird ein kleines Konzept.",
        "longDescription": "Aus dem superpowers-Paket von Jesse Vincent (obra) — einer der meistinstallierten Skill-Sammlungen der Claude-Code-Community. Der Skill verankert die wichtigste Gewohnheit beim Citizen Coding: erst Absicht, Zielgruppe und Randbedingungen klären, dann bauen. Claude führt ein kurzes, strukturiertes Gespräch und hält das Ergebnis als Design-Notiz fest — die ideale Vorstufe zu /prototyp oder /webseite. Einzeln holen oder als Paket: Dieser Skill liegt hier als eigener Ordner zum Herunterladen; wer mehr aus derselben Sammlung will, installiert stattdessen das Plugin „superpowers“ und bekommt alle 14 Skills auf einmal.",
        "category": "extern",
        "subcategory": "bauen",
        "trigger": null,
        "author": "obra/superpowers (Community)",
        "version": "1.0.0",
        "addedAt": "2026-07-11",
        "updatedAt": "2026-07-11",
        "tags": ["bauen", "konzept", "anforderungen", "citizen-coding", "community"],
        "useCases": ["Tool-Idee schärfen, bevor gebaut wird", "Anforderungen fürs Briefing sammeln", "Feature mit dem Team durchdenken"],
        "difficulty": "easy",
        "timeToRun": "10–20 Min",
        "requirements": ["Claude Code oder pilot AI"],
        "rating": { "average": 4.9, "count": 21 },
        "endorsedBy": ["Jan Richter", "Christopher Kipp", "Mia Hoffmann"],
        "endorsements": [
          {
            "name": "Jan Richter",
            "role": "Tech Lead & Citizen-Coding-Mentor",
            "initials": "JR",
            "text": "Der Skill, den ich jeder neuen Testgruppe zuerst zeige. Zehn Minuten Fragen sparen zwei Stunden Umbauen."
          },
          {
            "name": "Christopher Kipp",
            "role": "Innovation Lead",
            "initials": "CK",
            "text": "Läuft bei uns vor jedem größeren Prototyp — und als reine SKILL.md auch in Langdock."
          }
        ],
        "comments": [
          {
            "author": "Mia Hoffmann",
            "role": "Senior UX Designerin",
            "initials": "MH",
            "date": "2026-07-11",
            "text": "Fühlt sich an wie ein gutes Kickoff-Gespräch — nur dass am Ende direkt gebaut wird.",
            "rating": 5
          }
        ],
        "featured": false
      },

      {
        "id": "grill-me",
        "platforms": { "code": true, "langdock": true },
        "name": "grill-me",
        "tagline": "Lass deinen Plan auseinandernehmen, bevor jemand ihn baut",
        "description": "Ein Community-Skill von Matt Pocock (MIT): Claude befragt dich hartnäckig zu deinem Vorhaben — eine Frage nach der anderen, zu jeder mit eigener Empfehlung — und fängt erst an, wenn ihr euch einig seid. Reiner Anleitungstext, läuft auch in pilot AI.",
        "longDescription": "Der kleine Bruder von brainstorming, und in gewisser Weise das Gegenteil: Hier bringst du den Plan schon mit und lässt ihn beschießen. Claude geht den Entscheidungsbaum systematisch durch, löst Abhängigkeiten einzeln auf und stellt zu jeder offenen Stelle genau eine Frage — mit der Antwort, die er selbst empfehlen würde, damit du zustimmen oder widersprechen kannst statt ins Leere zu denken. Was sich nachschauen lässt (welche Dateien liegen im Ordner, wie heißt die Spalte wirklich), schaut Claude selbst nach und fragt dich nicht danach; entschieden wird nur, was auch wirklich eine Entscheidung ist. Gebaut wird erst, wenn du sagst, dass ihr durch seid. Nützlich vor jedem Prototyp, aber genauso vor einem Konzept, einem Kampagnen-Setup oder einer Empfehlung an den Kunden — der Skill ist reiner Text und weiß nichts über Code. Ehrlich gesagt: Das Frage-für-Frage-Tempo fühlt sich anfangs zäh an, und wer nur schnell etwas erledigt haben will, ist hier falsch. Original von Matt Pocock, MIT-Lizenz; die Anleitung ist Englisch, das Gespräch führt Claude auf Deutsch.",
        "exampleOutput": "Du: „Wir bauen einen Kanal-Report, der sich jeden Montag\nselbst aktualisiert.“\n\nClaude: Frage 1 von vermutlich 6 — woher kommen die Zahlen?\n  Meine Empfehlung: ein CSV-Export je Kanal in einem festen\n  Ordner. Alles andere braucht Zugänge, die wir hier nicht haben.\n\nDu: „Ja, CSV. Liegt schon so.“\n\nClaude: (schaut selbst nach — 4 Dateien, uneinheitliche Spalten)\n  Frage 2 — die Exporte nennen die Kosten unterschiedlich\n  („Kosten“, „Spend“, „cost_eur“). Vereinheitlichen wir beim\n  Einlesen oder bestehst du auf einem sauberen Export?\n  Meine Empfehlung: beim Einlesen — du kommst an die Exporte\n  nicht ran.\n\nDu: „Beim Einlesen.“\n\nClaude: Frage 3 — was passiert, wenn montags ein Export fehlt?\n  Meine Empfehlung: Report trotzdem bauen, fehlenden Kanal\n  sichtbar als Lücke markieren. Stillschweigend weglassen wäre\n  die gefährlichere Variante.\n\n… nach 6 Fragen:\nClaude: So habe ich es verstanden: […] Passt das? Dann fange ich an.",
        "category": "extern",
        "subcategory": "loslegen",
        "trigger": "/grill-me",
        "author": "Matt Pocock (Community, MIT)",
        "version": "1.0.0",
        "addedAt": "2026-08-03",
        "updatedAt": "2026-08-03",
        "tags": ["konzept", "anforderungen", "citizen-coding", "community", "loslegen"],
        "useCases": ["Plan vor dem Bauen abklopfen", "Blinde Flecken in einem Konzept finden", "Entscheidungen bewusst treffen statt nebenbei"],
        "difficulty": "easy",
        "timeToRun": "10–30 Min",
        "requirements": ["Claude Code oder pilot AI"],
        "votesSeed": 3,
        "votesRecent": 2,
        "endorsedBy": [],
        "endorsements": [],
        "comments": [],
        "featured": false,
        "source": "https://github.com/mattpocock/skills"
      },

      {
        "id": "systematic-debugging",
        "votesRecent": 9,
        "platforms": { "code": true, "langdock": false },
        "name": "systematic-debugging",
        "tagline": "Wenn dein Tool spinnt: Ursache finden statt raten",
        "description": "Der Rettungsanker aus dem superpowers-Paket: eine erprobte Vier-Phasen-Methode, mit der Claude Fehler systematisch eingrenzt, statt wild Fixes zu probieren.",
        "longDescription": "Für Citizen Coder der wichtigste Sicherheitsgurt: Wenn der Prototyp plötzlich nicht mehr tut, führt dieser Skill Claude durch eine saubere Diagnose — reproduzieren, eingrenzen, Ursache belegen, erst dann fixen. Mit Referenzen zu Root-Cause-Tracing und Defense-in-Depth aus der superpowers-Sammlung. Verhindert die typische Abwärtsspirale aus Symptom-Flickerei. Einzeln holen oder als Paket: Dieser Skill stammt aus dem Plugin „superpowers“ und liegt hier als eigener Ordner zum Herunterladen. Wer ihn und brainstorming nutzt, kann stattdessen das ganze Plugin installieren — dann kommen alle 14 Skills mit.",
        "category": "extern",
        "subcategory": "bauen",
        "trigger": null,
        "author": "obra/superpowers (Community)",
        "version": "1.0.0",
        "addedAt": "2026-07-11",
        "updatedAt": "2026-07-11",
        "tags": ["bauen", "debugging", "qualität", "citizen-coding", "community"],
        "useCases": ["Kaputtes Tool wieder flottmachen", "Fehler eingrenzen, bevor man Hilfe holt", "Ursache statt Symptom fixen"],
        "difficulty": "medium",
        "timeToRun": "10–30 Min",
        "requirements": ["Claude Code"],
        "rating": { "average": 4.8, "count": 14 },
        "endorsedBy": ["Jan Richter", "Sophie Klein"],
        "endorsements": [
          {
            "name": "Jan Richter",
            "role": "Tech Lead & Citizen-Coding-Mentor",
            "initials": "JR",
            "text": "Seit der in der Testgruppe ist, bekomme ich halb so viele „es geht nicht mehr“-Pings — die andere Hälfte kommt mit einer sauberen Diagnose an."
          }
        ],
        "comments": [
          {
            "author": "Sophie Klein",
            "role": "Projektmanagerin",
            "initials": "SK",
            "date": "2026-07-11",
            "text": "Mein Report-Tool war kaputt, ich hab keine Zeile Code verstanden — der Skill hat die Ursache in Minuten gefunden und erklärt.",
            "rating": 5
          }
        ],
        "featured": false
      },

      {
        "id": "dataviz",
        "votesRecent": 5,
        "platforms": { "code": true, "langdock": true },
        "name": "dataviz",
        "tagline": "Charts, die eine Aussage treffen — Diagrammwahl, Farbe & Barrierefreiheit",
        "description": "Anthropics Data-Visualization-Skill: eine erprobte Entscheidungshilfe, welcher Diagrammtyp zu welchen Daten passt — plus fertige Python-Muster (matplotlib/seaborn/plotly), Farbregeln und eine Barrierefreiheits-Checkliste.",
        "longDescription": "Die Lücke zwischen „Zahlen aufbereiten“ und „Zahlen zeigen“: Dieser offizielle Anthropic-Skill (aus dem knowledge-work-plugins-Repo) bringt Claude bei, Diagramme nach Design-Prinzipien zu bauen statt nach Bauchgefühl. Eine Auswahltabelle ordnet 13+ Diagrammtypen der jeweiligen Datenbeziehung zu (Trend, Vergleich, Verteilung, Anteil …), inklusive klarer „nimm-das-nicht“-Regeln (keine Tortendiagramme, kein 3D). Dazu kopierfertige Python-Muster für Linien-, Balken-, Histogramm-, Heatmap- und Small-Multiples-Charts, farbsichere Paletten und eine Checkliste für lesbare, barrierefreie Grafiken. In Claude Code erzeugt er echte Chart-Dateien; als reine SKILL.md ist er auch in Langdock als Gestaltungs-Leitfaden nutzbar. Ideal für Report-Charts, Dashboards und Slide-Grafiken, die überall gleich aussehen.",
        "exampleOutput": "Frage: „Umsatz je Kanal übers Jahr — welcher Chart?“\n\nEmpfehlung: gruppiertes Balkendiagramm, nicht Torte\n  → Balken bei 0 beginnen (sonst verzerrt)\n  → nach Wert sortieren, nicht alphabetisch\n  → Blau/Orange statt Rot/Grün (farbenblind-sicher)\n  → Titel sagt die Aussage: „Search trägt 48 % des Umsatzes“\n\n+ fertiger matplotlib-Codeblock zum Einsetzen",
        "category": "extern",
        "subcategory": "praesentieren",
        "trigger": null,
        "author": "Anthropic (knowledge-work-plugins)",
        "version": "1.0.0",
        "addedAt": "2026-07-23",
        "updatedAt": "2026-07-23",
        "tags": ["daten", "charts", "visualisierung", "auswerten", "community"],
        "useCases": ["Den richtigen Diagrammtyp für einen Datensatz wählen", "Report- und Slide-Charts konsistent gestalten", "Farbsichere, barrierefreie Grafiken bauen"],
        "difficulty": "medium",
        "timeToRun": "10–30 Min",
        "requirements": ["Claude Code (für die Diagramm-Erzeugung)"],
        "rating": { "average": 4.4, "count": 5 },
        "endorsedBy": ["Lukas Weber"],
        "endorsements": [
          {
            "name": "Lukas Weber",
            "role": "SEO Strategist",
            "initials": "LW",
            "text": "Endlich Charts, die eine Aussage transportieren, statt bloß Zahlen zu zeigen — die Diagramm-Auswahltabelle nehme ich sogar ohne Claude her."
          }
        ],
        "comments": [],
        "featured": false,
        "source": "https://github.com/anthropics/knowledge-work-plugins/tree/main/data/skills/data-visualization"
      },

      {
        "id": "superpowers",
        "votesRecent": 7,
        "itemType": "plugin",
        "platforms": { "code": true, "langdock": false },
        "name": "superpowers",
        "tagline": "Ein Plugin, das Claude beibringt, wie ein eingespieltes Team zu arbeiten",
        "description": "Das Community-Skill-Paket von Jesse Vincent (obra), auch im offiziellen Anthropic-Katalog gelistet: 14 Skills plus Hooks, die Claude automatisch erst verstehen, planen und prüfen lassen, statt drauflos zu bauen. Einzeln holen oder als Paket — brainstorming und systematic-debugging stehen hier auch allein. Inhalt auf Englisch.",
        "longDescription": "Einzeln holen oder als Paket: brainstorming und systematic-debugging findest du hier als eigene Einträge — es sind genau die Skills aus diesem Plugin, nur einzeln zum Herunterladen. Wer beide nutzt (oder mehr davon will), fährt mit dem Plugin besser: Es bringt alle 14 Skills auf einmal, inklusive Hooks, die sie automatisch aktivieren — Claude greift von selbst zum passenden Skill und startet bei einer neuen Tool-Idee z. B. ohne Aufforderung die Brainstorming-Phase mit Rückfragen. Ehrlich gesagt: Die Texte sind Englisch, ein Teil der Skills ist klar entwicklerlastig (Git-Worktrees, Code-Review, TDD), und Claude arbeitet damit gründlicher und dadurch langsamer — für schnelle Mini-Aufgaben kann sich das übertrieben anfühlen. Für alles, was gebaut wird und halten soll, lohnt es sich. Sehr aktives Community-Projekt, ändert sich laufend.",
        "exampleOutput": "Du: \"Bau mir ein Kampagnen-Reporting-Tool\"\n\nOhne superpowers: Claude schreibt sofort Code.\nMit superpowers:\n  1) Brainstorming — Claude fragt nach: Wer nutzt das?\n     Welche Daten? Was heißt \"fertig\"?\n  2) Design-Dokument — du gibst frei\n  3) Plan in kleinen Schritten\n  4) Umsetzung — geprüft, bevor \"fertig\" fällt",
        "category": "extern",
        "subcategory": "bauen",
        "trigger": null,
        "author": "Jesse Vincent (obra)",
        "version": "",
        "addedAt": "2026-07-16",
        "updatedAt": "2026-07-16",
        "tags": ["workflow", "qualität", "bauen", "community", "citizen-coding"],
        "useCases": ["Größeres Vorhaben diszipliniert angehen", "Alle Superpowers-Skills auf einmal installieren", "Claude ohne Zuruf gründlich arbeiten lassen"],
        "difficulty": "medium",
        "timeToRun": "wirkt bei jeder Aufgabe mit",
        "requirements": ["Claude Code"],
        "rating": { "average": 4.6, "count": 8 },
        "endorsedBy": ["Jan Richter", "Christopher Kipp"],
        "endorsements": [
          {
            "name": "Jan Richter",
            "role": "Tech Lead & Citizen-Coding-Mentor",
            "initials": "JR",
            "text": "Unsere meistempfohlenen Community-Skills stammen aus diesem Paket. Wer mehr als einen davon nutzt, fährt mit dem kompletten Plugin besser."
          },
          {
            "name": "Christopher Kipp",
            "role": "Innovation Lead",
            "initials": "CK",
            "text": "Der Unterschied ist spürbar: weniger „sieht gut aus, ist aber kaputt“, mehr nachvollziehbare Zwischenschritte."
          }
        ],
        "comments": [
          {
            "author": "Sophie Klein",
            "role": "Projektmanagerin",
            "initials": "SK",
            "date": "2026-07-16",
            "text": "Die Rückfragen am Anfang haben mich erst genervt — bis mir auffiel, dass der erste Wurf seitdem fast immer sitzt.",
            "rating": 4
          }
        ],
        "featured": false,
        "source": "https://github.com/obra/superpowers",
        "installCmd": "/plugin install superpowers@claude-plugins-official",
        "installAlt": {
          "label": "Alternative: über den Marketplace des Autors",
          "cmds": ["/plugin marketplace add obra/superpowers-marketplace", "/plugin install superpowers@superpowers-marketplace"]
        },
        "contains": "14 Skills — u. a. brainstorming, writing-plans, executing-plans, test-driven-development, systematic-debugging, verification-before-completion — plus Hooks, die die Skills automatisch aktivieren. Keine Slash-Befehle nötig.",
        "installDemo": [
          {"t":"user","text":"/plugin install superpowers@claude-plugins-official"},
          {"t":"sys","text":"Detailansicht öffnet sich: 14 Skills · Hooks · Context cost in Tokens","pause":900},
          {"t":"sys","text":"Scope wählen: User (überall) · Project (fürs Team im Repo) · Local (nur du, nur hier)","pause":950},
          {"t":"res","html":"Installiert im Scope „User“ <span class=\"r-ok\">✓</span>","pause":700},
          {"t":"user","text":"/reload-plugins"},
          {"t":"res","html":"Plugins neu geladen <span class=\"r-ok\">✓</span>","pause":650},
          {"t":"sys","text":"Ab jetzt greift Claude selbst zum passenden Skill — bei deiner nächsten Tool-Idee startet zuerst das Brainstorming.","pause":400}
        ]
      },

      {
        "id": "brainstorm-plan-execute",
        "votesRecent": 6,
        "itemType": "framework",
        "platforms": { "code": true, "langdock": false },
        "name": "Brainstorm → Plan → Execute",
        "tagline": "Drei Schritte von der unscharfen Idee zum abgenommenen Ergebnis",
        "description": "Arbeitsweise aus drei Superpowers-Skills: erst im Dialog klären, was du wirklich willst (Design-Dokument), dann einen kleinteiligen Bauplan schreiben, dann Punkt für Punkt abarbeiten lassen. Kein Code, bevor du das Design abgenommen hast.",
        "longDescription": "Für ein konkretes Vorhaben mittlerer Größe — ein Tool, eine Seite, ein Feature, fertig in einer Sitzung bis wenigen Tagen. Wenn deine Idee noch unscharf ist („irgendwas, das uns beim Statusreporting hilft“), stellt der Brainstorm-Schritt genau eine Frage nach der anderen, bis aus dem Bauchgefühl ein beschlossenes Design wird. Die Kette hat eine eingebaute Sperre: kein Code, bevor du das Design abgenommen hast — das steht wörtlich so im Skill („HARD-GATE“). Die drei Skills brainstorming, writing-plans und executing-plans stammen aus github.com/obra/superpowers und müssen installiert sein — am einfachsten als superpowers-Plugin, das alle drei mitbringt (brainstorming steht hier auch einzeln); die Skills sind Englisch, das Gespräch mit dir führt Claude trotzdem auf Deutsch. Für Mehrwochen-Projekte mit vielen Phasen ist diese Kette zu leicht — dann zerlegst du das Vorhaben besser in mehrere Vorhaben und fährst die Kette je Teil einmal.",
        "exampleOutput": "1) brainstorming — eine Frage pro Nachricht:\n   \"Sollen Deadlines von Hand gepflegt werden\n    oder aus einer Datei kommen?\"\n2) Design-Dokument → du gibst frei\n   (vorher wird nicht gebaut — das Gate steckt im Skill)\n3) writing-plans — Plan in Minuten-Häppchen,\n   jedes mit eigener Erfolgskontrolle\n4) executing-plans — arbeitet ab, stoppt bei\n   Unklarheit und fragt, statt zu raten",
        "category": "extern",
        "subcategory": "einstieg",
        "trigger": null,
        "author": "Jesse Vincent (obra)",
        "version": "",
        "addedAt": "2026-07-16",
        "updatedAt": "2026-07-16",
        "tags": ["workflow", "konzept", "citizen-coding", "community", "bauen"],
        "useCases": ["Unscharfe Idee zum beschlossenen Design schärfen", "Tool oder Seite in einer Sitzung sauber bauen", "Claude vom Losbauen ohne Plan abhalten"],
        "difficulty": "easy",
        "timeToRun": "eine Sitzung bis wenige Tage",
        "requirements": ["Claude Code", "Superpowers-Skills brainstorming, writing-plans, executing-plans (github.com/obra/superpowers)"],
        "rating": { "average": 4.6, "count": 6 },
        "endorsedBy": ["Christopher Kipp", "Mia Hoffmann"],
        "endorsements": [
          {
            "name": "Christopher Kipp",
            "role": "Innovation Lead",
            "initials": "CK",
            "text": "Die natürliche Fortsetzung von brainstorming: dieselbe Sorgfalt, aber bis zum fertigen, geprüften Ergebnis durchgezogen."
          },
          {
            "name": "Mia Hoffmann",
            "role": "Senior UX Designerin",
            "initials": "MH",
            "text": "Das Design-Gate hat mir mehr Umbau-Runden erspart als jedes andere Werkzeug. Erst nicken, dann bauen."
          }
        ],
        "comments": [
          {
            "author": "Sophie Klein",
            "role": "Projektmanagerin",
            "initials": "SK",
            "date": "2026-07-16",
            "text": "Eine Frage pro Nachricht fühlt sich anfangs zäh an — aber bei Frage drei habe ich gemerkt, dass ich eigentlich etwas anderes brauche als gedacht.",
            "rating": 5
          }
        ],
        "featured": false,
        "source": "https://github.com/obra/superpowers",
        "workflow": {
          "intro": "Drei sauber getrennte Arbeitsschritte, jeder mit eigenem Skill. Voraussetzung: die Superpowers-Skills sind installiert — am einfachsten als superpowers-Plugin, das alle drei mitbringt.",
          "note": "Die reinen Arbeitsschritte (Fragen zuerst, Design-Abnahme, kleinteiliger Plan) funktionieren zur Not auch als ausformulierte Prompts ohne Skill — dann fehlt aber das eingebaute Gate.",
          "steps": [
            { "title": "Brainstorm starten", "desc": "Beschreibe die Idee grob und ruf den Skill auf. Claude schaut sich erst dein Projekt an und stellt dann Fragen — eine pro Nachricht.", "copy": "Nutze den Skill brainstorming. Meine Idee: ein internes Tool, mit dem unser Team den Status aller laufenden Kampagnen auf einen Blick sieht." },
            { "title": "Varianten abwägen und entscheiden", "desc": "Claude schlägt dir 2–3 Ansätze mit Vor- und Nachteilen vor und empfiehlt einen. Du entscheidest.", "copy": "Nimm Variante 2, aber ohne Login — das Tool läuft nur intern. Fasse das Design jetzt abschnittsweise zusammen, ich nicke jeden Abschnitt einzeln ab." },
            { "title": "Design abnehmen", "desc": "Am Ende schreibt Claude ein kurzes Design-Dokument (landet unter docs/superpowers/specs/). Erst wenn du es freigibst, geht es weiter — vorher wird nicht gebaut.", "copy": "Das Design passt so. Übernimm es ins Design-Dokument und geh zum Plan über." },
            { "title": "Plan schreiben lassen", "desc": "Der Skill writing-plans zerlegt das Design in Häppchen von wenigen Minuten, jedes mit eigener Erfolgskontrolle (landet unter docs/superpowers/plans/).", "copy": "Nutze den Skill writing-plans und erstelle aus dem Design-Dokument den Umsetzungsplan." },
            { "title": "Plan ausführen lassen", "desc": "Der Skill executing-plans arbeitet die Aufgaben der Reihe nach ab, prüft jede und stoppt bei Unklarheiten, statt zu raten.", "copy": "Nutze den Skill executing-plans und arbeite den Plan ab. Melde dich, wenn etwas unklar ist, statt zu raten." },
            { "title": "Abnehmen", "desc": "Am Ende bekommst du das Ergebnis präsentiert und entscheidest, was damit passiert.", "copy": "Zeig mir das Ergebnis im Browser und fasse zusammen, was vom Plan umgesetzt ist und was offen blieb." }
          ],
          "example": {
            "title": "Mini-Beispiel: Pitch-Countdown-Seite",
            "steps": [
              "Leas Unit hat in drei Wochen einen wichtigen Pitch. Sie will eine interne Seite: Countdown, wer liefert was bis wann, Links zu den Dokumenten.",
              "Brainstorm: Claude fragt u. a. „Wer aktualisiert die Seite?“ — Lea merkt dabei, dass sie kein Pflege-Tool braucht, sondern eine einzige Datei, die alle editieren können. Der Zuschnitt ändert sich vor der ersten Zeile Code, also gratis.",
              "Design-Abnahme: statische Seite, Daten in einer einfachen Textdatei, Countdown im Browser. Lea gibt frei.",
              "writing-plans erstellt kleine Aufgaben (Datenformat → Seite → Countdown → Deadline-Ampel), jede mit Prüfschritt.",
              "executing-plans arbeitet ab; bei der Deadline-Ampel ist die Regel unklar (ab wann „gelb“?) — Claude stoppt und fragt, statt sich etwas auszudenken."
            ]
          },
          "pitfalls": [
            "Das Gate umgehen: Wer beim Brainstormen „bau einfach schon mal los“ sagt, hebelt den Kern der Arbeitsweise aus. Die Reihenfolge ist der Wert.",
            "„Zu simpel für ein Design“: nennt der Skill selbst ein Anti-Pattern — gerade bei „einfachen“ Ideen stecken die falschen Annahmen. Ein Design darf auch drei Sätze lang sein.",
            "Fragen-Marathon aushalten: Eine Frage pro Nachricht fühlt sich zäh an — jede Frage erspart eine Umbau-Runde.",
            "Zu großes Vorhaben: Sind es in Wahrheit vier Teilprojekte, hilft der Brainstorm beim Zerlegen — dann braucht jedes seine eigene Kette."
          ]
        }
      }

    ];
    // Kuratiertes Spotlight: 6 Reise-Skills erzählen EINE Geschichte (Einstieg → Tool → Website → Alltag → Denken).
    // Ersetzt das gestreute featured-Flag (vorher 10/39) als Single Source of Truth fürs Hervorheben.
    const SPOTLIGHT = new Set(['erste-schritte', 'prototyp-bauen', 'webseite-bauen', 'daten-aufbereiten', 'briefing-gen', 'brainstorming']);
    /* HIDDEN war der Halbschritt „aus der Fläche nehmen, aber per Deep-Link behalten".
       Mit der Kuration (E16) ist er leer: Was nicht mehr trägt, wird gelöscht statt
       versteckt — ein Eintrag, den niemand findet, aber jeder Zähler mitschleppt, ist
       Ballast. Die Menge bleibt als Konstante bestehen, weil applyFilters(), groupSize(),
       pilotSkills() und die Suche in base.js sie lesen; ein Umbau dieser fünf Stellen
       hätte keinen Nutzen. Wieder befüllen nur, wenn ein Eintrag WIRKLICH nur temporär
       aus dem Browsing soll — sonst löschen. */
    const HIDDEN = new Set([]);
    // Zahlen-Ehrlichkeit: sichtbare Skill-Zahl (itemType 'skill', ohne HIDDEN).
    // Einzige Quelle für alle „X Skills"-Zähler — Seiten lesen diesen Wert statt selbst
    // (und womöglich inklusive HIDDEN) zu zählen. Kein „const COUNTS" hier, damit die
    // seitenlokale COUNTS-Konstante in index.html nicht kollidiert.
    const VISIBLE_SKILL_COUNT = SKILLS.filter(s => (s.itemType || 'skill') === 'skill' && !HIDDEN.has(s.id)).length;
    // Aufgaben-Taxonomie: Themen-Tabs denken in „was will ich tun", nicht in Abteilung/Herkunft.
    // Wird nach dem Laden EINMAL auf skill.subcategory geschrieben (Single Source für Tabs/Labels/Filter).
    const TASK_GROUP = {
      'erste-schritte': 'loslegen', 'erste-automation': 'loslegen', 'brainstorming': 'loslegen',
      'grill-me': 'loslegen',
      'prototyp-bauen': 'bauen', 'webseite-bauen': 'bauen', 'tool-teilen': 'bauen', 'frontend-design': 'bauen',
      'webaudit': 'bauen', 'systematic-debugging': 'bauen', 'skill-creator': 'bauen',
      'briefing-gen': 'texten', 'tonalitaets-check': 'texten', 'meeting-notes': 'texten', 'internal-comms': 'texten', 'doc-coauthoring': 'texten',
      'moodboard': 'gestalten', 'brand-guidelines': 'gestalten',
      'pptx': 'praesentieren', 'xlsx': 'praesentieren', 'docx': 'praesentieren', 'pdf': 'praesentieren',
      'slides-aus-daten': 'praesentieren', 'daten-aufbereiten': 'praesentieren', 'report-summary': 'praesentieren',
      'dataviz': 'praesentieren',
      'campaign-check': 'media', 'mediaplan-audit': 'media', 'tracking-audit': 'media', 'keyword-research': 'media',
      'markt-research': 'media', 'persona-builder': 'media', 'content-recycling': 'media', 'social-kalender': 'media',
      // E2: Plugins & Frameworks — auch sie ordnen sich in die Aufgaben-Tabs ein
      'superpowers': 'bauen',
      'brainstorm-plan-execute': 'loslegen'
    };
    const TASK_LABELS = { loslegen: 'Loslegen', bauen: 'Bauen', texten: 'Texten & Reden', gestalten: 'Gestalten', praesentieren: 'Präsentieren & Daten', media: 'Media & Strategie' };
    // Merge-Gruppen: mehrere verwandte Skills werden im Katalog als EINE Karte mit Facetten gezeigt.
    // Bei aktiver Suche werden die Einzel-Skills weiterhin normal gelistet (Auffindbarkeit bleibt).
    const GROUPS = [
      { id: 'office', group: 'praesentieren', anchor: 'pptx', members: ['pptx', 'xlsx', 'docx', 'pdf'],
        name: 'Office-Dokumente aus Claude', tagline: 'Word, Excel, PowerPoint & PDF — erstellen, auslesen, bearbeiten',
        facets: [
          { id: 'docx', label: 'Word', how: 'Dokumente & Kommentare' },
          { id: 'xlsx', label: 'Excel', how: 'Tabellen auswerten & bauen' },
          { id: 'pptx', label: 'PowerPoint', how: 'Decks erstellen' },
          { id: 'pdf', label: 'PDF', how: 'auslesen & Formulare' },
        ] },
      { id: 'media-qa', group: 'media', anchor: 'campaign-check', members: ['campaign-check', 'mediaplan-audit', 'tracking-audit'],
        name: 'Media-QA: prüfen, bevor Budget läuft', tagline: 'Kampagnen, Mediapläne & Tracking absichern — vor dem Go',
        facets: [
          { id: 'campaign-check', label: 'Kampagnen-Setup', how: 'Checks vor Launch' },
          { id: 'mediaplan-audit', label: 'Mediaplan (Excel)', how: 'Budget & Flighting' },
          { id: 'tracking-audit', label: 'Tracking', how: 'UTM · GA4 · Pixel' },
        ] },
    ];
    // Fertige deutsche Sätze zum Einfügen in Claude Code — die Zielgruppe denkt in Prompts, nicht in /befehlen.
    const START_PROMPTS = {
      'erste-schritte': 'Ich komme von pilot AI und bin neu in Claude Code. Zeig mir Schritt für Schritt, wie ich starte und meinen ersten Skill nutze.',
      'pptx': 'Bau mir aus diesen Stichpunkten eine PowerPoint-Präsentation: [hier deine Inhalte einfügen]',
      'pdf': 'Lies die PDF in meinem Projektordner und fass die wichtigsten Punkte für mich zusammen.',
      'webseite-bauen': 'Bau mir eine kleine Website für [Thema] — mit [was drauf soll]. Ich kann nicht programmieren, führ mich Schritt für Schritt.',
      'slides-aus-daten': 'Mach aus der Tabelle in meinem Projektordner präsentationsreife Slides mit passenden Charts.',
      'tonalitaets-check': 'Prüf diesen Text gegen unsere Marken-Tonalität und schlag Verbesserungen vor: [Text einfügen]',
      'webaudit': 'Mach einen Audit von [URL]: UX, Performance, SEO und Barrierefreiheit — mit konkreten Empfehlungen.',
      'markt-research': 'Recherchier strukturiert den Markt für [Thema] — mit Quellenangaben zu jeder Aussage.',
      'meeting-notes': 'Mach aus dieser Mitschrift ein sauberes Protokoll mit Entscheidungen und To-dos: [Notizen einfügen]',
      'report-summary': 'Fass diesen Report auf eine halbe Seite zusammen — Kernaussagen und Handlungsempfehlung: [Report einfügen]',
      'docx': 'Erstell mir ein Word-Dokument für [Zweck] mit folgendem Inhalt: [Inhalt einfügen]',
      'xlsx': 'Bau mir eine Excel-Tabelle, die [Zweck] — die Rohdaten hänge ich an.',
      // E12: Startprompts für die Bau-Kern-Skills, die bisher keinen hatten
      'prototyp-bauen': 'Ich brauche ein kleines internes Tool: [was es tun soll, z. B. „aus Reichweite und TKP den Kontaktpreis rechnen“]. Eingaben: [Felder]. Ergebnis: [was rauskommen soll]. Bau mir das als eine HTML-Datei, die ich per Doppelklick öffnen kann — ich kann nicht programmieren, frag nach, wenn was unklar ist.',
      'daten-aufbereiten': 'Bereite die Datei [export.csv] in meinem Projektordner auf: Dubletten raus, Datums- und Zahlenformate vereinheitlichen, Lücken markieren statt raten. Leg das Original unverändert liegen und schreib jede Änderung in ein kurzes Änderungs-Log.',
      'campaign-check': 'Prüf mein Kampagnen-Setup in [kampagne.csv] vor dem Launch: UTM-Parameter, Landingpages und Budget-Caps. Gib mir eine Ampel je Anzeige und eine Liste konkreter Fixes mit Zeilennummer — sag klar, ob wir starten können oder nicht.',
      'briefing-gen': 'Mach aus meinen Stichpunkten ein sauberes Kunden-Briefing: [Notizen einfügen]. Frag gezielt nach, wo etwas fehlt (Ziel, Zielgruppe, Budget, Timing), und erfinde nichts dazu.',
      'brainstorming': 'Ich habe eine Idee für ein internes Tool: [deine Idee]. Stell mir erst die richtigen Fragen — Ziel, Nutzer:innen, Grenzen — und fass das Ergebnis als kurzes Konzept zusammen, bevor irgendwas gebaut wird.',
      // E12: neuer Community-Skill
      'dataviz': 'Ich habe diese Daten: [Tabelle/CSV]. Welcher Diagrammtyp transportiert die Aussage [was ich zeigen will] am besten? Bau mir den Chart konsistent und farbsicher — Titel als Aussage, Achsen beschriftet, barrierefrei.',
      // E16: grill-me — der Prompt IST der Skill, deshalb nennt er die Spielregel gleich mit
      'grill-me': 'Ich habe folgenden Plan: [dein Vorhaben in zwei, drei Sätzen]. Nimm ihn mit /grill-me auseinander: Frag mich hartnäckig durch, eine Frage pro Nachricht, mit deiner Empfehlung dabei — und fang nicht an zu bauen, bevor ich sage, dass wir durch sind.',
      // E2: Nutzungs-Prompts für Plugins (nach der Installation)
      'superpowers': 'Ich habe eine Idee für ein internes Tool: [deine Idee]. Lass uns sie erst gemeinsam durchdenken, bevor du baust.',
      'frontend-design': 'Bau mir eine Landingpage für [Thema] — mit eigenständiger, hochwertiger Gestaltung statt Template-Look.',
      'skill-creator': 'Erstell mir einen Skill, der [was er können soll]. Führ mich durch die nötigen Entscheidungen.'
    };
    const STARTER_JOURNEY = ['erste-schritte', 'prototyp-bauen', 'webseite-bauen'];
    // Kuratierte Bundles: Starter (Einsteiger) + Power (beliebte Anthropic-/Community-Skills)
    const BUNDLES = {
      starter: {
        ids: ['erste-schritte', 'erste-automation', 'prototyp-bauen', 'webseite-bauen', 'tool-teilen'],
        zip: 'pilot-starter-paket.zip',
        title: 'pilot Starter-Paket — Citizen Coding',
        intro: 'Einsteiger-Skills aus dem pilot Skill Marketplace, als echte Dateien.',
        beispiel: '/erste-schritte',
        toast: 'Starter-Paket'
      },
      power: {
        // Nur echte Skills (itemType 'skill') — Plugins wie skill-creator installiert
        // man per /plugin, nicht als entpackter Skill-Ordner.
        // E16: verification-before-completion ist aus der Kuration geflogen; an seine
        // Stelle rückt dataviz — ebenfalls ein echter Skill-Ordner im Repo, ebenfalls
        // extern gespiegelt, und im Agentur-Alltag breiter nutzbar als eine reine
        // Entwickler-Regel.
        ids: ['brainstorming', 'systematic-debugging', 'dataviz', 'doc-coauthoring', 'webaudit'],
        zip: 'pilot-power-paket.zip',
        title: 'pilot Power-Paket — beliebte Skills aus der Community',
        intro: 'beliebte Skills aus der Community (u. a. obra/superpowers), von Anthropic und von pilot — gespiegelt im pilot Skill Marketplace.',
        beispiel: 'Lass uns brainstormen: ein Tool für …',
        toast: 'Power-Paket'
      }
    };
    /* Wo lässt sich ein Skill ehrlich einsetzen? code = natives Zuhause (immer);
       langdock = SKILL.md direkt als Skill hochladbar (reine Instruktions-Skills).
       Die ID bleibt 'langdock' — sie steckt in localStorage-Keys, in gespeicherten
       Filter-Links und in skillPlatforms(); ein Umbenennen bräche beides ohne Not.
       Sichtbar heißt die Plattform bei uns „pilot AI"; Langdock ist das Produkt
       dahinter und wird nur dort genannt, wo es tatsächlich erklärt wird. */
    const PLATFORMS = [
      { id: 'code',     label: 'Claude Code',   short: 'Code' },
      { id: 'langdock', label: 'pilot AI',      short: 'pilot AI' }
    ];
    // Redaktionelle Zuordnung: welche Skills sind für welche Rolle bei pilot relevant?
    const ROLES = [
      { id: 'media',     label: 'Media & Beratung' },
      { id: 'kreation',  label: 'Kreation & Content' },
      { id: 'strategie', label: 'Strategie & Insights' },
      { id: 'data',      label: 'Daten & Analytics' },
      { id: 'pm',        label: 'Projektmanagement' }
    ];
    const ALL_ROLES = ROLES.map(r => r.id);
    const ROLE_MAP = {
      'erste-schritte':      ALL_ROLES,
      'prototyp-bauen':      ALL_ROLES,
      'webseite-bauen':      ['kreation', 'media', 'pm'],
      'erste-automation':    ALL_ROLES,
      'tool-teilen':         ALL_ROLES,
      'webaudit':            ['kreation', 'media', 'data'],
      'briefing-gen':        ['pm', 'kreation', 'media'],
      'campaign-check':      ['media', 'data'],
      'mediaplan-audit':     ['media', 'data'],
      'tracking-audit':      ['media', 'data'],
      'keyword-research':    ['media', 'kreation', 'strategie'],
      'content-recycling':   ['kreation'],
      'tonalitaets-check':   ['kreation'],
      'social-kalender':     ['kreation', 'pm'],
      'meeting-notes':       ALL_ROLES,
      'markt-research':      ['strategie', 'media'],
      'persona-builder':     ['strategie', 'kreation'],
      'daten-aufbereiten':   ['data', 'media'],
      'report-summary':      ['data', 'media', 'pm'],
      'moodboard':           ['kreation'],
      'slides-aus-daten':    ['data', 'media', 'strategie'],
      'pptx':                ALL_ROLES,
      'xlsx':                ['data', 'media', 'pm'],
      'docx':                ['pm', 'kreation', 'strategie'],
      'pdf':                 ['data', 'media', 'pm'],
      'brand-guidelines':    ['kreation'],
      'skill-creator':       ALL_ROLES,
      'internal-comms':      ['pm', 'kreation'],
      'frontend-design':     ['kreation', 'media', 'pm'],
      'doc-coauthoring':     ['pm', 'strategie', 'kreation', 'media'],
      'brainstorming':       ALL_ROLES,
      'grill-me':            ALL_ROLES,
      'systematic-debugging': ALL_ROLES,
      'dataviz':             ['data', 'media', 'strategie', 'pm'],
      'superpowers':         ALL_ROLES,
      'brainstorm-plan-execute': ALL_ROLES
    };
    // ===== DEMO-MATRIX: jeder Fall verweist auf ein ECHTES, abrufbares Ergebnis =====
    // Alle Zahlen unten stammen aus den tatsächlichen Läufen der Generator-Skripte in demo/.
    const DEMOS = [
      { id:'prototyp-bauen', name:'Prototyp bauen', trigger:'/prototyp', cases:[
        { label:'TKP-Rechner bauen', script:[
          {t:'user',text:'/prototyp Tool: aus Reichweite & TKP den Kontaktpreis rechnen'},
          {t:'claude',text:'Ich baue dir einen kleinen Rechner — eine Datei, läuft direkt im Browser.',pause:750},
          {t:'tool',html:'<b>Write</b>(tkp-rechner.html)',pause:450},
          {t:'res',html:'86 Zeilen — Eingaben, Live-Berechnung, pilot-Design',pause:650},
          {t:'tool',html:'<b>Bash</b>(open tkp-rechner.html)',pause:450},
          {t:'res',html:'Test: 500.000 × 12,00 € · 30 % Streuverlust → <span class="r-num">6.000,00 €</span> · Netto-TKP <span class="r-num">17,14 €</span> <span class="r-ok">✓</span>',pause:750},
          {t:'claude',text:'Fertig. Der Rechner läuft, die Beispielrechnung stimmt — probier ihn unten aus.',pause:400},
        ], artifacts:[
          {label:'Gebautes Tool öffnen', href:'./tkp-rechner.html', kind:'open'},
        ], note:'Kein Screenshot — das echte Tool, live rechenbar.' },
        { label:'Umfrage-Auswerter', script:[
          {t:'user',text:'/prototyp Tool, das eine Umfrage-CSV auswertet und Balken zeigt'},
          {t:'claude',text:'Ein Auswerter mit CSV-Eingabe und Antwort-Balken je Frage.',pause:750},
          {t:'tool',html:'<b>Write</b>(umfrage-auswertung.html)',pause:450},
          {t:'res',html:'108 Zeilen — CSV-Parser, Gruppierung, Balkendiagramm',pause:650},
          {t:'tool',html:'<b>Bash</b>(Test mit 8 Beispiel-Antworten)',pause:450},
          {t:'res',html:'„Sehr zufrieden“ <span class="r-num">38 %</span> · „Zufrieden“ <span class="r-num">38 %</span> · Prozente korrekt <span class="r-ok">✓</span>',pause:750},
          {t:'claude',text:'Fertig — füg deine eigene CSV ein, die Balken bauen sich live.',pause:400},
        ], artifacts:[
          {label:'Gebautes Tool öffnen', href:'./umfrage-auswertung.html', kind:'open'},
        ], note:'Lädt deine eigene CSV — Beispieldaten per Klick.' },
      ]},
      { id:'webaudit', name:'webaudit', trigger:'/webaudit', cases:[
        { label:'Gebautes Tool prüfen', script:[
          {t:'user',text:'/webaudit tkp-rechner.html'},
          {t:'claude',text:'Ich prüfe in zwei Stufen: Code-Scan, dann echter Browser-Lauf.',pause:750},
          {t:'tool',html:'<b>Read</b>(tkp-rechner.html)',pause:450},
          {t:'res',html:'86 Zeilen — Meta-Tags, Labels, Struktur gescannt',pause:650},
          {t:'tool',html:'<b>Bash</b>(playwright: Screenshots + Funktionstest)',pause:450},
          {t:'res',html:'Desktop 1280 · Mobil 390 · 500.000 × 12 € → <span class="r-num">6.000,00 €</span> <span class="r-ok">✓</span> · Kontrast 16/16 WCAG AA <span class="r-ok">✓</span>',pause:750},
          {t:'tool',html:'<b>Write</b>(report.html)',pause:450},
          {t:'res',html:'Score <span class="r-num">95/100</span> · 0 kritisch · 1 Empfehlung · 13 bestanden',pause:650},
          {t:'claude',text:'Kein kritischer Fund, eine Empfehlung: Open-Graph-Tags fehlen. Frühere Läufe fanden mehr — die Funde wurden behoben, der Score stieg.',pause:400},
        ], artifacts:[
          {label:'Echten Report öffnen', href:'./demo/webaudit/report.html', kind:'open'},
        ], note:'Aus echtem Browser-Lauf. Frühere Läufe fanden einen WCAG-Fehler und ein CDN-Stylesheet — beides im Tool behoben.' },
      ]},
      /* E16: Der Fall hieß „Pitch-Deck bauen" und las sich wie der (inzwischen
         gestrichene) pitch-deck-Skill. Verankert war er schon immer bei pptx —
         Skript, Werkzeuge und Artefakt stammen aus dessen Lauf. Nur die
         Beschriftung zog den falschen Skill herbei; der Dateiname
         demo/pptx/pitch-deck.pptx bleibt, weil die Datei so heißt. */
      { id:'pptx', name:'pptx', trigger:null, cases:[
        { label:'Deck aus Konzept bauen', script:[
          {t:'user',text:'Bau ein Deck aus diesem Konzept (konzept.md)'},
          {t:'claude',text:'Ich nutze den pptx-Skill und baue 7 Folien entlang deines Konzepts.',pause:750},
          {t:'tool',html:'<b>Read</b>(konzept.md)',pause:450},
          {t:'res',html:'52 Zeilen — Hook, Problem, Lösung, Proof, CTA',pause:650},
          {t:'tool',html:'<b>Write</b>(pitch-deck.pptx)',pause:450},
          {t:'res',html:'7 Folien · 16:9 · Sprechernotizen je Folie · <span class="r-num">99 KB</span> OOXML',pause:750},
          {t:'claude',text:'Fertig — eine echte PowerPoint-Datei, direkt präsentierbar.',pause:400},
        ], artifacts:[
          {label:'Folien ansehen', href:'./demo/pptx/preview.html', kind:'open'},
          {label:'Deck herunterladen (.pptx)', href:'./demo/pptx/pitch-deck.pptx', kind:'file'},
        ], note:'Die Folien-Ansicht wird direkt aus der .pptx extrahiert — keine Attrappe.' },
      ]},
      { id:'daten-aufbereiten', name:'Daten aufbereiten', trigger:'/daten-aufbereiten', cases:[
        { label:'Export bereinigen', script:[
          {t:'user',text:'/daten-aufbereiten export_roh.csv'},
          {t:'claude',text:'Ich prüfe auf Dubletten, Formate und Lücken — dein Original bleibt unangetastet.',pause:750},
          {t:'tool',html:'<b>Read</b>(export_roh.csv)',pause:450},
          {t:'res',html:'9 Datenzeilen — 2 Duplikate, 2 Datumsformate, 2 Lücken erkannt',pause:650},
          {t:'tool',html:'<b>Write</b>(daten_clean.csv)',pause:450},
          {t:'res',html:'7 Zeilen · Formate vereinheitlicht · Summe <span class="r-num">8.495,70 €</span>',pause:650},
          {t:'tool',html:'<b>Write</b>(aenderungen.md)',pause:450},
          {t:'res',html:'Änderungs-Log · Lücken markiert: <span class="r-err">Z.6 Klicks</span> · <span class="r-err">Z.9 Datum</span>',pause:750},
          {t:'claude',text:'Fertig — jede Änderung steht im Log. Gefehlt hat, was fehlt: nichts wurde geraten.',pause:400},
        ], artifacts:[
          {label:'Änderungs-Log lesen', href:'./demo/viewer.html?f=daten/aenderungen.md', kind:'open'},
          {label:'Nachher: saubere Daten', href:'./demo/viewer.html?f=daten/daten_clean.csv', kind:'open'},
          {label:'Vorher: Roh-Export', href:'./demo/viewer.html?f=daten/export_roh.csv', kind:'open'},
        ], note:'Jede Zahl vom Skript gezählt, nicht geschätzt.' },
      ]},
      { id:'content-recycling', name:'Content Recycling', trigger:'/content-recycling', cases:[
        { label:'Case → 4 Kanäle', script:[
          {t:'user',text:'/content-recycling case-study.md'},
          {t:'claude',text:'Ich extrahiere die Kernbotschaft und schreibe vier Kanal-Varianten.',pause:750},
          {t:'tool',html:'<b>Read</b>(case-study.md)',pause:450},
          {t:'res',html:'Kernbotschaft: „Konsequenz schlägt Rabatt“ · Belege: CTR <span class="r-num">+34 %</span>, Recall <span class="r-num">11→19 %</span>',pause:650},
          {t:'tool',html:'<b>Write</b>(varianten.md)',pause:450},
          {t:'res',html:'LinkedIn ~1.100 Z. · Instagram · Newsletter-Teaser · Video-Skript (5 Szenen)',pause:750},
          {t:'claude',text:'Vier Formate, eine Botschaft — alle Zahlen stammen aus dem Case, nichts ist erfunden.',pause:400},
        ], artifacts:[
          {label:'Ergebnis lesen', href:'./demo/viewer.html?f=content-recycling/varianten.md', kind:'open'},
          {label:'Quell-Case ansehen', href:'./demo/viewer.html?f=content-recycling/case-study.md', kind:'open'},
        ], note:'Zahlen stammen aus dem Quell-Case — nicht erfunden.' },
      ]},
      { id:'campaign-check', name:'Campaign Checker', trigger:'/campaign-check', cases:[
        { label:'Setup vor Launch', script:[
          {t:'user',text:'/campaign-check kampagne.csv'},
          {t:'claude',text:'Ich validiere UTM-Parameter, Landingpages und Budget-Caps.',pause:750},
          {t:'tool',html:'<b>Read</b>(kampagne.csv)',pause:450},
          {t:'res',html:'6 Anzeigen in 4 Kampagnen',pause:650},
          {t:'tool',html:'<b>Bash</b>(Validator-Lauf)',pause:450},
          {t:'res',html:'<span class="r-err">✗ 3 Fehler</span> · ⚠ 3 Warnungen · <span class="r-ok">✓ 2 startklar</span>\n   Z.5 utm_medium fehlt · Z.5 Landingpage per <span class="r-err">http://</span> · Z.7 utm_campaign fehlt',pause:750},
          {t:'claude',text:'Launch-Empfehlung: Stopp — 3 Blocker, jeder mit Zeilennummer. Der Report enthält die Status-Matrix je Anzeige und die 3 konkreten Fixes.',pause:400},
        ], artifacts:[
          {label:'Echten Report lesen', href:'./demo/viewer.html?f=campaign-check/report.md', kind:'open'},
          {label:'Geprüfte Kampagne ansehen', href:'./demo/viewer.html?f=campaign-check/kampagne.csv', kind:'open'},
        ], note:'Findings aus einem echten Validator-Lauf.' },
      ]},
    ];
