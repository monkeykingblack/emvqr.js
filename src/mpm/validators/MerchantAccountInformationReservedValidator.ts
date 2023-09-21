import { AbstractValidator } from 'fluent-ts-validator';
import { MerchantAccountInformationReserved } from '../models';

export default class MerchantAccountInformationReservedValidator extends AbstractValidator<MerchantAccountInformationReserved> {
  constructor() {
    super();
    this.validateIfString(model => model.value)
      .hasLengthBetween(1, 99)
      .withFailureMessage('MerchantAccountInformation value must be between 1 and 99');
  }
}
