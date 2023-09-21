import { AbstractValidator } from 'fluent-ts-validator';
import { AdditionalDataField } from '../models';
import TagLengthStringValidator from './TagLengthStringValidator';
import PaymentSystemSpecificTemplateValidator from './PaymentSystemSpecificTemplateValidator';

import { AdditionalDataFieldCodes } from '../constant';

export default class AdditionalDataFieldValidator extends AbstractValidator<AdditionalDataField> {
  constructor() {
    super();

    /**
     *
     */
    this.validateIf(model => model.billNumber)
      .fulfills(
        new TagLengthStringValidator(
          'AdditionalDataFieldValidator.BillNumber',
          { value: AdditionalDataFieldCodes.ID_BILL_NUMBER },
          { maxLength: 25 },
        ),
      )
      .whenDefined();

    /**
     *
     */
    this.validateIf(model => model.mobileNumber)
      .fulfills(
        new TagLengthStringValidator(
          'AdditionalDataFieldValidator.MobileNumber',
          { value: AdditionalDataFieldCodes.ID_MOBILE_NUMBER },
          { maxLength: 25 },
        ),
      )
      .whenDefined();

    /**
     *
     */
    this.validateIf(model => model.storeLabel)
      .fulfills(
        new TagLengthStringValidator(
          'AdditionalDataFieldValidator.StoreLabel',
          { value: AdditionalDataFieldCodes.ID_STORE_LABEL },
          { maxLength: 25 },
        ),
      )
      .whenDefined();

    /**
     *
     */
    this.validateIf(model => model.loyaltyNumber)
      .fulfills(
        new TagLengthStringValidator(
          'AdditionalDataFieldValidator.LoyaltyNumber',
          { value: AdditionalDataFieldCodes.ID_LOYALTY_NUMBER },
          { maxLength: 25 },
        ),
      )
      .whenDefined();

    /**
     *
     */
    this.validateIf(model => model.referenceLabel)
      .fulfills(
        new TagLengthStringValidator(
          'AdditionalDataFieldValidator.ReferenceLabel',
          { value: AdditionalDataFieldCodes.ID_REFERENCE_LABEL },
          { maxLength: 25 },
        ),
      )
      .whenDefined();

    /**
     *
     */
    this.validateIf(model => model.customerLabel)
      .fulfills(
        new TagLengthStringValidator(
          'AdditionalDataFieldValidator.CustomerLabel',
          { value: AdditionalDataFieldCodes.ID_CUSTOMER_LABEL },
          { maxLength: 25 },
        ),
      )
      .whenDefined();

    /**
     *
     */
    this.validateIf(model => model.terminalLabel)
      .fulfills(
        new TagLengthStringValidator(
          'AdditionalDataFieldValidator.TerminalLabel',
          { value: AdditionalDataFieldCodes.ID_TERMINAL_LABEL },
          { maxLength: 25 },
        ),
      )
      .whenDefined();

    /**
     *
     */
    this.validateIf(model => model.purposeTransaction)
      .fulfills(
        new TagLengthStringValidator(
          'AdditionalDataFieldValidator.PurposeTransaction',
          { value: AdditionalDataFieldCodes.ID_PURPOSE_TRANSACTION },
          { maxLength: 25 },
        ),
      )
      .whenDefined();

    /**
     *
     */
    this.validateIf(model => model.additionalConsumerDataRequest)
      .fulfills(
        new TagLengthStringValidator(
          'AdditionalDataFieldValidator.AdditionalConsumerDataRequest',
          { value: AdditionalDataFieldCodes.ID_ADDITIONAL_CONSUMER_DATA_REQUEST },
          { maxLength: 3 },
        ),
      )
      .whenDefined();

    /**
     *
     */
    this.validateIfIterable(model => model.rFUforEMVCo)
      .hasNumberOfElementsBetween(1, 39)
      .whenNotEmpty()
      .withFailureMessage('RFUforEMVCo list size must be between 1 and 99');

    this.validateIfEach(model => model.rFUforEMVCo.values())
      .fulfills(
        new TagLengthStringValidator(
          'AdditionalDataField.RFUforEMVCo',
          { tagStart: '10', tagEnd: '49' },
          { maxLength: 99 },
        ),
      )
      .when(model => model.rFUforEMVCo.size > 0);

    /**
     *
     */
    this.validateIfIterable(model => model.paymentSystemSpecific)
      .hasNumberOfElementsBetween(1, 39)
      .whenNotEmpty()
      .withFailureMessage('RFUforEMVCo list size must be between 1 and 99');

    this.validateIfEach(model => model.paymentSystemSpecific.values())
      .fulfills(new PaymentSystemSpecificTemplateValidator('50', '99', 99))
      .when(model => model.paymentSystemSpecific.size > 0);
  }
}
