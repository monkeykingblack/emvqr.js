// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from "chai";
import {
  PaymentSystemSpecific, 
  TagLengthString,
  PaymentSystemSpecificTemplate,
  MerchantAccountInformationReservedAdditional,
  MerchantAccountInformationTemplate,
  MerchantInformationLanguage,
  MerchantInformationLanguageTemplate,
  AdditionalDataField,
  AdditionalDataFieldTemplate,
  MerchantPresentedMode,
  Unreserved,
  UnreservedTemplate,
  MerchantAccountInformationReserved
} from "../.build/index"

describe('TagLengthStringTest', () => {
  describe("#testSuccessToString", () => {
    it('should generate string "02041234" and "03045678', () => {
      const tagLengthString = new TagLengthString("02", "1234");
      assert.equal(tagLengthString.toString(), "02041234");
      tagLengthString.setTag("03")
      tagLengthString.setValue("5678")
      assert.equal(tagLengthString.toString(), "03045678");
    })
  })
  describe("#testSuccessToStringWhenValueIsNullOrUndefined", () => {
    it('should generate EMPTY string', () => {
      const tagLengthString = new TagLengthString("02", undefined);
      assert.equal(tagLengthString.toString(), "");
      tagLengthString.setValue(null)
      assert.equal(tagLengthString.toString(), "");
    })
  })
  describe("#testSuccessToStringWhenValueIsEmpty", () => {
    it('should generate EMPTY string', () => {
      const tagLengthString = new TagLengthString("02", "");
      assert.equal(tagLengthString.toString(), "");
    })
  })
})

describe('MerchantAccountInformationReservedAdditionalTest', () => {
  describe("#testSuccessToString", () => {
    it('should generate string "0004hoge0104abcd"', () => {
      const tagLengthString = new TagLengthString();
      tagLengthString.setTag("01");
      tagLengthString.setValue("abcd");
  
      const merchantAccountInformation = new MerchantAccountInformationReservedAdditional();
      merchantAccountInformation.setGloballyUniqueIdentifier("hoge");
      merchantAccountInformation.addPaymentNetworkSpecific(tagLengthString);
  
      assert.equal(merchantAccountInformation.toString(), "0004hoge0104abcd");
    })
  })

  describe("#testSuccessToStringConstructorGloballyUniqueIdentifier", () => {
    it('should generate string "0004hoge"', () => {
      const merchantAccountInformation = new MerchantAccountInformationReservedAdditional("hoge");
      assert.equal(merchantAccountInformation.toString(), "0004hoge");
    })
  })

  describe("#testSuccessToStringConstructorGloballyUniqueIdentifierAndPaymentNetworkSpecific", () => {
    it('should generate string "0004hoge0104abcd"', () => {
      const merchantAccountInformation = new MerchantAccountInformationReservedAdditional("hoge", new TagLengthString("01", "abcd"));
      assert.equal(merchantAccountInformation.toString(), "0004hoge0104abcd");
    })
  })
  
  describe("#testSuccessToStringConstructorGloballyUniqueIdentifierIsNullOrUndefined", () => {
    it('should generate EMPTY string', () => {
      assert.equal(new MerchantAccountInformationReservedAdditional().toString(), "");
      assert.equal(new MerchantAccountInformationReservedAdditional(null).toString(), "");
      assert.equal(new MerchantAccountInformationReservedAdditional(null, null).toString(), "");
    })
  })
})

describe('MerchantAccountInformationTemplateTest', () => {
  describe("#testSuccessToString", () => {
    it('should generate string "0004hoge0104abcd"', () => {
      const tagLengthString = new TagLengthString();
      tagLengthString.setTag("01");
      tagLengthString.setValue("abcd");
  
      const value = new MerchantAccountInformationReservedAdditional();
      value.setGloballyUniqueIdentifier("hoge");
      value.addPaymentNetworkSpecific(tagLengthString);
  

      const merchantAccountInformation = new MerchantAccountInformationTemplate();
      merchantAccountInformation.setValue(value);
      merchantAccountInformation.setTag("02");

      assert.equal(merchantAccountInformation.toString(), "02160004hoge0104abcd");
    })
  })

  describe("#testSuccessToStringConstructorTag", () => {
    it('should generate string "0004hoge0104abcd"', () => {
      const tagLengthString = new TagLengthString();
      tagLengthString.setTag("01");
      tagLengthString.setValue("abcd");
  
      const value = new MerchantAccountInformationReservedAdditional();
      value.setGloballyUniqueIdentifier("hoge");
      value.addPaymentNetworkSpecific(tagLengthString);
  
      const merchantAccountInformation = new MerchantAccountInformationTemplate("02", value);

      assert.equal(merchantAccountInformation.toString(), "02160004hoge0104abcd");
    })
  })

  
  describe("#testSuccessToStringWhenValueIsNullOrUndefined", () => {
    it('should generate EMPTY string', () => {
      assert.equal(new MerchantAccountInformationTemplate().toString(), "");
      assert.equal(new MerchantAccountInformationTemplate(null).toString(), "");
      assert.equal(new MerchantAccountInformationTemplate(null, null).toString(), "");
    })
  })
})

