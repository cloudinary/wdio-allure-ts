"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const wdio_allure_reporter_1 = require("wdio-allure-reporter");
/**
 * Print to standard output
 */
const printToConsole = process.env.PRINT_LOGS_TO_CONSOLE === "true" || false;
const DEBUG = "[DEBUG]";
const DEBUG_COLOR = chalk_1.default.gray;
const STEP = "[STEP]";
const STEP_COLOR = chalk_1.default.green;
const WARNING = "[WARNING]";
const WARNING_COLOR = chalk_1.default.yellow;
const ERROR = "[ERROR]";
const ERROR_COLOR = chalk_1.default.red;
/**
 * Custom command for use with wdio-allure-reporter
 */
class CustomCommand {
    constructor(title, bodyLabel, body) {
        this.title = title;
        this.body = `${body}`;
        this.bodyLabel = bodyLabel;
    }
    appendToBody(msg) {
        this.body += `${msg} \n`;
    }
}
/**
 * Log to standard system out and allure report
 *
 * Each 'Step' log accumulate additional logs as attachment
 * until new 'Step' log arrived
 */
var Reporter;
(function (Reporter) {
    let isStepClosed = true;
    let currentStepTitle;
    let customCommand;
    /**
     * Close step in report
     */
    function closeStep(isFailed) {
        if (!isStepClosed) {
            if (isFailed) {
                sendCustomCommand(customCommand, "failed");
            }
            else {
                sendCustomCommand(customCommand);
            }
        }
        isStepClosed = true;
    }
    Reporter.closeStep = closeStep;
    /**
     * Log step message
     * console log with green color text
     * @param msg text to log
     */
    function step(msg) {
        toConsole(msg, STEP, STEP_COLOR);
        if (!isStepClosed) {
            closeStep();
        }
        currentStepTitle = `${STEP} - ${msg}`;
        isStepClosed = false;
        customCommand = new CustomCommand(currentStepTitle, "more info", "");
        customCommand.appendToBody(prettyMessage(STEP, msg));
    }
    Reporter.step = step;
    /**
     * Log  debug message
     * console log with grey color text
     * @param msg text to log
     */
    function debug(msg) {
        toConsole(msg, DEBUG, DEBUG_COLOR);
        addLogEntry(DEBUG, msg);
    }
    Reporter.debug = debug;
    /**
     * Log warning message
     * console log with yellow color text
     * @param msg text to log
     */
    function warning(msg) {
        toConsole(msg, WARNING, WARNING_COLOR);
        addLogEntry(WARNING, msg);
    }
    Reporter.warning = warning;
    /**
     * Log error message
     * console log with red color text
     * @param msg text to log
     */
    function error(msg) {
        toConsole(msg, ERROR, ERROR_COLOR);
        addLogEntry(ERROR, msg);
    }
    Reporter.error = error;
    /**
     * Add log entry for allure reporter
     * @param logType logType
     * @param msg message
     */
    function addLogEntry(logType, msg) {
        if (!isStepClosed) {
            customCommand.appendToBody(prettyMessage(logType, msg));
        }
        else {
            customCommand = new CustomCommand(`${logType} - ${msg}`, "more info", prettyMessage(logType, msg));
            sendCustomCommand(customCommand);
        }
    }
    /**
     * Adding custom command to allure reporter
     * @param command command to add
     */
    function sendCustomCommand(command, stepStatus) {
        let status = "passed";
        if (stepStatus !== undefined) {
            status = stepStatus;
        }
        // tslint:disable-next-line:no-unsafe-any
        wdio_allure_reporter_1.createStep(command.title, command.body, command.bodyLabel, status);
    }
})(Reporter = exports.Reporter || (exports.Reporter = {}));
/*
 * Message with type stamp, log type and test name
 * @param logLevel message level info/error/warning/debug
 * @param msg text to log
 */
function prettyMessage(logLevel, msg) {
    const dateString = getDate();
    return `${dateString} ${logLevel} ${msg}`;
}
/**
 * Date for log message
 */
function getDate() {
    return new Date()
        .toISOString() // will return like '2012-11-04T14:51:06.157Z'
        .replace(/T/, " ") // replace T with a space
        .replace(/\..+/, ""); // delete the dot and everything after
}
/**
 * Print message to console`
 * @param msg message to log
 * @param level message level
 * @param color message color
 */
function toConsole(msg, level, color) {
    if (printToConsole) {
        const messageToLog = prettyMessage(level, msg);
        console.log(color(messageToLog));
    }
}
