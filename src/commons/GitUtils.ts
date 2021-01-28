import { execSync } from 'child_process';
import { TestFilesUtils } from './TestFilesUtils';

export enum TimeUnits {
  HOURS = 'hours',
  DAYS = 'days',
  WEEKS = 'weeks',
}

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
   * Return list of all tests ids that merged by time.
   * @param time - time to count back.
   * @param timeUnits - can be hours day's etc.
   */
  export function getMergedTestsIdsByTime(time: number, timeUnits: TimeUnits): Set<string> {
    const params: string = `--since="${time} ${timeUnits} ago"`;
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
  const res: string = execSync(script, { timeout: 30000 }).toString();
  return new Set<string>(res.split(/[\r\n]+/));
}
