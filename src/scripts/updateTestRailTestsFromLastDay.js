const {GitUtils, TimeUnits} = require('../commons/GitUtils');
const { TestRailUtil } = require('../commons/TestRailUtil');

/**
 * Find tests files that was merged in the last 24 hours and update them on testRail.
 */
(() => {
    const lastHoursMergedTestsIds = GitUtils.getMergedTestsIdsByTime(24, TimeUnits.HOURS);
    console.log(`Updating ${lastHoursMergedTestsIds.size} tests...`);
    console.log(lastHoursMergedTestsIds);

    TestRailUtil.setTestsAsAutomatedInTestrail(lastHoursMergedTestsIds);
    console.log("Update tests finished successfully!!!");
})();

