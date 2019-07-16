"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adm_zip_1 = __importDefault(require("adm-zip"));
const os_1 = require("os");
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const __1 = require("..");
const MouseButton_1 = require("../enums/MouseButton");
const SelectorType_1 = require("../enums/SelectorType");
const Reporter_1 = require("./Reporter");
const DEFAULT_TIME_OUT = process.env.DEFAULT_TIME_OUT === undefined ? 60000 : Number(process.env.DEFAULT_TIME_OUT);
/**
 * BrowserUtils wraps wdio browser functionality for cleaner test
 */
var BrowserUtils;
(function (BrowserUtils) {
    /**
     * Inject a snippet of JavaScript into the page
     * for execution in the context of the currently selected frame
     * @param script - js script to execute
     */
    function executeScript(script) {
        Reporter_1.Reporter.debug(`Executing script: '${script}'`);
        tryBlock(() => browser.execute(script), `Failed to execute script: ${script}`);
    }
    BrowserUtils.executeScript = executeScript;
    /**
     *  This Method will scroll to element into view
     * @param selector - element locator
     */
    function scrollIntoView(selector) {
        Reporter_1.Reporter.debug(`Scroll to: '${selector}'`);
        tryBlock(() => {
            const scrollToJS = `document.evaluate("${selector}", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.scrollIntoView()`;
            executeScript(scrollToJS);
        }, `Failed to scroll to element: [${selector}]`);
    }
    BrowserUtils.scrollIntoView = scrollIntoView;
    /**
     * Get system data tests executed on
     * Usefully to add in Reporter before each test
     */
    function getSystemData() {
        return String(browser.execute(() => navigator.appVersion));
    }
    BrowserUtils.getSystemData = getSystemData;
    /**
     * Add a value to an element located by selector
     * @param selector element selector
     * @param  value value to add
     */
    function addValue(selector, value) {
        Reporter_1.Reporter.debug(`Add value: '${value}' to '${selector}'`);
        isDisplayed(selector);
        tryBlock(() => $(selector).addValue(value), `Failed to add value: '${value}' to '${selector}'`);
    }
    BrowserUtils.addValue = addValue;
    /**
     * Set a value to an element located by selector
     * @param selector element selector
     * @param value - value to add
     */
    function setValue(selector, value) {
        Reporter_1.Reporter.debug(`Set element '${selector} with value: '${value}'`);
        isDisplayed(selector);
        tryBlock(() => $(selector).setValue(value), `Failed to set value: '${value}' to '${selector}'`);
    }
    BrowserUtils.setValue = setValue;
    /**
     * Set value of hidden element
     * For example: For file uploads, set 'input' element (that can be not visible) with 'filePath' value
     * @param selector elements selector
     * @param value text value to set or numeric value
     */
    function setHiddenElementValue(selector, value) {
        Reporter_1.Reporter.debug(`Set hidden element '${selector} with value: '${value}'`);
        isExist(selector);
        tryBlock(() => $(selector).setValue(value), `Failed to set value: '${value}' to '${selector}'`);
    }
    BrowserUtils.setHiddenElementValue = setHiddenElementValue;
    /**
     * Click an element located by selector
     *
     * Validate element is visible before clicking on it
     * @param selector element selector
     */
    function click(selector) {
        Reporter_1.Reporter.debug(`Click an element '${selector}'`);
        waitForEnabled(selector);
        tryBlock(() => $(selector).click(), `Failed to click on '${selector}'`);
    }
    BrowserUtils.click = click;
    /**
     * Double click an element located by selector
     *
     * Validate element is visible before clicking on it
     * @param selector element selector
     */
    function doubleClick(selector) {
        Reporter_1.Reporter.debug(`Double click an element '${selector}'`);
        waitForEnabled(selector);
        const targetElement = `var targetElement = document.evaluate("${selector}", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;`;
        const clickEvent = " var clickEvent  = document.createEvent ('MouseEvents');";
        const clickEventInit = "clickEvent.initEvent ('dblclick', true, true);";
        const dispatchEvent = 'targetElement.dispatchEvent (clickEvent);';
        const script = `${targetElement}${clickEvent}${clickEventInit}${dispatchEvent}`;
        tryBlock(() => browser.execute(script), `Failed to double click on '${selector}'`);
    }
    BrowserUtils.doubleClick = doubleClick;
    /**
     * Navigate to given url with validation
     * to insure the navigation actually happened
     * @param url url for navigation
     */
    function navigateToUrl(url) {
        Reporter_1.Reporter.debug(`Navigate to '${url}'`);
        tryBlock(() => browser.url(url), `Failed to navigate to '${url}'`);
        expectCurrentUrl(url);
    }
    BrowserUtils.navigateToUrl = navigateToUrl;
    /**
     * Refresh browser's page
     */
    function refreshBrowser() {
        Reporter_1.Reporter.debug('Refresh browser page');
        tryBlock(() => browser.refresh(), 'Failed to refresh the page');
    }
    BrowserUtils.refreshBrowser = refreshBrowser;
    /**
     * Click browser's back button
     */
    function backBrowser() {
        Reporter_1.Reporter.debug('Click browser back button');
        tryBlock(() => browser.back(), 'Failed to click browser back button');
    }
    BrowserUtils.backBrowser = backBrowser;
    /**
     * Wait for url to be equal to given url
     * Mainly useful for navigation validation
     * @param url expected current url
     */
    function expectCurrentUrl(url) {
        const expectedUrl = normalizeUrl(url);
        Reporter_1.Reporter.debug(`Wait for URL to be , '${expectedUrl}'`);
        browser.waitUntil(() => {
            return expectedUrl === normalizeUrl(getUrl());
        }, DEFAULT_TIME_OUT, `Url not as expected '${expectedUrl}'`);
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
            throw new Error(`Illegal URL: '${url}'`);
        }
        return url.replace(/\/+$/, '');
    }
    BrowserUtils.normalizeUrl = normalizeUrl;
    /**
     *  Wait Until - Will Return true in case condition met within the timeout or false if condition isn't met or not met within the timeout
     * @param action - any condition as a function
     * @param timeout - specified time out if undefined Default time out is used
     * @param errMessage - Custom message for time out
     */
    function waitUntil(action, errMessage, timeout = DEFAULT_TIME_OUT
    // tslint:disable-next-line:no-any
    ) {
        Reporter_1.Reporter.debug(`Wait Until '${JSON.stringify(action)}'`);
        // tslint:disable-next-line:no-unnecessary-callback-wrapper
        return browser.waitUntil(() => action(), timeout, errMessage);
    }
    BrowserUtils.waitUntil = waitUntil;
    /**
     * Select a value in element
     * Mostly used for drop down item selection from drop down list
     * @param selector elements selector
     * @param value value to select
     */
    function selectByValue(selector, value) {
        Reporter_1.Reporter.debug(`Select by text '${value}' from '${selector}'`);
        isExist(selector);
        tryBlock(() => $(selector).selectByAttribute('value', value), `Failed to select ${value} from ${selector}`);
    }
    BrowserUtils.selectByValue = selectByValue;
    /**
     * @param selector - element selector
     */
    function isEnabled(selector) {
        Reporter_1.Reporter.debug(`Is element enabled '${selector}'`);
        return $(selector).isEnabled();
    }
    BrowserUtils.isEnabled = isEnabled;
    /**
     *  Wait for element to be enabled
     * @param selector element selector
     */
    function waitForEnabled(selector) {
        Reporter_1.Reporter.debug(`Wait for an element to be enabled '${selector}'`);
        waitForDisplayed(selector);
        tryBlock(() => $(selector).waitForEnabled(DEFAULT_TIME_OUT), `Element not enabled '${selector}'`);
    }
    BrowserUtils.waitForEnabled = waitForEnabled;
    /**
     * Indicate if Element is visible (without wait)
     * @param selector - element selector
     */
    function isDisplayed(selector) {
        Reporter_1.Reporter.debug(`Wait for an element to be visible '${selector}'`);
        return $(selector).isDisplayed();
    }
    BrowserUtils.isDisplayed = isDisplayed;
    /**
     * Wait for an element to be visible by given selector
     * @param selector element selector
     */
    function waitForDisplayed(selector) {
        Reporter_1.Reporter.debug(`Wait for an element to be visible '${selector}'`);
        isExist(selector);
        tryBlock(() => $(selector).waitForDisplayed(DEFAULT_TIME_OUT), `Element not visible '${selector}'`);
    }
    BrowserUtils.waitForDisplayed = waitForDisplayed;
    /**
     * Wait for an element to be exist by given selector
     * @param selector element selector
     */
    function isExist(selector) {
        Reporter_1.Reporter.debug(`Expect an element exist '${selector}'`);
        tryBlock(() => $(selector).waitForExist(DEFAULT_TIME_OUT), `Element not exist '${selector}'`);
    }
    BrowserUtils.isExist = isExist;
    /**
     * Wait for an element to be not visible by given selector
     *
     * @param selector element selector
     */
    function notVisible(selector) {
        Reporter_1.Reporter.debug(`Validating element not visible '${selector}'`);
        tryBlock(() => {
            browser.waitUntil(() => {
                return !$(selector).isDisplayed();
            }, DEFAULT_TIME_OUT);
        }, `Failed to validate element not visible '${selector}'`);
    }
    BrowserUtils.notVisible = notVisible;
    /**
     * Wait until element not exist in dom
     * @param notExistElementSelector element's selector
     */
    function notExist(notExistElementSelector) {
        Reporter_1.Reporter.debug(`Validating element not exist '${notExistElementSelector}'`);
        tryBlock(() => $(notExistElementSelector).waitForExist(DEFAULT_TIME_OUT, true), `Failed to validate element not exist '${notExistElementSelector}'`);
    }
    BrowserUtils.notExist = notExist;
    /**
     * Switch to iframe by iframe selector
     * Elements/widgets ( like dialogs, status bars and more)
     * located inside an iframe has to be switch to it
     *
     * @param selector selector of frame to switch to
     */
    function switchToFrame(selector) {
        Reporter_1.Reporter.debug(`Validate iframe with selector ${selector} exist`);
        isExist(selector);
        Reporter_1.Reporter.debug(`Switching to an Iframe by selector '${selector}'`);
        tryBlock(() => browser.switchToFrame($(selector)), 'Failed to switch frame');
    }
    BrowserUtils.switchToFrame = switchToFrame;
    /**
     * Switch to other tab by id
     * @param tabId tab it to switch
     */
    function switchTab(handle) {
        Reporter_1.Reporter.debug(`Switching tab by id: '${handle}'`);
        tryBlock(() => browser.switchToWindow(handle), `Failed switch to tab by id: '${handle}'`);
    }
    BrowserUtils.switchTab = switchTab;
    /**
     * Over think method name
     * Get ids of open tabs
     */
    function getTabIds() {
        Reporter_1.Reporter.debug('Get all ids of all open tabs');
        return tryBlock(() => browser.getWindowHandles(), 'Failed to get tab ids');
    }
    BrowserUtils.getTabIds = getTabIds;
    /**
     * Switch to parent frame
     * Have to call it after switching to some iframe
     * so the focus will be back on main page
     */
    function switchToParentFrame() {
        Reporter_1.Reporter.debug(`Switching to parent frame (${browser.capabilities.browserName})`);
        switch (browser.capabilities.browserName) {
            case 'chrome': {
                Reporter_1.Reporter.debug('Case chrome');
                tryBlock(() => browser.switchToParentFrame(), 'Chrome: Failed to switch to parent frame');
                break;
            }
            case 'firefox': {
                Reporter_1.Reporter.debug('Case firefox');
                tryBlock(
                // tslint:disable-next-line:no-null-keyword
                () => browser.switchToFrame(null), 'FireFox: Failed to switch to parent frame');
                break;
            }
            default: {
                throw new TypeError('Unable to execute due to unsupported Browser');
            }
        }
    }
    BrowserUtils.switchToParentFrame = switchToParentFrame;
    /**
     * Search for an element on the page, starting from the document root
     * @param selectorType - enum type of selector (XPATH, ID, etc')
     * @param selector - element locator
     */
    function findElement(selectorType, selector) {
        Reporter_1.Reporter.debug(`Find element '${selector}' of type '${selectorType}'`);
        return tryBlock(() => browser.findElement(selectorType, selector), 'Failed to find element');
    }
    BrowserUtils.findElement = findElement;
    /**
     * Search for multiple elements on the page, starting from the document root. The located elements will be returned as a WebElement JSON objects
     * @param selectorType - enum type of selector (XPATH, ID, etc')
     * @param selector - element locator
     */
    function findElements(selectorType, selector) {
        return tryBlock(() => browser.findElements(selectorType, selector), 'Failed to find elements');
    }
    BrowserUtils.findElements = findElements;
    /**
     * Hover over an element by given selector
     *
     * Note: Uses moveToObject method that is currently deprecated
     * @param selector selector of an element to hover
     */
    function hover(selector) {
        Reporter_1.Reporter.debug(`Move to an element '${selector}'`);
        waitForDisplayed(selector);
        tryBlock(() => $(selector).moveTo(), `Failed to hover over '${selector}')`);
    }
    BrowserUtils.hover = hover;
    /**
     * Validate element text as expected
     * Actual texts EOL replaced with spaces, for better test readability, so you need to path one line string
     * Note: element should be visible, otherwise will return empty string(selenium requirement)
     * @param selector element selector with text
     * @param expectedText expected text
     */
    function expectText(selector, expectedText) {
        Reporter_1.Reporter.debug(`Validate element text is '${expectedText}' by selector '${selector}'`);
        waitForDisplayed(selector);
        const elementWithText = $(selector);
        tryBlock(() => browser.waitUntil(() => {
            return elementWithText.getText() === expectedText;
        }), `Expected text in element by selector '${selector}' not found.`);
    }
    BrowserUtils.expectText = expectText;
    /**
     * Get text of an element by selector
     * @param selector element's selector
     */
    function getText(selector) {
        Reporter_1.Reporter.debug(`Get element's text by selector '${selector}'`);
        waitForDisplayed(selector);
        return tryBlock(() => $(selector).getText(), `Failed to get text from element '${selector}'`);
    }
    BrowserUtils.getText = getText;
    /**
     * Validate number of items found by selector as expected
     *
     * @param selector selector of items to count
     * @param expectedValue expected number of items
     * @param selector - element locator
     */
    function expectNumberOfElements(selector, expectedValue) {
        Reporter_1.Reporter.debug(`Expect Number Of Elements, '${expectedValue}' in '${selector}'`);
        if (expectedValue === 0) {
            notVisible(selector);
        }
        tryBlock(() => browser.waitUntil(() => {
            return $$(selector).length === expectedValue;
        }), `Found number of elements by '${selector}' not equal '${expectedValue}'`);
    }
    BrowserUtils.expectNumberOfElements = expectNumberOfElements;
    /**
     * Scroll to an element in list
     *
     * Scroll in loop until the element is visible or fail on time out
     * Checks for size of list every iteration in case list is lazy loaded
     * @param selector selector of an element to scroll to
     * @param listSelector selector of list to scroll
     */
    function scrollToElement(selector, listSelector) {
        Reporter_1.Reporter.debug(`Scroll in list '${listSelector}' until element '${selector}' is visible.`);
        isExist(listSelector); // need to verify list is loaded
        let last = $$(listSelector).length;
        Reporter_1.Reporter.debug(`Last element index: [${last}].`);
        tryBlock(() => browser.waitUntil(() => {
            /**
             * Since FireFox does not support moveToObject
             * we use JS instead of browser.moveToObject(`(${listSelector})[${last}]`);
             */
            const xpath = `(${listSelector})[${last}]`;
            const scrollToJS = `document.evaluate("${xpath}", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.scrollIntoView()`;
            executeScript(scrollToJS);
            last = findElements(SelectorType_1.SelectorType.XPATH, listSelector).length;
            return $(selector).isDisplayed();
        }), `Failed to scroll to ${selector} in ${listSelector}`);
    }
    BrowserUtils.scrollToElement = scrollToElement;
    /**
     *
     * @param iframeSelector iFrame selector
     * @param expectedVisibility expected visibility status
     */
    function isIframeVisible(iframeSelector, expectedVisibility) {
        Reporter_1.Reporter.debug(`Check iframe visibility is '${expectedVisibility}'`);
        switchToParentFrame(); //if iframe already focused, isExist will fail
        isExist(iframeSelector);
        const cssDisplayProperty = 'display';
        const iframeDisplayProperty = tryBlock(() => $(iframeSelector).getCSSProperty(cssDisplayProperty), //iframe css
        `Failed to get '${cssDisplayProperty}' css property from '${iframeSelector}'`);
        const iframeVisibility = iframeDisplayProperty.value === 'block'; //css display value. block == visible, none == not visible
        if (iframeVisibility !== expectedVisibility) {
            throw new Error(`Failed on iframe '${iframeSelector}' visibility validation. ${os_1.EOL} Expected: '${expectedVisibility}' ${os_1.EOL} Actual: '${iframeVisibility}'`);
        }
    }
    BrowserUtils.isIframeVisible = isIframeVisible;
    /**
     * Get element's attribute value
     * @param selector element's selector to search for attribute
     * @param attributeName attribute name to search for
     */
    function getAttribute(selector, attributeName) {
        return tryBlock(() => getAttributeAndVerify(selector, attributeName), `Failed to get '${attributeName}' attribute from '${selector}'`);
    }
    BrowserUtils.getAttribute = getAttribute;
    /**
     *
     * @param selector element's selector to search for attribute
     * @param attributeName attribute name to search for
     */
    function getAttributeAndVerify(selector, attributeName) {
        Reporter_1.Reporter.debug(`Get Attribute '${attributeName}' in element '${selector}' And Verify not null.`);
        isExist(selector);
        // @ts-ignore
        const stringResults = $$(selector).length === 1 ? $(selector).getAttribute(attributeName) : undefined;
        //Check for multiple results or no element found
        if (stringResults === null || stringResults === undefined) {
            throw new Error(`Found multiple results matching requested attribute '${attributeName}' or no results for element: '${selector}'`);
        }
        return stringResults;
    }
    /**
     * Check if attribute with given selector contain expected value
     * @param selector element's selector to search for attribute
     * @param attributeName attribute name to search for
     * @param value value in attribute
     */
    function expectAttributeValue(selector, attributeName, value) {
        Reporter_1.Reporter.debug(`Validate element '${selector}' has attribute '${attributeName}' which contains '${value}'`);
        let attributeValue;
        tryBlock(() => browser.waitUntil(() => {
            attributeValue = getAttribute(selector, attributeName);
            return isContainWord(attributeValue, value);
        }), `Incorrect attribute '${attributeName}' value from '${selector}' ${os_1.EOL}Expected: word '${value}' to be part of '${attributeValue}'`);
    }
    BrowserUtils.expectAttributeValue = expectAttributeValue;
    /**
     * Check if attribute with given selector NOT contain expected word
     * @param selector element's selector to search for attribute
     * @param attributeName attribute name to search for
     * @param value value NOT in attribute
     */
    function expectNoAttributeValue(selector, attributeName, value) {
        let attributeValue;
        Reporter_1.Reporter.debug(`Validate element '${selector}' doesn't have attribute '${attributeName}' which contains '${value}'`);
        tryBlock(() => browser.waitUntil(() => {
            attributeValue = getAttribute(selector, attributeName);
            return !isContainWord(attributeValue, value);
        }), `Incorrect attribute '${attributeName}' value from ${selector} ${os_1.EOL}Expected: word '${value}' NOT to be part of '${attributeValue}'`);
    }
    BrowserUtils.expectNoAttributeValue = expectNoAttributeValue;
    /**
     * Check if word is a substring of given text
     * @param fullText string to search in
     * @param word word to search
     */
    function isContainWord(fullText, word) {
        if (fullText === null || word === null) {
            throw new Error(`Some of the strings or all are null. fullText: '${fullText}', word: '${word}`);
        }
        // escape special characters from user input
        const wordEscapedChars = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regexStr = `(^|\\s)${wordEscapedChars}(?=\\s|$)`;
        return new RegExp(regexStr).test(fullText);
    }
    /**
     * Get cssProperty value by it's name and element selector
     * @param selector element selector
     * @param cssPropertyName  css property name
     */
    function getCssProperty(selector, cssPropertyName) {
        Reporter_1.Reporter.debug(`Get css property '${cssPropertyName}' from element by '${selector}'`);
        return tryBlock(() => $(selector).getCSSProperty(cssPropertyName), `Failed to get css Property '${cssPropertyName}' from '${selector}'`);
    }
    BrowserUtils.getCssProperty = getCssProperty;
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
    function setCookie(cookie, domain) {
        if (domain !== null && domain !== undefined) {
            cookie.domain = domain;
        }
        Reporter_1.Reporter.debug(`Setting cookie: '${JSON.stringify(cookie)}'`);
        browser.setCookies(cookie);
    }
    BrowserUtils.setCookie = setCookie;
    /**
     * Get current Url
     */
    function getUrl() {
        const currentUrl = tryBlock(() => browser.getUrl(), 'Failed to get current url');
        Reporter_1.Reporter.debug(`Get current URL: '${currentUrl}'`);
        return currentUrl;
    }
    BrowserUtils.getUrl = getUrl;
    /**
     * Accept Alert popup
     */
    function acceptAlert() {
        Reporter_1.Reporter.debug('Accept alert');
        tryBlock(() => browser.acceptAlert(), 'Failed to accept alert');
    }
    BrowserUtils.acceptAlert = acceptAlert;
    /**
     * Dismiss Alert popup
     */
    function dismissAlert() {
        Reporter_1.Reporter.debug('Dismiss alert');
        tryBlock(() => browser.dismissAlert(), 'Failed to dismiss alert');
    }
    BrowserUtils.dismissAlert = dismissAlert;
    /**
     * Validate alert's text as expected
     * @param expectedText expected alert's text
     */
    function expectAlertText(expectedText) {
        Reporter_1.Reporter.debug(`Validate alert's text is '${expectedText}'`);
        tryBlock(() => browser.waitUntil(() => {
            try {
                return expectedText === browser.getAlertText();
            }
            catch (e) {
                return false;
            }
        }), "Incorrect alert's text or alert not found.");
    }
    BrowserUtils.expectAlertText = expectAlertText;
    /**
     *
     * @param selector - element for get size
     */
    function getElementSize(selector) {
        Reporter_1.Reporter.debug(`Get Element: '${selector}' size`);
        waitForDisplayed(selector);
        return $(selector).getSize();
    }
    BrowserUtils.getElementSize = getElementSize;
    /**
     * Change size of browser window
     * @param width - Width (px)
     * @param height - Height (px)
     */
    function setWindowSize(width, height) {
        Reporter_1.Reporter.debug(`Set window size to '${width}X${height}'`);
        switch (browser.capabilities.browserName) {
            case 'chrome': {
                tryBlock(() => browser.setWindowSize(width, height), 'Chrome: Failed to resize window');
                break;
            }
            case 'firefox': {
                tryBlock(() => browser.setWindowRect(0, 0, width, height), 'FireFox: Failed to resize window');
                break;
            }
            default: {
                throw new TypeError('Unable to execute due to unsupported Browser');
            }
        }
    }
    BrowserUtils.setWindowSize = setWindowSize;
    function getWindowSize() {
        Reporter_1.Reporter.debug('Get window size');
        if (browser.capabilities.browserName === 'chrome') {
            return tryBlock(() => browser.getWindowSize(), 'Chrome: Failed to get window size');
        }
        if (browser.capabilities.browserName === 'firefox') {
            return tryBlock(() => browser.getWindowRect(), 'FireFox: Failed to get window size');
        }
        throw new TypeError('Unable to execute due to unsupported Browser');
    }
    BrowserUtils.getWindowSize = getWindowSize;
    /**
     *
     * @param mouseButton -  {LEFT = 0, MIDDLE = 1 , RIGHT = 2}
     */
    function pressMouseButton(mouseButton) {
        //Defaults to the left mouse button if not specified.
        const selectedMouseButton = mouseButton === undefined ? MouseButton_1.MouseButton.LEFT : mouseButton;
        Reporter_1.Reporter.step(`Click mouse button '${selectedMouseButton}'`);
        browser.buttonDown(selectedMouseButton);
    }
    BrowserUtils.pressMouseButton = pressMouseButton;
    /**
     * @param selector - element to move to, If not specified or is null, the offset is relative to current position of the mouse.
     * @param xOffset - X (Pixels) offset to move to, relative to the top-left corner of the element If not specified, the mouse will move to the middle of the element.
     * @param yOffset - Y (Pixels) offset to move to, relative to the top-left corner of the element. If not specified, the mouse will move to the middle of the element.
     */
    function moveMouseCursorTo(selector, xOffset, yOffset) {
        Reporter_1.Reporter.debug(`Move mouse cursor to element: '${selector}' with offset '${xOffset},${yOffset}'`);
        isExist(selector);
        $(selector).moveTo(xOffset, yOffset);
    }
    BrowserUtils.moveMouseCursorTo = moveMouseCursorTo;
    /**
     * @param mouseButton -  {LEFT = 0, MIDDLE = 1 , RIGHT = 2}
     */
    function releaseMouseButton(mouseButton) {
        //Defaults to the left mouse button if not specified.
        const selectedMouseButton = mouseButton === undefined ? MouseButton_1.MouseButton.LEFT : mouseButton;
        Reporter_1.Reporter.step(`Release mouse button '${selectedMouseButton}'`);
        browser.buttonUp(selectedMouseButton);
    }
    BrowserUtils.releaseMouseButton = releaseMouseButton;
    /**
     * Determine an element’s location on the page. The point (0pix, 0pix) refers to the upper-left corner of the page.
     * @param selector  - element with requested position offset
     */
    function getElementLocation(selector) {
        Reporter_1.Reporter.debug(`Get Element location '${selector}'`);
        return $(selector).getLocation();
    }
    BrowserUtils.getElementLocation = getElementLocation;
    /**
     * Send a sequence of key strokes to the active element
     * it can be single key or an array of keys
     * @param keysToSend key, array of keys or string array (chars) to send
     */
    function sendKeys(keysToSend) {
        if (typeof keysToSend !== 'string') {
            Reporter_1.Reporter.debug(`Sending Keys ${getKeyNames(keysToSend)}`);
        }
        else {
            const charsToSend = keysToSend.split('');
            Reporter_1.Reporter.debug(`Sending Keys ${charsToSend}`);
        }
        browser.keys(keysToSend);
    }
    BrowserUtils.sendKeys = sendKeys;
    /**
     * Verify zip content, by inspecting the file names in zip
     * Sends GET request using provided url, and parse the result as zip file
     * if expectedNumbOfFiles not provided, will only verify that expected file names are in zip
     * Otherwise will also validate the size is fit
     * @param linkToZipFile link to zip file
     * @param listOfFileNames list of files names expected in zip
     * @param expectedNumOfFiles (optional) expected number of files in zip
     */
    function verifyFilesInZip(linkToZipFile, listOfFileNames, expectedNumOfFiles) {
        Reporter_1.Reporter.debug('===Verify zip content===');
        const zipFileNames = zipToFileNames(linkToZipFile);
        if (expectedNumOfFiles !== undefined && expectedNumOfFiles !== zipFileNames.length) {
            const incorrectLengthErrorMessage = `Incorrect number of files. Expected '${expectedNumOfFiles}', actual '${zipFileNames.length}'`;
            Reporter_1.Reporter.error(incorrectLengthErrorMessage);
            throw new Error(incorrectLengthErrorMessage);
        }
        if (!listOfFileNames.every((fileName) => zipFileNames.includes(fileName))) {
            const incorrectListErrorMessage = `Zip content not as expected. Expected [${listOfFileNames.toString()}], actual [${zipFileNames.toString()}]`;
            Reporter_1.Reporter.error(incorrectListErrorMessage);
            throw new Error(incorrectListErrorMessage);
        }
    }
    BrowserUtils.verifyFilesInZip = verifyFilesInZip;
    /**
     * Send get request to the provided link
     * Parse the response body with zip
     * and return an array with file names from the zip file
     */
    function zipToFileNames(linkToZipFile) {
        // tslint:disable-next-line: promise-function-async
        const zipBuffer = browser.call(() => {
            return request_promise_native_1.default({
                method: 'GET',
                // tslint:disable-next-line: no-null-keyword
                encoding: null,
                uri: linkToZipFile,
            })
                .then((responseValue) => responseValue)
                .catch(() => {
                const errorMessage = `Failed to get zip file from '${linkToZipFile}'`;
                Reporter_1.Reporter.error(errorMessage);
                throw new Error(errorMessage);
            });
        });
        const zip = new adm_zip_1.default(zipBuffer);
        const zipEntries = zip.getEntries();
        return zipEntries
            .filter((entry) => entry.entryName.charAt(entry.entryName.length - 1) !== '/')
            .map((entry) => entry.entryName);
    }
    /**
     * Get name of the enum keys
     * For reporter log propose in order to log what keys were send
     * @param keysToSend key/keys of SpecialKeys type
     */
    function getKeyNames(keysToSend) {
        let retVal = '';
        for (const currKey of keysToSend) {
            const curr = Object.keys(__1.SpecialKeys).find((key) => __1.SpecialKeys[key] === currKey);
            retVal = retVal.concat(`${curr}+`);
        }
        return retVal.substring(0, retVal.length - 1);
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
