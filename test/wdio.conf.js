var fs = require("fs");
var dotenv = require("dotenv");

var seleniumGridPort = process.env.SELENIUM_GRID_PORT || "4444";

exports.config = {
  //
  // =====================
  // Server Configurations
  // =====================
  // Host address of the running Selenium server.
  host: "localhost",
  port: seleniumGridPort,
  path: "/wd/hub",

  // =====================
  // Browser Configurations
  // =====================
  capabilities: [
    {
      maxInstances: 1,
      browserName: "chrome",

      chromeOptions: {
        args: ["--headless", "--incognito"]
      }
    },
    {
      maxInstances: 1,
      browserName: "firefox",
      "moz:firefoxOptions": {
        args: ["--incognito", "--headless"]
      }
    }
  ],

  // ===================
  // Test Configurations
  // ===================
  // Default timeout for all waitFor* commands.
  waitforTimeout: 6000,
  //
  // Default timeout in milliseconds for request
  // if Selenium Grid doesn't send response
  connectionRetryTimeout: 6000,
  //
  // Default request retries count
  connectionRetryCount: 3,

  framework: "mocha",
  //
  // Test reporter for stdout.
  // see also: http://webdriver.io/guide/reporters/dot.html
  reporters: ["spec"],

  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: "bdd",
    timeout: 300000 // test timeout, test will fall after 5 minutes on timeout
  },
  // =====
  // Hooks
  // =====
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: function(config, capabilities) {
    /**
     * Load configurations from .env
     */
    dotenv.config();
  }
};
