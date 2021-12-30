import { execSync } from 'child_process';
import { TestFilesUtils } from './TestFilesUtils';

/**
 * Manage git commands
 */
export namespace GitUtils {
  /**
   * Return list of all tests ids that merged to master by days to count back.
   * @param sinceDay - days to count back
   */
  export function getMergedTestsIdsSinceDay(sinceDay: number): Set<string> {
    console.log(`Getting tests id's since ${sinceDay} days ago`);
    const params: string = `diff $(git rev-list -n1  --before={@{${sinceDay}.days.ago} origin/master) --name-only`;
    const scriptRes = executeGitScript(params);
    if (!scriptRes) {
      console.log(`No changed files found since ${sinceDay} days ago`);
      return undefined;
    }
    const filesSinceDay = scriptRes.split(/[\r\n]+/);
    const mergedTestsFiles: Set<string> = TestFilesUtils.getTestsFiles(new Set<string>(filesSinceDay));
    return TestFilesUtils.extractTestIdFromFiles(mergedTestsFiles);
  }
}

/**
 * Execute git command script
 * @param params - command parameters
 */
function executeGitScript(params: string): string {
  const currGitUrlScript = 'git config --get remote.origin.url';
  console.log(`Executing git command in: ${execSync(currGitUrlScript, { timeout: 30000 }).toString()}`);
  console.log(`Executing git command with ${params} param`);
  const script: string = `git ${params}`;
  console.log(`Executing: ${script}`);
  const res: string = execSync(script, { timeout: 30000 }).toString();
  console.log(`Git command res: ${res ? res : 'No result!!!'}`);
  return res ? res : undefined;
}
