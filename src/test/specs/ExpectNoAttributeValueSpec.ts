import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

const EMPTY_DIV: string = '//*[@id="formsWithoutAttribute"]//*[@id="noAttDiv"]';
/**
 * wdio-allure-ts ExpectNoAttributeValueSpec action test
 */
describeCommon('expectNoAttributeValue', () => {
  it("Doesn't contains value", () => {
    Reporter.step('Validate attribute does not contain value');
    expect(() =>
      BrowserUtils.waitForAttributeValue(EMPTY_DIV, 'data-test', 'expectNoAttributeValueCent', true)
    ).to.not.throw(Error);
  });

  it('Contains word substring', () => {
    Reporter.step('Validate attribute does not contain substring of a value');
    expect(() =>
      BrowserUtils.waitForAttributeValue(EMPTY_DIV, 'data-test', 'expectNoAttributeValueCenterrr', true)
    ).to.not.throw(Error);
  });

  it('Exact match error thrown', () => {
    Reporter.step('Attribute contain value throws error');
    expect(() => BrowserUtils.waitForAttributeValue(EMPTY_DIV, 'data-test', 'expectNoAttributeValueCenter', true))
      .to.throw(Error)
      .with.property('message')
      .contains('Incorrect attribute');
  });

  it('Element not exists', () => {
    Reporter.step('Navigate to sample app');
    BrowserUtils.url(sampleAppUrl);

    Reporter.step('attribute value of not existing element throws an error');
    expect(() => BrowserUtils.waitForAttributeValue('//NotExist', 'method', 'post', true)).to.throw(Error);
  });

  it('Attribute not exists', () => {
    Reporter.step('Navigate to sample app');
    BrowserUtils.url(sampleAppUrl);
    Reporter.step('attribute value of not existing attribute throws an error');
    expect(() => BrowserUtils.waitForAttributeValue(EMPTY_DIV, 'NotExist', 'post', true))
      .to.throw(Error)
      .with.property('message')
      .contains('Incorrect attribute');
  });
});
