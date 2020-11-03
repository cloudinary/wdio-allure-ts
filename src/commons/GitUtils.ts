import { execSync as execAsync } from 'child_process';

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
    const mergedFiles: string = execAsync(LAST_MERGED_FILES_LIST_SCRIPT, { timeout: DEFAULT_TIMOUT }).toString();
    return mergedFiles.split(/[\r\n]+/);
  }

  /**
   * Return the name of the current branch
   */
  export function getCurrentBranchName(): string {
    return execAsync(CURRENT_BRANCH_NAME_SCRIPT, { timeout: DEFAULT_TIMOUT }).toString().trim();
  }
}
