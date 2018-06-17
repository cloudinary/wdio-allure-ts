# WebdriverIO + Allure reporter + TypesScript 
------------
[![Build Status](https://travis-ci.org/cloudinary/wdio-allure-ts.svg?branch=master)](https://travis-ci.org/cloudinary/wdio-allure-ts)

Util that blends [WebdriverIO](http://webdriver.io/ "WebdriverIO"), [TypeScript](https://www.typescriptlang.org/ "TypeScript") and [Allure Reporter ](https://github.com/webdriverio/wdio-allure-reporter "Allure Reporter ") in to end-to-end UI testing solution. It wraps the most common WebdriverIO actions, generating intuitive error messages in case of failure, custom logs for the Allure Reporter, more validations for enhanced stability, and last, but not least, IntelliSense.

## Project Structure
### Reporter
Logs to both terminal and allure reporter
### BrowserUtils
WebdriverIO actions wrapper for cleaner tests and pages implementation with logs and stability improvements.
### TestUtils
Common utils for tests (for example getRandomString)
### SpecialKeys
Holds keyboard's special keys

## Ready to Try?
Check out a [sample project](https://github.com/cloudinary/wdio-allure-ts-example) with a quick introduction to our framework and its usage on a real-world application 


