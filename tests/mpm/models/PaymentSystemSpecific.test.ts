import { assert } from 'chai';
import { PaymentSystemSpecific, TagLengthString } from '../../.build';

describe('PaymentSystemSpecificTest', () => {
  it('#testSuccessToString', () => {
    const paymentSystemSpecific = new PaymentSystemSpecific();
    paymentSystemSpecific.setGloballyUniqueIdentifier('hoge');
    paymentSystemSpecific.addPaymentSystemSpecific(new TagLengthString('01', 'abcd'));

    assert.equal(paymentSystemSpecific.toString(), '0004hoge0104abcd');
  });

  it('testSuccessToStringSetGloballyUniqueIdentifierAndPaymentSystemSpecific', () => {
    const paymentSystemSpecific = new PaymentSystemSpecific();
    paymentSystemSpecific.setGloballyUniqueIdentifier('hoge', new TagLengthString('01', 'abcd'));

    assert.equal(paymentSystemSpecific.toString(), '0004hoge0104abcd');
  });

  it('#testSuccessToStringIsEmpty', () => {
    assert.equal(new PaymentSystemSpecific().toString(), '');
  });
});
