//Set short timeout for test
process.env.DEFAULT_TIME_OUT = '10000';

exports.config = {
  suites: {
    regression: ['./lib/test/specs/*Spec.js'],
  },

  // ===================
  // Test Configurations
  // ===================
  // Default timeout for all waitFor* commands.
  waitforTimeout: 3000,
  //
  // Default timeout in milliseconds for request
  // if Selenium Grid doesn't send response
  // connectionRetryTimeout: 10000,
  //
  // Default request retries count
  // connectionRetryCount: 3,

  framework: 'mocha',
  //

  /**
   * webdriver service
   */
  services: ['selenium-standalone'],

  //Logger level Options: trace | debug | info | warn | error | silent
  logLevel: 'silent',

  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    // ui: 'bdd',
    timeout: 300000, // test timeout, test will fall after 5 minutes on timeout
  },
};
