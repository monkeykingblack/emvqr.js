import { assert, expect } from 'chai';
import {
  DecoderMpm,
  DuplicateTagException,
  InvalidTagException,
  MerchantAccountInformationReservedAdditional,
  TagLengthString,
} from '../../.build';

describe('MerchantAccountInformationReservedAdditionalDecoderTest', () => {
  it('#testSuccessDecode', () => {
    const merchantAccountInformation = DecoderMpm.decode(
      '02160004hoge0104abcd',
      MerchantAccountInformationReservedAdditional,
    );

    assert.isOk(merchantAccountInformation.globallyUniqueIdentifier);
    assert.equal(merchantAccountInformation.paymentNetworkSpecific?.size, 1);

    assert.equal(merchantAccountInformation.globallyUniqueIdentifier?.tag, '00');
    assert.equal(merchantAccountInformation.globallyUniqueIdentifier?.length, 4);
    assert.equal(merchantAccountInformation.globallyUniqueIdentifier?.value, 'hoge');

    assert.equal(merchantAccountInformation.paymentNetworkSpecific?.get('01')?.tag, '01');
    assert.equal(merchantAccountInformation.paymentNetworkSpecific?.get('01')?.length, 4);
    assert.equal(merchantAccountInformation.paymentNetworkSpecific?.get('01')?.value, 'abcd');
  });

  it('#testFailDecode', () => {
    it('#testFailDecode', () => {
      expect(() =>
        DecoderMpm.decode('02160104abcd0104abcd', MerchantAccountInformationReservedAdditional),
      )
        .to.throw(DuplicateTagException)
        .that.satisfies(
          (error: DuplicateTagException) => error.value === '0104abcd' && error.tag === '01',
        );

      expect(() =>
        DecoderMpm.decode('02160104abcdAA04abcd', MerchantAccountInformationReservedAdditional),
      )
        .to.throw(InvalidTagException)
        .that.satisfies(
          (error: InvalidTagException) => error.value === 'AA04abcd' && error.tag === 'AA',
        );
    });
  });

  it('#testSuccessDecodeEncode', () => {
    const merchantAccountInformation: MerchantAccountInformationReservedAdditional =
      DecoderMpm.decode('02160004hoge0104abcd', MerchantAccountInformationReservedAdditional);

    assert.equal(merchantAccountInformation.toString(), '0004hoge0104abcd');
  });

  it('#testSuccessEncode', () => {
    const paymentNetworkSpecific = new TagLengthString();
    paymentNetworkSpecific.setTag('01');
    paymentNetworkSpecific.setValue('abcd');

    const merchantAccountInformation = new MerchantAccountInformationReservedAdditional();
    merchantAccountInformation.setGloballyUniqueIdentifier('hoge');
    merchantAccountInformation.addPaymentNetworkSpecific(paymentNetworkSpecific);

    assert.equal(merchantAccountInformation.toString(), '0004hoge0104abcd');
  });
});
