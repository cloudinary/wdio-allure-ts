import allureReporter from '@wdio/allure-reporter';
import { Cookie } from '@wdio/protocols/build/types';
import admZip, { IZipEntry } from 'adm-zip';
import axios, { AxiosResponse } from 'axios';
import { assert } from 'chai';
import * as fs from 'fs';
import { EOL } from 'os';
import path from 'path';
import { inspect } from 'util';
import { Result, WdioCheckElementMethodOptions } from 'wdio-image-comparison-service';
import {
  ClickOptions,
  DragAndDropCoordinate,
  MoveToOptions,
  ParsedCSSValue,
  WaitForOptions,
  WaitUntilOptions,
} from 'webdriverio';
import { Location } from 'webdriverio/build/commands/element/getLocation';
import { Size } from 'webdriverio/build/commands/element/getSize';
import { SpecialKeys } from '..';
import { MouseButton } from '../enums/MouseButton';
import { SelectorType } from '../enums/SelectorType';
import { Reporter } from './Reporter';

const DEFAULT_TIME_OUT: number =
  process.env.DEFAULT_TIME_OUT === undefined ? 60000 : Number(process.env.DEFAULT_TIME_OUT);

export interface IComparisonPath {
  baselinePath: string;
  actualPath: string;
  diffPath: string;
}

/**
 * BrowserUtils wraps wdio browser functionality for cleaner test
 */
export namespace BrowserUtils {
  /**
   * Check element's visualisation
   * For more information see https://github.com/wswebcreation/wdio-image-comparison-service
   * @param elementSelector selector of the element to check
   * @param imageFileName file name to compare with
   * @param options additional options for checker
   */
  export function checkElement(elementSelector: string, imageFileName: string, options: object = {}): void {
    Reporter.step('Compare');
    waitForDisplayed(elementSelector);

    Reporter.debug(`Compare element '${imageFileName}' with selector '${elementSelector}' and options ${options}`);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const compareResult: number = browser.checkElement($(elementSelector), imageFileName, options);

    if (compareResult !== 0) {
      throw new Error(`Found ${compareResult}% difference. See attached images`);
    }
  }

  /**
   * Inject a snippet of JavaScript into the page
   * for execution in the context of the currently selected frame
   * @param script - js script to execute in string format
   */
  export function execute(script: string): string {
    Reporter.debug(`Executing script: '${script}'`);
    return tryBlock(() => browser.execute(script), `Failed to execute script: ${script}`);
  }

  /**
   *  This Method will scroll to element into view
   * @param selector - element locator
   */
  export function scrollIntoView(selector: string): void {
    Reporter.debug(`Scroll to: '${selector}'`);

    tryBlock(() => {
      const scrollToJS: string = `document.evaluate("${selector}", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.scrollIntoView()`;
      execute(scrollToJS);
    }, `Failed to scroll to element: [${selector}]`);
  }

  /**
   * Add a value to an element located by selector
   * @param selector element selector
   * @param  value value to add
   */
  export function addValue(selector: string, value: string | number): void {
    Reporter.debug(`Add value: '${value}' to '${selector}'`);
    waitForEnabled(selector);
    tryBlock(() => $(selector).addValue(value), `Failed to add value: '${value}' to '${selector}'`);
  }

  /**
   * Clear a <textarea> or text <input> element’s value
   * @param selector element selector
   */
  export function clearValue(selector: string): void {
    Reporter.debug(`Clear text in '${selector}'`);
    waitForDisplayed(selector);
    tryBlock(() => $(selector).clearValue(), `Failed to clear value in '${selector}'`);
  }

  /**
   * Set a value to an element located by selector
   * @param selector element selector
   * @param value - value to add
   */
  export function setValue(selector: string, value: string | number): void {
    Reporter.debug(`Set element '${selector} with value: '${value}'`);
    waitForEnabled(selector);
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
    waitForExist(selector);
    tryBlock(() => $(selector).setValue(value), `Failed to set value: '${value}' to '${selector}'`);
  }

