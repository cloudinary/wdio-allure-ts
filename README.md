# WebdriverIO + Allure reporter + TypesScript 
------------
[![Build Status](https://travis-ci.org/cloudinary/wdio-allure-ts.svg?branch=master)](https://travis-ci.org/cloudinary/wdio-allure-ts)

Util that wraps main browser webdriverio actions to get a cleaner test code with improved stability and reporting
Targeting E2E UI browser testing with page object model

Uses:
[WebdriverIO](http://webdriver.io/ "WebdriverIO") as a base WebDriver implementation.
[TypeScript](https://www.typescriptlang.org/ "TypeScript") for easier development process.
[Allure Reporter ](https://github.com/webdriverio/wdio-allure-reporter "Allure Reporter ") for nice tests result representation

## Code Structure
### Reporter
Logs to both console log and allure reporter
### BrowserUtils
Wraps webdriverIO for cleaner tests and pages implementation with logs and stability improvements.
**WebDriverIo *browser* object should be used only in this class**
### TestUtils
Common utils for tests (for example getRandomString)
### SpecialKeys
Holds keyboard's special keys


