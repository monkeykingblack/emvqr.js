import { AbstractValidator } from 'fluent-ts-validator';
import { MerchantInformationLanguageTemplate } from '../models';
import MerchantInformationLanguageValidator from './MerchantInformationLanguageValidator';

export default class MerchantInformationLanguageTemplateValidator extends AbstractValidator<MerchantInformationLanguageTemplate> {
  constructor() {
    super();
    this.validateIf(model => model.value)
      .fulfills(new MerchantInformationLanguageValidator())
      .whenDefined();
  }
}
