---
name: grill-me
description: A relentless interview to sharpen a plan or design. Use when the user wants to stress-test their thinking before anything gets built, or uses any 'grill' trigger phrases.
trigger: /grill-me
author: Matt Pocock
license: MIT
source: https://github.com/mattpocock/skills
---

# grill-me

> Adapted from the `grill-me` and `grilling` skills by **Matt Pocock**
> (github.com/mattpocock/skills, `skills/productivity/grill-me` and
> `skills/productivity/grilling`), used under the **MIT License**. Upstream,
> `grill-me` is a three-line wrapper that starts a `grilling` session; here both
> are merged into one self-contained skill. The instructions below are his, word
> for word — only this attribution block and the German notes at the bottom were
> added.

Interview me relentlessly about every aspect of this until we reach a shared understanding. Walk down each branch of the decision tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions one at a time, waiting for feedback on each question before continuing. Asking multiple questions at once is bewildering.

If a *fact* can be found by exploring the environment (filesystem, tools, etc.), look it up rather than asking me. The *decisions*, though, are mine — put each one to me and wait for my answer.

Do not act on it until I confirm we have reached a shared understanding.

---

## Für dich, kurz auf Deutsch

Der Skill ist bewusst kurz — er ist eine Haltung, kein Ablauf. Was er bewirkt:

- **Eine Frage pro Nachricht.** Kein Fragenblock, den du nur halb beantwortest.
- **Zu jeder Frage eine Empfehlung.** Du kannst zustimmen oder widersprechen,
  statt aus dem Nichts eine Antwort erfinden zu müssen.
- **Fakten schaut Claude selbst nach.** Gefragt wirst du nur nach
  Entscheidungen — alles andere steht schon irgendwo in deinem Projektordner.
- **Gebaut wird erst nach deinem Okay.** „Wir sind durch“ sagst du, nicht Claude.

Das Gespräch führt Claude auf Deutsch, auch wenn die Anleitung oben Englisch ist.

Ein Beispiel-Interview liegt in `references/beispiel.md`.
