import TLVUtils from '../../utils/TLVUtils';
import DecoderMpm from './DecoderMpm';

export default class StringDecoder extends DecoderMpm<string> {
  static {
    this.registerDecoder(String, StringDecoder);
  }

  protected decode(): string {
    const builder = new Array<string>();

    let result: IteratorResult<string>;

    do {
      result = this.iterator.next();
      builder.push(TLVUtils.valueOf(result.value));
    } while (!result.done);

    return builder.join('');
  }
}
