const yargs = require('yargs');
const merge = require('lodash/merge');
const transform = require('lodash/transform');
const path = require('path');

const funcsPrefixes = ['before', 'after', 'on'];

const getJSConfigObj = configPath => {
  return transform(require(configPath), (acc, value, key) => {
    for (const prefix of funcsPrefixes) {
      if (key.startsWith(prefix)) {
        acc[key] = require(path.resolve(configPath, '../', value));
        return;
      }
    }
    acc[key] = value;
  });
};

exports.getOptionsFromCli = function() {
  const { config, specs } = yargs/*.coerce('config', getJSConfigObj)*/.array('specs').argv;

  // return merge({ specs }, config);

  return {config, specs}
};
