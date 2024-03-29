import { Reporter } from '../commons/Reporter';
import dotenv from 'dotenv';

dotenv.config();

const USE_SELENOID = process.env.USE_SELENOID && Boolean(JSON.parse(process.env.USE_SELENOID.toLowerCase()));
const maxChromeInstances = parseInt(process.env.MAX_CHROME_INSTANCES) || 10;
const waitForTimeouts = parseInt(process.env.DEFAULT_TIME_OUT) || 3000;
const seleniumStandaloneArgs = {
  drivers: {
    chrome: {
      version: process.env.CHROME_DRIVER_VERSION,
    },
  },
};

const seleniumBaseCapabilities = {
  browserName: 'chrome',
  maxInstances: maxChromeInstances,
  acceptInsecureCerts: true,
  'goog:chromeOptions': {
    args: ['--window-size=1920,1080', '--headless', '--incognito', '-–ignore-certificate-errors'],
  },
};

const selenoidCapabilities = {
  'selenoid:options': {
    enableVNC: true,
  },
};

/**
 * Default configurations for wdio-allure-ts based projects
 * For more options see https://webdriver.io/docs/configurationfile.html
 *
 */
exports.config = {
  specs: ['./specs/**/*Spec.ts'],
  suites: { regression: ['./specs/*Spec.ts'] },

  hostname: 'localhost',
  port: 4444,
  path: USE_SELENOID ? '/wd/hub' : '',
  // Browser capabilities
  capabilities: USE_SELENOID ? [{ ...seleniumBaseCapabilities, ...selenoidCapabilities }] : [seleniumBaseCapabilities],
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
  configDataFilePath: 'src/test/resources/example.json',
  //
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: USE_SELENOID
    ? [['devtools']]
    : [
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
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
    await Reporter.closeStep(!passed);
  },
};
