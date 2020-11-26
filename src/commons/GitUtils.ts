import { execSync } from 'child_process';
import { TestFilesUtils } from './TestFilesUtils';

const DEFAULT_TIMOUT: number = 5000;
const LAST_MERGED_FILES_LIST_SCRIPT: string = 'git log -m -1 --name-only --pretty="format:"';

/**
 * Manage git commands
 */
export namespace GitUtils {
  /**
   * Return list of all tests ids from the last merge.
   */
  export function getLastMergedTestsIds(): Set<string> {
    const mergedTestsFiles: Set<string> = TestFilesUtils.getTestsFiles(getLastMergedFiles());
    return TestFilesUtils.extractTestIdFromFiles(mergedTestsFiles);
  }
}

/**
 * Return list of all files from the last merge.
 */
function getLastMergedFiles(): Set<string> {
  const mergedFiles: string = execSync(LAST_MERGED_FILES_LIST_SCRIPT, { timeout: DEFAULT_TIMOUT }).toString();
  return new Set<string>(mergedFiles.split(/[\r\n]+/));
}
