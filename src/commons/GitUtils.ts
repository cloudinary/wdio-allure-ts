import { execSync } from 'child_process';
import { TestFilesUtils } from './TestFilesUtils';

const DEFAULT_TIMOUT: number = 15000;

/**
 * Manage git commands
 */
export namespace GitUtils {
  /**
   * Return list of all tests ids from the last merge.
   */
  export function getLastMergedTestsIds(): Set<string> {
    const params: string = '-m -1';
    const mergedTestsFiles: Set<string> = TestFilesUtils.getTestsFiles(executeGitScript(params));
    return TestFilesUtils.extractTestIdFromFiles(mergedTestsFiles);
  }

  /**
   * Return list of all tests ids that merged by hours.
   * @param hours - hours to count back
   */
  export function getMergedTestsIdsByLastHours(hours: number): Set<string> {
    const params: string = `--since="${hours} hours ago"`;
    const mergedTestsFiles: Set<string> = TestFilesUtils.getTestsFiles(executeGitScript(params));
    return TestFilesUtils.extractTestIdFromFiles(mergedTestsFiles);
  }
}

/**
 * Execute git command script
 * @param params - command parameters
 */
function executeGitScript(params: string): Set<string> {
  const script: string = `git log ${params} --name-only --pretty="format:"`;
  const res: string = execSync(script, { timeout: DEFAULT_TIMOUT }).toString();
  return new Set<string>(res.split(/[\r\n]+/));
}
