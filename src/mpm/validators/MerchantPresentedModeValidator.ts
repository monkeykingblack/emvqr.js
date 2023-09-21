import { AbstractValidator } from 'fluent-ts-validator';
import { MerchantPresentedMode } from '../models';
import UnreservedTemplateValidator from './UnreservedTemplateValidator';
import TagLengthStringValidator from './TagLengthStringValidator';
import MerchantAccountInformationTemplateValidator from './MerchantAccountInformationTemplateValidator';
import MerchantInformationLanguageTemplateValidator from './MerchantInformationLanguageTemplateValidator';
import AdditionalDataFieldTemplateValidator from './AdditionalDataFieldTemplateValidator';

import { MerchantPresentedModeCodes } from '../constant';

export default class MerchantPresentedModeValidator extends AbstractValidator<MerchantPresentedMode> {
  constructor() {
    super();
    /**
     *
     */
    this.validateIf(model => model.payloadFormatIndicator)
      .fulfills(
        new TagLengthStringValidator(
          'PayloadFormatIndicator',
          { value: MerchantPresentedModeCodes.ID_PAYLOAD_FORMAT_INDICATOR },
          { maxLength: 2 },
        ),
      )
      .whenDefined();
    this.validateIfString(model => model.payloadFormatIndicator?.value)
      .isEqualTo('01')
      .whenDefined()
      .withFailureMessage("PayloadFormatIndicator value must be '01'");

    /**
     *
     */
    this.validateIf(model => model.pointOfInitiationMethod)
      .fulfills(
        new TagLengthStringValidator(
          'PointOfInitiationMethod',
          { value: MerchantPresentedModeCodes.ID_POINT_OF_INITIATION_METHOD },
          { maxLength: 2 },
        ),
      )
      .whenDefined();
    this.validateIfString(model => model.pointOfInitiationMethod?.value)
      .isIn(['11', '12'])
      .whenDefined()
      .withFailureMessage("PointOfInitiationMethod value should be '11' or '12'");

    /**
     *
     */
    this.validateIf(model => model.transactionCurrency)
      .fulfills(
        new TagLengthStringValidator(
          'TransactionCurrency',
          { value: MerchantPresentedModeCodes.ID_TRANSACTION_CURRENCY },
          { maxLength: 3 },
        ),
      )
      .whenDefined();

    /**
     *
     */
    this.validateIf(model => model.transactionAmount)
      .fulfills(
        new TagLengthStringValidator(
          'TransactionAmount',
          { value: MerchantPresentedModeCodes.ID_TRANSACTION_AMOUNT },
          { maxLength: 13 },
        ),
      )
      .whenDefined();

    /**
     *
     */
    this.validateIf(model => model.tipOrConvenienceIndicator)
      .fulfills(
        new TagLengthStringValidator(
          'TipOrConvenienceIndicator',
          { value: MerchantPresentedModeCodes.ID_TIP_OR_CONVENIENCE_INDICATOR },
          { maxLength: 2 },
        ),
      )
      .whenDefined();

    this.validateIfString(model => model.tipOrConvenienceIndicator?.value)
      .isIn(['01', '02', '03'])
      .withFailureMessage(
        "TipOrConvenienceIndicator value shall contain a value of '01', '02' or '03'",
      )
      .whenDefined();

    /**
     *
     */
    this.validateIf(model => model.valueOfConvenienceFeeFixed)
      .fulfills(
        new TagLengthStringValidator(
          'ValueOfConvenienceFeeFixed',
          { value: MerchantPresentedModeCodes.ID_VALUE_OF_CONVENIENCE_FEE_FIXED },
          { maxLength: 13 },
        ),
      )
      .whenDefined();
    this.validateIfString(model => model.valueOfConvenienceFeeFixed?.value)
      .isNumericString()
      .withFailureMessage('ValueOfConvenienceFeeFixed value must be a valid number')
      .whenDefined();

    /**
     *
     */
    this.validateIf(model => model.valueOfConvenienceFeePercentage)
      .fulfills(
        new TagLengthStringValidator(
          'ValueOfConvenienceFeePercentage',
          { value: MerchantPresentedModeCodes.ID_VALUE_OF_CONVENIENCE_FEE_PERCENTAGE },
          { maxLength: 5 },
        ),
      )
      .whenDefined();
    this.validateIfString(model => model.valueOfConvenienceFeePercentage?.value)
      .isDecimalString()
      .withFailureMessage('ValueOfConvenienceFeePercentage value must be a valid percentage')
      .whenDefined();

    this.validateIfNumber(model =>
      model.valueOfConvenienceFeePercentage?.value
        ? Number.parseFloat(model.valueOfConvenienceFeePercentage?.value)
        : undefined,
    )
      .isGreaterThanOrEqual(0.0)
      .isLessThanOrEqual(99.99)
      .withFailureMessage(
        "ValueOfConvenienceFeePercentage value must be between '00.01' and '99.99'",
      )
      .whenDefined();

    /**
     *
     */
    this.validateIf(model => model.countryCode)
      .fulfills(
        new TagLengthStringValidator(
          'CountryCode',
          { value: MerchantPresentedModeCodes.ID_COUNTRY_CODE },
          { maxLength: 2 },
        ),
      )
      .whenDefined();

    /**
     *
     */
    this.validateIf(model => model.merchantName)
      .fulfills(
        new TagLengthStringValidator(
          'MerchantName',
          { value: MerchantPresentedModeCodes.ID_MERCHANT_NAME },
          { maxLength: 25 },
        ),
      )
      .whenDefined();

    /**
     *
     */
    this.validateIf(model => model.merchantCity)
      .fulfills(
        new TagLengthStringValidator(
          'MerchantCity',
          { value: MerchantPresentedModeCodes.ID_MERCHANT_CITY },
          { maxLength: 15 },
        ),
      )
      .whenDefined();

    /**
     *
     */
    this.validateIf(model => model.postalCode)
      .fulfills(
        new TagLengthStringValidator(
          'PostTalCode',
          { value: MerchantPresentedModeCodes.ID_POSTAL_CODE },
          { maxLength: 10 },
        ),
      )
      .whenDefined();

    /**
     *
     */
    this.validateIf(model => model.additionalDataField?.tag)
      .isNotNull()
      .isNotEmpty()
      .withFailureMessage('AdditionalDataField tag is mandatory')
      .whenDefined();

    this.validateIfString(model => model.additionalDataField?.tag)
      .hasLength(2)
      .withFailureMessage('AdditionalDataField tag must be size equal two')
      .whenDefined();

    this.validateIfString(model => model.additionalDataField?.tag)
      .isNumericString()
      .withFailureMessage('AdditionalDataField tag must be number')
      .whenDefined();

    this.validateIfString(model => model.additionalDataField?.tag)
      .isEqualTo(MerchantPresentedModeCodes.ID_ADDITIONAL_DATA_FIELD_TEMPLATE)
      .withFailureMessage(
        `AdditionalDataField tag must be ${MerchantPresentedModeCodes.ID_ADDITIONAL_DATA_FIELD_TEMPLATE}`,
      )
      .whenDefined();

    this.validateIfString(model => model.additionalDataField?.value?.toString())
      .hasMaxLength(99)
      .withFailureMessage('AdditionalDataField value must less then or equal size 99')
      .whenDefined();

    this.validateIf(model => model.additionalDataField)
      .fulfills(new AdditionalDataFieldTemplateValidator())
      .whenDefined()
      .when(model => !!model.additionalDataField?.value);

    /**
     *
     */
    this.validateIf(model => model.merchantInformationLanguage?.tag)
      .isNotNull()
      .isNotEmpty()
      .withFailureMessage('MerchantInformationLanguage tag is mandatory')
      .whenDefined();

    this.validateIfString(model => model.merchantInformationLanguage?.tag)
      .hasLength(2)
      .withFailureMessage('MerchantInformationLanguage tag must be size equal two')
      .whenDefined();

    this.validateIfString(model => model.merchantInformationLanguage?.tag)
      .isNumericString()
      .withFailureMessage('MerchantInformationLanguage tag must be number')
      .whenDefined();

    this.validateIfString(model => model.merchantInformationLanguage?.tag)
      .isEqualTo(MerchantPresentedModeCodes.ID_MERCHANT_INFORMATION_LANGUAGE_TEMPLATE)
      .withFailureMessage(
        `MerchantInformationLanguage tag must be ${MerchantPresentedModeCodes.ID_MERCHANT_INFORMATION_LANGUAGE_TEMPLATE}`,
      )
      .whenDefined();

    this.validateIfString(model => model.merchantInformationLanguage?.value?.toString())
      .hasMaxLength(99)
      .withFailureMessage('MerchantInformationLanguage value must less then or equal size 99')
      .whenDefined();

    this.validateIf(model => model.merchantInformationLanguage)
      .fulfills(new MerchantInformationLanguageTemplateValidator())
      .whenDefined()
      .when(model => !!model.merchantInformationLanguage?.value);

    /**
     * TODO Tips
     */

    /**
     *
     */
    this.validateIfIterable(model => model.merchantAccountInformation)
      .hasMinNumberOfElements(1)
      .withFailureMessage('MerchantAccountInformation size must have at least one');
    this.validateIfIterable(model => model.merchantAccountInformation)
      .hasNumberOfElementsBetween(1, 49)
      .withFailureMessage('MerchantAccountInformation list size must be between 1 and 49');

    this.validateIfEach(model => model.merchantAccountInformation.values())
      .fulfills(new MerchantAccountInformationTemplateValidator('02', '51', 99))
      .when(model => model.merchantAccountInformation.size > 0);

    /**
     *
     */
    this.validateIfIterable(model => model.RFUforEMVCo)
      .hasNumberOfElementsBetween(1, 14)
      .when(model => model.RFUforEMVCo.size > 0)
      .withFailureMessage('RFUforEMVCo list size must be between 1 and 14');

    this.validateIfEach(model => model.RFUforEMVCo.values())
      .fulfills(
        new TagLengthStringValidator(
          'MerchantPresentedMode.RFUforEMVCo',
          {
            tagStart: '65',
            tagEnd: '79',
          },
          {
            maxLength: 99,
          },
        ),
      )
      .when(model => model.RFUforEMVCo.size > 0);

    /**
     *
     */
    this.validateIfIterable(model => model.unreserveds)
      .hasNumberOfElementsBetween(1, 19)
      .withFailureMessage('Ureserveds list must be between 1 and 19')
      .when(model => model.unreserveds.size > 0);

    this.validateIfEach(model => model.unreserveds.values())
      .fulfills(new UnreservedTemplateValidator('80', '99', 99))
      .when(model => model.unreserveds.size > 0);
  }
}