  /**
   * Click on an element.
   *
   * Note: This issues a WebDriver click command for the selected element, which generally scrolls to and then clicks the selected element.
   * However, if you have fixed-position elements (such as a fixed header or footer) that cover up the selected element after it is scrolled within the viewport,
   * the click will be issued at the given coordinates, but will be received by your fixed (overlaying) element. In these cased the following error is thrown:
   * Element is not clickable at point (x, x). Other element would receive the click: ..."
   * To work around this, try to find the overlaying element and remove it via execute command so it doesn't interfere the click.
   * You also can try to scroll to the element yourself using scroll with an offset appropriate for your scenario.
   *
   * Validate element is visible before clicking on it
   * @param selector element selector
   * @param options { button, x, y } are optional. button can be one of [0, "left", 1, "middle", 2, "right"]
   */
  export function click(selector: string, options?: ClickOptions): void {
    Reporter.debug(`Click an element '${selector}'`);
    waitForEnabled(selector);

    waitForClickable(selector);
    tryBlock(
      () => $(selector).click(options),

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
    waitForClickable(selector);
    tryBlock(() => $(selector).doubleClick(), `Failed to doubleClick in '${selector}'`);
  }

  /**
   * Navigate to given url with validation
   * to insure the navigation actually happened
   * @param url url for navigation
   */
  export function url(url: string): void {
    Reporter.debug(`Navigate to '${url}'`);
    tryBlock(() => browser.url(url), `Failed to navigate to '${url}'`);
  }

  /**
   * Refresh browser's page
   */
  export function refresh(): void {
    Reporter.debug('Refresh browser page');
    tryBlock(
      () => browser.refresh(),

      'Failed to refresh the page'
    );
  }

  /**
   * Click browser's back button
   */
  export function back(): void {
    Reporter.debug('Click browser back button');
    tryBlock(() => browser.back(), 'Failed to click browser back button');
  }

  /**
   * Wait for url to be equal to given url
   * Mainly useful for navigation validation
   * @param url expected current url
   */
  export function waitForUrl(url: string): void {
    const expectedUrl: string = normalizeUrl(url);
    Reporter.debug(`Wait for URL to be , '${expectedUrl}'`);
    browser.waitUntil(
      (): boolean => {
        return expectedUrl === normalizeUrl(getUrl());
      },
      {
        timeout: DEFAULT_TIME_OUT,
        timeoutMsg: `Url not as expected '${expectedUrl}'`,
      }
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
    if (url === null || url === undefined) {
      throw new Error(`Illegal URL: '${url}'`);
    }

    return url.replace(/\/+$/, '');
  }

  /**
   *  Wait Until - Will Return true in case condition met within the timeout or false if condition isn't met or not met within the timeout
   * @param condition condition to wait on
   * @param options WaitForOptions options (optional) { timeout, timeoutMsg, interval }
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function waitUntil(condition: () => any, options?: WaitUntilOptions): any {
    return browser.waitUntil(() => condition(), { ...{ timeout: DEFAULT_TIME_OUT }, ...options });
  }

  /**
   * Select option with a specific value
   * @param selector elements selector
   * @param attribute attribute of option element to get selected
   * @param value value of option element to get selected
   */
  export function selectByAttribute(selector: string, attribute: string, value: string | number): void {
    Reporter.debug(`Select by value '${value}' of attribute '${attribute}'
                    from '${selector}'`);
    waitForExist(selector);

    tryBlock(
      () => $(selector).selectByAttribute(attribute, value),
      `Failed to select value ${value} of attribute ${attribute} from ${selector}`
    );
  }

  /**
   * Return true or false if the selected DOM-element is enabled
   * @param selector - element selector
   */
  export function isEnabled(selector: string): boolean {
    Reporter.debug(`Is element enabled '${selector}'`);

    return $(selector).isEnabled();
  }

  /**
   *  Wait for element to be enabled
   * @param selector element selector
   * @param options WaitForOptions options (optional) { timeout, reverse, timeoutMsg, interval }
   */
  export function waitForEnabled(selector: string, options?: WaitForOptions): void {
    Reporter.debug(`Wait for an element to be enabled '${selector}'`);
    waitForDisplayed(selector, options);
    /**
     * If no options passed or options does not include timout, default timeout will be used
     */
    tryBlock(
      () => $(selector).waitForEnabled({ ...{ timeout: DEFAULT_TIME_OUT }, ...options }),
      `Element not enabled '${selector}'`
    );
  }

  /**
   * Return true if the selected DOM-element is displayed
   * @param selector - element selector
   */
  export function isDisplayed(selector: string): boolean {
    Reporter.debug(`Is element visible by '${selector}'`);

    return $(selector).isDisplayed();
  }

  /**
   * Wait for an element to be visible by given selector
   * @param selector element selector
   * @param options WaitForOptions options (optional) { timeout, reverse, timeoutMsg, interval }
   */
  export function waitForDisplayed(selector: string, options?: WaitForOptions): void {
    Reporter.debug(`Wait for an element to be visible '${selector}'`);
    if (options?.reverse) {
      waitForExist(selector, options);
    }
    tryBlock(
      () => $(selector).waitForDisplayed({ ...{ timeout: DEFAULT_TIME_OUT }, ...options }),
      `Element not visible '${selector}'`
    );
  }

  /**
   * Wait for an element to be exist by given selector
   * @param selector element selector
   * @param options WaitForOptions options (optional) { timeout, reverse, timeoutMsg, interval }
   */
  export function waitForExist(selector: string, options?: WaitForOptions): void {
    Reporter.debug(`Expect an element exist '${selector}'`);
    tryBlock(
      () => $(selector).waitForExist({ ...{ timeout: DEFAULT_TIME_OUT }, ...options }),
      `Wait for exist '${selector}' with options ${JSON.stringify(options)} failed`
    );
  }

  /**
   * Change focus to another frame on the page. If the frame id is null,
   * the server should switch to the page's default content.
   *
   * @param selector selector of frame to switch to
   */
  export function switchToFrame(selector: string): void {
    Reporter.debug(`Validate iframe with selector ${selector} exist`);
    waitForExist(selector);

    Reporter.debug(`Switching to an Iframe by selector '${selector}'`);
    tryBlock(() => browser.switchToFrame($(selector)), 'Failed to switch frame');
  }

  /**
   * The Switch To Window command is used to select the current top-level browsing context for the current session,
   * i.e. the one that will be used for processing commands.
   *
   * @param handle a string representing a window handle, should be one of the strings that was returned in a call to getWindowHandles
   */
  export function switchToWindow(handle: string): void {
    Reporter.debug(`Switching window by id: '${handle}'`);

    tryBlock(() => browser.switchToWindow(handle), `Failed switch to window by id: '${handle}'`);
  }

  /**
   * The Get Window Handles command returns a list of window handles for every open top-level browsing context.
   * The order in which the window handles are returned is arbitrary.
   */
  export function getWindowHandles(): Array<string> {
    Reporter.debug('Get all ids of all open tabs');

    return tryBlock(() => browser.getWindowHandles(), 'Failed to get window handles');
  }

  /**
   * Change focus to the parent context.
   * If the current context is the top level browsing context, the context remains unchanged.
   */
  export function switchToParentFrame(): void {
    Reporter.debug(`Switching to parent frame`);

    tryBlock(() => browser.switchToParentFrame(), 'Failed to switch to parent frame');
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
  export function findElements(selectorType: SelectorType, selector: string): Array<string> {
    return tryBlock(() => browser.findElements(selectorType, selector), 'Failed to find elements');
  }

  /**
   * Wait for text of an element
   * Actual texts EOL replaced with spaces, for better test readability, so you need to path one line string
   * Note: element should be visible, otherwise will return empty string(selenium requirement)
   * @param selector element selector with text
   * @param expectedText expected text
   */
  export function waitForText(selector: string, expectedText: string): void {
    Reporter.debug(`Wait for text '${expectedText}' of element by selector '${selector}'`);
    waitForDisplayed(selector);
    const elementWithText: WebdriverIO.Element = $(selector);
    tryBlock(
      () =>
        browser.waitUntil(() => {
          return elementWithText.getText() === expectedText;
        }),
      `Expected text in element by selector '${selector}' not found.`
    );
  }

  /**
   * Get the value of a <textarea>, <select> or text <input> found by given selector.
   * If multiple elements are found via the given selector,
   * an array of values is returned instead. For input with checkbox or radio type use isSelected.
   * @param selector element's selector
   */
  export function getValue(selector: string): string {
    Reporter.debug(`Get element's value by selector '${selector}'`);
    waitForDisplayed(selector);

    return tryBlock(() => $(selector).getValue(), `Failed to get value from element '${selector}'`);
  }

  /**
   * Get the text content from a DOM-element.
   * Make sure the element you want to request the text from is interactable
   * otherwise you will get an empty string as return value.
   * @param selector element's selector
   */
  export function getText(selector: string): string {
    Reporter.debug(`Get element's text by selector '${selector}'`);
    waitForDisplayed(selector);

    return tryBlock(() => $(selector).getText(), `Failed to get text from element '${selector}'`);
  }

  /**
   * Wait for number of elements found by selector to equal expected number
   * In case of expectedNumber is 0, validates no elements with given selector displayed
   *
   * @param selector selector of items to count
   * @param expectedNumber expected number of items
   */
  export function waitForNumberOfElements(selector: string, expectedNumber: number): void {
    Reporter.debug(`Wait for number '${expectedNumber}' of elements by selector '${selector}'`);
    if (expectedNumber === 0) {
      waitForDisplayed(selector, { reverse: true });
    }

    tryBlock(
      () =>
        browser.waitUntil(() => {
          return findElements(SelectorType.XPATH, selector).length === expectedNumber;
        }),
      `Found number of elements by '${selector}' not equal '${expectedNumber}'`
    );
  }

  /**
   * Scroll to an item in list
   *
   * Scroll in loop until the element is visible or fail on time out
   * Checks for size of list every iteration in case list is lazy loaded
   * @param selector selector of an element to scroll to
   * @param listSelector selector of list to scroll
   */
  export function scrollToItemInList(selector: string, listSelector: string): void {
    Reporter.debug(`Scroll in list '${listSelector}' until element '${selector}' is visible.`);

    waitForExist(listSelector); // need to verify list is loaded
    if (isDisplayed(selector)) {
      return;
    }
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
          execute(scrollToJS);

          last = getNumberOfElements(listSelector);

          return $(selector).isDisplayed();
        }),
      `Failed to scroll to ${selector} in ${listSelector}`
    );
  }

