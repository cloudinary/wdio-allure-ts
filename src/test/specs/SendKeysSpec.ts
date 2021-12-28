import { assert } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { SpecialKeys } from '../..';
import { describeCommon } from '../TestHelper';

const TEXT_INPUT: string = "//*[@id='SendKeys_input__text']";
const text: string = 'Cloudinary';

/**
 * wdio-allure-ts keys tests
 */
describeCommon('SendKeysSpec', () => {
  beforeEach(() => {
    Reporter.step('clear text input');
    $(TEXT_INPUT).clearValue();

    Reporter.step('click text input');
    $(TEXT_INPUT).click();
  });

  it('send string', () => {
    Reporter.step('send keys - string');
    BrowserUtils.keys(text);

    Reporter.step('Validate text value');
    assert.equal($(TEXT_INPUT).getValue(), text);
  });

  it('send an array of strings', () => {
    const strArray: Array<string> = ['C', 'L', 'O', 'U', 'D', 'I', 'N', 'A', 'R', 'Y'];
    Reporter.step('send keys - string array');
    BrowserUtils.keys(strArray);

    Reporter.step('Validate text value');
    assert.equal($(TEXT_INPUT).getValue(), strArray.join(''));
  });

  it('send string twice', () => {
    Reporter.step('send keys - string');
    BrowserUtils.keys(text);

    Reporter.step('send keys - string');
    BrowserUtils.keys(text);

    Reporter.step('Validate text value');
    assert.equal($(TEXT_INPUT).getValue(), `${text}${text}`);
  });

  it('Add text after sending enter for new line', () => {
    Reporter.step('send keys - string');
    BrowserUtils.keys(text);

    Reporter.step('send keys - ENTER');
    BrowserUtils.keys(SpecialKeys.ENTER);

    Reporter.step('send keys - string');
    BrowserUtils.keys(text);

    Reporter.step('Validate text value');
    assert.equal($(TEXT_INPUT).getValue(), `${text}\n${text}`);
  });

  it('Array of Special Keys', () => {
    const specialKeysArray: Array<SpecialKeys> = [SpecialKeys.ENTER, SpecialKeys.ENTER, SpecialKeys.ENTER];
    Reporter.step('send keys - string array special chars');
    BrowserUtils.keys(specialKeysArray);

    Reporter.step('Validate text value');
    assert.equal($(TEXT_INPUT).getValue(), '\n\n\n');
  });

  it('Special Key Emoji', () => {
    Reporter.step('send keys - emoji');
    BrowserUtils.keys(SpecialKeys.EMOJI_HEART);

    Reporter.step('Validate text value');
    assert.equal($(TEXT_INPUT).getValue(), SpecialKeys.EMOJI_HEART);
  });
});
