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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    browser.on('Network.responseReceived', (params: any) => {
      networkLogs.push({
        url: params.response.url,
        status: Number(params.response.status),
      });
    });

    BrowserUtils.url(sampleAppUrl);

    BrowserUtils.waitUntil(
      () => {
        return networkLogs.some((log) => log.url === expectedLog.url && Number(log.status) === expectedLog.status);
      },
      `Expected log [${JSON.stringify(expectedLog)}] was not found`,
      5000
    );
  });
});
