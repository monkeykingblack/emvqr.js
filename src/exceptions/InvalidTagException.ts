export default class InvalidTagException extends Error {
  constructor(
    scope: string,
    public readonly tag: string,
    public readonly value: string,
  ) {
    super(`Scope "${scope}" invalid "${tag}" tag`);
  }
}
