import { assert, expect } from "chai";
import { BrowserUtils } from "../../src/commons/BrowserUtils";

// tslint:disable-next-line:no-http-string
const sampleAppUrl: string = "http://127.0.0.1:8000/";

/**
 * wdio-allure-ts navigateToUrl action test
 */
describe("ExpectNoAttributeValueSpec of BrowserUtils Tests", () => {
    it("Validate positive result ", () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        assert.isTrue(BrowserUtils.expectNoAttributeValue("//button[1]", "name", "Print Button"));
    });

    it("Validate null result ending in err ", () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        expect(() => BrowserUtils.expectNoAttributeValue("//button[1]", "name", "btn-omg"))
            .to.throw(Error)
            .with.property("message")
            //.contains(`Failed`);
    });

    it("Validate incorrect value ending in err ", () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        expect(() => BrowserUtils.expectNoAttributeValue("//button[1]", "data-test", "print"))
            .to.throw(Error)
            .with.property("message")
            //.contains(`Incorrect`);
    });
});