#!/usr/bin/env node
// Scannt skills/ und schreibt skills/manifest.json.
// Die Dateien in skills/<id>/ sind die SOURCE OF TRUTH — dieses Skript
// erzeugt sie NICHT, es listet nur, was vorhanden ist. Von Hand editierbar.
//
// Nutzung:  node build-skills.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const DIR = path.join(ROOT, 'skills');
const IGNORE_TOP = new Set(['manifest.json', 'README.md', '.DS_Store']);

// Nur lesbare Textdateien im Viewer listen (Binärdateien wie Beispiel-Office-
// Dokumente, Bilder oder Fonts bleiben im Repo, werden aber nicht angezeigt).
const TEXT_EXT = new Set([
  'md','markdown','txt','py','js','mjs','cjs','ts','tsx','jsx','json','jsonc',
  'yaml','yml','toml','ini','cfg','csv','tsv','html','htm','css','scss',
  'sh','bash','zsh','xml','svg','sql','env'
]);
const isText = name => TEXT_EXT.has((name.split('.').pop() || '').toLowerCase());
// Juristische Boilerplate nicht im Skill-Viewer zeigen
const isBoilerplate = name => /^(LICENSE|LICENCE|NOTICE|COPYING|THIRD_PARTY_NOTICES)(\.|$)/i.test(name);

function listFiles(base, rel = '') {
  const out = [];
  for (const entry of fs.readdirSync(path.join(base, rel), { withFileTypes: true })) {
    if (entry.name === '.DS_Store' || entry.name === '.git') continue;
    const r = rel ? rel + '/' + entry.name : entry.name;
    if (entry.isDirectory()) out.push(...listFiles(base, r));
    else if (isText(entry.name) && !isBoilerplate(entry.name)) out.push(r);
  }
  return out;
}

// SKILL.md immer zuerst, danach alphabetisch
function order(files) {
  return files.sort((a, b) => {
    if (a === 'SKILL.md') return -1;
    if (b === 'SKILL.md') return 1;
    return a.localeCompare(b);
  });
}

const manifest = {};
let fileCount = 0;
for (const entry of fs.readdirSync(DIR, { withFileTypes: true })) {
  if (!entry.isDirectory() || IGNORE_TOP.has(entry.name)) continue;
  const files = order(listFiles(path.join(DIR, entry.name)));
  if (!files.length) continue;
  manifest[entry.name] = files;
  fileCount += files.length;
}

fs.writeFileSync(path.join(DIR, 'manifest.json'), JSON.stringify(manifest, null, 1) + '\n');
console.log(`manifest.json: ${Object.keys(manifest).length} Skills, ${fileCount} Dateien.`);
