import { assert } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

describeCommon('IsDisplayed', () => {
  it('displayed true', async () => {
    Reporter.step('isDisplayed of displayed element');
    assert.isTrue(await BrowserUtils.isDisplayed("//*[@id='IsDisplayed']//button[@id='displayed_button']"));
  });

  it('displayed false', async () => {
    Reporter.step('isDisplayed of hidden element');
    assert.isFalse(await BrowserUtils.isDisplayed("//*[@id='IsDisplayed']//button[@id='not_displayed_button']"));
  });

  it('not exist element', async () => {
    Reporter.step('isDisplayed element not exist');
    assert.isFalse(await BrowserUtils.isDisplayed("//*[@id='IsDisplayed']//button[@id='not_such_button']"));
  });
});
