#!/usr/bin/env node
/**
 * update-indicators.mjs — Agenda Austria Dashboard
 * Läuft wöchentlich via GitHub Actions.
 * Holt aktuelle Werte von Eurostat und Statistik Austria,
 * schreibt sie in indikatoren.js zurück.
 *
 * Quellen: Eurostat API (kostenlos, kein Auth) für alle automatisierten Indikatoren.
 *          Statistik Austria HTML für Insolvenzen, Arbeitsstunden (kann fehlschlagen).
 *
 * Wirtschaft — Eurostat:
 *   Bevölkerung (demo_gind), Exporte/Importe (nama_10_gdp P6/P7),
 *   BIP real (tec00115), BIP nominal (namq_10_gdp), BIP pro Kopf (nama_10_pc),
 *   Lohnstückkosten (namq_10_lp_ulc), Bruttoanlageinvestitionen (nama_10_gdp P51G),
 *   Industriestrompreis (nrg_pc_205)
 *
 * Manuell bleiben: Budgetvollzug (BMF), Pensionslücke, Direktinvestitionen (OeNB),
 *                  Business Climate (WIFO), Unselbst. Beschäftigte (AMS), Reallöhne,
 *                  Insolvenzen (Stat. Austria HTML oft fehlerhaft).
 *
 * Node 18+ vorausgesetzt (built-in fetch).
 * Aufruf: node scripts/update-indicators.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INDIKATOREN_PATH = join(__dirname, '..', 'indikatoren.js');
const EUROSTAT = 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/';

// ── Formatierung ──────────────────────────────────────────────────────────────

const FMT = new Intl.NumberFormat('de-AT');

function fmtDE(v, digits = 1) {
  if (v === null || v === undefined || isNaN(v)) return null;
  return new Intl.NumberFormat('de-AT', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(v);
}

function withSign(v, digits = 1) {
  const s = fmtDE(v, digits);
  return s === null ? null : (v > 0 ? '+' : '') + s;
}

function pct(v, digits = 1)       { const s = fmtDE(v, digits); return s ? s + ' %' : null; }
function pctSign(v, digits = 1)   { const s = withSign(v, digits); return s ? s + ' %' : null; }
function pctBIP(v, digits = 1)    { const s = fmtDE(v, digits); return s ? s + ' % BIP' : null; }
function pctBIPSign(v, digits = 1){ const s = withSign(v, digits); return s ? s + ' % BIP' : null; }

const MONATE = ['Jän.','Feb.','Mär.','Apr.','Mai','Jun.','Jul.','Aug.','Sep.','Okt.','Nov.','Dez.'];

function monthLabel(t) {
  if (!t) return t;
  let m = String(t).match(/^(\d{4})[M-](\d{2})$/);
  if (m) return MONATE[+m[2]-1] + ' ' + m[1];
  m = String(t).match(/^(\d{4})-?Q([1-4])$/);
  if (m) return 'Q' + m[2] + ' ' + m[1];
  return String(t);
}

// ── Eurostat JSON-stat Parser ─────────────────────────────────────────────────

function parseTime(s) {
  if (/^\d{4}$/.test(s)) return +new Date(+s, 0);
  let m = s.match(/^(\d{4})[M-](\d{2})$/);
  if (m) return +new Date(+m[1], +m[2]-1);
  m = s.match(/^(\d{4})-?Q([1-4])$/);
  if (m) return +new Date(+m[1], (+m[2]-1)*3);
  return 0;
}

function decodeEurostat(json) {
  if (!json?.id || !json?.dimension) return [];
  const dims = json.id;
  const cats = {};
  dims.forEach(d => {
    const idx = json.dimension[d]?.category?.index || {};
    cats[d] = Object.keys(idx).sort((a, b) => idx[a] - idx[b]);
  });
  const total = dims.reduce((a, d) => a * cats[d].length, 1);
  const rows = [];
  for (let flat = 0; flat < total; flat++) {
    const obs = {}; let rem = flat;
    for (let i = dims.length - 1; i >= 0; i--) {
      const d = dims[i];
      obs[d] = cats[d][rem % cats[d].length];
      obs[d + '_label'] = json.dimension[d]?.category?.label?.[obs[d]] || obs[d];
      rem = Math.floor(rem / cats[d].length);
    }
    const raw = Array.isArray(json.value) ? json.value[flat] : json.value[String(flat)];
    if (raw == null || raw === ':') continue;
    obs.value = +raw;
    rows.push(obs);
  }
  const td = dims.find(d => /time/i.test(d));
  if (td) rows.sort((a, b) => parseTime(a[td]) - parseTime(b[td]));
  return rows;
}

function latestEurostat(rows) {
  return rows.length ? rows[rows.length - 1] : null;
}

function timeDimOf(json) {
  return json.id.find(d => /time/i.test(d));
}

async function fetchEurostat(dataset, params = {}) {
  const url = new URL(EUROSTAT + dataset);
  url.searchParams.set('lang', 'EN');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const r = await fetch(url.toString(), { signal: AbortSignal.timeout(20000) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

// ── HTML-Hilfsfunktionen (für Statistik Austria / OeNB) ──────────────────────

async function fetchHtml(url) {
  const r = await fetch(url, {
    signal: AbortSignal.timeout(25000),
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AA-Dashboard-Bot/1.0)' },
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.text();
}

// Extrahiert die erste Zahl aus einem HTML-Bereich der einen der Suchbegriffe enthält.
// Gibt { raw: number, context: string } zurück.
function extractNumber(html, searchTerms, numberPattern) {
  const terms = Array.isArray(searchTerms) ? searchTerms : [searchTerms];
  for (const term of terms) {
    const idx = html.toLowerCase().indexOf(term.toLowerCase());
    if (idx === -1) continue;
    // Fenster um den Treffer: 400 Zeichen nach vorne und hinten
    const window = html.slice(Math.max(0, idx - 100), idx + 400);
    // HTML-Tags entfernen
    const text = window.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
    const pat = numberPattern || /[-−+]?\s*[\d.,]+/g;
    const matches = text.match(pat);
    if (matches?.length) {
      // Nimm erste Zahl die vernünftig aussieht
      for (const m of matches) {
        const clean = m.trim().replace(/\s/g, '').replace(',', '.').replace(/[^0-9.+-]/g, '');
        const n = parseFloat(clean);
        if (!isNaN(n) && isFinite(n)) return { raw: n, context: text.trim().slice(0, 120) };
      }
    }
  }
  return null;
}

// ── Update-Sammler ────────────────────────────────────────────────────────────

const updates = {};
const errors  = [];

async function tryUpdate(label, fn) {
  try {
    const r = await fn();
    if (r?.value != null && r?.period != null) {
      updates[label] = r;
      console.log(`  ✓  ${label}: ${r.value}  (${r.period})`);
    } else {
      console.warn(`  –  ${label}: kein Wert extrahierbar`);
    }
  } catch (e) {
    errors.push({ label, error: e.message });
    console.error(`  ✗  ${label}: ${e.message}`);
  }
}

// ════════════════════════════════════════════════════════════════════
// EUROSTAT-ABFRAGEN
// ════════════════════════════════════════════════════════════════════

console.log('\n── Eurostat ──────────────────────────────────────────');

await tryUpdate('BIP-Wachstum real', async () => {
  const j = await fetchEurostat('tec00115', { geo: 'AT' });
  const r = latestEurostat(decodeEurostat(j));
  return r ? { value: pctSign(r.value), period: r[timeDimOf(j)] } : null;
});

await tryUpdate('ALQ Eurostat (ILO)', async () => {
  const j = await fetchEurostat('une_rt_m', { geo: 'AT', sex: 'T', s_adj: 'SA', age: 'TOTAL', unit: 'PC_ACT' });
  const r = latestEurostat(decodeEurostat(j));
  return r ? { value: pct(r.value), period: monthLabel(r[timeDimOf(j)]) } : null;
});

await tryUpdate('Jugend-ALQ', async () => {
  const j = await fetchEurostat('une_rt_a', { geo: 'AT', sex: 'T', age: 'Y15-24', unit: 'PC_ACT' });
  const r = latestEurostat(decodeEurostat(j));
  return r ? { value: pct(r.value), period: r[timeDimOf(j)] } : null;
});

await tryUpdate('VPI / Inflation', async () => {
  let j;
  try { j = await fetchEurostat('prc_hicp_minr', { geo: 'AT', coicop: 'CP00', unit: 'RCH_MOM' }); }
  catch { j = await fetchEurostat('prc_hicp_manr', { geo: 'AT', coicop: 'CP00', unit: 'RCH_A' }); }
  const r = latestEurostat(decodeEurostat(j));
  return r ? { value: pct(r.value), period: monthLabel(r[timeDimOf(j)]) } : null;
});

await tryUpdate('HVPI', async () => {
  const j = await fetchEurostat('prc_hicp_manr', { geo: 'AT', coicop: 'CP00', unit: 'RCH_A' });
  const r = latestEurostat(decodeEurostat(j));
  return r ? { value: pct(r.value), period: monthLabel(r[timeDimOf(j)]) } : null;
});

await tryUpdate('Immobilienpreisindex', async () => {
  // purchase: TOTAL, unit: RCH_A = year-on-year rate of change
  const j = await fetchEurostat('prc_hpi_q', { geo: 'AT', purchase: 'TOTAL', unit: 'RCH_A' });
  const r = latestEurostat(decodeEurostat(j));
  if (!r) return null;
  const td = timeDimOf(j);
  return { value: pctSign(r.value), period: monthLabel(r[td]) + ' ggü. Vj.' };
});

await tryUpdate('Staatsschuldenquote', async () => {
  const j = await fetchEurostat('gov_10dd_edpt1', { geo: 'AT', sector: 'S13', unit: 'PC_GDP', na_item: 'GD' });
  const r = latestEurostat(decodeEurostat(j));
  return r ? { value: pctBIP(r.value), period: r[timeDimOf(j)] } : null;
});

await tryUpdate('Staatsdefizit', async () => {
  const j = await fetchEurostat('gov_10dd_edpt1', { geo: 'AT', sector: 'S13', unit: 'PC_GDP', na_item: 'B9' });
  const r = latestEurostat(decodeEurostat(j));
  return r ? { value: pctBIPSign(r.value), period: r[timeDimOf(j)] } : null;
});

await tryUpdate('Abgabenquote', async () => {
  // Composite: Steuern + Sozialbeiträge (D2+D5+D91+D61 abzgl. bestimmter Transfers)
  const j = await fetchEurostat('gov_10a_taxag', { geo: 'AT', sector: 'S13', unit: 'PC_GDP', na_item: 'D2_D5_D91_D61_M_D995' });
  const r = latestEurostat(decodeEurostat(j));
  return r ? { value: pctBIP(r.value), period: r[timeDimOf(j)] } : null;
});

await tryUpdate('Teilzeitquote', async () => {
  // lfsi_pt_a: part-time employment as % of total employment, age 15-64
  const j = await fetchEurostat('lfsi_pt_a', { geo: 'AT', wstatus: 'EMP_PT', sex: 'T', age: 'Y15-64', unit: 'PC_EMP' });
  const r = latestEurostat(decodeEurostat(j));
  return r ? { value: pct(r.value), period: r[timeDimOf(j)] } : null;
});

await tryUpdate('Industriestrompreis', async () => {
  // nrg_cons-Dimension (nicht consom): MWH2000-19999 = mittlere Industrie (Band IC-Äquivalent)
  const j = await fetchEurostat('nrg_pc_205', { geo: 'AT', nrg_cons: 'MWH2000-19999', currency: 'EUR', tax: 'X_TAX', unit: 'KWH' });
  const r = latestEurostat(decodeEurostat(j));
  return r ? { value: fmtDE(r.value * 100, 2) + ' ct/kWh', period: r[timeDimOf(j)] } : null;
});

// Staatsquote: gov_10a_main (nicht gov_10a_exp)
await tryUpdate('Staatsquote', async () => {
  const j = await fetchEurostat('gov_10a_main', { geo: 'AT', sector: 'S13', unit: 'PC_GDP', na_item: 'TE' });
  const r = latestEurostat(decodeEurostat(j));
  return r ? { value: pctBIP(r.value), period: r[timeDimOf(j)] } : null;
});

// Staatseinnahmen: gov_10a_main
await tryUpdate('Staatseinnahmen', async () => {
  const j = await fetchEurostat('gov_10a_main', { geo: 'AT', sector: 'S13', unit: 'PC_GDP', na_item: 'TR' });
  const r = latestEurostat(decodeEurostat(j));
  return r ? { value: pctBIP(r.value), period: r[timeDimOf(j)] } : null;
});

// Zinsausgaben: D41PAY = interest payable
await tryUpdate('Zinsausgaben', async () => {
  const j = await fetchEurostat('gov_10a_main', { geo: 'AT', sector: 'S13', unit: 'PC_GDP', na_item: 'D41PAY' });
  const r = latestEurostat(decodeEurostat(j));
  return r ? { value: pctBIP(r.value), period: r[timeDimOf(j)] } : null;
});

// Bruttoanlageinvestitionen via Eurostat
await tryUpdate('Bruttoanlageinvestitionen / Abschreibungen', async () => {
  const j = await fetchEurostat('nama_10_gdp', { geo: 'AT', na_item: 'P51G', unit: 'PC_GDP' });
  const r = latestEurostat(decodeEurostat(j));
  return r ? { value: pctBIP(r.value), period: r[timeDimOf(j)] } : null;
});

// BIP pro Kopf via Eurostat (ersetzt OeNB Report 7.1)
await tryUpdate('BIP pro Kopf', async () => {
  // CP_EUR_HAB = current prices, EUR per inhabitant
  const j = await fetchEurostat('nama_10_pc', { geo: 'AT', na_item: 'B1GQ', unit: 'CP_EUR_HAB' });
  const r = latestEurostat(decodeEurostat(j));
  return r ? { value: FMT.format(Math.round(r.value)) + ' €', period: r[timeDimOf(j)] } : null;
});

// BIP nominal (YoY %) via Eurostat (ersetzt OeNB Report 7.3)
await tryUpdate('BIP nominal', async () => {
  const j = await fetchEurostat('namq_10_gdp', { geo: 'AT', na_item: 'B1GQ', unit: 'CP_MEUR', s_adj: 'NSA' });
  const rows = decodeEurostat(j);
  if (rows.length < 5) return null;
  const td = timeDimOf(j);
  const latest = rows[rows.length - 1];
  // Zeitformat von Eurostat: "2025-Q4"
  const qm = latest[td].match(/^(\d{4})-Q([1-4])$/);
  if (!qm) return null;
  const prevYearQ = `${+qm[1] - 1}-Q${qm[2]}`;
  const prevYear = rows.find(r => r[td] === prevYearQ);
  if (!prevYear) return null;
  const growth = (latest.value - prevYear.value) / prevYear.value * 100;
  return { value: pctSign(growth), period: monthLabel(latest[td]) };
});

// Lohnstückkosten via Eurostat (ersetzt OeNB Report 10.20)
// PCH_SM = % Veränderung ggü. gleichem Vorjahresquartal
await tryUpdate('Lohnstückkosten', async () => {
  const j = await fetchEurostat('namq_10_lp_ulc', { geo: 'AT', unit: 'PCH_SM', na_item: 'NULC_PER', s_adj: 'NSA' });
  const r = latestEurostat(decodeEurostat(j));
  return r ? { value: pctSign(r.value), period: monthLabel(r[timeDimOf(j)]) } : null;
});

// Energiepreise via Eurostat HVPI (ersetzt E-Control)
// CP045 = Electricity, gas and other fuels — monatliche Jahresrate
await tryUpdate('Energiepreise', async () => {
  const j = await fetchEurostat('prc_hicp_cann', { geo: 'AT', coicop: 'CP045', unit: 'RCH_A' });
  const r = latestEurostat(decodeEurostat(j));
  return r ? { value: pctSign(r.value), period: monthLabel(r[timeDimOf(j)]) + ' ggü. Vj.' } : null;
});

// Bevölkerung via Eurostat demo_gind (ersetzt Statistik Austria HTML-Scraping)
// indic_de=JAN = Bevölkerungsstand am 1. Jänner
await tryUpdate('Bevölkerung', async () => {
  const j = await fetchEurostat('demo_gind', { geo: 'AT', indic_de: 'JAN' });
  const r = latestEurostat(decodeEurostat(j));
  if (!r) return null;
  const mio = r.value / 1_000_000;
  return { value: fmtDE(mio, 2) + ' Mio.', period: 'Jan. ' + r[timeDimOf(j)] };
});

// Exporte (Waren + Dienstleistungen, absolut) via Eurostat nama_10_gdp
// na_item=P6 = Exports of goods and services, CP_MEUR = current prices, millions EUR
await tryUpdate('Exporte (Waren)', async () => {
  const j = await fetchEurostat('nama_10_gdp', { geo: 'AT', na_item: 'P6', unit: 'CP_MEUR' });
  const r = latestEurostat(decodeEurostat(j));
  if (!r) return null;
  const mrd = Math.round(r.value / 1000);
  return { value: FMT.format(mrd) + ' Mrd. €', period: r[timeDimOf(j)] };
});

// Importe (Waren + Dienstleistungen, absolut) via Eurostat nama_10_gdp
// na_item=P7 = Imports of goods and services
await tryUpdate('Importe', async () => {
  const j = await fetchEurostat('nama_10_gdp', { geo: 'AT', na_item: 'P7', unit: 'CP_MEUR' });
  const r = latestEurostat(decodeEurostat(j));
  if (!r) return null;
  const mrd = Math.round(r.value / 1000);
  return { value: FMT.format(mrd) + ' Mrd.', period: r[timeDimOf(j)] };
});

// Business Climate Indicator (WIFO-Konjunkturtest) — kein passender open API verfügbar.
// Eurostat ei_bsco_m hat für AT nur Konsumenten-Umfragen (andere Skala), bop_fdi6_pos zu groß (413).
// → Manuell im Admin Panel pflegen.

// ════════════════════════════════════════════════════════════════════
// STATISTIK AUSTRIA
// ════════════════════════════════════════════════════════════════════

console.log('\n── Statistik Austria ─────────────────────────────────');

await tryUpdate('Insolvenzen', async () => {
  const html = await fetchHtml('https://www.statistik.at/statistiken/industrie-bau-handel-und-dienstleistungen/unternehmensdemografie/registrierungen-und-insolvenzen');
  const r = extractNumber(html,
    ['insolvenz', 'insolvenzeröffnung', 'konkurseröffnung'],
    /\b[1-9][\d.,]{2,6}\b/
  );
  if (!r) return null;
  // Quartal aus Context
  const qMatch = r.context.match(/Q[1-4]\s*202\d|[1-4]\.\s*Quartal\s*202\d/i);
  const yMatch = r.context.match(/202\d/);
  const period = qMatch ? qMatch[0].replace(/\.\s*Quartal\s*/i, 'Q') : (yMatch ? yMatch[0] : '');
  const num = Math.round(r.raw);
  return { value: FMT.format(num), period };
});