  /**
   * Scrolls the element to a particular place.
   * @param selector element selector
   * @param x is the pixel along the horizontal axis of the element.
   * @param y is the pixel along the vertical axis of the element.
   * @private
   */
  export function scrollTo(selector: string, x: number, y: number): void {
    waitForDisplayed(selector);
    const script: string = `(document.evaluate("${selector}", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).scroll(${x}, ${y})`;
    execute(script);
  }

  /**
   *
   * @param iframeSelector iFrame selector
   * @param expectedVisibility expected visibility status
   */
  export function isIframeVisible(iframeSelector: string, expectedVisibility: boolean): void {
    Reporter.debug(`Check iframe visibility is '${expectedVisibility}'`);

    switchToParentFrame(); // if iframe already focused, isExist will fail
    waitForExist(iframeSelector);

    const cssDisplayProperty: string = 'display';
    const iframeDisplayProperty: ParsedCSSValue = tryBlock(
      () => $(iframeSelector).getCSSProperty(cssDisplayProperty), // iframe css
      `Failed to get '${cssDisplayProperty}' css property from '${iframeSelector}'`
    );

    const iframeVisibility: boolean = iframeDisplayProperty.value === 'block'; // css display value. block == visible, none == not visible

    if (iframeVisibility !== expectedVisibility) {
      assert.fail(
        `Failed on iframe '${iframeSelector}' visibility validation. ${EOL} Expected: '${expectedVisibility}' ${EOL} Actual: '${iframeVisibility}'`
      );
    }
  }

