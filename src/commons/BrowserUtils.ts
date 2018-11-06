import {EOL} from 'os';
import {Cookie, CssProperty} from 'webdriverio';
import {MouseButton} from "../enums/MouseButton";
import {Reporter} from './Reporter';

const DEFAULT_TIME_OUT: number =
  process.env.DEFAULT_TIME_OUT === undefined
    ? 60000
    : Number(process.env.DEFAULT_TIME_OUT);

const CHILL_OUT_TIME: number =
  process.env.CHILL_OUT_TIME === undefined
    ? 3000
    : Number(process.env.CHILL_OUT_TIME);
/**
 * BrowserUtils wraps wdio browser functionality for cleaner test
 */
export namespace BrowserUtils {
  import Axis = WebdriverIO.Axis;

    /**
   * Inject a snippet of JavaScript into the page
   * for execution in the context of the currently selected frame
   *
   * @param script script to execute
   */
  export function executeScript(script: string): void {
    Reporter.debug(`Executing script: ${script}`);
    tryBlock(
      () => browser.execute(script),
      `Failed to execute script: ${script}`
    );
  }

  /**
   * Upload local file
   * Send full path of the file to input element
   * Element of type input expected to be exist(not necessary visible) on execution
   *
   * @param selector selector of input element that gets the file
   * @param fileFullPath full path of a file to upload
   */
  export function uploadFile(selector: string, fileFullPath: string): void {
    Reporter.debug(
      `Uploading file. Sending file: ${fileFullPath} to ${selector}`
    );
    isExist(selector); // validate element that receives the file exist
    tryBlock(
      () => browser.chooseFile(selector, fileFullPath), //wdio upload file api
      `File with path ${fileFullPath} could not be uploaded to ${selector}`
    );
  }

  /**
   * Scroll to lowest point of the current page
   */
  export function scrollToBottom(): void {
    const bottom: number = getLowestPagePoint();

    Reporter.debug('Scroll to the bottom of the page');
    scrollToPoint(0, bottom);
  }

  /**
   * Scroll to top of the current page
   */
  export function scrollToTop(): void {
    Reporter.debug('Scroll to the top of the page');
    scrollToPoint(0, 0);
  }

  /**
   * Scroll to point by x,y coordinates
   * @param x x value
   * @param y y value
   */
  function scrollToPoint(x: number, y: number): void {
    Reporter.debug(`Scrolling to point: (${x},${y})`);
    tryBlock(() => browser.scroll(x, y), `Failed scroll to point (${x},${y})`);
  }

