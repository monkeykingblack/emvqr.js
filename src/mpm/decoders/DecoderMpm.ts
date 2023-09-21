/* eslint-disable no-use-before-define */
import { TypeConstructor } from '../types';
import DecodeMpmIterator from './DecodeMpmIterator';

export default abstract class DecoderMpm<T> {
  iterator: Iterator<string>;

  private static MAP_DECODERS = new Map<TypeConstructor<unknown>, DecoderMpmConstructor<any>>();

  static getDecoder<T>(clazz: TypeConstructor<T>): DecoderMpmConstructor<T> | undefined {
    return this.MAP_DECODERS.get(clazz);
  }

  static registerDecoder(type: TypeConstructor<unknown>, clazz: DecoderMpmConstructor<any>) {
    this.MAP_DECODERS.set(type, clazz);
  }

  constructor(source: string) {
    this.iterator = new DecodeMpmIterator(source);
  }

  protected abstract decode(): T;

  static decode<T>(source: string, clazz: TypeConstructor<T>): T {
    const ParserClass = DecoderMpm.getDecoder(clazz);

    if (!ParserClass) {
      throw new Error('');
    }

    const parser = new ParserClass(source);

    return parser.decode();
  }
}

export interface DecoderMpmConstructor<T> {
  new (source: string): DecoderMpm<T>;
}
