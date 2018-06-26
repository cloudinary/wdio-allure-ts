import { assert, expect } from "chai";
import { BrowserUtils } from "../../src/commons/BrowserUtils";

// tslint:disable-next-line:no-http-string
const sampleAppUrl: string = "http://127.0.0.1:8000/";
/**
 * wdio-allure-ts navigateToUrl action test
 */
describe("navigateToUrl", () => {
  it("navigate successfully", () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);
    assert.equal(browser.getUrl(), sampleAppUrl);
  });

  it("malformed URL", () => {
    const malformedUrl: string = "cloudinary";
    expect(() => BrowserUtils.navigateToUrl(malformedUrl))
      .to.throw(Error)
      .with.property("message")
      .contains(`Failed to navigate to ${malformedUrl}`);
  });

  it("passing null", () => {
    expect(() => BrowserUtils.navigateToUrl(null))
      .to.throw(Error)
      .with.property("message")
      .contains("Illegal URL: null");
  });
});
