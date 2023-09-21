export interface TypeConstructor<T> {
  new (): T;
}

export interface TLV<T, V> {
  get tag(): T | undefined | null;
  get value(): V | undefined | null;

  get length(): number;
}

export interface MerchantAccountInformation {
  toString(): string;
}

export type ExtractFunctionKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]-?: T[P] extends Function ? P : never;
}[keyof T];
