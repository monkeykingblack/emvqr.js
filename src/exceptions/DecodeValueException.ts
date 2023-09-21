export default class DecodeValueException extends Error {
  constructor(public readonly value: string) {
    super(`Characters outside of the expected range Hex ''[0-9a-fA-F]''. Invalid value '${value}'`);
  }
}
