import { TLV } from '../types';
import Unreserved from './Unreserved';

export default class UnreservedTemplate implements TLV<string, Unreserved> {
  #tag?: string;

  #value?: Unreserved;

  constructor(tag?: string, value?: string) {
    this.setTag(tag);
    this.setValue(new Unreserved(value));
  }

  setTag(tag?: string) {
    this.#tag = tag;
  }

  get tag() {
    return this.#tag;
  }

  setValue(value?: Unreserved) {
    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  get length(): number {
    return this.#value ? this.#value?.toString().length : 0;
  }

  toString() {
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