describe("MerchantInformationLanguageTest", () => {
  describe("#testSuccessToString", () => {
    it('should generate string "0002ZH0102北京0204最佳运输0304abcd"', () => {
      const rFUforEMVCo = new TagLengthString();
      rFUforEMVCo.setTag("03");
      rFUforEMVCo.setValue("abcd");

      const merchantInformationLanguage = new MerchantInformationLanguage();
      merchantInformationLanguage.setLanguagePreference("ZH");
      merchantInformationLanguage.setMerchantCity("最佳运输");
      merchantInformationLanguage.setMerchantName("北京");
      merchantInformationLanguage.addRFUforEMVCo(rFUforEMVCo);

      assert.equal(merchantInformationLanguage.toString(), "0002ZH0102北京0204最佳运输0304abcd");
    })
  })

  describe("#testSuccessToStringWhenValueIsUndefined", () => {
    assert.equal(new MerchantInformationLanguage().toString(), "");
  })
})

describe("MerchantInformationLanguageTemplateTest", () => {
  describe("#testSuccessToString", () => {
    it('should generate string "64280002ZH0102北京0204最佳运输0304abcd"', () => {
      const rFUforEMVCo = new TagLengthString();
      rFUforEMVCo.setTag("03");
      rFUforEMVCo.setValue("abcd");

      const value = new MerchantInformationLanguage();
      value.setLanguagePreference("ZH");
      value.setMerchantCity("最佳运输");
      value.setMerchantName("北京");
      value.addRFUforEMVCo(rFUforEMVCo);

      const merchantInformationLanguage = new MerchantInformationLanguageTemplate();
      merchantInformationLanguage.setValue(value);

      assert.equal(merchantInformationLanguage.toString(), "64280002ZH0102北京0204最佳运输0304abcd");
    })
  })

  describe("#testSuccessToStringWhenValueIsEmpty", () => {
    const merchantInformationLanguage = new MerchantInformationLanguageTemplate();
      merchantInformationLanguage.setValue(new MerchantInformationLanguage());

    assert.equal(merchantInformationLanguage.toString(), "");
  })

  describe("#testSuccessToStringWhenValueIsUndefined", () => {
    assert.equal(new MerchantInformationLanguageTemplate().toString(), "");
  })
})

describe("PaymentSystemSpecificTest", () => {
  describe("#testSuccessToString", () => {
    it('should generate string "0004hoge0104abcd"', () => {
      const paymentSystemSpecific = new PaymentSystemSpecific();
      paymentSystemSpecific.setGloballyUniqueIdentifier("hoge");
      paymentSystemSpecific.addPaymentSystemSpecific(new TagLengthString("01", "abcd"));
      
      assert.equal(paymentSystemSpecific.toString(), "0004hoge0104abcd");
    })
  })

  describe("testSuccessToStringSetGloballyUniqueIdentifierAndPaymentSystemSpecific", () => {
    it('should generate string "0004hoge0104abcd"', () => {
      const paymentSystemSpecific = new PaymentSystemSpecific();
      paymentSystemSpecific.setGloballyUniqueIdentifier("hoge", new TagLengthString("01", "abcd"));
      
      assert.equal(paymentSystemSpecific.toString(), "0004hoge0104abcd");
    })
  })

  describe("#testSuccessToStringIsEmpty", () => {
    it('should generate EMPTY string', () => {
      assert.equal(new PaymentSystemSpecific().toString(), "")
    })
  })
})

