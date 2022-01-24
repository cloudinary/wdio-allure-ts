import allureReporter from '@wdio/allure-reporter';
import { Status } from '@wdio/allure-reporter/build/types';
import path from 'path';

/**
 * Custom command for use with wdio-allure-reporter
 */
class CustomCommand {
  public title: string;
  public bodyLabel: string;
  public body: string;
  constructor(title: string, bodyLabel: string, body: string) {
    this.title = title;
    this.body = `${body}`;
    this.bodyLabel = bodyLabel;
  }
  public appendToBody(msg: string): void {
    this.body += `${msg} \n`;
  }
}

/**
 * Current executed test name for report logs
 */
let currentTestName: string = '';

/**
 * Log to standard system out and allure report
 *
 * Each 'Step' log accumulate additional logs as attachment
 * until new 'Step' log arrived
 */
export namespace AllureReporter {
  let isStepClosed: boolean = true;
  let currentStepTitle: string;
  let customCommand: CustomCommand;

  /**
   * Stop network audit by sending disable options to cdp method
   * ts-ignore used since it missing types support
   */
  export function stopNetworkAudit(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    browser.cdp('Network', 'disable');
  }

  /**
   * Close step in report
   */
  export function closeStep(
    isFailed: boolean,
    browserLogs: Array<object>,
    pageSource: string,
    networkActivity: Array<object>
  ): void {
    if (isFailed) {
      allureReporter.addAttachment('Browser console logs', browserLogs, 'application/json');

      allureReporter.addAttachment('Page HTML source', pageSource, 'html');

      allureReporter.addAttachment('Network Logs', { https: networkActivity }, 'application/json');
    }
    if (!isStepClosed) {
      sendCustomCommand(customCommand, isFailed ? 'failed' : 'passed');
      isStepClosed = true;
    }
  }

  /**
   * Log step message
   * console log with green color text
   * @param msg text to log
   */
  export function step(msg: string): void {
    closeStep(false, undefined, undefined, undefined);

    currentStepTitle = `[STEP] - ${msg}`;
    isStepClosed = false;

    customCommand = new CustomCommand(currentStepTitle, 'more info', '');

    customCommand.appendToBody(prettyMessage('[STEP]', msg));
  }

  /**
   * Log  debug message
   * console log with grey color text
   * @param msg text to log
   */
  export function debug(msg: string): void {
    addLogEntry('[DEBUG]', msg);
  }

  /**
   * Log warning message
   * console log with yellow color text
   * @param msg text to log
   */
  export function warning(msg: string): void {
    addLogEntry('[WARNING]', msg);
  }

  /**
   * Log error message
   * console log with red color text
   * @param msg text to log
   */
  export function error(msg: string): void {
    addLogEntry('[ERROR]', msg);
  }

  /**
   * Adding description name
   * @param description of the test
   * @param descriptionType type (String, optional) – description type, text by default. Values ['text', 'html','markdown']
   */
  export function addDescription(description: string, descriptionType?: string): void {
    allureReporter.addDescription(description, descriptionType);
  }

  /**
   * Add log entry for allure reporter
   * @param logType logType
   * @param msg message
   */
  export function addLogEntry(logType: string, msg: string): void {
    if (!isStepClosed) {
      customCommand.appendToBody(prettyMessage(logType, msg));
    } else {
      customCommand = new CustomCommand(`${logType} - ${msg}`, 'more info', prettyMessage(logType, msg));
      sendCustomCommand(customCommand);
    }
  }

  /**
   * Adding custom command to allure reporter
   * @param command command to add
   * @param stepStatus status of steps
   */
  function sendCustomCommand(command: CustomCommand, stepStatus?: Status): void {
    let status: Status = 'passed';
    if (stepStatus !== undefined) {
      status = stepStatus;
    }
    const stepContent: object = {
      content: command.body,
      name: command.bodyLabel,
    };
    allureReporter.addStep(command.title, stepContent, status);
  }

  /**
   * Message with type stamp, log type and test name
   * @param logLevel message level info/error/warning/debug
   * @param msg text to log
   */
  function prettyMessage(logLevel: string, msg: string): string {
    const dateString: string = getDate();

    return `${dateString}${currentTestName !== '' ? ` ${currentTestName} ` : ' '}${logLevel} ${msg}`;
  }

  /**
   * Set current executed test name
   * usage example:
   * beforeHook: function(test, context) {
   *    Reporter.setCurrentTestName(`[${test.parent}] [${test.title}]`);
   * },
   */
  export function setCurrentTestName(testName: string): void {
    currentTestName = testName;
  }

  /**
   * Date for log message
   */
  function getDate(): string {
    return new Date()
      .toISOString() // will return like '2012-11-04T14:51:06.157Z'
      .replace(/T/, ' ') // replace T with a space
      .replace(/\..+/, ''); // delete the dot and everything after
  }

  /**
   * Adding screenshot to report
   * @param name of the screenshot, that will appear in the report
   */
  export function addScreenshot(name: string = 'screenshot'): void {
    allureReporter.addAttachment(name, browser.saveScreenshot(path.join(__dirname, `${name}.png`)), 'image/png');
  }
}
