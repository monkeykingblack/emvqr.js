import { assert } from 'chai';
import {
  AdditionalDataField,
  AdditionalDataFieldTemplate,
  PaymentSystemSpecific,
  PaymentSystemSpecificTemplate,
  TagLengthString,
} from '../../.build';

describe('AdditionalDataFieldTemplateTest', () => {
  it('#testSuccessToString', () => {
    const paymentSystemSpecific = new PaymentSystemSpecific();
    paymentSystemSpecific.setGloballyUniqueIdentifier('1');
    paymentSystemSpecific.addPaymentSystemSpecific(new TagLengthString('01', 'i'));

    const paymentSystemSpecificTemplate = new PaymentSystemSpecificTemplate();
    paymentSystemSpecificTemplate.setTag('50');
    paymentSystemSpecificTemplate.setValue(paymentSystemSpecific);

    const value = new AdditionalDataField();
    value.setAdditionalConsumerDataRequest('tuvxy');
    value.setBillNumber('12345');
    value.setCustomerLabel('fghij');
    value.setLoyaltyNumber('54321');
    value.setMobileNumber('67890');
    value.setPurposeTransaction('pqres');
    value.setReferenceLabel('abcde');
    value.setStoreLabel('09876');
    value.setTerminalLabel('klmno');
    value.addPaymentSystemSpecific(paymentSystemSpecificTemplate);

    const additionalDataField = new AdditionalDataFieldTemplate();
    additionalDataField.setValue(value);

    assert.equal(
      additionalDataField.toString(),
      '62950105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy5010000110101i',
    );
  });

  it('#testSuccessToStringWithoutPaymentSystemSpecific', () => {
    const rFUforEMVCo = new TagLengthString();
    rFUforEMVCo.setTag('10');
    rFUforEMVCo.setValue('abcd');

    const value = new AdditionalDataField();
    value.setAdditionalConsumerDataRequest('tuvxy');
    value.setBillNumber('12345');
    value.setCustomerLabel('fghij');
    value.setLoyaltyNumber('54321');
    value.setMobileNumber('67890');
    value.setPurposeTransaction('pqres');
    value.setReferenceLabel('abcde');
    value.setStoreLabel('09876');
    value.setTerminalLabel('klmno');
    value.addRFUforEMVCo(rFUforEMVCo);

    const additionalDataField = new AdditionalDataFieldTemplate();
    additionalDataField.setValue(value);

    assert.equal(
      additionalDataField.toString(),
      '62890105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy1004abcd',
    );
  });

  it('#testSuccessToStringWhenValueIsUndefined', () => {
    const additionalDataField = new AdditionalDataFieldTemplate();
    assert.equal(additionalDataField.toString(), '');
    additionalDataField.setValue();
    assert.equal(additionalDataField.toString(), '');
  });
});
