import { execSync } from 'child_process';
import { TestFilesUtils } from './TestFilesUtils';

const DEFAULT_TIMOUT: number = 15000;

export enum TimeUnits {
  HOURS = 'hours',
  DAYS = 'days',
  WEEKS = 'weeks',
}

export interface IMergedTime {
  time: number;
  timeUnits: TimeUnits;
}

/**
 * Manage git commands
 */
export namespace GitUtils {
  /**
   * Return list of all tests ids from the last merge or from specific time.
   * @param mergedTime - (Optional) IMergedTime object, time - time to count back, timeUnits - can be hours, days, weeks.
   */
  export function getMergedTestsIds(mergedTime?: IMergedTime): Set<string> {
    let gitScriptParams: string = '-m -1';
    if (mergedTime) {
      gitScriptParams = `--since="${mergedTime.time} ${mergedTime.timeUnits} ago"`;
    }
    const mergedTestsFiles: Set<string> = TestFilesUtils.getTestsFiles(executeGitScript(gitScriptParams));
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
