import DecoderMpm from './DecoderMpm';
import { MerchantAccountInformationReservedAdditional, TagLengthString } from '../models';
import { ExtractFunctionKeys, TypeConstructor } from '../types';
import { MerchantAccountInformationFieldCodes } from '../constant';
import TLVUtils from '../../utils/TLVUtils';
import { DuplicateTagException, InvalidTagException } from '../../exceptions';

export default class MerchantAccountInformationReservedAdditionalDecoder extends DecoderMpm<MerchantAccountInformationReservedAdditional> {
  private static mapConsumers = new Map<
    string,
    [TypeConstructor<unknown>, ExtractFunctionKeys<MerchantAccountInformationReservedAdditional>]
  >();

  static {
    this.registerDecoder(
      MerchantAccountInformationReservedAdditional,
      MerchantAccountInformationReservedAdditionalDecoder,
    );
    this.mapConsumers.set(MerchantAccountInformationFieldCodes.ID_GLOBALLY_UNIQUE_IDENTIFIER, [
      String,
      'setGloballyUniqueIdentifier',
    ]);
    this.mapConsumers.set(MerchantAccountInformationFieldCodes.ID_PAYMENT_NETWORK_SPECIFIC, [
      TagLengthString,
      'addPaymentNetworkSpecific',
    ]);
  }

  constructor(source: string) {
    super(TLVUtils.valueOf(source));
  }

  protected decode(): MerchantAccountInformationReservedAdditional {
    const tags = new Set();

    const value = new MerchantAccountInformationReservedAdditional();

    let result: IteratorResult<string>;
    do {
      result = this.iterator.next();

      const tag = TLVUtils.valueOfTag(result.value);

      const derivateId = this.derivateId(tag);

      if (tags.has(tag)) {
        throw new DuplicateTagException(
          'MerchantAccountInformationReservedAdditional',
          tag,
          result.value,
        );
      }

      tags.add(tag);

      const entry =
        MerchantAccountInformationReservedAdditionalDecoder.mapConsumers.get(derivateId);

      if (!entry) {
        throw new InvalidTagException(
          'MerchantAccountInformationReservedAdditional',
          tag,
          result.value,
        );
      }

      const clazz = entry[0];

      const consumer = entry[1];

      const args: [any] = [DecoderMpm.decode(result.value, clazz)];

      value[consumer](...args);
    } while (!result.done);

    return value;
  }

  private derivateId(id: string) {
    if (this.betweenPaymentNetworkSpecificRange(id)) {
      return MerchantAccountInformationFieldCodes.ID_PAYMENT_NETWORK_SPECIFIC;
    }

    return id;
  }

  private betweenPaymentNetworkSpecificRange(value: string) {
    return (
      value.localeCompare(MerchantAccountInformationFieldCodes.ID_PAYMENT_NETWORK_SPECIFIC_START) >=
        0 &&
      value.localeCompare(MerchantAccountInformationFieldCodes.ID_PAYMENT_NETWORK_SPECIFIC_END) <= 0
    );
  }
}
