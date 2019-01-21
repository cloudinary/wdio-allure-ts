import { Cookie, CssProperty } from 'webdriverio';
import { MouseButton } from '../enums/MouseButton';
/**
 * BrowserUtils wraps wdio browser functionality for cleaner test
 */
export declare namespace BrowserUtils {
    import Size = WebdriverIO.Size;
    /**
     * Inject a snippet of JavaScript into the page
     * for execution in the context of the currently selected frame
     *
     * @param script script to execute
     */
    function executeScript(script: string): void;
    /**
     * Upload local file
     * Send full path of the file to input element
     * Element of type input expected to be exist(not necessary visible) on execution
     *
     * @param selector selector of input element that gets the file
     * @param fileFullPath full path of a file to upload
     */
    function uploadFile(selector: string, fileFullPath: string): void;
    /**
     * Scroll to lowest point of the current page
     */
    function scrollToBottom(): void;
    /**
     * Scroll to top of the current page
     */
    function scrollToTop(): void;
    /**
     * Get lowers point of the current page
     */
    function getLowestPagePoint(): number;
    /**
     * Get system data tests executed on
     * Usefully to add in Reporter before each test
     */
    function getSystemData(): string;
    /**
     * Add a text to an element located by selector
     * Note: It does not remove already existing text
     * @param selector element selector
     * @param  text text to send
     */
    function sendText(selector: string, text: string): void;
    /**
     * Click an element located by selector
     *
     * Validate element is visible before clicking on it
     * @param selector element selector
     */
    function click(selector: string): void;
    /**
     * Double click an element located by selector
     *
     * Validate element is visible before clicking on it
     * @param selector element selector
     */
    function doubleClick(selector: string): void;
    /**
     * Navigate to given url with validation
     * to insure the navigation actually happened
     * @param url url for navigation
     */
    function navigateToUrl(url: string): void;
    /**
     * Refresh browser's page
     */
    function refreshBrowser(): void;
    /**
     * Click browser's back button
     */
    function backBrowser(): void;
    /**
     * Wait for url to be equal to given url
     * Mainly useful for navigation validation
     * @param url expected current url
     */
    function expectCurrentUrl(url: string): void;
    /**
     * Remove backslash from the end of the given url
     *
     * WDIO return url with backslash at the end of url,
     * while user mainly passes without the backslash
     * Removing the last backslash will solve error on url comparison
     * @param url url to remove backslash from
     */
    function normalizeUrl(url: string): string;
    /**
     *  Wait Until - Will Return true in case condition met within the timeout or false if condition isn't met or not met within the timeout
     * @param action - any condition as a function
     * @param timeout - specified time out if undefined Default time out is used
     * @param errMessage - Custom message for time out
     */
    function waitUntil(action: Function, errMessage?: string, timeout?: number): any;
    /**
     * Select a value in element
     * Mostly used for drop down item selection from drop down list
     * @param selector elements selector
     * @param value value to select
     */
    function selectByValue(selector: string, value: string): void;
    /**
     * Wait for an element to be visible by given selector
     * @param selector element selector
     */
    function isVisible(selector: string): void;
    /**
     * Wait for an element to be exist by given selector
     * @param selector element selector
     */
    function isExist(selector: string): void;
    /**
     * Wait for an element to be not visible by given selector
     *
     * @param selector element selector
     */
    function notVisible(notVisibleElementSelector: string): void;
    /**
     * Wait until element not exist in dom
     * @param notExistElementSelector element's selector
     */
    function notExist(notExistElementSelector: string): void;
    /**
     * Switch to iframe by iframe selector
     * Elements/widgets ( like dialogs, status bars and more)
     * located inside an iframe has to be switch to it
     * @param iframeSelector selector of frame to switch to
     */
    function switchToFrame(iframeSelector: string): void;
    /**
     * Switch to other tab by id
     * @param tabId tab it to switch
     */
    function switchTab(tabId: string): void;
    /**
     * Get ids of open tabs
     */
    function getTabIds(): string[];
    /**
     * Switch to parent frame
     * Have to call it after switching to some iframe
     * so the focus will be back on main page
     */
    function switchToParentFrame(): void;
    /**
     * Hover over an element by given selector
     *
     * Note: Uses moveToObject method that is currently deprecated
     * @param selector selector of an element to hover
     */
    function hover(selector: string): void;
    /**
     * Validate element text as expected
     * Actual texts EOL replaced with spaces, for better test readability, so you need to path one line string
     * Note: element should be visible, otherwise will return empty string(selenium requirement)
     * @param selector element selector with text
     * @param text expected text
     */
    function expectText(selector: string, text: string): void;
    /**
     * Get text of an element by selector
     * @param selector element's selector
     */
    function getText(selector: string): string;
    /**
     * Validate number of items found by selector as expected
     *
     * @param selector selector of items to count
     * @param expectedValue expected number of items
     */
    function expectNumberOfElements(selector: string, expectedValue: number): void;
    /**
     * Scroll to an element in list
     *
     * Scroll in loop until the element is visible or fail on time out
     * Checks for size of list every iteration in case list is lazy loaded
     * @param elementSelector selector of an element to scroll to
     * @param listSelector selector of list to scroll
     */
    function scrollToElement(elementSelector: string, listSelector: string): void;
    /**
     *
     * @param iframeSelector iFrame selector
     * @param expectedVisibility expected visibility status
     */
    function isIframeVisible(iframeSelector: string, expectedVisibility: boolean): void;
    /**
     * Get element's attribute value
     * @param selector element's selector to search for attribute
     * @param attributeName attribute name to search for
     */
    function getAttribute(selector: string, attributeName: string): string;
    /**
     * Check if attribute with given selector contain expected value
     * @param selector element's selector to search for attribute
     * @param attributeName attribute name to search for
     * @param value value in attribute
     */
    function expectAttributeValue(selector: string, attributeName: string, value: string): void;
    /**
     * Check if attribute with given selector NOT contain expected word
     * @param selector element's selector to search for attribute
     * @param attributeName attribute name to search for
     * @param value value NOT in attribute
     */
    function expectNoAttributeValue(selector: string, attributeName: string, value: string): void;
    /**
     * Get cssProperty value by it's name and element selector
     * @param selector element selector
     * @param cssPropertyName  css property name
     */
    function getCssProperty(selector: string, cssPropertyName: string): CssProperty;
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
    function setCookie(cookie: Cookie, domain?: string): void;
    /**
     * Get current Url
     */
    function getUrl(): string;
    /**
     * Accept Alert
     */
    function acceptAlert(): void;
    /**
     * Dismiss Alert
     */
    function dismissAlert(): void;
    /**
     * Validate alert's text as expected
     * @param expectedText expected alert's text
     */
    function expectAlertText(expectedText: string): void;
    /**
     * Change size of browser window
     *    If only one parameter is provided the second will stay as is.
     *    If no parameter provided there will be no change.
     * @param requestedWidth - Width (px)
     * @param requestedHeight - Height (px)
     */
    function setViewportSize(wSize: {
        width: number;
        height: number;
    }): void;
    /**
     * Get current browser window size returns Size obj {width : number, height : number}
     */
    function getViewportSize(): Size;
    /**
     *
     * @param mouseButton -  {LEFT = 0, MIDDLE = 1 , RIGHT = 2}
     */
    function pressMouseButton(mouseButton: MouseButton): void;
    /**
     * @param selector - element to move to, If not specified or is null, the offset is relative to current position of the mouse.
     * @param xOffset - X (Pixels) offset to move to, relative to the top-left corner of the element If not specified, the mouse will move to the middle of the element.
     * @param yOffset - Y (Pixels) offset to move to, relative to the top-left corner of the element. If not specified, the mouse will move to the middle of the element.
     */
    function moveMouseCursorTo(selector: string, xOffset?: number, yOffset?: number): void;
    /**
     * @param mouseButton -  {LEFT = 0, MIDDLE = 1 , RIGHT = 2}
     */
    function releaseMouseButton(mouseButton: string): void;
    /**
     * Determine an element’s location on the page. The point (0pix, 0pix) refers to the upper-left corner of the page.
     * @param selector  - element with requested position offset
     */
    function getElementLocation(selector: string): {
        x: number;
        y: number;
    };
}
