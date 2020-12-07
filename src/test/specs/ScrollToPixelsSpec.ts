import { assert } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const TEST_DIV_ID: string = 'scrollToPixelsDiv';
const TEST_FIELD_SELECTOR: string = `//*[@id='${TEST_DIV_ID}']`;

describeCommon('ScrollToPixels', () => {
  it('scroll to y value', () => {
    const scrollToYValue: number = 50;
    BrowserUtils.scrollToPixels(TEST_FIELD_SELECTOR, 0, scrollToYValue);
    assert.isTrue(getVerticalPosition() === scrollToYValue);
  });
  it('scroll to x value', () => {
    const scrollToXValue: number = 50;
    BrowserUtils.scrollToPixels(TEST_FIELD_SELECTOR, scrollToXValue, 0);
    assert.isTrue(getHorizontalPosition() === scrollToXValue);
  });
});

function getVerticalPosition(): number {
  const script: string = `return document.getElementById('${TEST_DIV_ID}').scrollTop`;
  return Number(BrowserUtils.executeScript(script));
}

function getHorizontalPosition(): number {
  const script: string = `return document.getElementById('${TEST_DIV_ID}').scrollLeft`;
  return Number(BrowserUtils.executeScript(script));
}
