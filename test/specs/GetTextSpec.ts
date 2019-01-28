import { assert, expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';
import getText = BrowserUtils.getText;

/**
 * wdio-allure-ts navigateToUrl action test
 */
describeCommon('GetText of BrowserUtils Tests', () => {
  it('Validate single result ', () => {
    assert.equal(
      getText("//*[@class='button-print-message']"),
      'Print message'
    );
  });

  it('failing on  incorrect selector', () => {
    const selector: string = "//*[@id='text-field']";
    expect(() => getText(selector))
      .to.throw(Error)
      .with.property('message')
      .contains(
        `Found multiple results matching text or no results for element: '${selector}' >>>>> 'undefined'`
      );
  });
});
