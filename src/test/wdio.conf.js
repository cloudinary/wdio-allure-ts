const dotenv = require('dotenv');
const { Reporter } = require('../index');
dotenv.config();

const maxChromeInstances = parseInt(process.env.MAX_CHROME_INSTANCES) || 10;
const waitForTimeouts = parseInt(process.env.DEFAULT_TIME_OUT) || 3000;
const seleniumStandaloneArgs = {
  drivers: {
    chrome: {
      version: process.env.CHROME_DRIVER_VERSION,
    },
  },
};
/**
 * Default configurations for wdio-allure-ts based projects
 * For more options see https://webdriver.io/docs/configurationfile.html
 *
 */
exports.config = {
  specs: ['./src/test/specs/**/*Spec.ts'],
  suites: { regression: ['./src/test/specs/**/*Spec.ts'] },

  // Browser capabilities
  capabilities: [
    {
      browserName: 'chrome',
      maxInstances: maxChromeInstances,
      'goog:chromeOptions': {
        args: ['--window-size=1920,1080', '--headless', '--incognito'],
      },
    },
  ],
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'error',
  // Default timeout for all waitFor* commands.
  waitforTimeout: waitForTimeouts,
  //
  // Default timeout in milliseconds for request
  // if Selenium Grid doesn't send response
  connectionRetryTimeout: 60000,

  configDataFilePath: 'src/test/resources/example.json',
  //
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: [
    ['devtools'],
    [
      'selenium-standalone',
      {
        installArgs: seleniumStandaloneArgs,
        args: seleniumStandaloneArgs,
      },
    ],
  ], // Framework you want to run your specs with.
  reporters: [
    [
      'allure',
      {
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        disableMochaHooks: true,
      },
    ],
  ],

  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: http://webdriver.io/guide/testrunner/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 300000,
  },

  /**
   * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   */
  afterTest: function (test, context, { error, result, duration, passed, retries }) {
    /**
     * no need to close skipped tests
     */
    if (test.pending) {
      return;
    }
    /**
     * Attach browser console logs and html source
     * in case of test failure and close current step
     */
    Reporter.closeStep(!passed);
  },
};
