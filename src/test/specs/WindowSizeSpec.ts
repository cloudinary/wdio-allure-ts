import { assert } from 'chai';
import { BrowserUtils, Reporter } from '../..';

let size: { width?: number; height?: number } = {};
/**
 * wdio-allure-ts Change window size and get window size
 */
describe('setWindowSize', () => {
  it('change window size', async () => {
    const width: number = 800;
    const height: number = 600;
    await Reporter.step('set window size');
    await BrowserUtils.setWindowSize(width, height);

    await Reporter.step('get window size');
    size = await BrowserUtils.getWindowSize();

    await Reporter.step('validate width');
    assert.equal(size.width, width, 'window width');

    await Reporter.step('validate height');
    assert.equal(size.height, height, 'window height');
  });
});
