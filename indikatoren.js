/**
 * indikatoren.js — Agenda Austria Dashboard · Quelldaten-Konfiguration
 * =====================================================================
 * Diese Datei ist die einzige Stelle, wo du Indikatoren, Werte und
 * Quellen pflegst. Felder im Überblick:
 *
 *   label         Anzeigename im Dashboard
 *   value         Aktueller Anzeigewert  (z. B. "−0,7 %")
 *   data_period   Zeitraum des Wertes    (z. B. "2025", "März 2026")
 *   score         Zukunftswert 0–100     (0=sehr schlecht, 100=sehr gut)
 *   source_name   Kurzname der Quelle    (erscheint als Link-Text)
 *   source_url    Direkt-URL zur Quelle
 *   eurostat_id   Eurostat-Datensatz-ID  (leer lassen wenn nicht Eurostat)
 *   update        Aktualisierungsrhythmus: "monatlich" | "quartal" | "jährlich"
 *   notes         Interne Notizen (erscheinen nicht im Dashboard)
 *
 * Werte manuell aktualisieren:
 *   1. Quelle (source_url) aufrufen
 *   2. Neuesten Wert in `value` und `data_period` eintragen
 *   3. Ggf. `score` anpassen (Einschätzung 0–100)
 *   4. Datei speichern → Dashboard neu laden
 *
 * Score-Orientierung:
 *   ≥ 60  grün  (gut / positiv)
 *   45–59 gelb  (mittel / neutral)
 *   < 45  rot   (schlecht / kritisch)
 */

