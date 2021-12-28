import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

const INPUT_ELEMENT_SELECTOR: string = "//*[@id='getValue']//input[@id='getValue-input']";
const TEXTAREA_ELEMENT_SELECTOR: string = "//*[@id='getValue']//textarea[@id='getValue-textarea']";

describeCommon('getValue', () => {
  it('get value of input element', () => {
    const expectedInputValue = 'get value input element';
    Reporter.step('Validate getValue returned value from input');
    expect(BrowserUtils.getValue(INPUT_ELEMENT_SELECTOR)).to.be.eq(expectedInputValue);
  });

  it('get value of text area', () => {
    const expectedTextAreaValue = 'get value text area';
    Reporter.step('Validate getValue returned value text area');
    expect($(TEXTAREA_ELEMENT_SELECTOR).getValue()).to.be.eq(expectedTextAreaValue);
  });
});
