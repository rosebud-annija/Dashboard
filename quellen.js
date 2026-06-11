/**
 * quellen.js — Datenquellen-Konfiguration · Agenda Austria Dashboard
 * ====================================================================
 * HIER legst du fest, woher der Wert jeder Box kommt.
 *
 * typ: 'eurostat'  → Wert wird automatisch von Eurostat abgerufen
 *                    (Felder: datensatz, parameter, filter, dezimal,
 *                     einheit, hoeher_besser, reihen, chart, zeitformat,
 *                     fallback_datensatz, nur_chart, untertitel)
 *
 * typ: 'manuell'   → Wert wird manuell in indikatoren.js gepflegt
 *                    (Felder: quelle_url, hinweis)
 *
 * Wechsel von manuell → Eurostat:
 *   1. typ auf 'eurostat' ändern
 *   2. datensatz und parameter eintragen
 *   3. Seite neu laden — Wert wird automatisch aktualisiert
 *
 * Eurostat Datensatz-IDs: https://ec.europa.eu/eurostat/databrowser
 */

const QUELLEN = [

  // ─────────────────────────────────────────────────────────────────────────────
  // WIRTSCHAFT
  // ─────────────────────────────────────────────────────────────────────────────

  {
    label:      'Bevölkerung',
    typ:        'manuell',
    quelle_url: 'https://www.statistik.at/statistiken/bevoelkerung-und-soziales/bevoelkerung/bevoelkerungsstand/bevoelkerung-gemaess-finanzausgleichsgesetz',
    hinweis:    'Bevölkerungsstand gemäß Finanzausgleichsgesetz · Statistik Austria · jährlich per 31.10.',
  },

  {
    label:         'BIP-Wachstum real',
    typ:           'eurostat',
    datensatz:     'tec00115',
    parameter:     { geo: 'AT' },
    dezimal:       1,
    einheit:       ' %',
    hoeher_besser: true,
    reihen:        9,
    chart:         'chart-bip',
    zeitformat:    'jahr',
    untertitel:    'Reales BIP-Wachstum · Österreich',
    // Primärquelle: BMF https://www.bmf.gv.at/themen/wirtschaftspolitik/wirtschaftspolitik-in-oesterreich/aktuelle-wirtschaftsdaten-oesterreich.html
  },

  {
    label:      'BIP nominal',
    typ:        'manuell',
    quelle_url: 'https://www.oenb.at/isawebstat/stabfrage/createReport?lang=EN&report=7.3',
    hinweis:    'Nominales BIP-Wachstum ggü. Vorjahr · OeNB Statistik Report 7.3 · quartalsweise',
  },

  {
    label:      'BIP pro Kopf',
    typ:        'manuell',
    quelle_url: 'https://www.oenb.at/isawebstat/stabfrage/createReport?lang=DE&report=7.1',
    hinweis:    'Nominelles BIP pro Kopf in Euro · OeNB Statistik Report 7.1 · jährlich',
  },

  {
    label:      'Exporte (Waren)',
    typ:        'manuell',
    quelle_url: 'https://www.statistik.at/statistiken/internationaler-handel/internationaler-warenhandel/importe-und-exporte-von-guetern',
    hinweis:    'Warenexporte monatlich in Mrd. Euro · Statistik Austria',
  },

  {
    label:      'Importe',
    typ:        'manuell',
    quelle_url: 'https://www.statistik.at/statistiken/internationaler-handel/internationaler-warenhandel/importe-und-exporte-von-guetern',
    hinweis:    'Warenimporte monatlich in Mrd. Euro · Statistik Austria',
  },

  {
    label:      'Insolvenzen',
    typ:        'manuell',
    quelle_url: 'https://www.statistik.at/statistiken/industrie-bau-handel-und-dienstleistungen/unternehmensdemografie/registrierungen-und-insolvenzen',
    hinweis:    'Unternehmensinsolvenzen quartalsweise · Statistik Austria Unternehmensdemografie',
  },

  {
    label:      'Direktinvestitionen',
    typ:        'manuell',
    quelle_url: 'https://www.parlament.gv.at/aktuelles/pk/jahr_2025/pk0816',
    hinweis:    'Bestand ausländischer Direktinvestitionen in Österreich · Parlamentskorrespondenz 2025',
  },

  {
    label:      'Business Climate Indicator',
    typ:        'manuell',
    quelle_url: 'https://www.ceicdata.com/en/austria/business-cycle-survey-business-climate-index-seasonally-adjusted/business-climate-index-bci-seasonally-adjusted-sa',
    hinweis:    'Business Climate Index (BCI) saisonbereinigt · CEIC / WIFO-Konjunkturtest · monatlich',
  },

  {
    label:      'Lohnstückkosten',
    typ:        'manuell',
    quelle_url: 'https://www.oenb.at/isawebstat/stabfrage/createReport?lang=DE&report=10.20',
    hinweis:    'Nominale Lohnstückkosten ggü. Vorjahr · OeNB Statistik Report 10.20 · quartalsweise',
  },

  {
    label:      'Bruttoanlageinvestitionen / Abschreibungen',
    typ:        'manuell',
    quelle_url: 'https://www.oenb.at/isawebstat/stabfrage/createReport?lang=DE&report=9999',
    hinweis:    'Bruttoanlageinvestitionsquote in % des BIP · OeNB Statistik Report 9999',
  },

  {
    label:         'Industriestrompreis',
    typ:           'eurostat',
    datensatz:     'nrg_pc_205',
    parameter:     { geo: 'AT', nrg_cons: 'MWH2000-19999', currency: 'EUR', tax: 'X_TAX', unit: 'KWH' },
    dezimal:       2,
    einheit:       ' ct/kWh',
    hoeher_besser: false,
    reihen:        6,
    zeitformat:    'monat',
    untertitel:    'Band IC, ohne Steuern · Österreich',
    wert_faktor:   100,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ARBEITSMARKT
  // ─────────────────────────────────────────────────────────────────────────────

  {
    label:         'Jugend-ALQ',
    typ:           'eurostat',
    datensatz:     'une_rt_a',
    parameter:     { geo: 'AT', sex: 'T', age: 'Y15-24', unit: 'PC_ACT' },
    dezimal:       1,
    einheit:       ' %',
    hoeher_besser: false,
    reihen:        8,
    zeitformat:    'jahr',
    untertitel:    'Unter 25 Jahre, ILO-Methode · Österreich',
  },

  {
    label:      'Unselbst. Beschäftigte',
    typ:        'manuell',
    quelle_url: 'https://www.ams.at/arbeitsmarktdaten-und-medien/arbeitsmarkt-daten-und-arbeitsmarkt-forschung/arbeitsmarktdaten',
    hinweis:    'Unselbstständig Beschäftigte · AMS Arbeitsmarktdaten monatlich',
  },

  {
    label:      'Arbeitslosenquote national',
    typ:        'manuell',
    quelle_url: 'https://www.ams.at/arbeitsmarktdaten-und-medien/arbeitsmarkt-daten-und-arbeitsmarkt-forschung/arbeitsmarktdaten',
    hinweis:    'ALQ nach österreichischer Definition (AMS) · monatlich',
  },

  {
    label:         'ALQ Eurostat (ILO)',
    typ:           'eurostat',
    datensatz:     'une_rt_m',
    parameter:     { geo: 'AT', sex: 'T', s_adj: 'SA', age: 'TOTAL', unit: 'PC_ACT' },
    dezimal:       1,
    einheit:       ' %',
    hoeher_besser: false,
    reihen:        9,
    chart:         'chart-alq',
    zeitformat:    'monat',
    untertitel:    'Saisonbereinigt · Österreich',
  },

  {
    label:         'Teilzeitquote',
    typ:           'eurostat',
    datensatz:     'lfsa_eppga',
    parameter:     { geo: 'AT', sex: 'T', unit: 'PC' },
    dezimal:       1,
    einheit:       ' %',
    hoeher_besser: false,
    reihen:        8,
    zeitformat:    'jahr',
    untertitel:    'Alle Beschäftigten · Österreich',
  },

  {
    label:      'Steuerkeil (OECD)',
    typ:        'manuell',
    quelle_url: 'https://stats.oecd.org/Index.aspx?DataSetCode=TAXWAGES',
    hinweis:    'Tax Wedge Alleinstehende ohne Kinder, Durchschnittsverdiener · OECD Taxing Wages · jährlich',
  },

  {
    label:         'Arbeitskosten / Std.',
    typ:           'eurostat',
    datensatz:     'lc_lci_r2_q',
    parameter:     { geo: 'AT', nace_r2: 'B-N', lcstruct: 'D1-D4', unit: 'EUR' },
    dezimal:       1,
    einheit:       ' €',
    hoeher_besser: false,
    reihen:        8,
    zeitformat:    'monat',
    untertitel:    'Gesamtwirtschaft · Österreich',
  },

  {
    label:      'Faktisches Pensionsalter',
    typ:        'manuell',
    quelle_url: 'https://stats.oecd.org/Index.aspx?DataSetCode=PENSION_STATS',
    hinweis:    'Faktisches Pensionsantrittsalter Ø Männer+Frauen · OECD Pension Statistics · jährlich',
  },

  {
    label:      'Geleistete Arbeitsstunden',
    typ:        'manuell',
    quelle_url: 'https://www.statistik.at/statistiken/arbeitsmarkt/arbeitszeit/geleistete-arbeitsstunden',
    hinweis:    'Geleistete Arbeitsstunden gesamt (Mikrozensus) · Statistik Austria · jährlich',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PREISE & INFLATION
  // ─────────────────────────────────────────────────────────────────────────────

  {
    label:              'VPI / Inflation',
    typ:                'eurostat',
    datensatz:          'prc_hicp_minr',
    fallback_datensatz: 'prc_hicp_manr',
    parameter:          { geo: 'AT', coicop: 'CP00', unit: 'RCH_MOM' },
    filter:             { coicop: ['all-items', 'cp00', 'overall'] },
    dezimal:            1,
    einheit:            ' %',
    hoeher_besser:      false,
    reihen:             12,
    chart:              'chart-inflation',
    zeitformat:         'monat',
    untertitel:         'HVPI · Österreich',
  },

  {
    label:      'Reallöhne',
    typ:        'manuell',
    quelle_url: 'https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en',
    hinweis:    'Reallohnwachstum pro Beschäftigten · AMECO-Code: RWCDE · jährlich',
  },

  {
    label:         'Immobilienpreisindex',
    typ:           'eurostat',
    datensatz:     'prc_hpi_q',
    parameter:     { geo: 'AT' },
    filter:        { unit: ['index, 2015=100', '2015=100'], purchase: ['total', 'all dwellings', 'dwellings'] },
    dezimal:       1,
    einheit:       '',
    hoeher_besser: true,
    reihen:        10,
    chart:         'chart-immo',
    zeitformat:    'monat',
    nur_chart:     true,
  },

  {
    label:      'Mietentwicklung',
    typ:        'manuell',
    quelle_url: 'https://www.statistik.at/statistiken/wirtschaft/preise-und-preisindizes',
    hinweis:    'Mietpreisentwicklung ggü. Vorjahr · Statistik Austria VPI-Teilindex Mieten',
  },

  {
    label:         'HVPI',
    typ:           'eurostat',
    datensatz:     'prc_hicp_manr',
    parameter:     { geo: 'AT', coicop: 'CP00', unit: 'RCH_A' },
    dezimal:       1,
    einheit:       ' %',
    hoeher_besser: false,
    reihen:        12,
    zeitformat:    'monat',
    untertitel:    'Jahresrate · Österreich',
  },

  {
    label:      'Energiepreise',
    typ:        'manuell',
    quelle_url: 'https://www.e-control.at/statistik/strom/marktstatistik',
    hinweis:    'Entwicklung Energiepreise ggü. Vorjahr · E-Control Marktstatistik · jährlich',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ÖFFENTLICHE FINANZEN
  // ─────────────────────────────────────────────────────────────────────────────

  {
    label:         'Staatsschuldenquote',
    typ:           'eurostat',
    datensatz:     'gov_10dd_edpt1',
    parameter:     { geo: 'AT', sector: 'S13', unit: 'PC_GDP' },
    filter:        { na_item: ['gross debt', 'gd'] },
    dezimal:       1,
    einheit:       ' % BIP',
    hoeher_besser: false,
    reihen:        9,
    chart:         'chart-schulden',
    zeitformat:    'jahr',
    untertitel:    'Staatsschuldenquote · Österreich',
  },

  {
    label:         'Staatsdefizit',
    typ:           'eurostat',
    datensatz:     'gov_10dd_edpt1',
    parameter:     { geo: 'AT', sector: 'S13', unit: 'PC_GDP' },
    filter:        { na_item: ['net lending', 'net borrowing', 'b9'] },
    dezimal:       1,
    einheit:       ' % BIP',
    hoeher_besser: true,
    reihen:        8,
    untertitel:    'Finanzierungssaldo · Österreich',
  },

  {
    label:      'Staatsquote',
    typ:        'manuell',
    quelle_url: 'https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en',
    hinweis:    'Staatsausgaben in % des BIP · AMECO-Code: UUTGE',
  },

  {
    label:         'Abgabenquote',
    typ:           'eurostat',
    datensatz:     'gov_10a_taxag',
    parameter:     { geo: 'AT', sector: 'S13', unit: 'PC_GDP', na_item: 'D2_D5_D91_D61_D99' },
    dezimal:       1,
    einheit:       ' % BIP',
    hoeher_besser: false,
    reihen:        8,
    zeitformat:    'jahr',
    untertitel:    'Steuer- und Abgabenquote · Österreich',
  },

  {
    label:      'Zinsausgaben',
    typ:        'manuell',
    quelle_url: 'https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en',
    hinweis:    'Staatliche Zinsausgaben in % des BIP · AMECO-Code: AYIGD',
  },

  {
    label:      'Pensionslücke',
    typ:        'manuell',
    quelle_url: 'https://www.agenda-austria.at/themen/pensionen/',
    hinweis:    'Jährliche Bundeszuschüsse zum Pensionssystem · Agenda Austria Pensionsanalyse',
  },

  {
    label:      'Sozialquote',
    typ:        'manuell',
    quelle_url: 'https://www.statistik.at/statistiken/bevoelkerung-und-soziales/sozialleistungen',
    hinweis:    'Sozialausgaben in % des BIP · Statistik Austria ESSOSS · jährlich',
  },

  {
    label:      'Staatseinnahmen',
    typ:        'manuell',
    quelle_url: 'https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en',
    hinweis:    'Gesamtstaatliche Einnahmen in % des BIP · AMECO-Code: URTG',
  },

  {
    label:      'Budgetvollzug',
    typ:        'manuell',
    quelle_url: 'https://www.bmf.gv.at/themen/budget/das-budget/budgetvollzug.html',
    hinweis:    'Kumuliertes Nettodefizit · BMF Budgetvollzug (monatliche Meldung)',
  },

  {
    label:      'Staatsausgaben',
    typ:        'manuell',
    quelle_url: 'https://www.statistik.at/statistiken/volkswirtschaft-und-oeffentliche-finanzen/oeffentliche-finanzen-und-steuern/staatsfinanzen',
    hinweis:    'Gesamtstaatliche Ausgaben absolut · Statistik Austria Staatsfinanzen · jährlich',
  },

];
