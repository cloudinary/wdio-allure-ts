const yargs = require('yargs');

exports.getOptionsFromCli = function() {
  const { config, specs } = yargs.array('specs').argv;

  return { config, specs };
};
