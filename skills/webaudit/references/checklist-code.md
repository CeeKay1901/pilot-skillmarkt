# Code Audit Checklist

Comprehensive static analysis checklist. Mark each: ✅ PASS / ❌ FAIL / ⚠️ WARN / N/A

---

## Security

### Input / Output
- [ ] All `innerHTML` assignments sanitize input (no raw user data)
- [ ] No `eval()` / `new Function()` with user-controlled content
- [ ] No `document.write()` with dynamic content
- [ ] `dangerouslySetInnerHTML` (React) only with sanitized HTML
- [ ] URL params decoded with `decodeURIComponent`, not inserted raw into DOM
- [ ] JSON.parse() wrapped in try/catch
- [ ] `postMessage` listeners validate `event.origin`

### Secrets & Config
- [ ] No hardcoded API keys, tokens, passwords in source
- [ ] Sensitive config loaded from env vars, not committed
- [ ] `.env` files in `.gitignore`

### Network
- [ ] `Content-Security-Policy` header or meta tag present
- [ ] `X-Frame-Options` or `frame-ancestors` CSP set
- [ ] External scripts loaded from trusted CDNs with `integrity` attribute (SRI)
- [ ] CORS: `Access-Control-Allow-Origin` not `*` for credentialed requests
- [ ] Cookies set with `Secure; HttpOnly; SameSite=Strict`
- [ ] Mixed content: no HTTP resources loaded from HTTPS page

### Authentication (if applicable)
- [ ] Tokens stored in HttpOnly cookies, not localStorage
- [ ] CSRF protection on mutating endpoints
- [ ] Auth state validated server-side, not just client-side

---

## Accessibility (WCAG 2.1 AA)

### Structure
- [ ] `<html lang="...">` attribute set
- [ ] Page has exactly one `<h1>`
- [ ] Heading hierarchy not skipped (h1 → h2 → h3, no h1 → h3)
- [ ] Skip navigation link as first focusable element
- [ ] `<main>`, `<nav>`, `<header>`, `<footer>` landmarks used
- [ ] `<title>` is unique and descriptive per page

### Images & Media
- [ ] All `<img>` have `alt` attribute (decorative: `alt=""`)
- [ ] Complex images have extended descriptions (`aria-describedby` or `<figure>`)
- [ ] Video has captions; audio has transcript
- [ ] SVGs have `<title>` or `aria-label` if meaningful

### Forms
- [ ] Every input has associated `<label>` (not just placeholder)
- [ ] Required fields marked with `aria-required="true"` or `required`
- [ ] Error messages linked to inputs with `aria-describedby`
- [ ] Form error summary announced via `aria-live="assertive"`
- [ ] Autocomplete attributes set (`username`, `email`, etc.)

### Interactive Elements
- [ ] All interactive elements reachable via keyboard (Tab order)
- [ ] Custom widgets have correct ARIA roles (button, dialog, listbox...)
- [ ] Focus visible — no `outline: none` without replacement style
- [ ] Touch targets ≥ 44×44px on mobile (WCAG 2.5.5)
- [ ] Touch targets ≥ 24×24px minimum (WCAG 2.5.8)
- [ ] No keyboard trap (modal dialogs must trap focus, but allow Escape)

### Color & Contrast
- [ ] Normal text: contrast ratio ≥ 4.5:1
- [ ] Large text (18pt / 14pt bold): ratio ≥ 3:1
- [ ] UI components & focus indicators: ratio ≥ 3:1
- [ ] Information not conveyed by color alone

### Motion
- [ ] `@media (prefers-reduced-motion: reduce)` disables all animations
- [ ] No content flashing > 3 times/second (seizure risk)
- [ ] Auto-playing motion: can pause/stop/hide

### Dynamic Content
- [ ] AJAX content updates announced via `aria-live` regions
- [ ] Modal dialogs: focus moves in on open, returns to trigger on close
- [ ] Loading states communicated via `aria-busy="true"`
- [ ] Status messages use `role="status"` or `aria-live="polite"`

---

## Performance

### Loading
- [ ] HTML document < 100KB (prefer < 50KB)
- [ ] No render-blocking `<script>` in `<head>` without `async`/`defer`
- [ ] Critical CSS inlined; non-critical loaded asynchronously
- [ ] Images use modern formats (WebP/AVIF) with fallback
- [ ] Images have `width`/`height` to prevent layout shift (CLS)
- [ ] `<link rel="preload">` for critical fonts/assets
- [ ] Fonts: `font-display: swap` or `optional`

