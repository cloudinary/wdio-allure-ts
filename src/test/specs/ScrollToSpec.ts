import { assert } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const TEST_DIV_ID: string = 'scrollToPixelsDiv';
const TEST_FIELD_SELECTOR: string = `//*[@id='${TEST_DIV_ID}']`;

describeCommon('ScrollTo', () => {
  it('scroll to y value', () => {
    const scrollToYValue: number = 50;
    Reporter.step('scroll to y value');
    BrowserUtils.scrollTo(TEST_FIELD_SELECTOR, 0, scrollToYValue);

    Reporter.step('validate correct position');
    assert.isTrue(getVerticalPosition() === scrollToYValue);
  });
  it('scroll to x value', () => {
    const scrollToXValue: number = 50;
    Reporter.step('scroll to x value');
    BrowserUtils.scrollTo(TEST_FIELD_SELECTOR, scrollToXValue, 0);

    Reporter.step('validate correct position');
    assert.isTrue(getHorizontalPosition() === scrollToXValue);
  });
});

function getVerticalPosition(): number {
  Reporter.step('get vertical position');
  const script: string = `return document.getElementById('${TEST_DIV_ID}').scrollTop`;
  return Number(BrowserUtils.execute(script));
}

function getHorizontalPosition(): number {
  Reporter.step('get horizontal position');
  const script: string = `return document.getElementById('${TEST_DIV_ID}').scrollLeft`;
  return Number(BrowserUtils.execute(script));
}
