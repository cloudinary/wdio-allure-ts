const yargs = require('yargs');

/**
 * Get cli options for test execution
 *
 * --specs (optional) gets strings with relative tests path
 * Example: --specs "testPath1" "testPath2"
 *
 * --config (optional) gets path to customConfig file and be used instead of wdio.default.conf.js
 *
 * @returns {{specs: *, config: *}} object with specs and/or config
 */
exports.getOptionsFromCli = function() {
  const { config, specs } = yargs.array('specs').argv;

  return { config, specs };
};
