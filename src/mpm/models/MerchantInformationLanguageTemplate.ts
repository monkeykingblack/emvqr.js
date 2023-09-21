import { MerchantPresentedModeCodes } from '../constant';
import { TLV } from '../types';
import MerchantInformationLanguage from './MerchantInformationLanguage';

export default class MerchantInformationLanguageTemplate
  implements TLV<string, MerchantInformationLanguage>
{
  #value?: MerchantInformationLanguage;

  setValue(value?: MerchantInformationLanguage) {
    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  get tag(): string {
    return MerchantPresentedModeCodes.ID_MERCHANT_INFORMATION_LANGUAGE_TEMPLATE;
  }

  get length(): number {
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

    return this.tag + String(str.length).padStart(2, '0') + str;
  }
}
