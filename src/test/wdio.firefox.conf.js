// Specific configurations for CI tests execution on Jenkins slave
var merge = require('deepmerge');
var wdioConf = require('./wdio.conf.js');

// have main config file as default but overwrite environment specific information
exports.config = merge(
  wdioConf.config,
  {
    capabilities: [
      {
        browserName: 'firefox',
        maxInstances: 5,
        'moz:firefoxOptions': {
          args: ['--headless', '--private'],
        },
      },
    ],
  },
  { clone: false }
);
