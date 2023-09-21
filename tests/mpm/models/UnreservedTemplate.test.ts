import { assert } from 'chai';
import { TagLengthString, Unreserved, UnreservedTemplate } from '../../.build';

describe('UnreservedTemplateTest', () => {
  it('#testSuccessToString', () => {
    const contextSpecificData = new TagLengthString();
    contextSpecificData.setTag('07');
    contextSpecificData.setValue('12345678');

    const value = new Unreserved();
    value.setGloballyUniqueIdentifier('A011223344998877');
    value.addContextSpecificData(contextSpecificData);

    const unreservedTemplate = new UnreservedTemplate();
    unreservedTemplate.setValue(value);
    unreservedTemplate.setTag('91');

    assert.equal(unreservedTemplate.toString(), '91320016A011223344998877070812345678');
  });

  it('#testSuccessConstructorTag', () => {
    const contextSpecificData = new TagLengthString();
    contextSpecificData.setTag('07');
    contextSpecificData.setValue('12345678');

    const value = new Unreserved('07');
    value.setGloballyUniqueIdentifier('A011223344998877');
    value.addContextSpecificData(contextSpecificData);

    const unreservedTemplate = new UnreservedTemplate('91');
    unreservedTemplate.setValue(value);

    assert.equal(unreservedTemplate.toString(), '91320016A011223344998877070812345678');
  });

  it('#testSuccessToStringWhenValueIsOrUndefined', () => {
    const unreservedTemplate = new UnreservedTemplate();
    unreservedTemplate.setTag('91');
    assert.equal(unreservedTemplate.toString(), '');
    unreservedTemplate.setValue();
    assert.equal(unreservedTemplate.toString(), '');
  });
});
