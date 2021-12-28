import { Cookie } from '@wdio/protocols/build/types';
import { assert } from 'chai';
import { BrowserUtils, Reporter, TestUtils } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts setCookie tests
 */
let retrievedCookiesArray: Array<Cookie>;
let cookie: Cookie;

describeCommon('setCookies', () => {
  beforeEach(() => {
    cookie = { name: TestUtils.randomString(5), value: TestUtils.randomString(5) };

    Reporter.step('set cookie');
    BrowserUtils.setCookies(cookie);

    Reporter.step('get cookies array');
    retrievedCookiesArray = browser.getCookies([cookie.name]);
  });

  it('expect unique cookie', () => {
    Reporter.step('Validate cookies number');
    assert.equal(retrievedCookiesArray.length, 1, 'Incorrect number of retrieved cookies');
  });

  it('validate cookie name', () => {
    Reporter.step('Validate cookie name');
    assert.equal(retrievedCookiesArray[0].name, cookie.name, 'Incorrect cookie name');
  });

  it('validate cookie value', () => {
    Reporter.step('Validate cookie value');
    assert.equal(retrievedCookiesArray[0].value, cookie.value, 'Incorrect cookie value');
  });
});
