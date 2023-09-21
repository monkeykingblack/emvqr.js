import TLVUtils from '../../utils/TLVUtils';
import { TagLengthString } from '../models';
import DecoderMpm from './DecoderMpm';

export default class TagLengthStringDecoder extends DecoderMpm<TagLengthString> {
  static {
    this.registerDecoder(TagLengthString, TagLengthStringDecoder);
  }

  protected decode(): TagLengthString {
    const value = new TagLengthString();

    let result: IteratorResult<string>;
    do {
      result = this.iterator.next();
      value.setTag(TLVUtils.valueOfTag(result.value));
      value.setValue(TLVUtils.valueOf(result.value));
    } while (!result.done);

    return value;
  }
}
