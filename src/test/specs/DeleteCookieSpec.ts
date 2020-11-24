import { assert } from 'chai';
import { BrowserUtils, TestUtils } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts deleteCookie tests
 */
let cookie: WebDriver.Cookie;
// @ts-ignore
const emptyCookie: WebDriver.Cookie;

describeCommon('DeleteCookieSpec', () => {
  beforeEach(() => {
    cookie = { name: TestUtils.randomString(), value: TestUtils.randomString() };
    browser.setCookies(cookie);
  });
  it('expect empty cookie', () => {
    BrowserUtils.deleteCookie();
    assert.equal(browser.getCookies().length, 0, 'Incorrect number of retrieved cookies');
  });

  it('delete all cookie', () => {
    BrowserUtils.deleteCookie();
    assert.equal(browser.getCookies()[0], emptyCookie, 'Cookie has not been removed');
  });
});
