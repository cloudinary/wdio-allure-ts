/**
 * Log to standard system out and allure report
 *
 * Each 'Step' log accumulate additional logs as attachment
 * until new 'Step' log arrived
 */
export declare namespace Reporter {
    /**
     * Close step in report
     */
    function closeStep(): void;
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
}