describe('PaymentSystemSpecificTemplateTest', () => {
  describe('#testSuccessToString', () => {
    it('should generate string "50160004hoge0104abcd"' ,() => {
      const value = new PaymentSystemSpecific();
      value.setGloballyUniqueIdentifier("hoge");
      value.addPaymentSystemSpecific(new TagLengthString("01", "abcd"));
      const paymentSystemSpecificTemplate = new PaymentSystemSpecificTemplate();
      paymentSystemSpecificTemplate.setTag("50")
      paymentSystemSpecificTemplate.setValue(value)
      assert.equal(paymentSystemSpecificTemplate.toString(), "50160004hoge0104abcd");
    })
  })

  describe('#testSuccessToStringWhenValueIsNullOrUndefined', () => {
    it('should generate EMPTY string' ,() => {
      const paymentSystemSpecificTemplate = new PaymentSystemSpecificTemplate("50");
      assert.equal(paymentSystemSpecificTemplate.toString(), "");

      paymentSystemSpecificTemplate.setValue(null)
      assert.equal(paymentSystemSpecificTemplate.toString(), "");
    })
  })


  describe('#testSuccessToStringWhenValueIsEmpty', () => {
    it('should generate EMPTY string' ,() => {
      const paymentSystemSpecificTemplate = new PaymentSystemSpecificTemplate("50", new PaymentSystemSpecific());

      assert.equal(paymentSystemSpecificTemplate.toString(), "");
    })
  })
})

describe("AdditionalDataFieldTest", () => {
  describe("#testSuccessToString", () => {
    it('should generate string "0105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy5010000110101i"', () => {
      const paymentSystemSpecific = new PaymentSystemSpecific();
      paymentSystemSpecific.setGloballyUniqueIdentifier("1");
      paymentSystemSpecific.addPaymentSystemSpecific(new TagLengthString("01", "i"));

      const paymentSystemSpecificTemplate = new PaymentSystemSpecificTemplate();
      paymentSystemSpecificTemplate.setTag("50");
      paymentSystemSpecificTemplate.setValue(paymentSystemSpecific);

      const additionalDataField = new AdditionalDataField();
      additionalDataField.setAdditionalConsumerDataRequest("tuvxy");
      additionalDataField.setBillNumber("12345");
      additionalDataField.setCustomerLabel("fghij");
      additionalDataField.setLoyaltyNumber("54321");
      additionalDataField.setMobileNumber("67890");
      additionalDataField.setPurposeTransaction("pqres");
      additionalDataField.setReferenceLabel("abcde");
      additionalDataField.setStoreLabel("09876");
      additionalDataField.setTerminalLabel("klmno");
      additionalDataField.addPaymentSystemSpecific(paymentSystemSpecificTemplate);

      assert.equal(additionalDataField.toString(), "0105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy5010000110101i");
    })
  })

  describe("#testSuccessToStringWithoutPaymentSystemSpecific", () => {
    it('should generate string "0105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy1004abcd"', () => {
      const rFUforEMVCo = new TagLengthString();
      rFUforEMVCo.setTag("10");
      rFUforEMVCo.setValue("abcd");

      const additionalDataField = new AdditionalDataField();
      additionalDataField.setAdditionalConsumerDataRequest("tuvxy");
      additionalDataField.setBillNumber("12345");
      additionalDataField.setCustomerLabel("fghij");
      additionalDataField.setLoyaltyNumber("54321");
      additionalDataField.setMobileNumber("67890");
      additionalDataField.setPurposeTransaction("pqres");
      additionalDataField.setReferenceLabel("abcde");
      additionalDataField.setStoreLabel("09876");
      additionalDataField.setTerminalLabel("klmno");
      additionalDataField.addRFUforEMVCo(rFUforEMVCo);

      assert.equal(additionalDataField.toString(), "0105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy1004abcd");
    })
  })

  describe("#testSuccessToStringWhenValueIsNull", () => {
    it('should generate EMPTY string', () => {
      assert.equal(new AdditionalDataField().toString(), "")
    })
  })
})

