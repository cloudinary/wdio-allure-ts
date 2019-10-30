"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//tslint:disable
const eyes_sdk_core_1 = require("@applitools/eyes-sdk-core");
const eyes_webdriverio_1 = require("@applitools/eyes-webdriverio");
const util_1 = require("util");
const Reporter_1 = require("./Reporter");
/**
 * View port area to set screen size for screenshots consistency
 */
const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 768;
/**
 * Class wraps the Applitools util for UI or Images comparison
 */
class EyesUtil {
    constructor(apiKey) {
        this.eyes = new eyes_webdriverio_1.Eyes();
        this.eyes.setApiKey(apiKey);
        this.eyeConfiguration(false);
    }
    /**
     * Opens the eye session
     * @param testDesc - Run ID
     * @param testName - Product name
     * @param boundingBoxObj - Bounding box to screenshots
     */
    open(testDesc, testName, boundingBoxObj) {
        Reporter_1.Reporter.debug('Open eyes');
        browser.call(() => {
            return this.eyes.open(browser, testName, testDesc, boundingBoxObj === undefined ? { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } : boundingBoxObj);
        });
        Reporter_1.Reporter.debug('Eyes Opened');
        return this;
    }
    /**
     * Since SDK doesn't support array of elements to ignore this method should bypass that limitation
     * @param checkDescription - Test/Step name (unique)
     * @param xPaths - array of By.type objects to ignore in check
     */
    checkWithIgnores(checkDescription, xPaths) {
        let targetWindowObj = eyes_webdriverio_1.Target.window();
        xPaths.forEach((elementXpath) => {
            targetWindowObj = targetWindowObj.ignore(eyes_webdriverio_1.By.xpath(elementXpath));
        });
        const result = browser.call(() => {
            return this.eyes.check(checkDescription, targetWindowObj);
        });
        Reporter_1.Reporter.debug(`TEST RESULT: ${util_1.inspect(result)}`);
        return result;
    }
    /**
     *  Full Page screenshots including scrolling (very slow)
     * @param checkDesc - Unique Test ID
     */
    checkPageLayout(checkDesc) {
        Reporter_1.Reporter.debug('Take view port screenshots');
        const result = browser.call(() => {
            return this.eyes.check(checkDesc, eyes_webdriverio_1.Target.window().layout());
        });
        Reporter_1.Reporter.debug(`TEST RESULT: ${util_1.inspect(result)}`);
        return result;
    }
    /**
     * Close eye batch
     */
    close() {
        Reporter_1.Reporter.debug('Close eyes');
        browser.call(() => {
            return this.eyes.close();
        });
        Reporter_1.Reporter.debug('Eyes Closed');
    }
    /**
     *  Set basic configuration
     * @param onOff - flag to turn on and off
     */
    eyeConfiguration(onOff) {
        Reporter_1.Reporter.debug('Configure eyes');
        browser.call(() => {
            return this.eyes.setHideScrollbars(onOff);
        });
        browser.call(() => {
            return this.eyes.setForceFullPageScreenshot(onOff);
        });
        return this;
    }
    /**
     * Set Debug Mode On
     */
    setEyeDebugMode() {
        browser.call(() => {
            return this.eyes.setLogHandler(new eyes_sdk_core_1.FileLogHandler(true));
        });
        return this;
    }
}
exports.EyesUtil = EyesUtil;
