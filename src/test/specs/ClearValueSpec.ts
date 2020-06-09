import { expect } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const INPUT_TEXT_SELECTOR: string = "//*[@id='clearValue']//input[@id='clearValue-input_text']";
const TEXT_AREA_SELECTOR: string = "//*[@id='clearValue']//textarea[@id='clearValue-textarea']";

describeCommon('clearValue', () => {
  it('clear value of text', () => {
    BrowserUtils.clearValue(INPUT_TEXT_SELECTOR);
    expect($(INPUT_TEXT_SELECTOR).getValue()).to.be.eq('');
  });

  it('clear value of text area', () => {
    BrowserUtils.clearValue(TEXT_AREA_SELECTOR);
    expect($(TEXT_AREA_SELECTOR).getValue()).to.be.eq('');
  });
});
