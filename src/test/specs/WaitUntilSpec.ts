import { assert, expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';

import { describeCommon } from '../TestHelper';

const TIMEOUT: number = 4000;
const HEADER_TEXT_H1: string = "//*[@id='WaitUntilSection']/header/h1";
const TEXT_ELEMENT_SELECTOR: string = "//*[@data-test='text-field-wu']";
const TEXT_ELEMENT_VALUE: string = 'Cloudinary 1';
const INCORRECT_TEXT_ELEMENT_VALUE: string = 'Not Cloudinary';

/**
 * wdio-allure-ts WaitUntil test
 */
describeCommon('WaitUntilSpec of BrowserUtils Tests', () => {
  it('Validate text found within given timeout ', () => {
    Reporter.step('Validate element displayed');
    BrowserUtils.waitForDisplayed(TEXT_ELEMENT_SELECTOR);

    Reporter.step('Validate success within given timeout');
    assert.isTrue(
      BrowserUtils.waitUntil(() => BrowserUtils.getText(TEXT_ELEMENT_SELECTOR) === TEXT_ELEMENT_VALUE, {
        timeout: TIMEOUT,
        timeoutMsg: 'Some Error',
      })
    );
  });

  it('Validate text not found withing timeout and error message shown ', () => {
    Reporter.step('scroll to element');
    BrowserUtils.scrollIntoView(HEADER_TEXT_H1);

    Reporter.step('Validate failure within given timeout');
    expect(() =>
      BrowserUtils.waitUntil(() => BrowserUtils.getText(HEADER_TEXT_H1) === INCORRECT_TEXT_ELEMENT_VALUE, {
        timeoutMsg: `Didn't find '${INCORRECT_TEXT_ELEMENT_VALUE}' text in given timeout`,
        timeout: TIMEOUT,
      })
    )
      .to.throw(Error)
      .with.property('message')
      .contains(`Didn't find '${INCORRECT_TEXT_ELEMENT_VALUE}' text in given timeout`);
  });

  it('Validate text found within default timeout ', () => {
    Reporter.step('Validate element displayed');
    BrowserUtils.waitForDisplayed(TEXT_ELEMENT_SELECTOR);

    Reporter.step('Validate success within default timeout');
    assert.isTrue(BrowserUtils.waitUntil(() => BrowserUtils.getText(TEXT_ELEMENT_SELECTOR) === TEXT_ELEMENT_VALUE));
  });

  it('Validate text not found within default timeout and default error message shown', () => {
    Reporter.step('Validate element displayed');
    BrowserUtils.waitForDisplayed(TEXT_ELEMENT_SELECTOR);

    Reporter.step('Validate success within default timeout and default error message');
    expect(() =>
      BrowserUtils.waitUntil(() => BrowserUtils.getText(TEXT_ELEMENT_SELECTOR) === INCORRECT_TEXT_ELEMENT_VALUE)
    )
      .to.throw(Error)
      .with.property('message');
  });
});
