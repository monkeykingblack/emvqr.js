import { assert } from 'chai';
import { TagLengthString, Unreserved } from '../../.build';

describe('UnreservedTest', () => {
  it('#testSuccessToString', () => {
    const contextSpecificData = new TagLengthString();
    contextSpecificData.setTag('07');
    contextSpecificData.setValue('12345678');

    const unreserved = new Unreserved();
    unreserved.setGloballyUniqueIdentifier('A011223344998877');
    unreserved.addContextSpecificData(contextSpecificData);

    assert.equal(unreserved.toString(), '0016A011223344998877070812345678');
  });

  it('#testSuccessConstructorTag', () => {
    const contextSpecificData = new TagLengthString();
    contextSpecificData.setTag('07');
    contextSpecificData.setValue('12345678');

    const unreserved = new Unreserved('07');
    unreserved.setGloballyUniqueIdentifier('A011223344998877');
    unreserved.addContextSpecificData(contextSpecificData);

    assert.equal(unreserved.toString(), '0016A011223344998877070812345678');
  });

  it('#testSuccessToStringWhenValueIsNull', () => {
    assert.equal(new Unreserved().toString(), '');
  });
});
