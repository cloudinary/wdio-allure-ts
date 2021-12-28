import { describeCommon } from '../TestHelper';
import { Reporter, TestUtils } from '../..';
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
    Reporter.step('getData reads from file');
    const data: ITestData = TestUtils.getData();
    assert.equal(data.fileName, 'example');
  });

  it('Check incorrect user', () => {
    process.env.TEST_DATA_TAG = 'incorrect-user';
    Reporter.step('undefined returned in case of incorrect data tag');
    const data: ITestData = TestUtils.getData();
    assert.equal(data, undefined);
  });
});
