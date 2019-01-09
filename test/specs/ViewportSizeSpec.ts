import { assert } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';

const DEFAULT_WIDTH: number = 1024;
const DEFAULT_HEIGHT: number = 768;

let size: { width: number; height: number } = { width: 0, height: 0 };
/**
 * wdio-allure-ts Change window size and get window size (setViewportSize, getViewportSize)
 */
describe('ViewportSizeSpec of BrowserUtils Tests', () => {
  // it('Validate window size after size change to 1024x768', () => {
  //   BrowserUtils.setViewportSize({
  //     width: DEFAULT_WIDTH,
  //     height: DEFAULT_HEIGHT,
  //   });
  //   browser.pause(1000);
  //   assert.equal(
  //     browser.execute(() => window.innerWidth).value,
  //     DEFAULT_WIDTH,
  //     'window width'
  //   );
  //   assert.equal(
  //     browser.execute(() => window.innerHeight).value,
  //     DEFAULT_HEIGHT,
  //     'window height'
  //   );
  // });

  it('Validate window size after size change to width = 1024', () => {
    BrowserUtils.setViewportSize({ width: DEFAULT_WIDTH, height: undefined });
    size = BrowserUtils.getViewportSize();
    assert.equal(size.width, DEFAULT_WIDTH, 'window width');
    assert.equal(size.height, 908, 'window height');
  });

  it('Validate window size after size change to height = 768', () => {
    BrowserUtils.setViewportSize({ width: undefined, height: 768 });
    size = BrowserUtils.getViewportSize();
    assert.equal(size.width, 1200, 'window width');
    assert.equal(size.height, DEFAULT_HEIGHT, 'window height');
  });

  it.only('Validate no change requested (action aborted)', () => {
    BrowserUtils.setViewportSize({ width: undefined, height: undefined });
    size = BrowserUtils.getViewportSize();
    assert.equal(size.width, DEFAULT_WIDTH, 'window width');
    assert.equal(size.height, DEFAULT_HEIGHT, 'window height');
  });
});
