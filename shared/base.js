/* ============================================================
   pilot AI Marketplace — shared/base.js
   Gemeinsame Engine für alle Seiten (klassisches Script, globale
   Funktionen — kein type="module", damit onclick-Attribute im HTML
   weiter funktionieren). Extrahiert aus dem Skill-Katalog (E1).

   Einbindung (Reihenfolge!):
     <script src="data/....js"></script>
     <script src="shared/base.js"></script>
     <script> ...Seiten-Script... </script>

   Dokumentierte Verdrahtungspunkte (setzt die jeweilige Seite):

   1) Globales `state`-Objekt (const/let/var oder window.state) mit
      mindestens: { pendingRating: {}, activeSkill: null,
      activeTab: 'overview', activeFile: 0 }.
      Wird von Modal- und Rating-Engine gelesen/geschrieben.

   2) window.ModalConfig — Konfiguration der Modal-Engine:
      {
        getItem(id)        -> Item-Objekt oder null (Pflicht),
        onOpen(item)       -> z.B. History/Zuletzt-angesehen (optional),
        renderHead(item)   -> füllt #modal-name/-trigger/-meta (optional),
        renderers: { tabName: item => html, ... } (Pflicht für Tabs),
        updateURL(), pushURL() -> Deep-Link-Schreiber (optional),
        lockHash()         -> Reentranz-Guard der Seite (optional)
      }

   3) Hooks (optional):
      window.onFavoritesChanged(id, isNowFav) — nach Favoriten-Toggle
      window.onTried(id, triedList, type)     — nach „ausprobiert“

   4) window.RatingConfig (optional, E3) — seitenweiter Default-Typ der
      Rating-/Favoriten-/Tried-Engine: { type: 'prompt' } lässt alle
      Speicher-Keys ohne Parameter-Fädelei im prompt-Namespace landen
      (rate:prompt:<id>, comments:prompt:<id>, fav:prompt:<id>, …).
      Ohne RatingConfig bleibt alles beim Default 'skill' — Bestandsseiten
      (index, skills) verhalten sich byte-identisch.

   5) openSubmitFlow(config) (E3, Plan §5.4) — wiederverwendbarer
      „Einreichen“-Demo-Flow (3 Schritte + Formular + Danke-Zustand),
      ehrlich als Demo gekennzeichnet; Entwurf bleibt lokal unter
      submit:<typ>:draft. Details am Funktionskopf unten.

   localStorage (E1, typ-namespaced + Alt-Key-Kompatibilität):
      Neu:  rate:<typ>:<id>, comments:<typ>:<id>,
            fav:<typ>:<id> = '1', tried:<typ>:<id> = '1'
      Alt:  skill-rating-<id>, skill-comments-<id>,
            skill-favorites (Array), skill-tried (Array)
      Lesen bevorzugt neue Keys und fällt auf die alten zurück;
      Schreiben pflegt beide. Einmalige Migration beim Laden kopiert
      Bestandsdaten in die neuen Keys — für Bestandsnutzer geht nichts
      verloren. Unverändert bleiben seiten-spezifische Keys
      (skill-history, gs-seen, skill-annotations-*, skill-ann-author,
      skill-builder-draft).
   ============================================================ */

/* ===== LOCALSTORAGE-SCHICHT ===== */
function lsGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
function lsSet(key, val) { try { localStorage.setItem(key, val); return true; } catch (e) { return false; } }
function lsRemove(key) { try { localStorage.removeItem(key); } catch (e) {} }
function lsKeysWithPrefix(prefix) {
  const out = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.indexOf(prefix) === 0) out.push(k);
    }
  } catch (e) {}
  return out;
}

/* Einmalige Migration der Alt-Keys in die typ-namespaced Keys */
(function migrateLegacyStorage() {
  if (lsGet('mp-storage-migrated') === '1') return;
  lsKeysWithPrefix('skill-rating-').forEach(k => {
    const id = k.slice('skill-rating-'.length);
    if (lsGet('rate:skill:' + id) === null) lsSet('rate:skill:' + id, lsGet(k));
  });
  lsKeysWithPrefix('skill-comments-').forEach(k => {
    const id = k.slice('skill-comments-'.length);
    if (lsGet('comments:skill:' + id) === null) lsSet('comments:skill:' + id, lsGet(k));
  });
  try { JSON.parse(lsGet('skill-favorites') || '[]').forEach(id => lsSet('fav:skill:' + id, '1')); } catch (e) {}
  try { JSON.parse(lsGet('skill-tried') || '[]').forEach(id => lsSet('tried:skill:' + id, '1')); } catch (e) {}
  lsSet('mp-storage-migrated', '1');
})();

/* ===== NAV & FOOTER (renderNav) =====
   Header + Footer werden per JS injiziert — eine Quelle für alle Seiten.
   Die Nav führt nur zu Fertigem: Katalog, Prompts, Hilfe, Lernen. Kommende
   Sektionen (Baukasten, Showroom, Mehr) erscheinen hier erst, wenn sie
   live sind. Das Logo verlinkt auf die Startseite.
   opts (alle optional):
     sharedOnclick: { katalog: "showView('catalog')" }  — Seite ersetzt den
                    Link durch einen Button (z.B. View-Wechsel statt Reload)
     extraItems:    [{ id, label, onclick }] — seitenlokale Nav-Punkte
     search:        { id, label, placeholder } — Suchfeld im Header
     footerExtra:   [{ label, onclick }] — seitenlokale Footer-Buttons
     footerClaim:   eigener Claim-Satz im Footer */
/* Plattform-neutrales Kürzel-Label für den globalen Such-Button. Mac zeigt das
   vertraute ⌘K, alle anderen (pilot: Windows-Mehrheit) sehen „Strg K“, damit das
   Tastenkürzel nicht hinter dem Apfel-Command-Zeichen versteckt bleibt. */
function _gsShortcutLabel() {
  try {
    var p = (navigator.platform || '') + ' ' + (navigator.userAgent || '');
    if (/Mac|iPhone|iPad|iPod/i.test(p)) return '⌘K';
  } catch (e) {}
  return 'Strg K';
}

function renderNav(activePage, opts) {
  opts = opts || {};
  // Idempotent: früher injizierte Header/Footer entfernen (keine Dopplung)
  document.querySelectorAll('[data-shared-nav]').forEach(el => el.remove());

  // E6-Umbau (Plan §2.4): Mit der 5. Sektion (bibliothek.html) wird die Leiste
  // umgebaut. Primäre Direkt-Links bleiben Katalog/Prompts/Hilfe; die sekundären
  // Sektionen (Lernen, Asset-Bibliothek) wandern in ein „Mehr ▾“-Dropdown
  // (Desktop: Klick öffnet, Esc/Außenklick schließt, aria-expanded). Mobil
  // (≤1023px) lösen die CSS-Regeln das Dropdown flach in die scrollende Leiste
  // auf. HARTE REGRESSIONS-GARANTIE: nav-catalog/nav-prompts/nav-hilfe/nav-lernen
  // (+ neu nav-bibliothek) stehen IMMER im DOM (auch im geschlossenen Dropdown),
  // das aktive Item trägt class="active" + aria-current="page" + exakten Labeltext.
  const sharedItems = [
    { id: 'nav-catalog', page: 'katalog', label: 'Katalog', href: 'skills.html' },
    { id: 'nav-prompts', page: 'prompts', label: 'Prompts', href: 'prompts.html' },
    { id: 'nav-hilfe', page: 'hilfe', label: 'Hilfe', href: 'hilfe.html' }
  ];
  const sharedMoreItems = [
    { id: 'nav-lernen', page: 'lernen', label: 'Lernen', href: 'lernen.html' },
    { id: 'nav-bibliothek', page: 'bibliothek', label: 'Asset-Bibliothek', href: 'bibliothek.html' },
    { id: 'nav-baukasten', page: 'baukasten', label: 'Baukasten', href: 'baukasten.html' },
    { id: 'nav-showroom', page: 'showroom', label: 'Showroom', href: 'showroom.html' }   // E8 (additiv, 4. Mehr-Eintrag)
  ];
  // Ein Item → <a>/<button>. sharedOnclick-Fähigkeit für BEIDE Listen erhalten
  // (skills.html nutzt sharedOnclick.katalog). menuitem=true rendert die
  // Dropdown-Variante (role="menuitem") — sonst der klassische .nav-link.
  function itemToHtml(it, menuitem) {
    const active = it.page === activePage;
    const cls = 'nav-link' + (active ? ' active' : '') + (menuitem ? ' nav-more-item' : '');
    const roleAttr = menuitem ? ' role="menuitem"' : '';
    const onclick = opts.sharedOnclick && opts.sharedOnclick[it.page];
    if (onclick) return `<button type="button" class="${cls}" id="${it.id}"${roleAttr} onclick="${onclick}">${it.label}</button>`;
    return `<a class="${cls}" id="${it.id}" href="${it.href}"${roleAttr}${active ? ' aria-current="page"' : ''}>${it.label}</a>`;
  }
  const linkHtml = sharedItems.map(it => itemToHtml(it, false));
  (opts.extraItems || []).forEach(it => {
    linkHtml.push(`<button type="button" class="nav-link" id="${it.id}" onclick="${it.onclick}">${it.label}</button>`);
  });
  // „Mehr ▾“-Dropdown mit den sekundären Sektionen. Der Button bekommt aktiven
  // Look, wenn die aktive Seite in den moreItems liegt (lernen/bibliothek).
  const moreActive = sharedMoreItems.some(it => it.page === activePage);
  const moreMenuHtml = sharedMoreItems.map(it => itemToHtml(it, true)).join('\n          ');
  const moreHtml = `<div class="nav-more" data-nav-more>
        <button type="button" class="nav-link nav-more-btn${moreActive ? ' active' : ''}" id="nav-more-btn" aria-expanded="false" aria-haspopup="true" aria-controls="nav-more-menu">Mehr <span class="nav-more-caret" aria-hidden="true">▾</span></button>
        <div class="nav-more-menu" id="nav-more-menu" role="menu" aria-label="Weitere Bereiche" hidden>
          ${moreMenuHtml}
        </div>
      </div>`;
  linkHtml.push(moreHtml);

  const searchHtml = opts.search ? `
      <div class="search-wrap">
        <input type="search" id="${opts.search.id || 'search'}" aria-label="${opts.search.label || 'Suchen'}" placeholder="${opts.search.placeholder || 'Suchen …'}" autocomplete="off">
        <span class="search-hint" aria-hidden="true">Drücke <kbd>/</kbd> zum Suchen</span>
      </div>` : '';

  const headerHtml = `
  <header class="site-header" data-shared-nav>
    <div class="header-inner">
      <a class="logo" href="index.html" aria-label="Zur Startseite — pilot AI Marketplace">
        <span class="logo-mark">pilot</span>
        <span class="overline">AI Marketplace</span>
      </a>
      <nav class="main-nav" aria-label="Hauptnavigation">${linkHtml.join('\n        ')}</nav>
      <button type="button" class="nav-suche-btn" id="nav-suche-btn" aria-label="Marketplace durchsuchen (Cmd/Ctrl+K)" aria-haspopup="dialog" onclick="openGlobalSearch()">${LU.search}<span class="nav-suche-kbd" aria-hidden="true"><kbd>${_gsShortcutLabel()}</kbd></span></button>
      ${searchHtml}
    </div>
  </header>`;

  const footerExtra = (opts.footerExtra || [])
    .map(it => `<button type="button" onclick="${it.onclick}">${it.label}</button>`).join('\n          ');
  const footerHtml = `
  <footer class="site-footer" data-shared-nav>
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <span class="logo-mark">pilot</span>
          <span class="logo-sub">AI Marketplace</span>
          <p class="footer-claim">${opts.footerClaim || 'Von Piloten gebaut, von Piloten empfohlen. Ein Ort für alles, was ihr mit KI baut.'}</p>
        </div>
        <nav class="footer-nav" aria-label="Footer">
          ${footerExtra}
          <button type="button" id="footer-about" onclick="openAboutModal()">Über diese Seite</button>
          <a href="hilfe.html" id="footer-hilfe"><svg class="brand-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/></svg>Du hängst fest? Zum Hilfe-Center</a>
          <a href="https://github.com/CeeKay1901/pilot-skillmarkt" target="_blank" rel="noopener"><svg class="brand-ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>Repo auf GitHub</a>
          <a href="https://code.claude.com/docs" target="_blank" rel="noopener"><svg class="brand-ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 10.5h3v3h-3v3h-1.5v3H18v-3h-1.5v3H15v-3H9v3H7.5v-3H6v3H4.5v-3H3v-3H0v-3h3v-6h18Zm-15 0h1.5v-3H6Zm10.5 0H18v-3h-1.5z"/></svg>Claude-Code-Doku</a>
        </nav>
      </div>
      <div class="footer-legal">© 2026 pilot Agenturgruppe — AI Marketplace · Citizen Coding</div>
    </div>
  </footer>`;

  const skip = document.querySelector('.skip-link');
  if (skip) skip.insertAdjacentHTML('afterend', headerHtml);
  else document.body.insertAdjacentHTML('afterbegin', headerHtml);
  document.body.insertAdjacentHTML('beforeend', footerHtml);

  initNavMore();
  initGlobalSearch();

  // Mobile (≤1023px): die Nav ist ein horizontal scrollender Streifen mit allen
  // Sektionen flach (der „Mehr“-Button ist ausgeblendet). Ab 6 Zielen kann der
  // aktive Punkt außerhalb des Viewports starten — beim Laden mittig scrollen,
  // damit die aktuelle Seite sofort sichtbar ist. Rect-basiert (positions-agnostisch).
  if (window.matchMedia && window.matchMedia('(max-width: 1023px)').matches) {
    const nav = document.querySelector('.main-nav');
    // Nicht den ersten Treffer nehmen: der „Mehr“-Button trägt auf Sekundär-Seiten
    // ebenfalls .active, ist mobil aber display:none. Das sichtbare aktive Item wählen.
    const active = nav && [...nav.querySelectorAll('.nav-link.active')].filter(a => a.offsetParent !== null).pop();
    if (nav && active && nav.scrollWidth > nav.clientWidth + 1) {
      const navRect = nav.getBoundingClientRect();
      const aRect = active.getBoundingClientRect();
      nav.scrollLeft += (aRect.left - navRect.left) - (nav.clientWidth - aRect.width) / 2;
    }
  }
}

