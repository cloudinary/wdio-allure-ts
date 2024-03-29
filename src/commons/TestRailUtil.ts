import { IField, TestFields, TestRailApi } from './TestRailApi';
import { AxiosPromise } from 'axios';
import { TestFilesUtils } from './TestFilesUtils';

/**
 * Utils useful for testrail api
 */
export namespace TestRailUtil {
  /**
   * Update an array of tests automation field on testrail to automated
   * @param testIDs array of tests Ids
   */
  export async function setTestsAsAutomatedInTestrail(testIDs: Set<string>): Promise<void> {
    console.log(`About to update ${Array.from(testIDs.values())} on testrail`);
    for (const testId of testIDs) {
      await changeTestField(testId, TestFields.Automation, TestFields.Automation.fieldOptions.automated);
    }
  }

  /**
   * Update an array of tests automation field on testrail from specific folder
   * @param folderPath path of tests files to update
   */
  export async function setTestsAsAutomatedInTestrailFromPath(folderPath?: string): Promise<void> {
    console.log(`Setting tests as 'Automated' from path ${folderPath}`);
    const testIDs = TestFilesUtils.getTestIdsFromFolder(folderPath);
    await setTestsAsAutomatedInTestrail(testIDs);
  }

  /**
   *   Change test field
   *   @param testID test id as appear on testRail site
   *   @param field test field
   *   @param option field option number
   */
  export function changeTestField(testID: string, field: IField, option: number): AxiosPromise {
    console.log(`Change test ${testID} ${field.fieldName} field to ${option} option`);
    const data: Map<IField, number> = new Map<IField, number>();
    data[field.fieldName] = option;
    return TestRailApi.Instance.updateTestCase(testID, data);
  }
}
