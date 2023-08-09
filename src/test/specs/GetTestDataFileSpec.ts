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
  it.skip('Check get test data from env file', async () => {
    process.env.TEST_DATA_TAG = 'test-user';
    await Reporter.step('getData reads from file');
    const data: ITestData = await TestUtils.getData();
    assert.equal(data.fileName, 'example');
  });

  it.skip('Check incorrect user', async () => {
    process.env.TEST_DATA_TAG = 'incorrect-user';
    await Reporter.step('undefined returned in case of incorrect data tag');
    const data: ITestData = await TestUtils.getData();
    assert.equal(data, undefined);
  });
});
