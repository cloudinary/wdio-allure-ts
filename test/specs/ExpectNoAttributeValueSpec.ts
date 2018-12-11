import { expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts ExpectNoAttributeValueSpec action test
 */
describeCommon('expectNoAttributeValue', () => {
  it("Doesn't contains value", () => {
    expect(() =>
      BrowserUtils.expectNoAttributeValue('//form', 'method', 'pos')
    ).to.not.throw(Error);
  });

  it('Contains word substring', () => {
    expect(() =>
      BrowserUtils.expectNoAttributeValue('//form', 'method', 'postt')
    ).to.not.throw(Error);
  });

  it('Exact match error thrown', () => {
    expect(() =>
      BrowserUtils.expectNoAttributeValue('//form', 'method', 'post')
    ).to.throw(Error);
  });
});
