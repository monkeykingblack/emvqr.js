import DecoderMpm from './DecoderMpm';
import { TagLengthString, Unreserved } from '../models';
import { ExtractFunctionKeys, TypeConstructor } from '../types';
import { UnreservedTemplateFieldCodes } from '../constant';
import TLVUtils from '../../utils/TLVUtils';
import { DuplicateTagException, InvalidTagException } from '../../exceptions';

export default class UnreservedDecoder extends DecoderMpm<Unreserved> {
  private static mapConsumers = new Map<
    string,
    [TypeConstructor<unknown>, ExtractFunctionKeys<Unreserved>]
  >();

  static {
    this.registerDecoder(Unreserved, UnreservedDecoder);
    this.mapConsumers.set(UnreservedTemplateFieldCodes.ID_GLOBALLY_UNIQUE_IDENTIFIER, [
      String,
      'setGloballyUniqueIdentifier',
    ]);
    this.mapConsumers.set(UnreservedTemplateFieldCodes.ID_CONTEXT_SPECIFIC_DATA, [
      TagLengthString,
      'addContextSpecificData',
    ]);
  }

  constructor(source: string) {
    super(TLVUtils.valueOf(source));
  }

  protected decode(): Unreserved {
    const tags = new Set<string>();

    const value = new Unreserved();

    let result: IteratorResult<string>;
    do {
      result = this.iterator.next();

      const tag = TLVUtils.valueOfTag(result.value);

      const derivateId = this.derivateId(tag);

      if (tags.has(tag)) {
        throw new DuplicateTagException('Unreserved', tag, result.value);
      }

      tags.add(tag);

      const entry = UnreservedDecoder.mapConsumers.get(derivateId);

      if (!entry) {
        throw new InvalidTagException('Unreserved', tag, result.value);
      }

      const clazz = entry[0];

      const consumer = entry[1];

      const args: [any] = [DecoderMpm.decode(result.value, clazz)];

      value[consumer](...args);
    } while (!result.done);

    return value;
  }

  private derivateId(id: string) {
    if (this.betweenContextSpecificDataRange(id)) {
      return UnreservedTemplateFieldCodes.ID_CONTEXT_SPECIFIC_DATA;
    }

    return id;
  }

  private betweenContextSpecificDataRange(value: string) {
    return (
      value.localeCompare(UnreservedTemplateFieldCodes.ID_CONTEXT_SPECIFIC_DATA_START) >= 0 &&
      value.localeCompare(UnreservedTemplateFieldCodes.ID_CONTEXT_SPECIFIC_DATA_END) <= 0
    );
  }
}
