# WebdriverIO + Allure reporter + TypesScript

---

[![Build Status](https://travis-ci.org/cloudinary/wdio-allure-ts.svg?branch=master)](https://travis-ci.org/cloudinary/wdio-allure-ts)

Util that blends [WebdriverIO](http://webdriver.io/ "WebdriverIO"), [TypeScript](https://www.typescriptlang.org/ "TypeScript") and [Allure Reporter](https://github.com/webdriverio/wdio-allure-reporter "Allure Reporter") in to end-to-end UI testing solution. It wraps the most common WebdriverIO actions, generating intuitive error messages in case of failure, custom logs for the Allure Reporter, more validations for enhanced stability, and last, but not least, IntelliSense.

##Getting Started
You need to install [Java JDK](https://www.oracle.com/technetwork/java/javase/downloads/index.html) 8 or above, [NodeJS](https://nodejs.org/en/download/")

Supported browsers [Chrome](https://www.google.com/chrome/") and [Firefox](https://www.mozilla.org/en-US/firefox/new/")

## Project Structure

### Reporter

Logs to both terminal and allure report

### BrowserUtils

webdriverIO actions wrapper

### TestUtils

Common utils for tests such as getRandomString()

### SpecialKeys

Holds keyboard's special keys

### Environment variables
```PRINT_LOGS_TO_CONSOLE``` - false by default. only enabled in dev configuration, since parallel tests execution will log to same terminal
```DEFAULT_TIME_OUT``` - timeout for webdriverIO actions. Default value 60 seconds

## Example With Pure WebdriverIO

Now take a look at an example of an action that, after validating that a particular element is visible, clicks it, logs every step to the Reporter, and throws meaningful errors for failures, if any.

```javascript
 const selector: string = "someSelector";
 logger(`Click an element with selector: ${selector}`);
 try {
   logger(`Validate element with selector ${selector} is displayed`);
   browser.isDisplayed(selector);
 } catch (error) {
   throw new Error(`Tried to click not visible element, ${error}`);
 }

 try {
   logger("Perform click action");
   browser.click(selector);
 } catch (error) {
   throw new Error(
     `Failed to click an element by given selector ${selector}. ${error}`
   );
 }
```

Example with `wdio-allure-ts`:

```javascript
const selector: string = "someSelector";
BrowserUtils.click(selector);
```

You can see that wdio-allure-ts offers the same capabilities with much cleaner code. Because it automatically handles logging and error reporting, developers can focus on testing the business logic.
You can add more report logs with a simple Reporter API for log levels: step, debug, error, info, and warning. The logs are displayed on the terminal and reflected in the report.
Example:

```javascript
import { Reporter } from 'wdio-allure-ts';
Reporter.step('Step log entry');
Reporter.error('Error log entry');
```

**Terminal Output**

![Terminal Output](https://cloudinary-res.cloudinary.com/image/upload/f_auto,q_auto/blog/wdio-allure-ts/terminal_report.png)
Note the difference in the highlighted areas between the original report and the one created with `wdio-allure-ts`.
**Original Report**

![Original Report](https://cloudinary-res.cloudinary.com/image/upload/f_auto,q_auto/blog/wdio-allure-ts/allure_report_origin.png)

**wdio-allure-ts Report([live report example](https://cloudinary.github.io/wdio-allure-ts-example/allure-report/index.html)):**

![`wdio-allure-ts` Report](https://cloudinary-res.cloudinary.com/image/upload/f_auto,q_auto/blog/wdio-allure-ts/allure_report_updated.png)



## Ready to Try?

Check out a [sample project](https://github.com/cloudinary/wdio-allure-ts-example) with a quick introduction to our framework and its usage on a real-world application
