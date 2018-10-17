import { assert, expect } from "chai";
import { BrowserUtils } from "../../src/commons/BrowserUtils";

// tslint:disable-next-line:no-http-string
const sampleAppUrl: string = "http://127.0.0.1:8000/";

/**
 * wdio-allure-ts getAttribute action test
 */
describe("GetAttributeSpec of BrowserUtils Tests", () => {
    it("Validate positive result ", () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        assert.equal(BrowserUtils.getAttribute("//form",'method'), "post");
    });

    it("Validate null result ending in err", () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        expect(() => BrowserUtils.getAttribute("//form", 'name'))
            .to.throw(Error)
            .with.property("message")
            .contains(`Failed to get name attribute`);
    });

    it("Validate incorrect value ending in err", () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        expect(() => BrowserUtils.getAttribute("//form", 'ONG'))
            .to.throw(Error)
            .with.property("message")
            .contains(`Failed to get ONG`);
    });
});