import { assert } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const SUBMIT_BUTTON_ONE: string =
  "//*[@id='clickActionSpec']//*[@id='click-button-1']";
const FRAME_ONE: string = "//*[@id='iframe1']";
//const FRAME_TWO: string = "//*[@id='iframe2']"
/**
 * wdio-allure-ts Switch to iFrame actions
 */

describeCommon('iFrame', () => {
  it('Single click in iFrame', () => {
    BrowserUtils.switchToFrame(FRAME_ONE);
    $(SUBMIT_BUTTON_ONE).click();
    assert.equal(
      BrowserUtils.getAttribute(SUBMIT_BUTTON_ONE, 'value'),
      'Button Clicked In Frame'
    );
  });

  // it('doubleClick', () => {
  //   BrowserUtils.navigateToUrl(sampleAppUrl);
  //   BrowserUtils.doubleClick(PageLocator.DOUBLE_CLICK_DIV);
  //   $(PageLocator.DOUBLE_CLICK_DIV).waitForDisplayed();
  //   assert.equal($(PageLocator.DOUBLE_CLICK_DIV).getText(), 'Double click');
  // });
});
