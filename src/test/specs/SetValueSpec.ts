import { assert } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

const TEXT_INPUT: string = "//*[@id='input__text']";

/**
 * SetValueSpec
 */
describeCommon('SetValue', () => {
  it('setValue', () => {
    $(TEXT_INPUT).clearValue();
    BrowserUtils.setValue(TEXT_INPUT, 'Cloudinary');
    assert.equal($(TEXT_INPUT).getValue(), 'Cloudinary');
  });
});
