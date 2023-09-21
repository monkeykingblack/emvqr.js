import DecoderMpm from './DecoderMpm';
import { PaymentSystemSpecific, TagLengthString } from '../models';
import { ExtractFunctionKeys, TypeConstructor } from '../types';
import { MerchantAccountInformationFieldCodes, PaymentSystemSpecificFieldCodes } from '../constant';
import TLVUtils from '../../utils/TLVUtils';
import { DuplicateTagException, InvalidTagException } from '../../exceptions';

export default class PaymentSystemSpecificDecoder extends DecoderMpm<PaymentSystemSpecific> {
  private static mapConsumers = new Map<
    string,
    [TypeConstructor<unknown>, ExtractFunctionKeys<PaymentSystemSpecific>]
  >();

  static {
    this.registerDecoder(PaymentSystemSpecific, PaymentSystemSpecificDecoder);
    this.mapConsumers.set(MerchantAccountInformationFieldCodes.ID_GLOBALLY_UNIQUE_IDENTIFIER, [
      String,
      'setGloballyUniqueIdentifier',
    ]);
    this.mapConsumers.set(MerchantAccountInformationFieldCodes.ID_PAYMENT_NETWORK_SPECIFIC, [
      TagLengthString,
      'addPaymentSystemSpecific',
    ]);
  }

  constructor(source: string) {
    super(TLVUtils.valueOf(source));
  }

  protected decode(): PaymentSystemSpecific {
    const tags = new Set();

    const value = new PaymentSystemSpecific();

    let result: IteratorResult<string>;
    do {
      result = this.iterator.next();

      const tag = TLVUtils.valueOfTag(result.value);

      const derivateId = this.derivateId(tag);

      if (tags.has(tag)) {
        throw new DuplicateTagException('PaymentSystemSpecific', tag, result.value);
      }

      tags.add(tag);

      const entry = PaymentSystemSpecificDecoder.mapConsumers.get(derivateId);

      if (!entry) {
        throw new InvalidTagException('PaymentSystemSpecific', tag, result.value);
      }

      const clazz = entry[0];

      const consumer = entry[1];

      const args: [any] = [DecoderMpm.decode(result.value, clazz)];

      value[consumer]?.(...args);
    } while (!result.done);

    return value;
  }

  private derivateId(id: string) {
    if (this.betweenPaymentNetworkSpecificRange(id)) {
      return PaymentSystemSpecificFieldCodes.ID_PAYMENT_NETWORK_SPECIFIC;
    }

    return id;
  }

  private betweenPaymentNetworkSpecificRange(value: string) {
    return (
      value.localeCompare(PaymentSystemSpecificFieldCodes.ID_PAYMENT_NETWORK_SPECIFIC_START) >= 0 &&
      value.localeCompare(PaymentSystemSpecificFieldCodes.ID_PAYMENT_NETWORK_SPECIFIC_END) <= 0
    );
  }
}
