import { describeCommon } from '../TestHelper';
import { TestUtils } from '../..';
import { assert } from 'chai';

export const YOUR_ATTRIBUTE = process.env.YOUR_ATTRIBUTE!;

/**
 * GetTestDataFileSpec
 */

describeCommon('GetTestDataFileSpec', () => {
  it('Check get test data from env file', () => {
    const a: object = TestUtils.getDataFromFile();
    // @ts-ignore
    assert.equal(a.fileName, 'example');
  });
});
