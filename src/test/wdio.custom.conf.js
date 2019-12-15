// Specific configurations for CI tests execution on Jenkins slave
const merge = require('deepmerge');
const wdioConf = require('./wdio.conf.js');

// have main config file as default but overwrite environment specific information
module.exports = merge(
  wdioConf.config,
  {
    // services: [CustomService],
    logLevel: 'trace',
    specs: ['lib/test/specs/ExpectTextSpec.js'],
    onPrepare: () => console.log('123'),
    afterCommand: () => console.log('456'),
  },
  { clone: false }
);
