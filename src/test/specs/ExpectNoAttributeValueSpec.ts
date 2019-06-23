import { expect } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const EMPTY_DIV: string = '//*[@id="formsWithoutAttribute"]//*[@id="noAttDiv"]';
/**
 * wdio-allure-ts ExpectNoAttributeValueSpec action test
 */
describeCommon('expectNoAttributeValue', () => {
  it("Doesn't contains value", () => {
    expect(() => BrowserUtils.expectNoAttributeValue(EMPTY_DIV, 'align', 'cent')).to.not.throw(Error);
  });

  it('Contains word substring', () => {
    expect(() => BrowserUtils.expectNoAttributeValue(EMPTY_DIV, 'align', 'centerrr')).to.not.throw(Error);
  });

  it('Exact match error thrown', () => {
    expect(() => BrowserUtils.expectNoAttributeValue(EMPTY_DIV, 'align', 'center')).to.throw(Error);
  });
});
