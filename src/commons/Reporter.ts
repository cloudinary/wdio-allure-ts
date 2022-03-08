import path from 'path';
import { AllureReporter } from './AllureReport';
import { ConsoleReport } from './ConsoleReport';
import { ReportPortal } from './ReportPortal';
import { TestUtils } from '../index';
import fs from 'fs';

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
  export async function stopNetworkAudit(): Promise<void> {
    await browser.cdp('Network', 'disable');

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
  export async function startNetworkAudit(): Promise<void> {
    if (browser.capabilities['browserName'] === 'chrome') {
      await browser.cdp('Network', 'enable');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await browser.on('Network.responseReceived', (params: any) => {
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
  export async function closeStep(isFailed: boolean, test?: any): Promise<void> {
    let screenshotFilePath;
    if (isFailed) {
      screenshotFilePath = path.join(__dirname, `${TestUtils.randomString(10)}.png`);
      await browser.saveScreenshot(screenshotFilePath);
    }
    const pageSource = await browser.getPageSource();

    const browserLogs = await browser.getLogs('browser');
    await AllureReporter.closeStep(isFailed, browserLogs, pageSource, networkActivity);

    if (test) {
      await ReportPortal.finalizeTest(isFailed, test, screenshotFilePath, browserLogs, pageSource, networkActivity);
    }
    if (isFailed) {
      fs.unlinkSync(screenshotFilePath);
    }
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
  export async function step(msg: string): Promise<void> {
    await ConsoleReport.step(msg);
    await AllureReporter.step(msg);
    await ReportPortal.step(msg);
  }

  /**
   * Log  debug message
   * console log with grey color text
   * @param msg text to log
   */
  export async function debug(msg: string): Promise<void> {
    await ConsoleReport.debug(msg);
    await AllureReporter.addLogEntry('[DEBUG]', msg);
    await ReportPortal.debug(msg);
  }

  /**
   * Log warning message
   * console log with yellow color text
   * @param msg text to log
   */
  export async function warning(msg: string): Promise<void> {
    await ConsoleReport.warning(msg);
    await AllureReporter.addLogEntry('[WARNING]', msg);
    await ReportPortal.warning(msg);
  }

  /**
   * Log error message
   * console log with red color text
   * @param msg text to log
   */
  export async function error(msg: string): Promise<void> {
    await ConsoleReport.error(msg);
    await AllureReporter.addLogEntry('[ERROR]', msg);
    await ReportPortal.error(msg);
  }

  /**
   * Adding screenshot for report
   * Currently only implemented for allure reporter
   * @param name of the screenshot, that will appear in the report
   */
  export async function addScreenshot(name: string = 'screenshot'): Promise<void> {
    await AllureReporter.addScreenshot(name);
  }
}
