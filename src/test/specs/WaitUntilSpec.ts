import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
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
  it('Validate text found within given timeout ', async () => {
    await Reporter.step('Validate element displayed');
    await BrowserUtils.waitForDisplayed(TEXT_ELEMENT_SELECTOR);

    await Reporter.step('Validate success within given timeout');
    await BrowserUtils.waitUntil(
      async () => (await BrowserUtils.getText(TEXT_ELEMENT_SELECTOR)) === TEXT_ELEMENT_VALUE,
      {
        timeout: TIMEOUT,
        timeoutMsg: 'Some Error',
      }
    );
  });

  it('Validate text not found withing timeout and error message shown ', async () => {
    await Reporter.step('scroll to element');
    await BrowserUtils.scrollIntoView(HEADER_TEXT_H1);

    await Reporter.step('Validate failure within given timeout');
    await chai
      .expect(
        BrowserUtils.waitUntil(
          async () => (await BrowserUtils.getText(HEADER_TEXT_H1)) === INCORRECT_TEXT_ELEMENT_VALUE,
          {
            timeoutMsg: `Didn't find '${INCORRECT_TEXT_ELEMENT_VALUE}' text in given timeout`,
            timeout: TIMEOUT,
          }
        )
      )
      .to.rejectedWith(Error, `Didn't find '${INCORRECT_TEXT_ELEMENT_VALUE}' text in given timeout`);
  });

  it('Validate text found within default timeout ', async () => {
    await Reporter.step('Validate element displayed');
    await BrowserUtils.waitForDisplayed(TEXT_ELEMENT_SELECTOR);

    await Reporter.step('Validate success within default timeout');
    await BrowserUtils.waitUntil(
      async () => (await BrowserUtils.getText(TEXT_ELEMENT_SELECTOR)) === TEXT_ELEMENT_VALUE
    );
  });

  it('Validate text not found within default timeout and default error message shown', async () => {
    await Reporter.step('Validate element displayed');
    await BrowserUtils.waitForDisplayed(TEXT_ELEMENT_SELECTOR);

    await Reporter.step('Validate success within default timeout and default error message');
    await chai
      .expect(
        BrowserUtils.waitUntil(
          async () => (await BrowserUtils.getText(TEXT_ELEMENT_SELECTOR)) === INCORRECT_TEXT_ELEMENT_VALUE
        )
      )
      .to.rejectedWith(Error);
  });
});
