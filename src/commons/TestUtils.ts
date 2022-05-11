import path from 'path';
import { Reporter } from '../index';

/**
 * General utils useful for test
 */
export namespace TestUtils {
  /**
   * Returns random string of requested length
   * if no length passed, length value will be 5
   * @param length length of returned string (optional)
   * @param lettersOnly should random string contains letter only (optional)
   */
  export function randomString(length: number = 5, lettersOnly: boolean = false): string {
    const letters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers: string = '0123456789';
    const allowedChars: string = lettersOnly ? letters : `${letters}${numbers}`;

    return Array(length)
      .join()
      .split(',')
      .map(() => allowedChars.charAt(Math.floor(Math.random() * allowedChars.length)))
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
   * Check if number of minutes passed from given time till current time
   * @param countDate date to count from
   * @param numOfMinutes number of minutes to count
   * @private
   */
  export function isTimePassed(countDate: Date, numOfMinutes: number): boolean {
    const timeInMs = numOfMinutes * 60 * 1000; /* ms */

    return new Date().valueOf() - countDate.valueOf() > timeInMs;
  }

  /**
   * Return generic type of data by provided file path
   * path File located in wdio config file
   * example of using provided in spec src/test/specs/GetTestDataFileSpec.ts
   * @param dataTag type of file
   *  configDataFilePath will take from wdio.config file
   */
  export async function getData<T>(dataTag: string = process.env.TEST_DATA_TAG): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const dataFilename = browser.config.configDataFilePath;
    if (dataFilename === undefined) {
      throw new Error(`The parameter configDataFilePath in wdio config file not found`);
    }
    const dataFilePath = path.resolve(process.cwd(), dataFilename);
    if (dataFilePath === undefined) {
      throw new Error('Path to data file is incorrect');
    }
    await Reporter.debug(`Getting data from file ${dataFilePath}`);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data: T = require(dataFilePath);
    await Reporter.debug(
      `Received a data ${JSON.stringify(data)} from file by provided tag ${JSON.stringify(data[dataTag])}`
    );
    return data && data[dataTag];
  }

  const sanitizeString = (str = '') =>
    str
      .trim()
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase();

  /**
   * Get file name from
   * @param filenameSuffix
   * example of wfio.config
   * beforeTest: function (test, context) {
   *     global.currentTest = test;
   *     global.currentContext = context;
   *   },
   */
  export const getFilename = (filenameSuffix: string): string => {
    const testcaseNameSanitized = sanitizeString(global?.currentTest?.title);
    const filenameSanitized = sanitizeString(path.basename(global?.currentTest?.file || ''));

    if (!testcaseNameSanitized || !filenameSanitized) {
      console.warn(
        'cannot read current test title or filename, make sure you set the "currentTest" as a global variable'
      );

      return filenameSuffix || '';
    }

    let filename = `${filenameSanitized}-${testcaseNameSanitized}`;

    if (filenameSuffix) {
      filename += '-' + filenameSuffix;
    }

    return filename;
  };
}
