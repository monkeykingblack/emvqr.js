import { assert, expect } from 'chai';
import {
  AdditionalDataField,
  DecoderMpm,
  DuplicateTagException,
  InvalidTagException,
  PaymentSystemSpecific,
  PaymentSystemSpecificTemplate,
  TagLengthString,
  Unreserved,
} from '../../.build';

describe('AdditionalDataFieldDecoderTest', () => {
  it('testSuccessDecode', () => {
    const additionalDataField = DecoderMpm.decode(
      '62950105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy5010000110101i',
      AdditionalDataField,
    );

    assert.isOk(additionalDataField.additionalConsumerDataRequest);
    assert.isOk(additionalDataField.billNumber);
    assert.isOk(additionalDataField.customerLabel);
    assert.isOk(additionalDataField.loyaltyNumber);
    assert.isOk(additionalDataField.mobileNumber);
    assert.equal(additionalDataField.paymentSystemSpecific.size, 1);
    assert.isOk(additionalDataField.purposeTransaction);
    assert.isOk(additionalDataField.referenceLabel);
    assert.equal(additionalDataField.rFUforEMVCo.size, 0);
    assert.isOk(additionalDataField.storeLabel);
    assert.isOk(additionalDataField.terminalLabel);

    assert.equal(additionalDataField.additionalConsumerDataRequest?.tag, '09');
    assert.equal(additionalDataField.additionalConsumerDataRequest?.length, 5);
    assert.equal(additionalDataField.additionalConsumerDataRequest?.value, 'tuvxy');

    assert.equal(additionalDataField.billNumber?.tag, '01');
    assert.equal(additionalDataField.billNumber?.length, 5);
    assert.equal(additionalDataField.billNumber?.value, '12345');

    assert.equal(additionalDataField.customerLabel?.tag, '06');
    assert.equal(additionalDataField.customerLabel?.length, 5);
    assert.equal(additionalDataField.customerLabel?.value, 'fghij');

    assert.equal(additionalDataField.loyaltyNumber?.tag, '04');
    assert.equal(additionalDataField.loyaltyNumber?.length, 5);
    assert.equal(additionalDataField.loyaltyNumber?.value, '54321');

    assert.equal(additionalDataField.mobileNumber?.tag, '02');
    assert.equal(additionalDataField.mobileNumber?.length, 5);
    assert.equal(additionalDataField.mobileNumber?.value, '67890');

    assert.equal(additionalDataField.purposeTransaction?.tag, '08');
    assert.equal(additionalDataField.purposeTransaction?.length, 5);
    assert.equal(additionalDataField.purposeTransaction?.value, 'pqres');

    assert.equal(additionalDataField.referenceLabel?.tag, '05');
    assert.equal(additionalDataField.referenceLabel?.length, 5);
    assert.equal(additionalDataField.referenceLabel?.value, 'abcde');

    assert.equal(additionalDataField.storeLabel?.tag, '03');
    assert.equal(additionalDataField.storeLabel?.length, 5);
    assert.equal(additionalDataField.storeLabel?.value, '09876');

    assert.equal(additionalDataField.terminalLabel?.tag, '07');
    assert.equal(additionalDataField.terminalLabel?.length, 5);
    assert.equal(additionalDataField.terminalLabel?.value, 'klmno');
  });

  it('testFailDecode', () => {
    expect(() => DecoderMpm.decode('622311011010512345010512345', Unreserved))
      .to.throw(DuplicateTagException)
      .that.satisfies(
        (error: DuplicateTagException) => error.value === '010512345' && error.tag === '01',
      );

    expect(() => DecoderMpm.decode('621411011AA0512345', Unreserved))
      .to.throw(InvalidTagException)
      .that.satisfies(
        (error: InvalidTagException) => error.value === 'AA0512345' && error.tag === 'AA',
      );
  });

  it('testSuccessDecodeEncode', () => {
    const additionalDataField = DecoderMpm.decode(
      '62950105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy5010000110101i',
      AdditionalDataField,
    );

    assert.equal(
      additionalDataField.toString(),
      '0105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy5010000110101i',
    );
  });

  it('testSuccessEncode', () => {
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
});
