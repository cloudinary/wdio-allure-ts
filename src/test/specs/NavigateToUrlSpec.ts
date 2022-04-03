import { BrowserUtils, Reporter } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

/**
 * wdio-allure-ts url action test
 */
describeCommon('url', () => {
  it('navigate successfully', async () => {
    await Reporter.step('Navigate to sample app');
    await BrowserUtils.url(sampleAppUrl);
  });
});
