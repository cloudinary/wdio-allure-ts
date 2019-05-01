import { expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const SELECTOR_WITH_ATTRIBUTE: string =
  '//button[@id="button_with_attribute_value"]';
const ATTRIBUTE_NAME: string = 'value';
const CORRECT_ATTRIBUTE_VALUE: string = 'hello world';
const INCORRECT_ATTRIBUTE_VALUE: string = 'hello hello world';

/**
 * wdio-allure-ts expectAttributeValueSpec
 */
describeCommon('expectAttributeValue', () => {
  it('correct value', () => {
    expect(() =>
      BrowserUtils.expectAttributeValue(
        SELECTOR_WITH_ATTRIBUTE,
        ATTRIBUTE_NAME,
        CORRECT_ATTRIBUTE_VALUE
      )
    ).to.not.throw(Error);
  });

  it('incorrect value', () => {
    expect(() =>
      BrowserUtils.expectAttributeValue(
        SELECTOR_WITH_ATTRIBUTE,
        ATTRIBUTE_NAME,
        INCORRECT_ATTRIBUTE_VALUE
      )
    )
      .to.throw(Error)
      .with.property('message')
      .contains(`Incorrect attribute`);
  });
});
