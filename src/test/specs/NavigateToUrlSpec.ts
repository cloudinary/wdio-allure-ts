import { BrowserUtils } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';

/**
 * wdio-allure-ts url action test
 */
describeCommon('url', () => {
  it('navigate successfully', () => {
    BrowserUtils.url(sampleAppUrl);
  });
});
