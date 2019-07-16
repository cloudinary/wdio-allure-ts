import { Cookie } from '@wdio/sync';
import { assert } from 'chai';
import { BrowserUtils, TestUtils } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts setCookie tests
 */
let retrievedCookiesArray: Cookie[];
let cookie: Cookie;
const TEST_PAGE_DOMAIN: string = '127.0.0.1';

describeCommon('Set Cookie', () => {
  beforeEach(() => {
    cookie = { name: TestUtils.randomString(5), value: TestUtils.randomString(5) };

    // tslint:disable-next-line:no-null-keyword
    BrowserUtils.setCookie(cookie, null);

    retrievedCookiesArray = browser.getCookies([cookie.name]);
  });

  it('expect unique cookie', () => {
    assert.equal(retrievedCookiesArray.length, 1, 'Incorrect number of retrieved cookies');
  });

  it('validate cookie name', () => {
    assert.equal(retrievedCookiesArray[0].name, cookie.name, 'Incorrect cookie name');
  });

  it('validate cookie value', () => {
    assert.equal(retrievedCookiesArray[0].value, cookie.value, 'Incorrect cookie value');
  });

  it('validate cookie with null domain value', () => {
    // tslint:disable-next-line:no-null-keyword
    BrowserUtils.setCookie(cookie, 'https://cloudinary.com/');
    retrievedCookiesArray = browser.getCookies([cookie.name]);

    assert.equal(retrievedCookiesArray[0].domain, TEST_PAGE_DOMAIN, 'Incorrect cookie domain');
  });
});
