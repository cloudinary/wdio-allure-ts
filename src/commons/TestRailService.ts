import { TestFields, TestRailApi } from './TestRailApi';
import { AxiosPromise } from 'axios';

/**
 * TestRail service
 */
export namespace TestRailService {
  /**
   * Update automation field on testrail for the last merge tests files
   * @param testIDs array of tests Ids
   */
  export async function setTestsAsAutomatedInTestrail(testIDs: string[]): Promise<void> {
    const promiseArray: AxiosPromise[] = [];

    for (const testId of testIDs) {
      promiseArray.push(
        TestRailApi.Instance.changeTestField(
          testId,
          TestFields.Automation,
          TestFields.Automation.fieldOptions.automated
        )
      );
    }
    await Promise.all(promiseArray);
  }
}
