import { IField, TestFields, TestRailApi } from './TestRailApi';
import { AxiosPromise } from 'axios';

/**
 * TestRail service
 */
export namespace TestRailService {
  /**
   * Update an array of tests automation field on testrail to automated
   * @param testIDs array of tests Ids
   */
  export async function setTestsAsAutomatedInTestrail(testIDs: string[]): Promise<void> {
    const promiseArray: AxiosPromise[] = [];

    for (const testId of testIDs) {
      promiseArray.push(changeTestField(testId, TestFields.Automation, TestFields.Automation.fieldOptions.automated));
    }
    await Promise.all(promiseArray);
  }

  /**
   *   Change test field
   *   @param testID test id as appear on testRail site
   *   @param field test field
   *   @param option field option number
   */
  export function changeTestField(testID: string, field: IField, option: number): AxiosPromise {
    const data: any = {};
    data[field.fieldName] = option;
    return TestRailApi.Instance.updateTestCase(testID, data);
  }
}
