import { expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

export namespace PageLocator {
  export const FORM: string = "//*[@id='forms']/form";
}
/**
 * wdio-allure-ts ExpectNoAttributeValueSpec action test
 */
describeCommon('expectNoAttributeValue', () => {
  it("Doesn't contains value", () => {
    expect(() =>
      BrowserUtils.expectNoAttributeValue(PageLocator.FORM, 'method', 'pos')
    ).to.not.throw(Error);
  });

  it('Contains word substring', () => {
    expect(() =>
      BrowserUtils.expectNoAttributeValue(PageLocator.FORM, 'method', 'postt')
    ).to.not.throw(Error);
  });

  it('Exact match error thrown', () => {
    expect(() =>
      BrowserUtils.expectNoAttributeValue(PageLocator.FORM, 'method', 'post')
    ).to.throw(Error);
  });
});
