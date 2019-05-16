import { expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { TestUtils } from '../../src/commons/TestUtils';
import { describeCommon } from '../TestHelper';

const EMPTY_INPUT_SELECTOR: string = "//*[@id='AddValue']//input[@id='empty_input']";
const NOT_EMPTY_INPUT_SELECTOR: string = "//*[@id='AddValue']//input[@id='not_empty_input']";
const DISABLED_INPUT_SELECTOR: string = "//*[@id='disabled_input']";
describeCommon('addValue', () => {
  it('add value to empty input', () => {
    const randomText: string = TestUtils.randomString(5);
    BrowserUtils.addValue(EMPTY_INPUT_SELECTOR, randomText);
    expect($(EMPTY_INPUT_SELECTOR).getValue()).to.be.eq(randomText);
  });
  it('add value to existing input', () => {
    const randomText: string = TestUtils.randomString(5);
    BrowserUtils.addValue(NOT_EMPTY_INPUT_SELECTOR, randomText);
    expect($(NOT_EMPTY_INPUT_SELECTOR).getValue()).to.be.eq(`Cloudinary${randomText}`);
  });
  it('add value to disabled input', () => {
    expect(() => BrowserUtils.addValue(DISABLED_INPUT_SELECTOR, TestUtils.randomString(5)))
      .to.throw(Error)
      .with.property('message')
      .contains('Failed to add value');
  });
  it('add value to not existing input', () => {
    expect(() => BrowserUtils.addValue(`//input[@id='${TestUtils.randomString(5)}']`, TestUtils.randomString(5)))
      .to.throw(Error)
      .with.property('message')
      .contains("element wasn't found");
  });
});
