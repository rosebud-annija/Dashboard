# Agenda Austria Dashboard — Project Context

## Was es ist

Single-page Wirtschafts-Dashboard für Agenda Austria. 37 KPI-Indikatoren in 4 Kategorien (Wirtschaft, Arbeitsmarkt, Preise & Inflation, Öffentliche Finanzen). Deployed auf GitHub Pages.

---

## Datei-Struktur

```
/
├── index.html                      ← Dashboard (self-contained HTML + CSS + JS)
├── indikatoren.js                  ← Alle 37 Indikatoren: value, score, Quelle
├── dashboard.js                    ← JS-Logik
├── panel-texte.js                  ← Expand-Panel-Texte
├── quellen.js                      ← Quellenverzeichnis + Eurostat-Live-Config
├── style.css                       ← Stylesheet
├── scripts/
│   └── update-indicators.mjs      ← Wöchentliches Fetch-Skript (GitHub Actions)
└── .github/workflows/
    └── weekly-update.yml           ← Cron: jeden Montag
```

`index.html` lädt `indikatoren.js` via `<script src="indikatoren.js">`. Beide müssen im selben Verzeichnis liegen.

---

## Daten-Update

### Automatisch — jeden Montag via GitHub Actions

`scripts/update-indicators.mjs` holt aktuelle Werte von **Eurostat API** und schreibt sie in `indikatoren.js` zurück. GitHub Actions committet und pusht automatisch.

**Manuell auslösen:** GitHub → Actions → „Wöchentliches Daten-Update" → Run workflow

#### Automatisch aktualisierte Indikatoren (27 von 37)

| Kategorie | Indikator | Eurostat-Dataset |
|---|---|---|
| Wirtschaft | Bevölkerung | `demo_gind` indic_de=JAN |
| | BIP-Wachstum real | `tec00115` |
| | BIP nominal | `namq_10_gdp` |
| | BIP pro Kopf | `nama_10_pc` |
| | Exporte (Waren) | `nama_10_gdp` P6 |
| | Importe | `nama_10_gdp` P7 |
| | Lohnstückkosten | `namq_10_lp_ulc` |
| | Bruttoanlageinvestitionen | `nama_10_gdp` P51G |
| | Industriestrompreis | `nrg_pc_205` |
| Arbeitsmarkt | Unselbst. Beschäftigte | `lfsq_egaps` |
| | ALQ Eurostat (ILO) | `une_rt_m` |
| | Jugend-ALQ | `une_rt_a` |
| | Teilzeitquote | `lfsi_pt_a` |
| | Geleistete Arbeitsstunden | `nama_10_a10_e` |
| Preise | VPI / Inflation | `prc_hicp_manr` CP00 |
| | HVPI | `prc_hicp_manr` CP00 |
| | Immobilienpreisindex | `prc_hpi_q` |
| | Mietentwicklung | `prc_hicp_manr` CP041 |
| | Energiepreise | `prc_hicp_cann` CP045 |
| Finanzen | Staatsschuldenquote | `gov_10dd_edpt1` GD |
| | Staatsdefizit | `gov_10dd_edpt1` B9 |
| | Staatsquote | `gov_10a_main` TE |
| | Staatseinnahmen | `gov_10a_main` TR |
| | Zinsausgaben | `gov_10a_main` D41PAY |
| | Abgabenquote | `gov_10a_taxag` |
| | Staatsausgaben | `gov_10a_main` TE (MIO_EUR) |

### Manuell zu pflegen (10 Indikatoren)

| Indikator | Quelle | Warum kein API |
|---|---|---|
| Insolvenzen | Statistik Austria | HTML-Scraping unzuverlässig |
| Direktinvestitionen | OeNB | Eurostat `bop_fdi6_pos` zu groß (HTTP 413) |
| Business Climate | WIFO-Konjunkturtest | Kein offener API |
| ALQ national | AMS | Österr. Methode, kein Eurostat-Äquivalent |
| Reallöhne | AMECO | Kein Eurostat-Äquivalent |
| Arbeitskosten / Std. | Eurostat (manuell) | Kein EUR/h-Dataset verfügbar |
| Sozialquote | Statistik Austria | ESSPROS-Dataset nicht im API |
| Faktisches Pensionsalter | OECD | OECD-API komplex, kein Eurostat |
| Steuerkeil | OECD Taxing Wages | OECD-API, kein Eurostat |
| Pensionslücke | Agenda Austria intern | Interne Berechnung |
| Budgetvollzug | BMF | Kein API |

**Manuell aktualisieren:** Admin Panel → Kategorie → Wert eintragen → Speichern

### Score anpassen

Score (0–100) wird nie automatisch gesetzt. Nach jeder Wert-Änderung manuell im Admin Panel beurteilen: ≥60 grün · 45–59 gelb · <45 rot.

---

## Indikatoren-Konfiguration (`indikatoren.js`)

Jeder Indikator hat folgende Felder:

