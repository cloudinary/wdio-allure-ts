import { assert } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

namespace PageLocator {
  export const TEXT_INPUT: string = "//*[@id='input__text']";
  export const HIDDEN_TEXT_INPUT: string = "//*[@id='input__text5']";
}

/**
 * SetValueSpec
 */
describeCommon('SetValue', () => {
  it('setValue', () => {
    $(PageLocator.TEXT_INPUT).clearValue();
    BrowserUtils.setValue(PageLocator.TEXT_INPUT, 'Cloudinary');
    assert.equal($(PageLocator.TEXT_INPUT).getValue(), 'Cloudinary');
  });

  it('setHiddenElementValue', () => {
    $(PageLocator.HIDDEN_TEXT_INPUT).clearValue();
    BrowserUtils.setValue(PageLocator.HIDDEN_TEXT_INPUT, 'Cloudinary');
    assert.equal($(PageLocator.HIDDEN_TEXT_INPUT).getValue(), 'Cloudinary');
  });
});
