import { expect } from 'chai';
import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon, sampleAppUrl } from '../TestHelper';

/**
 * wdio-allure-ts navigateToUrl action test
 */
describeCommon('navigateToUrl', () => {
  it('navigate successfully', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);
  });

  it('should fail on malformed URL', () => {
    expect(() => BrowserUtils.navigateToUrl('Cloudinary')).to.throw();
  });
});
