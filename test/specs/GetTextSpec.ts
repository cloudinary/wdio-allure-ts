import { assert, expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const OPEN_CLOSE_CURTAIN_BTN: string = "//input[@id='change-name-btn']";

/**
 * wdio-allure-ts navigateToUrl action test
 */
describeCommon('GetText of BrowserUtils Tests', () => {
  it('Validate single result ', () => {
    assert.equal(
      BrowserUtils.getText("//button[@data-test='open-tab-btn']"),
      'Open tab'
    );
  });

  it('Validate multiple result ending in err ', () => {
    expect(() => BrowserUtils.getText("//*[@class='Cloudinary']"))
      .to.throw(Error)
      .with.property('message')
      .contains('Element not exist');
  });

  it.only('Validate expectedText  ', () => {
    BrowserUtils.scrollIntoView(OPEN_CLOSE_CURTAIN_BTN);

    browser.call(() =>
      BrowserUtils.expectText(OPEN_CLOSE_CURTAIN_BTN, 'Close Curtain')
    );
    browser.debug();
    browser.pause(500);
    BrowserUtils.click(OPEN_CLOSE_CURTAIN_BTN);
    browser.call(() =>
      BrowserUtils.expectText(OPEN_CLOSE_CURTAIN_BTN, 'Open Curtain')
    );
  });
});
