const colours = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',

  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m', // Scarlet
  },
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m',
  },
};

/**
 * Print to standard output
 */
const printToConsole: boolean = process.env.PRINT_LOGS_TO_CONSOLE === 'true' || false;
/**
 * Current executed test name for report logs
 */
let currentTestName: string = '';

const DEBUG: string = '[DEBUG]';
const DEBUG_COLOR: string = colours.bg.white;
const STEP: string = '[STEP]';
const STEP_COLOR: string = colours.bg.green;
const WARNING: string = '[WARNING]';
const WARNING_COLOR: string = colours.bg.yellow;
const ERROR: string = '[ERROR]';
const ERROR_COLOR: string = colours.bg.red;
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
  function toConsole(msg: string, level: string, color: string): void {
    if (printToConsole) {
      const messageToLog: string = prettyMessage(level, msg);
      console.log(color, messageToLog, colours.reset);
    }
  }
}
