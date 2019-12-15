const { getSeleniumArgs } = require('./seleniumArgs');
const { getOptionsFromCli } = require('./wdioCli');
const Launcher = require('@wdio/cli').default;
const fs = require('fs');
const path = require('path');

const { config, specs } = getOptionsFromCli();
const seleniumArgs = getSeleniumArgs();

//there is no option to pass a configuration object to wdio, only path to file so we need to generate a file
const defaultConfPath = path.resolve(__dirname, './wdio.default.conf.js');
const customConfigPath = config && path.resolve(process.cwd(), config);
const flagsConfig = { ...seleniumArgs, specs };

//In order to pass the custom config we need to generate a temp configuration file
const filename = `/tmp/wdioConfig-${Date.now()}.js`;

fs.writeFileSync(
  filename,
  `module.exports.config = Object.assign({}, require('${defaultConfPath}') ${
    customConfigPath ? `,require('${customConfigPath}')` : ''
  }, ${JSON.stringify(flagsConfig)});`
);

const wdio = new Launcher(filename);

wdio
  .run()
  .catch(error => {
    console.error('Launcher failed to start the test', JSON.stringify(error, null, 2));
    return 1;
  })
  .then(code => {
    fs.unlinkSync(filename);
    process.exit(code);
  });
