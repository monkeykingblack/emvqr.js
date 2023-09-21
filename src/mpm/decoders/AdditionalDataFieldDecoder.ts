import DecoderMpm from './DecoderMpm';
import { AdditionalDataField, PaymentSystemSpecificTemplate, TagLengthString } from '../models';
import { DuplicateTagException, InvalidTagException } from '../../exceptions';
import { AdditionalDataFieldCodes } from '../constant';
import TLVUtils from '../../utils/TLVUtils';
import type { ExtractFunctionKeys, TypeConstructor } from '../types';

export default class AdditionalDataFieldDecoder extends DecoderMpm<AdditionalDataField> {
  private static mapConsumers = new Map<
    string,
    [TypeConstructor<unknown>, ExtractFunctionKeys<AdditionalDataField>]
  >();

  static {
    this.registerDecoder(AdditionalDataField, AdditionalDataFieldDecoder);
    this.mapConsumers.set(AdditionalDataFieldCodes.ID_BILL_NUMBER, [String, 'setBillNumber']);
    this.mapConsumers.set(AdditionalDataFieldCodes.ID_MOBILE_NUMBER, [String, 'setMobileNumber']);
    this.mapConsumers.set(AdditionalDataFieldCodes.ID_STORE_LABEL, [String, 'setStoreLabel']);
    this.mapConsumers.set(AdditionalDataFieldCodes.ID_LOYALTY_NUMBER, [String, 'setLoyaltyNumber']);
    this.mapConsumers.set(AdditionalDataFieldCodes.ID_REFERENCE_LABEL, [
      String,
      'setReferenceLabel',
    ]);
    this.mapConsumers.set(AdditionalDataFieldCodes.ID_CUSTOMER_LABEL, [String, 'setCustomerLabel']);
    this.mapConsumers.set(AdditionalDataFieldCodes.ID_TERMINAL_LABEL, [String, 'setTerminalLabel']);
    this.mapConsumers.set(AdditionalDataFieldCodes.ID_PURPOSE_TRANSACTION, [
      String,
      'setPurposeTransaction',
    ]);
    this.mapConsumers.set(AdditionalDataFieldCodes.ID_RFU_FOR_EMVCO, [
      TagLengthString,
      'addRFUforEMVCo',
    ]);
    this.mapConsumers.set(AdditionalDataFieldCodes.ID_PAYMENT_SYSTEM_SPECIFIC, [
      PaymentSystemSpecificTemplate,
      'addPaymentSystemSpecific',
    ]);
    this.mapConsumers.set(AdditionalDataFieldCodes.ID_ADDITIONAL_CONSUMER_DATA_REQUEST, [
      String,
      'setAdditionalConsumerDataRequest',
    ]);
  }

  constructor(source: string) {
    super(TLVUtils.valueOf(source));
  }

  protected decode(): AdditionalDataField {
    const tags = new Set<string>();

    const value = new AdditionalDataField();

    let result: IteratorResult<string>;
    do {
      result = this.iterator.next();

      const tag = TLVUtils.valueOfTag(result.value);

      const derivateId = this.derivateId(tag);

      if (tags.has(tag)) {
        throw new DuplicateTagException('AdditionalDataField', tag, result.value);
      }

      tags.add(tag);

      const entry = AdditionalDataFieldDecoder.mapConsumers.get(derivateId);

      if (!entry) {
        throw new InvalidTagException('AdditionalDataField', tag, result.value);
      }

      const clazz = entry[0];

      const consumer = entry[1];

      const args: [any] = [DecoderMpm.decode(result.value, clazz)];

      value[consumer](...args);
    } while (!result.done);

    return value;
  }

  private derivateId(id: string) {
    if (this.betweenPaymentSystemSpecificRange(id)) {
      return AdditionalDataFieldCodes.ID_PAYMENT_SYSTEM_SPECIFIC;
    }

    if (this.betweenRFUForEMVCORange(id)) {
      return AdditionalDataFieldCodes.ID_RFU_FOR_EMVCO;
    }

    return id;
  }

  private betweenRFUForEMVCORange(value: string) {
    return (
      value.localeCompare(AdditionalDataFieldCodes.ID_RFU_FOR_EMVCO_RANGE_START) >= 0 &&
      value.localeCompare(AdditionalDataFieldCodes.ID_RFU_FOR_EMVCO_RANGE_END) <= 0
    );
  }

  private betweenPaymentSystemSpecificRange(value: string) {
    return (
      value.localeCompare(
        AdditionalDataFieldCodes.ID_PAYMENT_SYSTEM_SPECIFIC_TEMPLATES_RANGE_START,
      ) >= 0 &&
      value.localeCompare(
        AdditionalDataFieldCodes.ID_PAYMENT_SYSTEM_SPECIFIC_TEMPLATES_RANGE_END,
      ) <= 0
    );
  }
}
