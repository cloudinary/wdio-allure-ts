import { TestFields, TestRailApi } from './TestRailApi';
import { AxiosPromise } from 'axios';

/**
 * Git hooks scripts
 */
export namespace GitHooks {
  /**
   * Update automation field on testrail for the last merge tests files
   */
  export async function setTestsAsAutomatedInTestrail(testIDs: string[]): Promise<void> {
    const promiseArray: AxiosPromise[] = [];

    for (const testId of testIDs) {
      // @ts-ignore
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
