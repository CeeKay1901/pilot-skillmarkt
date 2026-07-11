#!/usr/bin/env node
// Erzeugt ECHTE Demo-Artefakte (keine erfundenen Zahlen):
//  - daten/: unordentliche Rohdaten -> echtes Bereinigungs-Skript -> saubere Datei + Änderungs-Log
//  - campaign-check/: Kampagnen-CSV -> echter Validator -> Report mit den tatsächlich gefundenen Fehlern
// Nutzung: node demo/build-data-artifacts.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const w = (p, c) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, c); };

/* ---------- 1) daten-aufbereiten ---------- */
const rohRows = [
  ['Datum', 'Kanal', 'Kampagne', 'Kosten', 'Klicks'],
  ['01.09.2026', 'Meta', 'Herbst Angebot', '1.200 €', '4210'],
  ['2026-09-02', 'meta', 'Herbst Angebot', '980,50 €', '3105'],
  ['01.09.2026', 'Meta', 'Herbst Angebot', '1.200 €', '4210'],   // exaktes Duplikat
  ['03.09.2026', 'Google Ads', 'Herbst Angebot', '2.340 €', '5120'],
  ['2026/09/04', 'Google Ads', 'Herbst Angebot', '1.870 €', ''],  // fehlende Klicks
  ['05.09.2026', 'TikTok', 'Herbst Angebot', '640 €', '2890'],
  ['05.09.2026', 'tiktok', 'Herbst Angebot', '640 €', '2890'],   // Duplikat nach Normalisierung
  ['', 'LinkedIn', 'Herbst Angebot', '410 €', '780'],            // fehlendes Datum
  ['07.09.2026', 'LinkedIn', 'Herbst Angebot', '1.055,20 €', '1640'],
];
const roh = rohRows.map(r => r.join(';')).join('\n') + '\n';
w(path.join(ROOT, 'daten/export_roh.csv'), roh);

// --- echtes Bereinigen ---
const normDate = s => {
  s = (s || '').trim();
  let m = s.match(/^(\d{4})[-/](\d{2})[-/](\d{2})$/);            // 2026-09-02 | 2026/09/04
  if (m) return `${m[3]}.${m[2]}.${m[1]}`;
  m = s.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  return m ? s : '';
};
const normMoney = s => {
  const t = (s || '').replace(/[€\s]/g, '').replace(/\./g, '').replace(',', '.');
  const n = parseFloat(t);
  return Number.isFinite(n) ? n.toFixed(2) : '';
};
const titleCase = s => (s || '').trim().replace(/\s+/g, ' ')
  .split(' ').map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join(' ');

const [head, ...body] = rohRows;
const log = { duplikate: 0, datum: 0, waehrung: 0, kanal: 0, luecken: [] };
const seen = new Set();
const clean = [];
body.forEach((r, i) => {
  const zeile = i + 2; // inkl. Kopfzeile
  const datumRaw = r[0], kanalRaw = r[1];
  const datum = normDate(datumRaw);
  if (datum && datum !== datumRaw) log.datum++;
  if (!datum) log.luecken.push(`Zeile ${zeile}: Datum fehlt`);
  const kanal = titleCase(kanalRaw);
  if (kanal !== kanalRaw) log.kanal++;
  const kosten = normMoney(r[3]);
  if (kosten && kosten !== r[3]) log.waehrung++;
  const klicks = (r[4] || '').trim();
  if (!klicks) log.luecken.push(`Zeile ${zeile}: Klicks fehlen`);
  const key = [datum, kanal, r[2].trim(), kosten, klicks].join('|');
  if (seen.has(key)) { log.duplikate++; return; }
  seen.add(key);
  clean.push([datum || 'FEHLT', kanal, titleCase(r[2]), kosten, klicks || 'FEHLT']);
});
w(path.join(ROOT, 'daten/daten_clean.csv'), [head.join(';'), ...clean.map(r => r.join(';'))].join('\n') + '\n');

const summe = clean.reduce((a, r) => a + (parseFloat(r[3]) || 0), 0);
w(path.join(ROOT, 'daten/aenderungen.md'), `# Änderungs-Log — \`daten-aufbereiten\`

Erzeugt von \`demo/build-data-artifacts.mjs\` aus \`export_roh.csv\`.
**Alle Zahlen unten sind vom Skript gezählt, nicht geschätzt.**

| Prüfung | Ergebnis |
|---|---|
| Zeilen vorher | ${body.length} |
| Zeilen nachher | ${clean.length} |
| Entfernte Duplikate | ${log.duplikate} |
| Vereinheitlichte Datumsformate | ${log.datum} |
| Bereinigte Währungswerte | ${log.waehrung} |
| Vereinheitlichte Kanal-Namen | ${log.kanal} |
| Gesamtkosten (bereinigt) | ${summe.toLocaleString('de-DE', { minimumFractionDigits: 2 })} € |

## Markierte Lücken (nicht geraten, nur gekennzeichnet)
${log.luecken.map(l => '- ' + l).join('\n')}

> Regel des Skills: Originaldatei nie überschreiben, nichts stillschweigend ergänzen.
`);

