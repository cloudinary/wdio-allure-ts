/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const { GitUtils } = require('../commons/GitUtils');
const { TestRailUtil } = require('../commons/TestRailUtil');

//if there is no DAYS_TO_COUNT_BACK env variable it's set to 1 day back
const DAYS_TO_COUNT_BACK = !process.env.DAYS_TO_COUNT_BACK ? 1 : Number(process.env.DAYS_TO_COUNT_BACK);

/**
 * Find tests files that was merged in the last 24 hours and update them on testRail.
 * We're using git commands to find the the files that was merged in the last 24 hours,
 * than we're searching for test files and extract the test id from the file name,
 * and finally we're making an api cal for testRail to update all the tests to be automated
 */
(() => {
  const lastDaysMergedTestsIds = GitUtils.getMergedTestsIdsSinceDay(DAYS_TO_COUNT_BACK);
  console.log(`Updating ${lastDaysMergedTestsIds.size} tests...`);
  console.log(lastDaysMergedTestsIds);

  TestRailUtil.setTestsAsAutomatedInTestrail(lastDaysMergedTestsIds);
  console.log('Update tests finished successfully!!!');
})();
