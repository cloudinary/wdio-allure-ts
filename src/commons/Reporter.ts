import path from 'path';
import { AllureReporter } from './AllureReport';
import { ConsoleReport } from './ConsoleReport';
import { ReportPortal } from './ReportPortal';
import { TestUtils } from '../index';

/**
 * Log to standard system out and allure report
 *
 * Each 'Step' log accumulate additional logs as attachment
 * until new 'Step' log arrived
 */
export namespace Reporter {
  let networkActivity: Array<{ url: string; status: string; headers: object }> = [];

  /**
   * Stop network audit by sending disable options to cdp method
   * ts-ignore used since it missing types support
   */
  export function stopNetworkAudit(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    browser.cdp('Network', 'disable');

    networkActivity = [];
  }

  /**
   * Enable network audits for test run.
   * Will log xhr and fetch responses
   *
   * Require adding devtools as a service in wdio.conf.js
   * See https://webdriver.io/docs/devtools-service.html
   *
   * Will log all network logs to networkActivity that can be added to html report
   * For more readable logs, we only log <url>, <status> and <headers> instead of whole request data
   *
   * Since devtools typing are missing ts ignore required in some cases such as browser.cdp(...)
   *
   * Example of usage:
   * In beforeSuite hook:
   *      Reporter.enableNetworkAudits()
   * In afterTest hook:
   *      Reporter.addAttachment('Network Logs', { https: networkActivity }, 'application/json');
   *    already integrated in Reporter.closeStep method in case of test failure
   */
  export function startNetworkAudit(): void {
    if (browser.capabilities['browserName'] === 'chrome') {
      browser.cdp('Network', 'enable');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      browser.on('Network.responseReceived', (params: any) => {
        if (params.type.toLowerCase() === 'xhr' || params.type.toLowerCase() === 'fetch') {
          networkActivity.push({
            url: params.response.url,
            status: params.response.status,
            headers: params.response.headers,
          });
        }
      });
    }
  }

  /**
   * Close step in report
   */
  // eslint-disable-next-line
  export function closeStep(isFailed: boolean, test?: any): void {
    const screenshotFilePath = path.join(__dirname, `${TestUtils.randomString(10)}.png`);
    browser.saveScreenshot(screenshotFilePath);

    const pageSource = browser.getPageSource();

    const browserLogs = browser.getLogs('browser');
    AllureReporter.closeStep(isFailed, browserLogs, pageSource, networkActivity);

    if (test && test !== undefined) {
      ReportPortal.finalizeTest(isFailed, test, screenshotFilePath, browserLogs, pageSource, networkActivity);
    }

    //fs.unlinkSync(screenshotFilePath);
  }

  /**
   * Set current executed test name
   * usage example:
   * beforeHook: function(test, context) {
   *    Reporter.setCurrentTestName(`[${test.parent}] [${test.title}]`);
   * },
   */
  export function setCurrentTestName(testName: string): void {
    ConsoleReport.setCurrentTestName(testName);
  }

  /**
   * Log step message
   * console log with green color text
   * @param msg text to log
   */
  export function step(msg: string): void {
    ConsoleReport.step(msg);
    AllureReporter.step(msg);
    ReportPortal.step(msg);
  }

  /**
   * Log  debug message
   * console log with grey color text
   * @param msg text to log
   */
  export function debug(msg: string): void {
    ConsoleReport.debug(msg);
    AllureReporter.addLogEntry('[DEBUG]', msg);
    ReportPortal.debug(msg);
  }

  /**
   * Log warning message
   * console log with yellow color text
   * @param msg text to log
   */
  export function warning(msg: string): void {
    ConsoleReport.warning(msg);
    AllureReporter.addLogEntry('[WARNING]', msg);
    ReportPortal.warning(msg);
  }

  /**
   * Log error message
   * console log with red color text
   * @param msg text to log
   */
  export function error(msg: string): void {
    ConsoleReport.error(msg);
    AllureReporter.addLogEntry('[ERROR]', msg);
    ReportPortal.error(msg);
  }
}
