import { assert } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const ELEMENT_DIV: string = '//div[@id="getElementSize"]';

let size: { width?: number; height?: number } = {};

/**
 * wdio-allure-ts get element size
 */
describeCommon('getElementSize', () => {
  it('get element size', () => {
    const expectedWidth: number = 250;
    const expectedHeight: number = 150;

    size = BrowserUtils.getElementSize(ELEMENT_DIV);
    assert.equal(size.width, expectedWidth, 'window width');
    assert.equal(size.height, expectedHeight, 'window height');
  });
});
