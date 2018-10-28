import { expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';

// tslint:disable-next-line:no-http-string
const sampleAppUrl: string = 'http://127.0.0.1:8000/';

/**
 * wdio-allure-ts ExpectNoAttributeValueSpec action test
 */
describe('expectNoAttributeValue', () => {
  it("Doesn't contains value", () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);
    expect(() =>
      BrowserUtils.expectNoAttributeValue('//form', 'method', 'pos')
    ).to.not.throw(Error);
  });

  it('Contains word substring', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);
    expect(() =>
      BrowserUtils.expectNoAttributeValue('//form', 'method', 'postt')
    ).to.not.throw(Error);
  });

  it('Exact match error thrown', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);
    expect(() =>
      BrowserUtils.expectNoAttributeValue('//form', 'method', 'post')
    ).to.throw(Error);
  });
});
