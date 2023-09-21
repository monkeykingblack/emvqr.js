import DecoderMpm from './DecoderMpm';
import { PaymentSystemSpecific, PaymentSystemSpecificTemplate } from '../models';
import TLVUtils from '../../utils/TLVUtils';

export default class PaymentSystemSpecificTemplateDecoder extends DecoderMpm<PaymentSystemSpecificTemplate> {
  static {
    this.registerDecoder(PaymentSystemSpecificTemplate, PaymentSystemSpecificTemplateDecoder);
  }

  constructor(source: string) {
    super(source);
  }

  protected decode(): PaymentSystemSpecificTemplate {
    const value = new PaymentSystemSpecificTemplate();

    let result: IteratorResult<string>;
    do {
      result = this.iterator.next();
      value.setTag(TLVUtils.valueOfTag(result.value));
      value.setValue(DecoderMpm.decode(result.value, PaymentSystemSpecific));
    } while (!result.done);

    return value;
  }
}
