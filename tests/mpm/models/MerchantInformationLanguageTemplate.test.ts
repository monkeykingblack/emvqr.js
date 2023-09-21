import { assert } from 'chai';
import {
  MerchantInformationLanguage,
  MerchantInformationLanguageTemplate,
  TagLengthString,
} from '../../.build';

describe('MerchantInformationLanguageTemplateTest', () => {
  it('#testSuccessToString', () => {
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

  it('#testSuccessToStringWhenValueIsEmpty', () => {
    const merchantInformationLanguage = new MerchantInformationLanguageTemplate();
    merchantInformationLanguage.setValue(new MerchantInformationLanguage());

    assert.equal(merchantInformationLanguage.toString(), '');
  });

  it('#testSuccessToStringWhenValueIsUndefined', () => {
    assert.equal(new MerchantInformationLanguageTemplate().toString(), '');
  });
});
