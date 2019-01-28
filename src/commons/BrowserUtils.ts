import { EOL } from 'os';
import { Cookie, CSSProperty } from 'webdriverio';
import { MouseButton } from '../enums/MouseButton';
import { SelectorType } from '../enums/SelectorType';
import { Reporter } from './Reporter';
import LocationReturn = WebdriverIO.LocationReturn;
import Element = WebdriverIO.Element;

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
  /**
   * Inject a snippet of JavaScript into the page
   * for execution in the context of the currently selected frame
   * @param script - js script to execute
   */
  export function executeScript(script: string): void {
    Reporter.debug(`Executing script: '${script}'`);
    tryBlock(
      () => browser.execute(script),
      `Failed to execute script: ${script}`
    );
  }

  /**
   *  This Method will scroll to element into view
   * @param selector - element locator
   */
  export function scrollIntoView(selector: string): void {
    Reporter.debug(`Scroll to: [${selector}]`);
    const element: Element<void> = $(selector);
    tryBlock(
      () => element.scrollIntoView(),
      `Failed to scroll to element: [${selector}]`
    );
  }

  /**
   * Get system data tests executed on
   * Usefully to add in Reporter before each test
   */
  export function getSystemData(): string {
    return String(browser.execute(() => navigator.appVersion));
  }

  /**
   * Add a text to an element located by selector
   * Note: It does not remove already existing text
   * @param selector element selector
   * @param  text text to send
   */
  export function sendText(selector: string, text: string): void {
    Reporter.debug(`Sending text: [${text}] to [${selector}]`);
    isVisible(selector);
    const element: Element<void> = $(selector);
    tryBlock(
      () => element.addValue(text),
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
    Reporter.debug(`Click an element [${selector}]`);
    isVisible(selector);
    const element: Element<void> = $(selector);
    tryBlock(
      () => element.click(),

      `Failed to click on '${selector}'`
    );
  }

  /**
   * Double click an element located by selector
   *
   * Validate element is visible before clicking on it
   * @param selector element selector
   */
  export function doubleClick(selector: string): void {
    Reporter.debug(`Double click an element '${selector}'`);
    isVisible(selector);
    const element: Element<void> = $(selector);
    tryBlock(
      () => element.doubleClick(),

      `Failed to double click on '${selector}'`
    );
  }

  /**
   * Navigate to given url with validation
   * to insure the navigation actually happened
   * @param url url for navigation
   */
  export function navigateToUrl(url: string): void {
    Reporter.debug(`Navigate to [${url}]`);
    tryBlock(() => browser.url(url), `Failed to navigate to '${url}'`);

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
   * Click browser's back button
   */
  export function backBrowser(): void {
    Reporter.debug('Click browser back button');
    tryBlock(() => browser.back(), 'Failed to click browser back button');
  }

  /**
   * Wait for url to be equal to given url
   * Mainly useful for navigation validation
   * @param url expected current url
   */
  export function expectCurrentUrl(url: string): void {
    Reporter.debug(`Raw URL: '${url}'`);
    const expectedUrl: string = normalizeUrl(url);
    Reporter.debug(`Wait for URL to be , '${expectedUrl}'`);
    let currentUrl: string;
    browser.waitUntil(
      (): boolean => {
        currentUrl = normalizeUrl(getUrl());
        Reporter.debug(
          `Expected URL: '${expectedUrl}', Actual URL: '${currentUrl}'`
        );

        return currentUrl === expectedUrl;
      },
      30000,
      `Url not as expected '${expectedUrl}'`
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
      throw new Error(`Illegal URL: '${url}'`);
    }
    const normalizedURL: string = url.replace(/\/+$/, '');
    Reporter.debug(`URL Normalized: '${normalizedURL}'`);

    return normalizedURL;
  }

  /**
   *  Wait Until - Will Return true in case condition met within the timeout or false if condition isn't met or not met within the timeout
   * @param action - any condition as a function
   * @param timeout - specified time out if undefined Default time out is used
   * @param errMessage - Custom message for time out
   */
  export function waitUntil(
    action: Function,
    errMessage?: string,
    timeout: number = DEFAULT_TIME_OUT
    // tslint:disable-next-line:no-any
  ): any {
    Reporter.debug(`Wait Until '${JSON.stringify(action)}'`);

    // tslint:disable-next-line:no-unnecessary-callback-wrapper
    return browser.waitUntil(() => action(), timeout, errMessage);
  }

  /**
   * Select a value in element
   * Mostly used for drop down item selection from drop down list
   * @param selector elements selector
   * @param value value to select
   */
  export function selectByValue(selector: string, value: string): void {
    Reporter.debug(`Select by text '${value}' from '${selector}'`);
    isExist(selector);
    const element: Element<void> = $(selector);
    tryBlock(
      () => element.selectByAttribute('value', value),
      `Failed to select ${value} from ${selector}`
    );
  }

  /**
   * Wait for an element to be visible by given selector
   * @param selector element selector
   */
  export function isVisible(selector: string): void {
    Reporter.debug(`Wait for an element to be visible '${selector}'`);
    isExist(selector);
    const element: Element<void> = $(selector);
    tryBlock(
      () => element.waitForDisplayed(DEFAULT_TIME_OUT),
      `Element not visible '${selector}'`
    );
  }

  /**
   * Wait for an element to be exist by given selector
   * @param selector element selector
   */
  export function isExist(selector: string): void {
    Reporter.debug(`Expect an element exist '${selector}'`);
    const element: Element<void> = $(selector);
    tryBlock(
      () => element.waitForExist(DEFAULT_TIME_OUT),
      `Element not exist '${selector}'`
    );
  }

  /**
   * Wait for an element to be not visible by given selector
   *
   * @param selector element selector
   */
  export function notVisible(notVisibleElementSelector: string): void {
    Reporter.debug(
      `Validating element not visible '${notVisibleElementSelector}'`
    );
    isExist(notVisibleElementSelector);
    const element: Element<void> = $(notVisibleElementSelector);
    tryBlock(
      () => element.waitForDisplayed(DEFAULT_TIME_OUT, true),
      `Failed to validate element not visible '${notVisibleElementSelector}'`
    );
  }

  /**
   * Wait until element not exist in dom
   * @param notExistElementSelector element's selector
   */
  export function notExist(notExistElementSelector: string): void {
    Reporter.debug(`Validating element not exist '${notExistElementSelector}'`);
    const element: Element<void> = $(notExistElementSelector);
    tryBlock(
      () => element.waitForExist(DEFAULT_TIME_OUT, true),
      `Failed to validate element not exist '${notExistElementSelector}'`
    );
  }

  /**
   * Switch to iframe by iframe selector
   * Elements/widgets ( like dialogs, status bars and more)
   * located inside an iframe has to be switch to it
   *
   * via integer query: if you only have one iframe on the page you can switch calling client.frame(0)
   * via name attribute: give that iframe a name like name="myIframe" then you can switch calling client.frame("myIframe")
   * via WebElement: query the iframe using the element method and then pass the result to the frame command
   * @param iframeSelector selector of frame to switch to
   */
  export function switchToFrame(iframeSelector: string): void {
    Reporter.debug(`Get iframe element '${iframeSelector}'`);
    chillOut();
    Reporter.debug('Switching to Iframe');
    isExist(iframeSelector);

    Reporter.debug(`Switching to Iframe '${iframeSelector}'`);
    tryBlock(
      () => browser.switchToFrame(iframeSelector),
      'Failed to switch frame'
    );
    chillOut();
  }

  /**
   * Switch to other tab by id
   * @param tabId tab it to switch
   */
  export function switchTab(handle: string): void {
    Reporter.debug(`Switching tab by id: '${handle}'`);

    tryBlock(
      () => browser.switchToWindow(handle),
      `Failed switch to tab by id: '${handle}'`
    );
  }

  /**
   * Over think method name
   * Get ids of open tabs
   */
  export function getTabIds(): string[] {
    Reporter.debug('Get all ids of all open tabs');

    return tryBlock(() => browser.getWindowHandles(), 'Failed to get tab ids');
  }

  /**
   * Switch to parent frame
   * Have to call it after switching to some iframe
   * so the focus will be back on main page
   *
   * one of three possible types: null: this represents the top-level browsing context (i.e., not an iframe),
   * a Number, representing the index of the window object corresponding to a frame,
   * a string representing an element id. The element must be the frame or iframe to be selected
   */
  export function switchToParentFrame(): void {
    Reporter.debug('Switching to parent frame');
    tryBlock(
      () => browser.switchToFrame(undefined),
      'Failed to switch to parent frame'
    );
  }

  /**
   * Search for an element on the page, starting from the document root
   * @param selectorType - enum type of selector (XPATH, ID, etc')
   * @param selector - element locator
   */
  export function findElement(
    selectorType: SelectorType,
    selector: string
  ): string {
    Reporter.debug(`Find element '${selector}' of type '${selectorType}'`);

    return tryBlock(
      () => browser.findElement(selectorType, selector),
      'Failed to find element'
    );
  }

  /**
   * Search for multiple elements on the page, starting from the document root. The located elements will be returned as a WebElement JSON objects
   * @param selectorType - enum type of selector (XPATH, ID, etc')
   * @param selector - element locator
   */
  export function findElements(
    selectorType: SelectorType,
    selector: string
  ): string {
    Reporter.debug('Switching to parent frame');

    return tryBlock(
      () => browser.findElements(selectorType, selector),
      'Failed to find elements'
    );
  }

  /**
   * Hover over an element by given selector
   *
   * Note: Uses moveToObject method that is currently deprecated
   * @param selector selector of an element to hover
   */
  export function hover(selector: string): void {
    Reporter.debug(`Move to an element '${selector}'`);
    isVisible(selector);
    const location: LocationReturn = getElementLocation(selector);
    const element: Element<void> = $(selector);
    tryBlock(
      () => element.moveTo(location.x, location.y),
      `Failed to hover over '${selector}' at location '${JSON.stringify(
        location
      )}'`
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
    Reporter.debug(`Get element's text by selector '${selector}'`);

    return tryBlock(
      () => getTextAndVerify(selector),
      `Failed to get text from element '${selector}'`
    );
  }

  /**
   * get text and verify extraction succeeded
   * @param selectorType - enum type of selector (XPATH, ID, etc')
   * @param selector - element locator
   */
  function getTextAndVerify(selector: string): string {
    Reporter.debug(`Get Text & Verify Not Null, '${selector}'`);
    const element: Element<void> = $(selector);

    const stringResults: string =
      $$(selector).length === 1 ? element.getText() : undefined;

    //Check for multiple results or no element found
    if (stringResults === null || stringResults === undefined) {
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
   * @param selectorType - enum type of selector (XPATH, ID, etc')
   * @param selector - element locator
   */
  export function expectNumberOfElements(
    selector: string,
    expectedValue: number
  ): void {
    Reporter.debug(
      `Expect Number Of Elements, '${expectedValue}' in '${selector}'`
    );
    if (expectedValue === 0) {
      notVisible(selector);
    }

    tryBlock(
      () =>
        browser.waitUntil(() => {
          return $$(selector).length === expectedValue;
        }),
      `Found number of elements by '${selector}' not equal '${expectedValue}'`
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
    selector: string,
    listSelector: string
  ): void {
    Reporter.debug(
      `Scroll in list '${listSelector}' until element '${selector}' is visible.`
    );

    isExist(listSelector); // need to verify list is loaded
    let last: number = $$(listSelector).length;
    Reporter.debug(`Last element index: [${last}].`);
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

          last = findElements(SelectorType.XPATH, selector).length;
          const element: Element<void> = $(selector);

          return element.isDisplayed();
        }),
      `Failed to scroll to ${selector} in ${listSelector}`
    );
  }

  /**
   *
   * @param iframeSelector iFrame selector
   * @param expectedVisibility expected visibility status
   */
  export function isIframeVisible(
    iframeSelector: string,
    expectedVisibility: boolean
  ): void {
    Reporter.debug(`Check iframe visibility is '${expectedVisibility}'`);

    switchToParentFrame(); //if iframe already focused, isExist will fail
    isExist(iframeSelector);
    const element: Element<void> = $(iframeSelector);

    const cssDisplayProperty: string = 'display';
    const iframeDisplayProperty: WebdriverIO.CSSProperty = tryBlock(
      () => element.getCSSProperty(cssDisplayProperty), //iframe css
      `Failed to get '${cssDisplayProperty}' css property from '${iframeSelector}'`
    );

    const iframeVisibility: boolean = iframeDisplayProperty.value === 'block'; //css display value. block == visible, none == not visible

    if (iframeVisibility !== expectedVisibility) {
      throw new Error(
        `Failed on iframe '${iframeSelector}' visibility validation. ${EOL} Expected: '${expectedVisibility}' ${EOL} Actual: '${iframeVisibility}'`
      );
    }
  }

  /**
   * Get element's attribute value
   * @param selectorType - enum type of selector (XPATH, ID, etc')
   * @param selector element's selector to search for attribute
   * @param attributeName attribute name to search for
   */
  export function getAttribute(
    selector: string,
    attributeName: string
  ): string {
    return tryBlock(
      () => getAttributeAndVerify(selector, attributeName),
      `Failed to get '${attributeName}' attribute from '${selector}'`
    );
  }

  /**
   *
   * @param selectorType - enum type of selector (XPATH, ID, etc')
   * @param selector element's selector to search for attribute
   * @param attributeName attribute name to search for
   */
  function getAttributeAndVerify(
    selector: string,
    attributeName: string
  ): string {
    Reporter.debug(
      `Get Attribute '${attributeName}' in element '${selector}' And Verify not null.`
    );
    isExist(selector);
    const element: Element<void> = $(selector);
    // @ts-ignore
    const stringResults: string =
      $$(selector).length === 1
        ? element.getAttribute(attributeName)
        : undefined;

    //Check for multiple results or no element found
    if (stringResults === null || stringResults === undefined) {
      throw new Error(
        `Found multiple results matching requested attribute '${attributeName}' or no results for element: '${selector}'`
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
    let attributeValue: string;

    tryBlock(
      () =>
        browser.waitUntil(() => {
          attributeValue = getAttribute(selector, attributeName);

          return isContainWord(attributeValue, value);
        }),
      `Incorrect attribute '${attributeName}' value from '${selector}' ${EOL}Expected: word '${value}' to be part of '${attributeValue}'`
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
    let attributeValue: string;
    Reporter.debug(
      `Validate element '${selector}' doesn't have attribute '${attributeName}' which contains '${value}'`
    );
    tryBlock(
      () =>
        browser.waitUntil(() => {
          attributeValue = getAttribute(selector, attributeName);

          return !isContainWord(attributeValue, value);
        }),
      `Incorrect attribute '${attributeName}' value from ${selector} ${EOL}Expected: word '${value}' NOT to be part of '${attributeValue}'`
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
  ): CSSProperty {
    Reporter.debug(
      `Get css property '${cssPropertyName}' from element by '${selector}'`
    );

    const element: Element<void> = $(selector);

    return tryBlock(
      () => element.getCSSProperty(cssPropertyName),
      `Failed to get css Property '${cssPropertyName}' from '${selector}'`
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
  export function setCookie(cookie: Cookie, domain: string): void {
    Reporter.debug(`Setting cookie: '${JSON.stringify(cookie)}'`);

    let currentUrl: string;
    if (domain !== null) {
      currentUrl = getUrl();
      navigateToUrl(domain);
    }

    browser.setCookies(cookie);

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
    Reporter.debug(`Get current URL: '${currentUrl}'`);

    return currentUrl;
  }

  /**
   * Accept Alert popup
   */
  export function acceptAlert(): void {
    Reporter.debug('Accept alert');

    tryBlock(() => browser.acceptAlert(), 'Failed to accept alert');
  }

  /**
   * Dismiss Alert popup
   */
  export function dismissAlert(): void {
    Reporter.debug('Dismiss alert');

    tryBlock(() => browser.dismissAlert(), 'Failed to dismiss alert');
  }

  /**
   * Validate alert's text as expected
   * @param expectedText expected alert's text
   */
  export function expectAlertText(expectedText: string): void {
    Reporter.debug(`Validate alert's text is '${expectedText}'`);

    const actualText: string = tryBlock(
      () => browser.getAlertText(),
      "Failed to get alert's text"
    );

    if (actualText !== expectedText) {
      throw new Error(
        `Incorrect alert's text. ${EOL} Expected: '${expectedText}' ${EOL} Actual: '${actualText}'`
      );
    }
  }

  /**
   * Change size of browser window
   * @param width - Width (px)
   * @param height - Height (px)
   */
  export function setWindowSize(width: number, height: number): void {
    Reporter.debug(`Set window size to '${width}X${height}'`);
    browser.setWindowSize(width, height);
  }

  /**
   *
   * @param mouseButton -  {LEFT = 0, MIDDLE = 1 , RIGHT = 2}
   */
  export function pressMouseButton(mouseButton: MouseButton): void {
    //Defaults to the left mouse button if not specified.
    const selectedMouseButton: string =
      mouseButton === undefined ? MouseButton.LEFT : mouseButton;
    Reporter.step(`Click mouse button '${selectedMouseButton}'`);
    browser.buttonDown(Number(selectedMouseButton));
  }

  /**
   * @param selector - element to move to, If not specified or is null, the offset is relative to current position of the mouse.
   * @param xOffset - X (Pixels) offset to move to, relative to the top-left corner of the element If not specified, the mouse will move to the middle of the element.
   * @param yOffset - Y (Pixels) offset to move to, relative to the top-left corner of the element. If not specified, the mouse will move to the middle of the element.
   */
  export function moveMouseCursorTo(
    selector: string,
    xOffset: number,
    yOffset: number
  ): void {
    Reporter.debug(
      `Move mouse cursor to element: '${selector}' with offset [${xOffset},${yOffset}]`
    );
    isExist(selector);
    const element: Element<void> = $(selector);
    element.moveTo(xOffset, yOffset);
  }

  /**
   * @param mouseButton -  {LEFT = 0, MIDDLE = 1 , RIGHT = 2}
   */
  export function releaseMouseButton(mouseButton: string): void {
    //Defaults to the left mouse button if not specified.
    const selectedMouseButton: string =
      mouseButton === undefined ? MouseButton.LEFT : mouseButton;
    Reporter.step(`Release mouse button '${selectedMouseButton}'`);
    browser.buttonUp(Number(selectedMouseButton));
  }

  /**
   * Determine an element’s location on the page. The point (0pix, 0pix) refers to the upper-left corner of the page.
   * @param selector  - element with requested position offset
   */
  export function getElementLocation(selector: string): LocationReturn {
    Reporter.debug(`Get Element location '${selector}'`);
    const element: Element<void> = $(selector);

    return element.getLocation();
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