  /**
   * Get lowers point of the current page
   */
  export function getLowestPagePoint(): number {
    return Number(
      browser.execute(
        () =>
          Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight,
            document.documentElement.clientHeight
          ),
        1
      ).value
    );
  }

  /**
   * Get system data tests executed on
   * Usefully to add in Reporter before each test
   */
  export function getSystemData(): string {
    return String(browser.execute(() => navigator.appVersion).value);
  }

  /**
   * Add a text to an element located by selector
   * Note: It does not remove already existing text
   * @param selector element selector
   * @param  text text to send
   */
  export function sendText(selector: string, text: string): void {
    Reporter.debug(`Sending text: '${text}' to '${selector}'`);
    isVisible(selector);
    tryBlock(
      () => browser.addValue(selector, text),
      `Failed to add text:${text} to ${selector}`
    );
  }

  /**
   * Click an element located by selector
   *
   * Validate element is visible before clicking on it
   * @param selector element selector
   */
  export function click(selector: string): void {
    isVisible(selector);

    Reporter.debug(`Click an element ${selector}`);
    tryBlock(
      () => browser.click(selector),

      `Failed to click on ${selector}`
    );
  }

  /**
   * Double click an element located by selector
   *
   * Validate element is visible before clicking on it
   * @param selector element selector
   */
  export function doubleClick(selector: string): void {
    Reporter.debug(`Double click an element ${selector}`);
    isVisible(selector);
    tryBlock(
      () => browser.doubleClick(selector),

      `Failed to double click on ${selector}`
    );
  }

  /**
   * Navigate to given url with validation
   * to insure the navigation actually happened
   * @param url url for navigation
   */
  export function navigateToUrl(url: string): void {
    Reporter.debug(`Navigate to ${url}`);
    tryBlock(() => browser.url(url), `Failed to navigate to ${url}`);

    expectCurrentUrl(url);
  }

  /**
   * Refresh browser's page
   */
  export function refreshBrowser(): void {
    Reporter.debug('Refresh browser page');
    tryBlock(
      () => browser.refresh(),

      'Failed to refresh the page'
    );
  }

  /**
   * Wait for url to be equal to given url
   * Mainly useful for navigation validation
   * @param url expected current url
   */
  export function expectCurrentUrl(url: string): void {
    const expectedUrl: string = normalizeUrl(url);
    Reporter.debug(`Wait for URL to be , ${expectedUrl}`);
    let currentUrl: string;
    browser.waitUntil(
      (): boolean => {
        currentUrl = normalizeUrl(getUrl());

        return currentUrl === expectedUrl;
      },
      30000,
      `Url not as expected.${EOL} Expected: '${expectedUrl}' ${EOL} Actual: '${browser.getUrl()}'`
    );
  }

  /**
   * Remove backslash from the end of the given url
   *
   * WDIO return url with backslash at the end of url,
   * while user mainly passes without the backslash
   * Removing the last backslash will solve error on url comparison
   * @param url url to remove backslash from
   */
  export function normalizeUrl(url: string): string {
    if (url === null) {
      throw new Error(`Illegal URL: ${url}`);
    }

    return url.replace(/\/+$/, '');
  }

  /**
   * Select a value in element
   * Mostly used for drop down item selection from drop down list
   * @param selector elements selector
   * @param value value to select
   */
  export function selectByValue(selector: string, value: string): void {
    Reporter.debug(`Select by text '${value}' from ${selector}`);
    isExist(selector);
    tryBlock(
      () => browser.selectByValue(selector, value),
      `Failed to select ${value} from ${selector}`
    );
  }

  /**
   * Wait for an element to be visible by given selector
   * @param selector element selector
   */
  export function isVisible(selector: string): void {
    Reporter.debug(`Wait for an element to be visible ${selector}`);
    tryBlock(
      () => browser.waitForVisible(selector, DEFAULT_TIME_OUT),
      `Element not visible ${selector}`
    );
  }

  /**
   * Wait for an element to be exist by given selector
   * @param selector element selector
   */
  export function isExist(selector: string): void {
    Reporter.debug(`Expect an element exist ${selector}`);
    tryBlock(
      () => browser.waitForExist(selector, DEFAULT_TIME_OUT),
      `Element not exist ${selector}`
    );
  }

  /**
   * Wait for an element to be not visible by given selector
   *
   * @param selector element selector
   */
  export function notVisible(notVisibleElementSelector: string): void {
    Reporter.debug(
      `Validating element not visible ${notVisibleElementSelector}`
    );
    tryBlock(
      () =>
        browser.waitForVisible(
          notVisibleElementSelector,
          DEFAULT_TIME_OUT,
          true
        ),
      `Failed to validate element not visible ${notVisibleElementSelector}`
    );
  }

  /**
   * Wait until element not exist in dom
   * @param notExistElementSelector element's selector
   */
  export function notExist(notExistElementSelector: string): void {
    Reporter.debug(`Validating element not exist ${notExistElementSelector}`);
    tryBlock(
      () =>
        browser.waitForExist(notExistElementSelector, DEFAULT_TIME_OUT, true),
      `Failed to validate element not exist ${notExistElementSelector}`
    );
  }

  /**
   * Switch to iframe by iframe selector
   * Elements/widgets ( like dialogs, status bars and more)
   * located inside an iframe has to be switch to it
   * @param iframeSelector selector of frame to switch to
   */
  export function switchToFrame(iframeSelector: string): void {
    chillOut();
    Reporter.debug('Switching to an Iframe');
    isExist(iframeSelector);

    Reporter.debug(`Get iframe element ${iframeSelector}`);

    const frameId: WebdriverIO.Element = tryBlock(
      () => browser.element(iframeSelector).value,
      `Failed to get iframeId by ${iframeSelector}`
    );

    Reporter.debug(`Switching to Iframe ${iframeSelector}'`);
    tryBlock(() => browser.frame(frameId), 'Failed to switch frame');
    chillOut();
  }

  /**
   * Switch to other tab by id
   * @param tabId tab it to switch
   */
  export function switchTab(tabId: string): void {
    Reporter.debug(`Switching tab by id: '${tabId}'`);

    tryBlock(
      () => browser.switchTab(tabId),
      `Failed switch to tab by id: '${tabId}'`
    );
  }

  /**
   * Get ids of open tabs
   */
  export function getTabIds(): string[] {
    Reporter.debug('Get all ids of all open tabs');

    return tryBlock(() => browser.getTabIds(), 'Failed to get tab ids');
  }

  /**
   * Switch to parent frame
   * Have to call it after switching to some iframe
   * so the focus will be back on main page
   */
  export function switchToParentFrame(): void {
    Reporter.debug('Switching to parent frame');
    tryBlock(() => browser.frameParent(), 'Failed to switch to parent frame');
  }

  /**
   * Hover over an element by given selector
   *
   * Note: Uses moveToObject method that is currently deprecated
   * @param selector selector of an element to hover
   */
  export function hover(selector: string): void {
    Reporter.debug(`Hover over an element ${selector}`);
    isVisible(selector);
    tryBlock(
      () => browser.moveToObject(selector),
      `Failed to hover over ${selector}`
    );
  }

  /**
   * Validate element text as expected
   * Actual texts EOL replaced with spaces, for better test readability, so you need to path one line string
   * Note: element should be visible, otherwise will return empty string(selenium requirement)
   * @param selector element selector with text
   * @param text expected text
   */
  export function expectText(selector: string, text: string): void {
    Reporter.debug(
      `Validate element text is '${text}' by selector '${selector}'`
    );
    isVisible(selector);
    const foundText: string = getText(selector);

    //Validate text was found
    if (foundText === undefined) {
      throw new Error(
        `Could not find text in element by selector: '${selector}'`
      );
    }
    const currText: string = foundText.replace(/(\n)/gm, ' '); // replace EOL with space, for more readable tests strings;

    if (currText !== text) {
      throw new Error(
        `Incorrect text in element by selector '${selector}'. ${EOL} Expected: '${text}' ${EOL} Actual: '${currText}'`
      );
    }
  }

  /**
   * Get text of an element by selector
   * @param selector element's selector
   */
  export function getText(selector: string): string {
    Reporter.debug(`Get element's text by selector ${selector}`);

    return tryBlock(
      () => getTextAndVerify(selector),
      `Failed to get text from element '${selector}'`
    );
  }

  function getTextAndVerify(selector: string): string {
    // @ts-ignore
    const stringResults: string =
      browser.elements(selector).value.length === 1
        ? browser.getText(selector)
        : null;

    //Check for multiple results or no element found
    if (stringResults === null) {
      throw new Error(
        `Found multiple results matching text or no results for element: '${selector}' >>>>> '${stringResults}'`
      );
    }

    return stringResults;
  }

  /**
   * Validate number of items found by selector as expected
   *
   * @param selector selector of items to count
   * @param expectedValue expected number of items
   */
  export function expectNumberOfElements(
    selector: string,
    expectedValue: number
  ): void {
    if (expectedValue === 0) {
      notVisible(selector);
    }

    tryBlock(
      () =>
        browser.waitUntil(() => {
          return browser.elements(selector).value.length === expectedValue;
        }),
      `Found number of elements by ${selector} not equal ${expectedValue}`
    );
  }

  /**
   * Scroll to an element in list
   *
   * Scroll in loop until the element is visible or fail on time out
   * Checks for size of list every iteration in case list is lazy loaded
   * @param elementSelector selector of an element to scroll to
   * @param listSelector selector of list to scroll
   */
  export function scrollToElement(
    elementSelector: string,
    listSelector: string
  ): void {
    Reporter.debug(
      `Scroll list ${listSelector} until element is visible ${elementSelector}`
    );
    isExist(listSelector); // need to verify list is loaded
    let last: number = browser.elements(listSelector).value.length;
    tryBlock(
      () =>
        browser.waitUntil(() => {
          /**
           * Since FireFox does not support moveToObject
           * we use JS instead of browser.moveToObject(`(${listSelector})[${last}]`);
           */
          const xpath: string = `(${listSelector})[${last}]`;
          const scrollToJS: string = `document.evaluate("${xpath}", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.scrollIntoView()`;
          executeScript(scrollToJS);

          last = browser.elements(listSelector).value.length;

          return browser.isVisible(elementSelector);
        }),
      `Failed to scroll to ${elementSelector} in ${listSelector}`
    );
  }

  /**
   * Validate iframe is visible
   * @param iframeSelector iframe selector
   * @param isVisible expected visibility status
   */
  export function isIframeVisible(
    iframeSelector: string,
    expectedVisibility: boolean
  ): void {
    Reporter.debug(`Check iframe visibility is ${isVisible}`);

    switchToParentFrame(); //if iframe already focused, isExist will fail
    isExist(iframeSelector);

    const cssDisplayProperty: string = 'display';
    const iframeDisplayProperty: WebdriverIO.CssProperty = tryBlock(
      () => browser.element(iframeSelector).getCssProperty(cssDisplayProperty), //iframe css
      `Failed to get ${cssDisplayProperty} css property from ${iframeSelector}`
    );

    const iframeVisibility: boolean = iframeDisplayProperty.value === 'block'; //css display value. block == visible, none == not visible

    if (iframeVisibility !== expectedVisibility) {
      throw new Error(
        `Failed on iframe ${iframeSelector} visibility validation. ${EOL} Expected: ${isVisible}, actual: ${iframeVisibility} ${EOL}`
      );
    }
  }

  /**
   * Get element's attribute value
   * @param selector element's selector to search for attribute
   * @param attributeName attribute name to search for
   */
  export function getAttribute(
    selector: string,
    attributeName: string
  ): string {
    return tryBlock(
      () => getAttributeAndVerify(selector, attributeName),
      `Failed to get ${attributeName} attribute from ${selector}`
    );
  }

  /**
   *
   * @String selector
   * @String attributeName
   */
  function getAttributeAndVerify(
    selector: string,
    attributeName: string
  ): string {
    // @ts-ignore
    const stringResults: string =
      browser.elements(selector).value.length === 1
        ? browser.getAttribute(selector, attributeName)
        : null;

    //Check for multiple results or no element found
    if (stringResults === null) {
      throw new Error(
        `Found multiple results matching requested attribute '${attributeName}' or no results for element: '${selector}`
      );
    }

    return stringResults;
  }

  /**
   * Check if attribute with given selector contain expected value
   * @param selector element's selector to search for attribute
   * @param attributeName attribute name to search for
   * @param value value in attribute
   */
  export function expectAttributeValue(
    selector: string,
    attributeName: string,
    value: string
  ): void {
    Reporter.debug(
      `Validate element '${selector}' has attribute '${attributeName}' which contains '${value}'`
    );
    let attributeValue: string = null;

    tryBlock(
      () =>
        browser.waitUntil(() => {
          attributeValue = getAttribute(selector, attributeName);

          return isContainWord(attributeValue, value);
        }),
      `Incorrect attribute '${attributeName}' value from ${selector} ${EOL}Expected: ${EOL} word '${value}' to be part of ${EOL}'${attributeValue}'`
    );
  }

  /**
   * Check if attribute with given selector NOT contain expected word
   * @param selector element's selector to search for attribute
   * @param attributeName attribute name to search for
   * @param value value NOT in attribute
   */
  export function expectNoAttributeValue(
    selector: string,
    attributeName: string,
    value: string
  ): void {
    let attributeValue: string = null;

    tryBlock(
      () =>
        browser.waitUntil(() => {
          attributeValue = getAttribute(selector, attributeName);

          return !isContainWord(attributeValue, value);
        }),
      `Incorrect attribute '${attributeName}' value from ${selector} ${EOL}Expected: ${EOL} word '${value}' NOT to be part of ${EOL}'${attributeValue}'`
    );
  }

  /**
   * Check if word is a substring of given text
   * @param fullText string to search in
   * @param word word to search
   */
  function isContainWord(fullText: string, word: string): boolean {
    if (fullText === null || word === null) {
      throw new Error(
        `Some of the strings or all are null. fullText: '${fullText}', word: '${word}`
      );
    }
    // escape special characters from user input
    const wordEscapedChars: string = word.replace(
      /[-\/\\^$*+?.()|[\]{}]/g,
      '\\$&'
    );

    const regexStr: string = `(^|\\s)${wordEscapedChars}(?=\\s|$)`;

    return new RegExp(regexStr).test(fullText);
  }

  /**
   * Get cssProperty value by it's name and element selector
   * @param selector element selector
   * @param cssPropertyName  css property name
   */
  export function getCssProperty(
    selector: string,
    cssPropertyName: string
  ): CssProperty {
    Reporter.debug(
      `Get css property '${cssPropertyName}' from element by '${selector}'`
    );

    return tryBlock(
      () => browser.getCssProperty(selector, cssPropertyName),
      `Failed to get css Property ${cssPropertyName} from ${selector}`
    );
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
  export function setCookie(cookie: Cookie, domain: string = null): void {
    Reporter.debug(`Setting cookie: ${JSON.stringify(cookie)}`);

    let currentUrl: string = null;
    if (domain !== null) {
      currentUrl = getUrl();
      navigateToUrl(domain);
    }

    browser.setCookie(cookie);

    if (domain !== null) {
      navigateToUrl(currentUrl);
    }
  }

  /**
   * Get current Url
   */
  export function getUrl(): string {
    const currentUrl: string = tryBlock(
      () => browser.getUrl(),
      'Failed to get current url'
    );
    Reporter.debug(`Get current URL: ${currentUrl}`);

    return currentUrl;
  }

  /**
   * Accept Alert
   */
  export function acceptAlert(): void {
    Reporter.debug('Accept alert');

    return tryBlock(() => browser.alertAccept(), 'Failed to accept alert');
  }

  /**
   * Dismiss Alert
   */
  export function dismissAlert(): void {
    Reporter.debug('Accept alert');

    return tryBlock(() => browser.alertDismiss(), 'Failed to dismiss alert');
  }

  /**
   * Validate alert's text as expected
   * @param expectedText expected alert's text
   */
  export function expectAlertText(expectedText: string): void {
    Reporter.debug(`Validate alert's text is '${expectedText}'`);

    const actualText: string = tryBlock(
      () => browser.alertText(),
      "Failed to get alert's text"
    );

    if (actualText !== expectedText) {
      throw new Error(
        `Incorrect alert's text. ${EOL} Expected: '${expectedText}' ${EOL} Actual: '${actualText}'`
      );
    }
  }

  /**
   *
   * @param mouseButton -  {LEFT = 0, MIDDLE = 1 , RIGHT = 2}
   */
  export function pressMouseButton(mouseButton : MouseButton): void {
    //Defaults to the left mouse button if not specified.
    const selectedMouseButton: string = mouseButton === undefined ?  MouseButton.LEFT:  mouseButton;
    Reporter.step(`Click mouse button ${selectedMouseButton}.`);
    browser.buttonDown(selectedMouseButton);
  }

  /**
   * @param selector - element to move to, If not specified or is null, the offset is relative to current position of the mouse.
   * @param xOffset - X (Pixels) offset to move to, relative to the top-left corner of the element If not specified, the mouse will move to the middle of the element.
   * @param yOffset - Y (Pixels) offset to move to, relative to the top-left corner of the element. If not specified, the mouse will move to the middle of the element.
   */
  export function moveMouseCursorTo(
    selector?: string,
    xOffset?: number,
    yOffset?: number
  ): void {
    Reporter.debug(
      `Move mouse cursor to element: ${selector} - X: ${xOffset}, Y: ${yOffset}`
    );
    browser.moveTo(selector, xOffset, yOffset);
  }
  /**
   * @param mouseButton -  {LEFT = 0, MIDDLE = 1 , RIGHT = 2}
   */
  export function releaseMouseButton(mouseButton : string): void {
    //Defaults to the left mouse button if not specified.
    const selectedMouseButton: string = mouseButton === undefined ?  MouseButton.LEFT:  mouseButton
    Reporter.step(`Release mouse button ${selectedMouseButton}.`);
    browser.buttonUp(selectedMouseButton);
  }

  /**
   * Determine an element’s location on the page. The point (0pix, 0pix) refers to the upper-left corner of the page.
   * @param selector  - element with requested position offset
   */
  export function getElementLocation(
    selector: string
  ): { x: number; y: number } {
    Reporter.debug(`Get Element location- ${selector}`);

    return browser.getLocation(selector);
  }

  /**
   * When switching between iframes, without wait it will fail to switch to iframe
   */
  function chillOut(): void {
    Reporter.debug(`wait for ${CHILL_OUT_TIME}ms`);
    browser.pause(CHILL_OUT_TIME);
  }

  /**
   * Throw error with custom error message
   * @param customErrorMessage custom error message
   * @param error original error
   */
  function handleError(customErrorMessage: string, error: Error): void {
    throw new Error(`${customErrorMessage} ${EOL} ${error}`);
  }

  /**
   * Action wrapper
   * Wrap all actions with try catch block
   */
  // tslint:disable-next-line:no-any
  function tryBlock(action: Function, errorMessage: string): any {
    try {
      return action();
    } catch (e) {
      handleError(errorMessage, e);
    }
  }
}
