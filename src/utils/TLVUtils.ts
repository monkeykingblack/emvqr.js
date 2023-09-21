export default class TLVUtils {
  public static readonly ID_WORD_COUNT = 2;

  public static readonly VALUE_LENGTH_WORD_COUNT = 2;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static valueOfTag(source: string, from = 0) {
    const start = from;
    const end = start + this.ID_WORD_COUNT;

    return source.substring(start, end);
  }

  static valueOfLength(source: string, from = 0) {
    const start = from + this.ID_WORD_COUNT;
    const end = start + this.VALUE_LENGTH_WORD_COUNT;

    return parseInt(source.substring(start, end), 10);
  }

  static valueOf(source: string, from = 0) {
    const start = from + this.ID_WORD_COUNT + this.VALUE_LENGTH_WORD_COUNT;
    const end = start + this.valueOfLength(source, from);

    return source.substring(start, end);
  }

  static chunk(source: string, from: number) {
    const start = from + this.ID_WORD_COUNT + this.VALUE_LENGTH_WORD_COUNT;
    const end = start + this.valueOfLength(source, from);

    return source.substring(from, end);
  }
}
