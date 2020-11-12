import { assert } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const RIGHT_CLICK_BUTTON_SELECTOR: string = "//*[@id='buttonRightMouseClick']";

/**
 * wdio-allure-ts Right Click actions on element test
 */
describeCommon('RightClickSpec', () => {
  it('RightClick ', () => {
    BrowserUtils.rightClick(RIGHT_CLICK_BUTTON_SELECTOR);
    assert.equal(BrowserUtils.getText(RIGHT_CLICK_BUTTON_SELECTOR), 'Button clicked');
  });
});
