import DecoderMpm from './DecoderMpm';
import { MerchantInformationLanguage, TagLengthString } from '../models';
import { ExtractFunctionKeys, TypeConstructor } from '../types';
import { MerchantInformationLanguageFieldCodes } from '../constant';
import TLVUtils from '../../utils/TLVUtils';
import { DuplicateTagException, InvalidTagException } from '../../exceptions';

export default class MerchantInformationLanguageDecoder extends DecoderMpm<MerchantInformationLanguage> {
  private static mapConsumers = new Map<
    string,
    [TypeConstructor<unknown>, ExtractFunctionKeys<MerchantInformationLanguage>]
  >();

  static {
    this.registerDecoder(MerchantInformationLanguage, MerchantInformationLanguageDecoder);
    this.mapConsumers.set(MerchantInformationLanguageFieldCodes.ID_LANGUAGE_PREFERENCE, [
      String,
      'setLanguagePreference',
    ]);
    this.mapConsumers.set(MerchantInformationLanguageFieldCodes.ID_MERCHANT_NAME, [
      String,
      'setMerchantName',
    ]);
    this.mapConsumers.set(MerchantInformationLanguageFieldCodes.ID_MERCHANT_CITY, [
      String,
      'setMerchantCity',
    ]);
    this.mapConsumers.set(MerchantInformationLanguageFieldCodes.ID_RFU_FOR_EMVCO, [
      TagLengthString,
      'addRFUforEMVCo',
    ]);
  }

  constructor(source: string) {
    super(TLVUtils.valueOf(source));
  }

  protected decode(): MerchantInformationLanguage {
    const tags = new Set<string>();

    const value = new MerchantInformationLanguage();

    let result: IteratorResult<string>;

    do {
      result = this.iterator.next();
      const tag = TLVUtils.valueOfTag(result.value);
      const derivateId = this.derivateId(tag);

      if (tags.has(tag)) {
        throw new DuplicateTagException('MerchantInformationLanguage', tag, result.value);
      }

      tags.add(tag);
      const entry = MerchantInformationLanguageDecoder.mapConsumers.get(derivateId);

      if (!entry) {
        throw new InvalidTagException('MerchantInformationLanguage', tag, result.value);
      }

      const clazz = entry[0];
      const consumer = entry[1];

      const args: [any] = [DecoderMpm.decode(result.value, clazz)];

      value[consumer](...args);
    } while (!result.done);

    return value;
  }

  derivateId(id: string) {
    if (this.betweenRFUForEMVCORange(id)) {
      return MerchantInformationLanguageFieldCodes.ID_RFU_FOR_EMVCO;
    }

    return id;
  }

  betweenRFUForEMVCORange(value: string) {
    return (
      value.localeCompare(MerchantInformationLanguageFieldCodes.ID_RFU_FOR_EMVCO_RANGE_START) >=
        0 &&
      value.localeCompare(MerchantInformationLanguageFieldCodes.ID_RFU_FOR_EMVCO_RANGE_END) <= 0
    );
  }
}
