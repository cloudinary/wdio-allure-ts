const { getSeleniumArgs } = require('./seleniumArgs');
const { getOptionsFromCli } = require('./wdioCli');
const merge = require('lodash/merge');
const Launcher = require('@wdio/cli').default;
const fs = require('fs');
const path = require('path');

const {config, specs} = getOptionsFromCli();
const seleniumArgs = getSeleniumArgs();

//there is no option to pass a configuration object to wdio, only path to file so we need to generate a file
const defaultConfPath = path.resolve(__dirname,'./wdio.default.conf.js');

const filename = `/tmp/wdioConfig-${Date.now()}.js` ;

const flagsConfig = { ...seleniumArgs, specs };

fs.writeFileSync(filename, `module.exports.config = Object.assign({}, require('${defaultConfPath}'), require('${config}'), ${JSON.stringify(flagsConfig)});`);

console.log(JSON.stringify(require(filename).config, null, 4));

const wdio = new Launcher(filename);

wdio.run().then(
  code => {
    process.exit(code);
  },
  error => {
    console.error('Launcher failed to start the test', JSON.stringify(error, null, 2));
    process.exit(1);
  }
).finally(() => {
    fs.unlinkSync(filename);
});
