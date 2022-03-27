import { assert } from 'chai';
import { BrowserUtils, Reporter, TestUtils } from '../..';
import { describeCommon } from '../TestHelper';
import { Cookie } from '@wdio/protocols/build/types';

/**
 * wdio-allure-ts getCookie tests
 */
let cookie: Cookie;

describeCommon('GetCookieSpec', () => {
  beforeEach(async () => {
    cookie = { name: TestUtils.randomString(), value: TestUtils.randomString() };
    await Reporter.step('Set cookie');
    await BrowserUtils.setCookies(cookie);
  });
  it('expect unique cookie', async () => {
    await Reporter.step('Validate number of cookies');
    assert.equal((await BrowserUtils.getCookies()).length, 1, 'Incorrect number of retrieved cookies');
  });

  it('get cookie by name', async () => {
    await Reporter.step('Get cookies name');
    assert.equal((await BrowserUtils.getCookies())[0].name, cookie.name, 'Incorrect cookie name');
  });

  it('get cookie by value', async () => {
    await Reporter.step('Get cookies value');
    assert.equal((await BrowserUtils.getCookies())[0].value, cookie.value, 'Incorrect cookie value');
  });
  afterEach(async () => {
    await Reporter.step('Delete cookie');
    await BrowserUtils.deleteCookies();
  });
});
