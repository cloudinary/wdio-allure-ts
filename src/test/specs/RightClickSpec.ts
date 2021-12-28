import { assert } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const RIGHT_CLICK_BUTTON_SELECTOR: string = "//*[@id='buttonRightMouseClick']";

/**
 * wdio-allure-ts Right Click actions on element test
 */
describeCommon('RightClickSpec', () => {
  it('RightClick ', () => {
    Reporter.step('Right click on button');
    BrowserUtils.click(RIGHT_CLICK_BUTTON_SELECTOR, { button: 'right' });

    Reporter.step(`Validate right click execution`);
    assert.equal(BrowserUtils.getText(RIGHT_CLICK_BUTTON_SELECTOR), 'Button clicked');
  });
});
