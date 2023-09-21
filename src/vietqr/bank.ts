export default class VNBank {
  // eslint-disable-next-line no-use-before-define
  static ALL_VALUE: Map<string[], VNBank> = new Map();

  static readonly VietinBank = new VNBank(
    'Ngân hàng TMCP Công thương Việt Nam',
    'ICB',
    'VietinBank',
    '970415',
  );

  static readonly Vietcombank = new VNBank(
    'Ngân hàng TMCP Ngoại Thương Việt Nam',
    'VCB',
    'Vietcombank',
    '970436',
  );

  static readonly BIDV = new VNBank(
    'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
    'BIDV',
    'BIDV',
    '970418',
  );

  static readonly Agribank = new VNBank(
    'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam',
    'VBA',
    'Agribank',
    '970405',
  );

  static readonly OCB = new VNBank('Ngân hàng TMCP Phương Đông', 'OCB', 'OCB', '970448');

  static readonly MBBank = new VNBank('Ngân hàng TMCP Quân đội', 'MB', 'MBBank', '970422');

  static readonly Techcombank = new VNBank(
    'Ngân hàng TMCP Kỹ thương Việt Nam',
    'TCB',
    'Techcombank',
    '970407',
  );

  static readonly ACB = new VNBank('Ngân hàng TMCP Á Châu', 'ACB', 'ACB', '970416');

  static readonly VPBank = new VNBank(
    'Ngân hàng TMCP Việt Nam Thịnh Vượng',
    'VPB',
    'VPBank',
    '970432',
  );

  static readonly TPBank = new VNBank('Ngân hàng TMCP Tiên Phong', 'TPB', 'TPBank', '970423');

  static readonly Sacombank = new VNBank(
    'Ngân hàng TMCP Sài Gòn Thương Tín',
    'STB',
    'Sacombank',
    '970403',
  );

  static readonly HDBank = new VNBank(
    'Ngân hàng TMCP Phát triển Thành phố Hồ Chí Minh',
    'HDB',
    'HDBank',
    '970437',
  );

  static readonly VietCapitalBank = new VNBank(
    'Ngân hàng TMCP Bản Việt',
    'VCCB',
    'VietCapitalBank',
    '970454',
  );

  static readonly SCB = new VNBank('Ngân hàng TMCP Sài Gòn', 'SCB', 'SCB', '970429');

  static readonly VIB = new VNBank('Ngân hàng TMCP Quốc tế Việt Nam', 'VIB', 'VIB', '970441');

  static readonly SHB = new VNBank('Ngân hàng TMCP Sài Gòn - Hà Nội', 'SHB', 'SHB', '970443');

  static readonly Eximbank = new VNBank(
    'Ngân hàng TMCP Xuất Nhập khẩu Việt Nam',
    'EIB',
    'Eximbank',
    '970431',
  );

  static readonly MSB = new VNBank('Ngân hàng TMCP Hàng Hải', 'MSB', 'MSB', '970426');

  static readonly CAKE = new VNBank(
    'TMCP Việt Nam Thịnh Vượng - Ngân hàng số CAKE by VPBank',
    'CAKE',
    'CAKE',
    '546034',
  );

  static readonly Ubank = new VNBank(
    'TMCP Việt Nam Thịnh Vượng - Ngân hàng số Ubank by VPBank',
    'Ubank',
    'Ubank',
    '546035',
  );

  static readonly Timo = new VNBank(
    'Ngân hàng số Timo by Ban Viet Bank (Timo by Ban Viet Bank)',
    'TIMO',
    'Timo',
    '963388',
  );

  static readonly ViettelMoney = new VNBank(
    'Tổng Công ty Dịch vụ số Viettel - Chi nhánh tập đoàn công nghiệp viễn thông Quân Đội',
    'VTLMONEY',
    'ViettelMoney',
    '971005',
  );

  static readonly VNPTMoney = new VNBank('VNPT Money', 'VNPTMONEY', 'VNPTMoney', '971011');

  static readonly SaigonBank = new VNBank(
    'Ngân hàng TMCP Sài Gòn Công Thương',
    'SGICB',
    'SaigonBank',
    '970400',
  );

  static readonly BacABank = new VNBank('Ngân hàng TMCP Bắc Á', 'BAB', 'BacABank', '970409');

  static readonly PVcomBank = new VNBank(
    'Ngân hàng TMCP Đại Chúng Việt Nam',
    'PVCB',
    'PVcomBank',
    '970412',
  );

  static readonly Oceanbank = new VNBank(
    'Ngân hàng Thương mại TNHH MTV Đại Dương',
    'Oceanbank',
    'Oceanbank',
    '970414',
  );

  static readonly NCB = new VNBank('Ngân hàng TMCP Quốc Dân', 'NCB', 'NCB', '970419');

  static readonly ShinhanBank = new VNBank(
    'Ngân hàng TNHH MTV Shinhan Việt Nam',
    'SHBVN',
    'ShinhanBank',
    '970424',
  );

  static readonly ABBANK = new VNBank('Ngân hàng TMCP An Bình', 'ABB', 'ABBANK', '970425');

  static readonly VietABank = new VNBank('Ngân hàng TMCP Việt Á', 'VAB', 'VietABank', '970427');

  static readonly NamABank = new VNBank('Ngân hàng TMCP Nam Á', 'NAB', 'NamABank', '970428');

  static readonly PGBank = new VNBank(
    'Ngân hàng TMCP Xăng dầu Petrolimex',
    'PGB',
    'PGBank',
    '970430',
  );

  static readonly VietBank = new VNBank(
    'Ngân hàng TMCP Việt Nam Thương Tín',
    'VIETBANK',
    'VietBank',
    '970433',
  );

  static readonly BaoVietBank = new VNBank(
    'Ngân hàng TMCP Bảo Việt',
    'BVB',
    'BaoVietBank',
    '970438',
  );

  static readonly SeABank = new VNBank('Ngân hàng TMCP Đông Nam Á', 'SEAB', 'SeABank', '970440');

  static readonly COOPBANK = new VNBank(
    'Ngân hàng Hợp tác xã Việt Nam',
    'COOPBANK',
    'COOPBANK',
    '970446',
  );

  static readonly LienVietPostBank = new VNBank(
    'Ngân hàng TMCP Bưu Điện Liên Việt',
    'LPB',
    'LienVietPostBank',
    '970449',
  );

  static readonly KienLongBank = new VNBank(
    'Ngân hàng TMCP Kiên Long',
    'KLB',
    'KienLongBank',
    '970452',
  );

  static readonly KBank = new VNBank(
    'Ngân hàng Đại chúng TNHH Kasikornbank',
    'KBank',
    'KBank',
    '668888',
  );

  static readonly UnitedOverseas = new VNBank(
    'Ngân hàng United Overseas - Chi nhánh TP. Hồ Chí Minh',
    'UOB',
    'UnitedOverseas',
    '970458',
  );

  static readonly StandardChartered = new VNBank(
    'Ngân hàng TNHH MTV Standard Chartered Bank Việt Nam',
    'SCVN',
    'StandardChartered',
    '970410',
  );

  static readonly PublicBank = new VNBank(
    'Ngân hàng TNHH MTV Public Việt Nam',
    'PBVN',
    'PublicBank',
    '970439',
  );

  static readonly Nonghyup = new VNBank(
    'Ngân hàng Nonghyup - Chi nhánh Hà Nội',
    'NHB HN',
    'Nonghyup',
    '801011',
  );

  static readonly IndovinaBank = new VNBank(
    'Ngân hàng TNHH Indovina',
    'IVB',
    'IndovinaBank',
    '970434',
  );

  static readonly IBKHCM = new VNBank(
    'Ngân hàng Công nghiệp Hàn Quốc - Chi nhánh TP. Hồ Chí Minh',
    'IBK - HCM',
    'IBKHCM',
    '970456',
  );

  static readonly IBKHN = new VNBank(
    'Ngân hàng Công nghiệp Hàn Quốc - Chi nhánh Hà Nội',
    'IBK - HN',
    'IBKHN',
    '970455',
  );

  static readonly VRB = new VNBank('Ngân hàng Liên doanh Việt - Nga', 'VRB', 'VRB', '970421');

  static readonly Woori = new VNBank('Ngân hàng TNHH MTV Woori Việt Nam', 'WVN', 'Woori', '970457');

  static readonly KookminHN = new VNBank(
    'Ngân hàng Kookmin - Chi nhánh Hà Nội',
    'KBHN',
    'KookminHN',
    '970462',
  );

  static readonly KookminHCM = new VNBank(
    'Ngân hàng Kookmin - Chi nhánh Thành phố Hồ Chí Minh',
    'KBHCM',
    'KookminHCM',
    '970463',
  );

  static readonly HSBC = new VNBank('Ngân hàng TNHH MTV HSBC (Việt Nam)', 'HSBC', 'HSBC', '458761');

  static readonly HongLeong = new VNBank(
    'Ngân hàng TNHH MTV Hong Leong Việt Nam',
    'HLBVN',
    'HongLeong',
    '970442',
  );

  static readonly GPBank = new VNBank(
    'Ngân hàng Thương mại TNHH MTV Dầu Khí Toàn Cầu',
    'GPB',
    'GPBank',
    '970408',
  );

  static readonly DongABank = new VNBank('Ngân hàng TMCP Đông Á', 'DOB', 'DongABank', '970406');

  static readonly DBSBank = new VNBank(
    'DBS Bank Ltd - Chi nhánh Thành phố Hồ Chí Minh',
    'DBS',
    'DBSBank',
    '796500',
  );

  static readonly CIMB = new VNBank('Ngân hàng TNHH MTV CIMB Việt Nam', 'CIMB', 'CIMB', '422589');

  static readonly CBBank = new VNBank(
    'Ngân hàng Thương mại TNHH MTV Xây dựng Việt Nam',
    'CBB',
    'CBBank',
    '970444',
  );

  static readonly Citibank = new VNBank(
    'Ngân hàng Citibank, N.A. - Chi nhánh Hà Nội',
    'CITIBANK',
    'Citibank',
    '533948',
  );

  static readonly KEBHanaHCM = new VNBank(
    'Ngân hàng KEB Hana – Chi nhánh Thành phố Hồ Chí Minh',
    'KEBHANAHCM',
    'KEBHanaHCM',
    '970466',
  );

  static readonly KEBHANAHN = new VNBank(
    'Ngân hàng KEB Hana – Chi nhánh Hà Nội',
    'KEBHANAHN',
    'KEBHANAHN',
    '970467',
  );

  static readonly MAFC = new VNBank(
    'Công ty Tài chính TNHH MTV Mirae Asset (Việt Nam) ',
    'MAFC',
    'MAFC',
    '977777',
  );

  static readonly VBSP = new VNBank('Ngân hàng Chính sách Xã hội', 'VBSP', 'VBSP', '999888');

  private constructor(
    public readonly name: string,
    public readonly code: string,
    public readonly shortName: string,
    public readonly bin: string,
  ) {
    VNBank.ALL_VALUE.set([name, code, shortName, bin], this);
  }

  toString() {
    return this.name;
  }

  public static entryOf(str: string): VNBank | undefined {
    for (const entry of this.ALL_VALUE) {
      if (entry[0].includes(str)) {
        return entry[1];
      }
    }
    return undefined;
  }

  public static exists(str: string): boolean {
    return !!this.entryOf(str);
  }
}
