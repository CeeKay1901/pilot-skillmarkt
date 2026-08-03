# Beispiel-Ausgabe

So sieht ein typisches Gespräch mit `/grill-me` aus:

```
Du: „Wir bauen einen Kanal-Report, der sich jeden Montag
selbst aktualisiert.“

Claude: Frage 1 von vermutlich 6 — woher kommen die Zahlen?
  Meine Empfehlung: ein CSV-Export je Kanal in einem festen
  Ordner. Alles andere braucht Zugänge, die wir hier nicht haben.

Du: „Ja, CSV. Liegt schon so.“

Claude: (schaut selbst nach — 4 Dateien, uneinheitliche Spalten)
  Frage 2 — die Exporte nennen die Kosten unterschiedlich
  („Kosten“, „Spend“, „cost_eur“). Vereinheitlichen wir beim
  Einlesen oder bestehst du auf einem sauberen Export?
  Meine Empfehlung: beim Einlesen — du kommst an die Exporte
  nicht ran.

Du: „Beim Einlesen.“

Claude: Frage 3 — was passiert, wenn montags ein Export fehlt?
  Meine Empfehlung: Report trotzdem bauen, fehlenden Kanal
  sichtbar als Lücke markieren. Stillschweigend weglassen wäre
  die gefährlichere Variante.

… nach 6 Fragen:
Claude: So habe ich es verstanden: […] Passt das? Dann fange ich an.
```

Zu beachten: Claude fängt an dieser Stelle **nicht** von selbst an — er wartet
auf dein ausdrückliches Okay. Das ist der Kern des Skills.
