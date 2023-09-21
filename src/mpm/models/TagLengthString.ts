import { TLV } from '../types';

export default class TagLengthString implements TLV<string, string> {
  #tag?: string;

  #value?: string;

  constructor(tag?: string, value?: string) {
    this.#tag = tag;
    this.#value = value;
  }

  setTag(tag?: string) {
    this.#tag = tag;
  }

  get tag() {
    return this.#tag;
  }

  setValue(value?: string) {
    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  get length() {
    return this.#value ? this.#value.toString().length : 0;
  }

  toString(): string {
    if (!this.#value) {
      return '';
    }

    return this.tag + String(this.#value.length).padStart(2, '0') + this.#value;
  }
}
