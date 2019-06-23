import { assert } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon, sampleAppUrl } from '../TestHelper';

export const SUBMIT_BUTTON_ONE: string = "//*[@id='clickActionSpec']//*[@id='click-button-1']";
export const DOUBLE_CLICK_DIV: string = "//*[@id='clickActionSpec']//*[@id='div-double-click']";

/**
 * wdio-allure-ts Click actions on element test
 */
describeCommon('click', () => {
  it('singleClick ', () => {
    BrowserUtils.click(SUBMIT_BUTTON_ONE);
    assert.equal(BrowserUtils.getAttribute(SUBMIT_BUTTON_ONE, 'value'), 'Button Clicked');
  });

  it('doubleClick', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);
    BrowserUtils.doubleClick(DOUBLE_CLICK_DIV);
    $(DOUBLE_CLICK_DIV).waitForDisplayed();
    assert.equal($(DOUBLE_CLICK_DIV).getText(), 'Double click');
  });
});
