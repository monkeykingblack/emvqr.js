import { assert } from 'chai';
import {
  DecoderMpm,
  MerchantInformationLanguage,
  MerchantInformationLanguageTemplate,
  TagLengthString,
} from '../../.build';

describe('MerchantInformationLanguageTemplateDecoderTest', () => {
  it('#testSuccessDecode', () => {
    const merchantInformationLanguage = DecoderMpm.decode(
      '64280002ZH0104最佳运输0202北京0304abcd',
      MerchantInformationLanguageTemplate,
    );

    assert.isOk(merchantInformationLanguage.value);

    assert.equal(merchantInformationLanguage.tag, '64');
    assert.equal(merchantInformationLanguage.length, 28);

    assert.isOk(merchantInformationLanguage.value?.languagePreference);
    assert.isOk(merchantInformationLanguage.value?.merchantName);
    assert.isOk(merchantInformationLanguage.value?.merchantCity);
    assert.equal(merchantInformationLanguage.value?.rFUforEMVCo?.size, 1);

    assert.equal(merchantInformationLanguage.value?.languagePreference?.tag, '00');
    assert.equal(merchantInformationLanguage.value?.languagePreference?.length, 2);
    assert.equal(merchantInformationLanguage.value?.languagePreference?.value, 'ZH');

    assert.equal(merchantInformationLanguage.value?.merchantName?.tag, '01');
    assert.equal(merchantInformationLanguage.value?.merchantName?.length, 4);
    assert.equal(merchantInformationLanguage.value?.merchantName?.value, '最佳运输');

    assert.equal(merchantInformationLanguage.value?.merchantCity?.tag, '02');
    assert.equal(merchantInformationLanguage.value?.merchantCity?.length, 2);
    assert.equal(merchantInformationLanguage.value?.merchantCity?.value, '北京');

    assert.equal(merchantInformationLanguage.value?.rFUforEMVCo?.get('03')?.tag, '03');
    assert.equal(merchantInformationLanguage.value?.rFUforEMVCo?.get('03')?.length, 4);
    assert.equal(merchantInformationLanguage.value?.rFUforEMVCo?.get('03')?.value, 'abcd');
  });

  it('#testSuccessDecodeEncode', () => {
    const merchantInformationLanguage: MerchantInformationLanguageTemplate = DecoderMpm.decode(
      '64280002ZH0104最佳运输0202北京0304abcd',
      MerchantInformationLanguageTemplate,
    );

    assert.equal(merchantInformationLanguage.toString(), '64280002ZH0104最佳运输0202北京0304abcd');
  });

  it('#testSuccessEncode', () => {
    const rFUforEMVCo = new TagLengthString();
    rFUforEMVCo.setTag('03');
    rFUforEMVCo.setValue('abcd');

    const value = new MerchantInformationLanguage();
    value.setLanguagePreference('ZH');
    value.setMerchantCity('最佳运输');
    value.setMerchantName('北京');
    value.addRFUforEMVCo(rFUforEMVCo);

    const merchantInformationLanguage = new MerchantInformationLanguageTemplate();
    merchantInformationLanguage.setValue(value);

    assert.equal(merchantInformationLanguage.toString(), '64280002ZH0102北京0204最佳运输0304abcd');
  });
});
