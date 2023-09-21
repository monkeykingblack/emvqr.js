import TagLengthString from './TagLengthString';
import PaymentSystemSpecificTemplate from './PaymentSystemSpecificTemplate';
import { AdditionalDataFieldCodes } from '../constant';

export default class AdditionalDataField {
  #billNumber?: TagLengthString;

  #mobileNumber?: TagLengthString;

  #storeLabel?: TagLengthString;

  #loyaltyNumber?: TagLengthString;

  #referenceLabel?: TagLengthString;

  #customerLabel?: TagLengthString;

  #terminalLabel?: TagLengthString;

  #purposeTransaction?: TagLengthString;

  #additionalConsumerDataRequest?: TagLengthString;

  #rFUforEMVCo: Map<string | undefined, TagLengthString> = new Map();

  // Payment System specific templates
  #paymentSystemSpecific: Map<string | undefined, PaymentSystemSpecificTemplate> = new Map();

  get billNumber() {
    return this.#billNumber;
  }

  get mobileNumber() {
    return this.#mobileNumber;
  }

  get storeLabel() {
    return this.#storeLabel;
  }

  get loyaltyNumber() {
    return this.#loyaltyNumber;
  }

  get referenceLabel() {
    return this.#referenceLabel;
  }

  get customerLabel() {
    return this.#customerLabel;
  }

  get terminalLabel() {
    return this.#terminalLabel;
  }

  get purposeTransaction() {
    return this.#purposeTransaction;
  }

  get additionalConsumerDataRequest() {
    return this.#additionalConsumerDataRequest;
  }

  get paymentSystemSpecific() {
    return this.#paymentSystemSpecific;
  }

  get rFUforEMVCo() {
    return this.#rFUforEMVCo;
  }

  setBillNumber(billNumber?: string) {
    this.#billNumber = new TagLengthString(AdditionalDataFieldCodes.ID_BILL_NUMBER, billNumber);
  }

  setMobileNumber(mobileNumber?: string) {
    this.#mobileNumber = new TagLengthString(
      AdditionalDataFieldCodes.ID_MOBILE_NUMBER,
      mobileNumber,
    );
  }

  setStoreLabel(storeLabel?: string) {
    this.#storeLabel = new TagLengthString(AdditionalDataFieldCodes.ID_STORE_LABEL, storeLabel);
  }

  setLoyaltyNumber(loyaltyNumber?: string) {
    this.#loyaltyNumber = new TagLengthString(
      AdditionalDataFieldCodes.ID_LOYALTY_NUMBER,
      loyaltyNumber,
    );
  }

  setReferenceLabel(referenceLabel?: string) {
    this.#referenceLabel = new TagLengthString(
      AdditionalDataFieldCodes.ID_REFERENCE_LABEL,
      referenceLabel,
    );
  }

  setCustomerLabel(customerLabel?: string) {
    this.#customerLabel = new TagLengthString(
      AdditionalDataFieldCodes.ID_CUSTOMER_LABEL,
      customerLabel,
    );
  }

  setTerminalLabel(terminalLabel?: string) {
    this.#terminalLabel = new TagLengthString(
      AdditionalDataFieldCodes.ID_TERMINAL_LABEL,
      terminalLabel,
    );
  }

  setPurposeTransaction(purposeTransaction?: string) {
    this.#purposeTransaction = new TagLengthString(
      AdditionalDataFieldCodes.ID_PURPOSE_TRANSACTION,
      purposeTransaction,
    );
  }

  setAdditionalConsumerDataRequest(additionalConsumerDataRequest?: string) {
    this.#additionalConsumerDataRequest = new TagLengthString(
      AdditionalDataFieldCodes.ID_ADDITIONAL_CONSUMER_DATA_REQUEST,
      additionalConsumerDataRequest,
    );
  }

  addRFUforEMVCo(rFUforEMVCo: TagLengthString) {
    this.#rFUforEMVCo.set(rFUforEMVCo.tag, rFUforEMVCo);
  }

  addPaymentSystemSpecific(paymentSystemSpecific: PaymentSystemSpecificTemplate) {
    this.#paymentSystemSpecific.set(paymentSystemSpecific.tag, paymentSystemSpecific);
  }

  toString(): string {
    const builder: string[] = [];

    if (this.#billNumber) {
      builder.push(this.#billNumber.toString());
    }

    if (this.#mobileNumber) {
      builder.push(this.#mobileNumber.toString());
    }

    if (this.#storeLabel) {
      builder.push(this.#storeLabel.toString());
    }

    if (this.#loyaltyNumber) {
      builder.push(this.#loyaltyNumber.toString());
    }

    if (this.#referenceLabel) {
      builder.push(this.#referenceLabel.toString());
    }

    if (this.#customerLabel) {
      builder.push(this.#customerLabel.toString());
    }

    if (this.#terminalLabel) {
      builder.push(this.#terminalLabel.toString());
    }

    if (this.#purposeTransaction) {
      builder.push(this.#purposeTransaction.toString());
    }

    if (this.#additionalConsumerDataRequest) {
      builder.push(this.#additionalConsumerDataRequest.toString());
    }

    for (const entry of this.#rFUforEMVCo) {
      if (entry[1].value) {
        builder.push(entry[1].toString());
      }
    }

    for (const entry of this.#paymentSystemSpecific) {
      if (entry[1].value) {
        builder.push(entry[1].toString());
      }
    }

    const str = builder.join('');

    if (!str) {
      return '';
    }

    return str;
  }
}
