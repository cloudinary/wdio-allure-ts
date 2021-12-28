import { assert } from 'chai';
import { BrowserUtils, Reporter, TestUtils } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts deleteCookie tests
 */
describeCommon('DeleteCookieSpec', () => {
  beforeEach(() => {
    Reporter.step('Set cookie for tests');
    BrowserUtils.setCookies({ name: TestUtils.randomString(), value: TestUtils.randomString() });
  });
  it('expect empty cookie', () => {
    Reporter.step('Delete cookies');
    BrowserUtils.deleteCookies();

    Reporter.step('Validate no cookies');
    assert.equal(BrowserUtils.getCookies().length, 0, 'Incorrect number of retrieved cookies');
  });
});
