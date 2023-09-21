import { AbstractValidator } from 'fluent-ts-validator';
import { PaymentSystemSpecificTemplate } from '../models';
import PaymentSystemSpecificValidator from './PaymentSystemSpecificValidator';

export default class PaymentSystemSpecificTemplateValidator extends AbstractValidator<PaymentSystemSpecificTemplate> {
  constructor(tagStart: string, tagEnd: string, maxSizeValue: number) {
    super();
    this.validateIfString(model => model.tag).fulfills(tag => tag >= tagStart && tag <= tagEnd);
    this.validateIfString(model => model.value?.toString())
      .hasLengthBetween(1, maxSizeValue)
      .whenDefined();

    this.validateIf(model => model.value)
      .fulfills(new PaymentSystemSpecificValidator())
      .whenDefined();
  }
}
