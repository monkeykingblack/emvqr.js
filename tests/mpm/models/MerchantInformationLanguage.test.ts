import { assert } from 'chai';
import { MerchantInformationLanguage, TagLengthString } from '../../.build';

describe('MerchantInformationLanguageTest', () => {
  it('#testSuccessToString', () => {
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

  it('#testSuccessToStringWhenValueIsUndefined', () => {
    assert.equal(new MerchantInformationLanguage().toString(), '');
  });
});
