# Visual Audit Checklist

Playwright-based visual testing checklist. Run at each viewport/scenario.

---

## Viewports to Test

| Viewport | W×H | Device |
|----------|-----|--------|
| Mobile S | 375×667 | iPhone SE |
| Mobile L | 390×844 | iPhone 14 |
| Tablet | 768×1024 | iPad |
| Desktop | 1280×800 | Laptop |
| Desktop L | 1440×900 | Large monitor |

---

## Color Modes

| Mode | How to set in Playwright |
|------|--------------------------|
| Light | `colorScheme: 'light'` |
| Dark | `colorScheme: 'dark'` |
| High Contrast | `forcedColors: 'active'` (Chromium 101+) |

---

## Scenarios & Checks

### Landing Page (Desktop Light)
- [ ] Hero content visible above fold
- [ ] Navigation renders correctly, no overflow
- [ ] Primary CTA button visible, contrast sufficient
- [ ] Logo/brand mark crisp (not pixelated)
- [ ] No layout shift on load
- [ ] Fonts loaded (no FOUT — flash of unstyled text)
- [ ] Full-page screenshot captured

### Dark Mode
- [ ] Background changes to dark color (not white)
- [ ] Text remains readable against dark background
- [ ] Buttons/cards use dark variants
- [ ] Borders/dividers visible in dark mode
- [ ] Images/icons not inverted or invisible
- [ ] Accent color still visible on dark bg
- [ ] Radial gradients/decorative elements adapt
- [ ] Input fields readable (white on dark, not invisible)
- [ ] Full-page screenshot captured

### Mobile Layout (390px)
- [ ] No horizontal scrollbar
- [ ] Navigation collapses to mobile menu or stacks
- [ ] Text readable without zooming (≥ 14px effective)
- [ ] All touch targets ≥ 44×44px
  ```javascript
  // Playwright check:
  const tooSmall = await page.evaluate(() => {
    const interactive = document.querySelectorAll('button,a,[role="button"],input,select,textarea');
    return Array.from(interactive).filter(el => {
      const r = el.getBoundingClientRect();
      return (r.width < 44 || r.height < 44) && r.width > 0;
    }).map(el => ({ tag: el.tagName, text: el.textContent?.trim().slice(0,30), w: r.width, h: r.height }));
  });
  ```
- [ ] Images scale proportionally, no overflow
- [ ] Forms usable (input zoom: `font-size ≥ 16px` prevents iOS zoom)
- [ ] Modal/dialog fits viewport
- [ ] Fixed elements don't obscure content

### Tablet Layout (768px)
- [ ] Breakpoint transition smooth (no abrupt layout jump)
- [ ] Sidebar/drawer behavior correct
- [ ] Grid reflows to 2-column from 3-column appropriately
- [ ] Tables scroll horizontally or collapse

### Interactive States

**Hover (desktop only):**
- [ ] Buttons show hover style (color change / shadow)
- [ ] Links show underline or color change on hover
- [ ] Cards show elevation/shadow on hover
- [ ] Cursor changes to `pointer` on interactive elements

**Focus (keyboard):**
- [ ] Every interactive element has visible focus ring
- [ ] Focus ring: ≥ 3:1 contrast against surrounding bg
- [ ] Focus not hidden behind other elements
- [ ] Custom focus styles replace `outline: none` with visible alternative
  ```javascript
  // Tab through and screenshot each focus state
  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => document.activeElement?.tagName);
  ```

**Active/Pressed:**
- [ ] Buttons show pressed state (scale/shadow reduction)

**Disabled:**
- [ ] Disabled elements visually distinct (opacity, cursor: not-allowed)
- [ ] Disabled elements not in tab order

### Loading & Empty States
- [ ] Skeleton screens or spinners shown during load
- [ ] Empty list/table: helpful message shown (not blank space)
- [ ] Zero state has CTA to add first item
- [ ] Loading spinner accessible (aria-label, role="status")

### Error States
- [ ] Form validation errors shown inline (not alert box)
- [ ] Error text associated with field (aria-describedby)
- [ ] Error color not red-only (icon or text also used)
- [ ] Network error shown with retry option
- [ ] 404/not-found page: helpful, branded, has navigation

### Modals & Dialogs
- [ ] Focus moves into modal on open
- [ ] Focus trapped within modal (Tab wraps)
- [ ] Escape key closes modal
- [ ] Focus returns to trigger element on close
- [ ] Backdrop: clicking outside closes (or doesn't — consistent)
- [ ] Modal scrollable if content is long
- [ ] Full-page behind modal correctly dimmed

### Animations & Motion
- [ ] Transitions smooth (no jank)
- [ ] With `prefers-reduced-motion: reduce`:
  - [ ] Page transitions instant (not animated)
  - [ ] Spinners/loaders: either static or very subtle
  - [ ] No parallax scroll effects
  - [ ] Carousels/sliders: autoplay stopped
  ```javascript
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  // Check transition-duration in computed styles = 0.01ms
  ```

### Typography & Readability
- [ ] Body text: ≥ 16px on mobile, ≥ 14px on desktop
- [ ] Line height: 1.4–1.6 for body text
- [ ] Max line length: ≤ 75 characters (≈ 650px wide at 16px)
- [ ] Heading hierarchy visually clear (size steps meaningful)
- [ ] Font rendering: no blurry or aliased text at any size

### Color Contrast (automated check)
Use axe-core or manual contrast check:
```javascript
// Inject axe-core and check
await page.addScriptTag({ url: 'https://cdn.jsdelivr.net/npm/axe-core/axe.min.js' });
const results = await page.evaluate(() => new Promise(r => axe.run(r)));
const colorViolations = results.violations.filter(v => v.id.includes('color-contrast'));
```

Minimum ratios:
| Text Type | Minimum | Target |
|-----------|---------|--------|
| Normal (< 18pt) | 4.5:1 | 7:1 |
| Large (≥ 18pt) | 3:1 | 4.5:1 |
| UI components | 3:1 | 4.5:1 |

### Print Layout
- [ ] Navigation hidden in print
- [ ] Ads/sidebars hidden
- [ ] Link URLs printed after link text
- [ ] Background colors/images not printed (or intentional)

---

## Screenshot Strategy

Name screenshots to tell a story:
```
01-landing-desktop-light.png
02-landing-desktop-dark.png
03-mobile-375-light.png
04-mobile-375-dark.png
05-hover-primary-button.png
06-focus-first-input.png
07-modal-open.png
08-error-state-form.png
09-empty-state.png
10-reduced-motion.png
```

Capture:
- Full page for layout checks (scrollHeight)
- Viewport crop for above-fold checks
- Element-level for component checks (`element.screenshot()`)

---

## Automated vs Manual

| Check | Automated | Manual |
|-------|-----------|--------|
| Color contrast | ✅ axe-core | Visual confirm |
| Touch target size | ✅ Playwright evaluate | — |
| Keyboard navigation | ✅ Tab simulation | Manual for complex widgets |
| Dark mode rendering | ✅ colorScheme + screenshot | Visual review |
| Font loading | ✅ Performance API | — |
| Subjective aesthetics | ❌ | ✅ |
| Competitive comparison | ❌ | ✅ |
| Content quality | ❌ | ✅ |
