import { assert } from 'chai';
import {
  MerchantAccountInformationReservedAdditional,
  MerchantAccountInformationTemplate,
  TagLengthString,
} from '../../.build';

describe('MerchantAccountInformationTemplateTest', () => {
  it('#testSuccessToString', () => {
    const tagLengthString = new TagLengthString();
    tagLengthString.setTag('01');
    tagLengthString.setValue('abcd');

    const value = new MerchantAccountInformationReservedAdditional();
    value.setGloballyUniqueIdentifier('hoge');
    value.addPaymentNetworkSpecific(tagLengthString);

    const merchantAccountInformation = new MerchantAccountInformationTemplate();
    merchantAccountInformation.setValue(value);
    merchantAccountInformation.setTag('02');

    assert.equal(merchantAccountInformation.toString(), '02160004hoge0104abcd');
  });

  it('#testSuccessToStringConstructorTag', () => {
    const tagLengthString = new TagLengthString();
    tagLengthString.setTag('01');
    tagLengthString.setValue('abcd');

    const value = new MerchantAccountInformationReservedAdditional();
    value.setGloballyUniqueIdentifier('hoge');
    value.addPaymentNetworkSpecific(tagLengthString);

    const merchantAccountInformation = new MerchantAccountInformationTemplate('02', value);

    assert.equal(merchantAccountInformation.toString(), '02160004hoge0104abcd');
  });

  it('#testSuccessToStringWhenValueIsUndefined', () => {
    assert.equal(new MerchantAccountInformationTemplate().toString(), '');
    assert.equal(new MerchantAccountInformationTemplate().toString(), '');
    assert.equal(new MerchantAccountInformationTemplate(undefined, undefined).toString(), '');
  });
});
