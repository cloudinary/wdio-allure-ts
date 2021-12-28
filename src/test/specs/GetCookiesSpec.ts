import { assert } from 'chai';
import { BrowserUtils, Reporter, TestUtils } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts getCookie tests
 */
let cookie: WebDriver.Cookie;

describeCommon('GetCookieSpec', () => {
  beforeEach(() => {
    cookie = { name: TestUtils.randomString(), value: TestUtils.randomString() };
    Reporter.step('Set cookie');
    BrowserUtils.setCookies(cookie);
  });
  it('expect unique cookie', () => {
    Reporter.step('Validate number of cookies');
    assert.equal(BrowserUtils.getCookies().length, 1, 'Incorrect number of retrieved cookies');
  });

  it('get cookie by name', () => {
    Reporter.step('Get cookies name');
    assert.equal(BrowserUtils.getCookies()[0].name, cookie.name, 'Incorrect cookie name');
  });

  it('get cookie by value', () => {
    Reporter.step('Get cookies value');
    assert.equal(BrowserUtils.getCookies()[0].value, cookie.value, 'Incorrect cookie value');
  });
  afterEach(() => {
    Reporter.step('Delete cookie');
    BrowserUtils.deleteCookies();
  });
});
