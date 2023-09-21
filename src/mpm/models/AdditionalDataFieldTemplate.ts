import { MerchantPresentedModeCodes } from '../constant';
import { TLV } from '../types';
import AdditionalDataField from './AdditionalDataField';

export default class AdditionalDataFieldTemplate implements TLV<string, AdditionalDataField> {
  #value?: AdditionalDataField;

  constructor(value?: AdditionalDataField) {
    this.#value = value;
  }

  get tag() {
    return MerchantPresentedModeCodes.ID_ADDITIONAL_DATA_FIELD_TEMPLATE;
  }

  setValue(value?: AdditionalDataField) {
    this.#value = value;
  }

  get value() {
    return this.#value;
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
