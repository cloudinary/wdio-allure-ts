import * as fs from 'fs';
import ReportPortalReporter from 'wdio-reportportal-reporter';

enum LEVEL {
  ERROR = 'ERROR',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  EMPTY = '',
}
export namespace ReportPortal {
  export async function step(message: string): Promise<void> {
    await sendLog(LEVEL.INFO, message);
  }

  export async function debug(message: string): Promise<void> {
    await sendLog(LEVEL.DEBUG, message);
  }
  export async function warning(message: string): Promise<void> {
    await sendLog(LEVEL.WARN, message);
  }
  export async function error(message: string): Promise<void> {
    await sendLog(LEVEL.ERROR, message);
  }

  export async function finalizeTest(
    isFailed: boolean,
    // eslint-disable-next-line
    test: any,
    screenshotFilePath: string,
    browserLogs: Array<object>,
    pageSource: string,
    networkActivity: Array<object>
  ): Promise<void> {
    if (isFailed) {
      await ReportPortalReporter.sendFileToTest(
        test,
        LEVEL.ERROR,
        'screenshot',
        fs.readFileSync(screenshotFilePath),
        'image/png',
        'Screenshot'
      );

      await ReportPortalReporter.sendFileToTest(
        test,
        LEVEL.ERROR,
        'browser logs',
        Buffer.from(JSON.stringify(browserLogs)),
        'application/json',
        'Browser console logs'
      );

      await ReportPortalReporter.sendFileToTest(
        test,
        LEVEL.ERROR,
        'Page source',
        Buffer.from(pageSource),
        'text/html',
        'HTML page source'
      );

      await ReportPortalReporter.sendFileToTest(
        test,
        LEVEL.ERROR,
        'Network Logs',
        Buffer.from(JSON.stringify(networkActivity)),
        'application/json',
        'Browser network logs'
      );
    }
  }

  async function sendLog(level: LEVEL, message: string): Promise<void> {
    //pause for 2 ms to insure log order
    await browser.pause(1);
    await ReportPortalReporter.sendLog(level, ` [${level}] - ${message}`);
  }
}