/* Shared Getting-Started-Toggle (E9-Angleichung). Bestandsseiten (lernen/skills/
   hilfe/prompts) definieren toggleGS seitenlokal — deren Inline-Script lädt nach
   base.js und überschreibt diese generische Variante. bibliothek/baukasten/showroom
   nutzen genau diese: klappt #gs-content auf/zu und pflegt aria-expanded. */
if (typeof window.toggleGS === 'undefined') {
  window.toggleGS = function () {
    var content = document.getElementById('gs-content');
    var btn = document.getElementById('gs-toggle-btn');
    if (!content) return;
    var isHidden = content.hidden;
    content.hidden = !isHidden;
    if (btn) btn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
  };
}

/* „Mehr ▾“-Dropdown der Hauptnav (E6): Klick togglet, Esc schließt (Fokus zurück
   auf den Button), Außenklick schließt, Pfeil-runter/-hoch bewegt in den Menü-
   punkten. Auf Mobile (≤1023px) ist der Button per CSS ausgeblendet und die
   Menüpunkte liegen flach in der Leiste — die Handler laufen dann ins Leere.
   Idempotent: die document-Listener werden nur einmal pro Seite gebunden. */
function initNavMore() {
  const btn = document.getElementById('nav-more-btn');
  const menu = document.getElementById('nav-more-menu');
  if (!btn || !menu) return;
  const isDesktop = () => !(window.matchMedia && window.matchMedia('(max-width: 1023px)').matches);
  const open = () => {
    if (!isDesktop()) return;
    menu.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
  };
  const close = (focusBtn) => {
    menu.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    if (focusBtn) btn.focus();
  };
  btn.addEventListener('click', e => {
    e.stopPropagation();
    (btn.getAttribute('aria-expanded') === 'true') ? close(false) : open();
  });
  btn.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault(); open();
      const first = menu.querySelector('.nav-more-item');
      if (first) first.focus();
    }
  });
  menu.addEventListener('keydown', e => {
    if (e.key === 'Escape') { close(true); return; }
    const items = [...menu.querySelectorAll('.nav-more-item')];
    const i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); (items[i + 1] || items[0]).focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); (items[i - 1] || btn).focus(); }
  });
  if (!document._navMoreBound) {
    document._navMoreBound = true;
    document.addEventListener('click', e => {
      const wrap = document.querySelector('[data-nav-more]');
      const m = document.getElementById('nav-more-menu');
      const b = document.getElementById('nav-more-btn');
      if (!wrap || !m || m.hidden) return;
      if (!wrap.contains(e.target)) { m.hidden = true; if (b) b.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      const m = document.getElementById('nav-more-menu');
      const b = document.getElementById('nav-more-btn');
      if (m && !m.hidden) { m.hidden = true; if (b) { b.setAttribute('aria-expanded', 'false'); b.focus(); } }
    });
  }
}

/* ===== LUCIDE-ICON-MAP (inline SVGs — statt Emojis, editorialer Look) ===== */
const LU = {
  "einstieg": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>',
  "bauen": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/></svg>',
  "media": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/></svg>',
  "content": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 21h8"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>',
  "strategy": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/></svg>',
  "data": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>',
  "automation": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>',
  "qa": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 11 2 2 4-4"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  "development": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>',
  "analytics": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
  "productivity": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/></svg>',
  "ai": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>',
  "fallback": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg>',
  "comment": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M12 8v6"/><path d="M9 11h6"/></svg>',
  "copy": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
  "link": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  "folder": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>',
  "check": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>',
  "vote": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>',
  /* E5 (Lernen) — additive Icons für Ressourcen-Typen + Meta; 'kurs' nutzt das
     vorhandene 'einstieg' (Graduation-Cap) weiter, bestehende Keys unangetastet. */
  "video": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>',
  "artikel": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>',
  "doku": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>',
  "podcast": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16.85 18.58a9 9 0 1 0-9.7 0"/><path d="M8 14a5 5 0 1 1 8 0"/><circle cx="12" cy="11" r="1"/><path d="M13 17a1 1 0 1 0-2 0l.5 4.5a.5.5 0 1 0 1 0Z"/></svg>',
  "intern": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>',
  "uhr": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  "extern": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
  /* E6 (Asset-Bibliothek) — additive Sektions-Icons; bestehende Keys unangetastet. */
  "font": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h16"/><path d="m6 16 6-12 6 12"/><path d="M8 12h8"/></svg>',
  "palette": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>',
  "iconset": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>',
  "pattern": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>',
  "brand": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>',
  "kontrast": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12z" fill="currentColor"/></svg>',
  "text-size": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 7V5H3v2"/><path d="M8.5 5v14"/><path d="M6.5 19h4"/><path d="M21 13v-2h-6v2"/><path d="M18 11v8"/><path d="M16.5 19h3"/></svg>',
  "download": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>',
  /* E7 (Baukasten) — additive Icons für Baustein-Kategorien, Sektionen und die
     Beispieldaten-Karten; bestehende Keys unangetastet. */
  "blocks": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="7" height="7" x="14" y="3" rx="1"/><path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"/></svg>',
  "layout": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
  "table": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>',
  "form": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 8h10"/><path d="M7 12h6"/><path d="M7 16h3"/></svg>',
  "chart": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><rect x="7" y="13" width="3" height="5" rx="1"/><rect x="12" y="9" width="3" height="9" rx="1"/><rect x="17" y="5" width="3" height="13" rx="1"/></svg>',
  "footer": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 15h18"/><path d="M7 19h4"/></svg>',
  "hero": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M8 14h8"/><path d="M9 17.5h6"/></svg>',
  "database": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>',
  "copy-check": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 15 2 2 4-4"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
  "file-text": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>',
  /* E8 (Showroom) — additive Icons: Hero/Marke, Ansehen/Vorschau, Reaktion,
     Story „So entstanden", Nachbauen-Brücke, Meistgewollt-Ranking. Bestehende
     Keys unangetastet; 'heart' ist zwingend neu für den Reaktions-Button. */
  "rocket": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
  "eye": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>',
  "heart": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  "sparkles": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>',
  "trophy": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
  "layout-dashboard": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>',
  /* E9 (globales Such-Overlay) — reines Lupen-Icon (NICHT 'qa', das ist Lupe-mit-Häkchen). */
  "search": '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>'
};
function subIcon(sub) {
  return LU[sub] || LU.fallback;
}

