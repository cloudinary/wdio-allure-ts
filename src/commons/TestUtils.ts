/**
 * General utils useful for test
 */
import path from 'path';

export namespace TestUtils {
  /**
   * Returns random string of requested length
   * if no length passed, length value will be 5
   * @param length length of returned string (optional)
   */
  export function randomString(length: number = 5): string {
    const possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    return Array(length)
      .join()
      .split(',')
      .map(() =>
        // tslint:disable-next-line:insecure-random
        possible.charAt(Math.floor(Math.random() * possible.length))
      )
      .join('');
  }

  /**
   * Return string that contains only the numbers from the original string.
   * @param str string to get only numbers from
   */
  export function extractNumbersFromString(str: string): string {
    return str.replace(/[^0-9]/g, '');
  }

  /**
   * Return object of data by file path
   * @param pathFile by default the path will take from env file,
   * but can be override by pathFile
   */
  export function getDataFromFile(pathFile?: string): object {
    const dataFilename = process.env.CONFIG_FILE_PATH || pathFile;
    const dataFilePath = path.resolve(process.cwd(), dataFilename);
    return require(dataFilePath);
  }
}