  /**
   * Get an attribute from a DOM-element based on the attribute name.
   * @param selector element's selector to search for attribute
   * @param attributeName requested attribute name
   */
  export function getAttribute(selector: string, attributeName: string): string {
    waitForExist(selector);
    return tryBlock(
      () => $(selector).getAttribute(attributeName),
      `Failed to get '${attributeName}' attribute from '${selector}'`
    );
  }

  /**
   * Wait for value of element to be as requested
   * @param selector element's selector to check the value
   * @param value expected value
   */
  export function waitForValue(selector: string, value: string): void {
    Reporter.debug(`Validate element '${selector}' has value of '${value}'`);
    let currValue: string;

    tryBlock(
      () =>
        browser.waitUntil(() => {
          currValue = getValue(selector);

          return currValue.trim() === value;
        }),
      `Incorrect value '${currValue}' from '${selector}' ${EOL}Expected: value '${value}' not found`
    );
  }

  /**
   * Wait for attribute to contain requested value
   * @param selector element's selector to search for attribute
   * @param attributeName attribute name to search for
   * @param value value in attribute
   * @param revert indicate either the requested value should or should not be contained
   */
  export function waitForAttributeValue(
    selector: string,
    attributeName: string,
    value: string,
    revert: boolean = false
  ): void {
    Reporter.debug(
      `Validate element '${selector}' has ${revert ? 'not ' : ''}attribute '${attributeName}' that contains '${value}'`
    );
    let attributeValue: string;

    tryBlock(
      () =>
        browser.waitUntil(() => {
          attributeValue = getAttribute(selector, attributeName);

          return revert != isContainWord(attributeValue, value);
        }),
      `Incorrect attribute '${attributeName}' value from '${selector}'`
    );
  }

