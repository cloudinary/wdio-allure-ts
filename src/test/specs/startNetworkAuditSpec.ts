import { describeCommon, sampleAppUrl } from '../TestHelper';
import { BrowserUtils, Reporter } from '../..';

interface NetworkLog {
  url: string;
  status: number;
}

/**
 * DevTools - Start network audit
 */
describeCommon('startNetworkAudit', () => {
  it('successfully start and read network audit', () => {
    const expectedLog: NetworkLog = { url: 'http://placekitten.com/480/480', status: 200 };
    const networkLogs: Array<NetworkLog> = [];

    Reporter.step('Start network log');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    browser.on('Network.responseReceived', (params: any) => {
      networkLogs.push({
        url: params.response.url,
        status: Number(params.response.status),
      });
    });

    Reporter.step('navigate to sample app');
    BrowserUtils.url(sampleAppUrl);

    Reporter.step('Wait for new logs');
    BrowserUtils.waitUntil(
      () => {
        return networkLogs.some((log) => log.url === expectedLog.url && Number(log.status) === expectedLog.status);
      },
      { timeoutMsg: `Expected log [${JSON.stringify(expectedLog)}] was not found`, timeout: 5000 }
    );
  });
});
