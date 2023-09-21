import { assert, expect } from 'chai';
import {
  DecoderMpm,
  DuplicateTagException,
  InvalidTagException,
  MerchantInformationLanguage,
  TagLengthString,
} from '../../.build';

describe('MerchantInformationLanguageDecoderTest', () => {
  it('#testSuccessDecode', () => {
    const merchantInformationLanguage = DecoderMpm.decode(
      '64280002ZH0104最佳运输0202北京0304abcd',
      MerchantInformationLanguage,
    );

    assert.isOk(merchantInformationLanguage.languagePreference);
    assert.isOk(merchantInformationLanguage.merchantName);
    assert.isOk(merchantInformationLanguage.merchantCity);
    assert.equal(merchantInformationLanguage.rFUforEMVCo.size, 1);

    assert.equal(merchantInformationLanguage.languagePreference?.tag, '00');
    assert.equal(merchantInformationLanguage.languagePreference?.length, 2);
    assert.equal(merchantInformationLanguage.languagePreference?.value, 'ZH');

    assert.equal(merchantInformationLanguage.merchantName?.tag, '01');
    assert.equal(merchantInformationLanguage.merchantName?.length, 4);
    assert.equal(merchantInformationLanguage.merchantName?.value, '最佳运输');

    assert.equal(merchantInformationLanguage.merchantCity?.tag, '02');
    assert.equal(merchantInformationLanguage.merchantCity?.length, 2);
    assert.equal(merchantInformationLanguage.merchantCity?.value, '北京');

    assert.equal(merchantInformationLanguage.rFUforEMVCo?.get('03')?.tag, '03');
    assert.equal(merchantInformationLanguage.rFUforEMVCo?.get('03')?.length, 4);
    assert.equal(merchantInformationLanguage.rFUforEMVCo?.get('03')?.value, 'abcd');
  });

  it('#testFailDecode', () => {
    expect(() =>
      DecoderMpm.decode(
        '64340002ZH0002ZH0104最佳运输0202北京0304abcd',
        MerchantInformationLanguage,
      ),
    )
      .to.throw(DuplicateTagException)
      .that.satisfies(
        (error: DuplicateTagException) => error.value === '0002ZH' && error.tag === '00',
      );

    expect(() =>
      DecoderMpm.decode('6428AA02ZH0104最佳运输0202北京0304abcd', MerchantInformationLanguage),
    )
      .to.throw(InvalidTagException)
      .that.satisfies(
        (error: InvalidTagException) => error.value === 'AA02ZH' && error.tag === 'AA',
      );
  });

  it('#testSuccessDecodeEncode', () => {
    const merchantInformationLanguage: MerchantInformationLanguage = DecoderMpm.decode(
      '64280002ZH0104最佳运输0202北京0304abcd',
      MerchantInformationLanguage,
    );

    assert.equal(merchantInformationLanguage.toString(), '0002ZH0104最佳运输0202北京0304abcd');
  });

  it('#testSuccessEncode', () => {
    const rFUforEMVCo = new TagLengthString();
    rFUforEMVCo.setTag('03');
    rFUforEMVCo.setValue('abcd');

    const merchantInformationLanguage = new MerchantInformationLanguage();
    merchantInformationLanguage.setLanguagePreference('ZH');
    merchantInformationLanguage.setMerchantCity('最佳运输');
    merchantInformationLanguage.setMerchantName('北京');
    merchantInformationLanguage.addRFUforEMVCo(rFUforEMVCo);

    assert.equal(merchantInformationLanguage.toString(), '0002ZH0102北京0204最佳运输0304abcd');
  });
});
