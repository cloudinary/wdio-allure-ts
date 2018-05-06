import { EOL } from "os";
import { Cookie } from "webdriverio";
import { Reporter } from "./Reporter";

/**
 * BrowserUtils wraps wdio browser functionality for cleaner test
 */
export namespace BrowserUtils {
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

    Reporter.debug("Scroll to the bottom of the page");
    scrollToPoint(0, bottom);
  }

  /**
   * Scroll to top of the current page
   */
  export function scrollToTop(): void {
    Reporter.debug("Scroll to the top of the page");
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
      `Incorrect URL. Expected ${expectedUrl} while actual: ${currentUrl}`
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

    return url.replace(/\/+$/, "");
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
      () => browser.waitForVisible(selector),
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
      () => browser.waitForExist(selector),
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
        browser.waitUntil(() => {
          return browser.isVisible(notVisibleElementSelector) === false;
        }),
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
        browser.waitUntil(() => {
          return browser.isExisting(notExistElementSelector) === false;
        }),
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
    Reporter.debug("Switching to an Iframe");
    isExist(iframeSelector);

    Reporter.debug(`Get iframe element ${iframeSelector}`);

    const frameId: WebdriverIO.Element = tryBlock(
      () => browser.element(iframeSelector).value,
      `Failed to get iframeId by ${iframeSelector}`
    );

    Reporter.debug(`Switching to Iframe ${iframeSelector}'`);
    tryBlock(() => browser.frame(frameId), "Failed to switch frame");
    chillOut();
  }

  /**
   * Switch to parent frame
   * Have to call it after switching to some iframe
   * so the focus will be back on main page
   */
  export function switchToParentFrame(): void {
    Reporter.debug("Switching to parent frame");
    tryBlock(() => browser.frameParent(), "Failed to switch to parent frame");
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
    const currText: string = tryBlock(
      () => browser.getText(selector),
      `Failed to get text from element '${selector}'`
    ).replace(/(\n)/gm, " "); // replace EOL with space, for more readable tests strings;

    if (currText !== text) {
      throw new Error(
        `Incorrect text in element by selector '${selector}'. ${EOL} Expected: '${text}' ${EOL} Actual: '${currText}'`
      );
    }
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
          browser.moveToObject(`(${listSelector})[${last}]`);
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

    const cssDisplayProperty: string = "display";
    const iframeDisplayProperty: WebdriverIO.CssProperty = tryBlock(
      () => browser.element(iframeSelector).getCssProperty(cssDisplayProperty), //iframe css
      `Failed to get ${cssDisplayProperty} css property from ${iframeSelector}`
    );

    const iframeVisibility: boolean = iframeDisplayProperty.value === "block"; //css display value. block == visible, none == not visible

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
      () => browser.getAttribute(selector, attributeName),
      `Failed to get ${attributeName} attribute from ${selector}`
    );
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
    const attributeValue: string = getAttribute(selector, attributeName);

    if (!isContainWord(attributeValue, value)) {
      throw new Error(
        `Incorrect attribute '${attributeName}' value from ${selector} ${EOL}
         Expected: ${EOL} word '${value}' to be part of ${EOL}
                 '${attributeValue}'`
      );
    }
  }

  /**
   * Check if attribute with given selector NOT contain expected value
   * @param selector element's selector to search for attribute
   * @param attributeName attribute name to search for
   * @param value value NOT in attribute
   */
  export function expectNoAttributeValue(
    selector: string,
    attributeName: string,
    value: string
  ): void {
    const attributeValue: string = getAttribute(selector, attributeName);

    if (isContainWord(attributeValue, value)) {
      throw new Error(
        `Incorrect attribute '${attributeName}' value from ${selector} ${EOL}
         Expected: ${EOL} word '${value}' NOT to be part of ${EOL}
                 '${attributeValue}'`
      );
    }
  }

  /**
   * Check if word is a substring of given text
   * @param fullText string to search in
   * @param word word to search
   */
  function isContainWord(fullText: string, word: string): boolean {
    // escape special characters from user input
    const wordEscapedChars: string = word.replace(
      /[-\/\\^$*+?.()|[\]{}]/g,
      "\\$&"
    );

    const regexStr: string = `(?<=^|\\s)${wordEscapedChars}(?=\\s|$)`;

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
      "Failed to get current url"
    );
    Reporter.debug(`Get current URL: ${currentUrl}`);

    return currentUrl;
  }

  /**
   * When switching between iframes, without wait it will fail to switch to iframe
   *
   */
  function chillOut(): void {
    Reporter.debug("wait for 300ms");
    browser.pause(300);
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
