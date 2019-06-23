// Specific configurations for CI tests execution on Jenkins slave
var merge = require('deepmerge');
var wdioConf = require('./wdio.conf.js');

// have main config file as default but overwrite environment specific information
exports.config = merge(
  wdioConf.config,
  {
    capabilities: [
      {
        browserName: 'chrome',
        maxInstances: 5,
        'goog:chromeOptions': {
          args: ['--headless', '--incognito'],
        },
      },
    ],
  },
  { clone: false }
);
