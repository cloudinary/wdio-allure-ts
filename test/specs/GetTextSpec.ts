import { assert, expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts navigateToUrl action test
 */
describeCommon('GetText of BrowserUtils Tests', () => {
  it('Validate single result ', () => {
    assert.equal(
      BrowserUtils.getText("//button[@data-test='open-tab-btn']"),
      'Open tab'
    );
  });

  it('Validate multiple result ending in err ', () => {
    expect(() => BrowserUtils.getText("//*[@id='incorrect']"))
      .to.throw(Error)
      .with.property('message')
      .contains('Found multiple results');
  });
});
