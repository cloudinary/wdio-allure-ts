import { expect } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const EMPTY_DIV: string = '//*[@id="formsWithoutAttribute"]//*[@id="noAttDiv"]';
/**
 * wdio-allure-ts ExpectNoAttributeValueSpec action test
 */
describeCommon('expectNoAttributeValue', () => {
  it("Doesn't contains value", () => {
    expect(() =>
      BrowserUtils.expectNoAttributeValue(EMPTY_DIV, 'data-test', 'expectNoAttributeValueCent')
    ).to.not.throw(Error);
  });

  it('Contains word substring', () => {
    expect(() =>
      BrowserUtils.expectNoAttributeValue(EMPTY_DIV, 'data-test', 'expectNoAttributeValueCenterrr')
    ).to.not.throw(Error);
  });

  it('Exact match error thrown', () => {
    expect(() => BrowserUtils.expectNoAttributeValue(EMPTY_DIV, 'data-test', 'expectNoAttributeValueCenter')).to.throw(
      Error
    );
  });
});
