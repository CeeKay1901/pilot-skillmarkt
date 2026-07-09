/**
 * Generic Playwright Web Audit Script
 * Usage: node playwright-audit.js [target-url] [output-dir]
 *
 * Outputs:
 *   - {output-dir}/findings.json     — structured findings (all dimensions)
 *   - {output-dir}/performance.json  — timing metrics
 *   - {output-dir}/design.json       — design measurements
 *   - {output-dir}/seo.json          — SEO meta data
 *   - {output-dir}/*.png             — numbered screenshots (always viewport = what user sees)
 *
 * Environment variables:
 *   CHROMIUM_PATH   — path to chromium binary (default: /usr/bin/chromium-browser)
 *   PORT            — local server port (default: 7799)
 */

const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const TARGET_URL = process.argv[2] || `http://localhost:${process.env.PORT || 7799}`;
const OUT_DIR = process.argv[3] || path.join(process.cwd(), 'audit_shots');
const CHROMIUM_PATH = process.env.CHROMIUM_PATH || '/usr/bin/chromium-browser';

const findings = [];
const log = (severity, category, title, detail, file = null) => {
  findings.push({ severity, category, title, detail, file, timestamp: new Date().toISOString() });
  console.log(`[${severity}] ${category}: ${title}`);
};

fs.mkdirSync(OUT_DIR, { recursive: true });

/**
 * Viewport screenshot — mirrors exactly what the user sees at the current scroll position.
 * This is the default for all audit shots.
 */
const shotViewport = async (page, name) => {
  const p = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: p, fullPage: false });
  return p;
};

/**
 * Full-page screenshot — only for layout overview where the complete DOM structure matters.
 * NOT used for visual auditing since it doesn't reflect what the user sees.
 */
const shotFull = async (page, name) => {
  const p = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: p, fullPage: true });
  return p;
};

/**
 * Context-aware scroll shot — scrolls so the target element is visible in the viewport
 * with surrounding context, then takes a viewport screenshot.
 * This replaces element.screenshot() which gave isolated, contextless crops.
 *
 * @param {Page} page
 * @param {string|ElementHandle} target — CSS selector or ElementHandle
 * @param {string} name — output filename (without .png)
 * @param {number} contextPadding — px to show above the element (default 80)
 */
const shotWithContext = async (page, target, name, contextPadding = 80) => {
  const p = path.join(OUT_DIR, `${name}.png`);

  if (typeof target === 'string') {
    await page.evaluate(({ sel, pad }) => {
      const el = document.querySelector(sel);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      window.scrollTo({ top: Math.max(0, absoluteTop - pad), behavior: 'instant' });
    }, { sel: target, pad: contextPadding });
  } else {
    // ElementHandle: scroll it into view, then pull back for context
    await target.scrollIntoViewIfNeeded();
    await page.evaluate((pad) => {
      window.scrollTo({ top: Math.max(0, window.scrollY - pad), behavior: 'instant' });
    }, contextPadding);
  }

  // Small stabilization pause so scroll settles before screenshot
  await page.waitForTimeout(100);
  await page.screenshot({ path: p, fullPage: false });
  return p;
};

/**
 * Above-fold shot — scrolls to top, then captures the viewport.
 * Represents the first thing the user sees on load.
 */
const shotAboveFold = async (page, name) => {
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(80);
  return shotViewport(page, name);
};

const measurePerf = async (page) => {
  return page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    const fcp = paint.find(p => p.name === 'first-contentful-paint');
    return {
      ttfb: Math.round(nav?.responseStart - nav?.requestStart),
      domContentLoaded: Math.round(nav?.domContentLoadedEventEnd - nav?.requestStart),
      loadComplete: Math.round(nav?.loadEventEnd - nav?.requestStart),
      fcp: fcp ? Math.round(fcp.startTime) : null,
    };
  });
};

