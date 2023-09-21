import { AbstractValidator } from 'fluent-ts-validator';
import { Unreserved } from '../models';
import { UnreservedTemplateFieldCodes } from '../constant';
import TagLengthStringValidator from './TagLengthStringValidator';

export default class UnreservedValidator extends AbstractValidator<Unreserved> {
  constructor() {
    super();

    this.validateIf(model => model.globallyUniqueIdentifier).fulfills(
      new TagLengthStringValidator(
        'GloballyUniqueIdentifier',
        { value: UnreservedTemplateFieldCodes.ID_GLOBALLY_UNIQUE_IDENTIFIER },
        { maxLength: 32 },
      ),
    );
  }
}
