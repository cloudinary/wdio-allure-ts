import { assert, expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
// tslint:disable-next-line:no-http-string
const sampleAppUrl: string = 'http://127.0.0.1:8000/';
const TIMEOUT: number = 3000;

/**
 * wdio-allure-ts WaitUntil test
 */
describe('WaitUntilSpec of BrowserUtils Tests', () => {
  it('Validate text found within given timeout ', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);

    assert.isTrue(
      BrowserUtils.waitUntil(
        () =>
          browser.getText("//*[@class='button-print-message']") ===
          'Print message',
        'Some Error',
        TIMEOUT
      )
    );
  });

  it('Validate text not found withing timeout and error message shown ', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);

    expect(() =>
      BrowserUtils.waitUntil(
        () =>
          browser.getText("//*[@class='button-print-message']") ===
          'Print messageeeee',
        `Didn't find 'Print messageeeee' text in given timeout`,
        TIMEOUT
      )
    )
      .to.throw(Error)
      .with.property('message')
      .contains(`Didn't find 'Print messageeeee' text in given timeout`);
  });

  it('Validate text found within default timeout ', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);
    BrowserUtils.refreshBrowser();
    assert.isTrue(
      BrowserUtils.waitUntil(
        () =>
          browser.getText(`//*[@class='button-print-message']`) ===
          'Print message'
      )
    );
  });

  it('Validate text not found withintsc default timeout and default error message shown', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);

    expect(() =>
      BrowserUtils.waitUntil(
        () =>
          browser.getText("//*[@class='button-print-message']") ===
          'Print messageeeee'
      )
    )
      .to.throw(Error)
      .with.property('message')
      .contains('Promise was rejected with the following reason: timeout');
  });
});