  /**
   * Wait for page to load.
   * Inject event listener that waits for document.readyState === 'complete'
   *
   * @param additionalWaitAfterLoad - Since this will be used mostly for image comparison, additional timeout
   * added with default value of 1000 milliseconds
   */
  export function waitForPageToLoad(additionalWaitAfterLoad: number = 1000): void {
    Reporter.debug("Wait for document.readyState === 'complete'");
    browser.waitUntil(() => browser.execute("return document.readyState === 'complete'"), {
      timeout: DEFAULT_TIME_OUT,
      timeoutMsg: "document.readyState !== 'complete'",
    });

    Reporter.debug(`Pause for ${additionalWaitAfterLoad} milliseconds`);
    browser.pause(additionalWaitAfterLoad);
  }

  /**
   * Check if word is a substring of given text
   * @param fullText string to search in
   * @param word word to search
   */
  function isContainWord(fullText: string, word: string): boolean {
    if (fullText === null || word === null) {
      assert.fail(`Some of the strings or all are null. fullText: '${fullText}', word: '${word}`);
    }
    // escape special characters from user input
    const wordEscapedChars: string = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    const regexStr: string = `(^|\\s)${wordEscapedChars}(?=\\s|$)`;

    return new RegExp(regexStr).test(fullText);
  }

