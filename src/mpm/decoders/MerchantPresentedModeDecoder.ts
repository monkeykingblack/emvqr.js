import {
  AdditionalDataFieldTemplate,
  MerchantAccountInformationTemplate,
  MerchantInformationLanguageTemplate,
  MerchantPresentedMode,
  TagLengthString,
  UnreservedTemplate,
} from '../models';
import { DuplicateTagException, InvalidTagException } from '../../exceptions';
import { ExtractFunctionKeys, TypeConstructor } from '../types';
import DecoderMpm from './DecoderMpm';
import { MerchantPresentedModeCodes } from '../constant';
import TLVUtils from '../../utils/TLVUtils';

export default class MerchantPresentedModeDecoder extends DecoderMpm<MerchantPresentedMode> {
  private static mapConsumers = new Map<
    string,
    [TypeConstructor<unknown>, ExtractFunctionKeys<MerchantPresentedMode>]
  >();

  static {
    this.registerDecoder(MerchantPresentedMode, MerchantPresentedModeDecoder);
    this.mapConsumers.set(MerchantPresentedModeCodes.ID_PAYLOAD_FORMAT_INDICATOR, [
      String,
      'setPayloadFormatIndicator',
    ]);
    this.mapConsumers.set(MerchantPresentedModeCodes.ID_POINT_OF_INITIATION_METHOD, [
      String,
      'setPointOfInitiationMethod',
    ]);
    this.mapConsumers.set(MerchantPresentedModeCodes.ID_MERCHANT_CATEGORY_CODE, [
      String,
      'setMerchantCategoryCode',
    ]);
    this.mapConsumers.set(MerchantPresentedModeCodes.ID_TRANSACTION_CURRENCY, [
      String,
      'setTransactionCurrency',
    ]);
    this.mapConsumers.set(MerchantPresentedModeCodes.ID_TRANSACTION_AMOUNT, [
      String,
      'setTransactionAmount',
    ]);
    this.mapConsumers.set(MerchantPresentedModeCodes.ID_TIP_OR_CONVENIENCE_INDICATOR, [
      String,
      'setTipOrConvenienceIndicator',
    ]);
    this.mapConsumers.set(MerchantPresentedModeCodes.ID_VALUE_OF_CONVENIENCE_FEE_FIXED, [
      String,
      'setValueOfConvenienceFeeFixed',
    ]);
    this.mapConsumers.set(MerchantPresentedModeCodes.ID_VALUE_OF_CONVENIENCE_FEE_PERCENTAGE, [
      String,
      'setValueOfConvenienceFeePercentage',
    ]);
    this.mapConsumers.set(MerchantPresentedModeCodes.ID_COUNTRY_CODE, [String, 'setCountryCode']);
    this.mapConsumers.set(MerchantPresentedModeCodes.ID_MERCHANT_NAME, [String, 'setMerchantName']);
    this.mapConsumers.set(MerchantPresentedModeCodes.ID_MERCHANT_CITY, [String, 'setMerchantCity']);
    this.mapConsumers.set(MerchantPresentedModeCodes.ID_POSTAL_CODE, [String, 'setPostalCode']);
    this.mapConsumers.set(MerchantPresentedModeCodes.ID_CRC, [String, 'setCRC']);
    this.mapConsumers.set(MerchantPresentedModeCodes.ID_ADDITIONAL_DATA_FIELD_TEMPLATE, [
      AdditionalDataFieldTemplate,
      'setAdditionalDataField',
    ]);
    this.mapConsumers.set(MerchantPresentedModeCodes.ID_MERCHANT_INFORMATION_LANGUAGE_TEMPLATE, [
      MerchantInformationLanguageTemplate,
      'setMerchantInformationLanguage',
    ]);
    this.mapConsumers.set(MerchantPresentedModeCodes.ID_MERCHANT_ACCOUNT_INFORMATION_RESERVED, [
      MerchantAccountInformationTemplate,
      'addMerchantAccountInformation',
    ]);
    this.mapConsumers.set(
      MerchantPresentedModeCodes.ID_MERCHANT_ACCOUNT_INFORMATION_RESERVED_ADDITIONAL,
      [MerchantAccountInformationTemplate, 'addMerchantAccountInformation'],
    );
    this.mapConsumers.set(MerchantPresentedModeCodes.ID_RFU_FOR_EMVCO, [
      TagLengthString,
      'addRFUforEMVCo',
    ]);
    this.mapConsumers.set(MerchantPresentedModeCodes.ID_UNRESERVED_TEMPLATES, [
      UnreservedTemplate,
      'addUnreserved',
    ]);
    this.mapConsumers.set(MerchantPresentedModeCodes.ID_CRC, [String, 'setCRC']);
  }

