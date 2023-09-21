export default class Country {
  // eslint-disable-next-line no-use-before-define
  static ALL_VALUE: Map<string, Country> = new Map();

  static readonly AAX = new Country('X', 'ALA', '248');

  static readonly AL = new Country('AL', 'ALB', '008');

  static readonly DZ = new Country('DZ', 'DZA', '012');

  static readonly AS = new Country('AS', 'ASM', '016');

  static readonly AD = new Country('AD', 'AND', '020');

  static readonly AO = new Country('AO', 'AGO', '024');

  static readonly AI = new Country('AI', 'AIA', '660');

  static readonly AQ = new Country('AQ', 'ATA', '010');

  static readonly AG = new Country('AG', 'ATG', '028');

  static readonly AR = new Country('AR', 'ARG', '032');

  static readonly AM = new Country('AM', 'ARM', '051');

  static readonly AW = new Country('AW', 'ABW', '533');

  static readonly AU = new Country('AU', 'AUS', '036');

  static readonly AT = new Country('AT', 'AUT', '040');

  static readonly AZ = new Country('AZ', 'AZE', '031');

  static readonly BS = new Country('BS', 'BHS', '044');

  static readonly BH = new Country('BH', 'BHR', '048');

  static readonly BD = new Country('BD', 'BGD', '050');

  static readonly BB = new Country('BB', 'BRB', '052');

  static readonly BY = new Country('BY', 'BLR', '112');

  static readonly BE = new Country('BE', 'BEL', '056');

  static readonly BZ = new Country('BZ', 'BLZ', '084');

  static readonly BJ = new Country('BJ', 'BEN', '204');

  static readonly BM = new Country('BM', 'BMU', '060');

  static readonly BT = new Country('BT', 'BTN', '064');

  static readonly BO = new Country('BO', 'BOL', '068');

  static readonly BQ = new Country('BQ', 'BES', '535');

  static readonly BA = new Country('BA', 'BIH', '070');

  static readonly BW = new Country('BW', 'BWA', '072');

  static readonly BV = new Country('BV', 'BVT', '074');

  static readonly BR = new Country('BR', 'BRA', '076');

  static readonly IO = new Country('IO', 'IOT', '086');

  static readonly BN = new Country('BN', 'BRN', '096');

  static readonly BG = new Country('BG', 'BGR', '100');

  static readonly BF = new Country('BF', 'BFA', '854');

  static readonly BI = new Country('BI', 'BDI', '108');

  static readonly CV = new Country('CV', 'CPV', '132');

  static readonly KH = new Country('KH', 'KHM', '116');

  static readonly CM = new Country('CM', 'CMR', '120');

  static readonly CA = new Country('CA', 'CAN', '124');

  static readonly KY = new Country('KY', 'CYM', '136');

  static readonly CF = new Country('CF', 'CAF', '140');

  static readonly TD = new Country('TD', 'TCD', '148');

  static readonly CL = new Country('CL', 'CHL', '152');

  static readonly CN = new Country('CN', 'CHN', '156');

  static readonly CX = new Country('CX', 'CXR', '162');

  static readonly CC = new Country('CC', 'CCK', '166');

  static readonly CO = new Country('CO', 'COL', '170');

  static readonly KM = new Country('KM', 'COM', '174');

  static readonly CD = new Country('CD', 'COD', '180');

  static readonly CG = new Country('CG', 'COG', '178');

  static readonly CK = new Country('CK', 'COK', '184');

  static readonly CR = new Country('CR', 'CRI', '188');

  static readonly CI = new Country('CI', 'CIV', '384');

  static readonly HR = new Country('HR', 'HRV', '191');

  static readonly CU = new Country('CU', 'CUB', '192');

  static readonly CW = new Country('CW', 'CUW', '531');

  static readonly CY = new Country('CY', 'CYP', '196');

  static readonly CZ = new Country('CZ', 'CZE', '203');

  static readonly DK = new Country('DK', 'DNK', '208');

  static readonly DJ = new Country('DJ', 'DJI', '262');

  static readonly DM = new Country('DM', 'DMA', '212');

  static readonly DO = new Country('DO', 'DOM', '214');

  static readonly EC = new Country('EC', 'ECU', '218');

  static readonly EG = new Country('EG', 'EGY', '818');

  static readonly SV = new Country('SV', 'SLV', '222');

  static readonly GQ = new Country('GQ', 'GNQ', '226');

  static readonly ER = new Country('ER', 'ERI', '232');

  static readonly EE = new Country('EE', 'EST', '233');

  static readonly SZ = new Country('SZ', 'SWZ', '748');

  static readonly ET = new Country('ET', 'ETH', '231');

  static readonly FK = new Country('FK', 'FLK', '238');

  static readonly FO = new Country('FO', 'FRO', '234');

  static readonly FJ = new Country('FJ', 'FJI', '242');

  static readonly FI = new Country('FI', 'FIN', '246');

  static readonly FR = new Country('FR', 'FRA', '250');

  static readonly GF = new Country('GF', 'GUF', '254');

  static readonly PF = new Country('PF', 'PYF', '258');

  static readonly TF = new Country('TF', 'ATF', '260');

  static readonly GA = new Country('GA', 'GAB', '266');

  static readonly GM = new Country('GM', 'GMB', '270');

  static readonly GE = new Country('GE', 'GEO', '268');

  static readonly DE = new Country('DE', 'DEU', '276');

  static readonly GH = new Country('GH', 'GHA', '288');

  static readonly GI = new Country('GI', 'GIB', '292');

  static readonly GR = new Country('GR', 'GRC', '300');

  static readonly GL = new Country('GL', 'GRL', '304');

  static readonly GD = new Country('GD', 'GRD', '308');

  static readonly GP = new Country('GP', 'GLP', '312');

  static readonly GU = new Country('GU', 'GUM', '316');

  static readonly GT = new Country('GT', 'GTM', '320');

  static readonly GG = new Country('GG', 'GGY', '831');

  static readonly GN = new Country('GN', 'GIN', '324');

  static readonly GW = new Country('GW', 'GNB', '624');

  static readonly GY = new Country('GY', 'GUY', '328');

  static readonly HT = new Country('HT', 'HTI', '332');

  static readonly HM = new Country('HM', 'HMD', '334');

  static readonly VA = new Country('VA', 'VAT', '336');

  static readonly HN = new Country('HN', 'HND', '340');

  static readonly HK = new Country('HK', 'HKG', '344');

  static readonly HU = new Country('HU', 'HUN', '348');

  static readonly IS = new Country('IS', 'ISL', '352');

  static readonly IN = new Country('IN', 'IND', '356');

  static readonly ID = new Country('ID', 'IDN', '360');

  static readonly IR = new Country('IR', 'IRN', '364');

  static readonly IQ = new Country('IQ', 'IRQ', '368');

  static readonly IE = new Country('IE', 'IRL', '372');

  static readonly IM = new Country('IM', 'IMN', '833');

  static readonly IL = new Country('IL', 'ISR', '376');

  static readonly IT = new Country('IT', 'ITA', '380');

  static readonly JM = new Country('JM', 'JAM', '388');

  static readonly JP = new Country('JP', 'JPN', '392');

  static readonly JE = new Country('JE', 'JEY', '832');

  static readonly JO = new Country('JO', 'JOR', '400');

  static readonly KZ = new Country('KZ', 'KAZ', '398');

  static readonly KE = new Country('KE', 'KEN', '404');

  static readonly KI = new Country('KI', 'KIR', '296');

  static readonly KP = new Country('KP', 'PRK', '408');

  static readonly KR = new Country('KR', 'KOR', '410');

  static readonly KW = new Country('KW', 'KWT', '414');

  static readonly KG = new Country('KG', 'KGZ', '417');

  static readonly LA = new Country('LA', 'LAO', '418');

  static readonly LV = new Country('LV', 'LVA', '428');

  static readonly LB = new Country('LB', 'LBN', '422');

  static readonly LS = new Country('LS', 'LSO', '426');

  static readonly LR = new Country('LR', 'LBR', '430');

  static readonly LY = new Country('LY', 'LBY', '434');

  static readonly LI = new Country('LI', 'LIE', '438');

  static readonly LT = new Country('LT', 'LTU', '440');

  static readonly LU = new Country('LU', 'LUX', '442');

  static readonly MO = new Country('MO', 'MAC', '446');

  static readonly MK = new Country('MK', 'MKD', '807');

  static readonly MG = new Country('MG', 'MDG', '450');

  static readonly MW = new Country('MW', 'MWI', '454');

  static readonly MY = new Country('MY', 'MYS', '458');

  static readonly MV = new Country('MV', 'MDV', '462');

  static readonly ML = new Country('ML', 'MLI', '466');

  static readonly MT = new Country('MT', 'MLT', '470');

  static readonly MH = new Country('MH', 'MHL', '584');

  static readonly MQ = new Country('MQ', 'MTQ', '474');

  static readonly MR = new Country('MR', 'MRT', '478');

  static readonly MU = new Country('MU', 'MUS', '480');

  static readonly YT = new Country('YT', 'MYT', '175');

  static readonly MX = new Country('MX', 'MEX', '484');

  static readonly FM = new Country('FM', 'FSM', '583');

  static readonly MD = new Country('MD', 'MDA', '498');

  static readonly MC = new Country('MC', 'MCO', '492');

  static readonly MN = new Country('MN', 'MNG', '496');

  static readonly ME = new Country('ME', 'MNE', '499');

  static readonly MS = new Country('MS', 'MSR', '500');

  static readonly MA = new Country('MA', 'MAR', '504');

  static readonly MZ = new Country('MZ', 'MOZ', '508');

  static readonly MM = new Country('MM', 'MMR', '104');

  static readonly NA = new Country('NA', 'NAM', '516');

  static readonly NR = new Country('NR', 'NRU', '520');

  static readonly NP = new Country('NP', 'NPL', '524');

  static readonly NL = new Country('NL', 'NLD', '528');

  static readonly NC = new Country('NC', 'NCL', '540');

  static readonly NZ = new Country('NZ', 'NZL', '554');

  static readonly NI = new Country('NI', 'NIC', '558');

  static readonly NE = new Country('NE', 'NER', '562');

  static readonly NG = new Country('NG', 'NGA', '566');

  static readonly NU = new Country('NU', 'NIU', '570');

  static readonly NF = new Country('NF', 'NFK', '574');

  static readonly MP = new Country('MP', 'MNP', '580');

  static readonly NO = new Country('NO', 'NOR', '578');

  static readonly OM = new Country('OM', 'OMN', '512');

  static readonly PK = new Country('PK', 'PAK', '586');

  static readonly PW = new Country('PW', 'PLW', '585');

  static readonly PS = new Country('PS', 'PSE', '275');

  static readonly PA = new Country('PA', 'PAN', '591');

  static readonly PG = new Country('PG', 'PNG', '598');

  static readonly PY = new Country('PY', 'PRY', '600');

  static readonly PE = new Country('PE', 'PER', '604');

  static readonly PH = new Country('PH', 'PHL', '608');

  static readonly PN = new Country('PN', 'PCN', '612');

  static readonly PL = new Country('PL', 'POL', '616');

  static readonly PT = new Country('PT', 'PRT', '620');

  static readonly PR = new Country('PR', 'PRI', '630');

  static readonly QA = new Country('QA', 'QAT', '634');

  static readonly RE = new Country('RE', 'REU', '638');

  static readonly RO = new Country('RO', 'ROU', '642');

  static readonly RU = new Country('RU', 'RUS', '643');

  static readonly RW = new Country('RW', 'RWA', '646');

  static readonly BL = new Country('BL', 'BLM', '652');

  static readonly KN = new Country('KN', 'KNA', '659');

  static readonly LC = new Country('LC', 'LCA', '662');

  static readonly MF = new Country('MF', 'MAF', '663');

  static readonly PM = new Country('PM', 'SPM', '666');

  static readonly VC = new Country('VC', 'VCT', '670');

  static readonly SH = new Country('SH', 'SHN', '654');

  static readonly WS = new Country('WS', 'WSM', '882');

  static readonly SM = new Country('SM', 'SMR', '674');

  static readonly ST = new Country('ST', 'STP', '678');

  static readonly SA = new Country('SA', 'SAU', '682');

  static readonly SN = new Country('SN', 'SEN', '686');

  static readonly RS = new Country('RS', 'SRB', '688');

  static readonly SC = new Country('SC', 'SYC', '690');

  static readonly SL = new Country('SL', 'SLE', '694');

  static readonly SG = new Country('SG', 'SGP', '702');

  static readonly SX = new Country('SX', 'SXM', '534');

  static readonly SK = new Country('SK', 'SVK', '703');

  static readonly SI = new Country('SI', 'SVN', '705');

  static readonly SB = new Country('SB', 'SLB', '090');

  static readonly SO = new Country('SO', 'SOM', '706');

  static readonly ZA = new Country('ZA', 'ZAF', '710');

  static readonly GS = new Country('GS', 'SGS', '239');

  static readonly SS = new Country('SS', 'SSD', '728');

  static readonly ES = new Country('ES', 'ESP', '724');

  static readonly LK = new Country('LK', 'LKA', '144');

  static readonly SD = new Country('SD', 'SDN', '729');

  static readonly SR = new Country('SR', 'SUR', '740');

  static readonly SJ = new Country('SJ', 'SJM', '744');

  static readonly SE = new Country('SE', 'SWE', '752');

  static readonly CH = new Country('CH', 'CHE', '756');

  static readonly SY = new Country('SY', 'SYR', '760');

  static readonly TW = new Country('TW', 'TWN', '158');

  static readonly TJ = new Country('TJ', 'TJK', '762');

  static readonly TZ = new Country('TZ', 'TZA', '834');

  static readonly TH = new Country('TH', 'THA', '764');

  static readonly TL = new Country('TL', 'TLS', '626');

  static readonly TG = new Country('TG', 'TGO', '768');

  static readonly TK = new Country('TK', 'TKL', '772');

  static readonly TO = new Country('TO', 'TON', '776');

  static readonly TT = new Country('TT', 'TTO', '780');

  static readonly TN = new Country('TN', 'TUN', '788');

  static readonly TR = new Country('TR', 'TUR', '792');

  static readonly TM = new Country('TM', 'TKM', '795');

  static readonly TC = new Country('TC', 'TCA', '796');

  static readonly TV = new Country('TV', 'TUV', '798');

  static readonly UG = new Country('UG', 'UGA', '800');

  static readonly UA = new Country('UA', 'UKR', '804');

  static readonly AE = new Country('AE', 'ARE', '784');

  static readonly GB = new Country('GB', 'GBR', '826');

  static readonly UM = new Country('UM', 'UMI', '581');

  static readonly US = new Country('US', 'USA', '840');

  static readonly UY = new Country('UY', 'URY', '858');

  static readonly UZ = new Country('UZ', 'UZB', '860');

  static readonly VU = new Country('VU', 'VUT', '548');

  static readonly VE = new Country('VE', 'VEN', '862');

  static readonly VN = new Country('VN', 'VNM', '704');

  static readonly VG = new Country('VG', 'VGB', '092');

  static readonly VI = new Country('VI', 'VIR', '850');

  static readonly WF = new Country('WF', 'WLF', '876');

  static readonly EH = new Country('EH', 'ESH', '732');

  static readonly YE = new Country('YE', 'YEM', '887');

  static readonly ZM = new Country('ZM', 'ZMB', '894');

  static readonly ZW = new Country('ZW', 'ZWE', '716');

  private constructor(
    public readonly alpha2: string,
    public readonly alpha3: string,
    public readonly code: string,
  ) {
    Country.ALL_VALUE.set(alpha2, this);
  }

  toString() {
    return this.alpha2;
  }

  public static entryOf(code: string): Country | undefined {
    if (code) {
      return this.ALL_VALUE.get(code.toUpperCase());
    }
    return undefined;
  }

  public static exists(lang: string): boolean {
    if (lang) {
      this.ALL_VALUE.has(lang.toUpperCase());
    }
    return false;
  }
}
