/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-floating-promises*/
require('dotenv').config();
const { GitUtils } = require('../commons/GitUtils');
const { TestRailUtil } = require('../commons/TestRailUtil');

/**
 * Find tests files that was merged in the last merge and update them on testRail.
 * We're using git commands to find the files that was merged,
 * then we're searching for test files and extract the test id from the file name,
 * and finally we're making an api cal for testRail to update all the tests to be automated
 */
(async () => {
  const testsToUpdate = GitUtils.getMergedTestsIdsSinceLastMerge();
  if (!testsToUpdate || testsToUpdate.size === 0) {
    console.log(`No tests to update since last merge`);
  } else {
    console.log(`Updating ${testsToUpdate.size} tests...`);
    console.log(testsToUpdate);

    await TestRailUtil.setTestsAsAutomatedInTestrail(testsToUpdate);
    console.log('Update tests finished successfully!!!');
  }
})();
