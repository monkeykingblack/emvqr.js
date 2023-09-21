import { assert } from 'chai';
import {
  AdditionalDataField,
  PaymentSystemSpecific,
  PaymentSystemSpecificTemplate,
  TagLengthString,
} from '../../.build';

describe('AdditionalDataFieldTest', () => {
  it('#testSuccessToString', () => {
    const paymentSystemSpecific = new PaymentSystemSpecific();
    paymentSystemSpecific.setGloballyUniqueIdentifier('1');
    paymentSystemSpecific.addPaymentSystemSpecific(new TagLengthString('01', 'i'));

    const paymentSystemSpecificTemplate = new PaymentSystemSpecificTemplate();
    paymentSystemSpecificTemplate.setTag('50');
    paymentSystemSpecificTemplate.setValue(paymentSystemSpecific);

    const additionalDataField = new AdditionalDataField();
    additionalDataField.setAdditionalConsumerDataRequest('tuvxy');
    additionalDataField.setBillNumber('12345');
    additionalDataField.setCustomerLabel('fghij');
    additionalDataField.setLoyaltyNumber('54321');
    additionalDataField.setMobileNumber('67890');
    additionalDataField.setPurposeTransaction('pqres');
    additionalDataField.setReferenceLabel('abcde');
    additionalDataField.setStoreLabel('09876');
    additionalDataField.setTerminalLabel('klmno');
    additionalDataField.addPaymentSystemSpecific(paymentSystemSpecificTemplate);

    assert.equal(
      additionalDataField.toString(),
      '0105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy5010000110101i',
    );
  });

  it('#testSuccessToStringWithoutPaymentSystemSpecific', () => {
    const rFUforEMVCo = new TagLengthString();
    rFUforEMVCo.setTag('10');
    rFUforEMVCo.setValue('abcd');

    const additionalDataField = new AdditionalDataField();
    additionalDataField.setAdditionalConsumerDataRequest('tuvxy');
    additionalDataField.setBillNumber('12345');
    additionalDataField.setCustomerLabel('fghij');
    additionalDataField.setLoyaltyNumber('54321');
    additionalDataField.setMobileNumber('67890');
    additionalDataField.setPurposeTransaction('pqres');
    additionalDataField.setReferenceLabel('abcde');
    additionalDataField.setStoreLabel('09876');
    additionalDataField.setTerminalLabel('klmno');
    additionalDataField.addRFUforEMVCo(rFUforEMVCo);

    assert.equal(
      additionalDataField.toString(),
      '0105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy1004abcd',
    );
  });

  it('#testSuccessToStringWhenValueIsNull', () => {
    assert.equal(new AdditionalDataField().toString(), '');
  });
});