  /**
   * Get a css property from a DOM-element selected by given selector.
   * The return value is formatted to be testable.
   * Colors gets parsed via rgb2hex and all other properties get parsed via css-value.
   * @param selector element selector
   * @param cssPropertyName  css property name
   */
  export function getCssProperty(selector: string, cssPropertyName: string): ParsedCSSValue {
    Reporter.debug(`Get css property '${cssPropertyName}' from element by '${selector}'`);

    return tryBlock(
      () => $(selector).getCSSProperty(cssPropertyName),
      `Failed to get css Property '${cssPropertyName}' from '${selector}'`
    );
  }

  /**
   * Sets one or more cookies for the current page.
   * Make sure you are on the page that should receive the cookie.
   * You can't set a cookie for an arbitrary page without being on that page.
   *
   * If no domain provided, will set cookie for current domain
   * Otherwise will first navigate to required domain(should be valid url),
   *  set the cookie and navigate back to page it started from
   * @param cookie cookie to set
   */
  export function setCookies(cookie: Cookie | Array<Cookie>): void {
    Reporter.debug(`Setting cookies: '${JSON.stringify(cookie)}'`);
    browser.setCookies(cookie);
  }

  /**
   * Retrieve a cookie visible to the current page
   * You can query a specific cookie by providing the cookie name or
   * retrieve all.
   */
  export function getCookies(names?: Array<string> | string): Array<Cookie> {
    Reporter.debug('Get cookies:');
    const cookies: Array<Cookie> = tryBlock(() => browser.getCookies(names), 'Failed to get cookies');
    Reporter.debug(JSON.stringify(cookies));

    return cookies;
  }

  /**
   * Delete cookies visible to the current page.
   * By providing a cookie name it just removes the single cookie or more when multiple names are passed
   * @param names names of cookies to be deleted (optional)
   */
  export function deleteCookies(names?: Array<string> | string): void {
    Reporter.debug('Delete cookies:');
    const cookie: Array<Cookie> = tryBlock(() => browser.deleteCookies(names), 'Failed to get cookie');
    Reporter.debug(JSON.stringify(cookie));
  }

