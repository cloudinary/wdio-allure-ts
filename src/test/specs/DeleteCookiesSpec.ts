import { assert } from 'chai';
import { BrowserUtils, TestUtils } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts deleteCookie tests
 */
describeCommon('DeleteCookieSpec', () => {
  beforeEach(() => {
    BrowserUtils.setCookies({ name: TestUtils.randomString(), value: TestUtils.randomString() }, null);
  });
  it('expect empty cookie', () => {
    BrowserUtils.deleteCookies();
    assert.equal(BrowserUtils.getCookies().length, 0, 'Incorrect number of retrieved cookies');
  });

  it('delete all cookie', () => {
    BrowserUtils.deleteCookies();
    assert.equal(BrowserUtils.getCookies()[0], undefined, 'Cookie has not been removed');
  });
});
