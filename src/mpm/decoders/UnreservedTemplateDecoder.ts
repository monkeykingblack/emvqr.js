import TLVUtils from '../../utils/TLVUtils';
import { Unreserved, UnreservedTemplate } from '../models';
import DecoderMpm from './DecoderMpm';

export default class UnreservedTemplateDecoder extends DecoderMpm<UnreservedTemplate> {
  static {
    this.registerDecoder(UnreservedTemplate, UnreservedTemplateDecoder);
  }

  constructor(source: string) {
    super(source);
  }

  protected decode(): UnreservedTemplate {
    const value = new UnreservedTemplate();

    let result: IteratorResult<string>;
    do {
      result = this.iterator.next();
      value.setTag(TLVUtils.valueOfTag(result.value));
      value.setValue(DecoderMpm.decode(result.value, Unreserved));
    } while (!result.done);

    return value;
  }
}
