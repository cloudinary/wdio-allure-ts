import { expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { TestUtils } from '../../src/commons/TestUtils';
import { describeCommon } from '../TestHelper';

const emptyInputSelector: string =
  "//*[@id='AddValue']//input[@id='empty_input']";
const notEmptyInputSelector: string =
  "//*[@id='AddValue']//input[@id='not_empty_input']";
const disabledInputSelector: string =
  "//*[@id='AddValue']//input[@id='disabled_input']";
describeCommon('addValue', () => {
  it('add value to empty input', () => {
    const randomText: string = TestUtils.randomString(5);
    BrowserUtils.addValue(emptyInputSelector, randomText);
    expect($(emptyInputSelector).getValue()).to.be.eq(randomText);
  });
  it('add value to existing input', () => {
    const randomText: string = TestUtils.randomString(5);
    BrowserUtils.addValue(notEmptyInputSelector, randomText);
    expect($(notEmptyInputSelector).getValue()).to.be.eq(
      `Cloudinary${randomText}`
    );
  });
  it('add value to disabled input', () => {
    expect(() =>
      BrowserUtils.addValue(disabledInputSelector, TestUtils.randomString(5))
    )
      .to.throw(Error)
      .with.property('message')
      .contains('Failed to add value');
  });
  it('add value to not existing input', () => {
    expect(() =>
      BrowserUtils.addValue(
        `//input[@id='${TestUtils.randomString(5)}']`,
        TestUtils.randomString(5)
      )
    )
      .to.throw(Error)
      .with.property('message')
      .contains("element wasn't found");
  });
});
