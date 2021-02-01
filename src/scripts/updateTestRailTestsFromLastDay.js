const {GitUtils, TimeUnits} = require('../commons/GitUtils');
const { TestRailUtil } = require('../commons/TestRailUtil');

/**
 * Find tests files that was merged in the last 24 hours and update them on testRail.
 * We're using git commands to find the the files that was merged in the last 24 hours,
 * than we're searching for test files and extract the test id from the file name,
 * and finally we're making an api cal for testRail to update all the tests to be automated
 */
(() => {
    const lastHoursMergedTestsIds = GitUtils.getMergedTestsIdsByTime(24, TimeUnits.HOURS);
    console.log(`Updating ${lastHoursMergedTestsIds.size} tests...`);
    console.log(lastHoursMergedTestsIds);

    TestRailUtil.setTestsAsAutomatedInTestrail(lastHoursMergedTestsIds);
    console.log("Update tests finished successfully!!!");
})();

