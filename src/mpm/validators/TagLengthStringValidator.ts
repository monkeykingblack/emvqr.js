import { AbstractValidator } from 'fluent-ts-validator';
import { TagLengthString } from '../models';

export default class TagLengthStringValidator extends AbstractValidator<TagLengthString> {
  constructor(
    public readonly scope: string,
    public readonly tagValidators: { value?: string; tagStart?: string; tagEnd?: string },
    public readonly valueValidators: {
      minLength?: number;
      maxLength?: number;
      value?: string[] | string;
    },
  ) {
    super();
    TagLengthStringValidator.ruleForTag(this);
    TagLengthStringValidator.ruleForValue(this);
  }

  private static ruleForTag(self: TagLengthStringValidator) {
    const { scope, tagValidators } = self;
    const { value, tagStart, tagEnd } = tagValidators;
    self
      .validateIf(model => model.tag)
      .isNotNull()
      .isDefined()
      .isNotEmpty()
      .withFailureMessage(`${scope} tag is mandatory`);

    self
      .validateIfString(model => model.tag!)
      .isNumericString()
      .hasLength(2)
      .withFailureMessage(`${scope} tag must be size equal two`);

    self
      .validateIf(model => model.tag)
      .isEqualTo(value!)
      .when(() => !!value);

    self
      .validateIfString(model => model.tag!)
      .fulfills(value => value >= tagStart!)
      .when(() => !!tagStart)
      .withFailureMessage(`${scope} tag must be greater then ${tagStart}`);

    self
      .validateIfString(model => model.tag!)
      .fulfills(value => value <= tagEnd!)
      .when(() => !!tagEnd)
      .withFailureMessage(`${scope} tag must be less then ${tagEnd}`);
  }

  private static ruleForValue(self: TagLengthStringValidator) {
    const { scope, valueValidators } = self;
    const { maxLength, minLength, value } = valueValidators;

    self
      .validateIf(model => model.value)
      .isDefined()
      .isNotNull()
      .isNotEmpty()
      .withFailureMessage(`${scope} value is mandatory`);

    self
      .validateIfString(model => model.value!)
      .hasMaxLength(maxLength!)
      .when(() => !!maxLength)
      .withFailureMessage(`${scope} value must less then or equal size ${maxLength}`);

    self
      .validateIfString(model => model.value!)
      .hasMinLength(minLength!)
      .when(() => !!minLength)
      .withFailureMessage(`${scope} value must greater then or equal size ${minLength}`);
  }
}
