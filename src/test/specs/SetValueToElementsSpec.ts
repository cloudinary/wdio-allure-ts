import { assert } from 'chai';
import { BrowserUtils } from '../..';
import { describeCommon } from '../TestHelper';

const TEXT_INPUT: string = "//*[@id='input__text']";
const HIDDEN_TEXT_INPUT: string = "//*[@id='input__text5']";

/**
 * wdio-allure-ts Set & Add Value to Element test
 */
describeCommon('Set & Add Value', () => {
  it('addValue ', () => {
    $(TEXT_INPUT).clearValue();
    BrowserUtils.addValue(TEXT_INPUT, 'Cloudinary');
    assert.equal($(TEXT_INPUT).getValue(), 'Cloudinary');
  });

  it('setValue', () => {
    $(TEXT_INPUT).clearValue();
    BrowserUtils.setValue(TEXT_INPUT, 'Cloudinary');
    assert.equal($(TEXT_INPUT).getValue(), 'Cloudinary');
  });

  it.skip('setHiddenElementValue', () => {
    $(HIDDEN_TEXT_INPUT).clearValue();
    BrowserUtils.setValue(HIDDEN_TEXT_INPUT, 'Cloudinary');
    assert.equal($(HIDDEN_TEXT_INPUT).getValue(), 'Cloudinary');
  });
});
