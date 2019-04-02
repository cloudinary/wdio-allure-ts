import { expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

export namespace PageLocator {
  export const EMPTY_DIV: string = '//*[@id="noAttDiv"]';
  export const BAD_ELEMENT_XPATH: string = '//*[@id="badID"]';
}
/**
 * wdio-allure-ts ExpectNoAttributeValueSpec action test
 */
describeCommon('expectNoAttributeValue', () => {
  it("Doesn't contains value", () => {
    expect(() =>
      BrowserUtils.expectNoAttributeValue(
        PageLocator.EMPTY_DIV,
        'align',
        'cent'
      )
    ).to.not.throw(Error);
  });

  it('Contains word substring', () => {
    expect(() =>
      BrowserUtils.expectNoAttributeValue(
        PageLocator.EMPTY_DIV,
        'align',
        'centerrr'
      )
    ).to.not.throw(Error);
  });

  it('Exact match error thrown', () => {
    expect(() =>
      BrowserUtils.expectNoAttributeValue(
        PageLocator.EMPTY_DIV,
        'align',
        'center'
      )
    ).to.throw(Error);
  });
});
