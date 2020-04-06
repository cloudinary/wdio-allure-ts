"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allure_reporter_1 = __importDefault(require("@wdio/allure-reporter"));
const chalk_1 = __importDefault(require("chalk"));
/**
 * Print to standard output
 */
const printToConsole = process.env.PRINT_LOGS_TO_CONSOLE === 'true' || false;
/**
 * Current executed test name for report logs
 */
let currentTestName = '';
const DEBUG = '[DEBUG]';
const DEBUG_COLOR = chalk_1.default.gray;
const STEP = '[STEP]';
const STEP_COLOR = chalk_1.default.green;
const WARNING = '[WARNING]';
const WARNING_COLOR = chalk_1.default.yellow;
const ERROR = '[ERROR]';
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
    // tslint:disable-next-line:prefer-const
    let networkActivity = [];
    /**
     * Stop network audit by sending disable options to cdp method
     * ts-ignore used since it missing types support
     */
    function stopNetworkAudit() {
        // @ts-ignore
        browser.cdp('Network', 'disable');
    }
    Reporter.stopNetworkAudit = stopNetworkAudit;
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
    function startNetworkAudit() {
        if (browser.capabilities.browserName === 'chrome') {
            // @ts-ignore
            browser.cdp('Network', 'enable');
            // @ts-ignore
            browser.on('Network.responseReceived', (params) => {
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
    Reporter.startNetworkAudit = startNetworkAudit;
    /**
     * Add logs to report and clean the data
     */
    function attachAndCleanNetworkLogs() {
        // @ts-ignore
        allure_reporter_1.default.addAttachment('Network Logs', { https: networkActivity }, 'application/json');
        networkActivity = [];
    }
    /**
     * Close step in report
     */
    function closeStep(isFailed) {
        if (isFailed) {
            browser.takeScreenshot();
            allure_reporter_1.default.addAttachment('Browser console logs', `${JSON.stringify(browser.getLogs('browser'), undefined, 2)}`);
            attachAndCleanNetworkLogs();
            allure_reporter_1.default.addAttachment('Page HTML source', `${browser.getPageSource()}`);
        }
        if (!isStepClosed) {
            sendCustomCommand(customCommand, isFailed ? 'failed' : 'passed');
            isStepClosed = true;
        }
    }
    Reporter.closeStep = closeStep;
    /**
     * Set current executed test name
     * usage example:
     * beforeHook: function(test, context) {
     *    Reporter.setCurrentTestName(`[${test.parent}] [${test.title}]`);
     * },
     */
    function setCurrentTestName(testName) {
        currentTestName = testName;
    }
    Reporter.setCurrentTestName = setCurrentTestName;
    /**
     * Log step message
     * console log with green color text
     * @param msg text to log
     */
    function step(msg) {
        toConsole(msg, STEP, STEP_COLOR);
        closeStep();
        currentStepTitle = `${STEP} - ${msg}`;
        isStepClosed = false;
        customCommand = new CustomCommand(currentStepTitle, 'more info', '');
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
     * Adding Environment to allure report
     * @param name name of the env
     * @param value string
     */
    function addEnvironment(name, value) {
        allure_reporter_1.default.addEnvironment(name, value);
    }
    Reporter.addEnvironment = addEnvironment;
    /**
     * Adding issue name
     * @param value name of the feature
     */
    function addTestId(value) {
        allure_reporter_1.default.addTestId(value);
    }
    Reporter.addTestId = addTestId;
    /**
     * Adding description name
     * @param description of the test
     * @param descriptionType type (String, optional) – description type, text by default. Values ['text', 'html','markdown']
     */
    function addDescription(description, descriptionType) {
        allure_reporter_1.default.addDescription(description, descriptionType);
    }
    Reporter.addDescription = addDescription;
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
            customCommand = new CustomCommand(`${logType} - ${msg}`, 'more info', prettyMessage(logType, msg));
            sendCustomCommand(customCommand);
        }
    }
    /**
     * Adding custom command to allure reporter
     * @param command command to add
     * @param stepStatus status of steps
     */
    function sendCustomCommand(command, stepStatus) {
        let status = 'passed';
        if (stepStatus !== undefined) {
            status = stepStatus;
        }
        const stepContent = {
            content: command.body,
            name: command.bodyLabel,
        };
        allure_reporter_1.default.addStep(command.title, stepContent, status);
    }
})(Reporter = exports.Reporter || (exports.Reporter = {}));
/**
 * Message with type stamp, log type and test name
 * @param logLevel message level info/error/warning/debug
 * @param msg text to log
 */
function prettyMessage(logLevel, msg) {
    const dateString = getDate();
    return `${dateString} ${currentTestName} ${logLevel} ${msg}`;
}
/**
 * Date for log message
 */
function getDate() {
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
function toConsole(msg, level, color) {
    if (printToConsole) {
        const messageToLog = prettyMessage(level, msg);
        console.log(color(messageToLog));
    }
}
