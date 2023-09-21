import { MerchantAccountInformation } from '../types';

export default class MerchantAccountInformationReserved implements MerchantAccountInformation {
  #value?: string;

  constructor(value?: string) {
    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  toString(): string {
    return this.#value ?? '';
  }
}
