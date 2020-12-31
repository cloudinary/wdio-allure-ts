import { describeCommon, sampleAppUrl } from '../TestHelper';
import { BrowserUtils } from '../..';

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

    browser.on('Network.responseReceived', (params: any) => {
      networkLogs.push({
        url: params.response.url,
        status: Number(params.response.status),
      });
    });

    BrowserUtils.navigateToUrl(sampleAppUrl);

    BrowserUtils.waitUntil(
      () => {
        return networkLogs.some((log) => log.url === expectedLog.url && Number(log.status) === expectedLog.status);
      },
      `Expected log [${JSON.stringify(expectedLog)}] was not found`,
      5000
    );
  });
});
