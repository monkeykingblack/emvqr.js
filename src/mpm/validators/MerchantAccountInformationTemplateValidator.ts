import { AbstractValidator } from 'fluent-ts-validator';
import {
  MerchantAccountInformationReserved,
  MerchantAccountInformationReservedAdditional,
  MerchantAccountInformationTemplate,
} from '../models';
import MerchantAccountInformationReservedValidator from './MerchantAccountInformationReservedValidator';
import MerchantAccountInformationReservedAdditionalValidator from './MerchantAccountInformationReservedAdditionalValidator';

export default class MerchantAccountInformationTemplateValidator extends AbstractValidator<MerchantAccountInformationTemplate> {
  constructor(tagStart: string, tagEnd: string, maxSizeValue: 99) {
    super();
    this.validateIf(model => model.tag)
      .isDefined()
      .isNotNull()
      .isNotEmpty()
      .fulfills(tag => !!tag && tag >= tagStart && tag <= tagEnd);

    this.validateIfString(model => model.value?.toString())
      .isDefined()
      .isNotNull()
      .isNotEmpty()
      .hasLengthBetween(1, maxSizeValue);

    this.validateIf(model => model)
      .fulfills(model => !!model.tag && model.tag >= '02' && model.tag <= '25')
      .when(model => model.value instanceof MerchantAccountInformationReserved)
      .withFailureMessage("MerchantAccountInformation reserved tag must be between '02' and '25'");

    this.validateIf(model => model.value)
      .fulfills(new MerchantAccountInformationReservedValidator())
      .when(model => model.value instanceof MerchantAccountInformationReserved);

    this.validateIf(model => model)
      .fulfills(model => !!model.tag && model.tag >= '25' && model.tag <= '51')
      .when(model => model.value instanceof MerchantAccountInformationReservedAdditional)
      .withFailureMessage(
        "MerchantAccountInformation reserved additional tag must be between '26' and '51'",
      );
    this.validateIf(model => model.value)
      .fulfills(new MerchantAccountInformationReservedAdditionalValidator())
      .when(model => model.value instanceof MerchantAccountInformationReservedAdditional);
  }
}
