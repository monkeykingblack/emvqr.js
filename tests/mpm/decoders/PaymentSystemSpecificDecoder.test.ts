import { assert, expect } from 'chai';
import {
  DecoderMpm,
  DuplicateTagException,
  InvalidTagException,
  PaymentSystemSpecific,
  TagLengthString,
} from '../../.build';

describe('PaymentSystemSpecificDecoderTest', () => {
  it('#testSuccessDecode', () => {
    const paymentSystemSpecific = DecoderMpm.decode('51160004abcd10041234', PaymentSystemSpecific);

    assert.isOk(paymentSystemSpecific.globallyUniqueIdentifier);
    assert.equal(paymentSystemSpecific.globallyUniqueIdentifier?.tag, '00');
    assert.equal(paymentSystemSpecific.globallyUniqueIdentifier?.length, 4);
    assert.equal(paymentSystemSpecific.globallyUniqueIdentifier?.value, 'abcd');

    assert.isOk(paymentSystemSpecific.paymentSystemSpecific);
    assert.equal(paymentSystemSpecific.paymentSystemSpecific?.get('10')?.tag, '10');
    assert.equal(paymentSystemSpecific.paymentSystemSpecific?.get('10')?.length, 4);
    assert.equal(paymentSystemSpecific.paymentSystemSpecific?.get('10')?.value, '1234');
  });

  it('#testFailDecode', () => {
    expect(() => DecoderMpm.decode('51240004abcd0004abcd10041234', PaymentSystemSpecific))
      .to.throw(DuplicateTagException)
      .that.satisfies(
        (error: DuplicateTagException) => error.value === '0004abcd' && error.tag === '00',
      );

    expect(() => DecoderMpm.decode('5116AA04abcd10041234', PaymentSystemSpecific))
      .to.throw(InvalidTagException)
      .that.satisfies(
        (error: InvalidTagException) => error.value === 'AA04abcd' && error.tag === 'AA',
      );
  });

  it('#testSuccessDecodeEncode', () => {
    const paymentSystemSpecific: PaymentSystemSpecific = DecoderMpm.decode(
      '51160004abcd10041234',
      PaymentSystemSpecific,
    );

    assert.equal(paymentSystemSpecific.toString(), '0004abcd10041234');
  });

  it('testSuccessEncode', () => {
    const paymentSystemSpecific = new PaymentSystemSpecific();
    paymentSystemSpecific.setGloballyUniqueIdentifier('abcd');
    paymentSystemSpecific.addPaymentSystemSpecific(new TagLengthString('10', '1234'));

    assert.equal(paymentSystemSpecific.toString(), '0004abcd10041234');
  });
});
