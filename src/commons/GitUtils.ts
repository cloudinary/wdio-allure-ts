import { execSync } from 'child_process';
import { TestFilesUtils } from './TestFilesUtils';

/**
 * Manage git commands
 */
export namespace GitUtils {
  /**
   * Return list of all tests ids from the last merge.
   */
  export function getLastMergedTestsIds(): Set<string> {
    console.log(`Getting last merged tests id's`);
    const params: string = '-m -1';
    const mergedTestsFiles: Set<string> = TestFilesUtils.getTestsFiles(executeGitScript(params));
    return TestFilesUtils.extractTestIdFromFiles(mergedTestsFiles);
  }

  /**
   * Return list of all tests ids that merged to master from specific date.
   * @param date - date to count back.
   */
  export function getMergedTestsIdsFromDate(date: Date): Set<string> {
    console.log(`Getting tests id's from date ${date}`);
    const params: string = `-p master@{${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}}..master@{now}`;
    const mergedTestsFiles: Set<string> = TestFilesUtils.getTestsFiles(executeGitScript(params));
    return TestFilesUtils.extractTestIdFromFiles(mergedTestsFiles);
  }
}

/**
 * Execute git command script
 * @param params - command parameters
 */
function executeGitScript(params: string): Set<string> {
  const currGitUrlScript = 'git config --get remote.origin.url';
  console.log(`Executing git command in: ${execSync(currGitUrlScript, { timeout: 30000 }).toString()}`);
  console.log(`Executing git command with ${params} param`);
  const script: string = `git log ${params} --name-only --pretty="format:"`;
  console.log(`Executing: ${script}`);
  const res: string = execSync(script, { timeout: 30000 }).toString();
  console.log(`Git command res: ${res ? res : 'No result returned!!!'}`);
  return new Set<string>(res.split(/[\r\n]+/));
}
