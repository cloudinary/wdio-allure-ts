import { assert } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import Size = WebdriverIO.Size;

// tslint:disable-next-line:no-http-string
const sampleAppUrl: string = 'http://127.0.0.1:8000/';
const DEFAULT_WIDTH: number = 1024;
const DEFAULT_HEIGHT: number = 768;

/**
 * wdio-allure-ts Change window size and get window size (setViewportSize, getViewportSize)
 */
describe('ViewportSizeSpec of BrowserUtils Tests', () => {
  it('Validate window size after size change to 1024x768', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);
    BrowserUtils.setViewportSize({
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
    });
    browser.pause(1000);
    assert.equal(
      browser.execute(() => window.innerWidth).value,
      DEFAULT_WIDTH,
      'window width'
    );
    assert.equal(
      browser.execute(() => window.innerHeight).value,
      DEFAULT_HEIGHT,
      'window height'
    );
  });

  it('Validate window size after size change to width = 1024', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);
    BrowserUtils.setViewportSize({ width: DEFAULT_WIDTH, height: undefined });
    const size: Size = BrowserUtils.getViewportSize();
    assert.equal(size.width, DEFAULT_WIDTH, 'window width');
    assert.equal(size.height, DEFAULT_HEIGHT, 'window height');
  });

  it('Validate window size after size change to height = 768', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);
    BrowserUtils.setViewportSize({ width: undefined, height: 768 });
    const size: Size = BrowserUtils.getViewportSize();
    assert.equal(size.width, DEFAULT_WIDTH, 'window width');
    assert.equal(size.height, DEFAULT_HEIGHT, 'window height');
  });

  it('Validate no change requested (action aborted)', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);
    BrowserUtils.setViewportSize({ width: undefined, height: undefined });
    const size: Size = BrowserUtils.getViewportSize();
    assert.equal(size.width, DEFAULT_WIDTH, 'window width');
    assert.equal(size.height, DEFAULT_HEIGHT, 'window height');
  });
});
