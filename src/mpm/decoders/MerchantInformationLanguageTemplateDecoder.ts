import DecoderMpm from './DecoderMpm';
import { MerchantInformationLanguage, MerchantInformationLanguageTemplate } from '../models';

export default class MerchantInformationLanguageTemplateDecoder extends DecoderMpm<MerchantInformationLanguageTemplate> {
  static {
    this.registerDecoder(
      MerchantInformationLanguageTemplate,
      MerchantInformationLanguageTemplateDecoder,
    );
  }

  protected decode(): MerchantInformationLanguageTemplate {
    const value = new MerchantInformationLanguageTemplate();

    let result: IteratorResult<string>;
    do {
      result = this.iterator.next();
      value.setValue(DecoderMpm.decode(result.value, MerchantInformationLanguage));
    } while (!result.done);

    return value;
  }
}
