import { assert } from 'chai';
import {
  DecoderMpm,
  PaymentSystemSpecific,
  PaymentSystemSpecificTemplate,
  TagLengthString,
} from '../../.build';

describe('PaymentSystemSpecificTemplateDecoderTest', () => {
  it('#testSuccessDecode', () => {
    const paymentSystemSpecificTemplate = DecoderMpm.decode(
      '51160004abcd10041234',
      PaymentSystemSpecificTemplate,
    );

    assert.isOk(paymentSystemSpecificTemplate.value);
    assert.equal(paymentSystemSpecificTemplate.tag, '51');
    assert.equal(paymentSystemSpecificTemplate.length, 16);

    assert.isOk(paymentSystemSpecificTemplate.value?.globallyUniqueIdentifier);
    assert.equal(paymentSystemSpecificTemplate.value?.globallyUniqueIdentifier?.tag, '00');
    assert.equal(paymentSystemSpecificTemplate.value?.globallyUniqueIdentifier?.length, 4);
    assert.equal(paymentSystemSpecificTemplate.value?.globallyUniqueIdentifier?.value, 'abcd');

    assert.isOk(paymentSystemSpecificTemplate.value?.paymentSystemSpecific);
    assert.equal(paymentSystemSpecificTemplate.value?.paymentSystemSpecific?.get('10')?.tag, '10');
    assert.equal(paymentSystemSpecificTemplate.value?.paymentSystemSpecific?.get('10')?.length, 4);
    assert.equal(
      paymentSystemSpecificTemplate.value?.paymentSystemSpecific?.get('10')?.value,
      '1234',
    );
  });

  it('#testSuccessDecodeEncode', () => {
    const paymentSystemSpecificTemplate: PaymentSystemSpecificTemplate = DecoderMpm.decode(
      '51160004abcd10041234',
      PaymentSystemSpecificTemplate,
    );

    assert.equal(paymentSystemSpecificTemplate.toString(), '51160004abcd10041234');
  });

  it('#testSuccessEncode', () => {
    const value = new PaymentSystemSpecific();
    value.setGloballyUniqueIdentifier('abcd');
    value.addPaymentSystemSpecific(new TagLengthString('10', '1234'));

    const paymentSystemSpecificTemplate = new PaymentSystemSpecificTemplate();
    paymentSystemSpecificTemplate.setTag('51');
    paymentSystemSpecificTemplate.setValue(value);

    assert.equal(paymentSystemSpecificTemplate.toString(), '51160004abcd10041234');
  });
});
