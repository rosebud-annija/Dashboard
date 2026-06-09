/**
 * panel-texte.js — Agenda Austria Dashboard · Expand-Panel-Inhalte
 * =================================================================
 * Einordnung (e), Vergleich-Titel (vt), Vergleich-Zeilen (v), Bedeutung (b)
 * für alle 37 Kacheln. Wird vom Admin-Backend bearbeitet und via GitHub API
 * committed. dashboard.js liest diese Daten über window.PANEL_TEXTE.
 */

const PANEL_TEXTE = {

  'Bevölkerung': {
    e: 'Österreichs Bevölkerung wächst weiterhin, jedoch verlangsamt. Haupttreiber ist Zuwanderung, da die Geburtenrate mit 1,47 deutlich unter dem Reproduktionsniveau (2,1) liegt. Der demographische Wandel erhöht langfristig den Druck auf Pensionen, Gesundheit und Pflege.',
    vt: 'Bevölkerung',
    v: [{n:'Österreich',v:'9,19 Mio.',w:11,c:''},{n:'Schweiz',v:'8,8 Mio.',w:10,c:''},{n:'Deutschland',v:'84,4 Mio.',w:100,c:''}],
    b: 'Integration von Zuwanderern in den Arbeitsmarkt beschleunigen (Anerkennungsverfahren, Sprachkurse). Ganztagesbetreuungsausbau vorziehen, um Geburtenrate und Frauenerwerbstätigkeit gleichzeitig zu stärken.'
  },

  'BIP-Wachstum real': {
    e: '2025 kehrte Österreich mit +0,6 % ins leichte Plus zurück. Nach zwei Rezessionsjahren ist die Erholung jedoch fragil — das Wachstum liegt deutlich unter dem EU-Schnitt. Die Industrierezession setzt sich in abgeschwächter Form fort, und die Binnennachfrage zeigt nur zögerliche Signale.',
    vt: 'BIP-Wachstum real 2025',
    v: [{n:'Österreich',v:'+0,6 %',w:25,c:'bad'},{n:'Deutschland',v:'+0,0 %',w:15,c:'bad'},{n:'EU-Schnitt',v:'+1,4 %',w:55,c:''},{n:'USA',v:'+2,8 %',w:85,c:'good'}],
    b: 'Bürokratieabbau und Standortreformen priorisieren. Unternehmenssteuer für Investitionsanreize senken. Exportabhängigkeit von Deutschland durch gezielte Diversifizierung in neue Märkte (USA, Asien) reduzieren. Ausgabenbremse einführen, um strukturelles Defizit abzubauen.'
  },

  'BIP nominal': {
    e: 'Das nominale BIP-Wachstum zog im Q4 2025 auf +3,7 % an. Mit abnehmender Inflation spiegelt dies nun mehr echte Wirtschaftsaktivität wider als in den inflationsgetriebenen Vorjahren. Dennoch bleibt das reale Wachstum (+0,6 % für Gesamtjahr 2025) weit hinter dem nominalen Zuwachs.',
    vt: 'Nom. BIP-Wachstum (%)',
    v: [{n:'Österreich Q4 2025',v:'+3,7 %',w:65,c:''},{n:'Österreich 2024',v:'+3,4 %',w:60,c:''},{n:'Österreich 2023',v:'+6,5 %',w:100,c:'bad'}],
    b: 'Inflationsbereinigung in allen öffentlichen Wirtschaftsberichten als Standard festschreiben. Ausgabenwachstum des Staates gesetzlich an das reale BIP-Wachstum koppeln (Ausgabenbremse einführen).'
  },

  'BIP pro Kopf': {
    e: 'Leicht über EU-Durchschnitt, kaufkraftbereinigt deutlich darüber. Österreich zählt zur Gruppe der wohlhabendsten EU-Mitglieder. Der Abstand zu Deutschland schrumpft jedoch durch die jüngsten Rezessionsjahre.',
    vt: 'BIP pro Kopf (€, nominal)',
    v: [{n:'Österreich',v:'53.800 €',w:42,c:''},{n:'EU-Schnitt',v:'40.890 €',w:32,c:''},{n:'Deutschland',v:'53.200 €',w:42,c:''},{n:'Luxemburg',v:'135.000 €',w:100,c:'good'}],
    b: 'Produktivitätswachstum durch Digitalisierungsoffensive und konsequente Deregulierung stärken. Steuer- und Abgabenlast senken, damit mehr Wohlstand direkt bei Haushalten und Unternehmen verbleibt.'
  },

  'Exporte (Waren)': {
    e: 'Im Jänner 2026 lagen die Warenexporte bei 15,06 Mrd. € (−2,2 % ggü. Jänner 2025). Der Abwärtsdruck durch schwache EU-Nachfrage hält an, obwohl das Minus geringer ausfällt als im Vorjahr. Österreichs Exportquote liegt mit rund 39 % des BIP unter dem EU-Schnitt.',
    vt: 'Exportquote (% des BIP)',
    v: [{n:'Österreich',v:'39 %',w:54,c:''},{n:'EU-Schnitt',v:'50 %',w:70,c:''},{n:'Deutschland',v:'56 %',w:78,c:''},{n:'Belgien',v:'85 %',w:100,c:'good'}],
    b: 'Freihandelsabkommen aktiv unterstützen und rasch ratifizieren. Exportförderung auf neue Wachstumsmärkte (Asien, Nordamerika) ausrichten. Bürokratiekosten für exportierende KMU durch One-Stop-Shops senken.'
  },

  'Importe': {
    e: 'Warenimporte lagen im Jänner 2026 bei 15,13 Mrd. € (−3,0 % ggü. Vorjahr). Importe > Exporte bedeutet ein leichtes Handelsbilanzdefizit. Der anhaltende Rückgang signalisiert schwache Inlandsnachfrage — Konsumenten und Unternehmen investieren weiter zurückhaltend.',
    vt: 'Jän. 2026: Exporte vs. Importe',
    v: [{n:'Importe −3,0 %',v:'15,13 Mrd.',w:57,c:'bad'},{n:'Exporte −2,2 %',v:'15,06 Mrd.',w:55,c:'bad'}],
    b: 'Importrückgang als Warnsignal für Binnennachfrageschwäche ernst nehmen. Kaufkraft durch Senkung der Lohnnebenkosten und Abschaffung der Kalten Progression strukturell stärken.'
  },

  'Insolvenzen': {
    e: 'Im Q4 2025 wurden 1.669 Unternehmensinsolvenzen registriert (−2,2 % ggü. Q3 2025) — ein leichter Rückgang, der die Lage jedoch nicht grundlegend verändert. Besonders betroffen bleiben Gastronomie, Bau und Einzelhandel. Die Fallzahlen liegen weiterhin deutlich über dem Vorkrisenniveau.',
    vt: 'Unternehmensinsolvenzen AT',
    v: [{n:'2019 (prä-COVID)',v:'~5.100',w:55,c:''},{n:'2022 (Stützung)',v:'~1.800',w:19,c:'good'},{n:'Q4 2025 (ann.)',v:'~6.700',w:72,c:'bad'}],
    b: 'Frühwarnsystem für überschuldete Unternehmen ausbauen (z.B. steuerlich betreute Restrukturierungsberatung). Insolvenzrecht modernisieren, um Sanierung vor Liquidation zu ermöglichen. Finanzierungszugang für KMU in Umstrukturierungsphasen verbessern.'
  },

  'Direktinvestitionen': {
    e: 'Der Bestand ausländischer Direktinvestitionen (FDI) in Österreich lag 2023 bei 226,3 Mrd. € laut Parlamentsbericht 2025. Österreich bleibt eine wichtige Drehscheibe für Investitionen nach Mittel- und Osteuropa. Im EU-Vergleich liegt die FDI-Quote relativ stabil.',
    vt: 'FDI-Bestand (Mrd. €)',
    v: [{n:'Österreich 2023',v:'226,3 Mrd.',w:42,c:'good'},{n:'Niederlande',v:'~860 Mrd.',w:100,c:'good'},{n:'Irland',v:'~950 Mrd.',w:100,c:'good'}],
    b: 'Standortattraktivität durch niedrigere Körperschaftsteuer und Deregulierung aktiv verteidigen. Rechtsstaatlichkeit, Planungssicherheit und Investitionsschutz als zentrale Standortfaktoren pflegen. Verwaltungsverfahren für FDI-Genehmigungen beschleunigen.'
  },

  'Business Climate Indicator': {
    e: 'Negativwert zeigt Pessimismus unter österreichischen Unternehmen. Eintrübung in Industrie und Dienstleistungen. Konsumzurückhaltung, hohe Kosten und Fachkräftemangel belasten die Erwartungen.',
    vt: 'Business Climate 2025',
    v: [{n:'Österreich',v:'−0,7',w:15,c:'bad'},{n:'Deutschland',v:'−0,8',w:15,c:'bad'},{n:'EU-Schnitt',v:'+0,3',w:45,c:''},{n:'USA',v:'+1,1',w:65,c:'good'}],
    b: 'Sofortige Entlastungsmaßnahmen für Unternehmen signalisieren: Bürokratieabbau, schnellere Genehmigungen, Senkung der Energieabgaben. Konjunkturprogramm über Deregulierung statt Schulden finanzieren.'
  },

  'Lohnstückkosten': {
    e: 'Die nominalen Lohnstückkosten stiegen im Q4 2025 nur noch um +2,9 % ggü. Vorjahr — eine deutliche Abkühlung gegenüber dem Spitzenwert von +4,6 % in 2024. Die Wettbewerbsfähigkeit verbessert sich, liegt aber weiterhin über dem EU-Schnitt. Sinkende Inflation erleichtert moderatere KV-Abschlüsse.',
    vt: 'Lohnstückkostenwachstum Q4 2025',
    v: [{n:'Österreich',v:'+2,9 %',w:58,c:'bad'},{n:'Deutschland',v:'+2,5 %',w:50,c:'neu'},{n:'EU-Schnitt',v:'+2,3 %',w:46,c:'neu'},{n:'Polen',v:'+1,0 %',w:20,c:'good'}],
    b: 'Kollektivvertragsabschlüsse stärker an die Produktivitätsentwicklung koppeln. Digitalisierungsinvestitionen steuerlich begünstigen, um Produktivitätswachstum anzukurbeln. Den positiven Trend durch Strukturreformen (Arbeitszeitflexibilisierung, Qualifizierungsoffensive) verstetigen.'
  },

  'Bruttoanlageinvestitionen / Abschreibungen': {
    e: 'Die Investitionsquote ist auf 22,1 % gesunken und liegt unter dem EU-Schnitt. Wenn Investitionen die Abschreibungen nicht deutlich übersteigen, stagniert oder schrumpft der produktive Kapitalstock.',
    vt: 'Investitionsquote (% BIP)',
    v: [{n:'Österreich',v:'22,1 %',w:68,c:'bad'},{n:'EU-Schnitt',v:'23,8 %',w:73,c:''},{n:'Südkorea',v:'32,1 %',w:100,c:'good'}],
    b: 'Sofortabschreibung für Investitionen einführen. Öffentliche Investitionen auf produktive Infrastruktur (Breitband, Schienenausbau) konzentrieren. Regulierungshürden für private Investoren abbauen.'
  },

  'Industriestrompreis': {
    e: 'Österreich liegt mit 18,75 ct/kWh über dem EU-Schnitt von 15,1 ct/kWh — ein erheblicher Wettbewerbsnachteil für energieintensive Industrien wie Stahl, Chemie und Papier.',
    vt: 'Industriestrompreis (ct/kWh)',
    v: [{n:'Frankreich',v:'10,3',w:37,c:'good'},{n:'EU-Schnitt',v:'15,1',w:55,c:''},{n:'Österreich',v:'18,75',w:68,c:'bad'},{n:'Deutschland',v:'20,4',w:74,c:'bad'}],
    b: 'Netzentgelte reformieren und staatliche Energieabgaben schrittweise reduzieren. Langfristige Direktlieferverträge (PPAs) zwischen Produzenten und Industriekunden erleichtern. Erneuerbaren Ausbau beschleunigen.'
  },

  'Jugend-ALQ': {
    e: 'Die Jugendarbeitslosigkeit (15–24 J.) liegt leicht unter dem EU-Schnitt, aber strukturell erhöht. Betroffen: Schulabbrecher, Migranten der zweiten Generation, gering Qualifizierte.',
    vt: 'Jugend-ALQ (%, ILO, 2025)',
    v: [{n:'Deutschland',v:'6,2 %',w:33,c:'good'},{n:'Österreich',v:'11,1 %',w:59,c:'neu'},{n:'EU-Schnitt',v:'14,8 %',w:79,c:''},{n:'Spanien',v:'27,0 %',w:100,c:'bad'}],
    b: 'Lehrstellenförderung für KMU ausbauen. Schnittstelle Schule–Beruf mit Berufsorientierung ab der Mittelschule verbessern. AMS-Ressourcen auf NEET-Jugendliche konzentrieren (maßgeschneiderte Einstiegsprogramme).'
  },

  'Unselbst. Beschäftigte': {
    e: 'Leichtes Beschäftigungswachstum trotz Rezession — ein robustes Signal. Allerdings wächst Teilzeitbeschäftigung deutlich stärker als Vollzeit, was das gesamte Stundenvolumen drückt.',
    vt: 'Beschäftigte (Mio.)',
    v: [{n:'2020 (COVID)',v:'3,88 Mio.',w:79,c:'bad'},{n:'2022',v:'4,02 Mio.',w:82,c:''},{n:'2025',v:'4,09 Mio.',w:85,c:'good'}],
    b: 'Vollzeitarbeit steuerlich attraktiver machen (Übersteuenentlastung). Übergang von Teilzeit zu Vollzeit durch flächendeckenden Ausbau ganztägiger Kinderbetreuung strukturell erleichtern.'
  },

  'Arbeitslosenquote national': {
    e: 'Die nationale Definition (AMS) zählt alle vorgemerkten Arbeitslosen inklusive Schulungsteilnehmer. Mit 322.727 betroffenen Personen der höchste Wert seit Jahren. Frauen und ältere Arbeitnehmer überproportional betroffen.',
    vt: 'ALQ national (%) — März 2026',
    v: [{n:'2019 (prä-COVID)',v:'7,4 %',w:76,c:''},{n:'2022 (Tief)',v:'6,3 %',w:65,c:'good'},{n:'2026',v:'7,0 %',w:72,c:'bad'}],
    b: 'Zumutbarkeitsregeln im AMS an Marktbedarf anpassen. AMS-Schulungsangebote auf anerkannte Mangelberufe fokussieren. Eingliederungsbeihilfen für Langzeitarbeitslose ausbauen und Treffsicherheit erhöhen.'
  },

  'ALQ Eurostat (ILO)': {
    e: 'Die ILO-Definition (international vergleichbar) erfasst nur aktiv Arbeitssuchende. Österreich liegt knapp unter EU-Schnitt, aber deutlich über Deutschland und dem früheren österreichischen Bestwert.',
    vt: 'ALQ Eurostat/ILO (%, 2025)',
    v: [{n:'Deutschland',v:'3,4 %',w:34,c:'good'},{n:'Österreich',v:'5,8 %',w:58,c:''},{n:'EU-Schnitt',v:'6,0 %',w:60,c:''},{n:'Spanien',v:'11,4 %',w:100,c:'bad'}],
    b: 'Strukturelle Arbeitsmarktreformen priorisieren: Arbeitszeitflexibilisierung, niedrigere Lohnnebenkosten, bessere Weiterbildungssysteme. EU-Benchmarks als Zielgröße für nationale Arbeitsmarktpolitik nutzen.'
  },

  'Teilzeitquote': {
    e: 'Mit 29,2 % liegt Österreich deutlich über dem EU-Schnitt. Hauptbetroffene sind Frauen (48,9 %), besonders Mütter. Hohe Teilzeitquote senkt das Steuer- und Sozialversicherungsaufkommen.',
    vt: 'Teilzeitquote (%, gesamt)',
    v: [{n:'EU-Schnitt',v:'17,7 %',w:40,c:''},{n:'Österreich',v:'29,2 %',w:66,c:'bad'},{n:'Deutschland',v:'29,6 %',w:67,c:'bad'},{n:'Niederlande',v:'44,0 %',w:100,c:'bad'}],
    b: 'Rechtsanspruch auf ganztägige Kinderbetreuung ab 1 Jahr einführen. Steuerliche Benachteiligung von Zweitverdienern (Familienbonus) abschaffen. Pflegeurlaub und Elternzeit flexibler gestalten.'
  },

  'Steuerkeil (OECD)': {
    e: 'Der Steuerkeil misst die Differenz zwischen dem, was Arbeitgeber zahlen, und dem, was der Arbeitnehmer netto erhält. Mit 47,2 % liegt Österreich international im Spitzenfeld — nur Belgien und Deutschland sind höher.',
    vt: 'Steuerkeil (%, Durchschnittsverdiener)',
    v: [{n:'Schweiz',v:'22,0 %',w:35,c:'good'},{n:'OECD-Schnitt',v:'34,8 %',w:56,c:''},{n:'Österreich',v:'47,2 %',w:76,c:'bad'},{n:'Belgien',v:'52,7 %',w:85,c:'bad'}],
    b: 'Eingangssteuersatz und Dienstgeberbeiträge schrittweise senken — gegenfinanziert durch Ausgabenreformen, nicht Steuererhöhungen. Automatische Abschaffung der Kalten Progression dauerhaft verankern.'
  },

  'Arbeitskosten / Std.': {
    e: 'Mit 38,4 € pro Stunde liegt Österreich über dem EU-Schnitt (34,6 €). Die Kombination aus hohen Löhnen und überdurchschnittlichen Lohnnebenkosten belastet die Standortwettbewerbsfähigkeit.',
    vt: 'Arbeitskosten je Stunde (€, 2024)',
    v: [{n:'Slowakei',v:'16,3 €',w:24,c:'good'},{n:'EU-Schnitt',v:'34,6 €',w:51,c:''},{n:'Österreich',v:'38,4 €',w:57,c:'bad'},{n:'Luxemburg',v:'50,0 €',w:74,c:'bad'}],
    b: 'Dienstgeberbeiträge zur Sozialversicherung senken, um Lohnkostenbelastung zu reduzieren. Investitionen in betriebliche Weiterbildung steuerlich fördern, um Produktivitätswachstum nachhaltig anzuheben.'
  },

  'Faktisches Pensionsalter': {
    e: 'Das tatsächliche Pensionsantrittsalter liegt mit 61,4 Jahren weit unter dem gesetzlichen Ziel von 65 Jahren. Österreich hat eines der niedrigsten faktischen Pensionsalter in der EU, trotz offiziell hohem Pensionsalter.',
    vt: 'Faktisches Pensionsantrittsalter',
    v: [{n:'Österreich',v:'61,4 J.',w:63,c:'bad'},{n:'Deutschland',v:'63,8 J.',w:66,c:''},{n:'Schweden',v:'64,7 J.',w:67,c:'good'},{n:'Ziel AT',v:'65 J.',w:67,c:''}],
    b: 'Gesetzliches und faktisches Pensionsalter schrittweise auf 65 Jahre angleichen. Frühpensionsanreize (Korridorpension, Schwerarbeitspension) einschränken. Pensionsformel an steigende Lebenserwartung koppeln.'
  },

  'Geleistete Arbeitsstunden': {
    e: 'Das gesamte Arbeitsvolumen sinkt trotz wachsender Beschäftigtenzahl. Treiber: steigende Teilzeitquote und hoher Krankenstand (Österreich liegt EU-weit an der Spitze). Das verfügbare Arbeitsvolumen nimmt ab.',
    vt: 'Geleistete Arbeitsstunden (Mrd.)',
    v: [{n:'2019',v:'7,10 Mrd.',w:100,c:''},{n:'2022',v:'6,93 Mrd.',w:98,c:''},{n:'2024',v:'6,88 Mrd.',w:97,c:'bad'}],
    b: 'Jahresarbeitszeitmodelle ermöglichen, um Flexibilität ohne Mehrkosten zu schaffen. Krankenstandsreduktion durch betriebliche Gesundheitsförderung incentivieren. Überstundensteuer reformieren, Mehrarbeit attraktiver machen.'
  },

  'VPI / Inflation': {
    e: 'Deutliche Entspannung gegenüber den Hochpunkten 2022/23 (>10 %). Der Jahreswert 2025 liegt bei 3,6 % wegen starker früher Monate höher. EZB-Ziel: 2 % — noch nicht dauerhaft erreicht.',
    vt: 'VPI Inflation (%)',
    v: [{n:'EZB-Ziel',v:'2,0 %',w:44,c:'good'},{n:'Österreich (aktuell)',v:'2,2 %',w:48,c:'neu'},{n:'EU-Schnitt 2025',v:'2,3 %',w:50,c:''},{n:'AT Spitze 2022',v:'11,2 %',w:100,c:'bad'}],
    b: 'Wettbewerb in Lebensmittel- und Energiemärkten durch Marktöffnung stärken. Regulatorische Preistreiber (administrierte Gebühren, Netzentgelte) systematisch überprüfen und abbauen.'
  },

  'Reallöhne': {
    e: 'Nach zwei Jahren realer Lohnverluste (2022: −3,4 %, 2023: −1,2 %) wachsen die Reallöhne erstmals wieder. Die Kaufkraft erholt sich — ein Signal für stabilere Binnennachfrage.',
    vt: 'Reallohnwachstum (%)',
    v: [{n:'2022',v:'−3,4 %',w:20,c:'bad'},{n:'2023',v:'−1,2 %',w:30,c:'bad'},{n:'2024',v:'+0,8 %',w:50,c:'good'}],
    b: 'Kaufkraft strukturell durch Steuersenkungen stärken, nicht durch inflationstreibende Lohnrunden. Produktivitätsorientierte Lohnpolitik als Ziel in Kollektivverträgen verankern.'
  },

  'Immobilienpreisindex': {
    e: 'Nach einem Preisrückgang 2023/24 erholen sich Immobilienpreise wieder. EZB-Zinssenkungen stützen die Nachfrage. Strukturell bleiben Wohnkosten in Städten hoch und belasten Haushalte.',
    vt: 'Immopreisveränderung (%)',
    v: [{n:'2023 (Korrektur)',v:'−5,0 %',w:30,c:'bad'},{n:'2024',v:'+0,5 %',w:44,c:''},{n:'2025',v:'+3,7 %',w:60,c:'neu'}],
    b: 'Widmungs- und Bauverfahren vereinfachen, um Neubauvolumen zu erhöhen. Flächenmobilisierung durch Grundstücksbesteuerung von Brachflächen anreizen. Wohnbauförderung auf Neubau statt Bestandssubventionen lenken.'
  },

  'Mietentwicklung': {
    e: 'Mieten steigen weiterhin, aber moderat unter der Inflationsrate. Regulierte Richtwert- und Kategoriemieten steigen mit dem Verbraucherpreisindex. Freie Marktmieten wachsen in Wien und Graz deutlich stärker.',
    vt: 'Mietwachstum vs. Inflation (%)',
    v: [{n:'Mietentwicklung',v:'+3,0 %',w:55,c:'neu'},{n:'VPI Inflation',v:'+3,6 %',w:65,c:'bad'}],
    b: 'Mietpreisbremsen durch angebotsseitige Maßnahmen ersetzen: Neubauförderung, Baurechtsreform, schnellere Widmungsverfahren. Leerstand durch Abgaben mobilisieren. Gemeinnützige Bauträger mit mehr Eigenkapital ausstatten.'
  },

  'HVPI': {
    e: 'Der harmonisierte VPI (EU-Vergleichsmaß) liegt mit 3,1 % über dem EU-Ziel von 2 %. Österreich hatte im EU-Vergleich über längere Zeit eine höhere Inflation als der EU-Schnitt.',
    vt: 'HVPI Inflation (%, 2025)',
    v: [{n:'EZB-Ziel',v:'2,0 %',w:35,c:'good'},{n:'EU-Schnitt',v:'2,3 %',w:40,c:''},{n:'Österreich',v:'3,1 %',w:55,c:'bad'},{n:'Ungarn',v:'4,8 %',w:84,c:'bad'}],
    b: 'Wettbewerbsrecht stärken und Marktkonzentration in Lebensmittel- und Energiehandel überprüfen. Automatische Indexierungen in Kollektivverträgen dämpfen, um Inflationsspiralen zu vermeiden.'
  },

  'Energiepreise': {
    e: 'Deutliche Entlastung nach dem Energiepreisschock 2022/23. Sinkende Strom- und Gaspreise entlasten Haushalte und Industrie. Risiko: geopolitische Abhängigkeiten (Gas, Öl) bleiben strukturell bestehen.',
    vt: 'Energiepreise ggü. Vorjahr (%)',
    v: [{n:'2022 (Schock)',v:'+120 %',w:100,c:'bad'},{n:'2023',v:'+8 %',w:23,c:'bad'},{n:'2025',v:'−8,4 %',w:10,c:'good'}],
    b: 'Preisrückgang als Reformfenster nutzen: Energieeffizienzmaßnahmen im Gebäudesektor beschleunigen, fossile Importabhängigkeit reduzieren. Netzausbau für erneuerbare Energien priorisieren.'
  },

  'Staatsschuldenquote': {
    e: 'Trotz Rekordsteuereinnahmen steigt die Schuldenquote weiter, da die Ausgaben noch stärker wachsen. 2026 werden 84,7 % prognostiziert. Die EU-Maastricht-Grenze (60 %) wird um 24 Punkte überschritten.',
    vt: 'Staatsschuldenquote (% BIP)',
    v: [{n:'EU-Maastricht',v:'60 %',w:44,c:'good'},{n:'Deutschland',v:'62,9 %',w:46,c:'neu'},{n:'Österreich',v:'81,5 %',w:60,c:'bad'},{n:'Italien',v:'137,3 %',w:100,c:'bad'}],
    b: 'Schuldenquote mittelfristig auf EU-Maastricht-Niveau (60 % BIP) zurückführen. Ausgabenpfad gesetzlich an nominales Wirtschaftswachstum koppeln. Keine neuen Schulden für konsumtive Ausgaben — nur für produktive Investitionen.'
  },

  'Staatsdefizit': {
    e: 'Das Budgetdefizit von 4,2 % des BIP liegt klar über der EU-Maastricht-Grenze von 3 %. Die EU hat ein Defizitverfahren eingeleitet. Österreich muss einen Konsolidierungspfad vorlegen.',
    vt: 'Staatsdefizit (% BIP, 2024)',
    v: [{n:'Maastricht-Ziel',v:'3,0 %',w:53,c:'good'},{n:'Deutschland',v:'2,0 %',w:35,c:'good'},{n:'EU-Schnitt',v:'3,5 %',w:61,c:'bad'},{n:'Österreich',v:'4,2 %',w:74,c:'bad'}],
    b: 'Strukturelles Konsolidierungspaket von ~5–6 Mrd. € jährlich bis 2028 umsetzen — ausgabenseitig (Subventionsabbau, Verwaltungsreform), nicht durch Steuererhöhungen. EU-Defizitverfahren als Reformdruck nutzen.'
  },

  'Staatsquote': {
    e: 'Der Anteil der Staatsausgaben am BIP liegt mit 55,3 % im EU-Spitzenfeld. Eine hohe Staatsquote kann Effizienz der Ressourcenallokation senken und privates Investitionswachstum verdrängen.',
    vt: 'Staatsquote (% BIP)',
    v: [{n:'Schweiz',v:'35,2 %',w:37,c:'good'},{n:'EU-Schnitt',v:'49,8 %',w:52,c:''},{n:'Österreich',v:'55,3 %',w:58,c:'bad'},{n:'Frankreich',v:'58,0 %',w:61,c:'bad'}],
    b: 'Spending Reviews für alle Ressorts einführen. Ausgabenwachstum dauerhaft unter nominalem BIP-Wachstum halten. Alle Subventionen und Förderungen auf messbare Wirkung prüfen und unwirksame abschaffen.'
  },

  'Abgabenquote': {
    e: 'Mit 44,3 % Steuern und Abgaben am BIP liegt Österreich im obersten OECD-Quartil. Hohe Abgaben finanzieren den Wohlfahrtsstaat, belasten aber Wettbewerbsfähigkeit und Investitionsanreize.',
    vt: 'Abgabenquote (% BIP)',
    v: [{n:'OECD-Schnitt',v:'34,1 %',w:55,c:''},{n:'EU-Schnitt',v:'40,8 %',w:65,c:''},{n:'Österreich',v:'44,3 %',w:71,c:'bad'},{n:'Frankreich',v:'47,1 %',w:75,c:'bad'}],
    b: 'Steuerstrukturreform: Arbeit entlasten (Lohnnebenkosten), dafür Konsum maßvoll stärker belasten (Ökosteuern). Kalte Progression dauerhaft abschaffen. Gegenfinanzierung über Ausgabenreformen sicherstellen.'
  },

  'Zinsausgaben': {
    e: 'Durch die Zinswende 2022–2024 sind die Zinsausgaben von 1,5 % (2021) auf 2,8 % des BIP gestiegen — rund 10 Mrd. € jährlich. Jede Schuldenerhöhung verstärkt diesen Effekt.',
    vt: 'Zinsausgaben (% BIP)',
    v: [{n:'2021 (Tief)',v:'1,5 %',w:39,c:'good'},{n:'2023',v:'2,2 %',w:57,c:'neu'},{n:'2025',v:'2,8 %',w:73,c:'bad'}],
    b: 'Schuldenabbau priorisieren, um Zinslast langfristig zu senken. Zinspuffer von mindestens 0,5 % des BIP im Budgetplan einplanen. Keine Neuverschuldung für laufende Ausgaben — Zinslastanstieg ist irreversibel.'
  },

  'Pensionslücke': {
    e: 'Der staatliche Zuschuss zum Pensionssystem beträgt ~14 Mrd. € jährlich und wächst. Hauptursachen: früher Pensionsantritt (61,4 J.), Alterung, niedrige Vollzeitquote bei Frauen. Ohne Reformen drohen bis 2030 über 20 Mrd. €.',
    vt: 'Jährl. Pensionszuschuss (Mrd. €)',
    v: [{n:'2010',v:'8 Mrd.',w:40,c:''},{n:'2020',v:'11 Mrd.',w:55,c:''},{n:'2024',v:'14 Mrd.',w:70,c:'bad'},{n:'Prognose 2030',v:'>20 Mrd.',w:100,c:'bad'}],
    b: 'Faktisches Pensionsalter durch Abschaffung der Korridorpension auf 63+ anheben. Pensionsformel an Lebenserwartung koppeln. Vollzeitquote bei Frauen durch Kinderbetreuungsausbau erhöhen — schließt langfristig die Lücke.'
  },

  'Sozialquote': {
    e: 'Sozialausgaben machen 30,5 % des BIP aus — leicht über EU-Schnitt. Pensionen allein machen rund 15 % des BIP aus und dominieren den Sozialbereich. Der demographische Wandel erhöht den Druck weiter.',
    vt: 'Sozialquote (% BIP)',
    v: [{n:'OECD-Schnitt',v:'21,0 %',w:50,c:''},{n:'EU-Schnitt',v:'28,1 %',w:67,c:''},{n:'Schweden',v:'30,3 %',w:72,c:''},{n:'Österreich',v:'30,5 %',w:73,c:'bad'}],
    b: 'Sozialleistungen auf Treffsicherheit überprüfen. Transferentzugsraten senken, um Erwerbsaufnahme zu incentivieren. Pflege durch Qualitätswettbewerb und mehr private Anbieter effizienter gestalten.'
  },

  'Staatseinnahmen': {
    e: 'Trotz Rekordsteuereinnahmen bleibt das Defizit hoch, weil die Ausgaben noch stärker wachsen. Eine Einnahmenquote von 51,1 % des BIP zeigt, dass das Budgetproblem ausgabenseitig ist.',
    vt: 'Staatseinnahmen (% BIP)',
    v: [{n:'OECD-Schnitt',v:'38,5 %',w:56,c:''},{n:'EU-Schnitt',v:'46,3 %',w:67,c:''},{n:'Österreich',v:'51,1 %',w:74,c:'bad'},{n:'Frankreich',v:'53,8 %',w:78,c:'bad'}],
    b: 'Das Defizit ist ein Ausgabenproblem, kein Einnahmenproblem. Steuererhöhungen ablehnen. Stattdessen: Verwaltungsreform, Föderalismusreform (Aufgabenentflechtung) und Subventionsabbau umsetzen.'
  },

  'Budgetvollzug': {
    e: 'Einnahmen 107,1 Mrd. €, Ausgaben 121,5 Mrd. € — ein strukturelles Defizit von 14,4 Mrd. €. Das EU-Defizitverfahren ist eingeleitet. Österreich muss bis 2028 auf unter 3 % des BIP konsolidieren.',
    vt: 'Budget 2024 (Mrd. €)',
    v: [{n:'Einnahmen',v:'107,1 Mrd.',w:72,c:''},{n:'Ausgaben',v:'121,5 Mrd.',w:82,c:'bad'},{n:'Defizit',v:'−14,4 Mrd.',w:10,c:'bad'}],
    b: 'Monatlichen Budgetvollzug transparenter kommunizieren und ressortweise Ausgabenobergrenzen einführen. Nachtragsbudgets auf echte Notfälle beschränken. EU-Defizitverfahren als verbindlichen Konsolidierungsplan nutzen.'
  },

  'Staatsausgaben': {
    e: 'Mit 267 Mrd. € (55,2 % des BIP) liegt Österreich im EU-Spitzenfeld. Größte Posten: Soziales (~38 %), Gesundheit (~15 %), allgemeine öffentliche Verwaltung (~14 %). Die Ausgaben wachsen trotz Sparanforderungen.',
    vt: 'Staatsausgabenquote (% BIP)',
    v: [{n:'Schweiz',v:'35,2 %',w:37,c:'good'},{n:'EU-Schnitt',v:'49,8 %',w:52,c:''},{n:'Österreich',v:'55,2 %',w:58,c:'bad'},{n:'Frankreich',v:'58,0 %',w:61,c:'bad'}],
    b: 'Ausgabenwachstum auf unter 2 % p.a. begrenzen. Sozial- und Pensionsausgaben auf Effizienz prüfen. Bildungs- und Infrastrukturinvestitionen schützen und erhöhen — sie zahlen sich volkswirtschaftlich aus.'
  }

};