  /**
   * The Get Current URL command returns the URL of the current top-level browsing context.
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
   * Wait for alert's text to equal requested text
   * @param expectedText requested alert's text
   */
  export function waitForAlertText(expectedText: string): void {
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
   * Get the width and height for an DOM-element.
   * @param selector requested element selector
   */
  export function getSize(selector: string): Size {
    Reporter.debug(`Get Element: '${selector}' size`);
    waitForDisplayed(selector);

    return $(selector).getSize();
  }

  /**
   * Resizes browser window outer size according to provided width and height.
   * @param width - Width (px)
   * @param height - Height (px)
   */
  export function setWindowSize(width: number, height: number): void {
    Reporter.debug(`Set window size to '${width}X${height}'`);
    tryBlock(() => browser.setWindowSize(width, height), 'Chrome: Failed to resize window');
  }

  /**
   * Returns browser window size.
   * output example `{ width: 1280, height: 767 }`
   */
  export function getWindowSize(): object {
    Reporter.debug('Get window size');
    return tryBlock(() => browser.getWindowSize(), 'Failed to get window size');
  }

  /**
   * Click and hold the left mouse button (at the coordinates set by the last moveto command).
   * Note that the next mouse-related command that should follow is buttonup.
   * Any other mouse command (such as click or another call to buttondown) will yield undefined behaviour
   * @param mouseButton -  which button, enum: LEFT = 0, MIDDLE = 1 , RIGHT = 2, defaults to the left mouse button if not specified
   */
  export function buttonDown(mouseButton?: MouseButton): void {
    Reporter.step(`Click mouse button down '${mouseButton ? MouseButton.LEFT : mouseButton}'`);
    browser.buttonDown(mouseButton);
  }

  /**
   * Move the mouse by an offset of the specified element.
   * If no element is specified, the move is relative to the current mouse cursor.
   * If an element is provided but no offset, the mouse will be moved to the center of the element.
   * If the element is not visible, it will be scrolled into view
   * @param selector element to move to, If not specified or is null, the offset is relative to current position of the mouse.
   * @param options moveTo command options. options example {xOffset: 5, yOffset: 6}
   */
  export function moveTo(selector: string, options?: MoveToOptions): void {
    Reporter.debug(`Move mouse cursor to element: '${selector}' with offset '${JSON.stringify(options)}'`);

    waitForExist(selector);
    $(selector).moveTo(options);
  }

  /**
   * Releases the mouse button previously held (where the mouse is currently at).
   * Must be called once for every buttondown command issued.
   * See the note in click and buttondown about implications of out-of-order commands.
   * @param mouseButton enum: LEFT = 0, MIDDLE = 1, RIGHT = 2, defaults to the left mouse button if not specified
   */
  export function buttonUp(mouseButton: number): void {
    Reporter.step(`Release mouse button '${mouseButton ? MouseButton.LEFT : mouseButton}'`);
    browser.buttonUp(mouseButton);
  }

  /**
   * Determine an element’s location on the page. The point (0pix, 0pix) refers to the upper-left corner of the page.
   * @param selector element with requested position offset
   */
  export function getLocation(selector: string): Location {
    Reporter.debug(`Get element's location '${selector}'`);

    return $(selector).getLocation();
  }

  /**
   * Get number of elements in dom by selector
   *
   * @param selector - selector of elements to count
   */
  export function getNumberOfElements(selector: string): number {
    Reporter.debug(`Get number of elements by selector '${selector}'`);

    return findElements(SelectorType.XPATH, selector).length;
  }

  /**
   * Send a sequence of key strokes to the active element.
   * You can also use characters like "Left arrow" or "Back space".
   * WebdriverIO will take care of translating them into unicode characters.
   * it can be single key or an array of keys
   * @param keysToSend key, array of keys or string array (chars) to send
   */
  export function keys(keysToSend: SpecialKeys | Array<SpecialKeys> | string | Array<string>): void {
    Reporter.debug(`Sending Keys ${keysToSend}`);

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
    listOfFileNames: Array<string>,
    expectedNumOfFiles?: number
  ): void {
    Reporter.debug('===Verify zip content===');

    const zipFileNames: Array<string> = zipToFileNames(linkToZipFile);

    if (expectedNumOfFiles !== undefined && expectedNumOfFiles !== zipFileNames.length) {
      const incorrectLengthErrorMessage: string = `Incorrect number of files. Expected '${expectedNumOfFiles}', actual '${zipFileNames.length}'`;
      Reporter.error(incorrectLengthErrorMessage);
      assert.fail(incorrectLengthErrorMessage);
    }

    if (!listOfFileNames.every((fileName: string) => zipFileNames.includes(fileName))) {
      const incorrectListErrorMessage: string = `Zip content not as expected. Expected [${listOfFileNames.toString()}], actual [${zipFileNames.toString()}]`;
      Reporter.error(incorrectListErrorMessage);
      assert.fail(incorrectListErrorMessage);
    }
  }

  /**
   * Drag an item to a destination element or position.
   *
   * Validate element is visible before drag and drop it
   * @param selector element selector
   * @param target destination element selector or object with x and y properties
   */
  export function dragAndDrop(selector: string, target: string | DragAndDropCoordinate): void {
    Reporter.debug(`Drag and drop element '${selector}' to ${inspect(target)}.`);
    const isTargetSelector: boolean = typeof target === 'string';

    waitForDisplayed(selector);
    if (isTargetSelector) {
      waitForExist(target as string);
    }
    tryBlock(
      () => $(selector).dragAndDrop(isTargetSelector ? $(target as string) : (target as DragAndDropCoordinate)),
      `Failed to drag and drop ${selector} to '${inspect(target)}'`
    );
  }

  /**
   * Send get request to the provided link
   * Parse the response body with zip
   * and return an array with file names from the zip file
   */
  function zipToFileNames(linkToZipFile: string): Array<string> {
    const zipBuffer: Buffer = <Buffer>browser.call(async () => {
      return await axios
        .get(linkToZipFile, { responseType: 'arraybuffer' })
        .then((response: AxiosResponse) => {
          return response.data;
        })
        .catch(() => {
          const errorMessage: string = `Failed to get zip file from '${linkToZipFile}'`;
          Reporter.error(errorMessage);
          throw new Error(errorMessage);
        });
    });
    const zip: admZip = new admZip(zipBuffer);
    const zipEntries: Array<IZipEntry> = zip.getEntries();

    return zipEntries
      .filter((entry: IZipEntry) => entry.entryName.charAt(entry.entryName.length - 1) !== '/')
      .map((entry: IZipEntry) => entry.entryName);
  }

  /**
   * Throw error with custom error message
   * @param customErrorMessage custom error message
   * @param error original error
   */
  function handleError(customErrorMessage: string, error: Error): void {
    assert.fail(`${customErrorMessage} ${EOL} ${error}`);
  }

  /**
   * Action wrapper
   * Wrap all actions with try catch block
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function tryBlock(action: () => any, errorMessage: string): any {
    try {
      return action();
    } catch (e) {
      handleError(errorMessage, e);
    }
  }

  /**
   * Wait for element to be clickable
   * Will fail if the element not clickable after provided amount of time
   *
   * @param selector - selector of the element to validate
   * @param options - WaitForOptions that can be overridden
   */
  export function waitForClickable(selector: string, options?: WaitForOptions): void {
    Reporter.debug(`Wait for the element '${selector}' to be clickable`);
    tryBlock(
      () => $(selector).waitForClickable(options === undefined ? { timeout: DEFAULT_TIME_OUT } : options),
      `Timeout waiting for element '${selector}' to be clickable`
    );
  }

  /**
   * Checking for image-comparison service and getting config
   */
  function getSnapshotsConfig(): IComparisonPath {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const imageComparisonConfig = browser.config.services.find((service) => service[0] === 'image-comparison')?.[1];
    if (!imageComparisonConfig) {
      throw new Error('cannot get image-comparison service config, make sure you added it to the wdio config file');
    }
    const { baselineFolder, screenshotPath } = imageComparisonConfig;
    const instance = `desktop_${browser.capabilities['browserName']}`;

    return {
      baselinePath: path.join(baselineFolder, instance),
      actualPath: path.join(screenshotPath, 'actual', instance),
      diffPath: path.join(screenshotPath, 'diff', instance),
    };
  }

  /**
   * Comparing image by providing selector of element
   * @param filename filename of image
   * @param selector selector for an element
   * @param options https://github.com/wswebcreation/wdio-image-comparison-service/blob/main/docs/OPTIONS.md#plugin-options
   */
  export function compareWithSnapshot(
    filename: string,
    selector: string,
    options?: WdioCheckElementMethodOptions
  ): void {
    this.waitForDisplayed(selector);
    const compareResult: Result = browser.checkElement($(selector), filename, options);

    if (compareResult !== 0) {
      const { diffPath, actualPath, baselinePath }: IComparisonPath = getSnapshotsConfig();
      allureReporter.addAttachment(
        'Base line',
        fs.readFileSync(path.join(baselinePath, filename + '.png')),
        'image/png'
      );
      allureReporter.addAttachment(
        'Actual image',
        fs.readFileSync(path.join(actualPath, filename + '.png')),
        'image/png'
      );
      allureReporter.addAttachment('Diff image', fs.readFileSync(path.join(diffPath, filename + '.png')), 'image/png');

      throw new Error(`Found ${compareResult}% difference. See attached images`);
    }
    return;
  }
}