describe('AdditionalDataFieldTemplateTest', () => { 
  describe('#testSuccessToString', () => {
    it('should generate string "62950105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy5010000110101i"', () => {
      const paymentSystemSpecific = new PaymentSystemSpecific();
      paymentSystemSpecific.setGloballyUniqueIdentifier("1");
      paymentSystemSpecific.addPaymentSystemSpecific(new TagLengthString("01", "i"));

      const paymentSystemSpecificTemplate = new PaymentSystemSpecificTemplate();
      paymentSystemSpecificTemplate.setTag("50");
      paymentSystemSpecificTemplate.setValue(paymentSystemSpecific);

      const value = new AdditionalDataField();
      value.setAdditionalConsumerDataRequest("tuvxy");
      value.setBillNumber("12345");
      value.setCustomerLabel("fghij");
      value.setLoyaltyNumber("54321");
      value.setMobileNumber("67890");
      value.setPurposeTransaction("pqres");
      value.setReferenceLabel("abcde");
      value.setStoreLabel("09876");
      value.setTerminalLabel("klmno");
      value.addPaymentSystemSpecific(paymentSystemSpecificTemplate);

      const additionalDataField = new AdditionalDataFieldTemplate();
      additionalDataField.setValue(value);

      assert.equal(additionalDataField.toString(), "62950105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy5010000110101i");
    })
  })

  describe('#testSuccessToStringWithoutPaymentSystemSpecific', () => {
    it('should generate string "62890105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy1004abcd"', () => {
      const rFUforEMVCo = new TagLengthString();
      rFUforEMVCo.setTag("10");
      rFUforEMVCo.setValue("abcd");

      const value = new AdditionalDataField();
      value.setAdditionalConsumerDataRequest("tuvxy");
      value.setBillNumber("12345");
      value.setCustomerLabel("fghij");
      value.setLoyaltyNumber("54321");
      value.setMobileNumber("67890");
      value.setPurposeTransaction("pqres");
      value.setReferenceLabel("abcde");
      value.setStoreLabel("09876");
      value.setTerminalLabel("klmno");
      value.addRFUforEMVCo(rFUforEMVCo);

      const additionalDataField = new AdditionalDataFieldTemplate();
      additionalDataField.setValue(value);

      assert.equal(additionalDataField.toString(), "62890105123450205678900305098760405543210505abcde0605fghij0705klmno0805pqres0905tuvxy1004abcd");
    })
  })

  describe('testSuccessToStringWhenValueIsNullOrUndefined', () => { 
    it("should generate EMPTY string", () => {
      const additionalDataField = new AdditionalDataFieldTemplate();      
      assert.equal(additionalDataField.toString(), "")
      additionalDataField.setValue(null);
      assert.equal(additionalDataField.toString(), "")
    })
  })
})

describe("UnreservedTest", () => {
  describe("#testSuccessToString", () => {
    it('should generate string "0016A011223344998877070812345678"', () => {
      const contextSpecificData = new TagLengthString();
      contextSpecificData.setTag("07");
      contextSpecificData.setValue("12345678");

      const unreserved = new Unreserved();
      unreserved.setGloballyUniqueIdentifier("A011223344998877");
      unreserved.addContextSpecificData(contextSpecificData);

      assert.equal(unreserved.toString(), "0016A011223344998877070812345678");
    })
  })

  describe("#testSuccessConstructorTag", () => {
    it('should generate string "0016A011223344998877070812345678"', () => {
      const contextSpecificData = new TagLengthString();
      contextSpecificData.setTag("07");
      contextSpecificData.setValue("12345678");

      const unreserved = new Unreserved("07");
      unreserved.setGloballyUniqueIdentifier("A011223344998877");
      unreserved.addContextSpecificData(contextSpecificData);

      assert.equal(unreserved.toString(), "0016A011223344998877070812345678");
    })
  })

  
  describe("#testSuccessToStringWhenValueIsNull", () => {
    it('should generate EMPTY string', () => {
      assert.equal(new Unreserved().toString(), "")
    })
  })
})

describe('UnreservedTemplateTest', () => { 
  describe('#testSuccessToString', () => {
    it('should generate string "91320016A011223344998877070812345678"', () => {
      const contextSpecificData = new TagLengthString();
      contextSpecificData.setTag("07");
      contextSpecificData.setValue("12345678");

      const value = new Unreserved();
      value.setGloballyUniqueIdentifier("A011223344998877");
      value.addContextSpecificData(contextSpecificData);

      const unreservedTemplate = new UnreservedTemplate();
      unreservedTemplate.setValue(value);
      unreservedTemplate.setTag("91");

      assert.equal(unreservedTemplate.toString(), "91320016A011223344998877070812345678");
    })
  })

  describe('#testSuccessConstructorTag', () => {
    it('should generate string "91320016A011223344998877070812345678"', () => {
      const contextSpecificData = new TagLengthString();
      contextSpecificData.setTag("07");
      contextSpecificData.setValue("12345678");

      const value = new Unreserved("07");
      value.setGloballyUniqueIdentifier("A011223344998877");
      value.addContextSpecificData(contextSpecificData);

      const unreservedTemplate = new UnreservedTemplate("91");
      unreservedTemplate.setValue(value);

      assert.equal(unreservedTemplate.toString(), "91320016A011223344998877070812345678");
    })
  })

  describe('testSuccessToStringWhenValueIsNullOrUndefined', () => { 
    it("should generate EMPTY string", () => {
      const unreservedTemplate = new UnreservedTemplate();
      unreservedTemplate.setTag("91");
      assert.equal(unreservedTemplate.toString(), "")
      unreservedTemplate.setValue(null);
      assert.equal(unreservedTemplate.toString(), "")
    })
  })
})

