import { assert } from 'chai';
import {
  AdditionalDataField,
  AdditionalDataFieldTemplate,
  MerchantAccountInformationReserved,
  MerchantAccountInformationReservedAdditional,
  MerchantAccountInformationTemplate,
  MerchantInformationLanguage,
  MerchantInformationLanguageTemplate,
  MerchantPresentedMode,
  PaymentSystemSpecific,
  PaymentSystemSpecificTemplate,
  TagLengthString,
  Unreserved,
  UnreservedTemplate,
} from '../../.build';

describe('MerchantPresentedModeTest', () => {
  const getAdditionalDataField = () => {
    const paymentSystemSpecific = new PaymentSystemSpecific();
    paymentSystemSpecific.setGloballyUniqueIdentifier('1');
    paymentSystemSpecific.addPaymentSystemSpecific(new TagLengthString('01', 'i'));

    const paymentSystemSpecificTemplate = new PaymentSystemSpecificTemplate();
    paymentSystemSpecificTemplate.setTag('50');
    paymentSystemSpecificTemplate.setValue(paymentSystemSpecific);

    const additionalDataFieldValue = new AdditionalDataField();
    additionalDataFieldValue.setAdditionalConsumerDataRequest('tuvxy');
    additionalDataFieldValue.setBillNumber('12345');
    additionalDataFieldValue.setCustomerLabel('fghij');
    additionalDataFieldValue.setLoyaltyNumber('54321');
    additionalDataFieldValue.setMobileNumber('67890');
    additionalDataFieldValue.setPurposeTransaction('pqres');
    additionalDataFieldValue.setReferenceLabel('abcde');
    additionalDataFieldValue.setStoreLabel('09876');
    additionalDataFieldValue.setTerminalLabel('klmno');
    additionalDataFieldValue.addPaymentSystemSpecific(paymentSystemSpecificTemplate);

    const additionalDataField = new AdditionalDataFieldTemplate();
    additionalDataField.setValue(additionalDataFieldValue);

    return additionalDataField;
  };

  const getMerchantAccountInformationReserved = () => {
    const merchantAccountInformationValue = new MerchantAccountInformationReserved('0004');

    return new MerchantAccountInformationTemplate('02', merchantAccountInformationValue);
  };

  const getMerchantAccountInformationReservedAdditional = () => {
    const paymentNetworkSpecific = new TagLengthString();
    paymentNetworkSpecific.setTag('01');
    paymentNetworkSpecific.setValue('abcd');

    const merchantAccountInformationValue = new MerchantAccountInformationReservedAdditional();
    merchantAccountInformationValue.setGloballyUniqueIdentifier('hoge');
    merchantAccountInformationValue.addPaymentNetworkSpecific(paymentNetworkSpecific);

    return new MerchantAccountInformationTemplate('26', merchantAccountInformationValue);
  };

  const getMerchantInformationLanguage = () => {
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
  };

  const getUnreserved = () => {
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
  };

  it('#testSuccessToString', () => {
    const additionalDataField = getAdditionalDataField();
    const merchantAccountInformationReservedAdditional =
      getMerchantAccountInformationReservedAdditional();
    const merchantAccountInformationReserved = getMerchantAccountInformationReserved();
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
    merchantPresentMode.setTipOrConvenienceIndicator('01');
    merchantPresentMode.setTransactionAmount('23.72');
    merchantPresentMode.setTransactionCurrency('156');
    merchantPresentMode.setValueOfConvenienceFeeFixed('500');
    merchantPresentMode.setValueOfConvenienceFeePercentage('5');
    merchantPresentMode.addMerchantAccountInformation(merchantAccountInformationReserved);
    merchantPresentMode.addMerchantAccountInformation(merchantAccountInformationReservedAdditional);
    merchantPresentMode.addRFUforEMVCo(rFUforEMVCo);
    merchantPresentMode.addUnreserved(unreserved);

    assert.equal(
      merchantPresentMode.toString(),
      '0002010102110204000426160004' +
        'hoge0104abcd520441115303156540523.725502015603500570155802CN5914BEST TRAN' +
        'SPORT6007BEIJING6107123456762950105123450205678900305098760405543210505ab' +
        'cde0605fghij0705klmno0805pqres0905tuvxy5010000110101i64280002ZH0102北京020' +
        '4最佳运输0304abcd65020080320016A011223344998877070812345678630432B3',
    );
  });

  it('#testSuccessToStringWhenValueIsUndefined', () => {
    const merchantPresentMode = new MerchantPresentedMode();
    merchantPresentMode.setAdditionalDataField();
    merchantPresentMode.setCountryCode();
    merchantPresentMode.setCRC();
    merchantPresentMode.setMerchantCategoryCode();
    merchantPresentMode.setMerchantCity();
    merchantPresentMode.setMerchantInformationLanguage();
    merchantPresentMode.setMerchantName();
    merchantPresentMode.setPayloadFormatIndicator();
    merchantPresentMode.setPointOfInitiationMethod();
    merchantPresentMode.setPostalCode();
    merchantPresentMode.setTipOrConvenienceIndicator();
    merchantPresentMode.setTransactionAmount();
    merchantPresentMode.setTransactionCurrency();
    merchantPresentMode.setValueOfConvenienceFeeFixed();
    merchantPresentMode.setValueOfConvenienceFeePercentage();

    assert.equal(merchantPresentMode.toString(), '');
  });

  it('#testSuccessToStringWhenValueIsEmpty', () => {
    const merchantPresentMode = new MerchantPresentedMode();
    merchantPresentMode.setAdditionalDataField(new AdditionalDataFieldTemplate());
    merchantPresentMode.setCountryCode('');
    merchantPresentMode.setCRC('');
    merchantPresentMode.setMerchantCategoryCode('');
    merchantPresentMode.setMerchantCity('');
    merchantPresentMode.setMerchantInformationLanguage(new MerchantInformationLanguageTemplate());
    merchantPresentMode.setMerchantName('');
    merchantPresentMode.setPayloadFormatIndicator('');
    merchantPresentMode.setPointOfInitiationMethod('');
    merchantPresentMode.setPostalCode('');
    merchantPresentMode.setTipOrConvenienceIndicator('');
    merchantPresentMode.setTransactionAmount('');
    merchantPresentMode.setTransactionCurrency('');
    merchantPresentMode.setValueOfConvenienceFeeFixed('');
    merchantPresentMode.setValueOfConvenienceFeePercentage('');
    merchantPresentMode.addMerchantAccountInformation(new MerchantAccountInformationTemplate());
    merchantPresentMode.addRFUforEMVCo(new TagLengthString());
    merchantPresentMode.addUnreserved(new UnreservedTemplate());
    assert.equal(merchantPresentMode.toString(), '');
  });
});