  constructor(source: string) {
    super(source);
  }

  protected decode(): MerchantPresentedMode {
    const tags = new Set<string>();

    const value = new MerchantPresentedMode();

    value.setCRC('0000');

    let result: IteratorResult<string>;
    do {
      result = this.iterator.next();

      const tag = TLVUtils.valueOfTag(result.value);

      const derivateId = this.derivateId(tag);

      if (tags.has(tag)) {
        throw new DuplicateTagException('MerchantPresentedMode', tag, result.value);
      }

      tags.add(tag);

      const entry = MerchantPresentedModeDecoder.mapConsumers.get(derivateId);

      if (!entry) {
        throw new InvalidTagException('MerchantPresentedMode', tag, result.value);
      }

      const clazz = entry[0];

      const consumer = entry[1];

      const args: [any] = [DecoderMpm.decode(result.value, clazz)];

      value[consumer](...args);
    } while (!result.done);

    return value;
  }

  private derivateId(id: string) {
    if (this.betweenAccountInformationReservedRange(id)) {
      return MerchantPresentedModeCodes.ID_MERCHANT_ACCOUNT_INFORMATION_RESERVED;
    }

    if (this.betweenAccountInformationaReservedAdditionalRange(id)) {
      return MerchantPresentedModeCodes.ID_MERCHANT_ACCOUNT_INFORMATION_RESERVED_ADDITIONAL;
    }

    if (this.betweenRFUForEMVCORange(id)) {
      return MerchantPresentedModeCodes.ID_RFU_FOR_EMVCO;
    }

    if (this.betweenUnreservedTemplatesRange(id)) {
      return MerchantPresentedModeCodes.ID_UNRESERVED_TEMPLATES;
    }

    return id;
  }

  private betweenAccountInformationReservedRange(value: string) {
    return (
      value.localeCompare(
        MerchantPresentedModeCodes.ID_MERCHANT_ACCOUNT_INFORMATION_RESERVED_RANGE_START,
      ) >= 0 &&
      value.localeCompare(
        MerchantPresentedModeCodes.ID_MERCHANT_ACCOUNT_INFORMATION_RESERVED_RANGE_END,
      ) <= 0
    );
  }

  private betweenAccountInformationaReservedAdditionalRange(value: string) {
    return (
      value.localeCompare(
        MerchantPresentedModeCodes.ID_MERCHANT_ACCOUNT_INFORMATION_RESERVED_ADDITIONAL_RANGE_START,
      ) >= 0 &&
      value.localeCompare(
        MerchantPresentedModeCodes.ID_MERCHANT_ACCOUNT_INFORMATION_RESERVED_ADDITIONAL_RANGE_END,
      ) <= 0
    );
  }

  private betweenRFUForEMVCORange(value: string) {
    return (
      value.localeCompare(MerchantPresentedModeCodes.ID_RFU_FOR_EMVCO_RANGE_START) >= 0 &&
      value.localeCompare(MerchantPresentedModeCodes.ID_RFU_FOR_EMVCO_RANGE_END) <= 0
    );
  }

  private betweenUnreservedTemplatesRange(value: string) {
    return (
      value.localeCompare(MerchantPresentedModeCodes.ID_UNRESERVED_TEMPLATES_RANGE_START) >= 0 &&
      value.localeCompare(MerchantPresentedModeCodes.ID_UNRESERVED_TEMPLATES_RANGE_END) <= 0
    );
  }
}