/* ===== UTILS ===== */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const months = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  return `${parseInt(parts[2])}. ${months[parseInt(parts[1])-1]} ${parts[0]}`;
}

function escHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

function animateCount(el, target, dur) {
  const start = performance && performance.now ? performance.now() : Date.now();
  function frame(now) {
    const t = Math.min(1, ((now || Date.now()) - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(eased * target);
    if (t < 1) requestAnimationFrame(frame);
    else el.textContent = target;
  }
  requestAnimationFrame(frame);
}

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; document.body.appendChild(a); a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
}

/* ===== ZIP (store-Methode, ohne Kompression) ===== */
const _crcTable = (() => { let c, t = []; for (let n = 0; n < 256; n++) { c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(bytes) { let c = 0xFFFFFFFF; for (let i = 0; i < bytes.length; i++) c = _crcTable[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
function _concat(arrs) { let len = 0; arrs.forEach(a => len += a.length); const out = new Uint8Array(len); let o = 0; for (const a of arrs) { out.set(a, o); o += a.length; } return out; }
function makeZip(entries) {
  const enc = new TextEncoder();
  const u16 = n => new Uint8Array([n & 255, (n >> 8) & 255]);
  const u32 = n => { n = n >>> 0; return new Uint8Array([n & 255, (n >> 8) & 255, (n >> 16) & 255, (n >> 24) & 255]); };
  const parts = [], central = []; let offset = 0;
  for (const e of entries) {
    const name = enc.encode(e.name), crc = crc32(e.data), size = e.data.length;
    const lh = _concat([u32(0x04034b50), u16(20), u16(0x0800), u16(0), u16(0), u16(0), u32(crc), u32(size), u32(size), u16(name.length), u16(0), name]);
    parts.push(lh, e.data);
    central.push(_concat([u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(0), u16(0), u16(0), u32(crc), u32(size), u32(size), u16(name.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset), name]));
    offset += lh.length + size;
  }
  let cdSize = 0; central.forEach(c => cdSize += c.length);
  const eocd = _concat([u32(0x06054b50), u16(0), u16(0), u16(entries.length), u16(entries.length), u32(cdSize), u32(offset), u16(0)]);
  return new Blob([...parts, ...central, eocd], { type: 'application/zip' });
}

/* ===== TOAST ===== */
let toastTimer;
function _ensureToastEl() {
  let el = document.getElementById('toast');
  if (!el && document.body) {
    el = document.createElement('div');
    el.className = 'toast';
    el.id = 'toast';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }
  return el;
}
function showToast(msg) {
  const el = _ensureToastEl();
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2500);
}

/* ===== CLIPBOARD ===== */
function fallbackCopy(text, toastMsg) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;top:-100px';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); showToast(toastMsg || ('Befehl kopiert: ' + text)); }
  catch(e) { showToast('Kopieren fehlgeschlagen'); }
  document.body.removeChild(ta);
}

function copyToClipboard(text, toastMsg) {
  const done = () => showToast(toastMsg || ('Kopiert: ' + text));
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, toastMsg));
  } else {
    fallbackCopy(text, toastMsg);
  }
}

/* Kopieren direkt von einer Karte (stoppt den Karten-Klick) */
function quickCopy(evt, text) {
  if (evt) evt.stopPropagation();
  copyToClipboard(text, 'Kopiert: ' + text);
}

/* Trigger-Befehl des offenen Modals kopieren (liest state.activeSkill) */
function copyTrigger() {
  const item = (typeof state !== 'undefined' && state) ? state.activeSkill : null;
  if (!item || !item.trigger) return;
  copyToClipboard(item.trigger, 'Befehl kopiert: ' + item.trigger);
}

/* Befehl aus der Runway kopieren + als „ausprobiert“ zählen */
function copyTriggerRunway(evt, trigger, id) {
  if (evt) evt.stopPropagation();
  const done = () => { showToast('Kopiert: ' + trigger); markTried(id); };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(trigger).then(done).catch(() => { fallbackCopy(trigger); done(); });
  } else { fallbackCopy(trigger); done(); }
}

/* ===== RATING-ENGINE (Sterne + Kommentare, typ-namespaced) ===== */
function renderStars(rating, interactive = false, skillId = null) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let html = `<span class="stars-display" role="img" aria-label="${rating.toFixed(1)} von 5 Sternen">`;
  for (let i = 1; i <= 5; i++) {
    const isFull = i <= full;
    const isHalf = !isFull && (i === full + 1 && half);
    html += `<span class="star ${isFull ? 'filled' : isHalf ? 'half' : 'empty'}" aria-hidden="true">${isFull ? '★' : '☆'}</span>`;
  }
  html += '</span>';
  return html;
}

function renderInteractiveStars(skillId) {
  const current = state.pendingRating[skillId] || getRating(skillId) || 0;
  let html = `<div class="star-input" id="star-input-${skillId}" data-current="${current}">`;
  for (let i = 1; i <= 5; i++) {
    html += `<button type="button" class="star-btn ${i <= current ? 'filled' : ''}"
      data-val="${i}"
      onmouseenter="hoverStars('${skillId}', ${i})"
      onmouseleave="resetStarHover('${skillId}')"
      onclick="setRating('${skillId}', ${i})"
      aria-label="${i} Sterne">★</button>`;
  }
  html += '</div>';
  return html;
}

function hoverStars(skillId, val) {
  const container = document.getElementById(`star-input-${skillId}`);
  if (!container) return;
  container.querySelectorAll('.star-btn').forEach((btn, i) => {
    btn.classList.toggle('filled', i < val);
  });
}

function resetStarHover(skillId) {
  const container = document.getElementById(`star-input-${skillId}`);
  if (!container) return;
  const current = parseInt(container.dataset.current) || 0;
  container.querySelectorAll('.star-btn').forEach((btn, i) => {
    btn.classList.toggle('filled', i < current);
  });
}

function setRating(skillId, stars) {
  if (!submitRating(skillId, stars)) { showToast('Konnte nicht speichern — privater Modus oder Speicher voll.'); return; }
  state.pendingRating[skillId] = stars;
  const container = document.getElementById(`star-input-${skillId}`);
  if (container) {
    container.dataset.current = stars;
    container.querySelectorAll('.star-btn').forEach((btn, i) => {
      btn.classList.toggle('filled', i < stars);
    });
  }
  const hint = document.getElementById(`rating-hint-${skillId}`);
  if (hint) hint.textContent = `Du hast ${stars} von 5 Sternen gegeben. Danke!`;
  showToast('Bewertung gespeichert ★');
}

// Das Sterne-Widget im Bewertungs-Tab heißt 'comment-<id>' (DOM-Namensraum) —
// gespeichert wird IMMER unter der echten Item-ID, sonst zählt die Bewertung nie.
function _ratingKey(skillId) { return String(skillId).replace(/^comment-/, ''); }

// Typ-Auflösung: expliziter Parameter > window.RatingConfig.type (Seiten-Default) > 'skill'.
// So bewertet prompts.html ohne Parameter-Fädelei im prompt-Namespace (E2-Lektion).
function _ratingType(t) { return t || (window.RatingConfig && window.RatingConfig.type) || 'skill'; }

function getRating(skillId, type) {
  type = _ratingType(type);
  const id = _ratingKey(skillId);
  let data = lsGet(`rate:${type}:${id}`);
  if (data === null && type === 'skill') data = lsGet(`skill-rating-${id}`);
  return data ? parseInt(data) : 0;
}

function submitRating(skillId, stars, type) {
  type = _ratingType(type);
  const id = _ratingKey(skillId);
  const ok = lsSet(`rate:${type}:${id}`, stars);
  if (type === 'skill') lsSet(`skill-rating-${id}`, stars); // Alt-Key synchron halten
  return ok;
}

function getComments(skillId, type) {
  type = _ratingType(type);
  try {
    let data = lsGet(`comments:${type}:${skillId}`);
    if (data === null && type === 'skill') data = lsGet(`skill-comments-${skillId}`);
    return data ? JSON.parse(data) : [];
  } catch(e) { return []; }
}

function _saveComments(skillId, arr, type) {
  type = _ratingType(type);
  const json = JSON.stringify(arr);
  const ok = lsSet(`comments:${type}:${skillId}`, json);
  if (type === 'skill') lsSet(`skill-comments-${skillId}`, json); // Alt-Key synchron halten
  return ok;
}

function getEffectiveRating(item) {
  const userRating = getRating(item.id);
  const userComments = getComments(item.id);
  const seed = item.rating || { average: 0, count: 0 };
  let totalSum = seed.average * seed.count;
  let totalCount = seed.count;
  userComments.forEach(c => { if (c.rating) { totalSum += c.rating; totalCount++; } });
  if (userRating > 0) { totalSum += userRating; totalCount++; }
  return { average: totalCount > 0 ? totalSum / totalCount : 0, count: totalCount };
}

// Bayes-gewichtetes Rating: dünn bewertete Items (n=2) nicht über gut belegte (n=21) heben.
// score = (n*avg + m*C) / (n + m), Prior C=4.2, Gewicht m=10.
function bayesScore(item) {
  const e = getEffectiveRating(item);
  const C = 4.2, m = 10;
  return (e.count * e.average + m * C) / (e.count + m);
}

// Ehrliche Badges: nur „Team-Favorit“ datenverdient (hohe Bewertung + genug Stimmen + Endorsements).
function itemBadge(item) {
  const e = getEffectiveRating(item);
  const endorsers = (item.endorsedBy || []).length;
  if (e.average >= 4.6 && e.count >= 12 && endorsers >= 2) return { cls: 'empfohlen', label: 'Team-Favorit' };
  return null;
}
function skillBadge(skill) { return itemBadge(skill); } // Alt-Name (Bestandsaufrufe)

