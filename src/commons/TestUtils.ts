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
  export function getData<T>(dataTag: string = process.env.TEST_DATA_TAG): T {
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
    Reporter.debug(`Getting data from file ${dataFilePath}`);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data: T = require(dataFilePath);
    Reporter.debug(
      `Received a data ${JSON.stringify(data)} from file by provided tag ${JSON.stringify(data[dataTag])}`
    );
    return data && data[dataTag];
  }
}
