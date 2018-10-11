import { assert, expect } from "chai";
import { BrowserUtils } from "../../src/commons/BrowserUtils";

// tslint:disable-next-line:no-http-string
const sampleAppUrl: string = "http://127.0.0.1:8000/";

/**
 * wdio-allure-ts navigateToUrl action test
 */
describe("GetText of BrowserUtils Tests", () => {
    it("Validate single result ", () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        assert.equal(browser.getText("//*[@class='button-print-message']").length, 1);
    });

    it("Validate multiple result ending in err ", () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        expect(browser.getText("//*[@class='button-print-message-duplicate']")).to.throw('Failed');
    });
});
