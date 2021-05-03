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
export namespace ConsoleReport {
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

  export function step(message: string): void {
    toConsole(message, STEP, STEP_COLOR);
  }

  export function debug(message: string): void {
    toConsole(message, DEBUG, DEBUG_COLOR);
  }

  export function warning(message: string): void {
    toConsole(message, WARNING, WARNING_COLOR);
  }

  export function error(message: string): void {
    toConsole(message, ERROR, ERROR_COLOR);
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
}