describe('MerchantPresentedModeTest', () => { 
  const getAdditionalDataField = () => {
    const paymentSystemSpecific = new PaymentSystemSpecific();
    paymentSystemSpecific.setGloballyUniqueIdentifier("1");
    paymentSystemSpecific.addPaymentSystemSpecific(new TagLengthString("01", "i"));

    const  paymentSystemSpecificTemplate = new PaymentSystemSpecificTemplate();
    paymentSystemSpecificTemplate.setTag("50");
    paymentSystemSpecificTemplate.setValue(paymentSystemSpecific);

    const additionalDataFieldValue = new AdditionalDataField();
    additionalDataFieldValue.setAdditionalConsumerDataRequest("tuvxy");
    additionalDataFieldValue.setBillNumber("12345");
    additionalDataFieldValue.setCustomerLabel("fghij");
    additionalDataFieldValue.setLoyaltyNumber("54321");
    additionalDataFieldValue.setMobileNumber("67890");
    additionalDataFieldValue.setPurposeTransaction("pqres");
    additionalDataFieldValue.setReferenceLabel("abcde");
    additionalDataFieldValue.setStoreLabel("09876");
    additionalDataFieldValue.setTerminalLabel("klmno");
    additionalDataFieldValue.addPaymentSystemSpecific(paymentSystemSpecificTemplate);

    const additionalDataField = new AdditionalDataFieldTemplate();
    additionalDataField.setValue(additionalDataFieldValue);

    return additionalDataField;
  }

  const getMerchantAccountInformationReserved = () => {
    const merchantAccountInformationValue = new MerchantAccountInformationReserved("0004");

    return new MerchantAccountInformationTemplate("02", merchantAccountInformationValue);
  }

  const getMerchantAccountInformationReservedAdditional = () => {
    const paymentNetworkSpecific = new TagLengthString();
    paymentNetworkSpecific.setTag("01");
    paymentNetworkSpecific.setValue("abcd");

    const merchantAccountInformationValue = new MerchantAccountInformationReservedAdditional();
    merchantAccountInformationValue.setGloballyUniqueIdentifier("hoge");
    merchantAccountInformationValue.addPaymentNetworkSpecific(paymentNetworkSpecific);

    return new MerchantAccountInformationTemplate("26", merchantAccountInformationValue);
  }

  const getMerchantInformationLanguage = () => {
    const rFUforEMVCo = new TagLengthString();
    rFUforEMVCo.setTag("03");
    rFUforEMVCo.setValue("abcd");

    const merchantInformationLanguageValue = new MerchantInformationLanguage();
    merchantInformationLanguageValue.setLanguagePreference("ZH");
    merchantInformationLanguageValue.setMerchantName("北京");
    merchantInformationLanguageValue.setMerchantCity("最佳运输");
    merchantInformationLanguageValue.addRFUforEMVCo(rFUforEMVCo);

    const merchantInformationLanguage = new MerchantInformationLanguageTemplate();
    merchantInformationLanguage.setValue(merchantInformationLanguageValue);
    return merchantInformationLanguage;
  }

  const  getUnreserved = () => {

    const contextSpecificData = new TagLengthString();
    contextSpecificData.setTag("07");
    contextSpecificData.setValue("12345678");

    const value = new Unreserved();
    value.setGloballyUniqueIdentifier("A011223344998877");
    value.addContextSpecificData(contextSpecificData);

    const unreserved = new UnreservedTemplate();
    unreserved.setValue(value);
    unreserved.setTag("80");
    return unreserved;
  }

  describe('#testSuccessToString', () => {
    it('should generate string end with crc 32B3', () => {
      const additionalDataField = getAdditionalDataField();
      const merchantAccountInformationReservedAdditional = getMerchantAccountInformationReservedAdditional();
      const merchantAccountInformationReserved = getMerchantAccountInformationReserved();
      const merchantInformationLanguage = getMerchantInformationLanguage();
      const unreserved = getUnreserved();
      const rFUforEMVCo = new TagLengthString("65", "00");

      const merchantPresentMode = new MerchantPresentedMode();
      merchantPresentMode.setAdditionalDataField(additionalDataField);
      merchantPresentMode.setCountryCode("CN");
      merchantPresentMode.setMerchantCategoryCode("4111");
      merchantPresentMode.setMerchantCity("BEIJING");
      merchantPresentMode.setMerchantInformationLanguage(merchantInformationLanguage);
      merchantPresentMode.setMerchantName("BEST TRANSPORT");
      merchantPresentMode.setPayloadFormatIndicator("01");
      merchantPresentMode.setPointOfInitiationMethod("11");
      merchantPresentMode.setPostalCode("1234567");
      merchantPresentMode.setTipOrConvenienceIndicator("01");
      merchantPresentMode.setTransactionAmount("23.72");
      merchantPresentMode.setTransactionCurrency("156");
      merchantPresentMode.setValueOfConvenienceFeeFixed("500");
      merchantPresentMode.setValueOfConvenienceFeePercentage("5");
      merchantPresentMode.addMerchantAccountInformation(merchantAccountInformationReserved);
      merchantPresentMode.addMerchantAccountInformation(merchantAccountInformationReservedAdditional);
      merchantPresentMode.addRFUforEMVCo(rFUforEMVCo);
      merchantPresentMode.addUnreserved(unreserved);

      assert.equal(merchantPresentMode.toString(), "0002010102110204000426160004"
          + "hoge0104abcd520441115303156540523.725502015603500570155802CN5914BEST TRAN"
          + "SPORT6007BEIJING6107123456762950105123450205678900305098760405543210505ab"
          + "cde0605fghij0705klmno0805pqres0905tuvxy5010000110101i64280002ZH0102北京020"
          + "4最佳运输0304abcd65020080320016A011223344998877070812345678630432B3");
      })
  })

  describe('#testSuccessToStringWhenValueIsNull', () => {
    it("should generate EMPTY string", () => {
        const merchantPresentMode = new MerchantPresentedMode();
        merchantPresentMode.setAdditionalDataField(null);
        merchantPresentMode.setCountryCode(null);
        merchantPresentMode.setCRC(null);
        merchantPresentMode.setMerchantCategoryCode(null);
        merchantPresentMode.setMerchantCity(null);
        merchantPresentMode.setMerchantInformationLanguage(null);
        merchantPresentMode.setMerchantName(null);
        merchantPresentMode.setPayloadFormatIndicator(null);
        merchantPresentMode.setPointOfInitiationMethod(null);
        merchantPresentMode.setPostalCode(null);
        merchantPresentMode.setTipOrConvenienceIndicator(null);
        merchantPresentMode.setTransactionAmount(null);
        merchantPresentMode.setTransactionCurrency(null);
        merchantPresentMode.setValueOfConvenienceFeeFixed(null);
        merchantPresentMode.setValueOfConvenienceFeePercentage(null);

        assert.equal(merchantPresentMode.toString(), "");
    })
  })

  describe('#testSuccessToStringWhenValueIsEmpty', () => {
    it("should generate EMPTY string", () => {
        const merchantPresentMode = new MerchantPresentedMode();
        merchantPresentMode.setAdditionalDataField(new AdditionalDataFieldTemplate());
        merchantPresentMode.setCountryCode("");
        merchantPresentMode.setCRC("");
        merchantPresentMode.setMerchantCategoryCode("");
        merchantPresentMode.setMerchantCity("");
        merchantPresentMode.setMerchantInformationLanguage(new MerchantInformationLanguageTemplate());
        merchantPresentMode.setMerchantName("");
        merchantPresentMode.setPayloadFormatIndicator("");
        merchantPresentMode.setPointOfInitiationMethod("");
        merchantPresentMode.setPostalCode("");
        merchantPresentMode.setTipOrConvenienceIndicator("");
        merchantPresentMode.setTransactionAmount("");
        merchantPresentMode.setTransactionCurrency("");
        merchantPresentMode.setValueOfConvenienceFeeFixed("");
        merchantPresentMode.setValueOfConvenienceFeePercentage("");
        merchantPresentMode.addMerchantAccountInformation(new MerchantAccountInformationTemplate());
        merchantPresentMode.addRFUforEMVCo(new TagLengthString());
        merchantPresentMode.addUnreserved(new UnreservedTemplate());
        assert.equal(merchantPresentMode.toString(), "");
    })
  })
})