function submitComment(skillId) {
  const author = document.getElementById(`comment-author-${skillId}`)?.value?.trim();
  const role = document.getElementById(`comment-role-${skillId}`)?.value?.trim();
  const text = document.getElementById(`comment-text-${skillId}`)?.value?.trim();
  const ratingVal = state.pendingRating[`comment-${skillId}`] || 0;

  if (!author || !text) {
    showToast('Bitte Name und Kommentar ausfüllen.');
    document.getElementById(`comment-${!author ? 'author' : 'text'}-${skillId}`)?.focus();
    return;
  }

  const comment = {
    author, role: role || 'Pilot', initials: getInitials(author),
    date: new Date().toISOString().slice(0,10),
    text, rating: ratingVal || null
  };

  const existing = getComments(skillId);
  existing.unshift(comment);
  if (!_saveComments(skillId, existing)) { showToast('Konnte nicht speichern — privater Modus oder Speicher voll.'); return; }
  // Die Sterne wandern mit in den Kommentar — Einzel-Bewertung löschen, sonst zählt sie doppelt
  if (ratingVal) {
    const _t = _ratingType();
    lsRemove(`rate:${_t}:${skillId}`);
    if (_t === 'skill') lsRemove(`skill-rating-${skillId}`); // Alt-Key nur im skill-Namespace
  }
  delete state.pendingRating[`comment-${skillId}`];
  showToast('Kommentar gespeichert ✓ (nur auf diesem Gerät)');
  switchTab('ratings');
}

function deleteComment(skillId, idx) {
  if (!confirm('Deinen Kommentar wirklich löschen?')) return;
  const existing = getComments(skillId);
  const removed = existing.splice(idx, 1)[0];
  if (!_saveComments(skillId, existing)) { showToast('Konnte nicht speichern — privater Modus oder Speicher voll.'); return; }
  // Hing eine Sternebewertung am Kommentar, zählt sie nicht mehr mit
  showToast(removed && removed.rating ? 'Kommentar & Bewertung gelöscht' : 'Kommentar gelöscht');
  switchTab('ratings');
}

/* ===== FAVORITEN & „AUSPROBIERT“ (typ-namespaced: fav:<typ>:<id>) ===== */
function getFavorites(type) {
  type = _ratingType(type);
  const prefix = `fav:${type}:`;
  const ids = lsKeysWithPrefix(prefix).map(k => k.slice(prefix.length));
  if (type === 'skill') { // Alt-Key weiterlesen (Bestandsnutzer)
    try { JSON.parse(lsGet('skill-favorites') || '[]').forEach(id => { if (!ids.includes(id)) ids.push(id); }); } catch (e) {}
  }
  return ids;
}
function isFavorite(id, type) { return getFavorites(type).includes(id); }
function toggleFavorite(evt, id, type) {
  type = _ratingType(type);
  if (evt) evt.stopPropagation();
  const wasFav = isFavorite(id, type);
  if (wasFav) { lsRemove(`fav:${type}:${id}`); showToast('Aus Favoriten entfernt'); }
  else { lsSet(`fav:${type}:${id}`, '1'); showToast('Zu Favoriten hinzugefügt ★'); }
  if (type === 'skill') { // Alt-Key synchron halten
    try {
      let favs = JSON.parse(lsGet('skill-favorites') || '[]');
      favs = wasFav ? favs.filter(f => f !== id) : (favs.includes(id) ? favs : favs.concat([id]));
      lsSet('skill-favorites', JSON.stringify(favs));
    } catch (e) {}
  }
  if (typeof window.onFavoritesChanged === 'function') window.onFavoritesChanged(id, !wasFav);
}

function getTried(type) {
  type = _ratingType(type);
  const prefix = `tried:${type}:`;
  const ids = lsKeysWithPrefix(prefix).map(k => k.slice(prefix.length));
  if (type === 'skill') { // Alt-Key weiterlesen (Bestandsnutzer)
    try { JSON.parse(lsGet('skill-tried') || '[]').forEach(id => { if (!ids.includes(id)) ids.push(id); }); } catch (e) {}
  }
  return ids;
}
function markTried(id, type) {
  type = _ratingType(type);
  const t = getTried(type);
  if (t.includes(id)) return;
  t.push(id);
  lsSet(`tried:${type}:${id}`, '1');
  if (type === 'skill') lsSet('skill-tried', JSON.stringify(t)); // Alt-Key synchron halten
  if (typeof window.onTried === 'function') window.onTried(id, t, type);
}

/* ===== VOTE-HELFER (E4): „Hat mir geholfen“ =====
   Binär und togglebar — bewusst GETRENNT von der Sterne-Engine (ein Upvote
   ist kein Rating, kein Durchschnitt, kein Formular). Keys: vote:<typ>:<id>;
   der Typ wird IMMER explizit übergeben (kein RatingConfig-Default, weil auf
   dem Hilfe-Center drei Typen nebeneinander leben: befehl, begriff, faq).
   Anzeige-Summe = Seed aus den Daten + eigene Stimme. */
function hasVoted(type, id) { return lsGet(`vote:${type}:${id}`) === '1'; }
function getVotes(type, id, seed) { return (seed || 0) + (hasVoted(type, id) ? 1 : 0); }
function toggleVote(type, id) {
  const now = !hasVoted(type, id);
  if (now) lsSet(`vote:${type}:${id}`, '1'); else lsRemove(`vote:${type}:${id}`);
  return now;
}

/* ===== SUCH-/FILTER-HELFER ===== */
// Edit-Distanz ≤1: ein Tippfehler (ersetzt/fehlt/zu viel) oder ein Buchstabendreher
function dist1(a, b) {
  if (a === b) return true;
  const la = a.length, lb = b.length;
  if (Math.abs(la - lb) > 1) return false;
  if (la === lb) {
    const diff = [];
    for (let i = 0; i < la; i++) if (a[i] !== b[i]) { diff.push(i); if (diff.length > 2) return false; }
    if (diff.length === 1) return true;
    return diff.length === 2 && diff[1] === diff[0] + 1 && a[diff[0]] === b[diff[1]] && a[diff[1]] === b[diff[0]];
  }
  const l = la > lb ? a : b, s = la > lb ? b : a;
  let i = 0, j = 0, skipped = false;
  while (i < l.length && j < s.length) {
    if (l[i] === s[j]) { i++; j++; }
    else { if (skipped) return false; skipped = true; i++; }
  }
  return true;
}

// Trefferstärke eines Items für die Suchbegriffe (0 = kein Treffer).
// Exakter Substring zählt doppelt, Tippfehler-Treffer (ab 4 Zeichen) einfach.
// fieldsOpt: eigene [[text, gewicht], …]-Liste (sonst Skill-Felder als Default).
function searchScore(item, terms, fieldsOpt) {
  const fields = fieldsOpt || [
    [item.name, 5], [item.trigger || '', 4], [(item.tags || []).join(' '), 3],
    [item.tagline || '', 2], [(item.useCases || []).join(' '), 2],
    [item.description || '', 1], [item.longDescription || '', 1]
  ];
  let total = 0;
  for (const t of terms) {
    let best = 0;
    for (const [txt, w] of fields) {
      const lower = txt.toLowerCase();
      if (lower.includes(t)) { best = Math.max(best, w * 2); continue; }
      if (t.length >= 4 && w > best) {
        for (const word of lower.split(/[^a-zäöüß0-9-]+/)) {
          // Tippfehler-Toleranz ODER Kompositum („kundenbriefing“ enthält „briefing“)
          if ((word.length >= 3 && dist1(word, t)) || (word.length >= 5 && t.includes(word))) { best = Math.max(best, w); break; }
        }
      }
    }
    if (!best) return 0;
    total += best;
  }
  return total;
}

/* ===== MODAL-ENGINE (parametrisiert über window.ModalConfig) ===== */
function openModal(id, opts) {
  const conf = window.ModalConfig || {};
  const _openOpts = opts || {};
  window._modalOpener = document.activeElement;
  const item = conf.getItem ? conf.getItem(id) : null;
  if (!item) return;
  state.activeSkill = item;
  state.activeTab = 'overview';
  state.activeFile = 0;
  state._files = null; state._filesId = null;
  if (conf.onOpen) conf.onOpen(item);
  if (conf.renderHead) conf.renderHead(item);

  // Tabs zurücksetzen
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === 'overview');
  });

  renderModalBody();
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  if (_openOpts.fromHash) { if (conf.updateURL) conf.updateURL(); }
  else if (conf.pushURL) conf.pushURL();
  setTimeout(() => { const closeBtn = document.querySelector('.modal-close'); if (closeBtn) closeBtn.focus(); }, 50);
}

function closeModal() {
  const ov = document.getElementById('modal-overlay');
  if (!ov || !ov.classList.contains('open')) return; // ohne offenes Modal keine History-Einträge
  ov.classList.remove('open');
  document.body.style.overflow = '';
  state.activeSkill = null; state._pendingAnn = null;
  if (location.hash) {
    const conf = window.ModalConfig || {};
    if (conf.lockHash) conf.lockHash();
    // replaceState: Schließen darf keinen History-Eintrag anhängen, sonst
    // öffnet „Zurück“ das gerade geschlossene Modal wieder (Back-Falle)
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
  }
  if (window._modalOpener) { window._modalOpener.focus(); window._modalOpener = null; }
}

function switchTab(tab) {
  const conf = window.ModalConfig || {};
  state.activeTab = tab;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
    btn.setAttribute('aria-selected', btn.dataset.tab === tab ? 'true' : 'false');
  });
  renderModalBody();
  // neuer Tab startet oben, nicht auf der alten Scroll-Position
  document.getElementById('modal')?.scrollTo({ top: 0 });
  // auf Mobile: aktiven Tab in die wischbare Leiste holen
  document.querySelector('.modal-tabs .tab-btn.active')?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  if (conf.updateURL) conf.updateURL();
}

function renderModalBody() {
  const conf = window.ModalConfig || {};
  const item = state.activeSkill;
  if (!item) return;
  const body = document.getElementById('modal-body');
  const renderer = conf.renderers && conf.renderers[state.activeTab];
  if (body && renderer) body.innerHTML = renderer(item);
  _syncTabPanelAria();
}

/* E9 · Modal-ARIA-Fix (additiv, nicht-destruktiv): role="tab"-Buttons brauchen
   aria-controls="modal-body"; #modal-body wird role="tabpanel" + aria-labelledby=<aktive
   Tab-id>. IDs werden zur Laufzeit gesetzt (kein Seiten-HTML-Edit). Die aria-selected-
   Logik in switchTab/openModal bleibt unberührt. */
