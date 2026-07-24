# docs/ — historische Planungsdokumente

Diese Dateien beschreiben den **Ausbauplan, wie er zum jeweiligen Zeitpunkt gedacht war**. Sie sind bewusst nicht nachgepflegt und beschreiben teilweise einen überholten Stand.

**Nicht als Quelle für den Ist-Zustand verwenden.** Wer wissen will, wie die Seite heute aufgebaut ist und wie man daran arbeitet, liest [`../CLAUDE.md`](../CLAUDE.md); wer wissen will, was drin ist, liest [`../README.md`](../README.md). Der verlässlichste Beleg für den Ist-Zustand ist immer der Code selbst plus die sieben Regressionssuiten in `../tests/`.

| Datei | Beschreibt | Stand |
|---|---|---|
| `PLAN-AI-MARKETPLACE.md` | Der ursprüngliche Ausbauplan vom Einzelseiten-Prototyp zum Marktplatz, Etappen E1–E9 | 15.07.2026 |
| `PLAN-E10-ERKLAERBARKEIT-MERGE.md` | Die Zusammenlegung von Hilfe + Lernen zu `lernen-hilfe.html` | 22.07.2026 |

**Wichtigste Abweichung vom Ist-Zustand:** Beide Dokumente gehen von **acht** Einzelseiten aus. Seit dem E11-Umbau sind es **sechs** — Bibliothek und Baukasten wurden zu `vorlagen.html` verschmolzen, Hilfe und Lernen zu `lernen-hilfe.html`. Die alten Adressen leben als Weiterleitungs-Stubs in der Wurzel weiter. Auch das im Plan beschriebene „Mehr ▾"-Dropdown in der Navigation gibt es nicht mehr; die Navigation ist flach.
