import TagLengthString from './TagLengthString';
import MerchantInformationLanguageTemplate from './MerchantInformationLanguageTemplate';
import AdditionalDataFieldTemplate from './AdditionalDataFieldTemplate';
import MerchantAccountInformationTemplate from './MerchantAccountInformationTemplate';
import UnreservedTemplate from './UnreservedTemplate';

import { MerchantPresentedModeCodes } from '../constant';
import crc from '../../crc';

export default class MerchantPresentedMode {
  #payloadFormatIndicator?: TagLengthString;

  #pointOfInitiationMethod?: TagLengthString;

  #merchantCategoryCode?: TagLengthString;

  #transactionCurrency?: TagLengthString;

  #transactionAmount?: TagLengthString;

  #tipOrConvenienceIndicator?: TagLengthString;

  #valueOfConvenienceFeeFixed?: TagLengthString;

  #valueOfConvenienceFeePercentage?: TagLengthString;

  #countryCode?: TagLengthString;

  #merchantName?: TagLengthString;

  #merchantCity?: TagLengthString;

  #postalCode?: TagLengthString;

  #crc?: TagLengthString;

  #merchantInformationLanguage?: MerchantInformationLanguageTemplate;

  #additionalDataField?: AdditionalDataFieldTemplate;

  #merchantAccountInformation: Map<string | undefined, MerchantAccountInformationTemplate> =
    new Map();

  #rFUforEMVCo: Map<string | undefined, TagLengthString> = new Map();

  #unreserveds: Map<string | undefined, UnreservedTemplate> = new Map();

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

  get CRC() {
    return this.#crc;
  }

  get merchantInformationLanguage() {
    return this.#merchantInformationLanguage;
  }

  get additionalDataField() {
    return this.#additionalDataField;
  }

  get unreserveds() {
    return this.#unreserveds;
  }

  get RFUforEMVCo() {
    return this.#rFUforEMVCo;
  }

  get merchantAccountInformation() {
    return this.#merchantAccountInformation;
  }

  setPayloadFormatIndicator(payloadFormatIndicator?: string) {
    this.#payloadFormatIndicator = new TagLengthString(
      MerchantPresentedModeCodes.ID_PAYLOAD_FORMAT_INDICATOR,
      payloadFormatIndicator,
    );
  }

  setPointOfInitiationMethod(pointOfInitiationMethod?: string) {
    this.#pointOfInitiationMethod = new TagLengthString(
      MerchantPresentedModeCodes.ID_POINT_OF_INITIATION_METHOD,
      pointOfInitiationMethod,
    );
  }

  setMerchantCategoryCode(merchantCategoryCode?: string) {
    this.#merchantCategoryCode = new TagLengthString(
      MerchantPresentedModeCodes.ID_MERCHANT_CATEGORY_CODE,
      merchantCategoryCode,
    );
  }

  setTransactionCurrency(transactionCurrency?: string) {
    this.#transactionCurrency = new TagLengthString(
      MerchantPresentedModeCodes.ID_TRANSACTION_CURRENCY,
      transactionCurrency,
    );
  }

  setTransactionAmount(transactionAmount?: string) {
    this.#transactionAmount = new TagLengthString(
      MerchantPresentedModeCodes.ID_TRANSACTION_AMOUNT,
      transactionAmount,
    );
  }

  setTipOrConvenienceIndicator(tipOrConvenienceIndicator?: string) {
    this.#tipOrConvenienceIndicator = new TagLengthString(
      MerchantPresentedModeCodes.ID_TIP_OR_CONVENIENCE_INDICATOR,
      tipOrConvenienceIndicator,
    );
  }

  setValueOfConvenienceFeeFixed(valueOfConvenienceFeeFixed?: string) {
    this.#valueOfConvenienceFeeFixed = new TagLengthString(
      MerchantPresentedModeCodes.ID_VALUE_OF_CONVENIENCE_FEE_FIXED,
      valueOfConvenienceFeeFixed,
    );
  }

  setValueOfConvenienceFeePercentage(valueOfConvenienceFeePercentage?: string) {
    this.#valueOfConvenienceFeePercentage = new TagLengthString(
      MerchantPresentedModeCodes.ID_VALUE_OF_CONVENIENCE_FEE_PERCENTAGE,
      valueOfConvenienceFeePercentage,
    );
  }

  setCountryCode(countryCode?: string) {
    this.#countryCode = new TagLengthString(
      MerchantPresentedModeCodes.ID_COUNTRY_CODE,
      countryCode,
    );
  }

  setMerchantName(merchantName?: string) {
    this.#merchantName = new TagLengthString(
      MerchantPresentedModeCodes.ID_MERCHANT_NAME,
      merchantName,
    );
  }

  setMerchantCity(merchantCity?: string) {
    this.#merchantCity = new TagLengthString(
      MerchantPresentedModeCodes.ID_MERCHANT_CITY,
      merchantCity,
    );
  }

  setPostalCode(postalCode?: string) {
    this.#postalCode = new TagLengthString(MerchantPresentedModeCodes.ID_POSTAL_CODE, postalCode);
  }

  setCRC(crc?: string) {
    this.#crc = new TagLengthString(MerchantPresentedModeCodes.ID_CRC, crc);
  }

  setMerchantInformationLanguage(merchantAccountInformation?: MerchantInformationLanguageTemplate) {
    this.#merchantInformationLanguage = merchantAccountInformation;
  }

  setAdditionalDataField(additionalDataField?: AdditionalDataFieldTemplate) {
    this.#additionalDataField = additionalDataField;
  }

  addMerchantAccountInformation(merchantAccountInformation: MerchantAccountInformationTemplate) {
    this.#merchantAccountInformation.set(
      merchantAccountInformation.tag,
      merchantAccountInformation,
    );
  }

  addRFUforEMVCo(rFUforEMVCo: TagLengthString) {
    this.#rFUforEMVCo.set(rFUforEMVCo.tag, rFUforEMVCo);
  }

  addUnreserved(unreserved: UnreservedTemplate) {
    this.#unreserveds.set(unreserved.tag, unreserved);
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
      if (entry[1].value) {
        builder.push(entry[1].toString());
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
      if (entry[1].value) {
        builder.push(entry[1].toString());
      }
    }

    for (const entry of this.#unreserveds) {
      if (entry[1].value) {
        builder.push(entry[1].toString());
      }
    }

    if (!builder.join('')) {
      return '';
    }

    builder.push(`${MerchantPresentedModeCodes.ID_CRC}04`);

    return builder.join('');
  }
}
