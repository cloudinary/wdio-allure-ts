import { assert } from 'chai';
import { BrowserUtils, TestUtils } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts deleteCookie tests
 */
let cookie: WebDriver.Cookie;
const emptyCookie: WebDriver.Cookie = undefined;

describeCommon('DeleteCookieSpec', () => {
  beforeEach(() => {
    cookie = { name: TestUtils.randomString(), value: TestUtils.randomString() };
    BrowserUtils.setCookie(cookie, null);
  });
  it('expect empty cookie', () => {
    BrowserUtils.deleteCookies();
    assert.equal(BrowserUtils.getCookies().length, 0, 'Incorrect number of retrieved cookies');
  });

  it('delete all cookie', () => {
    BrowserUtils.deleteCookies();
    assert.equal(BrowserUtils.getCookies()[0], emptyCookie, 'Cookie has not been removed');
  });
});
