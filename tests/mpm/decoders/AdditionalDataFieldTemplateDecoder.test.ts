import { assert } from 'chai';
import {
  AdditionalDataField,
  AdditionalDataFieldTemplate,
  DecoderMpm,
  PaymentSystemSpecific,
  PaymentSystemSpecificTemplate,
  TagLengthString,
} from '../../.build';

describe('AdditionalDataFieldTemplateDecoderTest', () => {
  it('testSuccessDecode', () => {
    const additionalDataField = DecoderMpm.decode(
      '62950105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy5010000110101i',
      AdditionalDataFieldTemplate,
    );

    assert.isOk(additionalDataField.value?.additionalConsumerDataRequest);
    assert.isOk(additionalDataField.value?.billNumber);
    assert.isOk(additionalDataField.value?.customerLabel);
    assert.isOk(additionalDataField.value?.loyaltyNumber);
    assert.isOk(additionalDataField.value?.mobileNumber);
    assert.equal(additionalDataField.value?.paymentSystemSpecific.size, 1);
    assert.isOk(additionalDataField.value?.purposeTransaction);
    assert.isOk(additionalDataField.value?.referenceLabel);
    assert.equal(additionalDataField.value?.rFUforEMVCo.size, 0);
    assert.isOk(additionalDataField.value?.storeLabel);
    assert.isOk(additionalDataField.value?.terminalLabel);

    assert.equal(additionalDataField.value?.additionalConsumerDataRequest?.tag, '09');
    assert.equal(additionalDataField.value?.additionalConsumerDataRequest?.length, 5);
    assert.equal(additionalDataField.value?.additionalConsumerDataRequest?.value, 'tuvxy');

    assert.equal(additionalDataField.value?.billNumber?.tag, '01');
    assert.equal(additionalDataField.value?.billNumber?.length, 5);
    assert.equal(additionalDataField.value?.billNumber?.value, '12345');

    assert.equal(additionalDataField.value?.customerLabel?.tag, '06');
    assert.equal(additionalDataField.value?.customerLabel?.length, 5);
    assert.equal(additionalDataField.value?.customerLabel?.value, 'fghij');

    assert.equal(additionalDataField.value?.loyaltyNumber?.tag, '04');
    assert.equal(additionalDataField.value?.loyaltyNumber?.length, 5);
    assert.equal(additionalDataField.value?.loyaltyNumber?.value, '54321');

    assert.equal(additionalDataField.value?.mobileNumber?.tag, '02');
    assert.equal(additionalDataField.value?.mobileNumber?.length, 5);
    assert.equal(additionalDataField.value?.mobileNumber?.value, '67890');

    assert.equal(additionalDataField.value?.purposeTransaction?.tag, '08');
    assert.equal(additionalDataField.value?.purposeTransaction?.length, 5);
    assert.equal(additionalDataField.value?.purposeTransaction?.value, 'pqres');

    assert.equal(additionalDataField.value?.referenceLabel?.tag, '05');
    assert.equal(additionalDataField.value?.referenceLabel?.length, 5);
    assert.equal(additionalDataField.value?.referenceLabel?.value, 'abcde');

    assert.equal(additionalDataField.value?.storeLabel?.tag, '03');
    assert.equal(additionalDataField.value?.storeLabel?.length, 5);
    assert.equal(additionalDataField.value?.storeLabel?.value, '09876');

    assert.equal(additionalDataField.value?.terminalLabel?.tag, '07');
    assert.equal(additionalDataField.value?.terminalLabel?.length, 5);
    assert.equal(additionalDataField.value?.terminalLabel?.value, 'klmno');
  });

  it('testSuccessDecodeEncode', () => {
    const additionalDataField = DecoderMpm.decode(
      '62950105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy5010000110101i',
      AdditionalDataFieldTemplate,
    );

    assert.equal(
      additionalDataField.toString(),
      '62950105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy5010000110101i',
    );
  });

  it('testSuccessEncode', () => {
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
});
