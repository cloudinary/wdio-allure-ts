import { assert } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon } from '../TestHelper';
import { Reporter } from '../../index';

const TEXT_INPUT: string = "//*[@id='input__text']";

/**
 * SetValueSpec
 */
describeCommon('SetValue', () => {
  it('setValue', async () => {
    await Reporter.step('clear input value');
    await $(TEXT_INPUT).clearValue();

    await Reporter.step('set input value');
    await BrowserUtils.setValue(TEXT_INPUT, 'Cloudinary');

    await Reporter.step('Validate value');
    assert.equal(await $(TEXT_INPUT).getValue(), 'Cloudinary');
  });
});
