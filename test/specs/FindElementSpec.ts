import { expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { SelectorType } from '../../src/enums/SelectorType';
import { describeCommon } from '../TestHelper';

const IMAGE_XPATH: string = "//*[@id='content_images']/div/p/img";
/**
 * wdio-allure-ts FindElement & FindElements tests
 */
describeCommon('findElement of BrowserUtils Tests', () => {
  it('Check Result contains element key (object)', () => {
    const result: string = BrowserUtils.findElement(
      SelectorType.XPATH,
      IMAGE_XPATH
    );

    expect(JSON.stringify(result).toLowerCase()).contains('{"element');
  });
});
