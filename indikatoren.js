/**
 * indikatoren.js — Agenda Austria Dashboard
 * Zuletzt gespeichert: 12.6.2026, 12:56:36
 *
 * Score: ≥60 grün · 45–59 gelb · <45 rot
 */

const INDIKATOREN = {

  // ──────────────────────────────────────────────────────────────────────────
  // WIRTSCHAFT
  // ──────────────────────────────────────────────────────────────────────────
  wirtschaft: {
    label: "Wirtschaft",
    items: [

      {
        label:       "Bevölkerung",
        value:       "9,19 Mio.",
        data_period: "31.10.2024",
        score:       52,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/demo_gind",
        eurostat_id: "demo_gind",
        update:      "jährlich",
        notes:       "Bevölkerungsstand am 1. Jänner, Eurostat demo_gind indic_de=JAN",
      },

      {
        label:       "BIP-Wachstum real",
        value:       "+0,5 %",
        data_period: "2025",
        score:       35,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/tec00115",
        eurostat_id: "tec00115",
        update:      "jährlich",
        notes:       "Reales BIP-Wachstum Österreich 2025 · OeNB Statistik Report 7.7 · bestätigt Mai 2026",
      },

      {
        label:       "BIP nominal",
        value:       "+2,8 %",
        data_period: "Q1 2026",
        score:       42,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/namq_10_gdp",
        eurostat_id: "namq_10_gdp",
        update:      "quartalsweise",
        notes:       "Nominales BIP-Wachstum ggü. Vorjahr · OeNB Statistik Report 7.3 · Q4 2025: +3,7 % yoy · Stand 30.04.2026",
      },

      {
        label:       "BIP pro Kopf",
        value:       "55 870 €",
        data_period: "2025",
        score:       58,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/nama_10_pc",
        eurostat_id: "nama_10_pc",
        update:      "jährlich",
        notes:       "Nominelles BIP pro Kopf in Euro · OeNB Statistik Report 7.1",
      },

      {
        label:       "Exporte (Waren)",
        value:       "15,06 Mrd. €",
        data_period: "Jän. 2026",
        score:       32,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/nama_10_gdp",
        eurostat_id: "nama_10_gdp",
        update:      "jährlich",
        notes:       "Exporte Waren + Dienstleistungen (Jahrestotal), Eurostat nama_10_gdp P6 CP_MEUR",
      },

      {
        label:       "Importe",
        value:       "15,13 Mrd. €",
        data_period: "Jän. 2026",
        score:       42,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/nama_10_gdp",
        eurostat_id: "nama_10_gdp",
        update:      "jährlich",
        notes:       "Importe Waren + Dienstleistungen (Jahrestotal), Eurostat nama_10_gdp P7 CP_MEUR",
      },

      {
        label:       "Insolvenzen",
        value:       "1.669",
        data_period: "Q4 2025",
        score:       32,
        source_name: "Statistik Austria",
        source_url:  "https://www.statistik.at/statistiken/industrie-bau-handel-und-dienstleistungen/unternehmensdemografie/registrierungen-und-insolvenzen",
        eurostat_id: "",
        update:      "quartalsweise",
        notes:       "Unternehmensinsolvenzen Q4 2025: 1.669 (−2,2 % ggü. Q3 2025) · Statistik Austria Unternehmensdemografie",
      },

      {
        label:       "Direktinvestitionen",
        value:       "226,3 Mrd. €",
        data_period: "Bestand 2023",
        score:       60,
        source_name: "Parlament",
        source_url:  "https://www.parlament.gv.at/aktuelles/pk/jahr_2025/pk0816",
        eurostat_id: "",
        update:      "jährlich",
        notes:       "Bestand ausländischer Direktinvestitionen in Österreich 2023: 226,3 Mrd. € · Parlamentskorrespondenz pk0816",
      },

      {
        label:       "Business Climate Indicator",
        value:       "−0,7 Pkt.",
        data_period: "Feb. 2026",
        score:       25,
        source_name: "CEIC / WIFO",
        source_url:  "https://www.ceicdata.com/en/austria/business-cycle-survey-business-climate-index-seasonally-adjusted/business-climate-index-bci-seasonally-adjusted-sa",
        eurostat_id: "",
        update:      "monatlich",
        notes:       "WIFO-Konjunkturtest, Geschäftsklima-Indikator",
      },

      {
        label:       "Lohnstückkosten",
        value:       "+1,0 %",
        data_period: "Q1 2026",
        score:       48,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/namq_10_lp_ulc",
        eurostat_id: "namq_10_lp_ulc",
        update:      "quartalsweise",
        notes:       "Nominale Lohnstückkosten ggü. Vorjahr · Q4 2025: +2,9 % · OeNB Statistik Report 10.20",
      },

      {
        label:       "Bruttoanlageinvestitionen / Abschreibungen",
        value:       "23,7 % BIP",
        data_period: "2025",
        score:       35,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/nama_10_gdp",
        eurostat_id: "nama_10_gdp",
        update:      "jährlich",
        notes:       "Bruttoanlageinvestitionsquote in % des BIP, Eurostat nama_10_gdp P51G PC_GDP",
      },

      {
        label:       "Industriestrompreis",
        value:       "15,64 ct/kWh",
        data_period: "2025-S2",
        score:       30,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/nrg_pc_205",
        eurostat_id: "nrg_pc_205",
        update:      "halbjährlich",
        notes:       "Strompreis für mittlere Industrieverbraucher (Band IC) · WKO-Quelle · Eurostat nrg_pc_205",
      },

    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // ARBEITSMARKT
  // ──────────────────────────────────────────────────────────────────────────
  arbeitsmarkt: {
    label: "Arbeitsmarkt",
    items: [

      {
        label:       "Jugend-ALQ",
        value:       "11,5 %",
        data_period: "2025",
        score:       38,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/une_rt_a",
        eurostat_id: "une_rt_a",
        update:      "monatlich",
        notes:       "Jugendarbeitslosenquote <25 Jahre, ILO-Methode, Eurostat",
      },

      {
        label:       "Unselbst. Beschäftigte",
        value:       "4,09 Mio.",
        data_period: "2025",
        score:       55,
        source_name: "Eurostat (LFS)",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/lfsq_egaps",
        eurostat_id: "lfsq_egaps",
        update:      "quartalsweise",
        notes:       "Abhängig Beschäftigte 15–64 (LFS-Methode), Eurostat lfsq_egaps wstatus=EMP — leicht höher als AMS-Zählung",
      },

      {
        label:       "Arbeitslosenquote national",
        value:       "7,0 %",
        data_period: "März 2026",
        score:       25,
        source_name: "AMS (national)",
        source_url:  "https://www.ams.at/arbeitsmarktdaten-und-medien/arbeitsmarkt-daten-und-arbeitsmarkt-forschung/arbeitsmarktdaten",
        eurostat_id: "",
        update:      "monatlich",
        notes:       "Nationale Arbeitslosenquote nach österreichischer Methode (AMS)",
      },

      {
        label:       "ALQ Eurostat (ILO)",
        value:       "5,7 %",
        data_period: "Apr. 2026",
        score:       40,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/une_rt_m",
        eurostat_id: "une_rt_m",
        update:      "monatlich",
        notes:       "Arbeitslosenquote nach ILO-Methode, Eurostat",
      },

      {
        label:       "Teilzeitquote",
        value:       "30,1 %",
        data_period: "2025",
        score:       35,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/lfsi_pt_a",
        eurostat_id: "lfsi_pt_a",
        update:      "jährlich",
        notes:       "Anteil Teilzeitbeschäftigte an allen Beschäftigten 15–64, Eurostat lfsi_pt_a",
      },

      {
        label:       "Steuerkeil (OECD)",
        value:       "47,2 %",
        data_period: "2024",
        score:       15,
        source_name: "OECD Taxing Wages",
        source_url:  "https://stats.oecd.org/Index.aspx?DataSetCode=TAXWAGES",
        eurostat_id: "",
        update:      "jährlich",
        notes:       "Tax Wedge für Alleinstehende ohne Kinder (OECD Taxing Wages)",
      },

      {
        label:       "Arbeitskosten / Std.",
        value:       "38,4 €",
        data_period: "2024",
        score:       42,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/lc_lci_r2_q",
        eurostat_id: "lc_lci_r2_q",
        update:      "quartal",
        notes:       "Arbeitskosten je geleistete Stunde, Gesamtwirtschaft",
      },

      {
        label:       "Faktisches Pensionsalter",
        value:       "61,4 J.",
        data_period: "2024",
        score:       20,
        source_name: "OECD / Sozialversicherung",
        source_url:  "https://stats.oecd.org/Index.aspx?DataSetCode=PENSION_STATS",
        eurostat_id: "",
        update:      "jährlich",
        notes:       "Faktisches Pensionsantrittsalter (Männer und Frauen Durchschnitt)",
      },

      {
        label:       "Geleistete Arbeitsstunden",
        value:       "6,88 Mrd. Std.",
        data_period: "2024",
        score:       45,
        source_name: "Eurostat (VGR)",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/nama_10_a10_e",
        eurostat_id: "nama_10_a10_e",
        update:      "jährlich",
        notes:       "Geleistete Arbeitsstunden gesamt (VGR), Eurostat nama_10_a10_e EMP_DC THS_HW",
      },

    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // PREISE & INFLATION
  // ──────────────────────────────────────────────────────────────────────────
  preise: {
    label: "Preise & Inflation",
    items: [

      {
        label:       "VPI / Inflation",
        value:       "3,8 %",
        data_period: "Dez. 2025",
        score:       52,
        source_name: "Eurostat (HVPI)",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/prc_hicp_manr",
        eurostat_id: "prc_hicp_manr",
        update:      "monatlich",
        notes:       "HVPI-Jahresrate ggü. Vorjahresmonat, Eurostat prc_hicp_manr CP00 RCH_A",
      },

      {
        label:       "Reallöhne",
        value:       "+0,8 %",
        data_period: "2024",
        score:       48,
        source_name: "AMECO",
        source_url:  "https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en",
        eurostat_id: "",
        update:      "jährlich",
        notes:       "Reallohnwachstum pro Beschäftigten, AMECO",
      },

      {
        label:       "Immobilienpreisindex",
        value:       "+3,7 %",
        data_period: "Q4 2025 ggü. Vj.",
        score:       45,
        source_name: "Eurostat / OeNB",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/teicp270",
        eurostat_id: "prc_hpi_q",
        update:      "quartal",
        notes:       "House Price Index Österreich, Eurostat / OeNB",
      },

      {
        label:       "Mietentwicklung",
        value:       "+3,0 %",
        data_period: "2024",
        score:       50,
        source_name: "Eurostat (HVPI CP041)",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/prc_hicp_manr",
        eurostat_id: "prc_hicp_manr",
        update:      "monatlich",
        notes:       "Tatsächliche Mieten Jahresrate, Eurostat prc_hicp_manr CP041 RCH_A",
      },

      {
        label:       "HVPI",
        value:       "3,8 %",
        data_period: "Dez. 2025",
        score:       45,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/prc_hicp_manr",
        eurostat_id: "prc_hicp_manr",
        update:      "monatlich",
        notes:       "Harmonisierter Verbraucherpreisindex, Jahresrate, Eurostat prc_hicp_manr CP00 RCH_A",
      },

      {
        label:       "Energiepreise",
        value:       "+15,9 %",
        data_period: "Dez. 2025 ggü. Vj.",
        score:       60,
        source_name: "Eurostat (HVPI)",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/prc_hicp_cann",
        eurostat_id: "prc_hicp_cann",
        update:      "jährlich",
        notes:       "Entwicklung Energiepreise ggü. Vorjahr, E-Control",
      },

    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // ÖFFENTLICHE FINANZEN
  // ──────────────────────────────────────────────────────────────────────────
  finanzen: {
    label: "Öffentliche Finanzen",
    items: [

      {
        label:       "Staatsschuldenquote",
        value:       "81,5 % BIP",
        data_period: "2025",
        score:       16,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/gov_10dd_edpt1",
        eurostat_id: "gov_10dd_edpt1",
        update:      "jährlich",
        notes:       "Gesamtstaatliche Schulden in % des BIP (Maastricht-Definition)",
      },

      {
        label:       "Staatsdefizit",
        value:       "-4,2 % BIP",
        data_period: "2025",
        score:       18,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/gov_10dd_edpt1",
        eurostat_id: "gov_10dd_edpt1",
        update:      "jährlich",
        notes:       "Staatsdefizit/-überschuss in % des BIP",
      },

      {
        label:       "Staatsquote",
        value:       "55,2 % BIP",
        data_period: "2025",
        score:       14,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/gov_10a_main",
        eurostat_id: "gov_10a_main",
        update:      "jährlich",
        notes:       "Staatsausgaben in % des BIP, Eurostat gov_10a_main S13 TE PC_GDP",
      },

      {
        label:       "Abgabenquote",
        value:       "43,7 % BIP",
        data_period: "2024",
        score:       16,
        source_name: "AMECO / Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/gov_10a_taxag",
        eurostat_id: "gov_10a_taxag",
        update:      "jährlich",
        notes:       "Steuer- und Abgabenquote in % des BIP",
      },

      {
        label:       "Zinsausgaben",
        value:       "1,6 % BIP",
        data_period: "2025",
        score:       25,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/gov_10a_main",
        eurostat_id: "gov_10a_main",
        update:      "jährlich",
        notes:       "Staatliche Zinsausgaben in % des BIP, Eurostat gov_10a_main S13 D41PAY PC_GDP",
      },

      {
        label:       "Pensionslücke",
        value:       "~14 Mrd. €",
        data_period: "2024 jährl.",
        score:       12,
        source_name: "Agenda Austria",
        source_url:  "https://www.agenda-austria.at/themen/pensionen/",
        eurostat_id: "",
        update:      "jährlich",
        notes:       "Jährliche Bundeszuschüsse zum Pensionssystem (Agenda Austria)",
      },

      {
        label:       "Sozialquote",
        value:       "30,5 %",
        data_period: "2024",
        score:       30,
        source_name: "Statistik Austria",
        source_url:  "https://www.statistik.at/statistiken/bevoelkerung-und-soziales/sozialleistungen",
        eurostat_id: "",
        update:      "jährlich",
        notes:       "Sozialausgaben in % des BIP",
      },

      {
        label:       "Staatseinnahmen",
        value:       "51,0 % BIP",
        data_period: "2025",
        score:       42,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/gov_10a_main",
        eurostat_id: "gov_10a_main",
        update:      "jährlich",
        notes:       "Gesamtstaatliche Einnahmen in % des BIP, Eurostat gov_10a_main S13 TR PC_GDP",
      },

      {
        label:       "Budgetvollzug",
        value:       "−14,4 Mrd. €",
        data_period: "2025",
        score:       20,
        source_name: "BMF Budgetvollzug",
        source_url:  "https://www.bmf.gv.at/themen/budget/das-budget/budgetvollzug.html",
        eurostat_id: "",
        update:      "monatlich",
        notes:       "Kumuliertes Nettodefizit laut BMF-Budgetvollzug",
      },

      {
        label:       "Staatsausgaben",
        value:       "267 Mrd. €",
        data_period: "2024",
        score:       18,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/gov_10a_main",
        eurostat_id: "gov_10a_main",
        update:      "jährlich",
        notes:       "Gesamtstaatliche Ausgaben absolut in Mrd. Euro, Eurostat gov_10a_main S13 TE MIO_EUR",
      },

    ]
  },

};
