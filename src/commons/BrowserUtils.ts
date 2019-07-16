import { Cookie, CSSProperty, Element, LocationReturn, SizeReturn } from '@wdio/sync';
import admZip, { IZipEntry } from 'adm-zip';
import { EOL } from 'os';
import requestPromiseNative from 'request-promise-native';
import { MouseButton } from '../enums/MouseButton';
import { SelectorType } from '../enums/SelectorType';
import { SpecialKeys } from '../index';
import { Reporter } from './Reporter';

const DEFAULT_TIME_OUT: number =
  process.env.DEFAULT_TIME_OUT === undefined ? 60000 : Number(process.env.DEFAULT_TIME_OUT);

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
    tryBlock(() => browser.execute(script), `Failed to execute script: ${script}`);
  }

  /**
   *  This Method will scroll to element into view
   * @param selector - element locator
   */
  export function scrollIntoView(selector: string): void {
    Reporter.debug(`Scroll to: '${selector}'`);

    tryBlock(() => {
      const scrollToJS: string = `document.evaluate("${selector}", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.scrollIntoView()`;
      executeScript(scrollToJS);
    }, `Failed to scroll to element: [${selector}]`);
  }

  /**
   * Get system data tests executed on
   * Usefully to add in Reporter before each test
   */
  export function getSystemData(): string {
    return String(browser.execute(() => navigator.appVersion));
  }

  /**
   * Add a value to an element located by selector
   * @param selector element selector
   * @param  value value to add
   */
  export function addValue(selector: string, value: string | number): void {
    Reporter.debug(`Add value: '${value}' to '${selector}'`);
    isDisplayed(selector);
    tryBlock(() => $(selector).addValue(value), `Failed to add value: '${value}' to '${selector}'`);
  }
  /**
   * Set a value to an element located by selector
   * @param selector element selector
   * @param value - value to add
   */
  export function setValue(selector: string, value: string | number): void {
    Reporter.debug(`Set element '${selector} with value: '${value}'`);
    isDisplayed(selector);
    tryBlock(() => $(selector).setValue(value), `Failed to set value: '${value}' to '${selector}'`);
  }

  /**
   * Set value of hidden element
   * For example: For file uploads, set 'input' element (that can be not visible) with 'filePath' value
   * @param selector elements selector
   * @param value text value to set or numeric value
   */
  export function setHiddenElementValue(selector: string, value: string | number): void {
    Reporter.debug(`Set hidden element '${selector} with value: '${value}'`);
    isExist(selector);
    tryBlock(() => $(selector).setValue(value), `Failed to set value: '${value}' to '${selector}'`);
  }

  /**
   * Click an element located by selector
   *
   * Validate element is visible before clicking on it
   * @param selector element selector
   */
  export function click(selector: string): void {
    Reporter.debug(`Click an element '${selector}'`);
    waitForEnabled(selector);

    tryBlock(
      () => $(selector).click(),

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
    waitForEnabled(selector);

    const targetElement: string = `var targetElement = document.evaluate("${selector}", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;`;
    const clickEvent: string = " var clickEvent  = document.createEvent ('MouseEvents');";
    const clickEventInit: string = "clickEvent.initEvent ('dblclick', true, true);";
    const dispatchEvent: string = 'targetElement.dispatchEvent (clickEvent);';

    const script: string = `${targetElement}${clickEvent}${clickEventInit}${dispatchEvent}`;

    tryBlock(
      () => browser.execute(script),

      `Failed to double click on '${selector}'`
    );
  }

  /**
   * Navigate to given url with validation
   * to insure the navigation actually happened
   * @param url url for navigation
   */
  export function navigateToUrl(url: string): void {
    Reporter.debug(`Navigate to '${url}'`);
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
    const expectedUrl: string = normalizeUrl(url);
    Reporter.debug(`Wait for URL to be , '${expectedUrl}'`);
    browser.waitUntil(
      (): boolean => {
        return expectedUrl === normalizeUrl(getUrl());
      },
      DEFAULT_TIME_OUT,
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

    return url.replace(/\/+$/, '');
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

    tryBlock(() => $(selector).selectByAttribute('value', value), `Failed to select ${value} from ${selector}`);
  }

  /**
   * @param selector - element selector
   */
  export function isEnabled(selector: string): boolean {
    Reporter.debug(`Is element enabled '${selector}'`);

    return $(selector).isEnabled();
  }

  /**
   *  Wait for element to be enabled
   * @param selector element selector
   */
  export function waitForEnabled(selector: string): void {
    Reporter.debug(`Wait for an element to be enabled '${selector}'`);
    waitForDisplayed(selector);
    tryBlock(() => $(selector).waitForEnabled(DEFAULT_TIME_OUT), `Element not enabled '${selector}'`);
  }

  /**
   * Indicate if Element is visible (without wait)
   * @param selector - element selector
   */
  export function isDisplayed(selector: string): boolean {
    Reporter.debug(`Wait for an element to be visible '${selector}'`);

    return $(selector).isDisplayed();
  }

  /**
   * Wait for an element to be visible by given selector
   * @param selector element selector
   */
  export function waitForDisplayed(selector: string): void {
    Reporter.debug(`Wait for an element to be visible '${selector}'`);
    isExist(selector);
    tryBlock(() => $(selector).waitForDisplayed(DEFAULT_TIME_OUT), `Element not visible '${selector}'`);
  }

  /**
   * Wait for an element to be exist by given selector
   * @param selector element selector
   */
  export function isExist(selector: string): void {
    Reporter.debug(`Expect an element exist '${selector}'`);

    tryBlock(() => $(selector).waitForExist(DEFAULT_TIME_OUT), `Element not exist '${selector}'`);
  }

  /**
   * Wait for an element to be not visible by given selector
   *
   * @param selector element selector
   */
  export function notVisible(selector: string): void {
    Reporter.debug(`Validating element not visible '${selector}'`);
    tryBlock(() => {
      browser.waitUntil(() => {
        return !$(selector).isDisplayed();
      }, DEFAULT_TIME_OUT);
    }, `Failed to validate element not visible '${selector}'`);
  }

  /**
   * Wait until element not exist in dom
   * @param notExistElementSelector element's selector
   */
  export function notExist(notExistElementSelector: string): void {
    Reporter.debug(`Validating element not exist '${notExistElementSelector}'`);

    tryBlock(
      () => $(notExistElementSelector).waitForExist(DEFAULT_TIME_OUT, true),
      `Failed to validate element not exist '${notExistElementSelector}'`
    );
  }

  /**
   * Switch to iframe by iframe selector
   * Elements/widgets ( like dialogs, status bars and more)
   * located inside an iframe has to be switch to it
   *
   * @param selector selector of frame to switch to
   */
  export function switchToFrame(selector: string): void {
    Reporter.debug(`Validate iframe with selector ${selector} exist`);
    isExist(selector);

    Reporter.debug(`Switching to an Iframe by selector '${selector}'`);
    tryBlock(() => browser.switchToFrame($(selector)), 'Failed to switch frame');
  }

  /**
   * Switch to other tab by id
   * @param tabId tab it to switch
   */
  export function switchTab(handle: string): void {
    Reporter.debug(`Switching tab by id: '${handle}'`);

    tryBlock(() => browser.switchToWindow(handle), `Failed switch to tab by id: '${handle}'`);
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
   */
  export function switchToParentFrame(): void {
    Reporter.debug(`Switching to parent frame (${browser.capabilities.browserName})`);

    switch (browser.capabilities.browserName) {
      case 'chrome': {
        Reporter.debug('Case chrome');
        tryBlock(() => browser.switchToParentFrame(), 'Chrome: Failed to switch to parent frame');
        break;
      }

      case 'firefox': {
        Reporter.debug('Case firefox');
        tryBlock(
          // tslint:disable-next-line:no-null-keyword
          () => browser.switchToFrame(null),
          'FireFox: Failed to switch to parent frame'
        );
        break;
      }

      default: {
        throw new TypeError('Unable to execute due to unsupported Browser');
      }
    }
  }

  /**
   * Search for an element on the page, starting from the document root
   * @param selectorType - enum type of selector (XPATH, ID, etc')
   * @param selector - element locator
   */
  export function findElement(selectorType: SelectorType, selector: string): string {
    Reporter.debug(`Find element '${selector}' of type '${selectorType}'`);

    return tryBlock(() => browser.findElement(selectorType, selector), 'Failed to find element');
  }

  /**
   * Search for multiple elements on the page, starting from the document root. The located elements will be returned as a WebElement JSON objects
   * @param selectorType - enum type of selector (XPATH, ID, etc')
   * @param selector - element locator
   */
  export function findElements(selectorType: SelectorType, selector: string): string[] {
    return tryBlock(() => browser.findElements(selectorType, selector), 'Failed to find elements');
  }
  /**
   * Hover over an element by given selector
   *
   * Note: Uses moveToObject method that is currently deprecated
   * @param selector selector of an element to hover
   */
  export function hover(selector: string): void {
    Reporter.debug(`Move to an element '${selector}'`);
    waitForDisplayed(selector);
    tryBlock(() => $(selector).moveTo(), `Failed to hover over '${selector}')`);
  }

  /**
   * Validate element text as expected
   * Actual texts EOL replaced with spaces, for better test readability, so you need to path one line string
   * Note: element should be visible, otherwise will return empty string(selenium requirement)
   * @param selector element selector with text
   * @param expectedText expected text
   */
  export function expectText(selector: string, expectedText: string): void {
    Reporter.debug(`Validate element text is '${expectedText}' by selector '${selector}'`);
    waitForDisplayed(selector);
    const elementWithText: Element = $(selector);
    tryBlock(
      () =>
        browser.waitUntil(() => {
          return elementWithText.getText() === expectedText;
        }),
      `Expected text in element by selector '${selector}' not found.`
    );
  }

  /**
   * Get text of an element by selector
   * @param selector element's selector
   */
  export function getText(selector: string): string {
    Reporter.debug(`Get element's text by selector '${selector}'`);
    waitForDisplayed(selector);

    return tryBlock(() => $(selector).getText(), `Failed to get text from element '${selector}'`);
  }

  /**
   * Validate number of items found by selector as expected
   *
   * @param selector selector of items to count
   * @param expectedValue expected number of items
   * @param selector - element locator
   */
  export function expectNumberOfElements(selector: string, expectedValue: number): void {
    Reporter.debug(`Expect Number Of Elements, '${expectedValue}' in '${selector}'`);
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
   * @param selector selector of an element to scroll to
   * @param listSelector selector of list to scroll
   */
  export function scrollToElement(selector: string, listSelector: string): void {
    Reporter.debug(`Scroll in list '${listSelector}' until element '${selector}' is visible.`);

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

          last = findElements(SelectorType.XPATH, listSelector).length;

          return $(selector).isDisplayed();
        }),
      `Failed to scroll to ${selector} in ${listSelector}`
    );
  }

  /**
   *
   * @param iframeSelector iFrame selector
   * @param expectedVisibility expected visibility status
   */
  export function isIframeVisible(iframeSelector: string, expectedVisibility: boolean): void {
    Reporter.debug(`Check iframe visibility is '${expectedVisibility}'`);

    switchToParentFrame(); //if iframe already focused, isExist will fail
    isExist(iframeSelector);

    const cssDisplayProperty: string = 'display';
    const iframeDisplayProperty: CSSProperty = tryBlock(
      () => $(iframeSelector).getCSSProperty(cssDisplayProperty), //iframe css
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
   * @param selector element's selector to search for attribute
   * @param attributeName attribute name to search for
   */
  export function getAttribute(selector: string, attributeName: string): string {
    return tryBlock(
      () => getAttributeAndVerify(selector, attributeName),
      `Failed to get '${attributeName}' attribute from '${selector}'`
    );
  }

  /**
   *
   * @param selector element's selector to search for attribute
   * @param attributeName attribute name to search for
   */
  function getAttributeAndVerify(selector: string, attributeName: string): string {
    Reporter.debug(`Get Attribute '${attributeName}' in element '${selector}' And Verify not null.`);
    isExist(selector);

    // @ts-ignore
    const stringResults: string = $$(selector).length === 1 ? $(selector).getAttribute(attributeName) : undefined;

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
  export function expectAttributeValue(selector: string, attributeName: string, value: string): void {
    Reporter.debug(`Validate element '${selector}' has attribute '${attributeName}' which contains '${value}'`);
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
  export function expectNoAttributeValue(selector: string, attributeName: string, value: string): void {
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
      throw new Error(`Some of the strings or all are null. fullText: '${fullText}', word: '${word}`);
    }
    // escape special characters from user input
    const wordEscapedChars: string = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    const regexStr: string = `(^|\\s)${wordEscapedChars}(?=\\s|$)`;

    return new RegExp(regexStr).test(fullText);
  }

  /**
   * Get cssProperty value by it's name and element selector
   * @param selector element selector
   * @param cssPropertyName  css property name
   */
  export function getCssProperty(selector: string, cssPropertyName: string): CSSProperty {
    Reporter.debug(`Get css property '${cssPropertyName}' from element by '${selector}'`);

    return tryBlock(
      () => $(selector).getCSSProperty(cssPropertyName),
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
  export function setCookie(cookie: Cookie, domain?: string): void {
    if (domain !== undefined) {
      cookie.domain = domain;
    }
    Reporter.debug(`Setting cookie: '${JSON.stringify(cookie)}'`);
    browser.setCookies(cookie);
  }

  /**
   * Get current Url
   */
  export function getUrl(): string {
    const currentUrl: string = tryBlock(() => browser.getUrl(), 'Failed to get current url');
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

    tryBlock(
      () =>
        browser.waitUntil(() => {
          try {
            return expectedText === browser.getAlertText();
          } catch (e) {
            return false;
          }
        }),
      "Incorrect alert's text or alert not found."
    );
  }

  /**
   *
   * @param selector - element for get size
   */
  export function getElementSize(selector: string): SizeReturn {
    Reporter.debug(`Get Element: '${selector}' size`);
    waitForDisplayed(selector);

    return $(selector).getSize();
  }

  /**
   * Change size of browser window
   * @param width - Width (px)
   * @param height - Height (px)
   */
  export function setWindowSize(width: number, height: number): void {
    Reporter.debug(`Set window size to '${width}X${height}'`);
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

  export function getWindowSize(): object {
    Reporter.debug('Get window size');
    if (browser.capabilities.browserName === 'chrome') {
      return tryBlock(() => browser.getWindowSize(), 'Chrome: Failed to get window size');
    }

    if (browser.capabilities.browserName === 'firefox') {
      return tryBlock(() => browser.getWindowRect(), 'FireFox: Failed to get window size');
    }

    throw new TypeError('Unable to execute due to unsupported Browser');
  }

  /**
   *
   * @param mouseButton -  {LEFT = 0, MIDDLE = 1 , RIGHT = 2}
   */
  export function pressMouseButton(mouseButton: MouseButton): void {
    //Defaults to the left mouse button if not specified.
    const selectedMouseButton: number = mouseButton === undefined ? MouseButton.LEFT : mouseButton;
    Reporter.step(`Click mouse button '${selectedMouseButton}'`);
    browser.buttonDown(selectedMouseButton);
  }

  /**
   * @param selector - element to move to, If not specified or is null, the offset is relative to current position of the mouse.
   * @param xOffset - X (Pixels) offset to move to, relative to the top-left corner of the element If not specified, the mouse will move to the middle of the element.
   * @param yOffset - Y (Pixels) offset to move to, relative to the top-left corner of the element. If not specified, the mouse will move to the middle of the element.
   */
  export function moveMouseCursorTo(selector: string, xOffset: number, yOffset: number): void {
    Reporter.debug(`Move mouse cursor to element: '${selector}' with offset '${xOffset},${yOffset}'`);

    isExist(selector);
    $(selector).moveTo(xOffset, yOffset);
  }

  /**
   * @param mouseButton -  {LEFT = 0, MIDDLE = 1 , RIGHT = 2}
   */
  export function releaseMouseButton(mouseButton: number): void {
    //Defaults to the left mouse button if not specified.
    const selectedMouseButton: number = mouseButton === undefined ? MouseButton.LEFT : mouseButton;
    Reporter.step(`Release mouse button '${selectedMouseButton}'`);
    browser.buttonUp(selectedMouseButton);
  }

  /**
   * Determine an element’s location on the page. The point (0pix, 0pix) refers to the upper-left corner of the page.
   * @param selector  - element with requested position offset
   */
  export function getElementLocation(selector: string): LocationReturn {
    Reporter.debug(`Get Element location '${selector}'`);

    return $(selector).getLocation();
  }

  /**
   * Send a sequence of key strokes to the active element
   * it can be single key or an array of keys
   * @param keysToSend key, array of keys or string array (chars) to send
   */
  export function sendKeys(keysToSend: SpecialKeys | SpecialKeys[] | string): void {
    if (typeof keysToSend !== 'string') {
      Reporter.debug(`Sending Keys ${getKeyNames(keysToSend)}`);
    } else {
      const charsToSend: string[] = keysToSend.split('');
      Reporter.debug(`Sending Keys ${charsToSend}`);
    }

    browser.keys(keysToSend);
  }

  /**
   * Verify zip content, by inspecting the file names in zip
   * Sends GET request using provided url, and parse the result as zip file
   * if expectedNumbOfFiles not provided, will only verify that expected file names are in zip
   * Otherwise will also validate the size is fit
   * @param linkToZipFile link to zip file
   * @param listOfFileNames list of files names expected in zip
   * @param expectedNumOfFiles (optional) expected number of files in zip
   */
  export function verifyFilesInZip(
    linkToZipFile: string,
    listOfFileNames: string[],
    expectedNumOfFiles?: number
  ): void {
    Reporter.debug('===Verify zip content===');

    const zipFileNames: string[] = zipToFileNames(linkToZipFile);

    if (expectedNumOfFiles !== undefined && expectedNumOfFiles !== zipFileNames.length) {
      const incorrectLengthErrorMessage: string = `Incorrect number of files. Expected '${expectedNumOfFiles}', actual '${
        zipFileNames.length
      }'`;
      Reporter.error(incorrectLengthErrorMessage);
      throw new Error(incorrectLengthErrorMessage);
    }

    if (!listOfFileNames.every((fileName: string) => zipFileNames.includes(fileName))) {
      const incorrectListErrorMessage: string = `Zip content not as expected. Expected [${listOfFileNames.toString()}], actual [${zipFileNames.toString()}]`;
      Reporter.error(incorrectListErrorMessage);
      throw new Error(incorrectListErrorMessage);
    }
  }

  /**
   * Send get request to the provided link
   * Parse the response body with zip
   * and return an array with file names from the zip file
   */
  function zipToFileNames(linkToZipFile: string): string[] {
    // tslint:disable-next-line: promise-function-async
    const zipBuffer: Buffer = browser.call(() => {
      return requestPromiseNative({
        method: 'GET',
        // tslint:disable-next-line: no-null-keyword
        encoding: null,
        uri: linkToZipFile,
      })
        .then((responseValue: Buffer) => responseValue)
        .catch(() => {
          const errorMessage: string = `Failed to get zip file from '${linkToZipFile}'`;
          Reporter.error(errorMessage);
          throw new Error(errorMessage);
        });
    });
    const zip: admZip = new admZip(zipBuffer);
    const zipEntries: IZipEntry[] = zip.getEntries();

    return zipEntries
      .filter((entry: IZipEntry) => entry.entryName.charAt(entry.entryName.length - 1) !== '/')
      .map((entry: IZipEntry) => entry.entryName);
  }

  /**
   * Get name of the enum keys
   * For reporter log propose in order to log what keys were send
   * @param keysToSend key/keys of SpecialKeys type
   */
  function getKeyNames(keysToSend: SpecialKeys | SpecialKeys[] | string): string {
    let retVal: string = '';
    for (const currKey of keysToSend) {
      const curr: string = Object.keys(SpecialKeys).find((key: string) => SpecialKeys[key] === currKey);
      retVal = retVal.concat(`${curr}+`);
    }

    return retVal.substring(0, retVal.length - 1);
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
