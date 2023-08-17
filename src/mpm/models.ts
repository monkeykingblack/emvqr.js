import {
  AdditionalDataFieldCodes,
  MerchantAccountInformationFieldCodes,
  MerchantInformationLanguageFieldCodes,
  MerchantPresentedModeCodes,
  UnreservedTemplateFieldCodes,
} from './constants';

import crc from '../crc';

interface TLV<T, V> {
  getTag(): T | undefined | null;
  getValue(): V | undefined | null;

  getLength(): number;
}

interface MerchantAccountInformation {
  toString(): string;
}

export class TagLengthString implements TLV<string, string> {
  #tag?: string  | null;

  #value?: string  | null;

  constructor(tag?: string | null, value?: string | null) {
    this.#tag = tag;
    this.#value = value;
  }

  setTag(tag?: string | null) {
    this.#tag = tag
  }

  getTag() {
    return this.#tag;
  }

  setValue(value?: string | null) {
    this.#value = value;
  }

  getValue() {
    return this.#value;
  }

  getLength() {
    return this.#value ? this.#value.toString().length : 0;
  }

  toString(): string {
    if (!this.#value) {
      return '';
    }

    return this.getTag() + String(this.#value.length).padStart(2, '0') + this.#value;
  }
}

export class MerchantAccountInformationReserved
  implements MerchantAccountInformation
{
  #value?: string;

  constructor(value?: string) {
    this.#value = value;
  }

  getValue() {
    return this.#value
  }

  toString(): string {
    return this.#value ?? '';
  }
}

export class MerchantAccountInformationReservedAdditional
  implements MerchantAccountInformation
{
  #globallyUniqueIdentifier?: TagLengthString;

  #paymentNetworkSpecific: Map<string | undefined | null, TagLengthString> = new Map();

  constructor(
    globallyUniqueIdentifier?: string | null,
    paymentNetwork?: TagLengthString | null,
  ) {
    if (globallyUniqueIdentifier) {
      this.setGloballyUniqueIdentifier(globallyUniqueIdentifier, paymentNetwork);
    }
  }

  setGloballyUniqueIdentifier(
    globallyUniqueIdentifier: string | null,
    paymentNetwork?: TagLengthString | null,
  ): void {
    this.#globallyUniqueIdentifier = new TagLengthString(
      MerchantAccountInformationFieldCodes.ID_GLOBALLY_UNIQUE_IDENTIFIER,
      globallyUniqueIdentifier,
    );

    if (paymentNetwork) {
      this.addPaymentNetworkSpecific(paymentNetwork);
    }
  }

  addPaymentNetworkSpecific(paymentNetworkSpecific: TagLengthString) {
    this.#paymentNetworkSpecific.set(paymentNetworkSpecific.getTag(), paymentNetworkSpecific);
  }

  public toString() {
    const builder: string[] = [];

    if (this.#globallyUniqueIdentifier) {
      builder.push(this.#globallyUniqueIdentifier.toString());
    }

    for (const entry of this.#paymentNetworkSpecific) {
      if (entry[1].getValue()) {
        builder.push(entry[1].toString());
      }
    }

    return builder.join('');
  }
}

export class MerchantAccountInformationTemplate
  implements TLV<string, MerchantAccountInformation>
{
  #tag?: string | null;

  #value?: MerchantAccountInformation | null;

  constructor(tag?: string | null, value?: MerchantAccountInformation | null) {
    this.#tag = tag;
    this.#value = value;
  }

  getLength(): number {
    return this.#value ? this.#value.toString().length : 0;
  }

  setTag(tag?: string | null) {
    this.#tag = tag
  }

  getTag() {
    return this.#tag;
  }

  setValue(value?: MerchantAccountInformation | null ) {
    this.#value = value
  }

  getValue() {
    return this.#value;
  }

  toString(): string {
    if(!this.#value) {
      return "";
    }

    const str = this.#value.toString();

    if(!str) {
      return ""
    }

    return this.#tag +  String(str.length).padStart(2, '0') + str;
  }
}

export class MerchantInformationLanguage {
  #languagePreference?: TagLengthString | null;

  #merchantName?: TagLengthString | null;

  #merchantCity?: TagLengthString | null;

  #rFUforEMVCo: Map<string | null | undefined, TagLengthString> = new Map();

