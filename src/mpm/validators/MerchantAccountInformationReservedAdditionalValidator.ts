import { AbstractValidator } from 'fluent-ts-validator';
import { MerchantAccountInformationReservedAdditional } from '../models';
import { MerchantAccountInformationFieldCodes } from '../constant';
import TagLengthStringValidator from './TagLengthStringValidator';

export default class MerchantAccountInformationReservedAdditionalValidator extends AbstractValidator<MerchantAccountInformationReservedAdditional> {
  constructor() {
    super();
    this.validateIf(model => model.globallyUniqueIdentifier).fulfills(
      new TagLengthStringValidator(
        'GloballyUniqueIdentifier',
        {
          value: MerchantAccountInformationFieldCodes.ID_GLOBALLY_UNIQUE_IDENTIFIER,
        },
        { maxLength: 32 },
      ),
    );

    this.validateIfEach(model => model.paymentNetworkSpecific.values())
      .fulfills(
        new TagLengthStringValidator(
          'MerchantAccountInformation.PaymentNetworkSpecific',
          { tagStart: '01', tagEnd: '99' },
          { maxLength: 99 },
        ),
      )
      .when(model => model.paymentNetworkSpecific.size > 0);
  }
}
