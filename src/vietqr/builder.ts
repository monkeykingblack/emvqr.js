import Bank from "./bank"

import {Country, Currency} from "../isos"
import {PointOfInitiationMethod, MerchantPresentedMode, MerchantAccountInformationReservedAdditional, MerchantAccountInformationTemplate, AdditionalDataFieldTemplate, AdditionalDataField, TagLengthString} from "../mpm"

export class Consumer {
  constructor(
    public bankBin: string,
    public bankNumber: string,
    public currency: string,
    public country: string,
    public amount?: number | string,
    public message?: string
  ) {}
}

export class VietQRBuilder {
  #merchantPresentMode: MerchantPresentedMode;

  #vietQRMerchantInformation: MerchantAccountInformationReservedAdditional;

  constructor(public readonly consumer: Consumer) {
    this.#merchantPresentMode = new MerchantPresentedMode()
    this.#vietQRMerchantInformation = new MerchantAccountInformationReservedAdditional();
    this.#vietQRMerchantInformation.setGloballyUniqueIdentifier("A000000727")
    this.#merchantPresentMode.addMerchantAccountInformation(new MerchantAccountInformationTemplate("38", this.#vietQRMerchantInformation))
    this.#merchantPresentMode.setPayloadFormatIndicator('01')
  }

  toString() {
    console.log(this.consumer)
    const currency = Currency.entryOf(this.consumer.currency);

    if(!currency) {
      throw new TypeError(`Currency ${this.consumer.currency} not available. Please refer to Currency enum`);
    }

    this.#merchantPresentMode.setTransactionCurrency(currency.number)

    const country = Country.entryOf(this.consumer.country);

    if(!country) {
      throw new TypeError(`Country ${this.consumer.country} not available. Please refer to Country enum`);
    }

    this.#merchantPresentMode.setCountryCode(country.alpha2);

    const bank = Bank.entryOf(this.consumer.bankBin);

    if(!bank) {
      throw new TypeError(`Bank ${this.consumer.bankBin} not available. Please refer to VNBank enum`);
    }
    
    this.#vietQRMerchantInformation.addPaymentNetworkSpecific(new TagLengthString("01", new TagLengthString('00', bank.bin).toString() + new TagLengthString('01', this.consumer.bankNumber).toString()))
    this.#vietQRMerchantInformation.addPaymentNetworkSpecific(new TagLengthString("02", "QRIBFTTA"))

    if(this.consumer.amount) {
      try {
        const amount = parseFloat(this.consumer.amount.toString());
        if(amount) {
          this.#merchantPresentMode.setPointOfInitiationMethod(PointOfInitiationMethod.DYNAMIC)
          this.#merchantPresentMode.setTransactionAmount(amount.toString())
        }
      } catch {
        throw new Error(`Amount ${this.consumer.amount} not a valid number`)
      }
    } else {
      this.#merchantPresentMode.setPointOfInitiationMethod(PointOfInitiationMethod.STATIC)
    }

    const additionalDataField = new AdditionalDataField()

    if(this.consumer.message) {
      additionalDataField.setPurposeTransaction(this.consumer.message)
    }
    
    const additionalDataFieldTemplate = new AdditionalDataFieldTemplate(additionalDataField);
    this.#merchantPresentMode.setAdditionalDataField(additionalDataFieldTemplate)

    return this.#merchantPresentMode.toString()
  }
}
