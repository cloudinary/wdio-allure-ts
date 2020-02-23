/**
 * Log to standard system out and allure report
 *
 * Each 'Step' log accumulate additional logs as attachment
 * until new 'Step' log arrived
 */
export declare namespace Reporter {
    /**
     * Enable network audits for test run.
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
     * In beforeTest hook:
     *      Reporter.enableNetworkAudits()
     * In afterTest hook:
     *      Reporter.addAttachment('Network Logs', { https: networkActivity }, 'application/json');
     *    already integrated in Reporter.closeStep method in case of test failure
     */
    function enableNetworkAudits(): void;
    /**
     * Close step in report
     */
    function closeStep(isFailed?: boolean): void;
    /**
     * Set current executed test name
     * usage example:
     * beforeHook: function(test, context) {
     *    Reporter.setCurrentTestName(`[${test.parent}] [${test.title}]`);
     * },
     */
    function setCurrentTestName(testName: string): void;
    /**
     * Log step message
     * console log with green color text
     * @param msg text to log
     */
    function step(msg: string): void;
    /**
     * Log  debug message
     * console log with grey color text
     * @param msg text to log
     */
    function debug(msg: string): void;
    /**
     * Log warning message
     * console log with yellow color text
     * @param msg text to log
     */
    function warning(msg: string): void;
    /**
     * Log error message
     * console log with red color text
     * @param msg text to log
     */
    function error(msg: string): void;
    /**
     * Adding Environment to allure report
     * @param name name of the env
     * @param value string
     */
    function addEnvironment(name: string, value?: string): void;
    /**
     * Adding issue name
     * @param value name of the feature
     */
    function addTestId(value: string): void;
    /**
     * Adding description name
     * @param description of the test
     * @param descriptionType type (String, optional) – description type, text by default. Values ['text', 'html','markdown']
     */
    function addDescription(description: string, descriptionType?: string): void;
}
