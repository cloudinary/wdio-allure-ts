import { assert } from 'chai';
import { BrowserUtils } from '../..';
import { SpecialKeys } from '../..';
import { describeCommon } from '../TestHelper';

const TEXT_INPUT: string = "//*[@id='SendKeys_input__text']";
const text: string = 'Cloudinary';

/**
 * wdio-allure-ts sendKeys tests
 */
describeCommon('SendKeysSpec', () => {
  beforeEach(() => {
    $(TEXT_INPUT).clearValue();
    $(TEXT_INPUT).click();
  });

  it('send string', () => {
    BrowserUtils.sendKeys(text);
    assert.equal($(TEXT_INPUT).getValue(), text);
  });

  it('send an array of strings', () => {
    const strArray: Array<string> = ['C', 'L', 'O', 'U', 'D', 'I', 'N', 'A', 'R', 'Y'];
    BrowserUtils.sendKeys(strArray);
    assert.equal($(TEXT_INPUT).getValue(), strArray.join(''));
  });

  it('send string twice', () => {
    BrowserUtils.sendKeys(text);
    BrowserUtils.sendKeys(text);
    assert.equal($(TEXT_INPUT).getValue(), `${text}${text}`);
  });

  it('Add text after sending enter for new line', () => {
    BrowserUtils.sendKeys(text);
    BrowserUtils.sendKeys(SpecialKeys.ENTER);
    BrowserUtils.sendKeys(text);
    assert.equal($(TEXT_INPUT).getValue(), `${text}\n${text}`);
  });

  it('Array of Special Keys', () => {
    const specialKeysArray: Array<SpecialKeys> = [SpecialKeys.ENTER, SpecialKeys.ENTER, SpecialKeys.ENTER];
    BrowserUtils.sendKeys(specialKeysArray);
    assert.equal($(TEXT_INPUT).getValue(), '\n\n\n');
  });

  it('Special Key Emoji', () => {
    BrowserUtils.sendKeys(SpecialKeys.EMOJI_HEART);
    assert.equal($(TEXT_INPUT).getValue(), SpecialKeys.EMOJI_HEART);
  });
});