(async () => {
  const browser = await chromium.launch({
    executablePath: CHROMIUM_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {

    // ── 1. LANDING PAGE — desktop light ────────────────────────────────────
    console.log('\n── Block 1: Landing (desktop light)');
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' });
      const page = await ctx.newPage();
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});

      // Above-fold: what the user sees on first load (no scroll)
      await shotAboveFold(page, '01a-landing-desktop-light-abovefold');
      // Full-page overview for layout structure analysis
      await shotFull(page, '01b-landing-desktop-light-full');

      const h1 = await page.$('h1');
      if (!h1) log('WARN', 'A11y', 'No <h1> found', 'Every page should have exactly one h1');

      const lang = await page.$eval('html', el => el.getAttribute('lang')).catch(() => null);
      if (!lang) log('FAIL', 'A11y', 'Missing lang attribute', '<html> element has no lang attribute — screen readers cannot detect language');

      const skipLink = await page.$('[href="#main"], [href="#content"], .skip-nav, .skip-link');
      if (!skipLink) log('WARN', 'A11y', 'No skip navigation link', 'Add <a href="#main" class="skip-link"> as first focusable element for keyboard users');

      const title = await page.title();
      if (!title || title.length < 3) log('WARN', 'A11y', 'Missing or empty <title>', `Page title is: "${title}"`);

      const perf = await measurePerf(page);
      if (perf.fcp > 3000) log('WARN', 'Performance', `Slow FCP: ${perf.fcp}ms`, 'First Contentful Paint > 3s — optimize critical CSS and font loading');
      if (perf.loadComplete > 5000) log('WARN', 'Performance', `Slow load: ${perf.loadComplete}ms`, 'Total load time > 5s');

      await ctx.close();
    }

    // ── 1b. DESIGN METRICS ─────────────────────────────────────────────────
    console.log('\n── Block 1b: Design measurements');
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' });
      const page = await ctx.newPage();
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});

      const design = await page.evaluate(() => {
        const get = (sel) => document.querySelector(sel);
        const style = (el) => el ? window.getComputedStyle(el) : null;
        const num = (v) => parseFloat(v) || 0;

        const h1 = get('h1');
        const bodyEl = get('p, li, td, .body, main');
        const h1Size = num(style(h1)?.fontSize);
        const bodySize = num(style(bodyEl)?.fontSize) || 16;
        const typographyRatio = h1Size ? +(h1Size / bodySize).toFixed(2) : null;

        const p = get('main p, article p, .content p, p');
        const lineWidth = p ? Math.round(p.getBoundingClientRect().width) : null;

        const allStyles = Array.from(document.styleSheets)
          .flatMap(sheet => { try { return Array.from(sheet.cssRules); } catch { return []; } })
          .map(r => r.cssText || '');
        const allCssText = allStyles.join(' ');
        const hardcodedColors = (allCssText.match(/#[0-9a-fA-F]{3,6}(?![a-fA-F0-9])/g) || []).length;
        const varColors = (allCssText.match(/var\(--[^)]*color[^)]*\)|var\(--[^)]*bg[^)]*\)|var\(--[^)]*fg[^)]*\)/g) || []).length;
        const spacingVars = (allCssText.match(/var\(--[^)]*space[^)]*\)|var\(--[^)]*gap[^)]*\)|var\(--[^)]*margin[^)]*\)/g) || []).length;
        const radii = [...new Set((allCssText.match(/border-radius:\s*([^;]+)/g) || []).map(m => m.replace('border-radius:', '').trim()))];
        const buttons = Array.from(document.querySelectorAll('button, [role="button"], .btn, .button, input[type="submit"]'));
        const buttonColors = [...new Set(buttons.map(b => window.getComputedStyle(b).backgroundColor))];

        return { typographyRatio, lineWidth, hardcodedColors, varColors, spacingVars, uniqueRadii: radii.length, uniqueButtonColors: buttonColors.length };
      });

      fs.writeFileSync(path.join(OUT_DIR, 'design.json'), JSON.stringify(design, null, 2));

      if (design.typographyRatio !== null && design.typographyRatio < 1.8) {
        log('WARN', 'Design', `Schwache Typografie-Hierarchie: h1 nur ${design.typographyRatio}x größer als Body`, 'Gute Hierarchie: h1 ≥ 2.5x Body-Schriftgröße. Erhöhe h1 oder reduziere Body-Schrift.');
      }
      if (design.lineWidth && (design.lineWidth > 750 || design.lineWidth < 300)) {
        log('WARN', 'Design', `Zeilenlänge ${design.lineWidth}px außerhalb des optimalen Bereichs`, 'Ideal: 400–650px (≈ 45–75 Zeichen bei 16px). Nutze max-width auf Text-Containern.');
      }
      if (design.hardcodedColors > 10 && design.varColors < 5) {
        log('WARN', 'Design', `${design.hardcodedColors} hart kodierte Farben ohne CSS-Custom-Properties`, 'Farben in --var-Tokens auslagern erleichtert Dark Mode, Theming und Konsistenz.');
      }
      if (design.uniqueRadii > 5) {
        log('INFO', 'Design', `${design.uniqueRadii} verschiedene border-radius-Werte`, 'Zu viele verschiedene Radien = visuelles Rauschen. 2–3 Stufen definieren und als Tokens nutzen.');
      }
      if (design.uniqueButtonColors > 4) {
        log('WARN', 'Design', `${design.uniqueButtonColors} verschiedene Button-Hintergrundfarben`, 'Zu viele Button-Varianten signalisieren fehlendes Design-System. Primary + Secondary + Danger = 3 reichen.');
      }

      await ctx.close();
    }

    // ── 1c. SEO & META ──────────────────────────────────────────────────────
    console.log('\n── Block 1c: SEO & Meta');
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});

      const seo = await page.evaluate(() => {
        const getMeta = (name) => document.querySelector(`meta[name="${name}"]`)?.content || document.querySelector(`meta[property="${name}"]`)?.content || null;
        return {
          title: document.title,
          titleLength: document.title.length,
          description: getMeta('description'),
          descriptionLength: getMeta('description')?.length || 0,
          ogTitle: getMeta('og:title'),
          ogDescription: getMeta('og:description'),
          ogImage: getMeta('og:image'),
          ogUrl: getMeta('og:url'),
          twitterCard: getMeta('twitter:card'),
          canonical: document.querySelector('link[rel="canonical"]')?.href || null,
          lang: document.documentElement.getAttribute('lang'),
          h1Count: document.querySelectorAll('h1').length,
          h1Text: document.querySelector('h1')?.textContent?.trim().slice(0, 80) || null,
          hasMain: !!document.querySelector('main'),
          hasNav: !!document.querySelector('nav'),
          structuredData: !!document.querySelector('script[type="application/ld+json"]'),
        };
      });

      fs.writeFileSync(path.join(OUT_DIR, 'seo.json'), JSON.stringify(seo, null, 2));

      if (!seo.title || seo.titleLength < 10) log('FAIL', 'SEO', 'Fehlender oder zu kurzer <title>', 'Title fehlt oder < 10 Zeichen — kritisch für SEO und Browser-Tabs');
      else if (seo.titleLength > 60) log('WARN', 'SEO', `<title> zu lang (${seo.titleLength} Zeichen)`, 'Wird in Suchergebnissen nach ~60 Zeichen abgeschnitten');

      if (!seo.description) log('WARN', 'SEO', 'Keine Meta-Description', 'Google generiert dann selbst einen Snippet — oft schlecht. 120–158 Zeichen empfohlen.');
      else if (seo.descriptionLength > 158) log('INFO', 'SEO', `Meta-Description zu lang (${seo.descriptionLength}Z)`, 'Wird nach ~158 Zeichen abgeschnitten');

      if (!seo.ogImage) log('WARN', 'SEO', 'Kein og:image', 'Social Sharing ohne Bild wirkt unprofessionell. 1200×630px PNG/JPG empfohlen.');
      if (!seo.ogTitle) log('INFO', 'SEO', 'Kein og:title', 'Ohne og:title wird der <title> verwendet — explizit setzen ist besser');
      if (!seo.twitterCard) log('INFO', 'SEO', 'Kein twitter:card Meta-Tag', 'Für optimale Twitter/X-Vorschauen: <meta name="twitter:card" content="summary_large_image">');
      if (!seo.canonical) log('INFO', 'SEO', 'Kein canonical Link', 'Bei mehreren möglichen URLs (mit/ohne www, mit/ohne Trailing Slash) canonical setzen');
      if (!seo.structuredData) log('INFO', 'SEO', 'Keine strukturierten Daten (JSON-LD)', 'Schema.org Markup verbessert Rich Snippets in Suchergebnissen');

      await ctx.close();
    }

    // ── 1d. UX & CONTENT CHECKS ────────────────────────────────────────────
    console.log('\n── Block 1d: UX & Content');
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});

      const ux = await page.evaluate(() => {
        const ctaTexts = Array.from(document.querySelectorAll('button, .btn, [role="button"], a.primary, a.cta'))
          .map(el => el.textContent?.trim())
          .filter(Boolean);
        const genericCtaWords = ['ok', 'bestätigen', 'submit', 'senden', 'weiter', 'click here', 'hier klicken', 'mehr', 'more'];
        const genericCtaCount = ctaTexts.filter(t => genericCtaWords.some(g => t.toLowerCase().includes(g))).length;

        const emptyStateTexts = Array.from(document.querySelectorAll('[class*="empty"], [class*="leer"], [class*="zero-state"], [class*="no-data"]'))
          .map(el => el.textContent?.trim().slice(0, 60));

        const placeholderOnlyInputs = Array.from(document.querySelectorAll('input[placeholder], textarea[placeholder]'))
          .filter(el => {
            const id = el.id;
            const hasLabel = id && document.querySelector(`label[for="${id}"]`);
            const hasAria = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby');
            return !hasLabel && !hasAria;
          }).length;

        const primaryCta = document.querySelector('button.primary, .btn-primary, [class*="cta"], button[type="submit"]');
        const primaryCtaVisible = primaryCta ? primaryCta.getBoundingClientRect().top < window.innerHeight : false;

        const hasLoadingIndicators = !!(
          document.querySelector('[class*="spin"], [class*="load"], [aria-busy], [class*="skeleton"]') ||
          document.querySelector('style')?.textContent?.includes('@keyframes')
        );

        const hasToastMechanism = !!(
          document.querySelector('[class*="toast"], [class*="snack"], [class*="alert"], [role="alert"], [role="status"]') ||
          document.body.innerHTML.includes('toast') || document.body.innerHTML.includes('alert')
        );

        return { ctaTexts: ctaTexts.slice(0, 10), genericCtaCount, emptyStateTexts, placeholderOnlyInputs, primaryCtaVisible, hasLoadingIndicators, hasToastMechanism };
      });

      if (ux.genericCtaCount > 0) {
        log('WARN', 'Content', `${ux.genericCtaCount} generische CTA-Texte`, `Statt "Weiter", "OK", "Senden": spezifische Handlungsaufforderung. Gefunden: ${ux.ctaTexts.join(', ')}`);
      }
      if (!ux.primaryCtaVisible) {
        log('WARN', 'UX', 'Kein primärer CTA above the fold sichtbar', 'Der wichtigste Handlungsaufruf sollte ohne Scrollen sichtbar sein');
      }
      if (ux.placeholderOnlyInputs > 0) {
        log('WARN', 'UX', `${ux.placeholderOnlyInputs} Inputs nur mit Placeholder (kein Label)`, 'Placeholder verschwindet beim Tippen — Nutzer vergessen was das Feld war. Immer Label oder aria-label setzen.');
      }
      if (!ux.hasToastMechanism) {
        log('INFO', 'UX', 'Kein erkennbarer Feedback-Mechanismus (Toast/Alert)', 'Nutzer brauchen Bestätigung nach jeder Aktion. Toast-System oder Inline-Feedback einbauen.');
      }

      await ctx.close();
    }

    // ── 2. DARK MODE ────────────────────────────────────────────────────────
    console.log('\n── Block 2: Dark mode');
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
      const page = await ctx.newPage();
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});

      // Viewport shot — same above-fold view as Block 1 for direct light/dark comparison
      await shotAboveFold(page, '02-landing-dark');

      const bodyBg = await page.evaluate(() => {
        const bg = window.getComputedStyle(document.body).backgroundColor;
        const rgb = bg.match(/\d+/g)?.map(Number) || [255, 255, 255];
        const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        return { bg, brightness };
      });
      if (bodyBg.brightness > 200) {
        log('FAIL', 'Visual', 'Dark mode not applied to body', `Body background in dark mode: ${bodyBg.bg} (brightness ${Math.round(bodyBg.brightness)}) — should be dark`);
      }

      await ctx.close();
    }

    // ── 3. MOBILE ───────────────────────────────────────────────────────────
    console.log('\n── Block 3: Mobile (390px)');
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: 'light' });
      const page = await ctx.newPage();
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});

      // Viewport shot at top — what user sees on mobile on first load
      await shotAboveFold(page, '03a-mobile-390-abovefold');
      // Full-page to catch overflow / layout issues below fold
      await shotFull(page, '03b-mobile-390-full');

      const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      if (hasHScroll) log('FAIL', 'Responsive', 'Horizontal scroll on mobile', `scrollWidth (${await page.evaluate(() => document.documentElement.scrollWidth)}) > viewport (390)`);

      const smallTargets = await page.evaluate(() => {
        const interactive = document.querySelectorAll('button, a, [role="button"], input, select, textarea, label');
        return Array.from(interactive)
          .map(el => {
            const r = el.getBoundingClientRect();
            return { tag: el.tagName, text: (el.textContent || el.value || el.placeholder || '').trim().slice(0, 30), w: Math.round(r.width), h: Math.round(r.height) };
          })
          .filter(({ w, h }) => w > 0 && h > 0 && (w < 44 || h < 44));
      });

      if (smallTargets.length > 0) {
        const examples = smallTargets.slice(0, 3).map(t => `${t.tag}[${t.text}] ${t.w}x${t.h}px`).join(', ');
        log('WARN', 'A11y', `Touch targets too small: ${smallTargets.length} elements < 44px`, `Examples: ${examples} — WCAG 2.5.5 requires 44×44px`);

        // Screenshot scrolled to the first offending element — user sees it in context
        const firstSmall = smallTargets[0];
        if (firstSmall) {
          const tagLower = firstSmall.tag.toLowerCase();
          const textSnippet = firstSmall.text.slice(0, 20);
          await shotWithContext(page, `${tagLower}`, '03c-mobile-touch-target-issue');
        }
      }

      const smallInputs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('input, select, textarea'))
          .filter(el => {
            const size = parseFloat(window.getComputedStyle(el).fontSize);
            return size < 16 && el.getBoundingClientRect().width > 0;
          })
          .map(el => ({ tag: el.tagName, type: el.type, fontSize: window.getComputedStyle(el).fontSize }));
      });
      if (smallInputs.length > 0) {
        log('WARN', 'UX', `Input font-size < 16px on ${smallInputs.length} elements`, 'iOS auto-zooms inputs < 16px — causes poor UX. Examples: ' + smallInputs.slice(0,2).map(i => `${i.tag}[${i.type}]=${i.fontSize}`).join(', '));

        // Scroll to first small input so the user sees it in context
        await shotWithContext(page, 'input, select, textarea', '03d-mobile-input-fontsize-issue');
      }

      await ctx.close();
    }

    // ── 4. TABLET ───────────────────────────────────────────────────────────
    console.log('\n── Block 4: Tablet (768px)');
    {
      const ctx = await browser.newContext({ viewport: { width: 768, height: 1024 }, colorScheme: 'light' });
      const page = await ctx.newPage();
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});

      await shotAboveFold(page, '04-tablet-768-abovefold');

      const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      if (hasHScroll) log('WARN', 'Responsive', 'Horizontal scroll on tablet', 'Check layout at 768px breakpoint');

      await ctx.close();
    }

    // ── 5. KEYBOARD NAVIGATION ──────────────────────────────────────────────
    console.log('\n── Block 5: Keyboard / focus');
    {
      const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, colorScheme: 'light' });
      const page = await ctx.newPage();
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});

      const focusProblems = [];
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        // Small pause so focus ring renders
        await page.waitForTimeout(80);
        const el = await page.evaluate(() => {
          const el = document.activeElement;
          if (!el || el === document.body) return null;
          const style = window.getComputedStyle(el);
          const outline = style.outlineWidth;
          const outlineStyle = style.outlineStyle;
          const boxShadow = style.boxShadow;
          const hasFocusStyle = (parseFloat(outline) > 0 && outlineStyle !== 'none') || (boxShadow && boxShadow !== 'none');
          const rect = el.getBoundingClientRect();
          return { tag: el.tagName, text: el.textContent?.trim().slice(0,20), hasFocusStyle, top: rect.top, left: rect.left };
        });
        if (el && !el.hasFocusStyle) {
          focusProblems.push(`${el.tag}[${el.text}]`);
        }
      }

      if (focusProblems.length > 0) {
        log('FAIL', 'A11y', `Focus ring missing on ${focusProblems.length} elements`, `Elements without visible focus: ${focusProblems.join(', ')} — WCAG 2.4.7`);
      }

      // Viewport shot — shows the focused element exactly as the user sees it (not an isolated crop)
      await shotViewport(page, '05-keyboard-focus-state');

      await ctx.close();
    }

    // ── 6. REDUCED MOTION ──────────────────────────────────────────────────
    console.log('\n── Block 6: Reduced motion');
    {
      const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
      const page = await ctx.newPage();
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});

      const animatedElements = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('*'))
          .filter(el => {
            const style = window.getComputedStyle(el);
            const dur = parseFloat(style.transitionDuration || '0') + parseFloat(style.animationDuration || '0');
            return dur > 0.1;
          })
          .slice(0, 5)
          .map(el => ({ tag: el.tagName, class: el.className?.toString().slice(0,40), transitionDuration: window.getComputedStyle(el).transitionDuration }));
      });

      if (animatedElements.length > 0) {
        log('FAIL', 'A11y', `${animatedElements.length} elements still animate with prefers-reduced-motion`, `Add: @media(prefers-reduced-motion:reduce){*,*::before,*::after{transition-duration:.01ms!important;animation-duration:.01ms!important}}\nAffected: ${animatedElements.map(e => e.tag + '.' + e.class).join(', ')}`);

        // Scroll to first animated element so user sees it in context
        const firstAnimated = animatedElements[0];
        await shotWithContext(page, `${firstAnimated.tag.toLowerCase()}`, '06a-reduced-motion-issue');
      }

      // Always capture above-fold viewport in reduced-motion mode
      await shotAboveFold(page, '06b-reduced-motion-abovefold');
      await ctx.close();
    }

    // ── 7. ACCESSIBILITY — ARIA ────────────────────────────────────────────
    console.log('\n── Block 7: ARIA & structure');
    {
      const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
      const page = await ctx.newPage();
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});

      const a11y = await page.evaluate(() => {
        const issues = [];

        const imgs = document.querySelectorAll('img:not([alt])');
        if (imgs.length) issues.push({ type: 'images-no-alt', count: imgs.length });

        const emptyBtns = Array.from(document.querySelectorAll('button')).filter(b =>
          !b.textContent.trim() && !b.getAttribute('aria-label') && !b.getAttribute('aria-labelledby')
        );
        if (emptyBtns.length) issues.push({ type: 'buttons-no-label', count: emptyBtns.length });

        const inputs = Array.from(document.querySelectorAll('input, select, textarea')).filter(inp => {
          const id = inp.getAttribute('id');
          const hasLabel = id && document.querySelector(`label[for="${id}"]`);
          const hasAria = inp.getAttribute('aria-label') || inp.getAttribute('aria-labelledby');
          return !hasLabel && !hasAria && inp.type !== 'hidden' && inp.type !== 'submit' && inp.type !== 'button';
        });
        if (inputs.length) issues.push({ type: 'inputs-no-label', count: inputs.length });

        const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6'))
          .map(h => parseInt(h.tagName[1]));
        let lastLevel = 0;
        for (const level of headings) {
          if (level > lastLevel + 1) {
            issues.push({ type: 'heading-skip', detail: `h${lastLevel} → h${level}` });
            break;
          }
          lastLevel = level;
        }

        const h1count = document.querySelectorAll('h1').length;
        if (h1count > 1) issues.push({ type: 'multiple-h1', count: h1count });
        if (h1count === 0) issues.push({ type: 'no-h1', count: 0 });

        return issues;
      });

      for (const issue of a11y) {
        switch (issue.type) {
          case 'images-no-alt':
            log('FAIL', 'A11y', `${issue.count} images missing alt attribute`, 'All <img> must have alt (use alt="" for decorative images)');
            // Scroll to first image without alt so user sees it in context
            await shotWithContext(page, 'img:not([alt])', '07a-a11y-img-no-alt');
            break;
          case 'buttons-no-label':
            log('FAIL', 'A11y', `${issue.count} buttons have no accessible name`, 'Add aria-label, aria-labelledby, or visible text content');
            break;
          case 'inputs-no-label':
            log('FAIL', 'A11y', `${issue.count} inputs have no label`, 'Associate <label for="id"> or use aria-label');
            // Show the unlabelled input in its form context
            await shotWithContext(page, 'input:not([aria-label]):not([aria-labelledby])', '07b-a11y-input-no-label');
            break;
          case 'heading-skip':
            log('WARN', 'A11y', `Heading hierarchy skipped: ${issue.detail}`, 'Do not skip heading levels — h1 → h2 → h3, never h1 → h3');
            break;
          case 'multiple-h1':
            log('WARN', 'A11y', `${issue.count} h1 elements on page`, 'Each page should have exactly one <h1>');
            break;
          case 'no-h1':
            log('WARN', 'A11y', 'No <h1> on page', 'Every page needs a primary heading');
            break;
        }
      }

      await ctx.close();
    }

    // ── 8. PERFORMANCE ─────────────────────────────────────────────────────
    console.log('\n── Block 8: Performance metrics');
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      const errors = [];
      page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

      const start = Date.now();
      await page.goto(TARGET_URL, { waitUntil: 'load', timeout: 15000 }).catch(() => {});
      const wallTime = Date.now() - start;

      const perf = await measurePerf(page);
      const htmlSize = await page.evaluate(() => document.documentElement.outerHTML.length);

      console.log('  Performance:', { wallTime, ...perf, htmlSize });
      fs.writeFileSync(path.join(OUT_DIR, 'performance.json'), JSON.stringify({ wallTime, ...perf, htmlSize }, null, 2));

      if (perf.fcp > 3000) log('WARN', 'Performance', `FCP ${perf.fcp}ms (target < 1800ms)`, 'Inline critical CSS, preload fonts, reduce render-blocking resources');
      if (perf.domContentLoaded > 3000) log('WARN', 'Performance', `DOMContentLoaded ${perf.domContentLoaded}ms`, 'Defer non-critical JavaScript');
      if (htmlSize > 200000) log('WARN', 'Performance', `HTML size ${Math.round(htmlSize/1024)}KB`, 'Consider splitting or lazy-loading content > 200KB');
      if (errors.length > 0) log('WARN', 'Robustness', `${errors.length} console errors`, errors.slice(0,3).join('; '));

      await ctx.close();
    }

    // ── 9. ERROR STATES ────────────────────────────────────────────────────
    console.log('\n── Block 9: Error states');
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});

      const urlInput = await page.$('input[type="url"], input[type="text"][id*="url"], input[type="text"][id*="src"]');
      if (urlInput) {
        await urlInput.fill('not-a-valid-url');
        const submitBtn = await page.$('button[type="submit"], button.primary, button:has-text("Start"), button:has-text("Laden"), button:has-text("Go")');
        if (submitBtn) {
          await submitBtn.click({ force: true, timeout: 3000 }).catch(() => {});
          await page.waitForTimeout(800);

          // Scroll to the input/error area so the user sees the error message in context
          await shotWithContext(page, 'input[type="url"], input[type="text"][id*="url"], [class*="error"], [role="alert"]', '09-error-invalid-url');
        }
      }

      await ctx.close();
    }

    // ── 10. LAYOUT METRICS ─────────────────────────────────────────────────
    console.log('\n── Block 10: Layout metrics');
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});

      const metrics = await page.evaluate(() => {
        const measure = (sel) => {
          const el = document.querySelector(sel);
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const s = window.getComputedStyle(el);
          return { w: Math.round(r.width), h: Math.round(r.height), fontSize: s.fontSize, color: s.color, bg: s.backgroundColor };
        };
        return {
          body: { w: document.body.scrollWidth, h: document.body.scrollHeight },
          mainHeading: measure('h1'),
          primaryBtn: measure('button.primary, button[class*="primary"], .btn-primary'),
          urlInput: measure('input[type="url"]'),
          nav: measure('nav, header nav, .nav, .navbar'),
        };
      });

      fs.writeFileSync(path.join(OUT_DIR, 'layout_metrics.json'), JSON.stringify(metrics, null, 2));
      console.log('  Layout metrics saved.');

      await ctx.close();
    }

  } finally {
    await browser.close();
  }

  // ── OUTPUT ─────────────────────────────────────────────────────────────
  const summary = {
    FAIL: findings.filter(f => f.severity === 'FAIL').length,
    WARN: findings.filter(f => f.severity === 'WARN').length,
    INFO: findings.filter(f => f.severity === 'INFO').length,
  };

  const byDimension = {};
  for (const f of findings) {
    if (!byDimension[f.category]) byDimension[f.category] = [];
    byDimension[f.category].push(f);
  }

  fs.writeFileSync(path.join(OUT_DIR, 'findings.json'), JSON.stringify({ summary, byDimension, findings }, null, 2));

  console.log('\n══════════════════════════════════════════');
  console.log('Web Audit Complete');
  console.log(`FAIL: ${summary.FAIL} | WARN: ${summary.WARN} | INFO: ${summary.INFO}`);
  console.log('\nBy dimension:');
  for (const [dim, items] of Object.entries(byDimension)) {
    const fails = items.filter(i => i.severity === 'FAIL').length;
    const warns = items.filter(i => i.severity === 'WARN').length;
    console.log(`  ${dim}: ${fails > 0 ? `${fails} FAIL` : ''}${warns > 0 ? ` ${warns} WARN` : ''}${fails === 0 && warns === 0 ? '✓' : ''}`);
  }
  console.log(`\nFindings: ${OUT_DIR}/findings.json`);
  console.log(`Screenshots: ${OUT_DIR}/`);
  console.log('══════════════════════════════════════════');

  if (summary.FAIL > 0) process.exit(1);
})();
