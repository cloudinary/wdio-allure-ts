import { assert } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

export const SUBMIT_BUTTON_ONE: string = "//*[@id='clickActionSpec']//*[@id='click-button-1']";
export const DOUBLE_CLICK_DIV: string = "//*[@id='clickActionSpec']//*[@id='div-double-click']";

/**
 * wdio-allure-ts Click actions on element test
 */
describeCommon('click', () => {
  it('singleClick ', async () => {
    await Reporter.step('Click button');
    await BrowserUtils.click(SUBMIT_BUTTON_ONE);

    await Reporter.step('Validate button clicked');
    assert.equal(await BrowserUtils.getAttribute(SUBMIT_BUTTON_ONE, 'value'), 'Button Clicked');
  });

  it('doubleClick', async () => {
    await Reporter.step('Navigate to sample app');
    await BrowserUtils.url(sampleAppUrl);

    await Reporter.step('Double click on button');
    await BrowserUtils.doubleClick(DOUBLE_CLICK_DIV);

    await Reporter.step('Wait for div to be displayed');
    await $(DOUBLE_CLICK_DIV).waitForDisplayed();

    await Reporter.step('Validate double click worked');
    assert.equal(await $(DOUBLE_CLICK_DIV).getText(), 'Double click');
  });
});
