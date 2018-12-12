import { assert, expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts navigateToUrl action test
 */
describeCommon('GetText of BrowserUtils Tests', () => {
  it('Validate single result ', () => {
    assert.equal(
      BrowserUtils.getText("//*[@class='button-print-message']"),
      'Print message'
    );
  });

  it('Validate multiple result ending in err ', () => {
    expect(() => BrowserUtils.getText("//*[@class='Cloudinary']"))
      .to.throw(Error)
      .with.property('message')
      .contains(`Found multiple results matching text or no results`);
  });

  it('Validate no element found ending in err ', () => {
    expect(() => BrowserUtils.getText("//*[@class='OMG']"))
      .to.throw(Error)
      .with.property('message')
      .contains(`Found multiple results matching text or no results`);
  });
});
