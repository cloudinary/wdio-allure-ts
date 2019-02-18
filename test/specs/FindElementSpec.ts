import { expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { SelectorType } from '../../src/enums/SelectorType';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts FindElement & FindElements tests
 */
describeCommon('findElement of BrowserUtils Tests', () => {
  it('Check Result contains element key (object)', () => {
    const result: string = BrowserUtils.findElement(
      SelectorType.XPATH,
      "//*[@id='embedded__images']/div/p/img"
    );
    expect(JSON.stringify(result).toLowerCase()).contains('{"element');
  });
});
