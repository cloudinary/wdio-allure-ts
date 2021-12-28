import { assert } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

describeCommon('IsDisplayed', () => {
  it('displayed true', () => {
    Reporter.step('isDisplayed of displayed element');
    assert.isTrue(BrowserUtils.isDisplayed("//*[@id='IsDisplayed']//button[@id='displayed_button']"));
  });

  it('displayed false', () => {
    Reporter.step('isDisplayed of hidden element');
    assert.isFalse(BrowserUtils.isDisplayed("//*[@id='IsDisplayed']//button[@id='not_displayed_button']"));
  });

  it('not exist element', () => {
    Reporter.step('isDisplayed element not exist');
    assert.isFalse(BrowserUtils.isDisplayed("//*[@id='IsDisplayed']//button[@id='not_such_button']"));
  });
});
