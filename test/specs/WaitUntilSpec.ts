import { assert, expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const TIMEOUT: number = 3000;
const TEXT_ELEMENT_SELECTOR: string = "//*[@data-test='text-field-1']";
const TEXT_ELEMENT_VALUE: string = 'Cloudinary';
const INCORRECT_TEXT_ELEMENT_VALUE: string = 'Not Cloudinary';

/**
 * wdio-allure-ts WaitUntil test
 */
describeCommon('WaitUntilSpec of BrowserUtils Tests', () => {
  it('Validate text found within given timeout ', () => {
    assert.isTrue(
      BrowserUtils.waitUntil(
        () => browser.getText(TEXT_ELEMENT_SELECTOR) === TEXT_ELEMENT_VALUE,
        'Some Error',
        TIMEOUT
      )
    );
  });

  it('Validate text not found withing timeout and error message shown ', () => {
    expect(() =>
      BrowserUtils.waitUntil(
        () =>
          browser.getText(TEXT_ELEMENT_SELECTOR) ===
          INCORRECT_TEXT_ELEMENT_VALUE,
        `Didn't find '${INCORRECT_TEXT_ELEMENT_VALUE}' text in given timeout`,
        TIMEOUT
      )
    )
      .to.throw(Error)
      .with.property('message')
      .contains(
        `Didn't find '${INCORRECT_TEXT_ELEMENT_VALUE}' text in given timeout`
      );
  });

  it('Validate text found within default timeout ', () => {
    assert.isTrue(
      BrowserUtils.waitUntil(
        () => browser.getText(TEXT_ELEMENT_SELECTOR) === TEXT_ELEMENT_VALUE
      )
    );
  });

  it('Validate text not found within default timeout and default error message shown', () => {
    expect(() =>
      BrowserUtils.waitUntil(
        () =>
          browser.getText(TEXT_ELEMENT_SELECTOR) ===
          INCORRECT_TEXT_ELEMENT_VALUE
      )
    )
      .to.throw(Error)
      .with.property('message')
      .contains('Promise was rejected with the following reason: timeout');
  });
});
