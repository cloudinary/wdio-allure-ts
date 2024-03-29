# WebdriverIO + Allure reporter + TypeScript

---

<p align="center">
    <a href="https://github.com/cloudinary/wdio-allure-ts/actions/workflows/ci-pr-merge.yml?query=branch%3Amaster+event%3Apush">
        <img alt="Build Status" src="https://img.shields.io/github/workflow/status/cloudinary/wdio-allure-ts/ci-pr-merge/master">
    </a>
    <a href="https://github.com/webdriverio/cloudinary/wdio-allure-ts/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc">
        <img alt="Open issues" src="http://isitmaintained.com/badge/open/cloudinary/wdio-allure-ts.svg">
    </a>
   <img alt="Version" src="https://img.shields.io/npm/v/wdio-allure-ts">
</p>

Util that blends [WebdriverIO](http://webdriver.io/ 'WebdriverIO')
, [TypeScript](https://www.typescriptlang.org/ 'TypeScript')
and [Allure Reporter](https://github.com/webdriverio/wdio-allure-reporter 'Allure Reporter') in to end-to-end UI testing
solution. It wraps the most common WebdriverIO actions, generating intuitive error messages in case of failure, custom
logs for the Allure Reporter, more validations for enhanced stability, and last, but not least, IntelliSense.

## Getting Started

You need to install [Java JDK](https://www.oracle.com/technetwork/java/javase/downloads/index.html) 8 or
above, [NodeJS](https://nodejs.org/en/download)

Supported browsers [Chrome](https://www.google.com/chrome)

## Setup

### Install this package together with helper packages

```
npm i -D wdio-allure-ts typescript start-server-and-test chai http-server
```

### Setting last Chromedriver version to .env file

```
pnpm setChromeDriverVersion
```

### Add example test

See [Examples](https://github.com/cloudinary/wdio-allure-ts/tree/237b6871b8a94506b5ed22a2da16fd43db79d153/src/test/specs)

or use your own
```typescript
// specs/example_test.spec.ts
import { expect } from 'chai';
import { describeCommon } from '../TestHelper';
import { BrowserUtils } from 'wdio-allure-ts';

const { click, getAttribute, isDisplayed, waitForDisplayed, waitUntil } = BrowserUtils;
const getImgSrc = () => getAttribute('#myimage', 'src');

describeCommon('Test Example', () => {
  beforeEach(async () => {
    // runs before each test in the block
    await click('#displayImage'); //for example
    await waitForDisplayed('#myimage'); //for example
  });

  it('Should display the image', async () => {
    expect(await isDisplayed('#myimage')).to.equal(true);
  });

  it('Image should have some src eventually', async () => {
    const testImgSrc = () => getImgSrc() === 'https://res.cloudinary.com/demo/image/upload/sample';
    await waitUntil(testImgSrc, 'Error message for failing test', 2000);
  });
});
```

### Add tsconfig.json

```json
{
  "include": ["specs/**/*.ts"]
}
```

## Development

#### Install and run tests

`pnpm` install all dependencies

`pnpm start:sampleApp` spin up the sample app page for testing

`pnpm test` executes all tests

`pnpm spec <spec name>`  executes specific spec file

### Environment variables

`PRINT_LOGS_TO_CONSOLE` - false by default. only enabled in dev configuration, since parallel tests execution will log
to same terminal

`DEFAULT_TIME_OUT` - timeout for webdriverIO actions. Default value 60 seconds

`CHROME_DRIVER_VERSION`- version of chromedriver

## Project Structure

### Reporter

Logs to both terminal and allure report

### BrowserUtils

webdriverIO actions wrapper

### TestUtils

Common utils for tests such as getRandomString()

### SpecialKeys

Holds keyboard special keys

### GitUtils

Common utils for git like get the last merged files

### TestRailUtils

Common utils for testrail api like update tests field

### TestFilesUtils

Common utils for managing test files

## Example for TestRailUtils

//Update the Automation field for the last merged tests to Automated

```javascript
try {
  const lastMergedTestsIds = GitUtils.getLastMergedTestsIds();
  TestRailUtil.setTestsAsAutomatedInTestrail(lastMergedTestsIds);
} catch (error) {
  console.log(error);
}
```

## Example With Pure WebdriverIO

Now take a look at an example of an action that, after validating that a particular element is visible, clicks it, logs every step to the Reporter, and throws meaningful errors for failures, if any.

```javascript
const selector: string = 'someSelector';
await logger(`Click an element with selector: ${selector}`);
try {
  await logger(`Validate element with selector ${selector} is displayed`);
  await browser.isDisplayed(selector);
} catch (error) {
  throw new Error(`Tried to click not visible element, ${error}`);
}

try {
  await logger('Perform click action');
  await browser.click(selector);
} catch (error) {
  throw new Error(`Failed to click an element by given selector ${selector}. ${error}`);
}
```

Example with `wdio-allure-ts`:

```javascript
const selector: string = 'someSelector';
await BrowserUtils.click(selector);
```

You can see that wdio-allure-ts offers the same capabilities with much cleaner code. Because it automatically handles logging and error reporting, developers can focus on testing the business logic.
You can add more report logs with a simple Reporter API for log levels: step, debug, error, info, and warning. The logs are displayed on the terminal and reflected in the report.
Example:

```javascript
import { Reporter } from 'wdio-allure-ts';
await Reporter.step('Step log entry');
await Reporter.error('Error log entry');
```

**Terminal Output**

![Terminal Output](https://cloudinary-res.cloudinary.com/image/upload/f_auto,q_auto/blog/wdio-allure-ts/terminal_report.png)
Note the difference in the highlighted areas between the original report and the one created with `wdio-allure-ts`.
**Original Report**

![Original Report](https://cloudinary-res.cloudinary.com/image/upload/f_auto,q_auto/blog/wdio-allure-ts/allure_report_origin.png)

**wdio-allure-ts Report([live report example](https://cloudinary.github.io/wdio-allure-ts-example/allure-report/index.html)):**

![`wdio-allure-ts` Report](https://cloudinary-res.cloudinary.com/image/upload/f_auto,q_auto/blog/wdio-allure-ts/allure_report_updated.png)

## CLI execution

Added an option to execute tests with cli.

cmd:

`node ./lib/helpers/runner.js`

That uses default wdio configuration `wdio.default.conf.js` if no parameters passed.

Additional available cli inputs:

`--specs "test1.js" "test2.js` - tests path separated by space

`--config "customConfig.js"` - path to custom config for wdio execution

CLI example:

`node ./lib/helpers/runner.js --specs 'specs/TEST1.js' 'specs/TEST2.js' --config 'customConf.js'`

## Services

In our package we're using following services:

[Devtools](https://webdriver.io/docs/devtools-service/)
[selenium-standalone](https://webdriver.io/docs/selenium-standalone-service/)

## How to write commit message

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
For commit message, please use a template:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

We use several types:

`fix:` a commit of the type fix patches a bug in your codebase (this correlates with `PATCH` in semantic versioning)
`fix: correct minor typos in code`

`feat:` a commit of the type feat introduces a new feature to the codebase (this correlates with `MINOR` in semantic
versioning)
`feat: add new random function`

`test:` a commit of the type test introduces a new test or correcting existing tests (this correlates with `MINOR` in
semantic versioning)
`test: add new test for random function`

`docs:` commit of the type docs introduces adding/fixing documentation (this correlates with `MINOR` in semantic
versioning)
`docs: correct spelling in README`

`BREAKING CHANGE:` a commit that has a footer BREAKING CHANGE:, or appends a `!` after the type/scope, introduces a
breaking API change (correlating with `MAJOR` in Semantic Versioning).

Commit message with description and breaking change footer

``` 
feat: bump WDIO version to 7
BREAKING CHANGE: bumping new WDIO version to 7
```

or Commit message with ! to draw attention to breaking change
`feat!: bump WDIO version`

Note: A BREAKING CHANGE can be part of commits of any type

## Ready to Try?

Check out a [sample project](https://github.com/cloudinary/wdio-allure-ts-example) with a quick introduction to our
framework and its usage on a real-world application
