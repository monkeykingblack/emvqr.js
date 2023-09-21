import { AbstractValidator } from 'fluent-ts-validator';
import { MerchantInformationLanguage, TagLengthString } from '../models';
import TagLengthStringValidator from './TagLengthStringValidator';
import { MerchantInformationLanguageFieldCodes } from '../constant';

export default class MerchantInformationLanguageValidator extends AbstractValidator<MerchantInformationLanguage> {
  constructor() {
    super();
    this.validateIf(model => model.languagePreference).fulfills(
      new TagLengthStringValidator(
        'MerchantInformationLanguageValidator.LanguagePreference',
        { value: MerchantInformationLanguageFieldCodes.ID_LANGUAGE_PREFERENCE },
        { maxLength: 2 },
      ),
    );

    this.validateIf(model => model.merchantName).fulfills(
      new TagLengthStringValidator(
        'MerchantInformationLanguageValidator.LanguagePreference',
        { value: MerchantInformationLanguageFieldCodes.ID_MERCHANT_NAME },
        { maxLength: 25 },
      ),
    );

    this.validateIf(model => model.merchantCity)
      .fulfills(
        new TagLengthStringValidator(
          'MerchantInformationLanguageValidator.LanguagePreference',
          { value: MerchantInformationLanguageFieldCodes.ID_MERCHANT_CITY },
          { maxLength: 15 },
        ),
      )
      .whenDefined();

    this.validateIfEach(model => model.rFUforEMVCo.values())
      .fulfills(
        new TagLengthStringValidator(
          'MerchantInformationLanguage.RFUforEMVCo',
          { tagStart: '03', tagEnd: '99' },
          { maxLength: 99 },
        ),
      )
      .when(model => model.rFUforEMVCo.size > 0);
  }
}
