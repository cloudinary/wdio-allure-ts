import { assert } from 'chai';
import { BrowserUtils, Reporter, TestUtils } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts deleteCookie tests
 */
describeCommon('DeleteCookieSpec', () => {
  beforeEach(async () => {
    await Reporter.step('Set cookie for tests');
    await BrowserUtils.setCookies({ name: TestUtils.randomString(), value: TestUtils.randomString() });
  });
  it('expect empty cookie', async () => {
    await Reporter.step('Delete cookies');
    await BrowserUtils.deleteCookies();

    await Reporter.step('Validate no cookies');
    assert.equal((await BrowserUtils.getCookies()).length, 0, 'Incorrect number of retrieved cookies');
  });
});
