# Patch History

All patches follow the convention: Python script using `str.replace()` with `assert html.count(old) == 1`.
File: `mnt/outputs/agenda-austria-dashboard.html` (input and output same file).

---

## fix13.py
**Responsive font sizing for 13" laptops**
- Added `@media (max-width: 1500px)` block reducing `.kpi-value` font sizes (col-1: 28px, col-2: 32px, col-3/4: 38px)
- Added matching overrides for `span 4`/`span 5`/`span 6` inline-style cards
- Also added `@media (max-width: 1200px)` overrides for new inline-span cards

## fix14.py
**Chart colors, duplicate sources, card widths**
- Bevölkerung chart: Männer → `#009fe3` (hellblau), Frauen → `#006780` (petrol)
  - Required special case in `applyChartPaletteFromCard()` because it overrides all chart colors on every sync
- Removed duplicate source links from 5 chart cards: BIP, Export/Import, ALQ, VPI-Inflation, Staatsschulden
- Bruttoanlageinvestitionen/Abschreibungen: `col-2` → `col-4`
- Industriestrompreis: `col-2` → `col-4`

## fix15.py (REVERTED by user)
**Wide-screen 12-column grid at ≥1600px**
- Added `@media (min-width: 1600px)` switching to 12-column grid with dense auto-flow
- User did not like the result → reverted entirely
- The `@media (min-width: 1600px)` block does not exist in the current HTML

## fix16.py
**Expand-in-place feature for all 37 cards**
- CSS: `.kpi-card.expanded { grid-column: span 8 !important; }`, 3-column panel layout
- JS: `D` object with expand data for all 37 cards (`e` = Einordnung, `vt/v` = Vergleich, `b` = Bedeutung)
- `buildPanel(label)` generates panel HTML on first expand (lazy)
- Click handler on `.kpi-card`: toggles `.expanded`, shows/hides `.kpi-expand-panel`
- Close button (×) inside panel collapses card back
- White text on highlighted cards: CSS rules for both `.is-highlight` and `.is-highlight-2`

## fix17.py
**Dark mode**
- `[data-theme="dark"]` CSS variable overrides (`--bg: #0e1117`, `--card: #1a2035`, `--text: #dde3f0`, etc.)
- Toggle button in header with sun/moon SVG icons (`.theme-toggle`, `#theme-toggle`)
- `syncCharts()` updates Chart.js scale/tick/legend colors on theme switch
- `localStorage('aa-theme')` persistence
- Fixed hardcoded `background: #ffffff` on `.kpi-card` → `var(--card)`
- Fixed hardcoded `background: #f8f9fd` on `.thermo-info-panel` → `var(--card)`

## fix18.py
**Wire indikatoren.js as external config**
- Added `<script src="indikatoren.js"></script>` before main script block
- Replaced hardcoded `SCORE_DATA` object with auto-generated version from `INDIKATOREN`
- Added `syncSourceLinksFromConfig()` — updates all `a.kpi-detail` hrefs and text from config
- Called `syncSourceLinksFromConfig()` after `prepareThermoTargets()` on page init

---

## Other changes made inline (not via scripts)

**Quelldaten bar** (part of the dark mode / header update session):
- Replaced static `Stand: April 2026` text in header with a centered bar showing dynamic last-refresh timestamp
- `lastRefreshedBar()` renders date pulled from `localStorage('aa_last_refresh')`
- Removed the static `<div class="header-meta">Stand: April 2026...</div>` from header

**White text on colored cards** (supplementary to fix16):
- Added CSS rules ensuring `.kpi-value`, `.kpi-unit`, `.kpi-label`, `.kpi-detail`, `.chart-status`, `.kpi-score-chip` all have `color: #fff` under both `.is-highlight` and `.is-highlight-2`

**SCORE_DATA reordering**:
- Reordered items inside `SCORE_DATA` categories to match the visual order of cards in the dashboard (top-to-bottom, left-to-right reading order)

---

## Tricky patterns to know

### The `applyChartPaletteFromCard` override problem
`syncDashboardStyles()` calls `applyChartPaletteFromCard(card)` for every chart card on every render. This function resets dataset colors based on card status. Any chart that needs **fixed colors independent of status** must be added as a named exception inside this function. Currently handled: `chart-handel` and `chart-bevoelkerung`.

### Two highlight classes
- `.is-highlight` — set by `syncDashboardStyles()` based on extreme score values
- `.is-highlight-2` — set dynamically when user clicks a thermometer row

Both turn the card background to a status color and require white text. CSS rules must be written for both prefixes for any text element inside cards.

### Anchor string stability
When writing a new patch, verify your anchor strings are still unique with:
```python
print(html.count(your_old_string))  # must be exactly 1
```
The HTML has been patched many times; some previously-unique strings may no longer be unique after subsequent patches. Always search fresh from the current file.
