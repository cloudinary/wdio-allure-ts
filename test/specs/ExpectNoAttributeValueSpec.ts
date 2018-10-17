import { assert, expect } from "chai";
import { BrowserUtils } from "../../src/commons/BrowserUtils";

// tslint:disable-next-line:no-http-string
const sampleAppUrl: string = "http://127.0.0.1:8000/";

/**
 * wdio-allure-ts ExpectNoAttributeValueSpec action test
 */
describe("ExpectNoAttributeValueSpec of BrowserUtils Tests", () => {
    it("Validate negative result (Attribute found not as expected)", () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        assert.isFalse(BrowserUtils.expectNoAttributeValue("//form",'method', 'post'));
    });

    it("Validate positive result (Attribute wasn't found as expected)", () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        assert.isTrue(BrowserUtils.expectNoAttributeValue("//form",'method', "OhNooo"));
    });

    it("Validate null result ending in err", () => {
        BrowserUtils.navigateToUrl(sampleAppUrl);
        expect(() => BrowserUtils.expectNoAttributeValue("//form",'name', "OhNooo") )
            .to.throw(Error)
            .with.property("message")
            .contains(`Found multiple results`);
    });

});
