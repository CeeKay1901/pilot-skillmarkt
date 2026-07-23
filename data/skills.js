// pilot AI Marketplace — Katalogdaten (ausgelagert aus index.html, Etappe E1).
// Klassisches Script, definiert globale Konstanten: SKILLS, SPOTLIGHT, HIDDEN,
// TASK_GROUP, TASK_LABELS, GROUPS, START_PROMPTS, STARTER_JOURNEY, BUNDLES,
// PLATFORMS, ROLES, ALL_ROLES, ROLE_MAP, DEMOS.
// Ableitungen/Seiteneffekte (TASK_GROUP-Mutation, MEMBER_OF) bleiben bei der Seiten-Logik.

    const SKILLS = [
      {
        "id": "erste-schritte",
        "platforms": { "code": true, "langdock": false },
        "name": "Erste Schritte",
        "tagline": "Von Langdock zu Claude Code — dein geführter Einstieg",
        "description": "Erklärt Schritt für Schritt, wie Claude Code funktioniert: Projektordner, der erste Auftrag, wie Claude direkt in deinen Dateien arbeitet. Speziell für Umsteiger:innen von Chat-Tools.",
        "longDescription": "Du kennst KI bisher als Chat — du fragst, sie antwortet. Claude Code geht weiter: Es arbeitet direkt in deinen Dateien und Ordnern, baut Dinge und erledigt Aufgaben. Dieser Skill nimmt dich an die Hand: Was ist ein „Projekt“? Wie gebe ich einen Auftrag? Wie prüfe ich das Ergebnis? Alles in einfacher Sprache, ohne Programmier-Vorwissen — der ideale erste Schritt nach der KI-Schulung.",
        "exampleOutput": "Willkommen bei Claude Code — dein Einstieg\n\n1) Du arbeitest immer in einem Ordner = deinem \"Projekt\"\n2) Sag mir einfach auf Deutsch, was du brauchst\n3) Ich erledige es direkt in den Dateien — du prüfst & gibst frei\n\nProbier es gleich aus:\n\"Erstelle eine Tabelle mit allen Kampagnen aus dieser PDF\"",
        "category": "pilot-inhouse",
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
        "featured": true,
        "badge": "neu"
      },
      {
        "id": "prototyp-bauen",
        "platforms": { "code": true, "langdock": false },
        "name": "Prototyp bauen",
        "tagline": "Deine Idee in ein kleines funktionierendes Tool verwandeln",
        "description": "Beschreibe in normaler Sprache, welches interne Tool oder welchen Helfer du brauchst — Claude Code baut dir einen lauffähigen Prototyp. Rechner, Formulare, Dashboards, Mini-Apps.",
        "longDescription": "Das Herzstück von Citizen Coding: Du hast eine Idee für ein kleines Tool, das dir oder deinem Team Arbeit abnimmt — aber kannst nicht programmieren? Genau dafür ist dieser Skill da. Du beschreibst dein Tool, Claude baut es, du testest es sofort im Browser und sagst, was anders sein soll. So entstehen aus Ideen in Minuten echte, nutzbare Werkzeuge — vom Budget-Rechner bis zum kleinen internen Dashboard.",
        "exampleOutput": "Auftrag: \"Ein Tool, das mir aus Reichweite und\nTKP den Netto-Kontaktpreis rechnet\"\n\n✓ Eingabefelder erstellt (Reichweite, TKP, Streuverlust)\n✓ Berechnungslogik implementiert\n✓ Ergebnis-Anzeige mit Live-Update\n✓ pilot-Design angewendet\n\n→ tkp-rechner.html erstellt · im Browser geöffnet\n   Sag mir, was du noch anpassen möchtest.",
        "category": "pilot-inhouse",
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
        "featured": true,
        "badge": "empfohlen"
      },
      {
        "id": "webseite-bauen",
        "platforms": { "code": true, "langdock": false },
        "name": "Webseite bauen",
        "tagline": "Landingpage oder Mini-Website — ganz ohne Programmieren",
        "description": "Von der Kampagnen-Landingpage bis zur kleinen Projekt-Website: Beschreibe Inhalt und Look, Claude Code baut eine responsive Seite im pilot-Design, die du direkt im Browser siehst.",
        "longDescription": "Schnell eine Landingpage für eine Kampagne, eine interne Info-Seite oder ein kleines Portfolio? Statt Wochen im Tool-Backlog baust du sie selbst. Du lieferst Texte, Bilder-Ideen und Wunsch-Look — Claude erstellt eine fertige, responsive Website (Desktop + Mobile), die du live anpassen kannst. Ideal für schnelle Kampagnen-Assets und Prototypen, die man Kund:innen zeigen kann.",
        "exampleOutput": "Auftrag: \"Landingpage für unsere Herbst-Kampagne,\npilot-Look, mit Anmeldeformular\"\n\n✓ Hero mit Kampagnen-Claim + CTA\n✓ 3 Feature-Sektionen\n✓ Anmeldeformular (Name, E-Mail, DSGVO-Hinweis)\n✓ Mobil-optimiert · pilot-Farben & Typo\n\n→ herbst-kampagne.html · Vorschau im Browser geöffnet",
        "category": "pilot-inhouse",
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
        "featured": true,
        "badge": null
      },
      {
        "id": "erste-automation",
        "platforms": { "code": true, "langdock": false },
        "name": "Erste Automation",
        "tagline": "Aus einer nervigen Routine deine erste kleine Automation",
        "description": "Nenne eine wiederkehrende manuelle Aufgabe — Claude Code baut daraus einen wiederverwendbaren Ablauf, den du immer wieder starten kannst.",
        "longDescription": "Jede:r hat diese eine Aufgabe, die man jede Woche stumpf von Hand macht: Dateien umbenennen, Daten aus Mails ziehen, immer denselben Report-Aufbau. Dieser Skill hilft dir, genau diese Routine einmal zu beschreiben und in einen wiederholbaren Ablauf zu verwandeln — dein erster echter Automations-Erfolg im Citizen Coding.",
        "exampleOutput": "Routine: \"Jeden Montag Screenshots aus dem\nReporting-Ordner in einen Wochenordner sortieren\"\n\n✓ Ablauf gebaut: erkennt Datum → legt KWxx-Ordner an\n✓ Verschiebt & benennt Dateien einheitlich\n✓ Als /montags-sortierung gespeichert\n\nNächste Woche einfach den Befehl erneut ausführen.",
        "category": "pilot-inhouse",
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
        "featured": false,
        "badge": "neu"
      },
      {
        "id": "tool-teilen",
        "platforms": { "code": true, "langdock": false },
        "name": "Tool teilen",
        "tagline": "Dein fertiges Tool oder deine Website mit dem Team teilen",
        "description": "Bring dein selbstgebautes Tool zu den Kolleg:innen: als teilbare Datei, im internen Netz oder als Link. Claude erklärt und macht die passenden Schritte.",
        "longDescription": "Ein Tool nützt erst, wenn andere es nutzen können. Dieser Skill hilft dir, deinen Prototyp oder deine Seite so aufzubereiten, dass du sie einfach weitergeben kannst — als eigenständige Datei zum Doppelklicken, im gemeinsamen Laufwerk oder als interner Link. Inklusive kurzer „So benutzt du es“-Anleitung für deine Kolleg:innen.",
        "exampleOutput": "Dein Tool \"tkp-rechner.html\" teilen\n\n✓ Als eigenständige Datei verpackt (läuft per Doppelklick)\n✓ Kurzanleitung \"So nutzt du den TKP-Rechner\" erstellt\n✓ In den Team-Ordner /Tools/ gelegt\n\nTipp: Für eine echte Web-Adresse frag das Tech-Team\nnach internem Hosting.",
        "category": "pilot-inhouse",
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
        "featured": false,
        "badge": "neu"
      },
      {
        "id": "webaudit",
        "platforms": { "code": true, "langdock": false },
        "name": "webaudit",
        "tagline": "Deine Website prüfen: UX, Performance, SEO & Barrierefreiheit",
        "description": "Kombiniert Code-Analyse mit echten Browser-Screenshots via Playwright. Prüft UX, Design, Barrierefreiheit (WCAG), Performance, SEO — als strukturierter Report mit Handlungsempfehlungen.",
        "longDescription": "Ob selbstgebaute Landingpage oder Kunden-Website: webaudit ist bei pilot der Standard-Check für Qualität. Zweistufige Analyse — Code-Scan plus echter Browser mit Screenshots verschiedener Bildschirmgrößen. Ergebnis: ein klar priorisierter Report, den auch Nicht-Techniker:innen verstehen. Ideal vor jedem Launch und für Client-Reviews.",
        "exampleOutput": "## webaudit Report — herbst-kampagne.html\n**Score:** 78/100\n\n### 🔴 Kritisch (1)\n- 6 Bilder ohne Alt-Text → Barrierefreiheit (WCAG)\n\n### 🟡 Empfehlung (3)\n- Ladezeit mobil 3,1s — Bilder komprimieren\n- Kein Open-Graph-Bild fürs Teilen auf Social\n- Kontrast im Footer zu gering",
        "category": "pilot-inhouse",
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
        "featured": false,
        "badge": "empfohlen"
      },
      {
        "id": "briefing-gen",
        "platforms": { "code": true, "langdock": true },
        "name": "Briefing Generator",
        "tagline": "Strukturierte Briefings in Minuten statt Stunden",
        "description": "Generiert Kreativ-, Media- und Projektbriefings aus wenigen Eckdaten. Gezielte Rückfragen, Marktkontext, vollständiges Dokument nach pilot-Standard.",
        "longDescription": "Kennt die pilot-Briefing-Templates für Kreation, Media und PM. Führt dich mit gezielten Fragen durch den Prozess, ergänzt Marktkontext und liefert ein vollständig ausgefülltes Briefing — in unter 10 Minuten statt 2 Stunden.",
        "exampleOutput": "## Kreativ-Briefing: Herbst-Kampagne 2026\n\n**Kunde:** Mustermarke GmbH · **Budget:** 120.000 €\n**Zeitraum:** 01.09.–30.11.2026\n\n**Zielgruppe:** Frauen 35–55, einkommensstark, kaufentscheidend\n**Kernbotschaft:** \"Qualität, die man spürt — jeden Tag.\"\n\n**Must-haves:**\n- Produktnahaufnahme (warmes Licht)\n- Real People statt Models · CTA: \"Jetzt entdecken\"",
        "category": "gsd",
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
        "featured": true,
        "badge": "empfohlen"
      },
      {
        "id": "campaign-check",
        "platforms": { "code": true, "langdock": true },
        "name": "Campaign Checker",
        "tagline": "Kampagnen-Setup validieren, bevor Budget verbrannt wird",
        "description": "Prüft Kampagnen-Setups auf Vollständigkeit und Fehler: Tracking-Codes, UTM-Parameter, Zielgruppen, Budget-Allocation und KPI-Definitionen.",
        "longDescription": "Für Media-Teams bei pilot entwickelt. Validiert die kritischen Punkte eines Kampagnen-Setups und findet Fehler, bevor sie Media-Budget kosten. Klare Ampel-Logik: was passt, was ist eine Warnung, was ein echter Fehler.",
        "exampleOutput": "Campaign Check — \"Herbst-Kampagne 2026\"\n\n✓ UTM-Parameter vollständig (12/12 Anzeigen)\n✓ Conversion-Tracking aktiv (GA4 + Meta Pixel)\n⚠ 2 Warnungen\n  · Budget-Cap auf Ad-Set-Ebene fehlt (3 Ad-Sets)\n  · Zielgruppen-Overlap Meta: 34% (Empfehlung <20%)\n✗ 1 Fehler\n  · Landing-Page-URL 404 bei Anzeige \"Retargeting-B\"",
        "category": "gsd",
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
        "featured": true,
        "badge": null
      },
      {
        "id": "mediaplan-audit",
        "platforms": { "code": true, "langdock": true },
        "name": "Mediaplan-Audit",
        "tagline": "Mediaplan-Excel auf Konsistenz, Budget & Flighting prüfen",
        "description": "Lädt deinen Mediaplan (Excel/CSV) und prüft ihn auf Rechenfehler, Budget-Abweichungen, Lücken im Flighting und unplausible KPIs — bevor er zum Kunden geht.",
        "longDescription": "Media-Pläne sind komplex und Flüchtigkeitsfehler teuer. Dieser Skill liest deinen Plan ein und prüft systematisch: Summiert sich das Budget korrekt? Passen Reichweite und TKP zusammen? Gibt es Lücken oder Overlaps im Timing? Ergebnis: eine klare Fehlerliste, priorisiert nach Relevanz.",
        "exampleOutput": "Mediaplan-Audit — \"Q4_Plan_Mustermarke.xlsx\"\n\n✓ Summen korrekt (Gesamt 480.000 € = Σ Kanäle)\n⚠ TKP TikTok (2,10 €) unter Marktschnitt — plausibel?\n⚠ Lücke im Flighting: KW46 kein Kanal aktiv\n✗ Rechenfehler Zeile 23: Reichweite × TKP ≠ Kosten",
        "category": "gsd",
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
        "featured": false,
        "badge": "neu"
      },
      {
        "id": "tracking-audit",
        "platforms": { "code": true, "langdock": true },
        "name": "Tracking-Audit",
        "tagline": "UTM, GA4 & Pixel vor dem Launch sauber validieren",
        "description": "Prüft deine Tracking-Konfiguration: UTM-Konventionen, GA4-Events, Meta/LinkedIn Pixel und Consent. Findet fehlende oder inkonsistente Tags, bevor Daten verloren gehen.",
        "longDescription": "Kaputtes Tracking merkt man oft erst, wenn die Kampagne schon läuft und Daten fehlen. Dieser Skill prüft deine Tracking-Landschaft gegen die pilot-Namenskonventionen und gängige Best Practices — inklusive Consent-Mode und Event-Vollständigkeit. So startest du mit sauberer Datenbasis.",
        "exampleOutput": "Tracking-Audit — Kampagne \"Frühjahr 2026\"\n\n✓ UTM-Konvention eingehalten (utm_source/medium/campaign)\n✓ GA4 \"purchase\"-Event feuert korrekt\n⚠ Meta Pixel: \"Lead\"-Event doppelt hinterlegt\n✗ Consent-Mode fehlt → Tracking startet ohne Einwilligung",
        "category": "gsd",
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
        "featured": false,
        "badge": "neu"
      },
      {
        "id": "keyword-research",
        "platforms": { "code": true, "langdock": true },
        "name": "Keyword Researcher",
        "tagline": "SEO Keyword-Analyse mit Content-Cluster-Empfehlungen",
        "description": "Strukturierte Keyword-Analysen: gruppiert nach Suchintention, bewertet Schwierigkeit und erstellt Content-Cluster-Empfehlungen für organisches Wachstum.",
        "longDescription": "Kombiniert SEO-Expertise mit KI. Analysiert Seed-Keywords, erweitert sie systematisch, gruppiert nach Intent und Thema und empfiehlt einen Content-Cluster-Plan. Als erste, schnelle Analyse sehr wertvoll — ersetzt kein professionelles SEO-Tool, beschleunigt aber die Strategie.",
        "exampleOutput": "# Keyword-Analyse: \"Nachhaltige Kosmetik\"\n\nCluster 1 · Ratgeber (informational)\n- naturkosmetik selber machen — niedrig\n- clean beauty erklärung — mittel\n\nCluster 2 · Vergleich (navigational)\n- naturkosmetik marken vergleich — mittel\n- beste refill kosmetik — mittel\n\nCluster 3 · Kauf (transaktional)\n- naturkosmetik kaufen — hoch\n\n→ Content-Cluster: Pillar \"Nachhaltige Kosmetik — der Guide\"\n  + 4 Ratgeber-Artikel als Support (interne Verlinkung)",
        "category": "gsd",
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
        "featured": false,
        "badge": null
      },
      {
        "id": "content-recycling",
        "platforms": { "code": true, "langdock": true },
        "name": "Content Recycling",
        "tagline": "Ein Asset — zehn Kanäle. Automatisch adaptiert.",
        "description": "Aus einem bestehenden Inhalt (Artikel, Case, Whitepaper) macht der Skill kanalgerechte Varianten: LinkedIn-Post, Instagram-Caption, Newsletter-Teaser, Kurzvideo-Skript.",
        "longDescription": "Guter Content ist teuer — also hol das Maximum raus. Du gibst ein bestehendes Asset, Claude erzeugt daraus kanalgerechte Formate mit passender Länge, Tonalität und Hashtags. Von einem Case entstehen so in Minuten Posts für alle relevanten Kanäle, konsistent in der Botschaft.",
        "exampleOutput": "Quelle: Case Study \"Reichweiten-Rekord Marke X\" (2 Seiten)\n\n✓ LinkedIn-Post (Business-Ton, 1.100 Zeichen, 3 Hashtags)\n✓ Instagram-Caption (locker, Emojis, CTA \"Link in Bio\")\n✓ Newsletter-Teaser (Betreff + 3 Sätze)\n✓ Kurzvideo-Skript (30 Sek., 5 Szenen)\n\nAlle Varianten mit konsistenter Kernbotschaft.",
        "category": "gsd",
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
        "featured": true,
        "badge": "neu"
      },
      {
        "id": "tonalitaets-check",
        "platforms": { "code": true, "langdock": true },
        "name": "Tonalitäts-Check",
        "tagline": "Texte gegen die Marken-Tonalität & CD prüfen",
        "description": "Prüft einen Text gegen definierte Marken-Tonalität und Sprachregeln (Duz/Siez, Claims, No-Gos) und schlägt konkrete Umformulierungen vor.",
        "longDescription": "Jede Marke hat ihre Stimme — und die soll über alle Texte konsistent bleiben. Dieser Skill kennt die Tonalitäts-Vorgaben (aus deinem Style-Guide) und prüft Texte darauf: Anrede, Satzlänge, verbotene Begriffe, Claim-Konformität. Findet Abweichungen und liefert markengerechte Alternativen.",
        "exampleOutput": "Tonalitäts-Check gegen \"Marke X Styleguide\"\n\n⚠ Zeile 2: \"Sie\" verwendet — Marke duzt konsequent\n⚠ \"günstig\" ist ein No-Go-Wort → Vorschlag: \"fair\"\n✓ Satzlänge & Ton passen zur Markenstimme\n💡 Claim am Ende ergänzen: \"Qualität, die man spürt.\"",
        "category": "pilot-inhouse",
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
        "featured": false,
        "badge": "neu"
      },
      {
        "id": "social-kalender",
        "platforms": { "code": true, "langdock": true },
        "name": "Social-Media-Kalender",
        "tagline": "Redaktionsplan aus Themen & Terminen generieren",
        "description": "Erstellt aus Themen, Kanälen und Zeitraum einen strukturierten Redaktionsplan: Posting-Termine, Formatvorschläge, Hooks und passende Hashtags.",
        "longDescription": "Aus einer Liste von Themen und Terminen macht dieser Skill einen fertigen Redaktionsplan pro Kanal — mit sinnvoller Verteilung über die Woche, Formatvorschlägen (Reel, Carousel, Story), ersten Hook-Ideen und Hashtag-Sets. Als Tabelle, die du direkt weiterverarbeiten kannst.",
        "exampleOutput": "Redaktionsplan KW 38 — LinkedIn & Instagram\n\nMo · LinkedIn · Case-Teaser (Carousel) · Hook: \"480.000 €...\"\nMi · Instagram · Behind-the-Scenes (Reel) · #agenturleben\nFr · LinkedIn · Experten-Tipp (Text) · Hook: \"3 Fehler...\"\n\n→ Als Tabelle social_kw38.csv exportiert",
        "category": "gsd",
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
        "featured": false,
        "badge": "neu"
      },
      {
        "id": "meeting-notes",
        "platforms": { "code": true, "langdock": true },
        "name": "Meeting Notes",
        "tagline": "Rohe Mitschriften zu strukturierten Protokollen",
        "description": "Wandelt Mitschriften oder Transkripte in strukturierte Protokolle: Agenda, Beschlüsse, Action Items (wer, was, bis wann), nächste Schritte.",
        "longDescription": "Versteht unstrukturierten Meeting-Input — auch aus Sprachnotizen — und formt daraus saubere, actionable Protokolle im pilot-Format. Hilfreich immer dann, wenn während des Meetings keine Zeit für strukturierte Notizen bleibt.",
        "exampleOutput": "## Protokoll — Kickoff Mustermarke (08.07.)\n\nTeilnehmer: SK, AS, LW\nBeschlüsse: Kampagnenstart 01.09. bestätigt\n\nAction Items:\n- [ ] AS: Kreativ-Briefing bis 15.07.\n- [ ] LW: Keyword-Set bis 12.07.\n- [ ] SK: Mediaplan v1 bis 18.07.",
        "category": "gsd",
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
        "featured": false,
        "badge": null
      },
      {
        "id": "markt-research",
        "platforms": { "code": true, "langdock": true },
        "name": "Markt-Research",
        "tagline": "Strukturierte Markt- & Zielgruppen-Recherche mit Quellen",
        "description": "Recherchiert strukturiert zu Markt, Wettbewerb und Zielgruppe — mit nachvollziehbaren Quellen. Ergebnis: verdichtetes Briefing statt 20 offener Tabs.",
        "longDescription": "Statt stundenlang selbst zu googeln, gibst du das Thema vor — Claude recherchiert strukturiert, prüft mehrere Quellen und verdichtet die Erkenntnisse zu einem klaren Research-Briefing: Marktgröße, Trends, Wettbewerber, Zielgruppen-Insights. Jede Aussage mit Quellenangabe, damit du sie belegen kannst.",
        "exampleOutput": "Research-Briefing: Markt \"Nachhaltige Kosmetik DE\"\n\n▸ Marktvolumen: ~1,4 Mrd. € (2025), +8% p.a. [Quelle 1]\n▸ Top-Treiber: Gen Z, Refill-Konzepte, Clean Beauty\n▸ Wettbewerb: 3 Platzhirsche, viele Newcomer [Quelle 2,3]\n▸ Zielgruppen-Insight: Preisbereitschaft +15% bei Transparenz\n\nQuellen: 5 geprüfte Fundstellen (Liste am Ende)",
        "category": "pilot-inhouse",
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
        "featured": false,
        "badge": null
      },
      {
        "id": "persona-builder",
        "platforms": { "code": true, "langdock": true },
        "name": "Persona-Builder",
        "tagline": "Zielgruppen-Personas aus Briefing & Daten",
        "description": "Erstellt greifbare Zielgruppen-Personas aus Briefing-Angaben oder Daten: Demografie, Ziele, Pain Points, Mediennutzung und Ansprache-Empfehlung.",
        "longDescription": "Aus deinen Briefing-Angaben oder vorhandenen Daten formt dieser Skill anschauliche Personas, die dem ganzen Team helfen, die Zielgruppe zu verstehen — inklusive Motivation, Pain Points, bevorzugter Kanäle und konkreter Ansprache-Tipps für Kreation und Media.",
        "exampleOutput": "Persona: \"Nachhaltige Nina\", 34\n\nZiele: bewusst konsumieren, Zeit sparen\nPain Points: Greenwashing-Skepsis, Preis vs. Anspruch\nMedien: Instagram, Podcasts, Newsletter\nAnsprache: ehrlich, faktenbasiert, kein Öko-Pathos\nKanal-Tipp: Reels + Testimonials von Real People",
        "category": "gsd",
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
        "featured": false,
        "badge": "neu"
      },
      {
        "id": "pitch-deck",
        "platforms": { "code": true, "langdock": true },
        "name": "Pitch Deck Assistent",
        "tagline": "Überzeugender Pitch: Struktur, Argumente, Storytelling",
        "description": "Unterstützt bei Pitch-Decks: strukturiert Argumentation, erstellt Slide-Outline, formuliert Value Propositions, passt Tonalität an die Zielgruppe an.",
        "longDescription": "Vom ersten Gedanken bis zur fertigen Struktur: analysiert die Zielgruppe, entwickelt die Story, schlägt eine Slide-Reihenfolge vor und formuliert Key Messages — für New Business, interne oder Investoren-Pitches.",
        "exampleOutput": "## Pitch-Struktur — New Business\n\n1. Hook — die eine unbequeme Wahrheit über [Branche]\n2. Problem — was kostet das heute? (in Zahlen)\n3. Lösung — der pilot-Ansatz in 3 Punkten\n4. Proof — Case Study + Messergebnisse\n5. Team — wer macht das?\n6. Nächste Schritte\n\nFormat: 12 Slides, 16:9, pilot CI",
        "category": "gsd",
        "subcategory": "strategy",
        "trigger": "/pitch",
        "author": "New Business Team pilot",
        "version": "0.8.0",
        "addedAt": "2026-02-01",
        "updatedAt": "2026-05-20",
        "tags": [
          "content",
          "new-business",
          "templates",
          "presentations",
          "storytelling"
        ],
        "useCases": [
          "New-Business-Pitches",
          "Interne Präsentationen",
          "Investor Decks",
          "Workshop-Präsentationen"
        ],
        "difficulty": "medium",
        "timeToRun": "15–30 Min",
        "requirements": [
          "Claude Code"
        ],
        "rating": {
          "average": 3.9,
          "count": 7
        },
        "endorsedBy": [],
        "endorsements": [],
        "comments": [
          {
            "author": "Anna Schreiber",
            "role": "Content Strategin",
            "initials": "AS",
            "date": "2026-04-28",
            "text": "Für die erste Strukturierung sehr hilfreich. Feinschliff bleibt Handarbeit.",
            "rating": 4
          }
        ],
        "featured": false,
        "badge": null
      },
      {
        "id": "daten-aufbereiten",
        "platforms": { "code": true, "langdock": false },
        "name": "Daten aufbereiten",
        "tagline": "Excel & CSV bereinigen, sortieren, analysefertig machen",
        "description": "Lädt eine unordentliche Tabelle und macht sie sauber: Duplikate raus, Formate vereinheitlicht, Spalten sortiert, Pivot-fertig — inklusive kurzer Zusammenfassung.",
        "longDescription": "Die undankbarste Arbeit vor jeder Analyse: Daten putzen. Dieser Skill übernimmt das. Er erkennt Duplikate, vereinheitlicht Datums- und Zahlenformate, füllt oder markiert Lücken und bringt die Tabelle in eine analysefertige Struktur. Auf Wunsch gleich mit erster Auswertung. Perfekt für alle, die viel mit Export-Dateien hantieren.",
        "exampleOutput": "Aufbereitung — \"export_roh.csv\" (4.812 Zeilen)\n\n✓ 214 Duplikate entfernt\n✓ Datumsformate vereinheitlicht (→ TT.MM.JJJJ)\n✓ Währung bereinigt (\"1.200 €\" → 1200)\n✓ 37 leere Pflichtfelder markiert (gelb)\n\n→ daten_clean.csv erstellt · analysefertig",
        "category": "gsd",
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
        "featured": true,
        "badge": "neu"
      },
      {
        "id": "report-summary",
        "platforms": { "code": true, "langdock": true },
        "name": "Report Summarizer",
        "tagline": "Lange Reports kompakt und actionable zusammengefasst",
        "description": "Fasst Analysen, Performance-Reports und Marktdaten zusammen. Input: PDF, Excel, Text. Output: Executive Summary + Key Insights + Handlungsempfehlungen auf Deutsch.",
        "longDescription": "Optimiert für pilot-Reporting-Formate: Media-Performance, Marktanalysen, Wettbewerbsanalysen. Destilliert den Kern, hebt die wichtigsten Insights hervor und formuliert nächste Schritte in klarem Deutsch — aus 30 Seiten wird eine Seite, die man wirklich liest.",
        "exampleOutput": "## Executive Summary — Q2 Media-Report\n\nKanal-Mix 18% über Ziel. Haupttreiber: Paid Social\n(ROAS 4,2) und SEA (ROAS 3,8).\n\n▸ Key Insights\n- CTR Meta +34% ggü. Q1 (Creative-Refresh)\n- CPM YouTube +22% → Budget prüfen\n▸ Empfehlung: 15% Budget Display → Paid Social",
        "category": "gsd",
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
        "featured": true,
        "badge": null
      },
      {
        "id": "moodboard",
        "platforms": { "code": true, "langdock": true },
        "name": "Moodboard-Generator",
        "tagline": "Visuelle Richtung & Moodboard-Struktur aus dem Briefing",
        "description": "Aus Briefing oder Kampagnen-Idee entsteht eine visuelle Richtung: Stil-Achsen, Farbwelten, Bildsprache, Referenz-Stichworte — als strukturiertes Moodboard-Gerüst.",
        "longDescription": "Der schnelle Start in die visuelle Konzeption: Aus deinem Briefing leitet der Skill eine kohärente visuelle Richtung ab — Stimmung, Farbwelten, Bildsprache, Typo-Gefühl und konkrete Referenz-Stichworte zum Suchen. Kein fertiges Design, aber ein starkes Gerüst, das Kreation und Kunde ausrichtet.",
        "exampleOutput": "Moodboard — \"Refill-Kosmetik, Gen Z\"\n\nStimmung: frisch, ehrlich, unperfekt-nahbar\nFarbwelt: warmes Beige · Salbeigrün · Terrakotta\nBildsprache: echte Haut, Tageslicht, keine Studio-Optik\nTypo: humanistisch, leicht, viel Luft\nReferenz-Stichworte: \"clean beauty editorial\", \"refill ritual\"",
        "category": "pilot-inhouse",
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
        "featured": false,
        "badge": "neu"
      },
      {
        "id": "slides-aus-daten",
        "platforms": { "code": true, "langdock": true },
        "name": "Slides aus Daten",
        "tagline": "Aus Zahlen eine präsentationsreife Story",
        "description": "Nimmt eine Datentabelle und macht daraus eine Slide-Struktur mit Kernaussagen, passenden Chart-Vorschlägen und Sprechernotizen — bereit für die Präsentation.",
        "longDescription": "Der Weg von der Excel-Tabelle zur Story: Der Skill analysiert deine Zahlen, findet die Kernaussagen und baut daraus eine schlüssige Slide-Struktur — pro Slide eine Botschaft, ein Chart-Vorschlag und eine kurze Sprechernotiz. Ideal für Performance-Reviews und Ergebnis-Präsentationen.",
        "exampleOutput": "Slides aus \"q2_ergebnisse.csv\"\n\nSlide 1 · Titel: \"Q2 über Plan — +18%\"\nSlide 2 · \"Paid Social treibt den Erfolg\" (Balkenchart)\nSlide 3 · \"YouTube-CPM steigt — Handlungsbedarf\" (Linie)\nSlide 4 · Empfehlung & nächste Schritte\n+ Sprechernotizen je Slide",
        "category": "gsd",
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
        "featured": false,
        "badge": "neu"
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
        "badge": "neu",
        "trigger": null,
        "id": "pptx",
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
        "badge": "neu",
        "trigger": null,
        "id": "xlsx",
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
        "badge": "neu",
        "trigger": null,
        "id": "docx",
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
        "badge": "neu",
        "trigger": null,
        "id": "pdf",
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
        "badge": "neu",
        "trigger": null,
        "id": "brand-guidelines",
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
        "updatedAt": "2026-07-09",
        "requirements": [
          "Claude Code"
        ],
        "endorsements": [],
        "comments": [],
        "badge": "neu",
        "trigger": null,
        "id": "web-artifacts-builder",
        "platforms": { "code": true, "langdock": false },
        "install": "plugin",
        "name": "web-artifacts-builder",
        "subcategory": "bauen",
        "difficulty": "advanced",
        "timeToRun": "20–60 Min",
        "featured": false,
        "tagline": "Größere, interaktive Web-Apps bauen — für den nächsten Schritt",
        "description": "Offizieller Anthropic-Skill für aufwändigere Web-Artefakte: mehrteilige React-Apps mit State, Routing und UI-Komponenten (React 18, TypeScript, Vite, Tailwind, shadcn/ui). Für einfache Ein-Datei-Tools eignet sich eher /prototyp.",
        "longDescription": "Der offizielle Claude-Code-Skill für komplexere Web-Anwendungen. Richtet ein React-Setup (TypeScript, Vite, Tailwind, shadcn/ui) ein und baut mehrteilige, interaktive Apps mit Zustand und Komponenten. Bewusst NICHT für simple Rechner/Ein-Datei-Seiten gedacht — dafür ist der pilot-Skill /prototyp gemacht.",
        "tags": [
          "bauen",
          "web",
          "react",
          "app",
          "artefakt"
        ],
        "useCases": [
          "Mehrseitige interaktive Web-App",
          "Dashboard mit mehreren Ansichten",
          "Tool mit Zustand & UI-Komponenten",
          "Aufwändigeres Web-Artefakt"
        ],
        "rating": {
          "average": 4.6,
          "count": 8
        },
        "endorsedBy": [
          "Jan Richter",
          "Christopher Kipp"
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
            "text": "Das Werkzeug, das aus Skill-Nutzer:innen Skill-Beitragende macht — der direkte Weg zu neuen pilot-Skills im Katalog."
          }
        ],
        "comments": [],
        "badge": "neu",
        "trigger": null,
        "id": "skill-creator",
        "itemType": "plugin",
        "platforms": { "code": true, "langdock": false },
        "name": "skill-creator",
        "subcategory": "bauen",
        "difficulty": "advanced",
        "timeToRun": "15–40 Min",
        "featured": true,
        "tagline": "Eigene Skills bauen — geführt vom offiziellen Skill-Creator",
        "description": "Offizielles Anthropic-Plugin, das beim Erstellen eigener Skills hilft: Struktur, SKILL.md, gute description, Referenzen und Tests. Du beschreibst, was der Skill können soll — Claude baut ihn nach Anthropic-Best-Practices.",
        "longDescription": "Macht aus „ich erkläre Claude jedes Mal dasselbe“ einen wiederverwendbaren Skill: Du sagst einfach „Erstell mir einen Skill, der …“, und Claude führt dich durch Aufbau, gute description (für den Auto-Trigger), Ordnerstruktur und Qualität. Der natürliche nächste Schritt, wenn das Team eigene pilot-Skills schreiben will — fertige Skill-Ordner kannst du mit Kolleg:innen teilen und bei uns in den Katalog einreichen. Ehrlich gesagt: Gute Skills brauchen mehrere Runden Ausprobieren und Nachschärfen — der erste Wurf ist selten perfekt (das sagt Anthropic selbst so). Die Eval-Funktionen sind Fortgeschrittenen-Terrain; einen einfachen Skill schafft aber auch ein:e Einsteiger:in im Dialog.",
        "exampleOutput": "Du: \"Erstell mir einen Skill, der aus unseren\nKampagnen-Kennzahlen einen Report im pilot-Stil macht\"\n\n✓ Fragen geklärt: Eingabeformat, Report-Aufbau, Ton\n✓ Skill-Ordner angelegt: kampagnen-report/\n  SKILL.md · references/beispiel.md\n→ Zum Teilen bereit — und zum Einreichen in den Katalog",
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
        "badge": "neu",
        "trigger": null,
        "id": "internal-comms",
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
        "badge": "neu",
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
        "id": "canvas-design",
        "platforms": { "code": true, "langdock": false },
        "name": "canvas-design",
        "install": "plugin",
        "tagline": "Poster, Key Visuals & Grafiken als PNG/PDF",
        "description": "Offizieller Anthropic-Skill: erstellt eigenständige visuelle Designs (Poster, Artwork, Grafiken) als PNG oder PDF — inklusive 25 mitgelieferter Schriften. Inhalt auf Englisch.",
        "longDescription": "Claude gestaltet damit statische Visuals nach echten Design-Prinzipien: Moodboard-taugliche Poster, Key-Visual-Entwürfe, Social-Grafiken — als PNG oder PDF. Der Skill bringt 25 kuratierte Open-Source-Schriften mit und legt Wert auf Originalität statt Nachahmung. Für schnelle visuelle Richtungen, bevor die Kreation übernimmt. Inhalt auf Englisch.",
        "category": "anthropic",
        "subcategory": "content",
        "trigger": null,
        "author": "Anthropic",
        "version": "1.0.0",
        "addedAt": "2026-07-10",
        "updatedAt": "2026-07-10",
        "badge": "neu",
        "featured": false,
        "tags": ["kreativ", "design", "poster", "visual", "png"],
        "useCases": ["Key-Visual-Entwürfe", "Moodboard-Poster", "Schnelle Kampagnen-Visuals"],
        "difficulty": "medium",
        "timeToRun": "5–10 Min",
        "requirements": ["Claude Code"],
        "rating": { "average": 4.2, "count": 2 },
        "endorsedBy": [],
        "endorsements": [],
        "comments": []
      },
      {
        "id": "doc-coauthoring",
        "platforms": { "code": true, "langdock": true },
        "name": "doc-coauthoring",
        "install": "plugin",
        "tagline": "Konzepte & Papiere strukturiert gemeinsam schreiben",
        "description": "Offizieller Anthropic-Skill: führt in drei Phasen durch das Schreiben von Konzepten, Proposals und Entscheidungsvorlagen — Kontext sammeln, gemeinsam verfeinern, am Leser testen. Inhalt auf Englisch.",
        "longDescription": "Statt „schreib mir ein Konzept“ und einem mittelmäßigen Erstwurf: Dieser Skill strukturiert das Schreiben als geführten Prozess. Erst hilft Claude, dein Wissen in den Text zu bekommen (Brain-Dump, gezielte Fragen), dann verfeinert ihr Abschnitt für Abschnitt, zum Schluss prüft Claude den Text aus Sicht der Zielgruppe. Stark für Kundenkonzepte, interne Vorlagen und New-Business-Papiere. Inhalt auf Englisch.",
        "category": "anthropic",
        "subcategory": "content",
        "trigger": null,
        "author": "Anthropic",
        "version": "1.0.0",
        "addedAt": "2026-07-10",
        "updatedAt": "2026-07-10",
        "badge": "neu",
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
        "id": "theme-factory",
        "platforms": { "code": true, "langdock": false },
        "name": "theme-factory",
        "install": "plugin",
        "tagline": "10 fertige Design-Themes für Decks, Docs & Landingpages",
        "description": "Offizieller Anthropic-Skill: 10 kuratierte Farb-/Typo-Themes (von „Modern Minimalist“ bis „Midnight Galaxy“), die Claude auf Präsentationen, Reports und Webseiten anwendet — oder er baut on-the-fly ein neues. Inhalt auf Englisch.",
        "longDescription": "Einheitlicher Look ohne Design-Diskussion: Der Skill bringt 10 ausgearbeitete Themes mit (Farben, Schriften, Stimmung) und wendet sie auf beliebige Artefakte an — Pitch-Decks, Reportings, Landingpages. Auf Zuruf entsteht auch ein neues Theme, z. B. abgeleitet aus einer Kunden-CI. Gut kombinierbar mit pitch-deck und slides-aus-daten. Inhalt auf Englisch.",
        "category": "anthropic",
        "subcategory": "content",
        "trigger": null,
        "author": "Anthropic",
        "version": "1.0.0",
        "addedAt": "2026-07-10",
        "updatedAt": "2026-07-10",
        "badge": "neu",
        "featured": false,
        "tags": ["design", "themes", "präsentation", "styling", "ci"],
        "useCases": ["Deck in 1 Minute umstylen", "Report-Look vereinheitlichen", "Kunden-CI als Theme"],
        "difficulty": "easy",
        "timeToRun": "2–5 Min",
        "requirements": ["Claude Code"],
        "rating": { "average": 4.1, "count": 2 },
        "endorsedBy": [],
        "endorsements": [],
        "comments": []
      },

      {
        "id": "brainstorming",
        "platforms": { "code": true, "langdock": true },
        "name": "brainstorming",
        "tagline": "Erst denken, dann bauen — Anforderungen im Dialog klären",
        "description": "Der meistempfohlene Community-Skill: Bevor Claude baut, stellt er dir die richtigen Fragen — Ziel, Nutzer:innen, Grenzen. Aus deinen Antworten wird ein kleines Konzept.",
        "longDescription": "Aus dem superpowers-Paket von Jesse Vincent (obra) — einer der meistinstallierten Skill-Sammlungen der Claude-Code-Community. Der Skill verankert die wichtigste Gewohnheit beim Citizen Coding: erst Absicht, Zielgruppe und Randbedingungen klären, dann bauen. Claude führt ein kurzes, strukturiertes Gespräch und hält das Ergebnis als Design-Notiz fest — die ideale Vorstufe zu /prototyp oder /webseite.",
        "category": "community",
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
        "requirements": ["Claude Code oder Langdock"],
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
        "featured": false,
        "badge": "empfohlen"
      },

      {
        "id": "systematic-debugging",
        "platforms": { "code": true, "langdock": false },
        "name": "systematic-debugging",
        "tagline": "Wenn dein Tool spinnt: Ursache finden statt raten",
        "description": "Der Rettungsanker aus dem superpowers-Paket: eine erprobte Vier-Phasen-Methode, mit der Claude Fehler systematisch eingrenzt, statt wild Fixes zu probieren.",
        "longDescription": "Für Citizen Coder der wichtigste Sicherheitsgurt: Wenn der Prototyp plötzlich nicht mehr tut, führt dieser Skill Claude durch eine saubere Diagnose — reproduzieren, eingrenzen, Ursache belegen, erst dann fixen. Mit Referenzen zu Root-Cause-Tracing und Defense-in-Depth aus der superpowers-Sammlung. Verhindert die typische Abwärtsspirale aus Symptom-Flickerei.",
        "category": "community",
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
        "featured": false,
        "badge": "empfohlen"
      },

      {
        "id": "verification-before-completion",
        "platforms": { "code": true, "langdock": false },
        "name": "verification-before-completion",
        "tagline": "„Fertig“ gibt es erst nach dem Beweis",
        "description": "Kultur-Skill aus superpowers: Claude sagt nie wieder ungeprüft „läuft“ — vor jedem „fertig“ verlangt der Skill echte Verifikation: ausführen, ansehen, belegen.",
        "longDescription": "Evidenz vor Behauptung: Dieser kleine Skill ändert das Verhalten von Claude grundsätzlich — Erfolgsmeldungen gibt es erst, wenn das Ergebnis wirklich geprüft wurde (Test gelaufen, Seite geöffnet, Ausgabe gesehen). Passt perfekt zu webaudit und tool-teilen und ist die beste Versicherung gegen „bei mir ging’s doch“.",
        "category": "community",
        "subcategory": "bauen",
        "trigger": null,
        "author": "obra/superpowers (Community)",
        "version": "1.0.0",
        "addedAt": "2026-07-11",
        "updatedAt": "2026-07-11",
        "tags": ["qualität", "verifikation", "bauen", "citizen-coding", "community"],
        "useCases": ["Vor der Übergabe ans Team prüfen", "Claude zu ehrlichen Statusmeldungen erziehen", "Qualitätsstandard im Projekt setzen"],
        "difficulty": "easy",
        "timeToRun": "läuft im Hintergrund",
        "requirements": ["Claude Code"],
        "rating": { "average": 4.6, "count": 9 },
        "endorsedBy": ["Jan Richter"],
        "endorsements": [
          {
            "name": "Jan Richter",
            "role": "Tech Lead & Citizen-Coding-Mentor",
            "initials": "JR",
            "text": "Gehört in jedes Projekt-Setup. „Fertig“ heißt seitdem bei uns: gezeigt, nicht behauptet."
          }
        ],
        "comments": [],
        "featured": false,
        "badge": "neu"
      },

      {
        "id": "dataviz",
        "platforms": { "code": true, "langdock": true },
        "name": "dataviz",
        "tagline": "Charts, die eine Aussage treffen — Diagrammwahl, Farbe & Barrierefreiheit",
        "description": "Anthropics Data-Visualization-Skill: eine erprobte Entscheidungshilfe, welcher Diagrammtyp zu welchen Daten passt — plus fertige Python-Muster (matplotlib/seaborn/plotly), Farbregeln und eine Barrierefreiheits-Checkliste.",
        "longDescription": "Die Lücke zwischen „Zahlen aufbereiten“ und „Zahlen zeigen“: Dieser offizielle Anthropic-Skill (aus dem knowledge-work-plugins-Repo) bringt Claude bei, Diagramme nach Design-Prinzipien zu bauen statt nach Bauchgefühl. Eine Auswahltabelle ordnet 13+ Diagrammtypen der jeweiligen Datenbeziehung zu (Trend, Vergleich, Verteilung, Anteil …), inklusive klarer „nimm-das-nicht“-Regeln (keine Tortendiagramme, kein 3D). Dazu kopierfertige Python-Muster für Linien-, Balken-, Histogramm-, Heatmap- und Small-Multiples-Charts, farbsichere Paletten und eine Checkliste für lesbare, barrierefreie Grafiken. In Claude Code erzeugt er echte Chart-Dateien; als reine SKILL.md ist er auch in Langdock als Gestaltungs-Leitfaden nutzbar. Ideal für Report-Charts, Dashboards und Slide-Grafiken, die überall gleich aussehen.",
        "exampleOutput": "Frage: „Umsatz je Kanal übers Jahr — welcher Chart?“\n\nEmpfehlung: gruppiertes Balkendiagramm, nicht Torte\n  → Balken bei 0 beginnen (sonst verzerrt)\n  → nach Wert sortieren, nicht alphabetisch\n  → Blau/Orange statt Rot/Grün (farbenblind-sicher)\n  → Titel sagt die Aussage: „Search trägt 48 % des Umsatzes“\n\n+ fertiger matplotlib-Codeblock zum Einsetzen",
        "category": "community",
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
        "badge": "neu",
        "source": "https://github.com/anthropics/knowledge-work-plugins/tree/main/data/skills/data-visualization"
      },

      {
        "id": "webapp-testing",
        "platforms": { "code": true, "langdock": false },
        "name": "webapp-testing",
        "tagline": "Klickt deine App durch — tut sie wirklich, was sie soll?",
        "description": "Anthropics offizieller Playwright-Toolkit-Skill: lässt Claude deine selbstgebaute Web-App im echten Browser durchklicken — Funktionen testen, UI-Verhalten prüfen, Screenshots machen und Browser-Logs auslesen.",
        "longDescription": "Der Gegenpart zu webaudit: webaudit prüft UX, SEO und Barrierefreiheit — dieser Skill prüft, ob dein Tool tatsächlich funktioniert. Claude schreibt kleine Playwright-Skripte, startet deine App bei Bedarf selbst (Helfer-Skript with_server.py) und klickt sie durch wie ein echter Mensch: Formular ausfüllen, Knopf drücken, Ergebnis kontrollieren. Der eingebaute „erst schauen, dann handeln“-Ablauf (Screenshot/DOM ansehen, Selektoren finden, dann klicken) macht die Tests verlässlich, und der Skill wartet korrekt, bis die Seite fertig geladen ist. Genau das Sicherheitsnetz für Citizen Coder, die ihr Tool ans Team geben wollen: nicht „sieht gut aus“, sondern „macht nachweislich, was es soll“. Läuft in Claude Code (braucht Playwright/Python), nicht in Langdock.",
        "exampleOutput": "Test: TKP-Rechner durchklicken\n\n1) Seite geöffnet, auf networkidle gewartet ✓\n2) Reichweite 500.000, TKP 12 € eingegeben\n3) Button „Berechnen“ geklickt\n4) Ergebnis gelesen: 6.000,00 € ✓ (erwartet: 6.000,00 €)\n5) Screenshot abgelegt: /tmp/inspect.png\n\nErgebnis: 1 Flow getestet, 0 Fehler — Tool tut, was es soll.",
        "category": "community",
        "subcategory": "bauen",
        "trigger": null,
        "author": "Anthropic (anthropics/skills)",
        "version": "1.0.0",
        "addedAt": "2026-07-23",
        "updatedAt": "2026-07-23",
        "tags": ["bauen", "testen", "qualität", "playwright", "community"],
        "useCases": ["Klick-Flows im eigenen Tool testen", "UI-Fehler im echten Browser finden", "Vor der Übergabe prüfen: tut das Tool, was es soll?"],
        "difficulty": "medium",
        "timeToRun": "15–40 Min",
        "requirements": ["Claude Code", "Playwright (Python)"],
        "rating": { "average": 4.3, "count": 4 },
        "endorsedBy": ["Jan Richter"],
        "endorsements": [
          {
            "name": "Jan Richter",
            "role": "Tech Lead & Citizen-Coding-Mentor",
            "initials": "JR",
            "text": "webaudit sagt dir, ob die Seite schön ist — dieser Skill sagt dir, ob der Knopf wirklich rechnet. Beides zusammen ergibt eine echte Freigabe."
          }
        ],
        "comments": [],
        "featured": false,
        "badge": "neu",
        "source": "https://github.com/anthropics/skills/tree/main/skills/webapp-testing"
      },

      {
        "id": "algorithmic-art",
        "platforms": { "code": true, "langdock": false },
        "install": "plugin",
        "name": "algorithmic-art",
        "tagline": "Generative Kunst mit p5.js — Code als Kreativwerkzeug",
        "description": "Offizieller Anthropic-Skill: erzeugt algorithmische Kunst (Flow Fields, Partikel, Muster) mit reproduzierbarem Seed und interaktiven Reglern zum Erkunden.",
        "longDescription": "Kunst aus Code statt Stock-Material: Der Skill baut generative Visuals als p5.js-Sketch — mit festem Seed (reproduzierbar) und einem mitgelieferten Viewer, in dem sich Parameter live verschieben lassen. Für Moodboard-Experimente, Key-Visual-Ideen und Social-Assets mit eigenem Look. Der kreativste Einstieg, um zu verstehen, was Code kann.",
        "category": "anthropic",
        "subcategory": "content",
        "trigger": null,
        "author": "Anthropic",
        "version": "1.0.0",
        "addedAt": "2026-07-11",
        "updatedAt": "2026-07-11",
        "tags": ["kreativ", "design", "generativ", "p5js", "visual"],
        "useCases": ["Eigenes Key-Visual generieren", "Moodboard mit Unikaten füllen", "Kreativ-Experiment im Team-Workshop"],
        "difficulty": "medium",
        "timeToRun": "15–30 Min",
        "requirements": ["Claude Code"],
        "rating": { "average": 4.5, "count": 7 },
        "endorsedBy": ["Mia Hoffmann", "Anna Schreiber"],
        "endorsements": [
          {
            "name": "Anna Schreiber",
            "role": "Content Strategin",
            "initials": "AS",
            "text": "Endlich Visuals, die nicht nach Stock aussehen — und jedes ist beweisbar ein Unikat."
          }
        ],
        "comments": [
          {
            "author": "Mia Hoffmann",
            "role": "Senior UX Designerin",
            "initials": "MH",
            "date": "2026-07-11",
            "text": "Der Seed-Ansatz ist klug: Gefällt ein Ergebnis, ist es exakt reproduzierbar.",
            "rating": 4
          }
        ],
        "featured": false,
        "badge": "neu"
      },

      {
        "id": "superpowers",
        "itemType": "plugin",
        "platforms": { "code": true, "langdock": false },
        "name": "superpowers",
        "tagline": "Ein Plugin, das Claude beibringt, wie ein eingespieltes Team zu arbeiten",
        "description": "Das Community-Skill-Paket von Jesse Vincent (obra), auch im offiziellen Anthropic-Katalog gelistet: 14 Skills plus Hooks, die Claude automatisch erst verstehen, planen und prüfen lassen, statt drauflos zu bauen. Inhalt auf Englisch.",
        "longDescription": "Das Skill-Paket, aus dem auch unsere Einzel-Skills brainstorming, systematic-debugging und verification-before-completion stammen. Als Plugin installierst du alle 14 Skills auf einmal — inklusive Hooks, die sie automatisch aktivieren: Claude greift von selbst zum passenden Skill und startet bei einer neuen Tool-Idee z. B. ohne Aufforderung die Brainstorming-Phase mit Rückfragen. Ehrlich gesagt: Die Texte sind Englisch, ein Teil der Skills ist klar entwicklerlastig (Git-Worktrees, Code-Review, TDD), und Claude arbeitet damit gründlicher und dadurch langsamer — für schnelle Mini-Aufgaben kann sich das übertrieben anfühlen. Für alles, was gebaut wird und halten soll, lohnt es sich. Sehr aktives Community-Projekt, ändert sich laufend.",
        "exampleOutput": "Du: \"Bau mir ein Kampagnen-Reporting-Tool\"\n\nOhne superpowers: Claude schreibt sofort Code.\nMit superpowers:\n  1) Brainstorming — Claude fragt nach: Wer nutzt das?\n     Welche Daten? Was heißt \"fertig\"?\n  2) Design-Dokument — du gibst frei\n  3) Plan in kleinen Schritten\n  4) Umsetzung — geprüft, bevor \"fertig\" fällt",
        "category": "community",
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
            "text": "Unsere drei meistempfohlenen Community-Skills stammen aus diesem Paket. Wer mehr als einen davon nutzt, fährt mit dem kompletten Plugin besser."
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
        "badge": null,
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
        "id": "ralph-loop",
        "itemType": "plugin",
        "platforms": { "code": true, "langdock": false },
        "name": "ralph-loop",
        "tagline": "Claude bleibt dran, bis die Aufgabe wirklich fertig ist",
        "description": "Offizielles Anthropic-Plugin: Du gibst eine Aufgabe mit messbarem Fertig-Kriterium, ein Stop-Hook speist sie so lange erneut ein, bis das Kriterium erfüllt ist — oder das Iterationslimit greift. Für Fortgeschrittene, Inhalt auf Englisch.",
        "longDescription": "Für Fleißaufgaben, bei denen du nicht daneben sitzen und „weiter“ tippen willst: ralph-loop fängt Claudes Beenden-Versuch per Stop-Hook ab und füttert dieselbe Aufgabe erneut ein — arbeiten, prüfen, korrigieren, erneut prüfen. Benannt nach der „Ralph Wiggum“-Technik von Geoffrey Huntley. Ehrliche Einordnung: Der Nutzen steht und fällt mit einem präzisen Prompt und einem messbaren Fertig-Kriterium — schwammige Aufgaben drehen sich im Kreis. Der Loop läuft unbeaufsichtigt weiter und verbraucht entsprechend Kontingent; --max-iterations ist laut README das primäre Sicherheitsnetz und gehört immer gesetzt. Ungeeignet für Geschmacks- und Designentscheidungen — das steht so auch im README.",
        "exampleOutput": "/ralph-loop:ralph-loop \"Prüfe alle 30 Landingpages\ngegen die Checkliste und korrigiere die Funde.\nFertig, wenn alle Checks grün sind — gib dann\n<promise>FERTIG</promise> aus.\"\n--completion-promise \"FERTIG\" --max-iterations 20\n\n→ Claude arbeitet · prüft · korrigiert · prüft erneut\n→ Der Stop-Hook speist die Aufgabe so lange neu ein,\n  bis FERTIG fällt oder das Iterationslimit greift",
        "category": "anthropic",
        "subcategory": "automation",
        "trigger": "/ralph-loop:ralph-loop",
        "author": "Anthropic",
        "version": "1.0.0",
        "addedAt": "2026-07-16",
        "updatedAt": "2026-07-16",
        "tags": ["automation", "workflow", "bauen", "unbeaufsichtigt"],
        "useCases": ["Lange Checklisten unbeaufsichtigt abarbeiten", "Viele Dateien nach demselben Muster prüfen und korrigieren", "Über Nacht iterieren lassen — mit hartem Limit"],
        "difficulty": "advanced",
        "timeToRun": "läuft unbeaufsichtigt weiter",
        "requirements": ["Claude Code", "Ein messbares Fertig-Kriterium", "--max-iterations immer setzen"],
        "rating": { "average": 4.1, "count": 4 },
        "endorsedBy": ["Jan Richter"],
        "endorsements": [
          {
            "name": "Jan Richter",
            "role": "Tech Lead & Citizen-Coding-Mentor",
            "initials": "JR",
            "text": "Mächtig, aber nur mit klarem Fertig-Kriterium und Iterationslimit. Erst mit kleinen Aufgaben üben, dann skalieren."
          }
        ],
        "comments": [
          {
            "author": "Lukas Weber",
            "role": "SEO Strategist",
            "initials": "LW",
            "date": "2026-07-16",
            "text": "40 Produktseiten über Nacht gegen unsere SEO-Checkliste laufen lassen — morgens war die Liste durch. Ohne hartes Fertig-Kriterium wäre das nichts geworden.",
            "rating": 4
          }
        ],
        "featured": false,
        "badge": null,
        "source": "https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-loop",
        "installCmd": "/plugin install ralph-loop@claude-plugins-official",
        "contains": "3 Befehle — /ralph-loop:ralph-loop (Loop starten), /ralph-loop:cancel-ralph (abbrechen), /ralph-loop:help — plus der Stop-Hook, der den Loop am Laufen hält. Keine Skills, kein MCP.",
        "installDemo": [
          {"t":"user","text":"/plugin install ralph-loop@claude-plugins-official"},
          {"t":"sys","text":"Detailansicht öffnet sich: ralph-loop v1.0.0 · 3 Befehle + 1 Stop-Hook · Context cost in Tokens","pause":900},
          {"t":"sys","text":"Scope wählen: User (überall) · Project (fürs Team im Repo) · Local (nur du, nur hier)","pause":950},
          {"t":"res","html":"Installiert im Scope „User“ <span class=\"r-ok\">✓</span>","pause":700},
          {"t":"user","text":"/reload-plugins"},
          {"t":"res","html":"Plugins neu geladen <span class=\"r-ok\">✓</span>","pause":650},
          {"t":"sys","text":"Ab jetzt verfügbar: /ralph-loop:ralph-loop · /ralph-loop:cancel-ralph · /ralph-loop:help","pause":650},
          {"t":"sys","text":"Tipp: Starte den Loop nur mit messbarem Fertig-Kriterium — und setz immer --max-iterations.","pause":400}
        ]
      },

      {
        "id": "gsd",
        "itemType": "framework",
        "platforms": { "code": true, "langdock": false },
        "name": "GSD — Get Shit Done",
        "tagline": "Vom Ideensatz zum fertigen Projekt — in Phasen, mit Projektgedächtnis",
        "description": "Arbeitsweise für größere Vorhaben: GSD macht aus einer vagen Idee einen schriftlichen Projektplan mit Phasen und lässt Claude sie einzeln bauen und prüfen. Du bleibst Auftraggeber:in, nicht Programmierer:in.",
        "longDescription": "Wenn ein Tool über Tage oder Wochen wächst, vergisst eine normale Claude-Sitzung irgendwann, was ihr eigentlich baut. GSD schreibt den Projektstand in Dateien (Ordner .planning/ mit PROJECT.md, ROADMAP.md, STATE.md), die jede neue Sitzung wieder einliest — nichts geht verloren. Der Ablauf: Fragen beantworten, Phase besprechen, planen lassen, bauen lassen, im Gespräch abnehmen. Typische pilot-Fälle: Reporting-Tool fürs Team, interner Kampagnen-Kalender, Pitch-Material-Generator — alles, was mehr als einen Nachmittag braucht. Zur Ehrlichkeit beim Namen: Die bei uns installierte Variante heißt „GSD Core“ und löst das Kürzel als „Git. Ship. Done.“ auf; bekannt geworden ist die Arbeitsweise als „Get Shit Done“ — beides meint dasselbe. Für „ändere mal eben die Überschrift“ ist der Apparat zu schwer.",
        "exampleOutput": "/gsd-new-project\n\nGSD fragt: Was baust du? Für wen? Was heißt fertig?\n→ .planning/PROJECT.md — dein Projekt in deinen Worten\n→ .planning/ROADMAP.md — z. B. 3 Phasen:\n  CSV einlesen → Übersicht rendern → Kunden verwalten\n\nDanach, Phase für Phase:\n/gsd-discuss-phase 1 · /gsd-plan-phase 1 ·\n/gsd-execute-phase 1 · /gsd-verify-work 1",
        "category": "community",
        "subcategory": "bauen",
        "trigger": "/gsd-new-project",
        "author": "open-gsd (Community)",
        "version": "1.7.0",
        "addedAt": "2026-07-16",
        "updatedAt": "2026-07-16",
        "tags": ["workflow", "projekt", "bauen", "phasen", "community"],
        "useCases": ["Internes Tool, das über Wochen wächst", "Projektstand über Sitzungen hinweg behalten", "Große Idee in machbare Phasen zerlegen"],
        "difficulty": "medium",
        "timeToRun": "über mehrere Sitzungen",
        "requirements": ["Claude Code", "Git im Projekt (Claude richtet das auf Zuruf ein)", "Einmalige Einrichtung: npx @opengsd/gsd-core@latest"],
        "rating": { "average": 4.5, "count": 7 },
        "endorsedBy": ["Christopher Kipp", "Sophie Klein"],
        "endorsements": [
          {
            "name": "Christopher Kipp",
            "role": "Innovation Lead",
            "initials": "CK",
            "text": "Unser Standard für alles, was länger als einen Nachmittag dauert. Der .planning-Ordner ist das Gedächtnis, das Chat-Sitzungen nie hatten."
          },
          {
            "name": "Sophie Klein",
            "role": "Projektmanagerin",
            "initials": "SK",
            "text": "Fühlt sich an wie ein Projekt mit gutem PM: erst Anforderungen, dann Plan, dann Abnahme — nur dass Claude baut."
          }
        ],
        "comments": [
          {
            "author": "Jan Richter",
            "role": "Tech Lead & Citizen-Coding-Mentor",
            "initials": "JR",
            "date": "2026-07-16",
            "text": "Die Fragerunden am Anfang nicht abkürzen — genau da entsteht der Plan, der später trägt.",
            "rating": 4
          }
        ],
        "featured": false,
        "badge": null,
        "source": "https://github.com/open-gsd/gsd-core",
        "workflow": {
          "intro": "GSD lädst du nicht als Datei herunter — es ist eine feste Abfolge von Befehlen, mit der du Claude durch ein Projekt führst. Für den Einstieg reichen diese sechs Schritte; /gsd-help listet den Rest.",
          "note": "Technisch installierst du GSD einmalig als Werkzeugkasten (npx @opengsd/gsd-core@latest) — danach ist es eine Arbeitsweise aus Befehlen.",
          "steps": [
            { "title": "Projekt anlegen", "desc": "GSD stellt dir Fragen zu Ziel, Zielgruppe und Umfang und schreibt daraus PROJECT.md, REQUIREMENTS.md und eine ROADMAP.md mit Phasen. Antworte in deinen Worten — kein Fachjargon nötig.", "copy": "/gsd-new-project" },
            { "title": "Phase besprechen", "desc": "Bevor geplant wird, klärt GSD die offenen Punkte der ersten Phase mit dir: Was ist dir wichtig, was ist schon entschieden? Ergebnis ist eine CONTEXT.md mit euren Entscheidungen.", "copy": "/gsd-discuss-phase 1" },
            { "title": "Phase planen", "desc": "Claude erstellt einen detaillierten Bauplan (PLAN.md) für die Phase und prüft ihn selbst auf Lücken, bevor gebaut wird.", "copy": "/gsd-plan-phase 1" },
            { "title": "Phase bauen", "desc": "Claude arbeitet den Plan ab, Schritt für Schritt, mit sauberen Zwischenständen in Git.", "copy": "/gsd-execute-phase 1" },
            { "title": "Ergebnis abnehmen", "desc": "GSD führt dich durch einen Abnahmetest im Gespräch: Punkt für Punkt sagst du „funktioniert“ oder „funktioniert nicht“ — gefundene Probleme werden diagnostiziert und als Fix-Plan vorbereitet.", "copy": "/gsd-verify-work 1" },
            { "title": "Orientierung behalten", "desc": "Nach einer Pause nicht mehr sicher, wo ihr steht? Dieser Befehl zeigt Stand und nächsten Schritt. Für Phase 2 geht es dann wieder bei Schritt 2 los.", "copy": "/gsd-progress" }
          ],
          "example": {
            "title": "Mini-Beispiel: Kampagnen-Reporting statt Copy-Paste",
            "steps": [
              "Anna aus dem Media-Team will Wochen-CSVs nicht mehr per Hand in Präsentationen kopieren. /gsd-new-project — sie beschreibt: „Ein Tool, das unsere Wochen-CSVs einliest und eine HTML-Übersicht pro Kunde baut.“ GSD fragt nach (Welche Spalten? Wer schaut drauf? Lokal oder online?) — Ergebnis: eine Roadmap mit 3 Phasen.",
              "/gsd-discuss-phase 1 — Anna entscheidet: erst mal nur die Meta-Ads-CSVs; das Format legt eine Beispieldatei fest, die sie in den Projektordner legt.",
              "/gsd-plan-phase 1 und /gsd-execute-phase 1 — Claude plant und baut den CSV-Import; Anna liest zwischendurch nur die Zusammenfassungen.",
              "/gsd-verify-work 1 — GSD fragt: „Lege die Beispieldatei ab und starte das Tool — siehst du die 12 Kampagnen?“ Eine Zahl ist falsch formatiert, GSD plant den Fix, der nächste Lauf räumt ihn ab.",
              "Nächste Woche, neue Sitzung: /gsd-progress — GSD weiß noch alles und schlägt Phase 2 vor."
            ]
          },
          "pitfalls": [
            "Zu kleiner Anlass: Für Mini-Aufgaben ist der Ablauf Overkill — GSD selbst bietet dafür /gsd-quick und /gsd-fast an, oder du lässt GSD ganz weg.",
            "Fragen weggeklickt: Die Fragerunden am Anfang sind der eigentliche Wert. Wer sie mit „mach einfach“ abkürzt, bekommt einen Plan voller Annahmen.",
            "Viele Befehle: GSD bringt weit über 50 Kommandos mit. Für den Einstieg reichen die sechs oben — /gsd-help listet alles.",
            "Der Ordner .planning/ ist kein Müll, sondern das Gedächtnis des Projekts — nicht löschen."
          ]
        }
      },

      {
        "id": "test-driven-development",
        "itemType": "framework",
        "platforms": { "code": true, "langdock": false },
        "name": "Test-Driven Development (TDD)",
        "tagline": "Erst der Maßstab, dann das Werk — Claude baut, bis alle Prüfungen grün sind",
        "description": "Arbeitsweise für alles, was richtig rechnen oder prüfen muss: Du legst zuerst automatisch prüfbar fest, woran man erkennt, dass es funktioniert — und lässt Claude erst danach bauen, bis genau diese Prüfung besteht.",
        "longDescription": "Ein „Test“ ist hier kein manuelles Durchklicken, sondern ein kleines Prüfprogramm, das Claude für dich schreibt und das automatisch Rot (kaputt) oder Grün (funktioniert) meldet. Der Kern, den man nicht weglassen darf: Die Prüfung muss erst einmal scheitern (Rot), bevor gebaut wird — nur so weißt du, dass sie wirklich das Richtige prüft. Ideal, wenn dein Tool verlässlich rechnen muss (Budget-Verteilung, UTM-Links, Mediaplan-Validierung, Datumslogik) und wenn es wachsen soll, ohne dass Neues das Alte kaputt macht: Die Tests rechnen bei jeder Änderung wieder nach. Die klassische Software-Arbeitsweise (bekannt gemacht von Kent Beck, 2002) funktioniert komplett über Prompts; der Superpowers-Skill test-driven-development macht sie nur strenger. Weniger geeignet für reine Optik — Aussehen prüfst du mit den eigenen Augen.",
        "exampleOutput": "Schritt 1 — Tests zuerst, alle müssen ROT sein:\n  ✗ utm-link: Basis-Link korrekt zusammengesetzt\n  ✗ utm-link: Umlaute & Leerzeichen bereinigt\n  ✗ utm-link: Fehlermeldung bei fehlendem Namen\n\nSchritt 2 — bauen, bis alles GRÜN ist:\n  ✓ 3 von 3 Tests bestehen\n\nJede spätere Erweiterung: neuer roter Test zuerst —\ndie alten Tests laufen immer mit und schützen das Alte.",
        "category": "community",
        "subcategory": "bauen",
        "trigger": null,
        "author": "Methode: Kent Beck · Skill: obra/superpowers",
        "version": "",
        "addedAt": "2026-07-16",
        "updatedAt": "2026-07-16",
        "tags": ["qualität", "tests", "bauen", "workflow", "community"],
        "useCases": ["Rechner & Validierer verlässlich machen", "Tool erweitern, ohne Bestehendes zu brechen", "Claude-Ergebnisse nicht von Hand nachrechnen"],
        "difficulty": "medium",
        "timeToRun": "pro Kriterienrunde 15–30 Min",
        "requirements": ["Claude Code", "Konkrete Beispiele mit erwartetem Ergebnis", "Optional: Skill test-driven-development aus obra/superpowers"],
        "rating": { "average": 4.4, "count": 5 },
        "endorsedBy": ["Jan Richter"],
        "endorsements": [
          {
            "name": "Jan Richter",
            "role": "Tech Lead & Citizen-Coding-Mentor",
            "initials": "JR",
            "text": "Die Reihenfolge ist der ganze Trick: erst Rot sehen, dann bauen. Tests, die nie rot waren, beweisen nichts."
          }
        ],
        "comments": [
          {
            "author": "Lukas Weber",
            "role": "SEO Strategist",
            "initials": "LW",
            "date": "2026-07-16",
            "text": "Mein UTM-Generator läuft seit Wochen — jede Erweiterung startet mit einem roten Test, und noch nie ist ein alter Link kaputtgegangen.",
            "rating": 5
          }
        ],
        "featured": false,
        "badge": null,
        "source": "https://github.com/obra/superpowers",
        "workflow": {
          "intro": "TDD braucht keine Installation — die Arbeitsweise steckt komplett in den Prompts. Mit installiertem Superpowers-Skill wird sie strenger, weil Claude die Regeln dann selbst durchsetzt.",
          "note": "Der Kern: Die Prüfung muss erst Rot zeigen, bevor gebaut wird. Bauen und Tests hinterher schreiben beweist nur, was der Code zufällig tut.",
          "steps": [
            { "title": "Erfolgskriterien in deinen Worten festlegen", "desc": "Konkrete Beispiele mit erwartetem Ergebnis — wie eine Stichprobe für die Abnahme.", "copy": "Ich will einen UTM-Link-Generator. Bevor du irgendetwas baust: Hier sind meine Erfolgskriterien. 1) Aus \"pilot.de\", Kampagne \"sommer-sale\", Kanal \"newsletter\" muss exakt dieser Link entstehen: https://pilot.de/?utm_source=newsletter&utm_medium=email&utm_campaign=sommer-sale — 2) Umlaute und Leerzeichen im Kampagnennamen werden automatisch bereinigt. 3) Fehlt der Kampagnenname, gibt es eine Fehlermeldung statt eines halben Links." },
            { "title": "Prüfprogramm schreiben lassen — und scheitern sehen", "desc": "Claude übersetzt deine Kriterien in automatische Tests und führt sie aus, bevor es Werkzeug-Code gibt. Alle müssen Rot zeigen.", "copy": "Arbeite testgetrieben: Schreibe zuerst automatische Tests für genau diese drei Kriterien und führe sie aus. Sie müssen jetzt fehlschlagen, weil es den Generator noch nicht gibt. Zeig mir das Ergebnis, bevor du weitermachst." },
            { "title": "Bauen lassen, bis alles Grün ist", "desc": "Jetzt erst entsteht das eigentliche Tool — und zwar nur so viel, wie die Tests verlangen.", "copy": "Jetzt baue den Generator so, dass alle Tests bestehen. Führe die Tests am Ende aus und zeig mir das Ergebnis." },
            { "title": "Aufräumen lassen — bei laufenden Tests", "desc": "Bei Grün darf Claude den Code ordnen, solange alles Grün bleibt.", "copy": "Alle Tests sind grün. Räume den Code auf, ohne das Verhalten zu ändern, und führe die Tests danach noch einmal aus." },
            { "title": "Jede Erweiterung beginnt wieder bei Schritt 1", "desc": "Neues Kriterium, neuer roter Test, dann bauen. Die alten Tests laufen immer mit.", "copy": "Neues Kriterium: Der Generator soll auch utm_content unterstützen. Schreibe erst den fehlschlagenden Test dafür, dann die Umsetzung. Alle bisherigen Tests müssen weiter bestehen." }
          ],
          "example": {
            "title": "Mini-Beispiel: Mediaplan-Prüfer",
            "steps": [
              "Jonas aus dem Campaign Management bekommt Mediapläne als CSV und verliert Zeit mit Flüchtigkeitsfehlern darin. Er legt Kriterien fest: Start-/Enddatum pro Zeile, Ende nie vor Start, Budgets größer 0, Zeilensumme gleich Gesamtbudget — je Kriterium eine Beispiel-Zeile, die durchfallen soll.",
              "Claude schreibt vier Tests mit genau diesen Beispiel-Zeilen — alle Rot, denn den Prüfer gibt es noch nicht. Am roten Lauf sieht Jonas: Die Tests prüfen wirklich seine Fälle.",
              "Claude baut den Prüfer, bis alle vier Tests Grün sind.",
              "Zwei Wochen später kommt ein fünftes Kriterium dazu (Kanalnamen aus fester Liste): neuer roter Test, neue Umsetzung — die vier alten Tests garantieren, dass nichts Bestehendes bricht."
            ]
          },
          "pitfalls": [
            "Der klassische Fehler: bauen lassen und Tests hinterher schreiben. Dann bestätigen die Tests nur, was der Code zufällig tut — nicht, was du wolltest.",
            "Vage Kriterien: „Soll gut funktionieren“ kann niemand prüfen. Du brauchst konkrete Beispiele mit konkretem erwartetem Ergebnis.",
            "Zu viele Kriterien auf einmal: Lieber drei Kriterien, Grün sehen, dann die nächsten drei.",
            "Claude will abkürzen: Wenn Claude „aus Effizienz“ Code vor dem Test schreibt, freundlich zurückpfeifen — erst der fehlschlagende Test."
          ]
        }
      },

      {
        "id": "brainstorm-plan-execute",
        "itemType": "framework",
        "platforms": { "code": true, "langdock": false },
        "name": "Brainstorm → Plan → Execute",
        "tagline": "Drei Schritte von der unscharfen Idee zum abgenommenen Ergebnis",
        "description": "Arbeitsweise aus drei Superpowers-Skills: erst im Dialog klären, was du wirklich willst (Design-Dokument), dann einen kleinteiligen Bauplan schreiben, dann Punkt für Punkt abarbeiten lassen. Kein Code, bevor du das Design abgenommen hast.",
        "longDescription": "Für ein konkretes Vorhaben mittlerer Größe — ein Tool, eine Seite, ein Feature, fertig in einer Sitzung bis wenigen Tagen. Wenn deine Idee noch unscharf ist („irgendwas, das uns beim Statusreporting hilft“), stellt der Brainstorm-Schritt genau eine Frage nach der anderen, bis aus dem Bauchgefühl ein beschlossenes Design wird. Die Kette hat eine eingebaute Sperre: kein Code, bevor du das Design abgenommen hast — das steht wörtlich so im Skill („HARD-GATE“). Die drei Skills brainstorming, writing-plans und executing-plans stammen aus github.com/obra/superpowers und müssen installiert sein (einzeln aus unserem Katalog oder als superpowers-Plugin); die Skills sind Englisch, das Gespräch mit dir führt Claude trotzdem auf Deutsch. Für Mehrwochen-Projekte mit vielen Phasen ist GSD die schwerere, passendere Maschine — TDD ergänzt beide als Qualitätsregel unterwegs.",
        "exampleOutput": "1) brainstorming — eine Frage pro Nachricht:\n   \"Sollen Deadlines von Hand gepflegt werden\n    oder aus einer Datei kommen?\"\n2) Design-Dokument → du gibst frei\n   (vorher wird nicht gebaut — das Gate steckt im Skill)\n3) writing-plans — Plan in Minuten-Häppchen,\n   jedes mit eigener Erfolgskontrolle\n4) executing-plans — arbeitet ab, stoppt bei\n   Unklarheit und fragt, statt zu raten",
        "category": "community",
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
        "badge": null,
        "source": "https://github.com/obra/superpowers",
        "workflow": {
          "intro": "Drei sauber getrennte Arbeitsschritte, jeder mit eigenem Skill. Voraussetzung: die Superpowers-Skills sind installiert — einzeln aus unserem Katalog oder als superpowers-Plugin.",
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
            "Zu großes Vorhaben: Sind es in Wahrheit vier Teilprojekte, hilft der Brainstorm beim Zerlegen — dann braucht jedes seine eigene Kette (oder gleich GSD)."
          ]
        }
      }

    ];
    // Kuratiertes Spotlight: 6 Reise-Skills erzählen EINE Geschichte (Einstieg → Tool → Website → Alltag → Denken).
    // Ersetzt das gestreute featured-Flag (vorher 10/39) als Single Source of Truth fürs Hervorheben.
    const SPOTLIGHT = new Set(['erste-schritte', 'prototyp-bauen', 'webseite-bauen', 'daten-aufbereiten', 'briefing-gen', 'brainstorming']);
    // Aus der Katalog-Fläche genommen (bleiben per Deep-Link erreichbar, aber nicht mehr im Browsing):
    //  - pitch-deck: schwacher Dritter im Präsentations-Raum (0 Endorser, redundant zu pptx/slides-aus-daten)
    //  - theme-factory: echte Dublette zu brand-guidelines (Farb/Font-System anwenden), generische Themes ohne pilot-Bezug
    //  - web-artifacts-builder: einziger „advanced" mit Framework-Signal (React/shadcn) — widerspricht „nicht dev-lastig"
    const HIDDEN = new Set(['pitch-deck', 'theme-factory', 'web-artifacts-builder']);
    // Zahlen-Ehrlichkeit: sichtbare Skill-Zahl OHNE die drei HIDDEN-Einträge (aktuell 35 nach E12).
    // Einzige Quelle für alle „X Skills"-Zähler — Seiten lesen diesen Wert statt selbst
    // (und womöglich inklusive HIDDEN) zu zählen. Kein „const COUNTS" hier, damit die
    // seitenlokale COUNTS-Konstante in index.html nicht kollidiert.
    const VISIBLE_SKILL_COUNT = SKILLS.filter(s => (s.itemType || 'skill') === 'skill' && !HIDDEN.has(s.id)).length;
    // Aufgaben-Taxonomie: Themen-Tabs denken in „was will ich tun", nicht in Abteilung/Herkunft.
    // Wird nach dem Laden EINMAL auf skill.subcategory geschrieben (Single Source für Tabs/Labels/Filter).
    const TASK_GROUP = {
      'erste-schritte': 'loslegen', 'erste-automation': 'loslegen', 'brainstorming': 'loslegen',
      'prototyp-bauen': 'bauen', 'webseite-bauen': 'bauen', 'tool-teilen': 'bauen', 'frontend-design': 'bauen',
      'webaudit': 'bauen', 'systematic-debugging': 'bauen', 'verification-before-completion': 'bauen', 'skill-creator': 'bauen',
      'web-artifacts-builder': 'bauen', 'webapp-testing': 'bauen',
      'briefing-gen': 'texten', 'tonalitaets-check': 'texten', 'meeting-notes': 'texten', 'internal-comms': 'texten', 'doc-coauthoring': 'texten',
      'moodboard': 'gestalten', 'canvas-design': 'gestalten', 'brand-guidelines': 'gestalten', 'algorithmic-art': 'gestalten', 'theme-factory': 'gestalten',
      'pptx': 'praesentieren', 'xlsx': 'praesentieren', 'docx': 'praesentieren', 'pdf': 'praesentieren',
      'slides-aus-daten': 'praesentieren', 'daten-aufbereiten': 'praesentieren', 'report-summary': 'praesentieren',
      'dataviz': 'praesentieren',
      'campaign-check': 'media', 'mediaplan-audit': 'media', 'tracking-audit': 'media', 'keyword-research': 'media',
      'markt-research': 'media', 'persona-builder': 'media', 'content-recycling': 'media', 'social-kalender': 'media',
      'pitch-deck': 'praesentieren',
      // E2: Plugins & Frameworks — auch sie ordnen sich in die Aufgaben-Tabs ein
      'superpowers': 'bauen', 'ralph-loop': 'bauen', 'gsd': 'bauen', 'test-driven-development': 'bauen',
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
      'erste-schritte': 'Ich komme von Langdock und bin neu in Claude Code. Zeig mir Schritt für Schritt, wie ich starte und meinen ersten Skill nutze.',
      'pptx': 'Bau mir aus diesen Stichpunkten eine PowerPoint-Präsentation: [hier deine Inhalte einfügen]',
      'pdf': 'Lies die PDF in meinem Projektordner und fass die wichtigsten Punkte für mich zusammen.',
      'webseite-bauen': 'Bau mir eine kleine Website für [Thema] — mit [was drauf soll]. Ich kann nicht programmieren, führ mich Schritt für Schritt.',
      'slides-aus-daten': 'Mach aus der Tabelle in meinem Projektordner präsentationsreife Slides mit passenden Charts.',
      'tonalitaets-check': 'Prüf diesen Text gegen unsere Marken-Tonalität und schlag Verbesserungen vor: [Text einfügen]',
      'webaudit': 'Mach einen Audit von [URL]: UX, Performance, SEO und Barrierefreiheit — mit konkreten Empfehlungen.',
      'pitch-deck': 'Hilf mir, einen überzeugenden Pitch für [Thema/Kunde] zu strukturieren — Argumente und Storyline.',
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
      // E12: die zwei neuen Community-Skills
      'dataviz': 'Ich habe diese Daten: [Tabelle/CSV]. Welcher Diagrammtyp transportiert die Aussage [was ich zeigen will] am besten? Bau mir den Chart konsistent und farbsicher — Titel als Aussage, Achsen beschriftet, barrierefrei.',
      'webapp-testing': 'Klick mein Tool [datei.html oder URL] im echten Browser durch: Fülle [Eingaben] aus, drück [Button] und prüf, ob [erwartetes Ergebnis] herauskommt. Mach unterwegs einen Screenshot und sag mir, ob alle Flows funktionieren.',
      // E2: Nutzungs-Prompts für Plugins (nach der Installation)
      'superpowers': 'Ich habe eine Idee für ein internes Tool: [deine Idee]. Lass uns sie erst gemeinsam durchdenken, bevor du baust.',
      'frontend-design': 'Bau mir eine Landingpage für [Thema] — mit eigenständiger, hochwertiger Gestaltung statt Template-Look.',
      'skill-creator': 'Erstell mir einen Skill, der [was er können soll]. Führ mich durch die nötigen Entscheidungen.',
      'ralph-loop': '/ralph-loop:ralph-loop "Baue [Aufgabe]. Fertig, wenn [messbares Kriterium] — gib dann <promise>FERTIG</promise> aus." --completion-promise "FERTIG" --max-iterations 20'
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
        ids: ['brainstorming', 'systematic-debugging', 'verification-before-completion', 'doc-coauthoring', 'webaudit'],
        zip: 'pilot-power-paket.zip',
        title: 'pilot Power-Paket — beliebte Skills aus der Community',
        intro: 'beliebte Skills aus anthropics/skills, obra/superpowers und von pilot — gespiegelt im pilot Skill Marketplace.',
        beispiel: 'Lass uns brainstormen: ein Tool für …',
        toast: 'Power-Paket'
      }
    };
    // Wo lässt sich ein Skill ehrlich einsetzen? code = natives Zuhause (immer);
    // langdock = SKILL.md direkt als Langdock-Skill hochladbar (reine Instruktions-Skills).
    const PLATFORMS = [
      { id: 'code',     label: 'Claude Code',   short: 'Code' },
      { id: 'langdock', label: 'Langdock',      short: 'Langdock' }
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
      'pitch-deck':          ['strategie', 'pm', 'kreation'],
      'daten-aufbereiten':   ['data', 'media'],
      'report-summary':      ['data', 'media', 'pm'],
      'moodboard':           ['kreation'],
      'slides-aus-daten':    ['data', 'media', 'strategie'],
      'pptx':                ALL_ROLES,
      'xlsx':                ['data', 'media', 'pm'],
      'docx':                ['pm', 'kreation', 'strategie'],
      'pdf':                 ['data', 'media', 'pm'],
      'brand-guidelines':    ['kreation'],
      'web-artifacts-builder': ['kreation'],
      'skill-creator':       ALL_ROLES,
      'internal-comms':      ['pm', 'kreation'],
      'frontend-design':     ['kreation', 'media', 'pm'],
      'canvas-design':       ['kreation'],
      'doc-coauthoring':     ['pm', 'strategie', 'kreation', 'media'],
      'theme-factory':       ['kreation', 'strategie', 'pm'],
      'brainstorming':       ALL_ROLES,
      'systematic-debugging': ALL_ROLES,
      'verification-before-completion': ALL_ROLES,
      'dataviz':             ['data', 'media', 'strategie', 'pm'],
      'webapp-testing':      ['kreation', 'media', 'data', 'pm'],
      'algorithmic-art':     ['kreation'],
      'superpowers':         ALL_ROLES,
      'ralph-loop':          ALL_ROLES,
      'gsd':                 ALL_ROLES,
      'test-driven-development': ['data', 'media', 'pm'],
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
      { id:'pptx', name:'pptx', trigger:null, cases:[
        { label:'Pitch-Deck bauen', script:[
          {t:'user',text:'Bau ein Pitch-Deck aus diesem Konzept (konzept.md)'},
          {t:'claude',text:'Ich nutze den pptx-Skill und baue 7 Folien entlang deines Konzepts.',pause:750},
          {t:'tool',html:'<b>Read</b>(konzept.md)',pause:450},
          {t:'res',html:'52 Zeilen — Hook, Problem, Lösung, Proof, CTA',pause:650},
          {t:'tool',html:'<b>Write</b>(pitch-deck.pptx)',pause:450},
          {t:'res',html:'7 Folien · 16:9 · Sprechernotizen je Folie · <span class="r-num">99 KB</span> OOXML',pause:750},
          {t:'claude',text:'pitch-deck.pptx ist fertig — eine echte PowerPoint-Datei, direkt präsentierbar.',pause:400},
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
