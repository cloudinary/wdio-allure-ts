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
        assert.isTrue(BrowserUtils.expectNoAttributeValue("//form",'method', 'post'));
    });

    it("Validate null result ending in err", () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        expect(() => BrowserUtils.expectNoAttributeValue("//form", 'method', 'BlaBla'))
            .to.throw(Error)
            .with.property("message")
            .contains(`Failed`);
    });

    it("Validate incorrect value ending in err", () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        expect(() => BrowserUtils.expectNoAttributeValue("//form", 'ONG', 'BlaBla'))
            .to.throw(Error)
            .with.property("message")
            .contains(`Incorrect`);
    });
});