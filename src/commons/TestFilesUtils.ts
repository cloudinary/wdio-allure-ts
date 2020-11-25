import { TestUtils } from './TestUtils';
import path from 'path';
import fs, { Stats } from 'fs';

/**
 * Manage test files
 */
export namespace TestFilesUtils {
  /**
   * Extract testIds from test files
   * @param files array of test files name
   * @return list of testIds
   */
  export function extractTestIdFromFiles(files: Set<string>): Set<string> {
    const idsSet: Set<string> = new Set<string>();

    for (const file of files) {
      idsSet.add(TestUtils.extractNumbersFromString(file));
    }
    return idsSet;
  }

  /**
   * Return list of test files
   * @param files array of files path
   * @return array of test filenames
   */
  export function getTestsFiles(files: Set<string>): Set<string> {
    const testFiles: Set<string> = new Set<string>();
    files.forEach((file) => {
      const fileName = path.basename(file);
      if (isTestFile(fileName)) {
        testFiles.add(fileName);
      }
    });
    return testFiles;
  }

  /**
   * Extract testIds from specific path
   * @param folderPath path of folder to get the files from
   * @return list of testIds
   */
  export function getTestIdsFromFolder(folderPath?: string): Set<string> {
    const filesInPath = getListOfFilesRecursively(!folderPath ? __dirname : folderPath);
    const testFilesInPath = getTestsFiles(filesInPath);

    return extractTestIdFromFiles(testFilesInPath);
  }
}

/**
 * Return list of all files in folder and sub folder recursively
 * @param folderPath path of folder to get the files from
 * @param fileList file list that holds the files result
 */
function getListOfFilesRecursively(folderPath: string, fileList?: Set<string>): Set<string> {
  const files: string[] = fs.readdirSync(folderPath);

  if (!fileList) {
    fileList = new Set<string>();
  }
  for (const file of files) {
    const filepath: string = path.join(folderPath, file);
    const stat: Stats = fs.statSync(filepath);

    if (stat.isDirectory()) {
      fileList = getListOfFilesRecursively(filepath, fileList);
    } else {
      fileList.add(path.join(folderPath, '/', file));
    }
  }

  return fileList;
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
