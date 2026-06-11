/**
 * indikatoren.js — Agenda Austria Dashboard
 * Zuletzt gespeichert: 11.6.2026, 09:30:28
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
        value:       "9,20 Mio.",
        data_period: "1.1.2025",
        score:       52,
        source_name: "Statistik Austria",
        source_url:  "https://www.statistik.at/statistiken/bevoelkerung-und-soziales/bevoelkerung/bevoelkerungsstand/bevoelkerung-zu-jahres-/-quartalsanfang",
        eurostat_id: "",
        update:      "quartalsweise",
        notes:       "Bevölkerungsstand zu Quartalsbeginn · 1.1.2025: 9.197.213 Personen",
      },

      {
        label:       "BIP-Wachstum real",
        value:       "+0,9 %",
        data_period: "Q1 2026",
        score:       35,
        source_name: "OeNB",
        source_url:  "https://www.oenb.at/isawebstat/stabfrage/createReport?lang=EN&report=7.7",
        eurostat_id: "",
        update:      "quartalsweise",
        notes:       "Reales BIP-Wachstum ggü. Vorjahr · OeNB Report 7.7 · Q1 2026: +0,9 %",
      },

      {
        label:       "BIP nominal",
        value:       "+4,5 %",
        data_period: "Q4 2025",
        score:       42,
        source_name: "OeNB",
        source_url:  "https://www.oenb.at/isawebstat/stabfrage/createReport?lang=EN&report=7.3",
        eurostat_id: "",
        update:      "quartalsweise",
        notes:       "Nominales BIP-Wachstum ggü. Vorjahr · OeNB Report 7.3 · Q4 2025: +4,5 %",
      },

      {
        label:       "BIP pro Kopf",
        value:       "53.834 €",
        data_period: "2024",
        score:       58,
        source_name: "OeNB",
        source_url:  "https://www.oenb.at/isawebstat/stabfrage/createReport?lang=DE&report=7.1",
        eurostat_id: "",
        update:      "jährlich",
        notes:       "Nominelles BIP pro Kopf in Euro · OeNB Report 7.1 · 2025 noch nicht verfügbar",
      },

      {
        label:       "Exporte (Waren)",
        value:       "49,48 Mrd. €",
        data_period: "Q1 2026",
        score:       32,
        source_name: "Statistik Austria",
        source_url:  "https://www.statistik.at/statistiken/internationaler-handel/internationaler-warenhandel/importe-und-exporte-von-guetern",
        eurostat_id: "",
        update:      "quartalsweise",
        notes:       "Warenexporte Q1 2026: 49,48 Mrd. € (+3,4 % ggü. Q1 2025, vorläufig) · Statistik Austria",
      },

      {
        label:       "Importe",
        value:       "50,67 Mrd. €",
        data_period: "Q1 2026",
        score:       42,
        source_name: "Statistik Austria",
        source_url:  "https://www.statistik.at/statistiken/internationaler-handel/internationaler-warenhandel/importe-und-exporte-von-guetern",
        eurostat_id: "",
        update:      "quartalsweise",
        notes:       "Warenimporte Q1 2026: 50,67 Mrd. € (+3,0 % ggü. Q1 2025, vorläufig) · Statistik Austria",
      },

      {
        label:       "Insolvenzen",
        value:       "1.741",
        data_period: "Q1 2026",
        score:       32,
        source_name: "Statistik Austria",
        source_url:  "https://www.statistik.at/statistiken/industrie-bau-handel-und-dienstleistungen/unternehmensdemografie/registrierungen-und-insolvenzen",
        eurostat_id: "",
        update:      "quartalsweise",
        notes:       "Unternehmensinsolvenzen Q1 2026: 1.741 (−2,5 % ggü. Q1 2025, vorläufig) · Statistik Austria Unternehmensdemografie",
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
        value:       "+2,9 %",
        data_period: "Q4 2025",
        score:       48,
        source_name: "OeNB",
        source_url:  "https://www.oenb.at/isawebstat/stabfrage/createReport?lang=DE&report=10.20",
        eurostat_id: "",
        update:      "quartalsweise",
        notes:       "Nominale Lohnstückkosten ggü. Vorjahr · Q4 2025: +2,9 % · OeNB Statistik Report 10.20",
      },

      {
        label:       "Bruttoanlageinvestitionen / Abschreibungen",
        value:       "+2,5 %",
        data_period: "2025",
        score:       35,
        source_name: "OeNB",
        source_url:  "https://www.oenb.at/isawebstat/stabfrage/createReport?lang=DE&report=9999",
        eurostat_id: "",
        update:      "jährlich",
        notes:       "Veränderung der Bruttoanlageinvestitionen ggü. Vorjahr · OeNB Report 9999 · 2025: +2,5 %",
      },

      {
        label:       "Industriestrompreis",
        value:       "≤5 ct/kWh",
        data_period: "ab 1.1.2027",
        score:       30,
        source_name: "WKO",
        source_url:  "https://www.wko.at/oe/news/medienservice-industriestrompreis-rasch-umsetzen",
        eurostat_id: "",
        update:      "jährlich",
        notes:       "Angekündigter Industriestrompreis: ≤5 ct/kWh auf 50 % des Verbrauchs für energieintensive Betriebe ab 1.1.2027 · WKO",
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
        update:      "jährlich",
        notes:       "Jugendarbeitslosenquote <25 Jahre, ILO-Methode, Eurostat · Jahreswert 2025",
      },

      {
        label:       "Unselbst. Beschäftigte",
        value:       "4,09 Mio.",
        data_period: "2025",
        score:       55,
        source_name: "AMS / Eurostat",
        source_url:  "https://www.ams.at/arbeitsmarktdaten-und-medien/arbeitsmarkt-daten-und-arbeitsmarkt-forschung/arbeitsmarktdaten",
        eurostat_id: "",
        update:      "monatlich",
        notes:       "Unselbstständig Beschäftigte laut AMS",
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
        notes:       "Arbeitslosenquote nach ILO-Methode, Eurostat · April 2026: 5,7 % (saisonbereinigt)",
      },

      {
        label:       "Teilzeitquote",
        value:       "29,2 %",
        data_period: "2024",
        score:       35,
        source_name: "Statistik Austria / Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/lfsa_eppga",
        eurostat_id: "lfsa_eppga",
        update:      "jährlich",
        notes:       "Anteil Teilzeitbeschäftigte an allen Beschäftigten",
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
        value:       "6,90 Mrd. Std.",
        data_period: "2025",
        score:       45,
        source_name: "Statistik Austria",
        source_url:  "https://www.statistik.at/statistiken/arbeitsmarkt/arbeitszeit/arbeitszeit-arbeitsvolumen-ueberstunden",
        eurostat_id: "",
        update:      "jährlich",
        notes:       "Geleistete Arbeitsstunden gesamt (Mikrozensus) · 2025: 6,90 Mrd. Std.",
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
        value:       "3,7 %",
        data_period: "Mai 2026",
        score:       40,
        source_name: "Statistik Austria",
        source_url:  "https://www.statistik.at/statistiken/wirtschaft/preise-und-preisindizes/verbraucherpreisindex-vpi-hvpi",
        eurostat_id: "prc_hicp_minr",
        update:      "monatlich",
        notes:       "VPI-Inflationsrate ggü. Vorjahresmonat · Mai 2026: 3,7 % (Schnellschätzung)",
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
        data_period: "Q4 2024 ggü. Vj.",
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
        source_name: "Statistik Austria / Eurostat",
        source_url:  "https://www.statistik.at/statistiken/wirtschaft/preise-und-preisindizes",
        eurostat_id: "",
        update:      "jährlich",
        notes:       "Mietpreisentwicklung ggü. Vorjahr",
      },

      {
        label:       "HVPI",
        value:       "3,1 %",
        data_period: "März 2026",
        score:       45,
        source_name: "Statistik Austria / Eurostat",
        source_url:  "https://www.statistik.at/statistiken/preise-und-preismessung/verbraucherpreisindex-vpi/vpi-hvpi-und-db",
        eurostat_id: "",
        update:      "monatlich",
        notes:       "Harmonisierter Verbraucherpreisindex (EU-Vergleichsmaß)",
      },

      {
        label:       "Energiepreise",
        value:       "−8,4 %",
        data_period: "2025 ggü. Vj.",
        score:       60,
        source_name: "E-Control",
        source_url:  "https://www.e-control.at/statistik/strom/marktstatistik",
        eurostat_id: "",
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
        value:       "80,0 % BIP",
        data_period: "2025",
        score:       16,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/gov_10dd_edpt1",
        eurostat_id: "gov_10dd_edpt1",
        update:      "jährlich",
        notes:       "Gesamtstaatliche Schulden in % des BIP (Maastricht-Definition) · Eurostat gov_10dd_edpt1 2025",
      },

      {
        label:       "Staatsdefizit",
        value:       "4,2 % BIP",
        data_period: "2025",
        score:       18,
        source_name: "AMECO",
        source_url:  "https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en",
        eurostat_id: "gov_10dd_edpt1",
        update:      "jährlich",
        notes:       "Staatsdefizit/-überschuss in % des BIP",
      },

      {
        label:       "Staatsquote",
        value:       "55,3 % BIP",
        data_period: "2025",
        score:       14,
        source_name: "AMECO",
        source_url:  "https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en",
        eurostat_id: "",
        update:      "jährlich",
        notes:       "Staatsausgaben in % des BIP (Staatsquote)",
      },

      {
        label:       "Abgabenquote",
        value:       "43,7 % BIP",
        data_period: "2025",
        score:       16,
        source_name: "Eurostat",
        source_url:  "https://ec.europa.eu/eurostat/databrowser/view/gov_10a_taxag",
        eurostat_id: "gov_10a_taxag",
        update:      "jährlich",
        notes:       "Steuer- und Abgabenquote in % des BIP · Eurostat gov_10a_taxag 2025: 43,7 %",
      },

      {
        label:       "Zinsausgaben",
        value:       "2,8 % BIP",
        data_period: "2025",
        score:       25,
        source_name: "AMECO",
        source_url:  "https://economy-finance.ec.europa.eu/economic-research-and-databases/economic-databases/ameco-database_en",
        eurostat_id: "",
        update:      "jährlich",
        notes:       "Staatliche Zinsausgaben in % des BIP",
      },

      {
        label:       "Pensionslücke",
        value:       "~21 Mrd. €",
        data_period: "2025 jährl.",
        score:       12,
        source_name: "Agenda Austria",
        source_url:  "https://www.agenda-austria.at/themen/pensionen/",
        eurostat_id: "",
        update:      "jährlich",
        notes:       "Finanzierungslücke im staatlichen Pensionssystem (Agenda Austria) · 2025: ~21 Mrd. €/Jahr",
      },

      {
        label:       "Sozialquote",
        value:       "32,7 %",
        data_period: "2024",
        score:       30,
        source_name: "Statistik Austria",
        source_url:  "https://www.statistik.at/statistiken/bevoelkerung-und-soziales/sozialleistungen/sozialquote-sozialausgaben-und-finanzierung",
        eurostat_id: "",
        update:      "jährlich",
        notes:       "Sozialausgaben in % des BIP (ESSPROS) · 2024: 32,7 % (+2,1 PP ggü. 2023) · Statistik Austria",
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
        notes:       "Gesamtstaatliche Einnahmen in % des BIP · Eurostat gov_10a_main TR 2025",
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
        source_name: "Statistik Austria",
        source_url:  "https://www.statistik.at/statistiken/volkswirtschaft-und-oeffentliche-finanzen/oeffentliche-finanzen-und-steuern/staatsfinanzen",
        eurostat_id: "",
        update:      "jährlich",
        notes:       "Gesamtstaatliche Ausgaben absolut in Mrd. Euro",
      },

    ]
  },

};
