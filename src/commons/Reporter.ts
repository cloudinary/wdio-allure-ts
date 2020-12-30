import allureReporter from '@wdio/allure-reporter';
import chalk from 'chalk';

/**
 * Print to standard output
 */
const printToConsole: boolean = process.env.PRINT_LOGS_TO_CONSOLE === 'true' || false;
/**
 * Current executed test name for report logs
 */
let currentTestName: string = '';
const DEBUG: string = '[DEBUG]';
const DEBUG_COLOR: chalk.Chalk = chalk.gray;
const STEP: string = '[STEP]';
const STEP_COLOR: chalk.Chalk = chalk.green;
const WARNING: string = '[WARNING]';
const WARNING_COLOR: chalk.Chalk = chalk.yellow;
const ERROR: string = '[ERROR]';
const ERROR_COLOR: chalk.Chalk = chalk.red;

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
 * Log to standard system out and allure report
 *
 * Each 'Step' log accumulate additional logs as attachment
 * until new 'Step' log arrived
 */
export namespace Reporter {
  let isStepClosed: boolean = true;
  let currentStepTitle: string;
  let customCommand: CustomCommand;
  let networkActivity: Array<{ url: string; status: string; headers: object }> = [];

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
   *
   * @param ignoreLogsType if true capture all logs type(optional)
   */
  export function startNetworkAudit(ignoreLogsType?: boolean): void {
    if (browser.capabilities.browserName.toLowerCase().includes('chrome')) {
      const logsTypeToCapture: Array<string> = ['xhr', 'fetch'];

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      browser.cdp('Network', 'enable');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      browser.on('Network.responseReceived', (params: any) => {
        if (ignoreLogsType || logsTypeToCapture.includes(params.type.toLowerCase())) {
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
   * Return network logs
   */
  export function getNetworkActivity(): Array<{ url: string; status: string; headers: object }> {
    return networkActivity;
  }

  /**
   * Add logs to report and clean the data
   */
  function attachAndCleanNetworkLogs(): void {
    allureReporter.addAttachment('Network Logs', { https: networkActivity }, 'application/json');

    networkActivity = [];
  }

  /**
   * Close step in report
   */
  export function closeStep(isFailed?: boolean): void {
    if (isFailed) {
      browser.takeScreenshot();
      allureReporter.addAttachment(
        'Browser console logs',
        `${JSON.stringify(browser.getLogs('browser'), undefined, 2)}`
      );

      attachAndCleanNetworkLogs();

      allureReporter.addAttachment('Page HTML source', `${browser.getPageSource()}`);
    }
    if (!isStepClosed) {
      sendCustomCommand(customCommand, isFailed ? 'failed' : 'passed');
      isStepClosed = true;
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
    currentTestName = testName;
  }

  /**
   * Log step message
   * console log with green color text
   * @param msg text to log
   */
  export function step(msg: string): void {
    toConsole(msg, STEP, STEP_COLOR);

    closeStep();

    currentStepTitle = `${STEP} - ${msg}`;
    isStepClosed = false;

    customCommand = new CustomCommand(currentStepTitle, 'more info', '');

    customCommand.appendToBody(prettyMessage(STEP, msg));
  }

  /**
   * Log  debug message
   * console log with grey color text
   * @param msg text to log
   */
  export function debug(msg: string): void {
    toConsole(msg, DEBUG, DEBUG_COLOR);
    addLogEntry(DEBUG, msg);
  }

  /**
   * Log warning message
   * console log with yellow color text
   * @param msg text to log
   */
  export function warning(msg: string): void {
    toConsole(msg, WARNING, WARNING_COLOR);
    addLogEntry(WARNING, msg);
  }

  /**
   * Log error message
   * console log with red color text
   * @param msg text to log
   */
  export function error(msg: string): void {
    toConsole(msg, ERROR, ERROR_COLOR);
    addLogEntry(ERROR, msg);
  }

  /**
   * Adding Environment to allure report
   * @param name name of the env
   * @param value string
   */
  export function addEnvironment(name: string, value?: string): void {
    allureReporter.addEnvironment(name, value);
  }

  /**
   * Adding issue name
   * @param value name of the feature
   */
  export function addTestId(value: string): void {
    allureReporter.addTestId(value);
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
  function addLogEntry(logType: string, msg: string): void {
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
  function sendCustomCommand(command: CustomCommand, stepStatus?: string): void {
    let status: string = 'passed';
    if (stepStatus !== undefined) {
      status = stepStatus;
    }
    const stepContent: object = {
      content: command.body,
      name: command.bodyLabel,
    };
    allureReporter.addStep(command.title, stepContent, status);
  }
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
 * Date for log message
 */
function getDate(): string {
  return new Date()
    .toISOString() // will return like '2012-11-04T14:51:06.157Z'
    .replace(/T/, ' ') // replace T with a space
    .replace(/\..+/, ''); // delete the dot and everything after
}

/**
 * Print message to console`
 * @param msg message to log
 * @param level message level
 * @param color message color
 */
function toConsole(msg: string, level: string, color: chalk.Chalk): void {
  if (printToConsole) {
    const messageToLog: string = prettyMessage(level, msg);
    console.log(color(messageToLog));
  }
}
