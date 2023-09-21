import { MerchantAccountInformation, TLV, TypeConstructor } from '../types';

export default class MerchantAccountInformationTemplate
  implements TLV<string, MerchantAccountInformation>
{
  #tag?: string;

  #value?: MerchantAccountInformation;

  constructor(tag?: string, value?: MerchantAccountInformation) {
    this.#tag = tag;
    this.#value = value;
  }

  get length(): number {
    return this.#value ? this.#value.toString().length : 0;
  }

  setTag(tag?: string) {
    this.#tag = tag;
  }

  get tag() {
    return this.#tag;
  }

  setValue(value?: MerchantAccountInformation) {
    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  getTypeValue<T extends MerchantAccountInformation>(clazz: TypeConstructor<T>): T | undefined {
    return this.#value instanceof clazz ? this.#value : undefined;
  }

  toString(): string {
    if (!this.#value) {
      return '';
    }

    const str = this.#value.toString();

    if (!str) {
      return '';
    }

    return this.#tag + String(str.length).padStart(2, '0') + str;
  }
}