/* ---------- 2) campaign-check ---------- */
const kampagneRows = [
  ['anzeige', 'landingpage', 'utm_source', 'utm_medium', 'utm_campaign', 'budget_cap'],
  ['Herbst_A', 'https://example.com/herbst', 'meta', 'cpc', 'herbst_2026', '500'],
  ['Herbst_B', 'https://example.com/herbst', 'Meta', 'cpc', 'Herbst_2026', '500'],     // Casing inkonsistent
  ['Retargeting_A', 'https://example.com/herbst', 'meta', 'cpc', 'herbst_2026', ''],   // Cap fehlt
  ['Retargeting_B', 'http://example.com/404', 'meta', '', 'herbst_2026', '300'],       // medium fehlt + http
  ['Search_A', 'https://example.com/herbst', 'google', 'cpc', 'herbst_2026', '800'],
  ['Search_B', 'https://example.com/herbst', 'google', 'cpc', '', '800'],              // campaign fehlt
];
w(path.join(ROOT, 'campaign-check/kampagne.csv'), kampagneRows.map(r => r.join(';')).join('\n') + '\n');

// --- echter Validator: prüft je Anzeige, Report entsteht komplett aus den Ergebnissen ---
const [ch, ...ads] = kampagneRows;
const fehler = [], warnungen = [], ok = [], fixes = [], matrix = [];
const campaigns = new Set();
ads.forEach((r, i) => {
  const z = i + 2;
  const [anzeige, lp, src, med, camp, cap] = r.map(x => (x || '').trim());
  let utm = '✓', lpSt = '✓', capSt = '✓';
  if (!med) {
    utm = '✗';
    fehler.push(`Zeile ${z} (${anzeige}): \`utm_medium\` fehlt — Traffic wird nicht zugeordnet`);
    fixes.push(`Zeile ${z}: \`utm_medium=cpc\` ergänzen`);
  }
  if (!camp) {
    utm = '✗';
    fehler.push(`Zeile ${z} (${anzeige}): \`utm_campaign\` fehlt`);
    fixes.push(`Zeile ${z}: \`utm_campaign=herbst_2026\` ergänzen`);
  }
  if (lp.startsWith('http://')) {
    lpSt = '✗';
    fehler.push(`Zeile ${z} (${anzeige}): Landingpage nutzt unsicheres \`http://\``);
    fixes.push(`Zeile ${z}: Landingpage auf \`https://\` umstellen — und das Ziel prüfen (zeigt auf /404)`);
  }
  if (src !== src.toLowerCase()) { if (utm === '✓') utm = '⚠'; warnungen.push(`Zeile ${z} (${anzeige}): \`utm_source=${src}\` nicht kleingeschrieben`); }
  if (camp && camp !== camp.toLowerCase()) { if (utm === '✓') utm = '⚠'; warnungen.push(`Zeile ${z} (${anzeige}): \`utm_campaign=${camp}\` nicht kleingeschrieben`); }
  if (!cap) { capSt = '⚠'; warnungen.push(`Zeile ${z} (${anzeige}): kein \`budget_cap\` gesetzt`); }
  if (camp) campaigns.add(camp.toLowerCase());
  const status = [utm, lpSt, capSt].includes('✗') ? '✗ Blocker'
    : [utm, lpSt, capSt].includes('⚠') ? '⚠ prüfen' : '✓ startklar';
  if (status === '✓ startklar') ok.push(`${anzeige}: vollständig getaggt`);
  matrix.push(`| ${anzeige} | ${utm} | ${lpSt} | ${capSt} | **${status}** |`);
});
if (campaigns.size > 1) warnungen.push(`Uneinheitliche Kampagnen-Namen: ${[...campaigns].join(', ')}`);
const blockerAds = matrix.filter(m => m.includes('✗ Blocker')).length;

w(path.join(ROOT, 'campaign-check/report.md'), `# Campaign Check — \`kampagne.csv\`

**Launch-Empfehlung: ${fehler.length ? 'STOPP' : 'GO'}** — ${fehler.length
  ? `${fehler.length} Blocker in ${blockerAds} von ${ads.length} Anzeigen. Nach den ${fixes.length} Fixes unten ist das Setup startklar.`
  : `alle ${ads.length} Anzeigen sauber getaggt.`}

Erzeugt von \`demo/build-data-artifacts.mjs\`. **Alle Findings stammen aus dem tatsächlichen Validator-Lauf.**

## Status je Anzeige

| Anzeige | UTM | Landingpage | Budget-Cap | Status |
|---|---|---|---|---|
${matrix.join('\n')}

## ✗ Fehler (${fehler.length}) — blockieren den Launch
${fehler.length ? fehler.map(f => '- ' + f).join('\n') : '- keine'}

## ⚠ Warnungen (${warnungen.length})
${warnungen.length ? warnungen.map(f => '- ' + f).join('\n') : '- keine'}

## ✓ In Ordnung (${ok.length})
${ok.length ? ok.map(f => '- ' + f).join('\n') : '- keine'}

## So behebst du es — ${fixes.length} Änderungen, dann GO
${fixes.map((f, i) => `${i + 1}. ${f}`).join('\n')}

---
_Regel des Skills: ✗ = Launch-Blocker, ⚠ = Optimierung. Jeder Fund mit Fundstelle — nachprüfbar in \`kampagne.csv\`._
`);

console.log(`daten/: ${body.length} -> ${clean.length} Zeilen, ${log.duplikate} Duplikate entfernt`);
console.log(`campaign-check/: ${fehler.length} Fehler, ${warnungen.length} Warnungen, ${ok.length} ok`);
