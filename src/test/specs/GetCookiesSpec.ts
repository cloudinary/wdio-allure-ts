import { assert } from 'chai';
import { BrowserUtils, TestUtils } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts getCookie tests
 */
let cookie: WebDriver.Cookie;

describeCommon('GetCookieSpec', () => {
  beforeEach(() => {
    cookie = { name: TestUtils.randomString(), value: TestUtils.randomString() };
    BrowserUtils.setCookies(cookie, null);
  });
  it('expect unique cookie', () => {
    assert.equal(BrowserUtils.getCookies().length, 1, 'Incorrect number of retrieved cookies');
  });

  it('get cookie by name', () => {
    assert.equal(BrowserUtils.getCookies()[0].name, cookie.name, 'Incorrect cookie name');
  });

  it('get cookie by value', () => {
    assert.equal(BrowserUtils.getCookies()[0].value, cookie.value, 'Incorrect cookie value');
  });
  afterEach(() => {
    BrowserUtils.deleteCookies();
  });
});
