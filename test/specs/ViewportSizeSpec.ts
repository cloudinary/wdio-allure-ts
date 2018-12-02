import { assert } from "chai";
import { BrowserUtils } from "../../src/commons/BrowserUtils";
import Size = WebdriverIO.Size;

// tslint:disable-next-line:no-http-string
const sampleAppUrl: string = 'http://127.0.0.1:8000/';

/**
 * wdio-allure-ts Change window size and get window size (setViewportSize, getViewportSize)
 */
describe('ViewportSizeSpec of BrowserUtils Tests', () => {

    it('Validate window size after size change to 1024x768', () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        //BrowserUtils.setWindowSize({width:1024, height:768});
        BrowserUtils.setViewportSize({ width: 1024, height: 768 });
        browser.pause(1000);
        assert.equal(browser.execute(()=> window.innerWidth).value, 1024, 'window width');
        assert.equal(browser.execute(()=> window.innerHeight).value, 768, 'window height');
    });

    it('Validate window size after size change to width = 1024', () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        BrowserUtils.setViewportSize({width: 1024, height: undefined});
        const size : Size = BrowserUtils.getViewportSize();
        assert.equal(size.width, 1024, 'window width');
        assert.equal(size.height, 768, 'window height');
    });


    it('Validate window size after size change to height = 768', () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        BrowserUtils.setViewportSize({width: undefined, height: 768});
        const size : Size = BrowserUtils.getViewportSize();
        assert.equal(size.width, 1024, 'window width');
        assert.equal(size.height, 768, 'window height');
    });

    it('Validate no change requested (action aborted)', () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        BrowserUtils.setViewportSize({width: undefined, height: undefined});
        const size : Size = BrowserUtils.getViewportSize();
        assert.equal(size.width, 1024, 'window width');
        assert.equal(size.height, 768, 'window height');
    });
});