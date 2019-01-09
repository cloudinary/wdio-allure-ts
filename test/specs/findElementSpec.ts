import { assert } from 'chai';
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
      "//*[@class='button-print-message']"
    );
    assert.include(JSON.stringify(result), '{"ELEMENT":"');
  });
});
