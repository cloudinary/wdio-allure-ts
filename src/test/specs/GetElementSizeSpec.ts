import { assert } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const ELEMENT_DIV: string = '//div[@id="getElementSize"]';

let size: { width?: number; height?: number } = {};

/**
 * wdio-allure-ts getSize
 */
describeCommon('getSizeSpec', () => {
  it('get element size', async () => {
    const expectedWidth: number = 250;
    const expectedHeight: number = 150;

    await Reporter.step('Validate getSize returned values');
    size = await BrowserUtils.getSize(ELEMENT_DIV);
    assert.equal(size.width, expectedWidth, 'window width');
    assert.equal(size.height, expectedHeight, 'window height');
  });
});
