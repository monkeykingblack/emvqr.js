import { AbstractValidator } from 'fluent-ts-validator';
import { AdditionalDataFieldTemplate } from '../models';
import AdditionalDataFieldValidator from './AdditionalDataFieldValidator';

export default class AdditionalDataFieldTemplateValidator extends AbstractValidator<AdditionalDataFieldTemplate> {
  constructor() {
    super();
    this.validateIf(model => model.value)
      .fulfills(new AdditionalDataFieldValidator())
      .whenDefined();
  }
}
