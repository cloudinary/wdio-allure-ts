import { expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { SelectorType } from '../../enums/SelectorType';
import { describeCommon } from '../TestHelper';

const IMAGE_XPATH: string = "//*[@id='content_images']/div/p/img";
const BAD_XPATH: string = "//*[@id='bad_path']";
const MULTIPART_ELEMENTS_RESULT: string = "//*[@data-test='multi-text-field']";
/**
 * wdio-allure-ts FindElement & FindElements tests
 */
describeCommon('findElement of BrowserUtils Tests', () => {
  it('Check Result contains element key (object)', async () => {
    await Reporter.step('Validate return value of find element');
    const result: string = await BrowserUtils.findElement(SelectorType.XPATH, IMAGE_XPATH);

    expect(JSON.stringify(result).toLowerCase()).contains('{"element');
  });

  it('Fail to obtain element due to wrong path', async () => {
    await Reporter.step('Find element by wrong selector');
    const result: string = await BrowserUtils.findElement(SelectorType.XPATH, BAD_XPATH);

    expect(JSON.stringify(result).toLowerCase()).not.contains('{"element');
  });

  it('First Element Returned', async () => {
    await Reporter.step('Validate first element returned in case of multiple match');
    const result: string = await BrowserUtils.findElement(SelectorType.XPATH, MULTIPART_ELEMENTS_RESULT);

    expect(JSON.stringify(result).toLowerCase()).contains('{"element');
  });
});
