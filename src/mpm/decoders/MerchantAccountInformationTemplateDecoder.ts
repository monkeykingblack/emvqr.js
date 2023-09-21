import TLVUtils from '../../utils/TLVUtils';
import { MerchantPresentedModeCodes } from '../constant';
import {
  MerchantAccountInformationReserved,
  MerchantAccountInformationReservedAdditional,
  MerchantAccountInformationTemplate,
} from '../models';
import DecoderMpm from './DecoderMpm';

export default class MerchantAccountInformationTemplateDecoder extends DecoderMpm<MerchantAccountInformationTemplate> {
  static {
    this.registerDecoder(
      MerchantAccountInformationTemplate,
      MerchantAccountInformationTemplateDecoder,
    );
  }

  protected decode(): MerchantAccountInformationTemplate {
    const value = new MerchantAccountInformationTemplate();

    let result: IteratorResult<string>;
    do {
      result = this.iterator.next();

      const tag = TLVUtils.valueOfTag(result.value);

      value.setTag(tag);

      if (this.betweenAccountInformationReservedRange(tag)) {
        value.setValue(DecoderMpm.decode(result.value, MerchantAccountInformationReserved));
      }

      if (this.betweenAccountInformationalReservedAdditionalRange(tag)) {
        value.setValue(
          DecoderMpm.decode(result.value, MerchantAccountInformationReservedAdditional),
        );
      }
    } while (!result.value);

    return value;
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

  private betweenAccountInformationalReservedAdditionalRange(value: string) {
    return (
      value.localeCompare(
        MerchantPresentedModeCodes.ID_MERCHANT_ACCOUNT_INFORMATION_RESERVED_ADDITIONAL_RANGE_START,
      ) >= 0 &&
      value.localeCompare(
        MerchantPresentedModeCodes.ID_MERCHANT_ACCOUNT_INFORMATION_RESERVED_ADDITIONAL_RANGE_END,
      ) <= 0
    );
  }
}
