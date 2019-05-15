import allureReporter from '@wdio/allure-reporter';
import chalk, { Chalk } from 'chalk';

/**
 * Print to standard output
 */
const printToConsole: boolean = process.env.PRINT_LOGS_TO_CONSOLE === 'true' || false;

const DEBUG: string = '[DEBUG]';
const DEBUG_COLOR: Chalk = chalk.gray;
const STEP: string = '[STEP]';
const STEP_COLOR: Chalk = chalk.green;
const WARNING: string = '[WARNING]';
const WARNING_COLOR: Chalk = chalk.yellow;
const ERROR: string = '[ERROR]';
const ERROR_COLOR: Chalk = chalk.red;

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

    /**
     * Close step in report
     */
    export function closeStep(isFailed?: boolean): void {
        if (!isStepClosed) {
            if (isFailed) {
                sendCustomCommand(customCommand, 'failed');
            } else {
                sendCustomCommand(customCommand);
            }
        }
        isStepClosed = true;
    }

    /**
     * Log step message
     * console log with green color text
     * @param msg text to log
     */
    export function step(msg: string): void {
        toConsole(msg, STEP, STEP_COLOR);

        if (!isStepClosed) {
            closeStep();
        }

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
     */
    function sendCustomCommand(command: CustomCommand, stepStatus?: string): void {
        let status: string = 'passed';
        if (stepStatus !== undefined) {
            status = stepStatus;
        }
        const stepContent: Object = {
            content: command.body,
            name: command.bodyLabel,
        };
        // tslint:disable-next-line:no-unsafe-any
        allureReporter.addStep(command.title, stepContent, status);
    }
}

/*
 * Message with type stamp, log type and test name
 * @param logLevel message level info/error/warning/debug
 * @param msg text to log
 */
function prettyMessage(logLevel: string, msg: string): string {
    const dateString: string = getDate();

    return `${dateString} ${logLevel} ${msg}`;
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
function toConsole(msg: string, level: string, color: Chalk): void {
    if (printToConsole) {
        const messageToLog: string = prettyMessage(level, msg);
        console.log(color(messageToLog));
    }
}
