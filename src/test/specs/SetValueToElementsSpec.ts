import { assert } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

namespace PageLocator {
  export const TEXT_INPUT: string = "//*[@id='input__text']";
  export const HIDDEN_TEXT_INPUT: string = "//*[@id='input__text5']";
}

/**
 * wdio-allure-ts Set & Add Value to Element test
 */
describeCommon('Set & Add Value', () => {
  it('addValue ', () => {
    $(PageLocator.TEXT_INPUT).clearValue();
    BrowserUtils.addValue(PageLocator.TEXT_INPUT, 'Cloudinary');
    assert.equal($(PageLocator.TEXT_INPUT).getValue(), 'Cloudinary');
  });

  it('setValue', () => {
    $(PageLocator.TEXT_INPUT).clearValue();
    BrowserUtils.setValue(PageLocator.TEXT_INPUT, 'Cloudinary');
    assert.equal($(PageLocator.TEXT_INPUT).getValue(), 'Cloudinary');
  });

  it.skip('setHiddenElementValue', () => {
    $(PageLocator.HIDDEN_TEXT_INPUT).clearValue();
    BrowserUtils.setValue(PageLocator.HIDDEN_TEXT_INPUT, 'Cloudinary');
    assert.equal($(PageLocator.HIDDEN_TEXT_INPUT).getValue(), 'Cloudinary');
  });
});
