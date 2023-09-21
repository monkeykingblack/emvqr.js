import { TLV } from '../types';
import PaymentSystemSpecific from './PaymentSystemSpecific';

export default class PaymentSystemSpecificTemplate implements TLV<string, PaymentSystemSpecific> {
  #tag?: string;

  #value?: PaymentSystemSpecific;

  constructor(tag?: string, value?: PaymentSystemSpecific) {
    this.#tag = tag;
    this.#value = value;
  }

  setTag(tag?: string) {
    this.#tag = tag;
  }

  get tag() {
    return this.#tag;
  }

  setValue(value?: PaymentSystemSpecific) {
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

    const str: string = this.#value.toString();

    if (!str) {
      return '';
    }

    return this.#tag + String(str.length).padStart(2, '0') + str;
  }
}
