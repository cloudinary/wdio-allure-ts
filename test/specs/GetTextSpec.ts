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

  it('Validate multiple result ending in err ', () => {
    expect(() => getText("//*[@class='Cloudinary']"))
      .to.throw(Error)
      .with.property('message');
  });

  it('Validate no element found ending in err ', () => {
    expect(() => getText( "//*[@class='OMG']"))
      .to.throw(Error)
      .with.property('message');
  });
});
