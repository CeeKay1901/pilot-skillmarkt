# docs/ — Planungsdokumente

Hier liegen ausschließlich **historische Dokumente**. Seit dem 25.07.2026 gibt es **keinen aktiven Plan** mehr — der letzte, `PLAN-BIBLIOTHEK-2026-07.md`, ist mit Stufe 5 abgeschlossen. Die historischen sind bewusst nicht nachgepflegt und beschreiben teilweise einen überholten Stand.

**Nicht als Quelle für den Ist-Zustand verwenden.** Wer wissen will, wie die Seite heute aufgebaut ist und wie man daran arbeitet, liest [`../CLAUDE.md`](../CLAUDE.md); wer wissen will, was drin ist, liest [`../README.md`](../README.md). Der verlässlichste Beleg für den Ist-Zustand ist immer der Code selbst plus die elf Regressionssuiten in `../tests/`.

| Datei | Beschreibt | Stand | Status |
|---|---|---|---|
| `PLAN-BIBLIOTHEK-2026-07.md` | Bibliotheks-Umbau, Projektanweisungen, Startprojekte, Neuigkeiten — Entscheidungen aus der Fragerunde, gegen den Code nachgemessen (Messprotokoll im Anhang). **Alle sechs Stufen umgesetzt**; der Abschluss-Abschnitt hält fest, was geliefert wurde, was offen blieb und an welchen fünf Stellen der Plan selbst danebenlag | 25.07.2026 | historisch |
| `PLAN-AI-MARKETPLACE.md` | Der ursprüngliche Ausbauplan vom Einzelseiten-Prototyp zum Marktplatz, Etappen E1–E9 | 15.07.2026 | historisch |
| `PLAN-E10-ERKLAERBARKEIT-MERGE.md` | Die Zusammenlegung von Hilfe + Lernen zu `lernen-hilfe.html` | 22.07.2026 | historisch |

**Wichtigste Abweichung vom Ist-Zustand:** Beide **historischen** Dokumente gehen von **acht** Einzelseiten aus. Seit dem E11-Umbau sind es **sechs** — Bibliothek und Baukasten wurden zu `vorlagen.html` verschmolzen, Hilfe und Lernen zu `lernen-hilfe.html`. Die alten Adressen leben als Weiterleitungs-Stubs in der Wurzel weiter. Auch das im Plan beschriebene „Mehr ▾"-Dropdown in der Navigation gibt es nicht mehr; die Navigation ist flach.
