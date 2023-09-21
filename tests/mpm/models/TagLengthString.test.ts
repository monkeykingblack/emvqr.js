import { assert } from 'chai';
import { TagLengthString } from '../../.build';

describe('TagLengthStringTest', () => {
  it('#testSuccessToString', () => {
    const tagLengthString = new TagLengthString('02', '1234');
    assert.equal(tagLengthString.toString(), '02041234');
    tagLengthString.setTag('03');
    tagLengthString.setValue('5678');
    assert.equal(tagLengthString.toString(), '03045678');
  });

  it('#testSuccessToStringWhenValueIsUndefined', () => {
    const tagLengthString = new TagLengthString('02', undefined);
    assert.equal(tagLengthString.toString(), '');
    tagLengthString.setValue();
    assert.equal(tagLengthString.toString(), '');
  });

  it('#testSuccessToStringWhenValueIsEmpty', () => {
    const tagLengthString = new TagLengthString('02', '');
    assert.equal(tagLengthString.toString(), '');
  });
});
