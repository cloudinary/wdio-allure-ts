import path from 'path';

/**
 * General utils useful for test
 */

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
   * Return generic type of data by provided file path
   * path File located in wdio config file
   * example of using provided in spec src/test/specs/GetTestDataFileSpec.ts
   * @param dataTag type of file
   *  configDataFilePath will take from wdio.config file
   */
  export function getData<T>(dataTag: string = process.env.TEST_DATA_TAG): T {
    // @ts-ignore
    const dataFilename = browser.config.configDataFilePath;
    const dataFilePath = path.resolve(process.cwd(), dataFilename);
    if (dataFilename === undefined) {
      throw new Error('Path to data file is incorrect');
    }
    console.log(`Getting data from file ${dataFilePath}`);
    const data: T = require(dataFilePath);
    console.log(`Received a data from file by provided tag ${JSON.stringify(data[dataTag])}`);
    return data && data[dataTag];
  }
}
