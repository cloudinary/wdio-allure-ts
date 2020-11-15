import { describeCommon } from '../TestHelper';
import { TestUtils } from '../..';
import { assert } from 'chai';

/**
 * GetTestDataFileSpec
 */

interface ITestData {
  fileName?: string;
  count?: number;
}

describeCommon('GetTestDataFileSpec', () => {
  it('Check get test data from env file', () => {
    process.env.TEST_DATA_TAG = 'test-user';
    const data: ITestData = TestUtils.getData();
    assert.equal(data.fileName, 'example');
  });

  it('Check incorrect user', () => {
    process.env.TEST_DATA_TAG = 'incorrect-user';
    const data: ITestData = TestUtils.getData();
    assert.equal(data, undefined);
  });
});
