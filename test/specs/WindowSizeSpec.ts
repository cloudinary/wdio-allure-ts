import { assert } from "chai";
import { BrowserUtils } from "../../src/commons/BrowserUtils";
import Size = WebdriverIO.Size;
import { Reporter } from "../../src/commons/Reporter";

// tslint:disable-next-line:no-http-string
const sampleAppUrl: string = 'http://127.0.0.1:8000/';

/**
 * wdio-allure-ts Change window size and get window size (setWindowSize, getWindowSize)
 */
describe('WindowSizeSpec of BrowserUtils Tests', () => {
    it('Validate get window size default', () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        const size : Size = BrowserUtils.getWindowSize();
        Reporter.debug(JSON.stringify(size));
        assert.equal(size.width, 1200, 'window width');
        assert.equal(size.height, 780, 'window height');

    });

    it('Validate window size after size change to 1024x768', () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        BrowserUtils.setWindowSize(1024, 768);
        const size : Size = BrowserUtils.getWindowSize();
        Reporter.debug(JSON.stringify(size));
        assert.equal(size.width, 1024, 'window width');
        assert.isBelow(size.height, 768, 'window height');
    });

    it('Validate window size after size change to width = 1024', () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        BrowserUtils.setWindowSize(1024);
        const size : Size = BrowserUtils.getWindowSize();
        Reporter.debug(JSON.stringify(size));
        assert.equal(size.width, 1024, 'window width');
        assert.isBelow(size.height, 768, 'window height');
    });


    it('Validate window size after size change to height = 768', () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        BrowserUtils.setWindowSize(undefined, 768);
        const size : Size = BrowserUtils.getWindowSize();
        Reporter.debug(JSON.stringify(size));
        assert.equal(size.width, 1024, 'window width');
        assert.isBelow(size.height, 768, 'window height');
    });

    it('Validate no change requested (action aborted)', () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        BrowserUtils.setWindowSize();
        const size : Size = BrowserUtils.getWindowSize();
        Reporter.debug(JSON.stringify(size));
        assert.equal(size.width, 1024, 'window width');
        assert.equal(size.height, 645, 'window height');
    });
});