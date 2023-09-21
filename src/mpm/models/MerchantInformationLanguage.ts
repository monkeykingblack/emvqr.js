import { MerchantInformationLanguageFieldCodes } from '../constant';
import TagLengthString from './TagLengthString';

export default class MerchantInformationLanguage {
  #languagePreference?: TagLengthString;

  #merchantName?: TagLengthString;

  #merchantCity?: TagLengthString;

  #rFUforEMVCo: Map<string | undefined, TagLengthString> = new Map();

  get languagePreference() {
    return this.#languagePreference;
  }

  get merchantName() {
    return this.#merchantName;
  }

  get merchantCity() {
    return this.#merchantCity;
  }

  get rFUforEMVCo() {
    return this.#rFUforEMVCo;
  }

  setLanguagePreference(languagePreference?: string) {
    this.#languagePreference = new TagLengthString(
      MerchantInformationLanguageFieldCodes.ID_LANGUAGE_PREFERENCE,
      languagePreference,
    );
  }

  setMerchantName(merchantName?: string) {
    this.#merchantName = new TagLengthString(
      MerchantInformationLanguageFieldCodes.ID_MERCHANT_NAME,
      merchantName,
    );
  }

  setMerchantCity(merchantCity?: string) {
    this.#merchantCity = new TagLengthString(
      MerchantInformationLanguageFieldCodes.ID_MERCHANT_CITY,
      merchantCity,
    );
  }

  addRFUforEMVCo(tagLengthString: TagLengthString) {
    this.#rFUforEMVCo.set(tagLengthString.tag, tagLengthString);
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
      if (entry[1].value) {
        builder.push(entry[1].toString());
      }
    }

    return builder.join('');
  }
}
