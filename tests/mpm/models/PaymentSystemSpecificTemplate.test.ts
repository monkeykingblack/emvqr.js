import { assert } from 'chai';
import {
  PaymentSystemSpecific,
  PaymentSystemSpecificTemplate,
  TagLengthString,
} from '../../.build';

describe('PaymentSystemSpecificTemplateTest', () => {
  it('#testSuccessToString', () => {
    const value = new PaymentSystemSpecific();
    value.setGloballyUniqueIdentifier('hoge');
    value.addPaymentSystemSpecific(new TagLengthString('01', 'abcd'));
    const paymentSystemSpecificTemplate = new PaymentSystemSpecificTemplate();
    paymentSystemSpecificTemplate.setTag('50');
    paymentSystemSpecificTemplate.setValue(value);
    assert.equal(paymentSystemSpecificTemplate.toString(), '50160004hoge0104abcd');
  });

  it('#testSuccessToStringWhenValueIsUndefined', () => {
    const paymentSystemSpecificTemplate = new PaymentSystemSpecificTemplate('50');
    assert.equal(paymentSystemSpecificTemplate.toString(), '');

    paymentSystemSpecificTemplate.setValue();
    assert.equal(paymentSystemSpecificTemplate.toString(), '');
  });

  it('#testSuccessToStringWhenValueIsEmpty', () => {
    const paymentSystemSpecificTemplate = new PaymentSystemSpecificTemplate(
      '50',
      new PaymentSystemSpecific(),
    );

    assert.equal(paymentSystemSpecificTemplate.toString(), '');
  });
});
