import { assert } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

export const SUBMIT_BUTTON_ONE: string = "//*[@id='clickActionSpec']//*[@id='click-button-1']";
export const DOUBLE_CLICK_DIV: string = "//*[@id='clickActionSpec']//*[@id='div-double-click']";

/**
 * wdio-allure-ts Click actions on element test
 */
describeCommon('click', () => {
  it('singleClick ', () => {
    Reporter.step('Click button');
    BrowserUtils.click(SUBMIT_BUTTON_ONE);

    Reporter.step('Validate button clicked');
    assert.equal(BrowserUtils.getAttribute(SUBMIT_BUTTON_ONE, 'value'), 'Button Clicked');
  });

  it('doubleClick', () => {
    Reporter.step('Navigate to sample app');
    BrowserUtils.url(sampleAppUrl);

    Reporter.step('Double click on button');
    BrowserUtils.doubleClick(DOUBLE_CLICK_DIV);

    Reporter.step('Wait for div to be displayed');
    $(DOUBLE_CLICK_DIV).waitForDisplayed();

    Reporter.step('Validate double click worked');
    assert.equal($(DOUBLE_CLICK_DIV).getText(), 'Double click');
  });
});
