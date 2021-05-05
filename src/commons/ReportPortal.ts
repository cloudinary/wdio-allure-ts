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
      ReportPortalReporter.sendFile(LEVEL.ERROR, 'screenshot', fs.readFileSync(screenshotFilePath));

      ReportPortalReporter.sendFileToTest(
        test,
        LEVEL.ERROR,
        'browser logs',
        Buffer.from(JSON.stringify(browserLogs)),
        'application/json'
      );

      ReportPortalReporter.sendFileToTest(test, LEVEL.ERROR, 'Page source', Buffer.from(pageSource), 'text/html');

      ReportPortalReporter.sendFileToTest(
        test,
        LEVEL.ERROR,
        'Network Logs',
        Buffer.from(JSON.stringify(networkActivity)),
        'application/json'
      );
    }
  }

  function sendLog(level: LEVEL, message: string): void {
    ReportPortalReporter.sendLog(level, ` [${level}] - ${message}`);
  }
}
