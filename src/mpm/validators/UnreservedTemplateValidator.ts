import { AbstractValidator } from 'fluent-ts-validator';
import { UnreservedTemplate } from '../models';
import UnreservedValidator from './UnreservedValidator';

export default class UnreservedTemplateValidator extends AbstractValidator<UnreservedTemplate> {
  constructor(tagStart: string, tagEnd: string, maxSizeValue: number) {
    super();

    this.validateIf(model => model.tag)
      .isDefined()
      .isNotNull()
      .isNotEmpty()
      .fulfills(tag => !!tag && tag >= tagStart && tag <= tagEnd)
      .withFailureMessage('UnreservedTemplate tag is mandatory');

    this.validateIfString(model => model.value?.toString())
      .isDefined()
      .isNotEmpty()
      .isNotNull()
      .hasMaxLength(maxSizeValue);

    this.validateIf(model => model.value).fulfills(new UnreservedValidator());
  }
}
