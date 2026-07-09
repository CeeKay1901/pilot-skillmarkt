# Playwright Setup Guide

Environment-specific setup for running Playwright visual audits.

---

## Termux / Android ARM64 (proot-distro method)

This is the only reliable method on Android because Playwright's Chromium requires glibc (not Android Bionic).

### Prerequisites

```bash
# 1. Install proot-distro in Termux
pkg install proot-distro

# 2. Install Ubuntu 24.04
proot-distro install ubuntu

# 3. Enter Ubuntu and install dependencies
proot-distro login ubuntu -- bash -c "
  apt update &&
  apt install -y nodejs npm chromium-browser fonts-liberation &&
  echo 'Ubuntu ready'
"

# 4. Verify Node + Chromium
proot-distro login ubuntu -- node --version
proot-distro login ubuntu -- chromium-browser --version
```

### Install Playwright Inside Ubuntu

```bash
proot-distro login ubuntu -- bash -c "
  npm install -g playwright-core &&
  # Don't download browsers — use system chromium instead
  echo 'Playwright installed'
"
```

### Platform Override (Critical)

Playwright's `coreBundle.js` rejects Android. Patch it:

```bash
proot-distro login ubuntu -- bash -c "
BUNDLE=\$(node -e \"process.stdout.write(require.resolve('playwright-core/lib/coreBundle.js'))\")
# Prepend platform override
echo 'Object.defineProperty(process, \"platform\", { get: () => \"linux\" });' | cat - \"\$BUNDLE\" > /tmp/bundle_patched.js
cp /tmp/bundle_patched.js \"\$BUNDLE\"
echo 'Patched: '\$BUNDLE
"
```

### Fix TLS Alignment (if binary crash)

If Chromium headless crashes with "TLS alignment" error:

```bash
# In Termux (not Ubuntu)
pkg install termux-elf-cleaner
proot-distro login ubuntu -- which chromium-browser
# Get the path, then:
termux-elf-cleaner /path/to/chromium-browser
```

### Running Playwright Scripts

Always use `proot-distro login ubuntu --` prefix:

```bash
proot-distro login ubuntu -- node /data/data/com.termux/files/home/myproject/audit.js
```

The same absolute paths work from inside Ubuntu (Termux home is accessible at the same path).

### Playwright Script Template for Termux

```javascript
const { chromium } = require('playwright-core');

const CHROMIUM_PATH = process.env.CHROMIUM_PATH || 
  '/usr/bin/chromium-browser';

(async () => {
  const browser = await chromium.launch({
    executablePath: CHROMIUM_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  // ... rest of script
  await browser.close();
})();
```

---

## Standard Linux / macOS / Windows

```bash
# Install with browsers
npm install playwright
npx playwright install chromium

# Or install globally
npm install -g playwright
playwright install chromium
```

### Script Template

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  // ... rest of script
  await browser.close();
})();
```

---

## CI/CD (GitHub Actions)

```yaml
- uses: microsoft/playwright-github-action@v1
- run: npx playwright test
```

Or manually:
```yaml
- run: |
    npx playwright install --with-deps chromium
    node audit/playwright-audit.js
```

---

## localStorage in Playwright

**Critical:** Do NOT set localStorage via `page.evaluate()` before navigating — it causes SecurityError.

**Correct pattern:**
```javascript
const context = await browser.newContext({
  storageState: {
    origins: [{
      origin: 'http://localhost:7799',
      localStorage: [
        { name: 'myapp_key', value: JSON.stringify({ data: true }) }
      ]
    }]
  }
});
const page = await context.newPage();
await page.goto('http://localhost:7799/index.html');
// localStorage is now available
```

---

## Serving Local Files

Always serve via HTTP — `file://` URLs block many browser APIs:

```javascript
// Quick Node.js HTTP server
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const filePath = path.join(PROJECT_DIR, req.url === '/' ? '/index.html' : req.url);
  try {
    const content = fs.readFileSync(filePath);
    const ext = path.extname(filePath);
    const mimeTypes = {
      '.html': 'text/html', '.js': 'application/javascript',
      '.css': 'text/css', '.json': 'application/json',
      '.png': 'image/png', '.jpg': 'image/jpeg',
    };
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    res.end(content);
  } catch (e) {
    res.writeHead(404);
    res.end('Not found');
  }
});

await new Promise(resolve => server.listen(7799, resolve));
```

---

## Common Playwright Errors & Fixes

| Error | Fix |
|-------|-----|
| `Unsupported platform: android` | Patch `coreBundle.js` — see above |
| `TLS alignment needs to be 64` | Run `termux-elf-cleaner` on binary |
| `libdl.so.2 not found` | Run inside proot-distro Ubuntu, not Termux |
| `page.accessibility.snapshot()` undefined | API removed — use `page.evaluate()` with manual ARIA collection |
| Click timeout 30s on element | Use `{ force: true, timeout: 3000 }` |
| SecurityError setting localStorage | Use `storageState` in `newContext()` |
| `EADDRINUSE` on port 7799 | Kill existing server: `pkill -f "node.*7799"` |