const INDIKATOREN = {

  // ─────────────────────────────────────────────────────────────────────────────
  // WIRTSCHAFT
  // ─────────────────────────────────────────────────────────────────────────────
  wirtschaft: {
    label: 'Wirtschaft',
    items: [

      {
        label:       'Bevölkerung',
        value:       '9,19 Mio.',
        data_period: '31.10.2024',
        score:       52,
        source_name: 'Statistik Austria',
        source_url:  'https://www.statistik.at/statistiken/bevoelkerung-und-soziales/bevoelkerung/bevoelkerungsstand/bevoelkerung-gemaess-finanzausgleichsgesetz',
        eurostat_id: '',
        update:      'monatlich',
        notes:       'Bevölkerungsstand gemäß Finanzausgleichsgesetz · Zentrales Melderegister',
      },

      {
        label:       'BIP-Wachstum real',
        value:       '+0,6 %',
        data_period: '2025',
        score:       35,
        source_name: 'OeNB',
        source_url:  'https://www.oenb.at/isawebstat/stabfrage/createReport?lang=EN&report=7.7',
        eurostat_id: 'tec00115',
        update:      'jährlich',
        notes:       'Reales BIP-Wachstum Österreich 2025 · OeNB Statistik Report 7.7 · bestätigt Mai 2026',
      },

      {
        label:       'BIP nominal',
        value:       '+3,7 %',
        data_period: 'Q4 2025',
        score:       42,
        source_name: 'OeNB',
        source_url:  'https://www.oenb.at/isawebstat/stabfrage/createReport?lang=EN&report=7.3',
        eurostat_id: '',
        update:      'quartalsweise',
        notes:       'Nominales BIP-Wachstum ggü. Vorjahr · OeNB Statistik Report 7.3 · Q4 2025: +3,7 % yoy · Stand 30.04.2026',
      },

      {
        label:       'BIP pro Kopf',
        value:       '53.834 €',
        data_period: '2024',
        score:       58,
        source_name: 'OeNB',
        source_url:  'https://www.oenb.at/isawebstat/stabfrage/createReport?lang=DE&report=7.1',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Nominelles BIP pro Kopf in Euro · OeNB Statistik Report 7.1',
      },

      {
        label:       'Exporte (Waren)',
        value:       '15,06 Mrd. €',
        data_period: 'Jän. 2026',
        score:       32,
        source_name: 'Statistik Austria',
        source_url:  'https://www.statistik.at/statistiken/internationaler-handel/internationaler-warenhandel/importe-und-exporte-von-guetern',
        eurostat_id: '',
        update:      'monatlich',
        notes:       'Warenexporte monatlich · Jän. 2026: 15,06 Mrd. € (−2,2 % ggü. Vorjahr, vorläufig) · Statistik Austria',
      },

      {
        label:       'Importe',
        value:       '15,13 Mrd. €',
        data_period: 'Jän. 2026',
        score:       42,
        source_name: 'Statistik Austria',
        source_url:  'https://www.statistik.at/statistiken/internationaler-handel/internationaler-warenhandel/importe-und-exporte-von-guetern',
        eurostat_id: '',
        update:      'monatlich',
        notes:       'Warenimporte monatlich · Jän. 2026: 15,13 Mrd. € (−3,0 % ggü. Vorjahr, vorläufig) · Statistik Austria',
      },

      {
        label:       'Insolvenzen',
        value:       '1.669',
        data_period: 'Q4 2025',
        score:       32,
        source_name: 'Statistik Austria',
        source_url:  'https://www.statistik.at/statistiken/industrie-bau-handel-und-dienstleistungen/unternehmensdemografie/registrierungen-und-insolvenzen',
        eurostat_id: '',
        update:      'quartalsweise',
        notes:       'Unternehmensinsolvenzen Q4 2025: 1.669 (−2,2 % ggü. Q3 2025) · Statistik Austria Unternehmensdemografie',
      },

      {
        label:       'Direktinvestitionen',
        value:       '226,3 Mrd. €',
        data_period: 'Bestand 2023',
        score:       60,
        source_name: 'Parlament',
        source_url:  'https://www.parlament.gv.at/aktuelles/pk/jahr_2025/pk0816',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Bestand ausländischer Direktinvestitionen in Österreich 2023: 226,3 Mrd. € · Parlamentskorrespondenz pk0816',
      },

      {
        label:       'Business Climate Indicator',
        value:       '−0,7 Pkt.',
        data_period: 'Feb. 2026',
        score:       25,
        source_name: 'CEIC / WIFO',
        source_url:  'https://www.ceicdata.com/en/austria/business-cycle-survey-business-climate-index-seasonally-adjusted/business-climate-index-bci-seasonally-adjusted-sa',
        eurostat_id: '',
        update:      'monatlich',
        notes:       'WIFO-Konjunkturtest, Geschäftsklima-Indikator',
      },

      {
        label:       'Lohnstückkosten',
        value:       '+2,9 %',
        data_period: 'Q4 2025',
        score:       48,
        source_name: 'OeNB',
        source_url:  'https://www.oenb.at/isawebstat/stabfrage/createReport?lang=DE&report=10.20',
        eurostat_id: '',
        update:      'quartalsweise',
        notes:       'Nominale Lohnstückkosten ggü. Vorjahr · Q4 2025: +2,9 % · OeNB Statistik Report 10.20',
      },

      {
        label:       'Bruttoanlageinvestitionen / Abschreibungen',
        value:       '22,1 % BIP',
        data_period: '2024',
        score:       35,
        source_name: 'OeNB',
        source_url:  'https://www.oenb.at/isawebstat/stabfrage/createReport?lang=DE&report=9999',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Bruttoanlageinvestitionsquote in % des BIP · OeNB Statistik Report 9999',
      },

      {
        label:       'Industriestrompreis',
        value:       '18,75 ct/kWh',
        data_period: '2025',
        score:       30,
        source_name: 'WKO',
        source_url:  'https://www.wko.at/oe/news/medienservice-industriestrompreis-rasch-umsetzen',
        eurostat_id: 'nrg_pc_205',
        update:      'halbjährlich',
        notes:       'Strompreis für mittlere Industrieverbraucher (Band IC) · WKO-Quelle · Eurostat nrg_pc_205',
      },

    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ARBEITSMARKT
  // ─────────────────────────────────────────────────────────────────────────────
  arbeitsmarkt: {
    label: 'Arbeitsmarkt',
    items: [

      {
        label:       'Jugend-ALQ',
        value:       '11,1 %',
        data_period: 'Feb 2026',
        score:       38,
        source_name: 'Eurostat',
        source_url:  'https://ec.europa.eu/eurostat/databrowser/view/une_rt_a',
        eurostat_id: 'une_rt_a',
        update:      'monatlich',
        notes:       'Jugendarbeitslosenquote <25 Jahre, ILO-Methode, Eurostat',
      },

      {
        label:       'Unselbst. Beschäftigte',
        value:       '4,09 Mio.',
        data_period: '2025',
        score:       55,
        source_name: 'AMS / Eurostat',
        source_url:  'https://www.ams.at/arbeitsmarktdaten-und-medien/arbeitsmarkt-daten-und-arbeitsmarkt-forschung/arbeitsmarktdaten',
        eurostat_id: '',
        update:      'monatlich',
        notes:       'Unselbstständig Beschäftigte laut AMS',
      },

      {
        label:       'Arbeitslosenquote national',
        value:       '7,0 %',
        data_period: 'März 2026',
        score:       25,
        source_name: 'AMS (national)',
        source_url:  'https://www.ams.at/arbeitsmarktdaten-und-medien/arbeitsmarkt-daten-und-arbeitsmarkt-forschung/arbeitsmarktdaten',
        eurostat_id: '',
        update:      'monatlich',
        notes:       'Nationale Arbeitslosenquote nach österreichischer Methode (AMS)',
      },

      {
        label:       'ALQ Eurostat (ILO)',
        value:       '5,8 %',
        data_period: 'Feb 2026',
        score:       40,
        source_name: 'Eurostat',
        source_url:  'https://ec.europa.eu/eurostat/databrowser/view/une_rt_m',
        eurostat_id: 'une_rt_m',
        update:      'monatlich',
        notes:       'Arbeitslosenquote nach ILO-Methode, Eurostat',
      },

      {
        label:       'Teilzeitquote',
        value:       '29,2 %',
        data_period: '2024',
        score:       35,
        source_name: 'Statistik Austria / Eurostat',
        source_url:  'https://ec.europa.eu/eurostat/databrowser/view/lfsa_eppga',
        eurostat_id: 'lfsa_eppga',
        update:      'jährlich',
        notes:       'Anteil Teilzeitbeschäftigte an allen Beschäftigten',
      },

      {
        label:       'Steuerkeil (OECD)',
        value:       '47,2 %',
        data_period: '2024',
        score:       15,
        source_name: 'OECD Taxing Wages',
        source_url:  'https://stats.oecd.org/Index.aspx?DataSetCode=TAXWAGES',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Tax Wedge für Alleinstehende ohne Kinder (OECD Taxing Wages)',
      },

      {
        label:       'Arbeitskosten / Std.',
        value:       '38,4 €',
        data_period: '2024',
        score:       42,
        source_name: 'Eurostat',
        source_url:  'https://ec.europa.eu/eurostat/databrowser/view/lc_lci_r2_q',
        eurostat_id: 'lc_lci_r2_q',
        update:      'quartal',
        notes:       'Arbeitskosten je geleistete Stunde, Gesamtwirtschaft',
      },

      {
        label:       'Faktisches Pensionsalter',
        value:       '61,4 J.',
        data_period: '2024',
        score:       20,
        source_name: 'OECD / Sozialversicherung',
        source_url:  'https://stats.oecd.org/Index.aspx?DataSetCode=PENSION_STATS',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Faktisches Pensionsantrittsalter (Männer und Frauen Durchschnitt)',
      },

      {
        label:       'Geleistete Arbeitsstunden',
        value:       '6,88 Mrd. Std.',
        data_period: '2024',
        score:       45,
        source_name: 'Statistik Austria / Eurostat',
        source_url:  'https://www.statistik.at/statistiken/arbeitsmarkt/arbeitszeit/geleistete-arbeitsstunden',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Geleistete Arbeitsstunden gesamt (Mikrozensus)',
      },

    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PREISE & INFLATION
  // ─────────────────────────────────────────────────────────────────────────────
  preise: {
    label: 'Preise & Inflation',
    items: [

      {
        label:       'VPI / Inflation',
        value:       '2,2 %',
        data_period: 'Feb 2026',
        score:       52,
        source_name: 'Statistik Austria',
        source_url:  'https://www.statistik.at/statistiken/wirtschaft/preise-und-preisindizes/verbraucherpreisindex-vpi-hvpi',
        eurostat_id: 'prc_hicp_minr',
        update:      'monatlich',
        notes:       'VPI-Inflationsrate ggü. Vorjahresmonat',
      },

      {
        label:       'Reallöhne',
        value:       '+0,8 %',
        data_period: '2024',
        score:       48,
        source_name: 'AMECO',
        source_url:  'https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Reallohnwachstum pro Beschäftigten, AMECO',
      },

      {
        label:       'Immobilienpreisindex',
        value:       '+3,7 %',
        data_period: 'Q4 2024 ggü. Vj.',
        score:       45,
        source_name: 'Eurostat / OeNB',
        source_url:  'https://ec.europa.eu/eurostat/databrowser/view/teicp270',
        eurostat_id: 'prc_hpi_q',
        update:      'quartal',
        notes:       'House Price Index Österreich, Eurostat / OeNB',
      },

      {
        label:       'Mietentwicklung',
        value:       '+3,0 %',
        data_period: '2024',
        score:       50,
        source_name: 'Statistik Austria / Eurostat',
        source_url:  'https://www.statistik.at/statistiken/wirtschaft/preise-und-preisindizes',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Mietpreisentwicklung ggü. Vorjahr',
      },

      {
        label:       'HVPI',
        value:       '3,1 %',
        data_period: 'März 2026',
        score:       45,
        source_name: 'Statistik Austria / Eurostat',
        source_url:  'https://www.statistik.at/statistiken/preise-und-preismessung/verbraucherpreisindex-vpi/vpi-hvpi-und-db',
        eurostat_id: '',
        update:      'monatlich',
        notes:       'Harmonisierter Verbraucherpreisindex (EU-Vergleichsmaß)',
      },

      {
        label:       'Energiepreise',
        value:       '−8,4 %',
        data_period: '2025 ggü. Vj.',
        score:       60,
        source_name: 'E-Control',
        source_url:  'https://www.e-control.at/statistik/strom/marktstatistik',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Entwicklung Energiepreise ggü. Vorjahr, E-Control',
      },

    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ÖFFENTLICHE FINANZEN
  // ─────────────────────────────────────────────────────────────────────────────
  finanzen: {
    label: 'Öffentliche Finanzen',
    items: [

      {
        label:       'Staatsschuldenquote',
        value:       '81,5 % BIP',
        data_period: '2025',
        score:       16,
        source_name: 'AMECO',
        source_url:  'https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en',
        eurostat_id: 'gov_10dd_edpt1',
        update:      'jährlich',
        notes:       'Gesamtstaatliche Schulden in % des BIP (Maastricht-Definition)',
      },

      {
        label:       'Staatsdefizit',
        value:       '4,2 % BIP',
        data_period: '2025',
        score:       18,
        source_name: 'AMECO',
        source_url:  'https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en',
        eurostat_id: 'gov_10dd_edpt1',
        update:      'jährlich',
        notes:       'Staatsdefizit/-überschuss in % des BIP',
      },

      {
        label:       'Staatsquote',
        value:       '55,3 % BIP',
        data_period: '2025',
        score:       14,
        source_name: 'AMECO',
        source_url:  'https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Staatsausgaben in % des BIP (Staatsquote)',
      },

      {
        label:       'Abgabenquote',
        value:       '44,3 % BIP',
        data_period: '2025',
        score:       16,
        source_name: 'AMECO / Eurostat',
        source_url:  'https://ec.europa.eu/eurostat/databrowser/view/gov_10a_taxag',
        eurostat_id: 'gov_10a_taxag',
        update:      'jährlich',
        notes:       'Steuer- und Abgabenquote in % des BIP',
      },

      {
        label:       'Zinsausgaben',
        value:       '2,8 % BIP',
        data_period: '2025',
        score:       25,
        source_name: 'AMECO',
        source_url:  'https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Staatliche Zinsausgaben in % des BIP',
      },

      {
        label:       'Pensionslücke',
        value:       '~14 Mrd. €',
        data_period: '2024 jährl.',
        score:       12,
        source_name: 'Agenda Austria',
        source_url:  'https://www.agenda-austria.at/themen/pensionen/',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Jährliche Bundeszuschüsse zum Pensionssystem (Agenda Austria)',
      },

      {
        label:       'Sozialquote',
        value:       '30,5 %',
        data_period: '2024',
        score:       30,
        source_name: 'Statistik Austria',
        source_url:  'https://www.statistik.at/statistiken/bevoelkerung-und-soziales/sozialleistungen',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Sozialausgaben in % des BIP',
      },

      {
        label:       'Staatseinnahmen',
        value:       '51,1 % BIP',
        data_period: '2025',
        score:       42,
        source_name: 'AMECO',
        source_url:  'https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Gesamtstaatliche Einnahmen in % des BIP',
      },

      {
        label:       'Budgetvollzug',
        value:       '−14,4 Mrd. €',
        data_period: '2025',
        score:       20,
        source_name: 'BMF Budgetvollzug',
        source_url:  'https://www.bmf.gv.at/themen/budget/das-budget/budgetvollzug.html',
        eurostat_id: '',
        update:      'monatlich',
        notes:       'Kumuliertes Nettodefizit laut BMF-Budgetvollzug',
      },

      {
        label:       'Staatsausgaben',
        value:       '267 Mrd. €',
        data_period: '2024',
        score:       18,
        source_name: 'Statistik Austria',
        source_url:  'https://www.statistik.at/statistiken/volkswirtschaft-und-oeffentliche-finanzen/oeffentliche-finanzen-und-steuern/staatsfinanzen',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Gesamtstaatliche Ausgaben absolut in Mrd. Euro',
      },

    ]
  }

};

// ─── Hilfsfunktion: Quelle als HTML-Link aufbereiten ─────────────────────────
// Verwendung im Dashboard: INDIKATOREN.wirtschaft.items[0] → link
function quelleAlsLink(item) {
  var period = item.data_period ? item.data_period + ' · ' : '';
  return '<a class="kpi-detail" href="' + item.source_url + '" target="_blank">'
       + period + item.source_name + '</a>';
}
