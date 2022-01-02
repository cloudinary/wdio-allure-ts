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
  export function step(message: string): void {
    sendLog(LEVEL.INFO, message);
  }

  export function debug(message: string): void {
    sendLog(LEVEL.DEBUG, message);
  }
  export function warning(message: string): void {
    sendLog(LEVEL.WARN, message);
  }
  export function error(message: string): void {
    sendLog(LEVEL.ERROR, message);
  }

  export function finalizeTest(
    isFailed: boolean,
    // eslint-disable-next-line
    test: any,
    screenshotFilePath: string,
    browserLogs: Array<object>,
    pageSource: string,
    networkActivity: Array<object>
  ): void {
    if (isFailed) {
      ReportPortalReporter.sendFileToTest(
        test,
        LEVEL.ERROR,
        'screenshot',
        fs.readFileSync(screenshotFilePath),
        'image/png',
        'Screenshot'
      );

      ReportPortalReporter.sendFileToTest(
        test,
        LEVEL.ERROR,
        'browser logs',
        Buffer.from(JSON.stringify(browserLogs)),
        'application/json',
        'Browser console logs'
      );

      ReportPortalReporter.sendFileToTest(
        test,
        LEVEL.ERROR,
        'Page source',
        Buffer.from(pageSource),
        'text/html',
        'HTML page source'
      );

      ReportPortalReporter.sendFileToTest(
        test,
        LEVEL.ERROR,
        'Network Logs',
        Buffer.from(JSON.stringify(networkActivity)),
        'application/json',
        'Browser network logs'
      );
    }
  }

  function sendLog(level: LEVEL, message: string): void {
    //pause for 2 ms to insure log order
    browser.pause(1);
    ReportPortalReporter.sendLog(level, ` [${level}] - ${message}`);
  }
}
