"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const Reporter_1 = require("./Reporter");
const DEFAULT_TIME_OUT = process.env.DEFAULT_TIME_OUT === undefined
    ? 60000
    : Number(process.env.DEFAULT_TIME_OUT);
const CHILL_OUT_TIME = process.env.CHILL_OUT_TIME === undefined
    ? 3000
    : Number(process.env.CHILL_OUT_TIME);
/**
 * BrowserUtils wraps wdio browser functionality for cleaner test
 */
var BrowserUtils;
(function (BrowserUtils) {
    /**
     * Inject a snippet of JavaScript into the page
     * for execution in the context of the currently selected frame
     *
     * @param script script to execute
     */
    function executeScript(script) {
        Reporter_1.Reporter.debug(`Executing script: ${script}`);
        tryBlock(() => browser.execute(script), `Failed to execute script: ${script}`);
    }
    BrowserUtils.executeScript = executeScript;
    /**
     * Upload local file
     * Send full path of the file to input element
     * Element of type input expected to be exist(not necessary visible) on execution
     *
     * @param selector selector of input element that gets the file
     * @param fileFullPath full path of a file to upload
     */
    function uploadFile(selector, fileFullPath) {
        Reporter_1.Reporter.debug(`Uploading file. Sending file: ${fileFullPath} to ${selector}`);
        isExist(selector); // validate element that receives the file exist
        tryBlock(() => browser.chooseFile(selector, fileFullPath), //wdio upload file api
        `File with path ${fileFullPath} could not be uploaded to ${selector}`);
    }
    BrowserUtils.uploadFile = uploadFile;
    /**
     * Scroll to lowest point of the current page
     */
    function scrollToBottom() {
        const bottom = getLowestPagePoint();
        Reporter_1.Reporter.debug("Scroll to the bottom of the page");
        scrollToPoint(0, bottom);
    }
    BrowserUtils.scrollToBottom = scrollToBottom;
    /**
     * Scroll to top of the current page
     */
    function scrollToTop() {
        Reporter_1.Reporter.debug("Scroll to the top of the page");
        scrollToPoint(0, 0);
    }
    BrowserUtils.scrollToTop = scrollToTop;
    /**
     * Scroll to point by x,y coordinates
     * @param x x value
     * @param y y value
     */
    function scrollToPoint(x, y) {
        Reporter_1.Reporter.debug(`Scrolling to point: (${x},${y})`);
        tryBlock(() => browser.scroll(x, y), `Failed scroll to point (${x},${y})`);
    }
    /**
     * Get lowers point of the current page
     */
    function getLowestPagePoint() {
        return Number(browser.execute(() => Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, document.documentElement.clientHeight), 1).value);
    }
    BrowserUtils.getLowestPagePoint = getLowestPagePoint;
    /**
     * Get system data tests executed on
     * Usefully to add in Reporter before each test
     */
    function getSystemData() {
        return String(browser.execute(() => navigator.appVersion).value);
    }
    BrowserUtils.getSystemData = getSystemData;
    /**
     * Add a text to an element located by selector
     * Note: It does not remove already existing text
     * @param selector element selector
     * @param  text text to send
     */
    function sendText(selector, text) {
        Reporter_1.Reporter.debug(`Sending text: '${text}' to '${selector}'`);
        isVisible(selector);
        tryBlock(() => browser.addValue(selector, text), `Failed to add text:${text} to ${selector}`);
    }
    BrowserUtils.sendText = sendText;
    /**
     * Click an element located by selector
     *
     * Validate element is visible before clicking on it
     * @param selector element selector
     */
    function click(selector) {
        isVisible(selector);
        Reporter_1.Reporter.debug(`Click an element ${selector}`);
        tryBlock(() => browser.click(selector), `Failed to click on ${selector}`);
    }
    BrowserUtils.click = click;
    /**
     * Double click an element located by selector
     *
     * Validate element is visible before clicking on it
     * @param selector element selector
     */
    function doubleClick(selector) {
        Reporter_1.Reporter.debug(`Double click an element ${selector}`);
        isVisible(selector);
        tryBlock(() => browser.doubleClick(selector), `Failed to double click on ${selector}`);
    }
    BrowserUtils.doubleClick = doubleClick;
    /**
     * Navigate to given url with validation
     * to insure the navigation actually happened
     * @param url url for navigation
     */
    function navigateToUrl(url) {
        Reporter_1.Reporter.debug(`Navigate to ${url}`);
        tryBlock(() => browser.url(url), `Failed to navigate to ${url}`);
        expectCurrentUrl(url);
    }
    BrowserUtils.navigateToUrl = navigateToUrl;
    /**
     * Refresh browser's page
     */
    function refreshBrowser() {
        Reporter_1.Reporter.debug("Refresh browser page");
        tryBlock(() => browser.refresh(), "Failed to refresh the page");
    }
    BrowserUtils.refreshBrowser = refreshBrowser;
    /**
     * Wait for url to be equal to given url
     * Mainly useful for navigation validation
     * @param url expected current url
     */
    function expectCurrentUrl(url) {
        const expectedUrl = normalizeUrl(url);
        Reporter_1.Reporter.debug(`Wait for URL to be , ${expectedUrl}`);
        let currentUrl;
        browser.waitUntil(() => {
            currentUrl = normalizeUrl(getUrl());
            return currentUrl === expectedUrl;
        }, 30000, `Url not as expected.${os_1.EOL} Expected: '${expectedUrl}' ${os_1.EOL} Actual: '${browser.getUrl()}'`);
    }
    BrowserUtils.expectCurrentUrl = expectCurrentUrl;
    /**
     * Remove backslash from the end of the given url
     *
     * WDIO return url with backslash at the end of url,
     * while user mainly passes without the backslash
     * Removing the last backslash will solve error on url comparison
     * @param url url to remove backslash from
     */
    function normalizeUrl(url) {
        if (url === null) {
            throw new Error(`Illegal URL: ${url}`);
        }
        return url.replace(/\/+$/, "");
    }
    BrowserUtils.normalizeUrl = normalizeUrl;
    /**
     * Select a value in element
     * Mostly used for drop down item selection from drop down list
     * @param selector elements selector
     * @param value value to select
     */
    function selectByValue(selector, value) {
        Reporter_1.Reporter.debug(`Select by text '${value}' from ${selector}`);
        isExist(selector);
        tryBlock(() => browser.selectByValue(selector, value), `Failed to select ${value} from ${selector}`);
    }
    BrowserUtils.selectByValue = selectByValue;
    /**
     * Wait for an element to be visible by given selector
     * @param selector element selector
     */
    function isVisible(selector) {
        Reporter_1.Reporter.debug(`Wait for an element to be visible ${selector}`);
        tryBlock(() => browser.waitForVisible(selector, DEFAULT_TIME_OUT), `Element not visible ${selector}`);
    }
    BrowserUtils.isVisible = isVisible;
    /**
     * Wait for an element to be exist by given selector
     * @param selector element selector
     */
    function isExist(selector) {
        Reporter_1.Reporter.debug(`Expect an element exist ${selector}`);
        tryBlock(() => browser.waitForExist(selector, DEFAULT_TIME_OUT), `Element not exist ${selector}`);
    }
    BrowserUtils.isExist = isExist;
    /**
     * Wait for an element to be not visible by given selector
     *
     * @param selector element selector
     */
    function notVisible(notVisibleElementSelector) {
        Reporter_1.Reporter.debug(`Validating element not visible ${notVisibleElementSelector}`);
        tryBlock(() => browser.waitForVisible(notVisibleElementSelector, DEFAULT_TIME_OUT, true), `Failed to validate element not visible ${notVisibleElementSelector}`);
    }
    BrowserUtils.notVisible = notVisible;
    /**
     * Wait until element not exist in dom
     * @param notExistElementSelector element's selector
     */
    function notExist(notExistElementSelector) {
        Reporter_1.Reporter.debug(`Validating element not exist ${notExistElementSelector}`);
        tryBlock(() => browser.waitForExist(notExistElementSelector, DEFAULT_TIME_OUT, false), `Failed to validate element not exist ${notExistElementSelector}`);
    }
    BrowserUtils.notExist = notExist;
    /**
     * Switch to iframe by iframe selector
     * Elements/widgets ( like dialogs, status bars and more)
     * located inside an iframe has to be switch to it
     * @param iframeSelector selector of frame to switch to
     */
    function switchToFrame(iframeSelector) {
        chillOut();
        Reporter_1.Reporter.debug("Switching to an Iframe");
        isExist(iframeSelector);
        Reporter_1.Reporter.debug(`Get iframe element ${iframeSelector}`);
        const frameId = tryBlock(() => browser.element(iframeSelector).value, `Failed to get iframeId by ${iframeSelector}`);
        Reporter_1.Reporter.debug(`Switching to Iframe ${iframeSelector}'`);
        tryBlock(() => browser.frame(frameId), "Failed to switch frame");
        chillOut();
    }
    BrowserUtils.switchToFrame = switchToFrame;
    /**
     * Switch to parent frame
     * Have to call it after switching to some iframe
     * so the focus will be back on main page
     */
    function switchToParentFrame() {
        Reporter_1.Reporter.debug("Switching to parent frame");
        tryBlock(() => browser.frameParent(), "Failed to switch to parent frame");
    }
    BrowserUtils.switchToParentFrame = switchToParentFrame;
    /**
     * Hover over an element by given selector
     *
     * Note: Uses moveToObject method that is currently deprecated
     * @param selector selector of an element to hover
     */
    function hover(selector) {
        Reporter_1.Reporter.debug(`Hover over an element ${selector}`);
        isVisible(selector);
        tryBlock(() => browser.moveToObject(selector), `Failed to hover over ${selector}`);
    }
    BrowserUtils.hover = hover;
    /**
     * Validate element text as expected
     * Actual texts EOL replaced with spaces, for better test readability, so you need to path one line string
     * Note: element should be visible, otherwise will return empty string(selenium requirement)
     * @param selector element selector with text
     * @param text expected text
     */
    function expectText(selector, text) {
        Reporter_1.Reporter.debug(`Validate element text is '${text}' by selector '${selector}'`);
        isVisible(selector);
        const foundText = getText(selector);
        //Validate text was found
        if (foundText === undefined) {
            throw new Error(`Could not find text in element by selector: '${selector}'`);
        }
        const currText = foundText.replace(/(\n)/gm, " "); // replace EOL with space, for more readable tests strings;
        if (currText !== text) {
            throw new Error(`Incorrect text in element by selector '${selector}'. ${os_1.EOL} Expected: '${text}' ${os_1.EOL} Actual: '${currText}'`);
        }
    }
    BrowserUtils.expectText = expectText;
    /**
     * Get text of an element by selector
     * @param selector element's selector
     */
    function getText(selector) {
        Reporter_1.Reporter.debug(`Get element's text by selector ${selector}`);
        return tryBlock(() => browser.getText(selector), `Failed to get text from element '${selector}'`);
    }
    BrowserUtils.getText = getText;
    /**
     * Validate number of items found by selector as expected
     *
     * @param selector selector of items to count
     * @param expectedValue expected number of items
     */
    function expectNumberOfElements(selector, expectedValue) {
        if (expectedValue === 0) {
            notVisible(selector);
        }
        tryBlock(() => browser.waitUntil(() => {
            return browser.elements(selector).value.length === expectedValue;
        }), `Found number of elements by ${selector} not equal ${expectedValue}`);
    }
    BrowserUtils.expectNumberOfElements = expectNumberOfElements;
    /**
     * Scroll to an element in list
     *
     * Scroll in loop until the element is visible or fail on time out
     * Checks for size of list every iteration in case list is lazy loaded
     * @param elementSelector selector of an element to scroll to
     * @param listSelector selector of list to scroll
     */
    function scrollToElement(elementSelector, listSelector) {
        Reporter_1.Reporter.debug(`Scroll list ${listSelector} until element is visible ${elementSelector}`);
        isExist(listSelector); // need to verify list is loaded
        let last = browser.elements(listSelector).value.length;
        tryBlock(() => browser.waitUntil(() => {
            browser.moveToObject(`(${listSelector})[${last}]`);
            last = browser.elements(listSelector).value.length;
            return browser.isVisible(elementSelector);
        }), `Failed to scroll to ${elementSelector} in ${listSelector}`);
    }
    BrowserUtils.scrollToElement = scrollToElement;
    /**
     * Validate iframe is visible
     * @param iframeSelector iframe selector
     * @param isVisible expected visibility status
     */
    function isIframeVisible(iframeSelector, expectedVisibility) {
        Reporter_1.Reporter.debug(`Check iframe visibility is ${isVisible}`);
        switchToParentFrame(); //if iframe already focused, isExist will fail
        isExist(iframeSelector);
        const cssDisplayProperty = "display";
        const iframeDisplayProperty = tryBlock(() => browser.element(iframeSelector).getCssProperty(cssDisplayProperty), //iframe css
        `Failed to get ${cssDisplayProperty} css property from ${iframeSelector}`);
        const iframeVisibility = iframeDisplayProperty.value === "block"; //css display value. block == visible, none == not visible
        if (iframeVisibility !== expectedVisibility) {
            throw new Error(`Failed on iframe ${iframeSelector} visibility validation. ${os_1.EOL} Expected: ${isVisible}, actual: ${iframeVisibility} ${os_1.EOL}`);
        }
    }
    BrowserUtils.isIframeVisible = isIframeVisible;
    /**
     * Get element's attribute value
     * @param selector element's selector to search for attribute
     * @param attributeName attribute name to search for
     */
    function getAttribute(selector, attributeName) {
        return tryBlock(() => browser.getAttribute(selector, attributeName), `Failed to get ${attributeName} attribute from ${selector}`);
    }
    BrowserUtils.getAttribute = getAttribute;
    /**
     * Check if attribute with given selector contain expected value
     * @param selector element's selector to search for attribute
     * @param attributeName attribute name to search for
     * @param value value in attribute
     */
    function expectAttributeValue(selector, attributeName, value) {
        const attributeValue = getAttribute(selector, attributeName);
        if (!isContainWord(attributeValue, value)) {
            throw new Error(`Incorrect attribute '${attributeName}' value from ${selector} ${os_1.EOL}
         Expected: ${os_1.EOL} word '${value}' to be part of ${os_1.EOL}
                 '${attributeValue}'`);
        }
    }
    BrowserUtils.expectAttributeValue = expectAttributeValue;
    /**
     * Check if attribute with given selector NOT contain expected value
     * @param selector element's selector to search for attribute
     * @param attributeName attribute name to search for
     * @param value value NOT in attribute
     */
    function expectNoAttributeValue(selector, attributeName, value) {
        const attributeValue = getAttribute(selector, attributeName);
        if (isContainWord(attributeValue, value)) {
            throw new Error(`Incorrect attribute '${attributeName}' value from ${selector} ${os_1.EOL}
         Expected: ${os_1.EOL} word '${value}' NOT to be part of ${os_1.EOL}
                 '${attributeValue}'`);
        }
    }
    BrowserUtils.expectNoAttributeValue = expectNoAttributeValue;
    /**
     * Check if word is a substring of given text
     * @param fullText string to search in
     * @param word word to search
     */
    function isContainWord(fullText, word) {
        // escape special characters from user input
        const wordEscapedChars = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        const regexStr = `^|\\s${wordEscapedChars}?=\\s|$`;
        return new RegExp(regexStr).test(fullText);
    }
    /**
     * Set cookie
     * Requires navigation to domain before setting cookie
     *
     * If no domain provided, will set cookie for current domain
     * Otherwise will first navigate to required domain(should be valid url),
     *  set the cookie and navigate back to page it started from
     * @param cookie cookie to set
     * @param domain domain to set cookie for
     */
    function setCookie(cookie, domain = null) {
        Reporter_1.Reporter.debug(`Setting cookie: ${JSON.stringify(cookie)}`);
        let currentUrl = null;
        if (domain !== null) {
            currentUrl = getUrl();
            navigateToUrl(domain);
        }
        browser.setCookie(cookie);
        if (domain !== null) {
            navigateToUrl(currentUrl);
        }
    }
    BrowserUtils.setCookie = setCookie;
    /**
     * Get current Url
     */
    function getUrl() {
        const currentUrl = tryBlock(() => browser.getUrl(), "Failed to get current url");
        Reporter_1.Reporter.debug(`Get current URL: ${currentUrl}`);
        return currentUrl;
    }
    BrowserUtils.getUrl = getUrl;
    /**
     * When switching between iframes, without wait it will fail to switch to iframe
     *
     */
    function chillOut() {
        Reporter_1.Reporter.debug(`wait for ${CHILL_OUT_TIME}ms`);
        browser.pause(CHILL_OUT_TIME);
    }
    /**
     * Throw error with custom error message
     * @param customErrorMessage custom error message
     * @param error original error
     */
    function handleError(customErrorMessage, error) {
        throw new Error(`${customErrorMessage} ${os_1.EOL} ${error}`);
    }
    /**
     * Action wrapper
     * Wrap all actions with try catch block
     */
    // tslint:disable-next-line:no-any
    function tryBlock(action, errorMessage) {
        try {
            return action();
        }
        catch (e) {
            handleError(errorMessage, e);
        }
    }
})(BrowserUtils = exports.BrowserUtils || (exports.BrowserUtils = {}));
