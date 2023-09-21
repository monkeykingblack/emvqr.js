import TagLengthString from './TagLengthString';

import { MerchantAccountInformation } from '../types';
import { MerchantAccountInformationFieldCodes } from '../constant';

export default class MerchantAccountInformationReservedAdditional
  implements MerchantAccountInformation
{
  #globallyUniqueIdentifier?: TagLengthString;

  #paymentNetworkSpecific: Map<string | undefined, TagLengthString> = new Map();

  constructor(globallyUniqueIdentifier?: string, paymentNetwork?: TagLengthString) {
    if (globallyUniqueIdentifier) {
      this.setGloballyUniqueIdentifier(globallyUniqueIdentifier, paymentNetwork);
    }
  }

  get globallyUniqueIdentifier() {
    return this.#globallyUniqueIdentifier;
  }

  get paymentNetworkSpecific() {
    return this.#paymentNetworkSpecific;
  }

  setGloballyUniqueIdentifier(
    globallyUniqueIdentifier: string,
    paymentNetwork?: TagLengthString,
  ): void {
    this.#globallyUniqueIdentifier = new TagLengthString(
      MerchantAccountInformationFieldCodes.ID_GLOBALLY_UNIQUE_IDENTIFIER,
      globallyUniqueIdentifier,
    );

    if (paymentNetwork) {
      this.addPaymentNetworkSpecific(paymentNetwork);
    }
  }

  addPaymentNetworkSpecific(paymentNetworkSpecific: TagLengthString) {
    this.#paymentNetworkSpecific.set(paymentNetworkSpecific.tag, paymentNetworkSpecific);
  }

  public toString() {
    const builder: string[] = [];

    if (this.#globallyUniqueIdentifier) {
      builder.push(this.#globallyUniqueIdentifier.toString());
    }

    for (const entry of this.#paymentNetworkSpecific) {
      if (entry[1].value) {
        builder.push(entry[1].toString());
      }
    }

    return builder.join('');
  }
}
