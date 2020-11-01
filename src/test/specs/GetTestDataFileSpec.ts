import { describeCommon } from '../TestHelper';
import { TestUtils } from '../..';
import { assert } from 'chai';

export const YOUR_ATTRIBUTE = process.env.YOUR_ATTRIBUTE!;

/**
 * GetTestDataFileSpec
 */
const FILE_PATH: string = 'src/test/resources/example.json';

describeCommon('GetTestDataFileSpec', () => {
  it('Check get test data from env file', () => {
    const a: object = TestUtils.getDataFromFile(FILE_PATH);
    // @ts-ignore
    assert.equal(a.fileName, 'example');
  });
});
