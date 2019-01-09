/**
 * wdio-allure-ts Scroll To Element tests
 */
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';
import scrollToElement = BrowserUtils.scrollToElement;

describeCommon('findElement of BrowserUtils Tests', () => {
  it.skip('Check Result ', () => {
    scrollToElement("//*[@class='button-print-message']");
  });
});