  setLanguagePreference(languagePreference?: string | null) {
    this.#languagePreference = new TagLengthString(
      MerchantInformationLanguageFieldCodes.ID_LANGUAGE_PREFERENCE,
      languagePreference,
    );
  }

  setMerchantName(merchantName?: string | null) {
    this.#merchantName = new TagLengthString(
      MerchantInformationLanguageFieldCodes.ID_MERCHANT_NAME,
      merchantName,
    );
  }

  setMerchantCity(merchantCity?: string | null) {
    this.#merchantCity = new TagLengthString(
      MerchantInformationLanguageFieldCodes.ID_MERCHANT_CITY,
      merchantCity,
    );
  }

  addRFUforEMVCo(tagLengthString: TagLengthString) {
    this.#rFUforEMVCo.set(tagLengthString.getTag(), tagLengthString);
  }

  toString(): string {
    const builder: string[] = [];

    if (this.#languagePreference) {
      builder.push(this.#languagePreference.toString());
    }
    if (this.#merchantName) {
      builder.push(this.#merchantName.toString());
    }
    if (this.#merchantCity) {
      builder.push(this.#merchantCity.toString());
    }

    for (const entry of this.#rFUforEMVCo) {
      if (entry[1].getValue()) {
        builder.push(entry[1].toString());
      }
    }

    return builder.join('');
  }
}

export class MerchantInformationLanguageTemplate
  implements TLV<string, MerchantInformationLanguage>
{
  #value?: MerchantInformationLanguage | null;

  setValue(value?: MerchantInformationLanguage | null) {
    this.#value = value;
  }

  getValue() {
    return this.#value;
  }

  getTag(): string {
    return MerchantPresentedModeCodes.ID_MERCHANT_INFORMATION_LANGUAGE_TEMPLATE;
  }

  getLength(): number {
    return this.#value ? this.#value.toString().length : 0;
  }

  toString(): string {
    if (!this.#value) {
      return '';
    }

    const str = this.#value.toString();

    if (!str) {
      return '';
    }

    return this.getTag() + String(str.length).padStart(2,'0') + str;
  }
}

export class PaymentSystemSpecific {
  #globallyUniqueIdentifier?: TagLengthString | null;

  #paymentSystemSpecific: Map<string | null | undefined, TagLengthString> = new Map();

  setGloballyUniqueIdentifier(
    globallyUniqueIdentifier?: string,
    paymentSystem?: TagLengthString | null,
  ) {
    this.#globallyUniqueIdentifier = new TagLengthString(
      MerchantAccountInformationFieldCodes.ID_GLOBALLY_UNIQUE_IDENTIFIER,
      globallyUniqueIdentifier,
    );
    if (paymentSystem) {
      this.addPaymentSystemSpecific(paymentSystem);
    }
  }

  addPaymentSystemSpecific(tagLengthString: TagLengthString) {
    this.#paymentSystemSpecific.set(tagLengthString.getTag(), tagLengthString);
  }

  toString(): string {
    const builder: string[] = [];

    if (this.#globallyUniqueIdentifier) {
      builder.push(this.#globallyUniqueIdentifier.toString());
    }

    for (const entry of this.#paymentSystemSpecific) {
      if (entry[1].getValue()) {
        builder.push(entry[1].toString());
      }
    }

    return builder.join('');
  }
}

export class PaymentSystemSpecificTemplate
  implements TLV<string, PaymentSystemSpecific>
{
  #tag?: string | null;

  #value?: PaymentSystemSpecific | null;

  constructor(tag?: string | null, value?:PaymentSystemSpecific) {
    this.#tag = tag
    this.#value = value;
  }

  setTag(tag?: string | null) {
    this.#tag = tag
  }
  
  getTag() {
    return this.#tag;
  }
  
  setValue(value?: PaymentSystemSpecific | null) {
    this.#value = value
  }
  
  getValue() {
    return this.#value;
  }

  getLength(): number {
    return this.#value ? this.#value.toString().length : 0;
  }

  toString(): string {
    if (!this.#value) {
      return '';
    }

    const str: string = this.#value.toString();

    if (!str) {
      return '';
    }

    return this.#tag + String(str.length).padStart(2, '0') + str;
  }
}

export class AdditionalDataField {
  #billNumber?: TagLengthString | null;

  #mobileNumber?: TagLengthString | null;

  #storeLabel?: TagLengthString | null;

  #loyaltyNumber?: TagLengthString | null;

  #referenceLabel?: TagLengthString | null;

  #customerLabel?: TagLengthString | null;

  #terminalLabel?: TagLengthString | null;

  #purposeTransaction?: TagLengthString | null;

  #additionalConsumerDataRequest?: TagLengthString | null;

  #rFUforEMVCo: Map<string | null | undefined, TagLengthString> = new Map();

  // Payment System specific templates
  #paymentSystemSpecific: Map<string | null | undefined, PaymentSystemSpecificTemplate> =
    new Map();

  get billNumber() {
    return this.#billNumber;
  }

  get mobileNumber() {
    return this.#mobileNumber;
  }

  get storeLabel() {
    return this.#storeLabel;
  }

  get loyaltyNumber() {
    return this.#loyaltyNumber;
  }

  get referenceLabel() {
    return this.#referenceLabel;
  }

  get customerLabel() {
    return this.#customerLabel;
  }

  get terminalLabel() {
    return this.#terminalLabel;
  }

  get purposeTransaction() {
    return this.#purposeTransaction;
  }

  get additionalConsumerDataRequest() {
    return this.#additionalConsumerDataRequest;
  }

  setBillNumber(billNumber?: string | null) {
    this.#billNumber = new TagLengthString(
      AdditionalDataFieldCodes.ID_BILL_NUMBER,
      billNumber,
    );
  }

  setMobileNumber(mobileNumber?: string | null) {
    this.#mobileNumber = new TagLengthString(
      AdditionalDataFieldCodes.ID_MOBILE_NUMBER,
      mobileNumber,
    );
  }

  setStoreLabel(storeLabel?: string | null) {
    this.#storeLabel = new TagLengthString(
      AdditionalDataFieldCodes.ID_STORE_LABEL,
      storeLabel,
    );
  }

  setLoyaltyNumber(loyaltyNumber?: string | null) {
    this.#loyaltyNumber = new TagLengthString(
      AdditionalDataFieldCodes.ID_LOYALTY_NUMBER,
      loyaltyNumber,
    );
  }

  setReferenceLabel(referenceLabel?: string | null) {
    this.#referenceLabel = new TagLengthString(
      AdditionalDataFieldCodes.ID_REFERENCE_LABEL,
      referenceLabel,
    );
  }

  setCustomerLabel(customerLabel?: string | null) {
    this.#customerLabel = new TagLengthString(
      AdditionalDataFieldCodes.ID_CUSTOMER_LABEL,
      customerLabel,
    );
  }

  setTerminalLabel(terminalLabel?: string | null) {
    this.#terminalLabel = new TagLengthString(
      AdditionalDataFieldCodes.ID_TERMINAL_LABEL,
      terminalLabel,
    );
  }

  setPurposeTransaction(purposeTransaction?: string | null) {
    this.#purposeTransaction = new TagLengthString(
      AdditionalDataFieldCodes.ID_PURPOSE_TRANSACTION,
      purposeTransaction,
    );
  }

  setAdditionalConsumerDataRequest(additionalConsumerDataRequest?: string | null) {
    this.#additionalConsumerDataRequest = new TagLengthString(
      AdditionalDataFieldCodes.ID_ADDITIONAL_CONSUMER_DATA_REQUEST,
      additionalConsumerDataRequest,
    );
  }

  addRFUforEMVCo(rFUforEMVCo: TagLengthString) {
    this.#rFUforEMVCo.set(rFUforEMVCo.getTag(), rFUforEMVCo);
  }

  addPaymentSystemSpecific(
    paymentSystemSpecific: PaymentSystemSpecificTemplate,
  ) {
    this.#paymentSystemSpecific.set(
      paymentSystemSpecific.getTag(),
      paymentSystemSpecific,
    );
  }

  toString(): string {
    const builder: string[] = [];

    if(this.#billNumber) {
      builder.push(this.#billNumber.toString())
    }

    if(this.#mobileNumber) {
      builder.push(this.#mobileNumber.toString())
    }

    if(this.#storeLabel) {
      builder.push(this.#storeLabel.toString())
    }

    if(this.#loyaltyNumber) {
      builder.push(this.#loyaltyNumber.toString())
    }

    if(this.#referenceLabel) {
      builder.push(this.#referenceLabel.toString())
    }

    if(this.#customerLabel) {
      builder.push(this.#customerLabel.toString())
    }

    if(this.#terminalLabel) {
      builder.push(this.#terminalLabel.toString())
    }

    if(this.#purposeTransaction) {
      builder.push(this.#purposeTransaction.toString())
    }

    if(this.#additionalConsumerDataRequest) {
      builder.push(this.#additionalConsumerDataRequest.toString())
    }

    for (const entry of this.#rFUforEMVCo) {
      if(entry[1].getValue()) {
        builder.push(entry[1].toString())
      }
    }

    for (const entry of this.#paymentSystemSpecific) {
      if(entry[1].getValue()) {
        builder.push(entry[1].toString())
      }
    }

    const str = builder.join("")
    
    if(!str) {
      return ""
    }

    return str
  }
}

export class AdditionalDataFieldTemplate
  implements TLV<string, AdditionalDataField>
{
  #value?: AdditionalDataField | null;

  constructor(value?: AdditionalDataField | null) {
    this.#value = value
  }

  getTag() {
    return MerchantPresentedModeCodes.ID_ADDITIONAL_DATA_FIELD_TEMPLATE;
  }

  setValue(value?: AdditionalDataField | null) {
    this.#value = value
  }

  getValue() {
    return this.#value;
  }

  getLength(): number {
    return this.#value ? this.#value.toString().length : 0;
  }

  toString(): string {
    if (!this.#value) {
      return '';
    }

    const str = this.#value.toString();

    if (!str) {
      return '';
    }

    return this.getTag() + String(str.length).padStart(2, '0') + str;
  }
}

export class Unreserved  {

  #globallyUniqueIdentifier?: TagLengthString;

  #contextSpecificData: Map<string | undefined | null, TagLengthString> = new Map();

  constructor(globallyUniqueIdentifier?: string | null) {
    this.setGloballyUniqueIdentifier(globallyUniqueIdentifier);
  }

  getGloballyUniqueIdentifier() {
    return this.#globallyUniqueIdentifier
  }

  setGloballyUniqueIdentifier(globallyUniqueIdentifier?: string | null) {
    this.#globallyUniqueIdentifier = new TagLengthString(UnreservedTemplateFieldCodes.ID_GLOBALLY_UNIQUE_IDENTIFIER, globallyUniqueIdentifier);
  }

  addContextSpecificData(tagLengthString: TagLengthString) {
    this.#contextSpecificData.set(tagLengthString.getTag(), tagLengthString);
  }

  toString() {
    const builder: string[] = [];

    if(this.#globallyUniqueIdentifier) {
      builder.push(this.#globallyUniqueIdentifier.toString())
    }

    for (const entry of this.#contextSpecificData) {
      if(entry[1].getValue()) {
        builder.push(entry[1].toString())
      }
    }

    return builder.join("");
  }
}

export class UnreservedTemplate implements TLV<string, Unreserved> {
  #tag?: string | null;

  #value?: Unreserved | null;

  constructor(tag?: string | null, value?: string | null) {
    this.setTag(tag);
    this.setValue(new Unreserved(value));
  }

  setTag(tag?: string | null) {
    this.#tag = tag
  }
  
  getTag() {
    return this.#tag;
  }

  setValue(value?: Unreserved | null) {
    this.#value = value
  }

  getValue() {
    return this.#value;
  }

  getLength(): number {
    return this.#value ? this.#value?.toString().length : 0;
  }


  toString() {

    if(!this.#value) {
      return "";
    }
    const str = this.#value.toString();

    if (!str) {
      return "";
    }

    return this.#tag + String(str.length).padStart(2, '0') +  str;
  }
}

export class MerchantPresentedMode {
  #payloadFormatIndicator?: TagLengthString | null;
  
  #pointOfInitiationMethod?: TagLengthString | null;

  #merchantCategoryCode?: TagLengthString | null;

  #transactionCurrency?: TagLengthString | null;

  #transactionAmount?: TagLengthString | null;

  #tipOrConvenienceIndicator?: TagLengthString | null;

  #valueOfConvenienceFeeFixed?: TagLengthString | null;

  #valueOfConvenienceFeePercentage?: TagLengthString | null;

  #countryCode?: TagLengthString | null;

  #merchantName?: TagLengthString | null;

  #merchantCity?: TagLengthString | null;

  #postalCode?: TagLengthString | null;

  #crc?: TagLengthString | null;

  #merchantInformationLanguage?: MerchantInformationLanguageTemplate | null;

  #additionalDataField?: AdditionalDataFieldTemplate | null;

  #merchantAccountInformation: Map<string | undefined | null, MerchantAccountInformationTemplate> = new Map()

  #rFUforEMVCo: Map<string | undefined | null, TagLengthString> = new Map()

  #unreserveds: Map<string | undefined | null, UnreservedTemplate> = new Map()

  get payloadFormatIndicator() {
    return this.#payloadFormatIndicator;
  }

  get pointOfInitiationMethod() {
    return this.#pointOfInitiationMethod;
  }

  get merchantCategoryCode() {
    return this.#merchantCategoryCode;
  }

  get transactionCurrency() {
    return this.#transactionCurrency;
  }

  get transactionAmount() {
    return this.#transactionAmount;
  }

  get tipOrConvenienceIndicator() {
    return this.#tipOrConvenienceIndicator;
  }

  get valueOfConvenienceFeeFixed() {
    return this.#valueOfConvenienceFeeFixed;
  }

  get valueOfConvenienceFeePercentage() {
    return this.#valueOfConvenienceFeePercentage;
  }

  get countryCode() {
    return this.#countryCode;
  }

  get merchantName() {
    return this.#merchantName;
  }

  get merchantCity() {
    return this.#merchantCity;
  }

  get postalCode() {
    return this.#postalCode;
  }

  get crc() {
    return this.#crc;
  }

  get merchantInformationLanguage() {
    return this.#merchantInformationLanguage;
  }

  get additionalDataField() {
    return this.#additionalDataField;
  }


  setPayloadFormatIndicator(payloadFormatIndicator?: string | null) {
    this.#payloadFormatIndicator = new TagLengthString(
      MerchantPresentedModeCodes.ID_PAYLOAD_FORMAT_INDICATOR,
      payloadFormatIndicator,
    );
  }
  
  setPointOfInitiationMethod(pointOfInitiationMethod?: string | null) {
    this.#pointOfInitiationMethod = new TagLengthString(
      MerchantPresentedModeCodes.ID_POINT_OF_INITIATION_METHOD,
      pointOfInitiationMethod,
    );
  }

  setMerchantCategoryCode(merchantCategoryCode?: string | null) {
    this.#merchantCategoryCode = new TagLengthString(
      MerchantPresentedModeCodes.ID_MERCHANT_CATEGORY_CODE,
      merchantCategoryCode,
    );
  }

  setTransactionCurrency(transactionCurrency?: string | null) {
    this.#transactionCurrency = new TagLengthString(
      MerchantPresentedModeCodes.ID_TRANSACTION_CURRENCY,
      transactionCurrency,
    );
  }

  setTransactionAmount(transactionAmount?: string | null) {
    this.#transactionAmount = new TagLengthString(
      MerchantPresentedModeCodes.ID_TRANSACTION_AMOUNT,
      transactionAmount,
    );
  }

  setTipOrConvenienceIndicator(tipOrConvenienceIndicator?: string | null) {
    this.#tipOrConvenienceIndicator = new TagLengthString(
      MerchantPresentedModeCodes.ID_TIP_OR_CONVENIENCE_INDICATOR,
      tipOrConvenienceIndicator,
    );
  }

  setValueOfConvenienceFeeFixed(valueOfConvenienceFeeFixed?: string | null) {
    this.#valueOfConvenienceFeeFixed = new TagLengthString(
      MerchantPresentedModeCodes.ID_VALUE_OF_CONVENIENCE_FEE_FIXED,
      valueOfConvenienceFeeFixed,
    );
  }

  setValueOfConvenienceFeePercentage(valueOfConvenienceFeePercentage?: string | null) {
    this.#valueOfConvenienceFeePercentage = new TagLengthString(
      MerchantPresentedModeCodes.ID_VALUE_OF_CONVENIENCE_FEE_PERCENTAGE,
      valueOfConvenienceFeePercentage,
    );
  }

  setCountryCode(countryCode?: string | null) {
    this.#countryCode = new TagLengthString(
      MerchantPresentedModeCodes.ID_COUNTRY_CODE,
      countryCode,
    );
  }

  setMerchantName(merchantName?: string | null) {
    this.#merchantName = new TagLengthString(
      MerchantPresentedModeCodes.ID_MERCHANT_NAME,
      merchantName,
    );
  }

  setMerchantCity(merchantCity?: string | null) {
    this.#merchantCity = new TagLengthString(
      MerchantPresentedModeCodes.ID_MERCHANT_CITY,
      merchantCity,
    );
  }

  setPostalCode(postalCode?: string | null) {
    this.#postalCode = new TagLengthString(
      MerchantPresentedModeCodes.ID_POSTAL_CODE,
      postalCode,
    );
  }

  setCRC(crc?: string | null) {
    this.#crc = new TagLengthString(MerchantPresentedModeCodes.ID_CRC, crc);
  }

  setMerchantInformationLanguage(
    merchantAccountInformation?: MerchantInformationLanguageTemplate | null,
  ) {
    this.#merchantInformationLanguage = merchantAccountInformation;
  }

  setAdditionalDataField(additionalDataField?: AdditionalDataFieldTemplate | null) {
    this.#additionalDataField = additionalDataField;
  }

  addMerchantAccountInformation(merchantAccountInformation: MerchantAccountInformationTemplate) {
    this.#merchantAccountInformation.set(merchantAccountInformation.getTag(), merchantAccountInformation);
  }

  addRFUforEMVCo(rFUforEMVCo: TagLengthString) {
    this.#rFUforEMVCo.set(rFUforEMVCo.getTag(), rFUforEMVCo);
  }

  addUnreserved(unreserved: UnreservedTemplate) {
    this.#unreserveds.set(unreserved.getTag(), unreserved);
  }

  toBase64(): string {
    return btoa(toString());
  }

  toString(): string {
    const builder: string[] = [this.toStringWithoutCrc16()];

    if (!builder.join('')) {
      return '';
    }

    const crc16 = crc(builder.join(''));

    builder.push(crc16.toUpperCase());
    return builder.join('');
  }

  toStringWithoutCrc16(): string {
    const builder: string[] = [];

    if (this.#payloadFormatIndicator) {
      builder.push(this.#payloadFormatIndicator.toString());
    }

    if (this.#pointOfInitiationMethod) {
      builder.push(this.#pointOfInitiationMethod.toString());
    }

    for (const entry of this.#merchantAccountInformation) {
      if(entry[1].getValue()) {
        builder.push(entry[1].toString())
      }
    }

    if (this.#merchantCategoryCode) {
      builder.push(this.#merchantCategoryCode.toString());
    }

    if (this.#transactionCurrency) {
      builder.push(this.#transactionCurrency.toString());
    }
    if (this.#transactionAmount) {
      builder.push(this.#transactionAmount.toString());
    }
    if (this.#tipOrConvenienceIndicator) {
      builder.push(this.#tipOrConvenienceIndicator.toString());
    }
    if (this.#valueOfConvenienceFeeFixed) {
      builder.push(this.#valueOfConvenienceFeeFixed.toString());
    }
    if (this.#valueOfConvenienceFeePercentage) {
      builder.push(this.#valueOfConvenienceFeePercentage.toString());
    }
    if (this.#countryCode) {
      builder.push(this.#countryCode.toString());
    }
    if (this.#merchantName) {
      builder.push(this.#merchantName.toString());
    }
    if (this.#merchantCity) {
      builder.push(this.#merchantCity.toString());
    }
    if (this.#postalCode) {
      builder.push(this.#postalCode.toString());
    }
    if (this.#additionalDataField) {
      builder.push(this.#additionalDataField.toString());
    }
    if (this.#merchantInformationLanguage) {
      builder.push(this.#merchantInformationLanguage.toString());
    }

    for (const entry of this.#rFUforEMVCo) {
      if(entry[1].getValue()) {
        builder.push(entry[1].toString())
      }
    }

    for (const entry of this.#unreserveds) {
      if(entry[1].getValue()) {
        builder.push(entry[1].toString())
      }
    }
    
    if (!builder.join('')) {
      return '';
    }

    builder.push(`${MerchantPresentedModeCodes.ID_CRC}04`);

    return builder.join('');
  }
}
