import { BrowserUtils } from '../../commons/BrowserUtils';
import { describeCommon, sampleAppUrl } from '../TestHelper';

/**
 * wdio-allure-ts navigateToUrl action test
 */
describeCommon('navigateToUrl', () => {
  it('navigate successfully', () => {
    BrowserUtils.navigateToUrl(sampleAppUrl);
  });
});
