import { assert } from 'chai';
import {
  AdditionalDataField,
  AdditionalDataFieldTemplate,
  MerchantAccountInformationReservedAdditional,
  MerchantAccountInformationTemplate,
  MerchantInformationLanguage,
  MerchantInformationLanguageTemplate,
  MerchantPresentedMode,
  MerchantPresentedModeValidator,
  PaymentSystemSpecific,
  PaymentSystemSpecificTemplate,
  TagLengthString,
  Unreserved,
  UnreservedTemplate,
} from '../../.build';

describe('MerchantPresentedModeValidatorTest', () => {
  function getMerchanAccountInformation() {
    const paymentNetworkSpecific = new TagLengthString();
    paymentNetworkSpecific.setTag('01');
    paymentNetworkSpecific.setValue('abcd');

    const merchantAccountInformationValue = new MerchantAccountInformationReservedAdditional();
    merchantAccountInformationValue.setGloballyUniqueIdentifier('hoge');
    merchantAccountInformationValue.addPaymentNetworkSpecific(paymentNetworkSpecific);

    const merchantAccountInformation = new MerchantAccountInformationTemplate();
    merchantAccountInformation.setValue(merchantAccountInformationValue);
    merchantAccountInformation.setTag('26');
    return merchantAccountInformation;
  }

  function getUnreserved() {
    const contextSpecificData = new TagLengthString();
    contextSpecificData.setTag('07');
    contextSpecificData.setValue('12345678');

    const value = new Unreserved();
    value.setGloballyUniqueIdentifier('A011223344998877');
    value.addContextSpecificData(contextSpecificData);

    const unreserved = new UnreservedTemplate();
    unreserved.setValue(value);
    unreserved.setTag('80');
    return unreserved;
  }

  function getMerchantInformationLanguage() {
    const rFUforEMVCo = new TagLengthString();
    rFUforEMVCo.setTag('03');
    rFUforEMVCo.setValue('abcd');

    const merchantInformationLanguageValue = new MerchantInformationLanguage();
    merchantInformationLanguageValue.setLanguagePreference('ZH');
    merchantInformationLanguageValue.setMerchantName('北京');
    merchantInformationLanguageValue.setMerchantCity('最佳运输');
    merchantInformationLanguageValue.addRFUforEMVCo(rFUforEMVCo);

    const merchantInformationLanguage = new MerchantInformationLanguageTemplate();
    merchantInformationLanguage.setValue(merchantInformationLanguageValue);
    return merchantInformationLanguage;
  }

  function getAddtionalDataField() {
    const paymentSystemSpecific = new PaymentSystemSpecific();
    paymentSystemSpecific.setGloballyUniqueIdentifier('1234');
    paymentSystemSpecific.addPaymentSystemSpecific(new TagLengthString('01', 'ijkl'));

    const paymentSystemSpecificTemplate = new PaymentSystemSpecificTemplate();
    paymentSystemSpecificTemplate.setTag('50');
    paymentSystemSpecificTemplate.setValue(paymentSystemSpecific);

    const rFUforEMVCo = new TagLengthString();
    rFUforEMVCo.setTag('10');
    rFUforEMVCo.setValue('abcd');

    const additionalDataFieldValue = new AdditionalDataField();
    additionalDataFieldValue.setAdditionalConsumerDataRequest('tuv');
    additionalDataFieldValue.setMobileNumber('67890');
    additionalDataFieldValue.setPurposeTransaction('pqres');
    additionalDataFieldValue.setReferenceLabel('abcde');
    additionalDataFieldValue.setStoreLabel('09876');
    additionalDataFieldValue.setTerminalLabel('klmno');
    additionalDataFieldValue.addPaymentSystemSpecific(paymentSystemSpecificTemplate);
    additionalDataFieldValue.addRFUforEMVCo(rFUforEMVCo);

    const additionalDataField = new AdditionalDataFieldTemplate();
    additionalDataField.setValue(additionalDataFieldValue);
    return additionalDataField;
  }

  function getValidMerchantPresentMode() {
    const additionalDataField = getAddtionalDataField();
    const merchantAccountInformation = getMerchanAccountInformation();
    const merchantInformationLanguage = getMerchantInformationLanguage();
    const unreserved = getUnreserved();
    const rFUforEMVCo = new TagLengthString('65', '00');

    const merchantPresentMode = new MerchantPresentedMode();
    merchantPresentMode.setAdditionalDataField(additionalDataField);
    merchantPresentMode.setCountryCode('CN');
    merchantPresentMode.setMerchantCategoryCode('4111');
    merchantPresentMode.setMerchantCity('BEIJING');
    merchantPresentMode.setMerchantInformationLanguage(merchantInformationLanguage);
    merchantPresentMode.setMerchantName('BEST TRANSPORT');
    merchantPresentMode.setPayloadFormatIndicator('01');
    merchantPresentMode.setPointOfInitiationMethod('11');
    merchantPresentMode.setPostalCode('1234567');
    merchantPresentMode.setTipOrConvenienceIndicator('02');
    merchantPresentMode.setTransactionAmount('23.72');
    merchantPresentMode.setTransactionCurrency('156');
    merchantPresentMode.setValueOfConvenienceFeeFixed('500');
    merchantPresentMode.addMerchantAccountInformation(merchantAccountInformation);
    merchantPresentMode.addRFUforEMVCo(rFUforEMVCo);
    merchantPresentMode.addUnreserved(unreserved);
    merchantPresentMode.addUnreserved(unreserved);
    merchantPresentMode.addUnreserved(unreserved);
    merchantPresentMode.addUnreserved(unreserved);
    merchantPresentMode.addUnreserved(unreserved);
    merchantPresentMode.addUnreserved(unreserved);
    merchantPresentMode.addUnreserved(unreserved);

    return merchantPresentMode;
  }

  it('#testSuccessValidateWhenWithoutCRC', () => {
    const merchantPresentMode = getValidMerchantPresentMode();

    const validationResult = new MerchantPresentedModeValidator().validate(merchantPresentMode);

    assert.isTrue(
      validationResult.isValid(),
      JSON.stringify(validationResult.getFailureMessages()),
    );
  });
});
