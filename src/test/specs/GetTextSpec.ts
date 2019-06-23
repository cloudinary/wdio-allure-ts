import { assert, expect } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts getText tests
 */
describeCommon('GetText of BrowserUtils Tests', () => {
  it('Validate single result ', () => {
    assert.equal(BrowserUtils.getText("//*[@id='GetTextSection-1']/p[1]/button"), 'Open tab');
  });

  it('Validate multiple result select first one ', () => {
    assert.equal(BrowserUtils.getText("//*[@id='text-field_gt-1']"), 'Cloudinary 1');
  });

  it('Validate element not exist error thrown', () => {
    expect(() => BrowserUtils.getText("//*[@id='not-Exists']")).to.throw(Error);
  });
});
