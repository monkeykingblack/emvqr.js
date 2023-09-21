import { assert, expect } from 'chai';
import {
  DecoderMpm,
  DuplicateTagException,
  InvalidTagException,
  TagLengthString,
  Unreserved,
} from '../../.build';

describe('UnreservedDecoderTest', () => {
  it('#testSuccessDecode', () => {
    const unreserved = DecoderMpm.decode('91320016A011223344998877070812345678', Unreserved);

    assert.isOk(unreserved.contextSpecificData);
    assert.isOk(unreserved.globallyUniqueIdentifier);

    assert.equal(unreserved.contextSpecificData?.size, 1);
    assert.equal(unreserved.contextSpecificData?.get('07')?.tag, '07');
    assert.equal(unreserved.contextSpecificData?.get('07')?.length, 8);
    assert.equal(unreserved.contextSpecificData?.get('07')?.value, '12345678');

    assert.equal(unreserved.globallyUniqueIdentifier?.tag, '00');
    assert.equal(unreserved.globallyUniqueIdentifier?.length, 16);
    assert.equal(unreserved.globallyUniqueIdentifier?.value, 'A011223344998877');
  });

  it('#testFailDecode', () => {
    expect(() => DecoderMpm.decode('91440016A011223344998877070812345678070812345678', Unreserved))
      .to.throw(DuplicateTagException)
      .that.satisfies(
        (error: DuplicateTagException) => error.value === '070812345678' && error.tag === '07',
      );

    expect(() => DecoderMpm.decode('91320016A011223344998877AA0812345678', Unreserved))
      .to.throw(InvalidTagException)
      .that.satisfies(
        (error: InvalidTagException) => error.value === 'AA0812345678' && error.tag === 'AA',
      );
  });

  it('#testSuccessDecodeEncode', () => {
    const unreserved = DecoderMpm.decode('91320016A011223344998877070812345678', Unreserved);

    assert.equal(unreserved.toString(), '0016A011223344998877070812345678');
  });

  it('#testSuccessEncode', () => {
    const contextSpecificData = new TagLengthString();
    contextSpecificData.setTag('07');
    contextSpecificData.setValue('12345678');

    const unreserved = new Unreserved();
    unreserved.setGloballyUniqueIdentifier('A011223344998877');
    unreserved.addContextSpecificData(contextSpecificData);

    assert.equal(unreserved.toString(), '0016A011223344998877070812345678');
  });
});
