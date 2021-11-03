#!/usr/bin/env node
const { getSeleniumArgs } = require('./seleniumArgs');
const { getOptionsFromCli } = require('./wdioCli');
const Launcher = require('@wdio/cli').default;
const fs = require('fs');
const path = require('path');

/**
 *CLI runner for wdio
 * Reads params from command line, parse it and loads configuration for execution
 */
(async function() {
  const { config, specs } = getOptionsFromCli();
  const seleniumArgs = await getSeleniumArgs();

  //there is no option to pass a configuration object to wdio, only path to file so we need to generate a file
  const defaultConfPath = path.resolve(__dirname, './wdio.default.conf.js');
  const customConfigPath = config && path.resolve(process.cwd(), config);
  const cliParams = { ...seleniumArgs, specs: specs ? specs.map(specs => path.resolve(process.cwd(), specs)) : [] };

  //In order to pass the custom config we need to generate a temp configuration file
  const customConfigFilePath = `/tmp/wdioConfig-${Date.now()}.js`;

  const fileData = `module.exports.config = Object.assign({}, require('${defaultConfPath}') ${
    customConfigPath ? `,require('${customConfigPath}')` : ''
  }, ${JSON.stringify(cliParams)});`;

  fs.writeFileSync(customConfigFilePath, fileData);

  const wdio = new Launcher(customConfigFilePath);

  wdio
    .run()
    .catch(error => {
      console.error('Launcher failed to start the test', JSON.stringify(error, null, 2));
      return 1;
    })
    .then(code => {
      fs.unlinkSync(customConfigFilePath);
      process.exit(code);
    });
})();
