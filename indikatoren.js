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
        value:       '9,22 Mio.',
        data_period: 'Jan. 2026',
        score:       52,
        source_name: 'Statistik Austria',
        source_url:  'https://www.statistik.at/statistiken/bevoelkerung-und-soziales/bevoelkerung/bevoelkerungsstand',
        eurostat_id: '',
        update:      'monatlich',
        notes:       'Bevölkerungsstand laut Statistik Austria, Bevölkerungsregister',
      },

      {
        label:       'BIP-Wachstum real',
        value:       '−0,7 %',
        data_period: '2025',
        score:       22,
        source_name: 'AMECO',
        source_url:  'https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Reales BIP-Wachstum Österreich, AMECO-Code: OVGD',
      },

      {
        label:       'BIP nominal',
        value:       '484 Mrd. €',
        data_period: '2024',
        score:       38,
        source_name: 'AMECO',
        source_url:  'https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Nominales BIP in Mrd. Euro',
      },

      {
        label:       'BIP pro Kopf',
        value:       '53.800 €',
        data_period: '2024',
        score:       58,
        source_name: 'AMECO',
        source_url:  'https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'BIP pro Kopf in Euro, laufende Preise',
      },

      {
        label:       'Exporte (Waren)',
        value:       '191 Mrd. €',
        data_period: '2024',
        score:       35,
        source_name: 'AMECO',
        source_url:  'https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Warenexporte in Mrd. Euro',
      },

      {
        label:       'Importe',
        value:       '189 Mrd.',
        data_period: '2024',
        score:       45,
        source_name: 'AMECO',
        source_url:  'https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Warenimporte in Mrd. Euro',
      },

      {
        label:       'Insolvenzen',
        value:       '+22 %',
        data_period: '2024',
        score:       28,
        source_name: 'Statistik Austria',
        source_url:  'https://www.statistik.at/statistiken/wirtschaft/unternehmensstatistiken/insolvenzen',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Veränderung Insolvenzen ggü. Vorjahr',
      },

      {
        label:       'Direktinvestitionen',
        value:       '280 Mrd. €',
        data_period: 'Bestand 2024',
        score:       65,
        source_name: 'OeNB',
        source_url:  'https://www.oenb.at/Statistik/Standardisierte-Tabellen/Aussenwirtschaft/Direktinvestitionen.html',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Bestand ausländischer Direktinvestitionen in Österreich',
      },

      {
        label:       'Business Climate Indicator',
        value:       '−0,7 Pkt.',
        data_period: 'Feb. 2026',
        score:       25,
        source_name: 'WIFO-Konjunkturtest',
        source_url:  'https://www.wifo.ac.at/konjunkturtest',
        eurostat_id: '',
        update:      'monatlich',
        notes:       'WIFO-Konjunkturtest, Geschäftsklima-Indikator',
      },

      {
        label:       'Lohnstückkosten',
        value:       '+4,6 %',
        data_period: '2024',
        score:       42,
        source_name: 'AMECO',
        source_url:  'https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Nominale Lohnstückkosten ggü. Vorjahr, AMECO-Code: PLCD',
      },

      {
        label:       'Bruttoanlageinvestitionen / Abschreibungen',
        value:       '22,1 % BIP',
        data_period: '2024',
        score:       35,
        source_name: 'Statistik Austria (LGR)',
        source_url:  'https://www.statistik.at/statistiken/volkswirtschaft-und-oeffentliche-finanzen/volkswirtschaftliche-gesamtrechnung/bruttoinlandsprodukt',
        eurostat_id: '',
        update:      'jährlich',
        notes:       'Bruttoanlageinvestitionsquote in % des BIP',
      },

      {
        label:       'Industriestrompreis',
        value:       '18,75 ct/kWh',
        data_period: '2025',
        score:       30,
        source_name: 'Eurostat (Nicht-Haushalt, mittel)',
        source_url:  'https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Electricity_price_statistics',
        eurostat_id: 'nrg_pc_205',
        update:      'halbjährlich',
        notes:       'Strompreis für mittlere Industrieverbraucher (Band IC), Eurostat',
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
        eurostat_id: '',
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
        eurostat_id: 'teicp270',
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
        eurostat_id: '',
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
        eurostat_id: '',
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
