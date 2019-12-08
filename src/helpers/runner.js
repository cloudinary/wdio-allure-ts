const { getSeleniumArgs } = require('./seleniumArgs');
const { getOptionsFromCli } = require('./wdioCli');
const merge = require('lodash/merge');
const Launcher = require('@wdio/cli').default;

const optionsFromCli = getOptionsFromCli();
const seleniumArgs = getSeleniumArgs();
const opts = merge(seleniumArgs, optionsFromCli);
const wdio = new Launcher('./src/helpers/wdio.default.conf.js', opts);

wdio.run().then(
  code => {
    process.exit(code);
  },
  error => {
    console.error('Launcher failed to start the test', JSON.stringify(error, null, 2));
    process.exit(1);
  }
);
