import { assert } from 'chai';
import { DecoderMpm, TagLengthString } from '../../.build';

describe('TagLengthStringDecoderTest', () => {
  it('#testSuccessDecode', () => {
    const tagLengthString = DecoderMpm.decode('02041234', TagLengthString);

    assert.isOk(tagLengthString);
    assert.equal(tagLengthString.tag, '02');
    assert.equal(tagLengthString.length, 4);
    assert.equal(tagLengthString.value, '1234');
  });

  it('#testSuccessDecodeEncode', () => {
    const tagLengthString = DecoderMpm.decode('02041234', TagLengthString);

    assert.equal(tagLengthString.toString(), '02041234');
  });
});
