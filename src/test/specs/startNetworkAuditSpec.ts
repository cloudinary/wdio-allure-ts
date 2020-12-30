import { Reporter } from '../..';
import { describeCommon, sampleAppUrl } from '../TestHelper';
import { BrowserUtils } from '../../../lib';

interface NetworkLog {
  url: string;
  status: number;
}

/**
 * DevTools - Start network audit
 */
describeCommon('startNetworkAudit', () => {
  afterEach(() => {
    Reporter.stopNetworkAudit();
  });

  it('successfully start and read network audit', () => {
    const expectedLog: NetworkLog = { url: 'http://placekitten.com/480/480', status: 200 };

    Reporter.startNetworkAudit(true);
    BrowserUtils.navigateToUrl(sampleAppUrl);

    BrowserUtils.waitUntil(
      () => {
        return Reporter.getNetworkActivity().some(
          (log) => log.url === expectedLog.url && Number(log.status) === expectedLog.status
        );
      },
      `Expected log [${JSON.stringify(expectedLog)}] was not found`,
      5000
    );
  });
});
