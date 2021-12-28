import { assert } from 'chai';
import { BrowserUtils, Reporter } from '../..';

let size: { width?: number; height?: number } = {};
/**
 * wdio-allure-ts Change window size and get window size
 */
describe('setWindowSize', () => {
  it('change window size', () => {
    const width: number = 800;
    const height: number = 600;
    Reporter.step('set window size');
    BrowserUtils.setWindowSize(width, height);

    Reporter.step('get window size');
    size = BrowserUtils.getWindowSize();

    Reporter.step('validate width');
    assert.equal(size.width, width, 'window width');

    Reporter.step('validate height');
    assert.equal(size.height, height, 'window height');
  });
});