function _syncTabPanelAria() {
  const btns = document.querySelectorAll('.tab-btn');
  btns.forEach(btn => {
    if (!btn.id && btn.dataset && btn.dataset.tab) btn.id = 'tab-btn-' + btn.dataset.tab;
    btn.setAttribute('aria-controls', 'modal-body');
  });
  const body = document.getElementById('modal-body');
  if (body) {
    body.setAttribute('role', 'tabpanel');
    const act = document.querySelector('.tab-btn.active');
    if (act && act.id) body.setAttribute('aria-labelledby', act.id);
  }
}

/* Overlay-Klick, Esc und Tab-Fokus-Falle — einmal pro Seite binden */
function initModalEngine() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay && !overlay._baseBound) {
    overlay._baseBound = true;
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal();
    });
  }
  if (!document._baseModalKeysBound) {
    document._baseModalKeysBound = true;
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        // nur schließen, wenn wirklich ein Modal offen ist (sonst wächst die History)
        if (document.getElementById('modal-overlay')?.classList.contains('open')) closeModal();
        return;
      }
      // Focus trap im Modal
      const ov = document.getElementById('modal-overlay');
      if (e.key === 'Tab' && ov && ov.classList.contains('open')) {
        const modal = document.getElementById('modal');
        const focusable = modal ? [...modal.querySelectorAll('button, input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])')] : [];
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }
}

/* Mobile: Swipe-down auf dem Modal-Kopf schließt (Standard-Geste) */
function initModalSwipe() {
  const modal = document.getElementById('modal');
  const header = modal && modal.querySelector('.modal-header');
  if (!header) return;
  let startY = null, dy = 0;
  header.addEventListener('touchstart', e => {
    if (window.innerWidth > 1023) return;
    startY = e.touches[0].clientY; dy = 0;
    modal.style.transition = 'none';
  }, { passive: true });
  header.addEventListener('touchmove', e => {
    if (startY === null) return;
    dy = e.touches[0].clientY - startY;
    if (dy > 0) modal.style.transform = `translateY(${dy}px)`;
  }, { passive: true });
  const end = () => {
    if (startY === null) return;
    modal.style.transition = '';
    modal.style.transform = '';
    if (dy > 110) closeModal();
    startY = null; dy = 0;
  };
  header.addEventListener('touchend', end);
  header.addEventListener('touchcancel', end);
}

/* ===== MARKDOWN-/CSV-RENDERER (Datei-Vorschau) ===== */
function mdInline(s) {
  return escHtml(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}
function mdBlocks(md) {
  const out = [];
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  let i = 0;
  // push nachdem i HINTER den Block gewandert ist: i (0-basiert, exklusiv) = letzte Zeile 1-basiert
  const push = (html, s) => out.push({ html, start: s + 1, end: i });
  // YAML-Frontmatter als Metadaten-Block zeigen statt als kaputtes Markdown
  if (lines[0] === '---') {
    let j = 1; while (j < lines.length && lines[j] !== '---') j++;
    if (j < lines.length) {
      const fm = lines.slice(1, j).map(l => escHtml(l).replace(/^(\w[\w-]*):/, '<b>$1</b>:')).join('\n');
      i = j + 1;
      out.push({ html: `<div class="pv-fm"><span class="pv-fm-label">Metadaten (Frontmatter)</span>${fm}</div>`, start: 1, end: i });
    }
  }
  while (i < lines.length) {
    const l = lines[i], s = i;
    if (/^```/.test(l)) { const buf = []; i++; while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]); i = Math.min(i + 1, lines.length);
      push('<pre><code>' + escHtml(buf.join('\n')) + '</code></pre>', s); continue; }
    if (/^\s*\|/.test(l) && /^\s*\|[\s:-]+\|/.test(lines[i + 1] || '')) {
      const cells = r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
      const head = cells(l); i += 2; const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(cells(lines[i++]));
      push('<table><thead><tr>' + head.map(h => '<th>' + mdInline(h) + '</th>').join('') + '</tr></thead><tbody>' +
        rows.map(r => '<tr>' + r.map(c => '<td>' + mdInline(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table>', s); continue; }
    if (/^>\s?/.test(l)) { const buf = []; while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ''));
      push('<blockquote>' + buf.filter(Boolean).map(x => '<p>' + mdInline(x) + '</p>').join('') + '</blockquote>', s); continue; }
    if (/^\s*[-*]\s+/.test(l)) { const buf = []; while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) buf.push(lines[i++].replace(/^\s*[-*]\s+/, ''));
      push('<ul>' + buf.map(x => '<li>' + mdInline(x) + '</li>').join('') + '</ul>', s); continue; }
    if (/^\s*\d+\.\s+/.test(l)) { const buf = []; while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) buf.push(lines[i++].replace(/^\s*\d+\.\s+/, ''));
      push('<ol>' + buf.map(x => '<li>' + mdInline(x) + '</li>').join('') + '</ol>', s); continue; }
    const h = l.match(/^(#{1,4})\s+(.*)$/);
    if (h) { i++; push(`<h${h[1].length}>` + mdInline(h[2]) + `</h${h[1].length}>`, s); continue; }
    if (/^\s*---+\s*$/.test(l)) { i++; push('<hr>', s); continue; }
    if (!l.trim()) { i++; continue; }
    const buf = []; while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|>|\s*[-*]\s|\s*\d+\.\s|```|\s*\|)/.test(lines[i])) buf.push(lines[i++]);
    push('<p>' + mdInline(buf.join(' ')) + '</p>', s);
  }
  return out;
}
// CSV → Tabelle; jede Datenzeile kennt ihre Quellzeile und ist damit kommentierbar
function csvTable(text, lineHasAnn) {
  const rawLines = text.replace(/\r\n/g, '\n').split('\n');
  const rows = [];
  rawLines.forEach((l, idx) => { if (l.trim()) rows.push({ l, n: idx + 1 }); });
  if (!rows.length) return '<p>— leere Datei —</p>';
  const first = rows[0].l;
  const delim = (first.match(/;/g) || []).length >= (first.match(/,/g) || []).length ? ';' : ',';
  const cells = l => { const out = []; let cur = '', q = false;
    for (const ch of l) { if (ch === '"') q = !q; else if (ch === delim && !q) { out.push(cur); cur = ''; } else cur += ch; }
    out.push(cur); return out.map(c => c.trim()); };
  const head = cells(rows[0].l);
  const body = rows.slice(1).map(r => {
    const c = cells(r.l);
    return `<tr data-ls="${r.n}"${lineHasAnn && lineHasAnn[r.n] ? ' class="has-ann"' : ''} title="Zeile ${r.n} kommentieren">`
      + head.map((_, ci) => '<td>' + (c[ci] !== undefined && c[ci] !== '' ? escHtml(c[ci]) : '<span class="csv-empty">—</span>') + '</td>').join('') + '</tr>';
  }).join('');
  return `<p class="csv-meta">${rows.length - 1} Datenzeilen · ${head.length} Spalten · Trennzeichen <code>${escHtml(delim)}</code></p>`
    + `<table><thead><tr>${head.map(h => '<th>' + escHtml(h) + '</th>').join('')}</tr></thead><tbody>${body}</tbody></table>`;
}

