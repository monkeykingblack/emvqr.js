import { UnreservedTemplateFieldCodes } from '../constant';
import TagLengthString from './TagLengthString';

export default class Unreserved {
  #globallyUniqueIdentifier?: TagLengthString;

  #contextSpecificData: Map<string | undefined, TagLengthString> = new Map();

  constructor(globallyUniqueIdentifier?: string) {
    this.setGloballyUniqueIdentifier(globallyUniqueIdentifier);
  }

  get globallyUniqueIdentifier() {
    return this.#globallyUniqueIdentifier;
  }

  setGloballyUniqueIdentifier(globallyUniqueIdentifier?: string) {
    this.#globallyUniqueIdentifier = new TagLengthString(
      UnreservedTemplateFieldCodes.ID_GLOBALLY_UNIQUE_IDENTIFIER,
      globallyUniqueIdentifier,
    );
  }

  get contextSpecificData() {
    return this.#contextSpecificData;
  }

  addContextSpecificData(tagLengthString: TagLengthString) {
    this.#contextSpecificData.set(tagLengthString.tag, tagLengthString);
  }

  toString() {
    const builder: string[] = [];

    if (this.#globallyUniqueIdentifier) {
      builder.push(this.#globallyUniqueIdentifier.toString());
    }

    for (const entry of this.#contextSpecificData) {
      if (entry[1].value) {
        builder.push(entry[1].toString());
      }
    }

    return builder.join('');
  }
}
