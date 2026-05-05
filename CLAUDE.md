# Agenda Austria Dashboard — Project Context

## What This Is

A single-page economic dashboard for Agenda Austria, displaying 37 KPI indicators across 4 categories (Wirtschaft, Arbeitsmarkt, Preise & Inflation, Öffentliche Finanzen). Built as a self-contained HTML file with embedded fonts, CSS, and JavaScript. Deployed to GitHub Pages.

The original HTML was generated in full in a Cowork session (Anthropic's desktop Claude tool) and then iteratively patched using numbered Python scripts (`fix13.py`–`fix18.py`).

---

## Repository File Structure

```
/
├── index.html             ← Main dashboard (rename agenda-austria-dashboard.html → index.html for GitHub Pages)
├── indikatoren.js         ← Config: all 37 indicators, values, sources, scores — EDIT THIS for data updates
├── CLAUDE.md              ← This file
└── docs/
    └── patches.md         ← History of all patches applied
```

The dashboard HTML references `indikatoren.js` via `<script src="indikatoren.js"></script>`. Both files must be served from the same directory.

---

## How to Make Changes

### Patching convention
All code changes are made via Python patch scripts using exact string replacement with assertions:

```python
old = '  background: #ffffff;\n'
new = '  background: var(--card);\n'
assert html.count(old) == 1, f"expected 1, got {html.count(old)}"
html = html.replace(old, new)
```

**Never use regex on the main HTML** — the embedded base64 fonts make regex slow and unreliable. Always use `str.replace()` with `assert count == 1` to guarantee safe, targeted edits.

Name scripts sequentially: `fix19.py`, `fix20.py`, etc.

### Updating indicator data
Edit `indikatoren.js` only — no HTML changes needed. Each indicator has:
- `value` — display value (e.g. `'−0,7 %'`)
- `data_period` — time period of the value (e.g. `'März 2026'`)
- `score` — Zukunftswert score 0–100 (≥60 green, 45–59 yellow, <45 red)
- `source_name` / `source_url` — shown as clickable link in card footer

---

## CSS Architecture

### Design tokens (`:root`)
```css
--dunkelblau: #27348b   /* brand / header */
--mint:       #8ccaae   /* good/green */
--orange:     #e84e0f   /* bad/red */
--gelb:       #f9b000   /* neutral/yellow */
--petrol:     #006780
--violett:    #a877b2
--bg:         #f0f2f8   /* page background */
--card:       #ffffff   /* card background */
--text:       #14193a
--muted:      #5a6890
--bad:        #e84e0f
--good:       #8ccaae
--neutral-c:  #f9b000
```

Dark mode overrides live under `[data-theme="dark"]` (see dark mode section below).

### Grid system
The KPI grid is `repeat(8, 1fr)` with four card width classes:
- `.col-1` → `span 1` (narrow stat)
- `.col-2` → `span 2` (standard stat)
- `.col-3` → `span 3` (wide stat)
- `.col-4` → `span 4` (half-width chart)
- Some chart cards use inline `style="grid-column: span N"` for non-standard widths

`.row-2` makes a card double-height (`grid-row: span 2`).

Card status classes: `.bad`, `.neutral`, `.good` — these drive background color via CSS variables.

### Responsive breakpoints
| Breakpoint | Behavior |
|---|---|
| `≤767px` | Mobile: all cards full-width (span 8), charts hidden |
| `≤1200px` | Tablet: 2-column layout, col-N all become span 4 |
| `≤1500px` | 13" laptop: slightly smaller font sizes (kpi-value 28–34px) |
| `≥1600px` | Wide: currently no special grid override (was added then removed per user request) |

When adding new chart cards with inline `style="grid-column: span N"`, you must add matching override rules in **both** the `≤1200px` and `≤767px` media query blocks, e.g.:
```css
/* ≤1200px */
.kpi-grid > [style*="grid-column: span 5"] { grid-column: span 4 !important; }
/* ≤767px */
.kpi-grid > [style*="grid-column: span 5"] { grid-column: span 8 !important; }
```

---

## JavaScript Architecture

### Key globals

| Name | Purpose |
|---|---|
| `INDIKATOREN` | Config object from `indikatoren.js` — source of truth for scores, sources, labels |
| `SCORE_DATA` | Auto-generated from `INDIKATOREN` — drives Zukunftswert thermometer |
| `D` (inside IIFE) | Expand panel data: `{ 'Label': { e, vt, v, b } }` for all 37 cards |
| `_activeThermo` | Tracks currently highlighted thermometer row + card |

### Core functions

**`syncDashboardStyles()`** — called on load and after any state change. Applies card status colors, calls `applyChartPaletteFromCard()` for each chart card, updates Zukunftswert thermometer fill.

**`applyChartPaletteFromCard(card)`** — syncs a chart's dataset colors to match the card's current status color. Has named exceptions:
- `chart-handel` — always uses `#e84e0f` (Exporte) and `PALETTE[3]` (Importe)
- `chart-bevoelkerung` — always uses `#009fe3` (Männer) and `#006780` (Frauen)
  - ⚠️ If you add more chart cards, add exceptions here if they need fixed colors independent of status

**`refreshLiveData()`** — async, fetches live data from Eurostat API. Called once per week (checked via `localStorage('aa_refresh_week')`). Live datasets:
- `tec00115` → BIP-Wachstum real
- `une_rt_m` → ALQ Eurostat (ILO)
- `prc_hicp_minr` → HVPI (monthly)
- `prc_hicp_manr` → HVPI (annual)
- `prc_hpi_q` → Immobilienpreisindex
- `gov_10dd_edpt1` → Staatsschuldenquote

**`prepareThermoTargets()`** — sets `data-thermo-key` on every `.kpi-card` (normalized label for fuzzy matching).

**`syncSourceLinksFromConfig()`** — updates all `a.kpi-detail` links from `INDIKATOREN` config. Called after `prepareThermoTargets()`.

**`normalizeThermoLabel(value)`** — normalizes German labels for fuzzy matching (ä→ae, removes parens, etc.). Used by thermometer click handler and `syncSourceLinksFromConfig`.

### Expand panels (in-place)
Each card is clickable and expands to `span 8` showing a 3-column panel:
- **Einordnung** — contextual text
- **Vergleich** — horizontal bar chart comparing Austria to other countries/metrics
- **Bedeutung** — policy significance text

Panel data lives in the `D` object inside the expand IIFE (around line 560,000 in the HTML). Structure:
```js
D['Label'] = {
  e: 'Einordnung text...',
  vt: 'Vergleich title',
  v: [{n:'Österreich', v:'9,22 Mio.', w:11, c:''}, ...],  // w=bar width%, c=highlight class
  b: 'Bedeutung text...'
};
```

### Dark mode
Toggled via `data-theme="dark"` on `<html>`. CSS variables are overridden under `[data-theme="dark"]`. Persisted in `localStorage('aa-theme')`.

`syncCharts()` — called on theme toggle, updates all Chart.js scale/tick/legend colors to match current CSS variable values.

### Highlight systems (two distinct mechanisms)
1. **`.is-highlight`** — static score-based coloring applied by `syncDashboardStyles()` when a card's score is extreme
2. **`.is-highlight-2`** — dynamic, applied when user clicks a thermometer row. Sets inline `background` + CSS custom properties (`--hl2-text`, `--hl2-muted`, etc.)

Both require identical CSS rules for white text on colored backgrounds. If you add new text elements inside `.kpi-card`, add rules for both:
```css
.is-highlight .new-element,
.is-highlight-2 .new-element { color: var(--hl2-text, #fff) !important; }
```

---

## Chart Canvas IDs

| Canvas ID | Indicator |
|---|---|
| `chart-bevoelkerung` | Bevölkerung (stacked bar: Männer/Frauen) |
| `chart-bip` | BIP-Wachstum real |
| `chart-handel` | Exporte/Importe (two datasets) |
| `chart-alq` | Arbeitslosenquote national |
| `chart-stellen` | (open positions / job market) |
| `chart-pensionsalter` | Faktisches Pensionsalter |
| `chart-inflation` | VPI / Inflation |
| `chart-immo` | Immobilienpreisindex |
| `chart-energie` | Energiepreise |
| `chart-schulden` | Staatsschuldenquote |
| `chart-quoten` | (quota comparison) |
| `chart-aufgaben` | (expenditure breakdown) |

---

## Header / Footer

The header contains:
- Agenda Austria branding + logo (inline SVG + base64 font)
- Dark mode toggle button (`#theme-toggle`) with sun/moon SVG icons
- A centered "Quelldaten zuletzt abgerufen" bar showing last data refresh timestamp

The footer shows: `Stand: April 2026 · Alle Angaben in % des BIP soweit nicht anders vermerkt`

---

## Known Issues / Pending Work

1. **Server-side weekly data refresh** — Currently each client browser fetches Eurostat data once per week via `localStorage`. The user wanted centralized weekly fetching (so the HTML always has fresh data without client-side API calls). Architecture discussed: GitHub Actions workflow that runs weekly, fetches data, updates `indikatoren.js`, commits and pushes. Not yet implemented.

2. **`indikatoren.js` not yet wired to expand panel data** — The `D` object inside the expand IIFE still has hardcoded Einordnung/Vergleich/Bedeutung text. These could optionally be moved into `indikatoren.js` as well.

3. **`indikatoren.js` not yet wired to chart time-series data** — Chart data arrays (year-by-year series) are still hardcoded in the HTML. Only live-fetched Eurostat charts update dynamically.

---

## Deployment

Hosted on GitHub Pages. Repository should have both `index.html` (renamed from `agenda-austria-dashboard.html`) and `indikatoren.js` in the root.

To deploy an update:
1. Edit `indikatoren.js` with new values
2. `git add indikatoren.js && git commit -m "Update indicators April 2026" && git push`
3. GitHub Pages rebuilds automatically (~60 seconds)

---

## Patch History Summary

See `docs/patches.md` for full details. Patches applied in this session: fix13–fix18.