/* ===== MINI-SYNTAX-HIGHLIGHTER (Markdown/YAML/JS/Python) ===== */
function highlightCode(code, lang) {
  let h = escHtml(code);
  if (lang === 'markdown') {
    h = h.split('\n').map(line => {
      if (/^---$/.test(line)) return `<span class="tk-fence">${line}</span>`;
      if (/^#{1,6}\s/.test(line)) return `<span class="tk-h">${line}</span>`;
      if (/^\s*[-*]\s/.test(line)) return line.replace(/^(\s*[-*]\s)/, '<span class="tk-b">$1</span>');
      if (/^\s*\d+\.\s/.test(line)) return line.replace(/^(\s*\d+\.\s)/, '<span class="tk-b">$1</span>');
      if (/^[a-zA-Z_]+:\s/.test(line)) return line.replace(/^([a-zA-Z_]+)(:)/, '<span class="tk-k">$1</span>$2');
      if (/^```/.test(line)) return `<span class="tk-fence">${line}</span>`;
      return line;
    }).join('\n');
    // inline code + bold
    h = h.replace(/`([^`\n]+)`/g, '<span class="tk-code">`$1`</span>');
  } else if (lang === 'javascript' || lang === 'python') {
    h = h.split('\n').map(line => {
      const cm = line.match(/^(\s*)(\/\/.*|#.*)$/);
      if (cm) return `${cm[1]}<span class="tk-fence">${cm[2]}</span>`;
      let l = line.replace(/(\/\/.*$)/, '<span class="tk-fence">$1</span>');
      l = l.replace(/&#039;[^&]*?&#039;|&quot;[^&]*?&quot;/g, m => `<span class="tk-code">${m}</span>`);
      l = l.replace(/\b(function|const|let|var|return|if|else|for|forEach|def|import|from|new|null|true|false)\b/g, '<span class="tk-k">$1</span>');
      return l;
    }).join('\n');
  }
  return h;
}

/* ===== TERMINAL-/PLAYSCRIPT-ENGINE =====
   targets (optional): { body: Element, actions: Element|null } —
   ohne targets greifen die Explainer-Container (#ex-terminal-body, #demo-actions). */
let _termTimer = null;
function stopTermScript() {
  if (_termTimer) { clearTimeout(_termTimer); _termTimer = null; }
}
function playScript(script, artifact, targets) {
  const t = targets || {};
  const body = t.body || document.getElementById('ex-terminal-body');
  if (!body) return;
  stopTermScript();
  body.innerHTML = '';
  const actions = ('actions' in t) ? t.actions : document.getElementById('demo-actions');
  if (actions) actions.innerHTML = '';
  const showArtifact = () => {
    if (!actions) return;
    const list = (artifact && artifact.artifacts) || [];
    if (!list.length) { actions.innerHTML = ''; return; }
    const btns = list.map(a => {
      const isFile = a.kind === 'file';
      const cls = isFile ? 'c-cta -yellow-border demo-artifact' : 'c-cta -yellow-bg demo-artifact';
      const dl = isFile ? ' download' : ' target="_blank" rel="noopener"';
      return `<a class="${cls}" href="${a.href}"${dl}>${isFile ? '⬇' : '▸'} ${escHtml(a.label)}</a>`;
    }).join('');
    const note = artifact.note ? `<span class="demo-artifact-note">${escHtml(artifact.note)}</span>` : '';
    actions.innerHTML = btns + note;
  };
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { script.forEach(l => appendTermLine(body, l, l.text)); showArtifact(); return; }
  let i = 0;
  (function next() {
    if (i >= script.length) { _termTimer = setTimeout(showArtifact, 250); return; }
    const line = script[i];
    const el = appendTermLine(body, line, '');
    body.scrollTop = body.scrollHeight;
    if (line.t === 'user') {
      typeText(el, line, line.text, 0, () => { i++; _termTimer = setTimeout(next, 450); });
    } else {
      setTermContent(el, line, line.text); i++;
      _termTimer = setTimeout(next, line.pause || (line.text ? 520 : 180));
    }
  })();
}
function appendTermLine(body, line, initial) {
  const el = document.createElement('div');
  const known = { user:1, claude:1, tool:1, res:1, hl:1, sys:1 };
  el.className = 'ex-t-' + (known[line.t] ? line.t : 'sys');
  setTermContent(el, line, initial);
  body.appendChild(el);
  return el;
}
function setTermContent(el, line, text) {
  if (line.t === 'user') {
    el.innerHTML = `<span class="ex-term-prompt">›</span>${escHtml(text)}<span class="ex-cursor"></span>`;
  } else if (line.t === 'tool' || line.t === 'res') {
    // Tool-Call / Ergebnis: fest kodiertes HTML aus den Daten (kein User-Input)
    el.innerHTML = line.html || '';
  } else {
    el.textContent = text; // claude, sys, hl
  }
}
function typeText(el, line, full, idx, done) {
  if (idx > full.length) { done(); return; }
  el.innerHTML = `<span class="ex-term-prompt">›</span>${escHtml(full.slice(0, idx))}<span class="ex-cursor"></span>`;
  _termTimer = setTimeout(() => typeText(el, line, full, idx + 1, done), 28);
}

/* ===== „EINREICHEN“-DEMO-FLOW (openSubmitFlow, Plan §5.4) =====
   Wiederverwendbarer Baustein für alle Sektionen (Prompts, Hilfe, Lernen,
   Baukasten, Showroom …): erklärt in drei Schritten, wie ein Beitrag den
   Weg in den Katalog finden würde, nimmt einen Entwurf im Formular an und
   endet in einem Danke-Zustand. EHRLICH gekennzeichnete Demo: der Entwurf
   bleibt lokal im Browser (localStorage submit:<typ>:draft), es wird
   nichts gesendet.

   openSubmitFlow(config):
     type         Pflicht — Draft-Namespace, z. B. 'prompt' (submit:prompt:draft)
     title        Dialog-Überschrift (Default 'Beitrag einreichen')
     intro        Satz über dem Formular (optional)
     steps        eigene [{ label, text }] statt der 3 Standard-Schritte (optional)
     fields       Pflicht — [{ key, label, type: 'text'|'textarea'|'select',
                  placeholder, options, required, value, hint }]
                  `value` befüllt nur Felder, für die noch kein Draft existiert.
     submitLabel  Beschriftung des Absende-Knopfs (Default 'Entwurf einreichen (Demo)')
     thanksText   eigener Danke-Satz (optional)
     onSubmitted(values)  Hook nach dem Absenden (optional)

   Styling: .sf-*-Komponenten in shared/base.css. */
let _submitFlowConfig = null;
let _submitFlowOpener = null;

function _submitDraftKey(type) { return `submit:${type}:draft`; }
function getSubmitDraft(type) {
  try { return JSON.parse(lsGet(_submitDraftKey(type)) || '{}') || {}; } catch (e) { return {}; }
}
function _saveSubmitDraft(type, vals) { lsSet(_submitDraftKey(type), JSON.stringify(vals)); }

function _ensureSubmitOverlay() {
  let ov = document.getElementById('submit-overlay');
  if (ov) return ov;
  ov = document.createElement('div');
  ov.className = 'sf-overlay';
  ov.id = 'submit-overlay';
  ov.innerHTML = `
    <div class="sf-modal" role="dialog" aria-modal="true" aria-labelledby="sf-title">
      <div class="sf-header">
        <h2 id="sf-title"></h2>
        <button type="button" class="sf-close" onclick="closeSubmitFlow()" aria-label="Einreichen-Dialog schließen">✕</button>
      </div>
      <div class="sf-body" id="sf-body"></div>
    </div>`;
  document.body.appendChild(ov);
  ov.addEventListener('click', e => { if (e.target === ov) closeSubmitFlow(); });
  if (!document._sfKeyBound) {
    document._sfKeyBound = true;
    document.addEventListener('keydown', e => {
      const open = document.getElementById('submit-overlay')?.classList.contains('open');
      if (!open) return;
      if (e.key === 'Escape') { e.stopPropagation(); closeSubmitFlow(); return; }
      // Fokus-Falle im Einreichen-Dialog
      if (e.key === 'Tab') {
        const dlg = document.querySelector('#submit-overlay .sf-modal');
        const focusable = dlg ? [...dlg.querySelectorAll('button, input, textarea, select, a[href]')] : [];
        if (!focusable.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }, true); // capture: läuft VOR dem Modal-Esc-Handler der Engine
  }
  return ov;
}

const _SF_DEFAULT_STEPS = [
  { label: 'Entwurf ins Formular', text: 'Du beschreibst deinen Beitrag direkt hier — kein Ticket, kein Umweg.' },
  { label: 'Kurz-Check durchs Team', text: 'Die Redaktion liest gegen: Funktioniert es? Ist es verständlich? Fehlt was?' },
  { label: 'Erscheint im Katalog', text: 'Dein Beitrag geht live — mit deinem Namen dran.' }
];

function _sfStepsHtml(steps, doneFirst) {
  return `
    <p class="sf-steps-label">So würde dein Beitrag den Weg in den Katalog finden</p>
    <ol class="sf-steps">
      ${steps.map((s, i) => `
        <li class="sf-step${doneFirst && i === 0 ? ' -done' : ''}">
          <span class="sf-step-num">${doneFirst && i === 0 ? '✓' : i + 1}</span>
          <span class="sf-step-body"><strong>${escHtml(s.label)}</strong><span>${escHtml(s.text)}</span></span>
        </li>`).join('')}
    </ol>`;
}

function _sfFieldHtml(conf, f) {
  const draft = getSubmitDraft(conf.type);
  const v = draft[f.key] !== undefined ? String(draft[f.key]) : String(f.value || '');
  const id = `sf-field-${f.key}`;
  const req = f.required ? ' <span class="sf-req" aria-hidden="true">*</span>' : '';
  const on = `oninput="_submitFlowInput('${f.key}', this.value)"`;
  let control;
  if (f.type === 'select') {
    control = `<select id="${id}" data-sf-key="${f.key}"${f.required ? ' required' : ''} onchange="_submitFlowInput('${f.key}', this.value)">
      <option value="">— bitte wählen —</option>
      ${(f.options || []).map(o => `<option value="${escHtml(o)}"${o === v ? ' selected' : ''}>${escHtml(o)}</option>`).join('')}
    </select>`;
  } else if (f.type === 'textarea') {
    control = `<textarea id="${id}" data-sf-key="${f.key}" rows="4" placeholder="${escHtml(f.placeholder || '')}"${f.required ? ' required' : ''} ${on}>${escHtml(v)}</textarea>`;
  } else {
    control = `<input type="text" id="${id}" data-sf-key="${f.key}" value="${escHtml(v)}" placeholder="${escHtml(f.placeholder || '')}"${f.required ? ' required' : ''} ${on}>`;
  }
  return `
    <div class="sf-field">
      <label for="${id}">${escHtml(f.label)}${req}</label>
      ${control}
      ${f.hint ? `<p class="sf-hint">${escHtml(f.hint)}</p>` : ''}
    </div>`;
}

function openSubmitFlow(config) {
  if (!config || !config.type || !config.fields) return;
  _submitFlowConfig = config;
  _submitFlowOpener = document.activeElement;
  const ov = _ensureSubmitOverlay();
  document.getElementById('sf-title').textContent = config.title || 'Beitrag einreichen';
  const steps = config.steps || _SF_DEFAULT_STEPS;
  document.getElementById('sf-body').innerHTML = `
    <p class="sf-demo-note">${LU.check} Demo — deine Eingabe bleibt lokal in deinem Browser, es wird nichts gesendet.</p>
    ${_sfStepsHtml(steps, false)}
    ${config.intro ? `<p class="sf-intro">${escHtml(config.intro)}</p>` : ''}
    <form class="sf-form" onsubmit="event.preventDefault(); submitFlowSend();">
      ${config.fields.map(f => _sfFieldHtml(config, f)).join('')}
      <div class="sf-actions">
        <button type="submit" class="c-cta -yellow-bg">${escHtml(config.submitLabel || 'Entwurf einreichen (Demo)')}</button>
        <button type="button" class="c-cta -black-border" onclick="closeSubmitFlow()">Abbrechen</button>
      </div>
    </form>`;
  ov.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => { document.querySelector('#submit-overlay .sf-close')?.focus(); }, 50);
}

function _submitFlowInput(key, value) {
  if (!_submitFlowConfig) return;
  const vals = getSubmitDraft(_submitFlowConfig.type);
  if (value && value.trim()) vals[key] = value; else delete vals[key];
  _saveSubmitDraft(_submitFlowConfig.type, vals);
}

function submitFlowSend() {
  const conf = _submitFlowConfig;
  if (!conf) return;
  // Pflichtfelder prüfen — leere markieren und fokussieren
  for (const f of conf.fields) {
    if (!f.required) continue;
    const el = document.querySelector(`#sf-body [data-sf-key="${f.key}"]`);
    if (el && !el.value.trim()) {
      showToast(`Bitte „${f.label}“ ausfüllen.`);
      el.focus();
      return;
    }
  }
  // Werte einsammeln und als Entwurf sichern (bleibt lokal — ehrliche Demo)
  const vals = {};
  conf.fields.forEach(f => {
    const el = document.querySelector(`#sf-body [data-sf-key="${f.key}"]`);
    if (el && el.value.trim()) vals[f.key] = el.value.trim();
  });
  vals._submittedAt = new Date().toISOString().slice(0, 10);
  _saveSubmitDraft(conf.type, vals);

  const steps = conf.steps || _SF_DEFAULT_STEPS;
  document.getElementById('sf-body').innerHTML = `
    <div class="sf-thanks" id="sf-thanks">
      <span class="sf-thanks-ic">${LU.check}</span>
      <h3>Danke für deinen Entwurf!</h3>
      <p>${escHtml(conf.thanksText || 'In der echten Version ginge dein Beitrag jetzt an das Team — Schritt 2 und 3 würden von hier aus weiterlaufen.')}</p>
      <p class="sf-thanks-note">Demo: dein Entwurf ist nur lokal in deinem Browser gespeichert, gesendet wurde nichts.</p>
    </div>
    ${_sfStepsHtml(steps, true)}
    <div class="sf-actions">
      <button type="button" class="c-cta -black-bg" onclick="closeSubmitFlow()">Schließen</button>
    </div>`;
  if (typeof conf.onSubmitted === 'function') conf.onSubmitted(vals);
}

function closeSubmitFlow() {
  const ov = document.getElementById('submit-overlay');
  if (!ov || !ov.classList.contains('open')) return;
  ov.classList.remove('open');
  // Scroll-Sperre nur freigeben, wenn nicht noch das Detail-Modal offen ist
  if (!document.getElementById('modal-overlay')?.classList.contains('open')) {
    document.body.style.overflow = '';
  }
  _submitFlowConfig = null;
  if (_submitFlowOpener) { try { _submitFlowOpener.focus(); } catch (e) {} _submitFlowOpener = null; }
}

/* ===== GLOBALES SUCH-OVERLAY (E9, additiv) =====
   Eine Lupe in renderNav (immer da) + Cmd/Ctrl+K öffnen ein Dialog-Overlay, das
   ALLE Typen durchsucht. Die Seiten laden nicht alle data/*.js — beim ERSTEN
   Öffnen werden die fehlenden Globals per <script>-Injektion nachgeladen (kein
   Doppel-Load), dann der Index EINMALIG gebaut. Alles null-sicher: fehlt ein
   Global, entfällt still die Gruppe — nie ein JS-Fehler. searchScore wird mit den
   typ-spezifischen Feldern wiederverwendet; Deep-Links exakt nach E9-Vertrag.
   Die lokale opts.search-Suche der Seiten bleibt unberührt (Cmd/Ctrl+K statt „/“). */
const GSEARCH_SOURCES = [
  { glob: 'SKILLS',     src: 'data/skills.js'     },
  { glob: 'PROMPTS',    src: 'data/prompts.js'    },
  { glob: 'BEFEHLE',    src: 'data/befehle.js'    },
  { glob: 'GLOSSAR',    src: 'data/glossar.js'    },
  { glob: 'RESSOURCEN', src: 'data/ressourcen.js' },
  { glob: 'ASSETS',     src: 'data/assets.js'     },
  { glob: 'BAUSTEINE',  src: 'data/bausteine.js'  },
  { glob: 'CASES',      src: 'data/cases.js'      },
];

// Feste Reihenfolge der Trefferschubladen. Jede Gruppe kennt ihr Global, ihren
// Deep-Link, Titel/Kurzinfo-Felder und die searchScore-Felder (aus dem Vertrag).
const GSEARCH_GROUPS = [
  { key: 'skill', label: 'Skills', glob: 'SKILLS',
    filter: it => !it.itemType || it.itemType === 'skill',
    href: it => 'skills.html?skill=' + encodeURIComponent(it.id),
    title: it => it.name, sub: it => it.tagline, fields: null },
  { key: 'plugin', label: 'Plugins & Frameworks', glob: 'SKILLS',
    filter: it => it.itemType === 'plugin' || it.itemType === 'framework',
    href: it => 'skills.html?skill=' + encodeURIComponent(it.id),
    title: it => it.name, sub: it => it.tagline, fields: null },
  { key: 'prompt', label: 'Prompts', glob: 'PROMPTS',
    href: it => 'prompts.html?p=' + encodeURIComponent(it.id),
    title: it => it.name, sub: it => it.tagline,
    fields: it => [[it.name || '', 5], [(it.tags || []).join(' '), 3], [it.tagline || '', 2], [it.promptText || '', 1]] },
  { key: 'befehl', label: 'Befehle', glob: 'BEFEHLE',
    href: it => 'hilfe.html?befehl=' + encodeURIComponent(it.id),
    title: it => it.cmd, sub: it => it.nutzen,
    fields: it => [[it.cmd || '', 5], [it.nutzen || '', 3], [it.beispiel || '', 1], [it.tipp || '', 1]] },
  { key: 'begriff', label: 'Begriffe', glob: 'GLOSSAR',
    href: it => 'hilfe.html?begriff=' + encodeURIComponent(it.id),
    title: it => it.wort, sub: it => it.satz,
    fields: it => [[it.wort || '', 5], [it.satz || '', 2], [it.beispiel || '', 1], [it.tiefe || '', 1]] },
  { key: 'ressource', label: 'Ressourcen', glob: 'RESSOURCEN',
    href: it => 'lernen.html?r=' + encodeURIComponent(it.id),
    title: it => it.titel, sub: it => it.fuerDich || it.beschreibung,
    fields: it => [[it.titel || '', 5], [(it.tags || []).join(' '), 3], [it.beschreibung || '', 1], [it.fuerDich || '', 1]] },
  { key: 'asset', label: 'Assets', glob: 'ASSETS',
    href: it => 'bibliothek.html?a=' + encodeURIComponent(it.id),
    title: it => it.name, sub: it => it.typ,
    fields: it => [[it.name || '', 5], [it.typ || '', 2], [it.kategorie || '', 2]] },
  { key: 'baustein', label: 'Bausteine', glob: 'BAUSTEINE',
    href: it => 'baukasten.html?b=' + encodeURIComponent(it.id),
    title: it => it.name, sub: it => it.beschreibung,
    fields: it => [[it.name || '', 5], [(it.tags || []).join(' '), 3], [it.beschreibung || '', 2], [it.einsatz || '', 1]] },
  { key: 'case', label: 'Projekte', glob: 'CASES',
    href: it => 'showroom.html?case=' + encodeURIComponent(it.id),
    title: it => it.titel, sub: it => it.kurz,
    fields: it => [[it.titel || '', 5], [it.kurz || '', 2], [it.persona || '', 1], [it.saeule || '', 1]] },
];

// WICHTIG: die data/*.js deklarieren ihre Globals mit `const` (SKILLS, PROMPTS, …).
// const auf oberster Ebene erzeugt eine globale LEXIKALISCHE Bindung, aber KEINE
// window-Eigenschaft — window[name] wäre also immer undefined. Deshalb per typeof
// über den Bezeichner selbst lesen (klassische Scripts teilen sich das globale
// Lexikal-Environment; auch dynamisch injizierte data/*.js landen dort).
function _gsGlobal(name) {
  try {
    switch (name) {
      case 'SKILLS':     return (typeof SKILLS     !== 'undefined') ? SKILLS     : undefined;
      case 'PROMPTS':    return (typeof PROMPTS    !== 'undefined') ? PROMPTS    : undefined;
      case 'BEFEHLE':    return (typeof BEFEHLE    !== 'undefined') ? BEFEHLE    : undefined;
      case 'GLOSSAR':    return (typeof GLOSSAR    !== 'undefined') ? GLOSSAR    : undefined;
      case 'RESSOURCEN': return (typeof RESSOURCEN !== 'undefined') ? RESSOURCEN : undefined;
      case 'ASSETS':     return (typeof ASSETS     !== 'undefined') ? ASSETS     : undefined;
      case 'BAUSTEINE':  return (typeof BAUSTEINE  !== 'undefined') ? BAUSTEINE  : undefined;
      case 'CASES':      return (typeof CASES      !== 'undefined') ? CASES      : undefined;
    }
  } catch (e) {}
  return undefined;
}

let _gsIndex = [];
let _gsIndexBuilt = false;
let _gsLoading = false;
let _gsOpts = [];        // IDs der aktuell sichtbaren role="option"-Treffer
let _gsActiveIdx = -1;   // aktiver Treffer (Tastatur-Navigation)

// Fehlende data/*.js dynamisch nachladen — kein Doppel-Load (typeof-Guard +
// <script src>-Abgleich), onerror still überspringen (kein throw).
function _gsLoadScript(src) {
  return new Promise(resolve => {
    try {
      if ([...document.scripts].some(s => (s.getAttribute('src') || '').indexOf(src) !== -1)) { resolve(); return; }
    } catch (e) {}
    const el = document.createElement('script');
    el.src = src; el.async = false;
    el.onload = () => resolve();
    el.onerror = () => resolve();
    (document.head || document.body).appendChild(el);
  });
}
function _gsEnsureData() {
  const need = GSEARCH_SOURCES.filter(s => _gsGlobal(s.glob) === undefined);
  if (!need.length) return Promise.resolve();
  return Promise.all(need.map(s => _gsLoadScript(s.src)));
}

// Einmaliger Index über alle vorhandenen Globals (fehlende Gruppen entfallen still).
function _gsBuildIndex() {
  if (_gsIndexBuilt) return;
  _gsIndex = [];
  GSEARCH_GROUPS.forEach(g => {
    const arr = _gsGlobal(g.glob);
    if (!Array.isArray(arr)) return;
    arr.forEach(it => {
      if (!it || it.id == null) return;
      if (g.filter && !g.filter(it)) return;
      _gsIndex.push({ group: g, item: it });
    });
  });
  _gsIndexBuilt = true;
}

function _gsSearch(q) {
  const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const scored = [];
  _gsIndex.forEach(entry => {
    let sc = 0;
    try {
      const f = entry.group.fields ? entry.group.fields(entry.item) : null;
      sc = searchScore(entry.item, terms, f || undefined);
    } catch (e) { sc = 0; }
    if (sc > 0) scored.push({ entry, sc });
  });
  scored.sort((a, b) => b.sc - a.sc);
  return scored;
}

function _gsRenderResults(q) {
  const results = document.getElementById('gsearch-results');
  const input = document.getElementById('gsearch-input');
  if (!results) return;
  _gsActiveIdx = -1; _gsOpts = [];
  if (input) input.removeAttribute('aria-activedescendant');
  if (!q || !q.trim()) { results.innerHTML = ''; if (input) input.setAttribute('aria-expanded', 'false'); return; }
  if (!_gsIndexBuilt) { results.innerHTML = '<li class="gs-status" role="presentation">Suche wird vorbereitet …</li>'; return; }
  const scored = _gsSearch(q);
  const byGroup = {};
  scored.forEach(s => { const k = s.entry.group.key; (byGroup[k] = byGroup[k] || []).push(s); });
  const PER = 6;
  let html = ''; let n = 0;
  GSEARCH_GROUPS.forEach(g => {
    const list = (byGroup[g.key] || []).slice(0, PER);
    if (!list.length) return;
    html += `<li class="gs-group" role="presentation"><span class="gs-group-label">${escHtml(g.label)}</span></li>`;
    list.forEach(s => {
      const it = s.entry.item;
      let href = '#';
      try { href = g.href(it); } catch (e) { href = '#'; }
      const title = escHtml(String(g.title(it) || it.id));
      const sub = escHtml(String(g.sub(it) || '').slice(0, 120));
      const path = String(href).split('?')[0];
      const id = 'gsearch-opt-' + n; _gsOpts.push(id);
      html += `<li role="presentation"><a class="gs-opt" role="option" id="${id}" href="${escHtml(href)}" tabindex="-1">`
        + `<span class="gs-opt-title">${title}</span>`
        + (sub ? `<span class="gs-opt-sub">${sub}</span>` : '')
        + `<span class="gs-opt-path">${escHtml(path)}</span></a></li>`;
      n++;
    });
  });
  if (!html) html = `<li class="gs-status" role="presentation">Nichts gefunden für „${escHtml(q)}“.</li>`;
  results.innerHTML = html;
  if (input) input.setAttribute('aria-expanded', _gsOpts.length ? 'true' : 'false');
}

function _gsHighlight() {
  const input = document.getElementById('gsearch-input');
  _gsOpts.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    const on = i === _gsActiveIdx;
    el.classList.toggle('is-active', on);
    if (on) { el.scrollIntoView({ block: 'nearest' }); if (input) input.setAttribute('aria-activedescendant', id); }
  });
  if (_gsActiveIdx < 0 && input) input.removeAttribute('aria-activedescendant');
}

function _gsInputKeydown(e) {
  if (e.key === 'Escape') { e.preventDefault(); closeGlobalSearch(); return; }
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    if (!_gsOpts.length) return;
    e.preventDefault();
    if (e.key === 'ArrowDown') _gsActiveIdx = (_gsActiveIdx + 1) % _gsOpts.length;
    else _gsActiveIdx = (_gsActiveIdx - 1 + _gsOpts.length) % _gsOpts.length;
    _gsHighlight();
  } else if (e.key === 'Enter') {
    if (_gsActiveIdx >= 0 && _gsOpts[_gsActiveIdx]) {
      const el = document.getElementById(_gsOpts[_gsActiveIdx]);
      if (el && el.getAttribute('href')) { e.preventDefault(); location.href = el.getAttribute('href'); }
    }
  }
}

function _gsEnsureOverlay() {
  let ov = document.getElementById('gsearch-overlay');
  if (ov) return ov;
  ov = document.createElement('div');
  ov.className = 'gsearch-overlay';
  ov.id = 'gsearch-overlay';
  ov.innerHTML = `
    <div class="gsearch-panel" role="dialog" aria-modal="true" aria-labelledby="gsearch-title">
      <h2 id="gsearch-title" class="gs-visually-hidden">Marketplace durchsuchen</h2>
      <div class="gsearch-inputwrap">
        ${LU.search}
        <input type="search" id="gsearch-input" role="combobox" aria-expanded="false" aria-controls="gsearch-results" aria-autocomplete="list" autocomplete="off" placeholder="Skills, Prompts, Befehle, Projekte …" aria-label="Marketplace durchsuchen">
        <button type="button" class="gsearch-close" aria-label="Suche schließen" onclick="closeGlobalSearch()">✕</button>
      </div>
      <ul id="gsearch-results" role="listbox" aria-label="Suchergebnisse"></ul>
      <p class="gsearch-foot" aria-hidden="true"><kbd>↑</kbd><kbd>↓</kbd> wählen · <kbd>Enter</kbd> öffnen · <kbd>Esc</kbd> schließen</p>
    </div>`;
  document.body.appendChild(ov);
  ov.addEventListener('click', e => { if (e.target === ov) closeGlobalSearch(); });
  const input = ov.querySelector('#gsearch-input');
  if (input) {
    const onInput = debounce(() => _gsRenderResults(input.value), 120);
    input.addEventListener('input', onInput);
    input.addEventListener('keydown', _gsInputKeydown);
  }
  return ov;
}

function openGlobalSearch() {
  const ov = _gsEnsureOverlay();
  if (ov.classList.contains('open')) return;
  window._gsOpener = document.activeElement;
  ov.classList.add('open');
  document.body.style.overflow = 'hidden';
  const input = document.getElementById('gsearch-input');
  const results = document.getElementById('gsearch-results');
  if (input) setTimeout(() => { try { input.focus(); if (input.value) input.select(); } catch (e) {} }, 40);
  if (!_gsIndexBuilt) {
    if (results && !(input && input.value.trim())) {
      results.innerHTML = '<li class="gs-status" role="presentation">Suche wird vorbereitet …</li>';
    }
    if (!_gsLoading) {
      _gsLoading = true;
      _gsEnsureData().then(() => {
        _gsBuildIndex();
        _gsLoading = false;
        const inp = document.getElementById('gsearch-input');
        const stillOpen = document.getElementById('gsearch-overlay') && document.getElementById('gsearch-overlay').classList.contains('open');
        if (inp && stillOpen) _gsRenderResults(inp.value);
      });
    }
  } else if (input && input.value.trim()) {
    _gsRenderResults(input.value);
  }
}

function closeGlobalSearch() {
  const ov = document.getElementById('gsearch-overlay');
  if (!ov || !ov.classList.contains('open')) return;
  ov.classList.remove('open');
  // Scroll-Sperre nur freigeben, wenn kein anderes Overlay offen ist (Vertrags-Muster).
  const modalOpen = document.getElementById('modal-overlay') && document.getElementById('modal-overlay').classList.contains('open');
  const submitOpen = document.getElementById('submit-overlay') && document.getElementById('submit-overlay').classList.contains('open');
  const aboutOpen = document.getElementById('about-overlay') && document.getElementById('about-overlay').classList.contains('open');
  if (!modalOpen && !submitOpen && !aboutOpen) document.body.style.overflow = '';
  if (window._gsOpener) { try { window._gsOpener.focus(); } catch (e) {} window._gsOpener = null; }
}

// Idempotent (einmal pro Seite): Cmd/Ctrl+K togglet das Overlay; capture-keydown
// hält Esc + Tab-Fokusfalle im Dialog. NICHT „/“ (Konflikt mit lokaler Seiten-Suche).
function initGlobalSearch() {
  if (document._gsBound) return;
  document._gsBound = true;
  document.addEventListener('keydown', e => {
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      const ov = document.getElementById('gsearch-overlay');
      if (ov && ov.classList.contains('open')) closeGlobalSearch(); else openGlobalSearch();
    }
  });
  document.addEventListener('keydown', e => {
    const ov = document.getElementById('gsearch-overlay');
    if (!ov || !ov.classList.contains('open')) return;
    if (e.key === 'Escape') { e.stopPropagation(); closeGlobalSearch(); return; }
    if (e.key === 'Tab') {
      const panel = ov.querySelector('.gsearch-panel');
      const focusable = panel ? [...panel.querySelectorAll('input, button')].filter(el => el.offsetParent !== null) : [];
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, true);
}

/* ===== „ÜBER DIESE SEITE“-MODAL (E9, additiv) — zentrale, ehrliche Demo-Kennzeichnung.
   Absender-Regel §1.1 wörtlich. Dynamisch erzeugtes #about-overlay, role="dialog",
   Esc + Backdrop + Fokus zurück; Scroll-Sperre nur freigeben, wenn kein anderes Overlay offen. */
function _ensureAboutOverlay() {
  let ov = document.getElementById('about-overlay');
  if (ov) return ov;
  ov = document.createElement('div');
  ov.className = 'about-overlay';
  ov.id = 'about-overlay';
  ov.innerHTML = `
    <div class="about-modal" role="dialog" aria-modal="true" aria-labelledby="about-title">
      <button type="button" class="about-close" onclick="closeAboutModal()" aria-label="Dialog schließen">✕</button>
      <h2 id="about-title">Über diesen Marketplace</h2>
      <p>Der pilot AI Marketplace ist eine <strong>Citizen-Coding-Demo</strong> der pilot Agenturgruppe — ein statischer Katalog auf GitHub Pages, ohne Backend, ohne Login, ohne Datenbank. Alles läuft in deinem Browser.</p>
      <p class="about-note">Bewertungen, Stimmen und Beispiel-Projekte sind redaktionelle Demo-Daten — deine Eingaben bleiben lokal in deinem Browser, es wird nichts gesendet.</p>
    </div>`;
  document.body.appendChild(ov);
  ov.addEventListener('click', e => { if (e.target === ov) closeAboutModal(); });
  if (!document._aboutKeyBound) {
    document._aboutKeyBound = true;
    document.addEventListener('keydown', e => {
      const open = document.getElementById('about-overlay') && document.getElementById('about-overlay').classList.contains('open');
      if (!open) return;
      if (e.key === 'Escape') { e.stopPropagation(); closeAboutModal(); return; }
      if (e.key === 'Tab') {
        const dlg = document.querySelector('#about-overlay .about-modal');
        const focusable = dlg ? [...dlg.querySelectorAll('button, a[href]')] : [];
        if (!focusable.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }, true);
  }
  return ov;
}

function openAboutModal() {
  const ov = _ensureAboutOverlay();
  window._aboutOpener = document.activeElement;
  ov.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => { const c = document.querySelector('#about-overlay .about-close'); if (c) c.focus(); }, 40);
}

function closeAboutModal() {
  const ov = document.getElementById('about-overlay');
  if (!ov || !ov.classList.contains('open')) return;
  ov.classList.remove('open');
  const modalOpen = document.getElementById('modal-overlay') && document.getElementById('modal-overlay').classList.contains('open');
  const submitOpen = document.getElementById('submit-overlay') && document.getElementById('submit-overlay').classList.contains('open');
  const gsOpen = document.getElementById('gsearch-overlay') && document.getElementById('gsearch-overlay').classList.contains('open');
  if (!modalOpen && !submitOpen && !gsOpen) document.body.style.overflow = '';
  if (window._aboutOpener) { try { window._aboutOpener.focus(); } catch (e) {} window._aboutOpener = null; }
}
