import { assert } from 'chai';
import {
  DecoderMpm,
  MerchantAccountInformationReserved,
  MerchantAccountInformationReservedAdditional,
  MerchantAccountInformationTemplate,
  TagLengthString,
} from '../../.build';

describe('MerchantAccountInformationTemplateDecoderTest', () => {
  it('#testSuccessDecodeReserved', () => {
    const merchantAccountInformation = DecoderMpm.decode(
      '02040004',
      MerchantAccountInformationTemplate,
    );

    assert.isOk(merchantAccountInformation.value);

    assert.equal(merchantAccountInformation.tag, '02');
    assert.equal(merchantAccountInformation.length, 4);

    const value = merchantAccountInformation.getTypeValue(MerchantAccountInformationReserved);

    assert.isOk(value);
    assert.equal(value?.value, '0004');
  });

  it('#testSuccessDecodeReservedAdditional', () => {
    const merchantAccountInformation = DecoderMpm.decode(
      '26160004hoge0104abcd',
      MerchantAccountInformationTemplate,
    );

    assert.isOk(merchantAccountInformation.value);

    assert.equal(merchantAccountInformation.tag, '26');
    assert.equal(merchantAccountInformation.length, 16);

    const value = merchantAccountInformation.getTypeValue(
      MerchantAccountInformationReservedAdditional,
    );

    assert.isOk(value?.globallyUniqueIdentifier);
    assert.equal(value?.paymentNetworkSpecific?.size, 1);

    assert.equal(value?.globallyUniqueIdentifier?.tag, '00');
    assert.equal(value?.globallyUniqueIdentifier?.length, 4);
    assert.equal(value?.globallyUniqueIdentifier?.value, 'hoge');

    assert.equal(value?.paymentNetworkSpecific?.get('01')?.tag, '01');
    assert.equal(value?.paymentNetworkSpecific?.get('01')?.length, 4);
    assert.equal(value?.paymentNetworkSpecific?.get('01')?.value, 'abcd');
  });

  it('#testSuccessDecodeEncode', () => {
    const merchantAccountInformation1 = DecoderMpm.decode(
      '02160004hoge0104abcd',
      MerchantAccountInformationTemplate,
    );
    assert.equal(merchantAccountInformation1.toString(), '02160004hoge0104abcd');

    const merchantAccountInformation2 = DecoderMpm.decode(
      '26160004hoge0104abcd',
      MerchantAccountInformationTemplate,
    );
    assert.equal(merchantAccountInformation2.toString(), '26160004hoge0104abcd');
  });
  it('#testSuccessEncodeReserved', () => {
    const value = new MerchantAccountInformationReserved('00004');

    const merchantAccountInformation = new MerchantAccountInformationTemplate();
    merchantAccountInformation.setValue(value);
    merchantAccountInformation.setTag('02');

    assert.equal(merchantAccountInformation.toString(), '020500004');
  });
  it('#testSuccessEncodeReservedAdditional', () => {
    const paymentNetworkSpecific = new TagLengthString();
    paymentNetworkSpecific.setTag('01');
    paymentNetworkSpecific.setValue('abcd');

    const value = new MerchantAccountInformationReservedAdditional();
    value.setGloballyUniqueIdentifier('hoge');
    value.addPaymentNetworkSpecific(paymentNetworkSpecific);

    const merchantAccountInformation = new MerchantAccountInformationTemplate();
    merchantAccountInformation.setValue(value);
    merchantAccountInformation.setTag('26');

    assert.equal(merchantAccountInformation.toString(), '26160004hoge0104abcd');
  });
});
