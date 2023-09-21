import { assert } from 'chai';
import { DecoderMpm, TagLengthString, Unreserved, UnreservedTemplate } from '../../.build';

describe('UnreservedTemplateDecoderTest', () => {
  it('#testSuccessDecode', () => {
    const unreserved = DecoderMpm.decode(
      '91320016A011223344998877070812345678',
      UnreservedTemplate,
    );

    assert.isOk(unreserved.value);
    assert.equal(unreserved.tag, '91');
    assert.equal(unreserved.length, 32);

    assert.isOk(unreserved.value?.contextSpecificData);
    assert.isOk(unreserved.value?.globallyUniqueIdentifier);

    assert.equal(unreserved.value?.contextSpecificData?.size, 1);
    assert.equal(unreserved.value?.contextSpecificData?.get('07')?.tag, '07');
    assert.equal(unreserved.value?.contextSpecificData?.get('07')?.length, 8);
    assert.equal(unreserved.value?.contextSpecificData?.get('07')?.value, '12345678');

    assert.equal(unreserved.value?.globallyUniqueIdentifier?.tag, '00');
    assert.equal(unreserved.value?.globallyUniqueIdentifier?.length, 16);
    assert.equal(unreserved.value?.globallyUniqueIdentifier?.value, 'A011223344998877');
  });

  it('#testSuccessDecodeEncode', () => {
    const unreserved = DecoderMpm.decode(
      '91320016A011223344998877070812345678',
      UnreservedTemplate,
    );

    assert.equal(unreserved.toString(), '91320016A011223344998877070812345678');
  });

  it('#testSuccessEncode', () => {
    const contextSpecificData = new TagLengthString();
    contextSpecificData.setTag('07');
    contextSpecificData.setValue('12345678');

    const value = new Unreserved();
    value.setGloballyUniqueIdentifier('A011223344998877');
    value.addContextSpecificData(contextSpecificData);

    const unreserved = new UnreservedTemplate();
    unreserved.setValue(value);
    unreserved.setTag('91');

    assert.equal(unreserved.toString(), '91320016A011223344998877070812345678');
  });
});
