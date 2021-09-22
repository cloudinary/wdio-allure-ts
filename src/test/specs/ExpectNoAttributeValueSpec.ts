import { expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

const EMPTY_DIV: string = '//*[@id="formsWithoutAttribute"]//*[@id="noAttDiv"]';
/**
 * wdio-allure-ts ExpectNoAttributeValueSpec action test
 */
describeCommon('expectNoAttributeValue', () => {
  it("Doesn't contains value", () => {
    expect(() =>
      BrowserUtils.waitForAttributeValue(EMPTY_DIV, 'data-test', 'expectNoAttributeValueCent', true)
    ).to.not.throw(Error);
  });

  it('Contains word substring', () => {
    expect(() =>
      BrowserUtils.waitForAttributeValue(EMPTY_DIV, 'data-test', 'expectNoAttributeValueCenterrr', true)
    ).to.not.throw(Error);
  });

  it('Exact match error thrown', () => {
    expect(() => BrowserUtils.waitForAttributeValue(EMPTY_DIV, 'data-test', 'expectNoAttributeValueCenter', true))
      .to.throw(Error)
      .with.property('message')
      .contains('Incorrect attribute');
  });

  it('Element not exists', () => {
    BrowserUtils.url(sampleAppUrl);
    expect(() => BrowserUtils.waitForAttributeValue('//NotExist', 'method', 'post', true)).to.throw(Error);
  });

  it('Attribute not exists', () => {
    BrowserUtils.url(sampleAppUrl);
    expect(() => BrowserUtils.waitForAttributeValue(EMPTY_DIV, 'NotExist', 'post', true))
      .to.throw(Error)
      .with.property('message')
      .contains('Incorrect attribute');
  });
});
