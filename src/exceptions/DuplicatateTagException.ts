export default class DuplicateTagException extends Error {
  constructor(
    scope: string,
    public readonly tag: string,
    public readonly value: string,
  ) {
    super(`Scope "${scope}" informed already contains "${tag}" tag`);
  }
}
