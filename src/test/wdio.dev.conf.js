// Specific configurations for CI tests execution on Jenkins slave
var merge = require('deepmerge');
var wdioConf = require('./wdio.conf.js');

// have main config file as default but overwrite environment specific information
exports.config = merge(
  wdioConf.config,
  {
    //max instance of chrome browser instances
    maxInstances: 1,

    //Use real chrome browser with 1 instance for local testing on dev machine
    capabilities: [
      {
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: ['--window-size=1920,1080', '--incognito'],
        },
      },
    ],
  },
  { clone: false }
);
