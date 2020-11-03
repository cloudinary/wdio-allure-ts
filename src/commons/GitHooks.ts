import { AutomationFieldOptions, TestRailApi } from './TestRailApi';
import { GitUtils } from './GitUtils';
import { TestUtils } from '../index';
import path from 'path';

/**
 * Git hooks scripts
 */
export namespace GitHooks {
  /**
   * Update automation field on testrail for the last merge tests files
   */
  export async function updateLastMergedTestsInTestrail(): Promise<void> {
    const filesList: string[] = GitUtils.getLastMergedFiles();

    for (const file of filesList) {
      const fileName = path.basename(file);
      if (isTestFile(fileName)) {
        const testID = TestUtils.extractNumbersFromString(fileName);
        await TestRailApi.Instance.changeTestAutomationField(testID, AutomationFieldOptions.automated);
      }
    }
  }
}

/**
 * Check if file is a test file.
 * @return {boolean} true if file name start with C{NUMBER} and ends with Test.ts.
 */
function isTestFile(fileName) {
  const shouldStartWithRegex = /^C\d+/g;
  const shouldEndWith = 'Test.ts';

  return fileName.endsWith(shouldEndWith) && new RegExp(shouldStartWithRegex).test(fileName);
}
