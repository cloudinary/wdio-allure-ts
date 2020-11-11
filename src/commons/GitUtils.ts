import { execSync } from 'child_process';
import { TestUtils } from './TestUtils';
import path from 'path';

const DEFAULT_TIMOUT: number = 5000;
const LAST_MERGED_FILES_LIST_SCRIPT: string = 'git log -m -1 --name-only --pretty="format:"';
const CURRENT_BRANCH_NAME_SCRIPT: string = 'git rev-parse --abbrev-ref HEAD';

/**
 * Manage git commands
 */
export namespace GitUtils {
  /**
   * Return list of all files from the last merge.
   */
  export function getLastMergedFiles(): string[] {
    const mergedFiles: string = execSync(LAST_MERGED_FILES_LIST_SCRIPT, { timeout: DEFAULT_TIMOUT }).toString();
    return mergedFiles.split(/[\r\n]+/);
  }

  /**
   * Return list of all tests ids from the last merge.
   */
  export function getLastMergedTestsIds(): string[] {
    const mergedTestsFiles: string[] = getTestsFiles(getLastMergedFiles());
    return extractTestIdFromFiles(mergedTestsFiles);
  }

  /**
   * Return the name of the current branch
   */
  export function getCurrentBranchName(): string {
    return execSync(CURRENT_BRANCH_NAME_SCRIPT, { timeout: DEFAULT_TIMOUT }).toString().trim();
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

/**
 * Extract testIds from test files
 * @param files array of test files name
 * @return list of testIds
 */
function extractTestIdFromFiles(files: string[]): string[] {
  const idsArray: string[] = [];

  for (const file of files) {
    idsArray.push(TestUtils.extractNumbersFromString(file));
  }
  return idsArray;
}

/**
 * Return list of test files
 * @param files array of files path
 * @return array of test filenames
 */
function getTestsFiles(files: string[]): string[] {
  const testFiles: string[] = [];

  for (const file of files) {
    const fileName = path.basename(file);
    if (isTestFile(fileName)) {
      testFiles.push(fileName);
    }
  }
  return testFiles;
}
