import { expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const SELECTOR_WITH_ATTRIBUTE: string = '//button[@id="button_with_attribute_value"]';
const INCORRECT_SELECTOR: string = '//button[@id="button_with_attribute_value`-incorrect"]';
const ATTRIBUTE_NAME: string = 'value';
const INCORRECT_ATTRIBUTE_NAME: string = 'text';
const CORRECT_ATTRIBUTE_VALUE: string = 'hello world';
const INCORRECT_ATTRIBUTE_VALUE: string = 'hello hello world';

/**
 * wdio-allure-ts waitForAttributeValueSpec
 */
describeCommon('waitForAttributeValue', () => {
  it('correct value', () => {
    expect(() =>
      BrowserUtils.waitForAttributeValue(SELECTOR_WITH_ATTRIBUTE, ATTRIBUTE_NAME, CORRECT_ATTRIBUTE_VALUE)
    ).to.not.throw(Error);
  });

  it('incorrect value', () => {
    expect(() => BrowserUtils.waitForAttributeValue(SELECTOR_WITH_ATTRIBUTE, ATTRIBUTE_NAME, INCORRECT_ATTRIBUTE_VALUE))
      .to.throw(Error)
      .with.property('message')
      .contains(`Incorrect attribute`);
  });
  it('incorrect selector', () => {
    expect(() => BrowserUtils.waitForAttributeValue(INCORRECT_SELECTOR, ATTRIBUTE_NAME, INCORRECT_ATTRIBUTE_VALUE))
      .to.throw(Error)
      .with.property('message')
      .contains(`Incorrect attribute`);
  });
  it('incorrect attribute', () => {
    expect(() =>
      BrowserUtils.waitForAttributeValue(INCORRECT_SELECTOR, INCORRECT_ATTRIBUTE_NAME, INCORRECT_ATTRIBUTE_VALUE)
    )
      .to.throw(Error)
      .with.property('message')
      .contains(`Incorrect attribute`);
  });
});
