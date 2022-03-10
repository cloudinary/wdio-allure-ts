import { assert } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const TEST_DIV_ID: string = 'scrollToPixelsDiv';
const TEST_FIELD_SELECTOR: string = `//*[@id='${TEST_DIV_ID}']`;

describeCommon('ScrollTo', () => {
  it('scroll to y value', async () => {
    const scrollToYValue: number = 50;
    await Reporter.step('scroll to y value');
    await BrowserUtils.scrollTo(TEST_FIELD_SELECTOR, 0, scrollToYValue);

    await Reporter.step('validate correct position');
    assert.isTrue((await getVerticalPosition()) === scrollToYValue);
  });
  it('scroll to x value', async () => {
    const scrollToXValue: number = 50;
    await Reporter.step('scroll to x value');
    await BrowserUtils.scrollTo(TEST_FIELD_SELECTOR, scrollToXValue, 0);

    await Reporter.step('validate correct position');
    assert.isTrue((await getHorizontalPosition()) === scrollToXValue);
  });
});

async function getVerticalPosition(): Promise<number> {
  await Reporter.step('get vertical position');
  const script: string = `return document.getElementById('${TEST_DIV_ID}').scrollTop`;
  return Number(await BrowserUtils.execute(script));
}

async function getHorizontalPosition(): Promise<number> {
  await Reporter.step('get horizontal position');
  const script: string = `return document.getElementById('${TEST_DIV_ID}').scrollLeft`;
  return Number(await BrowserUtils.execute(script));
}
