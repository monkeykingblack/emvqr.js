import { assert } from 'chai';
import { MerchantAccountInformationReservedAdditional, TagLengthString } from '../../.build';

describe('MerchantAccountInformationReservedAdditionalTest', () => {
  it('#testSuccessToString', () => {
    const tagLengthString = new TagLengthString();
    tagLengthString.setTag('01');
    tagLengthString.setValue('abcd');

    const merchantAccountInformation = new MerchantAccountInformationReservedAdditional();
    merchantAccountInformation.setGloballyUniqueIdentifier('hoge');
    merchantAccountInformation.addPaymentNetworkSpecific(tagLengthString);

    assert.equal(merchantAccountInformation.toString(), '0004hoge0104abcd');
  });

  it('#testSuccessToStringConstructorGloballyUniqueIdentifier', () => {
    const merchantAccountInformation = new MerchantAccountInformationReservedAdditional('hoge');
    assert.equal(merchantAccountInformation.toString(), '0004hoge');
  });

  it('#testSuccessToStringConstructorGloballyUniqueIdentifierAndPaymentNetworkSpecific', () => {
    const merchantAccountInformation = new MerchantAccountInformationReservedAdditional(
      'hoge',
      new TagLengthString('01', 'abcd'),
    );
    assert.equal(merchantAccountInformation.toString(), '0004hoge0104abcd');
  });

  it('#testSuccessToStringConstructorGloballyUniqueIdentifierIsUndefined', () => {
    assert.equal(new MerchantAccountInformationReservedAdditional().toString(), '');
    assert.equal(new MerchantAccountInformationReservedAdditional().toString(), '');
    assert.equal(
      new MerchantAccountInformationReservedAdditional(undefined, undefined).toString(),
      '',
    );
  });
});
