import { BrowserUtils, Reporter } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

/**
 * wdio-allure-ts url action test
 */
describeCommon('url', () => {
  it('navigate successfully', () => {
    Reporter.step('Navigate to sample app');
    BrowserUtils.url(sampleAppUrl);
  });
});
