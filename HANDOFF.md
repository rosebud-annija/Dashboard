# Agenda Austria — Projekt Handoff

*Zuletzt aktualisiert: 12. Juni 2026*

---

## Übersicht

| Projekt | Repo | Live-URL |
|---|---|---|
| Dashboard | `rosebud-annija/Dashboard` | https://rosebud-annija.github.io/Dashboard/ |
| Chatbot (Libby) + Admin | `rosebud-annija/AA-Chatbot` | https://aa-chatbot-production.up.railway.app |

---

## Dashboard — Daten-Update

### Automatisch (jeden Montag, GitHub Actions)

27 von 37 Indikatoren werden via Eurostat API aktualisiert — kein manuelles Eingreifen nötig.

**Skript:** `scripts/update-indicators.mjs` · **Workflow:** `.github/workflows/weekly-update.yml`

**Manuell auslösen:** GitHub → Actions → „Wöchentliches Daten-Update" → Run workflow

| Kategorie | Indikator | Eurostat-Dataset |
|---|---|---|
| Wirtschaft | Bevölkerung | `demo_gind` |
| | BIP real / nominal / pro Kopf | `tec00115`, `namq_10_gdp`, `nama_10_pc` |
| | Exporte / Importe | `nama_10_gdp` P6 / P7 |
| | Lohnstückkosten | `namq_10_lp_ulc` |
| | Bruttoanlageinvestitionen | `nama_10_gdp` P51G |
| | Industriestrompreis | `nrg_pc_205` |
| Arbeitsmarkt | Unselbst. Beschäftigte | `lfsq_egaps` |
| | ALQ ILO / Jugend-ALQ | `une_rt_m`, `une_rt_a` |
| | Teilzeitquote | `lfsi_pt_a` |
| | Geleistete Arbeitsstunden | `nama_10_a10_e` |
| Preise | VPI / HVPI | `prc_hicp_manr` CP00 |
| | Immobilienpreisindex | `prc_hpi_q` |
| | Mietentwicklung | `prc_hicp_manr` CP041 |
| | Energiepreise | `prc_hicp_cann` CP045 |
| Finanzen | Staatsschulden / -defizit | `gov_10dd_edpt1` |
| | Staatsquote / -einnahmen / -ausgaben | `gov_10a_main` |
| | Zinsausgaben / Abgabenquote | `gov_10a_main`, `gov_10a_taxag` |

### Manuell zu pflegen

| Indikator | Quelle | Wo aktualisieren |
|---|---|---|
| Insolvenzen | Statistik Austria | Admin Panel → Wirtschaft |
| Direktinvestitionen | OeNB | Admin Panel → Wirtschaft |
| Business Climate | WIFO-Konjunkturtest | Admin Panel → Wirtschaft |
| ALQ national | AMS | Admin Panel → Arbeitsmarkt |
| Reallöhne | AMECO | Admin Panel → Arbeitsmarkt |
| Arbeitskosten / Std. | Eurostat (manuell) | Admin Panel → Arbeitsmarkt |
| Sozialquote | Statistik Austria | Admin Panel → Finanzen |
| Faktisches Pensionsalter | OECD | Admin Panel → Arbeitsmarkt |
| Steuerkeil | OECD Taxing Wages | Admin Panel → Arbeitsmarkt |
| Pensionslücke | Agenda Austria intern | Admin Panel → Finanzen |
| Budgetvollzug | bmf.gv.at | Admin Panel → Finanzen |

### Score anpassen

Score (0–100) wird nie automatisch gesetzt — immer manuell im Admin Panel beurteilen wenn sich ein Wert stark ändert.

---

## Railway Environment Variables (AA-Chatbot)

| Variable | Zweck |
|---|---|
| `ADMIN_KEY` | Login Admin Panel |
| `ANTHROPIC_API_KEY` | Libby Chatbot |
| `GITHUB_TOKEN` | PAT mit `repo` + `workflow` Scope → Dashboard-Repo committen |
| `GITHUB_OWNER` | `rosebud-annija` |
| `GITHUB_REPO_DASHBOARD` | `Dashboard` |

---

## Repo-Struktur: rosebud-annija/Dashboard

```
/
├── index.html                      ← Dashboard
├── indikatoren.js                  ← 37 Indikatoren: value, score, Quelle
├── dashboard.js                    ← JS-Logik
├── panel-texte.js                  ← Expand-Panel-Texte
├── quellen.js                      ← Quellenverzeichnis
├── style.css
├── scripts/
│   └── update-indicators.mjs      ← Wöchentliches Fetch-Skript
└── .github/workflows/
    └── weekly-update.yml
```

**Wie Werte ins Dashboard kommen:** `syncValuesFromConfig()` in `dashboard.js` liest beim Laden `indikatoren.js`. Die GitHub Action aktualisiert `indikatoren.js` jeden Montag via Eurostat API.

---

## Schnell-Referenz

| Aufgabe | Weg |
|---|---|
| Indikator-Wert manuell setzen | Admin Panel → Kategorie → Speichern |
| Expand-Text bearbeiten | Admin Panel → Expand-Texte |
| GitHub Action manuell auslösen | GitHub → Actions → Run workflow |
| Railway Logs | Railway → AA-Chatbot → Deploy Logs |
| Neues GitHub Token | github.com/settings/tokens → `repo` + `workflow` Scope → Railway `GITHUB_TOKEN` aktualisieren |
