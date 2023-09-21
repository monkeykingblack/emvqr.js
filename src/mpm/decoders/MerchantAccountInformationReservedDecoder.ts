import DecoderMpm from './DecoderMpm';
import { MerchantAccountInformationReserved } from '../models';
import TLVUtils from '../../utils/TLVUtils';

export default class MerchantAccountInformationReservedDecoder extends DecoderMpm<MerchantAccountInformationReserved> {
  static {
    this.registerDecoder(
      MerchantAccountInformationReserved,
      MerchantAccountInformationReservedDecoder,
    );
  }

  constructor(source: string) {
    super(source);
  }

  protected decode(): MerchantAccountInformationReserved {
    const { value } = this.iterator.next();
    return new MerchantAccountInformationReserved(TLVUtils.valueOf(value));
  }
}
