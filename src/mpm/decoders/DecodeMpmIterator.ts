import TLVUtils from '../../utils/TLVUtils';

export default class DecodeMpmIterator implements Iterator<string> {
  #current: number;

  readonly #max: number;

  readonly #source: string;

  constructor(source: string) {
    this.#current = 0;
    this.#max = source.length;
    this.#source = source;
  }

  hasNext(): boolean {
    if (this.#current >= this.#max) {
      return false;
    }

    const valueLength = TLVUtils.valueOfLength(this.#source, this.#current);

    return (
      this.#current + TLVUtils.ID_WORD_COUNT + TLVUtils.VALUE_LENGTH_WORD_COUNT + valueLength <=
      this.#max
    );
  }

  next(): IteratorResult<string> {
    const value = TLVUtils.chunk(this.#source, this.#current);

    this.#current += value.length;

    return { value, done: !this.hasNext() };
  }
}