```js
{
  label:       'BIP-Wachstum real',   // Anzeigename (muss mit tryUpdate-Label übereinstimmen)
  value:       '+0,5 %',              // Anzeigewert — wird vom Skript überschrieben
  data_period: '2025',                // Zeitraum — wird vom Skript überschrieben
  score:       35,                    // 0–100, immer manuell setzen
  source_name: 'Eurostat',            // Erscheint als Link-Text im Dashboard
  source_url:  'https://...',         // Direkt-URL zur Quelle
  eurostat_id: 'tec00115',           // Dataset-ID (leer wenn kein Eurostat)
  update:      'jährlich',            // monatlich | quartalsweise | halbjährlich | jährlich
  notes:       '...',                 // Interne Notizen, nicht im Dashboard sichtbar
}
```

Manuelle Wert-Aktualisierung: nur `value`, `data_period`, `score` ändern — keine HTML-Änderung nötig.

---

## Code-Änderungen am Dashboard (index.html)

Alle Änderungen via Python-Skript mit exaktem String-Replacement:

```python
old = '  background: #ffffff;\n'
new = '  background: var(--card);\n'
assert html.count(old) == 1, f"expected 1, got {html.count(old)}"
html = html.replace(old, new)
```

**Nie Regex auf dem HTML** — eingebettete Base64-Fonts machen Regex langsam und fehleranfällig. Skripte sequenziell nummerieren: `fix32.py`, `fix33.py`, …

---

## CSS-Architektur

### Design Tokens (`:root`)
```css
--dunkelblau: #27348b   /* Brand / Header */
--mint:       #8ccaae   /* gut / grün */
--orange:     #e84e0f   /* schlecht / rot */
--gelb:       #f9b000   /* neutral / gelb */
--bg:         #f0f2f8   /* Seitenhintergrund */
--card:       #ffffff   /* Karten-Hintergrund */
--text:       #14193a
--muted:      #5a6890
```

Dark Mode: CSS-Variablen-Overrides unter `[data-theme="dark"]`. Persisted in `localStorage('aa-theme')`.

### Grid
`repeat(8, 1fr)` — Kartenbreiten: `.col-1`=span1 · `.col-2`=span2 · `.col-3`=span3 · `.col-4`=span4. `.row-2` = doppelte Höhe. Status-Klassen: `.bad` · `.neutral` · `.good`.

Responsive Breakpoints: ≤767px (Mobile, alle Karten span8) · ≤1200px (Tablet, 2-spaltig) · ≤1500px (13"-Laptop, kleinere Schrift).

Bei neuen Chart-Karten mit `style="grid-column: span N"` müssen Override-Regeln in **beiden** Media Queries ergänzt werden.

---

## JavaScript-Architektur

| Name | Zweck |
|---|---|
| `INDIKATOREN` | Config aus `indikatoren.js` — Quelle für Scores, Quellen, Labels |
| `SCORE_DATA` | Auto-generiert aus `INDIKATOREN` — Zukunftswert-Thermometer |
| `D` (inside IIFE) | Expand-Panel-Texte: `{ 'Label': { e, vt, v, b } }` |

**`syncDashboardStyles()`** — Karten-Status-Farben, Chart-Paletten, Thermometer-Fill.

**`applyChartPaletteFromCard(card)`** — Chart-Farben = Karten-Status. Exceptions:
- `chart-handel` → immer `#e84e0f` (Exporte) + `PALETTE[3]` (Importe)
- `chart-bevoelkerung` → immer `#009fe3` (Männer) + `#006780` (Frauen)

**`refreshLiveData()`** — Client-seitiger Fallback: holt Eurostat-Daten direkt im Browser, max. 1× pro Woche (`localStorage('aa_refresh_week')`). Greift nur wenn `indikatoren.js` keine aktuellen Werte hat.

**Expand Panels** — Klick auf Karte → span8, 3-spaltig: Einordnung / Vergleich / Bedeutung. Daten im `D`-Objekt im HTML (ca. Zeile 560.000).

**Highlight-Systeme:**
- `.is-highlight` — statisch, score-basiert
- `.is-highlight-2` — dynamisch, Thermometer-Klick

---

## Chart Canvas IDs

| ID | Indikator |
|---|---|
| `chart-bevoelkerung` | Bevölkerung |
| `chart-bip` | BIP-Wachstum real |
| `chart-handel` | Exporte / Importe |
| `chart-alq` | Arbeitslosenquote national |
| `chart-inflation` | VPI / Inflation |
| `chart-immo` | Immobilienpreisindex |
| `chart-energie` | Energiepreise |
| `chart-schulden` | Staatsschuldenquote |

---

## Deployment

GitHub Pages — `index.html` + `indikatoren.js` im Root.

```bash
git add indikatoren.js && git commit -m "Update indicators" && git push
# → GitHub Pages rebuild ~60 Sekunden
```

GitHub Actions aktualisiert `indikatoren.js` automatisch jeden Montag.
