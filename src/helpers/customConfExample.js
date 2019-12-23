/**
 * Custom configurations EXAMPLE for wdio-allure-ts based projects
 * For more options see https://webdriver.io/docs/configurationfile.html
 */
const config = {
  // Browser capabilities
  capabilities: [
    {
      browserName: 'chrome',
      maxInstances: 1,
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
  logLevel: 'info',
  // Default timeout for all waitFor* commands.
  waitforTimeout: 600,
  //
  // Default timeout in milliseconds for request
  // if Selenium Grid doesn't send response
  connectionRetryTimeout: 300,
  //
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: ['selenium-standalone'], // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: http://webdriver.io/guide/testrunner/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'mocha',
  mochaOpts: {
    timeout: 150, // test timeout, test will fall after 5 minutes on timeout
  },
  //
  // Test reporter
  reporters: [
    [
      'allure',
      {
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   */
  onPrepare: function() {
    console.log('onPrepare hook');
  },

  /**
   * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   */
  afterTest: function() {
    console.log('afterTest hook');
  },
};
module.exports = config;
