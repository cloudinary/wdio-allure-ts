import { assert } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

describeCommon('IsDisplayed', () => {
  it('displayed true', () => {
    assert.isTrue(BrowserUtils.isDisplayed("//*[@id='IsDisplayed']//button[@id='displayed_button']"));
  });

  it('displayed false', () => {
    assert.isFalse(BrowserUtils.isDisplayed("//*[@id='IsDisplayed']//button[@id='not_displayed_button']"));
  });

  it('not exist element', () => {
    assert.isFalse(BrowserUtils.isDisplayed("//*[@id='IsDisplayed']//button[@id='not_such_button']"));
  });
});
