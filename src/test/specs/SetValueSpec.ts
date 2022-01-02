import { assert } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon } from '../TestHelper';
import { Reporter } from '../../index';

const TEXT_INPUT: string = "//*[@id='input__text']";

/**
 * SetValueSpec
 */
describeCommon('SetValue', () => {
  it('setValue', () => {
    Reporter.step('clear input value');
    $(TEXT_INPUT).clearValue();

    Reporter.step('set input value');
    BrowserUtils.setValue(TEXT_INPUT, 'Cloudinary');

    Reporter.step('Validate value');
    assert.equal($(TEXT_INPUT).getValue(), 'Cloudinary');
  });
});
