import { assert, expect } from 'chai';
import { BrowserUtils } from '../../src/commons/BrowserUtils';
import { describeCommon, sampleAppUrl } from '../TestHelper';

/**
 * wdio-allure-ts navigateToUrl action test
 */
describeCommon('navigateToUrl', () => {
  it('navigate successfully', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);
    assert.equal(browser.getUrl(), sampleAppUrl);
  });

  it('should fail on malformed URL', () => {
    const malformedUrl: string = 'cloudinary';
    expect(() => BrowserUtils.navigateToUrl(malformedUrl))
      .to.throw(Error)
      .with.property('message')
      .contains('valid URL'); // On FireFox message: "not valid" on Chrome: "invalid"
  });
});
