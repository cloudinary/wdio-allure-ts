//Set short timeout for test
process.env.DEFAULT_TIME_OUT = '10000';

exports.config = {
  //
  // =====================
  // Browser Configurations
  // =====================
  maxInstances: 1,
  capabilities: [
    {
      browserName: 'chrome',

      chromeOptions: {
        args: ['--headless', '--incognito'],
      },
    },
    {
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: ['--headless'],
      },
    },
  ],

  suites: {
    regression: ['./lib/test/specs/*Spec.js'],
  },

  // ===================
  // Test Configurations
  // ===================
  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,
  //
  // Default timeout in milliseconds for request
  // if Selenium Grid doesn't send response
  // connectionRetryTimeout: 10000,
  //
  // Default request retries count
  // connectionRetryCount: 3,

  framework: 'mocha',
  //
  // Test reporter for stdout.
  // see also: http://webdriver.io/guide/reporters/dot.html
  reporters: ['spec'],

  /**
   * webdriver service
   */
  services: ['selenium-standalone'],

  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: 'bdd',
    timeout: 300000, // test timeout, test will fall after 5 minutes on timeout
    retries: 2,
  },
};
