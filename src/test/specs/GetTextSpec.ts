import { assert, expect } from 'chai';
import { BrowserUtils, Reporter } from '../..';
import { describeCommon } from '../TestHelper';

/**
 * wdio-allure-ts getText tests
 */
describeCommon('GetText of BrowserUtils Tests', () => {
  it('Validate single result ', () => {
    Reporter.step('Validate returned getText value of single element');
    assert.equal(BrowserUtils.getText("//*[@id='GetTextSection-1']/p[1]/button"), 'Open tab');
  });

  it('Validate multiple result select first one ', () => {
    Reporter.step('Validate returned getText value when multiple element match');
    assert.equal(BrowserUtils.getText("//*[@data-test='text-field_gt-1']"), 'Cloudinary 1');
  });

  it('Validate element not exist error thrown', () => {
    Reporter.step('GetText throws an error if element not exists');
    expect(() => BrowserUtils.getText("//*[@id='not-Exists']")).to.throw(Error);
  });
});
