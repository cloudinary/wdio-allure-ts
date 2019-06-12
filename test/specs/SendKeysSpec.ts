import { assert } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { SpecialKeys } from '../../src/enums/SpecialKeys';
import { describeCommon } from '../TestHelper';

const TEXT_INPUT: string = "//*[@id='SendKeys_input__text']";
const text: string = 'Cloudinary';

/**
 * wdio-allure-ts sendKeys tests
 */
describeCommon('Send Keys', () => {
  it('String array ', () => {
    $(TEXT_INPUT).clearValue();
    $(TEXT_INPUT).click();
    BrowserUtils.sendKeys(text);
    assert.equal($(TEXT_INPUT).getValue(), text);
  });

  it('Add text', () => {
    $(TEXT_INPUT).clearValue();
    $(TEXT_INPUT).click();
    BrowserUtils.sendKeys(text);
    BrowserUtils.sendKeys(text);
    assert.equal($(TEXT_INPUT).getValue(), `${text}${text}`);
  });

  it('Add text after sending enter for new line', () => {
    $(TEXT_INPUT).clearValue();
    $(TEXT_INPUT).click();
    BrowserUtils.sendKeys(text);
    BrowserUtils.sendKeys(SpecialKeys.ENTER);
    BrowserUtils.sendKeys(text);
    assert.equal($(TEXT_INPUT).getValue(), `${text}\n${text}`);
  });

  it('Array of Special Keys', () => {
    const specialKeysArray: SpecialKeys[] = [SpecialKeys.ENTER, SpecialKeys.ENTER, SpecialKeys.ENTER];
    $(TEXT_INPUT).clearValue();
    $(TEXT_INPUT).click();
    BrowserUtils.sendKeys(text);
    BrowserUtils.sendKeys(specialKeysArray);
    BrowserUtils.sendKeys(text);
    assert.equal($(TEXT_INPUT).getValue(), `${text}\n\n\n${text}`);
  });

  it('Special Key Emoji', () => {
    $(TEXT_INPUT).clearValue();
    $(TEXT_INPUT).click();
    BrowserUtils.sendKeys(SpecialKeys.EMOJI_HEART);
    BrowserUtils.sendKeys(SpecialKeys.ENTER);
    BrowserUtils.sendKeys(SpecialKeys.EMOJI_HEART);
    assert.equal($(TEXT_INPUT).getValue(), `${SpecialKeys.EMOJI_HEART}\n${SpecialKeys.EMOJI_HEART}`);
  });
});
