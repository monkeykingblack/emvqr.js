export default class Currency {

  // eslint-disable-next-line no-use-before-define
  private static ALL_VALUE: Map<string, Currency> = new Map();

  static readonly AED = new Currency('AED', '784');

  static readonly AFN = new Currency('AFN', '971');

  static readonly ALL = new Currency('ALL', '008');

  static readonly AMD = new Currency('AMD', '051');

  static readonly ANG = new Currency('ANG', '532');

  static readonly AOA = new Currency('AOA', '973');

  static readonly ARS = new Currency('ARS', '032');

  static readonly AUD = new Currency('AUD', '036');

  static readonly AWG = new Currency('AWG', '533');

  static readonly AZN = new Currency('AZN', '944');

  static readonly BAM = new Currency('BAM', '977');

  static readonly BBD = new Currency('BBD', '052');


  static readonly BDT = new Currency('BDT', '050');

  static readonly BGN = new Currency('BGN', '975');

  static readonly BHD = new Currency('BHD', '048');

  static readonly BIF = new Currency('BIF', '108');

  static readonly BMD = new Currency('BMD', '060');

  static readonly BND = new Currency('BND', '096');

  static readonly BOB = new Currency('BOB', '068');

  static readonly BOV = new Currency('BOV', '984');

  static readonly BRL = new Currency('BRL', '986');

  static readonly BSD = new Currency('BSD', '044');

  static readonly BTN = new Currency('BTN', '064');

  static readonly BWP = new Currency('BWP', '072');


  static readonly BYN = new Currency('BYN', '933');

  static readonly BZD = new Currency('BZD', '084');

  static readonly CAD = new Currency('CAD', '124');

  static readonly CDF = new Currency('CDF', '976');

  static readonly CHE = new Currency('CHE', '947');

  static readonly CHF = new Currency('CHF', '756');

  static readonly CHW = new Currency('CHW', '948');

  static readonly CLF = new Currency('CLF', '990');

  static readonly CLP = new Currency('CLP', '152');

  static readonly CNY = new Currency('CNY', '156');

  static readonly COP = new Currency('COP', '170');

  static readonly COU = new Currency('COU', '970');


  static readonly CRC = new Currency('CRC', '188');

  static readonly CUC = new Currency('CUC', '931');

  static readonly CUP = new Currency('CUP', '192');

  static readonly CVE = new Currency('CVE', '132');

  static readonly CZK = new Currency('CZK', '203');

  static readonly DJF = new Currency('DJF', '262');

  static readonly DKK = new Currency('DKK', '208');

  static readonly DOP = new Currency('DOP', '214');

  static readonly DZD = new Currency('DZD', '012');

  static readonly EGP = new Currency('EGP', '818');

  static readonly ERN = new Currency('ERN', '232');

  static readonly ETB = new Currency('ETB', '230');


  static readonly EUR = new Currency('EUR', '978');

  static readonly FJD = new Currency('FJD', '242');

  static readonly FKP = new Currency('FKP', '238');

  static readonly GBP = new Currency('GBP', '826');

  static readonly GEL = new Currency('GEL', '981');

  static readonly GHS = new Currency('GHS', '936');

  static readonly GIP = new Currency('GIP', '292');

  static readonly GMD = new Currency('GMD', '270');

  static readonly GNF = new Currency('GNF', '324');

  static readonly GTQ = new Currency('GTQ', '320');

  static readonly GYD = new Currency('GYD', '328');

  static readonly HKD = new Currency('HKD', '344');


  static readonly HNL = new Currency('HNL', '340');

  static readonly HRK = new Currency('HRK', '191');

  static readonly HTG = new Currency('HTG', '332');

  static readonly HUF = new Currency('HUF', '348');

  static readonly IDR = new Currency('IDR', '360');

  static readonly ILS = new Currency('ILS', '376');

  static readonly INR = new Currency('INR', '356');

  static readonly IQD = new Currency('IQD', '368');

  static readonly IRR = new Currency('IRR', '364');

  static readonly ISK = new Currency('ISK', '352');

  static readonly JMD = new Currency('JMD', '388');

  static readonly JOD = new Currency('JOD', '400');


  static readonly JPY = new Currency('JPY', '392');

  static readonly KES = new Currency('KES', '404');

  static readonly KGS = new Currency('KGS', '417');

  static readonly KHR = new Currency('KHR', '116');

  static readonly KMF = new Currency('KMF', '174');

  static readonly KPW = new Currency('KPW', '408');

  static readonly KRW = new Currency('KRW', '410');

  static readonly KWD = new Currency('KWD', '414');

  static readonly KYD = new Currency('KYD', '136');

  static readonly KZT = new Currency('KZT', '398');

  static readonly LAK = new Currency('LAK', '418');

  static readonly LBP = new Currency('LBP', '422');


  static readonly LKR = new Currency('LKR', '144');

  static readonly LRD = new Currency('LRD', '430');

  static readonly LSL = new Currency('LSL', '426');

  static readonly LYD = new Currency('LYD', '434');

  static readonly MAD = new Currency('MAD', '504');

  static readonly MDL = new Currency('MDL', '498');

  static readonly MGA = new Currency('MGA', '969');

  static readonly MKD = new Currency('MKD', '807');

  static readonly MMK = new Currency('MMK', '104');

  static readonly MNT = new Currency('MNT', '496');

  static readonly MOP = new Currency('MOP', '446');

  static readonly MRU = new Currency('MRU', '929');


  static readonly MUR = new Currency('MUR', '480');

  static readonly MVR = new Currency('MVR', '462');

  static readonly MWK = new Currency('MWK', '454');

  static readonly MXN = new Currency('MXN', '484');

  static readonly MXV = new Currency('MXV', '979');

  static readonly MYR = new Currency('MYR', '458');

  static readonly MZN = new Currency('MZN', '943');

  static readonly NAD = new Currency('NAD', '516');

  static readonly NGN = new Currency('NGN', '566');

  static readonly NIO = new Currency('NIO', '558');

  static readonly NOK = new Currency('NOK', '578');

  static readonly NPR = new Currency('NPR', '524');


  static readonly NZD = new Currency('NZD', '554');

  static readonly OMR = new Currency('OMR', '512');

  static readonly PAB = new Currency('PAB', '590');

  static readonly PEN = new Currency('PEN', '604');

  static readonly PGK = new Currency('PGK', '598');

  static readonly PHP = new Currency('PHP', '608');

  static readonly PKR = new Currency('PKR', '586');

  static readonly PLN = new Currency('PLN', '985');

  static readonly PYG = new Currency('PYG', '600');

  static readonly QAR = new Currency('QAR', '634');

  static readonly RON = new Currency('RON', '946');

  static readonly RSD = new Currency('RSD', '941');


  static readonly RUB = new Currency('RUB', '643');

  static readonly RWF = new Currency('RWF', '646');

  static readonly SAR = new Currency('SAR', '682');

  static readonly SBD = new Currency('SBD', '090');

  static readonly SCR = new Currency('SCR', '690');

  static readonly SDG = new Currency('SDG', '938');

  static readonly SEK = new Currency('SEK', '752');

  static readonly SGD = new Currency('SGD', '702');

  static readonly SHP = new Currency('SHP', '654');

  static readonly SLL = new Currency('SLL', '694');

  static readonly SOS = new Currency('SOS', '706');

  static readonly SRD = new Currency('SRD', '968');


  static readonly SSP = new Currency('SSP', '728');

  static readonly STN = new Currency('STN', '930');

  static readonly SVC = new Currency('SVC', '222');

  static readonly SYP = new Currency('SYP', '760');

  static readonly SZL = new Currency('SZL', '748');

  static readonly THB = new Currency('THB', '764');

  static readonly TJS = new Currency('TJS', '972');

  static readonly TMT = new Currency('TMT', '934');

  static readonly TND = new Currency('TND', '788');

  static readonly TOP = new Currency('TOP', '776');

  static readonly TRY = new Currency('TRY', '949');

  static readonly TTD = new Currency('TTD', '780');


  static readonly TWD = new Currency('TWD', '901');

  static readonly TZS = new Currency('TZS', '834');

  static readonly UAH = new Currency('UAH', '980');

  static readonly UGX = new Currency('UGX', '800');

  static readonly USD = new Currency('USD', '840');

  static readonly USN = new Currency('USN', '997');

  static readonly UYI = new Currency('UYI', '940');

  static readonly UYU = new Currency('UYU', '858');

  static readonly UYW = new Currency('UYW', '927');

  static readonly UZS = new Currency('UZS', '860');

  static readonly VES = new Currency('VES', '928');

  static readonly VND = new Currency('VND', '704');


  static readonly VUV = new Currency('VUV', '548');

  static readonly WST = new Currency('WST', '882');

  static readonly XAF = new Currency('XAF', '950');

  static readonly XAG = new Currency('XAG', '961');

  static readonly XAU = new Currency('XAU', '959');

  static readonly XBA = new Currency('XBA', '955');

  static readonly XBB = new Currency('XBB', '956');

  static readonly XBC = new Currency('XBC', '957');

  static readonly XBD = new Currency('XBD', '958');

  static readonly XCD = new Currency('XCD', '951');

  static readonly XDR = new Currency('XDR', '960');

  static readonly XOF = new Currency('XOF', '952');


  static readonly XPD = new Currency('XPD', '964');

  static readonly XPF = new Currency('XPF', '953');

  static readonly XPT = new Currency('XPT', '962');

  static readonly XSU = new Currency('XSU', '994');

  static readonly XTS = new Currency('XTS', '963');

  static readonly XUA = new Currency('XUA', '965');

  static readonly XXX = new Currency('XXX', '999');

  static readonly YER = new Currency('YER', '886');

  static readonly ZAR = new Currency('ZAR', '710');

  static readonly ZMW = new Currency('ZMW', '967');

  static readonly ZWL = new Currency('ZWL', '932');


  private constructor(
    public readonly code: string,
    public readonly number: string,
  ) {
    Currency.ALL_VALUE.set(code, this);
  }

  toString() {
    return this.code;
  }

  public static entryOf(code: string): Currency | undefined {
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
