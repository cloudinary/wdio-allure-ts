import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const TEST_FIELD_SELECTOR: string = "//*[@id='ExpectText']";
const STATIC_TEXT_SELECTOR: string = `${TEST_FIELD_SELECTOR}//*[@id='static_text']`;
const DYNAMIC_TEXT_SELECTOR: string = `${TEST_FIELD_SELECTOR}//*[@id='dynamic_text']`;
const HIDDEN_TEXT_SELECTOR: string = `${TEST_FIELD_SELECTOR}//*[@id='hidden_text']`;
const CHANGE_TEXT_BUTTON_SELECTOR: string = `${TEST_FIELD_SELECTOR}//button[@id='update_text']`;
/**
 * wdio-allure-ts waitForText tests
 */
describeCommon('waitForText', () => {
  it('correct text', () => {
    Reporter.step('wait for correct text');
    expect(() => BrowserUtils.waitForText(STATIC_TEXT_SELECTOR, 'Cloudinary rules!')).to.not.throw();
  });

  it('hidden text', () => {
    Reporter.step('Wait for text of hidden element throws error');
    expect(() => BrowserUtils.waitForText(HIDDEN_TEXT_SELECTOR, 'Cloudinary rules!'))
      .to.throw()
      .with.property('message')
      .contains('Element not visible');
  });

  it('dynamic text', () => {
    Reporter.step('Wait for button to be displayed');
    $(CHANGE_TEXT_BUTTON_SELECTOR).waitForDisplayed();

    Reporter.step('Click button');
    $(CHANGE_TEXT_BUTTON_SELECTOR).click();

    Reporter.step('Wait for text change');
    BrowserUtils.waitForText(DYNAMIC_TEXT_SELECTOR, 'Cloudinary still rules!');
  });

  it('fail on case sensitive', () => {
    Reporter.step('Check case sensitive text');
    expect(() => BrowserUtils.waitForText(STATIC_TEXT_SELECTOR, 'cloudinary rules!'))
      .to.throw(Error)
      .with.property('message')
      .contains('waitUntil condition timed out');
  });

  it('fail on wrong text', () => {
    Reporter.step('wait for incorrect text throw an error');
    expect(() => BrowserUtils.waitForText(STATIC_TEXT_SELECTOR, 'Cloudinary not rules!'))
      .to.throw(Error)
      .with.property('message')
      .contains('waitUntil condition timed out');
  });
});
