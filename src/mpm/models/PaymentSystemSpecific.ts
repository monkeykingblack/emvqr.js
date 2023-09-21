import { MerchantAccountInformationFieldCodes } from '../constant';
import TagLengthString from './TagLengthString';

export default class PaymentSystemSpecific {
  #globallyUniqueIdentifier?: TagLengthString;

  #paymentSystemSpecific: Map<string | undefined, TagLengthString> = new Map();

  get globallyUniqueIdentifier() {
    return this.#globallyUniqueIdentifier;
  }

  get paymentSystemSpecific() {
    return this.#paymentSystemSpecific;
  }

  setGloballyUniqueIdentifier(globallyUniqueIdentifier?: string, paymentSystem?: TagLengthString) {
    this.#globallyUniqueIdentifier = new TagLengthString(
      MerchantAccountInformationFieldCodes.ID_GLOBALLY_UNIQUE_IDENTIFIER,
      globallyUniqueIdentifier,
    );
    if (paymentSystem) {
      this.addPaymentSystemSpecific(paymentSystem);
    }
  }

  addPaymentSystemSpecific(tagLengthString: TagLengthString) {
    this.#paymentSystemSpecific.set(tagLengthString.tag, tagLengthString);
  }

  toString(): string {
    const builder: string[] = [];

    if (this.#globallyUniqueIdentifier) {
      builder.push(this.#globallyUniqueIdentifier.toString());
    }

    for (const entry of this.#paymentSystemSpecific) {
      if (entry[1].value) {
        builder.push(entry[1].toString());
      }
    }

    return builder.join('');
  }
}