await tryUpdate('Geleistete Arbeitsstunden', async () => {
  const html = await fetchHtml('https://www.statistik.at/statistiken/arbeitsmarkt/arbeitszeit/geleistete-arbeitsstunden');
  const r = extractNumber(html,
    ['geleistete arbeitsstunden', 'arbeitsstunden gesamt', 'milliarden stunden'],
    /\b\d[\d,]+\s*(?:Mrd\.|Milliarden)?\s*(?:Std\.|Stunden)?\b/i
  );
  if (!r) return null;
  const yMatch = r.context.match(/202\d/);
  const mrd = r.raw > 1000 ? r.raw / 1000 : r.raw;
  return { value: fmtDE(mrd, 2) + ' Mrd. Std.', period: yMatch?.[0] || '' };
});

// ════════════════════════════════════════════════════════════════════
// indikatoren.js PATCHEN
// ════════════════════════════════════════════════════════════════════

console.log('\n── Schreibe indikatoren.js ───────────────────────────');

let content = readFileSync(INDIKATOREN_PATH, 'utf8');
let changed = 0;

function updateField(text, label, field, newVal) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(
    `(label:\\s*['"]${escaped}['"][\\s\\S]{0,600}?${field}:\\s*)['"][^'"\\n]*['"]`,
    'g'
  );
  // test() prüft ob Pattern vorhanden — warnt nur bei echtem Fehlen, nicht bei gleichen Werten
  if (!re.test(text)) {
    console.warn(`    ⚠ Kein Match für "${label}" → ${field}`);
    return text;
  }
  re.lastIndex = 0;
  return text.replace(re, `$1'${newVal}'`);
}

for (const [label, { value, period }] of Object.entries(updates)) {
  const before = content;
  content = updateField(content, label, 'value', value);
  content = updateField(content, label, 'data_period', period);
  if (content !== before) changed++;
}

if (changed > 0) {
  writeFileSync(INDIKATOREN_PATH, content, 'utf8');
  console.log(`\n✅  ${changed} Indikator(en) aktualisiert.`);
} else {
  console.log('\nℹ️  Keine Änderungen — Werte bereits aktuell oder nicht abrufbar.');
}

if (errors.length) {
  console.log(`\n⚠️  Fehler (${errors.length}):`);
  errors.forEach(e => console.log(`   ${e.label}: ${e.error}`));
}

console.log(`\nAktualisierte Indikatoren (${Object.keys(updates).length}):`);
Object.entries(updates).forEach(([l, {value, period}]) =>
  console.log(`   ${l}: ${value} (${period})`)
);
