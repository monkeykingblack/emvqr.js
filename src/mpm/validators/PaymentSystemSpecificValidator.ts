import { AbstractValidator } from 'fluent-ts-validator';
import { PaymentSystemSpecific } from '../models';
import { PaymentSystemSpecificFieldCodes } from '../constant';
import TagLengthStringValidator from './TagLengthStringValidator';

export default class PaymentSystemSpecificValidator extends AbstractValidator<PaymentSystemSpecific> {
  constructor() {
    super();

    this.validateIf(model => model.globallyUniqueIdentifier).fulfills(
      new TagLengthStringValidator(
        'GloballyUniqueIdentifier',
        { value: PaymentSystemSpecificFieldCodes.ID_GLOBALLY_UNIQUE_IDENTIFIER },
        { maxLength: 32 },
      ),
    );

    this.validateIfEach(model => model.paymentSystemSpecific.values())
      .fulfills(
        new TagLengthStringValidator(
          'PaymentSystemSpecific.PaymentSystemSpecific',
          { tagStart: '01', tagEnd: '09' },
          { maxLength: 99 },
        ),
      )
      .when(model => model.paymentSystemSpecific.size > 0);
  }
}
