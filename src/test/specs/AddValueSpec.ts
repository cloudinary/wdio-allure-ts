import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { TestUtils } from '../..';
import { describeCommon } from '../TestHelper';

const EMPTY_INPUT_SELECTOR: string = "//*[@id='AddValue']//input[@id='empty_input']";
const NOT_EMPTY_INPUT_SELECTOR: string = "//*[@id='AddValue']//input[@id='not_empty_input']";
const DISABLED_INPUT_SELECTOR: string = "//*[@id='AddValue-disabled_input']";
describeCommon('addValue', () => {
  it('add value to empty input', () => {
    const randomText: string = TestUtils.randomString(5);

    Reporter.step('Add value to empty input');
    BrowserUtils.addValue(EMPTY_INPUT_SELECTOR, randomText);

    Reporter.step(`Validate value is ${randomText}`);
    expect($(EMPTY_INPUT_SELECTOR).getValue()).to.be.eq(randomText);
  });
  it('add value to existing input', () => {
    const randomText: string = TestUtils.randomString(5);

    Reporter.step(`Add value to not empty input`);
    BrowserUtils.addValue(NOT_EMPTY_INPUT_SELECTOR, randomText);

    Reporter.step(`Validate value is Cloudinary${randomText}`);
    expect($(NOT_EMPTY_INPUT_SELECTOR).getValue()).to.be.eq(`Cloudinary${randomText}`);
  });
  it('add value to disabled input', () => {
    Reporter.step('Add value to disable input should throw an error');
    expect(() => BrowserUtils.addValue(DISABLED_INPUT_SELECTOR, TestUtils.randomString(5)))
      .to.throw(Error)
      .with.property('message')
      .contains('still not enabled');
  });
  it('add value to not existing input', () => {
    Reporter.step('Add value to not existing input should throw an error');
    expect(() =>
      BrowserUtils.addValue(`//input[@id='${TestUtils.randomString(5)}']`, TestUtils.randomString(5))
    ).to.throw(Error);
  });
});
