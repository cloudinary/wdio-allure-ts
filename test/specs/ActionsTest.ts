import { assert, expect } from "chai";
import { BrowserUtils } from "../../src/commons/BrowserUtils";

// tslint:disable-next-line:no-http-string
const sampleAppUrl: string = "http://127.0.0.1:8000/";
/**
 * wdio-allure-ts actions test
 */
describe("wdio-allure-ts actions test", () => {
  it("navigateToUrl - navigate to sampleApp", () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);
    assert.equal(browser.getUrl(), sampleAppUrl);
  });

  it("navigateToUrl - throw malformed URL exception", () => {
    expect(() => BrowserUtils.navigateToUrl("cloudinary")).to.throw(Error);
    // todo add error message validation
  });
});
