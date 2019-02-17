import { assert, expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';


/**
 * wdio-allure-ts navigateToUrl action test
 */
describeCommon('GetText of BrowserUtils Tests', () => {
  it('Validate single result ', () => {
    assert.equal(BrowserUtils.getText("//button[@data-test='open-tab-btn']"), 'Open tab');
  });

  it('failing on  incorrect selector', () => {
    const selector: string = "//*[@id='incorrect']";
    expect(() => BrowserUtils.getText(selector))
      .to.throw(Error)
      .with.property('message')
      .contains(
        `Found multiple results matching text or no results for element: '${selector}' >>>>> 'undefined'`
      );
  });
});
