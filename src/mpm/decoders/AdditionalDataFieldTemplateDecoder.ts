import { AdditionalDataField, AdditionalDataFieldTemplate } from '../models';
import DecoderMpm from './DecoderMpm';

export default class AdditionalDataFieldTemplateDecoder extends DecoderMpm<AdditionalDataFieldTemplate> {
  static {
    this.registerDecoder(AdditionalDataFieldTemplate, AdditionalDataFieldTemplateDecoder);
  }

  constructor(source: string) {
    super(source);
  }

  protected decode(): AdditionalDataFieldTemplate {
    const value = new AdditionalDataFieldTemplate();

    let result: IteratorResult<string>;
    do {
      result = this.iterator.next();
      value.setValue(DecoderMpm.decode(result.value, AdditionalDataField));
    } while (!result.done);

    return value;
  }
}
