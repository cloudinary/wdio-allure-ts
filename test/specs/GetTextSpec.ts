import { assert, expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { SelectorType } from '../../src/enums/SelectorType';
import { describeCommon } from '../TestHelper';
import getText = BrowserUtils.getText;

/**
 * wdio-allure-ts navigateToUrl action test
 */
describeCommon('GetText of BrowserUtils Tests', () => {
  it('Validate single result ', () => {
    assert.equal(
      getText(SelectorType.XPATH, "//*[@class='button-print-message']"),
      'Print message'
    );
  });

  it('Validate multiple result ending in err ', () => {
    expect(() => getText(SelectorType.XPATH, "//*[@class='Cloudinary']"))
      .to.throw(Error)
      .with.property('message');
  });

  it('Validate no element found ending in err ', () => {
    expect(() => getText(SelectorType.XPATH, "//*[@class='OMG']"))
      .to.throw(Error)
      .with.property('message');
  });
});
