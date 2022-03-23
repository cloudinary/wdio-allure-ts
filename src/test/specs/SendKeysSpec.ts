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
  beforeEach(async () => {
    await Reporter.step('clear text input');
    await (await $(TEXT_INPUT)).clearValue();

    await Reporter.step('click text input');
    await (await $(TEXT_INPUT)).click();
  });

  it('send string', async () => {
    await Reporter.step('send keys - string');
    await BrowserUtils.keys(text);

    await Reporter.step('Validate text value');
    assert.equal(await (await $(TEXT_INPUT)).getValue(), text);
  });

  it('send an array of strings', async () => {
    const strArray: Array<string> = ['C', 'L', 'O', 'U', 'D', 'I', 'N', 'A', 'R', 'Y'];
    await Reporter.step('send keys - string array');
    await BrowserUtils.keys(strArray);

    await Reporter.step('Validate text value');
    assert.equal(await (await $(TEXT_INPUT)).getValue(), strArray.join(''));
  });

  it('send string twice', async () => {
    await Reporter.step('send keys - string');
    await BrowserUtils.keys(text);

    await Reporter.step('send keys - string');
    await BrowserUtils.keys(text);

    await Reporter.step('Validate text value');
    assert.equal(await (await $(TEXT_INPUT)).getValue(), `${text}${text}`);
  });

  it('Add text after sending enter for new line', async () => {
    await Reporter.step('send keys - string');
    await BrowserUtils.keys(text);

    await Reporter.step('send keys - ENTER');
    await BrowserUtils.keys(SpecialKeys.ENTER);

    await Reporter.step('send keys - string');
    await BrowserUtils.keys(text);

    await Reporter.step('Validate text value');
    assert.equal(await (await $(TEXT_INPUT)).getValue(), `${text}\n${text}`);
  });

  it('Array of Special Keys', async () => {
    const specialKeysArray: Array<SpecialKeys> = [SpecialKeys.ENTER, SpecialKeys.ENTER, SpecialKeys.ENTER];
    await Reporter.step('send keys - string array special chars');
    await BrowserUtils.keys(specialKeysArray);

    await Reporter.step('Validate text value');
    assert.equal(await (await $(TEXT_INPUT)).getValue(), '\n\n\n');
  });

  it('Special Key Emoji', async () => {
    await Reporter.step('send keys - emoji');
    await BrowserUtils.keys(SpecialKeys.EMOJI_HEART);

    await Reporter.step('Validate text value');
    assert.equal(await (await $(TEXT_INPUT)).getValue(), SpecialKeys.EMOJI_HEART);
  });
});