### Runtime
- [ ] No synchronous XHR (`XMLHttpRequest` without async)
- [ ] Heavy computations off main thread (Web Workers)
- [ ] Large lists virtualized (not 1000 DOM nodes)
- [ ] No memory leaks: `removeEventListener` called when element removed
- [ ] `frame.onload` = null before reassigning (prevents handler accumulation)
- [ ] `debounce`/`throttle` on scroll/resize handlers
- [ ] `passive: true` on scroll/touch listeners

### Bundle
- [ ] No unused libraries (jQuery for one selector, etc.)
- [ ] Code splitting: only load what's needed per route
- [ ] `console.log` removed from production code
- [ ] Source maps disabled in production (security)

### Core Web Vitals Targets
| Metric | Good | Needs Work |
|--------|------|------------|
| LCP (Largest Contentful Paint) | < 2.5s | > 4s |
| INP (Interaction to Next Paint) | < 200ms | > 500ms |
| CLS (Cumulative Layout Shift) | < 0.1 | > 0.25 |
| FCP (First Contentful Paint) | < 1.8s | > 3s |
| TTFB (Time to First Byte) | < 800ms | > 1.8s |

---

## Robustness

### Error Handling
- [ ] All `Promise` chains have `.catch()` or `try/catch`
- [ ] `async` functions in event handlers wrapped in try/catch
- [ ] Network errors handled (fetch failure, timeout, 4xx/5xx)
- [ ] `JSON.parse()` wrapped in try/catch
- [ ] `localStorage`/`sessionStorage` access wrapped (can throw in private mode)
- [ ] Error messages user-friendly, not stack traces

### Race Conditions & Async
- [ ] No multiple concurrent requests that can arrive out-of-order (cancel previous)
- [ ] Loading state prevents duplicate submissions
- [ ] Screenshots/captures taken before DOM cleanup (not after)
- [ ] `await` used correctly (not fire-and-forget in loops)

### Input Validation
- [ ] URL parameters validated before use
- [ ] File uploads: type and size checked client-side
- [ ] Numeric inputs clamped to valid ranges
- [ ] Required fields validated before submission

### State Management
- [ ] No global mutable state shared between unrelated features
- [ ] UI state consistent after navigation (back button, refresh)
- [ ] `localStorage` keys namespaced to avoid collisions
- [ ] Graceful degradation when localStorage unavailable

---

## CSS / Design System

### Theming
- [ ] CSS custom properties (`--var`) used for all colors/spacing
- [ ] Dark mode via `@media (prefers-color-scheme: dark)` on `:root` vars
- [ ] Dark mode applies to all elements (borders, shadows, images)
- [ ] High contrast mode: `@media (forced-colors: active)` handled

### Responsive Layout
- [ ] No horizontal scroll at any standard breakpoint (320px, 768px, 1280px)
- [ ] Breakpoints: 375px (mobile), 768px (tablet), 1280px (desktop)
- [ ] Text remains readable without zooming (≥ 16px base on mobile)
- [ ] Tap targets: ≥ 44px on ≤ 900px screens
- [ ] No fixed widths that break on small screens

### Visual Consistency
- [ ] Consistent spacing scale (4px / 8px grid)
- [ ] No magic numbers — spacing references tokens/variables
- [ ] Font scale defined (not random px values throughout)
- [ ] Button/input border-radius consistent
- [ ] Focus style consistent across all interactive elements

### Print
- [ ] `@media print` styles: hide nav/ads, show URLs on links

---

## Code Quality

### Architecture
- [ ] No circular dependencies
- [ ] Functions: single responsibility, < 50 lines
- [ ] No deeply nested callbacks (promise chain or async/await instead)
- [ ] DOM manipulation batched (not inside loop per-element)
- [ ] Event delegation used for dynamic lists

### Maintainability
- [ ] No dead code (unreachable branches, unused variables)
- [ ] No commented-out code blocks
- [ ] Magic numbers replaced with named constants
- [ ] Consistent naming convention (camelCase / kebab-case)

### Browser Compatibility
- [ ] No APIs without feature detection for target browsers
- [ ] CSS: vendor prefixes where needed, or postcss-autoprefixer
- [ ] No use of deprecated APIs
