import { assert, expect } from "chai";
import { BrowserUtils } from "../../src/commons/BrowserUtils";

// tslint:disable-next-line:no-http-string
const sampleAppUrl: string = "http://127.0.0.1:8000/";

/**
 * wdio-allure-ts navigateToUrl action test
 */
describe("GetText of BrowserUtils Tests", () => {
    it("Validate multiple results ", () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        assert.isAbove(browser.getText("//*[@class='button']").length, 1);
    });

    it("Validate multiple results ", () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        expect(BrowserUtils.expectText("//*[@class='button']", 'LEARN MORE')).to.throw('Found multiple results matching text');
    });
});
